with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# I need to modify `formEl.addEventListener('submit', async function (e) { ... router.navigateTo('loading');`
# I will find `router.navigateTo('loading');` inside `init()`
idx = text.find("router.navigateTo('loading');")
if idx != -1:
    fixed_logic = """
                if (variant.id === 'natal_chart_sale') {
                    // Don't navigate, instead scroll down to the bottom form and open it if not open
                    setButtonLoading(submitBtn, false); // Cancel loading state
                    const bottomForm = document.getElementById('premium-form-container');
                    if (bottomForm) {
                        bottomForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    router.navigateTo('loading');
                }
"""
    new_text = text[:idx] + fixed_logic + text[idx + len("router.navigateTo('loading');"):]
    with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
        f.write(new_text)
    print("Fixed submit behavior")
else:
    print("Not found")

