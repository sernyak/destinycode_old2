(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();class U{constructor(){this.routes={},this.currentStage=null,this.appContainer=document.getElementById("app")}register(n,r){this.routes[n]=r}navigateTo(n,r={}){if(!this.routes[n]){console.error(`Маршрут "${n}" не знайдено.`),n!=="welcome"&&(console.warn("Redirecting to welcome screen..."),this.navigateTo("welcome"));return}if(console.log(`Navigating to: ${n}`),this.appContainer){this.appContainer.innerHTML="";try{this.routes[n](this,r),this.currentStage=n,window.scrollTo(0,0)}catch(t){console.error(`Error initializing stage "${n}":`,t),this.appContainer.innerHTML='<div class="p-4 text-center text-red-500">Сталася помилка при завантаженні екрану. Будь ласка, оновіть сторінку.</div>'}}else console.error("CRITICAL: App container #app not found in DOM!")}}const C=new U;class D{constructor(){this.storageKey="destinyUser",this.data=this.load()}load(){try{const n=sessionStorage.getItem(this.storageKey);return n?JSON.parse(n):{}}catch{return console.warn("SessionStorage disabled or inaccessible"),{}}}save(){try{sessionStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch{console.warn("Failed to save to SessionStorage")}}get(n){return this.data[n]}set(n,r){this.data[n]=r,this.save()}clear(){this.data={},sessionStorage.removeItem(this.storageKey)}}const p=new D;function N(){if(document.getElementById("global-info-modal"))return;document.body.insertAdjacentHTML("beforeend",`
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
    `);const n=document.getElementById("global-info-modal"),r=document.getElementById("global-modal-close"),t=()=>{n.style.display="none"};r.addEventListener("click",t),n.addEventListener("click",e=>{e.target===n&&t()})}function A(a,n){N();const r=document.getElementById("global-info-modal"),t=document.getElementById("global-modal-title"),e=document.getElementById("global-modal-message");r&&t&&e?(t.innerText=a,e.innerHTML=n,r.style.display="flex"):alert(`${a}

${n}`)}const F=`<section id="landing-step" class="funnel-step active space-y-8 text-center flex flex-col justify-between" style="min-height: calc(100vh - 80px);">
    
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
    <div class="clean-footer-link">
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
            </div>
            <div class="opacity-80 text-xs mt-4 border-t border-gray-700 pt-4">
                <p class="mb-2"><strong>ВІДМОВА ВІД ВІДПОВІДАЛЬНОСТІ:</strong><br>Всі астрологічні прогнози, розрахунки та описи на цьому сайті надаються виключно в розважальних та ознайомчих цілях.</p>
                <p class="italic opacity-70 mb-4">IMPORTANT: All materials are for educational and entertainment purposes only.</p>
                
                <p><strong>КОНТАКТИ ПРОДАВЦЯ:</strong></p>
                <p>ФОП Серняк О.О. | ІПН 3169419596</p>
                <p>destinycode.online@gmail.com</p>
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
</div>`;let B=null;function O(){return window.CircularNatalHoroscope?Promise.resolve(!0):B?(console.log("⏳ Astro Library load request joined existing queue..."),B):(console.log("🚀 Starting Astro Library sequence..."),B=new Promise(a=>{window.module||(window.module={exports:{}}),window.exports=window.module.exports;const n=["https://unpkg.com/circular-natal-horoscope-js@1.1.0/dist/index.js","https://cdn.jsdelivr.net/npm/circular-natal-horoscope-js@1.1.0/dist/index.js","./js/astro-lib.js"];function r(t){if(t>=n.length){console.error("❌ CRITICAL: Всі джерела бібліотеки (включно з локальним) недоступні."),a(!1),B=null;return}const e=n[t],i=document.createElement("script");i.src=e,i.async=!0,i.onload=()=>{window.module&&window.module.exports&&window.module.exports.Horoscope?(window.CircularNatalHoroscope=window.module.exports,console.log(`✅ Astro Library Loaded Successfully from ${e}`),a(!0)):window.CircularNatalHoroscope?(console.log(`✅ Astro Library Loaded (Global) from ${e}`),a(!0)):(console.warn(`⚠️ Script loaded from ${e}, but exports missing.`),r(t+1))},i.onerror=()=>{console.warn(`⚠️ Failed to load from ${e}. Switching to backup source...`),r(t+1)},document.head.appendChild(i)}r(0)}),B)}function z(a){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=F;const r=document.getElementById("birth-form"),t=document.getElementById("birth-date"),e=document.getElementById("error-message"),i=document.getElementById("date-placeholder"),l=r.querySelector('button[type="submit"]'),c=document.getElementById("info-modal"),m=document.getElementById("legal-modal"),E=document.getElementById("open-info-modal-btn"),h=document.getElementById("close-info-modal-icon"),g=document.getElementById("close-info-modal-btn"),x=document.getElementById("close-legal-modal-icon"),w=document.getElementById("close-legal-modal-btn"),u=document.getElementById("legal-modal-body"),s=document.querySelectorAll(".legal-link[data-legal-type]");function o(){c&&(c.style.display="flex")}function f(){c&&(c.style.display="none")}function d(L){const v=document.getElementById("legal-content-"+L);v&&m&&u&&(u.innerHTML=v.innerHTML,m.style.display="flex")}function y(){m&&(m.style.display="none")}E&&E.addEventListener("click",o),h&&h.addEventListener("click",f),g&&g.addEventListener("click",f),x&&x.addEventListener("click",y),w&&w.addEventListener("click",y),c&&c.addEventListener("click",L=>{L.target===c&&f()}),m&&m.addEventListener("click",L=>{L.target===m&&y()}),s.forEach(L=>{L.addEventListener("click",v=>{const T=v.target.getAttribute("data-legal-type");f(),setTimeout(()=>{d(T)},50)})});function b(){const L=t.value;if(!L)i.innerText="Обрати дату народження",i.style.color="var(--secondary-text-color)";else{const v=L.split("-");if(v.length===3){const T=`${v[2]}.${v[1]}.${v[0]}`;i.innerText=T,i.style.color="var(--primary-text-color)"}}}function k(){t.value===""&&(console.log("Setting default date to 1995-01-01 for convenience."),t.value="1995-01-01",b())}t.addEventListener("input",b),t.addEventListener("change",b),t.addEventListener("blur",b),t.addEventListener("touchend",()=>setTimeout(b,500)),t.addEventListener("focus",k),t.addEventListener("click",k),t.addEventListener("touchstart",k),b(),r.addEventListener("submit",async function(L){L.preventDefault();const v=t.value;if(v==="")e.innerText="Будь ласка, обери дату народження.",e.style.display="block";else{let I=function(S,_){S.classList.add("loading"),S.disabled=!0};var T=I;e.style.display="none",p.set("date",v),I(l),O(),a.navigateTo("loading")}})}const q=`<section id="loading-step" class="min-h-screen flex flex-col justify-center items-center px-4 fade-in text-center relative z-10">
    <!-- Спінер (стилі вже в main.css) -->
    <div class="spinner mb-6" style="display: block; width: 4rem; height: 4rem; border-width: 4px; border-color: var(--accent-color) transparent var(--accent-color) transparent;"></div>
    
    <!-- Контейнер для тексту -->
    <div id="loading-typing-container" class="text-xl text-[#a0a0a0] min-h-[3rem]">
        <span id="loading-text"></span>
        <span id="loading-cursor" class="inline-block w-[10px] h-[1.25rem] bg-[#cda45e] ml-1 align-middle animate-pulse"></span>
    </div>
</section>`;function M(a,n,r,t=50,e=0,i=!1){return new Promise(l=>{let c=0;n&&(n.style.display="inline-block"),a.innerHTML="";function m(){c<r.length?(a.innerHTML=r.substring(0,c+1),c++,setTimeout(m,t)):setTimeout(()=>{!i&&n&&(n.style.display="none"),l()},e)}m()})}async function J(a){if(!await O())throw new Error("Astro Library not loaded");const{Origin:n,Horoscope:r,Renderer:t}=window.CircularNatalHoroscope,e=a.date.split("-"),i=parseInt(e[0]),l=parseInt(e[1])-1,c=parseInt(e[2]);let m=12,E=0;if(a.time){const o=a.time.split(":");m=parseInt(o[0]),E=parseInt(o[1])}let h=50.45,g=30.52,x="Europe/Kyiv";if(a.geo){const o=parseFloat(a.geo.latitude||a.geo.lat),f=parseFloat(a.geo.longitude||a.geo.lon);!isNaN(o)&&!isNaN(f)&&(h=o,g=f,x=a.geo.timezone||x)}let w=[],u=null,s=null;try{const o=new n({year:i,month:l,date:c,hour:m,minute:E,latitude:h,longitude:g,timezone:x});s=new r({origin:o,houseSystem:"placidus",zodiac:"tropical"});const f=s.CelestialBodies;["sun","moon","mercury","venus","mars","jupiter","saturn","ascendant","midheaven","northnode"].forEach(y=>{let b=f[y];if(!b&&y==="ascendant"&&(b=s.Ascendant),!b&&y==="midheaven"&&(b=s.Midheaven),b){const k=b.Sign.label,L=Math.floor(b.ChartPosition.Ecliptic.DecimalDegrees%30),v=y.charAt(0).toUpperCase()+y.slice(1);w.push(`${v}: ${k} ${L}°`)}})}catch(o){return console.error("Horoscope Calculation Failed:",o),{planets:[],chartSvg:null,houseSystem:"Error"}}try{if(s){const o=document.createElement("div");o.style.position="absolute",o.style.left="-9999px",o.style.visibility="hidden",document.body.appendChild(o),new t(s).render(o);const d=o.querySelector("svg");d&&(d.style.backgroundColor="transparent",d.querySelectorAll("line, circle, path").forEach(y=>{const b=y.getAttribute("stroke");(!b||b==="#000000"||b==="#000")&&y.setAttribute("stroke","#cda45e");const k=y.getAttribute("fill");(k==="#000000"||k==="#000")&&y.setAttribute("fill","#cda45e")}),d.querySelectorAll("text").forEach(y=>{y.style.fill="#cda45e",y.setAttribute("fill","#cda45e"),y.style.fontFamily="'Montserrat', sans-serif"}),u=o.innerHTML),document.body.removeChild(o)}}catch(o){console.warn("SVG Render Error:",o)}return{planets:w,chartSvg:u,houseSystem:"Placidus"}}const G="https://getaiprediction-kpkshoor7q-ew.a.run.app",R="https://sendreportemail-kpkshoor7q-ew.a.run.app",K="gemini-2.5-flash",V=`Ти — 'Майстер Астро-Психолог' Destiny Code.
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
9. ЗАБОРОНЕНО: Медичні терміни. Складні астро-терміни без пояснень. "Смерть".`,Y=`Місія: 'Безкоштовний Гачок'.
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
ВИМОГИ: Відповідай ТІЛЬКИ валідним JSON. Жодного тексту до чи після.`,W=`Місія: 'Повний Психологічний Портрет' (Платний).
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
ВИМОГИ: Відповідай ТІЛЬКИ валідним JSON. 'analysis_text' має бути деталізованим (3-4 абзаци), з **жирними** акцентами.`,X=`
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
`;async function $(a,n){const t={contents:[{parts:[{text:`${a}

Вхідні дані:
${n}`}]}],systemInstruction:{parts:[{text:V}]}};let e=1e3;for(let i=0;i<3;i++)try{const l=await fetch(G,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payload:t,modelName:K})});if(l.ok){const c=await l.json(),m=c.candidates?.[0];if(m&&m.content?.parts?.[0]?.text){let E=m.content.parts[0].text;const h=E.match(/```json\n([\s\S]*?)\n```/);return h&&h[1]&&(E=h[1]),E}else return console.warn("Safety/Empty Block:",c),'{"error": "safety_block", "message": "На жаль, аналіз не вдалося завершити через обмеження безпеки."}'}if(l.status===429){console.warn("Throttled, retrying..."),await new Promise(c=>setTimeout(c,e)),e*=2;continue}throw new Error(`Server Error: ${l.status}`)}catch(l){if(console.error(`Attempt ${i+1} failed:`,l),i===2)throw l;await new Promise(c=>setTimeout(c,e)),e*=2}}async function Q(a){try{const n=await $(Y,`Дата народження: ${a}`);return JSON.parse(n)}catch(n){return console.error("Free Analysis Parse Error:",n),{title:"Твоє Ядро Особистості",psychological_analysis:"На жаль, ми не змогли отримати відповідь від зірок прямо зараз. Спробуйте пізніше."}}}async function Z(a,n){let r="";const t={...a};try{const l=await J(a);l&&l.planets&&(r=`
            == Технічні Астрологічні Дані (для аналізу) ==
            [Точні Координати]
            ${l.planets.join(`
`)}
            == Кінець Технічних Даних ==
            `,t.planets=l.planets)}catch(l){console.warn("Local calculation skipped:",l)}const e=`
    Дата: ${a.date}
    Час: ${a.time}
    Місто: ${a.city}
    ${r}
    `,i=await $(W,e);try{fetch(R,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:n,reportHtml:i,reportTitle:"Твій Повний Аналіз",reportType:"main",userData:t})})}catch(l){console.error("Email error:",l)}try{return JSON.parse(i)}catch(l){return console.error("Full Report Parse Error:",l),{error:!0,message:"Помилка обробки звіту."}}}async function P(a,n){const r=`Користувач: Жінка. Дата: ${a.date}. Місто: ${a.city}`;try{const t=await $(X,r);return fetch(R,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:n,reportHtml:t,reportType:"upsell",userData:a})}),t}catch(t){return console.error("Forecast Error:",t),null}}async function ee(a){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=q;const r=document.getElementById("loading-text"),t=document.getElementById("loading-cursor"),e=p.get("date"),i=(async()=>{const c=["Аналізую положення планет","Будую твою натальну карту","Приготуйся дізнатись, наскільки ти ахуєнна 😈"];await M(r,t,c[0],70,500),await M(r,t,c[1],70,500),await M(r,t,c[2],70,1500,!0),t&&(t.style.display="none")})(),l=Q(e).then(c=>(p.set("freeReport",c),c)).catch(c=>(console.error("API Error:",c),{error:!0,title:"❌ Помилка Аналізу",psychological_analysis:"<p>На жаль, сталася помилка під час обробки відповіді від ШІ. Це могло статися через перенавантаження.</p>"}));await Promise.all([i,l]),a.navigateTo("result")}const te=`<!-- 🔥 FIX: Додано клас 'active' для відображення -->
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
</section>`;function ne(a){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=te;const r=document.getElementById("result-title"),t=document.getElementById("free-report-title"),e=document.getElementById("free-report-text"),i=document.getElementById("upgrade-button"),l=p.get("freeReport");if(!l){a.navigateTo("welcome");return}let c="";l.psychological_analysis?c=l.psychological_analysis.replace(/\*\*(.*?)\*\*/g,'<strong style="color: var(--primary-text-color);">$1</strong>').replace(/\\n/g,"<br>"):c="<p>Дані відсутні.</p>",r.innerText="Аналіз твоєї особистості",t.innerHTML=l.title||"Результат",e.innerHTML=c,i.addEventListener("click",()=>{a.navigateTo("premium-data")})}const oe=`<!-- 🔥 UPDATE: Видалено центрування (margin: auto) для верху сторінки, як в моноліті -->
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
            <button type="button" id="skip-button" class="btn btn-skip">
                Я не знаю точно часу (Скласти космограму без Домів)
            </button>
        </div>
    </div>
</section>`,se="https://getaiprediction-kpkshoor7q-ew.a.run.app",ae="gemini-2.5-flash",re=`
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
`;async function le(a,n){const r={contents:[{parts:[{text:n}]}],systemInstruction:{parts:[{text:a}]}};try{const t=await fetch(se,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payload:r,modelName:ae})});if(t.ok){const i=(await t.json()).candidates?.[0];if(i&&i.content?.parts?.[0]?.text)return i.content.parts[0].text}return console.warn("Geo API Warning:",t.status),null}catch(t){return console.error("Geo API Network Error:",t),null}}async function H(a){const n=`Місто: ${a}`;try{const r=await le(re,n);if(!r)return{error:"network_failure"};const t=r.replace(/```json\n?([\s\S]*?)\n?```/g,"$1").trim(),e=JSON.parse(t);return e&&typeof e.lat=="number"&&typeof e.lon=="number"?(console.log(`Geocoding success for ${a}:`,e),{latitude:e.lat,longitude:e.lon,timezone:e.timezone,corrected_name:e.corrected_name,error:null}):e&&e.error?(console.warn(`Geocoding failed for ${a}:`,e.error),{error:e.error}):{error:"parse_error"}}catch(r){return console.error(`Geocoding failed for ${a}:`,r),{error:"network_failure"}}}function ie(a){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=oe;const r=document.getElementById("birth-time"),t=document.getElementById("time-placeholder"),e=r.closest(".input-field"),i=document.getElementById("time-error-message"),l=document.getElementById("birth-city"),c=document.getElementById("city-error-message"),m=document.getElementById("city-info-message"),E=document.getElementById("continue-to-paywall-button"),h=document.getElementById("skip-button");function g(){!r||!t||(r.value?(t.innerText=r.value,t.style.color="var(--primary-text-color)",e&&e.classList.remove("input-error"),i&&(i.style.display="none")):(t.innerText="Обери час",t.style.color="var(--secondary-text-color)"))}r.addEventListener("input",g),r.addEventListener("change",g),r.addEventListener("blur",g),g(),l.addEventListener("input",()=>{c.style.display="none",m.style.display="none",l.classList.remove("input-error")});function x(u,s){u&&(s?(u.classList.add("loading"),u.disabled=!0):(u.classList.remove("loading"),u.disabled=!1))}function w(u,s){u==="ambiguous"?c.innerText=`Місто "${s}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну.`:c.innerText=`Не можемо знайти місто "${s}". Перевірте назву.`,c.style.display="block",l.classList.add("input-error")}E.addEventListener("click",async()=>{const u=r.value;let s=l.value.trim();const o=s;let f=!1;if(c.style.display="none",i.style.display="none",e.classList.remove("input-error"),l.classList.remove("input-error"),s||(l.classList.add("input-error"),c.innerText="Будь ласка, введи місто народження.",c.style.display="block",f=!0),u||(e.classList.add("input-error"),i.style.display="block",f=!0),!s&&f){navigator.vibrate&&navigator.vibrate(50);return}x(E,!0);const d=await H(s);let y=null;if(d&&d.latitude?(d.corrected_name&&(l.value=d.corrected_name,s=d.corrected_name,o.toLowerCase()!==d.corrected_name.toLowerCase()&&(y=`Ми уточнили: ${d.corrected_name} 😉`)),p.set("geo",{latitude:d.latitude||d.lat,longitude:d.longitude||d.lon,timezone:d.timezone}),p.set("city",d.corrected_name)):d&&d.error==="ambiguous"?(w("ambiguous",s),f=!0):(w("not_found",s),f=!0),y?(m.innerText=y,m.style.display="block"):m.style.display="none",x(E,!1),f){navigator.vibrate&&navigator.vibrate(50);return}p.set("time",u),setTimeout(()=>{a.navigateTo("paywall")},y?1200:0)}),h.addEventListener("click",async()=>{let u=l.value.trim();const s=u;if(c.style.display="none",i.style.display="none",l.classList.remove("input-error"),e.classList.remove("input-error"),!u){l.classList.add("input-error"),c.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",c.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}x(h,!0);const o=await H(u);let f=null,d=!1;if(o&&o.latitude?(o.corrected_name&&(l.value=o.corrected_name,u=o.corrected_name,s.toLowerCase()!==o.corrected_name.toLowerCase()&&(f=`Ми уточнили: ${o.corrected_name} 😉`)),p.set("geo",{latitude:o.latitude||o.lat,longitude:o.longitude||o.lon,timezone:o.timezone}),p.set("city",o.corrected_name),p.set("time","")):o&&o.error==="ambiguous"?(w("ambiguous",u),d=!0):(w("not_found",u),d=!0),f&&(m.innerText=f,m.style.display="block"),x(h,!1),d){navigator.vibrate&&navigator.vibrate(50);return}console.log("User skipped time, but city is valid."),setTimeout(()=>{a.navigateTo("paywall")},f?1200:0)})}const ce=`<section id="final-paywall-step" class="funnel-step active space-y-6">

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
</section>`;async function j(a){if(await O(),!window.CircularNatalHoroscope)return`
            <div class="astro-data-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.1);">
                <p class="text-xs text-yellow-400 text-center pulse-text">
                    ⏳ Завантаження астро-даних...<br>
                    (Спробуйте зачекати кілька секунд)
                </p>
            </div>
        `;const{Origin:n,Horoscope:r,Renderer:t}=window.CircularNatalHoroscope;let e=a.geo;if(e||(e={latitude:50.45,longitude:30.52,timezone:"Europe/Kyiv"}),!a.date)return"";try{let s=function(y,b){let k=u[y];if(!k&&y==="ascendant"&&(k=w.Ascendant),!k&&y==="midheaven"&&(k=w.Midheaven),k){const L=k.Sign.label,v=k.ChartPosition.Ecliptic.DecimalDegrees%30,T=Math.floor(v),I=(v-T)*60,S=Math.floor(I),_=Math.round((I-S)*60);return`
                    <div class="astro-data-item">
                        <div class="astro-label-row">
                            <span class="astro-planet-name">${b}:</span>
                             <span class="astro-sign-name">${L}</span>
                        </div>
                        <div class="astro-coords-row">${T}° ${S}' ${_}"</div>
                    </div>
                `}return`<div class="astro-data-item"><strong>${b}:</strong> n/a</div>`};var i=s;const l=a.date.split("-"),c=parseInt(l[0]),m=parseInt(l[1])-1,E=parseInt(l[2]);let h=12,g=0;if(a.time){const y=a.time.split(":");h=parseInt(y[0]),g=parseInt(y[1])}const x=new n({year:c,month:m,date:E,hour:h,minute:g,latitude:parseFloat(e.latitude),longitude:parseFloat(e.longitude),timezone:e.timezone}),w=new r({origin:x,houseSystem:"placidus",zodiac:"tropical"}),u=w.CelestialBodies,o=[];o.push(s("sun","Сонце")),o.push(s("moon","Місяць")),o.push(s("ascendant","ASC")),o.push(s("venus","Венера")),o.push(s("mars","Марс")),o.push(s("jupiter","Юпітер"));let f="";const d=document.createElement("div");d.style.position="absolute",d.style.left="-9999px",d.style.width="600px",d.style.height="600px",document.body.appendChild(d);try{new t(w).render(d);const b=d.querySelector("svg");b&&(b.style.backgroundColor="transparent",b.querySelectorAll("line, circle, path").forEach(v=>{const T=v.getAttribute("stroke");(!T||T==="#000000"||T==="#000"||T==="black")&&(v.setAttribute("stroke","#cda45e"),v.setAttribute("stroke-width","1.5"))}),b.querySelectorAll("text").forEach(v=>{v.setAttribute("fill","#cda45e"),v.style.fill="#cda45e",v.style.fontFamily="'Montserrat', sans-serif",v.style.fontWeight="500"}),f=`
                    <div class="astro-chart-preview">
                        ${d.innerHTML}
                    </div>
                `)}catch(y){console.warn("Chart Render Error:",y)}return document.body.removeChild(d),`
            <div class="astro-data-box">
                <div class="astro-data-title">Твій Космічний Відбиток</div>
                ${f} 
                <div class="astro-data-grid">
                    ${o.join("")}
                </div>
            </div>
        `}catch(l){return console.error("Fingerprint render error:",l),`<div class="astro-data-box"><p class="text-xs text-red-400 text-center">Помилка розрахунку: ${l.message}</p></div>`}}function de(a){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=ce;const r=document.getElementById("paywall-timer"),t=document.getElementById("paywall-astro-data"),e=document.getElementById("final-checkout-button"),i=document.getElementById("paywall-popup"),l=document.getElementById("popup-title"),c=document.getElementById("popup-text"),m=document.getElementById("popup-checkout-btn"),E=document.getElementById("popup-close-btn");window.showPaywallPopup=function(u,s){i&&l&&c&&(l.innerText=u,c.innerText=s,i.style.display="flex")},E&&E.addEventListener("click",()=>{i.style.display="none"}),m&&m.addEventListener("click",()=>{i.style.display="none",w(e)}),i.addEventListener("click",u=>{u.target===i&&(i.style.display="none")});const h={date:p.get("date"),time:p.get("time"),city:p.get("city"),geo:p.get("geo")};j(h).then(u=>{u?(t.innerHTML=u,t.style.display="block"):t.style.display="none"}),window.paywallInterval&&clearInterval(window.paywallInterval);let g=420;function x(){const u=Math.floor(g/60),s=g%60;r.textContent=`${u<10?"0":""}${u}:${s<10?"0":""}${s}`,--g<0&&(g=0,clearInterval(window.paywallInterval))}x(),window.paywallInterval=setInterval(x,1e3);async function w(u){u.classList.add("loading"),u.disabled=!0;try{sessionStorage.setItem("destinyCodeData",JSON.stringify(h))}catch(o){console.error("Storage error:",o)}console.log("Simulating payment processing..."),await new Promise(o=>setTimeout(o,2500)),console.log("Payment simulation successful."),clearInterval(window.paywallInterval);const s=new URL(window.location);s.searchParams.set("payment","success"),window.history.pushState({},"",s),a.navigateTo("success")}e.addEventListener("click",()=>w(e))}const pe=`<section id="success-step" class="funnel-step active space-y-6">
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
</section>`;function ue(a){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=pe;const r=document.getElementById("email-form"),t=document.getElementById("user-email"),e=document.getElementById("main-report-btn"),i=document.getElementById("ltv-upsell-box"),l=document.getElementById("ltv-upsell-btn"),c=document.getElementById("upsell-email-modal"),m=document.getElementById("upsell-email-form"),E=document.getElementById("upsell-email-input");p.get("email")&&(t.value=p.get("email"));function h(){if(e){e.classList.remove("btn-primary"),e.classList.add("btn-gold-purple");const g=e.querySelector(".btn-text");g&&(g.innerText="Надіслати мені звіт + Прогноз")}}l.addEventListener("click",async()=>{const g=l,x=g.querySelector(".btn-text").innerText;g.classList.add("loading"),g.disabled=!0,g.querySelector(".btn-text").innerText="Обробка платежу...";try{console.log("Upsell payment initiated..."),await new Promise(u=>setTimeout(u,2e3)),console.log("Upsell Payment successful."),p.set("hasPaidUpsell",!0),g.classList.remove("loading"),g.querySelector(".btn-text").innerText="Оплачено! ✅",g.style.opacity="0.7",h(),setTimeout(()=>{i.style.display="none"},1500);const w=t.value;if(w&&w.includes("@")){const u={date:p.get("date"),time:p.get("time"),city:p.get("city"),geo:p.get("geo")};P(u,w),alert("Прогноз оплачено! Натисніть 'Надіслати мені звіт', щоб завершити.")}else c.style.display="flex"}catch(w){console.error("Upsell Error:",w),g.classList.remove("loading"),g.disabled=!1,g.querySelector(".btn-text").innerText=x,alert("Помилка оплати. Спробуйте ще раз.")}}),m.addEventListener("submit",g=>{g.preventDefault();const x=E.value;if(x){c.style.display="none",t.value=x,p.set("email",x);const w={date:p.get("date"),time:p.get("time"),city:p.get("city"),geo:p.get("geo")};P(w,x),h()}}),r.addEventListener("submit",g=>{g.preventDefault();const x=t.value;x&&(p.set("email",x),a.navigateTo("generation"))})}const me=`<!-- 🔥 UPDATE: Центрування анімації звіту за допомогою CSS класу -->
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
</section>`;async function ye(a){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=me;const r=document.getElementById("report-loading-text"),t=document.getElementById("report-cursor"),e={date:p.get("date"),time:p.get("time"),city:p.get("city"),geo:p.get("geo")},i=p.get("email");p.get("hasPaidUpsell")&&P(e,i);const l=(async()=>{const E=[{text:"✨ Аналізую Ядро твоєї Особистості",pause:1e3},{text:"❤️‍🔥 Розшифровую твої сценарії Кохання",pause:1e3},{text:"👑 Шукаю, де приховані твої Гроші",pause:1e3},{text:"🔮 Вивчаю твої Кармічні Уроки",pause:1e3},{text:"⚡️ Завантажую твій персональний звіт",pause:0}];for(let h=0;h<E.length;h++){const g=E[h],x=h===E.length-1;await M(r,t,g.text,70,g.pause,x)}})(),c=Z(e,i).then(m=>m&&!m.error?(p.set("fullReport",m),!0):(console.error("Report Generation Failed:",m),!1)).catch(m=>(console.error("API Error:",m),!1));await Promise.all([l,c]),a.navigateTo("premium-result")}const ge=`<section id="premium-result-step" class="funnel-step active space-y-6">
    
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

</section>`;function fe(a){const n=document.getElementById("app");n.classList.add("funnel-container"),n.innerHTML=ge;const r=document.getElementById("full-report-content"),t=document.getElementById("report-actions-container"),e=document.getElementById("late-upsell-modal"),i=document.getElementById("close-late-upsell"),l=document.getElementById("late-upsell-btn"),c=p.get("fullReport"),m={date:p.get("date"),time:p.get("time"),city:p.get("city"),geo:p.get("geo")};p.get("hasPaidUpsell");const E=p.get("email");async function h(){if(!c||!c.sections){r.innerHTML='<p class="text-red-400 text-center">Помилка: Дані звіту відсутні. Спробуйте оновити сторінку.</p>';return}let s="";for(const d of c.sections){const y=d.analysis_text.split(`
`).filter(k=>k.trim().length>0).map(k=>`<p>${k.trim().replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}</p>`).join(""),b=d.practical_advice.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\\n/g,"<br>");s+=`
                <div class="report-section mb-6">
                    <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--accent-color); margin-top: 1.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
                        ${d.icon||"✨"} ${d.title}
                    </h2>
                    
                    <div class="report-content-text text-left leading-relaxed space-y-4" style="color: var(--secondary-text-color);">
                        ${y}
                    </div>
                    
                    <div class="report-advice mt-4">
                        <strong style="color: var(--accent-color);">Практична Порада:</strong>
                        <p class="mt-2" style="color: var(--primary-text-color); opacity: 0.9;">${b}</p>
                    </div>
                </div>
            `}const o=await j(m),f=s+o;r.innerHTML=f,g()}function g(){t.innerHTML="";const s=document.createElement("button");if(s.className="btn btn-secondary",s.id="download-pdf-btn",s.innerHTML='<span class="btn-text">Завантажити PDF</span><span class="btn-spinner"></span>',s.onclick=()=>x(s,r.innerHTML),t.appendChild(s),p.get("hasPaidUpsell")){const o=document.createElement("button");o.className="btn btn-secondary",o.style.marginTop="10px",o.innerHTML='<span class="btn-text">Спробувати ще (Почати знову)</span>',o.onclick=()=>{if(confirm("Ви впевнені? Це очистить поточний звіт.")){p.clear();const f=window.location.pathname;window.history.replaceState({},document.title,f),window.location.href=f}},t.appendChild(o)}else{const o=document.createElement("button");o.className="btn btn-violet",o.style.marginTop="10px",o.innerHTML='<span class="btn-text">Отримати прогноз на рік</span>',o.onclick=()=>{e.style.display="flex"},t.appendChild(o)}}async function x(s,o){w(s,!0);const f="https://createpdf-kpkshoor7q-ew.a.run.app";try{const d=document.createElement("div");d.innerHTML=o;const y=d.querySelector(".astro-data-box");y&&y.remove();const b=d.innerHTML,k=Array.from(document.styleSheets).map(T=>{try{return Array.from(T.cssRules).map(I=>I.cssText).join(`
`)}catch{return""}}).join(`
`),L=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reportHtml:b,reportStyles:k,userData:m,reportType:"main"})});if(!L.ok)throw new Error("Backend error");const v=await L.json();if(v.success&&v.pdfBase64){const T=u(v.pdfBase64,"application/pdf"),I=URL.createObjectURL(T),S=document.createElement("a");S.href=I,S.download=v.filename||"DestinyCode_Report.pdf",document.body.appendChild(S),S.click(),document.body.removeChild(S),URL.revokeObjectURL(I)}else throw new Error("Invalid response")}catch(d){console.error(d),A("Помилка","Не вдалося завантажити PDF. Спробуйте пізніше.")}finally{w(s,!1)}}i.addEventListener("click",()=>{e.style.display="none"}),l.addEventListener("click",async()=>{const s=l,o=s.querySelector(".btn-text").innerText;s.classList.add("loading"),s.disabled=!0,s.querySelector(".btn-text").innerText="Обробка...";try{await new Promise(f=>setTimeout(f,2e3)),p.set("hasPaidUpsell",!0),E&&P(m,E),s.classList.remove("loading"),s.querySelector(".btn-text").innerText="Оплачено! ✅",setTimeout(()=>{e.style.display="none",g(),A("Успіх!","Прогноз оплачено і відправлено на пошту!")},1e3)}catch{s.classList.remove("loading"),s.disabled=!1,s.querySelector(".btn-text").innerText=o,A("Помилка","Не вдалося провести оплату.")}});function w(s,o){o?(s.classList.add("loading"),s.disabled=!0):(s.classList.remove("loading"),s.disabled=!1)}function u(s,o){const f=atob(s),d=[];for(let y=0;y<f.length;y+=512){const b=f.slice(y,y+512),k=new Array(b.length);for(let L=0;L<b.length;L++)k[L]=b.charCodeAt(L);d.push(new Uint8Array(k))}return new Blob(d,{type:o})}h()}C.register("welcome",z);C.register("loading",ee);C.register("result",ne);C.register("premium-data",ie);C.register("paywall",de);C.register("success",ue);C.register("generation",ye);C.register("premium-result",fe);document.addEventListener("DOMContentLoaded",()=>{N();const n=new URLSearchParams(window.location.search).get("payment"),r=sessionStorage.getItem("destinyUser");if(r)try{const t=JSON.parse(r);p.set("date",t.date),p.set("time",t.time),p.set("city",t.city),p.set("geo",t.geo),console.log("Session restored")}catch(t){console.error("Failed to restore session:",t)}n==="success"?(window.history.replaceState({},document.title,window.location.pathname),C.navigateTo("success")):C.navigateTo("welcome")});
