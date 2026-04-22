import re

logic = """
    // ============================================
    // DIRECT SALES CHECKOUT LOGIC (natal_chart_sale)
    // ============================================
    if (variant.id === 'natal_chart_sale') {
        const timeInput = document.getElementById('birth-time');
        const cityInput = document.getElementById('birth-city');
        const payBtn = document.getElementById('bottom-pay-btn');
        const skipBtn = document.getElementById('skip-button');
        const timePlaceholder = document.getElementById('time-placeholder');
        const cityError = document.getElementById('city-error-message');
        const cityInfo = document.getElementById('city-info-message');
        
        // 1. Time Logic
        if (timeInput) {
            timeInput.addEventListener('change', (e) => {
                state.set('timeKnown', true);
                if (timePlaceholder) {
                    timePlaceholder.textContent = e.target.value;
                    timePlaceholder.style.color = '#ffffff';
                }
                if (skipBtn) skipBtn.style.display = 'none';
                document.getElementById('time-error-message').style.display = 'none';
            });
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                state.set('timeKnown', false);
                state.set('time', '12:00');
                if (timeInput) {
                    timeInput.value = '12:00';
                    if (timePlaceholder) timePlaceholder.textContent = 'Точний час невідомий';
                    timeInput.parentElement.style.opacity = '0.5';
                }
                skipBtn.style.display = 'none';
                document.getElementById('time-error-message').style.display = 'none';
            });
        }

        // 2. City Logic (Basic, detailed validation on submit)
        if (cityInput) {
            cityInput.addEventListener('input', () => {
                if (cityError) cityError.style.display = 'none';
                if (cityInfo) cityInfo.style.display = 'none';
                cityInput.classList.remove('input-error');
            });
        }

        // 3. Payment Button Validation & Submit
        if (payBtn) {
            payBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                let isValid = true;
                
                const timeError = document.getElementById('time-error-message');
                if (!state.get('timeKnown') && state.get('timeKnown') !== false) {
                    if (!timeInput || !timeInput.value) {
                        if (timeError) timeError.style.display = 'block';
                        isValid = false;
                    }
                }

                const cityVal = cityInput ? cityInput.value.trim() : '';
                if (!cityVal || cityVal.length < 2) {
                    if (cityError) {
                        cityError.textContent = 'Будь ласка, введи місто народження.';
                        cityError.style.display = 'block';
                    }
                    isValid = false;
                }

                if (isValid) {
                    if (timeInput && timeInput.value) state.set('time', timeInput.value);
                    state.set('city', cityVal);
                    
                    // We must fetch coordinates
                    payBtn.classList.add('loading');
                    payBtn.disabled = true;
                    
                    try {
                        const { getCoordinates } = await import('../../services/geo.service.js');
                        const coords = await getCoordinates(cityVal);
                        
                        if (coords && coords.status === 'success') {
                            state.set('city', coords.corrected_name);
                            state.set('birth_lat', coords.latitude);
                            state.set('birth_lon', coords.longitude);
                            
                            // Proceed to Paywall
                            if (window.fbq) fbq('track', 'InitiateCheckout', { value: variant.price || 347, currency: 'UAH' });
                            router.navigateTo('paywall');
                        } else if (coords && coords.status === 'ambiguous') {
                            if (cityError) {
                                cityError.textContent = `Місто знайдено в кількох місцях. Уточни, додавши країну (напр: ${cityVal}, Україна).`;
                                cityError.style.display = 'block';
                            }
                            payBtn.classList.remove('loading');
                            payBtn.disabled = false;
                        } else {
                            if (cityError) {
                                cityError.textContent = `Не можемо знайти місто "${cityVal}". Перевір назву.`;
                                cityError.style.display = 'block';
                            }
                            payBtn.classList.remove('loading');
                            payBtn.disabled = false;
                        }
                    } catch(err) {
                        console.error(err);
                        router.navigateTo('paywall');
                    }
                }
            });
        }
    }
"""

with open('src/modules/stage-1-welcome/index.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# I will replace `if (variant.id !== 'natal_chart_sale') setupForm('birth-form-bottom');` 
# with itself + the new logic
target = "if (variant.id !== 'natal_chart_sale') setupForm('birth-form-bottom');"
idx = js_content.find(target)
if idx != -1:
    js_content = js_content[:idx + len(target)] + "\n" + logic + js_content[idx + len(target):]
    with open('src/modules/stage-1-welcome/index.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    print("Logic added!")
else:
    print("Target not found")
