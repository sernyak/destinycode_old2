(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();class K{constructor(){this.routes={},this.currentStage=null,this.appContainer=document.getElementById("app")}register(e,a){this.routes[e]=a}navigateTo(e,a={}){if(!this.routes[e]){console.error(`Маршрут "${e}" не знайдено.`),e!=="welcome"&&(console.warn("Redirecting to welcome screen..."),this.navigateTo("welcome"));return}if(console.log(`Navigating to: ${e}`),this.appContainer){this.appContainer.innerHTML="";try{this.routes[e](this,a),this.currentStage=e,window.scrollTo(0,0)}catch(o){console.error(`Error initializing stage "${e}":`,o),this.appContainer.innerHTML='<div class="p-4 text-center text-red-500">Сталася помилка при завантаженні екрану. Будь ласка, оновіть сторінку.</div>'}}else console.error("CRITICAL: App container #app not found in DOM!")}}const k=new K;class X{constructor(){this.storageKey="destinyUser",this.data=this.load()}load(){try{const e=sessionStorage.getItem(this.storageKey);return e?JSON.parse(e):{}}catch{return console.warn("SessionStorage disabled or inaccessible"),{}}}save(){try{sessionStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch{console.warn("Failed to save to SessionStorage")}}get(e){return this.data[e]}set(e,a){this.data[e]=a,this.save()}clear(){this.data={},sessionStorage.removeItem(this.storageKey)}}const l=new X,Q=Object.freeze(Object.defineProperty({__proto__:null,state:l},Symbol.toStringTag,{value:"Module"}));function Z(){if(document.getElementById("global-info-modal"))return;document.body.insertAdjacentHTML("beforeend",`
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
    `);const e=document.getElementById("global-info-modal"),a=document.getElementById("global-modal-close"),o=()=>{e.style.display="none"};a.addEventListener("click",o),e.addEventListener("click",t=>{t.target===e&&o()})}const ee="modulepreload",te=function(n){return"/"+n},z={},ne=function(e,a,o){let t=Promise.resolve();if(a&&a.length>0){let h=function(y){return Promise.all(y.map(f=>Promise.resolve(f).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var i=h;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),m=d?.nonce||d?.getAttribute("nonce");t=h(a.map(y=>{if(y=te(y),y in z)return;z[y]=!0;const f=y.endsWith(".css"),v=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${v}`))return;const b=document.createElement("link");if(b.rel=f?"stylesheet":ee,f||(b.as="script"),b.crossOrigin="",b.href=y,m&&b.setAttribute("nonce",m),document.head.appendChild(b),f)return new Promise((u,r)=>{b.addEventListener("load",u),b.addEventListener("error",()=>r(new Error(`Unable to preload CSS for ${y}`)))})}))}function s(d){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=d,window.dispatchEvent(m),!m.defaultPrevented)throw d}return t.then(d=>{for(const m of d||[])m.status==="rejected"&&s(m.reason);return e().catch(s)})},O={FULL_REPORT:149,FORECAST_UPSELL:247,FORECAST_OLD:1399},oe={FULL_REPORT:1,FORECAST_UPSELL:1},_=oe,A="https://europe-west1-destinycode-982fa.cloudfunctions.net",P={PROXY:`${A}/getAIPrediction`,EMAIL:`${A}/sendReportEmail`,PDF:`${A}/createPDF`,SIGNATURE:`${A}/getPaymentSignature`,WEBHOOK:`${A}/handlePaymentWebhook`,VERIFY:`${A}/verifyPaymentStatus`,PAYMENT_RETURN:`${A}/handlePaymentReturn`},N={MODEL_NAME:"gemini-2.5-flash",REQUEST_TIMEOUT_MS:6e4},I={merchantDomainName:"destinycode.online",currency:"UAH",SIGNATURE_URL:P.SIGNATURE,WAYFORPAY_URL:"https://secure.wayforpay.com/pay",WEBHOOK_URL:P.WEBHOOK,PROXY_RETURN_URL:P.PAYMENT_RETURN};async function se(n,e={}){try{const a=new AbortController,o=setTimeout(()=>a.abort(),15e3),t={merchantDomainName:I.merchantDomainName,currency:I.currency,...n,backupData:e},s=await fetch(I.SIGNATURE_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),signal:a.signal});if(clearTimeout(o),!s.ok){const i=await s.text();throw new Error(`Server Error ${s.status}: ${i}`)}return await s.json()}catch(a){throw a.name==="AbortError"?new Error("Backend Connection Timeout."):a}}function ae(n){const e=document.createElement("form");e.setAttribute("method","POST"),e.setAttribute("action",I.WAYFORPAY_URL),e.setAttribute("accept-charset","utf-8"),e.setAttribute("target","_self"),e.style.display="none";for(const a in n)if(Object.prototype.hasOwnProperty.call(n,a))if(Array.isArray(n[a]))n[a].forEach(o=>{const t=document.createElement("input");t.setAttribute("type","hidden"),t.setAttribute("name",a+"[]"),t.setAttribute("value",o),e.appendChild(t)});else{const o=document.createElement("input");o.setAttribute("type","hidden"),o.setAttribute("name",a),o.setAttribute("value",n[a]),e.appendChild(o)}document.body.appendChild(e),console.log("🚀 Redirecting to WayForPay (PRG Mode)..."),setTimeout(()=>{e.submit()},100)}async function D(n,e,a={}){console.log("🚀 Starting payment process (Secure DB Mode)...");try{const o=Math.floor(Date.now()/1e3),t=`ORD_${Date.now().toString().slice(-8)}_${Math.floor(Math.random()*999)}`,s=new URL(window.location.href);if(s.searchParams.set("verify_order",t),a.returnQueryParams){const u=new URLSearchParams(a.returnQueryParams);for(const[r,c]of u)s.searchParams.set(r,c)}const i=s.toString(),d=`${I.PROXY_RETURN_URL}?target=${encodeURIComponent(i)}`;console.log("📍 Final Target:",i);const m={orderReference:t,orderDate:o,amount:String(n.price),productName:[n.name],productPrice:[String(n.price)],productCount:["1"]},{state:h}=await ne(async()=>{const{state:u}=await Promise.resolve().then(()=>Q);return{state:u}},void 0),y={date:h.get("date"),time:h.get("time"),city:h.get("city"),geo:h.get("geo")},f={email:e.email||"",userData:y,productName:n.name,status:"created"},v=await se(m,f);if(!v.signature)throw new Error("Сервер не повернув підпис!");const b={merchantAccount:v.merchantAccount,merchantAuthType:"SimpleSignature",merchantDomainName:I.merchantDomainName,merchantSignature:v.signature,orderReference:t,orderDate:o,amount:m.amount,currency:I.currency,productName:m.productName,productPrice:m.productPrice,productCount:m.productCount,clientFirstName:"Destiny User",clientLastName:"Client",clientEmail:e.email||"",language:"UA",returnUrl:d,serviceUrl:I.WEBHOOK_URL};return ae(b),new Promise(()=>{})}catch(o){throw console.error("🚨 Payment Process Error:",o),o}}async function re(n){try{const e=await fetch(P.VERIFY,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderReference:n})});if(!e.ok)throw new Error(`Verification HTTP Error: ${e.status}`);return await e.json()}catch(e){return console.error("Verification failed",e),{status:"error",reason:e.message}}}const le=`<section id="landing-step" class="funnel-step active space-y-8 text-center flex flex-col justify-between" style="min-height: 100dvh;">
    
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
</div>`;let M=null;function F(){return window.CircularNatalHoroscope?Promise.resolve(!0):M?(console.log("⏳ Astro Library load request joined existing queue..."),M):(console.log("🚀 Starting Astro Library sequence..."),M=new Promise(n=>{window.module||(window.module={exports:{}}),window.exports=window.module.exports;const e=["https://unpkg.com/circular-natal-horoscope-js@1.1.0/dist/index.js","https://cdn.jsdelivr.net/npm/circular-natal-horoscope-js@1.1.0/dist/index.js","./js/astro-lib.js"];function a(o){if(o>=e.length){console.error("❌ CRITICAL: Всі джерела бібліотеки (включно з локальним) недоступні."),n(!1),M=null;return}const t=e[o],s=document.createElement("script");s.src=t,s.async=!0,s.onload=()=>{window.module&&window.module.exports&&window.module.exports.Horoscope?(window.CircularNatalHoroscope=window.module.exports,console.log(`✅ Astro Library Loaded Successfully from ${t}`),n(!0)):window.CircularNatalHoroscope?(console.log(`✅ Astro Library Loaded (Global) from ${t}`),n(!0)):(console.warn(`⚠️ Script loaded from ${t}, but exports missing.`),a(o+1))},s.onerror=()=>{console.warn(`⚠️ Failed to load from ${t}. Switching to backup source...`),a(o+1)},document.head.appendChild(s)}a(0)}),M)}function ie(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=le;const a=document.getElementById("birth-form"),o=document.getElementById("birth-date"),t=document.getElementById("error-message"),s=document.getElementById("date-placeholder"),i=a.querySelector('button[type="submit"]'),d=document.getElementById("info-modal"),m=document.getElementById("legal-modal"),h=document.getElementById("open-info-modal-btn"),y=document.getElementById("close-info-modal-icon"),f=document.getElementById("close-info-modal-btn"),v=document.getElementById("close-legal-modal-icon"),b=document.getElementById("close-legal-modal-btn"),u=document.getElementById("legal-modal-body"),r=document.querySelectorAll(".legal-link[data-legal-type]");function c(){d&&(d.style.display="flex")}function p(){d&&(d.style.display="none")}function g(L){const w=document.getElementById("legal-content-"+L);w&&m&&u&&(u.innerHTML=w.innerHTML,m.style.display="flex")}function E(){m&&(m.style.display="none")}h&&h.addEventListener("click",c),y&&y.addEventListener("click",p),f&&f.addEventListener("click",p),v&&v.addEventListener("click",E),b&&b.addEventListener("click",E),d&&d.addEventListener("click",L=>{L.target===d&&p()}),m&&m.addEventListener("click",L=>{L.target===m&&E()}),r.forEach(L=>{L.addEventListener("click",w=>{const S=w.target.getAttribute("data-legal-type");p(),setTimeout(()=>{g(S)},50)})});function x(){const L=o.value;if(!L)s.innerText="Обрати дату народження",s.style.color="var(--secondary-text-color)";else{const w=L.split("-");if(w.length===3){const S=`${w[2]}.${w[1]}.${w[0]}`;s.innerText=S,s.style.color="var(--primary-text-color)"}}}function T(){o.value===""&&(o.value="1995-01-01")}o.addEventListener("input",x),o.addEventListener("change",x),o.addEventListener("blur",x),o.addEventListener("focus",T),o.addEventListener("click",T),o.addEventListener("touchstart",T),x(),a.addEventListener("submit",async function(L){L.preventDefault();const w=o.value;if(w==="")t.innerText="Будь ласка, обери дату народження.",t.style.display="block";else{let C=function(B,q){B.classList.add("loading"),B.disabled=!0};var S=C;t.style.display="none",l.set("date",w),C(i),F(),n.navigateTo("loading")}})}const ce=`<!-- 🔥 UPDATE: Використовуємо step-centered та margin: auto для ідеального центрування у funnel-container -->
<section id="loading-step" class="funnel-step active step-centered space-y-6 text-center" style="margin-top: auto; margin-bottom: auto;">
    
    <!-- Спінер (стилі беруться з main.css, прибрано зайві inline стилі) -->
    <div class="spinner" style="margin-left: auto; margin-right: auto;"></div>
    
    <!-- Контейнер для тексту -->
    <div id="loading-typing-container" class="typing-container">
        <span id="loading-text"></span>
        <!-- Курсор (стилі з main.css) -->
        <span id="loading-cursor" class="typing-cursor" style="display: none;"></span>
    </div>

</section>`;function V(n,e,a,o=50,t=0,s=!1){return new Promise(i=>{let d=0;e&&(e.style.display="inline-block"),n.innerHTML="";function m(){d<a.length?(n.innerHTML=a.substring(0,d+1),d++,setTimeout(m,o)):setTimeout(()=>{!s&&e&&(e.style.display="none"),i()},t)}m()})}async function de(n){if(!await F())throw new Error("Astro Library not loaded");const{Origin:e,Horoscope:a,Renderer:o}=window.CircularNatalHoroscope,t=n.date.split("-"),s=parseInt(t[0]),i=parseInt(t[1])-1,d=parseInt(t[2]);let m=12,h=0;if(n.time){const p=n.time.split(":");m=parseInt(p[0]),h=parseInt(p[1])}let y=50.45,f=30.52,v="Europe/Kyiv";if(n.geo){const p=parseFloat(n.geo.latitude||n.geo.lat),g=parseFloat(n.geo.longitude||n.geo.lon);!isNaN(p)&&!isNaN(g)&&(y=p,f=g,v=n.geo.timezone||v)}let b=[],u=null,r=null;function c(p){const g=Math.floor(p),E=(p-g)*60,x=Math.floor(E),T=Math.floor((E-x)*60);return`${g}° ${x}' ${T}"`}try{const p=new e({year:s,month:i,date:d,hour:m,minute:h,latitude:y,longitude:f,timezone:v});r=new a({origin:p,houseSystem:"placidus",zodiac:"tropical"});const g=r.CelestialBodies;["sun","moon","mercury","venus","mars","jupiter","saturn","uranus","neptune","pluto","ascendant","midheaven"].forEach(x=>{let T=g[x];if(!T&&x==="ascendant"&&(T=r.Ascendant),!T&&x==="midheaven"&&(T=r.Midheaven),T){const L=T.Sign.label.toUpperCase(),w=T.ChartPosition.Ecliptic.DecimalDegrees%30,S=c(w),C=x.toUpperCase();b.push(`${C}: ${L} ${S}`)}}),console.log("Calculated Planets (DMS):",b)}catch(p){return console.error("Horoscope Calculation Failed:",p),{planets:[],chartSvg:null,houseSystem:"Error"}}try{if(r){const p=document.createElement("div");p.style.position="absolute",p.style.left="-9999px",p.style.visibility="hidden",document.body.appendChild(p),new o(r).render(p);const E=p.querySelector("svg");E&&(E.style.backgroundColor="transparent",E.querySelectorAll("line, circle, path").forEach(x=>{const T=x.getAttribute("stroke");(!T||T==="#000000"||T==="#000")&&x.setAttribute("stroke","#cda45e");const L=x.getAttribute("fill");(L==="#000000"||L==="#000")&&x.setAttribute("fill","#cda45e")}),E.querySelectorAll("text").forEach(x=>{x.style.fill="#cda45e",x.setAttribute("fill","#cda45e"),x.style.fontFamily="'Montserrat', sans-serif"}),u=p.innerHTML),document.body.removeChild(p)}}catch(p){console.warn("SVG Render Error:",p)}return{planets:b,chartSvg:u,houseSystem:"Placidus"}}let R=null,U=null;function H(){console.log("🔥 Warming up PDF backend..."),fetch(P.PDF,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({warmup:!0})}).catch(()=>{})}async function j(n,e){const a=new AbortController,o=setTimeout(()=>a.abort(),N.REQUEST_TIMEOUT_MS);try{const t=await fetch(P.PROXY,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:n,data:e,modelName:N.MODEL_NAME}),signal:a.signal});if(clearTimeout(o),!t.ok)throw new Error(`Backend Error: ${t.status}`);const i=(await t.json()).candidates?.[0]?.content?.parts?.[0]?.text;if(i){const d=i.match(/```json\n([\s\S]*?)\n```/);return d&&d[1]?d[1]:i}return null}catch(t){throw clearTimeout(o),console.error("AI Request Failed:",t),t}}async function pe(n){H();try{const e=await j("free_analysis",{date:n});return JSON.parse(e)}catch(e){return console.error("Free Analysis Error:",e),{title:"Error",psychological_analysis:"<p>На жаль, сталася помилка з'єднання.</p>"}}}async function Y(n){if(R)return R;console.log("🚀 Starting background generation (Secure)...");let e="";const a={...n};try{const t=await de(n);t&&t.planets&&(e=`== Технічні Астрологічні Дані ==
${t.planets.join(`
`)}`,a.planets=t.planets,l.set("planets",t.planets))}catch(t){console.warn("Local calc skipped",t)}const o=`Дата: ${n.date}
Час: ${n.time}
Місто: ${n.city}
${e}`;return R=j("full_report",{userQuery:o}).then(t=>{const s=JSON.parse(t);return U={data:s,enrichedUserData:a},console.log("✅ Background generation finished!"),s}).catch(t=>{throw R=null,t}),R}async function ue(n,e){let a=null,o=n;try{return U?(a=U.data,o=U.enrichedUserData):R?(a=await R,o=l.get("planets")?{...n,planets:l.get("planets")}:n):(a=await Y(n),o=l.get("planets")?{...n,planets:l.get("planets")}:n),e&&e.includes("@")&&fetch(P.EMAIL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:e,reportHtml:JSON.stringify(a),reportTitle:"Твій Повний Аналіз",reportType:"main",userData:o})}).catch(t=>console.error("Email Error:",t)),a}catch(t){return console.error("Generate Full Report Error:",t),{error:!0,message:"Не вдалося згенерувати звіт."}}}async function $(n,e){const a=l.get("planets"),o=a?{...n,planets:a}:n,t=`Користувач: Жінка. Дата: ${n.date}. Місто: ${n.city}`;try{const s=await j("forecast",{userQuery:t});return e&&e.includes("@")&&fetch(P.EMAIL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:e,reportHtml:s,reportType:"upsell",userData:o})}).catch(i=>console.warn("Forecast email error:",i)),s}catch{return null}}async function me(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=ce,document.body.classList.add("warp-mode");const a=document.getElementById("loading-text"),o=document.getElementById("loading-cursor"),t=l.get("date");H();let s=!1;const i=pe(t).then(h=>(l.set("freeReport",h),s=!0,h)).catch(h=>(console.error("API Error:",h),{error:!0,title:"❌ Помилка Аналізу",psychological_analysis:"<p>На жаль, сталася помилка під час обробки відповіді від ШІ.</p>"})),d=[{text:"З'єднуюсь з ефемеридами NASA...",pause:1e3},{text:"Аналізую положення планет...",pause:1200},{text:"Зчитую твій енергетичний код...",pause:1200},{text:"Розшифровую кармічні вузли...",pause:1500},{text:"Будую твою натальну карту...",pause:1500},{text:"Приготуйся дізнатись, наскільки ти ахуєнна 😈",pause:2e3,final:!0}],m=(async()=>{for(let h=0;h<d.length;h++){if(s){console.log("🚀 API Ready! Skipping remaining animation steps.");break}const y=d[h];if(a&&o){const f=s?300:y.pause;await V(a,o,y.text,50,f,y.final)}if(s){console.log("🚀 API Ready! Animation loop stopped.");break}}o&&(o.style.display="none")})();await Promise.all([m,i]),document.body.classList.remove("warp-mode"),n.navigateTo("result")}const ye=`<!-- 🔥 FIX: Додано клас 'active' для відображення -->
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
</section>`;function ge(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=ye;const a=document.getElementById("result-title"),o=document.getElementById("free-report-title"),t=document.getElementById("free-report-text"),s=document.getElementById("upgrade-button"),i=l.get("freeReport");if(!i){n.navigateTo("welcome");return}let d="";i.psychological_analysis?d=i.psychological_analysis.replace(/\*\*(.*?)\*\*/g,'<strong style="color: var(--primary-text-color);">$1</strong>').replace(/\\n/g,"<br>"):d="<p>Дані відсутні.</p>",a.innerText="Аналіз твоєї особистості",o.innerHTML=i.title||"Результат",t.innerHTML=d,s.addEventListener("click",()=>{n.navigateTo("premium-data")})}const fe=`<!-- 🔥 UPDATE: Видалено центрування (margin: auto) для верху сторінки, як в моноліті -->
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
</section>`,be=P.PROXY,he=N.MODEL_NAME;async function ve(n){try{const e=await fetch(be,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"geo",data:{query:n},modelName:he})});if(e.ok){const o=(await e.json()).candidates?.[0]?.content?.parts?.[0]?.text;if(o){const t=o.replace(/```json\n?([\s\S]*?)\n?```/g,"$1").trim();return JSON.parse(t)}}return console.warn("Geo API Error Status:",e.status),{error:"network_failure"}}catch(e){return console.error("Geo API Network Error:",e),{error:"network_failure"}}}async function G(n){const e=await ve(n);return e&&typeof e.lat=="number"&&typeof e.lon=="number"?(console.log(`Geocoding success for ${n}:`,e),{latitude:e.lat,longitude:e.lon,timezone:e.timezone,corrected_name:e.corrected_name,error:null}):e&&e.error?{error:e.error}:{error:"parse_error"}}function xe(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=fe;const a=document.getElementById("birth-time"),o=document.getElementById("time-placeholder"),t=a.closest(".input-field"),s=document.getElementById("time-error-message"),i=document.getElementById("birth-city"),d=document.getElementById("city-error-message"),m=document.getElementById("city-info-message"),h=document.getElementById("continue-to-paywall-button"),y=document.getElementById("skip-button");function f(){!a||!o||(a.value?(o.innerText=a.value,o.style.color="var(--primary-text-color)",t&&t.classList.remove("input-error"),s&&(s.style.display="none")):(o.innerText="Обери час",o.style.color="var(--secondary-text-color)"))}a.addEventListener("input",f),a.addEventListener("change",f),a.addEventListener("blur",f),f(),i.addEventListener("input",()=>{d.style.display="none",m.style.display="none",i.classList.remove("input-error")});function v(u,r){u&&(r?(u.classList.add("loading"),u.disabled=!0):(u.classList.remove("loading"),u.disabled=!1))}function b(u,r){u==="ambiguous"?d.innerText=`Місто "${r}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну.`:d.innerText=`Не можемо знайти місто "${r}". Перевірте назву.`,d.style.display="block",i.classList.add("input-error")}h.addEventListener("click",async()=>{const u=a.value;let r=i.value.trim();const c=r;let p=!1;if(d.style.display="none",s.style.display="none",t.classList.remove("input-error"),i.classList.remove("input-error"),r||(i.classList.add("input-error"),d.innerText="Будь ласка, введи місто народження.",d.style.display="block",p=!0),u||(t.classList.add("input-error"),s.style.display="block",p=!0),!r&&p){navigator.vibrate&&navigator.vibrate(50);return}v(h,!0);const g=await G(r);let E=null;if(g&&g.latitude?(g.corrected_name&&(i.value=g.corrected_name,r=g.corrected_name,c.toLowerCase()!==g.corrected_name.toLowerCase()&&(E=`Ми уточнили: ${g.corrected_name} 😉`)),l.set("geo",{latitude:g.latitude||g.lat,longitude:g.longitude||g.lon,timezone:g.timezone}),l.set("city",g.corrected_name)):g&&g.error==="ambiguous"?(b("ambiguous",r),p=!0):(b("not_found",r),p=!0),E?(m.innerText=E,m.style.display="block"):m.style.display="none",p){v(h,!1),navigator.vibrate&&navigator.vibrate(50);return}l.set("time",u),setTimeout(()=>{n.navigateTo("paywall")},E?1200:0)}),y.addEventListener("click",async()=>{let u=i.value.trim();const r=u;if(d.style.display="none",s.style.display="none",i.classList.remove("input-error"),t.classList.remove("input-error"),!u){i.classList.add("input-error"),d.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",d.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}v(h,!0),y.disabled=!0;const c=await G(u);let p=null,g=!1;if(c&&c.latitude?(c.corrected_name&&(i.value=c.corrected_name,u=c.corrected_name,r.toLowerCase()!==c.corrected_name.toLowerCase()&&(p=`Ми уточнили: ${c.corrected_name} 😉`)),l.set("geo",{latitude:c.latitude||c.lat,longitude:c.longitude||c.lon,timezone:c.timezone}),l.set("city",c.corrected_name),l.set("time","")):c&&c.error==="ambiguous"?(b("ambiguous",u),g=!0):(b("not_found",u),g=!0),p&&(m.innerText=p,m.style.display="block"),g){v(h,!1),y.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}console.log("User skipped time, but city is valid."),setTimeout(()=>{n.navigateTo("paywall")},p?1200:0)})}const we=`<section id="final-paywall-step" class="funnel-step active space-y-6">

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
</section>`;async function W(n){if(await F(),!window.CircularNatalHoroscope)return`
            <div class="astro-data-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.1);">
                <p class="text-xs text-yellow-400 text-center pulse-text">
                    ⏳ Завантаження астро-даних...<br>
                    (Спробуйте зачекати кілька секунд)
                </p>
            </div>
        `;const{Origin:e,Horoscope:a,Renderer:o}=window.CircularNatalHoroscope;let t=n.geo;if(t||(t={latitude:50.45,longitude:30.52,timezone:"Europe/Kyiv"}),!n.date)return"";try{let r=function(E,x){let T=u[E];if(!T&&E==="ascendant"&&(T=b.Ascendant),!T&&E==="midheaven"&&(T=b.Midheaven),T){const L=T.Sign.label,w=T.ChartPosition.Ecliptic.DecimalDegrees%30,S=Math.floor(w),C=(w-S)*60,B=Math.floor(C),q=Math.round((C-B)*60);return`
                    <div class="astro-data-item">
                        <div class="astro-label-row">
                            <span class="astro-planet-name">${x}:</span>
                             <span class="astro-sign-name">${L}</span>
                        </div>
                        <div class="astro-coords-row">${S}° ${B}' ${q}"</div>
                    </div>
                `}return`<div class="astro-data-item"><strong>${x}:</strong> n/a</div>`};var s=r;const i=n.date.split("-"),d=parseInt(i[0]),m=parseInt(i[1])-1,h=parseInt(i[2]);let y=12,f=0;if(n.time){const E=n.time.split(":");y=parseInt(E[0]),f=parseInt(E[1])}const v=new e({year:d,month:m,date:h,hour:y,minute:f,latitude:parseFloat(t.latitude),longitude:parseFloat(t.longitude),timezone:t.timezone}),b=new a({origin:v,houseSystem:"placidus",zodiac:"tropical"}),u=b.CelestialBodies,c=[];c.push(r("sun","Сонце")),c.push(r("moon","Місяць")),c.push(r("ascendant","ASC")),c.push(r("venus","Венера")),c.push(r("mars","Марс")),c.push(r("jupiter","Юпітер"));let p="";const g=document.createElement("div");g.style.position="absolute",g.style.left="-9999px",g.style.width="600px",g.style.height="600px",document.body.appendChild(g);try{new o(b).render(g);const x=g.querySelector("svg");x&&(x.style.backgroundColor="transparent",x.querySelectorAll("line, circle, path").forEach(w=>{const S=w.getAttribute("stroke");(!S||S==="#000000"||S==="#000"||S==="black")&&(w.setAttribute("stroke","#cda45e"),w.setAttribute("stroke-width","1.5"))}),x.querySelectorAll("text").forEach(w=>{w.setAttribute("fill","#cda45e"),w.style.fill="#cda45e",w.style.fontFamily="'Montserrat', sans-serif",w.style.fontWeight="500"}),p=`
                    <div class="astro-chart-preview">
                        ${g.innerHTML}
                    </div>
                `)}catch(E){console.warn("Chart Render Error:",E)}return document.body.removeChild(g),`
            <div class="astro-data-box">
                <div class="astro-data-title">Твій Космічний Відбиток</div>
                ${p} 
                <div class="astro-data-grid">
                    ${c.join("")}
                </div>
            </div>
        `}catch(i){return console.error("Fingerprint render error:",i),`<div class="astro-data-box"><p class="text-xs text-red-400 text-center">Помилка розрахунку: ${i.message}</p></div>`}}function Ee(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=we;const a=document.getElementById("paywall-timer"),o=document.getElementById("paywall-astro-data"),t=document.getElementById("final-checkout-button"),s=document.getElementById("paywall-popup"),i=document.getElementById("popup-title"),d=document.getElementById("popup-text"),m=document.getElementById("popup-checkout-btn"),h=document.getElementById("popup-close-btn");H();function y(){const r=t.querySelector(".btn-text span span.font-bold");r&&(r.innerText=`Розблокувати зараз за ${O.FULL_REPORT} грн`);const c=m.querySelector(".whitespace-nowrap");c&&(c.innerText=`Розблокувати зараз за ${O.FULL_REPORT} грн`)}y(),window.showPaywallPopup=function(r,c){s&&i&&d&&(i.innerText=r,d.innerText=c,s.style.display="flex")},h&&h.addEventListener("click",()=>{s.style.display="none"}),m&&m.addEventListener("click",()=>{s.style.display="none",u(t)}),s&&s.addEventListener("click",r=>{r.target===s&&(s.style.display="none")});const f={date:l.get("date"),time:l.get("time"),city:l.get("city"),geo:l.get("geo")};o&&W(f).then(r=>{r?(o.innerHTML=r,o.style.display="block"):o.style.display="none"}),window.paywallInterval&&clearInterval(window.paywallInterval);let v=420;function b(){if(!a)return;const r=Math.floor(v/60),c=v%60;a.textContent=`${r<10?"0":""}${r}:${c<10?"0":""}${c}`,--v<0&&(v=0,clearInterval(window.paywallInterval))}b(),window.paywallInterval=setInterval(b,1e3);async function u(r){r.classList.add("loading"),r.disabled=!0;try{await D({name:"Повний Астро-Портрет (Premium)",price:_.FULL_REPORT},{email:l.get("email")||""}),console.log("Payment initiated."),l.set("isPaid",!0),Y(f),clearInterval(window.paywallInterval);const c=new URL(window.location);c.searchParams.set("payment","success"),window.history.pushState({},"",c),n.navigateTo("success")}catch(c){console.error("Payment error:",c),r.classList.remove("loading"),r.disabled=!1}}t&&t.addEventListener("click",()=>u(t))}const Te=`<section id="success-step" class="funnel-step active space-y-6">
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
            
            <!-- Кнопка змінює стиль на gold-purple, якщо куплено апсел -->
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

    <!-- 🔥 NEW MODAL: Upsell Success & Email Capture -->
    <div id="upsell-success-modal" class="modal-overlay">
        <div class="modal-content text-left">
            <h3 class="text-2xl font-bold text-white mb-4" style="color: var(--accent-color);">Оплата успішна ✨</h3>
            
            <p style="color: var(--primary-text-color);" class="mb-4 text-sm leading-relaxed">
                Твій <strong>"Персональний прогноз на найближчий рік"</strong> успішно оплачено.
            </p>
            <p style="color: var(--secondary-text-color);" class="mb-6 text-sm leading-relaxed">
                Він вже генерується і буде надісланий окремим листом. Вкажи свою пошту для відправки:
            </p>
            
            <form id="upsell-success-form" class="space-y-4">
                <label for="upsell-success-email" class="sr-only">Ваш Email</label>
                
                <input 
                    type="email" 
                    id="upsell-success-email" 
                    placeholder="your.email@gmail.com" 
                    class="input-field text-center" 
                    style="background-color: var(--card-bg-color) !important; color: #e0e0e0 !important; -webkit-text-fill-color: #e0e0e0 !important;"
                    required
                >
                
                <button type="submit" class="btn btn-primary w-full">
                    <span class="btn-text">Підтвердити емейл</span>
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

        #user-email, #upsell-success-email {
            color: #e0e0e0 !important;
            caret-color: var(--accent-color);
        }
        
        #user-email::placeholder, #upsell-success-email::placeholder {
            color: var(--secondary-text-color);
            opacity: 0.7;
            -webkit-text-fill-color: var(--secondary-text-color) !important;
        }

        /* Золото-Фіолетовий градієнт для Premium кнопки */
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
</section>`;function Le(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=Te;const a=document.getElementById("email-form"),o=document.getElementById("user-email"),t=document.getElementById("main-report-btn"),s=document.getElementById("ltv-upsell-box"),i=document.getElementById("ltv-upsell-btn"),d=document.getElementById("upsell-success-modal"),m=document.getElementById("upsell-success-form"),h=document.getElementById("upsell-success-email"),y=new URLSearchParams(window.location.search),f=y.get("payment"),v=y.get("upsell_source");function b(){if(s){const c=s.querySelector("p span strong");c&&(c.innerText=`${O.FORECAST_UPSELL} грн.`);const p=i.querySelector(".btn-text");p&&(p.innerHTML=`Так, додати прогноз за ${O.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">${O.FORECAST_OLD} грн.</span>`)}}b();function u(){if(s&&(s.style.display="none"),t){t.classList.remove("btn-primary"),t.classList.add("btn-gold-purple");const c=t.querySelector(".btn-text");c&&(c.innerText="Надіслати мені Звіт + Прогноз")}}if((l.get("isPendingUpsell")||v==="stage6")&&f==="success"){console.log("🔄 Returned from Upsell Payment (Stage 6)"),l.set("hasPaidUpsell",!0),l.set("isPendingUpsell",!1);const c=l.get("email");if(s&&(s.style.display="none"),c){console.log("Scenario 1: Email exists, generating forecast..."),u();const p={date:l.get("date"),time:l.get("time"),city:l.get("city"),geo:l.get("geo")};$(p,c),setTimeout(()=>alert("Оплата успішна! Прогноз додано до вашого замовлення."),500)}else console.log("Scenario 2: No email, showing modal..."),d&&(d.style.display="flex")}l.get("hasPaidUpsell")&&u(),l.get("email")&&(o.value=l.get("email")),i.addEventListener("click",async()=>{const c=i,p=c.querySelector(".btn-text").innerHTML;c.classList.add("loading"),c.disabled=!0,c.querySelector(".btn-text").innerText="Перехід до оплати...";try{const g=o.value||"";l.set("isPendingUpsell",!0),g&&l.set("email",g),await D({name:"Астро-Прогноз на 2026 (Upsell)",price:_.FORECAST_UPSELL},{email:g},{returnQueryParams:"upsell_source=stage6"})}catch(g){console.error("Upsell Error:",g),c.classList.remove("loading"),c.disabled=!1,c.querySelector(".btn-text").innerHTML=p,l.set("isPendingUpsell",!1)}}),m&&m.addEventListener("submit",c=>{c.preventDefault();const p=h.value;if(p){l.set("email",p),o.value=p,d.style.display="none",u();const g={date:l.get("date"),time:l.get("time"),city:l.get("city"),geo:l.get("geo")};$(g,p)}}),a.addEventListener("submit",c=>{c.preventDefault();const p=o.value;p&&(l.set("email",p),n.navigateTo("generation"))})}const Se=`<!-- 🔥 UPDATE: Центрування анімації звіту за допомогою CSS класу -->
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
</section>`;async function ke(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=Se;const a=document.getElementById("report-loading-text"),o=document.getElementById("report-cursor"),t={date:l.get("date"),time:l.get("time"),city:l.get("city"),geo:l.get("geo")},s=l.get("email");l.get("hasPaidUpsell")&&$(t,s).catch(y=>console.warn("Forecast bg error:",y));const i=[{text:"✨ Аналізую Ядро твоєї Особистості...",pause:1200},{text:"❤️‍🔥 Розшифровую твої сценарії Кохання...",pause:1200},{text:"👑 Шукаю, де приховані твої Гроші...",pause:1200},{text:"🔮 Вивчаю твої Кармічні Уроки...",pause:1200},{text:"🌙 З'єднуюсь з енергією твого Місяця...",pause:1500},{text:"🪐 Перевіряю транзити Сатурна (він любить точність)...",pause:1500},{text:"💫 Рахую аспекти Венери до твого Асценденту...",pause:1500},{text:"📜 Формую стародавній сувій твоєї долі...",pause:1500},{text:"🧘‍♀️ Майже готово, Всесвіт підбирає слова...",pause:1500},{text:"🦋 Твоя унікальність потребує детального аналізу...",pause:1500},{text:"✨ Додаю трохи зіркового пилу в твій звіт...",pause:1500},{text:"⚡️ Фіналізація космічного паспорта...",pause:2e3}];let d=!1,m=null;(async()=>{for(let f=0;f<i.length;f++){if(d){console.log("🚀 Report is ready! Skipping animation.");return}const v=i[f];await V(a,o,v.text,50,0,!1);const b=100;let u=0;for(;u<v.pause;){if(d)return;await new Promise(r=>setTimeout(r,b)),u+=b}}})();try{const y=await ue(t,s);d=!0,y&&!y.error?(l.set("fullReport",y),m={success:!0}):(console.error("Report Generation Failed:",y),m={success:!1,message:y.message,type:y.type})}catch(y){d=!0,console.error("API Network Error:",y),m={success:!1,message:"Проблема з мережею"}}if(m&&m.success)setTimeout(()=>{n.navigateTo("premium-result")},300);else{let y="З'єднання перервано";m?.type==="timeout"?y="Сервер прогрівається. Спробуйте ще раз.":m?.message&&(y=m.message),a.innerHTML=`<span style="color: #ef4444; font-size: 0.9em;">⚠️ ${y}</span>`,o&&(o.style.display="none");const f=document.createElement("button");f.className="btn btn-primary mt-4",f.innerText="Натисніть для повтору ↻",f.style.maxWidth="240px",f.style.margin="20px auto",f.onclick=()=>n.navigateTo("generation");const v=document.getElementById("report-typing-container"),b=v.querySelector("button");b&&b.remove(),v.appendChild(f)}}const Pe=`<section id="premium-result-step" class="funnel-step active space-y-6">
    
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

</section>`;function Ie(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=Pe;const a=document.getElementById("full-report-content"),o=document.getElementById("report-actions-container"),t=document.getElementById("late-upsell-modal"),s=document.getElementById("close-late-upsell"),i=document.getElementById("late-upsell-btn"),d=l.get("fullReport"),m={date:l.get("date"),time:l.get("time"),city:l.get("city"),geo:l.get("geo"),planets:l.get("planets")||[]},h=l.get("email");function y(u){return u?u.map(r=>{const c=r.analysis_text.split(`
`).map(p=>`<p>${p}</p>`).join("");return`
                <div class="report-section mb-6">
                    <h2 style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700;">${r.icon} ${r.title}</h2>
                    <div class="report-content-text text-left">${c}</div>
                    <div class="report-advice mt-4"><strong>Порада:</strong><p>${r.practical_advice}</p></div>
                </div>`}).join(""):""}async function f(){if(!d||!d.sections){a.innerHTML='<div class="text-center p-6"><p class="text-red-400">Дані звіту відсутні.</p></div>';return}const u=y(d.sections),r=await W(m);a.innerHTML=u+r,v()}function v(){o.innerHTML="";const u=document.createElement("button");if(u.className="btn btn-secondary",u.innerHTML='<span class="btn-text">Завантажити PDF</span><span class="btn-spinner"></span>',u.onclick=()=>b(u),o.appendChild(u),l.get("hasPaidUpsell")){const r=document.createElement("button");r.className="btn btn-secondary",r.style.marginTop="10px",r.innerText="Почати заново",r.onclick=()=>{confirm("Очистити дані?")&&(l.clear(),window.location.href=window.location.pathname)},o.appendChild(r)}else{const r=document.createElement("button");r.className="btn btn-violet",r.style.marginTop="10px",r.innerHTML=`<span class="btn-text">Отримати прогноз на рік за ${O.FORECAST_UPSELL} грн</span>`,r.onclick=()=>{i&&(i.querySelector(".btn-text").innerText=`Так, додати прогноз за ${O.FORECAST_UPSELL} грн.`),t.style.display="flex"},o.appendChild(r)}}async function b(u){if(d){u.classList.add("loading"),u.disabled=!0;try{const c={reportHtml:y(d.sections),reportType:"main",userData:m},p=await fetch(P.PDF,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(!p.ok)throw new Error("Server error");const g=await p.json();if(g.success&&g.pdfBase64){const E=atob(g.pdfBase64),x=new Array(E.length);for(let S=0;S<E.length;S++)x[S]=E.charCodeAt(S);const T=new Uint8Array(x),L=new Blob([T],{type:"application/pdf"}),w=document.createElement("a");w.href=window.URL.createObjectURL(L),w.download=g.filename||"DestinyCode_Report.pdf",document.body.appendChild(w),w.click(),document.body.removeChild(w)}else alert("Не вдалося сформувати PDF. Спробуйте пізніше.")}catch(r){console.error("PDF Download Error:",r),alert("Помилка завантаження. Перевірте з'єднання.")}finally{u.classList.remove("loading"),u.disabled=!1}}}s.addEventListener("click",()=>t.style.display="none"),i.addEventListener("click",async()=>{const u=i;u.classList.add("loading"),u.disabled=!0;try{await D({name:"Астро-Прогноз на 2026 (Late Upsell)",price:_.FORECAST_UPSELL},{email:h},{returnQueryParams:"upsell_source=stage8"})}catch{u.classList.remove("loading"),u.disabled=!1}}),f()}k.register("welcome",ie);k.register("loading",me);k.register("result",ge);k.register("premium-data",xe);k.register("paywall",Ee);k.register("success",Le);k.register("generation",ke);k.register("premium-result",Ie);document.addEventListener("DOMContentLoaded",async()=>{Z();const n=sessionStorage.getItem("destinyUser");if(n)try{const t=JSON.parse(n);["date","time","city","geo","email","planets","hasPaidUpsell","isPaid"].forEach(s=>{t[s]&&l.set(s,t[s])}),console.log("Session restored successfully from Storage")}catch(t){console.error("Failed to restore session:",t)}const e=new URLSearchParams(window.location.search),a=e.get("verify_order"),o=e.get("upsell_source");if(a){console.log(`🔍 Verifying order via API: ${a}`);try{const t=await re(a);if(console.log("Verification Result:",t),t.status==="success"){if(console.log("✅ Payment Verified via API!"),t.data&&t.data.userData){console.log("🔄 Restoring lost session from Database...");const s=t.data.userData;Object.keys(s).forEach(i=>{s[i]&&l.set(i,s[i])})}J(o)}else if(t.status==="pending"){if(t.data&&t.data.userData){console.log("🔄 Restoring session for pending order...");const s=t.data.userData;Object.keys(s).forEach(i=>{s[i]&&l.set(i,s[i])})}console.log("⏳ Payment Pending. Proceeding optimistically."),J(o)}else console.warn("❌ Payment Verification Failed:",t),Ce(t.reason||"Транзакцію відхилено банком")}catch(t){console.error("Verification Connection Error",t),l.get("isPaid")?k.navigateTo("success"):(alert("Не вдалося перевірити статус платежу. Якщо кошти списано — вони повернуться автоматично протягом 10 хв."),k.navigateTo("paywall"))}return}if(l.get("hasPaidUpsell")){k.navigateTo("premium-result");return}if(l.get("isPaid")){k.navigateTo("success");return}if(l.get("date")){k.navigateTo("result");return}k.navigateTo("welcome")});function J(n){const e=window.location.pathname;if(window.history.replaceState({},document.title,e),n==="stage8"||l.get("isPendingUpsellStage8"))l.set("hasPaidUpsell",!0),l.set("isPendingUpsellStage8",!1),k.navigateTo("premium-result");else{if(l.set("isPaid",!0),n==="stage6"){const a=`${window.location.pathname}?payment=success&upsell_source=stage6`;window.history.replaceState({},document.title,a)}k.navigateTo("success")}}function Ce(n){window.history.replaceState({},document.title,window.location.pathname);let e="Невідома помилка";try{n&&(e=decodeURIComponent(n).replace(/\+/g," "))}catch{e=n}setTimeout(()=>{alert(`⚠️ Оплата не пройшла або сталася помилка.

Банк: "${e}"

Якщо кошти було списано помилково, система автоматично поверне їх протягом 5-10 хвилин.`)},300),l.get("isPaid")?(console.log("Redirecting back to Success (User has main product)"),k.navigateTo("success")):(console.log("Redirecting back to Paywall (Main product not paid)"),k.navigateTo("paywall"))}
