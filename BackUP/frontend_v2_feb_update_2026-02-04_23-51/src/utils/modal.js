/**
 * Global Modal Utility
 * Відтворює функціонал showModal() з моноліту.
 * Динамічно додає розмітку модального вікна в DOM, якщо її немає.
 */

import '../styles/main.css'; // Переконуємось, що стилі завантажені

export function initGlobalModal() {
    if (document.getElementById('global-info-modal')) return;

    const modalHtml = `
    <div id="global-info-modal" class="modal-overlay">
        <div class="modal-content">
            <h3 id="global-modal-title" class="text-2xl font-bold text-white mb-4">Повідомлення</h3>
            <p id="global-modal-message" class="text-[#a0a0a0] mb-6 text-sm leading-relaxed">
                ...
            </p>
            <button id="global-modal-close" class="btn btn-secondary w-full py-3">
                <span class="btn-text">Зрозуміло</span>
            </button>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('global-info-modal');
    const closeBtn = document.getElementById('global-modal-close');

    // Close Logic
    const close = () => { modal.style.display = 'none'; };
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });
}

export function showModal(title, message) {
    // Ensure HTML exists
    initGlobalModal();

    const modal = document.getElementById('global-info-modal');
    const titleEl = document.getElementById('global-modal-title');
    const msgEl = document.getElementById('global-modal-message');

    if (modal && titleEl && msgEl) {
        titleEl.innerText = title;
        msgEl.innerHTML = message; // Allow HTML
        modal.style.display = 'flex';
    } else {
        // Fallback just in case
        alert(`${title}\n\n${message}`);
    }
}