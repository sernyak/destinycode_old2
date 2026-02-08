/**
 * 🌟 ZODIAC UTILITY
 * Визначає знак зодіаку за датою народження
 */

const ZODIAC_SIGNS = [
    { id: 'capricorn', name: 'Козеріг', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { id: 'aquarius', name: 'Водолій', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { id: 'pisces', name: 'Риби', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { id: 'aries', name: 'Овен', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { id: 'taurus', name: 'Телець', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { id: 'gemini', name: 'Близнюки', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { id: 'cancer', name: 'Рак', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { id: 'leo', name: 'Лев', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { id: 'virgo', name: 'Діва', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { id: 'libra', name: 'Терези', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { id: 'scorpio', name: 'Скорпіон', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    { id: 'sagittarius', name: 'Стрілець', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 }
];

/**
 * Повертає знак зодіаку для дати
 * @param {string} dateString - Дата у форматі YYYY-MM-DD
 * @returns {{ id: string, name: string }} Об'єкт знаку зодіаку
 */
export function getZodiacSign(dateString) {
    if (!dateString) return ZODIAC_SIGNS[0]; // Default: Capricorn

    const parts = dateString.split('-');
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // Козеріг перетинає рік (грудень-січень), тому обробляємо окремо
    const capricorn = ZODIAC_SIGNS[0];
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return capricorn;
    }

    // Шукаємо відповідний знак
    for (const sign of ZODIAC_SIGNS) {
        if (sign.id === 'capricorn') continue; // Вже обробили

        if (
            (month === sign.startMonth && day >= sign.startDay) ||
            (month === sign.endMonth && day <= sign.endDay)
        ) {
            return sign;
        }
    }

    // Fallback
    console.warn(`[Zodiac] Could not determine sign for ${dateString}, defaulting to Aries`);
    return ZODIAC_SIGNS[3]; // Aries
}
