(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();class V{constructor(){this.storageKey="destinyUser",this.data=this.load()}load(){try{const e=sessionStorage.getItem(this.storageKey);return e?JSON.parse(e):{}}catch{return console.warn("SessionStorage disabled or inaccessible"),{}}}save(){try{sessionStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch{console.warn("Failed to save to SessionStorage")}}get(e){return this.data[e]}set(e,i){this.data[e]=i,this.save()}clear(){this.data={},sessionStorage.removeItem(this.storageKey)}}const r=new V;class W{constructor(){this.onRoute=null}init(e){if(!e||typeof e.onRoute!="function"){console.error("Router init failed: config.onRoute is missing");return}this.onRoute=e.onRoute,window.addEventListener("popstate",()=>this.handleLocation()),this.handleLocation()}async handleLocation(){const e=window.location.pathname;this.onRoute&&await this.onRoute(e)}navigate(e){window.history.pushState({},"",e),this.handleLocation(),window.scrollTo(0,0)}navigateTo(e){const i=e.startsWith("/")?e:`/${e}`;this.navigate(i)}}const S=new W;let R=null;function U(){return window.CircularNatalHoroscope?Promise.resolve(!0):R?(console.log("⏳ Astro Library load request joined existing queue..."),R):(console.log("🚀 Starting Astro Library sequence..."),R=new Promise(n=>{window.module||(window.module={exports:{}}),window.exports=window.module.exports;const e=["https://unpkg.com/circular-natal-horoscope-js@1.1.0/dist/index.js","https://cdn.jsdelivr.net/npm/circular-natal-horoscope-js@1.1.0/dist/index.js","./js/astro-lib.js"];function i(s){if(s>=e.length){console.error("❌ CRITICAL: Всі джерела бібліотеки (включно з локальним) недоступні."),n(!1),R=null;return}const t=e[s],a=document.createElement("script");a.src=t,a.async=!0,a.onload=()=>{window.module&&window.module.exports&&window.module.exports.Horoscope?(window.CircularNatalHoroscope=window.module.exports,console.log(`✅ Astro Library Loaded Successfully from ${t}`),n(!0)):window.CircularNatalHoroscope?(console.log(`✅ Astro Library Loaded (Global) from ${t}`),n(!0)):(console.warn(`⚠️ Script loaded from ${t}, but exports missing.`),i(s+1))},a.onerror=()=>{console.warn(`⚠️ Failed to load from ${t}. Switching to backup source...`),i(s+1)},document.head.appendChild(a)}i(0)}),R)}async function X(n){if(!await U())throw new Error("Astro Library not loaded");const{Origin:e,Horoscope:i,Renderer:s}=window.CircularNatalHoroscope,t=n.date.split("-"),a=parseInt(t[0]),d=parseInt(t[1])-1,u=parseInt(t[2]);let y=12,v=0;if(n.time){const o=n.time.split(":");y=parseInt(o[0]),v=parseInt(o[1])}let g=50.45,h=30.52,E="Europe/Kyiv";if(n.geo){const o=parseFloat(n.geo.latitude||n.geo.lat),m=parseFloat(n.geo.longitude||n.geo.lon);!isNaN(o)&&!isNaN(m)&&(g=o,h=m,E=n.geo.timezone||E)}let w=[],p=null,l=null;function c(o){const m=Math.floor(o),f=(o-m)*60,b=Math.floor(f),k=Math.floor((f-b)*60);return`${m}° ${b}' ${k}"`}try{const o=new e({year:a,month:d,date:u,hour:y,minute:v,latitude:g,longitude:h,timezone:E});l=new i({origin:o,houseSystem:"placidus",zodiac:"tropical"});const m=l.CelestialBodies;["sun","moon","mercury","venus","mars","jupiter","saturn","uranus","neptune","pluto","ascendant","midheaven"].forEach(b=>{let k=m[b];if(!k&&b==="ascendant"&&(k=l.Ascendant),!k&&b==="midheaven"&&(k=l.Midheaven),k){const L=k.Sign.label.toUpperCase(),x=k.ChartPosition.Ecliptic.DecimalDegrees%30,T=c(x),P=b.toUpperCase();w.push(`${P}: ${L} ${T}`)}}),console.log("Calculated Planets (DMS):",w)}catch(o){return console.error("Horoscope Calculation Failed:",o),{planets:[],chartSvg:null,houseSystem:"Error"}}try{if(l){const o=document.createElement("div");o.style.position="absolute",o.style.left="-9999px",o.style.visibility="hidden",document.body.appendChild(o),new s(l).render(o);const f=o.querySelector("svg");f&&(f.style.backgroundColor="transparent",f.querySelectorAll("line, circle, path").forEach(b=>{const k=b.getAttribute("stroke");(!k||k==="#000000"||k==="#000")&&b.setAttribute("stroke","#cda45e");const L=b.getAttribute("fill");(L==="#000000"||L==="#000")&&b.setAttribute("fill","#cda45e")}),f.querySelectorAll("text").forEach(b=>{b.style.fill="#cda45e",b.setAttribute("fill","#cda45e"),b.style.fontFamily="'Montserrat', sans-serif"}),p=o.innerHTML),document.body.removeChild(o)}}catch(o){console.warn("SVG Render Error:",o)}return{planets:w,chartSvg:p,houseSystem:"Placidus"}}const Q="https://europe-west1-destinycode-982fa.cloudfunctions.net",B={AI:"https://getaiprediction-kpkshoor7q-ew.a.run.app",PDF:"https://createpdf-kpkshoor7q-ew.a.run.app",EMAIL:"https://sendreportemail-kpkshoor7q-ew.a.run.app",PAYMENT_INIT:"https://initiatepayment-kpkshoor7q-ew.a.run.app",PAYMENT_CHECK:"https://checkpaymentstatus-kpkshoor7q-ew.a.run.app"},I={PROXY:B.AI,PDF:B.PDF,EMAIL:B.EMAIL,endpoints:{AI_ANALYSIS:"getAIPrediction",PDF_GEN:"createPDF",SEND_EMAIL:"sendReportEmail",PAYMENT_INIT:B.PAYMENT_INIT,PAYMENT_CHECK:B.PAYMENT_CHECK,REFUND_TRIGGER:"processRefunds"}},A={FULL_REPORT:149,FORECAST_UPSELL:247,FORECAST_OLD:1399},Z={FULL_REPORT:1,FORECAST_UPSELL:1},_=Z,D={MODEL_NAME:"gemini-2.5-flash",VERSION:"2.0.0-mono",REQUEST_TIMEOUT_MS:45e3};let C=null,O=null;function $(){console.log("🔥 Warming up PDF backend..."),I&&I.PDF&&fetch(I.PDF,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({warmup:!0})}).catch(()=>{})}function Y(n){if(!n)return null;try{return JSON.parse(n)}catch{}const e="```",i=new RegExp(e+"(?:json)?\\s*([\\s\\S]*?)\\s*"+e,"i"),s=n.match(i);if(s&&s[1])try{return JSON.parse(s[1])}catch{}const t=n.indexOf("{"),a=n.lastIndexOf("}");if(t!==-1&&a!==-1&&a>t){const d=n.substring(t,a+1);try{return JSON.parse(d)}catch(u){console.error("❌ JSON Extraction Failed (Brace Method):",u)}}throw console.error("❌ Fatal: Could not parse AI response. Raw content:",n),new Error("Invalid JSON format from AI")}function ee(n){if(!n||!Array.isArray(n))return"";const e={section:"margin-bottom: 35px; page-break-inside: avoid;",h2:"color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px;",p:"font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #e0e0e0; margin-bottom: 12px; text-align: justify;",strong:"color: #ffffff; font-weight: 600;",adviceBox:"background-color: #161b22; border: 1px solid rgba(205, 164, 94, 0.2); border-left: 4px solid #cda45e; padding: 20px; margin-top: 20px; border-radius: 0 8px 8px 0;",adviceHeader:"color: #cda45e; display: block; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700; font-family: 'Montserrat', sans-serif;",adviceText:"margin: 0; color: #cccccc; font-style: italic; font-family: 'Montserrat', sans-serif; font-size: 13px; line-height: 1.6;"};return n.map(i=>{let s=i.analysis_text||"";s=s.replace(/\\n/g,`
`),s=s.replace(/\*\*(.*?)\*\*/g,`<strong style="${e.strong}">$1</strong>`);const t=s.split(`
`).filter(a=>a.trim()!=="").map(a=>`<p style="${e.p}">${a}</p>`).join("");return`
            <div class="report-section" style="${e.section}">
                <h2 style="${e.h2}">
                    <span style="margin-right: 8px;">${i.icon}</span> ${i.title}
                </h2>
                <div class="report-content-text">${t}</div>
                <div class="report-advice" style="${e.adviceBox}">
                    <span style="${e.adviceHeader}">⚡️ KOSMIC KEY:</span>
                    <p style="${e.adviceText}">${i.practical_advice}</p>
                </div>
            </div>`}).join("")}async function F(n,e){const i=new AbortController,s=setTimeout(()=>i.abort(),D.REQUEST_TIMEOUT_MS);try{if(!I||!I.PROXY)throw new Error("Configuration Error: API.PROXY is missing. Please check src/config.js");console.log(`📡 Sending request to: ${I.PROXY} [Action: ${n}]`);const t=await fetch(I.PROXY,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:n,data:e,modelName:D.MODEL_NAME}),signal:i.signal});if(clearTimeout(s),!t.ok){const u=await t.text();throw new Error(`Backend Error (${t.status}): ${u}`)}const d=(await t.json()).candidates?.[0]?.content?.parts?.[0]?.text;if(!d)throw new Error("AI returned empty response (no text candidate)");return d}catch(t){throw clearTimeout(s),console.error("AI Request Failed:",t),t}}async function te(n){$();try{const e=await F("free_analysis",{date:n});return Y(e)}catch(e){return console.error("Free Analysis Error:",e),{title:"Помилка З'єднання",psychological_analysis:`<p>На жаль, сервер не зміг обробити відповідь ШІ. Спробуйте ще раз.</p><p style="color:rgba(255,255,255,0.3); font-size:0.7em;">Details: ${e.message}</p>`}}}async function ne(n){if(C)return C;console.log("🚀 Starting background generation (Secure)...");let e="";try{const t=await X(n);t&&t.planets&&(e=`== Технічні Астрологічні Дані ==
${t.planets.join(`
`)}`,r.set("planets",t.planets))}catch(t){console.warn("Local calc skipped",t)}const i=`Дата: ${n.date}
Час: ${n.time}
Місто: ${n.city}
${e}`,s=r.get("planets")?{...n,planets:r.get("planets")}:n;return C=F("full_report",{userQuery:i}).then(t=>{const a=Y(t);return O={data:a,enrichedUserData:s},console.log("✅ Background generation finished!"),a}).catch(t=>{throw C=null,t}),C}async function oe(n,e){let i=null,s=n;try{if(O?(i=O.data,s=O.enrichedUserData):C?(i=await C,s=r.get("planets")?{...n,planets:r.get("planets")}:n):(i=await ne(n),s=r.get("planets")?{...n,planets:r.get("planets")}:n),e&&e.includes("@")){console.log("📧 Preparing Premium Email...");const t=ee(i.sections);fetch(I.EMAIL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:e,reportHtml:t,reportTitle:"Твій Повний Аналіз",reportType:"main",userData:s})}).catch(a=>console.error("Email Error:",a))}return i}catch(t){return console.error("Generate Full Report Error:",t),{error:!0,message:"Не вдалося згенерувати звіт."}}}async function N(n,e){const i=r.get("planets"),s=i?{...n,planets:i}:n,t=`Користувач: Жінка. Дата: ${n.date}. Місто: ${n.city}`;try{const a=await F("forecast",{userQuery:t});return e&&e.includes("@")&&fetch(I.EMAIL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:e,reportHtml:a,reportType:"upsell",userData:s})}).catch(d=>console.warn("Forecast email error:",d)),a}catch{return null}}const se=`<section id="landing-step" class="funnel-step active space-y-8 text-center flex flex-col justify-between" style="min-height: 100dvh;">
    
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
</div>`;function q(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=se;const i=document.getElementById("birth-form"),s=document.getElementById("birth-date"),t=document.getElementById("error-message"),a=document.getElementById("date-placeholder"),d=i.querySelector('button[type="submit"]'),u=document.getElementById("info-modal"),y=document.getElementById("legal-modal"),v=document.getElementById("open-info-modal-btn"),g=document.getElementById("close-info-modal-icon"),h=document.getElementById("close-info-modal-btn"),E=document.getElementById("close-legal-modal-icon"),w=document.getElementById("close-legal-modal-btn"),p=document.getElementById("legal-modal-body"),l=document.querySelectorAll(".legal-link[data-legal-type]");function c(){u&&(u.style.display="flex")}function o(){u&&(u.style.display="none")}function m(L){const x=document.getElementById("legal-content-"+L);x&&y&&p&&(p.innerHTML=x.innerHTML,y.style.display="flex")}function f(){y&&(y.style.display="none")}v&&v.addEventListener("click",c),g&&g.addEventListener("click",o),h&&h.addEventListener("click",o),E&&E.addEventListener("click",f),w&&w.addEventListener("click",f),u&&u.addEventListener("click",L=>{L.target===u&&o()}),y&&y.addEventListener("click",L=>{L.target===y&&f()}),l.forEach(L=>{L.addEventListener("click",x=>{const T=x.target.getAttribute("data-legal-type");o(),setTimeout(()=>{m(T)},50)})});function b(){const L=s.value;if(!L)a.innerText="Обрати дату народження",a.style.color="var(--secondary-text-color)";else{const x=L.split("-");if(x.length===3){const T=`${x[2]}.${x[1]}.${x[0]}`;a.innerText=T,a.style.color="var(--primary-text-color)"}}}function k(){s.value===""&&(s.value="1995-01-01")}s.addEventListener("input",b),s.addEventListener("change",b),s.addEventListener("blur",b),s.addEventListener("focus",k),s.addEventListener("click",k),s.addEventListener("touchstart",k),b(),i.addEventListener("submit",async function(L){L.preventDefault();const x=s.value;if(x==="")t.innerText="Будь ласка, обери дату народження.",t.style.display="block";else{let P=function(M,j){M.classList.add("loading"),M.disabled=!0};var T=P;t.style.display="none",r.set("date",x),P(d),U(),n.navigateTo("loading")}})}const ae=`<!-- 🔥 UPDATE: Використовуємо step-centered та margin: auto для ідеального центрування у funnel-container -->
<section id="loading-step" class="funnel-step active step-centered space-y-6 text-center" style="margin-top: auto; margin-bottom: auto;">
    
    <!-- Спінер (стилі беруться з main.css, прибрано зайві inline стилі) -->
    <div class="spinner" style="margin-left: auto; margin-right: auto;"></div>
    
    <!-- Контейнер для тексту -->
    <div id="loading-typing-container" class="typing-container">
        <span id="loading-text"></span>
        <!-- Курсор (стилі з main.css) -->
        <span id="loading-cursor" class="typing-cursor" style="display: none;"></span>
    </div>

</section>`;function J(n,e,i,s=50,t=0,a=!1){return new Promise(d=>{let u=0;e&&(e.style.display="inline-block"),n.innerHTML="";function y(){u<i.length?(n.innerHTML=i.substring(0,u+1),u++,setTimeout(y,s)):setTimeout(()=>{!a&&e&&(e.style.display="none"),d()},t)}y()})}async function re(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=ae,document.body.classList.add("warp-mode");const i=document.getElementById("loading-text"),s=document.getElementById("loading-cursor"),t=r.get("date");$();let a=!1;const d=te(t).then(v=>(r.set("freeReport",v),a=!0,v)).catch(v=>(console.error("API Error:",v),{error:!0,title:"❌ Помилка Аналізу",psychological_analysis:"<p>На жаль, сталася помилка під час обробки відповіді від ШІ.</p>"})),u=[{text:"З'єднуюсь з ефемеридами NASA...",pause:1e3},{text:"Аналізую положення планет...",pause:1200},{text:"Зчитую твій енергетичний код...",pause:1200},{text:"Розшифровую кармічні вузли...",pause:1500},{text:"Будую твою натальну карту...",pause:1500},{text:"Приготуйся дізнатись, наскільки ти чудова 😈",pause:2e3,final:!0}],y=(async()=>{for(let v=0;v<u.length;v++){if(a){console.log("🚀 API Ready! Skipping remaining animation steps.");break}const g=u[v];if(i&&s){const h=a?300:g.pause;await J(i,s,g.text,50,h,g.final)}if(a){console.log("🚀 API Ready! Animation loop stopped.");break}}s&&(s.style.display="none")})();await Promise.all([y,d]),document.body.classList.remove("warp-mode"),n.navigateTo("result")}const le=`<!-- 🔥 FIX: Додано клас 'active' для відображення -->
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
</section>`;function ie(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=le;const i=document.getElementById("result-title"),s=document.getElementById("free-report-title"),t=document.getElementById("free-report-text"),a=document.getElementById("upgrade-button"),d=r.get("freeReport");if(!d){n.navigateTo("welcome");return}let u="";d.psychological_analysis?u=d.psychological_analysis.replace(/\*\*(.*?)\*\*/g,'<strong style="color: var(--primary-text-color);">$1</strong>').replace(/\\n/g,"<br>"):u="<p>Дані відсутні.</p>",i.innerText="Аналіз твоєї особистості",s.innerHTML=d.title||"Результат",t.innerHTML=u,a.addEventListener("click",()=>{n.navigateTo("premium")})}const ce=`<!-- 🔥 UPDATE: Видалено центрування (margin: auto) для верху сторінки, як в моноліті -->
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
</section>`,de=I.PROXY,pe=D.MODEL_NAME;async function ue(n){try{const e=await fetch(de,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"geo",data:{query:n},modelName:pe})});if(e.ok){const s=(await e.json()).candidates?.[0]?.content?.parts?.[0]?.text;if(s){const t=s.replace(/```json\n?([\s\S]*?)\n?```/g,"$1").trim();return JSON.parse(t)}}return console.warn("Geo API Error Status:",e.status),{error:"network_failure"}}catch(e){return console.error("Geo API Network Error:",e),{error:"network_failure"}}}async function z(n){const e=await ue(n);return e&&typeof e.lat=="number"&&typeof e.lon=="number"?(console.log(`Geocoding success for ${n}:`,e),{latitude:e.lat,longitude:e.lon,timezone:e.timezone,corrected_name:e.corrected_name,error:null}):e&&e.error?{error:e.error}:{error:"parse_error"}}function me(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=ce;const i=document.getElementById("birth-time"),s=document.getElementById("time-placeholder"),t=i.closest(".input-field"),a=document.getElementById("time-error-message"),d=document.getElementById("birth-city"),u=document.getElementById("city-error-message"),y=document.getElementById("city-info-message"),v=document.getElementById("continue-to-paywall-button"),g=document.getElementById("skip-button");function h(){!i||!s||(i.value?(s.innerText=i.value,s.style.color="var(--primary-text-color)",t&&t.classList.remove("input-error"),a&&(a.style.display="none")):(s.innerText="Обери час",s.style.color="var(--secondary-text-color)"))}i.addEventListener("input",h),i.addEventListener("change",h),i.addEventListener("blur",h),h(),d.addEventListener("input",()=>{u.style.display="none",y.style.display="none",d.classList.remove("input-error")});function E(p,l){p&&(l?(p.classList.add("loading"),p.disabled=!0):(p.classList.remove("loading"),p.disabled=!1))}function w(p,l){p==="ambiguous"?u.innerText=`Місто "${l}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну (наприклад: ${l}, Україна).`:u.innerText=`Не можемо знайти місто "${l}". Перевірте назву.`,u.style.display="block",d.classList.add("input-error")}v.addEventListener("click",async()=>{const p=i.value;let l=d.value.trim();const c=l;let o=!1;if(u.style.display="none",a.style.display="none",t.classList.remove("input-error"),d.classList.remove("input-error"),l||(d.classList.add("input-error"),u.innerText="Будь ласка, введи місто народження.",u.style.display="block",o=!0),p||(t.classList.add("input-error"),a.style.display="block",o=!0),!l&&o){navigator.vibrate&&navigator.vibrate(50);return}E(v,!0);const m=await z(l);let f=null;if(m&&m.latitude?(m.corrected_name&&(d.value=m.corrected_name,l=m.corrected_name,c.toLowerCase()!==m.corrected_name.toLowerCase()&&(f=`Ми уточнили: ${m.corrected_name} 😉`)),r.set("geo",{latitude:m.latitude||m.lat,longitude:m.longitude||m.lon,timezone:m.timezone}),r.set("city",m.corrected_name)):m&&m.error==="ambiguous"?(w("ambiguous",l),o=!0):(w("not_found",l),o=!0),f?(y.innerText=f,y.style.display="block"):y.style.display="none",o){E(v,!1),navigator.vibrate&&navigator.vibrate(50);return}r.set("time",p);const b={date:r.get("date"),time:p,city:r.get("city"),geo:r.get("geo")};r.set("userData",b),setTimeout(()=>{n.navigateTo("paywall")},f?1200:0)}),g.addEventListener("click",async()=>{let p=d.value.trim();const l=p;if(u.style.display="none",a.style.display="none",d.classList.remove("input-error"),t.classList.remove("input-error"),!p){d.classList.add("input-error"),u.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",u.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}E(v,!0),g.disabled=!0;const c=await z(p);let o=null,m=!1;if(c&&c.latitude?(c.corrected_name&&(d.value=c.corrected_name,p=c.corrected_name,l.toLowerCase()!==c.corrected_name.toLowerCase()&&(o=`Ми уточнили: ${c.corrected_name} 😉`)),r.set("geo",{latitude:c.latitude||c.lat,longitude:c.longitude||c.lon,timezone:c.timezone}),r.set("city",c.corrected_name),r.set("time","")):c&&c.error==="ambiguous"?(w("ambiguous",p),m=!0):(w("not_found",p),m=!0),o&&(y.innerText=o,y.style.display="block"),m){E(v,!1),g.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}console.log("User skipped time, but city is valid.");const f={date:r.get("date"),time:"",city:r.get("city"),geo:r.get("geo")};r.set("userData",f),setTimeout(()=>{n.navigateTo("paywall")},o?1200:0)})}const ye=`<section id="final-paywall-step" class="funnel-step active space-y-6">

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
</section>`;async function G(n){if(await U(),!window.CircularNatalHoroscope)return`
            <div class="astro-data-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.1);">
                <p class="text-xs text-yellow-400 text-center pulse-text">
                    ⏳ Завантаження астро-даних...<br>
                    (Спробуйте зачекати кілька секунд)
                </p>
            </div>
        `;const{Origin:e,Horoscope:i,Renderer:s}=window.CircularNatalHoroscope;let t=n.geo;if(t||(t={latitude:50.45,longitude:30.52,timezone:"Europe/Kyiv"}),!n.date)return"";try{let l=function(f,b){let k=p[f];if(!k&&f==="ascendant"&&(k=w.Ascendant),!k&&f==="midheaven"&&(k=w.Midheaven),k){const L=k.Sign.label,x=k.ChartPosition.Ecliptic.DecimalDegrees%30,T=Math.floor(x),P=(x-T)*60,M=Math.floor(P),j=Math.round((P-M)*60);return`
                    <div class="astro-data-item">
                        <div class="astro-label-row">
                            <span class="astro-planet-name">${b}:</span>
                             <span class="astro-sign-name">${L}</span>
                        </div>
                        <div class="astro-coords-row">${T}° ${M}' ${j}"</div>
                    </div>
                `}return`<div class="astro-data-item"><strong>${b}:</strong> n/a</div>`};var a=l;const d=n.date.split("-"),u=parseInt(d[0]),y=parseInt(d[1])-1,v=parseInt(d[2]);let g=12,h=0;if(n.time){const f=n.time.split(":");g=parseInt(f[0]),h=parseInt(f[1])}const E=new e({year:u,month:y,date:v,hour:g,minute:h,latitude:parseFloat(t.latitude),longitude:parseFloat(t.longitude),timezone:t.timezone}),w=new i({origin:E,houseSystem:"placidus",zodiac:"tropical"}),p=w.CelestialBodies,c=[];c.push(l("sun","Сонце")),c.push(l("moon","Місяць")),c.push(l("ascendant","ASC")),c.push(l("venus","Венера")),c.push(l("mars","Марс")),c.push(l("jupiter","Юпітер"));let o="";const m=document.createElement("div");m.style.position="absolute",m.style.left="-9999px",m.style.width="600px",m.style.height="600px",document.body.appendChild(m);try{new s(w).render(m);const b=m.querySelector("svg");b&&(b.style.backgroundColor="transparent",b.querySelectorAll("line, circle, path").forEach(x=>{const T=x.getAttribute("stroke");(!T||T==="#000000"||T==="#000"||T==="black")&&(x.setAttribute("stroke","#cda45e"),x.setAttribute("stroke-width","1.5"))}),b.querySelectorAll("text").forEach(x=>{x.setAttribute("fill","#cda45e"),x.style.fill="#cda45e",x.style.fontFamily="'Montserrat', sans-serif",x.style.fontWeight="500"}),o=`
                    <div class="astro-chart-preview">
                        ${m.innerHTML}
                    </div>
                `)}catch(f){console.warn("Chart Render Error:",f)}return document.body.removeChild(m),`
            <div class="astro-data-box">
                <div class="astro-data-title">Твій Космічний Відбиток</div>
                ${o} 
                <div class="astro-data-grid">
                    ${c.join("")}
                </div>
            </div>
        `}catch(d){return console.error("Fingerprint render error:",d),`<div class="astro-data-box"><p class="text-xs text-red-400 text-center">Помилка розрахунку: ${d.message}</p></div>`}}async function K(n,e={}){try{let i;if(n.startsWith("http://")||n.startsWith("https://"))i=n;else{const t=n.startsWith("/")?n.slice(1):n;i=`${Q}/${t}`}console.log(`[API Request] -> ${i}`);const s=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!s.ok){const t=await s.text();throw new Error(t||`API Error: ${s.status}`)}return await s.json()}catch(i){throw console.error(`[API Core Error] ${n}:`,i),i}}async function H(n,e,i,s={}){console.log(`💳 Starting Payment: ${n.name} (${n.price} UAH)`);try{const t={amount:n.price,productName:n.name,userEmail:e.email,userName:e.name||"Client",userData:i,origin:window.location.origin,returnQueryParams:s.returnQueryParams||""};console.log("💳 Payment Payload:",t);const a=await K(I.endpoints.PAYMENT_INIT,t);if(console.log("💳 Payment Init Response:",a),a&&a.pageUrl)r.set("pendingInvoiceId",a.invoiceId),window.location.assign(a.pageUrl);else throw console.error("❌ Invalid Payment Response:",a),new Error("Invalid response from payment provider (no pageUrl)")}catch(t){console.error("❌ Payment Init Failed Details:",t);let a="Помилка ініціалізації оплати.";throw t.message&&t.message.includes("400")&&(a+=" Невірні дані."),t.message&&t.message.includes("500")&&(a+=" Сервер тимчасово недоступний."),alert(`${a}
Спробуйте ще раз.`),t}}async function ge(n){console.log("🔍 Checking status for:",n);try{const e=await K(I.endpoints.PAYMENT_CHECK,n);return console.log("🔍 Status Response:",e),e}catch(e){return console.error("Status Check Failed:",e),{status:"error",message:e.message}}}function fe(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=ye;const i=document.getElementById("paywall-timer"),s=document.getElementById("paywall-astro-data"),t=document.getElementById("final-checkout-button"),a=document.getElementById("paywall-popup"),d=document.getElementById("popup-title"),u=document.getElementById("popup-text"),y=document.getElementById("popup-checkout-btn"),v=document.getElementById("popup-close-btn");$();function g(){const l=t.querySelector(".btn-text span span.font-bold");l&&(l.innerText=`Розблокувати зараз за ${A.FULL_REPORT} грн`);const c=y.querySelector(".whitespace-nowrap");c&&(c.innerText=`Розблокувати зараз за ${A.FULL_REPORT} грн`)}g(),window.showPaywallPopup=function(l,c){a&&d&&u&&(d.innerText=l,u.innerText=c,a.style.display="flex")},v&&v.addEventListener("click",()=>{a.style.display="none"}),y&&y.addEventListener("click",()=>{a.style.display="none",p(t)}),a&&a.addEventListener("click",l=>{l.target===a&&(a.style.display="none")});const h=r.get("userData")||{date:r.get("date"),time:r.get("time"),city:r.get("city"),geo:r.get("geo")};s&&G(h).then(l=>{l?(s.innerHTML=l,s.style.display="block"):s.style.display="none"}),window.paywallInterval&&clearInterval(window.paywallInterval);let E=420;function w(){if(!i)return;const l=Math.floor(E/60),c=E%60;i.textContent=`${l<10?"0":""}${l}:${c<10?"0":""}${c}`,--E<0&&(E=0,clearInterval(window.paywallInterval))}w(),window.paywallInterval=setInterval(w,1e3);async function p(l){l.classList.add("loading"),l.disabled=!0;const c=l.querySelector(".btn-text");c&&(l.dataset.originalText=c.innerHTML,c.innerHTML=`<span class="text-lg">З'єднуюсь з банком...</span>`);try{const o=r.get("userData")||{date:r.get("date"),time:r.get("time"),city:r.get("city"),geo:r.get("geo")};console.log("📦 Preparing backup data for Safari:",o),await H({name:"Повний Астро-Портрет (Premium)",price:_.FULL_REPORT},{email:r.get("email")||""},o)}catch(o){console.error("Payment error:",o),l.classList.remove("loading"),l.disabled=!1,c&&l.dataset.originalText&&(c.innerHTML=l.dataset.originalText)}}t&&t.addEventListener("click",()=>p(t))}const be=`<section id="success-step" class="funnel-step active space-y-6">
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
</section>`;async function he(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=be;const i=new URLSearchParams(window.location.search),s=i.get("orderRef"),t=i.get("upsell_source");if(s){console.log("💳 Validating incoming payment:",s);const c=document.createElement("div");c.className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center fixed top-0 left-0 w-full h-full",c.style.zIndex="9999",c.innerHTML='<div class="spinner"></div>',document.body.appendChild(c);try{const o=await ge({invoiceId:r.get("pendingInvoiceId"),orderRef:s});if(o.status==="approved"||o.status==="success"){console.log("✅ Payment Validated!"),r.set("isPaid",!0),r.set("currentInvoiceId",o.invoiceId),o.userData?(console.log("🔄 Restoring session from cloud backup...",o.userData),r.set("userData",o.userData),o.userData.date&&r.set("date",o.userData.date),o.userData.time&&r.set("time",o.userData.time),o.userData.city&&r.set("city",o.userData.city),o.userData.geo&&r.set("geo",o.userData.geo)):o.userEmail&&!r.get("userData")?.email&&(console.warn("⚠️ Full session recovery failed, partial email restore."),r.set("email",o.userEmail));const m=window.location.pathname;window.history.replaceState({},document.title,m),c.remove()}else{alert(`Оплата не підтверджена. Статус: ${o.status}`),c.remove(),n.navigate("/paywall");return}}catch(o){console.error(o),c.remove(),alert("Помилка перевірки статусу. Будь ласка, зверніться в підтримку.")}}const a=document.getElementById("email-form"),d=document.getElementById("user-email"),u=document.getElementById("main-report-btn"),y=document.getElementById("ltv-upsell-box"),v=document.getElementById("ltv-upsell-btn"),g=document.getElementById("upsell-success-modal"),h=document.getElementById("upsell-success-form"),E=document.getElementById("upsell-success-email");function w(){if(y){const c=y.querySelector("p span strong");c&&(c.innerText=`${A.FORECAST_UPSELL} грн.`);const o=v.querySelector(".btn-text");o&&(o.innerHTML=`Так, додати прогноз за ${A.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; margin-left: 4px;">${A.FORECAST_OLD} грн.</span>`)}}w();function p(){if(y&&(y.style.display="none"),u){u.classList.remove("btn-primary"),u.classList.add("btn-gold-purple");const c=u.querySelector(".btn-text");c&&(c.innerText="Надіслати мені Звіт + Прогноз")}}if(r.get("isPendingUpsell")||t==="stage6"){r.set("hasPaidUpsell",!0),r.set("isPendingUpsell",!1),y&&(y.style.display="none");const c=r.get("email");if(c){p();const o=r.get("userData");o&&(N(o,c),setTimeout(()=>alert("Прогноз успішно додано!"),500))}else g&&(g.style.display="flex")}r.get("hasPaidUpsell")&&p(),r.get("email")&&(d.value=r.get("email")),v.addEventListener("click",async()=>{const c=v,o=c.querySelector(".btn-text").innerHTML;c.classList.add("loading"),c.disabled=!0,c.querySelector(".btn-text").innerText="Перехід до оплати...";try{const m=d.value||"";r.set("isPendingUpsell",!0),m&&r.set("email",m);const f=r.get("userData");await H({name:"Астро-Прогноз на 2026 (Upsell)",price:_.FORECAST_UPSELL},{email:m},f,{returnQueryParams:"upsell_source=stage6"})}catch(m){console.error("Upsell Error:",m),c.classList.remove("loading"),c.disabled=!1,c.querySelector(".btn-text").innerHTML=o,r.set("isPendingUpsell",!1)}}),h&&h.addEventListener("submit",c=>{c.preventDefault();const o=E.value;if(o){r.set("email",o),d.value=o,g.style.display="none",p();const m=r.get("userData");m&&N(m,o)}}),a.addEventListener("submit",c=>{c.preventDefault();const o=d.value;o&&(r.set("email",o),n.navigateTo("generation"))})}const ve=`<!-- 🔥 UPDATE: Центрування анімації звіту за допомогою CSS класу -->
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
</section>`;async function xe(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=ve;const i=document.getElementById("report-loading-text"),s=document.getElementById("report-cursor"),t={date:r.get("date"),time:r.get("time"),city:r.get("city"),geo:r.get("geo")},a=r.get("email");r.get("hasPaidUpsell")&&N(t,a).catch(g=>console.warn("Forecast bg error:",g));const d=[{text:"✨ Аналізую Ядро твоєї Особистості...",pause:1200},{text:"❤️‍🔥 Розшифровую твої сценарії Кохання...",pause:1200},{text:"👑 Шукаю, де приховані твої Гроші...",pause:1200},{text:"🔮 Вивчаю твої Кармічні Уроки...",pause:1200},{text:"🌙 З'єднуюсь з енергією твого Місяця...",pause:1500},{text:"🪐 Перевіряю транзити Сатурна (він любить точність)...",pause:1500},{text:"💫 Рахую аспекти Венери до твого Асценденту...",pause:1500},{text:"📜 Формую стародавній сувій твоєї долі...",pause:1500},{text:"🧘‍♀️ Майже готово, Всесвіт підбирає слова...",pause:1500},{text:"🦋 Твоя унікальність потребує детального аналізу...",pause:1500},{text:"✨ Додаю трохи зіркового пилу в твій звіт...",pause:1500},{text:"⚡️ Фіналізація космічного паспорта...",pause:2e3}];let u=!1,y=null;(async()=>{for(let h=0;h<d.length;h++){if(u){console.log("🚀 Report is ready! Skipping animation.");return}const E=d[h];await J(i,s,E.text,50,0,!1);const w=100;let p=0;for(;p<E.pause;){if(u)return;await new Promise(l=>setTimeout(l,w)),p+=w}}})();try{const g=await oe(t,a);u=!0,g&&!g.error?(r.set("fullReport",g),y={success:!0}):(console.error("Report Generation Failed:",g),y={success:!1,message:g.message,type:g.type})}catch(g){u=!0,console.error("API Network Error:",g),y={success:!1,message:"Проблема з мережею"}}if(y&&y.success)setTimeout(()=>{n.navigateTo("premium-result")},300);else{let g="З'єднання перервано";y?.type==="timeout"?g="Сервер прогрівається. Спробуйте ще раз.":y?.message&&(g=y.message),i.innerHTML=`<span style="color: #ef4444; font-size: 0.9em;">⚠️ ${g}</span>`,s&&(s.style.display="none");const h=document.createElement("button");h.className="btn btn-primary mt-4",h.innerText="Натисніть для повтору ↻",h.style.maxWidth="240px",h.style.margin="20px auto",h.onclick=()=>n.navigateTo("generation");const E=document.getElementById("report-typing-container"),w=E.querySelector("button");w&&w.remove(),E.appendChild(h)}}const we=`<section id="premium-result-step" class="funnel-step active space-y-6">
    
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

</section>`;function Ee(n){const e=document.getElementById("app");e.classList.add("funnel-container"),e.innerHTML=we;const i=document.getElementById("full-report-content"),s=document.getElementById("report-actions-container"),t=document.getElementById("late-upsell-modal"),a=document.getElementById("close-late-upsell"),d=document.getElementById("late-upsell-btn"),u=r.get("fullReport"),y=r.get("userData")||{date:r.get("date"),time:r.get("time"),city:r.get("city"),geo:r.get("geo"),planets:r.get("planets")||[]},v=r.get("email");function g(p){return p?p.map(l=>{const c=l.analysis_text.split(`
`).map(o=>`<p>${o}</p>`).join("");return`
                <div class="report-section mb-6">
                    <h2 style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700;">${l.icon} ${l.title}</h2>
                    <div class="report-content-text text-left">${c}</div>
                    <div class="report-advice mt-4"><strong>Порада:</strong><p>${l.practical_advice}</p></div>
                </div>`}).join(""):""}async function h(){if(!u||!u.sections){i.innerHTML='<div class="text-center p-6"><p class="text-red-400">Дані звіту відсутні.</p></div>';return}const p=g(u.sections),l=await G(y);i.innerHTML=p+l,E()}function E(){s.innerHTML="";const p=document.createElement("button");if(p.className="btn btn-secondary",p.innerHTML='<span class="btn-text">Завантажити PDF</span><span class="btn-spinner"></span>',p.onclick=()=>w(p),s.appendChild(p),r.get("hasPaidUpsell")){const l=document.createElement("button");l.className="btn btn-secondary",l.style.marginTop="10px",l.innerText="Почати заново",l.onclick=()=>{confirm("Очистити дані?")&&(r.clear(),window.location.href=window.location.pathname)},s.appendChild(l)}else{const l=document.createElement("button");l.className="btn btn-violet",l.style.marginTop="10px",l.innerHTML=`<span class="btn-text">Отримати прогноз на рік за ${A.FORECAST_UPSELL} грн</span>`,l.onclick=()=>{d&&(d.querySelector(".btn-text").innerText=`Так, додати прогноз за ${A.FORECAST_UPSELL} грн.`),t.style.display="flex"},s.appendChild(l)}}async function w(p){if(u){p.classList.add("loading"),p.disabled=!0;try{const c={reportHtml:g(u.sections),reportType:"main",userData:y},o=await fetch(I.PDF,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(!o.ok)throw new Error("Server error");const m=await o.json();if(m.success&&m.pdfBase64){const f=atob(m.pdfBase64),b=new Array(f.length);for(let T=0;T<f.length;T++)b[T]=f.charCodeAt(T);const k=new Uint8Array(b),L=new Blob([k],{type:"application/pdf"}),x=document.createElement("a");x.href=window.URL.createObjectURL(L),x.download=m.filename||"DestinyCode_Report.pdf",document.body.appendChild(x),x.click(),document.body.removeChild(x)}else alert("Не вдалося сформувати PDF. Спробуйте пізніше.")}catch(l){console.error("PDF Download Error:",l),alert("Помилка завантаження. Перевірте з'єднання.")}finally{p.classList.remove("loading"),p.disabled=!1}}}a.addEventListener("click",()=>t.style.display="none"),d.addEventListener("click",async()=>{const p=d;p.classList.add("loading"),p.disabled=!0;try{await H({name:"Астро-Прогноз на 2026 (Late Upsell)",price:_.FORECAST_UPSELL},{email:v},y,{returnQueryParams:"upsell_source=stage8"})}catch(l){console.error("Late Upsell Error:",l),p.classList.remove("loading"),p.disabled=!1}}),h()}async function ke(){console.log("DC_ v2.0 Starting (Direct Success Mode)..."),S.init({onRoute:async n=>{console.log(`Route: ${n}`);const i=new URLSearchParams(window.location.search).has("orderRef");switch(n){case"/":q(S);break;case"/loading":re(S);break;case"/result":ie(S);break;case"/premium":me(S);break;case"/paywall":if(!r.get("userData")){S.navigate("/");return}fe();break;case"/success":r.get("isPaid")||i?he(S):S.navigate("/paywall");break;case"/generation":if(!r.get("isPaid")){S.navigate("/paywall");return}xe(S);break;case"/report":case"/premium-result":if(!r.get("isPaid")){S.navigate("/paywall");return}$(),Ee();break;default:q(S)}}})}document.addEventListener("DOMContentLoaded",ke);
