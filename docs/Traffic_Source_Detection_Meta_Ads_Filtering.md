# Traffic Source Detection & Meta Ads Conversion Filtering

**Впроваджено:** 18.03.2026 | **Файли:** `src/main.js`, `src/services/payment.service.js`, `functions/src/triggers/payments.js`

## Мета

Відправляти подію `purchase` в Meta Ads (через GTM) **тільки** для трафіку з реклами. Органічні покупки (Біо Instagram, прямі заходи) не потрапляють у рекламний кабінет.

## Архітектура

```
[Користувач заходить на сайт]
        │
        ▼
detectTrafficSource() ─── Перевіряє fbclid / referrer / UTM
        │
        ├── fbclid є? ──────────► traffic_type = "paid"
        ├── IG referrer без fbclid? ► traffic_type = "organic"
        └── Інше? ──────────────► traffic_type = "organic"
        │
        ▼
[Зберігає в sessionStorage]
        │
        ▼
[Користувач оплачує]
        │
        ▼
trackPurchase() ─── Перевіряє traffic_type
        │
        ├── "paid"? ────► dataLayer.push({ event: 'purchase' })  ✅ Meta бачить
        └── "organic"? ─► Logger.log("Skip") ❌ Meta НЕ бачить
        │
        ▼
[purchase_audit] ── Завжди відправляється для власного аудиту (GTM/GA4)
```

## Додаткові захисти (value-based)

- `value <= 1` → блокує тестові оплати (1 грн)
- `skipMetaTracking: true` у конфігу варіанту → блокує явно
- Список тестових ID: `['1uah', 'man1uah', 'forecast']`

## Аудит

Кожне замовлення зберігає `trafficSource` в Firestore (collection `orders`).

**Повна документація:** `knowledge_base/Система розділення трафіку Ads vs Bio (Meta Ads Conversion Filtering).md`
