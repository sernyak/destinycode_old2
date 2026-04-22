import sys

with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

science_idx = text.find('<div id="offer-block-science"')
premium_form_idx = text.find('<div id="premium-form-container"')

if science_idx == -1 or premium_form_idx == -1:
    print("Could not find boundaries")
    sys.exit(1)

new_html = """
        <div id="offer-block-reviews" class="offer-landing-block" >
            <div id="reviews-container" class="offer-section-card" style="padding: 24px 16px; border-top: none; background: transparent; border: none; box-shadow: none;">
                <h3 class="offer-section-title" style="margin-bottom: 24px;">Що кажуть ті, хто вже отримав повний <span>Розрахунок</span></h3>
                <div id="reviews-list" style="display: flex; flex-direction: column; gap: 14px;">
                    <!-- Динамічні відгуки завантажуються тут -->
                </div>
            </div>
        </div>

        <div id="premium-form-title-container" class="mt-8 mb-4 text-center">
            <h2 class="text-2xl font-bold text-white mb-2" style="font-size: 1.35rem; line-height: 1.3;">Отримай повну розшифровку своєї Натальної карти</h2>
            <p class="text-sm opacity-70" style="color: var(--secondary-text-color);">Введи час і місце народження - і отримай результат адаптований саме під тебе.</p>
        </div>

        <div id="premium-form-container" class="w-full space-y-5 mt-4" >
"""

# 1. Remove custom blocks and add form title
time_comment = text.find('<!-- Time Input -->', premium_form_idx)
text = text[:science_idx] + new_html + "\n            " + text[time_comment:]

# 2. Hide Red Error box
text = text.replace('id="offer-validation-error"\n                class="bg-red-500/10', 'id="offer-validation-error" style="display: none;"\n                class="bg-red-500/10 offer-shake')
text = text.replace('id="offer-validation-error" \n                class="bg-red-500/10', 'id="offer-validation-error" style="display: none;"\n                class="bg-red-500/10 offer-shake')
text = text.replace('id="offer-validation-error"', 'id="offer-validation-error" style="display: none;"')

# 3. Add timer and style to button
timer_html = """
        <!-- Urgency Text -->
        <div id="offer-urgency-timer-bottom" style="text-align: center; margin-bottom: 12px; margin-top: 16px;">
            <span style="font-size: 11px; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; background: rgba(205,164,94,0.15); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(205,164,94,0.3); display: inline-block;">
                Спеціальна ціна діє ще: <span id="offer-timer-display-bottom" style="color: var(--accent-color); font-weight: 700; margin-left: 2px;">15:00</span>
            </span>
        </div>
        """

# find bottom button definition inside natal_chart_sale
bottom_btn_target = '<button type="button" id="calculate-btn-bottom"'
if bottom_btn_target not in text:
    bottom_btn_target = '<button id="calculate-btn-bottom"'

text = text.replace(bottom_btn_target, timer_html + bottom_btn_target)

# upgrade classes for the button
text = text.replace('id="calculate-btn-bottom" class="btn btn-primary shadow-2xl mt-4 relative overflow-hidden"', 'id="calculate-btn-bottom" class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden"')
text = text.replace('id="calculate-btn-bottom" class="btn btn-primary mt-4"', 'id="calculate-btn-bottom" class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden"')
text = text.replace('id="landing-sticky-cta">\n                            <button class="btn btn-primary shadow-2xl"', 'id="landing-sticky-cta">\n                            <button class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden"')

# 4. Inject JS logic for reviews and timer
js_logic = """
                    // Render Reviews if available
                    const reviewsList = document.getElementById('reviews-list');
                    if (reviewsList && variant.testimonials) {
                        reviewsList.innerHTML = variant.testimonials.map(rev => `
                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px; text-align: left;">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                    <img src="${rev.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(205, 164, 94, 0.3);">
                                    <div>
                                        <div style="color: #fff; font-weight: 600; font-size: 0.95em;">${rev.name}</div>
                                        <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                                    </div>
                                </div>
                                <p class="review-text" style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">
                                    "${rev.text}"
                                </p>
                            </div>
                        `).join('');
                    }

                    // Start Timer
                    const timerDisplay = document.getElementById('offer-timer-display-bottom');
                    if (timerDisplay) {
                        let timeLeft = 15 * 60; // 15 mins
                        const timerInterval = setInterval(() => {
                            timeLeft--;
                            if (timeLeft <= 0) {
                                clearInterval(timerInterval);
                                timerDisplay.innerText = "00:00";
                            } else {
                                const m = Math.floor(timeLeft / 60);
                                const s = timeLeft % 60;
                                timerDisplay.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
                            }
                        }, 1000);
                    }
"""

checkout_idx = text.find('// DIRECT SALES CHECKOUT LOGIC (natal_chart_sale)')
if checkout_idx != -1:
    post_render_idx = text.find("if (variant.id === 'natal_chart_sale') {", checkout_idx)
    if post_render_idx != -1:
        insert_idx = text.find('const timeInput =', post_render_idx)
        text = text[:insert_idx] + js_logic + "\n        " + text[insert_idx:]

with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Patch successful!")
