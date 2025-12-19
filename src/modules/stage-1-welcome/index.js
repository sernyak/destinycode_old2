import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { initAstroLib } from '../../utils/astro-lib-loader.js';

export function init(router) {
    const app = document.getElementById('app');
    
    // 🔥 Ensure the wrapper matches monolith flex layout if not already set
    app.classList.add('funnel-container');
    
    app.innerHTML = html;

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
    if (openInfoBtn) openInfoBtn.addEventListener('click', openInfoModal);
    if (closeInfoIcon) closeInfoIcon.addEventListener('click', closeInfoModal);
    if (closeInfoBtn) closeInfoBtn.addEventListener('click', closeInfoModal);

    if (closeLegalIcon) closeLegalIcon.addEventListener('click', closeLegalModal);
    if (closeLegalBtn) closeLegalBtn.addEventListener('click', closeLegalModal);

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
    // FORM LOGIC (Original Preserved)
    // ==========================================

    // --- 1. Logic: Date Placeholder (Exact from Monolith) ---
    function updateDatePlaceholder() {
        const val = birthDateInput.value;
        if (!val) {
            // 🔥 FIX: Текст має бути саме "Обрати дату народження" як в JS моноліту
            datePlaceholder.innerText = 'Обрати дату народження';
            datePlaceholder.style.color = 'var(--secondary-text-color)';
        } else {
            const parts = val.split('-');
            if (parts.length === 3) {
                const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
                datePlaceholder.innerText = formattedDate;
                datePlaceholder.style.color = 'var(--primary-text-color)';
            }
        }
    }

    // --- 2. Logic: Default Date Focus (Exact from Monolith) ---
    function setDefaultDateOnFirstFocus() {
        if (birthDateInput.value === '') {
            console.log("Setting default date to 1995-01-01 for convenience.");
            birthDateInput.value = '1995-01-01';
            // Also need to trigger placeholder update immediately after setting value
            updateDatePlaceholder();
        }
    }

    // --- Listeners ---
    birthDateInput.addEventListener('input', updateDatePlaceholder);
    birthDateInput.addEventListener('change', updateDatePlaceholder);
    birthDateInput.addEventListener('blur', updateDatePlaceholder);
    // iOS Fix
    birthDateInput.addEventListener('touchend', () => setTimeout(updateDatePlaceholder, 500));

    birthDateInput.addEventListener('focus', setDefaultDateOnFirstFocus);
    birthDateInput.addEventListener('click', setDefaultDateOnFirstFocus);
    birthDateInput.addEventListener('touchstart', setDefaultDateOnFirstFocus);

    // Initial call
    updateDatePlaceholder();

    // --- 3. Logic: Form Submit (Exact from Monolith Logic) ---
    birthForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Завдяки novalidate в HTML ця подія спрацює навіть при порожньому полі
        const selectedDate = birthDateInput.value;

        if (selectedDate === '') {
            errorMessage.innerText = "Будь ласка, обери дату народження.";
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            
            // Save state
            state.set('date', selectedDate);

            // Button Loading State
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
            // Non-blocking call to ensure it starts loading if not already
            initAstroLib(); 

            // 🔥 CRITICAL FIX: Removed setTimeout(500ms) delay. 
            // Monolith does `showStep('loading')` immediately.
            router.navigateTo('loading');
        }
    });
}