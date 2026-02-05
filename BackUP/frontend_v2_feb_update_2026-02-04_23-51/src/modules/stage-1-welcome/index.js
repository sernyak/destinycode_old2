import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { haptics } from '../../utils/haptics.js';
import { initAstroLib } from '../../utils/astro-lib-loader.js';
// 🔥 StarryBackground тепер ініціалізується глобально в main.js


export function init(router) {
    const app = document.getElementById('app');

    // 🔥 Ensure the wrapper matches monolith flex layout if not already set
    app.classList.add('funnel-container')

    app.innerHTML = html;

    // --- 🔥 DYNAMIC CONTENT INJECTION (SMART ROUTING) ---
    // --- 🔥 DYNAMIC CONTENT INJECTION (SMART ROUTING) ---
    try {
        const variant = state.get('currentVariant');
        if (variant && variant.ui) {
            console.log("🎨 Applying Variant UI Overrides:", variant.id);

            // Selectors based on current HTML structure
            const titleEl = document.querySelector('h2');
            const subtitleEl = document.querySelector('p.text-lg');
            const btnTextEl = document.querySelector('#birth-form button .btn-text');

            if (titleEl && variant.ui.heroTitle) {
                titleEl.innerHTML = variant.ui.heroTitle;
                // 🎨 Make title lighter (semibold instead of bold) + Inter font
                titleEl.classList.remove('font-bold');
                titleEl.classList.add('font-semibold');
                titleEl.style.fontFamily = "'Inter', sans-serif";

                // --- ➕ HERO PRE-TITLE (Text BEFORE Title) ---
                if (variant.ui.heroPreTitle) {
                    const preTitle = document.createElement('p');
                    // 🎨 Design: Gold accent, normal case, elegant spacing
                    preTitle.className = 'text-base font-semibold mb-3';
                    preTitle.style.cssText = 'color: #cda45e; letter-spacing: 0.5px;';
                    preTitle.innerHTML = variant.ui.heroPreTitle;
                    if (titleEl.parentNode) {
                        titleEl.parentNode.insertBefore(preTitle, titleEl);
                    }
                }
            }
            if (subtitleEl && variant.ui.heroSubtitle) {
                subtitleEl.innerHTML = variant.ui.heroSubtitle;
            }
            if (btnTextEl && variant.ui.buttonText) {
                btnTextEl.innerText = variant.ui.buttonText;
            }

            // --- 🎨 BACKGROUND OVERRIDE ---
            if (variant.ui.backgroundColor) {
                console.log("🖌️ Applying Variant Background Color:", variant.ui.backgroundColor);
                document.body.style.backgroundColor = variant.ui.backgroundColor;
            }

            // --- ➕ HERO FEATURES (Text AFTER Form) ---
            if (variant.ui.heroFeatures) {
                // Find container to append features
                const birthForm = document.getElementById('birth-form');
                if (birthForm && birthForm.parentNode) {
                    const featuresContainer = document.createElement('div');
                    featuresContainer.innerHTML = variant.ui.heroFeatures;

                    // Insert AFTER form using parent
                    birthForm.parentNode.insertBefore(featuresContainer, birthForm.nextSibling);
                }
            }

            // --- 🖱️ INTERACTIVE SUBTITLE CTA ---
            const ctaSubtitle = document.getElementById('hero-subtitle-cta');
            if (ctaSubtitle) {
                ctaSubtitle.addEventListener('click', () => {
                    haptics.trigger('light');
                    const dateInputContainer = document.querySelector('.input-field');
                    if (dateInputContainer) {
                        dateInputContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        // Add pulse/shake animation
                        dateInputContainer.classList.remove('animate-pulse'); // reset

                        // 🔥 Reset animation to allow re-triggering
                        dateInputContainer.style.animation = 'none';
                        void dateInputContainer.offsetHeight; // force reflow

                        // Custom heavy pulse animation
                        dateInputContainer.style.animation = 'gentle-shake 0.5s ease-in-out 2';
                    }
                });
            }
        }
    } catch (err) {
        console.error("❌ Error applying variant UI:", err);
    }

    // 🔥 GLOBAL ANIMATION STYLES (Always Injected)
    if (!document.getElementById('global-anim-styles')) {
        const style = document.createElement('style');
        style.id = 'global-anim-styles';
        style.innerHTML = `
            @keyframes gentle-shake {
                0%, 100% { transform: translateX(0); box-shadow: 0 0 0 0 rgba(205, 164, 94, 0); }
                25% { transform: translateX(-5px) rotate(-1deg); }
                75% { transform: translateX(5px) rotate(1deg); box-shadow: 0 0 20px 0 rgba(205, 164, 94, 0.5); }
            }

            /* 🌬️ "Mystic Breath" for Subtitle (used only if element exists) */
            @keyframes mystic-breath {
                0%, 100% { 
                    transform: scale(1); 
                    box-shadow: 0 0 0 rgba(255,255,255,0);
                    border-color: rgba(255,255,255,0.2);
                }
                50% { 
                    transform: scale(0.98); /* Squeeze inward */
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); /* Very subtle glow */
                    border-color: rgba(255,255,255,0.5);
                }
            }
            #hero-subtitle-cta {
                animation: mystic-breath 6s ease-in-out infinite;
            }

            /* ✨ "Star Shine" for Date Input Field ONLY (Stage 1) */
            /* Excludes time input on Stage 4 */
            #landing-step .input-field {
                position: relative;
                overflow: hidden;
            }
            #landing-step .input-field::after {
                content: "";
                position: absolute;
                top: 0;
                left: -50px;
                width: 17px;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.8),
                    transparent
                );
                transform: skewX(-25deg);
                animation: shine-anim 11s infinite;
                animation-delay: 3s;
                pointer-events: none;
                z-index: 5; 
            }
            
            /* ✨ "Star Shine" Restored (Scoped to .shine-effect) */
            .shine-effect {
                position: relative;
                overflow: hidden;
            }
            .shine-effect::after {
                content: "";
                position: absolute;
                top: 0;
                left: -50px;
                width: 17px;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.8),
                    transparent
                );
                transform: skewX(-25deg);
                animation: shine-anim 11s infinite;
                animation-delay: 3s;
                pointer-events: none;
                z-index: 5; 
            }
            
            @keyframes shine-anim {
                0% { left: -50px; }
                45% { left: 150%; } 
                100% { left: 150%; }
            }
        `;
        document.head.appendChild(style);
    }

    // --- DOM Elements (Form) ---
    const birthForm = document.getElementById('birth-form');
    const birthDateInput = document.getElementById('birth-date');
    const errorMessage = document.getElementById('error-message');
    const datePlaceholder = document.getElementById('date-placeholder');
    const landingSubmitButton = birthForm.querySelector('button[type="submit"]');

    // --- DOM Elements (Modals) ---
    const infoModal = document.getElementById('info-modal');
    const legalModal = document.getElementById('legal-modal');

    // Triggers
    const openInfoBtn = document.getElementById('open-info-modal-btn');
    const closeInfoIcon = document.getElementById('close-info-modal-icon');
    const closeInfoBtn = document.getElementById('close-info-modal-btn');

    const closeLegalIcon = document.getElementById('close-legal-modal-icon');
    const closeLegalBtn = document.getElementById('close-legal-modal-btn');
    const legalModalBody = document.getElementById('legal-modal-body');

    const legalLinks = document.querySelectorAll('.legal-link[data-legal-type]');

    // ==========================================
    // FORM VALIDATION & LOGIC
    // ==========================================

    if (birthDateInput) {
        // 🔥 Existing logic for validation styling can go here if needed

        // 🆕 Animate Button on Date Selection (Done / Blur)
        birthDateInput.addEventListener('blur', (e) => {
            if (e.target.value) {
                // haptics.trigger('success'); // ❌ REMOVED to avoid double trigger with button click
                // User finished selecting date -> "Gentle Shake" animation

                // Reset animation (smart way without visible delay)
                landingSubmitButton.style.animation = 'none';

                requestAnimationFrame(() => {
                    // Apply shake instantly in the next frame
                    landingSubmitButton.style.animation = 'gentle-shake 0.5s ease-in-out 2';
                });

                // Clean up inline style after animation completes to avoid interference
                setTimeout(() => {
                    landingSubmitButton.style.animation = '';
                }, 1000);
            }
        });

        // Ensure standard submit behavior is not blocked unless verified
    }

    // ==========================================
    // MODAL LOGIC (Smart Copy-Paste)
    // ==========================================

    function openInfoModal() {
        if (infoModal) infoModal.style.display = 'flex';
    }

    function closeInfoModal() {
        if (infoModal) infoModal.style.display = 'none';
    }

    function openLegalModal(type) {
        const content = document.getElementById('legal-content-' + type);
        if (content && legalModal && legalModalBody) {
            legalModalBody.innerHTML = content.innerHTML;
            legalModal.style.display = 'flex';
        }
    }

    function closeLegalModal() {
        if (legalModal) legalModal.style.display = 'none';
    }

    // Attach Listeners
    if (openInfoBtn) openInfoBtn.addEventListener('click', () => { haptics.trigger('light'); openInfoModal(); });
    if (closeInfoIcon) closeInfoIcon.addEventListener('click', () => { haptics.trigger('light'); closeInfoModal(); });
    if (closeInfoBtn) closeInfoBtn.addEventListener('click', () => { haptics.trigger('light'); closeInfoModal(); });

    if (closeLegalIcon) closeLegalIcon.addEventListener('click', () => { haptics.trigger('light'); closeLegalModal(); });
    if (closeLegalBtn) closeLegalBtn.addEventListener('click', () => { haptics.trigger('light'); closeLegalModal(); });

    // Close on overlay click
    if (infoModal) {
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) closeInfoModal();
        });
    }
    if (legalModal) {
        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) closeLegalModal();
        });
    }

    // Legal Links Transition Logic (Info -> Legal)
    legalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const type = e.target.getAttribute('data-legal-type');
            closeInfoModal();
            setTimeout(() => {
                openLegalModal(type);
            }, 50); // Slight delay for smoother transition
        });
    });

    // ==========================================
    // FORM LOGIC (Modified for smooth UX)
    // ==========================================

    // --- 1. Logic: Date Placeholder ---
    function updateDatePlaceholder() {
        const val = birthDateInput.value;
        if (!val) {
            datePlaceholder.innerText = 'Обрати дату народження';
            datePlaceholder.style.color = 'var(--secondary-text-color)';
        } else {
            const parts = val.split('-');
            if (parts.length === 3) {
                const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
                datePlaceholder.innerText = formattedDate;
                datePlaceholder.style.color = 'var(--primary-text-color)';

                // 🔥 FIX: Hide error immediately when date is selected
                if (errorMessage) errorMessage.style.display = 'none';
            }
        }
    }

    // --- 2. Logic: Default Date Focus (Silent Set) ---
    function setDefaultDateOnFirstFocus() {
        if (birthDateInput.value === '') {
            // 🔥 Ми ставимо значення ТІЛЬКИ для того, щоб нативний календар
            // відкрився на 1995 році. Але ми НЕ оновлюємо текст на екрані.
            // Користувач все ще бачить "Обрати дату".
            birthDateInput.value = '1995-01-01';

            // ❌ ВИДАЛЕНО: updateDatePlaceholder() тут не викликаємо!
        }
    }

    // --- Listeners ---

    // Оновлюємо текст тільки коли користувач реально щось змінив
    birthDateInput.addEventListener('input', updateDatePlaceholder);
    birthDateInput.addEventListener('change', updateDatePlaceholder);

    // Blur важливий: якщо юзер відкрив календар (там стало 1995), нічого не крутив
    // і натиснув "Готово", подія change може не спрацювати, але blur спрацює.
    // Тоді ми покажемо дату.
    birthDateInput.addEventListener('blur', updateDatePlaceholder);

    // 🔥 FIX: Прибираємо агресивний iOS фікс з setTimeout, 
    // який викликав "стрибок" тексту через 0.5с після кліку.
    // birthDateInput.addEventListener('touchend', ...); <--- REMOVED

    // Тригери для встановлення дефолтного року в календарі
    birthDateInput.addEventListener('focus', setDefaultDateOnFirstFocus);
    birthDateInput.addEventListener('click', setDefaultDateOnFirstFocus);
    birthDateInput.addEventListener('touchstart', setDefaultDateOnFirstFocus);

    // Initial call (щоб скинути, якщо браузер запам'ятав щось)
    updateDatePlaceholder();

    // --- 3. Logic: Form Submit ---
    birthForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        haptics.trigger('heavy');
        const selectedDate = birthDateInput.value;

        if (selectedDate === '') {
            haptics.trigger('error');
            errorMessage.innerText = "Будь ласка, обери дату народження.";
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';

            state.set('date', selectedDate);

            function setButtonLoading(button, isLoading) {
                if (isLoading) {
                    button.classList.add('loading');
                    button.disabled = true;
                } else {
                    button.classList.remove('loading');
                    button.disabled = false;
                }
            }

            setButtonLoading(landingSubmitButton, true);

            // Init Astro Lib (Modular adaptation)
            initAstroLib();

            router.navigateTo('loading');
        }
    });
}