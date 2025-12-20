(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();class J{constructor(){this.routes={},this.currentStage=null,this.appContainer=document.getElementById("app")}register(n,o){this.routes[n]=o}navigateTo(n,o={}){if(!this.routes[n]){console.error(`Маршрут "${n}" не знайдено.`),n!=="welcome"&&(console.warn("Redirecting to welcome screen..."),this.navigateTo("welcome"));return}if(console.log(`Navigating to: ${n}`),this.appContainer){this.appContainer.innerHTML="";try{this.routes[n](this,o),this.currentStage=n,window.scrollTo(0,0)}catch(t){console.error(`Error initializing stage "${n}":`,t),this.appContainer.innerHTML='<div class="p-4 text-center text-red-500">Сталася помилка при завантаженні екрану. Будь ласка, оновіть сторінку.</div>'}}else console.error("CRITICAL: App container #app not found in DOM!")}}const C=new J;class G{constructor(){this.storageKey="destinyUser",this.data=this.load()}load(){try{const n=sessionStorage.getItem(this.storageKey);return n?JSON.parse(n):{}}catch{return console.warn("SessionStorage disabled or inaccessible"),{}}}save(){try{sessionStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch{console.warn("Failed to save to SessionStorage")}}get(n){return this.data[n]}set(n,o){this.data[n]=o,this.save()}clear(){this.data={},sessionStorage.removeItem(this.storageKey)}}const d=new G;function D(){if(document.getElementById("global-info-modal"))return;document.body.insertAdjacentHTML("beforeend",`
    <div id="global-info-modal" class="modal-overlay">
        <div class="modal-content">
            <h3 id="global-modal-title" class="text-2xl font-bold text-white mb-4">Повідомлення</h3>
            <p id="global-modal-message" class="text-[#a0a0a0] mb-6 text-sm leading-relaxed">
                ...
            </p>
            <button id="global-modal-close" class="btn btn-secondary w-full py-3">
                <span class="btn-text">Зрозуміло</span>
            </button>
        </div>
    </div>
    `);const n=document.getElementById("global-info-modal"),o=document.getElementById("global-modal-close"),t=()=>{n.style.display="none"};o.addEventListener("click",t),n.addEventListener("click",e=>{e.target===n&&t()})}function N(s,n){D();const o=document.getElementById("global-info-modal"),t=document.getElementById("global-modal-title"),e=document.getElementById("global-modal-message");o&&t&&e?(t.innerText=s,e.innerHTML=n,o.style.display="flex"):alert(`${s}

${n}`)}const K=`<section id="landing-step" class="funnel-step active space-y-8 text-center flex flex-col justify-between" style="min-height: 100dvh;">
    
    <!-- Main Content Wrapper -->
    <div class="flex-grow flex flex-col justify-center space-y-8">
        <div>
            <svg class="w-16 h-16 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: var(--accent-color);">
                <circle cx="32" cy="32" r="2.5" fill="currentColor" />
                <path d="M52 32C52 43.0457 43.0457 52 32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32Z" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.3" />
                <path d="M46.8564 32C46.8564 39.098 40.098 44.8564 32 44.8564C23.902 44.8564 17.1436 39.098 17.1436 32C17.1436 24.902 23.902 19.1436 32 19.1436C40.098 19.1436 46.8564 24.902 46.8564 32Z" stroke="currentColor" stroke-width="2.5" />
            </svg>
        </div>
        <div class="space-y-4">
            <h2 class="text-3xl font-bold text-white tracking-tight">
                Дізнайся приховані подробиці твоєї особистості 😈
            </h2>
            <p class="text-lg" style="color: var(--secondary-text-color);">
                Обери дату народження щоб дізнатися на скільки ти чудова 😇
            </p>
        </div>
        
        <form id="birth-form" class="w-full space-y-4" novalidate>
            <div class="input-field h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                <svg class="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 animate-pulse" style="color: var(--accent-color);" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.28-.06-.57 0-.84.18l-.24.17c-.27.2-.35.59-.16.89l2.65 4.14c.44.69 1.19 1.1 1.99 1.1h6.5c1.45 0 2.56-1.25 2.45-2.69l-.32-3.92c-.08-.94-.78-1.68-1.66-1.92z" fill="currentColor"/>
                    <path d="M8.5 2 C 9.5 1, 13.5 1, 14.5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.6" />
                    <path d="M11.5 0.5 V 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.6" />
                </svg>

                <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                
                <span id="date-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обрати дату</span>
                <input type="date" id="birth-date" name="birth-date" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10" required>
            </div>
            <p id="error-message" class="error-text">
                Будь ласка, обери дату народження.
            </p>
            <button type="submit" class="btn btn-primary !text-lg h-14">
                <span class="btn-text">Дізнатися негайно</span>
                <span class="btn-spinner"></span>
            </button>
        </form>
    </div>

    <!-- CLEAN FOOTER (JUST ONE LINK) -->
    <div class="clean-footer-link mt-auto">
        <span class="clean-footer-btn" id="open-info-modal-btn">
            Юридична інформація та Контакти
        </span>
        <p class="text-[9px] mt-2 opacity-50">&copy; 2025 Destiny Code</p>
    </div>

</section>

<!-- ================= MODALS (OUTSIDE SECTION) ================= -->

<!-- INFO MODAL (REPLACES FOOTER CONTENT) -->
<div id="info-modal" class="modal-overlay">
    <div class="modal-content text-left">
        <span class="modal-close-icon" id="close-info-modal-icon">&times;</span>
        <div class="modal-text-content">
            <h3 class="text-center">Інформація</h3>
            
            <div class="legal-links mt-4 mb-6">
                <span class="legal-link" data-legal-type="offer">Публічна оферта</span>
                <span class="legal-link" data-legal-type="privacy">Політика конфіденційності</span>
                <span class="legal-link" data-legal-type="refund">Політика повернень</span>
                <!-- NEW CONTACTS LINK -->
                <span class="legal-link" data-legal-type="contacts">Контакти</span>
            </div>
            
            <div class="opacity-80 text-xs mt-4 border-t border-gray-700 pt-4">
                <p class="mb-2"><strong>ВІДМОВА ВІД ВІДПОВІДАЛЬНОСТІ:</strong><br>Всі астрологічні прогнози, розрахунки та описи на цьому сайті надаються виключно в розважальних та ознайомчих цілях.</p>
                <p class="italic opacity-70 mb-4">IMPORTANT: All materials are for educational and entertainment purposes only.</p>
            </div>
        </div>
        <button class="btn modal-btn-close w-full" id="close-info-modal-btn">Зрозуміло</button>
    </div>
</div>

<!-- LEGAL MODAL (DOCUMENTS) -->
<div id="legal-modal" class="modal-overlay">
    <div class="modal-content text-left">
        <span class="modal-close-icon" id="close-legal-modal-icon">&times;</span>
        <div id="legal-modal-body" class="modal-text-content">
            <!-- Content injected via JS -->
        </div>
        <button class="btn modal-btn-close w-full" id="close-legal-modal-btn">Зрозуміло</button>
    </div>
</div>

<!-- HIDDEN LEGAL CONTENT TEMPLATES -->

<!-- NEW CONTACTS CONTENT -->
<div id="legal-content-contacts" style="display:none;">
    <h3>КОНТАКТИ</h3>
    <p><strong>ФОП Серняк О.О.</strong><br>
    ІПН: 3169419596<br>
    Адреса: Україна, м. Київ, вул. Кадетський гай 7, кв. 40<br>
    Email: destinycode.online@gmail.com<br>
    Телефон: +380939783397</p>
    <br>
    <p>Ви можете зв'язатися з нами з будь-яких питань щодо роботи сервісу, оплати або отримання звітів.</p>
</div>

<div id="legal-content-offer" style="display:none;">
    <h3>ПУБЛІЧНА ОФЕРТА</h3>
    <p>1. Цей документ є публічною пропозицією (офертою) фізичної особи-підприємця <strong>Серняк О.О.</strong> (далі – Виконавець) укласти договір про надання інформаційних послуг розважального характеру.</p>
    <p>2. Послуги надаються у вигляді цифрового контенту (астрологічних звітів), згенерованого за допомогою програмного забезпечення.</p>
    <p>3. Користувач погоджується, що послуги мають виключно розважальний характер. Виконавець не несе відповідальності за прийняті Користувачем рішення на основі наданої інформації.</p>
    <p>4. Оплата послуг здійснюється через платіжну систему на умовах 100% передоплати.</p>
    <p>5. Контактна інформація та реквізити:</p>
    <p><strong>ФОП Серняк О.О.</strong><br>
    ІПН: 3169419596<br>
    Адреса: Україна, м. Київ, вул. Кадетський гай 7, кв. 40<br>
    Email: destinycode.online@gmail.com<br>
    Телефон: +380939783397</p>
</div>
<div id="legal-content-privacy" style="display:none;">
    <h3>ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</h3>
    <p>1. Ми збираємо лише ті дані, які необхідні для надання послуги: дата народження, час, місто (для розрахунку натальної карти) та Email (для відправки звіту).</p>
    <p>2. Ми не передаємо ваші дані третім особам, окрім випадків, передбачених законодавством або необхідних для обробки платежу (платіжні шлюзи).</p>
    <p>3. Ви маєте право вимагати видалення ваших даних, написавши на <strong>destinycode.online@gmail.com</strong>.</p>
</div>
<div id="legal-content-refund" style="display:none;">
    <h3>ПОЛІТИКА ПОВЕРНЕННЯ КОШТІВ</h3>
    <p>1. Оскільки послуга є цифровим товаром (контентом), який споживається в момент отримання, повернення коштів можливе лише у випадку технічного збою (звіт не було згенеровано або не надіслано).</p>
    <p>2. Якщо ви не отримали звіт протягом 24 годин після оплати, зверніться на <strong>destinycode.online@gmail.com</strong>, і ми вирішимо проблему або повернемо кошти.</p>
    <p>3. Суб'єктивне несприйняття тексту звіту не є підставою для повернення коштів, оскільки послуга вважається наданою належним чином.</p>
</div>`;let M=null;function _(){return window.CircularNatalHoroscope?Promise.resolve(!0):M?(console.log("⏳ Astro Library load request joined existing queue..."),M):(console.log("🚀 Starting Astro Library sequence..."),M=new Promise(s=>{window.module||(window.module={exports:{}}),window.exports=window.module.exports;const n=["https://unpkg.com/circular-natal-horoscope-js@1.1.0/dist/index.js","https://cdn.jsdelivr.net/npm/circular-natal-horoscope-js@1.1.0/dist/index.js","./js/astro-lib.js"];function o(t){if(t>=n.length){console.error("❌ CRITICAL: Всі джерела бібліотеки (включно з локальним) недоступні."),s(!1),M=null;return}const e=n[t],r=document.createElement("script");r.src=e,r.async=!0,r.onload=()=>{window.module&&window.module.exports&&window.module.exports.Horoscope?(window.CircularNatalHoroscope=window.module.exports,console.log(`✅ Astro Library Loaded Successfully from ${e}`),s(!0)):window.CircularNatalHoroscope?(console.log(`✅ Astro Library Loaded (Global) from ${e}`),s(!0)):(console.warn(`⚠️ Script loaded from ${e}, but exports missing.`),o(t+1))},r.onerror=()=>{console.warn(`⚠️ Failed to load from ${e}. Switching to backup source...`),o(t+1)},document.head.appendChild(r)}o(0)}),M)}function V(s){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=K;const o=document.getElementById("birth-form"),t=document.getElementById("birth-date"),e=document.getElementById("error-message"),r=document.getElementById("date-placeholder"),i=o.querySelector('button[type="submit"]'),m=document.getElementById("info-modal"),b=document.getElementById("legal-modal"),w=document.getElementById("open-info-modal-btn"),g=document.getElementById("close-info-modal-icon"),l=document.getElementById("close-info-modal-btn"),f=document.getElementById("close-legal-modal-icon"),v=document.getElementById("close-legal-modal-btn"),y=document.getElementById("legal-modal-body"),a=document.querySelectorAll(".legal-link[data-legal-type]");function p(){m&&(m.style.display="flex")}function c(){m&&(m.style.display="none")}function u(T){const k=document.getElementById("legal-content-"+T);k&&b&&y&&(y.innerHTML=k.innerHTML,b.style.display="flex")}function h(){b&&(b.style.display="none")}w&&w.addEventListener("click",p),g&&g.addEventListener("click",c),l&&l.addEventListener("click",c),f&&f.addEventListener("click",h),v&&v.addEventListener("click",h),m&&m.addEventListener("click",T=>{T.target===m&&c()}),b&&b.addEventListener("click",T=>{T.target===b&&h()}),a.forEach(T=>{T.addEventListener("click",k=>{const L=k.target.getAttribute("data-legal-type");c(),setTimeout(()=>{u(L)},50)})});function x(){const T=t.value;if(!T)r.innerText="Обрати дату народження",r.style.color="var(--secondary-text-color)";else{const k=T.split("-");if(k.length===3){const L=`${k[2]}.${k[1]}.${k[0]}`;r.innerText=L,r.style.color="var(--primary-text-color)"}}}function E(){t.value===""&&(t.value="1995-01-01")}t.addEventListener("input",x),t.addEventListener("change",x),t.addEventListener("blur",x),t.addEventListener("focus",E),t.addEventListener("click",E),t.addEventListener("touchstart",E),x(),o.addEventListener("submit",async function(T){T.preventDefault();const k=t.value;if(k==="")e.innerText="Будь ласка, обери дату народження.",e.style.display="block";else{let I=function(S,U){S.classList.add("loading"),S.disabled=!0};var L=I;e.style.display="none",d.set("date",k),I(i),_(),s.navigateTo("loading")}})}const W=`<!-- 🔥 UPDATE: Використовуємо step-centered та margin: auto для ідеального центрування у funnel-container -->
<section id="loading-step" class="funnel-step active step-centered space-y-6 text-center" style="margin-top: auto; margin-bottom: auto;">
    
    <!-- Спінер (стилі беруться з main.css, прибрано зайві inline стилі) -->
    <div class="spinner" style="margin-left: auto; margin-right: auto;"></div>
    
    <!-- Контейнер для тексту -->
    <div id="loading-typing-container" class="typing-container">
        <span id="loading-text"></span>
        <!-- Курсор (стилі з main.css) -->
        <span id="loading-cursor" class="typing-cursor" style="display: none;"></span>
    </div>

</section>`;function P(s,n,o,t=50,e=0,r=!1){return new Promise(i=>{let m=0;n&&(n.style.display="inline-block"),s.innerHTML="";function b(){m<o.length?(s.innerHTML=o.substring(0,m+1),m++,setTimeout(b,t)):setTimeout(()=>{!r&&n&&(n.style.display="none"),i()},e)}b()})}async function Y(s){if(!await _())throw new Error("Astro Library not loaded");const{Origin:n,Horoscope:o,Renderer:t}=window.CircularNatalHoroscope,e=s.date.split("-"),r=parseInt(e[0]),i=parseInt(e[1])-1,m=parseInt(e[2]);let b=12,w=0;if(s.time){const c=s.time.split(":");b=parseInt(c[0]),w=parseInt(c[1])}let g=50.45,l=30.52,f="Europe/Kyiv";if(s.geo){const c=parseFloat(s.geo.latitude||s.geo.lat),u=parseFloat(s.geo.longitude||s.geo.lon);!isNaN(c)&&!isNaN(u)&&(g=c,l=u,f=s.geo.timezone||f)}let v=[],y=null,a=null;function p(c){const u=Math.floor(c),h=(c-u)*60,x=Math.floor(h),E=Math.floor((h-x)*60);return`${u}° ${x}' ${E}"`}try{const c=new n({year:r,month:i,date:m,hour:b,minute:w,latitude:g,longitude:l,timezone:f});a=new o({origin:c,houseSystem:"placidus",zodiac:"tropical"});const u=a.CelestialBodies;["sun","moon","mercury","venus","mars","jupiter","saturn","uranus","neptune","pluto","ascendant","midheaven"].forEach(x=>{let E=u[x];if(!E&&x==="ascendant"&&(E=a.Ascendant),!E&&x==="midheaven"&&(E=a.Midheaven),E){const T=E.Sign.label.toUpperCase(),k=E.ChartPosition.Ecliptic.DecimalDegrees%30,L=p(k),I=x.toUpperCase();v.push(`${I}: ${T} ${L}`)}}),console.log("Calculated Planets (DMS):",v)}catch(c){return console.error("Horoscope Calculation Failed:",c),{planets:[],chartSvg:null,houseSystem:"Error"}}try{if(a){const c=document.createElement("div");c.style.position="absolute",c.style.left="-9999px",c.style.visibility="hidden",document.body.appendChild(c),new t(a).render(c);const h=c.querySelector("svg");h&&(h.style.backgroundColor="transparent",h.querySelectorAll("line, circle, path").forEach(x=>{const E=x.getAttribute("stroke");(!E||E==="#000000"||E==="#000")&&x.setAttribute("stroke","#cda45e");const T=x.getAttribute("fill");(T==="#000000"||T==="#000")&&x.setAttribute("fill","#cda45e")}),h.querySelectorAll("text").forEach(x=>{x.style.fill="#cda45e",x.setAttribute("fill","#cda45e"),x.style.fontFamily="'Montserrat', sans-serif"}),y=c.innerHTML),document.body.removeChild(c)}}catch(c){console.warn("SVG Render Error:",c)}return{planets:v,chartSvg:y,houseSystem:"Placidus"}}const $="QUl6YVN5RFhYQkpQaE8zV2MzdFdub25TTFdhNVMwQUItZzVObVZj",j="https://sendreportemail-kpkshoor7q-ew.a.run.app",Q="https://createpdf-kpkshoor7q-ew.a.run.app",X="gemini-2.5-flash",Z=6e4;let B=null,A=null;const ee=`Ти — 'Майстер Астро-Психолог' Destiny Code.
Твоя Роль: Ти глибокий, мудрий 'астро-психолог', але з тоном твоєї найкращої подруги — емпатичної, авторитетної, і з легким фліртом та гумором.
Твоя Місія: Допомогти клієнтці 'розпакувати' її натальну карту як 'карту душі'. Ти бачиш психологічні патерни, кармічні уроки та прихований потенціал. Ти даєш 'космічну валідацію' її почуттів.
Твоя Мова: Говори українською. Емоційно, але по суті. Використовуй 'ти' та 'твоя'.
КЛЮЧОВА МЕТОДОЛОГІЯ (Твої Правила):
1. Емпатія > Факти. Ти 'бачиш' її справжню.
2. 'Темні сторони' — це 'суперсили' (напр. упертість = цілеспрямованість).
3. ЗАВЖДИ СИНТЕЗУЙ: (Напр. 'Сонце в... робить тебе..., але Асцендент в... вимагає...').
4. ДІМ — ЦЕ КОНТЕКСТ: Планета в Домі — це сфера життя, де енергія реалізується.
5. 'ВЕЛИКА ТРІЙКА' — ЦЕ ЯДРО: Аналізуй Асцендент ('маска'), Сонце ('сутність') і Місяць ('внутрішній світ') як єдину систему.
6. НЕ ЛЯКАЙ: 'Важкі' аспекти — це 'точки росту' або 'джерело прихованої сили'.
7. ДАВАЙ 'КЛЮЧ': Завжди пропонуй психологічну пораду або 'ключ до гармонії'.
8. Смайли: Використовуй релевантні смайли (😈, ✨, 🔮, 🔥, 👑).
9. ЗАБОРОНЕНО: Медичні терміни. Складні астро-терміни без пояснень. "Смерть".`,te=`Місія: 'Безкоштовний Гачок'.
ЗАВДАННЯ:
1. Визнач знак Сонця за датою. Використовуй ** emojis** у тексті.
2. Напиши 'гачок' - яскравий опис **сильних сторін** (і 'темної' сторони як переваги), який вразить її.
3. Підкресли, що це лише 1/3 її ядра.
Формат: ТІЛЬКИ JSON.
\`\`\`json
{
  "title": "✅ Твоє Ядро: [Знак Сонця] 🔥",
  "psychological_analysis": "[Тут згенеруй яскравий, преміально оформлений HTML-текст (3-4 абзаци). Говори про її суперсили, її 'темну' сторону (як перевагу) та унікальність. Використовуй **жирний** для акцентів. Використовуй багато (5-7) релевантних смайлів (напр. 😈, ✨, 🔮, 🔥, 👑).]"
}
\`\`\`
ВИМОГИ: Відповідай ТІЛЬКИ валідним JSON. Жодного тексту до чи після.`,ne=`Місія: 'Повний Психологічний Портрет' (Платний).
(Клієнтка вже заплатила. Цінність має бути вищою за 149 грн. Будь глибоким, емпатичним).
 ЗАВДАННЯ:
1. Проаналізуй надані дані (дату, час (якщо є) та Технічні Дані (якщо є)).
2. Якщо є 'Технічні Дані' (ASC, MC): Використовуй їх для преміум-аналізу.
3. Якщо 'Технічних Даних' НЕМАЄ: Роби аналіз 'Космічної Карти' (без Домів/ASC).
4. 'practical_advice': Дай ОДНУ, але дуже конкретну пораду ('спробуй це...').
5. 'analysis_text': Пиши глибоко, емоційно.
 Формат: ТІЛЬКИ JSON.
\`\`\`json
{
  "sections": [
    {
      "id": "core_intro", "icon": "✨", "title": "Ядро Особистості: Хто Ти Насправді?",
      "analysis_text": "[Глибокий аналіз 'Золотої Трійки' (Сонце, Місяць, Асцендент (якщо є)). Їх взаємодія, твої суперсили та внутрішні конфлікти. Поясни, чому ти відчуваєш себе саме так.]",
      "practical_advice": "[Одна порада. Напр. 'Твій Місяць у... вимагає... Спробуй...']"
    },
    {
      "id": "love", "icon": "❤️‍🔥", "title": "Кохання та Стосунки: Твій Сценарій",
      "analysis_text": "[Аналіз Венери та Марса ('твоя мова кохання', 'твій ідеальний партнер', 'твій стиль у конфліктах'). Чого ти насправді шукаєш у стосунках.]",
      "practical_advice": "[Одна порада. Напр: 'Твоя Венера у... каже, що для тебе кохання - це... Не бійся просити про...']"
    },
    {
      "id": "career", "icon": "👑", "title": "Кар'єра та Гроші: Де Твій Успіх?",
      "analysis_text": "[Аналіз Midheaven (MC) (якщо є) та Юпітера. **Якщо MC немає, аналізуй 10-й дім за знаком та планетами (якщо є).** Твій потенціал, сфери для реалізації, твій унікальний підхід до грошей.]",
      "practical_advice": "[Одна порада. Напр: 'Твій Юпітер у... дає успіх через... Спробуй сфокусуватись на...']"
    },
    {
      "id": "karma", "icon": "🔮", "title": "Кармічні Уроки та Призначення",
      "analysis_text": "[Аналіз Північного/Південного Вузлів (якщо є). Твій шлях душі, завдання на це життя, від чого треба відійти (Пд. Вузол) і до чого прийти (Пн. Вузол).]",
      "practical_advice": "[Одна порада. Напр: 'Твій Пн. Вузол у... кличе тебе до... Почни з малого: ...']"
    },
    {
      "id": "future", "icon": "⚡️", "title": "Майбутні Можливості",
      "analysis_text": "[Короткий, але емпатичний огляд 1-2 ключових транзитів (напр. Юпітера, Сатурна) на найближчі 6 місяців. На що звернути увагу. Без 'небезпек', лише 'можливості' та 'уроки'.]",
      "practical_advice": "[Одна порада. Напр: 'Юпітер зараз у... твого... Це твій шанс для... Використай його!']"
    }
  ]
}
\`\`\`
ВИМОГИ: Відповідай ТІЛЬКИ валідним JSON. 'analysis_text' має бути деталізованим (3-4 абзаци), з **жирними** акцентами.`,oe=`
Завдання: Створити стратегічний прогноз на 1 рік (від сьогодні).
Дані:
Використай для раозрахунків наявні дані з астробібіліотеки.
Врахуй: Положення натальних планет (особливо Сонця, Місяця, ASC, Сатурна). КЛЮЧОВІ ТРАНЗИТИ на наступні 12 місяців: Транзити Сатурна, Юпітера, Урана, Плутона до натальних планет.
План Аналізу:
НЕ давай прогноз на кожен день. Твоє завдання — дати стратегію. А також розкрити питання фінансових піків/спадів, благоприємних періодів в цілому і сфери стосунків.
Твій Головний 'Кармічний Урок' Року (Транзит Сатурна): Де Сатурн 'тисне' зараз? Через який Дім він іде? Це — сфера, де потрібна дисципліна та робота.
Твоя 'Велика Можливість' Року (Транзит Юпітера): Де Юпітер 'розширює' можливості? Через який Дім він іде? Це — сфера, де треба ризикувати та діяти.
Твоя 'Зона Турбулентності' (Транзити Урана/Плутона): Чи зачіпають ці повільні планети щось важливе? Якщо так, це — сфера глибокої трансформації та 'революції'.
Твоя Стратегія на 12 Місяців: Заверши 3-4 практичними порадами, як використати ці енергії. (Наприклад: 'Використовуй дисципліну Сатурна в кар'єрі (10-й Дім), щоб бути готовою до 'великого стрибка' Юпітера у фінансах (2-й Дім)').
ВИМОГА: Відповідай гарно структурованим HTML текстом (без JSON). Використовуй <h3> для заголовків секцій та <p> для тексту.
`;function se(){try{return!$||$.includes("ВСТАВ_СЮДИ")?null:atob($)}catch{return console.error("Key decoding failed"),null}}function H(){console.log("🔥 Warming up PDF backend..."),fetch(Q,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({warmup:!0})}).catch(()=>{})}async function z(s){if(B)return console.log("⚠️ Background generation already running."),B;console.log("🚀 Starting background generation (PRE-FETCH)...");let n="";const o={...s};try{const e=await Y(s);e&&e.planets&&(n=`== Технічні Астрологічні Дані ==
${e.planets.join(`
`)}`,o.planets=e.planets,d.set("planets",e.planets))}catch(e){console.warn("Local calc skipped",e)}const t=`Дата: ${s.date}
Час: ${s.time}
Місто: ${s.city}
${n}`;return B=R(ne,t).then(e=>{const r=JSON.parse(e);return A={data:r,enrichedUserData:o},console.log("✅ Background generation finished!"),r}).catch(e=>{throw console.error("Background generation failed:",e),B=null,e}),B}async function ae(s,n){let o=null,t=s;try{return A?(console.log("⚡️ Using cached report data (Instant Load)"),o=A.data,t=A.enrichedUserData):B?(console.log("⏳ Waiting for background generation to finish..."),o=await B,t=d.get("planets")?{...s,planets:d.get("planets")}:s):(console.log("🐌 Cold start generation (No pre-fetch)"),o=await z(s),t=d.get("planets")?{...s,planets:d.get("planets")}:s),n&&n.includes("@")&&(console.log("📧 Sending email/PDF request to backend..."),fetch(j,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:n,reportHtml:JSON.stringify(o),reportHtml:JSON.stringify(o),reportTitle:"Твій Повний Аналіз",reportType:"main",userData:t})}).catch(e=>console.error("Background Email Error:",e))),o}catch(e){return console.error("Generate Full Report Error:",e),e.message==="Timeout"?{error:!0,type:"timeout",message:"Час очікування вичерпано."}:{error:!0,message:"Не вдалося згенерувати звіт."}}}async function R(s,n){const o=se();if(!o)return'{"error": "config_error"}';const t=`${s}

Вхідні дані:
${n}`,e=`https://generativelanguage.googleapis.com/v1beta/models/${X}:generateContent?key=${o}`,r={contents:[{parts:[{text:t}]}],systemInstruction:{parts:[{text:ee}]}};let i=2e3;for(let m=0;m<3;m++){const b=new AbortController,w=setTimeout(()=>b.abort(),Z);try{const g=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r),signal:b.signal});if(clearTimeout(w),g.ok){const f=(await g.json()).candidates?.[0]?.content?.parts?.[0]?.text;if(f){const v=f.match(/```json\n([\s\S]*?)\n```/);return v&&v[1]?v[1]:f}}if(g.status===429||g.status>=500){await new Promise(l=>setTimeout(l,i)),i*=2;continue}throw new Error(`Google API Error: ${g.status}`)}catch(g){if(clearTimeout(w),g.name==="AbortError")throw new Error("Timeout");if(m===2)throw g;await new Promise(l=>setTimeout(l,i)),i*=2}}}async function re(s){H();try{const n=await R(te,`Дата народження: ${s}`);return JSON.parse(n)}catch{return{title:"Error",psychological_analysis:"Error"}}}async function O(s,n){const o=`Користувач: Жінка. Дата: ${s.date}. Місто: ${s.city}`,t=d.get("planets"),e=t?{...s,planets:t}:s;try{const r=await R(oe,o);return n&&n.includes("@")&&fetch(j,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:n,reportHtml:r,reportType:"upsell",userData:e})}).catch(i=>console.warn("Forecast email bg error:",i)),r}catch{return null}}async function le(s){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=W;const o=document.getElementById("loading-text"),t=document.getElementById("loading-cursor"),e=d.get("date");H();let r=!1;const i=re(e).then(w=>(d.set("freeReport",w),r=!0,w)).catch(w=>(console.error("API Error:",w),{error:!0,title:"❌ Помилка Аналізу",psychological_analysis:"<p>На жаль, сталася помилка під час обробки відповіді від ШІ.</p>"})),m=[{text:"З'єднуюсь з ефемеридами NASA...",pause:1e3},{text:"Аналізую положення планет...",pause:1200},{text:"Зчитую твій енергетичний код...",pause:1200},{text:"Розшифровую кармічні вузли...",pause:1500},{text:"Будую твою натальну карту...",pause:1500},{text:"Приготуйся дізнатись, наскільки ти ахуєнна 😈",pause:2e3,final:!0}],b=(async()=>{for(let w=0;w<m.length;w++){const g=m[w];let l=g.pause;r&&!g.final&&(l=600),o&&t&&await P(o,t,g.text,50,l,g.final),g.final}t&&(t.style.display="none")})();await Promise.all([b,i]),s.navigateTo("result")}const ie=`<!-- 🔥 FIX: Додано клас 'active' для відображення -->
<section id="result-step" class="funnel-step active space-y-6">
    <h2 class="text-2xl font-bold text-center text-white" id="result-title">Аналіз твоєї особистості</h2>
    
    <div class="p-5 rounded-xl space-y-3" style="background-color: var(--card-bg-color); border: 1px solid var(--border-color);">
        <h3 class="text-xl font-bold" style="color: var(--accent-color);" id="free-report-title">
            <!-- Заголовок заповнюється через JS -->
        </h3>
        <div id="free-report-text" class="text-left leading-relaxed space-y-4" style="color: var(--secondary-text-color);">
            <i>(Тут з'явиться твій персональний аналіз...)</i>
        </div>

        <!-- 🔥 MOVED CONTENT: Divider + Marketing Block тепер всередині картки -->
        
        <!-- Дивайдер -->
        <div class="relative py-4">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-700"></div>
            </div>
            <div class="relative flex justify-center">
                <!-- Changed background-color to var(--card-bg-color) to blend with the card -->
                <span class="px-3 text-sm text-gray-500" style="background-color: var(--card-bg-color);">АЛЕ ЦЕ ЩЕ НЕ ВСЕ</span>
            </div>
        </div>

        <!-- Статичний продаючий блок -->
        <div id="marketing-hook-block" class="text-center leading-relaxed">
            <p class="text-base mb-4" style="color: var(--primary-text-color);">
                Це лише <span style="color: var(--accent-color); font-weight: bold;">8%</span> аналізу твоєї особистості.
                <br>
                <span style="color: var(--secondary-text-color); font-size: 0.95rem;">Дізнайся більш детально про всі сфери свого життя:</span>
            </p>
            <ul class="text-left inline-block space-y-2" style="color: var(--secondary-text-color); font-size: 0.95rem;">
                <li class="flex items-center"><span class="mr-2 text-xl">❤️‍🔥</span> Кохання та стосунки</li>
                <li class="flex items-center"><span class="mr-2 text-xl">💸</span> Гроші та кар'єра</li>
                <li class="flex items-center"><span class="mr-2 text-xl">🔮</span> Кармічні уроки та призначення</li>
                <li class="flex items-center"><span class="mr-2 text-xl">⚡️</span> Твої майбутні можливості</li>
            </ul>
        </div>
        <!-- END MOVED CONTENT -->

    </div>

    <!-- Прихований елемент для сумісності з JS (щоб не ламалось, якщо є посилання) -->
    <p id="free-report-hook" style="display: none;"></p>

    <div class="pt-4">
        <!-- 🔥 STYLE: Анімація "Злітна смуга" -->
        <style>
            @keyframes runway-lights {
                0% { opacity: 0.3; }
                50% { opacity: 1; }
                100% { opacity: 0.3; }
            }
            .runway-arrow {
                animation: runway-lights 1.2s infinite ease-in-out both;
                display: inline-block;
                color: rgba(0, 0, 0, 0.75); /* М'який чорний */
            }
            /* Затримка для кожної стрілочки для створення ефекту руху */
            .runway-arrow:nth-child(1) { animation-delay: 0s; }
            .runway-arrow:nth-child(2) { animation-delay: 0.2s; }
            .runway-arrow:nth-child(3) { animation-delay: 0.4s; }
        </style>

        <button id="upgrade-button" class="btn btn-primary !text-lg !py-4">
            <span class="btn-text flex items-center justify-center gap-2">
                Отримати повний аналіз
                <!-- 🔥 UPDATE: Runway Lights Effect -->
                <span class="font-bold tracking-widest flex gap-[1px]">
                    <span class="runway-arrow">&gt;</span>
                    <span class="runway-arrow">&gt;</span>
                    <span class="runway-arrow">&gt;</span>
                </span>
            </span>
            <span class="btn-spinner"></span>
        </button>
    </div>
</section>`;function ce(s){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=ie;const o=document.getElementById("result-title"),t=document.getElementById("free-report-title"),e=document.getElementById("free-report-text"),r=document.getElementById("upgrade-button"),i=d.get("freeReport");if(!i){s.navigateTo("welcome");return}let m="";i.psychological_analysis?m=i.psychological_analysis.replace(/\*\*(.*?)\*\*/g,'<strong style="color: var(--primary-text-color);">$1</strong>').replace(/\\n/g,"<br>"):m="<p>Дані відсутні.</p>",o.innerText="Аналіз твоєї особистості",t.innerHTML=i.title||"Результат",e.innerHTML=m,r.addEventListener("click",()=>{s.navigateTo("premium-data")})}const de=`<!-- 🔥 UPDATE: Видалено центрування (margin: auto) для верху сторінки, як в моноліті -->
<section id="premium-data-step" class="funnel-step active space-y-6 text-center">
    <h2 class="text-3xl font-bold text-white tracking-tight">
        Отримай повний аналіз своєї особистості
    </h2>
    <p class="text-lg" style="color: var(--secondary-text-color);">
        Обери час та місто свого народження щоб дізнатись подробиці всіх сфер свого життя
    </p>
    <div id="premium-form-container" class="w-full space-y-5 mt-6">
        <!-- Time Input -->
        <div>
            <!-- Лейбл: uppercase, золотий -->
            <label for="birth-time" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2" style="color: var(--accent-color);">Час народження (Для розрахунку Долі)</label>
            
            <div class="input-field h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                
                <!-- Плейсхолдер -->
                <span id="time-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обери час</span>
                
                <!-- Інпут -->
                <input type="time" id="birth-time" name="birth-time" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10">
            </div>
            
            <p id="time-error-message" class="error-text" style="display: none;">
                Будь ласка, обери час народження.
            </p>
        </div>
        <!-- City Input -->
        <div>
            <label for="birth-city" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2" style="color: var(--accent-color);">Місто народження (Для карти зірок)</label>
            
            <!-- 🔥 FIX: HARDCORE CSS OVERRIDE -->
            <!-- color: #ffffff !important - примусово білий колір -->
            <!-- -webkit-text-fill-color: #ffffff !important - для Webkit автозаповнення -->
            <!-- background-color: transparent !important - щоб не було білого фону -->
            <input 
                type="text" 
                id="birth-city" 
                name="birth-city" 
                placeholder="Наприклад, Київ" 
                class="input-field text-center hover:border-[#cda45e] transition-colors w-full"
                style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; background-color: var(--card-bg-color) !important; opacity: 1;"
            >
            
            <style>
                /* Додатковий шар захисту від стилів браузера */
                #birth-city {
                    color: #ffffff !important;
                    -webkit-text-fill-color: #ffffff !important;
                    caret-color: var(--accent-color);
                }
                
                /* Перебиваємо стилі автозаповнення */
                #birth-city:-webkit-autofill,
                #birth-city:-webkit-autofill:hover, 
                #birth-city:-webkit-autofill:focus, 
                #birth-city:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px var(--card-bg-color) inset !important;
                    -webkit-text-fill-color: #ffffff !important;
                    transition: background-color 5000s ease-in-out 0s;
                }

                #birth-city::placeholder {
                    color: var(--secondary-text-color);
                    opacity: 0.7;
                    transition: opacity 0.2s ease;
                    -webkit-text-fill-color: var(--secondary-text-color) !important;
                }
                #birth-city:focus::placeholder {
                    opacity: 0;
                    color: transparent;
                    -webkit-text-fill-color: transparent !important;
                }
            </style>

            <p id="city-error-message" class="error-text">
                Текст помилки...
            </p>
            <p id="city-info-message" class="info-text">
                <!-- Текст інфо -->
            </p>
        </div>
        <div class="pt-4 space-y-3">
            <button type="button" id="continue-to-paywall-button" class="btn btn-primary !text-lg !py-4">
                <span class="btn-text">Отримати детальний аналіз</span>
                <span class="btn-spinner"></span>
            </button>
            
            <!-- 🔥 FIX: Повернуто просту структуру кнопки (без внутрішнього спінера), оскільки крутити будемо верхню -->
            <button type="button" id="skip-button" class="btn btn-skip">
                Я не знаю точно часу (Скласти космограму без Домів)
            </button>
        </div>
    </div>
</section>`,pe="https://getaiprediction-kpkshoor7q-ew.a.run.app",ue="gemini-2.5-flash",me=`
    Ти — високоточний географічний API. Твоя єдина мета — повернути JSON-об'єкт, що містить географічні координати (lat, lon), часовий пояс (timezone) та **виправлену назву міста (corrected_name)**.
    ПРАВИЛА:
    1. Відповідь має бути ЛИШЕ в форматі JSON. Жодних пояснень.
    2. Часовий пояс має бути у форматі IANA (наприклад, Europe/Kyiv).
    3. КРИТИЧНЕ ПРАВИЛО (АВТОВИПРАВЛЕННЯ): Вхідні дані (назва міста) можуть бути будь-якою мовою (українська, англійська, російська) та містити одруки (напр., "Ужгрод", "Львіф", "Harkiv", "Киев"). Ти *повинен* докласти максимум зусиль, щоб розпізнати та **автоматично виправити** ці одруки.
    4. **Краще автоматично виправити одрук, ніж повернути помилку "not_found".** 5. Поле "corrected_name" **завжди** має містити фінальну, коректну назву міста, яку ти знайшов (напр., "Ужгород").
    6. Якщо місто неможливо знайти (напр., 'asdfg') -> {"error": "not_found"}
    7. Якщо місто неоднозначне (напр., 'Париж' без країни) -> {"error": "ambiguous"}

    Приклад (Успіх з виправленням): {"lat": 48.6208, "lon": 22.2879, "timezone": "Europe/Uzhhorod", "corrected_name": "Ужгород"}
    Приклад (Успіх без виправлення): {"lat": 50.4501, "lon": 30.5234, "timezone": "Europe/Kyiv", "corrected_name": "Київ"}
    Приклад (Помилка): {"error": "not_found"}
`;async function ye(s,n){const o={contents:[{parts:[{text:n}]}],systemInstruction:{parts:[{text:s}]}};try{const t=await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payload:o,modelName:ue})});if(t.ok){const r=(await t.json()).candidates?.[0];if(r&&r.content?.parts?.[0]?.text)return r.content.parts[0].text}return console.warn("Geo API Warning:",t.status),null}catch(t){return console.error("Geo API Network Error:",t),null}}async function F(s){const n=`Місто: ${s}`;try{const o=await ye(me,n);if(!o)return{error:"network_failure"};const t=o.replace(/```json\n?([\s\S]*?)\n?```/g,"$1").trim(),e=JSON.parse(t);return e&&typeof e.lat=="number"&&typeof e.lon=="number"?(console.log(`Geocoding success for ${s}:`,e),{latitude:e.lat,longitude:e.lon,timezone:e.timezone,corrected_name:e.corrected_name,error:null}):e&&e.error?(console.warn(`Geocoding failed for ${s}:`,e.error),{error:e.error}):{error:"parse_error"}}catch(o){return console.error(`Geocoding failed for ${s}:`,o),{error:"network_failure"}}}function ge(s){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=de;const o=document.getElementById("birth-time"),t=document.getElementById("time-placeholder"),e=o.closest(".input-field"),r=document.getElementById("time-error-message"),i=document.getElementById("birth-city"),m=document.getElementById("city-error-message"),b=document.getElementById("city-info-message"),w=document.getElementById("continue-to-paywall-button"),g=document.getElementById("skip-button");function l(){!o||!t||(o.value?(t.innerText=o.value,t.style.color="var(--primary-text-color)",e&&e.classList.remove("input-error"),r&&(r.style.display="none")):(t.innerText="Обери час",t.style.color="var(--secondary-text-color)"))}o.addEventListener("input",l),o.addEventListener("change",l),o.addEventListener("blur",l),l(),i.addEventListener("input",()=>{m.style.display="none",b.style.display="none",i.classList.remove("input-error")});function f(y,a){y&&(a?(y.classList.add("loading"),y.disabled=!0):(y.classList.remove("loading"),y.disabled=!1))}function v(y,a){y==="ambiguous"?m.innerText=`Місто "${a}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну.`:m.innerText=`Не можемо знайти місто "${a}". Перевірте назву.`,m.style.display="block",i.classList.add("input-error")}w.addEventListener("click",async()=>{const y=o.value;let a=i.value.trim();const p=a;let c=!1;if(m.style.display="none",r.style.display="none",e.classList.remove("input-error"),i.classList.remove("input-error"),a||(i.classList.add("input-error"),m.innerText="Будь ласка, введи місто народження.",m.style.display="block",c=!0),y||(e.classList.add("input-error"),r.style.display="block",c=!0),!a&&c){navigator.vibrate&&navigator.vibrate(50);return}f(w,!0);const u=await F(a);let h=null;if(u&&u.latitude?(u.corrected_name&&(i.value=u.corrected_name,a=u.corrected_name,p.toLowerCase()!==u.corrected_name.toLowerCase()&&(h=`Ми уточнили: ${u.corrected_name} 😉`)),d.set("geo",{latitude:u.latitude||u.lat,longitude:u.longitude||u.lon,timezone:u.timezone}),d.set("city",u.corrected_name)):u&&u.error==="ambiguous"?(v("ambiguous",a),c=!0):(v("not_found",a),c=!0),h?(b.innerText=h,b.style.display="block"):b.style.display="none",c){f(w,!1),navigator.vibrate&&navigator.vibrate(50);return}d.set("time",y),setTimeout(()=>{s.navigateTo("paywall")},h?1200:0)}),g.addEventListener("click",async()=>{let y=i.value.trim();const a=y;if(m.style.display="none",r.style.display="none",i.classList.remove("input-error"),e.classList.remove("input-error"),!y){i.classList.add("input-error"),m.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",m.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}f(w,!0),g.disabled=!0;const p=await F(y);let c=null,u=!1;if(p&&p.latitude?(p.corrected_name&&(i.value=p.corrected_name,y=p.corrected_name,a.toLowerCase()!==p.corrected_name.toLowerCase()&&(c=`Ми уточнили: ${p.corrected_name} 😉`)),d.set("geo",{latitude:p.latitude||p.lat,longitude:p.longitude||p.lon,timezone:p.timezone}),d.set("city",p.corrected_name),d.set("time","")):p&&p.error==="ambiguous"?(v("ambiguous",y),u=!0):(v("not_found",y),u=!0),c&&(b.innerText=c,b.style.display="block"),u){f(w,!1),g.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}console.log("User skipped time, but city is valid."),setTimeout(()=>{s.navigateTo("paywall")},c?1200:0)})}const fe=`<section id="final-paywall-step" class="funnel-step active space-y-6">

    <div class="text-center space-y-2">
        <!-- Заголовок -->
        <h2 class="text-2xl font-bold text-white leading-tight">Повний портрет твоєї особистості готовий</h2>

        <!-- Таймер -->
        <div class="flex flex-col items-center justify-center bg-green-900/20 border border-green-500/30 rounded-lg py-1 px-4 w-full max-w-[180px] mx-auto backdrop-blur-sm mt-3">
            <span class="text-[8px] uppercase tracking-[1.5px] text-green-400/80 mb-0 font-bold">Доступно лише</span>
            <div class="flex items-baseline gap-1">
                <span id="paywall-timer" class="text-3xl font-bold font-mono text-green-400 tracking-widest drop-shadow-sm leading-none mt-1">07:00</span>
                <span class="text-[10px] text-green-400/70">хв</span>
            </div>
        </div>
    </div>

    <!-- Блок Довіри -->
    <div class="space-y-3">
        <!-- Статичний блок -->
        <div class="astro-data-box" style="margin: 0; padding: 0.75rem 1rem; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 0.75rem; text-align: center;">
            <div class="text-xs font-normal tracking-wide" style="color: #9ca3af;">
                ★ Твоя карта успішно розрахована ★
            </div>
        </div>

        <!-- === ДИНАМІЧНИЙ БЛОК "КОСМІЧНИЙ ВІДБИТОК" === -->
        <div id="paywall-astro-data" style="display: none;"></div>
    </div>

    <!-- Опис -->
    <p class="text-sm sm:text-base text-center leading-relaxed" style="color: #d1d5db;">
        Ми проаналізували рух планет в момент твого народження.<br>
        <strong class="text-white">Розблокуй</strong> свою повну натальну карту щоб дізнатися подробиці всіх сфер свого життя (5+ сторінок).
    </p>

    <!-- RICH LIST (Список Вигод) -->
    <div class="space-y-3 pt-2">
        <div class="paywall-item" onclick="showPaywallPopup('Ядро Особистості', 'Дізнайся, що говорять про тебе зірки. Твій істинний характер, сильні сторони та приховані таланти.')">
            <span class="paywall-icon">🎭</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Ядро Особистості</span>
                <span class="text-xs text-gray-400">Як тебе бачать люди і яка ти насправді.</span>
            </div>
        </div>
        <div class="paywall-item" onclick="showPaywallPopup('Код Твого Кохання', 'Чому не щастить у коханні? Який партнер тобі справді потрібен? Розкрий секрети своєї Венери.')">
            <span class="paywall-icon">❤️‍🔥</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Код Твого Кохання</span>
                <span class="text-xs text-gray-400">Типаж ідеального партнера та причини невдач.</span>
            </div>
        </div>
        <div class="paywall-item" onclick="showPaywallPopup('Грошовий Потік', 'Де твої великі гроші? Яка професія принесе тобі багатство та успіх? Астрологічний ключ до фінансів.')">
            <span class="paywall-icon">💸</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Грошовий Потік</span>
                <span class="text-xs text-gray-400">Твої приховані таланти що приносять гроші.</span>
            </div>
        </div>
        <div class="paywall-item" onclick="showPaywallPopup('Кармічні Уроки', 'Для чого твоя душа прийшла в цей світ? Які уроки тобі треба пройти, щоб стати щасливою?')">
            <span class="paywall-icon">🔮</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Кармічні Уроки та Призначення</span>
                <span class="text-xs text-gray-400">Для чого твоя душа прийшла в цей світ.</span>
            </div>
        </div>
        <div class="paywall-item" onclick="showPaywallPopup('Майбутні Можливості', 'Що готують тобі зірки? Персональний астрологічний прогноз на найближчий час.')">
            <span class="paywall-icon">⚡️</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Твої Майбутні Можливості</span>
                <span class="text-xs text-gray-400">Астрологічний клімат: як діяти саме зараз для успіху.</span>
            </div>
        </div>
    </div>

    <!-- 🔥 STICKY FOOTER BUTTON (EXACT MONOLITH COPY) 🔥 -->
    <div class="sticky-paywall-footer">
        <button id="final-checkout-button" class="btn btn-primary w-full !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden px-1">
            <!-- Flex container for text centering and alignment with responsive gap -->
            <span class="btn-text flex flex-col items-center justify-center gap-0 w-full tracking-tighter">
                <span class="flex items-center gap-2">
                    <span class="whitespace-nowrap text-[18px] xs:text-[21px] sm:text-[24px] font-bold leading-none">
                        Розблокувати зараз за 149 грн
                    </span>
                    <span class="whitespace-nowrap text-sm xs:text-base font-normal opacity-60 line-through decoration-white/50 leading-none">
                        799 грн
                    </span>
                </span>
                <span class="text-[10px] uppercase tracking-[1px] opacity-90 mt-1">Одноразовий платіж • Довічний доступ</span>
            </span>
            <span class="btn-spinner"></span>
        </button>

        <!-- Footer Text -->
        <div class="mt-3 flex items-center justify-center opacity-70">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                🔒 Безпечна оплата SSL | APPLE PAY / GOOGLE PAY
            </span>
        </div>
    </div>

    <!-- Popup Modal -->
    <div id="paywall-popup" class="modal-overlay">
        <div class="modal-content" style="border-top: 4px solid #cda45e;">
            <h3 id="popup-title" class="text-2xl font-bold text-white mb-4" style="color: #cda45e;"></h3>
            <p id="popup-text" style="color: var(--secondary-text-color); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6;"></p>

            <button id="popup-checkout-btn" class="btn btn-primary w-full !py-4 shadow-xl">
                <span class="btn-text flex flex-col items-center justify-center gap-0 w-full tracking-tighter">
                    <span class="flex items-center gap-2">
                        <span class="whitespace-nowrap text-[16px] font-bold leading-none">
                            Розблокувати зараз за 149 грн
                        </span>
                    </span>
                </span>
            </button>

            <button id="popup-close-btn" class="btn btn-skip mt-3" style="font-size: 0.8rem; opacity: 0.7;">
                Закрити
            </button>
        </div>
    </div>
</section>`;async function q(s){if(await _(),!window.CircularNatalHoroscope)return`
            <div class="astro-data-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.1);">
                <p class="text-xs text-yellow-400 text-center pulse-text">
                    ⏳ Завантаження астро-даних...<br>
                    (Спробуйте зачекати кілька секунд)
                </p>
            </div>
        `;const{Origin:n,Horoscope:o,Renderer:t}=window.CircularNatalHoroscope;let e=s.geo;if(e||(e={latitude:50.45,longitude:30.52,timezone:"Europe/Kyiv"}),!s.date)return"";try{let a=function(h,x){let E=y[h];if(!E&&h==="ascendant"&&(E=v.Ascendant),!E&&h==="midheaven"&&(E=v.Midheaven),E){const T=E.Sign.label,k=E.ChartPosition.Ecliptic.DecimalDegrees%30,L=Math.floor(k),I=(k-L)*60,S=Math.floor(I),U=Math.round((I-S)*60);return`
                    <div class="astro-data-item">
                        <div class="astro-label-row">
                            <span class="astro-planet-name">${x}:</span>
                             <span class="astro-sign-name">${T}</span>
                        </div>
                        <div class="astro-coords-row">${L}° ${S}' ${U}"</div>
                    </div>
                `}return`<div class="astro-data-item"><strong>${x}:</strong> n/a</div>`};var r=a;const i=s.date.split("-"),m=parseInt(i[0]),b=parseInt(i[1])-1,w=parseInt(i[2]);let g=12,l=0;if(s.time){const h=s.time.split(":");g=parseInt(h[0]),l=parseInt(h[1])}const f=new n({year:m,month:b,date:w,hour:g,minute:l,latitude:parseFloat(e.latitude),longitude:parseFloat(e.longitude),timezone:e.timezone}),v=new o({origin:f,houseSystem:"placidus",zodiac:"tropical"}),y=v.CelestialBodies,p=[];p.push(a("sun","Сонце")),p.push(a("moon","Місяць")),p.push(a("ascendant","ASC")),p.push(a("venus","Венера")),p.push(a("mars","Марс")),p.push(a("jupiter","Юпітер"));let c="";const u=document.createElement("div");u.style.position="absolute",u.style.left="-9999px",u.style.width="600px",u.style.height="600px",document.body.appendChild(u);try{new t(v).render(u);const x=u.querySelector("svg");x&&(x.style.backgroundColor="transparent",x.querySelectorAll("line, circle, path").forEach(k=>{const L=k.getAttribute("stroke");(!L||L==="#000000"||L==="#000"||L==="black")&&(k.setAttribute("stroke","#cda45e"),k.setAttribute("stroke-width","1.5"))}),x.querySelectorAll("text").forEach(k=>{k.setAttribute("fill","#cda45e"),k.style.fill="#cda45e",k.style.fontFamily="'Montserrat', sans-serif",k.style.fontWeight="500"}),c=`
                    <div class="astro-chart-preview">
                        ${u.innerHTML}
                    </div>
                `)}catch(h){console.warn("Chart Render Error:",h)}return document.body.removeChild(u),`
            <div class="astro-data-box">
                <div class="astro-data-title">Твій Космічний Відбиток</div>
                ${c} 
                <div class="astro-data-grid">
                    ${p.join("")}
                </div>
            </div>
        `}catch(i){return console.error("Fingerprint render error:",i),`<div class="astro-data-box"><p class="text-xs text-red-400 text-center">Помилка розрахунку: ${i.message}</p></div>`}}function be(s){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=fe;const o=document.getElementById("paywall-timer"),t=document.getElementById("paywall-astro-data"),e=document.getElementById("final-checkout-button"),r=document.getElementById("paywall-popup"),i=document.getElementById("popup-title"),m=document.getElementById("popup-text"),b=document.getElementById("popup-checkout-btn"),w=document.getElementById("popup-close-btn");H(),window.showPaywallPopup=function(y,a){r&&i&&m&&(i.innerText=y,m.innerText=a,r.style.display="flex")},w&&w.addEventListener("click",()=>{r.style.display="none"}),b&&b.addEventListener("click",()=>{r.style.display="none",v(e)}),r&&r.addEventListener("click",y=>{y.target===r&&(r.style.display="none")});const g={date:d.get("date"),time:d.get("time"),city:d.get("city"),geo:d.get("geo")};t&&q(g).then(y=>{y?(t.innerHTML=y,t.style.display="block"):t.style.display="none"}),window.paywallInterval&&clearInterval(window.paywallInterval);let l=420;function f(){if(!o)return;const y=Math.floor(l/60),a=l%60;o.textContent=`${y<10?"0":""}${y}:${a<10?"0":""}${a}`,--l<0&&(l=0,clearInterval(window.paywallInterval))}f(),window.paywallInterval=setInterval(f,1e3);async function v(y){y.classList.add("loading"),y.disabled=!0;try{sessionStorage.setItem("destinyCodeData",JSON.stringify(g))}catch(p){console.error("Storage error:",p)}console.log("Simulating payment processing..."),await new Promise(p=>setTimeout(p,2500)),console.log("Payment simulation successful."),clearInterval(window.paywallInterval),d.set("isPaid",!0),z(g);const a=new URL(window.location);a.searchParams.set("payment","success"),window.history.pushState({},"",a),s.navigateTo("success")}e&&e.addEventListener("click",()=>v(e))}const ve=`<section id="success-step" class="funnel-step active space-y-6">
    <div id="email-capture-box" class="text-center">
        <!-- Icon -->
        <svg class="w-16 h-16 mx-auto mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        
        <!-- Headers -->
        <h2 class="text-2xl font-bold text-center text-white">
            <span style="color: var(--accent-color);">Оплата успішна!</span>
        </h2>
        <p style="color: var(--secondary-text-color);" class="mb-6">
            Твій персональний звіт готовий до відправки. Вкажи email на який надіслати:
        </p>

        <!-- Main Form -->
        <form id="email-form" class="space-y-4 mb-8">
            <label for="user-email" class="sr-only">Ваш Email</label>
            
            <!-- Hardcore styles for dark theme input -->
            <input 
                type="email" 
                id="user-email" 
                name="user-email" 
                placeholder="your.email@gmail.com" 
                class="input-field text-center" 
                style="background-color: var(--card-bg-color) !important; color: #e0e0e0 !important; -webkit-text-fill-color: #e0e0e0 !important;"
                required
            >
            
            <!-- 🔥 UPDATE: Повернено стандартний золотий клас 'btn-primary'.
                 Клас-градієнт .btn-gold-purple буде додано через JS після оплати апселу. -->
            <button type="submit" id="main-report-btn" class="btn btn-primary !text-lg !py-4">
                <span class="btn-text">Надіслати мені звіт</span>
                <span class="btn-spinner"></span>
            </button>
        </form>

        <!-- LTV Upsell Box -->
        <div id="ltv-upsell-box" class="ltv-upsell-box text-left relative overflow-hidden">
            <!-- Badge -->
            <div class="absolute top-0 right-0 bg-[#9d4edd] text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg" style="margin-top: 0; margin-right: 0;">SPECIAL OFFER</div>
            
            <!-- Content -->
            <h3 class="font-bold text-lg text-white mb-1" style="color: var(--accent-secondary); margin-right: 60px;">
                Додай до свого замовлення
            </h3>
            
            <p class="text-sm mt-2 mb-4 leading-relaxed" style="color: var(--secondary-text-color);">
                Хочеш повний <strong>Астрологічний прогноз</strong> на найближчий рік? Дізнатися про свої фінансові піки, періоди удачі та успіхи у стосунках?<br>
                <span style="color: var(--primary-text-color);">Лише зараз: <strong>247 грн.</strong> замість <span style="text-decoration: line-through; opacity: 0.7;">1399 грн</span> (знижка 83%)</span>
            </p>
            
            <button id="ltv-upsell-btn" class="btn btn-violet w-full opacity-90 hover:opacity-100">
                <span class="btn-text">Так, додати прогноз за 247 грн. <span style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">1399 грн.</span></span>
                <span class="btn-spinner"></span>
            </button>
        </div>
    </div>

    <!-- Modal: Upsell Email -->
    <div id="upsell-email-modal" class="modal-overlay">
        <div class="modal-content">
            <h3 class="text-2xl font-bold text-white mb-4">Оплата успішна! ✨</h3>
            <p style="color: var(--secondary-text-color);" class="mb-6 text-sm">
                Твій "Персональний прогноз на найближчий рік" успішно оплачено.<br><br>
                Він вже генерується і буде надісланий окремим листом. Вкажи свою пошту для відправки:
            </p>
            <form id="upsell-email-form" class="space-y-4">
                <label for="upsell-email-input" class="sr-only">Ваш Email</label>
                
                <input 
                    type="email" 
                    id="upsell-email-input" 
                    placeholder="your.email@gmail.com" 
                    class="input-field text-center" 
                    style="background-color: var(--card-bg-color) !important; color: #e0e0e0 !important; -webkit-text-fill-color: #e0e0e0 !important;"
                    required
                >
                
                <button type="submit" class="btn btn-violet">
                    <span class="btn-text">Підтвердити email</span>
                    <span class="btn-spinner"></span>
                </button>
            </form>
        </div>
    </div>

    <style>
        /* Global Autofill Override Styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px var(--card-bg-color) inset !important;
            -webkit-text-fill-color: #e0e0e0 !important;
            transition: background-color 5000s ease-in-out 0s;
            caret-color: var(--accent-color);
        }

        #user-email, #upsell-email-input {
            color: #e0e0e0 !important;
            caret-color: var(--accent-color);
        }
        
        #user-email::placeholder, #upsell-email-input::placeholder {
            color: var(--secondary-text-color);
            opacity: 0.7;
            -webkit-text-fill-color: var(--secondary-text-color) !important;
        }

        /* 🔥 NEW CLASS: Золото-Фіолетовий градієнт */
        .btn-gold-purple {
            background: linear-gradient(135deg, #cda45e 0%, #9d4edd 100%) !important;
            color: white !important;
            border: none !important;
            box-shadow: 0 4px 20px rgba(157, 78, 221, 0.4) !important;
        }
        .btn-gold-purple:hover {
            opacity: 0.95;
            box-shadow: 0 6px 25px rgba(157, 78, 221, 0.6) !important;
        }
    </style>
</section>`;function he(s){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=ve;const o=document.getElementById("email-form"),t=document.getElementById("user-email"),e=document.getElementById("main-report-btn"),r=document.getElementById("ltv-upsell-box"),i=document.getElementById("ltv-upsell-btn"),m=document.getElementById("upsell-email-modal"),b=document.getElementById("upsell-email-form"),w=document.getElementById("upsell-email-input");d.get("email")&&(t.value=d.get("email"));function g(){if(e){e.classList.remove("btn-primary"),e.classList.add("btn-gold-purple");const l=e.querySelector(".btn-text");l&&(l.innerText="Надіслати мені звіт + Прогноз")}}i.addEventListener("click",async()=>{const l=i,f=l.querySelector(".btn-text").innerText;l.classList.add("loading"),l.disabled=!0,l.querySelector(".btn-text").innerText="Обробка платежу...";try{console.log("Upsell payment initiated..."),await new Promise(y=>setTimeout(y,2e3)),console.log("Upsell Payment successful."),d.set("hasPaidUpsell",!0),l.classList.remove("loading"),l.querySelector(".btn-text").innerText="Оплачено! ✅",l.style.opacity="0.7",g(),setTimeout(()=>{r.style.display="none"},1500);const v=t.value;if(v&&v.includes("@")){const y={date:d.get("date"),time:d.get("time"),city:d.get("city"),geo:d.get("geo")};O(y,v),alert("Прогноз оплачено! Натисніть 'Надіслати мені звіт', щоб завершити.")}else m.style.display="flex"}catch(v){console.error("Upsell Error:",v),l.classList.remove("loading"),l.disabled=!1,l.querySelector(".btn-text").innerText=f,alert("Помилка оплати. Спробуйте ще раз.")}}),b.addEventListener("submit",l=>{l.preventDefault();const f=w.value;if(f){m.style.display="none",t.value=f,d.set("email",f);const v={date:d.get("date"),time:d.get("time"),city:d.get("city"),geo:d.get("geo")};O(v,f),g()}}),o.addEventListener("submit",l=>{l.preventDefault();const f=t.value;f&&(d.set("email",f),s.navigateTo("generation"))})}const xe=`<!-- 🔥 UPDATE: Центрування анімації звіту за допомогою CSS класу -->
<section id="generation-step" class="funnel-step active step-centered text-center" style="margin-top: auto; margin-bottom: auto;">
    <h2 class="text-2xl font-bold text-center text-white mb-6">
        <span style="color: var(--accent-color);">Підготовка звіту!</span>
    </h2>
    
    <!-- Spinner (Margin from Monolith) -->
    <div class="spinner" style="margin-top: 2rem; margin-bottom: 1rem; margin-left: auto; margin-right: auto;"></div>
    
    <!-- Typing Container -->
    <div id="report-typing-container" class="typing-container" style="min-height: 3rem; display: flex; align-items: center; justify-content: center;">
        <span id="report-loading-text" style="color: var(--secondary-text-color); font-size: 1.1rem;"></span>
        <span id="report-cursor" class="typing-cursor" style="display: none;"></span>
    </div>
</section>`;async function we(s){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=xe;const o=document.getElementById("report-loading-text"),t=document.getElementById("report-cursor"),e={date:d.get("date"),time:d.get("time"),city:d.get("city"),geo:d.get("geo")},r=d.get("email");d.get("hasPaidUpsell")&&O(e,r).catch(l=>console.warn("Forecast bg error:",l));let i=!1;const m=ae(e,r).then(l=>l&&!l.error?(d.set("fullReport",l),i=!0,{success:!0}):{success:!1,message:l.message,type:l.type}).catch(l=>(console.error("API Network Error:",l),{success:!1,message:"Проблема з мережею"})),b=50,w=[{text:"✨ Аналізую Ядро твоєї Особистості",pause:1e3},{text:"❤️‍🔥 Розшифровую твої сценарії Кохання",pause:1e3},{text:"👑 Шукаю, де приховані твої Гроші",pause:1e3},{text:"🔮 Вивчаю твої Кармічні Уроки",pause:1e3},{text:"⚡️ Формую структуру твого звіту",pause:500}];for(const l of w)await P(o,t,l.text,b,l.pause,!1);if(!i){const l=["✍️ Дописую розділ про майбутнє...","🎨 Оформлюю твої таблиці...","✨ Додаю останні штрихи...","🚀 Майже готово..."];let f=0;for(;!i;){await P(o,t,l[f],b,0,!1);for(let v=0;v<20&&!i;v++)await new Promise(y=>setTimeout(y,100));f=(f+1)%l.length}}await P(o,t,"✅ Звіт готовий!",30,500,!0);const g=await m;if(g.success)s.navigateTo("premium-result");else{let l="З'єднання перервано";g.type==="timeout"?l="Сервер прогрівається. Спробуйте ще раз.":g.message&&(l=g.message),o.innerHTML=`<span style="color: #ef4444; font-size: 0.9em;">⚠️ ${l}</span>`,t&&(t.style.display="none");const f=document.createElement("button");f.className="btn btn-primary mt-4",f.innerText="Натисніть для повтору ↻",f.onclick=()=>s.navigateTo("generation"),document.getElementById("report-typing-container").appendChild(f)}}const Ee=`<section id="premium-result-step" class="funnel-step active space-y-6">
    
    <!-- 1. Контейнер звіту (Точна копія стилів #full-report-content з моноліту) -->
    <div id="full-report-content" class="text-left p-5 rounded-xl space-y-4" style="background-color: var(--card-bg-color); border: 1px solid var(--border-color); display: block;">
        <!-- Сюди JS вставить згенерований HTML звіту -->
        <div class="text-center py-10">
            <div class="spinner mx-auto"></div>
            <p class="mt-4 text-gray-400">Завантаження даних...</p>
        </div>
    </div>

    <!-- 2. Контейнер дій (Кнопки) -->
    <div id="report-actions-container" style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
        <!-- Кнопки будуть згенеровані через JS -->
    </div>

    <!-- 3. Модальне вікно Late Upsell (для кнопки "Отримати прогноз") -->
    <!-- Копія #late-upsell-modal з моноліту -->
    <div id="late-upsell-modal" class="modal-overlay">
        <div class="modal-content" style="width: 480px; max-width: 95%;">
            <div style="text-align: right; margin-bottom: 10px;">
                <button type="button" id="close-late-upsell" style="background:none; border:none; color: #6b7280; font-size: 1.5rem;">&times;</button>
            </div>
            <div class="text-left relative overflow-hidden">
                <h3 class="font-bold text-lg text-white mb-2" style="color: var(--accent-secondary);">
                    Додай до свого замовлення
                </h3>
                <p class="text-sm mt-2 mb-6 leading-relaxed" style="color: var(--secondary-text-color);">
                    Хочеш повний <strong>Астрологічний прогноз</strong> на найближчий рік? Дізнатися про свої фінансові піки, періоди удачі та успіхи у стосунках?<br><br>
                    <span style="color: var(--primary-text-color);">Лише зараз: <strong>247 грн.</strong> замість <span style="text-decoration: line-through; opacity: 0.7;">1399 грн</span> (знижка 83%)</span>
                </p>
                <button id="late-upsell-btn" class="btn btn-violet w-full">
                    <span class="btn-text">Так, додати прогноз за 247 грн.</span>
                    <span class="btn-spinner"></span>
                </button>
            </div>
        </div>
    </div>

</section>`;function ke(s){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=Ee;const o=document.getElementById("full-report-content"),t=document.getElementById("report-actions-container"),e=document.getElementById("late-upsell-modal"),r=document.getElementById("close-late-upsell"),i=document.getElementById("late-upsell-btn"),m=d.get("fullReport"),b={date:d.get("date"),time:d.get("time"),city:d.get("city"),geo:d.get("geo"),planets:d.get("planets")||[]};d.get("hasPaidUpsell");const w=d.get("email");async function g(){if(!m||!m.sections){o.innerHTML=`
                <div class="text-center p-6">
                    <p class="text-red-400 mb-4">Дані звіту не знайдено.</p>
                    <button id="refresh-report-btn" class="btn btn-secondary">Оновити сторінку</button>
                </div>
            `,document.getElementById("refresh-report-btn").onclick=()=>window.location.reload();return}let a="";for(const u of m.sections){const h=u.analysis_text.split(`
`).filter(E=>E.trim().length>0).map(E=>`<p>${E.trim().replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}</p>`).join(""),x=u.practical_advice.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\\n/g,"<br>");a+=`
                <div class="report-section mb-6">
                    <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--accent-color); margin-top: 1.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
                        ${u.icon||"✨"} ${u.title}
                    </h2>
                    
                    <div class="report-content-text text-left leading-relaxed space-y-4" style="color: var(--secondary-text-color);">
                        ${h}
                    </div>
                    
                    <div class="report-advice mt-4">
                        <strong style="color: var(--accent-color);">Практична Порада:</strong>
                        <p class="mt-2" style="color: var(--primary-text-color); opacity: 0.9;">${x}</p>
                    </div>
                </div>
            `}const p=await q(b),c=a+p;o.innerHTML=c,l()}function l(){t.innerHTML="";const a=document.createElement("button");if(a.className="btn btn-secondary",a.id="download-pdf-btn",a.innerHTML='<span class="btn-text">Завантажити PDF</span><span class="btn-spinner"></span>',a.onclick=()=>f(a,o.innerHTML),t.appendChild(a),d.get("hasPaidUpsell")){const p=document.createElement("button");p.className="btn btn-secondary",p.style.marginTop="10px",p.innerHTML='<span class="btn-text">Спробувати ще (Почати знову)</span>',p.onclick=()=>{if(confirm("Ви впевнені? Це очистить поточний звіт.")){d.clear();const c=window.location.pathname;window.history.replaceState({},document.title,c),window.location.href=c}},t.appendChild(p)}else{const p=document.createElement("button");p.className="btn btn-violet",p.style.marginTop="10px",p.innerHTML='<span class="btn-text">Отримати прогноз на рік</span>',p.onclick=()=>{e.style.display="flex"},t.appendChild(p)}}async function f(a,p){v(a,!0);const c="https://createpdf-kpkshoor7q-ew.a.run.app";try{const u=document.createElement("div");u.innerHTML=p;const h=u.querySelector(".astro-data-box");h&&h.remove();const x=u.innerHTML,E=Array.from(document.styleSheets).map(L=>{try{return Array.from(L.cssRules).map(I=>I.cssText).join(`
`)}catch{return""}}).join(`
`);console.log("Sending PDF Request with Planets:",b.planets);const T=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reportHtml:x,reportStyles:E,userData:b,reportType:"main"})});if(!T.ok)throw new Error("Backend error");const k=await T.json();if(k.success&&k.pdfBase64){const L=y(k.pdfBase64,"application/pdf"),I=URL.createObjectURL(L),S=document.createElement("a");S.href=I,S.download=k.filename||"DestinyCode_Report.pdf",document.body.appendChild(S),S.click(),document.body.removeChild(S),URL.revokeObjectURL(I)}else throw new Error("Invalid response")}catch(u){console.error(u),N("Помилка","Не вдалося завантажити PDF. Спробуйте ще раз.")}finally{v(a,!1)}}r.addEventListener("click",()=>{e.style.display="none"}),i.addEventListener("click",async()=>{const a=i,p=a.querySelector(".btn-text").innerText;a.classList.add("loading"),a.disabled=!0,a.querySelector(".btn-text").innerText="Обробка...";try{await new Promise(c=>setTimeout(c,2e3)),d.set("hasPaidUpsell",!0),w&&O(b,w),a.classList.remove("loading"),a.querySelector(".btn-text").innerText="Оплачено! ✅",setTimeout(()=>{e.style.display="none",l(),N("Успіх!","Прогноз оплачено і відправлено на пошту!")},1e3)}catch{a.classList.remove("loading"),a.disabled=!1,a.querySelector(".btn-text").innerText=p,N("Помилка","Не вдалося провести оплату.")}});function v(a,p){p?(a.classList.add("loading"),a.disabled=!0):(a.classList.remove("loading"),a.disabled=!1)}function y(a,p){const c=atob(a),u=[];for(let h=0;h<c.length;h+=512){const x=c.slice(h,h+512),E=new Array(x.length);for(let T=0;T<x.length;T++)E[T]=x.charCodeAt(T);u.push(new Uint8Array(E))}return new Blob(u,{type:p})}g()}C.register("welcome",V);C.register("loading",le);C.register("result",ce);C.register("premium-data",ge);C.register("paywall",be);C.register("success",he);C.register("generation",we);C.register("premium-result",ke);document.addEventListener("DOMContentLoaded",()=>{D();const n=new URLSearchParams(window.location.search).get("payment"),o=sessionStorage.getItem("destinyUser");if(o)try{const t=JSON.parse(o);d.set("date",t.date),d.set("time",t.time),d.set("city",t.city),d.set("geo",t.geo),console.log("Session restored")}catch(t){console.error("Failed to restore session:",t)}n==="success"?(window.history.replaceState({},document.title,window.location.pathname),C.navigateTo("success")):C.navigateTo("welcome")});
