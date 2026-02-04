import"./modulepreload-polyfill-B5Qt9EMX.js";import{getVariantByUrl as it}from"./index-BpkGzj8Y.js";import{API_BASE as rt,API as R,SYSTEM as V,DISPLAY_PRICES as lt,PAYMENT_PRICES as ct}from"./config-LR8BJJ1r.js";class dt{constructor(){this.storageKey="destinyUser",this.data=this.load()}load(){try{const t=sessionStorage.getItem(this.storageKey);return t?JSON.parse(t):{}}catch{return console.warn("SessionStorage disabled or inaccessible"),{}}}save(){try{sessionStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch{console.warn("Failed to save to SessionStorage")}}get(t){return this.data[t]}set(t,e){this.data[t]=e,this.save()}clear(){this.data={},sessionStorage.removeItem(this.storageKey)}}const a=new dt;class O{constructor(){document.getElementById("starry-background")||(this.container=document.createElement("div"),this.container.id="starry-background",this.container.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            background: linear-gradient(to bottom, #050508 0%, #0a0a10 100%);
            pointer-events: none;
        `,this.canvas=document.createElement("canvas"),this.canvas.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 1; 
        `,this.ctx=this.canvas.getContext("2d",{alpha:!1}),this.container.appendChild(this.canvas),document.body.prepend(this.container),this.stars=[],this.dustNodes=[],this.shootingStars=[],this.isMobile=window.innerWidth<768,this.initialGamma=null,this.initialBeta=null,this.width=window.innerWidth,this.height=window.innerHeight,this.mouseX=0,this.mouseY=0,this.targetX=0,this.targetY=0,this.lastShootingStar=0,this.shootingStarInterval=5e3+Math.random()*5e3,this.init())}init(){if(this.resize(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("mousemove",t=>this.onMouseMove(t)),window.addEventListener("deviceorientation",t=>this.onDeviceMove(t)),window.addEventListener("pageshow",t=>{t.persisted&&(console.log("🌌 StarryBackground: Restoring from bfcache..."),O.ensureRunning())}),document.addEventListener("visibilitychange",()=>{document.hidden?this.active=!1:O.ensureRunning()}),window.addEventListener("focus",()=>{O.ensureRunning()}),this.isMobile&&typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"){const t=()=>{DeviceOrientationEvent.requestPermission().then(e=>{e==="granted"&&window.addEventListener("deviceorientation",o=>this.onDeviceMove(o))}).catch(console.error).finally(()=>{window.removeEventListener("click",t),window.removeEventListener("touchstart",t)})};window.addEventListener("click",t),window.addEventListener("touchstart",t)}this.createSystem(),this.animate()}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.canvas.width=this.width,this.canvas.height=this.height,this.isMobile=this.width<768,this.createSystem()}createSystem(){this.active=!0,this.stars=[],this.dustNodes=[],this.shootingStars=[];const t=this.isMobile?5:8,e=this.height*.1,o=200,n=200;for(let y=0;y<t;y++)this.dustNodes.push({x:Math.random()*this.width,y:Math.random()*e,radius:Math.random()*n+o,colorPhase:Math.random()*Math.PI*2,pulseSpeed:.2+Math.random()*.2,vx:(Math.random()-.5)*.05,vy:(Math.random()-.5)*.05});const i=this.height*.2,r=this.isMobile?240:600;for(let y=0;y<r;y++)this.stars.push({x:Math.random()*this.width,y:Math.random()*i,size:Math.random()*.6+.1,baseOpacity:Math.random()*.4+.1,phase:Math.random()*Math.PI*2,speed:Math.random()*.02+.01,parallax:.02,isMilkyWay:!0});const h=this.isMobile?3500:3e3,v=Math.floor(this.width*this.height/h*1.2);for(let y=0;y<v;y++){let E=Math.random()<.6?Math.random()*(this.height*.5):Math.random()*this.height;this.stars.push({x:Math.random()*this.width,y:E,size:Math.random()*(this.isMobile?1.2:1.8),baseOpacity:Math.random()*.7+.3,phase:Math.random()*Math.PI*2,speed:Math.random()*.03+.01,parallax:Math.random()*.08+.04,isMilkyWay:!1})}}spawnShootingStar(){const t=Math.random()>.5,e=t?Math.random()*this.width*.2:this.width*.8+Math.random()*this.width*.2,o=Math.random()*(this.height*.3),n=t?Math.PI/6+Math.random()*Math.PI/6:Math.PI-Math.PI/6-Math.random()*Math.PI/6;this.shootingStars.push({x:e,y:o,vx:Math.cos(n)*(10+Math.random()*5),vy:Math.sin(n)*(10+Math.random()*5),length:60+Math.random()*90,opacity:1,life:1})}onMouseMove(t){this.isMobile||(this.targetX=t.clientX/this.width-.5,this.targetY=t.clientY/this.height-.5)}onDeviceMove(t){if(t.beta===null||t.gamma===null)return;if(this.initialBeta===null){this.initialBeta=t.beta,this.initialGamma=t.gamma;return}let e=t.gamma-this.initialGamma,o=t.beta-this.initialBeta;const n=30;e=Math.min(Math.max(e,-n),n),o=Math.min(Math.max(o,-n),n),this.targetX=e/n*.5,this.targetY=o/n*.5}lerp(t,e,o){return(1-o)*t+o*e}animate(){if(!this.active)return;const t=Date.now(),e=t*.001;t-this.lastShootingStar>this.shootingStarInterval&&(this.spawnShootingStar(),this.lastShootingStar=t,this.shootingStarInterval=4e3+Math.random()*6e3);const o=this.isMobile?.08:.02;this.mouseX+=(this.targetX-this.mouseX)*o,this.mouseY+=(this.targetY-this.mouseY)*o;const n=this.isMobile?1200:600,i=this.mouseX*n,r=this.mouseY*n,h=document.querySelector(".funnel-container"),v=h?h.scrollTop:window.scrollY||0,y=this.ctx.createLinearGradient(0,0,0,this.height);y.addColorStop(0,"#080504"),y.addColorStop(1,"#050508"),this.ctx.fillStyle=y,this.ctx.fillRect(0,0,this.width,this.height);const E={r:131,g:105,b:60},T={r:100,g:50,b:160};this.ctx.globalCompositeOperation="lighter",this.dustNodes.forEach(p=>{p.x+=p.vx,p.y+=p.vy;const g=(Math.sin(e*p.pulseSpeed+p.colorPhase)+1)/2,b=Math.floor(this.lerp(E.r,T.r,g)),u=Math.floor(this.lerp(E.g,T.g,g)),d=Math.floor(this.lerp(E.b,T.b,g)),c=.05+(Math.sin(e*.5+p.colorPhase)+1)*.02,k=`rgba(${b}, ${u}, ${d}, ${c})`,l=v*.2,m=i*.15,f=r*.15,w=p.x-m,x=p.y-f-l,L=this.ctx.createRadialGradient(w,x,0,w,x,p.radius);L.addColorStop(0,k),L.addColorStop(1,"transparent"),this.ctx.fillStyle=L,this.ctx.beginPath(),this.ctx.arc(w,x,p.radius,0,Math.PI*2),this.ctx.fill()}),this.ctx.globalCompositeOperation="source-over",this.ctx.fillStyle="#FFFFFF",this.stars.forEach(p=>{const S=.7+.3*Math.sin(e*(p.speed*50)+p.phase),g=v*(p.parallax*3);let b=p.x-i*p.parallax,u=p.y-r*p.parallax-g;const d=50,c=this.height+d*2;for(;u<-d;)u+=c;for(;u>this.height+d;)u-=c;b<-d&&(b+=this.width+d*2),b>this.width+d&&(b-=this.width+d*2),this.ctx.globalAlpha=p.baseOpacity*S,this.ctx.beginPath(),this.ctx.arc(b,u,p.size,0,Math.PI*2),this.ctx.fill()}),this.ctx.globalAlpha=1,this.shootingStars=this.shootingStars.filter(p=>{if(p.x+=p.vx,p.y+=p.vy,p.life-=.015,p.opacity=p.life,p.life<=0||p.x>this.width+100||p.y>this.height+100)return!1;const S=p.x-p.vx/Math.hypot(p.vx,p.vy)*p.length,g=p.y-p.vy/Math.hypot(p.vx,p.vy)*p.length,b=this.ctx.createLinearGradient(S,g,p.x,p.y);return b.addColorStop(0,"transparent"),b.addColorStop(.5,`rgba(255, 255, 255, ${p.opacity*.5})`),b.addColorStop(1,`rgba(255, 255, 255, ${p.opacity})`),this.ctx.strokeStyle=b,this.ctx.lineWidth=1.5,this.ctx.lineCap="round",this.ctx.beginPath(),this.ctx.moveTo(S,g),this.ctx.lineTo(p.x,p.y),this.ctx.stroke(),this.ctx.fillStyle=`rgba(255, 255, 255, ${p.opacity})`,this.ctx.beginPath(),this.ctx.arc(p.x,p.y,1.5,0,Math.PI*2),this.ctx.fill(),!0}),this.ctx.globalAlpha=1,requestAnimationFrame(()=>this.animate())}destroy(){this.active=!1,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}static ensureRunning(){const t=window.starryBgInstance;t&&(console.log("🌌 StarryBackground: Ensuring animation is running..."),t.active=!0,requestAnimationFrame(()=>t.animate()))}}const A={log:(...s)=>{},warn:(...s)=>{},error:(...s)=>{console.error(...s)},debug:(...s)=>{}};class pt{constructor(){this.onRoute=null,this.currentVariant=null}init(t){if(!t||typeof t.onRoute!="function"){A.error("Router init failed: config.onRoute is missing");return}this.onRoute=t.onRoute;const e=it();e&&(A.log(`🚀 Active Variant: ${e.id}`),this.currentVariant=e,a.set("currentVariant",e),this.trackVariantView(e)),window.addEventListener("popstate",()=>{O.ensureRunning(),this.handleLocation()}),this.handleLocation()}async handleLocation(){let t=window.location.pathname;this.currentVariant&&(t===`/${this.currentVariant.id}`||t===`/${this.currentVariant.id}/`)?t="/":this.currentVariant||(document.body.style.backgroundColor=""),this.onRoute&&await this.onRoute(t)}navigate(t){window.history.pushState({},"",t),this.handleLocation(),window.scrollTo(0,0)}navigateTo(t){const e=t.startsWith("/")?t:`/${t}`;this.navigate(e)}trackVariantView(t){window.fbq&&(A.log("📊 Tracking Variant View:",t.id),window.fbq("track","ViewContent",{content_name:t.id,content_category:t.type}))}}const _=new pt;class ut{constructor(){this.audioCtx=null,this.isAudioUnlocked=!1,this.canVibrate=typeof navigator<"u"&&"vibrate"in navigator,this.isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,this.tickBuffer=null,this.hasInitialized=!1}init(t=!1){if(!(this.hasInitialized&&!t))try{const e=window.AudioContext||window.webkitAudioContext;e&&(this.audioCtx=new e,this._createTickBuffer(),this.hasInitialized=!0,this._unlock())}catch(e){console.warn("Haptics: Web Audio API not supported",e)}}_createTickBuffer(){if(!this.audioCtx)return;const t=this.audioCtx.sampleRate,e=Math.floor(.015*t),o=this.audioCtx.createBuffer(1,e,t),n=o.getChannelData(0),i=150;for(let r=0;r<e;r++){const h=r/t,v=Math.sin(2*Math.PI*i*h);let y=1;r<e*.1?y=r/(e*.1):y=1-(r-e*.1)/(e*.9),n[r]=v*y}this.tickBuffer=o}_unlock(){this.isAudioUnlocked||!this.audioCtx||(this.audioCtx.state==="suspended"?this.audioCtx.resume().then(()=>{this.isAudioUnlocked=!0}).catch(t=>console.log("Audio unlock failed, waiting for next interaction")):this.isAudioUnlocked=!0)}trigger(t="light"){if(this.canVibrate){try{switch(t){case"light":navigator.vibrate(10);break;case"medium":navigator.vibrate(20);break;case"heavy":navigator.vibrate(40);break;case"success":navigator.vibrate([10,50,20]);break;case"error":navigator.vibrate([50,100,50]);break;default:navigator.vibrate(15)}}catch{}return}if(!this.isIOS&&this.audioCtx&&this.tickBuffer){this.audioCtx.state==="suspended"&&this.audioCtx.resume();const e=this.audioCtx.createBufferSource();e.buffer=this.tickBuffer;const o=this.audioCtx.createGain();let n=1,i=1;switch(t){case"light":n=.6,i=1.2;break;case"medium":n=.8,i=1;break;case"heavy":n=1,i=.8;break;case"success":this._playTone(.6,1.2,0),setTimeout(()=>this._playTone(1,1,.1),80);return;case"error":this._playTone(.8,.8,0),setTimeout(()=>this._playTone(.8,.8,.08),80),setTimeout(()=>this._playTone(.8,.8,.16),160);return}e.playbackRate.value=i,o.gain.setValueAtTime(n,this.audioCtx.currentTime),o.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.05),e.connect(o),o.connect(this.audioCtx.destination),e.start()}}_playTone(t,e,o){if(!this.audioCtx||!this.tickBuffer)return;const n=this.audioCtx.createBufferSource();n.buffer=this.tickBuffer,n.playbackRate.value=e;const i=this.audioCtx.createGain();i.gain.setValueAtTime(t,this.audioCtx.currentTime+o),i.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+o+.05),n.connect(i),i.connect(this.audioCtx.destination),n.start(this.audioCtx.currentTime+o)}}const P=new ut;let F=null;function X(){return window.CircularNatalHoroscope?Promise.resolve(!0):F?(console.log("⏳ Astro Library load request joined existing queue..."),F):(console.log("🚀 Starting Astro Library sequence..."),F=new Promise(s=>{window.module||(window.module={exports:{}}),window.exports=window.module.exports;const t=["https://unpkg.com/circular-natal-horoscope-js@1.1.0/dist/index.js","https://cdn.jsdelivr.net/npm/circular-natal-horoscope-js@1.1.0/dist/index.js","./js/astro-lib.js"];function e(o){if(o>=t.length){console.error("❌ CRITICAL: Всі джерела бібліотеки (включно з локальним) недоступні."),s(!1),F=null;return}const n=t[o],i=document.createElement("script");i.src=n,i.async=!0,i.onload=()=>{window.module&&window.module.exports&&window.module.exports.Horoscope?(window.CircularNatalHoroscope=window.module.exports,console.log(`✅ Astro Library Loaded Successfully from ${n}`),s(!0)):window.CircularNatalHoroscope?(console.log(`✅ Astro Library Loaded (Global) from ${n}`),s(!0)):(console.warn(`⚠️ Script loaded from ${n}, but exports missing.`),e(o+1))},i.onerror=()=>{console.warn(`⚠️ Failed to load from ${n}. Switching to backup source...`),e(o+1)},document.head.appendChild(i)}e(0)}),F)}async function tt(s){if(!await X())throw new Error("Astro Library not loaded");const{Origin:t,Horoscope:e,Renderer:o}=window.CircularNatalHoroscope,n=s.date.split("-"),i=parseInt(n[0]),r=parseInt(n[1])-1,h=parseInt(n[2]);let v=12,y=0;if(s.time){const c=s.time.split(":");v=parseInt(c[0]),y=parseInt(c[1])}let E=50.45,T=30.52,p="Europe/Kyiv";if(s.geo){const c=parseFloat(s.geo.latitude||s.geo.lat),k=parseFloat(s.geo.longitude||s.geo.lon);!isNaN(c)&&!isNaN(k)&&(E=c,T=k,p=s.geo.timezone||p)}let S=[],g=[],b=null,u=null;function d(c){const k=Math.floor(c),l=(c-k)*60,m=Math.floor(l),f=Math.round((l-m)*60);return`${k}° ${m}' ${f}"`}try{const c=new t({year:i,month:r,date:h,hour:v,minute:y,latitude:E,longitude:T,timezone:p});u=new e({origin:c,houseSystem:"placidus",zodiac:"tropical",aspectPoints:["bodies","points","angles"],aspectWithPoints:["bodies","points","angles"],aspectTypes:["major","minor"],customOrbs:{}});const k=u.CelestialBodies,l=u.CelestialPoints,m=["sun","moon","mercury","venus","mars","jupiter","saturn","uranus","neptune","pluto"],f=["northnode","southnode","lilith","chiron"],w=["ascendant","midheaven"];m.forEach(x=>{const L=k[x];if(L){const I=L.Sign.label.toUpperCase(),C=L.ChartPosition.Ecliptic.DecimalDegrees%30,M=d(C),B=x.toUpperCase();let N="";L.Speed&&L.Speed.DecimalDegrees<0&&(N=" (R)"),S.push(`${B}: ${I} ${M}${N}`)}}),f.forEach(x=>{const L=l?l[x]:null;if(L){const I=L.Sign?.label?.toUpperCase()||"UNKNOWN",C=(L.ChartPosition?.Ecliptic?.DecimalDegrees||0)%30,M=d(C);let B=x.toUpperCase();x==="northnode"&&(B="NORTH NODE (Rahu)"),x==="southnode"&&(B="SOUTH NODE (Ketu)"),x==="lilith"&&(B="LILITH (Black Moon)"),x==="chiron"&&(B="CHIRON"),S.push(`${B}: ${I} ${M}`)}}),w.forEach(x=>{let L=null;if(x==="ascendant"&&(L=u.Ascendant),x==="midheaven"&&(L=u.Midheaven),L){const I=L.Sign.label.toUpperCase(),C=L.ChartPosition.Ecliptic.DecimalDegrees%30,M=d(C),B=x.toUpperCase();S.push(`${B}: ${I} ${M}`)}}),u.Aspects&&u.Aspects.all&&u.Aspects.all.forEach(x=>{const L=x.point1?.label||x.point1?.key||"Unknown",I=x.point2?.label||x.point2?.key||"Unknown",C=x.name||x.type||"Aspect",M=x.orb!==void 0?x.orb.toFixed(1):"?";g.push(`${L} ${C} ${I} (orb ${M}°)`)}),console.log("Calculated Planets (DMS + Retrograde):",S),console.log("Calculated Aspects:",g)}catch(c){return console.error("Horoscope Calculation Failed:",c),{planets:[],aspects:[],chartSvg:null,houseSystem:"Error"}}try{if(u){const c=document.createElement("div");c.style.position="absolute",c.style.left="-9999px",c.style.visibility="hidden",document.body.appendChild(c),new o(u).render(c);const l=c.querySelector("svg");l&&(l.style.backgroundColor="transparent",l.querySelectorAll("line, circle, path").forEach(m=>{const f=m.getAttribute("stroke");(!f||f==="#000000"||f==="#000")&&m.setAttribute("stroke","#cda45e");const w=m.getAttribute("fill");(w==="#000000"||w==="#000")&&m.setAttribute("fill","#cda45e")}),l.querySelectorAll("text").forEach(m=>{m.style.fill="#cda45e",m.setAttribute("fill","#cda45e"),m.style.fontFamily="'Montserrat', sans-serif"}),b=c.innerHTML),document.body.removeChild(c)}}catch(c){console.warn("SVG Render Error:",c)}return{planets:S,aspects:g,chartSvg:b,houseSystem:"Placidus"}}async function H(s,t={},e={}){try{let o;if(s.startsWith("http://")||s.startsWith("https://"))o=s;else{const r=s.startsWith("/")?s.slice(1):s;o=`${rt}/${r}`}const n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),...e},i=await fetch(o,n);if(!i.ok){const r=await i.text();throw new Error(r||`API Error: ${i.status}`)}return await i.json()}catch(o){throw o.name!=="AbortError"&&A.error(`[API Core Error] ${s}:`,o),o}}let D=null,z=null;function j(){R&&R.PDF&&H(R.PDF,{warmup:!0}).catch(()=>{})}function J(s){if(!s)return null;try{return JSON.parse(s)}catch{}const t="```",e=new RegExp(t+"(?:json)?\\s*([\\s\\S]*?)\\s*"+t,"i"),o=s.match(e);if(o&&o[1])try{return JSON.parse(o[1])}catch{}const n=s.indexOf("{"),i=s.lastIndexOf("}");if(n!==-1&&i!==-1&&i>n){const r=s.substring(n,i+1);try{return JSON.parse(r)}catch(h){console.error("❌ JSON Extraction Failed (Brace Method):",h)}}throw console.error("❌ Fatal: Could not parse AI response. Raw content:",s),new Error("Invalid JSON format from AI")}function et(s){if(!s||!Array.isArray(s))return"";const t={section:"margin-bottom: 35px; page-break-inside: avoid;",h2:"color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px;",p:"font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #e0e0e0; margin-bottom: 12px; text-align: justify;",strong:"color: #ffffff; font-weight: 600;",adviceBox:"background-color: #161b22; border: 1px solid rgba(205, 164, 94, 0.2); border-left: 4px solid #cda45e; padding: 20px; margin-top: 20px; border-radius: 0 8px 8px 0;",adviceHeader:"color: #cda45e; display: block; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700; font-family: 'Montserrat', sans-serif;",adviceText:"margin: 0; color: #cccccc; font-style: italic; font-family: 'Montserrat', sans-serif; font-size: 13px; line-height: 1.6;"};return s.map(e=>{let o=e.analysis_text||"";o=o.replace(/\\n/g,`
`),o=o.replace(/\*\*(.*?)\*\*/g,`<strong style="${t.strong}">$1</strong>`);const n=o.split(`
`).filter(i=>i.trim()!=="").map(i=>`<p style="${t.p}">${i}</p>`).join("");return`
            <div class="report-section" style="${t.section}">
                <h2 style="${t.h2}">
                    <span style="margin-right: 8px;">${e.icon}</span> ${e.title}
                </h2>
                <div class="report-content-text">${n}</div>
                <div class="report-advice" style="${t.adviceBox}">
                    <span style="${t.adviceHeader}">⚡️ KOSMIC KEY:</span>
                    <p style="${t.adviceText}">${e.practical_advice}</p>
                </div>
            </div>`}).join("")}async function W(s,t){const e=new AbortController,o=setTimeout(()=>e.abort(),V.REQUEST_TIMEOUT_MS);try{if(!R||!R.PROXY)throw new Error("Configuration Error: API.PROXY is missing. Please check src/config.js");A.log(`📡 Sending request to: ${R.PROXY} [Action: ${s}]`);const n=await H(R.PROXY,{action:s,data:t,modelName:V.MODEL_NAME},{signal:e.signal});clearTimeout(o);const i=n.candidates?.[0]?.content?.parts?.[0]?.text;if(!i)throw new Error("AI returned empty response (no text candidate)");return i}catch(n){throw clearTimeout(o),console.error("AI Request Failed:",n),n}}async function mt(s){j();try{let t=`Дата народження: ${s}`;try{const n=await tt({date:s});n&&n.planets&&(t=`Дата: ${s}
== Технічні Астрологічні Дані ==
${n.planets.join(`
`)}`)}catch(n){console.warn("Free astro calc skipped",n)}const e=await W("free_analysis",{date:s,userQuery:t});return J(e)}catch(t){return console.error("Free Analysis Error:",t),{title:"Помилка З'єднання",psychological_analysis:`<p>На жаль, сервер не зміг обробити відповідь ШІ. Спробуйте ще раз.</p><p style="color:rgba(255,255,255,0.3); font-size:0.7em;">Details: ${t.message}</p>`}}}async function nt(s){if(D)return D;let t="";try{const r=await tt(s);r&&r.planets&&(t=`== Технічні Астрологічні Дані ==
${r.planets.join(`
`)}`,a.set("planets",r.planets),r.aspects&&r.aspects.length>0&&(t+=`

== Аспекти Натальної Карти ==
${r.aspects.join(`
`)}`,a.set("aspects",r.aspects)))}catch(r){console.warn("Local calc skipped",r)}const e=`Дата: ${s.date}
Час: ${s.time}
Місто: ${s.city}
${t}`,o=a.get("currentVariant");let n=e;o&&o.aiContext&&o.aiContext.additionalPrompt&&(A.log("🧠 Injecting AI Context from Variant:",o.id),n+=`

[ВАЖЛИВИЙ КОНТЕКСТ МАРКЕТИНГУ: ${o.aiContext.additionalPrompt}]`);const i=a.get("planets")?{...s,planets:a.get("planets"),aspects:a.get("aspects")}:s;return D=W("full_report",{userQuery:n}).then(r=>{const h=J(r);return z={data:h,enrichedUserData:i},h}).catch(r=>{throw D=null,r}),D}async function ot(s,t){let e=null,o=s;try{if(z?(e=z.data,o=z.enrichedUserData):D?(e=await D,o=a.get("planets")?{...s,planets:a.get("planets")}:s):(e=await nt(s),o=a.get("planets")?{...s,planets:a.get("planets")}:s),t&&t.includes("@")){A.log("📧 Preparing Main Report Email (Frontend Trigger)...");const n=et(e.sections);H(R.EMAIL,{userEmail:t,reportHtml:n,reportTitle:"Твій Повний Аналіз",reportType:"main",userData:o}).catch(i=>console.error("Email Error:",i))}return e}catch(n){return console.error("Generate Full Report Error:",n),{error:!0,message:"Не вдалося згенерувати звіт."}}}async function gt(s,t){a.get("planets");const e=`Користувач: Жінка. Дата: ${s.date}. Місто: ${s.city}`;try{A.log("🔮 Generating Forecast for UI preview...");const o=await W("forecast",{userQuery:e}),n=J(o);if(!n||!n.sections)throw new Error("Invalid Forecast JSON");const i=et(n.sections);return A.log("✅ Forecast HTML generated. Email буде відправлено backend'ом."),i}catch(o){return console.error("Generate Forecast Error:",o),null}}const ht=`<section id="landing-step" class="funnel-step active space-y-8 text-center flex flex-col justify-between"
    style="min-height: 100dvh;">

    <!-- Main Content Wrapper -->
    <div class="flex-grow flex flex-col justify-center space-y-8">
        <div>
            <svg class="w-16 h-16 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                style="color: var(--accent-color);">
                <circle cx="32" cy="32" r="2.5" fill="currentColor" />
                <path
                    d="M52 32C52 43.0457 43.0457 52 32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32Z"
                    stroke="currentColor" stroke-width="2.5" stroke-opacity="0.3" />
                <path
                    d="M46.8564 32C46.8564 39.098 40.098 44.8564 32 44.8564C23.902 44.8564 17.1436 39.098 17.1436 32C17.1436 24.902 23.902 19.1436 32 19.1436C40.098 19.1436 46.8564 24.902 46.8564 32Z"
                    stroke="currentColor" stroke-width="2.5" />
            </svg>
        </div>
        <div class="space-y-4">
            <h2 class="text-3xl font-bold text-white tracking-tight">
                Розкрий свої приховані таланти та сильні сторони
            </h2>
            <p class="text-lg" style="color: var(--secondary-text-color);">
                Обери дату народження щоб дізнатися про свої приховані таланти та сильні сторони в основних сферах
                життя: <span class="text-white font-medium">стосунки, кар'єра, фінанси та самореалізація</span>.
            </p>
        </div>

        <form id="birth-form" class="w-full space-y-4" novalidate>
            <div
                class="input-field shine-effect h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                <svg class="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 animate-pulse"
                    style="color: var(--accent-color);" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.28-.06-.57 0-.84.18l-.24.17c-.27.2-.35.59-.16.89l2.65 4.14c.44.69 1.19 1.1 1.99 1.1h6.5c1.45 0 2.56-1.25 2.45-2.69l-.32-3.92c-.08-.94-.78-1.68-1.66-1.92z"
                        fill="currentColor" />
                    <path d="M8.5 2 C 9.5 1, 13.5 1, 14.5 2" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-opacity="0.6" />
                    <path d="M11.5 0.5 V 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-opacity="0.6" />
                </svg>

                <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2"
                    style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                    </path>
                </svg>

                <span id="date-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обрати
                    дату</span>
                <input type="date" id="birth-date" name="birth-date"
                    class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10" required>
            </div>
            <p id="error-message" class="error-text">
                Будь ласка, обери дату народження.
            </p>
            <button type="submit" id="birth-form-btn" class="btn btn-primary !text-lg h-14">
                <span class="btn-text">Дізнатися негайно</span>
                <span class="btn-spinner"></span>
            </button>
        </form>
    </div>

    <!-- CLEAN FOOTER (JUST ONE LINK) -->
    <div class="clean-footer-link mt-auto">
        <span class="clean-footer-btn" id="open-info-modal-btn">
            Юридична інформація та Підтримка
        </span>
        <!-- 🔥 UPDATED YEAR TO 2026 -->
        <p class="text-[9px] mt-2 opacity-50">&copy; 2026 Destiny Code</p>
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
                <span class="legal-link" data-legal-type="contacts">Контакти</span>

                <!-- 🔥 NEW: Telegram Bot Link -->
                <!-- Використовуємо клас legal-link для збереження стилю, але тег <a> для прямого переходу -->
                <a href="https://t.me/DestinyCodeHelpBot" target="_blank" class="legal-link"
                    style="color: #cda45e; border-color: #cda45e;">Підтримка в Telegram</a>
            </div>

            <div class="opacity-80 text-xs mt-4 border-t border-gray-700 pt-4">
                <p class="mb-2"><strong>ВІДМОВА ВІД ВІДПОВІДАЛЬНОСТІ:</strong><br>Всі астрологічні прогнози, розрахунки
                    та описи на цьому сайті надаються виключно в розважальних та ознайомчих цілях.</p>
                <p class="italic opacity-70 mb-4">IMPORTANT: All materials are for educational and entertainment
                    purposes only.</p>
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
    <p>1. Цей документ є публічною пропозицією (офертою) фізичної особи-підприємця <strong>Серняк О.О.</strong> (далі –
        Виконавець) укласти договір про надання інформаційних послуг розважального характеру.</p>
    <p>2. Послуги надаються у вигляді цифрового контенту (астрологічних звітів), згенерованого за допомогою програмного
        забезпечення.</p>
    <p>3. Користувач погоджується, що послуги мають виключно розважальний характер. Виконавець не несе відповідальності
        за прийняті Користувачем рішення на основі наданої інформації.</p>
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
    <p>1. Ми збираємо лише ті дані, які необхідні для надання послуги: дата народження, час, місто (для розрахунку
        натальної карти) та Email (для відправки звіту).</p>
    <p>2. Ми не передаємо ваші дані третім особам, окрім випадків, передбачених законодавством або необхідних для
        обробки платежу (платіжні шлюзи).</p>
    <p>3. Ви маєте право вимагати видалення ваших даних, написавши на <strong>destinycode.online@gmail.com</strong>.</p>
</div>
<div id="legal-content-refund" style="display:none;">
    <h3>ПОЛІТИКА ПОВЕРНЕННЯ КОШТІВ</h3>
    <p>1. Оскільки послуга є цифровим товаром (контентом), який споживається в момент отримання, повернення коштів
        можливе лише у випадку технічного збою (звіт не було згенеровано або не надіслано).</p>
    <p>2. Якщо ви не отримали звіт протягом 24 годин після оплати, зверніться на
        <strong>destinycode.online@gmail.com</strong>, і ми вирішимо проблему або повернемо кошти.
    </p>
    <p>3. Суб'єктивне несприйняття тексту звіту не є підставою для повернення коштів, оскільки послуга вважається
        наданою належним чином.</p>
</div>`;function Q(s){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=ht;const e=a.get("currentVariant");if(e&&e.ui){console.log("🎨 Applying Variant UI Overrides:",e.id);const w=document.querySelector("h2"),x=document.querySelector("p.text-lg"),L=document.querySelector("#birth-form button .btn-text");if(w&&e.ui.heroTitle&&(w.innerHTML=e.ui.heroTitle),x&&e.ui.heroSubtitle&&(x.innerHTML=e.ui.heroSubtitle),L&&e.ui.buttonText&&(L.innerText=e.ui.buttonText),e.ui.backgroundColor&&(console.log("🖌️ Applying Variant Background Color:",e.ui.backgroundColor),document.body.style.backgroundColor=e.ui.backgroundColor),e.ui.heroFeatures){const C=document.getElementById("birth-form");if(C){const M=document.createElement("div");M.innerHTML=e.ui.heroFeatures,C.parentNode.insertBefore(M,C.nextSibling)}}const I=document.getElementById("hero-subtitle-cta");I&&I.addEventListener("click",()=>{P.trigger("light");const C=document.querySelector(".input-field");C&&(C.scrollIntoView({behavior:"smooth",block:"center"}),C.classList.remove("animate-pulse"),C.style.animation="none",C.offsetHeight,C.style.animation="gentle-shake 0.5s ease-in-out 2")})}if(!document.getElementById("global-anim-styles")){const w=document.createElement("style");w.id="global-anim-styles",w.innerHTML=`
            @keyframes gentle-shake {
                0%, 100% { transform: translateX(0); box-shadow: 0 0 0 0 rgba(205, 164, 94, 0); }
                25% { transform: translateX(-5px) rotate(-1deg); }
                75% { transform: translateX(5px) rotate(1deg); box-shadow: 0 0 20px 0 rgba(205, 164, 94, 0.5); }
            }

            /* 🌬️ "Mystic Breath" for Subtitle (used only if element exists) */
            @keyframes mystic-breath {
                0%, 100% { 
                    transform: scale(1); 
                    box-shadow: 0 0 0 rgba(255,255,255,0);
                    border-color: rgba(255,255,255,0.2);
                }
                50% { 
                    transform: scale(0.98); /* Squeeze inward */
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); /* Very subtle glow */
                    border-color: rgba(255,255,255,0.5);
                }
            }
            #hero-subtitle-cta {
                animation: mystic-breath 6s ease-in-out infinite;
            }

            /* ✨ "Star Shine" for Date Input Field ONLY (Stage 1) */
            /* Excludes time input on Stage 4 */
            #landing-step .input-field {
                position: relative;
                overflow: hidden;
            }
            #landing-step .input-field::after {
                content: "";
                position: absolute;
                top: 0;
                left: -50px;
                width: 17px;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.8),
                    transparent
                );
                transform: skewX(-25deg);
                animation: shine-anim 11s infinite;
                animation-delay: 3s;
                pointer-events: none;
                z-index: 5; 
            }
            
            /* ✨ "Star Shine" Restored (Scoped to .shine-effect) */
            .shine-effect {
                position: relative;
                overflow: hidden;
            }
            .shine-effect::after {
                content: "";
                position: absolute;
                top: 0;
                left: -50px;
                width: 17px;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.8),
                    transparent
                );
                transform: skewX(-25deg);
                animation: shine-anim 11s infinite;
                animation-delay: 3s;
                pointer-events: none;
                z-index: 5; 
            }
            
            @keyframes shine-anim {
                0% { left: -50px; }
                45% { left: 150%; } 
                100% { left: 150%; }
            }
        `,document.head.appendChild(w)}const o=document.getElementById("birth-form"),n=document.getElementById("birth-date"),i=document.getElementById("error-message"),r=document.getElementById("date-placeholder"),h=o.querySelector('button[type="submit"]'),v=document.getElementById("info-modal"),y=document.getElementById("legal-modal"),E=document.getElementById("open-info-modal-btn"),T=document.getElementById("close-info-modal-icon"),p=document.getElementById("close-info-modal-btn"),S=document.getElementById("close-legal-modal-icon"),g=document.getElementById("close-legal-modal-btn"),b=document.getElementById("legal-modal-body"),u=document.querySelectorAll(".legal-link[data-legal-type]");n&&n.addEventListener("blur",w=>{w.target.value&&(h.style.animation="none",requestAnimationFrame(()=>{h.style.animation="gentle-shake 0.5s ease-in-out 2"}),setTimeout(()=>{h.style.animation=""},1e3))});function d(){v&&(v.style.display="flex")}function c(){v&&(v.style.display="none")}function k(w){const x=document.getElementById("legal-content-"+w);x&&y&&b&&(b.innerHTML=x.innerHTML,y.style.display="flex")}function l(){y&&(y.style.display="none")}E&&E.addEventListener("click",()=>{P.trigger("light"),d()}),T&&T.addEventListener("click",()=>{P.trigger("light"),c()}),p&&p.addEventListener("click",()=>{P.trigger("light"),c()}),S&&S.addEventListener("click",()=>{P.trigger("light"),l()}),g&&g.addEventListener("click",()=>{P.trigger("light"),l()}),v&&v.addEventListener("click",w=>{w.target===v&&c()}),y&&y.addEventListener("click",w=>{w.target===y&&l()}),u.forEach(w=>{w.addEventListener("click",x=>{const L=x.target.getAttribute("data-legal-type");c(),setTimeout(()=>{k(L)},50)})});function m(){const w=n.value;if(!w)r.innerText="Обрати дату народження",r.style.color="var(--secondary-text-color)";else{const x=w.split("-");if(x.length===3){const L=`${x[2]}.${x[1]}.${x[0]}`;r.innerText=L,r.style.color="var(--primary-text-color)",i&&(i.style.display="none")}}}function f(){n.value===""&&(n.value="1995-01-01")}n.addEventListener("input",m),n.addEventListener("change",m),n.addEventListener("blur",m),n.addEventListener("focus",f),n.addEventListener("click",f),n.addEventListener("touchstart",f),m(),o.addEventListener("submit",async function(w){w.preventDefault(),P.trigger("heavy");const x=n.value;if(x==="")P.trigger("error"),i.innerText="Будь ласка, обери дату народження.",i.style.display="block";else{let L=function(I,C){I.classList.add("loading"),I.disabled=!0};i.style.display="none",a.set("date",x),L(h),X(),s.navigateTo("loading")}})}const ft=`<!-- 🔥 UPDATE: Використовуємо step-centered та margin: auto для ідеального центрування у funnel-container -->
