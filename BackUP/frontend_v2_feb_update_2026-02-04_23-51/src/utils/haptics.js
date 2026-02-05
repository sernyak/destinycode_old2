
class HapticsController {
    constructor() {
        this.audioCtx = null;
        this.isAudioUnlocked = false;

        // Check for vibration support (Android usually)
        // Note: iOS Safari reports false for navigator.vibrate
        this.canVibrate = typeof navigator !== 'undefined' && 'vibrate' in navigator;

        // 🍎 iOS Detection: Disable audio haptics on iOS (users complain about sound)
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        this.tickBuffer = null;
        this.hasInitialized = false;
    }

    /**
     * Initializes the AudioContext. Should be called on first user interaction.
     */
    init(forced = false) {
        if (this.hasInitialized && !forced) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
                this._createTickBuffer();
                this.hasInitialized = true;

                // Try to unlock immediately
                this._unlock();
            }
        } catch (e) {
            console.warn('Haptics: Web Audio API not supported', e);
        }
    }

    _createTickBuffer() {
        if (!this.audioCtx) return;

        // Create a short, low-frequency pulse (Simulated Taptic Engine)
        // 150Hz is the "Sweet Spot" for tactile illusion (Thump vs Click)
        const sampleRate = this.audioCtx.sampleRate;
        const length = Math.floor(0.015 * sampleRate); // 15ms duration
        const buffer = this.audioCtx.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        const frequency = 150;

        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            // Sine wave at 150Hz
            const wave = Math.sin(2 * Math.PI * frequency * t);

            // Envelope: Fast Attack (10%), Decay (90%)
            // This shape creates the "punchy" feeling
            let envelope = 1;
            if (i < length * 0.1) {
                envelope = i / (length * 0.1);
            } else {
                envelope = 1 - (i - length * 0.1) / (length * 0.9);
            }

            data[i] = wave * envelope;
        }

        this.tickBuffer = buffer;
    }

    _unlock() {
        if (this.isAudioUnlocked || !this.audioCtx) return;

        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume().then(() => {
                this.isAudioUnlocked = true;
            }).catch(e => console.log("Audio unlock failed, waiting for next interaction"));
        } else {
            this.isAudioUnlocked = true;
        }
    }

    /**
     * Trigger haptic feedback.
     * @param {('light'|'medium'|'heavy'|'success'|'error')} type - Type of feedback
     */
    trigger(type = 'light') {
        // 1. Android / Native Vibrate
        if (this.canVibrate) {
            try {
                switch (type) {
                    case 'light': navigator.vibrate(10); break;
                    case 'medium': navigator.vibrate(20); break;
                    case 'heavy': navigator.vibrate(40); break;
                    case 'success': navigator.vibrate([10, 50, 20]); break;
                    case 'error': navigator.vibrate([50, 100, 50]); break;
                    default: navigator.vibrate(15);
                }
            } catch (e) { /* ignore */ }
            return;
        }

        // 🍎 iOS: Skip audio haptics entirely (users complain about button click sounds)
        if (this.isIOS) {
            return;
        }

        // 2. Desktop / Non-iOS Fallback -> Audio Haptics
        if (this.audioCtx && this.tickBuffer) {
            // Ensure unlocked
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            const source = this.audioCtx.createBufferSource();
            source.buffer = this.tickBuffer;
            const gainNode = this.audioCtx.createGain();

            // Tuning for "Physicality"
            // Heavy = Louder + Lower Pitch (Thump)
            // Light = Quieter + Higher Pitch (Tick)

            let volume = 1.0;
            let pitch = 1.0;

            switch (type) {
                case 'light':
                    volume = 0.6;   // Subtler
                    pitch = 1.2;    // Crisper tick
                    break;
                case 'medium':
                    volume = 0.8;
                    pitch = 1.0;    // Standard thump
                    break;
                case 'heavy':
                    volume = 1.0;   // Full impact
                    pitch = 0.8;    // Deeper thud
                    break;
                case 'success':
                    // Double thump: Light -> Heavy
                    this._playTone(0.6, 1.2, 0);
                    setTimeout(() => this._playTone(1.0, 1.0, 0.1), 80);
                    return;
                case 'error':
                    // Triple quick vibration
                    this._playTone(0.8, 0.8, 0);
                    setTimeout(() => this._playTone(0.8, 0.8, 0.08), 80);
                    setTimeout(() => this._playTone(0.8, 0.8, 0.16), 160);
                    return;
            }

            source.playbackRate.value = pitch;

            // Simple gain envelope to prevent clicking at end
            gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
            // Quick fade out just in case
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

            source.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);

            source.start();
        }
    }

    // Helper for complex patterns
    _playTone(volume, pitch, delay) {
        if (!this.audioCtx || !this.tickBuffer) return;

        const source = this.audioCtx.createBufferSource();
        source.buffer = this.tickBuffer;
        source.playbackRate.value = pitch;

        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime + delay);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + delay + 0.05);

        source.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        source.start(this.audioCtx.currentTime + delay);
    }
}

// Global Singleton
export const haptics = new HapticsController();
