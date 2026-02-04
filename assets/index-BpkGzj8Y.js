const a={id:"december",type:"month",ui:{},aiContext:{},tracking:{campaignName:"horoscope_december_2026",customPixelEvent:"ViewContent_December"}},n={id:"february",type:"month",enabled:!0,ui:{},aiContext:{},tracking:{campaignName:"horoscope_february_2026",customPixelEvent:"ViewContent_February"}},r={id:"1uah",type:"internal_test",enabled:!0,ui:{},aiContext:{},pricing:{display:{FORECAST_UPSELL:97,FORECAST_OLD:570},charge:{FULL_REPORT:1,FORECAST_UPSELL:1}},tracking:{campaignName:"internal_test_1uah",customPixelEvent:"ViewContent_InternalTest"}},i={id:"dev",type:"development",enabled:!0,ui:{},aiContext:{},tracking:{campaignName:"development_testing",customPixelEvent:"ViewContent_Dev"}},o={id:"natal_chart",type:"product",enabled:!0,ui:{heroTitle:`НАТАЛЬНА КАРТА
<br><span class="text-xl font-bold opacity-90">твоя інструкція до щасливого життя</span>`,heroSubtitle:`Обери дату народження, щоб отримати повну розшифровку свого потенціалу та долі.
<br><br>
❤️ <span class="text-white">Кохання:</span> Твій ідеальний партнер та сценарії стосунків.
<hr class="my-2 w-1/5 mx-auto border-white/20">
💸 <span class="text-white">Фінанси:</span> Де сховані твої великі гроші та кар'єрний успіх.
<hr class="my-2 w-1/5 mx-auto border-white/20">
🔮 <span class="text-white">Призначення:</span> Твої кармічні задачі та істинний шлях душі.
<hr class="my-2 w-1/5 mx-auto border-white/20">
✨ <span class="text-white">Особистість:</span> Твої приховані таланти та суперсили.`},aiContext:{},tracking:{campaignName:"natal_chart_main",customPixelEvent:"ViewContent_NatalChart"}},s={id:"natal-chart",type:"product",enabled:!0,ui:{heroTitle:`ТВОЯ
<br>НАТАЛЬНА КАРТА
<br><span id="hero-subtitle-cta" class="relative text-base font-medium opacity-90 border border-white/20 rounded-lg px-3 py-1 inline-block mt-2 cursor-pointer hover:bg-white/5 transition-colors">інструкція до щасливого життя</span>`,heroSubtitle:"Обери дату народження, щоб отримати повну розшифровку свого потенціалу та долі.",heroFeatures:`<div class="mt-8 text-lg" style="color: var(--secondary-text-color);">
❤️ <span class="text-white">Кохання:</span> Твій ідеальний партнер та сценарії стосунків.
<hr class="my-2 w-1/5 mx-auto border-white/20">
💸 <span class="text-white">Фінанси:</span> Де сховані твої великі гроші та кар'єрний успіх.
<hr class="my-2 w-1/5 mx-auto border-white/20">
🔮 <span class="text-white">Призначення:</span> Твої кармічні задачі та істинний шлях душі.
<hr class="my-2 w-1/5 mx-auto border-white/20">
✨ <span class="text-white">Особистість:</span> Твої приховані таланти та суперсили.
</div>`},aiContext:{},tracking:{campaignName:"natal_chart_hyphen",customPixelEvent:"ViewContent_NatalChartHyphen"}},c={id:"forecast",type:"product",enabled:!0,ui:{},aiContext:{},tracking:{campaignName:"forecast_2026",customPixelEvent:"ViewContent_Forecast"}},l={december:a,february:n,"1uah":r,natal_chart:s,"natal-chart":o,forecast:c,dev:i};function p(){const e=window.location.pathname.replace(/^\/|\/$/g,""),t=l[e];return t&&t.enabled!==!1?t:(t&&t.enabled===!1&&console.log(`📝 Variant "${e}" is a DRAFT (disabled)`),null)}export{l as VARIANTS,p as getVariantByUrl};
