/**
 * State Management (Singleton)
 * Зберігає дані сесії в пам'яті та sessionStorage, щоб пережити перезавантаження (напр. після оплати).
 */

class State {
    constructor() {
        this.storageKey = 'destinyUser';
        this.trafficKey = 'destiny_traffic_source'; // 🛰️ Backup for Ads tracking
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

        // 🔥 CRITICAL BACKUP: Save traffic_type to LocalStorage
        // This ensures the session survived even if SessionStorage is wiped during bank redirect.
        if (key === 'traffic_type') {
            try {
                localStorage.setItem(this.trafficKey, value);
            } catch (e) {
                console.warn('LocalStorage backup failed');
            }
        }
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