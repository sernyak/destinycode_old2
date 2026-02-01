/**
 * 🛠️ DEV - Режим розробки для тестування
 */
export const devConfig = {
    id: 'dev',
    type: 'development',
    enabled: true, // ✅ Активний

    ui: {},
    aiContext: {},

    tracking: {
        campaignName: 'development_testing',
        customPixelEvent: 'ViewContent_Dev'
    }
};
