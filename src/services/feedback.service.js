/**
 * Feedback Service (Firebase Integrated)
 * Handles submission of user feedback (Like/Dislike, Text comments) to Firestore.
 */
import { Logger } from '../utils/logger.js';
import { state } from '../utils/state.js';

// 🔥 FIREBASE SDK (Local Imports for Vite Build)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

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
     * Submit feedback to Firestore (Unique per email + source)
     * @param {Object} payload 
     * @param {string} payload.type - 'like' | 'dislike' | 'text'
     * @param {string} [payload.value] - Optional text comment
     * @param {string} [payload.source] - 'free_report' | 'premium_report' | etc.
     */
    async send(payload) {
        const database = getDb();
        if (!database) {
            console.warn("Feedback skipped: DB not ready");
            return;
        }

        const email = state.get('email') || null; // 🔥 Fix: Firestore errors on undefined
        const source = payload.source || 'general';

        // 🔥 SESSION ID (Unique per browser tab context)
        // One Session = One Vote. New Session (New Tab/Restart) = New Vote.
        let sessionId = sessionStorage.getItem('dc_feedback_session_id');
        if (!sessionId) {
            sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
            sessionStorage.setItem('dc_feedback_session_id', sessionId);
        }

        // 🔥 DOC ID: One record per SESSION per source
        const docId = `feedback_${sessionId}_${source}`;

        const data = {
            ...payload,
            email,
            timestamp: serverTimestamp(),
            localTime: new Date().toISOString(),
            userAgent: navigator.userAgent,
            path: window.location.pathname
        };

        try {
            // 🔥 Full overwrite (not merge) so like->dislike properly replaces
            await setDoc(doc(database, "web_feedback", docId), data);
            Logger.log('📝 [Feedback Updated/Saved]:', docId, data);
        } catch (e) {
            console.error("Feedback Save Error:", e);
        }
    }
};
