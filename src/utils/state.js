/**
 * State Management (Singleton)
 * Зберігає дані сесії в пам'яті та sessionStorage, щоб пережити перезавантаження (напр. після оплати).
 */

class State {
    constructor() {
        this.storageKey = 'destinyUser';
        this.data = this.load();
    }

    load() {
        try {
            const stored = sessionStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.warn('SessionStorage disabled or inaccessible');
            return {};
        }
    }

    save() {
        try {
            sessionStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (e) {
            console.warn('Failed to save to SessionStorage');
        }
    }

    /**
     * Отримати значення
     * @param {string} key 
     */
    get(key) {
        return this.data[key];
    }

    /**
     * Зберегти значення
     * @param {string} key 
     * @param {any} value 
     */
    set(key, value) {
        this.data[key] = value;
        this.save();
    }

    /**
     * Очистити дані (наприклад, при "Почати заново")
     */
    clear() {
        this.data = {};
        sessionStorage.removeItem(this.storageKey);
    }
}

export const state = new State();