with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# I need to find the validation block for bottom-pay-btn:
# const timeError = document.getElementById('time-error-message');

target_validation = "                const timeError = document.getElementById('time-error-message');"
idx = text.find(target_validation)

if idx != -1:
    validation_patch = """
                const timeError = document.getElementById('time-error-message');
                
                // 🚀 Added: Validate Date from Top Form!
                const topDateInput = document.getElementById('birth-date');
                if (!state.get('date')) {
                    if (!topDateInput || !topDateInput.value) {
                        isValid = false;
                        const topError = document.getElementById('error-message');
                        if (topError) {
                            topError.innerText = "Спочатку обери дату народження";
                            topError.style.display = 'block';
                        }
                        // Scroll up to the date form!
                        const topForm = document.getElementById('birth-form');
                        if (topForm) topForm.scrollIntoView({behavior: 'smooth', block: 'center'});
                        payBtn.classList.remove('loading');
                        payBtn.disabled = false;
                        return; // Stop execution immediately to prevent geo-fetch
                    } else {
                        // Save it to state just in case
                        state.set('date', topDateInput.value);
                    }
                }
"""
    new_text = text[:idx] + validation_patch + text[idx + len(target_validation):]
    with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
        f.write(new_text)
    print("Bottom pay button validation fixed")
else:
    print("Not found")

