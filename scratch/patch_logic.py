import re

with open('src/modules/stage-1-welcome/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Top Button Text
# Original: const buttonHtml = marketingData?.form?.buttonHtml || ...
# Or just replace the string hardcoded inside the method if any.
# Let's verify where "ОТРИМАТИ НАТАЛЬНУ КАРТУ" is:
if "ОТРИМАТИ НАТАЛЬНУ КАРТУ" in content:
    print("Found text, but we should make it dynamic based on variant.")

# Let's replace the `router.navigateTo('loading');` logic in `setupForm`
# We want to intercept form submission if variant.id === 'natal_chart_sale'
setup_form_start = content.find("function setupForm(formId) {")
if setup_form_start != -1:
    submit_listener_idx = content.find("formEl.addEventListener('submit', (e) => {", setup_form_start)
    if submit_listener_idx != -1:
        # Insert interception code right after e.preventDefault(); state.set('date', ...);
        # Actually, let's substitute the block:
        target_code = """
            if (!dateInput.value) {
                // ... validation logic ...
            } else {
                state.set('date', dateInput.value);
                fbq('track', 'Lead'); // Facebook lead event upon date entry
                if (variant.id === 'natal_chart_sale') {
                    // direct sales funnel - scroll to bottom
                    const premiumContainer = document.getElementById('premium-form-container');
                    if (premiumContainer) {
                        premiumContainer.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    router.navigateTo('loading');
                }
            }
"""
        # I'll write a safer regex replacement:
        replace_regex = re.compile(r"state\.set\('date',\s*dateInput\.value\);\s*router\.navigateTo\('loading'\);")
        replacement = """state.set('date', dateInput.value);
                if (variant.id === 'natal_chart_sale') {
                    const premiumBox = document.getElementById('premium-form-container');
                    if (premiumBox) {
                        premiumBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    router.navigateTo('loading');
                }"""
        content = replace_regex.sub(replacement, content)

# 2. Block the second form generation (bottom-form-wrapper) for natal_chart_sale
# "if (!bottomFormContainer) {"  block
bottom_form_regex = re.compile(r"if\s*\(!bottomFormContainer\)\s*\{\s*const wrapper\s*=\s*document\.createElement\('div'\);")
bottom_form_replacement = """if (!bottomFormContainer && variant.id !== 'natal_chart_sale') {
                        const wrapper = document.createElement('div');"""
content = bottom_form_regex.sub(bottom_form_replacement, content)

# 3. Prevent `setupForm('birth-form-bottom')` from erroring if it doesn't exist
setup_bottom_regex = re.compile(r"setupForm\('birth-form-bottom'\);")
setup_bottom_replacement = "if (variant.id !== 'natal_chart_sale') setupForm('birth-form-bottom');"
content = setup_bottom_regex.sub(setup_bottom_replacement, content)


# 4. Integrate sticky CTA logic modification
# Originally: if (scrollPosition > formBottom) { stickyCta.style.transform = 'translate(-50%, 0)'; ... }
# Then onclick: document.getElementById('birth-form').scrollIntoView(...)
sticky_click_regex = re.compile(r"stickyCta\.addEventListener\('click',\s*\(\)\s*=>\s*\{[\s\S]*?\}\);")
sticky_click_replacement = """stickyCta.addEventListener('click', () => {
                if (variant.id === 'natal_chart_sale') {
                    const topFormEl = document.getElementById('birth-form');
                    const topDateInput = topFormEl ? topFormEl.querySelector('input[type="date"]') : null;
                    const dateVal = topDateInput ? topDateInput.value : state.get('date');
                    if (!dateVal) {
                        document.getElementById('birth-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
                        if (topDateInput) {
                            setTimeout(() => { topDateInput.focus(); topDateInput.click(); }, 500);
                        }
                    } else {
                        const pContainer = document.getElementById('premium-form-container');
                        if (pContainer) pContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    document.getElementById('birth-form').scrollIntoView({ behavior: 'smooth' });
                    const dateInput = document.getElementById('birth-date');
                    setTimeout(() => {
                        if (dateInput) { dateInput.focus(); dateInput.click(); }
                    }, 500);
                }
            });"""
content = sticky_click_regex.sub(sticky_click_replacement, content)

with open('src/modules/stage-1-welcome/index.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Logic patched")
