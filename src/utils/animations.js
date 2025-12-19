/**
 * Ефект друкарської машинки (Typewriter)
 * @param {HTMLElement} element - куди пишемо текст
 * @param {HTMLElement} cursorElement - елемент курсору (блимаюча паличка)
 * @param {string} text - текст для друку
 * @param {number} speed - швидкість (мс на символ)
 * @param {number} pauseAfter - пауза після завершення (мс)
 * @param {boolean} keepCursorBlinking - чи залишати курсор після завершення
 */
export function typeWriter(element, cursorElement, text, speed = 50, pauseAfter = 0, keepCursorBlinking = false) {
    return new Promise(resolve => {
        let i = 0;
        if (cursorElement) cursorElement.style.display = 'inline-block';
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    if (!keepCursorBlinking && cursorElement) {
                        cursorElement.style.display = 'none';
                    }
                    resolve();
                }, pauseAfter);
            }
        }

        type();
    });
}