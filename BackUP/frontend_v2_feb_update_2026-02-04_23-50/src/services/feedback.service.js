/**
 * Feedback Service (Firebase Integrated)
 * Handles submission of user feedback (Like/Dislike, Text comments) to Firestore.
 */
import { Logger } from '../utils/logger.js';
import { state } from '../utils/state.js';

// 🔥 FIREBASE SDK (CDN Imports to avoid build issues)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 FIREBASE CONFIG
const firebaseConfig = {
    projectId: "destinycode-982fa",
    appId: "1:168629222416:web:3283f6a4051f57a85c9e95",
    storageBucket: "destinycode-982fa.firebasestorage.app",
    apiKey: "AIzaSyA20BvSogSuHTni09Y54HwmlpG7UKXuxk8",
    authDomain: "destinycode-982fa.firebaseapp.com",
    messagingSenderId: "168629222416",
    measurementId: "G-ZKS4RCNFGX"
};

// Singleton Initialization
let db = null;

function getDb() {
    if (!db) {
        try {
            const app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            Logger.log("🔥 FeedbackService: Firebase initialized.");
        } catch (e) {
            console.error("Firebase Init Error:", e);
        }
    }
    return db;
}

export const feedbackService = {
    /**
     * Submit feedback to Firestore
     * @param {Object} payload 
     * @param {string} payload.type - 'like' | 'dislike' | 'text'
     * @param {string} [payload.value] - Optional text comment
     */
    async send(payload) {
        const database = getDb();
        if (!database) {
            console.warn("Feedback skipped: DB not ready");
            return;
        }

        const data = {
            ...payload,
            email: state.get('email') || 'anonymous',
            timestamp: serverTimestamp(), // Server time
            localTime: new Date().toISOString(),
            userAgent: navigator.userAgent,
            path: window.location.pathname
        };

        try {
            await addDoc(collection(database, "web_feedback"), data);
            Logger.log('📝 [Feedback Saved]:', data);
        } catch (e) {
            console.error("Feedback Save Error:", e);
        }
    }
};