<section id="loading-step" class="funnel-step active step-centered space-y-6 text-center" style="margin-top: auto; margin-bottom: auto;">
    
    <!-- Спінер (стилі беруться з main.css, прибрано зайві inline стилі) -->
    <div class="spinner" style="margin-left: auto; margin-right: auto;"></div>
    
    <!-- Контейнер для тексту -->
    <div id="loading-typing-container" class="typing-container">
        <span id="loading-text"></span>
        <!-- Курсор (стилі з main.css) -->
        <span id="loading-cursor" class="typing-cursor" style="display: none;"></span>
    </div>

</section>`;function st(s,t,e,o=50,n=0,i=!1){return new Promise(r=>{let h=0;t&&(t.style.display="inline-block"),s.innerHTML="";function v(){h<e.length?(s.innerHTML=e.substring(0,h+1),h++,setTimeout(v,o)):setTimeout(()=>{!i&&t&&(t.style.display="none"),r()},n)}v()})}async function yt(s){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=ft,document.body.classList.add("warp-mode");const e=document.getElementById("loading-text"),o=document.getElementById("loading-cursor"),n=a.get("date");j();let i=!1;const r=mt(n).then(y=>(a.set("freeReport",y),i=!0,y)).catch(y=>(console.error("API Error:",y),{error:!0,title:"❌ Помилка Аналізу",psychological_analysis:"<p>На жаль, сталася помилка під час обробки відповіді від ШІ.</p>"})),h=[{text:"Аналізую положення планет...",pause:1e3},{text:"З'єднуюсь з ефемеридами NASA...",pause:1200},{text:"Зчитую твій енергетичний код...",pause:1200},{text:"Розшифровую кармічні вузли...",pause:1500},{text:"Будую твою натальну карту...",pause:1500},{text:"Приготуйся дізнатись, наскільки ти дивовижна 💖",pause:2e3,final:!0}],v=(async()=>{for(let y=0;y<h.length;y++){if(i){console.log("🚀 API Ready! Skipping remaining animation steps.");break}const E=h[y];if(e&&o){const T=i?300:E.pause;await st(e,o,E.text,50,T,E.final)}if(i){console.log("🚀 API Ready! Animation loop stopped.");break}}o&&(o.style.display="none")})();await Promise.all([v,r]),document.body.classList.remove("warp-mode"),s.navigateTo("result")}const bt=`<!-- 🔥 UPDATE: Зменшено padding-bottom секції до 140px, щоб відповідати компактнішому футеру -->
<section id="result-step" class="funnel-step active space-y-6" style="padding-bottom: 140px;">
    <h2 class="text-2xl font-bold text-center text-white" id="result-title">Аналіз твоєї особистості</h2>
    
    <!-- Основна картка з результатом -->
    <div class="p-5 rounded-xl space-y-3" style="background-color: var(--card-bg-color); border: 1px solid var(--border-color);">
        <h3 class="text-xl font-bold" style="color: var(--accent-color);" id="free-report-title">
            <!-- Заголовок заповнюється через JS -->
        </h3>
        <div id="free-report-text" class="text-left leading-relaxed space-y-4" style="color: var(--secondary-text-color);">
            <i>(Тут з'явиться твій персональний аналіз...)</i>
        </div>

        <!-- Дивайдер -->
        <div class="relative py-4">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-700"></div>
            </div>
            <div class="relative flex justify-center">
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
    </div>

    <!-- 🔥 NEW STICKY FOOTER (Compact Version) -->
    <!-- UPDATE: Додано inline styles для зменшення відступів (padding) зверху та знизу -->
    <div class="sticky-paywall-footer" style="padding-top: 1rem; padding-bottom: calc(1rem + env(safe-area-inset-bottom));">
        
        <!-- Локальні стилі для анімації стрілочок (збережено з оригінального файлу) -->
        <style>
            @keyframes runway-lights {
                0% { opacity: 0.3; }
                50% { opacity: 1; }
                100% { opacity: 0.3; }
            }
            .runway-arrow {
                animation: runway-lights 1.2s infinite ease-in-out both;
                display: inline-block;
                color: rgba(0, 0, 0, 0.75); /* М'який чорний колір стрілочок */
            }
            .runway-arrow:nth-child(1) { animation-delay: 0s; }
            .runway-arrow:nth-child(2) { animation-delay: 0.2s; }
            .runway-arrow:nth-child(3) { animation-delay: 0.4s; }
        </style>

        <!-- Кнопка розтягнута на всю ширину (w-full), ID збережено -->
        <button id="upgrade-button" class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden">
            <span class="btn-text flex items-center justify-center gap-2">
                Отримати повний аналіз
                <span class="font-bold tracking-widest flex gap-[1px]">
                    <span class="runway-arrow">&gt;</span>
                    <span class="runway-arrow">&gt;</span>
                    <span class="runway-arrow">&gt;</span>
                </span>
            </span>
            <span class="btn-spinner"></span>
        </button>

        <!-- Додатковий мікро-текст довіри (Зменшено margin-top з mt-3 до mt-2) -->
        <div class="mt-2 flex items-center justify-center opacity-70">
             <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                🔒 Твій результат збережено
            </span>
        </div>
    </div>
</section>`;function xt(s){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=bt;const e=document.getElementById("result-title"),o=document.getElementById("free-report-title"),n=document.getElementById("free-report-text"),i=document.getElementById("upgrade-button"),r=a.get("freeReport");if(!r){s.navigateTo("welcome");return}let h="";r.psychological_analysis?h=r.psychological_analysis.replace(/\*\*(.*?)\*\*/g,'<strong style="color: var(--primary-text-color);">$1</strong>').replace(/\\n/g,"<br>"):h="<p>Дані відсутні.</p>",e.innerText="Аналіз твоєї особистості",o.innerHTML=r.title||"Результат",n.innerHTML=h,i.addEventListener("click",()=>{s.navigateTo("premium")})}const vt=`<section id="premium-data-step" class="funnel-step active space-y-5 text-center">
    
    <div class="space-y-2">
        <h2 class="text-2xl font-bold text-white tracking-tight">
            Отримай повний аналіз
        </h2>
        <p class="text-sm" style="color: var(--secondary-text-color);">
            Введи точні дані народження для повного розрахунку всіх сфер свого життя:
        </p>
    </div>

    <div id="premium-form-container" class="w-full space-y-5 mt-4">
        <!-- Time Input -->
        <div>
            <label for="birth-time" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2" style="color: var(--accent-color);">Час народження</label>
            
            <div class="input-field h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                
                <span id="time-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обери час</span>
                <input type="time" id="birth-time" name="birth-time" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10">
            </div>
            
            <p id="time-error-message" class="error-text" style="display: none;">
                Будь ласка, обери час народження.
            </p>
        </div>

        <!-- City Input -->
        <div>
            <label for="birth-city" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2" style="color: var(--accent-color);">Місто народження</label>
            
            <input 
                type="text" 
                id="birth-city" 
                name="birth-city" 
                placeholder="Наприклад, Київ" 
                class="input-field text-center hover:border-[#cda45e] transition-colors w-full"
                style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; background-color: var(--card-bg-color) !important; opacity: 1;"
            >
            
            <style>
                #birth-city {
                    color: #ffffff !important;
                    -webkit-text-fill-color: #ffffff !important;
                    caret-color: var(--accent-color);
                }
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
                #birth-city:focus::placeholder { opacity: 0; color: transparent; -webkit-text-fill-color: transparent !important; }
            </style>

            <p id="city-error-message" class="error-text">Текст помилки...</p>
            <p id="city-info-message" class="info-text"></p>
        </div>

        <!-- 🔥 NEW LOCATION: Value Proposition List (Clean, No Border) -->
        <!-- Цей блок тепер тут: під полями, над кнопкою. Без фону і рамок. -->
        <div class="text-left mx-auto max-w-[340px] pt-2 pb-1">
            <p class="text-[10px] text-center mb-3 uppercase tracking-widest opacity-50" style="color: var(--secondary-text-color);">Що буде розраховано:</p>
            <ul class="space-y-2 text-sm pl-2">
                <li class="flex items-center gap-3">
                    <span class="text-lg min-w-[24px] text-center">🎭</span>
                    <span style="color: var(--primary-text-color);"><strong>Ядро Особистості</strong> (Характер)</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-lg min-w-[24px] text-center">❤️‍🔥</span>
                    <span style="color: var(--primary-text-color);"><strong>Код Кохання</strong> (Сумісність)</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-lg min-w-[24px] text-center">💸</span>
                    <span style="color: var(--primary-text-color);"><strong>Грошовий Потік</strong> (Кар'єра)</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-lg min-w-[24px] text-center">🔮</span>
                    <span style="color: var(--primary-text-color);"><strong>Кармічні Уроки</strong> (Призначення)</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="text-lg min-w-[24px] text-center">⚡️</span>
                    <span style="color: var(--primary-text-color);"><strong>Майбутнє</strong> (Персональний прогноз)</span>
                </li>
            </ul>
        </div>

        <div class="pt-2 space-y-3">
            <!-- Кнопка без ціни, як просили -->
            <button type="button" id="continue-to-paywall-button" class="btn btn-primary !text-lg !py-4 shadow-xl">
                <span class="btn-text">Отримати детальний аналіз</span>
                <span class="btn-spinner"></span>
            </button>
            
            <button type="button" id="skip-button" class="btn btn-skip opacity-80 text-xs">
                Я не знаю часу (Розрахувати Космограму без Домів)
            </button>
        </div>
    </div>
</section>`,wt=R.PROXY,kt=V.MODEL_NAME;async function Et(s){try{const e=(await H(wt,{action:"geo",data:{query:s},modelName:kt})).candidates?.[0]?.content?.parts?.[0]?.text;if(e){const o=e.replace(/```json\n?([\s\S]*?)\n?```/g,"$1").trim();return JSON.parse(o)}return{error:"parse_error"}}catch(t){return console.error("Geo API Network Error:",t),{error:"network_failure"}}}async function Z(s){const t=await Et(s);return t&&(typeof t.lat=="number"||typeof t.latitude=="number")?(console.log(`Geocoding success for ${s}:`,t),{latitude:t.latitude||t.lat,longitude:t.longitude||t.lon,timezone:t.timezone,corrected_name:t.corrected_name,error:null}):t&&t.error?{error:t.error}:{error:"parse_error"}}function Lt(s){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=vt;const e=document.getElementById("birth-time"),o=document.getElementById("time-placeholder"),n=e.closest(".input-field"),i=document.getElementById("time-error-message"),r=document.getElementById("birth-city"),h=document.getElementById("city-error-message"),v=document.getElementById("city-info-message"),y=document.getElementById("continue-to-paywall-button"),E=document.getElementById("skip-button");function T(){!e||!o||(e.value?(o.innerText=e.value,o.style.color="var(--primary-text-color)",n&&n.classList.remove("input-error"),i&&(i.style.display="none")):(o.innerText="Обери час",o.style.color="var(--secondary-text-color)"))}e.addEventListener("input",T),e.addEventListener("change",T),e.addEventListener("blur",T),T(),r.addEventListener("input",()=>{h.style.display="none",v.style.display="none",r.classList.remove("input-error")});function p(g,b){g&&(b?(g.classList.add("loading"),g.disabled=!0):(g.classList.remove("loading"),g.disabled=!1))}function S(g,b){g==="ambiguous"?h.innerText=`Місто "${b}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну (наприклад: ${b}, Україна).`:h.innerText=`Не можемо знайти місто "${b}". Перевірте назву.`,h.style.display="block",r.classList.add("input-error")}y.addEventListener("click",async()=>{const g=e.value;let b=r.value.trim();const u=b;let d=!1;if(h.style.display="none",i.style.display="none",n.classList.remove("input-error"),r.classList.remove("input-error"),b||(r.classList.add("input-error"),h.innerText="Будь ласка, введи місто народження.",h.style.display="block",d=!0),g||(n.classList.add("input-error"),i.style.display="block",d=!0),!b&&d){navigator.vibrate&&navigator.vibrate(50);return}p(y,!0);const c=await Z(b);let k=null;if(c&&c.latitude?(c.corrected_name&&(r.value=c.corrected_name,b=c.corrected_name,u.toLowerCase()!==c.corrected_name.toLowerCase()&&(k=`Ми уточнили: ${c.corrected_name} 😉`)),a.set("geo",{latitude:c.latitude||c.lat,longitude:c.longitude||c.lon,timezone:c.timezone}),a.set("city",c.corrected_name)):c&&c.error==="ambiguous"?(S("ambiguous",b),d=!0):(S("not_found",b),d=!0),k?(v.innerText=k,v.style.display="block"):v.style.display="none",d){p(y,!1),navigator.vibrate&&navigator.vibrate(50);return}a.set("time",g);const l={date:a.get("date"),time:g,city:a.get("city"),geo:a.get("geo")};a.set("userData",l),setTimeout(()=>{s.navigateTo("paywall")},k?1200:0)}),E.addEventListener("click",async()=>{let g=r.value.trim();const b=g;if(h.style.display="none",i.style.display="none",r.classList.remove("input-error"),n.classList.remove("input-error"),!g){r.classList.add("input-error"),h.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",h.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}p(y,!0),E.disabled=!0;const u=await Z(g);let d=null,c=!1;if(u&&u.latitude?(u.corrected_name&&(r.value=u.corrected_name,g=u.corrected_name,b.toLowerCase()!==u.corrected_name.toLowerCase()&&(d=`Ми уточнили: ${u.corrected_name} 😉`)),a.set("geo",{latitude:u.latitude||u.lat,longitude:u.longitude||u.lon,timezone:u.timezone}),a.set("city",u.corrected_name),a.set("time","")):u&&u.error==="ambiguous"?(S("ambiguous",g),c=!0):(S("not_found",g),c=!0),d&&(v.innerText=d,v.style.display="block"),c){p(y,!1),E.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}console.log("User skipped time, but city is valid.");const k={date:a.get("date"),time:"",city:a.get("city"),geo:a.get("geo")};a.set("userData",k),setTimeout(()=>{s.navigateTo("paywall")},d?1200:0)})}const Tt=`<!-- 🔥 UPDATE: Додано padding-bottom: 140px, щоб відповідати компактнішому футеру -->
<section id="final-paywall-step" class="funnel-step active space-y-6" style="padding-bottom: 140px;">

    <div class="text-center space-y-2">
        <!-- Заголовок -->
        <h2 class="text-2xl font-bold text-white leading-tight">Детальний портрет твоєї особистості готовий</h2>

        <!-- Таймер -->
        <div class="flex flex-col items-center justify-center bg-green-900/20 border border-green-500/30 rounded-lg py-1 px-4 w-full max-w-[180px] mx-auto backdrop-blur-sm mt-3">
            <span class="text-[8px] uppercase tracking-[1.5px] text-green-400/80 mb-0 font-bold">Доступно лише</span>
            <div class="flex items-baseline gap-1">
                <span id="paywall-timer" class="text-3xl font-bold font-mono text-green-400 tracking-widest drop-shadow-sm leading-none mt-1">07:00</span>
                <span class="text-[10px] text-green-400/70">хв</span>
            </div>
        </div>
    </div>

    <!-- Блок Довіри (Космічний Відбиток) -->
    <div class="space-y-1 relative"> 
        <!-- Статичний блок (плейсхолдер) -->
        <div class="astro-data-box static-placeholder" style="margin: 0; padding: 0.75rem 1rem; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 0.75rem; text-align: center;">
            <div class="text-xs font-normal tracking-wide" style="color: #9ca3af;">
                ★ Твоя карта успішно розрахована ★
            </div>
        </div>

        <!-- === ДИНАМІЧНИЙ БЛОК "КОСМІЧНИЙ ВІДБИТОК" === -->
        <!-- 🔥 UPDATE: Клас interactive-astro-box залишається для hover ефектів -->
        <div id="paywall-astro-data" class="interactive-astro-box" style="display: none;"></div>
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

    <!-- 🔥 STICKY FOOTER BUTTON (COMPACT VERSION) 🔥 -->
    <div class="sticky-paywall-footer" style="padding-top: 1rem; padding-bottom: calc(1rem + env(safe-area-inset-bottom));">
        <button id="final-checkout-button" class="btn btn-primary w-full !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden px-1">
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
        <div class="mt-2 flex items-center justify-center opacity-70">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                🔒 Безпечна оплата SSL | APPLE PAY / GOOGLE PAY
            </span>
        </div>
    </div>

    <!-- Popup Modal -->
    <div id="paywall-popup" class="modal-overlay">
        <!-- 🔥 UPDATE: Added relative positioning for close icon -->
        <div class="modal-content relative" style="border-top: 4px solid #cda45e;">
            
            <!-- 🔥 NEW: Хрестик закриття (верхній правий кут) -->
            <span id="popup-close-icon" class="absolute top-2 right-4 text-gray-400 hover:text-white cursor-pointer text-3xl font-light transition-colors leading-none" style="z-index: 10;">&times;</span>

            <h3 id="popup-title" class="text-xl font-bold text-white mb-4 leading-tight pr-6" style="color: #cda45e;"></h3>
            
            <div id="popup-text" class="text-left" style="color: var(--secondary-text-color); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6;"></div>

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

    <style>
        /* Стилі для інтерактивного блоку */
        .interactive-astro-box {
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .interactive-astro-box:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(205, 164, 94, 0.15);
            border-color: rgba(205, 164, 94, 0.5) !important;
        }

        /* 🔥 NEW: Анімація для заголовку всередині боксу */
        /* Цей клас генерується JS-ом в astro-renderer.js, ми стилізуємо його тут */
        .interactive-astro-box .astro-data-title {
            animation: title-pulse 2s infinite ease-in-out;
            text-shadow: 0 0 5px rgba(205, 164, 94, 0.3);
        }

        @keyframes title-pulse {
            0%, 100% { opacity: 0.8; text-shadow: 0 0 0 rgba(205, 164, 94, 0); }
            50% { opacity: 1; text-shadow: 0 0 10px rgba(205, 164, 94, 0.6); transform: scale(1.02); }
        }

        .text-accent {
            color: var(--accent-color);
        }
        
        /* Стилізація контенту в попапі */
        #popup-text strong {
            color: white;
            font-weight: 600;
        }
        #popup-text ul {
            list-style-type: none;
            padding-left: 0;
            margin-top: 10px;
        }
        #popup-text li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 8px;
        }
        #popup-text li::before {
            content: "•";
            color: var(--accent-color);
            position: absolute;
            left: 0;
            font-weight: bold;
        }
    </style>
</section>`;async function Y(s){if(await X(),!window.CircularNatalHoroscope)return`
            <div class="astro-data-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.1);">
                <p class="text-xs text-yellow-400 text-center pulse-text">
                    ⏳ Завантаження астро-даних...<br>
                    (Спробуйте зачекати кілька секунд)
                </p>
            </div>
        `;const{Origin:t,Horoscope:e,Renderer:o}=window.CircularNatalHoroscope;let n=s.geo;if(n||(n={latitude:50.45,longitude:30.52,timezone:"Europe/Kyiv"}),!s.date)return"";try{let g=function(c,k){let l=S[c];if(!l&&c==="ascendant"&&(l=p.Ascendant),!l&&c==="midheaven"&&(l=p.Midheaven),l){const m=l.Sign.label,f=l.ChartPosition.Ecliptic.DecimalDegrees%30,w=Math.floor(f),x=(f-w)*60,L=Math.floor(x),I=Math.round((x-L)*60);return`
                    <div class="astro-data-item">
                        <div class="astro-label-row">
                            <span class="astro-planet-name">${k}:</span>
                             <span class="astro-sign-name">${m}</span>
                        </div>
                        <div class="astro-coords-row">${w}° ${L}' ${I}"</div>
                    </div>
                `}return`<div class="astro-data-item"><strong>${k}:</strong> n/a</div>`};const i=s.date.split("-"),r=parseInt(i[0]),h=parseInt(i[1])-1,v=parseInt(i[2]);let y=12,E=0;if(s.time){const c=s.time.split(":");y=parseInt(c[0]),E=parseInt(c[1])}const T=new t({year:r,month:h,date:v,hour:y,minute:E,latitude:parseFloat(n.latitude),longitude:parseFloat(n.longitude),timezone:n.timezone}),p=new e({origin:T,houseSystem:"placidus",zodiac:"tropical"}),S=p.CelestialBodies,b=[];b.push(g("sun","Сонце")),b.push(g("moon","Місяць")),b.push(g("ascendant","ASC")),b.push(g("venus","Венера")),b.push(g("mars","Марс")),b.push(g("jupiter","Юпітер"));let u="";const d=document.createElement("div");d.style.position="absolute",d.style.left="-9999px",d.style.width="600px",d.style.height="600px",document.body.appendChild(d);try{new o(p).render(d);const k=d.querySelector("svg");k&&(k.style.backgroundColor="transparent",k.querySelectorAll("line, circle, path").forEach(f=>{const w=f.getAttribute("stroke");(!w||w==="#000000"||w==="#000"||w==="black")&&(f.setAttribute("stroke","#cda45e"),f.setAttribute("stroke-width","1.5"))}),k.querySelectorAll("text").forEach(f=>{f.setAttribute("fill","#cda45e"),f.style.fill="#cda45e",f.style.fontFamily="'Montserrat', sans-serif",f.style.fontWeight="500"}),u=`
                    <div class="astro-chart-preview">
                        ${d.innerHTML}
                    </div>
                `)}catch(c){console.warn("Chart Render Error:",c)}return document.body.removeChild(d),`
            <div class="astro-data-box">
                <div class="astro-data-title">Твій Космічний Відбиток</div>
                ${u} 
                <div class="astro-data-grid">
                    ${b.join("")}
                </div>
            </div>
        `}catch(i){return console.error("Fingerprint render error:",i),`<div class="astro-data-box"><p class="text-xs text-red-400 text-center">Помилка розрахунку: ${i.message}</p></div>`}}async function K(s,t,e,o={}){A.log(`💳 Starting Payment: ${s.name} (${s.price} UAH)`);try{const n={amount:s.price,productName:s.name,userEmail:t.email,userName:t.name||"Client",userData:e,origin:window.location.origin,returnQueryParams:o.returnQueryParams||""},i=await H(R.endpoints.PAYMENT_INIT,n);if(i&&i.pageUrl){a.set("pendingInvoiceId",i.invoiceId),A.log("🚀 Redirecting to Monobank (Deep Link Mode)...");const r=document.createElement("a");r.href=i.pageUrl,r.target="_top",r.rel="noopener noreferrer",document.body.appendChild(r),r.click(),setTimeout(()=>{document.body.removeChild(r)},100)}else throw console.error("❌ Invalid Payment Response:",i),new Error("Invalid response from payment provider (no pageUrl)")}catch(n){console.error("❌ Payment Init Failed Details:",n);let i="Помилка ініціалізації оплати.";throw n.message&&n.message.includes("400")&&(i+=" Невірні дані."),n.message&&n.message.includes("500")&&(i+=" Сервер тимчасово недоступний."),alert(`${i}
Спробуйте ще раз.`),n}}async function St(s){try{return await H(R.endpoints.PAYMENT_CHECK,s)}catch(t){return console.error("Status Check Failed:",t),{status:"error",message:t.message}}}function U(){const s=a.get("currentVariant");let t={...lt},e={...ct};return s&&s.pricing&&(s.pricing.display&&(t={...t,...s.pricing.display}),s.pricing.charge&&(e={...e,...s.pricing.charge})),{display:t,charge:e}}function Ct(s){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=Tt;const e=U(),o=document.getElementById("paywall-timer"),n=document.getElementById("paywall-astro-data"),i=document.querySelector(".static-placeholder"),r=document.getElementById("final-checkout-button"),h=document.getElementById("paywall-popup"),v=document.getElementById("popup-title"),y=document.getElementById("popup-text"),E=document.getElementById("popup-checkout-btn"),T=document.getElementById("popup-close-btn"),p=document.getElementById("popup-close-icon");j();function S(){const l=r.querySelector(".btn-text span span.font-bold");l&&(l.innerText=`Розблокувати все за ${e.display.FULL_REPORT} грн`);const m=E.querySelector(".whitespace-nowrap");m&&(m.innerText=`Розблокувати все за ${e.display.FULL_REPORT} грн`)}S(),window.showPaywallPopup=function(l,m){h&&v&&y&&(v.innerText=l,y.innerHTML=m,h.style.display="flex")};const g=()=>{h&&(h.style.display="none")};T&&T.addEventListener("click",()=>{P.trigger("light"),g()}),p&&p.addEventListener("click",()=>{P.trigger("light"),g()}),E&&E.addEventListener("click",()=>{P.trigger("heavy"),g(),k(r)}),h&&h.addEventListener("click",l=>{l.target===h&&g()});const b=a.get("userData")||{date:a.get("date"),time:a.get("time"),city:a.get("city"),geo:a.get("geo")};n&&Y(b).then(l=>{l?(i&&(i.style.display="none"),n.innerHTML=l,n.style.display="block"):n.style.display="none"});const u=()=>{window.showPaywallPopup("📡 Розшифровка Космічного Коду",`
            <p class="mb-3">Ти бачиш <strong>точні координати</strong> планет в момент твого народження (градуси, хвилини, секунди).</p>
            
            <p class="mb-3 text-sm italic" style="color: #cda45e; border-left: 2px solid #cda45e; padding-left: 10px;">
                "Це не просто математика. Це унікальний генетичний код твоєї душі."
            </p>

            <ul class="text-sm space-y-2 mb-4">
                <li><strong>Градус:</strong> Визначає зрілість планети (наприклад, Сонце в 29° — це "кармічний фінал", мудрість).</li>
                <li><strong>Знак:</strong> "Одяг", який носить планета (твій стиль поведінки).</li>
                <li><strong>Дім:</strong> Сфера життя, де ця енергія працює найсильніше (гроші, кохання, кар'єра).</li>
            </ul>

            <p class="mb-1">В <strong>Повному Звіті</strong> ми переклали ці складні цифри на зрозумілу мову:</p>
            <p class="text-white text-sm">✅ Як ці градуси впливають на твій дохід?<br>✅ Чому Венера в цьому положенні притягує саме таких чоловіків?</p>
        `)};n&&n.addEventListener("click",()=>{P.trigger("medium"),u()}),window.paywallInterval&&clearInterval(window.paywallInterval);let d=420;function c(){if(!o)return;const l=Math.floor(d/60),m=d%60;o.textContent=`${l<10?"0":""}${l}:${m<10?"0":""}${m}`,--d<0&&(d=0,clearInterval(window.paywallInterval))}c(),window.paywallInterval=setInterval(c,1e3);async function k(l){l.classList.add("loading"),l.disabled=!0;const m=l.querySelector(".btn-text");m&&(l.dataset.originalText=m.innerHTML,m.innerHTML=`<span class="text-lg">З'єднуюсь з банком...</span>`);try{const f=a.get("userData")||{date:a.get("date"),time:a.get("time"),city:a.get("city"),geo:a.get("geo")};console.log("📦 Preparing backup data for Safari:",f),await K({name:"Повний Астро-Портрет (Premium)",price:e.charge.FULL_REPORT},{email:a.get("email")||""},f)}catch(f){console.error("Payment error:",f),l.classList.remove("loading"),l.disabled=!1,m&&l.dataset.originalText&&(m.innerHTML=l.dataset.originalText)}}r&&r.addEventListener("click",()=>{P.trigger("heavy"),k(r)})}const It=`<section id="success-step" class="funnel-step active space-y-6">
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
                Хочеш повний <strong>Астрологічний Прогноз</strong> на найближчий рік? Дізнатися про свої фінансові піки, періоди удачі та успіхи у стосунках?<br>
                <!-- 🔥 UPDATE: Оновлено стару ціну на 570 грн -->
                <span style="color: var(--primary-text-color);">Лише зараз: <strong>97 грн.</strong> замість <span style="text-decoration: line-through; opacity: 0.7;">570 грн</span> (знижка 83%)</span>
            </p>
            
            <button id="ltv-upsell-btn" class="btn btn-violet w-full opacity-90 hover:opacity-100">
                <!-- 🔥 UPDATE: Оновлено стару ціну на 570 грн -->
                <span class="btn-text">Так, додати Прогноз всього за 97 грн. <span style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">570 грн.</span></span>
                <span class="btn-spinner"></span>
            </button>
        </div>
    </div>

    <!-- 🔥 NEW MODAL: Upsell Success & Email Capture -->
    <div id="upsell-success-modal" class="modal-overlay">
        <div class="modal-content text-left">
            <h3 class="text-2xl font-bold text-white mb-4" style="color: var(--accent-color);">Оплата успішна ✨</h3>
            
            <p style="color: var(--primary-text-color);" class="mb-4 text-sm leading-relaxed">
                Твій <strong>"Персональний Прогноз на найближчий рік"</strong> успішно оплачено.
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
</section>`;function Mt(){if(document.getElementById("global-info-modal"))return;document.body.insertAdjacentHTML("beforeend",`
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
    `);const t=document.getElementById("global-info-modal"),e=document.getElementById("global-modal-close"),o=()=>{t.style.display="none"};e.addEventListener("click",o),t.addEventListener("click",n=>{n.target===t&&o()})}function G(s,t){Mt();const e=document.getElementById("global-info-modal"),o=document.getElementById("global-modal-title"),n=document.getElementById("global-modal-message");e&&o&&n?(o.innerText=s,n.innerHTML=t,e.style.display="flex"):alert(`${s}

${t}`)}async function Pt(s){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=It;const e=new URLSearchParams(window.location.search),o=e.get("orderRef"),n=e.get("upsell_source");if(o){console.log("💳 Validating payment & restoring session:",o);const u=document.createElement("div");u.className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center fixed top-0 left-0 w-full h-full",u.style.zIndex="9999",u.innerHTML='<div class="spinner"></div>',document.body.appendChild(u);try{const d=await St({invoiceId:a.get("pendingInvoiceId"),orderRef:o});if(d.status==="approved"||d.status==="success"){if(console.log("✅ Payment Validated!"),a.set("isPaid",!0),a.set("currentInvoiceId",d.invoiceId),!a.get("purchaseTracked")){if(window.DC_Analytics){const{charge:c}=U();window.DC_Analytics.trackPurchase(c.FULL_REPORT,d.invoiceId||o,"Natal Chart Full Report")}a.set("purchaseTracked",!0)}if(d.userData&&(a.set("userData",d.userData),d.userData.date&&a.set("date",d.userData.date),d.userData.time&&a.set("time",d.userData.time),d.userData.city&&a.set("city",d.userData.city),d.userData.geo&&a.set("geo",d.userData.geo)),d.userEmail&&a.set("email",d.userEmail),u.remove(),!n){const c=a.get("userData")||{date:a.get("date"),time:a.get("time"),city:a.get("city")};nt(c).catch(k=>console.warn("Bg gen error",k))}}else{alert(`Оплата не підтверджена. Статус: ${d.status}`),u.remove(),s.navigate("/paywall");return}}catch(d){console.error(d),u.remove(),alert("Помилка перевірки статусу.")}}const i=document.getElementById("email-form"),r=document.getElementById("user-email"),h=document.getElementById("main-report-btn"),v=document.getElementById("ltv-upsell-box"),y=document.getElementById("ltv-upsell-btn"),E=document.getElementById("upsell-success-modal"),T=document.getElementById("upsell-success-form"),p=document.getElementById("upsell-success-email");r&&r.addEventListener("input",u=>{const d=u.target.value.trim();d&&a.set("email",d)});function S(){const u=U();if(v){const d=v.querySelector("p span strong");d&&(d.innerText=`${u.display.FORECAST_UPSELL} грн.`);const c=y.querySelector(".btn-text");c&&(c.innerHTML=`Так, додати Прогноз всього за ${u.display.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; margin-left: 4px;">${u.display.FORECAST_OLD} грн.</span>`)}}S();function g(){if(v&&(v.style.display="none"),h){h.classList.remove("btn-primary"),h.classList.add("btn-gold-purple");const u=h.querySelector(".btn-text");u&&(u.innerText="Надіслати мені Звіт + Прогноз")}a.get("email")&&r&&(r.value=a.get("email"))}if(a.get("isPendingUpsell")||!!n){if(a.set("hasPaidUpsell",!0),a.set("isPendingUpsell",!1),!a.get("upsellPurchaseTracked")){if(window.DC_Analytics){const{charge:c}=U();window.DC_Analytics.trackPurchase(c.FORECAST_UPSELL,`upsell_${Date.now()}`,"Forecast 2026 Upsell")}a.set("upsellPurchaseTracked",!0)}const u=window.location.pathname;window.history.replaceState({},document.title,u);const d=a.get("email");d?(g(),G("✨ Дякуємо за покупку!",`Твій <strong>Прогноз на 2026 рік</strong> генерується прямо зараз і буде відправлений на <strong>${d}</strong><br><br> Натискай <strong>Надіслати мені Звіт + Прогноз</strong> на наступній сторінці`)):E&&(E.style.display="flex")}a.get("hasPaidUpsell")&&g(),a.get("email")&&(r.value=a.get("email")),y&&y.addEventListener("click",async()=>{const u=y,d=u.querySelector(".btn-text").innerHTML;u.classList.add("loading"),u.disabled=!0,u.querySelector(".btn-text").innerText="Перехід до оплати...";try{const c=r.value?r.value.trim():"";a.set("isPendingUpsell",!0),c&&a.set("email",c);const k=a.get("userData"),{charge:l}=U();await K({name:"Астро-Прогноз на 2026",price:l.FORECAST_UPSELL},{email:c},k,{returnQueryParams:"upsell_source=stage6"})}catch(c){console.error("Upsell Error:",c),u.classList.remove("loading"),u.disabled=!1,u.querySelector(".btn-text").innerHTML=d,a.set("isPendingUpsell",!1)}}),T&&T.addEventListener("submit",u=>{u.preventDefault();const d=p.value;d&&(a.set("email",d),r.value=d,E.style.display="none",g(),G("✨ Дякуємо за покупку!",`Твій <strong>Прогноз на 2026 рік</strong> генерується і буде відправлений на <strong>${d}</strong> протягом 1-2 хвилин.<br><br>📧 Перевір папку <strong>'Вхідні'</strong> та <strong>'Спам'</strong>.`))}),i.addEventListener("submit",u=>{u.preventDefault();const d=r.value;d&&(a.set("email",d),s.navigateTo("generation"))})}const At=`<!-- 🔥 UPDATE: Центрування анімації звіту за допомогою CSS класу -->
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
</section>`;async function Bt(s){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=At;const e=document.getElementById("report-loading-text"),o=document.getElementById("report-cursor"),n={date:a.get("date"),time:a.get("time"),city:a.get("city"),geo:a.get("geo")},i=a.get("email");a.get("hasPaidUpsell")&&gt(n).catch(g=>console.warn("Forecast bg error:",g));const r=[{text:"✨ Аналізую Ядро твоєї Особистості...",pause:1500},{text:"❤️‍🔥 Розшифровую твої сценарії Кохання...",pause:1500},{text:"👑 Шукаю, де приховані твої Гроші...",pause:1500},{text:"🔮 Вивчаю твої Кармічні Уроки...",pause:1500},{text:"🌙 З'єднуюсь з енергією твого Місяця...",pause:1500},{text:"🪐 Перевіряю транзити Сатурна...",pause:1500},{text:"💫 Рахую аспекти Венери до твого Асценденту...",pause:1500},{text:"📜 Формую стародавній сувій твоєї долі...",pause:1500},{text:"🧘‍♀️ Майже готово, Всесвіт підбирає слова...",pause:1500},{text:"🦋 Твоя унікальність потребує детального аналізу...",pause:1500},{text:"✨ Додаю трохи зіркового пилу в твій звіт...",pause:1500},{text:"⚡️ Фіналізація космічного паспорта...",pause:2e3},{text:"🌞 З твоїм звітом все гаразд, просто сьогодні спалахи на сонці і треба трохи більше часу ніж зазвичай. Звіт вже летить тобі на пошту, і зараз відкриється тут.",pause:0,isDelayMessage:!0}];let h=!1,v=null;const y=12e4;(async()=>{for(let b=0;b<r.length;b++){if(h){console.log("🚀 Report is ready! Skipping animation.");return}const u=r[b];await st(e,o,u.text,50,0,!1),u.isDelayMessage&&(o&&(o.style.display="inline-block"),e&&(e.style.fontSize="0.95rem",e.style.lineHeight="1.6"));const d=100;let c=0;for(;c<u.pause;){if(h)return;await new Promise(k=>setTimeout(k,d)),c+=d}}for(;!h;)await new Promise(b=>setTimeout(b,500))})();const T=async()=>{try{const g=await ot(n,i);return g&&!g.error?(a.set("fullReport",g),{success:!0,data:g}):(console.error("Report Generation Failed:",g),{success:!1,message:g?.message||"Unknown error"})}catch(g){return console.error("API Network Error:",g),{success:!1,message:g.message}}},p=new Promise(g=>{setTimeout(()=>{g({success:!1,timeout:!0})},y)}),S=await Promise.race([T(),p]);if(S.timeout&&!S.success){console.log("⏱️ Timeout reached (2 min), but continuing to wait for report...");try{const g=await T();g.success?(v=g,h=!0):(console.log("⏳ Still waiting for report..."),await new Promise(b=>setTimeout(b,1e4)),v={success:!0,fromEmail:!0},h=!0)}catch(g){console.error("Retry failed:",g),v={success:!0,fromEmail:!0},h=!0}}else v=S,h=!0;setTimeout(()=>{s.navigateTo("premium-result")},300)}const Rt=`<section id="premium-result-step" class="funnel-step active space-y-6">
    
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
                    Хочеш повний <strong>Астрологічний Прогноз</strong> на найближчий рік? Дізнатися про свої фінансові піки, періоди удачі та успіхи у стосунках?<br><br>
                    <!-- 🔥 UPDATE: Оновлено стару ціну на 570 грн -->
                    <span style="color: var(--primary-text-color);">Лише зараз: <strong>97 грн.</strong> замість <span style="text-decoration: line-through; opacity: 0.7;">570 грн</span> (знижка 83%)</span>
                </p>
                
                <!-- 🔥 КЛЮЧОВА ЗМІНА: id="ltv-upsell-btn" для коректного трекінгу -->
                <button id="ltv-upsell-btn" class="btn btn-violet w-full">
                    <span class="btn-text">Так, додати Прогноз всього за 97 грн.</span>
                    <span class="btn-spinner"></span>
                </button>
            </div>
        </div>
    </div>
</section>`;function _t(s){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=Rt;const e=U(),o=document.getElementById("full-report-content"),n=document.getElementById("report-actions-container");o&&(o.style.backgroundColor="transparent",o.style.border="none",o.style.padding="0",o.className="w-full");const i=document.getElementById("late-upsell-modal"),r=document.getElementById("close-late-upsell"),h=document.getElementById("ltv-upsell-btn"),v=document.getElementById("upsell-purchased-modal"),y=document.getElementById("close-purchased-modal-btn"),E=a.get("userData")||{date:a.get("date"),time:a.get("time"),city:a.get("city"),geo:a.get("geo"),planets:a.get("planets")||[]},T=a.get("email"),p="dc_full_report_backup_v2";if(new URLSearchParams(window.location.search).get("upsell_source")==="stage8"){a.set("hasPaidUpsell",!0);try{const m=localStorage.getItem(p);if(m){const f=JSON.parse(m);f&&f.sections&&(A.log("⚡️ Instant Report Restore from LocalStorage success!"),a.set("fullReport",f))}}catch(m){console.error("Backup restore error:",m)}const l=window.location.pathname;window.history.replaceState({},document.title,l),setTimeout(()=>{n&&n.scrollIntoView({behavior:"smooth",block:"center"})},500)}r&&r.addEventListener("click",()=>i.style.display="none"),y&&y.addEventListener("click",()=>{v&&(v.style.display="none"),c()}),window.addEventListener("click",l=>{l.target===i&&(i.style.display="none"),l.target===v&&v&&(v.style.display="none")});function b(l){return l?l.map(m=>{let f=m.analysis_text||"";f=f.replace(/\*\*(.*?)\*\*/g,'<strong style="color: #fff;">$1</strong>');const w=f.split(`
`).map(x=>`<p>${x}</p>`).join("");return`
                <div class="report-section mb-8 p-6 rounded-2xl relative overflow-hidden" 
                     style="background-color: var(--card-bg-color); border: 1px solid var(--border-color); box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    
                    <h2 class="mb-4 flex items-center gap-3" style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700;">
                        <span>${m.icon}</span> ${m.title}
                    </h2>
                    
                    <div class="report-content-text text-left leading-relaxed text-gray-300 space-y-3">
                        ${w}
                    </div>
                    
                    <div class="report-advice mt-6 pt-4 border-t border-gray-700/50">
                        <strong class="block text-[#cda45e] mb-2 uppercase text-xs tracking-wider">⚡️ Порада зірок:</strong>
                        <p class="italic text-sm text-gray-400">${m.practical_advice}</p>
                    </div>
                </div>`}).join(""):""}function u(){const l=o.querySelector(".astro-data-box");l&&(l.style.cursor="pointer",l.title="Натисніть, щоб прочитати розшифровку",l.onmouseenter=()=>{l.style.borderColor="rgba(205, 164, 94, 0.6)"},l.onmouseleave=()=>{l.style.borderColor="rgba(205, 164, 94, 0.3)"},l.addEventListener("click",()=>{G("📡 Розшифровка Космічного Коду",`
                    <p class="mb-3">Ти бачиш <strong>точні координати</strong> планет в момент твого народження (градуси, хвилини, секунди).</p>
                    
                    <p class="mb-3 text-sm italic" style="color: #cda45e; border-left: 2px solid #cda45e; padding-left: 10px;">
                        "Це не просто математика. Це унікальний генетичний код твоєї душі."
                    </p>

                    <ul class="text-sm space-y-2 mb-4">
                        <li><strong>Градус:</strong> Визначає зрілість планети (наприклад, Сонце в 29° — це "кармічний фінал", мудрість).</li>
                        <li><strong>Знак:</strong> "Одяг", який носить планета (твій стиль поведінки).</li>
                        <li><strong>Дім:</strong> Сфера життя, де ця енергія працює найсильніше (гроші, кохання, кар'єра).</li>
                    </ul>

                    <p class="mb-1">В <strong>цьому звіті</strong> ми переклали ці складні цифри на зрозумілу мову:</p>
                    <p class="text-white text-sm">✅ Як ці градуси впливають на твій дохід?<br>✅ Чому Венера в цьому положенні притягує саме таких чоловіків?</p>
                `)}))}async function d(){let l=a.get("fullReport");if(!l||!l.sections){const m=localStorage.getItem(p);if(m)try{l=JSON.parse(m),a.set("fullReport",l)}catch(f){console.warn("Backup parse fail",f)}}if(l&&l.sections){localStorage.setItem(p,JSON.stringify(l));const m=b(l.sections),f=await Y(E);o.innerHTML=m+f,u(),c();return}console.warn("⚠️ Report data missing. Fetching from API..."),o.innerHTML=`
            <div class="text-center py-12 space-y-4">
                <div class="spinner mx-auto" style="width: 3rem; height: 3rem;"></div>
                <p class="text-gray-400 animate-pulse text-sm">Відновлення вашого звіту...</p>
            </div>
        `;try{const m=await ot(E,T);if(m&&!m.error&&m.sections){a.set("fullReport",m),localStorage.setItem(p,JSON.stringify(m));const f=b(m.sections),w=await Y(E);o.innerHTML=f+w,u(),c()}else throw new Error("Invalid recovery data")}catch{o.innerHTML='<div class="text-center p-6"><p class="text-red-400">Не вдалося завантажити звіт. Будь ласка, оновіть сторінку.</p></div>'}}function c(){n.innerHTML="";const l=document.createElement("button");if(l.className="btn btn-secondary",l.innerHTML='<span class="btn-text">Завантажити PDF (Звіт)</span><span class="btn-spinner"></span>',l.onclick=()=>k(l),n.appendChild(l),a.get("hasPaidUpsell")){const m=document.createElement("div");m.className="mt-4 mb-2 p-4 rounded-lg border text-center animate-fadeIn",m.style.backgroundColor="rgba(20, 83, 45, 0.2)",m.style.borderColor="rgba(34, 197, 94, 0.3)",m.innerHTML=`
                <div class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm font-bold text-green-400 tracking-wide">
                        Твій Прогноз на 2026 рік відправлено на пошту
                    </span>
                </div>
            `,n.appendChild(m);const f=document.createElement("button");f.className="btn btn-skip",f.style.marginTop="15px",f.innerText="Почати заново (Нова карта)",f.onclick=()=>{confirm("Очистити дані та почати новий розрахунок?")&&(a.clear(),localStorage.removeItem(p),window.location.href="/")},n.appendChild(f)}else{const m=document.createElement("button");m.className="btn btn-violet",m.style.marginTop="10px",m.innerHTML=`
                <span class="btn-text flex flex-col items-center justify-center leading-tight">
                    <span class="text-[16px] font-bold">Отримати Прогноз на рік за ${e.display.FORECAST_UPSELL} грн.</span>
                    <span class="text-[10px] opacity-80 font-normal mt-1 lowercase">буде відправлено на пошту</span>
                </span>
            `,m.onclick=()=>{h&&(h.querySelector(".btn-text").innerText=`Так, отримати Прогноз за ${e.display.FORECAST_UPSELL} грн.`),i.style.display="flex"},n.appendChild(m)}}async function k(l){const m=a.get("fullReport");if(!m)return;const f=window.open("","_blank");if(f)f.document.write(`
                <html>
                    <head>
                        <title>Destiny Code PDF</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { background-color: #0f1115; color: #cda45e; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; margin: 0; text-align: center; padding: 20px; box-sizing: border-box; }
                            .loader { border: 3px solid rgba(205, 164, 94, 0.3); border-top: 3px solid #cda45e; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 20px; }
                            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                            p { margin: 0; line-height: 1.5; }
                            .main-text { font-size: 14px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; margin-bottom: 20px; color: #fff; }
                            .sub-text { font-size: 11px; opacity: 0.6; max-width: 280px; margin: 0 auto; color: #cda45e; }
                        </style>
                    </head>
                    <body>
                        <div id="loader-box">
                            <div class="loader"></div>
                            <p class="main-text">Завантажуємо PDF...</p>
                            <p class="sub-text">Повний текстовий опис та розшифровка<br>знаходяться на попередній сторінці (вкладці).</p>
                        </div>
                    </body>
                </html>
            `);else{alert("Будь ласка, дозвольте спливаючі вікна для завантаження файлу.");return}l.classList.add("loading"),l.disabled=!0;try{const w=b(m.sections),x={...E};if(!x.planets||x.planets.length===0){const M=a.get("planets");M&&M.length>0&&(x.planets=M)}const L={reportHtml:w,reportType:"main",userData:x},I=await fetch(R.PDF,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(L)});if(!I.ok)throw new Error("Server error");const C=await I.json();if(C.success&&C.pdfBase64){const M=atob(C.pdfBase64),B=new Array(M.length);for(let $=0;$<M.length;$++)B[$]=M.charCodeAt($);const N=new Uint8Array(B),at=new Blob([N],{type:"application/pdf"}),q=window.URL.createObjectURL(at);if(f)f.location.href=q;else{const $=document.createElement("a");$.href=q,$.download="DestinyCode_Report.pdf",document.body.appendChild($),$.click(),setTimeout(()=>document.body.removeChild($),100)}setTimeout(()=>window.URL.revokeObjectURL(q),6e4)}else f&&f.close(),alert("Не вдалося сформувати PDF. Спробуйте пізніше.")}catch(w){f&&f.close(),console.error("PDF Download Error:",w),alert("Помилка завантаження. Перевірте з'єднання.")}finally{l.classList.remove("loading"),l.disabled=!1}}h&&h.addEventListener("click",async()=>{const l=h;l.classList.add("loading"),l.disabled=!0;const m=a.get("fullReport");m&&localStorage.setItem(p,JSON.stringify(m));try{await K({name:"Астро-Прогноз на 2026 (Promo)",price:e.charge.FORECAST_UPSELL},{email:T},E,{returnQueryParams:"upsell_source=stage8"})}catch(f){console.error("Late Upsell Error:",f),l.classList.remove("loading"),l.disabled=!1}}),d()}function $t(s){if(window.dataLayer){const t="pv_"+Date.now()+"_"+Math.random().toString(36).substr(2,5);window.dataLayer.push({event:"virtual_pageview",page_path:s,page_title:document.title,event_id:t,email:a.get("email")||""})}}function Dt(){document.addEventListener("click",s=>{const t=s.target.closest("button, a, .paywall-item, .interactive-astro-box");if(t&&window.dataLayer){const e=t.id||t.getAttribute("name")||"no-id",o="clk_"+Date.now()+"_"+Math.random().toString(36).substr(2,5);let n="interaction_click";if(e==="upgrade-button"&&(n="click_upgrade_3scrn"),t.classList.contains("paywall-item")){const i=t.querySelector(".font-bold")?.innerText||"Unknown";n=`click_paywall_benefit_${{"Ядро Особистості":"personality","Код Твого Кохання":"love","Грошовий Потік":"money","Кармічні Уроки та Призначення":"karma","Твої Майбутні Можливості":"future"}[i]||"other"}`}else(t.classList.contains("interactive-astro-box")||e==="paywall-astro-data")&&(n="click_paywall_benefit_astro_imprint");if(window.dataLayer.push({event:n,event_id:o,element_id:e,email:a.get("email")||"",page_path:window.location.pathname}),(e==="final-checkout-button"||e==="popup-checkout-btn")&&window.DC_Analytics.trackBeginCheckout(149,"Natal Chart Full Report"),e==="ltv-upsell-btn"){const r=window.location.pathname.includes("report")||window.location.pathname.includes("premium-result")?"Report":"Success";window.DC_Analytics.trackBeginCheckout(97,`Forecast Upsell (${r})`),a.set("last_checkout_value",97),a.set("upsell_origin",r)}}},!0),document.addEventListener("click",s=>{const t=s.target.closest('button, a, .btn, .clickable, input[type="radio"], input[type="checkbox"]');t&&(t.disabled||t.classList.contains("disabled")?P.trigger("error"):t.classList.contains("btn-primary")||t.classList.contains("btn-action")?P.trigger("medium"):P.trigger("light"))},!0)}window.DC_Analytics={generateEventId:(s="evt")=>`${s}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,trackBeginCheckout:(s,t)=>{const e=window.DC_Analytics.generateEventId("bc");let o="begin_checkout_main";t.includes("(Success)")&&(o="begin_checkout_upsell_success"),t.includes("(Report)")&&(o="begin_checkout_upsell_report"),window.dataLayer.push({event:o,event_id:e,item_name:t,email:a.get("email")||"",ecommerce:{currency:"UAH",value:s,items:[{item_name:t,price:s,quantity:1}]}}),A.log(`🚀 [Analytics] ${o.toUpperCase()}: ${t}`)},trackPurchase:(s,t,e)=>{let o="purchase_main";e.includes("(Success)")&&(o="purchase_upsell_success"),e.includes("(Report)")&&(o="purchase_upsell_report"),window.dataLayer.push({event:"purchase",event_custom_name:o,event_id:t,email:a.get("email")||"",ecommerce:{transaction_id:t,value:s,currency:"UAH",items:[{item_name:e,price:s,quantity:1}]}}),A.log(`💰💰💰 [Analytics] ${o.toUpperCase()}: ${e}`)}};async function Ut(){window.starryBgInstance||(window.starryBgInstance=new O);const s=()=>{P.init(),document.body.removeEventListener("click",s),document.body.removeEventListener("touchstart",s)};document.body.addEventListener("click",s),document.body.addEventListener("touchstart",s),Dt(),_.init({onRoute:async t=>{switch($t(t),new URLSearchParams(window.location.search),t){case"/":Q(_);break;case"/loading":window.dataLayer&&window.dataLayer.push({event:"lead_confirmed",event_id:"ld_"+Date.now(),email:a.get("email")||""}),yt(_);break;case"/result":xt(_);break;case"/premium":Lt(_);break;case"/paywall":if(!a.get("userData"))return _.navigate("/");window.dataLayer&&window.dataLayer.push({event:"premium_data_confirmed",event_id:"pdc_"+Date.now(),email:a.get("email")||""}),Ct();break;case"/success":Pt(_);break;case"/generation":if(!a.get("isPaid"))return _.navigate("/paywall");Bt(_);break;case"/report":case"/premium-result":if(!a.get("isPaid"))return _.navigate("/paywall");j(),_t();break;default:Q(_)}}})}document.addEventListener("DOMContentLoaded",Ut);
