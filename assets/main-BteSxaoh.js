import"./modulepreload-polyfill-B5Qt9EMX.js";import{getVariantByUrl as ua,VARIANTS as Ve}from"./index-Kv5nAXAJ.js";import{_ as lc}from"./preload-helper-BXl3LOEh.js";import{API_BASE as da,API as It,SYSTEM as vs,DISPLAY_PRICES as cc,PAYMENT_PRICES as uc}from"./config-Cnjk6YiG.js";class dc{constructor(){this.storageKey="destinyUser",this.trafficKey="destiny_traffic_source",this.data=this.load()}load(){try{const t=sessionStorage.getItem(this.storageKey);return t?JSON.parse(t):{}}catch{return console.warn("SessionStorage disabled or inaccessible"),{}}}save(){try{sessionStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch{console.warn("Failed to save to SessionStorage")}}get(t){return this.data[t]}set(t,e){if(this.data[t]=e,this.save(),t==="traffic_type")try{localStorage.setItem(this.trafficKey,e)}catch{console.warn("LocalStorage backup failed")}}clear(){this.data={},sessionStorage.removeItem(this.storageKey)}}const T=new dc;class Fe{constructor(){document.getElementById("starry-background")||(this.container=document.createElement("div"),this.container.id="starry-background",this.container.style.cssText=`
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
        `,this.ctx=this.canvas.getContext("2d",{alpha:!1}),this.container.appendChild(this.canvas),document.body.prepend(this.container),this.stars=[],this.dustNodes=[],this.shootingStars=[],this.isMobile=window.innerWidth<768,this.initialGamma=null,this.initialBeta=null,this.width=window.innerWidth,this.height=window.innerHeight,this.mouseX=0,this.mouseY=0,this.targetX=0,this.targetY=0,this.lastShootingStar=0,this.shootingStarInterval=5e3+Math.random()*5e3,this.init())}init(){if(this.resize(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("mousemove",t=>this.onMouseMove(t)),window.addEventListener("deviceorientation",t=>this.onDeviceMove(t)),window.addEventListener("pageshow",t=>{t.persisted&&(console.log("🌌 StarryBackground: Restoring from bfcache..."),Fe.ensureRunning())}),document.addEventListener("visibilitychange",()=>{document.hidden?this.active=!1:Fe.ensureRunning()}),window.addEventListener("focus",()=>{Fe.ensureRunning()}),this.isMobile&&typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"){const t=()=>{DeviceOrientationEvent.requestPermission().then(e=>{e==="granted"&&window.addEventListener("deviceorientation",r=>this.onDeviceMove(r))}).catch(console.error).finally(()=>{window.removeEventListener("click",t),window.removeEventListener("touchstart",t)})};window.addEventListener("click",t),window.addEventListener("touchstart",t)}this.createSystem(),this.animate()}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.canvas.width=this.width,this.canvas.height=this.height,this.isMobile=this.width<768,this.createSystem()}createSystem(){this.active=!0,this.stars=[],this.dustNodes=[],this.shootingStars=[];const t=this.isMobile?5:8,e=this.height*.1,r=200,i=200;for(let f=0;f<t;f++)this.dustNodes.push({x:Math.random()*this.width,y:Math.random()*e,radius:Math.random()*i+r,colorPhase:Math.random()*Math.PI*2,pulseSpeed:.2+Math.random()*.2,vx:(Math.random()-.5)*.05,vy:(Math.random()-.5)*.05});const o=this.height*.2,l=this.isMobile?240:600;for(let f=0;f<l;f++)this.stars.push({x:Math.random()*this.width,y:Math.random()*o,size:Math.random()*.6+.1,baseOpacity:Math.random()*.4+.1,phase:Math.random()*Math.PI*2,speed:Math.random()*.02+.01,parallax:.02,isMilkyWay:!0});const u=this.isMobile?3500:3e3,h=Math.floor(this.width*this.height/u*1.2);for(let f=0;f<h;f++){let w=Math.random()<.6?Math.random()*(this.height*.5):Math.random()*this.height;this.stars.push({x:Math.random()*this.width,y:w,size:Math.random()*(this.isMobile?1.2:1.8),baseOpacity:Math.random()*.7+.3,phase:Math.random()*Math.PI*2,speed:Math.random()*.03+.01,parallax:Math.random()*.08+.04,isMilkyWay:!1})}}spawnShootingStar(){const t=Math.random()>.5,e=t?Math.random()*this.width*.2:this.width*.8+Math.random()*this.width*.2,r=Math.random()*(this.height*.3),i=t?Math.PI/6+Math.random()*Math.PI/6:Math.PI-Math.PI/6-Math.random()*Math.PI/6;this.shootingStars.push({x:e,y:r,vx:Math.cos(i)*(10+Math.random()*5),vy:Math.sin(i)*(10+Math.random()*5),length:60+Math.random()*90,opacity:1,life:1})}onMouseMove(t){this.isMobile||(this.targetX=t.clientX/this.width-.5,this.targetY=t.clientY/this.height-.5)}onDeviceMove(t){if(t.beta===null||t.gamma===null)return;if(this.initialBeta===null){this.initialBeta=t.beta,this.initialGamma=t.gamma;return}let e=t.gamma-this.initialGamma,r=t.beta-this.initialBeta;const i=30;e=Math.min(Math.max(e,-i),i),r=Math.min(Math.max(r,-i),i),this.targetX=e/i*.5,this.targetY=r/i*.5}lerp(t,e,r){return(1-r)*t+r*e}animate(){if(!this.active)return;const t=Date.now(),e=t*.001;t-this.lastShootingStar>this.shootingStarInterval&&(this.spawnShootingStar(),this.lastShootingStar=t,this.shootingStarInterval=4e3+Math.random()*6e3);const r=this.isMobile?.08:.02;this.mouseX+=(this.targetX-this.mouseX)*r,this.mouseY+=(this.targetY-this.mouseY)*r;const i=this.isMobile?1200:600,o=this.mouseX*i,l=this.mouseY*i,u=document.querySelector(".funnel-container"),h=u?u.scrollTop:window.scrollY||0,f=this.ctx.createLinearGradient(0,0,0,this.height);f.addColorStop(0,"#080504"),f.addColorStop(1,"#050508"),this.ctx.fillStyle=f,this.ctx.fillRect(0,0,this.width,this.height);const w={r:131,g:105,b:60},E={r:100,g:50,b:160};this.ctx.globalCompositeOperation="lighter",this.dustNodes.forEach(x=>{x.x+=x.vx,x.y+=x.vy;const L=(Math.sin(e*x.pulseSpeed+x.colorPhase)+1)/2,S=Math.floor(this.lerp(w.r,E.r,L)),A=Math.floor(this.lerp(w.g,E.g,L)),B=Math.floor(this.lerp(w.b,E.b,L)),C=.05+(Math.sin(e*.5+x.colorPhase)+1)*.02,I=`rgba(${S}, ${A}, ${B}, ${C})`,N=h*.2,$=o*.15,F=l*.15,m=x.x-$,p=x.y-F-N,b=this.ctx.createRadialGradient(m,p,0,m,p,x.radius);b.addColorStop(0,I),b.addColorStop(1,"transparent"),this.ctx.fillStyle=b,this.ctx.beginPath(),this.ctx.arc(m,p,x.radius,0,Math.PI*2),this.ctx.fill()}),this.ctx.globalCompositeOperation="source-over",this.ctx.fillStyle="#FFFFFF",this.stars.forEach(x=>{const D=.7+.3*Math.sin(e*(x.speed*50)+x.phase),L=h*(x.parallax*3);let S=x.x-o*x.parallax,A=x.y-l*x.parallax-L;const B=50,C=this.height+B*2;for(;A<-B;)A+=C;for(;A>this.height+B;)A-=C;S<-B&&(S+=this.width+B*2),S>this.width+B&&(S-=this.width+B*2),this.ctx.globalAlpha=x.baseOpacity*D,this.ctx.beginPath(),this.ctx.arc(S,A,x.size,0,Math.PI*2),this.ctx.fill()}),this.ctx.globalAlpha=1,this.shootingStars=this.shootingStars.filter(x=>{if(x.x+=x.vx,x.y+=x.vy,x.life-=.015,x.opacity=x.life,x.life<=0||x.x>this.width+100||x.y>this.height+100)return!1;const D=x.x-x.vx/Math.hypot(x.vx,x.vy)*x.length,L=x.y-x.vy/Math.hypot(x.vx,x.vy)*x.length,S=this.ctx.createLinearGradient(D,L,x.x,x.y);return S.addColorStop(0,"transparent"),S.addColorStop(.5,`rgba(255, 255, 255, ${x.opacity*.5})`),S.addColorStop(1,`rgba(255, 255, 255, ${x.opacity})`),this.ctx.strokeStyle=S,this.ctx.lineWidth=1.5,this.ctx.lineCap="round",this.ctx.beginPath(),this.ctx.moveTo(D,L),this.ctx.lineTo(x.x,x.y),this.ctx.stroke(),this.ctx.fillStyle=`rgba(255, 255, 255, ${x.opacity})`,this.ctx.beginPath(),this.ctx.arc(x.x,x.y,1.5,0,Math.PI*2),this.ctx.fill(),!0}),this.ctx.globalAlpha=1,requestAnimationFrame(()=>this.animate())}destroy(){this.active=!1,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}static ensureRunning(){const t=window.starryBgInstance;t&&(console.log("🌌 StarryBackground: Ensuring animation is running..."),t.active=!0,requestAnimationFrame(()=>t.animate()))}}const yt={log:(...n)=>{},warn:(...n)=>{},error:(...n)=>{console.error(...n)},debug:(...n)=>{}};class hc{constructor(){this.onRoute=null,this.currentVariant=null}init(t){if(!t||typeof t.onRoute!="function"){yt.error("Router init failed: config.onRoute is missing");return}this.onRoute=t.onRoute;const e=ua();e&&(yt.log(`🚀 Active Variant: ${e.id}`),this.currentVariant=e,T.set("currentVariant",e),this.trackVariantView(e)),window.addEventListener("popstate",()=>{Fe.ensureRunning(),this.handleLocation()}),this.handleLocation()}async handleLocation(){let t=window.location.pathname;this.currentVariant&&(t===`/${this.currentVariant.id}`||t===`/${this.currentVariant.id}/`)?t="/":this.currentVariant||(document.body.style.backgroundColor=""),this.onRoute&&await this.onRoute(t)}navigate(t){window.history.pushState({},"",t),this.handleLocation(),window.scrollTo(0,0)}navigateTo(t){const e=t.startsWith("/")?t:`/${t}`;this.navigate(e)}trackVariantView(t){if(window.fbq){const e=T.get("traffic_type"),r=t?.skipMetaTracking||["1uah","man1uah"].includes(t?.id);if(e!=="paid"||r){yt.log(`🍃 [Analytics] Skip fbq ViewContent for Organic/Test traffic: ${t.id}`);return}yt.log("📊 Tracking Variant View:",t.id),window.fbq("track","ViewContent",{content_name:t.id,content_category:t.type})}}}const $t=new hc;class pc{constructor(){this.audioCtx=null,this.isAudioUnlocked=!1,this.canVibrate=typeof navigator<"u"&&"vibrate"in navigator,this.isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,this.tickBuffer=null,this.hasInitialized=!1}init(t=!1){if(!(this.hasInitialized&&!t))try{const e=window.AudioContext||window.webkitAudioContext;e&&(this.audioCtx=new e,this._createTickBuffer(),this.hasInitialized=!0,this._unlock())}catch(e){console.warn("Haptics: Web Audio API not supported",e)}}_createTickBuffer(){if(!this.audioCtx)return;const t=this.audioCtx.sampleRate,e=Math.floor(.015*t),r=this.audioCtx.createBuffer(1,e,t),i=r.getChannelData(0),o=150;for(let l=0;l<e;l++){const u=l/t,h=Math.sin(2*Math.PI*o*u);let f=1;l<e*.1?f=l/(e*.1):f=1-(l-e*.1)/(e*.9),i[l]=h*f}this.tickBuffer=r}_unlock(){this.isAudioUnlocked||!this.audioCtx||(this.audioCtx.state==="suspended"?this.audioCtx.resume().then(()=>{this.isAudioUnlocked=!0}).catch(t=>console.log("Audio unlock failed, waiting for next interaction")):this.isAudioUnlocked=!0)}trigger(t="light"){if(this.canVibrate){try{switch(t){case"light":navigator.vibrate(10);break;case"medium":navigator.vibrate(20);break;case"heavy":navigator.vibrate(40);break;case"success":navigator.vibrate([10,50,20]);break;case"error":navigator.vibrate([50,100,50]);break;default:navigator.vibrate(15)}}catch{}return}if(!this.isIOS&&this.audioCtx&&this.tickBuffer){this.audioCtx.state==="suspended"&&this.audioCtx.resume();const e=this.audioCtx.createBufferSource();e.buffer=this.tickBuffer;const r=this.audioCtx.createGain();let i=1,o=1;switch(t){case"light":i=.6,o=1.2;break;case"medium":i=.8,o=1;break;case"heavy":i=1,o=.8;break;case"success":this._playTone(.6,1.2,0),setTimeout(()=>this._playTone(1,1,.1),80);return;case"error":this._playTone(.8,.8,0),setTimeout(()=>this._playTone(.8,.8,.08),80),setTimeout(()=>this._playTone(.8,.8,.16),160);return}e.playbackRate.value=o,r.gain.setValueAtTime(i,this.audioCtx.currentTime),r.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.05),e.connect(r),r.connect(this.audioCtx.destination),e.start()}}_playTone(t,e,r){if(!this.audioCtx||!this.tickBuffer)return;const i=this.audioCtx.createBufferSource();i.buffer=this.tickBuffer,i.playbackRate.value=e;const o=this.audioCtx.createGain();o.gain.setValueAtTime(t,this.audioCtx.currentTime+r),o.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+r+.05),i.connect(o),o.connect(this.audioCtx.destination),i.start(this.audioCtx.currentTime+r)}}const Pt=new pc;let vn=null;function Os(){return window.CircularNatalHoroscope?Promise.resolve(!0):vn?(console.log("⏳ Astro Library load request joined existing queue..."),vn):(console.log("🚀 Starting Astro Library sequence..."),vn=new Promise(n=>{window.module||(window.module={exports:{}}),window.exports=window.module.exports;const t=["https://unpkg.com/circular-natal-horoscope-js@1.1.0/dist/index.js","https://cdn.jsdelivr.net/npm/circular-natal-horoscope-js@1.1.0/dist/index.js","./js/astro-lib.js"];function e(r){if(r>=t.length){console.error("❌ CRITICAL: Всі джерела бібліотеки (включно з локальним) недоступні."),n(!1),vn=null;return}const i=t[r],o=document.createElement("script");o.src=i,o.async=!0,o.onload=()=>{window.module&&window.module.exports&&window.module.exports.Horoscope?(window.CircularNatalHoroscope=window.module.exports,console.log(`✅ Astro Library Loaded Successfully from ${i}`),n(!0)):window.CircularNatalHoroscope?(console.log(`✅ Astro Library Loaded (Global) from ${i}`),n(!0)):(console.warn(`⚠️ Script loaded from ${i}, but exports missing.`),e(r+1))},o.onerror=()=>{console.warn(`⚠️ Failed to load from ${i}. Switching to backup source...`),e(r+1)},document.head.appendChild(o)}e(0)}),vn)}async function ha(n){if(!await Os())throw new Error("Astro Library not loaded");const{Origin:t,Horoscope:e,Renderer:r}=window.CircularNatalHoroscope,i=n.date.split("-"),o=parseInt(i[0]),l=parseInt(i[1])-1,u=parseInt(i[2]);let h=12,f=0;if(n.time){const m=n.time.split(":");h=parseInt(m[0]),f=parseInt(m[1])}let w=50.45,E=30.52,x="Europe/Kyiv";if(n.geo){const m=parseFloat(n.geo.latitude||n.geo.lat),p=parseFloat(n.geo.longitude||n.geo.lon);!isNaN(m)&&!isNaN(p)&&(w=m,E=p,x=n.geo.timezone||x)}let D=[],L=[],S=[],A=[],B="",C=null,I=null;const N={SUN:{domicile:["LEO"],detriment:["AQUARIUS"],exaltation:["ARIES"],fall:["LIBRA"]},MOON:{domicile:["CANCER"],detriment:["CAPRICORN"],exaltation:["TAURUS"],fall:["SCORPIO"]},MERCURY:{domicile:["GEMINI","VIRGO"],detriment:["SAGITTARIUS","PISCES"],exaltation:["VIRGO"],fall:["PISCES"]},VENUS:{domicile:["TAURUS","LIBRA"],detriment:["SCORPIO","ARIES"],exaltation:["PISCES"],fall:["VIRGO"]},MARS:{domicile:["ARIES","SCORPIO"],detriment:["LIBRA","TAURUS"],exaltation:["CAPRICORN"],fall:["CANCER"]},JUPITER:{domicile:["SAGITTARIUS","PISCES"],detriment:["GEMINI","VIRGO"],exaltation:["CANCER"],fall:["CAPRICORN"]},SATURN:{domicile:["CAPRICORN","AQUARIUS"],detriment:["CANCER","LEO"],exaltation:["LIBRA"],fall:["ARIES"]},URANUS:{domicile:["AQUARIUS"],detriment:["LEO"],exaltation:["SCORPIO"],fall:["TAURUS"]},NEPTUNE:{domicile:["PISCES"],detriment:["VIRGO"],exaltation:["CANCER"],fall:["CAPRICORN"]},PLUTO:{domicile:["SCORPIO"],detriment:["TAURUS"],exaltation:["ARIES"],fall:["LIBRA"]}};function $(m,p){const b=N[m.toUpperCase()];return b?b.domicile.includes(p.toUpperCase())?" [Domicile/Обитель]":b.detriment.includes(p.toUpperCase())?" [Detriment/Вигнання]":b.exaltation.includes(p.toUpperCase())?" [Exaltation/Екзальтація]":b.fall.includes(p.toUpperCase())?" [Fall/Падіння]":"":""}function F(m){const p=Math.floor(m),b=(m-p)*60,_=Math.floor(b),y=Math.round((b-_)*60);return`${p}° ${_}' ${y}"`}try{const m=new t({year:o,month:l,date:u,hour:h,minute:f,latitude:w,longitude:E,timezone:x});I=new e({origin:m,houseSystem:"placidus",zodiac:"tropical",aspectPoints:["bodies","points","angles"],aspectWithPoints:["bodies","points","angles"],aspectTypes:["major","minor"],customOrbs:{}});const p=I.CelestialBodies,b=I.CelestialPoints,_=["sun","moon","mercury","venus","mars","jupiter","saturn","uranus","neptune","pluto"],y=["northnode","southnode","lilith","chiron"],v=["ascendant","midheaven"],d={},O={};_.forEach(V=>{const U=p[V];if(U){const H=U.Sign.label.toUpperCase(),K=U.ChartPosition.Ecliptic.DecimalDegrees%30,Q=F(K),G=V.toUpperCase();let rt="";U.Speed&&U.Speed.DecimalDegrees<0&&(rt=" (R)");const X=U.House?U.House.id:null,W=X?` [House ${X}]`:"",Z=$(G,H);D.push(`${G}: ${H} ${Q}${rt}${W}${Z}`),d[H]=(d[H]||0)+1,X&&(O[X]=(O[X]||0)+1)}});for(const[V,U]of Object.entries(d))U>=3&&A.push(`Stellium in ${V} (${U} planets)`);for(const[V,U]of Object.entries(O))U>=3&&A.push(`Stellium in House ${V} (${U} planets)`);y.forEach(V=>{const U=b?b[V]:null;if(U){const H=U.Sign?.label?.toUpperCase()||"UNKNOWN",K=(U.ChartPosition?.Ecliptic?.DecimalDegrees||0)%30,Q=F(K);let G=V.toUpperCase();V==="northnode"&&(G="NORTH NODE (Rahu)"),V==="southnode"&&(G="SOUTH NODE (Ketu)"),V==="lilith"&&(G="LILITH (Black Moon)"),V==="chiron"&&(G="CHIRON"),D.push(`${G}: ${H} ${Q}`)}}),v.forEach(V=>{let U=null;if(V==="ascendant"&&(U=I.Ascendant),V==="midheaven"&&(U=I.Midheaven),U){const H=U.Sign.label.toUpperCase(),K=U.ChartPosition.Ecliptic.DecimalDegrees%30,Q=F(K),G=V.toUpperCase();D.push(`${G}: ${H} ${Q}`)}}),A.length>0&&console.log("Calculated Configurations:",A),I.Aspects&&I.Aspects.all&&I.Aspects.all.forEach(V=>{const U=V.point1?.label||V.point1?.key||"Unknown",H=V.point2?.label||V.point2?.key||"Unknown",K=V.name||V.type||"Aspect",Q=V.orb!==void 0?V.orb.toFixed(1):"?";L.push(`${U} ${K} ${H} (orb ${Q}°)`)}),console.log("Calculated Planets (DMS + Retrograde + Houses):",D),console.log("Calculated Aspects:",L),I.Houses&&I.Houses.length>0&&(I.Houses.forEach((V,U)=>{const H=U+1,K=V.Sign?.label?.toUpperCase()||"UNKNOWN",Q=(V.ChartPosition?.StartPosition?.Ecliptic?.DecimalDegrees||0)%30,G=F(Q);S.push(`House ${H}: ${K} ${G}`)}),console.log("Calculated House Cusps:",S));const R=p.sun,k=p.moon;if(R&&k){const V=R.ChartPosition.Ecliptic.DecimalDegrees;let H=(k.ChartPosition.Ecliptic.DecimalDegrees-V+360)%360;H<45?B="New Moon (Новий Місяць)":H<90?B="Waxing Crescent (Зростаючий Серп)":H<135?B="First Quarter (Перша Чверть)":H<180?B="Waxing Gibbous (Зростаючий Опуклий)":H<225?B="Full Moon (Повний Місяць)":H<270?B="Waning Gibbous (Спадаючий Опуклий)":H<315?B="Last Quarter (Остання Чверть)":B="Waning Crescent (Спадаючий Серп)",console.log("Moon Phase at Birth:",B)}}catch(m){return console.error("Horoscope Calculation Failed:",m),{planets:[],aspects:[],chartSvg:null,houseSystem:"Error"}}try{if(I){const m=document.createElement("div");m.style.position="absolute",m.style.left="-9999px",m.style.visibility="hidden",document.body.appendChild(m),new r(I).render(m);const b=m.querySelector("svg");b&&(b.style.backgroundColor="transparent",b.querySelectorAll("line, circle, path").forEach(_=>{const y=_.getAttribute("stroke");(!y||y==="#000000"||y==="#000")&&_.setAttribute("stroke","#cda45e");const v=_.getAttribute("fill");(v==="#000000"||v==="#000")&&_.setAttribute("fill","#cda45e")}),b.querySelectorAll("text").forEach(_=>{_.style.fill="#cda45e",_.setAttribute("fill","#cda45e"),_.style.fontFamily="'Montserrat', sans-serif"}),C=m.innerHTML),document.body.removeChild(m)}}catch(m){console.warn("SVG Render Error:",m)}return{planets:D,aspects:L,houses:S,configurations:A,moonPhase:B,chartSvg:C,houseSystem:"Placidus"}}async function ce(n,t={},e={}){try{let r;if(n.startsWith("http://")||n.startsWith("https://"))r=n;else{const l=n.startsWith("/")?n.slice(1):n;r=`${da}/${l}`}const i={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),...e},o=await fetch(r,i);if(!o.ok){const l=await o.text();throw new Error(l||`API Error: ${o.status}`)}return await o.json()}catch(r){throw r.name!=="AbortError"&&yt.error(`[API Core Error] ${n}:`,r),r}}let xe=null,hr=null;function Fn(){It&&It.PDF&&ce(It.PDF,{warmup:!0}).catch(()=>{}),It&&It.endpoints&&It.endpoints.PAYMENT_INIT&&ce(It.endpoints.PAYMENT_INIT,{warmup:!0}).catch(()=>{})}function Fs(n){if(!n)return null;try{return JSON.parse(n)}catch{}const t="```",e=new RegExp(t+"(?:json)?\\s*([\\s\\S]*?)\\s*"+t,"i"),r=n.match(e);if(r&&r[1])try{return JSON.parse(r[1])}catch{}const i=n.indexOf("{"),o=n.lastIndexOf("}");if(i!==-1&&o!==-1&&o>i){const l=n.substring(i,o+1);try{return JSON.parse(l)}catch(u){console.error("❌ JSON Extraction Failed (Brace Method):",u)}}throw console.error("❌ Fatal: Could not parse AI response. Raw content:",n),new Error("Invalid JSON format from AI")}function pa(n){if(!n||!Array.isArray(n))return"";const t={section:"margin-bottom: 35px; page-break-inside: avoid;",h2:"color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px;",p:"font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #e0e0e0; margin-bottom: 12px; text-align: justify;",strong:"color: #ffffff; font-weight: 600;",adviceBox:"background-color: #161b22; border: 1px solid rgba(205, 164, 94, 0.2); border-left: 4px solid #cda45e; padding: 20px; margin-top: 20px; border-radius: 0 8px 8px 0;",adviceHeader:"color: #cda45e; display: block; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700; font-family: 'Montserrat', sans-serif;",adviceText:"margin: 0; color: #cccccc; font-style: italic; font-family: 'Montserrat', sans-serif; font-size: 13px; line-height: 1.6;"};return n.map(e=>{let r=e.analysis_text||"";r=r.replace(/\\n/g,`
`),r=r.replace(/\*\*(.*?)\*\*/g,`<strong style="${t.strong}">$1</strong>`);const i=r.split(`
`).filter(o=>o.trim()!=="").map(o=>`<p style="${t.p}">${o}</p>`).join("");return`
            <div class="report-section" style="${t.section}">
                <h2 style="${t.h2}">
                    <span style="margin-right: 8px;">${e.icon}</span> ${e.title}
                </h2>
                <div class="report-content-text">${i}</div>
                <div class="report-advice" style="${t.adviceBox}">
                    <span style="${t.adviceHeader}">⚡️ KOSMIC KEY:</span>
                    <p style="${t.adviceText}">${e.practical_advice}</p>
                </div>
            </div>`}).join("")}async function $s(n,t){const e=new AbortController,r=setTimeout(()=>e.abort(),vs.REQUEST_TIMEOUT_MS);try{if(!It||!It.PROXY)throw new Error("Configuration Error: API.PROXY is missing. Please check src/config.js");yt.log(`📡 Sending request to: ${It.PROXY} [Action: ${n}]`);const i=await ce(It.PROXY,{action:n,data:t,modelName:vs.MODEL_NAME},{signal:e.signal});clearTimeout(r);const o=i.candidates?.[0]?.content?.parts?.[0]?.text;if(!o)throw new Error("AI returned empty response (no text candidate)");return o}catch(i){throw clearTimeout(r),console.error("AI Request Failed:",i),i}}async function fc(n){Fn();const t=2;for(let e=1;e<=t;e++)try{const r=T.get("currentVariant"),i=r?.productType||r?.aiContext?.productType,o=i==="partner",l=i==="forecast",u=r?.id==="natal_child",h=o?"partner_free_analysis":l?"forecast_free_analysis":u?"child_free_analysis":"free_analysis";let f=`Дата народження: ${n}`;try{const A=await ha({date:n});A&&A.planets&&(f=`Дата: ${n}
== Технічні Астрологічні Дані ==
${A.planets.join(`
`)}`,T.set("planets",A.planets),A.aspects&&A.aspects.length>0&&T.set("aspects",A.aspects),A.houses&&A.houses.length>0&&(f+=`

== Куспіди Домів (Placidus) ==
${A.houses.join(`
`)}`),A.configurations&&A.configurations.length>0&&(f+=`

== Планетарні Конфігурації ==
${A.configurations.join(`
`)}`),A.moonPhase&&(f+=`

== Фаза Місяця при народженні ==
${A.moonPhase}`))}catch(A){console.warn("Free astro calc skipped",A)}const{getZodiacSign:w}=await lc(async()=>{const{getZodiacSign:A}=await Promise.resolve().then(()=>bc);return{getZodiacSign:A}},void 0),x=w(n)?.name||"";yt.log(`📡 Requesting ${h} for productType: ${i||"default"} (Attempt ${e}/${t})`);const D={date:n,sunSign:x,userQuery:f};u&&(D.childGender=localStorage.getItem("childGender")||"male");const L=await $s(h,D);return Fs(L)}catch(r){if(console.error(`Free Analysis Error (Attempt ${e}/${t}):`,r),e<t&&r.message?.includes("Invalid JSON")){await new Promise(i=>setTimeout(i,1500));continue}return{title:"Зірки ще не готові...",psychological_analysis:"<p>На жаль, зараз Всесвіт не зміг розкрити таємницю. Будь ласка, спробуй ще раз через хвилину — зірки вже вибудовуються у потрібний порядок ✨</p>"}}}async function fa(n){if(xe)return xe;const t=T.get("currentVariant"),e=t?.productType||t?.aiContext?.productType,r=e==="partner",i=e==="forecast",o=t?.id==="natal_child",l=r?"partner_full_report":i?"forecast_full_report":o?"child_full_report":"full_report";let u="";try{const x=await ha(n);x&&x.planets&&(u=`== Технічні Астрологічні Дані ==
${x.planets.join(`
`)}`,T.set("planets",x.planets),x.aspects&&x.aspects.length>0&&(u+=`

== Аспекти Натальної Карти ==
${x.aspects.join(`
`)}`,T.set("aspects",x.aspects)),x.houses&&x.houses.length>0&&(u+=`

== Куспіди Домів (Placidus) ==
${x.houses.join(`
`)}`),x.configurations&&x.configurations.length>0&&(u+=`

== Планетарні Конфігурації ==
${x.configurations.join(`
`)}`),x.moonPhase&&(u+=`

== Фаза Місяця при народженні ==
${x.moonPhase}`))}catch(x){console.warn("Local calc skipped",x)}let f=`Дата: ${n.date}
Час: ${n.time}
Місто: ${n.city}
${u}`;t&&t.aiContext&&t.aiContext.additionalPrompt&&(yt.log("🧠 Injecting AI Context from Variant:",t.id),f+=`

[ВАЖЛИВИЙ КОНТЕКСТ МАРКЕТИНГУ: ${t.aiContext.additionalPrompt}]`);const w=T.get("planets")?{...n,planets:T.get("planets"),aspects:T.get("aspects")}:n,E={userQuery:f};return o&&(E.childGender=localStorage.getItem("childGender")||"male"),xe=$s(l,E).then(x=>{const D=Fs(x);return hr={data:D,enrichedUserData:w},D}).catch(x=>{throw xe=null,x}),xe}async function ma(n,t){let e=null,r=n;try{if(hr?(e=hr.data,r=hr.enrichedUserData):xe?(e=await xe,r=T.get("planets")?{...n,planets:T.get("planets")}:n):(e=await fa(n),r=T.get("planets")?{...n,planets:T.get("planets")}:n),t&&t.includes("@")){yt.log("📧 Preparing Main Report Email (Frontend Trigger)...");const i=pa(e.sections),o=T.get("currentVariant"),l=o?.productType||o?.aiContext?.productType,u=l==="partner",h=l==="forecast",f=u?"Твій Астро-Портрет Ідеального Партнера":h?"Твій Персональний Прогноз на Рік":"Твій Повний Аналіз",w=u?"partner":h?"upsell":"main";ce(It.EMAIL,{userEmail:t,reportHtml:i,reportTitle:f,reportType:w,userData:r}).catch(E=>console.error("Email Error:",E))}return e}catch(i){return console.error("Generate Full Report Error:",i),{error:!0,message:"Не вдалося згенерувати звіт."}}}async function mc(n,t){T.get("planets");const e=`Користувач: Жінка. Дата: ${n.date}. Місто: ${n.city}`;try{yt.log("🔮 Generating Forecast for UI preview...");const r=await $s("forecast",{userQuery:e}),i=Fs(r);if(!i||!i.sections)throw new Error("Invalid Forecast JSON");const o=pa(i.sections);yt.log("✅ Forecast HTML generated. Email буде відправлено backend'ом.")}catch(r){return console.error("Generate Forecast Error:",r),null}}async function gc(n){try{yt.log(`🔄 Fetching report by ID: ${n}`);const t=`${da}/getReportById?id=${n}`,e=await fetch(t);if(e.status===202)return{status:"processing"};if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const r=await e.json();if(r.status==="ready"&&r.reportData)return r;throw new Error("Invalid report data received")}catch(t){return console.error("Fetch Report By ID Error:",t),{error:!0,message:t.message}}}const yc=`<section id="landing-step" class="funnel-step active space-y-8 text-center flex flex-col" style="flex-grow: 1;">

    <!-- Main Content Wrapper -->
    <div class="flex-grow flex flex-col justify-center space-y-8 pb-20">
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
                <span
                    style="display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent-color); margin-bottom: 12px; line-height: 1.4; opacity: 0.8; white-space: nowrap;">Персональний
                    розрахунок Натальної карти</span>
                <span style="display: block; margin-bottom: 8px;">Дізнайся яка ти дивовижна</span>
                <span style="display: block; font-size: 16px; font-weight: 400; color: var(--accent-color); line-height: 1.3;">Розкрий свої приховані таланти та сильні сторони</span>
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
            <button type="submit" id="birth-form-btn" class="btn btn-primary w-full !text-lg h-14">
                <span class="btn-text">Дізнатися негайно</span>
                <span class="btn-spinner"></span>
            </button>
            <p id="calculation-disclaimer" class="text-[9px] !mt-[2px] opacity-40" style="color: var(--accent-color);">
                Персональний розрахунок Натальної карти за точними Ефемеридами
            </p>
        </form>
    </div>

    <!-- 🔥 LANDING SECTIONS CONTAINER 🔥 -->
    <div id="landing-sections-container" style="display: none; width: 100%;" class="pb-6"></div>

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
</div>`;function uo(n){const t=document.getElementById("app");t.classList.add("funnel-container");const e=document.createElement("div");e.innerHTML=yc;let r=null;try{if(r=T.get("currentVariant"),r&&r.ui){console.log("🎨 Applying Variant UI Overrides (Pre-render):",r.id);const F=e.querySelector("h2"),m=e.querySelector("p.text-lg"),p=e.querySelector("#birth-form button .btn-text"),b=e.querySelector("#landing-step > div:first-child > div:first-child"),_=e.querySelector("#calculation-disclaimer");if(b&&r.ui.heroIcon&&(b.innerHTML=r.ui.heroIcon),r.id==="man"||r.id==="man1uah"){const y=e.querySelector("#landing-step > div:first-child");y&&(y.style.justifyContent="flex-start",y.style.paddingTop="60px")}if(r.id==="natal_chart"||r.id==="natal_chart2"||r.id==="natal-chart"||r.id==="natal_chart_original"||r.id==="natal_chart_price"||r.id==="natal_chart_offer"||r.id==="natal_chart_landoffer"||r.id==="natal_chart_offer1uah"){const y=e.querySelector("#landing-step > div:first-child");y&&(y.style.justifyContent="flex-start",y.style.paddingBottom="10px",y.style.gap="12px"),requestAnimationFrame(()=>{const v=document.querySelector(".funnel-container");v&&(r.id==="natal_chart_offer"||r.id==="natal_chart_landoffer"||r.id==="natal_chart_offer1uah"?v.scrollTop=129:v.scrollTop=r.id==="natal_chart2"?145:99)})}if(F&&r.ui.heroTitle&&(F.innerHTML=r.ui.heroTitle,r.id!=="february"&&r.id!=="man"&&r.id!=="man1uah"&&r.id!=="natal_chart"&&r.id!=="natal_chart_original"&&r.id!=="original"&&r.id!=="natal_chart2"&&r.id!=="natal-chart"&&r.id!=="forecast"&&(F.classList.remove("font-bold"),F.classList.add("font-semibold"),F.style.fontFamily="'Inter', sans-serif"),r.ui.heroPreTitle)){const y=document.createElement("p");y.className="text-base font-semibold mb-3",y.style.cssText="color: #cda45e; letter-spacing: 0.5px;",y.innerHTML=r.ui.heroPreTitle,F.parentNode&&F.parentNode.insertBefore(y,F)}if(m&&r.ui.heroSubtitle&&(m.innerHTML=r.ui.heroSubtitle),p&&r.ui.buttonText&&(p.innerText=r.ui.buttonText),_&&r.ui.buttonDisclaimer&&(_.innerText=r.ui.buttonDisclaimer,_.style.maxWidth="100%",_.style.margin="4px auto 0",_.style.whiteSpace="nowrap",_.style.fontSize="8.5px",_.style.letterSpacing="-0.2px",_.style.overflow="hidden",_.style.textOverflow="ellipsis"),r.ui.heroFeatures){const y=e.querySelector("#birth-form");if(y&&y.parentNode){const v=document.createElement("div");v.className="hero-features-wrapper",v.innerHTML=r.ui.heroFeatures,y.parentNode.insertBefore(v,y.nextSibling)}}}const I={default:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},man:{text:"жінок вже отримали інструкцію",base:12367,key:"man_women_counter"},man1uah:{text:"жінок вже отримали інструкцію",base:12367,key:"man_women_counter"},natal_chart:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_original:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},original:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart2:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_price:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_offer:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_landoffer:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_offer1uah:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},forecast:{text:"жінок вже отримали свій прогноз на рік",base:8934,key:"forecast_counter"},"1uah":{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_child:{text:"жінок вже отримали натальну карту дитини",base:6712,key:"natal_child_counter"}},N=r?r.id:"default";if(I[N]){const F=I[N],m=e.querySelector("#birth-form");if(m){const p=document.createElement("div");p.className="mt-4 mb-2 text-center w-full flex justify-center",p.innerHTML=`
                    <div style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); max-width: 95vw;">
                        <span style="font-size: 14px; flex-shrink: 0;">🔥</span>
                        <span style="font-size: 13px; color: var(--secondary-text-color); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            <strong id="live-women-counter" style="color: var(--accent-color); font-size: 14px; transition: transform 0.2s ease, color 0.2s ease; display: inline-block;">${F.base.toLocaleString("uk-UA").replace(/\u00a0/g," ")}</strong> ${F.text}
                        </span>
                    </div>
                `;const _=e.querySelector(".hero-features-wrapper")||m;_.parentNode.insertBefore(p,_.nextSibling)}}const $=e.querySelector("#calculation-disclaimer");if((N==="natal_chart"||N==="natal_chart_original"||N==="original"||N==="natal_chart2"||N==="natal-chart"||N==="natal_chart_price"||N==="natal_chart_offer"||N==="natal_chart_landoffer"||N==="natal_chart_offer1uah"||N==="default"||N==="1uah")&&$&&($.style.display="none"),r&&r.isLandingPage&&r.landingSections){const F=e.querySelector("#landing-sections-container");if(F){F.style.display="block";const m=r.landingSections;let p="";m.pain&&(p+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${m.pain.title}</h3>
                            <div class="landing-pain-list">
                                ${m.pain.items.map(v=>`<div class="landing-pain-item">${v}</div>`).join("")}
                            </div>
                        </div>
                    `),m.paradigm&&(p+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${m.paradigm.title}</h3>
                            <p class="landing-text-block">${m.paradigm.text}</p>
                        </div>
                    `),m.solution&&(p+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${m.solution.title}</h3>
                            <p class="landing-subtitle">${m.solution.subtitle}</p>
                            <div class="landing-solution-list">
                                ${m.solution.items.map(v=>`
                                    <div class="landing-solution-item">
                                        <div class="landing-solution-icon">${v.icon}</div>
                                        <div class="landing-solution-text">${v.text}</div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `),m.howItWorks&&(p+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${m.howItWorks.title}</h3>
                            <div class="landing-how-it-works-card">
                                <p class="landing-text-block">${m.howItWorks.text}</p>
                            </div>
                        </div>
                    `),m.transformation&&(p+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${m.transformation.title}</h3>
                            <div class="landing-transformation-box">
                                <div class="landing-transformation-item before">
                                    <div class="landing-transformation-badge">Раніше:</div>
                                    <p>${m.transformation.before}</p>
                                </div>
                                <div class="landing-transformation-arrow">⬇️</div>
                                <div class="landing-transformation-item after">
                                    <div class="landing-transformation-badge">З Натальною картою:</div>
                                    <p>${m.transformation.after}</p>
                                </div>
                            </div>
                        </div>
                    `),m.features&&(p+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${m.features.title}</h3>
                            <div class="landing-features-grid">
                                ${m.features.items.map(v=>`
                                    <div class="landing-feature-card">
                                        <h4 class="landing-feature-title">${v.title}</h4>
                                        <p class="landing-feature-desc">${v.desc}</p>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `),m.audience&&(p+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${m.audience.title}</h3>
                            <div class="landing-audience-grid">
                                <div class="landing-audience-card positive">
                                    <h4 class="landing-audience-subtitle">✅ Для тих, хто:</h4>
                                    <ul class="landing-audience-list">
                                        ${m.audience.for_who.map(v=>`<li>${v}</li>`).join("")}
                                    </ul>
                                </div>
                                <div class="landing-audience-card negative">
                                    <h4 class="landing-audience-subtitle">❌ Кому НЕ слід купувати:</h4>
                                    <ul class="landing-audience-list">
                                        ${m.audience.not_for_who.map(v=>`<li>${v}</li>`).join("")}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `),m.testimonials&&(p+=`
                        <div class="landing-section">
                            <h3 class="landing-title">Відгуки</h3>
                            <div class="landing-testimonials-list">
                                ${m.testimonials.map(v=>`
                                    <div class="landing-testimonial-card">
                                        <div class="landing-testimonial-quote">"</div>
                                        <p class="landing-testimonial-text">${v.text}</p>
                                        <p class="landing-testimonial-author">${v.name}</p>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `),m.faq&&(p+=`
                        <div class="landing-section pb-20">
                            <h3 class="landing-title">Популярні запитання</h3>
                            <div class="landing-faq-list">
                                ${m.faq.map((v,d)=>`
                                    <div class="landing-faq-item" id="faq-item-${d}">
                                        <div class="landing-faq-question" onclick="this.parentElement.classList.toggle('active')">
                                            <span>${v.q}</span>
                                        </div>
                                        <div class="landing-faq-answer">
                                            ${v.a}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `);const b=e.querySelector("#birth-form").outerHTML.replace('id="birth-form"','id="birth-form-bottom"').replace('id="birth-date"','id="birth-date-bottom"').replace('id="error-message"','id="error-message-bottom"').replace('id="date-placeholder"','id="date-placeholder-bottom"'),_=`
                    <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                        <button class="btn btn-primary shadow-2xl" onclick="document.querySelector('.funnel-container').scrollTo({top: 0, behavior: 'smooth'})">
                            <span class="btn-text">ОТРИМАТИ НАТАЛЬНУ КАРТУ</span>
                        </button>
                    </div>
                `,y=`
                    <div class="landing-bottom-form-wrapper" id="bottom-form-wrapper" style="scroll-margin-top: 20px;">
                        <h3 class="landing-title text-center text-xl mb-4 !mt-0">Готова змінити життя?</h3>
                        ${b}
                    </div>
                `;F.innerHTML=p+y+_}}}catch(I){console.error("❌ Error preparing variant UI:",I)}t.innerHTML=e.innerHTML,r&&(r.id==="man"||r.id==="man1uah"||r.id==="forecast")&&setTimeout(()=>{const I=document.querySelector("#landing-step h2"),N=document.querySelector(".funnel-container");if(I&&N){const $=I.offsetTop;N.scrollTo({top:$- -25,behavior:"auto"})}},100);try{const I={default:{key:"natal_chart_counter",base:15420},man:{key:"man_women_counter",base:12367},man1uah:{key:"man_women_counter",base:12367},natal_chart:{key:"natal_chart_counter",base:15420},natal_chart_original:{key:"natal_chart_counter",base:15420},original:{key:"natal_chart_counter",base:15420},natal_chart2:{key:"natal_chart_counter",base:15420},natal_chart_price:{key:"natal_chart_counter",base:15420},natal_chart_offer:{key:"natal_chart_counter",base:15420},natal_chart_offer1uah:{key:"natal_chart_counter",base:15420},forecast:{key:"forecast_counter",base:8934},"1uah":{key:"natal_chart_counter",base:15420},natal_child:{key:"natal_child_counter",base:6712}},N=r?r.id:"default";if(I[N]){const $=I[N],F=document.getElementById("live-women-counter");if(F){let m=parseInt(localStorage.getItem($.key))||$.base;const p=(_,y)=>{F.innerText=_.toLocaleString("uk-UA").replace(/\u00a0/g," "),y&&(F.style.transform="scale(1.2)",F.style.color="#fff",setTimeout(()=>{F.style.transform="scale(1)",F.style.color="var(--accent-color)"},250))};p(m,!1);const b=()=>{const _=Math.random()*4e3+4e3;setTimeout(()=>{m+=Math.floor(Math.random()*3)+1,localStorage.setItem($.key,m),p(m,!0),b()},_)};b()}}r&&r.ui}catch(I){console.error("❌ Error attaching post-render variant logic:",I)}if(!document.getElementById("global-anim-styles")){const I=document.createElement("style");I.id="global-anim-styles",I.innerHTML=`
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
        `,document.head.appendChild(I)}const i=document.getElementById("info-modal"),o=document.getElementById("legal-modal"),l=document.getElementById("open-info-modal-btn"),u=document.getElementById("close-info-modal-icon"),h=document.getElementById("close-info-modal-btn"),f=document.getElementById("close-legal-modal-icon"),w=document.getElementById("close-legal-modal-btn"),E=document.getElementById("legal-modal-body"),x=document.querySelectorAll(".legal-link[data-legal-type]");function D(){i&&(i.style.display="flex")}function L(){i&&(i.style.display="none")}function S(I){const N=document.getElementById("legal-content-"+I);N&&o&&E&&(E.innerHTML=N.innerHTML,o.style.display="flex")}function A(){o&&(o.style.display="none")}l&&l.addEventListener("click",()=>{Pt.trigger("light"),D()}),u&&u.addEventListener("click",()=>{Pt.trigger("light"),L()}),h&&h.addEventListener("click",()=>{Pt.trigger("light"),L()}),f&&f.addEventListener("click",()=>{Pt.trigger("light"),A()}),w&&w.addEventListener("click",()=>{Pt.trigger("light"),A()}),i&&i.addEventListener("click",I=>{I.target===i&&L()}),o&&o.addEventListener("click",I=>{I.target===o&&A()}),x.forEach(I=>{I.addEventListener("click",N=>{const $=N.target.getAttribute("data-legal-type");L(),setTimeout(()=>{S($)},50)})});function B(I,N,$,F){const m=document.getElementById(I),p=document.getElementById(N),b=document.getElementById($),_=document.getElementById(F);if(!m||!p)return;const y=m.querySelector('button[type="submit"]');p.addEventListener("blur",O=>{O.target.value&&y&&(y.style.animation="none",requestAnimationFrame(()=>{y.style.animation="gentle-shake 0.5s ease-in-out 2"}),setTimeout(()=>{y.style.animation=""},1e3))});function v(){const O=p.value;if(!O)_&&(_.innerText="Обрати дату народження",_.style.color="var(--secondary-text-color)");else{const R=O.split("-");if(R.length===3){const k=`${R[2]}.${R[1]}.${R[0]}`;_&&(_.innerText=k,_.style.color="var(--primary-text-color)"),b&&(b.style.display="none");const V=N==="birth-date"?"birth-date-bottom":"birth-date",U=document.getElementById(V);U&&U.value!==O&&(U.value=O,U.dispatchEvent(new Event("change",{bubbles:!0})))}}}function d(){p.value===""&&(p.value="1995-01-01")}p.addEventListener("input",v),p.addEventListener("change",v),p.addEventListener("blur",v),p.addEventListener("focus",d),p.addEventListener("click",d),p.addEventListener("touchstart",d),v(),m.addEventListener("submit",async function(O){O.preventDefault(),Pt.trigger("heavy");const R=p.value;if(R==="")Pt.trigger("error"),b&&(b.innerText="Будь ласка, обери дату народження.",b.style.display="block");else{let k=function(V,U){V&&(V.classList.add("loading"),V.disabled=!0)};b&&(b.style.display="none"),T.set("date",R),k(y),Os(),n.navigateTo("loading")}})}B("birth-form","birth-date","error-message","date-placeholder"),B("birth-form-bottom","birth-date-bottom","error-message-bottom","date-placeholder-bottom");const C=document.getElementById("landing-sticky-cta");if(C){const I=document.querySelector(".funnel-container");I.addEventListener("scroll",()=>{if(I.scrollTop>500){const N=document.getElementById("bottom-form-wrapper");N&&N.getBoundingClientRect().top<window.innerHeight-100?C.classList.remove("visible"):C.classList.add("visible")}else C.classList.remove("visible")})}}const vc=`<!-- 🔥 UPDATE: Equal Spacing Layout with space-evenly -->
<section id="loading-step" class="funnel-step active"
    style="display: flex; flex-direction: column; height: 100%; min-height: 70vh; padding-top: 0; align-items: center;">

    <!-- 🌌 1. TOP: Constellation Container (Fixed Height) -->
    <div id="constellation-container" class="constellation-container" style="margin-top: 0; flex-shrink: 0;"></div>

    <!-- 🎯 2. EVENLY DISTRIBUTED: Label, Spinner, Text -->
    <div
        style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-evenly; align-items: center; width: 100%; padding-bottom: 10vh;">

        <!-- 🔥 /forecast specific text -->
        <div id="forecast-loading-descriptor" style="display: none; font-size: 0.85rem; color: var(--secondary-text-color); text-align: center; max-width: 80%; opacity: 0.8; margin-bottom: 10px; margin-top: -20px; z-index: 10;">
            Створення прогнозу запущено, зіркам може знадобитись близько 30 секунд.
        </div>

        <!-- ♊ Zodiac Label -->
        <div id="zodiac-label-container"
            style="display: flex; align-items: center; justify-content: center; position: relative;">
        </div>

        <!-- 🌀 Spinner (Restored) -->
        <div class="spinner"></div>

        <!-- 🎡 Zodiac Wheel (For /dev mode) -->
        <div id="zodiac-wheel-container" style="display: none; align-items: center; justify-content: center;"></div>

        <!-- 📝 Animated Text -->
        <div id="loading-typing-container" class="typing-container" style="width: 100%;">
            <span id="loading-text"></span>
            <span id="loading-cursor" class="typing-cursor" style="display: none;"></span>
        </div>

    </div>

</section>`;function ga(n,t,e,r=50,i=0,o=!1){return new Promise(l=>{let u=0;t&&(t.style.display="inline-block"),n.innerHTML="";function h(){u<e.length?(n.innerHTML=e.substring(0,u+1),u++,setTimeout(h,r)):setTimeout(()=>{!o&&t&&(t.style.display="none"),l()},i)}h()})}const sr=[{id:"capricorn",name:"Козеріг",startMonth:12,startDay:22,endMonth:1,endDay:19},{id:"aquarius",name:"Водолій",startMonth:1,startDay:20,endMonth:2,endDay:18},{id:"pisces",name:"Риби",startMonth:2,startDay:19,endMonth:3,endDay:20},{id:"aries",name:"Овен",startMonth:3,startDay:21,endMonth:4,endDay:19},{id:"taurus",name:"Телець",startMonth:4,startDay:20,endMonth:5,endDay:20},{id:"gemini",name:"Близнюки",startMonth:5,startDay:21,endMonth:6,endDay:20},{id:"cancer",name:"Рак",startMonth:6,startDay:21,endMonth:7,endDay:22},{id:"leo",name:"Лев",startMonth:7,startDay:23,endMonth:8,endDay:22},{id:"virgo",name:"Діва",startMonth:8,startDay:23,endMonth:9,endDay:22},{id:"libra",name:"Терези",startMonth:9,startDay:23,endMonth:10,endDay:22},{id:"scorpio",name:"Скорпіон",startMonth:10,startDay:23,endMonth:11,endDay:21},{id:"sagittarius",name:"Стрілець",startMonth:11,startDay:22,endMonth:12,endDay:21}];function ya(n){if(!n)return sr[0];const t=n.split("-"),e=parseInt(t[1],10),r=parseInt(t[2],10),i=sr[0];if(e===12&&r>=22||e===1&&r<=19)return i;for(const o of sr)if(o.id!=="capricorn"&&(e===o.startMonth&&r>=o.startDay||e===o.endMonth&&r<=o.endDay))return o;return console.warn(`[Zodiac] Could not determine sign for ${n}, defaulting to Aries`),sr[3]}const bc=Object.freeze(Object.defineProperty({__proto__:null,getZodiacSign:ya},Symbol.toStringTag,{value:"Module"})),va={aquarius:{name:"Водолій",symbol:"♒",stars:[[160,63.7,3],[156,62.1,3],[124.7,51.1,3],[97.2,34.2,3],[84.4,37.6,1],[78.7,33.2,1],[73.4,33.5,1],[59.5,57.5,1],[39.2,62.7,1],[46,101.3,1],[96.7,77.8,1],[88.3,58.2,1],[81.5,28.7,1],[35.1,97.8,1],[20,90.5,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[2,10],[3,11],[5,12],[13,8],[8,14]]},aries:{name:"Овен",symbol:"♈",stars:[[20,25.5,3],[126.2,63.2,3],[157.2,89.5,3],[160,104.5,3]],lines:[[0,1],[1,2],[2,3]]},cancer:{name:"Рак",symbol:"♋",stars:[[65.9,97.7,3],[81.7,68.8,3],[83.4,53.5,3],[79.5,20,3],[114.1,110,1]],lines:[[0,1],[1,2],[2,3],[1,4]]},capricorn:{name:"Козеріг",symbol:"♑",stars:[[159.8,20,3],[154.5,34.2,3],[142.3,53.1,3],[115.4,99.7,3],[106.4,110,1],[52,81.8,1],[20.2,42.6,1],[31.1,45.9,1],[58.9,47,1],[84.4,49.5,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0]]},gemini:{name:"Близнюки",symbol:"♊",stars:[[143.6,64.5,3],[134,64.4,3],[109.1,52,3],[76.9,27.8,3],[49.1,20,1],[36.4,38.3,1],[47.6,43.7,1],[66.3,66.9,1],[85.2,73.6,1],[116.5,93.4,1],[107.5,110,1],[68.7,92.7,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[7,11]]},leo:{name:"Лев",symbol:"♌",stars:[[134.4,96.9,3],[135.6,75.1,3],[121.2,61.1,3],[59.7,58,3],[20,85.1,1],[59.6,81.2,1],[125,44.9,1],[152.1,33.1,1],[160,43.2,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6],[6,7],[7,8]]},libra:{name:"Терези",symbol:"♎",stars:[[101.8,90.2,3],[116.4,49.4,3],[87.5,20,3],[67.1,43.9,3],[65.4,102.8,1],[63.6,110,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[1,3]]},pisces:{name:"Риби",symbol:"♓",stars:[[58.2,37.2,3],[59.8,20,3],[53.7,28.8,3],[60,48.3,3],[44.3,66,1],[33.5,85.3,1],[20.5,105.3,1],[27.1,104,1],[36.6,96.8,1],[45.3,94.7,1],[58.2,90.3,1],[66.6,89.3,1],[77.7,90.2,1],[116.3,92.5,1],[131.4,96.4,1],[140.7,94,1],[146.7,97.1,1],[149.1,103.7,1],[141.5,110,1],[129.7,108.4,1],[126.3,103,1],[159.5,102,1]],lines:[[0,1],[1,2],[2,0],[0,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,14],[17,21]]},sagittarius:{name:"Стрілець",symbol:"♐",stars:[[125.6,85.7,3],[120.5,78.2,3],[123,63.8,3],[117.5,49.9,3],[128.7,36.1,1],[74.3,110,1],[73.3,97.9,1],[90.1,64,1],[103.5,54.8,1],[48.6,101.8,1],[45,81,1],[48.1,52.7,1],[63.2,48.2,1],[72.2,47,1],[79.9,49.4,1],[95.9,52.7,1],[135,65.7,1],[86.7,57,1],[88.5,38.3,1],[84.5,36,1],[78.3,29.5,1],[75.1,26,1],[75,20,1],[94,36.3,1],[96.8,41.4,1]],lines:[[0,1],[1,2],[2,3],[3,4],[5,6],[6,7],[7,8],[8,3],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,8],[8,2],[2,16],[16,1],[1,7],[7,17],[17,15],[15,18],[18,19],[19,20],[20,21],[21,22],[18,23],[23,24],[24,15]]},scorpio:{name:"Скорпіон",symbol:"♏",stars:[[142.2,44.2,3],[140.8,30.8,3],[135.9,20,3],[120.8,42.2,3],[112.9,45.4,1],[106.6,52.3,1],[92.9,75.6,1],[91.3,90.1,1],[88.7,106.6,1],[71.8,110,1],[47.7,109.1,1],[37.8,98,1],[42.7,93.8,1],[51.2,86.4,1]],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13]]},taurus:{name:"Телець",symbol:"♉",stars:[[37,43.8,3],[86.3,58.6,3],[92,60.6,3],[99.1,61.4,3],[96.6,55.3,1],[92.1,50.1,1],[46.1,20,1],[114.4,71.4,1],[141.1,80.2,1],[112.4,92.2,1],[143,82.5,1],[133.4,110,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[3,7],[7,8],[8,9],[8,10],[10,11]]},virgo:{name:"Діва",symbol:"♍",stars:[[125,30,3],[105,45,2],[90,55,3],[60,45,3],[80,75,3],[70,95,2],[40,110,3],[100,105,2]],lines:[[0,1],[1,2],[2,3],[2,4],[4,5],[5,6],[5,7]]}};function _c(n){const t=va[n];if(!t)return console.warn(`[Constellation] Unknown sign: ${n}`),"";const{stars:e,lines:r}=t,i=r.map(([u,h],f)=>{const[w,E]=e[u],[x,D]=e[h];return`<line 
            x1="${w}" y1="${E}" 
            x2="${x}" y2="${D}" 
            class="constellation-line" 
            style="animation-delay: ${f*.3}s"
        />`}).join(`
`),o=r.map(([u,h],f)=>{const[w,E]=e[u],[x,D]=e[h];return`<line 
            x1="${w}" y1="${E}" 
            x2="${x}" y2="${D}" 
            class="constellation-line-shimmer" 
            pathLength="100"
            style="animation-delay: ${3.5+f*.2}s"
        />`}).join(`
`),l=e.map(([u,h,f],w)=>{const E=f*1.2+1;return`<polygon 
            points="${`${u},${h-E} ${u+E},${h} ${u},${h+E} ${u-E},${h}`}" 
            class="constellation-star star-size-${f}" 
            style="animation-delay: ${w*.15}s"
        />`}).join(`
`);return`
        <svg 
            class="constellation-svg" 
            viewBox="0 0 180 130" 
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <g class="constellation-group" filter="url(#glow)">
                ${i}
                ${l}
            </g>
            <!-- 🔥 NEW: Шар бліку поверх основних ліній -->
            <g class="shimmer-layer" pointer-events="none">
                ${o}
            </g>
        </svg>
    `}const ir=[{id:"aries",symbol:"♈",angle:0,paths:["M7,2 C4.239,2 2,4.239 2,7 L4,7 C4,5.343 5.343,4 7,4 C8.657,4 10,5.343 10,7 L12,7 C12,4.239 9.761,2 7,2","M17,2 C14.239,2 12,4.239 12,7 L14,7 C14,5.343 15.343,4 17,4 C18.657,4 20,5.343 20,7 L22,7 C22,4.239 19.761,2 17,2","M13 22 11 22 10 9 14 9z"]},{id:"taurus",symbol:"♉",angle:30,paths:["M12,20 C9.791,20 8,18.209 8,16 C8,13.791 9.791,12 12,12 C14.209,12 16,13.791 16,16 C16,18.209 14.209,20 12,20 M12,10 C8.686,10 6,12.686 6,16 C6,19.314 8.686,22 12,22 C15.314,22 18,19.314 18,16 C18,12.686 15.314,10 12,10","M20,3 C20,7.418 16.418,11 12,11 C7.582,11 4,7.418 4,3 L2,3 C2,7.734 5.293,11.69 9.711,12.726 C10.36,12.272 11.147,12 12,12 C12.853,12 13.64,12.272 14.289,12.726 C18.707,11.69 22,7.734 22,3 L20,3 Z"]},{id:"gemini",symbol:"♊",angle:60,paths:["M8.9864,5.5221 C8.2824,5.2991 7.6134,5.0021 6.9864,4.6361 L6.9864,19.3641 C7.6134,18.9981 8.2824,18.7011 8.9864,18.4781 L8.9864,5.5221 Z","M14.9864,18.4779 C15.6904,18.7009 16.3594,18.9979 16.9864,19.3639 L16.9864,4.6359 C16.3594,5.0019 15.6904,5.2989 14.9864,5.5219 L14.9864,18.4779 Z","M16.9864,19.3639 C16.3594,18.9979 15.6904,18.7009 14.9864,18.4779 C14.0384,18.1779 13.0354,17.9999 11.9864,17.9999 C10.9374,17.9999 9.9344,18.1779 8.9864,18.4779 C8.2824,18.7009 7.6134,18.9979 6.9864,19.3639 C5.8254,20.0409 4.8044,20.9309 4.0004,21.9999 L6.7124,21.9999 C8.1224,20.7589 9.9654,19.9999 11.9864,19.9999 C14.0074,19.9999 15.8504,20.7589 17.2604,21.9999 L19.9724,21.9999 C19.1684,20.9309 18.1474,20.0409 16.9864,19.3639","M11.9864,6 C13.0354,6 14.0384,5.822 14.9864,5.522 C15.6904,5.299 16.3594,5.002 16.9864,4.636 C18.1474,3.96 19.1684,3.069 19.9724,2 L17.2604,2 C15.8504,3.241 14.0074,4 11.9864,4 C9.9654,4 8.1224,3.241 6.7124,2 L4.0004,2 C4.8044,3.069 5.8254,3.96 6.9864,4.636 C7.6134,5.002 8.2824,5.299 8.9864,5.522 C9.9344,5.822 10.9374,6 11.9864,6"]},{id:"cancer",symbol:"♋",angle:90,paths:["M18,8 C15.791,8 14,9.791 14,12 C14,14.209 15.791,16 18,16 C20.209,16 22,14.209 22,12 C22,9.791 20.209,8 18,8 M18,10 C19.103,10 20,10.897 20,12 C20,13.103 19.103,14 18,14 C16.897,14 16,13.103 16,12 C16,10.897 16.897,10 18,10","M6,8 C3.791,8 2,9.791 2,12 C2,14.209 3.791,16 6,16 C8.209,16 10,14.209 10,12 C10,9.791 8.209,8 6,8 M6,10 C7.103,10 8,10.897 8,12 C8,13.103 7.103,14 6,14 C4.897,14 4,13.103 4,12 C4,10.897 4.897,10 6,10","M12,4 C14.206,4 16.206,4.897 17.654,6.346 L19.073,4.931 C17.263,3.12 14.763,2 12,2 C6.477,2 2,6.477 2,12 L4,12 C4,7.589 7.589,4 12,4","M12,20 C9.786,20 7.781,19.095 6.331,17.638 L4.912,19.052 C6.723,20.872 9.229,22 12,22 C17.523,22 22,17.523 22,12 L20,12 C20,16.411 16.411,20 12,20"]},{id:"leo",symbol:"♌",angle:120,paths:["M6,9 C3.791,9 2,10.791 2,13 C2,15.209 3.791,17 6,17 C8.209,17 10,15.209 10,13 C10,10.791 8.209,9 6,9 M6,11 C7.103,11 8,11.897 8,13 C8,14.103 7.103,15 6,15 C4.897,15 4,14.103 4,13 C4,11.897 4.897,11 6,11","M20,18 C20,19 19.103,20 18,20 C16.897,20 16,19.103 16,18 L16,8 C16,4.686 13.314,2 10,2 C6.686,2 4,4.686 4,8 C4,8.933 4.223,9.811 4.603,10.598 L6.295,9.47 C6.111,9.014 6,8.522 6,8 C6,5.794 7.794,4 10,4 C12.206,4 14,5.794 14,8 L14,18 C14,20.209 15.791,22 18,22 C20.209,22 22,20 22,18 L20,18 Z"]},{id:"virgo",symbol:"♍",angle:150,paths:["M6,2 C3.791,2 2,3.791 2,6 L2,15 L4,15 L4,6 C4,4.897 4.897,4 6,4 C7.103,4 8,4.897 8,6 L10,6 C10,3.791 8.209,2 6,2","M12,2 C9.791,2 8,3.791 8,6 L8,15 L10,15 L10,6 C10,4.897 10.897,4 12,4 C13.103,4 14,4.897 14,6 L14,22 L16,22 L16,6 C16,3.791 14.209,2 12,2","M18,11 C15.791,11 14,12.791 14,15 L16,15 C16,13.897 16.897,13 18,13 C19.103,13 20,13.897 20,15 C20,16.103 19.103,17 18,17 L18,19 C20.209,19 22,17.209 22,15 C22,12.791 20.209,11 18,11","M12 19 18 19 18 17 12 17z"]},{id:"libra",symbol:"♎",angle:180,paths:["M2 22 22 22 22 20 2 20z","M17.2736,16 C18.9426,14.537 19.9996,12.395 19.9996,10 C19.9996,5.582 16.4186,2 11.9996,2 C7.5816,2 3.9996,5.582 3.9996,10 C3.9996,12.395 5.0576,14.537 6.7266,16 L1.9996,16 L1.9996,18 L9.9996,18 L9.9996,17.738 L9.9996,16 L9.9996,15.65 C7.6736,14.824 5.9996,12.606 5.9996,10 C5.9996,6.692 8.6916,4 11.9996,4 C15.3086,4 17.9996,6.692 17.9996,10 C17.9996,12.606 16.3266,14.824 13.9996,15.65 L13.9996,16 L13.9996,17.738 L13.9996,18 L21.9996,18 L21.9996,16 L17.2736,16 Z"]},{id:"scorpio",symbol:"♏",angle:210,paths:["M6,2 C3.791,2 2,3.791 2,6 L2,15 L4,15 L4,6 C4,4.897 4.897,4 6,4 C7.103,4 8,4.897 8,6 L10,6 C10,3.791 8.209,2 6,2","M22,20 L19,18 L19,19 L18,19 C16.897,19 16,18.103 16,17 L16,6 C16,3.791 14.209,2 12,2 C9.791,2 8,3.791 8,6 L8,15 L10,15 L10,6 C10,4.897 10.897,4 12,4 C13.103,4 14,4.897 14,6 L14,17 C14,19.209 15.791,21 18,21 L19,21 L19,22 L22,20 Z"]},{id:"sagittarius",symbol:"♐",angle:240,paths:["M2 19.7785 3.414 21.1925 20.385 4.2215 18.97 2.8075z","M14.0208 16.2426 6.9498 9.1716 8.3638 7.7576 15.4348 14.8286z","M11.1926 1.9999 11.1926 3.9999 19.1926 3.9999 19.1926 11.9999 21.1926 11.9999 21.1926 1.9999z"]},{id:"capricorn",symbol:"♑",angle:270,paths:["M6,2 C3.791,2 2,3.791 2,6 L4,6 C4,4.897 4.897,4 6,4 C7.103,4 8,4.897 8,6 L10,6 C10,3.791 8.209,2 6,2","M12,2 C9.791,2 8,3.791 8,6 L8,13 L10,13 L10,6 C10,4.897 10.897,4 12,4 C13.103,4 14,4.897 14,6 L14,18 L16,18 L16,6 C16,3.791 14.209,2 12,2","M12,22 L10,22 L10,20 L12,20 C13.103,20 14,19 14,18 L16,18 C16,20 14.209,22 12,22 Z","M18,14 C15.791,14 14,15.791 14,18 C14,20.209 15.791,22 18,22 C20.209,22 22,20.209 22,18 C22,15.791 20.209,14 18,14 M18,16 C19.103,16 20,16.897 20,18 C20,19.103 19.103,20 18,20 C16.897,20 16,19.103 16,18 C16,16.897 16.897,16 18,16"]},{id:"aquarius",symbol:"♒",angle:300,paths:["M12,17 C14.209,17 16,15 16,13 L14,13 C14,14 13.103,15 12,15 C10.897,15 10,14.103 10,13 L8,13 C8,15.209 9.791,17 12,17","M18,17 C20.209,17 22,15 22,13 L20,13 C20,14 19.103,15 18,15 C16.897,15 16,14.103 16,13 L14,13 C14,15.209 15.791,17 18,17","M6,17 C8.209,17 10,15 10,13 L8,13 C8,14 7.103,15 6,15 C4.897,15 4,14.103 4,13 L2,13 C2,15.209 3.791,17 6,17","M12,11 C14.209,11 16,9 16,7 L14,7 C14,8 13.103,9 12,9 C10.897,9 10,8.103 10,7 L8,7 C8,9.209 9.791,11 12,11","M18,11 C20.209,11 22,9 22,7 L20,7 C20,8 19.103,9 18,9 C16.897,9 16,8.103 16,7 L14,7 C14,9.209 15.791,11 18,11","M6,11 C8.209,11 10,9 10,7 L8,7 C8,8 7.103,9 6,9 C4.897,9 4,8.103 4,7 L2,7 C2,9.209 3.791,11 6,11"]},{id:"pisces",symbol:"♓",angle:330,paths:["M5 13.7993 19 13.7993 19 11.7993 5 11.7993z","M10,12.7992 C10,7.9612 6.564,3.9272 2,3.0002 L2,4.9642 C5.498,5.8582 8.095,9.0272 8.095,12.7992 C8.095,16.5712 5.498,19.7402 2,20.6342 L2,22.5982 C6.564,21.6712 10,17.6372 10,12.7992","M14,12.7992 C14,17.6372 17,21.6712 22,22.5982 L22,20.6342 C19,19.7402 15.905,16.5712 15.905,12.7992 C15.905,9.0272 18.502,5.8582 22,4.9642 L22,3.0002 C17.436,3.9272 14,7.9612 14,12.7992"]}];function xc(n){const o=ir.map(w=>{const E=(w.angle-90)*(Math.PI/180),x=100+70*Math.cos(E)-14/2,D=100+70*Math.sin(E)-14/2,L=w.id===n,S=14/24,A=w.paths.map(B=>`<path d="${B}" />`).join("");return`
        <g class="wheel-sign-group ${L?"active-sign":""}" 
           transform="translate(${x}, ${D}) scale(${S})">
            ${A}
        </g>`}).join(`
`),l=ir.find(w=>w.id===n)||ir[0],u=40/24;return`
        <svg viewBox="0 0 200 200" class="zodiac-wheel-svg">
            <defs>
                <!-- Білий/Сріблястий градієнт -->
                <linearGradient id="white-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#E0E0E0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#B0B0B0;stop-opacity:1" />
                </linearGradient>
                
                <!-- Біле свічення -->
                <filter id="wheel-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="glow"/>
                    <feMerge>
                        <feMergeNode in="glow"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <!-- Зовнішнє коло (90% непрозорість) -->
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#white-gradient)" stroke-width="1.5" opacity="0.9" />
            
            <!-- Розділові лінії (90% непрозорість) -->
            ${ir.map(w=>{const E=(w.angle-15-90)*(Math.PI/180),x=100+50*Math.cos(E),D=100+50*Math.sin(E),L=100+90*Math.cos(E),S=100+90*Math.sin(E);return`<line x1="${x}" y1="${D}" x2="${L}" y2="${S}" stroke="url(#white-gradient)" stroke-width="0.5" opacity="0.9" />`}).join("")}





            <!-- Символи знаків (90% непрозорість для неактивних) -->
            <g class="wheel-signs-container">
                ${o}
            </g>
            
            <!-- Центральний елемент (темний фон + білий знак) -->
            <g class="wheel-center-group" filter="url(#wheel-glow)">
                <circle cx="100" cy="100" r="30" fill="rgba(22, 27, 34, 0.9)" stroke="url(#white-gradient)" stroke-width="2" />
                <g class="center-sign-icon" transform="translate(80, 80) scale(${u})">
                    ${l.paths.map(w=>`<path d="${w}" />`).join("")}
                </g>
            </g>
        </svg>
    `}function wc(n,t){console.log("🌌 [Orbit] Starting 3D Comet Animation");const e=document.createElement("div");e.className="comet-head",e.style.position="absolute",e.style.top="0",e.style.left="0",n.appendChild(e);const r={radiusX:160,centerX:n.offsetWidth/2,centerY:n.offsetHeight/2,speed:.025,trailLength:30},i=[],o=[];for(let w=0;w<r.trailLength;w++){const E=document.createElement("div");E.className="trail-segment",E.style.position="absolute",E.style.top="0",E.style.left="0",n.appendChild(E),i.push(E)}let l=0,u,h=!0;function f(){if(!h)return;r.centerX=n.offsetWidth/2,r.centerY=n.offsetHeight/2;const w=n.offsetWidth/2+40;r.radiusX=Math.max(80,Math.min(w,160));const E=20;n.style.transform=`perspective(1000px) rotateX(${E}deg)`,n.style.transformStyle="preserve-3d";const x=n.querySelector(".constellation-label")||n.querySelector(".constellation-label-partner");x&&(x.style.transform=`rotateX(${-E}deg)`,x.style.transformStyle="preserve-3d"),l+=r.speed;const D=Math.cos(l),L=Math.sin(l),S=D*r.radiusX,A=L*45,B=1+L*.25,C=L>0?100:1;o.unshift({x:S,y:A,scale:B,zIndex:C}),o.length>r.trailLength&&o.pop(),e.style.transform=`translate3d(${r.centerX+S}px, ${r.centerY+A}px, 0) scale(${B})`,e.style.zIndex=C;for(let I=0;I<i.length;I++){const N=i[I],$=o[I];if($){const F=I/r.trailLength,m=$.scale*(1-F*.6),p=.6*(1-F);N.style.transform=`translate3d(${r.centerX+$.x}px, ${r.centerY+$.y}px, 0) scale(${m})`,N.style.opacity=p,N.style.zIndex=$.zIndex-1,N.style.display="block"}else N.style.display="none"}u=requestAnimationFrame(f)}return f(),()=>{console.log("🌌 [Orbit] Stopping Animation"),h=!1,cancelAnimationFrame(u),e.remove(),i.forEach(w=>w.remove())}}async function Ec(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=vc,console.log("🌌 [Stage-2] Loading Module Init");const e=T.get("currentVariant")||ua();document.getElementById("zodiac-label-container");const r=t.querySelector(".spinner");r&&(r.style.display="none"),document.body.classList.add("warp-mode");const i=document.getElementById("forecast-loading-descriptor");i&&e&&e.id==="forecast"&&(i.style.display="block");const o=document.getElementById("loading-text"),l=document.getElementById("loading-cursor"),u=document.getElementById("constellation-container"),h=T.get("date");if(u&&h){const L=ya(h);console.log(`🌟 Zodiac Sign: ${L.name} (${L.id})`);const S=_c(L.id);u.innerHTML=S;const A=va[L.id],B=document.getElementById("zodiac-label-container");if(A&&B){if(e&&(e.id==="man"||e.id==="man1uah")){const C=`
                    <div class="constellation-label" style="display: flex; flex-direction: column; align-items: center; line-height: 1.2;">
                        <span style="font-size: 0.5em; opacity: 0.7; font-weight: 500; margin-bottom: 5px; color: var(--secondary-text-color); letter-spacing: 2px;">ТВІЙ ЗНАК</span>
                        <span>${A.symbol} ${A.name}</span>
                    </div>
                `;B.innerHTML=C}else{const C=`<div class="constellation-label">${A.symbol} ${A.name}</div>`;B.innerHTML=C}B&&wc(B)}if(e&&e.id==="dev"){const C=document.getElementById("zodiac-wheel-container"),I=t.querySelector(".spinner");console.log("🔍 DEBUG: Containers - Wheel:",C,"Spinner:",I),C&&I?(console.log("🎡 DEV MODE: Showing Zodiac Wheel"),I.style.display="none",C.style.display="flex",C.innerHTML=xc(L.id)):console.error("❌ DEBUG: Missing containers!")}}Fn();let f=!1;const w=fc(h).then(L=>(T.set("freeReport",L),f=!0,L)).catch(L=>(console.error("API Error:",L),{error:!0,title:"Зірки ще не готові...",psychological_analysis:"<p>На жаль, зараз Всесвіт не зміг розкрити таємницю. Будь ласка, спробуй ще раз через хвилину ✨</p>"})),E=[{text:"Аналізую положення планет...",pause:1e3},{text:"З'єднуюсь з ефемеридами NASA...",pause:1200},{text:"Зчитую твій енергетичний код...",pause:1200},{text:"Розшифровую кармічні вузли...",pause:1500},{text:"Будую твою натальну карту...",pause:1500},{text:"Приготуйся дізнатись, наскільки ти дивовижна 💖",pause:2e3,final:!0}],x=e&&e.ui&&e.ui.loading&&e.ui.loading.steps?e.ui.loading.steps:E,D=(async()=>{for(let L=0;L<x.length;L++){if(f){console.log("🚀 API Ready! Skipping remaining animation steps.");break}const S=x[L];if(o&&l){const A=f?300:S.pause;await ga(o,l,S.text,50,A,S.final)}if(f){console.log("🚀 API Ready! Animation loop stopped.");break}}l&&(l.style.display="none")})();await Promise.all([D,w]),document.body.classList.remove("warp-mode"),n.navigateTo("result")}const Tc=`<!-- 🔥 UPDATE: Зменшено padding-bottom секції до 140px, щоб відповідати компактнішому футеру -->
<section id="result-step" class="funnel-step active space-y-6" style="padding-bottom: 140px;">
    <h2 class="text-2xl font-bold text-center text-white" id="result-title">Аналіз твоєї особистості</h2>

    <!-- Основна картка з результатом -->
    <div class="space-y-3" style="background-color: transparent; border: none; padding: 0;">
        <h3 class="text-xl font-bold" style="color: var(--accent-color);" id="free-report-title">
            <!-- Заголовок заповнюється через JS -->
        </h3>
        <div id="free-report-text" class="text-left leading-relaxed space-y-4"
            style="color: var(--secondary-text-color);">
            <i>(Тут з'явиться твій персональний аналіз...)</i>
        </div>

        <!-- Дивайдер -->
        <div id="marketing-divider" class="relative py-4">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-700"></div>
            </div>
            <div class="relative flex justify-center">
                <span class="px-3 text-sm text-gray-500" style="background-color: var(--bg-color);">АЛЕ ЦЕ ЩЕ НЕ
                    ВСЕ</span>
            </div>
        </div>

        <!-- Статичний продаючий блок -->
        <div id="marketing-hook-block" class="text-center leading-relaxed">
            <p class="text-base mb-4" style="color: var(--primary-text-color);">
                Це лише <span style="color: var(--accent-color); font-weight: bold;">8%</span> аналізу твоєї
                особистості.
                <br>
                <span style="color: var(--secondary-text-color); font-size: 0.95rem;">Дізнайся більш детально про всі
                    сфери свого життя:</span>
            </p>
            <ul class="text-left inline-block space-y-2"
                style="color: var(--secondary-text-color); font-size: 0.95rem;">
                <li class="flex items-center"><span class="mr-2 text-xl">❤️‍🔥</span> Кохання та стосунки</li>
                <li class="flex items-center"><span class="mr-2 text-xl">💸</span> Гроші та кар'єра</li>
                <li class="flex items-center"><span class="mr-2 text-xl">🔮</span> Кармічні уроки та призначення</li>
                <li class="flex items-center"><span class="mr-2 text-xl">⚡️</span> Твої майбутні можливості</li>
            </ul>
        </div>

        <!-- SECTION 3.5: Divider before form (For natal_chart_offer) -->
        <div id="offer-form-divider" class="relative py-5" style="display: none;">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-700"></div>
            </div>
            <div class="relative flex justify-center">
                <span class="px-3 text-sm text-center" style="background-color: var(--bg-color); color: var(--accent-color); font-weight: 600; letter-spacing: 0.5px; line-height: 1.4;">УТОЧНИ ДАНІ</span>
            </div>
        </div>

        <!-- SECTION 4: Title & Description (For natal_chart_price) -->
        <div id="premium-form-title-container" class="space-y-2 text-center" style="display: none;">
            <h2 class="text-2xl font-bold text-white tracking-tight">
                Отримай повну розшифровку своєї Натальної карти
            </h2>
            <p class="text-sm" style="color: var(--secondary-text-color);">
                Введи час і місце народження - і отримай свій персональний звіт одразу після оплати
            </p>
        </div>

        <!-- SECTION 5: Time & City Form (For natal_chart_price) -->
        <div id="premium-form-container" class="w-full space-y-5 mt-4" style="display: none;">
            <!-- Time Input -->
            <div>
                <label for="birth-time" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2"
                    style="color: var(--accent-color);">Час народження</label>

                <div
                    class="input-field h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                    <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2"
                        style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>

                    <span id="time-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обери
                        час</span>
                    <input type="time" id="birth-time" name="birth-time"
                        class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10">
                </div>

                <p id="time-error-message" class="error-text" style="display: none;">
                    Будь ласка, обери час народження.
                </p>
                <p style="color: rgba(255,255,255,0.4); font-size: 10px; text-align: center; margin-top: 8px; line-height: 1.3; font-weight: 300;">
                    Якщо не знаєш точного часу &mdash; не страшно, наші алгоритми адаптують розрахунок за датою та містом
                </p>
            </div>

            <!-- City Input -->
            <div>
                <label for="birth-city" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2"
                    style="color: var(--accent-color);">Місце народження</label>

                <input type="text" id="birth-city" name="birth-city" placeholder="Наприклад, Київ"
                    class="input-field text-center hover:border-[#cda45e] transition-colors w-full"
                    style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; background-color: var(--card-bg-color) !important; opacity: 1;">

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

                    #birth-city:focus::placeholder {
                        opacity: 0;
                        color: transparent;
                        -webkit-text-fill-color: transparent !important;
                    }
                </style>

                <p id="city-error-message" class="error-text" style="display: none;">Текст помилки...</p>
                <p id="city-info-message" class="info-text" style="display: none;"></p>
            </div>

            <!-- Skip Button (під формою) -->
            <button type="button" id="skip-button" class="btn btn-skip opacity-80 text-xs mt-1 w-full" style="padding: 12px; height: auto;">
                Розрахувати без точного часу (точність 95%)
            </button>
        </div>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- 🔥 OFFER LANDING PAGE BLOCKS (Only for natal_chart_offer variant) -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->

        <!-- BLOCK 2: TRANSFORMATION — What She Gets -->
        <div id="offer-block-transformation" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card">
                <h3 class="offer-section-title">Що ти дізнаєшся з <span>повного звіту</span></h3>
                <div class="offer-section-body">
                    <p>Повна розшифровка Натальної Карти — це <strong>персональна інструкція</strong>, яка покаже тобі:</p>
                    <div class="offer-feature-grid">
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">✨</span>
                            <div>
                                <strong>Твоя Справжня Роль (Ядро)</strong>
                                <span>Твій справжній архетип — як вийти з тіні та стати головною героїнею свого життя</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">🗝️</span>
                            <div>
                                <strong>Призначення та Місія</strong>
                                <span>Кармічні уроки, таланти та твій унікальний шлях у цьому світі</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">❤️‍🔥</span>
                            <div>
                                <strong>Магніт для чоловіків</strong>
                                <span>Як перестати приваблювати "не тих" чоловіків і розкрити власну природну привабливість</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">💰</span>
                            <div>
                                <strong>Визнання та Фінанси</strong>
                                <span>Де твоя точка росту і як перестати старатися безрезультатно</span>
                            </div>
                        </div>
                    </div>
                    <!-- Planet coordinates highlight -->
                    <div class="offer-feature-item" style="margin-top: 14px; background: rgba(205, 164, 94, 0.06); border-color: rgba(205, 164, 94, 0.15);">
                        <span class="offer-feature-icon">📡</span>
                        <div>
                            <strong>Точні Координати Планет</strong>
                            <span>Карта з градусами, хвилинами та секундами дуги для кожної планети — можеш звіритися з будь-яким астрологом або порівняти з іншим сервісом</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 3: DELIVERY FORMAT -->
        <div id="offer-block-delivery" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card">
                <h3 class="offer-section-title">Як ти отримаєш <span>свій звіт</span></h3>
                <div class="offer-section-body">
                    <div class="offer-delivery-list">
                        <div class="offer-delivery-item">
                            <span class="offer-delivery-icon">🌐</span>
                            <div>
                                <strong>На сайті</strong>
                                <span>Твій повний звіт буде доступний на екрані у зручному для читання вигляді</span>
                            </div>
                        </div>
                        <div class="offer-delivery-item">
                            <span class="offer-delivery-icon">📧</span>
                            <div>
                                <strong>На Email</strong>
                                <span>Повний текст + PDF-документ у зручному форматі</span>
                            </div>
                        </div>
                        <div class="offer-delivery-item">
                            <span class="offer-delivery-icon">💬</span>
                            <div>
                                <strong>У Telegram</strong>
                                <span>Бот надішле тобі повний розбір у чат</span>
                            </div>
                        </div>
                        <div class="offer-delivery-item">
                            <span class="offer-delivery-icon">🔗</span>
                            <div>
                                <strong>Довічне посилання</strong>
                                <span>Унікальний URL, за яким звіт доступний назавжди</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 4: HOW IT WORKS — 4 Pillars (from Knowledge Base) -->
        <div id="offer-block-science" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card" style="background: rgba(205, 164, 94, 0.03); border: 1px solid rgba(205, 164, 94, 0.15);">
                <h3 class="offer-section-title">Чому <span>це працює?</span></h3>
                <div class="offer-section-body">
                    <p>Розшифровка Натальної карти від Destiny Code — це <strong>не гороскоп із журналу</strong>. Ми не ділимо 8 мільярдів людей на 12 груп. Це точний персональний розрахунок, і ось чому йому можна довіряти:</p>
                    <div class="offer-science-grid">
                        <div class="offer-science-item">
                            <span class="offer-science-num">01</span>
                            <div>
                                <strong>Фізика та Біоритми</strong>
                                <span>Місяць рухає мільярди тонн води у Світовому океані. Організм людини складається з води на 70-80%. Науково доведено, що у дні повні змінюється гормональний фон і якість сну. Космічні ритми — це реальна фізика, а не містика.</span>
                            </div>
                        </div>
                        <div class="offer-science-item">
                            <span class="offer-science-num">02</span>
                            <div>
                                <strong>Математична Точність</strong>
                                <span>Швейцарські Ефемериди (NASA JPL), сферична геометрія, система Плацидус. За 4 хвилини Земля зсувається на 1 градус — навіть близнюки з різницею у 10 хвилин мають різні долі. Кількість комбінацій перевищує число людей на планеті.</span>
                            </div>
                        </div>
                        <div class="offer-science-item">
                            <span class="offer-science-num">03</span>
                            <div>
                                <strong>Тисячолітня Статистика</strong>
                                <span>Кеплер, Галілей, Карл Юнг — тисячоліттями найкращі уми спостерігали за рухом планет і фіксували закономірності. Юнг називав астрологію "психологією давнини". Ми перетворили цю базу даних у точний алгоритм.</span>
                            </div>
                        </div>
                        <div class="offer-science-item">
                            <span class="offer-science-num">04</span>
                            <div>
                                <strong>Прогноз Погоди, а Не Вирок</strong>
                                <span>Натальна карта — це не "доля", яку неможливо змінити. Це як прогноз погоди: ти не можеш зупинити дощ, але можеш взяти парасольку. Знаючи свою карту, ти бачиш, де підстелити соломку, а де тиснути на газ.</span>
                            </div>
                        </div>
                    </div>
                    <div class="offer-quote" style="margin-top: 16px;">
                        <span class="offer-quote-mark">🧭</span>
                        Натальна карта — це як GPS-навігатор. Ти сама тримаєш кермо і натискаєш на педалі. Але їхати вночі без фар — значить постійно ризикувати.
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 5: COSMIC IMPRINT PREVIEW -->
        <div id="offer-block-cosmic" class="offer-landing-block w-full" style="display: none; margin-top: 16px;">
            <div id="offer-astro-data-container" class="interactive-astro-box"></div>
        </div>

        <!-- BLOCK 5.5: REVIEWS (SOCIAL PROOF) -->
        <div id="offer-block-reviews" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card" style="padding: 24px 16px; border-top: none; background: transparent; border: none; box-shadow: none;">
                <h3 class="offer-section-title" style="margin-bottom: 24px;">Що кажуть <span>інші дівчата</span></h3>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                    <!-- Review 1 -->
                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-color), #8a6a3b); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 15px;">О</div>
                            <div>
                                <div style="color: #fff; font-weight: 600; font-size: 0.95em;">Олена, 28 років</div>
                                <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                            </div>
                        </div>
                        <p class="review-text" style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">"Взагалі в астрологію не вірила, але після того як я прочитала свою Розшифровку за даними народження трохи офігіла. Стільки співпадінь з реальними фактами про мене і мій характер, точно навмання вгадати ніхто не міг. Дуже цікаво і корисно. А про 'Магніт для чоловіків' — в саме серденько."</p>
                    </div>
                    <!-- Review 2 -->
                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #4A90E2, #2C3E50); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 15px;">Е</div>
                            <div>
                                <div style="color: #fff; font-weight: 600; font-size: 0.95em;">Ельвіра, 42 роки</div>
                                <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                            </div>
                        </div>
                        <p class="review-text" style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">"Астрологією цікавлюсь давно. Зробила дану розшифровку чисто з цікавості. Розбір якісний. Краще ніж очікувала. І зручно що можна зберегти посилання."</p>
                    </div>
                    <!-- Review 3 -->
                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #9b59b6, #8e44ad); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 15px;">М</div>
                            <div>
                                <div style="color: #fff; font-weight: 600; font-size: 0.95em;">Мар'яна, 36 років</div>
                                <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                            </div>
                        </div>
                        <p class="review-text" style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">"Давно хотіла розібратися у своїх сильних сторонах для роботи. Розшифровка допомогла розставити пріоритети та зрозуміти, куди рухатися далі. Дуже влучно про внутрішні конфлікти!"</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 6: FAQ -->
        <div id="offer-block-faq" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card" style="border-top: 1px solid rgba(255,255,255,0.1);">
                <h3 class="offer-section-title">Часті <span>запитання</span></h3>
                <div class="offer-faq-list">
                    <div class="offer-faq-item">
                        <div class="offer-faq-question" onclick="this.parentElement.classList.toggle('faq-open')">
                            <span>Це ворожіння чи магія?</span>
                            <span class="offer-faq-arrow">▼</span>
                        </div>
                        <div class="offer-faq-answer">
                            <p>Ні. Destiny Code використовує математичні алгоритми на базі Швейцарських Ефемерид — астрономічних баз даних, аналогічних NASA JPL. Це чиста астрономія та геометрія, переведена в код. Жодної магії, карт Таро чи інтуїтивних "відчуттів".</p>
                        </div>
                    </div>
                    <div class="offer-faq-item">
                        <div class="offer-faq-question" onclick="this.parentElement.classList.toggle('faq-open')">
                            <span>Чому результат відрізняється від інших сервісів?</span>
                            <span class="offer-faq-arrow">▼</span>
                        </div>
                        <div class="offer-faq-answer">
                            <p>Більшість сервісів використовують спрощені алгоритми або Сидеричний зодіак (Джйотіш). Ми працюємо за стандартом Тропічного Зодіаку та системою Плацидус із точністю до секунди дуги — це золотий стандарт класичної Західної астрології.</p>
                        </div>
                    </div>
                    <div class="offer-faq-item">
                        <div class="offer-faq-question" onclick="this.parentElement.classList.toggle('faq-open')">
                            <span>Що я отримаю після оплати?</span>
                            <span class="offer-faq-arrow">▼</span>
                        </div>
                        <div class="offer-faq-answer">
                            <p>Одразу після оплати ти отримаєш повний персональний звіт на екрані. Протягом декількох хвилин він також прийде на email (текст + PDF) та через Telegram-бот. Плюс — довічне посилання для повторного доступу.</p>
                        </div>
                    </div>
                    <div class="offer-faq-item">
                        <div class="offer-faq-question" onclick="this.parentElement.classList.toggle('faq-open')">
                            <span>Що якщо я не знаю точного часу народження?</span>
                            <span class="offer-faq-arrow">▼</span>
                        </div>
                        <div class="offer-faq-answer">
                            <p>Ти можеш натиснути "Розрахувати без точного часу" біля форми. Система адаптує алгоритм на розрахунок за датою та містом. Точність результату все одно складатиме близько 95% для Сонця, Венери та базових кармічних вузлів.</p>
                        </div>
                    </div>
                    <div class="offer-faq-item">
                        <div class="offer-faq-question" onclick="this.parentElement.classList.toggle('faq-open')">
                            <span>Це одноразовий платіж?</span>
                            <span class="offer-faq-arrow">▼</span>
                        </div>
                        <div class="offer-faq-answer">
                            <p>Так, абсолютно. 347 грн — це одноразовий платіж. Жодних підписок, прихованих списань чи автоматичних продовжень. Ти платиш один раз і отримуєш довічний доступ до свого звіту.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END: OFFER LANDING PAGE BLOCKS -->

    </div>

    <!-- 🔥 NEW STICKY FOOTER (Compact Version) -->
    <!-- UPDATE: Додано inline styles для зменшення відступів (padding) зверху та знизу -->
    <div class="sticky-paywall-footer"
        style="padding-top: 1rem; padding-bottom: calc(1rem + env(safe-area-inset-bottom));">

        <!-- Локальні стилі для анімації стрілочок (збережено з оригінального файлу) -->
        <style>
            @keyframes runway-lights {
                0% {
                    opacity: 0.3;
                }

                50% {
                    opacity: 1;
                }

                100% {
                    opacity: 0.3;
                }
            }

            .runway-arrow {
                animation: runway-lights 1.2s infinite ease-in-out both;
                display: inline-block;
                color: rgba(0, 0, 0, 0.75);
                /* М'який чорний колір стрілочок */
            }

            .runway-arrow:nth-child(1) {
                animation-delay: 0s;
            }

            .runway-arrow:nth-child(2) {
                animation-delay: 0.2s;
            }

            .runway-arrow:nth-child(3) {
                animation-delay: 0.4s;
            }

            /* ═══════════════════════════════════════════════ */
            /* 🔥 OFFER LANDING BLOCKS STYLES                */
            /* ═══════════════════════════════════════════════ */

            .offer-landing-block {
                margin-top: 36px;
            }

            .offer-section-card {
                background: rgba(28, 28, 30, 0.5);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-top: 1px solid rgba(205, 164, 94, 0.2);
                border-radius: 16px;
                padding: 24px 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                position: relative;
                overflow: hidden;
            }

            .offer-section-icon {
                display: none; /* Removed for more premium look */
            }

            .offer-section-title {
                color: #fff;
                font-weight: 700;
                font-size: 1.25em;
                line-height: 1.4;
                text-align: center;
                margin-bottom: 20px;
                letter-spacing: 0.2px;
                text-transform: none;
            }

            .offer-section-title span {
                color: var(--accent-color);
            }

            .offer-section-body {
                color: var(--secondary-text-color);
                font-size: 0.95em;
                line-height: 1.7;
            }

            .offer-section-body p {
                margin-bottom: 12px;
            }

            .offer-section-body strong {
                color: var(--primary-text-color);
                font-weight: 600;
            }

            .offer-section-body em {
                color: var(--accent-color);
                font-style: italic;
            }

            /* Quote Block */
            .offer-quote {
                background: rgba(205, 164, 94, 0.08);
                border-left: 3px solid var(--accent-color);
                border-radius: 0 8px 8px 0;
                padding: 14px 16px;
                margin-top: 16px;
                font-size: 0.95em;
                color: var(--primary-text-color);
                font-style: italic;
                line-height: 1.6;
                display: flex;
                gap: 10px;
                align-items: flex-start;
            }

            .offer-quote-mark {
                font-size: 1.3em;
                flex-shrink: 0;
                font-style: normal;
            }

            /* Feature Grid (4 modules) */
            .offer-feature-grid {
                display: flex;
                flex-direction: column;
                gap: 14px;
                margin-top: 16px;
            }

            .offer-feature-item {
                display: flex;
                gap: 14px;
                align-items: flex-start;
                padding: 14px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 10px;
                transition: border-color 0.2s;
            }

            .offer-feature-item:hover {
                border-color: rgba(205, 164, 94, 0.3);
            }

            .offer-feature-icon {
                font-size: 1.5em;
                flex-shrink: 0;
                margin-top: 2px;
            }

            .offer-feature-item div {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .offer-feature-item strong {
                color: #fff;
                font-size: 0.95em;
            }

            .offer-feature-item span {
                color: var(--secondary-text-color);
                font-size: 0.85em;
                line-height: 1.5;
            }

            /* Delivery List (Grid) */
            .offer-delivery-list {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }

            .offer-delivery-item {
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: center;
                text-align: center;
                padding: 14px 10px;
                background: rgba(255, 255, 255, 0.04);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.08);
            }

            .offer-delivery-icon {
                font-size: 1.6em;
                margin-bottom: 2px;
            }

            .offer-delivery-item div {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .offer-delivery-item strong {
                color: #fff;
                font-size: 0.85em;
                line-height: 1.2;
            }

            .offer-delivery-item span {
                color: var(--secondary-text-color);
                font-size: 0.75em;
                line-height: 1.4;
            }

            /* Science Grid */
            .offer-science-grid {
                display: flex;
                flex-direction: column;
                gap: 16px;
                margin-top: 16px;
            }

            .offer-science-item {
                display: flex;
                gap: 14px;
                align-items: flex-start;
            }

            .offer-science-num {
                font-size: 1.5em;
                font-weight: 800;
                color: var(--accent-color);
                opacity: 0.4;
                flex-shrink: 0;
                min-width: 32px;
                text-align: center;
                line-height: 1;
                margin-top: 2px;
            }

            .offer-science-item div {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .offer-science-item strong {
                color: #fff;
                font-size: 0.95em;
            }

            .offer-science-item span {
                color: var(--secondary-text-color);
                font-size: 0.85em;
                line-height: 1.5;
            }

            /* Cosmic Imprint Preview */
            .offer-cosmic-preview {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-top: 16px;
            }

            .offer-cosmic-item {
                display: flex;
                gap: 10px;
                align-items: center;
                padding: 10px 12px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 10px;
                transition: border-color 0.2s, background 0.2s;
            }

            .offer-cosmic-item:hover {
                border-color: rgba(205, 164, 94, 0.2);
                background: rgba(205, 164, 94, 0.04);
            }

            .offer-cosmic-planet {
                font-size: 1.4em;
                flex-shrink: 0;
            }

            .offer-cosmic-item div {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .offer-cosmic-item strong {
                color: #fff;
                font-size: 0.85em;
            }

            .offer-cosmic-item span {
                color: var(--secondary-text-color);
                font-size: 0.75em;
                line-height: 1.4;
            }

            @media (max-width: 380px) {
                .offer-cosmic-preview {
                    grid-template-columns: 1fr;
                }
            }

            /* FAQ */
            .offer-faq-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .offer-faq-item {
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                overflow: hidden;
                transition: border-color 0.2s;
            }

            .offer-faq-item:hover {
                border-color: rgba(205, 164, 94, 0.2);
            }

            .offer-faq-question {
                padding: 14px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                color: var(--primary-text-color);
                font-weight: 600;
                font-size: 0.9em;
                transition: background 0.2s;
            }

            .offer-faq-question:hover {
                background: rgba(255, 255, 255, 0.03);
            }

            .offer-faq-arrow {
                font-size: 0.7em;
                opacity: 0.5;
                transition: transform 0.3s ease;
            }

            .offer-faq-item.faq-open .offer-faq-arrow {
                transform: rotate(180deg);
            }

            .offer-faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease-out;
            }

            .offer-faq-item.faq-open .offer-faq-answer {
                max-height: 300px;
            }

            .offer-faq-answer p {
                padding: 0 16px 16px;
                color: var(--secondary-text-color);
                font-size: 0.85em;
                line-height: 1.7;
                margin: 0;
            }

            /* Offer CTA Trust Line */
            .offer-trust-line {
                text-align: center;
                margin-top: 6px;
            }

            .offer-trust-line span {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 1.2px;
                color: rgba(255, 255, 255, 0.5);
                font-weight: 600;
            }

            /* Shake Animation for form validation error */
            @keyframes offer-shake {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-6px); }
                40% { transform: translateX(6px); }
                60% { transform: translateX(-4px); }
                80% { transform: translateX(4px); }
            }

            .offer-shake {
                animation: offer-shake 0.5s ease-in-out;
            }
        </style>

        <!-- Urgency Text -->
        <div id="offer-urgency-timer" style="display: none; text-align: center; margin-bottom: 12px; margin-top: -6px;">
            <span style="font-size: 11px; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; background: rgba(205,164,94,0.15); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(205,164,94,0.3); display: inline-block;">
                Твоя знижка зафіксована: <span id="offer-timer-display" style="color: var(--accent-color); font-weight: 700; margin-left: 2px;">15:00</span>
            </span>
        </div>

        <!-- Кнопка розтягнута на всю ширину (w-full), ID збережено -->
        <button id="upgrade-button"
            class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden">
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
        <div class="mt-2 flex items-center justify-center opacity-70" id="footer-trust-text">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                🔒 Твій результат збережено
            </span>
        </div>
    </div>
</section>`,Ic=()=>{};var ho={};const ba=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Cc=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[e++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[e++],l=n[e++],u=n[e++],h=((i&7)<<18|(o&63)<<12|(l&63)<<6|u&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],l=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|l&63)}}return t.join("")},_a={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],l=i+1<n.length,u=l?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,w=o>>2,E=(o&3)<<4|u>>4;let x=(u&15)<<2|f>>6,D=f&63;h||(D=64,l||(x=64)),r.push(e[w],e[E],e[x],e[D])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(ba(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Cc(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=e[n.charAt(i++)],u=i<n.length?e[n.charAt(i)]:0;++i;const f=i<n.length?e[n.charAt(i)]:64;++i;const E=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||u==null||f==null||E==null)throw new Ac;const x=o<<2|u>>4;if(r.push(x),f!==64){const D=u<<4&240|f>>2;if(r.push(D),E!==64){const L=f<<6&192|E;r.push(L)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ac extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Sc=function(n){const t=ba(n);return _a.encodeByteArray(t,!0)},vr=function(n){return Sc(n).replace(/\./g,"")},kc=function(n){try{return _a.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Rc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const Pc=()=>Rc().__FIREBASE_DEFAULTS__,Lc=()=>{if(typeof process>"u"||typeof ho>"u")return;const n=ho.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Dc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&kc(n[1]);return t&&JSON.parse(t)},Bs=()=>{try{return Ic()||Pc()||Lc()||Dc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Vc=n=>Bs()?.emulatorHosts?.[n],Mc=n=>{const t=Vc(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},xa=()=>Bs()?.config;class Nc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}function Us(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Oc(n){return(await fetch(n,{credentials:"include"})).ok}function Fc(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[vr(JSON.stringify(e)),vr(JSON.stringify(l)),""].join(".")}const wn={};function $c(){const n={prod:[],emulator:[]};for(const t of Object.keys(wn))wn[t]?n.emulator.push(t):n.prod.push(t);return n}function Bc(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let po=!1;function Uc(n,t){if(typeof window>"u"||typeof document>"u"||!Us(window.location.host)||wn[n]===t||wn[n]||po)return;wn[n]=t;function e(x){return`__firebase__banner__${x}`}const r="__firebase__banner",o=$c().prod.length>0;function l(){const x=document.getElementById(r);x&&x.remove()}function u(x){x.style.display="flex",x.style.background="#7faaf0",x.style.position="fixed",x.style.bottom="5px",x.style.left="5px",x.style.padding=".5em",x.style.borderRadius="5px",x.style.alignItems="center"}function h(x,D){x.setAttribute("width","24"),x.setAttribute("id",D),x.setAttribute("height","24"),x.setAttribute("viewBox","0 0 24 24"),x.setAttribute("fill","none"),x.style.marginLeft="-6px"}function f(){const x=document.createElement("span");return x.style.cursor="pointer",x.style.marginLeft="16px",x.style.fontSize="24px",x.innerHTML=" &times;",x.onclick=()=>{po=!0,l()},x}function w(x,D){x.setAttribute("id",D),x.innerText="Learn more",x.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",x.setAttribute("target","__blank"),x.style.paddingLeft="5px",x.style.textDecoration="underline"}function E(){const x=Bc(r),D=e("text"),L=document.getElementById(D)||document.createElement("span"),S=e("learnmore"),A=document.getElementById(S)||document.createElement("a"),B=e("preprendIcon"),C=document.getElementById(B)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(x.created){const I=x.element;u(I),w(A,S);const N=f();h(C,B),I.append(C,L,A,N),document.body.appendChild(I)}o?(L.innerText="Preview backend disconnected.",C.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(C.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,L.innerText="Preview backend running in this workspace."),L.setAttribute("id",D)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",E):E()}function jc(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function qc(){const n=Bs()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Hc(){return!qc()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function zc(){try{return typeof indexedDB=="object"}catch{return!1}}function Gc(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(e){t(e)}})}const Wc="FirebaseError";class Qe extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Wc,Object.setPrototypeOf(this,Qe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,wa.prototype.create)}}class wa{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],l=o?Kc(o,r):"Error",u=`${this.serviceName}: ${l} (${i}).`;return new Qe(i,u,r)}}function Kc(n,t){return n.replace(Qc,(e,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const Qc=/\{\$([^}]+)}/g;function br(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const i of e){if(!r.includes(i))return!1;const o=n[i],l=t[i];if(fo(o)&&fo(l)){if(!br(o,l))return!1}else if(o!==l)return!1}for(const i of r)if(!e.includes(i))return!1;return!0}function fo(n){return n!==null&&typeof n=="object"}function _r(n){return n&&n._delegate?n._delegate:n}class kn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}const _e="[DEFAULT]";class Yc{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Nc;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Jc(t))try{this.getOrInitializeService({instanceIdentifier:_e})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=_e){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=_e){return this.instances.has(t)}getOptions(t=_e){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,l]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&l.resolve(i)}return i}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&t(o,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Xc(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=_e){return this.component?this.component.multipleInstances?t:_e:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Xc(n){return n===_e?void 0:n}function Jc(n){return n.instantiationMode==="EAGER"}class Zc{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Yc(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}var it;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(it||(it={}));const tu={debug:it.DEBUG,verbose:it.VERBOSE,info:it.INFO,warn:it.WARN,error:it.ERROR,silent:it.SILENT},eu=it.INFO,nu={[it.DEBUG]:"log",[it.VERBOSE]:"log",[it.INFO]:"info",[it.WARN]:"warn",[it.ERROR]:"error"},ru=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),i=nu[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Ea{constructor(t){this.name=t,this._logLevel=eu,this._logHandler=ru,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in it))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?tu[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,it.DEBUG,...t),this._logHandler(this,it.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,it.VERBOSE,...t),this._logHandler(this,it.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,it.INFO,...t),this._logHandler(this,it.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,it.WARN,...t),this._logHandler(this,it.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,it.ERROR,...t),this._logHandler(this,it.ERROR,...t)}}const su=(n,t)=>t.some(e=>n instanceof e);let mo,go;function iu(){return mo||(mo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ou(){return go||(go=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ta=new WeakMap,bs=new WeakMap,Ia=new WeakMap,cs=new WeakMap,js=new WeakMap;function au(n){const t=new Promise((e,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",l)},o=()=>{e(ae(n.result)),i()},l=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",l)});return t.then(e=>{e instanceof IDBCursor&&Ta.set(e,n)}).catch(()=>{}),js.set(t,n),t}function lu(n){if(bs.has(n))return;const t=new Promise((e,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",l),n.removeEventListener("abort",l)},o=()=>{e(),i()},l=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",l),n.addEventListener("abort",l)});bs.set(n,t)}let _s={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return bs.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Ia.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return ae(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function cu(n){_s=n(_s)}function uu(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(us(this),t,...e);return Ia.set(r,t.sort?t.sort():[t]),ae(r)}:ou().includes(n)?function(...t){return n.apply(us(this),t),ae(Ta.get(this))}:function(...t){return ae(n.apply(us(this),t))}}function du(n){return typeof n=="function"?uu(n):(n instanceof IDBTransaction&&lu(n),su(n,iu())?new Proxy(n,_s):n)}function ae(n){if(n instanceof IDBRequest)return au(n);if(cs.has(n))return cs.get(n);const t=du(n);return t!==n&&(cs.set(n,t),js.set(t,n)),t}const us=n=>js.get(n);function hu(n,t,{blocked:e,upgrade:r,blocking:i,terminated:o}={}){const l=indexedDB.open(n,t),u=ae(l);return r&&l.addEventListener("upgradeneeded",h=>{r(ae(l.result),h.oldVersion,h.newVersion,ae(l.transaction),h)}),e&&l.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const pu=["get","getKey","getAll","getAllKeys","count"],fu=["put","add","delete","clear"],ds=new Map;function yo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(ds.get(t))return ds.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,i=fu.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(i||pu.includes(e)))return;const o=async function(l,...u){const h=this.transaction(l,i?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[e](...u),i&&h.done]))[0]};return ds.set(t,o),o}cu(n=>({...n,get:(t,e,r)=>yo(t,e)||n.get(t,e,r),has:(t,e)=>!!yo(t,e)||n.has(t,e)}));class mu{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(gu(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function gu(n){return n.getComponent()?.type==="VERSION"}const xs="@firebase/app",vo="0.14.7";const te=new Ea("@firebase/app"),yu="@firebase/app-compat",vu="@firebase/analytics-compat",bu="@firebase/analytics",_u="@firebase/app-check-compat",xu="@firebase/app-check",wu="@firebase/auth",Eu="@firebase/auth-compat",Tu="@firebase/database",Iu="@firebase/data-connect",Cu="@firebase/database-compat",Au="@firebase/functions",Su="@firebase/functions-compat",ku="@firebase/installations",Ru="@firebase/installations-compat",Pu="@firebase/messaging",Lu="@firebase/messaging-compat",Du="@firebase/performance",Vu="@firebase/performance-compat",Mu="@firebase/remote-config",Nu="@firebase/remote-config-compat",Ou="@firebase/storage",Fu="@firebase/storage-compat",$u="@firebase/firestore",Bu="@firebase/ai",Uu="@firebase/firestore-compat",ju="firebase",qu="12.8.0";const ws="[DEFAULT]",Hu={[xs]:"fire-core",[yu]:"fire-core-compat",[bu]:"fire-analytics",[vu]:"fire-analytics-compat",[xu]:"fire-app-check",[_u]:"fire-app-check-compat",[wu]:"fire-auth",[Eu]:"fire-auth-compat",[Tu]:"fire-rtdb",[Iu]:"fire-data-connect",[Cu]:"fire-rtdb-compat",[Au]:"fire-fn",[Su]:"fire-fn-compat",[ku]:"fire-iid",[Ru]:"fire-iid-compat",[Pu]:"fire-fcm",[Lu]:"fire-fcm-compat",[Du]:"fire-perf",[Vu]:"fire-perf-compat",[Mu]:"fire-rc",[Nu]:"fire-rc-compat",[Ou]:"fire-gcs",[Fu]:"fire-gcs-compat",[$u]:"fire-fst",[Uu]:"fire-fst-compat",[Bu]:"fire-vertex","fire-js":"fire-js",[ju]:"fire-js-all"};const xr=new Map,zu=new Map,Es=new Map;function bo(n,t){try{n.container.addComponent(t)}catch(e){te.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function wr(n){const t=n.name;if(Es.has(t))return te.debug(`There were multiple attempts to register component ${t}.`),!1;Es.set(t,n);for(const e of xr.values())bo(e,n);for(const e of zu.values())bo(e,n);return!0}function Gu(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Wu(n){return n==null?!1:n.settings!==void 0}const Ku={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},le=new wa("app","Firebase",Ku);class Qu{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new kn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw le.create("app-deleted",{appName:this._name})}}const Yu=qu;function Ca(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:ws,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw le.create("bad-app-name",{appName:String(i)});if(e||(e=xa()),!e)throw le.create("no-options");const o=xr.get(i);if(o){if(br(e,o.options)&&br(r,o.config))return o;throw le.create("duplicate-app",{appName:i})}const l=new Zc(i);for(const h of Es.values())l.addComponent(h);const u=new Qu(e,r,l);return xr.set(i,u),u}function Xu(n=ws){const t=xr.get(n);if(!t&&n===ws&&xa())return Ca();if(!t)throw le.create("no-app",{appName:n});return t}function $e(n,t,e){let r=Hu[n]??n;e&&(r+=`-${e}`);const i=r.match(/\s|\//),o=t.match(/\s|\//);if(i||o){const l=[`Unable to register library "${r}" with version "${t}":`];i&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),te.warn(l.join(" "));return}wr(new kn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}const Ju="firebase-heartbeat-database",Zu=1,Rn="firebase-heartbeat-store";let hs=null;function Aa(){return hs||(hs=hu(Ju,Zu,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Rn)}catch(e){console.warn(e)}}}}).catch(n=>{throw le.create("idb-open",{originalErrorMessage:n.message})})),hs}async function td(n){try{const e=(await Aa()).transaction(Rn),r=await e.objectStore(Rn).get(Sa(n));return await e.done,r}catch(t){if(t instanceof Qe)te.warn(t.message);else{const e=le.create("idb-get",{originalErrorMessage:t?.message});te.warn(e.message)}}}async function _o(n,t){try{const r=(await Aa()).transaction(Rn,"readwrite");await r.objectStore(Rn).put(t,Sa(n)),await r.done}catch(e){if(e instanceof Qe)te.warn(e.message);else{const r=le.create("idb-set",{originalErrorMessage:e?.message});te.warn(r.message)}}}function Sa(n){return`${n.name}!${n.options.appId}`}const ed=1024,nd=30;class rd{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new id(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=xo();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:e}),this._heartbeatsCache.heartbeats.length>nd){const i=od(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){te.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=xo(),{heartbeatsToSend:e,unsentEntries:r}=sd(this._heartbeatsCache.heartbeats),i=vr(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return te.warn(t),""}}}function xo(){return new Date().toISOString().substring(0,10)}function sd(n,t=ed){const e=[];let r=n.slice();for(const i of n){const o=e.find(l=>l.agent===i.agent);if(o){if(o.dates.push(i.date),wo(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),wo(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class id{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zc()?Gc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await td(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return _o(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return _o(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function wo(n){return vr(JSON.stringify({version:2,heartbeats:n})).length}function od(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}function ad(n){wr(new kn("platform-logger",t=>new mu(t),"PRIVATE")),wr(new kn("heartbeat",t=>new rd(t),"PRIVATE")),$e(xs,vo,n),$e(xs,vo,"esm2020"),$e("fire-js","")}ad("");var ld="firebase",cd="12.8.0";$e(ld,cd,"app");var Eo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var qs;(function(){var n;function t(m,p){function b(){}b.prototype=p.prototype,m.F=p.prototype,m.prototype=new b,m.prototype.constructor=m,m.D=function(_,y,v){for(var d=Array(arguments.length-2),O=2;O<arguments.length;O++)d[O-2]=arguments[O];return p.prototype[y].apply(_,d)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(m,p,b){b||(b=0);const _=Array(16);if(typeof p=="string")for(var y=0;y<16;++y)_[y]=p.charCodeAt(b++)|p.charCodeAt(b++)<<8|p.charCodeAt(b++)<<16|p.charCodeAt(b++)<<24;else for(y=0;y<16;++y)_[y]=p[b++]|p[b++]<<8|p[b++]<<16|p[b++]<<24;p=m.g[0],b=m.g[1],y=m.g[2];let v=m.g[3],d;d=p+(v^b&(y^v))+_[0]+3614090360&4294967295,p=b+(d<<7&4294967295|d>>>25),d=v+(y^p&(b^y))+_[1]+3905402710&4294967295,v=p+(d<<12&4294967295|d>>>20),d=y+(b^v&(p^b))+_[2]+606105819&4294967295,y=v+(d<<17&4294967295|d>>>15),d=b+(p^y&(v^p))+_[3]+3250441966&4294967295,b=y+(d<<22&4294967295|d>>>10),d=p+(v^b&(y^v))+_[4]+4118548399&4294967295,p=b+(d<<7&4294967295|d>>>25),d=v+(y^p&(b^y))+_[5]+1200080426&4294967295,v=p+(d<<12&4294967295|d>>>20),d=y+(b^v&(p^b))+_[6]+2821735955&4294967295,y=v+(d<<17&4294967295|d>>>15),d=b+(p^y&(v^p))+_[7]+4249261313&4294967295,b=y+(d<<22&4294967295|d>>>10),d=p+(v^b&(y^v))+_[8]+1770035416&4294967295,p=b+(d<<7&4294967295|d>>>25),d=v+(y^p&(b^y))+_[9]+2336552879&4294967295,v=p+(d<<12&4294967295|d>>>20),d=y+(b^v&(p^b))+_[10]+4294925233&4294967295,y=v+(d<<17&4294967295|d>>>15),d=b+(p^y&(v^p))+_[11]+2304563134&4294967295,b=y+(d<<22&4294967295|d>>>10),d=p+(v^b&(y^v))+_[12]+1804603682&4294967295,p=b+(d<<7&4294967295|d>>>25),d=v+(y^p&(b^y))+_[13]+4254626195&4294967295,v=p+(d<<12&4294967295|d>>>20),d=y+(b^v&(p^b))+_[14]+2792965006&4294967295,y=v+(d<<17&4294967295|d>>>15),d=b+(p^y&(v^p))+_[15]+1236535329&4294967295,b=y+(d<<22&4294967295|d>>>10),d=p+(y^v&(b^y))+_[1]+4129170786&4294967295,p=b+(d<<5&4294967295|d>>>27),d=v+(b^y&(p^b))+_[6]+3225465664&4294967295,v=p+(d<<9&4294967295|d>>>23),d=y+(p^b&(v^p))+_[11]+643717713&4294967295,y=v+(d<<14&4294967295|d>>>18),d=b+(v^p&(y^v))+_[0]+3921069994&4294967295,b=y+(d<<20&4294967295|d>>>12),d=p+(y^v&(b^y))+_[5]+3593408605&4294967295,p=b+(d<<5&4294967295|d>>>27),d=v+(b^y&(p^b))+_[10]+38016083&4294967295,v=p+(d<<9&4294967295|d>>>23),d=y+(p^b&(v^p))+_[15]+3634488961&4294967295,y=v+(d<<14&4294967295|d>>>18),d=b+(v^p&(y^v))+_[4]+3889429448&4294967295,b=y+(d<<20&4294967295|d>>>12),d=p+(y^v&(b^y))+_[9]+568446438&4294967295,p=b+(d<<5&4294967295|d>>>27),d=v+(b^y&(p^b))+_[14]+3275163606&4294967295,v=p+(d<<9&4294967295|d>>>23),d=y+(p^b&(v^p))+_[3]+4107603335&4294967295,y=v+(d<<14&4294967295|d>>>18),d=b+(v^p&(y^v))+_[8]+1163531501&4294967295,b=y+(d<<20&4294967295|d>>>12),d=p+(y^v&(b^y))+_[13]+2850285829&4294967295,p=b+(d<<5&4294967295|d>>>27),d=v+(b^y&(p^b))+_[2]+4243563512&4294967295,v=p+(d<<9&4294967295|d>>>23),d=y+(p^b&(v^p))+_[7]+1735328473&4294967295,y=v+(d<<14&4294967295|d>>>18),d=b+(v^p&(y^v))+_[12]+2368359562&4294967295,b=y+(d<<20&4294967295|d>>>12),d=p+(b^y^v)+_[5]+4294588738&4294967295,p=b+(d<<4&4294967295|d>>>28),d=v+(p^b^y)+_[8]+2272392833&4294967295,v=p+(d<<11&4294967295|d>>>21),d=y+(v^p^b)+_[11]+1839030562&4294967295,y=v+(d<<16&4294967295|d>>>16),d=b+(y^v^p)+_[14]+4259657740&4294967295,b=y+(d<<23&4294967295|d>>>9),d=p+(b^y^v)+_[1]+2763975236&4294967295,p=b+(d<<4&4294967295|d>>>28),d=v+(p^b^y)+_[4]+1272893353&4294967295,v=p+(d<<11&4294967295|d>>>21),d=y+(v^p^b)+_[7]+4139469664&4294967295,y=v+(d<<16&4294967295|d>>>16),d=b+(y^v^p)+_[10]+3200236656&4294967295,b=y+(d<<23&4294967295|d>>>9),d=p+(b^y^v)+_[13]+681279174&4294967295,p=b+(d<<4&4294967295|d>>>28),d=v+(p^b^y)+_[0]+3936430074&4294967295,v=p+(d<<11&4294967295|d>>>21),d=y+(v^p^b)+_[3]+3572445317&4294967295,y=v+(d<<16&4294967295|d>>>16),d=b+(y^v^p)+_[6]+76029189&4294967295,b=y+(d<<23&4294967295|d>>>9),d=p+(b^y^v)+_[9]+3654602809&4294967295,p=b+(d<<4&4294967295|d>>>28),d=v+(p^b^y)+_[12]+3873151461&4294967295,v=p+(d<<11&4294967295|d>>>21),d=y+(v^p^b)+_[15]+530742520&4294967295,y=v+(d<<16&4294967295|d>>>16),d=b+(y^v^p)+_[2]+3299628645&4294967295,b=y+(d<<23&4294967295|d>>>9),d=p+(y^(b|~v))+_[0]+4096336452&4294967295,p=b+(d<<6&4294967295|d>>>26),d=v+(b^(p|~y))+_[7]+1126891415&4294967295,v=p+(d<<10&4294967295|d>>>22),d=y+(p^(v|~b))+_[14]+2878612391&4294967295,y=v+(d<<15&4294967295|d>>>17),d=b+(v^(y|~p))+_[5]+4237533241&4294967295,b=y+(d<<21&4294967295|d>>>11),d=p+(y^(b|~v))+_[12]+1700485571&4294967295,p=b+(d<<6&4294967295|d>>>26),d=v+(b^(p|~y))+_[3]+2399980690&4294967295,v=p+(d<<10&4294967295|d>>>22),d=y+(p^(v|~b))+_[10]+4293915773&4294967295,y=v+(d<<15&4294967295|d>>>17),d=b+(v^(y|~p))+_[1]+2240044497&4294967295,b=y+(d<<21&4294967295|d>>>11),d=p+(y^(b|~v))+_[8]+1873313359&4294967295,p=b+(d<<6&4294967295|d>>>26),d=v+(b^(p|~y))+_[15]+4264355552&4294967295,v=p+(d<<10&4294967295|d>>>22),d=y+(p^(v|~b))+_[6]+2734768916&4294967295,y=v+(d<<15&4294967295|d>>>17),d=b+(v^(y|~p))+_[13]+1309151649&4294967295,b=y+(d<<21&4294967295|d>>>11),d=p+(y^(b|~v))+_[4]+4149444226&4294967295,p=b+(d<<6&4294967295|d>>>26),d=v+(b^(p|~y))+_[11]+3174756917&4294967295,v=p+(d<<10&4294967295|d>>>22),d=y+(p^(v|~b))+_[2]+718787259&4294967295,y=v+(d<<15&4294967295|d>>>17),d=b+(v^(y|~p))+_[9]+3951481745&4294967295,m.g[0]=m.g[0]+p&4294967295,m.g[1]=m.g[1]+(y+(d<<21&4294967295|d>>>11))&4294967295,m.g[2]=m.g[2]+y&4294967295,m.g[3]=m.g[3]+v&4294967295}r.prototype.v=function(m,p){p===void 0&&(p=m.length);const b=p-this.blockSize,_=this.C;let y=this.h,v=0;for(;v<p;){if(y==0)for(;v<=b;)i(this,m,v),v+=this.blockSize;if(typeof m=="string"){for(;v<p;)if(_[y++]=m.charCodeAt(v++),y==this.blockSize){i(this,_),y=0;break}}else for(;v<p;)if(_[y++]=m[v++],y==this.blockSize){i(this,_),y=0;break}}this.h=y,this.o+=p},r.prototype.A=function(){var m=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);m[0]=128;for(var p=1;p<m.length-8;++p)m[p]=0;p=this.o*8;for(var b=m.length-8;b<m.length;++b)m[b]=p&255,p/=256;for(this.v(m),m=Array(16),p=0,b=0;b<4;++b)for(let _=0;_<32;_+=8)m[p++]=this.g[b]>>>_&255;return m};function o(m,p){var b=u;return Object.prototype.hasOwnProperty.call(b,m)?b[m]:b[m]=p(m)}function l(m,p){this.h=p;const b=[];let _=!0;for(let y=m.length-1;y>=0;y--){const v=m[y]|0;_&&v==p||(b[y]=v,_=!1)}this.g=b}var u={};function h(m){return-128<=m&&m<128?o(m,function(p){return new l([p|0],p<0?-1:0)}):new l([m|0],m<0?-1:0)}function f(m){if(isNaN(m)||!isFinite(m))return E;if(m<0)return A(f(-m));const p=[];let b=1;for(let _=0;m>=b;_++)p[_]=m/b|0,b*=4294967296;return new l(p,0)}function w(m,p){if(m.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(m.charAt(0)=="-")return A(w(m.substring(1),p));if(m.indexOf("-")>=0)throw Error('number format error: interior "-" character');const b=f(Math.pow(p,8));let _=E;for(let v=0;v<m.length;v+=8){var y=Math.min(8,m.length-v);const d=parseInt(m.substring(v,v+y),p);y<8?(y=f(Math.pow(p,y)),_=_.j(y).add(f(d))):(_=_.j(b),_=_.add(f(d)))}return _}var E=h(0),x=h(1),D=h(16777216);n=l.prototype,n.m=function(){if(S(this))return-A(this).m();let m=0,p=1;for(let b=0;b<this.g.length;b++){const _=this.i(b);m+=(_>=0?_:4294967296+_)*p,p*=4294967296}return m},n.toString=function(m){if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(L(this))return"0";if(S(this))return"-"+A(this).toString(m);const p=f(Math.pow(m,6));var b=this;let _="";for(;;){const y=N(b,p).g;b=B(b,y.j(p));let v=((b.g.length>0?b.g[0]:b.h)>>>0).toString(m);if(b=y,L(b))return v+_;for(;v.length<6;)v="0"+v;_=v+_}},n.i=function(m){return m<0?0:m<this.g.length?this.g[m]:this.h};function L(m){if(m.h!=0)return!1;for(let p=0;p<m.g.length;p++)if(m.g[p]!=0)return!1;return!0}function S(m){return m.h==-1}n.l=function(m){return m=B(this,m),S(m)?-1:L(m)?0:1};function A(m){const p=m.g.length,b=[];for(let _=0;_<p;_++)b[_]=~m.g[_];return new l(b,~m.h).add(x)}n.abs=function(){return S(this)?A(this):this},n.add=function(m){const p=Math.max(this.g.length,m.g.length),b=[];let _=0;for(let y=0;y<=p;y++){let v=_+(this.i(y)&65535)+(m.i(y)&65535),d=(v>>>16)+(this.i(y)>>>16)+(m.i(y)>>>16);_=d>>>16,v&=65535,d&=65535,b[y]=d<<16|v}return new l(b,b[b.length-1]&-2147483648?-1:0)};function B(m,p){return m.add(A(p))}n.j=function(m){if(L(this)||L(m))return E;if(S(this))return S(m)?A(this).j(A(m)):A(A(this).j(m));if(S(m))return A(this.j(A(m)));if(this.l(D)<0&&m.l(D)<0)return f(this.m()*m.m());const p=this.g.length+m.g.length,b=[];for(var _=0;_<2*p;_++)b[_]=0;for(_=0;_<this.g.length;_++)for(let y=0;y<m.g.length;y++){const v=this.i(_)>>>16,d=this.i(_)&65535,O=m.i(y)>>>16,R=m.i(y)&65535;b[2*_+2*y]+=d*R,C(b,2*_+2*y),b[2*_+2*y+1]+=v*R,C(b,2*_+2*y+1),b[2*_+2*y+1]+=d*O,C(b,2*_+2*y+1),b[2*_+2*y+2]+=v*O,C(b,2*_+2*y+2)}for(m=0;m<p;m++)b[m]=b[2*m+1]<<16|b[2*m];for(m=p;m<2*p;m++)b[m]=0;return new l(b,0)};function C(m,p){for(;(m[p]&65535)!=m[p];)m[p+1]+=m[p]>>>16,m[p]&=65535,p++}function I(m,p){this.g=m,this.h=p}function N(m,p){if(L(p))throw Error("division by zero");if(L(m))return new I(E,E);if(S(m))return p=N(A(m),p),new I(A(p.g),A(p.h));if(S(p))return p=N(m,A(p)),new I(A(p.g),p.h);if(m.g.length>30){if(S(m)||S(p))throw Error("slowDivide_ only works with positive integers.");for(var b=x,_=p;_.l(m)<=0;)b=$(b),_=$(_);var y=F(b,1),v=F(_,1);for(_=F(_,2),b=F(b,2);!L(_);){var d=v.add(_);d.l(m)<=0&&(y=y.add(b),v=d),_=F(_,1),b=F(b,1)}return p=B(m,y.j(p)),new I(y,p)}for(y=E;m.l(p)>=0;){for(b=Math.max(1,Math.floor(m.m()/p.m())),_=Math.ceil(Math.log(b)/Math.LN2),_=_<=48?1:Math.pow(2,_-48),v=f(b),d=v.j(p);S(d)||d.l(m)>0;)b-=_,v=f(b),d=v.j(p);L(v)&&(v=x),y=y.add(v),m=B(m,d)}return new I(y,m)}n.B=function(m){return N(this,m).h},n.and=function(m){const p=Math.max(this.g.length,m.g.length),b=[];for(let _=0;_<p;_++)b[_]=this.i(_)&m.i(_);return new l(b,this.h&m.h)},n.or=function(m){const p=Math.max(this.g.length,m.g.length),b=[];for(let _=0;_<p;_++)b[_]=this.i(_)|m.i(_);return new l(b,this.h|m.h)},n.xor=function(m){const p=Math.max(this.g.length,m.g.length),b=[];for(let _=0;_<p;_++)b[_]=this.i(_)^m.i(_);return new l(b,this.h^m.h)};function $(m){const p=m.g.length+1,b=[];for(let _=0;_<p;_++)b[_]=m.i(_)<<1|m.i(_-1)>>>31;return new l(b,m.h)}function F(m,p){const b=p>>5;p%=32;const _=m.g.length-b,y=[];for(let v=0;v<_;v++)y[v]=p>0?m.i(v+b)>>>p|m.i(v+b+1)<<32-p:m.i(v+b);return new l(y,m.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.B,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=f,l.fromString=w,qs=l}).apply(typeof Eo<"u"?Eo:typeof self<"u"?self:typeof window<"u"?window:{});var or=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var ka,xn,Ra,pr,Ts,Pa,La,Da;(function(){var n,t=Object.defineProperty;function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof or=="object"&&or];for(var a=0;a<s.length;++a){var c=s[a];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function i(s,a){if(a)t:{var c=r;s=s.split(".");for(var g=0;g<s.length-1;g++){var P=s[g];if(!(P in c))break t;c=c[P]}s=s[s.length-1],g=c[s],a=a(g),a!=g&&a!=null&&t(c,s,{configurable:!0,writable:!0,value:a})}}i("Symbol.dispose",function(s){return s||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(s){return s||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(s){return s||function(a){var c=[],g;for(g in a)Object.prototype.hasOwnProperty.call(a,g)&&c.push([g,a[g]]);return c}});var o=o||{},l=this||self;function u(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function h(s,a,c){return s.call.apply(s.bind,arguments)}function f(s,a,c){return f=h,f.apply(null,arguments)}function w(s,a){var c=Array.prototype.slice.call(arguments,1);return function(){var g=c.slice();return g.push.apply(g,arguments),s.apply(this,g)}}function E(s,a){function c(){}c.prototype=a.prototype,s.Z=a.prototype,s.prototype=new c,s.prototype.constructor=s,s.Ob=function(g,P,M){for(var z=Array(arguments.length-2),tt=2;tt<arguments.length;tt++)z[tt-2]=arguments[tt];return a.prototype[P].apply(g,z)}}var x=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?s=>s&&AsyncContext.Snapshot.wrap(s):s=>s;function D(s){const a=s.length;if(a>0){const c=Array(a);for(let g=0;g<a;g++)c[g]=s[g];return c}return[]}function L(s,a){for(let g=1;g<arguments.length;g++){const P=arguments[g];var c=typeof P;if(c=c!="object"?c:P?Array.isArray(P)?"array":c:"null",c=="array"||c=="object"&&typeof P.length=="number"){c=s.length||0;const M=P.length||0;s.length=c+M;for(let z=0;z<M;z++)s[c+z]=P[z]}else s.push(P)}}class S{constructor(a,c){this.i=a,this.j=c,this.h=0,this.g=null}get(){let a;return this.h>0?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function A(s){l.setTimeout(()=>{throw s},0)}function B(){var s=m;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class C{constructor(){this.h=this.g=null}add(a,c){const g=I.get();g.set(a,c),this.h?this.h.next=g:this.g=g,this.h=g}}var I=new S(()=>new N,s=>s.reset());class N{constructor(){this.next=this.g=this.h=null}set(a,c){this.h=a,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let $,F=!1,m=new C,p=()=>{const s=Promise.resolve(void 0);$=()=>{s.then(b)}};function b(){for(var s;s=B();){try{s.h.call(s.g)}catch(c){A(c)}var a=I;a.j(s),a.h<100&&(a.h++,s.next=a.g,a.g=s)}F=!1}function _(){this.u=this.u,this.C=this.C}_.prototype.u=!1,_.prototype.dispose=function(){this.u||(this.u=!0,this.N())},_.prototype[Symbol.dispose]=function(){this.dispose()},_.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var v=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const c=()=>{};l.addEventListener("test",c,a),l.removeEventListener("test",c,a)}catch{}return s})();function d(s){return/^[\s\xa0]*$/.test(s)}function O(s,a){y.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s&&this.init(s,a)}E(O,y),O.prototype.init=function(s,a){const c=this.type=s.type,g=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget,a||(c=="mouseover"?a=s.fromElement:c=="mouseout"&&(a=s.toElement)),this.relatedTarget=a,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=s.pointerType,this.state=s.state,this.i=s,s.defaultPrevented&&O.Z.h.call(this)},O.prototype.h=function(){O.Z.h.call(this);const s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var R="closure_listenable_"+(Math.random()*1e6|0),k=0;function V(s,a,c,g,P){this.listener=s,this.proxy=null,this.src=a,this.type=c,this.capture=!!g,this.ha=P,this.key=++k,this.da=this.fa=!1}function U(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function H(s,a,c){for(const g in s)a.call(c,s[g],g,s)}function K(s,a){for(const c in s)a.call(void 0,s[c],c,s)}function Q(s){const a={};for(const c in s)a[c]=s[c];return a}const G="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function rt(s,a){let c,g;for(let P=1;P<arguments.length;P++){g=arguments[P];for(c in g)s[c]=g[c];for(let M=0;M<G.length;M++)c=G[M],Object.prototype.hasOwnProperty.call(g,c)&&(s[c]=g[c])}}function X(s){this.src=s,this.g={},this.h=0}X.prototype.add=function(s,a,c,g,P){const M=s.toString();s=this.g[M],s||(s=this.g[M]=[],this.h++);const z=Z(s,a,g,P);return z>-1?(a=s[z],c||(a.fa=!1)):(a=new V(a,this.src,M,!!g,P),a.fa=c,s.push(a)),a};function W(s,a){const c=a.type;if(c in s.g){var g=s.g[c],P=Array.prototype.indexOf.call(g,a,void 0),M;(M=P>=0)&&Array.prototype.splice.call(g,P,1),M&&(U(a),s.g[c].length==0&&(delete s.g[c],s.h--))}}function Z(s,a,c,g){for(let P=0;P<s.length;++P){const M=s[P];if(!M.da&&M.listener==a&&M.capture==!!c&&M.ha==g)return P}return-1}var at="closure_lm_"+(Math.random()*1e6|0),Bt={};function Je(s,a,c,g,P){if(Array.isArray(a)){for(let M=0;M<a.length;M++)Je(s,a[M],c,g,P);return null}return c=mi(c),s&&s[R]?s.J(a,c,u(g)?!!g.capture:!1,P):fe(s,a,c,!1,g,P)}function fe(s,a,c,g,P,M){if(!a)throw Error("Invalid event type");const z=u(P)?!!P.capture:!!P;let tt=Hr(s);if(tt||(s[at]=tt=new X(s)),c=tt.add(a,c,g,z,M),c.proxy)return c;if(g=Ze(),c.proxy=g,g.src=s,g.listener=c,s.addEventListener)v||(P=z),P===void 0&&(P=!1),s.addEventListener(a.toString(),g,P);else if(s.attachEvent)s.attachEvent(qr(a.toString()),g);else if(s.addListener&&s.removeListener)s.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Ze(){function s(c){return a.call(s.src,s.listener,c)}const a=Ml;return s}function zn(s,a,c,g,P){if(Array.isArray(a))for(var M=0;M<a.length;M++)zn(s,a[M],c,g,P);else g=u(g)?!!g.capture:!!g,c=mi(c),s&&s[R]?(s=s.i,M=String(a).toString(),M in s.g&&(a=s.g[M],c=Z(a,c,g,P),c>-1&&(U(a[c]),Array.prototype.splice.call(a,c,1),a.length==0&&(delete s.g[M],s.h--)))):s&&(s=Hr(s))&&(a=s.g[a.toString()],s=-1,a&&(s=Z(a,c,g,P)),(c=s>-1?a[s]:null)&&tn(c))}function tn(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[R])W(a.i,s);else{var c=s.type,g=s.proxy;a.removeEventListener?a.removeEventListener(c,g,s.capture):a.detachEvent?a.detachEvent(qr(c),g):a.addListener&&a.removeListener&&a.removeListener(g),(c=Hr(a))?(W(c,s),c.h==0&&(c.src=null,a[at]=null)):U(s)}}}function qr(s){return s in Bt?Bt[s]:Bt[s]="on"+s}function Ml(s,a){if(s.da)s=!0;else{a=new O(a,this);const c=s.listener,g=s.ha||s.src;s.fa&&tn(s),s=c.call(g,a)}return s}function Hr(s){return s=s[at],s instanceof X?s:null}var zr="__closure_events_fn_"+(Math.random()*1e9>>>0);function mi(s){return typeof s=="function"?s:(s[zr]||(s[zr]=function(a){return s.handleEvent(a)}),s[zr])}function St(){_.call(this),this.i=new X(this),this.M=this,this.G=null}E(St,_),St.prototype[R]=!0,St.prototype.removeEventListener=function(s,a,c,g){zn(this,s,a,c,g)};function Vt(s,a){var c,g=s.G;if(g)for(c=[];g;g=g.G)c.push(g);if(s=s.M,g=a.type||a,typeof a=="string")a=new y(a,s);else if(a instanceof y)a.target=a.target||s;else{var P=a;a=new y(g,s),rt(a,P)}P=!0;let M,z;if(c)for(z=c.length-1;z>=0;z--)M=a.g=c[z],P=Gn(M,g,!0,a)&&P;if(M=a.g=s,P=Gn(M,g,!0,a)&&P,P=Gn(M,g,!1,a)&&P,c)for(z=0;z<c.length;z++)M=a.g=c[z],P=Gn(M,g,!1,a)&&P}St.prototype.N=function(){if(St.Z.N.call(this),this.i){var s=this.i;for(const a in s.g){const c=s.g[a];for(let g=0;g<c.length;g++)U(c[g]);delete s.g[a],s.h--}}this.G=null},St.prototype.J=function(s,a,c,g){return this.i.add(String(s),a,!1,c,g)},St.prototype.K=function(s,a,c,g){return this.i.add(String(s),a,!0,c,g)};function Gn(s,a,c,g){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();let P=!0;for(let M=0;M<a.length;++M){const z=a[M];if(z&&!z.da&&z.capture==c){const tt=z.listener,bt=z.ha||z.src;z.fa&&W(s.i,z),P=tt.call(bt,g)!==!1&&P}}return P&&!g.defaultPrevented}function Nl(s,a){if(typeof s!="function")if(s&&typeof s.handleEvent=="function")s=f(s.handleEvent,s);else throw Error("Invalid listener argument");return Number(a)>2147483647?-1:l.setTimeout(s,a||0)}function gi(s){s.g=Nl(()=>{s.g=null,s.i&&(s.i=!1,gi(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class Ol extends _{constructor(a,c){super(),this.m=a,this.l=c,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:gi(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function en(s){_.call(this),this.h=s,this.g={}}E(en,_);var yi=[];function vi(s){H(s.g,function(a,c){this.g.hasOwnProperty(c)&&tn(a)},s),s.g={}}en.prototype.N=function(){en.Z.N.call(this),vi(this)},en.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Gr=l.JSON.stringify,Fl=l.JSON.parse,$l=class{stringify(s){return l.JSON.stringify(s,void 0)}parse(s){return l.JSON.parse(s,void 0)}};function bi(){}function _i(){}var nn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Wr(){y.call(this,"d")}E(Wr,y);function Kr(){y.call(this,"c")}E(Kr,y);var me={},xi=null;function Wn(){return xi=xi||new St}me.Ia="serverreachability";function wi(s){y.call(this,me.Ia,s)}E(wi,y);function rn(s){const a=Wn();Vt(a,new wi(a))}me.STAT_EVENT="statevent";function Ei(s,a){y.call(this,me.STAT_EVENT,s),this.stat=a}E(Ei,y);function Mt(s){const a=Wn();Vt(a,new Ei(a,s))}me.Ja="timingevent";function Ti(s,a){y.call(this,me.Ja,s),this.size=a}E(Ti,y);function sn(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){s()},a)}function on(){this.g=!0}on.prototype.ua=function(){this.g=!1};function Bl(s,a,c,g,P,M){s.info(function(){if(s.g)if(M){var z="",tt=M.split("&");for(let lt=0;lt<tt.length;lt++){var bt=tt[lt].split("=");if(bt.length>1){const _t=bt[0];bt=bt[1];const Gt=_t.split("_");z=Gt.length>=2&&Gt[1]=="type"?z+(_t+"="+bt+"&"):z+(_t+"=redacted&")}}}else z=null;else z=M;return"XMLHTTP REQ ("+g+") [attempt "+P+"]: "+a+`
`+c+`
`+z})}function Ul(s,a,c,g,P,M,z){s.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+P+"]: "+a+`
`+c+`
`+M+" "+z})}function Pe(s,a,c,g){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+ql(s,c)+(g?" "+g:"")})}function jl(s,a){s.info(function(){return"TIMEOUT: "+a})}on.prototype.info=function(){};function ql(s,a){if(!s.g)return a;if(!a)return null;try{const M=JSON.parse(a);if(M){for(s=0;s<M.length;s++)if(Array.isArray(M[s])){var c=M[s];if(!(c.length<2)){var g=c[1];if(Array.isArray(g)&&!(g.length<1)){var P=g[0];if(P!="noop"&&P!="stop"&&P!="close")for(let z=1;z<g.length;z++)g[z]=""}}}}return Gr(M)}catch{return a}}var Kn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ii={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ci;function Qr(){}E(Qr,bi),Qr.prototype.g=function(){return new XMLHttpRequest},Ci=new Qr;function an(s){return encodeURIComponent(String(s))}function Hl(s){var a=1;s=s.split(":");const c=[];for(;a>0&&s.length;)c.push(s.shift()),a--;return s.length&&c.push(s.join(":")),c}function ee(s,a,c,g){this.j=s,this.i=a,this.l=c,this.S=g||1,this.V=new en(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ai}function Ai(){this.i=null,this.g="",this.h=!1}var Si={},Yr={};function Xr(s,a,c){s.M=1,s.A=Yn(zt(a)),s.u=c,s.R=!0,ki(s,null)}function ki(s,a){s.F=Date.now(),Qn(s),s.B=zt(s.A);var c=s.B,g=s.S;Array.isArray(g)||(g=[String(g)]),ji(c.i,"t",g),s.C=0,c=s.j.L,s.h=new Ai,s.g=oo(s.j,c?a:null,!s.u),s.P>0&&(s.O=new Ol(f(s.Y,s,s.g),s.P)),a=s.V,c=s.g,g=s.ba;var P="readystatechange";Array.isArray(P)||(P&&(yi[0]=P.toString()),P=yi);for(let M=0;M<P.length;M++){const z=Je(c,P[M],g||a.handleEvent,!1,a.h||a);if(!z)break;a.g[z.key]=z}a=s.J?Q(s.J):{},s.u?(s.v||(s.v="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.B,s.v,s.u,a)):(s.v="GET",s.g.ea(s.B,s.v,null,a)),rn(),Bl(s.i,s.v,s.B,s.l,s.S,s.u)}ee.prototype.ba=function(s){s=s.target;const a=this.O;a&&se(s)==3?a.j():this.Y(s)},ee.prototype.Y=function(s){try{if(s==this.g)t:{const tt=se(this.g),bt=this.g.ya(),lt=this.g.ca();if(!(tt<3)&&(tt!=3||this.g&&(this.h.h||this.g.la()||Qi(this.g)))){this.K||tt!=4||bt==7||(bt==8||lt<=0?rn(3):rn(2)),Jr(this);var a=this.g.ca();this.X=a;var c=zl(this);if(this.o=a==200,Ul(this.i,this.v,this.B,this.l,this.S,tt,a),this.o){if(this.U&&!this.L){e:{if(this.g){var g,P=this.g;if((g=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!d(g)){var M=g;break e}}M=null}if(s=M)Pe(this.i,this.l,s,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Zr(this,s);else{this.o=!1,this.m=3,Mt(12),ge(this),ln(this);break t}}if(this.R){s=!0;let _t;for(;!this.K&&this.C<c.length;)if(_t=Gl(this,c),_t==Yr){tt==4&&(this.m=4,Mt(14),s=!1),Pe(this.i,this.l,null,"[Incomplete Response]");break}else if(_t==Si){this.m=4,Mt(15),Pe(this.i,this.l,c,"[Invalid Chunk]"),s=!1;break}else Pe(this.i,this.l,_t,null),Zr(this,_t);if(Ri(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||c.length!=0||this.h.h||(this.m=1,Mt(16),s=!1),this.o=this.o&&s,!s)Pe(this.i,this.l,c,"[Invalid Chunked Response]"),ge(this),ln(this);else if(c.length>0&&!this.W){this.W=!0;var z=this.j;z.g==this&&z.aa&&!z.P&&(z.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),as(z),z.P=!0,Mt(11))}}else Pe(this.i,this.l,c,null),Zr(this,c);tt==4&&ge(this),this.o&&!this.K&&(tt==4?no(this.j,this):(this.o=!1,Qn(this)))}else oc(this.g),a==400&&c.indexOf("Unknown SID")>0?(this.m=3,Mt(12)):(this.m=0,Mt(13)),ge(this),ln(this)}}}catch{}};function zl(s){if(!Ri(s))return s.g.la();const a=Qi(s.g);if(a==="")return"";let c="";const g=a.length,P=se(s.g)==4;if(!s.h.i){if(typeof TextDecoder>"u")return ge(s),ln(s),"";s.h.i=new l.TextDecoder}for(let M=0;M<g;M++)s.h.h=!0,c+=s.h.i.decode(a[M],{stream:!(P&&M==g-1)});return a.length=0,s.h.g+=c,s.C=0,s.h.g}function Ri(s){return s.g?s.v=="GET"&&s.M!=2&&s.j.Aa:!1}function Gl(s,a){var c=s.C,g=a.indexOf(`
`,c);return g==-1?Yr:(c=Number(a.substring(c,g)),isNaN(c)?Si:(g+=1,g+c>a.length?Yr:(a=a.slice(g,g+c),s.C=g+c,a)))}ee.prototype.cancel=function(){this.K=!0,ge(this)};function Qn(s){s.T=Date.now()+s.H,Pi(s,s.H)}function Pi(s,a){if(s.D!=null)throw Error("WatchDog timer not null");s.D=sn(f(s.aa,s),a)}function Jr(s){s.D&&(l.clearTimeout(s.D),s.D=null)}ee.prototype.aa=function(){this.D=null;const s=Date.now();s-this.T>=0?(jl(this.i,this.B),this.M!=2&&(rn(),Mt(17)),ge(this),this.m=2,ln(this)):Pi(this,this.T-s)};function ln(s){s.j.I==0||s.K||no(s.j,s)}function ge(s){Jr(s);var a=s.O;a&&typeof a.dispose=="function"&&a.dispose(),s.O=null,vi(s.V),s.g&&(a=s.g,s.g=null,a.abort(),a.dispose())}function Zr(s,a){try{var c=s.j;if(c.I!=0&&(c.g==s||ts(c.h,s))){if(!s.L&&ts(c.h,s)&&c.I==3){try{var g=c.Ba.g.parse(a)}catch{g=null}if(Array.isArray(g)&&g.length==3){var P=g;if(P[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<s.F)er(c),Zn(c);else break t;os(c),Mt(18)}}else c.xa=P[1],0<c.xa-c.K&&P[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=sn(f(c.Va,c),6e3));Vi(c.h)<=1&&c.ta&&(c.ta=void 0)}else ve(c,11)}else if((s.L||c.g==s)&&er(c),!d(a))for(P=c.Ba.g.parse(a),a=0;a<P.length;a++){let lt=P[a];const _t=lt[0];if(!(_t<=c.K))if(c.K=_t,lt=lt[1],c.I==2)if(lt[0]=="c"){c.M=lt[1],c.ba=lt[2];const Gt=lt[3];Gt!=null&&(c.ka=Gt,c.j.info("VER="+c.ka));const be=lt[4];be!=null&&(c.za=be,c.j.info("SVER="+c.za));const ie=lt[5];ie!=null&&typeof ie=="number"&&ie>0&&(g=1.5*ie,c.O=g,c.j.info("backChannelRequestTimeoutMs_="+g)),g=c;const oe=s.g;if(oe){const rr=oe.g?oe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(rr){var M=g.h;M.g||rr.indexOf("spdy")==-1&&rr.indexOf("quic")==-1&&rr.indexOf("h2")==-1||(M.j=M.l,M.g=new Set,M.h&&(es(M,M.h),M.h=null))}if(g.G){const ls=oe.g?oe.g.getResponseHeader("X-HTTP-Session-Id"):null;ls&&(g.wa=ls,ut(g.J,g.G,ls))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-s.F,c.j.info("Handshake RTT: "+c.T+"ms")),g=c;var z=s;if(g.na=io(g,g.L?g.ba:null,g.W),z.L){Mi(g.h,z);var tt=z,bt=g.O;bt&&(tt.H=bt),tt.D&&(Jr(tt),Qn(tt)),g.g=z}else to(g);c.i.length>0&&tr(c)}else lt[0]!="stop"&&lt[0]!="close"||ve(c,7);else c.I==3&&(lt[0]=="stop"||lt[0]=="close"?lt[0]=="stop"?ve(c,7):is(c):lt[0]!="noop"&&c.l&&c.l.qa(lt),c.A=0)}}rn(4)}catch{}}var Wl=class{constructor(s,a){this.g=s,this.map=a}};function Li(s){this.l=s||10,l.PerformanceNavigationTiming?(s=l.performance.getEntriesByType("navigation"),s=s.length>0&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Di(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Vi(s){return s.h?1:s.g?s.g.size:0}function ts(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function es(s,a){s.g?s.g.add(a):s.h=a}function Mi(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}Li.prototype.cancel=function(){if(this.i=Ni(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Ni(s){if(s.h!=null)return s.i.concat(s.h.G);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const c of s.g.values())a=a.concat(c.G);return a}return D(s.i)}var Oi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Kl(s,a){if(s){s=s.split("&");for(let c=0;c<s.length;c++){const g=s[c].indexOf("=");let P,M=null;g>=0?(P=s[c].substring(0,g),M=s[c].substring(g+1)):P=s[c],a(P,M?decodeURIComponent(M.replace(/\+/g," ")):"")}}}function ne(s){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let a;s instanceof ne?(this.l=s.l,cn(this,s.j),this.o=s.o,this.g=s.g,un(this,s.u),this.h=s.h,ns(this,qi(s.i)),this.m=s.m):s&&(a=String(s).match(Oi))?(this.l=!1,cn(this,a[1]||"",!0),this.o=dn(a[2]||""),this.g=dn(a[3]||"",!0),un(this,a[4]),this.h=dn(a[5]||"",!0),ns(this,a[6]||"",!0),this.m=dn(a[7]||"")):(this.l=!1,this.i=new pn(null,this.l))}ne.prototype.toString=function(){const s=[];var a=this.j;a&&s.push(hn(a,Fi,!0),":");var c=this.g;return(c||a=="file")&&(s.push("//"),(a=this.o)&&s.push(hn(a,Fi,!0),"@"),s.push(an(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&s.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&s.push("/"),s.push(hn(c,c.charAt(0)=="/"?Xl:Yl,!0))),(c=this.i.toString())&&s.push("?",c),(c=this.m)&&s.push("#",hn(c,Zl)),s.join("")},ne.prototype.resolve=function(s){const a=zt(this);let c=!!s.j;c?cn(a,s.j):c=!!s.o,c?a.o=s.o:c=!!s.g,c?a.g=s.g:c=s.u!=null;var g=s.h;if(c)un(a,s.u);else if(c=!!s.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var P=a.h.lastIndexOf("/");P!=-1&&(g=a.h.slice(0,P+1)+g)}if(P=g,P==".."||P==".")g="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){g=P.lastIndexOf("/",0)==0,P=P.split("/");const M=[];for(let z=0;z<P.length;){const tt=P[z++];tt=="."?g&&z==P.length&&M.push(""):tt==".."?((M.length>1||M.length==1&&M[0]!="")&&M.pop(),g&&z==P.length&&M.push("")):(M.push(tt),g=!0)}g=M.join("/")}else g=P}return c?a.h=g:c=s.i.toString()!=="",c?ns(a,qi(s.i)):c=!!s.m,c&&(a.m=s.m),a};function zt(s){return new ne(s)}function cn(s,a,c){s.j=c?dn(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function un(s,a){if(a){if(a=Number(a),isNaN(a)||a<0)throw Error("Bad port number "+a);s.u=a}else s.u=null}function ns(s,a,c){a instanceof pn?(s.i=a,tc(s.i,s.l)):(c||(a=hn(a,Jl)),s.i=new pn(a,s.l))}function ut(s,a,c){s.i.set(a,c)}function Yn(s){return ut(s,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),s}function dn(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function hn(s,a,c){return typeof s=="string"?(s=encodeURI(s).replace(a,Ql),c&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Ql(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Fi=/[#\/\?@]/g,Yl=/[#\?:]/g,Xl=/[#\?]/g,Jl=/[#\?@]/g,Zl=/#/g;function pn(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function ye(s){s.g||(s.g=new Map,s.h=0,s.i&&Kl(s.i,function(a,c){s.add(decodeURIComponent(a.replace(/\+/g," ")),c)}))}n=pn.prototype,n.add=function(s,a){ye(this),this.i=null,s=Le(this,s);let c=this.g.get(s);return c||this.g.set(s,c=[]),c.push(a),this.h+=1,this};function $i(s,a){ye(s),a=Le(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function Bi(s,a){return ye(s),a=Le(s,a),s.g.has(a)}n.forEach=function(s,a){ye(this),this.g.forEach(function(c,g){c.forEach(function(P){s.call(a,P,g,this)},this)},this)};function Ui(s,a){ye(s);let c=[];if(typeof a=="string")Bi(s,a)&&(c=c.concat(s.g.get(Le(s,a))));else for(s=Array.from(s.g.values()),a=0;a<s.length;a++)c=c.concat(s[a]);return c}n.set=function(s,a){return ye(this),this.i=null,s=Le(this,s),Bi(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},n.get=function(s,a){return s?(s=Ui(this,s),s.length>0?String(s[0]):a):a};function ji(s,a,c){$i(s,a),c.length>0&&(s.i=null,s.g.set(Le(s,a),D(c)),s.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(let g=0;g<a.length;g++){var c=a[g];const P=an(c);c=Ui(this,c);for(let M=0;M<c.length;M++){let z=P;c[M]!==""&&(z+="="+an(c[M])),s.push(z)}}return this.i=s.join("&")};function qi(s){const a=new pn;return a.i=s.i,s.g&&(a.g=new Map(s.g),a.h=s.h),a}function Le(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function tc(s,a){a&&!s.j&&(ye(s),s.i=null,s.g.forEach(function(c,g){const P=g.toLowerCase();g!=P&&($i(this,g),ji(this,P,c))},s)),s.j=a}function ec(s,a){const c=new on;if(l.Image){const g=new Image;g.onload=w(re,c,"TestLoadImage: loaded",!0,a,g),g.onerror=w(re,c,"TestLoadImage: error",!1,a,g),g.onabort=w(re,c,"TestLoadImage: abort",!1,a,g),g.ontimeout=w(re,c,"TestLoadImage: timeout",!1,a,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=s}else a(!1)}function nc(s,a){const c=new on,g=new AbortController,P=setTimeout(()=>{g.abort(),re(c,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:g.signal}).then(M=>{clearTimeout(P),M.ok?re(c,"TestPingServer: ok",!0,a):re(c,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(P),re(c,"TestPingServer: error",!1,a)})}function re(s,a,c,g,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),g(c)}catch{}}function rc(){this.g=new $l}function rs(s){this.i=s.Sb||null,this.h=s.ab||!1}E(rs,bi),rs.prototype.g=function(){return new Xn(this.i,this.h)};function Xn(s,a){St.call(this),this.H=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}E(Xn,St),n=Xn.prototype,n.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=s,this.D=a,this.readyState=1,mn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const a={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};s&&(a.body=s),(this.H||l).fetch(new Request(this.D,a)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,fn(this)),this.readyState=0},n.Pa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,mn(this)),this.g&&(this.readyState=3,mn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Hi(this)}else s.text().then(this.Oa.bind(this),this.ga.bind(this))};function Hi(s){s.j.read().then(s.Ma.bind(s)).catch(s.ga.bind(s))}n.Ma=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.B.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?fn(this):mn(this),this.readyState==3&&Hi(this)}},n.Oa=function(s){this.g&&(this.response=this.responseText=s,fn(this))},n.Na=function(s){this.g&&(this.response=s,fn(this))},n.ga=function(){this.g&&fn(this)};function fn(s){s.readyState=4,s.l=null,s.j=null,s.B=null,mn(s)}n.setRequestHeader=function(s,a){this.A.append(s,a)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var c=a.next();!c.done;)c=c.value,s.push(c[0]+": "+c[1]),c=a.next();return s.join(`\r
`)};function mn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Xn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function zi(s){let a="";return H(s,function(c,g){a+=g,a+=":",a+=c,a+=`\r
`}),a}function ss(s,a,c){t:{for(g in c){var g=!1;break t}g=!0}g||(c=zi(c),typeof s=="string"?c!=null&&an(c):ut(s,a,c))}function pt(s){St.call(this),this.headers=new Map,this.L=s||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}E(pt,St);var sc=/^https?$/i,ic=["POST","PUT"];n=pt.prototype,n.Fa=function(s){this.H=s},n.ea=function(s,a,c,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ci.g(),this.g.onreadystatechange=x(f(this.Ca,this));try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(M){Gi(this,M);return}if(s=c||"",c=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var P in g)c.set(P,g[P]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const M of g.keys())c.set(M,g.get(M));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(c.keys()).find(M=>M.toLowerCase()=="content-type"),P=l.FormData&&s instanceof l.FormData,!(Array.prototype.indexOf.call(ic,a,void 0)>=0)||g||P||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[M,z]of c)this.g.setRequestHeader(M,z);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(s),this.v=!1}catch(M){Gi(this,M)}};function Gi(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.o=5,Wi(s),Jn(s)}function Wi(s){s.A||(s.A=!0,Vt(s,"complete"),Vt(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=s||7,Vt(this,"complete"),Vt(this,"abort"),Jn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Jn(this,!0)),pt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Ki(this):this.Xa())},n.Xa=function(){Ki(this)};function Ki(s){if(s.h&&typeof o<"u"){if(s.v&&se(s)==4)setTimeout(s.Ca.bind(s),0);else if(Vt(s,"readystatechange"),se(s)==4){s.h=!1;try{const M=s.ca();t:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var c;if(!(c=a)){var g;if(g=M===0){let z=String(s.D).match(Oi)[1]||null;!z&&l.self&&l.self.location&&(z=l.self.location.protocol.slice(0,-1)),g=!sc.test(z?z.toLowerCase():"")}c=g}if(c)Vt(s,"complete"),Vt(s,"success");else{s.o=6;try{var P=se(s)>2?s.g.statusText:""}catch{P=""}s.l=P+" ["+s.ca()+"]",Wi(s)}}finally{Jn(s)}}}}function Jn(s,a){if(s.g){s.m&&(clearTimeout(s.m),s.m=null);const c=s.g;s.g=null,a||Vt(s,"ready");try{c.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function se(s){return s.g?s.g.readyState:0}n.ca=function(){try{return se(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),Fl(a)}};function Qi(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.F){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function oc(s){const a={};s=(s.g&&se(s)>=2&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<s.length;g++){if(d(s[g]))continue;var c=Hl(s[g]);const P=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const M=a[P]||[];a[P]=M,M.push(c)}K(a,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function gn(s,a,c){return c&&c.internalChannelParams&&c.internalChannelParams[s]||a}function Yi(s){this.za=0,this.i=[],this.j=new on,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=gn("failFast",!1,s),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=gn("baseRetryDelayMs",5e3,s),this.Za=gn("retryDelaySeedMs",1e4,s),this.Ta=gn("forwardChannelMaxRetries",2,s),this.va=gn("forwardChannelRequestTimeoutMs",2e4,s),this.ma=s&&s.xmlHttpFactory||void 0,this.Ua=s&&s.Rb||void 0,this.Aa=s&&s.useFetchStreams||!1,this.O=void 0,this.L=s&&s.supportsCrossDomainXhr||!1,this.M="",this.h=new Li(s&&s.concurrentRequestLimit),this.Ba=new rc,this.S=s&&s.fastHandshake||!1,this.R=s&&s.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=s&&s.Pb||!1,s&&s.ua&&this.j.ua(),s&&s.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&s&&s.detectBufferingProxy||!1,this.ia=void 0,s&&s.longPollingTimeout&&s.longPollingTimeout>0&&(this.ia=s.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Yi.prototype,n.ka=8,n.I=1,n.connect=function(s,a,c,g){Mt(0),this.W=s,this.H=a||{},c&&g!==void 0&&(this.H.OSID=c,this.H.OAID=g),this.F=this.X,this.J=io(this,null,this.W),tr(this)};function is(s){if(Xi(s),s.I==3){var a=s.V++,c=zt(s.J);if(ut(c,"SID",s.M),ut(c,"RID",a),ut(c,"TYPE","terminate"),yn(s,c),a=new ee(s,s.j,a),a.M=2,a.A=Yn(zt(c)),c=!1,l.navigator&&l.navigator.sendBeacon)try{c=l.navigator.sendBeacon(a.A.toString(),"")}catch{}!c&&l.Image&&(new Image().src=a.A,c=!0),c||(a.g=oo(a.j,null),a.g.ea(a.A)),a.F=Date.now(),Qn(a)}so(s)}function Zn(s){s.g&&(as(s),s.g.cancel(),s.g=null)}function Xi(s){Zn(s),s.v&&(l.clearTimeout(s.v),s.v=null),er(s),s.h.cancel(),s.m&&(typeof s.m=="number"&&l.clearTimeout(s.m),s.m=null)}function tr(s){if(!Di(s.h)&&!s.m){s.m=!0;var a=s.Ea;$||p(),F||($(),F=!0),m.add(a,s),s.D=0}}function ac(s,a){return Vi(s.h)>=s.h.j-(s.m?1:0)?!1:s.m?(s.i=a.G.concat(s.i),!0):s.I==1||s.I==2||s.D>=(s.Sa?0:s.Ta)?!1:(s.m=sn(f(s.Ea,s,a),ro(s,s.D)),s.D++,!0)}n.Ea=function(s){if(this.m)if(this.m=null,this.I==1){if(!s){this.V=Math.floor(Math.random()*1e5),s=this.V++;const P=new ee(this,this.j,s);let M=this.o;if(this.U&&(M?(M=Q(M),rt(M,this.U)):M=this.U),this.u!==null||this.R||(P.J=M,M=null),this.S)t:{for(var a=0,c=0;c<this.i.length;c++){e:{var g=this.i[c];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(a+=g,a>4096){a=c;break t}if(a===4096||c===this.i.length-1){a=c+1;break t}}a=1e3}else a=1e3;a=Zi(this,P,a),c=zt(this.J),ut(c,"RID",s),ut(c,"CVER",22),this.G&&ut(c,"X-HTTP-Session-Id",this.G),yn(this,c),M&&(this.R?a="headers="+an(zi(M))+"&"+a:this.u&&ss(c,this.u,M)),es(this.h,P),this.Ra&&ut(c,"TYPE","init"),this.S?(ut(c,"$req",a),ut(c,"SID","null"),P.U=!0,Xr(P,c,null)):Xr(P,c,a),this.I=2}}else this.I==3&&(s?Ji(this,s):this.i.length==0||Di(this.h)||Ji(this))};function Ji(s,a){var c;a?c=a.l:c=s.V++;const g=zt(s.J);ut(g,"SID",s.M),ut(g,"RID",c),ut(g,"AID",s.K),yn(s,g),s.u&&s.o&&ss(g,s.u,s.o),c=new ee(s,s.j,c,s.D+1),s.u===null&&(c.J=s.o),a&&(s.i=a.G.concat(s.i)),a=Zi(s,c,1e3),c.H=Math.round(s.va*.5)+Math.round(s.va*.5*Math.random()),es(s.h,c),Xr(c,g,a)}function yn(s,a){s.H&&H(s.H,function(c,g){ut(a,g,c)}),s.l&&H({},function(c,g){ut(a,g,c)})}function Zi(s,a,c){c=Math.min(s.i.length,c);const g=s.l?f(s.l.Ka,s.l,s):null;t:{var P=s.i;let tt=-1;for(;;){const bt=["count="+c];tt==-1?c>0?(tt=P[0].g,bt.push("ofs="+tt)):tt=0:bt.push("ofs="+tt);let lt=!0;for(let _t=0;_t<c;_t++){var M=P[_t].g;const Gt=P[_t].map;if(M-=tt,M<0)tt=Math.max(0,P[_t].g-100),lt=!1;else try{M="req"+M+"_"||"";try{var z=Gt instanceof Map?Gt:Object.entries(Gt);for(const[be,ie]of z){let oe=ie;u(ie)&&(oe=Gr(ie)),bt.push(M+be+"="+encodeURIComponent(oe))}}catch(be){throw bt.push(M+"type="+encodeURIComponent("_badmap")),be}}catch{g&&g(Gt)}}if(lt){z=bt.join("&");break t}}z=void 0}return s=s.i.splice(0,c),a.G=s,z}function to(s){if(!s.g&&!s.v){s.Y=1;var a=s.Da;$||p(),F||($(),F=!0),m.add(a,s),s.A=0}}function os(s){return s.g||s.v||s.A>=3?!1:(s.Y++,s.v=sn(f(s.Da,s),ro(s,s.A)),s.A++,!0)}n.Da=function(){if(this.v=null,eo(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var s=4*this.T;this.j.info("BP detection timer enabled: "+s),this.B=sn(f(this.Wa,this),s)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Mt(10),Zn(this),eo(this))};function as(s){s.B!=null&&(l.clearTimeout(s.B),s.B=null)}function eo(s){s.g=new ee(s,s.j,"rpc",s.Y),s.u===null&&(s.g.J=s.o),s.g.P=0;var a=zt(s.na);ut(a,"RID","rpc"),ut(a,"SID",s.M),ut(a,"AID",s.K),ut(a,"CI",s.F?"0":"1"),!s.F&&s.ia&&ut(a,"TO",s.ia),ut(a,"TYPE","xmlhttp"),yn(s,a),s.u&&s.o&&ss(a,s.u,s.o),s.O&&(s.g.H=s.O);var c=s.g;s=s.ba,c.M=1,c.A=Yn(zt(a)),c.u=null,c.R=!0,ki(c,s)}n.Va=function(){this.C!=null&&(this.C=null,Zn(this),os(this),Mt(19))};function er(s){s.C!=null&&(l.clearTimeout(s.C),s.C=null)}function no(s,a){var c=null;if(s.g==a){er(s),as(s),s.g=null;var g=2}else if(ts(s.h,a))c=a.G,Mi(s.h,a),g=1;else return;if(s.I!=0){if(a.o)if(g==1){c=a.u?a.u.length:0,a=Date.now()-a.F;var P=s.D;g=Wn(),Vt(g,new Ti(g,c)),tr(s)}else to(s);else if(P=a.m,P==3||P==0&&a.X>0||!(g==1&&ac(s,a)||g==2&&os(s)))switch(c&&c.length>0&&(a=s.h,a.i=a.i.concat(c)),P){case 1:ve(s,5);break;case 4:ve(s,10);break;case 3:ve(s,6);break;default:ve(s,2)}}}function ro(s,a){let c=s.Qa+Math.floor(Math.random()*s.Za);return s.isActive()||(c*=2),c*a}function ve(s,a){if(s.j.info("Error code "+a),a==2){var c=f(s.bb,s),g=s.Ua;const P=!g;g=new ne(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||cn(g,"https"),Yn(g),P?ec(g.toString(),c):nc(g.toString(),c)}else Mt(2);s.I=0,s.l&&s.l.pa(a),so(s),Xi(s)}n.bb=function(s){s?(this.j.info("Successfully pinged google.com"),Mt(2)):(this.j.info("Failed to ping google.com"),Mt(1))};function so(s){if(s.I=0,s.ja=[],s.l){const a=Ni(s.h);(a.length!=0||s.i.length!=0)&&(L(s.ja,a),L(s.ja,s.i),s.h.i.length=0,D(s.i),s.i.length=0),s.l.oa()}}function io(s,a,c){var g=c instanceof ne?zt(c):new ne(c);if(g.g!="")a&&(g.g=a+"."+g.g),un(g,g.u);else{var P=l.location;g=P.protocol,a=a?a+"."+P.hostname:P.hostname,P=+P.port;const M=new ne(null);g&&cn(M,g),a&&(M.g=a),P&&un(M,P),c&&(M.h=c),g=M}return c=s.G,a=s.wa,c&&a&&ut(g,c,a),ut(g,"VER",s.ka),yn(s,g),g}function oo(s,a,c){if(a&&!s.L)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Aa&&!s.ma?new pt(new rs({ab:c})):new pt(s.ma),a.Fa(s.L),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ao(){}n=ao.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function nr(){}nr.prototype.g=function(s,a){return new Ft(s,a)};function Ft(s,a){St.call(this),this.g=new Yi(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.sa&&(s?s["X-WebChannel-Client-Profile"]=a.sa:s={"X-WebChannel-Client-Profile":a.sa}),this.g.U=s,(s=a&&a.Qb)&&!d(s)&&(this.g.u=s),this.A=a&&a.supportsCrossDomainXhr||!1,this.v=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!d(a)&&(this.g.G=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new De(this)}E(Ft,St),Ft.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ft.prototype.close=function(){is(this.g)},Ft.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var c={};c.__data__=s,s=c}else this.v&&(c={},c.__data__=Gr(s),s=c);a.i.push(new Wl(a.Ya++,s)),a.I==3&&tr(a)},Ft.prototype.N=function(){this.g.l=null,delete this.j,is(this.g),delete this.g,Ft.Z.N.call(this)};function lo(s){Wr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){t:{for(const c in a){s=c;break t}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}E(lo,Wr);function co(){Kr.call(this),this.status=1}E(co,Kr);function De(s){this.g=s}E(De,ao),De.prototype.ra=function(){Vt(this.g,"a")},De.prototype.qa=function(s){Vt(this.g,new lo(s))},De.prototype.pa=function(s){Vt(this.g,new co)},De.prototype.oa=function(){Vt(this.g,"b")},nr.prototype.createWebChannel=nr.prototype.g,Ft.prototype.send=Ft.prototype.o,Ft.prototype.open=Ft.prototype.m,Ft.prototype.close=Ft.prototype.close,Da=function(){return new nr},La=function(){return Wn()},Pa=me,Ts={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Kn.NO_ERROR=0,Kn.TIMEOUT=8,Kn.HTTP_ERROR=6,pr=Kn,Ii.COMPLETE="complete",Ra=Ii,_i.EventType=nn,nn.OPEN="a",nn.CLOSE="b",nn.ERROR="c",nn.MESSAGE="d",St.prototype.listen=St.prototype.J,xn=_i,pt.prototype.listenOnce=pt.prototype.K,pt.prototype.getLastError=pt.prototype.Ha,pt.prototype.getLastErrorCode=pt.prototype.ya,pt.prototype.getStatus=pt.prototype.ca,pt.prototype.getResponseJson=pt.prototype.La,pt.prototype.getResponseText=pt.prototype.la,pt.prototype.send=pt.prototype.ea,pt.prototype.setWithCredentials=pt.prototype.Fa,ka=pt}).apply(typeof or<"u"?or:typeof self<"u"?self:typeof window<"u"?window:{});class Rt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Rt.UNAUTHENTICATED=new Rt(null),Rt.GOOGLE_CREDENTIALS=new Rt("google-credentials-uid"),Rt.FIRST_PARTY=new Rt("first-party-uid"),Rt.MOCK_USER=new Rt("mock-user");let Ye="12.8.0";function ud(n){Ye=n}const Ie=new Ea("@firebase/firestore");function Me(){return Ie.logLevel}function Y(n,...t){if(Ie.logLevel<=it.DEBUG){const e=t.map(Hs);Ie.debug(`Firestore (${Ye}): ${n}`,...e)}}function Ce(n,...t){if(Ie.logLevel<=it.ERROR){const e=t.map(Hs);Ie.error(`Firestore (${Ye}): ${n}`,...e)}}function Mr(n,...t){if(Ie.logLevel<=it.WARN){const e=t.map(Hs);Ie.warn(`Firestore (${Ye}): ${n}`,...e)}}function Hs(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}function nt(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Va(n,r,e)}function Va(n,t,e){let r=`FIRESTORE (${Ye}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Ce(r),new Error(r)}function ft(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||Va(t,i,r)}function ct(n,t){return n}const q={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class J extends Qe{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}class Ee{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}class Ma{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class dd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Rt.UNAUTHENTICATED)))}shutdown(){}}class hd{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class pd{constructor(t){this.t=t,this.currentUser=Rt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){ft(this.o===void 0,42304);let r=this.i;const i=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new Ee;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Ee,t.enqueueRetryable((()=>i(this.currentUser)))};const l=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await i(this.currentUser)}))},u=h=>{Y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit((h=>u(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(Y("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Ee)}}),0),l()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(Y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ft(typeof r.accessToken=="string",31837,{l:r}),new Ma(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return ft(t===null||typeof t=="string",2055,{h:t}),new Rt(t)}}class fd{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Rt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class md{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new fd(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Rt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class To{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class gd{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Wu(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){ft(this.o===void 0,3512);const r=o=>{o.error!=null&&Y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.m;return this.m=o.token,Y("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>r(o)))};const i=o=>{Y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>i(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?i(o):Y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new To(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(ft(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new To(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function yd(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}class zs{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=yd(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<e&&(r+=t.charAt(i[o]%62))}return r}}function ot(n,t){return n<t?-1:n>t?1:0}function Is(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const i=n.charAt(r),o=t.charAt(r);if(i!==o)return ps(i)===ps(o)?ot(i,o):ps(i)?1:-1}return ot(n.length,t.length)}const vd=55296,bd=57343;function ps(n){const t=n.charCodeAt(0);return t>=vd&&t<=bd}function qe(n,t,e){return n.length===t.length&&n.every(((r,i)=>e(r,t[i])))}const Io="__name__";class Wt{constructor(t,e,r){e===void 0?e=0:e>t.length&&nt(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&nt(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Wt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Wt?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let i=0;i<r;i++){const o=Wt.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return ot(t.length,e.length)}static compareSegments(t,e){const r=Wt.isNumericId(t),i=Wt.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?Wt.extractNumericId(t).compare(Wt.extractNumericId(e)):Is(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return qs.fromString(t.substring(4,t.length-2))}}class mt extends Wt{construct(t,e,r){return new mt(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new J(q.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((i=>i.length>0)))}return new mt(e)}static emptyPath(){return new mt([])}}const _d=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ct extends Wt{construct(t,e,r){return new Ct(t,e,r)}static isValidIdentifier(t){return _d.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ct.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Io}static keyField(){return new Ct([Io])}static fromServerFormat(t){const e=[];let r="",i=0;const o=()=>{if(r.length===0)throw new J(q.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let l=!1;for(;i<t.length;){const u=t[i];if(u==="\\"){if(i+1===t.length)throw new J(q.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new J(q.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,i+=2}else u==="`"?(l=!l,i++):u!=="."||l?(r+=u,i++):(o(),i++)}if(o(),l)throw new J(q.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Ct(e)}static emptyPath(){return new Ct([])}}class et{constructor(t){this.path=t}static fromPath(t){return new et(mt.fromString(t))}static fromName(t){return new et(mt.fromString(t).popFirst(5))}static empty(){return new et(mt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&mt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return mt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new et(new mt(t.slice()))}}function xd(n,t,e){if(!e)throw new J(q.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function wd(n,t,e,r){if(t===!0&&r===!0)throw new J(q.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Co(n){if(!et.isDocumentKey(n))throw new J(q.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Na(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Gs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":nt(12329,{type:typeof n})}function Cs(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new J(q.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Gs(n);throw new J(q.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function vt(n,t){const e={typeString:n};return t&&(e.value=t),e}function $n(n,t){if(!Na(n))throw new J(q.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const i=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const l=n[r];if(i&&typeof l!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&l!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new J(q.INVALID_ARGUMENT,e);return!0}const Ao=-62135596800,So=1e6;class ht{static now(){return ht.fromMillis(Date.now())}static fromDate(t){return ht.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*So);return new ht(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new J(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new J(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Ao)throw new J(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new J(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/So}_compareTo(t){return this.seconds===t.seconds?ot(this.nanoseconds,t.nanoseconds):ot(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ht._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if($n(t,ht._jsonSchema))return new ht(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Ao;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ht._jsonSchemaVersion="firestore/timestamp/1.0",ht._jsonSchema={type:vt("string",ht._jsonSchemaVersion),seconds:vt("number"),nanoseconds:vt("number")};class dt{static fromTimestamp(t){return new dt(t)}static min(){return new dt(new ht(0,0))}static max(){return new dt(new ht(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}const Pn=-1;function Ed(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=dt.fromTimestamp(r===1e9?new ht(e+1,0):new ht(e,r));return new ue(i,et.empty(),t)}function Td(n){return new ue(n.readTime,n.key,Pn)}class ue{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new ue(dt.min(),et.empty(),Pn)}static max(){return new ue(dt.max(),et.empty(),Pn)}}function Id(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=et.comparator(n.documentKey,t.documentKey),e!==0?e:ot(n.largestBatchId,t.largestBatchId))}const Cd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ad{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}async function Ws(n){if(n.code!==q.FAILED_PRECONDITION||n.message!==Cd)throw n;Y("LocalStore","Unexpectedly lost primary lease")}class j{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&nt(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new j(((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,i)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof j?e:j.resolve(e)}catch(e){return j.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):j.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):j.reject(e)}static resolve(t){return new j(((e,r)=>{e(t)}))}static reject(t){return new j(((e,r)=>{r(t)}))}static waitFor(t){return new j(((e,r)=>{let i=0,o=0,l=!1;t.forEach((u=>{++i,u.next((()=>{++o,l&&o===i&&e()}),(h=>r(h)))})),l=!0,o===i&&e()}))}static or(t){let e=j.resolve(!1);for(const r of t)e=e.next((i=>i?j.resolve(i):r()));return e}static forEach(t,e){const r=[];return t.forEach(((i,o)=>{r.push(e.call(this,i,o))})),this.waitFor(r)}static mapArray(t,e){return new j(((r,i)=>{const o=t.length,l=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next((w=>{l[f]=w,++u,u===o&&r(l)}),(w=>i(w)))}}))}static doWhile(t,e){return new j(((r,i)=>{const o=()=>{t()===!0?e().next((()=>{o()}),i):r()};o()}))}}function Sd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Bn(n){return n.name==="IndexedDbTransactionError"}class Ks{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ks.ce=-1;const Qs=-1;function Ys(n){return n==null}function Er(n){return n===0&&1/n==-1/0}function kd(n){return typeof n=="number"&&Number.isInteger(n)&&!Er(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}const Oa="";function Rd(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ko(t)),t=Pd(n.get(e),t);return ko(t)}function Pd(n,t){let e=t;const r=n.length;for(let i=0;i<r;i++){const o=n.charAt(i);switch(o){case"\0":e+="";break;case Oa:e+="";break;default:e+=o}}return e}function ko(n){return n+Oa+""}function Ro(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Xe(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Fa(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}class Ot{constructor(t,e){this.comparator=t,this.root=e||Et.EMPTY}insert(t,e){return new Ot(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Et.BLACK,null,null))}remove(t){return new Ot(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Et.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ar(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ar(this.root,t,this.comparator,!1)}getReverseIterator(){return new ar(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ar(this.root,t,this.comparator,!0)}}class ar{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Et{constructor(t,e,r,i,o){this.key=t,this.value=e,this.color=r??Et.RED,this.left=i??Et.EMPTY,this.right=o??Et.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,o){return new Et(t??this.key,e??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this;const o=r(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,r),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Et.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return Et.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Et.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw nt(43730,{key:this.key,value:this.value});if(this.right.isRed())throw nt(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw nt(27949);return t+(this.isRed()?0:1)}}Et.EMPTY=null,Et.RED=!0,Et.BLACK=!1;Et.EMPTY=new class{constructor(){this.size=0}get key(){throw nt(57766)}get value(){throw nt(16141)}get color(){throw nt(16727)}get left(){throw nt(29726)}get right(){throw nt(36894)}copy(t,e,r,i,o){return this}insert(t,e,r){return new Et(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};class At{constructor(t){this.comparator=t,this.data=new Ot(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Po(this.data.getIterator())}getIteratorFrom(t){return new Po(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof At)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new At(this.comparator);return e.data=t,e}}class Po{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}class Ht{constructor(t){this.fields=t,t.sort(Ct.comparator)}static empty(){return new Ht([])}unionWith(t){let e=new At(Ct.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Ht(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return qe(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}class Ld extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}class Qt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Ld("Invalid base64 string: "+o):o}})(t);return new Qt(e)}static fromUint8Array(t){const e=(function(i){let o="";for(let l=0;l<i.length;++l)o+=String.fromCharCode(i[l]);return o})(t);return new Qt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return ot(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Qt.EMPTY_BYTE_STRING=new Qt("");const Dd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ae(n){if(ft(!!n,39018),typeof n=="string"){let t=0;const e=Dd.exec(n);if(ft(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Tt(n.seconds),nanos:Tt(n.nanos)}}function Tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function He(n){return typeof n=="string"?Qt.fromBase64String(n):Qt.fromUint8Array(n)}const $a="server_timestamp",Ba="__type__",Ua="__previous_value__",ja="__local_write_time__";function Xs(n){return(n?.mapValue?.fields||{})[Ba]?.stringValue===$a}function Js(n){const t=n.mapValue.fields[Ua];return Xs(t)?Js(t):t}function Tr(n){const t=Ae(n.mapValue.fields[ja].timestampValue);return new ht(t.seconds,t.nanos)}class Vd{constructor(t,e,r,i,o,l,u,h,f,w,E){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=w,this.apiKey=E}}const Ir="(default)";class Cr{constructor(t,e){this.projectId=t,this.database=e||Ir}static empty(){return new Cr("","")}get isDefaultDatabase(){return this.database===Ir}isEqual(t){return t instanceof Cr&&t.projectId===this.projectId&&t.database===this.database}}function Md(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new J(q.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Cr(n.options.projectId,t)}const qa="__type__",Nd="__max__",lr={mapValue:{}},Ha="__vector__",As="value";function Se(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Xs(n)?4:Fd(n)?9007199254740991:Od(n)?10:11:nt(28295,{value:n})}function Yt(n,t){if(n===t)return!0;const e=Se(n);if(e!==Se(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Tr(n).isEqual(Tr(t));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const l=Ae(i.timestampValue),u=Ae(o.timestampValue);return l.seconds===u.seconds&&l.nanos===u.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(i,o){return He(i.bytesValue).isEqual(He(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(i,o){return Tt(i.geoPointValue.latitude)===Tt(o.geoPointValue.latitude)&&Tt(i.geoPointValue.longitude)===Tt(o.geoPointValue.longitude)})(n,t);case 2:return(function(i,o){if("integerValue"in i&&"integerValue"in o)return Tt(i.integerValue)===Tt(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const l=Tt(i.doubleValue),u=Tt(o.doubleValue);return l===u?Er(l)===Er(u):isNaN(l)&&isNaN(u)}return!1})(n,t);case 9:return qe(n.arrayValue.values||[],t.arrayValue.values||[],Yt);case 10:case 11:return(function(i,o){const l=i.mapValue.fields||{},u=o.mapValue.fields||{};if(Ro(l)!==Ro(u))return!1;for(const h in l)if(l.hasOwnProperty(h)&&(u[h]===void 0||!Yt(l[h],u[h])))return!1;return!0})(n,t);default:return nt(52216,{left:n})}}function Ln(n,t){return(n.values||[]).find((e=>Yt(e,t)))!==void 0}function ze(n,t){if(n===t)return 0;const e=Se(n),r=Se(t);if(e!==r)return ot(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return ot(n.booleanValue,t.booleanValue);case 2:return(function(o,l){const u=Tt(o.integerValue||o.doubleValue),h=Tt(l.integerValue||l.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(n,t);case 3:return Lo(n.timestampValue,t.timestampValue);case 4:return Lo(Tr(n),Tr(t));case 5:return Is(n.stringValue,t.stringValue);case 6:return(function(o,l){const u=He(o),h=He(l);return u.compareTo(h)})(n.bytesValue,t.bytesValue);case 7:return(function(o,l){const u=o.split("/"),h=l.split("/");for(let f=0;f<u.length&&f<h.length;f++){const w=ot(u[f],h[f]);if(w!==0)return w}return ot(u.length,h.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,l){const u=ot(Tt(o.latitude),Tt(l.latitude));return u!==0?u:ot(Tt(o.longitude),Tt(l.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Do(n.arrayValue,t.arrayValue);case 10:return(function(o,l){const u=o.fields||{},h=l.fields||{},f=u[As]?.arrayValue,w=h[As]?.arrayValue,E=ot(f?.values?.length||0,w?.values?.length||0);return E!==0?E:Do(f,w)})(n.mapValue,t.mapValue);case 11:return(function(o,l){if(o===lr.mapValue&&l===lr.mapValue)return 0;if(o===lr.mapValue)return 1;if(l===lr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=l.fields||{},w=Object.keys(f);h.sort(),w.sort();for(let E=0;E<h.length&&E<w.length;++E){const x=Is(h[E],w[E]);if(x!==0)return x;const D=ze(u[h[E]],f[w[E]]);if(D!==0)return D}return ot(h.length,w.length)})(n.mapValue,t.mapValue);default:throw nt(23264,{he:e})}}function Lo(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return ot(n,t);const e=Ae(n),r=Ae(t),i=ot(e.seconds,r.seconds);return i!==0?i:ot(e.nanos,r.nanos)}function Do(n,t){const e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){const o=ze(e[i],r[i]);if(o)return o}return ot(e.length,r.length)}function Ge(n){return Ss(n)}function Ss(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=Ae(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return He(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return et.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",i=!0;for(const o of e.values||[])i?i=!1:r+=",",r+=Ss(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const l of r)o?o=!1:i+=",",i+=`${l}:${Ss(e.fields[l])}`;return i+"}"})(n.mapValue):nt(61005,{value:n})}function fr(n){switch(Se(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Js(n);return t?16+fr(t):16;case 5:return 2*n.stringValue.length;case 6:return He(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,o)=>i+fr(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return Xe(r.fields,((o,l)=>{i+=o.length+fr(l)})),i})(n.mapValue);default:throw nt(13486,{value:n})}}function ks(n){return!!n&&"integerValue"in n}function Zs(n){return!!n&&"arrayValue"in n}function mr(n){return!!n&&"mapValue"in n}function Od(n){return(n?.mapValue?.fields||{})[qa]?.stringValue===Ha}function En(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return Xe(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=En(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=En(n.arrayValue.values[e]);return t}return{...n}}function Fd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Nd}class jt{constructor(t){this.value=t}static empty(){return new jt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!mr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=En(e)}setAll(t){let e=Ct.emptyPath(),r={},i=[];t.forEach(((l,u)=>{if(!e.isImmediateParentOf(u)){const h=this.getFieldsMap(e);this.applyChanges(h,r,i),r={},i=[],e=u.popLast()}l?r[u.lastSegment()]=En(l):i.push(u.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,r,i)}delete(t){const e=this.field(t.popLast());mr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Yt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];mr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){Xe(e,((i,o)=>t[i]=o));for(const i of r)delete t[i]}clone(){return new jt(En(this.value))}}function za(n){const t=[];return Xe(n.fields,((e,r)=>{const i=new Ct([e]);if(mr(r)){const o=za(r.mapValue).fields;if(o.length===0)t.push(i);else for(const l of o)t.push(i.child(l))}else t.push(i)})),new Ht(t)}class Ut{constructor(t,e,r,i,o,l,u){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=o,this.data=l,this.documentState=u}static newInvalidDocument(t){return new Ut(t,0,dt.min(),dt.min(),dt.min(),jt.empty(),0)}static newFoundDocument(t,e,r,i){return new Ut(t,1,e,dt.min(),r,i,0)}static newNoDocument(t,e){return new Ut(t,2,e,dt.min(),dt.min(),jt.empty(),0)}static newUnknownDocument(t,e){return new Ut(t,3,e,dt.min(),dt.min(),jt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(dt.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=jt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=jt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=dt.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Ut&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}class Ar{constructor(t,e){this.position=t,this.inclusive=e}}function Vo(n,t,e){let r=0;for(let i=0;i<n.position.length;i++){const o=t[i],l=n.position[i];if(o.field.isKeyField()?r=et.comparator(et.fromName(l.referenceValue),e.key):r=ze(l,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Mo(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Yt(n.position[e],t.position[e]))return!1;return!0}class Sr{constructor(t,e="asc"){this.field=t,this.dir=e}}function $d(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}class Ga{}class wt extends Ga{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Ud(t,e,r):e==="array-contains"?new Hd(t,r):e==="in"?new zd(t,r):e==="not-in"?new Gd(t,r):e==="array-contains-any"?new Wd(t,r):new wt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new jd(t,r):new qd(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(ze(e,this.value)):e!==null&&Se(this.value)===Se(e)&&this.matchesComparison(ze(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return nt(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class de extends Ga{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new de(t,e)}matches(t){return Wa(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Wa(n){return n.op==="and"}function Ka(n){return Bd(n)&&Wa(n)}function Bd(n){for(const t of n.filters)if(t instanceof de)return!1;return!0}function Rs(n){if(n instanceof wt)return n.field.canonicalString()+n.op.toString()+Ge(n.value);if(Ka(n))return n.filters.map((t=>Rs(t))).join(",");{const t=n.filters.map((e=>Rs(e))).join(",");return`${n.op}(${t})`}}function Qa(n,t){return n instanceof wt?(function(r,i){return i instanceof wt&&r.op===i.op&&r.field.isEqual(i.field)&&Yt(r.value,i.value)})(n,t):n instanceof de?(function(r,i){return i instanceof de&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((o,l,u)=>o&&Qa(l,i.filters[u])),!0):!1})(n,t):void nt(19439)}function Ya(n){return n instanceof wt?(function(e){return`${e.field.canonicalString()} ${e.op} ${Ge(e.value)}`})(n):n instanceof de?(function(e){return e.op.toString()+" {"+e.getFilters().map(Ya).join(" ,")+"}"})(n):"Filter"}class Ud extends wt{constructor(t,e,r){super(t,e,r),this.key=et.fromName(r.referenceValue)}matches(t){const e=et.comparator(t.key,this.key);return this.matchesComparison(e)}}class jd extends wt{constructor(t,e){super(t,"in",e),this.keys=Xa("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class qd extends wt{constructor(t,e){super(t,"not-in",e),this.keys=Xa("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Xa(n,t){return(t.arrayValue?.values||[]).map((e=>et.fromName(e.referenceValue)))}class Hd extends wt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Zs(e)&&Ln(e.arrayValue,this.value)}}class zd extends wt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Ln(this.value.arrayValue,e)}}class Gd extends wt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Ln(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Ln(this.value.arrayValue,e)}}class Wd extends wt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Zs(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Ln(this.value.arrayValue,r)))}}class Kd{constructor(t,e=null,r=[],i=[],o=null,l=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=l,this.endAt=u,this.Te=null}}function No(n,t=null,e=[],r=[],i=null,o=null,l=null){return new Kd(n,t,e,r,i,o,l)}function ti(n){const t=ct(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>Rs(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),Ys(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>Ge(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>Ge(r))).join(",")),t.Te=e}return t.Te}function ei(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!$d(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Qa(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Mo(n.startAt,t.startAt)&&Mo(n.endAt,t.endAt)}class Nr{constructor(t,e=null,r=[],i=[],o=null,l="F",u=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=l,this.startAt=u,this.endAt=h,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Qd(n,t,e,r,i,o,l,u){return new Nr(n,t,e,r,i,o,l,u)}function Yd(n){return new Nr(n)}function Oo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Xd(n){return et.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Jd(n){return n.collectionGroup!==null}function Tn(n){const t=ct(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(l){let u=new At(Ct.comparator);return l.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(u=u.add(f.field))}))})),u})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new Sr(o,r))})),e.has(Ct.keyField().canonicalString())||t.Ie.push(new Sr(Ct.keyField(),r))}return t.Ie}function Te(n){const t=ct(n);return t.Ee||(t.Ee=Zd(t,Tn(n))),t.Ee}function Zd(n,t){if(n.limitType==="F")return No(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((i=>{const o=i.dir==="desc"?"asc":"desc";return new Sr(i.field,o)}));const e=n.endAt?new Ar(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ar(n.startAt.position,n.startAt.inclusive):null;return No(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ps(n,t,e){return new Nr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Ja(n,t){return ei(Te(n),Te(t))&&n.limitType===t.limitType}function Za(n){return`${ti(Te(n))}|lt:${n.limitType}`}function bn(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((i=>Ya(i))).join(", ")}]`),Ys(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((i=>(function(l){return`${l.field.canonicalString()} (${l.dir})`})(i))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((i=>Ge(i))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((i=>Ge(i))).join(",")),`Target(${r})`})(Te(n))}; limitType=${n.limitType})`}function ni(n,t){return t.isFoundDocument()&&(function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):et.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,t)&&(function(r,i){for(const o of Tn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0})(n,t)&&(function(r,i){return!(r.startAt&&!(function(l,u,h){const f=Vo(l,u,h);return l.inclusive?f<=0:f<0})(r.startAt,Tn(r),i)||r.endAt&&!(function(l,u,h){const f=Vo(l,u,h);return l.inclusive?f>=0:f>0})(r.endAt,Tn(r),i))})(n,t)}function th(n){return(t,e)=>{let r=!1;for(const i of Tn(n)){const o=eh(i,t,e);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function eh(n,t,e){const r=n.field.isKeyField()?et.comparator(t.key,e.key):(function(o,l,u){const h=l.data.field(o),f=u.data.field(o);return h!==null&&f!==null?ze(h,f):nt(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return nt(19790,{direction:n.dir})}}class ke{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),i=this.inner[r];if(i===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return r.length===1?delete this.inner[e]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(t){Xe(this.inner,((e,r)=>{for(const[i,o]of r)t(i,o)}))}isEmpty(){return Fa(this.inner)}size(){return this.innerSize}}const nh=new Ot(et.comparator);function kr(){return nh}const tl=new Ot(et.comparator);function cr(...n){let t=tl;for(const e of n)t=t.insert(e.key,e);return t}function el(n){let t=tl;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function we(){return In()}function nl(){return In()}function In(){return new ke((n=>n.toString()),((n,t)=>n.isEqual(t)))}const rh=new Ot(et.comparator),sh=new At(et.comparator);function Lt(...n){let t=sh;for(const e of n)t=t.add(e);return t}const ih=new At(ot);function oh(){return ih}function ri(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Er(t)?"-0":t}}function rl(n){return{integerValue:""+n}}function ah(n,t){return kd(t)?rl(t):ri(n,t)}class Or{constructor(){this._=void 0}}function lh(n,t,e){return n instanceof Dn?(function(i,o){const l={fields:{[Ba]:{stringValue:$a},[ja]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Xs(o)&&(o=Js(o)),o&&(l.fields[Ua]=o),{mapValue:l}})(e,t):n instanceof Vn?il(n,t):n instanceof Mn?ol(n,t):(function(i,o){const l=sl(i,o),u=Fo(l)+Fo(i.Ae);return ks(l)&&ks(i.Ae)?rl(u):ri(i.serializer,u)})(n,t)}function ch(n,t,e){return n instanceof Vn?il(n,t):n instanceof Mn?ol(n,t):e}function sl(n,t){return n instanceof Rr?(function(r){return ks(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(t)?t:{integerValue:0}:null}class Dn extends Or{}class Vn extends Or{constructor(t){super(),this.elements=t}}function il(n,t){const e=al(t);for(const r of n.elements)e.some((i=>Yt(i,r)))||e.push(r);return{arrayValue:{values:e}}}class Mn extends Or{constructor(t){super(),this.elements=t}}function ol(n,t){let e=al(t);for(const r of n.elements)e=e.filter((i=>!Yt(i,r)));return{arrayValue:{values:e}}}class Rr extends Or{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Fo(n){return Tt(n.integerValue||n.doubleValue)}function al(n){return Zs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}class uh{constructor(t,e){this.field=t,this.transform=e}}function dh(n,t){return n.field.isEqual(t.field)&&(function(r,i){return r instanceof Vn&&i instanceof Vn||r instanceof Mn&&i instanceof Mn?qe(r.elements,i.elements,Yt):r instanceof Rr&&i instanceof Rr?Yt(r.Ae,i.Ae):r instanceof Dn&&i instanceof Dn})(n.transform,t.transform)}class hh{constructor(t,e){this.version=t,this.transformResults=e}}class Jt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Jt}static exists(t){return new Jt(void 0,t)}static updateTime(t){return new Jt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function gr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Fr{}function ll(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ul(n.key,Jt.none()):new Un(n.key,n.data,Jt.none());{const e=n.data,r=jt.empty();let i=new At(Ct.comparator);for(let o of t.fields)if(!i.has(o)){let l=e.field(o);l===null&&o.length>1&&(o=o.popLast(),l=e.field(o)),l===null?r.delete(o):r.set(o,l),i=i.add(o)}return new Re(n.key,r,new Ht(i.toArray()),Jt.none())}}function ph(n,t,e){n instanceof Un?(function(i,o,l){const u=i.value.clone(),h=Bo(i.fieldTransforms,o,l.transformResults);u.setAll(h),o.convertToFoundDocument(l.version,u).setHasCommittedMutations()})(n,t,e):n instanceof Re?(function(i,o,l){if(!gr(i.precondition,o))return void o.convertToUnknownDocument(l.version);const u=Bo(i.fieldTransforms,o,l.transformResults),h=o.data;h.setAll(cl(i)),h.setAll(u),o.convertToFoundDocument(l.version,h).setHasCommittedMutations()})(n,t,e):(function(i,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()})(0,t,e)}function Cn(n,t,e,r){return n instanceof Un?(function(o,l,u,h){if(!gr(o.precondition,l))return u;const f=o.value.clone(),w=Uo(o.fieldTransforms,h,l);return f.setAll(w),l.convertToFoundDocument(l.version,f).setHasLocalMutations(),null})(n,t,e,r):n instanceof Re?(function(o,l,u,h){if(!gr(o.precondition,l))return u;const f=Uo(o.fieldTransforms,h,l),w=l.data;return w.setAll(cl(o)),w.setAll(f),l.convertToFoundDocument(l.version,w).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((E=>E.field)))})(n,t,e,r):(function(o,l,u){return gr(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):u})(n,t,e)}function fh(n,t){let e=null;for(const r of n.fieldTransforms){const i=t.data.field(r.field),o=sl(r.transform,i||null);o!=null&&(e===null&&(e=jt.empty()),e.set(r.field,o))}return e||null}function $o(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&qe(r,i,((o,l)=>dh(o,l)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Un extends Fr{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Re extends Fr{constructor(t,e,r,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function cl(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function Bo(n,t,e){const r=new Map;ft(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let i=0;i<e.length;i++){const o=n[i],l=o.transform,u=t.data.field(o.field);r.set(o.field,ch(l,u,e[i]))}return r}function Uo(n,t,e){const r=new Map;for(const i of n){const o=i.transform,l=e.data.field(i.field);r.set(i.field,lh(o,l,t))}return r}class ul extends Fr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class mh extends Fr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}class gh{constructor(t,e,r,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&ph(o,t,r[i])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Cn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Cn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=nl();return this.mutations.forEach((i=>{const o=t.get(i.key),l=o.overlayedDocument;let u=this.applyToLocalView(l,o.mutatedFields);u=e.has(i.key)?null:u;const h=ll(l,u);h!==null&&r.set(i.key,h),l.isValidDocument()||l.convertToNoDocument(dt.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),Lt())}isEqual(t){return this.batchId===t.batchId&&qe(this.mutations,t.mutations,((e,r)=>$o(e,r)))&&qe(this.baseMutations,t.baseMutations,((e,r)=>$o(e,r)))}}class si{constructor(t,e,r,i){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=i}static from(t,e,r){ft(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let i=(function(){return rh})();const o=t.mutations;for(let l=0;l<o.length;l++)i=i.insert(o[l].key,r[l].version);return new si(t,e,r,i)}}class yh{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}var gt,st;function vh(n){switch(n){case q.OK:return nt(64938);case q.CANCELLED:case q.UNKNOWN:case q.DEADLINE_EXCEEDED:case q.RESOURCE_EXHAUSTED:case q.INTERNAL:case q.UNAVAILABLE:case q.UNAUTHENTICATED:return!1;case q.INVALID_ARGUMENT:case q.NOT_FOUND:case q.ALREADY_EXISTS:case q.PERMISSION_DENIED:case q.FAILED_PRECONDITION:case q.ABORTED:case q.OUT_OF_RANGE:case q.UNIMPLEMENTED:case q.DATA_LOSS:return!0;default:return nt(15467,{code:n})}}function bh(n){if(n===void 0)return Ce("GRPC error has no .code"),q.UNKNOWN;switch(n){case gt.OK:return q.OK;case gt.CANCELLED:return q.CANCELLED;case gt.UNKNOWN:return q.UNKNOWN;case gt.DEADLINE_EXCEEDED:return q.DEADLINE_EXCEEDED;case gt.RESOURCE_EXHAUSTED:return q.RESOURCE_EXHAUSTED;case gt.INTERNAL:return q.INTERNAL;case gt.UNAVAILABLE:return q.UNAVAILABLE;case gt.UNAUTHENTICATED:return q.UNAUTHENTICATED;case gt.INVALID_ARGUMENT:return q.INVALID_ARGUMENT;case gt.NOT_FOUND:return q.NOT_FOUND;case gt.ALREADY_EXISTS:return q.ALREADY_EXISTS;case gt.PERMISSION_DENIED:return q.PERMISSION_DENIED;case gt.FAILED_PRECONDITION:return q.FAILED_PRECONDITION;case gt.ABORTED:return q.ABORTED;case gt.OUT_OF_RANGE:return q.OUT_OF_RANGE;case gt.UNIMPLEMENTED:return q.UNIMPLEMENTED;case gt.DATA_LOSS:return q.DATA_LOSS;default:return nt(39323,{code:n})}}(st=gt||(gt={}))[st.OK=0]="OK",st[st.CANCELLED=1]="CANCELLED",st[st.UNKNOWN=2]="UNKNOWN",st[st.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",st[st.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",st[st.NOT_FOUND=5]="NOT_FOUND",st[st.ALREADY_EXISTS=6]="ALREADY_EXISTS",st[st.PERMISSION_DENIED=7]="PERMISSION_DENIED",st[st.UNAUTHENTICATED=16]="UNAUTHENTICATED",st[st.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",st[st.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",st[st.ABORTED=10]="ABORTED",st[st.OUT_OF_RANGE=11]="OUT_OF_RANGE",st[st.UNIMPLEMENTED=12]="UNIMPLEMENTED",st[st.INTERNAL=13]="INTERNAL",st[st.UNAVAILABLE=14]="UNAVAILABLE",st[st.DATA_LOSS=15]="DATA_LOSS";new qs([4294967295,4294967295],0);class _h{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Ls(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function xh(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function wh(n,t){return Ls(n,t.toTimestamp())}function Be(n){return ft(!!n,49232),dt.fromTimestamp((function(e){const r=Ae(e);return new ht(r.seconds,r.nanos)})(n))}function dl(n,t){return Ds(n,t).canonicalString()}function Ds(n,t){const e=(function(i){return new mt(["projects",i.projectId,"databases",i.database])})(n).child("documents");return t===void 0?e:e.child(t)}function Eh(n){const t=mt.fromString(n);return ft(Ph(t),10190,{key:t.toString()}),t}function Vs(n,t){return dl(n.databaseId,t.path)}function Th(n){const t=Eh(n);return t.length===4?mt.emptyPath():Ch(t)}function Ih(n){return new mt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ch(n){return ft(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function jo(n,t,e){return{name:Vs(n,t),fields:e.value.mapValue.fields}}function Ah(n,t){let e;if(t instanceof Un)e={update:jo(n,t.key,t.value)};else if(t instanceof ul)e={delete:Vs(n,t.key)};else if(t instanceof Re)e={update:jo(n,t.key,t.data),updateMask:Rh(t.fieldMask)};else{if(!(t instanceof mh))return nt(16599,{dt:t.type});e={verify:Vs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(o,l){const u=l.transform;if(u instanceof Dn)return{fieldPath:l.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Vn)return{fieldPath:l.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Mn)return{fieldPath:l.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Rr)return{fieldPath:l.field.canonicalString(),increment:u.Ae};throw nt(20930,{transform:l.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(i,o){return o.updateTime!==void 0?{updateTime:wh(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:nt(27497)})(n,t.precondition)),e}function Sh(n,t){return n&&n.length>0?(ft(t!==void 0,14353),n.map((e=>(function(i,o){let l=i.updateTime?Be(i.updateTime):Be(o);return l.isEqual(dt.min())&&(l=Be(o)),new hh(l,i.transformResults||[])})(e,t)))):[]}function kh(n){let t=Th(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let i=null;if(r>0){ft(r===1,65062);const w=e.from[0];w.allDescendants?i=w.collectionId:t=t.child(w.collectionId)}let o=[];e.where&&(o=(function(E){const x=hl(E);return x instanceof de&&Ka(x)?x.getFilters():[x]})(e.where));let l=[];e.orderBy&&(l=(function(E){return E.map((x=>(function(L){return new Sr(Ne(L.field),(function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(L.direction))})(x)))})(e.orderBy));let u=null;e.limit&&(u=(function(E){let x;return x=typeof E=="object"?E.value:E,Ys(x)?null:x})(e.limit));let h=null;e.startAt&&(h=(function(E){const x=!!E.before,D=E.values||[];return new Ar(D,x)})(e.startAt));let f=null;return e.endAt&&(f=(function(E){const x=!E.before,D=E.values||[];return new Ar(D,x)})(e.endAt)),Qd(t,i,l,o,u,"F",h,f)}function hl(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Ne(e.unaryFilter.field);return wt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Ne(e.unaryFilter.field);return wt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ne(e.unaryFilter.field);return wt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=Ne(e.unaryFilter.field);return wt.create(l,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return nt(61313);default:return nt(60726)}})(n):n.fieldFilter!==void 0?(function(e){return wt.create(Ne(e.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return nt(58110);default:return nt(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return de.create(e.compositeFilter.filters.map((r=>hl(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return nt(1026)}})(e.compositeFilter.op))})(n):nt(30097,{filter:n})}function Ne(n){return Ct.fromServerFormat(n.fieldPath)}function Rh(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Ph(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function pl(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}class Lh{constructor(t){this.yt=t}}function Dh(n){const t=kh({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ps(t,t.limit,"L"):t}class Vh{constructor(){this.Sn=new Mh}addToCollectionParentIndex(t,e){return this.Sn.add(e),j.resolve()}getCollectionParents(t,e){return j.resolve(this.Sn.getEntries(e))}addFieldIndex(t,e){return j.resolve()}deleteFieldIndex(t,e){return j.resolve()}deleteAllFieldIndexes(t){return j.resolve()}createTargetIndexes(t,e){return j.resolve()}getDocumentsMatchingTarget(t,e){return j.resolve(null)}getIndexType(t,e){return j.resolve(0)}getFieldIndexes(t,e){return j.resolve([])}getNextCollectionGroupToUpdate(t){return j.resolve(null)}getMinOffset(t,e){return j.resolve(ue.min())}getMinOffsetFromCollectionGroup(t,e){return j.resolve(ue.min())}updateCollectionGroup(t,e,r){return j.resolve()}updateIndexEntries(t,e){return j.resolve()}}class Mh{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e]||new At(mt.comparator),o=!i.has(r);return this.index[e]=i.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e];return i&&i.has(r)}getEntries(t){return(this.index[t]||new At(mt.comparator)).toArray()}}const qo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},fl=41943040;class Nt{static withCacheSize(t){return new Nt(t,Nt.DEFAULT_COLLECTION_PERCENTILE,Nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}Nt.DEFAULT_COLLECTION_PERCENTILE=10,Nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Nt.DEFAULT=new Nt(fl,Nt.DEFAULT_COLLECTION_PERCENTILE,Nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Nt.DISABLED=new Nt(-1,0,0);class We{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new We(0)}static ar(){return new We(-1)}}const Ho="LruGarbageCollector",Nh=1048576;function zo([n,t],[e,r]){const i=ot(n,e);return i===0?ot(t,r):i}class Oh{constructor(t){this.Pr=t,this.buffer=new At(zo),this.Tr=0}Ir(){return++this.Tr}Er(t){const e=[t,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();zo(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Fh{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){Y(Ho,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Bn(e)?Y(Ho,"Ignoring IndexedDB error during garbage collection: ",e):await Ws(e)}await this.Ar(3e5)}))}}class $h{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return j.resolve(Ks.ce);const r=new Oh(e);return this.Vr.forEachTarget(t,(i=>r.Er(i.sequenceNumber))).next((()=>this.Vr.mr(t,(i=>r.Er(i))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(Y("LruGarbageCollector","Garbage collection skipped; disabled"),j.resolve(qo)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(Y("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),qo):this.gr(t,e)))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let r,i,o,l,u,h,f;const w=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((E=>(E>this.params.maximumSequenceNumbersToCollect?(Y("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${E}`),i=this.params.maximumSequenceNumbersToCollect):i=E,l=Date.now(),this.nthSequenceNumber(t,i)))).next((E=>(r=E,u=Date.now(),this.removeTargets(t,r,e)))).next((E=>(o=E,h=Date.now(),this.removeOrphanedDocuments(t,r)))).next((E=>(f=Date.now(),Me()<=it.DEBUG&&Y("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${l-w}ms
	Determined least recently used ${i} in `+(u-l)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${E} documents in `+(f-h)+`ms
Total Duration: ${f-w}ms`),j.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:E}))))}}function Bh(n,t){return new $h(n,t)}class Uh{constructor(){this.changes=new ke((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Ut.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?j.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}class jh{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}class qh{constructor(t,e,r,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=i}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((i=>(r=i,this.remoteDocumentCache.getEntry(t,e)))).next((i=>(r!==null&&Cn(r.mutation,i,Ht.empty(),ht.now()),i)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,Lt()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=Lt()){const i=we();return this.populateOverlays(t,i,e).next((()=>this.computeViews(t,e,i,r).next((o=>{let l=cr();return o.forEach(((u,h)=>{l=l.insert(u,h.overlayedDocument)})),l}))))}getOverlayedDocuments(t,e){const r=we();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,Lt())))}populateOverlays(t,e,r){const i=[];return r.forEach((o=>{e.has(o)||i.push(o)})),this.documentOverlayCache.getOverlays(t,i).next((o=>{o.forEach(((l,u)=>{e.set(l,u)}))}))}computeViews(t,e,r,i){let o=kr();const l=In(),u=(function(){return In()})();return e.forEach(((h,f)=>{const w=r.get(f.key);i.has(f.key)&&(w===void 0||w.mutation instanceof Re)?o=o.insert(f.key,f):w!==void 0?(l.set(f.key,w.mutation.getFieldMask()),Cn(w.mutation,f,w.mutation.getFieldMask(),ht.now())):l.set(f.key,Ht.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((f,w)=>l.set(f,w))),e.forEach(((f,w)=>u.set(f,new jh(w,l.get(f)??null)))),u)))}recalculateAndSaveOverlays(t,e){const r=In();let i=new Ot(((l,u)=>l-u)),o=Lt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((l=>{for(const u of l)u.keys().forEach((h=>{const f=e.get(h);if(f===null)return;let w=r.get(h)||Ht.empty();w=u.applyToLocalView(f,w),r.set(h,w);const E=(i.get(u.batchId)||Lt()).add(h);i=i.insert(u.batchId,E)}))})).next((()=>{const l=[],u=i.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,w=h.value,E=nl();w.forEach((x=>{if(!o.has(x)){const D=ll(e.get(x),r.get(x));D!==null&&E.set(x,D),o=o.add(x)}})),l.push(this.documentOverlayCache.saveOverlays(t,f,E))}return j.waitFor(l)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,i){return Xd(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Jd(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,i):this.getDocumentsMatchingCollectionQuery(t,e,r,i)}getNextDocuments(t,e,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,i).next((o=>{const l=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,i-o.size):j.resolve(we());let u=Pn,h=o;return l.next((f=>j.forEach(f,((w,E)=>(u<E.largestBatchId&&(u=E.largestBatchId),o.get(w)?j.resolve():this.remoteDocumentCache.getEntry(t,w).next((x=>{h=h.insert(w,x)}))))).next((()=>this.populateOverlays(t,f,o))).next((()=>this.computeViews(t,h,f,Lt()))).next((w=>({batchId:u,changes:el(w)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new et(e)).next((r=>{let i=cr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,i){const o=e.collectionGroup;let l=cr();return this.indexManager.getCollectionParents(t,o).next((u=>j.forEach(u,(h=>{const f=(function(E,x){return new Nr(x,null,E.explicitOrderBy.slice(),E.filters.slice(),E.limit,E.limitType,E.startAt,E.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,i).next((w=>{w.forEach(((E,x)=>{l=l.insert(E,x)}))}))})).next((()=>l))))}getDocumentsMatchingCollectionQuery(t,e,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,i)))).next((l=>{o.forEach(((h,f)=>{const w=f.getKey();l.get(w)===null&&(l=l.insert(w,Ut.newInvalidDocument(w)))}));let u=cr();return l.forEach(((h,f)=>{const w=o.get(h);w!==void 0&&Cn(w.mutation,f,Ht.empty(),ht.now()),ni(e,f)&&(u=u.insert(h,f))})),u}))}}class Hh{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return j.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,(function(i){return{id:i.id,version:i.version,createTime:Be(i.createTime)}})(e)),j.resolve()}getNamedQuery(t,e){return j.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,(function(i){return{name:i.name,query:Dh(i.bundledQuery),readTime:Be(i.readTime)}})(e)),j.resolve()}}class zh{constructor(){this.overlays=new Ot(et.comparator),this.Lr=new Map}getOverlay(t,e){return j.resolve(this.overlays.get(e))}getOverlays(t,e){const r=we();return j.forEach(e,(i=>this.getOverlay(t,i).next((o=>{o!==null&&r.set(i,o)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((i,o)=>{this.bt(t,e,o)})),j.resolve()}removeOverlaysForBatchId(t,e,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach((o=>this.overlays=this.overlays.remove(o))),this.Lr.delete(r)),j.resolve()}getOverlaysForCollection(t,e,r){const i=we(),o=e.length+1,l=new et(e.child("")),u=this.overlays.getIteratorFrom(l);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return j.resolve(i)}getOverlaysForCollectionGroup(t,e,r,i){let o=new Ot(((f,w)=>f-w));const l=this.overlays.getIterator();for(;l.hasNext();){const f=l.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let w=o.get(f.largestBatchId);w===null&&(w=we(),o=o.insert(f.largestBatchId,w)),w.set(f.getKey(),f)}}const u=we(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,w)=>u.set(f,w))),!(u.size()>=i)););return j.resolve(u)}bt(t,e,r){const i=this.overlays.get(r.key);if(i!==null){const l=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,l)}this.overlays=this.overlays.insert(r.key,new yh(e,r));let o=this.Lr.get(e);o===void 0&&(o=Lt(),this.Lr.set(e,o)),this.Lr.set(e,o.add(r.key))}}class Gh{constructor(){this.sessionToken=Qt.EMPTY_BYTE_STRING}getSessionToken(t){return j.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,j.resolve()}}class ii{constructor(){this.kr=new At(xt.Kr),this.qr=new At(xt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const r=new xt(t,e);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Wr(new xt(t,e))}Qr(t,e){t.forEach((r=>this.removeReference(r,e)))}Gr(t){const e=new et(new mt([])),r=new xt(e,t),i=new xt(e,t+1),o=[];return this.qr.forEachInRange([r,i],(l=>{this.Wr(l),o.push(l.key)})),o}zr(){this.kr.forEach((t=>this.Wr(t)))}Wr(t){this.kr=this.kr.delete(t),this.qr=this.qr.delete(t)}jr(t){const e=new et(new mt([])),r=new xt(e,t),i=new xt(e,t+1);let o=Lt();return this.qr.forEachInRange([r,i],(l=>{o=o.add(l.key)})),o}containsKey(t){const e=new xt(t,0),r=this.kr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class xt{constructor(t,e){this.key=t,this.Hr=e}static Kr(t,e){return et.comparator(t.key,e.key)||ot(t.Hr,e.Hr)}static Ur(t,e){return ot(t.Hr,e.Hr)||et.comparator(t.key,e.key)}}class Wh{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Jr=new At(xt.Kr)}checkEmpty(t){return j.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,i){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new gh(o,e,r,i);this.mutationQueue.push(l);for(const u of i)this.Jr=this.Jr.add(new xt(u.key,o)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return j.resolve(l)}lookupMutationBatch(t,e){return j.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,i=this.Xr(r),o=i<0?0:i;return j.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return j.resolve(this.mutationQueue.length===0?Qs:this.Yn-1)}getAllMutationBatches(t){return j.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new xt(e,0),i=new xt(e,Number.POSITIVE_INFINITY),o=[];return this.Jr.forEachInRange([r,i],(l=>{const u=this.Zr(l.Hr);o.push(u)})),j.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new At(ot);return e.forEach((i=>{const o=new xt(i,0),l=new xt(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([o,l],(u=>{r=r.add(u.Hr)}))})),j.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,i=r.length+1;let o=r;et.isDocumentKey(o)||(o=o.child(""));const l=new xt(new et(o),0);let u=new At(ot);return this.Jr.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(u=u.add(h.Hr)),!0)}),l),j.resolve(this.Yr(u))}Yr(t){const e=[];return t.forEach((r=>{const i=this.Zr(r);i!==null&&e.push(i)})),e}removeMutationBatch(t,e){ft(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return j.forEach(e.mutations,(i=>{const o=new xt(i.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)})).next((()=>{this.Jr=r}))}nr(t){}containsKey(t,e){const r=new xt(e,0),i=this.Jr.firstAfterOrEqual(r);return j.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,j.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}class Kh{constructor(t){this.ti=t,this.docs=(function(){return new Ot(et.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,i=this.docs.get(r),o=i?i.size:0,l=this.ti(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return j.resolve(r?r.document.mutableCopy():Ut.newInvalidDocument(e))}getEntries(t,e){let r=kr();return e.forEach((i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Ut.newInvalidDocument(i))})),j.resolve(r)}getDocumentsMatchingQuery(t,e,r,i){let o=kr();const l=e.path,u=new et(l.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:w}}=h.getNext();if(!l.isPrefixOf(f.path))break;f.path.length>l.length+1||Id(Td(w),r)<=0||(i.has(w.key)||ni(e,w))&&(o=o.insert(w.key,w.mutableCopy()))}return j.resolve(o)}getAllFromCollectionGroup(t,e,r,i){nt(9500)}ni(t,e){return j.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new Qh(this)}getSize(t){return j.resolve(this.size)}}class Qh extends Uh{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?e.push(this.Mr.addEntry(t,i)):this.Mr.removeEntry(r)})),j.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}class Yh{constructor(t){this.persistence=t,this.ri=new ke((e=>ti(e)),ei),this.lastRemoteSnapshotVersion=dt.min(),this.highestTargetId=0,this.ii=0,this.si=new ii,this.targetCount=0,this.oi=We._r()}forEachTarget(t,e){return this.ri.forEach(((r,i)=>e(i))),j.resolve()}getLastRemoteSnapshotVersion(t){return j.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return j.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),j.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ii&&(this.ii=e),j.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new We(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,j.resolve()}updateTargetData(t,e){return this.lr(e),j.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,j.resolve()}removeTargets(t,e,r){let i=0;const o=[];return this.ri.forEach(((l,u)=>{u.sequenceNumber<=e&&r.get(u.targetId)===null&&(this.ri.delete(l),o.push(this.removeMatchingKeysForTargetId(t,u.targetId)),i++)})),j.waitFor(o).next((()=>i))}getTargetCount(t){return j.resolve(this.targetCount)}getTargetData(t,e){const r=this.ri.get(e)||null;return j.resolve(r)}addMatchingKeys(t,e,r){return this.si.$r(e,r),j.resolve()}removeMatchingKeys(t,e,r){this.si.Qr(e,r);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach((l=>{o.push(i.markPotentiallyOrphaned(t,l))})),j.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),j.resolve()}getMatchingKeysForTargetId(t,e){const r=this.si.jr(e);return j.resolve(r)}containsKey(t,e){return j.resolve(this.si.containsKey(e))}}class ml{constructor(t,e){this._i={},this.overlays={},this.ai=new Ks(0),this.ui=!1,this.ui=!0,this.ci=new Gh,this.referenceDelegate=t(this),this.li=new Yh(this),this.indexManager=new Vh,this.remoteDocumentCache=(function(i){return new Kh(i)})((r=>this.referenceDelegate.hi(r))),this.serializer=new Lh(e),this.Pi=new Hh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new zh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this._i[t.toKey()];return r||(r=new Wh(e,this.referenceDelegate),this._i[t.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,r){Y("MemoryPersistence","Starting transaction:",t);const i=new Xh(this.ai.next());return this.referenceDelegate.Ti(),r(i).next((o=>this.referenceDelegate.Ii(i).next((()=>o)))).toPromise().then((o=>(i.raiseOnCommittedEvent(),o)))}Ei(t,e){return j.or(Object.values(this._i).map((r=>()=>r.containsKey(t,e))))}}class Xh extends Ad{constructor(t){super(),this.currentSequenceNumber=t}}class oi{constructor(t){this.persistence=t,this.Ri=new ii,this.Ai=null}static Vi(t){return new oi(t)}get di(){if(this.Ai)return this.Ai;throw nt(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.di.delete(r.toString()),j.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.di.add(r.toString()),j.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),j.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach((i=>this.di.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((i=>{i.forEach((o=>this.di.add(o.toString())))})).next((()=>r.removeTargetData(t,e)))}Ti(){this.Ai=new Set}Ii(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return j.forEach(this.di,(r=>{const i=et.fromPath(r);return this.mi(t,i).next((o=>{o||e.removeEntry(i,dt.min())}))})).next((()=>(this.Ai=null,e.apply(t))))}updateLimboDocument(t,e){return this.mi(t,e).next((r=>{r?this.di.delete(e.toString()):this.di.add(e.toString())}))}hi(t){return 0}mi(t,e){return j.or([()=>j.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class Pr{constructor(t,e){this.persistence=t,this.fi=new ke((r=>Rd(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=Bh(this,e)}static Vi(t,e){return new Pr(t,e)}Ti(){}Ii(t){return j.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((i=>r+i))))}pr(t){let e=0;return this.mr(t,(r=>{e++})).next((()=>e))}mr(t,e){return j.forEach(this.fi,((r,i)=>this.wr(t,r,i).next((o=>o?j.resolve():e(i)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ni(t,(l=>this.wr(t,l,e).next((u=>{u||(r++,o.removeEntry(l,dt.min()))})))).next((()=>o.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),j.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),j.resolve()}removeReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),j.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),j.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=fr(t.data.value)),e}wr(t,e,r){return j.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const i=this.fi.get(e);return j.resolve(i!==void 0&&i>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}class ai{constructor(t,e,r,i){this.targetId=t,this.fromCache=e,this.Ts=r,this.Is=i}static Es(t,e){let r=Lt(),i=Lt();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new ai(t,e.fromCache,r,i)}}class Jh{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}class Zh{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Hc()?8:Sd(jc())>0?6:4})()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,i){const o={result:null};return this.gs(t,e).next((l=>{o.result=l})).next((()=>{if(!o.result)return this.ps(t,e,i,r).next((l=>{o.result=l}))})).next((()=>{if(o.result)return;const l=new Jh;return this.ys(t,e,l).next((u=>{if(o.result=u,this.As)return this.ws(t,e,l,u.size)}))})).next((()=>o.result))}ws(t,e,r,i){return r.documentReadCount<this.Vs?(Me()<=it.DEBUG&&Y("QueryEngine","SDK will not create cache indexes for query:",bn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),j.resolve()):(Me()<=it.DEBUG&&Y("QueryEngine","Query:",bn(e),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(Me()<=it.DEBUG&&Y("QueryEngine","The SDK decides to create cache indexes for query:",bn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Te(e))):j.resolve())}gs(t,e){if(Oo(e))return j.resolve(null);let r=Te(e);return this.indexManager.getIndexType(t,r).next((i=>i===0?null:(e.limit!==null&&i===1&&(e=Ps(e,null,"F"),r=Te(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((o=>{const l=Lt(...o);return this.fs.getDocuments(t,l).next((u=>this.indexManager.getMinOffset(t,r).next((h=>{const f=this.bs(e,u);return this.Ss(e,f,l,h.readTime)?this.gs(t,Ps(e,null,"F")):this.Ds(t,f,e,h)}))))})))))}ps(t,e,r,i){return Oo(e)||i.isEqual(dt.min())?j.resolve(null):this.fs.getDocuments(t,r).next((o=>{const l=this.bs(e,o);return this.Ss(e,l,r,i)?j.resolve(null):(Me()<=it.DEBUG&&Y("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),bn(e)),this.Ds(t,l,e,Ed(i,Pn)).next((u=>u)))}))}bs(t,e){let r=new At(th(t));return e.forEach(((i,o)=>{ni(t,o)&&(r=r.add(o))})),r}Ss(t,e,r,i){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ys(t,e,r){return Me()<=it.DEBUG&&Y("QueryEngine","Using full collection scan to execute query:",bn(e)),this.fs.getDocumentsMatchingQuery(t,e,ue.min(),r)}Ds(t,e,r,i){return this.fs.getDocumentsMatchingQuery(t,r,i).next((o=>(e.forEach((l=>{o=o.insert(l.key,l)})),o)))}}const tp="LocalStore";class ep{constructor(t,e,r,i){this.persistence=t,this.Cs=e,this.serializer=i,this.vs=new Ot(ot),this.Fs=new ke((o=>ti(o)),ei),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(r)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new qh(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.vs)))}}function np(n,t,e,r){return new ep(n,t,e,r)}async function gl(n,t){const e=ct(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return e.mutationQueue.getAllMutationBatches(r).next((o=>(i=o,e.Os(t),e.mutationQueue.getAllMutationBatches(r)))).next((o=>{const l=[],u=[];let h=Lt();for(const f of i){l.push(f.batchId);for(const w of f.mutations)h=h.add(w.key)}for(const f of o){u.push(f.batchId);for(const w of f.mutations)h=h.add(w.key)}return e.localDocuments.getDocuments(r,h).next((f=>({Ns:f,removedBatchIds:l,addedBatchIds:u})))}))}))}function rp(n,t){const e=ct(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=t.batch.keys(),o=e.xs.newChangeBuffer({trackRemovals:!0});return(function(u,h,f,w){const E=f.batch,x=E.keys();let D=j.resolve();return x.forEach((L=>{D=D.next((()=>w.getEntry(h,L))).next((S=>{const A=f.docVersions.get(L);ft(A!==null,48541),S.version.compareTo(A)<0&&(E.applyToRemoteDocument(S,f),S.isValidDocument()&&(S.setReadTime(f.commitVersion),w.addEntry(S)))}))})),D.next((()=>u.mutationQueue.removeMutationBatch(h,E)))})(e,r,t,o).next((()=>o.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,i,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let h=Lt();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(r,i)))}))}function sp(n){const t=ct(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.li.getLastRemoteSnapshotVersion(e)))}function ip(n,t){const e=ct(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=Qs),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}class Go{constructor(){this.activeTargetIds=oh()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class op{constructor(){this.vo=new Go,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,r){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new Go,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}class ap{Mo(t){}shutdown(){}}const Wo="ConnectivityMonitor";class Ko{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){Y(Wo,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){Y(Wo,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}let ur=null;function Ms(){return ur===null?ur=(function(){return 268435456+Math.round(2147483648*Math.random())})():ur++,"0x"+ur.toString(16)}const fs="RestConnection",lp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class cp{get Ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===Ir?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(t,e,r,i,o){const l=Ms(),u=this.Qo(t,e.toUriEncodedString());Y(fs,`Sending RPC '${t}' ${l}:`,u,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(h,i,o);const{host:f}=new URL(u),w=Us(f);return this.zo(t,u,h,r,w).then((E=>(Y(fs,`Received RPC '${t}' ${l}: `,E),E)),(E=>{throw Mr(fs,`RPC '${t}' ${l} failed with error: `,E,"url: ",u,"request:",r),E}))}jo(t,e,r,i,o,l){return this.Wo(t,e,r,i,o)}Go(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ye})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((i,o)=>t[o]=i)),r&&r.headers.forEach(((i,o)=>t[o]=i))}Qo(t,e){const r=lp[t];let i=`${this.qo}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}class up{constructor(t){this.Ho=t.Ho,this.Jo=t.Jo}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Jo()}send(t){this.Ho(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}const kt="WebChannelConnection",_n=(n,t,e)=>{n.listen(t,(r=>{try{e(r)}catch(i){setTimeout((()=>{throw i}),0)}}))};class Ue extends cp{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!Ue.c_){const t=La();_n(t,Pa.STAT_EVENT,(e=>{e.stat===Ts.PROXY?Y(kt,"STAT_EVENT: detected buffering proxy"):e.stat===Ts.NOPROXY&&Y(kt,"STAT_EVENT: detected no buffering proxy")})),Ue.c_=!0}}zo(t,e,r,i,o){const l=Ms();return new Promise(((u,h)=>{const f=new ka;f.setWithCredentials(!0),f.listenOnce(Ra.COMPLETE,(()=>{try{switch(f.getLastErrorCode()){case pr.NO_ERROR:const E=f.getResponseJson();Y(kt,`XHR for RPC '${t}' ${l} received:`,JSON.stringify(E)),u(E);break;case pr.TIMEOUT:Y(kt,`RPC '${t}' ${l} timed out`),h(new J(q.DEADLINE_EXCEEDED,"Request time out"));break;case pr.HTTP_ERROR:const x=f.getStatus();if(Y(kt,`RPC '${t}' ${l} failed with status:`,x,"response text:",f.getResponseText()),x>0){let D=f.getResponseJson();Array.isArray(D)&&(D=D[0]);const L=D?.error;if(L&&L.status&&L.message){const S=(function(B){const C=B.toLowerCase().replace(/_/g,"-");return Object.values(q).indexOf(C)>=0?C:q.UNKNOWN})(L.status);h(new J(S,L.message))}else h(new J(q.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new J(q.UNAVAILABLE,"Connection failed."));break;default:nt(9055,{l_:t,streamId:l,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{Y(kt,`RPC '${t}' ${l} completed.`)}}));const w=JSON.stringify(i);Y(kt,`RPC '${t}' ${l} sending request:`,i),f.send(e,"POST",w,r,15)}))}T_(t,e,r){const i=Ms(),o=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],l=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Go(u.initMessageHeaders,e,r),u.encodeInitMessageHeaders=!0;const f=o.join("");Y(kt,`Creating RPC '${t}' stream ${i}: ${f}`,u);const w=l.createWebChannel(f,u);this.I_(w);let E=!1,x=!1;const D=new up({Ho:L=>{x?Y(kt,`Not sending because RPC '${t}' stream ${i} is closed:`,L):(E||(Y(kt,`Opening RPC '${t}' stream ${i} transport.`),w.open(),E=!0),Y(kt,`RPC '${t}' stream ${i} sending:`,L),w.send(L))},Jo:()=>w.close()});return _n(w,xn.EventType.OPEN,(()=>{x||(Y(kt,`RPC '${t}' stream ${i} transport opened.`),D.i_())})),_n(w,xn.EventType.CLOSE,(()=>{x||(x=!0,Y(kt,`RPC '${t}' stream ${i} transport closed`),D.o_(),this.E_(w))})),_n(w,xn.EventType.ERROR,(L=>{x||(x=!0,Mr(kt,`RPC '${t}' stream ${i} transport errored. Name:`,L.name,"Message:",L.message),D.o_(new J(q.UNAVAILABLE,"The operation could not be completed")))})),_n(w,xn.EventType.MESSAGE,(L=>{if(!x){const S=L.data[0];ft(!!S,16349);const A=S,B=A?.error||A[0]?.error;if(B){Y(kt,`RPC '${t}' stream ${i} received error:`,B);const C=B.status;let I=(function(F){const m=gt[F];if(m!==void 0)return bh(m)})(C),N=B.message;I===void 0&&(I=q.INTERNAL,N="Unknown error status: "+C+" with message "+B.message),x=!0,D.o_(new J(I,N)),w.close()}else Y(kt,`RPC '${t}' stream ${i} received:`,S),D.__(S)}})),Ue.u_(),setTimeout((()=>{D.s_()}),0),D}terminate(){this.a_.forEach((t=>t.close())),this.a_=[]}I_(t){this.a_.push(t)}E_(t){this.a_=this.a_.filter((e=>e===t))}Go(t,e,r){super.Go(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Da()}}function dp(n){return new Ue(n)}function ms(){return typeof document<"u"?document:null}function $r(n){return new _h(n,!0)}Ue.c_=!1;class yl{constructor(t,e,r=1e3,i=1.5,o=6e4){this.Ci=t,this.timerId=e,this.R_=r,this.A_=i,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,e-r);i>0&&Y("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),t()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}const Qo="PersistentStream";class hp{constructor(t,e,r,i,o,l,u,h){this.Ci=t,this.b_=r,this.S_=i,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new yl(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(t){this.q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===q.RESOURCE_EXHAUSTED?(Ce(e.toString()),Ce("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===q.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.D_===e&&this.G_(r,i)}),(r=>{t((()=>{const i=new J(q.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)}))}))}G_(t,e){const r=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((i=>{r((()=>this.z_(i)))})),this.stream.onMessage((i=>{r((()=>++this.F_==1?this.H_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return Y(Qo,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget((()=>this.D_===t?e():(Y(Qo,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class pp extends hp{constructor(t,e,r,i,o,l){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,i,l),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}H_(t){return ft(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,ft(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){ft(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Sh(t.writeResults,t.commitTime),r=Be(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=Ih(this.serializer),this.K_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>Ah(this.serializer,r)))};this.K_(e)}}class fp{}class mp extends fp{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new J(q.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.Wo(t,Ds(e,r),i,o,l))).catch((o=>{throw o.name==="FirebaseError"?(o.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new J(q.UNKNOWN,o.toString())}))}jo(t,e,r,i,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([l,u])=>this.connection.jo(t,Ds(e,r),i,l,u,o))).catch((l=>{throw l.name==="FirebaseError"?(l.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new J(q.UNKNOWN,l.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function gp(n,t,e,r){return new mp(n,t,e,r)}class yp{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ce(e),this.aa=!1):Y("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}const jn="RemoteStore";class vp{constructor(t,e,r,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=o,this.Aa.Mo((l=>{r.enqueueAndForget((async()=>{Hn(this)&&(Y(jn,"Restarting streams for network reachability change."),await(async function(h){const f=ct(h);f.Ea.add(4),await qn(f),f.Va.set("Unknown"),f.Ea.delete(4),await Br(f)})(this))}))})),this.Va=new yp(r,i)}}async function Br(n){if(Hn(n))for(const t of n.Ra)await t(!0)}async function qn(n){for(const t of n.Ra)await t(!1)}function Hn(n){return ct(n).Ea.size===0}async function vl(n,t,e){if(!Bn(t))throw t;n.Ea.add(1),await qn(n),n.Va.set("Offline"),e||(e=()=>sp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{Y(jn,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Br(n)}))}function bl(n,t){return t().catch((e=>vl(n,e,t)))}async function Ur(n){const t=ct(n),e=he(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Qs;for(;bp(t);)try{const i=await ip(t.localStore,r);if(i===null){t.Ta.length===0&&e.L_();break}r=i.batchId,_p(t,i)}catch(i){await vl(t,i)}_l(t)&&xl(t)}function bp(n){return Hn(n)&&n.Ta.length<10}function _p(n,t){n.Ta.push(t);const e=he(n);e.O_()&&e.Y_&&e.ea(t.mutations)}function _l(n){return Hn(n)&&!he(n).x_()&&n.Ta.length>0}function xl(n){he(n).start()}async function xp(n){he(n).ra()}async function wp(n){const t=he(n);for(const e of n.Ta)t.ea(e.mutations)}async function Ep(n,t,e){const r=n.Ta.shift(),i=si.from(r,t,e);await bl(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await Ur(n)}async function Tp(n,t){t&&he(n).Y_&&await(async function(r,i){if((function(l){return vh(l)&&l!==q.ABORTED})(i.code)){const o=r.Ta.shift();he(r).B_(),await bl(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i))),await Ur(r)}})(n,t),_l(n)&&xl(n)}async function Yo(n,t){const e=ct(n);e.asyncQueue.verifyOperationInProgress(),Y(jn,"RemoteStore received new credentials");const r=Hn(e);e.Ea.add(3),await qn(e),r&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Br(e)}async function Ip(n,t){const e=ct(n);t?(e.Ea.delete(2),await Br(e)):t||(e.Ea.add(2),await qn(e),e.Va.set("Unknown"))}function he(n){return n.fa||(n.fa=(function(e,r,i){const o=ct(e);return o.sa(),new pp(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:xp.bind(null,n),t_:Tp.bind(null,n),ta:wp.bind(null,n),na:Ep.bind(null,n)}),n.Ra.push((async t=>{t?(n.fa.B_(),await Ur(n)):(await n.fa.stop(),n.Ta.length>0&&(Y(jn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}class li{constructor(t,e,r,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Ee,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((l=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,o){const l=Date.now()+r,u=new li(t,e,l,i,o);return u.start(r),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new J(q.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wl(n,t){if(Ce("AsyncQueue",`${t}: ${n}`),Bn(n))return new J(q.UNAVAILABLE,`${t}: ${n}`);throw n}class Cp{constructor(){this.queries=Xo(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const i=ct(e),o=i.queries;i.queries=Xo(),o.forEach(((l,u)=>{for(const h of u.ba)h.onError(r)}))})(this,new J(q.ABORTED,"Firestore shutting down"))}}function Xo(){return new ke((n=>Za(n)),Ja)}function Ap(n){n.Ca.forEach((t=>{t.next()}))}var Jo,Zo;(Zo=Jo||(Jo={})).Ma="default",Zo.Cache="cache";const Sp="SyncEngine";class kp{constructor(t,e,r,i,o,l){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.Pu={},this.Tu=new ke((u=>Za(u)),Ja),this.Iu=new Map,this.Eu=new Set,this.Ru=new Ot(et.comparator),this.Au=new Map,this.Vu=new ii,this.du={},this.mu=new Map,this.fu=We.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Rp(n,t,e){const r=Vp(n);try{const i=await(function(l,u){const h=ct(l),f=ht.now(),w=u.reduce(((D,L)=>D.add(L.key)),Lt());let E,x;return h.persistence.runTransaction("Locally write mutations","readwrite",(D=>{let L=kr(),S=Lt();return h.xs.getEntries(D,w).next((A=>{L=A,L.forEach(((B,C)=>{C.isValidDocument()||(S=S.add(B))}))})).next((()=>h.localDocuments.getOverlayedDocuments(D,L))).next((A=>{E=A;const B=[];for(const C of u){const I=fh(C,E.get(C.key).overlayedDocument);I!=null&&B.push(new Re(C.key,I,za(I.value.mapValue),Jt.exists(!0)))}return h.mutationQueue.addMutationBatch(D,f,B,u)})).next((A=>{x=A;const B=A.applyToLocalDocumentSet(E,S);return h.documentOverlayCache.saveOverlays(D,A.batchId,B)}))})).then((()=>({batchId:x.batchId,changes:el(E)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(i.batchId),(function(l,u,h){let f=l.du[l.currentUser.toKey()];f||(f=new Ot(ot)),f=f.insert(u,h),l.du[l.currentUser.toKey()]=f})(r,i.batchId,e),await jr(r,i.changes),await Ur(r.remoteStore)}catch(i){const o=wl(i,"Failed to persist write");e.reject(o)}}function ta(n,t,e){const r=ct(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const i=[];r.Tu.forEach(((o,l)=>{const u=l.view.va(t);u.snapshot&&i.push(u.snapshot)})),(function(l,u){const h=ct(l);h.onlineState=u;let f=!1;h.queries.forEach(((w,E)=>{for(const x of E.ba)x.va(u)&&(f=!0)})),f&&Ap(h)})(r.eventManager,t),i.length&&r.Pu.J_(i),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Pp(n,t){const e=ct(n),r=t.batch.batchId;try{const i=await rp(e.localStore,t);Tl(e,r,null),El(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await jr(e,i)}catch(i){await Ws(i)}}async function Lp(n,t,e){const r=ct(n);try{const i=await(function(l,u){const h=ct(l);return h.persistence.runTransaction("Reject batch","readwrite-primary",(f=>{let w;return h.mutationQueue.lookupMutationBatch(f,u).next((E=>(ft(E!==null,37113),w=E.keys(),h.mutationQueue.removeMutationBatch(f,E)))).next((()=>h.mutationQueue.performConsistencyCheck(f))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(f,w,u))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,w))).next((()=>h.localDocuments.getDocuments(f,w)))}))})(r.localStore,t);Tl(r,t,e),El(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await jr(r,i)}catch(i){await Ws(i)}}function El(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function Tl(n,t,e){const r=ct(n);let i=r.du[r.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),r.du[r.currentUser.toKey()]=i}}async function jr(n,t,e){const r=ct(n),i=[],o=[],l=[];r.Tu.isEmpty()||(r.Tu.forEach(((u,h)=>{l.push(r.pu(h,t,e).then((f=>{if((f||e)&&r.isPrimaryClient){const w=f?!f.fromCache:e?.targetChanges.get(h.targetId)?.current;r.sharedClientState.updateQueryState(h.targetId,w?"current":"not-current")}if(f){i.push(f);const w=ai.Es(h.targetId,f);o.push(w)}})))})),await Promise.all(l),r.Pu.J_(i),await(async function(h,f){const w=ct(h);try{await w.persistence.runTransaction("notifyLocalViewChanges","readwrite",(E=>j.forEach(f,(x=>j.forEach(x.Ts,(D=>w.persistence.referenceDelegate.addReference(E,x.targetId,D))).next((()=>j.forEach(x.Is,(D=>w.persistence.referenceDelegate.removeReference(E,x.targetId,D)))))))))}catch(E){if(!Bn(E))throw E;Y(tp,"Failed to update sequence numbers: "+E)}for(const E of f){const x=E.targetId;if(!E.fromCache){const D=w.vs.get(x),L=D.snapshotVersion,S=D.withLastLimboFreeSnapshotVersion(L);w.vs=w.vs.insert(x,S)}}})(r.localStore,o))}async function Dp(n,t){const e=ct(n);if(!e.currentUser.isEqual(t)){Y(Sp,"User change. New user:",t.toKey());const r=await gl(e.localStore,t);e.currentUser=t,(function(o,l){o.mu.forEach((u=>{u.forEach((h=>{h.reject(new J(q.CANCELLED,l))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await jr(e,r.Ns)}}function Vp(n){const t=ct(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Pp.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Lp.bind(null,t),t}class Lr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=$r(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return np(this.persistence,new Zh,t.initialUser,this.serializer)}Cu(t){return new ml(oi.Vi,this.serializer)}Du(t){return new op}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Lr.provider={build:()=>new Lr};class Mp extends Lr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){ft(this.persistence.referenceDelegate instanceof Pr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Fh(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Nt.withCacheSize(this.cacheSizeBytes):Nt.DEFAULT;return new ml((r=>Pr.Vi(r,e)),this.serializer)}}class Ns{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ta(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Dp.bind(null,this.syncEngine),await Ip(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Cp})()}createDatastore(t){const e=$r(t.databaseInfo.databaseId),r=dp(t.databaseInfo);return gp(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,i,o,l,u){return new vp(r,i,o,l,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>ta(this.syncEngine,e,0)),(function(){return Ko.v()?new Ko:new ap})())}createSyncEngine(t,e){return(function(i,o,l,u,h,f,w){const E=new kp(i,o,l,u,h,f);return w&&(E.gu=!0),E})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){await(async function(e){const r=ct(e);Y(jn,"RemoteStore shutting down."),r.Ea.add(5),await qn(r),r.Aa.shutdown(),r.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Ns.provider={build:()=>new Ns};const pe="FirestoreClient";class Np{constructor(t,e,r,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=i,this.user=Rt.UNAUTHENTICATED,this.clientId=zs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async l=>{Y(pe,"Received user=",l.uid),await this.authCredentialListener(l),this.user=l})),this.appCheckCredentials.start(r,(l=>(Y(pe,"Received new app check token=",l),this.appCheckCredentialListener(l,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ee;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=wl(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function gs(n,t){n.asyncQueue.verifyOperationInProgress(),Y(pe,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await gl(t.localStore,i),r=i)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function ea(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Op(n);Y(pe,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>Yo(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>Yo(t.remoteStore,i))),n._onlineComponents=t}async function Op(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){Y(pe,"Using user provided OfflineComponentProvider");try{await gs(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(i){return i.name==="FirebaseError"?i.code===q.FAILED_PRECONDITION||i.code===q.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(e))throw e;Mr("Error using user provided cache. Falling back to memory cache: "+e),await gs(n,new Lr)}}else Y(pe,"Using default OfflineComponentProvider"),await gs(n,new Mp(void 0));return n._offlineComponents}async function Fp(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(Y(pe,"Using user provided OnlineComponentProvider"),await ea(n,n._uninitializedComponentsProvider._online)):(Y(pe,"Using default OnlineComponentProvider"),await ea(n,new Ns))),n._onlineComponents}function $p(n){return Fp(n).then((t=>t.syncEngine))}function Bp(n,t){const e=new Ee;return n.asyncQueue.enqueueAndForget((async()=>Rp(await $p(n),t,e))),e.promise}function Il(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}const Up="ComponentProvider",na=new Map;function jp(n,t,e,r,i){return new Vd(n,t,e,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,Il(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}const Cl="firestore.googleapis.com",ra=!0;class sa{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new J(q.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Cl,this.ssl=ra}else this.host=t.host,this.ssl=t.ssl??ra;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=fl;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Nh)throw new J(q.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}wd("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Il(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new J(q.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new J(q.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new J(q.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class ci{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sa({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new J(q.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new J(q.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sa(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new dd;switch(r.type){case"firstParty":return new md(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new J(q.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=na.get(e);r&&(Y(Up,"Removing Datastore"),na.delete(e),r.terminate())})(this),Promise.resolve()}}function qp(n,t,e,r={}){n=Cs(n,ci);const i=Us(t),o=n._getSettings(),l={...o,emulatorOptions:n._getEmulatorOptions()},u=`${t}:${e}`;i&&(Oc(`https://${u}`),Uc("Firestore",!0)),o.host!==Cl&&o.host!==u&&Mr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:u,ssl:i,emulatorOptions:r};if(!br(h,l)&&(n._setSettings(h),r.mockUserToken)){let f,w;if(typeof r.mockUserToken=="string")f=r.mockUserToken,w=Rt.MOCK_USER;else{f=Fc(r.mockUserToken,n._app?.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new J(q.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");w=new Rt(E)}n._authCredentials=new hd(new Ma(f,w))}}class ui{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new ui(this.firestore,t,this._query)}}class Dt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Nn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Dt(this.firestore,t,this._key)}toJSON(){return{type:Dt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if($n(e,Dt._jsonSchema))return new Dt(t,r||null,new et(mt.fromString(e.referencePath)))}}Dt._jsonSchemaVersion="firestore/documentReference/1.0",Dt._jsonSchema={type:vt("string",Dt._jsonSchemaVersion),referencePath:vt("string")};class Nn extends ui{constructor(t,e,r){super(t,e,Yd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Dt(this.firestore,null,new et(t))}withConverter(t){return new Nn(this.firestore,t,this._path)}}function Hp(n,t,...e){if(n=_r(n),arguments.length===1&&(t=zs.newId()),xd("doc","path",t),n instanceof ci){const r=mt.fromString(t,...e);return Co(r),new Dt(n,null,new et(r))}{if(!(n instanceof Dt||n instanceof Nn))throw new J(q.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(mt.fromString(t,...e));return Co(r),new Dt(n.firestore,n instanceof Nn?n.converter:null,new et(r))}}const ia="AsyncQueue";class oa{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new yl(this,"async_queue_retry"),this._c=()=>{const r=ms();r&&Y(ia,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=ms();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=ms();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new Ee;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Yu.push(t),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!Bn(t))throw t;Y(ia,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,Ce("INTERNAL UNHANDLED ERROR: ",aa(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const i=li.createAndSchedule(this,t,e,r,(o=>this.hc(o)));return this.tc.push(i),i}uc(){this.nc&&nt(47125,{Pc:aa(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function aa(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Al extends ci{constructor(t,e,r,i){super(t,e,r,i),this.type="firestore",this._queue=new oa,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new oa(t),this._firestoreClient=void 0,await t}}}function zp(n,t){const e=typeof n=="object"?n:Xu(),r=typeof n=="string"?n:Ir,i=Gu(e,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=Mc("firestore");o&&qp(i,...o)}return i}function Gp(n){if(n._terminated)throw new J(q.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Wp(n),n._firestoreClient}function Wp(n){const t=n._freezeSettings(),e=jp(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,t);n._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new Np(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(i){const o=i?._online.build();return{_offline:i?._offline.build(o),_online:o}})(n._componentsProvider))}class qt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new qt(Qt.fromBase64String(t))}catch(e){throw new J(q.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new qt(Qt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:qt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if($n(t,qt._jsonSchema))return qt.fromBase64String(t.bytes)}}qt._jsonSchemaVersion="firestore/bytes/1.0",qt._jsonSchema={type:vt("string",qt._jsonSchemaVersion),bytes:vt("string")};class Sl{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new J(q.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}class di{constructor(t){this._methodName=t}}class Zt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new J(q.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new J(q.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return ot(this._lat,t._lat)||ot(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Zt._jsonSchemaVersion}}static fromJSON(t){if($n(t,Zt._jsonSchema))return new Zt(t.latitude,t.longitude)}}Zt._jsonSchemaVersion="firestore/geoPoint/1.0",Zt._jsonSchema={type:vt("string",Zt._jsonSchemaVersion),latitude:vt("number"),longitude:vt("number")};class Kt{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Kt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if($n(t,Kt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Kt(t.vectorValues);throw new J(q.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Kt._jsonSchemaVersion="firestore/vectorValue/1.0",Kt._jsonSchema={type:vt("string",Kt._jsonSchemaVersion),vectorValues:vt("object")};const Kp=/^__.*__$/;class Qp{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Re(t,this.data,this.fieldMask,e,this.fieldTransforms):new Un(t,this.data,e,this.fieldTransforms)}}function kl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw nt(40011,{dataSource:n})}}class hi{constructor(t,e,r,i,o,l){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.validatePath(),this.fieldTransforms=o||[],this.fieldMask=l||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new hi({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){const e=this.path?.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePathSegment(t),r}childContextForFieldPath(t){const e=this.path?.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePath(),r}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return Dr(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if(kl(this.dataSource)&&Kp.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class Yp{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||$r(t)}createContext(t,e,r,i=!1){return new hi({dataSource:t,methodName:e,targetDoc:r,path:Ct.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Xp(n){const t=n._freezeSettings(),e=$r(n._databaseId);return new Yp(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Jp(n,t,e,r,i,o={}){const l=n.createContext(o.merge||o.mergeFields?2:0,t,e,i);Dl("Data must be an object, but it was:",l,r);const u=Pl(r,l);let h,f;if(o.merge)h=new Ht(l.fieldMask),f=l.fieldTransforms;else if(o.mergeFields){const w=[];for(const E of o.mergeFields){const x=fi(t,E,e);if(!l.contains(x))throw new J(q.INVALID_ARGUMENT,`Field '${x}' is specified in your field mask but missing from your input data.`);ef(w,x)||w.push(x)}h=new Ht(w),f=l.fieldTransforms.filter((E=>h.covers(E.field)))}else h=null,f=l.fieldTransforms;return new Qp(new jt(u),h,f)}class pi extends di{_toFieldTransform(t){return new uh(t.path,new Dn)}isEqual(t){return t instanceof pi}}function Rl(n,t){if(Ll(n=_r(n)))return Dl("Unsupported field value:",t,n),Pl(n,t);if(n instanceof di)return(function(r,i){if(!kl(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return(function(r,i){const o=[];let l=0;for(const u of r){let h=Rl(u,i.childContextForArray(l));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),l++}return{arrayValue:{values:o}}})(n,t)}return(function(r,i){if((r=_r(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ah(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=ht.fromDate(r);return{timestampValue:Ls(i.serializer,o)}}if(r instanceof ht){const o=new ht(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ls(i.serializer,o)}}if(r instanceof Zt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof qt)return{bytesValue:xh(i.serializer,r._byteString)};if(r instanceof Dt){const o=i.databaseId,l=r.firestore._databaseId;if(!l.isEqual(o))throw i.createError(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:dl(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Kt)return(function(l,u){const h=l instanceof Kt?l.toArray():l;return{mapValue:{fields:{[qa]:{stringValue:Ha},[As]:{arrayValue:{values:h.map((w=>{if(typeof w!="number")throw u.createError("VectorValues must only contain numeric values.");return ri(u.serializer,w)}))}}}}}})(r,i);if(pl(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Gs(r)}`)})(n,t)}function Pl(n,t){const e={};return Fa(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Xe(n,((r,i)=>{const o=Rl(i,t.childContextForField(r));o!=null&&(e[r]=o)})),{mapValue:{fields:e}}}function Ll(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ht||n instanceof Zt||n instanceof qt||n instanceof Dt||n instanceof di||n instanceof Kt||pl(n))}function Dl(n,t,e){if(!Ll(e)||!Na(e)){const r=Gs(e);throw r==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+r)}}function fi(n,t,e){if((t=_r(t))instanceof Sl)return t._internalPath;if(typeof t=="string")return tf(n,t);throw Dr("Field path arguments must be of type string or ",n,!1,void 0,e)}const Zp=new RegExp("[~\\*/\\[\\]]");function tf(n,t,e){if(t.search(Zp)>=0)throw Dr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Sl(...t.split("."))._internalPath}catch{throw Dr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Dr(n,t,e,r,i){const o=r&&!r.isEmpty(),l=i!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||l)&&(h+=" (found",o&&(h+=` in field ${r}`),l&&(h+=` in document ${i}`),h+=")"),new J(q.INVALID_ARGUMENT,u+n+h)}function ef(n,t){return n.some((e=>e.isEqual(t)))}function nf(){return new pi("serverTimestamp")}const la="@firebase/firestore",ca="4.10.0";class Vl{constructor(t,e,r,i,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Dt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new rf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(t){if(this._document){const e=this._document.data.field(fi("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class rf extends Vl{data(){return super.data()}}function sf(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class dr{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class je extends Vl{constructor(t,e,r,i,o,l){super(t,e,r,i,l),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new yr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(fi("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new J(q.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=je._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}je._jsonSchemaVersion="firestore/documentSnapshot/1.0",je._jsonSchema={type:vt("string",je._jsonSchemaVersion),bundleSource:vt("string","DocumentSnapshot"),bundleName:vt("string"),bundle:vt("string")};class yr extends je{data(t={}){return super.data(t)}}class An{constructor(t,e,r,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new dr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new yr(this._firestore,this._userDataWriter,r.key,r,new dr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new J(q.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(i,o){if(i._snapshot.oldDocs.isEmpty()){let l=0;return i._snapshot.docChanges.map((u=>{const h=new yr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new dr(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:l++}}))}{let l=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((u=>o||u.type!==3)).map((u=>{const h=new yr(i._firestore,i._userDataWriter,u.doc.key,u.doc,new dr(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let f=-1,w=-1;return u.type!==0&&(f=l.indexOf(u.doc.key),l=l.delete(u.doc.key)),u.type!==1&&(l=l.add(u.doc),w=l.indexOf(u.doc.key)),{type:of(u.type),doc:h,oldIndex:f,newIndex:w}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new J(q.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=An._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=zs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],i=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function of(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return nt(61501,{type:n})}}An._jsonSchemaVersion="firestore/querySnapshot/1.0",An._jsonSchema={type:vt("string",An._jsonSchemaVersion),bundleSource:vt("string","QuerySnapshot"),bundleName:vt("string"),bundle:vt("string")};function af(n,t,e){n=Cs(n,Dt);const r=Cs(n.firestore,Al),i=sf(n.converter,t),o=Xp(r);return lf(r,[Jp(o,"setDoc",n._key,i,n.converter!==null,e).toMutation(n._key,Jt.none())])}function lf(n,t){const e=Gp(n);return Bp(e,t)}(function(t,e=!0){ud(Yu),wr(new kn("firestore",((r,{instanceIdentifier:i,options:o})=>{const l=r.getProvider("app").getImmediate(),u=new Al(new pd(r.getProvider("auth-internal")),new gd(l,r.getProvider("app-check-internal")),Md(l,i),l);return o={useFetchStreams:e,...o},u._setSettings(o),u}),"PUBLIC").setMultipleInstances(!0)),$e(la,ca,t),$e(la,ca,"esm2020")})();const cf={projectId:"destinycode-982fa",appId:"1:168629222416:web:3283f6a4051f57a85c9e95",storageBucket:"destinycode-982fa.firebasestorage.app",apiKey:"AIzaSyA20BvSogSuHTni09Y54HwmlpG7UKXuxk8",authDomain:"destinycode-982fa.firebaseapp.com",messagingSenderId:"168629222416",measurementId:"G-ZKS4RCNFGX"};let ys=null;function uf(){if(!ys)try{const n=Ca(cf);ys=zp(n),yt.log("🔥 FeedbackService: Firebase initialized.")}catch(n){console.error("Firebase Init Error:",n)}return ys}const Vr={async send(n){const t=uf();if(!t){console.warn("Feedback skipped: DB not ready");return}const e=T.get("email")||null,r=n.source||"general";let i=sessionStorage.getItem("dc_feedback_session_id");i||(i="sess_"+Math.random().toString(36).substr(2,9)+"_"+Date.now().toString(36),sessionStorage.setItem("dc_feedback_session_id",i));let o=`feedback_${i}_${r}`;n.type==="text"&&(o+=`_${Date.now()}_${Math.random().toString(36).substr(2,5)}`);const l={...n,email:e,timestamp:nf(),localTime:new Date().toISOString(),userAgent:navigator.userAgent,path:window.location.pathname};try{await af(Hp(t,"web_feedback",o),l),yt.log("📝 [Feedback Updated/Saved]:",o,l)}catch(u){console.error("Feedback Save Error:",u)}}},df=It.PROXY,hf=vs.MODEL_NAME;async function pf(n){try{const e=(await ce(df,{action:"geo",data:{query:n},modelName:hf})).candidates?.[0]?.content?.parts?.[0]?.text;if(e){const r=e.replace(/```json\n?([\s\S]*?)\n?```/g,"$1").trim();return JSON.parse(r)}return{error:"parse_error"}}catch(t){return console.error("Geo API Network Error:",t),{error:"network_failure"}}}async function Ke(n){const t=await pf(n);return t&&(typeof t.lat=="number"||typeof t.latitude=="number")?(console.log(`Geocoding success for ${n}:`,t),{latitude:t.latitude||t.lat,longitude:t.longitude||t.lon,timezone:t.timezone,corrected_name:t.corrected_name,error:null}):t&&t.error?{error:t.error}:{error:"parse_error"}}async function On(n,t,e,r={}){yt.log(`💳 Starting Payment: ${n.name} (${n.price} UAH)`);try{const i={amount:n.price,productName:n.name,userEmail:t.email,userName:t.name||"Client",userData:e,variant:r.variant||null,trafficSource:T.get("traffic_type"),origin:window.location.origin,returnQueryParams:r.returnQueryParams||""},o=await ce(It.endpoints.PAYMENT_INIT,i);if(o&&o.pageUrl){T.set("pendingInvoiceId",o.invoiceId);const l=document.createElement("a");l.href=o.pageUrl,l.target="_top",l.rel="noopener noreferrer",document.body.appendChild(l),l.click(),setTimeout(()=>{document.body.removeChild(l)},100)}else throw console.error("❌ Invalid Payment Response:",o),new Error("Invalid response from payment provider (no pageUrl)")}catch(i){console.error("❌ Payment Init Failed Details:",i);let o="Помилка ініціалізації оплати.";throw i.message&&i.message.includes("400")&&(o+=" Невірні дані."),i.message&&i.message.includes("500")&&(o+=" Сервер тимчасово недоступний."),alert(`${o}
Спробуйте ще раз.`),i}}async function ff(n){try{return await ce(It.endpoints.PAYMENT_CHECK,n)}catch(t){return console.error("Status Check Failed:",t),{status:"error",message:t.message}}}function Xt(){const n=T.get("currentVariant");let t={...cc},e={...uc};return n&&n.pricing&&(n.pricing.display&&(t={...t,...n.pricing.display}),n.pricing.charge&&(e={...e,...n.pricing.charge})),{display:t,charge:e}}async function Oe(n,t=null){if(await Os(),!window.CircularNatalHoroscope)return`
            <div class="astro-data-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.1);">
                <p class="text-xs text-yellow-400 text-center pulse-text">
                    ⏳ Завантаження астро-даних...<br>
                    (Спробуйте зачекати кілька секунд)
                </p>
            </div>
        `;const{Origin:e,Horoscope:r,Renderer:i}=window.CircularNatalHoroscope;let o=n.geo;if(o||(o={latitude:50.45,longitude:30.52,timezone:"Europe/Kyiv"}),!n.date)return"";try{let S=function(I,N){let $=L[I];if(!$&&I==="ascendant"&&($=D.Ascendant),!$&&I==="midheaven"&&($=D.Midheaven),$){const F=$.Sign.label,m=$.ChartPosition.Ecliptic.DecimalDegrees%30,p=Math.floor(m),b=(m-p)*60,_=Math.floor(b),y=Math.round((b-_)*60);return`
                    <div class="astro-data-item">
                        <div class="astro-label-row">
                            <span class="astro-planet-name">${N}:</span>
                             <span class="astro-sign-name">${F}</span>
                        </div>
                        <div class="astro-coords-row">${p}° ${_}' ${y}"</div>
                    </div>
                `}return`<div class="astro-data-item"><strong>${N}:</strong> n/a</div>`};const l=n.date.split("-"),u=parseInt(l[0]),h=parseInt(l[1])-1,f=parseInt(l[2]);let w=12,E=0;if(n.time){const I=n.time.split(":");w=parseInt(I[0]),E=parseInt(I[1])}const x=new e({year:u,month:h,date:f,hour:w,minute:E,latitude:parseFloat(o.latitude),longitude:parseFloat(o.longitude),timezone:o.timezone}),D=new r({origin:x,houseSystem:"placidus",zodiac:"tropical"}),L=D.CelestialBodies,A=[];A.push(S("sun","Сонце")),A.push(S("moon","Місяць")),A.push(S("ascendant","ASC")),A.push(S("venus","Венера")),A.push(S("mars","Марс")),A.push(S("jupiter","Юпітер"));let B="";const C=document.createElement("div");C.style.position="absolute",C.style.left="-9999px",C.style.width="600px",C.style.height="600px",document.body.appendChild(C);try{new i(D).render(C);const N=C.querySelector("svg");N&&(N.style.backgroundColor="transparent",N.querySelectorAll("line, circle, path").forEach(m=>{const p=m.getAttribute("stroke");(!p||p==="#000000"||p==="#000"||p==="black")&&(m.setAttribute("stroke","#cda45e"),m.setAttribute("stroke-width","1.5"))}),N.querySelectorAll("text").forEach(m=>{m.setAttribute("fill","#cda45e"),m.style.fill="#cda45e",m.style.fontFamily="'Montserrat', sans-serif",m.style.fontWeight="500"}),B=`
                    <div class="astro-chart-preview">
                        ${C.innerHTML}
                    </div>
                `)}catch(I){console.warn("Chart Render Error:",I)}return document.body.removeChild(C),`
            <div class="astro-data-box">
                <div class="astro-data-title">${t&&t.productType==="partner"?"Твій Астро-Код Кохання":"Твій Космічний Відбиток"}</div>
                ${B} 
                <div class="astro-data-grid">
                    ${A.join("")}
                </div>
            </div>
        `}catch(l){return console.error("Fingerprint render error:",l),`<div class="astro-data-box"><p class="text-xs text-red-400 text-center">Помилка розрахунку: ${l.message}</p></div>`}}function mf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=Tc;const e=document.getElementById("result-title"),r=document.getElementById("free-report-title"),i=document.getElementById("free-report-text"),o=document.getElementById("upgrade-button"),l=document.getElementById("marketing-divider"),u=document.getElementById("marketing-hook-block"),h=document.getElementById("premium-form-title-container"),f=document.getElementById("premium-form-container"),w=document.getElementById("birth-time"),E=document.getElementById("time-placeholder"),x=w?w.closest(".input-field"):null,D=document.getElementById("time-error-message"),L=document.getElementById("birth-city"),S=document.getElementById("city-error-message"),A=document.getElementById("city-info-message"),B=document.getElementById("skip-button"),C=T.get("freeReport");if(!C){n.navigateTo("welcome");return}let I="";const N=R=>R?R.replace(/\*\*(.*?)\*\*/g,'<span style="color: var(--primary-text-color); font-weight: normal;">$1</span>').replace(/\\n/g,"<br>"):"";if(C.forecast_preview||C.theme_year){console.log("Rendering Forecast Preview (Accordion)...");let R="";C.theme_year&&(R=`<div class="mb-4" style="text-align: center; padding: 12px 0;">
                <span style="color: var(--accent-color); font-size: 0.75em; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Архетип Року</span>
                <h3 style="color: #fff; font-size: 1.3em; font-weight: 700; margin-top: 4px;">🦁 ${C.theme_year}</h3>
            </div>`);const k=[{emoji:"🌪",title:"Вітер Змін"},{emoji:"⚓️",title:"Прихована Пастка"},{emoji:"🎫",title:"Золотий Квиток"}];let V=[];if(C.forecast_preview){const K=C.forecast_preview.split(/<br\s*\/?>\s*<br\s*\/?>/gi).map(X=>X.replace(/^<br\s*\/?>|<br\s*\/?>$/gi,"").trim()).filter(X=>X.length>10),Q=["Вітер Змін","Прихована Пастка","Золотий Квиток"],G=[[],[],[]];let rt=-1;for(const X of K){const W=X.replace(/<[^>]*>/g,""),Z=Q.findIndex(at=>W.includes(at));if(Z!==-1){if(rt=Z,W.replace(/[:\s]/g,"").length<40)continue;const at=X.replace(/<(?:span[^>]*|b)>[^<]*(?:Вітер Змін|Прихована Пастка|Золотий Квиток)[^<]*<\/(?:span|b)>/gi,"").replace(/^[:\s]+/g,"").trim();at&&G[rt].push(at);continue}rt>=0?G[rt].push(X):G[0].push(X)}V=k.map((X,W)=>({...X,content:N(G[W].join("<br><br>"))}))}(V.length===0||V.every(H=>!H.content))&&(V=[{emoji:"🔮",title:"Попередній Прогноз",content:N(C.forecast_preview||"")}]),I=R+`
            <style>
                @keyframes bounce-small {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(3px); }
                }
                .animate-bounce-small {
                    animation: bounce-small 2s infinite;
                    display: inline-block;
                }
            </style>
        `+V.map((H,K)=>{const Q=K===0,G=K===V.length-1;return`
                <div class="accordion-item ${Q?"accordion-open":""}" style="
                    background-color: rgba(28, 28, 30, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
                ">
                    <div class="accordion-header" style="
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                    " data-index="${K}">
                        <h4 style="
                            color: var(--accent-color);
                            font-weight: 700;
                            text-transform: uppercase;
                            font-size: 0.85em;
                            letter-spacing: 1.5px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin: 0;
                        ">
                            <span style="font-size: 1.2em;">${H.emoji}</span> ${H.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em; transition: transform 0.3s ease;">▼</span>
                    </div>

                    <div class="accordion-content" style="
                        max-height: ${Q?"1000px":"0"};
                        overflow: hidden;
                        transition: max-height 0.4s ease-out;
                    ">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${H.content}
                            
                            ${G?"":`
                                <button class="next-section-btn" data-target="${K+1}" style="
                                    display: block;
                                    width: 100%;
                                    margin-top: 20px;
                                    padding: 12px;
                                    background: rgba(255, 255, 255, 0.05);
                                    border: 1px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 8px;
                                    color: var(--primary-text-color);
                                    font-size: 0.9em;
                                    cursor: pointer;
                                    transition: all 0.2s;
                                ">
                                    Читати далі <span class="animate-bounce-small">👇</span>
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `}).join("")}else if(C.superpower||C.blind_spot||C.teaser_hook){console.log("Rendering Partner Match Data...");let R=[];C.superpower&&R.push(`<div class="mb-4"><h4 style="color: var(--accent-color); font-weight: 700; margin-bottom: 5px;">${C.superpower.title||"Твоя Суперсила"}</h4><p>${N(C.superpower.text)}</p></div>`),C.blind_spot&&R.push(`<div class="mb-4"><h4 style="color: var(--accent-color); font-weight: 700; margin-bottom: 5px;">${C.blind_spot.title||"Сліпа Зона"}</h4><p>${N(C.blind_spot.text)}</p></div>`),C.teaser_hook&&R.push(`<div class="mt-5 p-4 rounded-lg" style="background: rgba(205, 164, 94, 0.1);"><h4 style="color: #fff; font-weight: 700;">${C.teaser_hook.title||"Ключ до щастя"} 🗝️</h4><p>${N(C.teaser_hook.text)}</p></div>`),I=R.join("")}else if(C.psychological_analysis||C.content_blocks){const R=[{emoji:"✨",title:"Твій Зірковий Архетип"},{emoji:"⚡️",title:"Прихований Внутрішній Конфлікт"},{emoji:"🗝️",title:"Твій Ключ до Змін"}];let k=[];if(C.content_blocks)k=[{...R[0],content:N(C.content_blocks.archetype||"")},{...R[1],content:N(C.content_blocks.conflict||"")},{...R[2],content:N(C.content_blocks.solution||"")}];else{const U=C.psychological_analysis||"",H=U.split(/(?:\\n\\n|\n\n|<br\s*\/?>\s*<br\s*\/?>)/gi).map(K=>K.trim()).filter(K=>K.length>20);k=R.map((K,Q)=>{let G="";return H.length>=3?Q<2?G=H[Q]:G=H.slice(Q).join("<br><br>"):H.length===2?(Q===0&&(G=H[0]),Q===1&&(G=H[1]),Q===2&&(G="Це лише початок твоєї історії... Справжня глибина розкриється у повному звіті.")):(Q===0&&(G=U),Q===1&&(G="Ця частина твого характеру часто залишається в тіні, але саме вона дає тобі перевагу в критичні моменти."),Q===2&&(G="Твоя карта містить ще багато таємниць, які ми готові розкрити.")),{...K,content:N(G)}})}I=`
            <style>
                @keyframes bounce-small {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(3px); }
                }
                .animate-bounce-small {
                    animation: bounce-small 2s infinite;
                    display: inline-block;
                }
            </style>
        `+k.map((U,H)=>{const K=H===0,Q=H===2;return`
                <div class="accordion-item ${K?"accordion-open":""}" style="
                    background-color: rgba(28, 28, 30, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
                ">
                    <!-- Header -->
                    <div class="accordion-header" style="
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                    " data-index="${H}">
                        <h4 style="
                            color: var(--accent-color);
                            font-weight: 700;
                            text-transform: uppercase;
                            font-size: 0.85em;
                            letter-spacing: 1.5px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin: 0;
                        ">
                            <span style="font-size: 1.2em;">${U.emoji}</span> ${U.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em; transition: transform 0.3s ease;">▼</span>
                    </div>

                    <!-- Content -->
                    <div class="accordion-content" style="
                        max-height: ${K?"1000px":"0"};
                        overflow: hidden;
                        transition: max-height 0.4s ease-out;
                    ">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${U.content}
                            
                            ${Q?`
                                <div id="last-accordion-item-extras">
                                    <!-- Marketing / Feedback injected here -->
                                </div>
                            `:`
                                <button class="next-section-btn" data-target="${H+1}" style="
                                    display: block;
                                    width: 100%;
                                    margin-top: 20px;
                                    padding: 12px;
                                    background: rgba(255, 255, 255, 0.05);
                                    border: 1px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 8px;
                                    color: var(--primary-text-color);
                                    font-size: 0.9em;
                                    cursor: pointer;
                                    transition: all 0.2s;
                                ">
                                    Читати далі <span class="animate-bounce-small">👇</span>
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `}).join("")}else I="<p>Дані відсутні.</p>";let $=C.title||"Результат";C.archetype_she&&C.archetype_he&&($=`💖 Твій Любовний Сценарій: ${C.archetype_she} та ${C.archetype_he}`),e.innerText="Аналіз твоєї особистості",r.innerHTML=$,i.innerHTML=I,O(i);const F=T.get("currentVariant");if(F&&F.ui&&F.ui.results){const R=F.ui.results;if(R.title&&(e.innerText=R.title),R.marketingHook){const k=document.querySelector("#marketing-hook-block p");k&&(k.innerHTML=R.marketingHook)}if(R.features&&Array.isArray(R.features)){const k=document.querySelector("#marketing-hook-block ul");k&&(k.innerHTML=R.features.map(V=>`
                    <li class="flex items-center"><span class="mr-2 text-xl">${V.icon}</span> ${V.text}</li>
                `).join(""))}if(R.buttonText){const k=o.querySelector(".btn-text");k&&(k.innerHTML=`
                    ${R.buttonText}
                    <span class="font-bold tracking-widest flex gap-[1px]">
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                    </span>
                `)}}const m=F?.id==="natal_chart_price"||F?.id==="natal_chart_offer"||F?.id==="natal_chart_offer1uah",p=F?.id==="natal_chart_offer"||F?.id==="natal_chart_offer1uah";if(m){let R=function(){!w||!E||(w.value?(E.innerText=w.value,E.style.color="var(--primary-text-color)",x&&x.classList.remove("input-error"),D&&(D.style.display="none")):(E.innerText="Обери час",E.style.color="var(--secondary-text-color)"))};if(l&&(l.style.display="none"),u&&(u.style.display="none"),h&&(h.style.display="block"),f&&(f.style.display="block"),p){const k=Xt();Fn(),e&&(e.innerText="Твій Персональний Розбір"),h&&(h.innerHTML=`
                    <h2 class="text-2xl font-bold text-white tracking-tight">
                        Уточни дані для<br><span style="color: var(--accent-color);">ПОВНОЇ РОЗШИФРОВКИ</span>
                    </h2>
                    <p class="text-sm" style="color: var(--secondary-text-color);">
                        Введи час і місто народження — і отримай персональний звіт одразу після оплати
                    </p>
                `);const V=o.querySelector(".btn-text");V&&(V.innerHTML=`
                    <span class="flex flex-col items-center gap-0">
                        <span class="text-[15px] xs:text-[17px] sm:text-[20px] font-bold leading-tight tracking-tight">
                            Отримати Розшифровку за ${k.display.FULL_REPORT} грн
                            <span class="line-through opacity-60 text-[12px] font-normal ml-1">${k.display.FULL_REPORT_OLD} грн</span>
                        </span>
                        <span class="text-[10px] uppercase tracking-[1px] opacity-90 mt-1">Одноразовий платіж • Довічний доступ</span>
                    </span>
                `);const U=document.getElementById("footer-trust-text");U&&(U.innerHTML='<span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">🔒 Безпечна оплата через Monobank</span>'),document.querySelectorAll(".offer-landing-block").forEach(W=>W.style.display="block");const K=document.getElementById("offer-form-divider");K&&(K.style.display="block");const Q=document.getElementById("offer-urgency-timer");if(Q){let W=900;const Z=document.getElementById("offer-timer-display");Z&&!window._offerTimerStarted&&(window._offerTimerStarted=!0,setInterval(()=>{W--,W<0&&(W=0);const at=Math.floor(W/60).toString().padStart(2,"0"),Bt=(W%60).toString().padStart(2,"0");Z.textContent=`${at}:${Bt}`},1e3))}const G=document.querySelector(".sticky-paywall-footer");G&&(G.style.opacity="0",G.style.transform="translateY(100%)",G.style.transition="opacity 0.5s ease, transform 0.5s ease",G.style.pointerEvents="none");const rt=document.getElementById("offer-form-divider");if(rt&&G&&"IntersectionObserver"in window){const W=new IntersectionObserver(Z=>{Z.forEach(at=>{at.isIntersecting&&(Q&&(Q.style.display="block"),G.style.opacity="1",G.style.transform="translateY(0)",G.style.pointerEvents="auto",W.disconnect())})},{threshold:.3});W.observe(rt)}else Q&&(Q.style.display="block"),G&&(G.style.opacity="1",G.style.transform="translateY(0)",G.style.pointerEvents="auto");const X=document.getElementById("offer-astro-data-container");if(X){const W=T.get("userData")||{date:T.get("date"),time:T.get("time"),city:T.get("city"),geo:T.get("geo")};Oe(W).then(Z=>{Z&&(X.innerHTML=Z)})}setTimeout(()=>{const W=document.getElementById("last-accordion-item-extras");if(W){W.innerHTML=`
                        <div style="margin-top: 20px; padding: 16px; background: rgba(205, 164, 94, 0.08); border: 1px solid rgba(205, 164, 94, 0.15); border-radius: 10px;">
                            <p style="color: var(--accent-color); font-weight: 700; font-size: 0.95em; margin-bottom: 8px;">Але це лише верхівка айсберга...</p>
                            <p style="color: var(--secondary-text-color); font-size: 0.88em; line-height: 1.6; margin: 0;">
                                У <strong style="color: #fff;">Повній Розшифровці</strong> ти дізнаєшся про свій Код Кохання, Грошовий Потік, Кармічні Уроки та унікальну Місію — те, що безкоштовний аналіз навіть не торкнувся.
                            </p>
                        </div>
                    `;const Z=W.closest(".accordion-content");if(Z){const at=Z.closest(".accordion-item");at&&at.classList.contains("accordion-open")&&(Z.style.maxHeight=parseInt(Z.style.maxHeight||0)+200+"px")}}},100)}else{const k=o.querySelector(".btn-text");k&&(k.innerHTML=`
                    Дізнатися всі подробиці
                    <span class="font-bold tracking-widest flex gap-[1px]">
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                    </span>
                `)}w&&(w.addEventListener("input",R),w.addEventListener("change",R),w.addEventListener("blur",R),R()),L&&L.addEventListener("input",()=>{S&&(S.style.display="none"),A&&(A.style.display="none"),L.classList.remove("input-error")})}function b(R,k){R&&(k?(R.classList.add("loading"),R.disabled=!0):(R.classList.remove("loading"),R.disabled=!1))}function _(R,k){!S||!L||(R==="ambiguous"?S.innerText=`Місто "${k}" знайдено в кількох місцях. Уточни, додавши країну (напр: ${k}, Україна).`:S.innerText=`Не можемо знайти місто "${k}". Перевір назву.`,S.style.display="block",L.classList.add("input-error"))}o.addEventListener("click",async()=>{if(m){const R=w?w.value:"";let k=L?L.value.trim():"";const V=k;let U=!1;if(S&&(S.style.display="none"),D&&(D.style.display="none"),x&&x.classList.remove("input-error"),L&&L.classList.remove("input-error"),k||(L&&L.classList.add("input-error"),S&&(S.innerText="Будь ласка, введи місто народження.",S.style.display="block"),U=!0),R||(x&&x.classList.add("input-error"),D&&(D.style.display="block"),U=!0),U){f&&f.scrollIntoView({behavior:"smooth",block:"center"}),navigator.vibrate&&navigator.vibrate(50);return}b(o,!0);const H=await Ke(k);let K=null;if(H&&H.latitude?(H.corrected_name&&(L&&(L.value=H.corrected_name),k=H.corrected_name,V.toLowerCase()!==H.corrected_name.toLowerCase()&&(K=`Ми уточнили: ${H.corrected_name} 😉`)),T.set("geo",{latitude:H.latitude||H.lat,longitude:H.longitude||H.lon,timezone:H.timezone}),T.set("city",H.corrected_name)):H&&H.error==="ambiguous"?(_("ambiguous",k),U=!0):(_("not_found",k),U=!0),K&&A?(A.innerText=K,A.style.display="block"):A&&(A.style.display="none"),U){b(o,!1),navigator.vibrate&&navigator.vibrate(50);return}T.set("time",R);const Q={date:T.get("date"),time:R,city:T.get("city"),geo:T.get("geo")};if(T.set("userData",Q),p){const G=async()=>{try{const rt=Xt();window.DC_Analytics?.trackBeginCheckout&&window.DC_Analytics.trackBeginCheckout(rt.charge.FULL_REPORT,"Natal Chart Full Report");const X=T.get("planets");let W=X?{...Q,planets:X}:{...Q};const Z=F?.productName||"Natal Chart Full Report",at=T.get("email")||"";try{localStorage.setItem("pendingVariantId",F.id)}catch{}let Bt="source=offer";F?.id&&(Bt+=`&variant=${F.id}`),await On({name:Z,price:rt.charge.FULL_REPORT},{email:at},W,{returnQueryParams:Bt,variant:F?.id})}catch(rt){console.error("❌ Offer Payment Error:",rt),b(o,!1)}};K?setTimeout(G,1200):G();return}setTimeout(()=>{n.navigateTo("paywall")},K?1200:0)}else n.navigateTo("premium")}),B&&B.addEventListener("click",async()=>{if(!m)return;let R=L?L.value.trim():"";const k=R;if(S&&(S.style.display="none"),D&&(D.style.display="none"),L&&L.classList.remove("input-error"),x&&x.classList.remove("input-error"),!R){L&&L.classList.add("input-error"),S&&(S.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",S.style.display="block"),navigator.vibrate&&navigator.vibrate(50);return}b(o,!0),B.disabled=!0;const V=await Ke(R);let U=null,H=!1;if(V&&V.latitude?(V.corrected_name&&(L&&(L.value=V.corrected_name),R=V.corrected_name,k.toLowerCase()!==V.corrected_name.toLowerCase()&&(U=`Ми уточнили: ${V.corrected_name} 😉`)),T.set("geo",{latitude:V.latitude||V.lat,longitude:V.longitude||V.lon,timezone:V.timezone}),T.set("city",V.corrected_name),T.set("time","")):V&&V.error==="ambiguous"?(_("ambiguous",R),H=!0):(_("not_found",R),H=!0),U&&A&&(A.innerText=U,A.style.display="block"),H){b(o,!1),B.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}const K={date:T.get("date"),time:"",city:T.get("city"),geo:T.get("geo")};if(T.set("userData",K),p){const Q=async()=>{try{const G=Xt();window.DC_Analytics?.trackBeginCheckout&&window.DC_Analytics.trackBeginCheckout(G.charge.FULL_REPORT,"Natal Chart Full Report");const rt=T.get("planets");let X=rt?{...K,planets:rt}:{...K};const W=F?.productName||"Natal Chart Full Report",Z=T.get("email")||"";try{localStorage.setItem("pendingVariantId",F.id)}catch{}let at="source=offer";F?.id&&(at+=`&variant=${F.id}`),await On({name:W,price:G.charge.FULL_REPORT},{email:Z},X,{returnQueryParams:at,variant:F?.id})}catch(G){console.error("❌ Offer Skip Payment Error:",G),b(o,!1),B.disabled=!1}};U?setTimeout(Q,1200):Q();return}setTimeout(()=>{n.navigateTo("paywall")},U?1200:0)}),y();function y(){if(document.querySelector(".feedback-controls"))return;const R=document.createElement("div");R.className="feedback-controls";const k=document.createElement("div");k.className="feedback-buttons";const V=v("👍","like"),U=v("👎","dislike");k.appendChild(U),k.appendChild(V),R.appendChild(k),i&&i.parentNode?i.after(R):console.warn("Feedback System: Could not find insertion point (freeReportTextEl)")}function v(R,k){const V=document.createElement("div");return V.className="btn-feedback-icon",V.innerText=R,V.onclick=async()=>{V.parentElement.querySelectorAll(".btn-feedback-icon").forEach(H=>H.classList.remove("active")),V.classList.add("active"),await Vr.send({type:k,value:k,source:"free_report"}),d("Дякую! 💜")},V}function d(R){const k=document.createElement("div");k.innerText=R,k.style.position="fixed",k.style.top="20px",k.style.left="50%",k.style.transform="translate(-50%, -20px)",k.style.background="linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)",k.style.color="#fff",k.style.border="1px solid rgba(205, 164, 94, 0.3)",k.style.boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px -3px rgba(205, 164, 94, 0.1)",k.style.padding="12px 24px",k.style.borderRadius="99px",k.style.fontWeight="bold",k.style.opacity="0",k.style.transition="all 0.3s ease",k.style.zIndex="2000",document.body.appendChild(k),requestAnimationFrame(()=>{k.style.opacity="1",k.style.transform="translate(-50%, 0)"}),setTimeout(()=>{k.style.opacity="0",k.style.transform="translate(-50%, -20px)",setTimeout(()=>document.body.removeChild(k),300)},900)}function O(R){const k=R.querySelectorAll(".accordion-header"),V=R.querySelectorAll(".accordion-item"),U=R.querySelectorAll(".next-section-btn");function H(K,Q=!1){V.forEach((G,rt)=>{const X=G.querySelector(".accordion-content"),W=G.querySelector(".accordion-icon");rt===K?(G.classList.contains("accordion-open")?(G.classList.remove("accordion-open"),X&&(X.style.maxHeight=null),W&&(W.style.transform="rotate(0deg)")):(G.classList.add("accordion-open"),X&&(X.style.maxHeight=X.scrollHeight+300+"px"),W&&(W.style.transform="rotate(180deg)")),setTimeout(()=>{const Z=G.querySelector(".accordion-header");Z&&Z.scrollIntoView({behavior:"smooth",block:"start"})},300)):Q||(G.classList.remove("accordion-open"),X&&(X.style.maxHeight=null),W&&(W.style.transform="rotate(0deg)"))})}k.forEach(K=>{K.addEventListener("click",()=>{const Q=parseInt(K.getAttribute("data-index"));H(Q,!0)})}),U.forEach(K=>{K.addEventListener("click",Q=>{Q.stopPropagation();const G=parseInt(K.getAttribute("data-target"));G<V.length&&H(G,!0)})})}}const gf=`<section id="premium-data-step" class="funnel-step active space-y-5 text-center" style="padding-bottom: 110px;">

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
            <label for="birth-time" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2"
                style="color: var(--accent-color);">Час народження</label>

            <div
                class="input-field h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2"
                    style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>

                <span id="time-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обери
                    час</span>
                <input type="time" id="birth-time" name="birth-time"
                    class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10">
            </div>

            <p id="time-error-message" class="error-text" style="display: none;">
                Будь ласка, обери час народження.
            </p>
        </div>

        <!-- City Input -->
        <div>
            <label for="birth-city" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2"
                style="color: var(--accent-color);">Місто народження</label>

            <input type="text" id="birth-city" name="birth-city" placeholder="Наприклад, Київ"
                class="input-field text-center hover:border-[#cda45e] transition-colors w-full"
                style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; background-color: var(--card-bg-color) !important; opacity: 1;">

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

                #birth-city:focus::placeholder {
                    opacity: 0;
                    color: transparent;
                    -webkit-text-fill-color: transparent !important;
                }
            </style>

            <p id="city-error-message" class="error-text">Текст помилки...</p>
            <p id="city-info-message" class="info-text"></p>
        </div>

        <!-- 🔥 NEW LOCATION: Value Proposition List (Clean, No Border) -->
        <!-- Цей блок тепер тут: під полями, над кнопкою. Без фону і рамок. -->
        <div class="text-left mx-auto max-w-[340px] pt-2 pb-1">
            <p class="text-[10px] text-center mb-3 uppercase tracking-widest opacity-50"
                style="color: var(--secondary-text-color);">Що буде розраховано:</p>
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
                    <span style="color: var(--primary-text-color);"><strong>Майбутнє</strong> (Персональний
                        прогноз)</span>
                </li>
            </ul>
        </div>

    </div>

    <!-- 🔥 STICKY FOOTER BUTTON (COMPACT) -->
    <div class="sticky-paywall-footer"
        style="padding-top: 0.5rem; padding-bottom: calc(0.4rem + env(safe-area-inset-bottom));">
        <button type="button" id="continue-to-paywall-button" class="btn btn-primary w-full !text-lg !py-3 shadow-xl">
            <span class="btn-text">Отримати детальний аналіз</span>
            <span class="btn-spinner"></span>
        </button>

        <button type="button" id="skip-button" class="btn btn-skip opacity-80 text-xs"
            style="margin-top: 4px; padding-top: 4px; padding-bottom: 4px;">
            Я не знаю часу (Розрахувати Космограму без Домів)
        </button>
    </div>
</section>`;function yf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=gf;const e=document.getElementById("birth-time"),r=document.getElementById("time-placeholder"),i=e.closest(".input-field"),o=document.getElementById("time-error-message"),l=document.getElementById("birth-city"),u=document.getElementById("city-error-message"),h=document.getElementById("city-info-message"),f=document.getElementById("continue-to-paywall-button"),w=document.getElementById("skip-button"),E=T.get("currentVariant");if(E&&E.ui&&E.ui.premium){const S=E.ui.premium,A=document.querySelector("h2");A&&S.title&&(A.innerText=S.title);const B=document.querySelector(".space-y-2 p.text-sm");if(B&&S.subtitle&&(B.innerText=S.subtitle),S.features&&Array.isArray(S.features)){const C=document.querySelector(".max-w-\\[340px\\] ul");C&&(C.innerHTML=S.features.map(I=>`
                    <li class="flex items-center gap-3">
                        <span class="text-lg min-w-[24px] text-center">${I.icon}</span>
                        <span style="color: var(--primary-text-color);">${I.text}</span>
                    </li>
                `).join(""))}if(S.buttonText){const C=f.querySelector(".btn-text");C&&(C.innerText=S.buttonText)}}function x(){!e||!r||(e.value?(r.innerText=e.value,r.style.color="var(--primary-text-color)",i&&i.classList.remove("input-error"),o&&(o.style.display="none")):(r.innerText="Обери час",r.style.color="var(--secondary-text-color)"))}e.addEventListener("input",x),e.addEventListener("change",x),e.addEventListener("blur",x),x(),l.addEventListener("input",()=>{u.style.display="none",h.style.display="none",l.classList.remove("input-error")});function D(S,A){S&&(A?(S.classList.add("loading"),S.disabled=!0):(S.classList.remove("loading"),S.disabled=!1))}function L(S,A){S==="ambiguous"?u.innerText=`Місто "${A}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну (наприклад: ${A}, Україна).`:u.innerText=`Не можемо знайти місто "${A}". Перевірте назву.`,u.style.display="block",l.classList.add("input-error")}f.addEventListener("click",async()=>{const S=e.value;let A=l.value.trim();const B=A;let C=!1;if(u.style.display="none",o.style.display="none",i.classList.remove("input-error"),l.classList.remove("input-error"),A||(l.classList.add("input-error"),u.innerText="Будь ласка, введи місто народження.",u.style.display="block",C=!0),S||(i.classList.add("input-error"),o.style.display="block",C=!0),!A&&C){navigator.vibrate&&navigator.vibrate(50);return}D(f,!0);const I=await Ke(A);let N=null;if(I&&I.latitude?(I.corrected_name&&(l.value=I.corrected_name,A=I.corrected_name,B.toLowerCase()!==I.corrected_name.toLowerCase()&&(N=`Ми уточнили: ${I.corrected_name} 😉`)),T.set("geo",{latitude:I.latitude||I.lat,longitude:I.longitude||I.lon,timezone:I.timezone}),T.set("city",I.corrected_name)):I&&I.error==="ambiguous"?(L("ambiguous",A),C=!0):(L("not_found",A),C=!0),N?(h.innerText=N,h.style.display="block"):h.style.display="none",C){D(f,!1),navigator.vibrate&&navigator.vibrate(50);return}T.set("time",S);const $={date:T.get("date"),time:S,city:T.get("city"),geo:T.get("geo")};T.set("userData",$),setTimeout(()=>{n.navigateTo("paywall")},N?1200:0)}),w.addEventListener("click",async()=>{let S=l.value.trim();const A=S;if(u.style.display="none",o.style.display="none",l.classList.remove("input-error"),i.classList.remove("input-error"),!S){l.classList.add("input-error"),u.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",u.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}D(f,!0),w.disabled=!0;const B=await Ke(S);let C=null,I=!1;if(B&&B.latitude?(B.corrected_name&&(l.value=B.corrected_name,S=B.corrected_name,A.toLowerCase()!==B.corrected_name.toLowerCase()&&(C=`Ми уточнили: ${B.corrected_name} 😉`)),T.set("geo",{latitude:B.latitude||B.lat,longitude:B.longitude||B.lon,timezone:B.timezone}),T.set("city",B.corrected_name),T.set("time","")):B&&B.error==="ambiguous"?(L("ambiguous",S),I=!0):(L("not_found",S),I=!0),C&&(h.innerText=C,h.style.display="block"),I){D(f,!1),w.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}console.log("User skipped time, but city is valid.");const N={date:T.get("date"),time:"",city:T.get("city"),geo:T.get("geo")};T.set("userData",N),setTimeout(()=>{n.navigateTo("paywall")},C?1200:0)})}const vf=`<!-- 🔥 UPDATE: Додано padding-bottom: 140px, щоб відповідати компактнішому футеру -->
<section id="final-paywall-step" class="funnel-step active space-y-6" style="padding-bottom: 140px;">

    <div class="text-center space-y-2">
        <!-- Заголовок -->
        <h2 class="text-2xl font-bold text-white leading-tight">Детальний портрет твоєї особистості готовий</h2>

        <!-- Таймер -->
        <div
            class="flex flex-col items-center justify-center bg-green-900/20 border border-green-500/30 rounded-lg py-1 px-4 w-full max-w-[180px] mx-auto backdrop-blur-sm mt-3">
            <span class="text-[8px] uppercase tracking-[1.5px] text-green-400/80 mb-0 font-bold">Доступно лише</span>
            <div class="flex items-baseline gap-1">
                <span id="paywall-timer"
                    class="text-3xl font-bold font-mono text-green-400 tracking-widest drop-shadow-sm leading-none mt-1">07:00</span>
                <span class="text-[10px] text-green-400/70">хв</span>
            </div>
        </div>
    </div>

    <!-- Блок Довіри (Космічний Відбиток) -->
    <div class="space-y-1 relative">
        <!-- Статичний блок (плейсхолдер) -->
        <div class="astro-data-box static-placeholder"
            style="margin: 0; padding: 0.75rem 1rem; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 0.75rem; text-align: center;">
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
        <strong class="text-white">Розблокуй</strong> свою повну натальну карту щоб дізнатися подробиці всіх сфер свого
        життя (5+ сторінок).
    </p>

    <!-- RICH LIST (Список Вигод) -->
    <div class="space-y-3 pt-2">
        <div class="paywall-item"
            onclick="showPaywallPopup('Ядро Особистості', 'Дізнайся, що говорять про тебе зірки. Твій істинний характер, сильні сторони та приховані таланти.')">
            <span class="paywall-icon">🎭</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Ядро Особистості</span>
                <span class="text-xs text-gray-400">Як тебе бачать люди і яка ти насправді.</span>
            </div>
        </div>
        <div class="paywall-item"
            onclick="showPaywallPopup('Код Твого Кохання', 'Чому не щастить у коханні? Який партнер тобі справді потрібен? Розкрий секрети своєї Венери.')">
            <span class="paywall-icon">❤️‍🔥</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Код Твого Кохання</span>
                <span class="text-xs text-gray-400">Типаж ідеального партнера та причини невдач.</span>
            </div>
        </div>
        <div class="paywall-item"
            onclick="showPaywallPopup('Грошовий Потік', 'Де твої великі гроші? Яка професія принесе тобі багатство та успіх? Астрологічний ключ до фінансів.')">
            <span class="paywall-icon">💸</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Грошовий Потік</span>
                <span class="text-xs text-gray-400">Твої приховані таланти що приносять гроші.</span>
            </div>
        </div>
        <div class="paywall-item"
            onclick="showPaywallPopup('Кармічні Уроки', 'Для чого твоя душа прийшла в цей світ? Які уроки тобі треба пройти, щоб стати щасливою?')">
            <span class="paywall-icon">🔮</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Кармічні Уроки та Призначення</span>
                <span class="text-xs text-gray-400">Для чого твоя душа прийшла в цей світ.</span>
            </div>
        </div>
        <div class="paywall-item"
            onclick="showPaywallPopup('Майбутні Можливості', 'Що готують тобі зірки? Персональний астрологічний прогноз на найближчий час.')">
            <span class="paywall-icon">⚡️</span>
            <div>
                <span class="block font-bold text-white text-[15px]">Твої Майбутні Можливості</span>
                <span class="text-xs text-gray-400">Астрологічний клімат: як діяти саме зараз для успіху.</span>
            </div>
        </div>
    </div>

    <!-- 🔥 STICKY FOOTER BUTTON (COMPACT VERSION) 🔥 -->
    <div class="sticky-paywall-footer"
        style="padding-top: 1rem; padding-bottom: calc(1rem + env(safe-area-inset-bottom));">
        <button id="final-checkout-button"
            class="btn btn-primary w-full !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden px-1">
            <span class="btn-text flex flex-col items-center justify-center gap-0 w-full tracking-tighter">
                <span class="flex items-center justify-center gap-1 xs:gap-2 flex-wrap text-center">
                    <span class="text-[15px] xs:text-[17px] sm:text-[20px] font-bold leading-tight tracking-tight">
                        Розблокувати зараз за 347 грн
                    </span>
                    <span
                        class="whitespace-nowrap text-xs xs:text-sm font-normal opacity-60 line-through decoration-white/50 leading-none pb-[1px]">
                        997 грн
                    </span>
                </span>
                <span class="text-[10px] uppercase tracking-[1px] opacity-90 mt-1">Одноразовий платіж • Довічний
                    доступ</span>
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
            <span id="popup-close-icon"
                class="absolute top-2 right-4 text-gray-400 hover:text-white cursor-pointer text-3xl font-light transition-colors leading-none"
                style="z-index: 10;">&times;</span>

            <h3 id="popup-title" class="text-xl font-bold text-white mb-4 leading-tight pr-6" style="color: #cda45e;">
            </h3>

            <div id="popup-text" class="text-left"
                style="color: var(--secondary-text-color); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6;">
            </div>

            <button id="popup-checkout-btn" class="btn btn-primary w-full !py-4 shadow-xl">
                <span class="btn-text flex flex-col items-center justify-center gap-0 w-full tracking-tighter">
                    <span class="flex items-center gap-2">
                        <span class="text-[16px] font-bold leading-tight text-center">
                            Розблокувати зараз за 347 грн
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

            0%,
            100% {
                opacity: 0.8;
                text-shadow: 0 0 0 rgba(205, 164, 94, 0);
            }

            50% {
                opacity: 1;
                text-shadow: 0 0 10px rgba(205, 164, 94, 0.6);
                transform: scale(1.02);
            }
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
</section>`;function bf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=vf,t.scrollTop=0,window.scrollTo(0,0);const e=Xt(),r=document.getElementById("paywall-timer"),i=document.getElementById("paywall-astro-data"),o=document.querySelector(".static-placeholder"),l=document.getElementById("final-checkout-button"),u=document.getElementById("paywall-popup"),h=document.getElementById("popup-title"),f=document.getElementById("popup-text"),w=document.getElementById("popup-checkout-btn"),E=document.getElementById("popup-close-btn"),x=document.getElementById("popup-close-icon");Fn();function D(){const $=l.querySelector(".btn-text span span.font-bold");$&&($.innerText=`Розблокувати все за ${e.display.FULL_REPORT} грн`);const F=l.querySelector(".line-through");F&&(F.innerText=`${e.display.FULL_REPORT_OLD||799} грн`);const m=w.querySelector(".font-bold");m&&(m.innerText=`Розблокувати все за ${e.display.FULL_REPORT} грн`)}D();const L=T.get("currentVariant");if(L&&L.ui&&L.ui.paywall){const $=L.ui.paywall,F=document.querySelector("h2");F&&$.title&&(F.innerHTML=$.title);const m=document.querySelector("p.text-sm.sm\\:text-base");if(m&&$.description&&(m.innerHTML=$.description),$.features&&Array.isArray($.features)){const p=document.querySelector(".space-y-3.pt-2");if(p){const b=_=>_?_.replace(/'/g,"\\'").replace(/"/g,"&quot;"):"";p.innerHTML=$.features.map(_=>`
                    <div class="paywall-item" onclick="showPaywallPopup('${b(_.popupTitle||_.title)}', '${b(_.popupText||_.text)}')">
                        <span class="paywall-icon">${_.icon}</span>
                        <div>
                            <span class="block font-bold text-white text-[15px]">${_.title}</span>
                            <span class="text-xs text-gray-400">${_.text}</span>
                        </div>
                    </div>
                `).join("")}}if($.buttonText){const p=l.querySelector(".btn-text span span.font-bold");p&&(p.innerText=`${$.buttonText} за ${e.display.FULL_REPORT} грн`);const b=l.querySelector(".line-through");b&&(b.innerText=`${e.display.FULL_REPORT_OLD} грн`);const _=w.querySelector(".font-bold");_&&(_.innerText=`${$.buttonText} за ${e.display.FULL_REPORT} грн`)}}window.showPaywallPopup=function($,F){u&&h&&f&&(h.innerText=$,f.innerHTML=F,u.style.display="flex")};const S=()=>{u&&(u.style.display="none")};E&&E.addEventListener("click",()=>{Pt.trigger("light"),S()}),x&&x.addEventListener("click",()=>{Pt.trigger("light"),S()}),w&&w.addEventListener("click",()=>{Pt.trigger("heavy"),S(),N(l)}),u&&u.addEventListener("click",$=>{$.target===u&&S()});const A=T.get("userData")||{date:T.get("date"),time:T.get("time"),city:T.get("city"),geo:T.get("geo")};i&&Oe(A).then($=>{if($){o&&(o.style.display="none"),i.innerHTML=$,i.style.display="block";const F=T.get("currentVariant");if(F&&F.productType==="partner"){const m=i.querySelector(".astro-data-title");m&&(m.innerText="Твій Астро-Код Кохання")}}else i.style.display="none"});const B=()=>{const $=T.get("currentVariant");if($&&$.productType==="partner"){window.showPaywallPopup("🔑 Код Твого Кохання",`
                <p class="mb-3">Ти бачиш <strong>точні координати</strong> Венеру, Марсу та 7-го дому (градуси та знаки).</p>
                
                <p class="mb-3 text-sm italic" style="color: #cda45e; border-left: 2px solid #cda45e; padding-left: 10px;">
                    "Це формула твого кохання. Вона показує, кого ти шукаєш і хто шукає тебе."
                </p>

                <ul class="text-sm space-y-2 mb-4">
                    <li><strong>Венера ♀:</strong> Твій стиль зваблення та те, що приносить тобі задоволення.</li>
                    <li><strong>Марс ♂:</strong> Типаж чоловіка, який викликає у тебе фізичний потяг.</li>
                    <li><strong>7-й Дім:</strong> Обставини знайомства та сценарій шлюбу.</li>
                </ul>

                <p class="mb-1">В <strong>Повному Портреті</strong> ми розшифруємо ці коди:</p>
                <p class="text-white text-sm">✅ Де саме відбудеться зустріч?<br>✅ Як впізнати "свого" чоловіка серед інших?</p>
            `);return}window.showPaywallPopup("📡 Розшифровка Космічного Коду",`
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
        `)};i&&i.addEventListener("click",()=>{Pt.trigger("medium"),B()}),window.paywallInterval&&clearInterval(window.paywallInterval);let C=420;function I(){if(!r)return;const $=Math.floor(C/60),F=C%60;r.textContent=`${$<10?"0":""}${$}:${F<10?"0":""}${F}`,--C<0&&(C=0,clearInterval(window.paywallInterval))}I(),window.paywallInterval=setInterval(I,1e3);async function N($){$.classList.add("loading"),$.disabled=!0;const F=$.querySelector(".btn-text");F&&($.dataset.originalText=F.innerHTML,F.innerHTML=`<span class="text-lg">З'єднуюсь з банком...</span>`);try{const m=T.get("userData")||{date:T.get("date"),time:T.get("time"),city:T.get("city"),geo:T.get("geo")},p=T.get("planets");let b=p?{...m,planets:p}:{...m};const _=T.get("currentVariant");if(_&&_.id==="natal_child"){const O=localStorage.getItem("childGender");O&&(b.childGender=O,console.log("👶 Injected childGender into payload:",O))}p?console.log("🪐 Planets attached to payment payload:",p.length,"bodies"):console.warn("⚠️ No pre-calculated planets found in state. Backend will use date only."),console.log("📦 Preparing backup data for Safari:",b);const y=_&&_.productName?_.productName:"Natal Chart Full Report",v=T.get("email")||"";if(_&&_.id)try{localStorage.setItem("pendingVariantId",_.id),console.log("💾 Backup Variant ID to LocalStorage:",_.id)}catch(O){console.warn("LocalStorage backup failed",O)}let d="source=paywall";_&&_.id&&(d+=`&variant=${_.id}`),await On({name:y,price:e.charge.FULL_REPORT},{email:v},b,{returnQueryParams:d,variant:_?.id})}catch(m){console.error("Payment error:",m),$.classList.remove("loading"),$.disabled=!1,F&&$.dataset.originalText&&(F.innerHTML=$.dataset.originalText)}}l&&l.addEventListener("click",()=>{Pt.trigger("heavy"),N(l)})}const _f=`<section id="success-step" class="funnel-step active space-y-6">
    <div id="email-capture-box" class="text-center">
        <!-- Icon -->
        <svg class="w-16 h-16 mx-auto mb-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
            <input type="email" id="user-email" name="user-email" placeholder="your.email@gmail.com"
                class="input-field text-center"
                style="background-color: var(--card-bg-color) !important; color: #e0e0e0 !important; -webkit-text-fill-color: #e0e0e0 !important;"
                required>

            <!-- Кнопка змінює стиль на gold-purple, якщо куплено апсел -->
            <button type="submit" id="main-report-btn" class="btn btn-primary !text-lg !py-4">
                <span class="btn-text">Надіслати мені звіт</span>
                <span class="btn-spinner"></span>
            </button>
        </form>

        <!-- LTV Upsell Box -->
        <div id="ltv-upsell-box" class="ltv-upsell-box text-left relative overflow-hidden">
            <!-- Badge -->
            <div class="absolute top-0 right-0 bg-[#9d4edd] text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg"
                style="margin-top: 0; margin-right: 0;">SPECIAL OFFER</div>

            <!-- Content -->
            <h3 class="font-bold text-lg text-white mb-1" style="color: var(--accent-secondary); margin-right: 60px;">
                Додай до свого замовлення
            </h3>

            <p class="text-sm mt-2 mb-4 leading-relaxed" style="color: var(--secondary-text-color);">
                Хочеш повний <strong>Астрологічний Прогноз</strong> на найближчий рік? Дізнатися про свої фінансові
                піки, періоди удачі та успіхи у стосунках?<br>
                <!-- 🔥 UPDATE: Оновлено ціни апселу -->
                <span style="color: var(--primary-text-color);">Лише зараз: <strong>199 грн.</strong> замість <span
                        style="text-decoration: line-through; opacity: 0.7;">572 грн</span> (знижка 65%)</span>
            </p>

            <button id="ltv-upsell-btn" class="btn btn-violet w-full opacity-90 hover:opacity-100">
                <!-- 🔥 UPDATE: Оновлено ціни апселу -->
                <span class="btn-text">Так, додати Прогноз всього за 199 грн. <span
                        style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">572
                        грн.</span></span>
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

                <input type="email" id="upsell-success-email" placeholder="your.email@gmail.com"
                    class="input-field text-center"
                    style="background-color: var(--card-bg-color) !important; color: #e0e0e0 !important; -webkit-text-fill-color: #e0e0e0 !important;"
                    required>

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

        #user-email,
        #upsell-success-email {
            color: #e0e0e0 !important;
            caret-color: var(--accent-color);
        }

        #user-email::placeholder,
        #upsell-success-email::placeholder {
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
</section>`;function xf(){if(document.getElementById("global-info-modal"))return;document.body.insertAdjacentHTML("beforeend",`
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
    `);const t=document.getElementById("global-info-modal"),e=document.getElementById("global-modal-close"),r=()=>{t.style.display="none"};e.addEventListener("click",r),t.addEventListener("click",i=>{i.target===t&&r()})}function Sn(n,t){xf();const e=document.getElementById("global-info-modal"),r=document.getElementById("global-modal-title"),i=document.getElementById("global-modal-message");e&&r&&i?(r.innerText=n,i.innerHTML=t,e.style.display="flex"):alert(`${n}

${t}`)}async function wf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=_f;const e=new URLSearchParams(window.location.search),r=e.get("orderRef"),i=e.get("upsell_source"),o=e.get("variant");if(o&&Ve[o]&&(console.log("🔄 Restoring Variant Session:",o),T.set("currentVariant",Ve[o])),r){console.log("💳 Validating payment & restoring session:",r);const C=document.createElement("div");C.className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center fixed top-0 left-0 w-full h-full",C.style.zIndex="9999",C.innerHTML='<div class="spinner"></div>',document.body.appendChild(C);try{const I=await ff({invoiceId:T.get("pendingInvoiceId"),orderRef:r});if(I.status==="approved"||I.status==="success"){if(console.log("✅ Payment Validated!"),I.variant&&Ve[I.variant]&&(console.log("🔄 Restoring Variant from Backend:",I.variant),T.set("currentVariant",Ve[I.variant])),I.trafficSource&&(console.log("🛰️ Restoring Traffic Source from Backend:",I.trafficSource),T.set("traffic_type",I.trafficSource)),!T.get("currentVariant")){const N=localStorage.getItem("pendingVariantId");N&&Ve[N]&&(console.log("🔄 Restoring Variant from LocalStorage:",N),T.set("currentVariant",Ve[N]))}if(localStorage.removeItem("pendingVariantId"),T.set("isPaid",!0),T.set("currentInvoiceId",I.invoiceId),!T.get("purchaseTracked")){if(window.DC_Analytics){const{charge:N}=Xt();window.DC_Analytics.trackPurchase(N.FULL_REPORT,I.invoiceId||r,"Natal Chart Full Report")}T.set("purchaseTracked",!0)}if(I.userData&&(T.set("userData",I.userData),I.userData.date&&T.set("date",I.userData.date),I.userData.time&&T.set("time",I.userData.time),I.userData.city&&T.set("city",I.userData.city),I.userData.geo&&T.set("geo",I.userData.geo)),I.userEmail&&T.set("email",I.userEmail),C.remove(),!i){const N=T.get("userData")||{date:T.get("date"),time:T.get("time"),city:T.get("city")},$=T.get("currentVariant");if($&&$.id==="natal_child"){const F=localStorage.getItem("childGender");F&&(N.childGender=F,console.log("👶 Injected childGender into background generation payload:",F))}fa(N).catch(F=>console.warn("Bg gen error",F))}}else{alert(`Оплата не підтверджена. Статус: ${I.status}`),C.remove(),n.navigate("/paywall");return}}catch(I){console.error(I),C.remove(),alert("Помилка перевірки статусу.")}}const l=document.getElementById("email-form"),u=document.getElementById("user-email"),h=document.getElementById("main-report-btn"),f=document.getElementById("ltv-upsell-box"),w=document.getElementById("ltv-upsell-btn"),E=document.getElementById("upsell-success-modal"),x=document.getElementById("upsell-success-form"),D=document.getElementById("upsell-success-email");u&&u.addEventListener("input",C=>{const I=C.target.value.trim();I&&T.set("email",I)});function L(){const C=Xt(),I=T.get("currentVariant"),$=(I?.productType||I?.aiContext?.productType)==="forecast";if(f)if($){const F=f.querySelector("h3");F&&(F.innerText="Додай до свого замовлення");const m=f.querySelector("p");m&&(m.innerHTML=`
                    Хочеш дізнатися, який <strong>Ідеальний Партнер</strong> тобі підходить за твоєю натальною картою? Психологічний портрет, місце зустрічі та секрети зваблення.<br>
                    <span style="color: var(--primary-text-color);">Лише зараз: <strong>${C.display.FORECAST_UPSELL} грн.</strong> замість <span style="text-decoration: line-through; opacity: 0.7;">${C.display.FORECAST_OLD} грн</span></span>
                `);const p=w?.querySelector(".btn-text");p&&(p.innerHTML=`Так, додати Портрет Партнера за ${C.display.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">${C.display.FORECAST_OLD} грн.</span>`);const b=E?.querySelector("p strong");b&&(b.innerText='"Портрет Ідеального Партнера"')}else{const F=f.querySelector("p span strong");F&&(F.innerText=`${C.display.FORECAST_UPSELL} грн.`);const m=w?.querySelector(".btn-text");m&&(m.innerHTML=`Так, додати Прогноз всього за ${C.display.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; margin-left: 4px;">${C.display.FORECAST_OLD} грн.</span>`)}}L();function S(){f&&(f.style.display="none");const C=T.get("currentVariant"),N=(C?.productType||C?.aiContext?.productType)==="forecast";if(h){h.classList.remove("btn-primary"),h.classList.add("btn-gold-purple");const $=h.querySelector(".btn-text");$&&($.innerText=N?"Надіслати мені Прогноз + Партнер":"Надіслати мені Звіт + Прогноз")}T.get("email")&&u&&(u.value=T.get("email"))}const A=T.get("currentVariant");if(A&&A.ui&&A.ui.success){if(h&&A.ui.success.buttonText){const C=h.querySelector(".btn-text");C&&!T.get("hasPaidUpsell")&&(C.innerText=A.ui.success.buttonText)}if(A.ui.success.description){const C=document.querySelector("#email-capture-box > p");C&&(C.innerHTML=A.ui.success.description)}}if(T.get("isPendingUpsell")||!!i){if(T.set("hasPaidUpsell",!0),T.set("isPendingUpsell",!1),!T.get("upsellPurchaseTracked")){if(window.DC_Analytics){const{charge:N}=Xt(),$=T.get("currentVariant"),m=($?.productType||$?.aiContext?.productType)==="forecast";window.DC_Analytics.trackPurchase(N.FORECAST_UPSELL,`upsell_${Date.now()}`,m?"Partner Match Upsell":"Forecast Year Upsell")}T.set("upsellPurchaseTracked",!0)}if(i==="stage8"){console.log("🔙 Redirecting back to premium-result after successful Late Upsell..."),setTimeout(()=>{n.navigate("/premium-result?upsell_source=stage8")},100);return}const C=window.location.pathname;window.history.replaceState({},document.title,C);const I=T.get("email");if(I){S();const N=T.get("currentVariant");N?.productType||N?.aiContext?.productType,Sn("✨ Дякую за покупку!",`Твій Прогноз генерується і буде автоматично відправлений на <strong>${I}</strong><br><br> Натискай <strong>Надіслати мені Звіт</strong> на наступній сторінці`)}else E&&(E.style.display="flex")}T.get("hasPaidUpsell")&&S(),T.get("email")&&(u.value=T.get("email")),w&&w.addEventListener("click",async()=>{const C=w,I=C.querySelector(".btn-text").innerHTML;C.classList.add("loading"),C.disabled=!0,C.querySelector(".btn-text").innerText="Перехід до оплати...";try{const N=u.value?u.value.trim():"";T.set("isPendingUpsell",!0),N&&T.set("email",N);const $=T.get("userData"),{charge:F}=Xt(),m=T.get("currentVariant"),_=(m?.productType||m?.aiContext?.productType)==="forecast"?"Астро-Портрет Партнера":"Астро-Прогноз на рік";await On({name:_,price:F.FORECAST_UPSELL},{email:N},$,{returnQueryParams:"upsell_source=stage6"})}catch(N){console.error("Upsell Error:",N),C.classList.remove("loading"),C.disabled=!1,C.querySelector(".btn-text").innerHTML=I,T.set("isPendingUpsell",!1)}}),x&&x.addEventListener("submit",C=>{C.preventDefault();const I=D.value;I&&(T.set("email",I),u.value=I,E.style.display="none",S(),Sn("✨ Дякую за покупку!",`Твій Прогноз генерується і буде автоматично відправлений на <strong>${I}</strong><br><br>📧 Перевір папку <strong>'Вхідні'</strong> та <strong>'Спам'</strong>.`))}),l.addEventListener("submit",C=>{C.preventDefault();const I=u.value;I&&(T.set("email",I),n.navigateTo("generation"))})}const Ef=`<!-- 🔥 UPDATE: 3D Comet orbits around "Підготовка звіту!" heading -->
<section id="generation-step" class="funnel-step active"
    style="display: flex; flex-direction: column; height: 100%; min-height: 70vh; padding-top: 0; align-items: center;">

    <!-- 🎯 EVENLY DISTRIBUTED: Label + Text -->
    <div
        style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-evenly; align-items: center; width: 100%; padding-bottom: 10vh;">

        <!-- ☄️ Heading (Orbit target for comet) -->
        <div id="generation-orbit-target"
            style="display: flex; align-items: center; justify-content: center; position: relative;">
            <div class="constellation-label" style="display: flex; flex-direction: column; align-items: center; opacity: 1; animation: none;">
                <span style="color: var(--accent-color);">Підготовка звіту!</span>
                <span id="forecast-generation-descriptor" style="display: none; font-size: 0.45em; color: var(--secondary-text-color); font-weight: normal; margin-top: 8px; opacity: 0.7; letter-spacing: 0.5px; text-transform: none; text-align: center; max-width: 250px; line-height: 1.2;">(може зайняти до 1 хвилини)</span>
            </div>
        </div>

        <!-- 📝 Typing Container -->
        <div id="report-typing-container" class="typing-container"
            style="width: 100%; min-height: 4rem; display: flex; align-items: center; justify-content: center;">
            <span id="report-loading-text"
                style="color: var(--secondary-text-color); font-size: 1.1rem; text-align: center; width: 100%;"></span>
            <span id="report-cursor" class="typing-cursor" style="display: none;"></span>
        </div>
    </div>

</section>`;function Tf(n){console.log("⚛️ [Atom Orbit] Starting 3-Comet Animation");const t=3,e=33,r=.022,i=45,o=18,l=[0,Math.PI/3,-Math.PI/3],u=[0,0,0];n.style.transformStyle="preserve-3d",n.style.transform=`perspective(800px) rotateX(${o}deg)`;const h=n.querySelector(".constellation-label");h&&(h.style.transform=`rotateX(${-o}deg)`,h.style.transformStyle="preserve-3d",h.style.position="relative",h.style.zIndex="50");const f=[];for(let D=0;D<t;D++){const L=document.createElement("div");L.className="comet-head",L.style.position="absolute",L.style.top="0",L.style.left="0",n.appendChild(L);const S=[];for(let A=0;A<e;A++){const B=document.createElement("div");B.className="trail-segment",B.style.position="absolute",B.style.top="0",B.style.left="0",n.appendChild(B),S.push(B)}f.push({head:L,trails:S,positionHistory:[],angle:u[D],rotation:l[D]})}let w=!0,E;function x(){if(!w)return;const D=n.offsetWidth/2,L=n.offsetHeight/2,S=Math.max(80,Math.min(n.offsetWidth/2+40,160));for(const A of f){A.angle+=r;const B=Math.cos(A.angle),C=Math.sin(A.angle),I=S*B,N=i*C,$=Math.cos(A.rotation),F=Math.sin(A.rotation),m=I*$-N*F,p=I*F+N*$,b=C,_=1+b*.25,y=b>0?100:1;A.positionHistory.unshift({x:m,y:p,scale:_,zIndex:y}),A.positionHistory.length>e&&A.positionHistory.pop(),A.head.style.transform=`translate3d(${D+m}px, ${L+p}px, 0) scale(${_})`,A.head.style.zIndex=y;for(let v=0;v<A.trails.length;v++){const d=A.trails[v],O=A.positionHistory[v];if(O){const R=v/e,k=O.scale*(1-R*.6),V=.5*(1-R);d.style.transform=`translate3d(${D+O.x}px, ${L+O.y}px, 0) scale(${k})`,d.style.opacity=V,d.style.zIndex=O.zIndex-1,d.style.display="block"}else d.style.display="none"}}E=requestAnimationFrame(x)}return x(),()=>{console.log("⚛️ [Atom Orbit] Stopping Animation"),w=!1,cancelAnimationFrame(E),f.forEach(({head:D,trails:L})=>{D.remove(),L.forEach(S=>S.remove())}),n.style.transform="",n.style.transformStyle=""}}async function If(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=Ef;const e=document.getElementById("report-loading-text"),r=document.getElementById("report-cursor"),i=T.get("currentVariant")||{},o=document.getElementById("forecast-generation-descriptor");o&&i.id==="forecast"&&(o.style.display="block");let l=null;const u=document.getElementById("generation-orbit-target");u&&(l=Tf(u)),document.body.classList.add("warp-mode");const h={date:T.get("date"),time:T.get("time"),city:T.get("city"),geo:T.get("geo")},f=T.get("email");T.get("hasPaidUpsell")&&mc(h).catch(C=>console.warn("Forecast bg error:",C));let w=[{text:"✨ Аналізую Ядро твоєї Особистості...",pause:1500},{text:"❤️‍🔥 Розшифровую твої сценарії Кохання...",pause:1500},{text:"👑 Шукаю, де приховані твої Гроші...",pause:1500},{text:"🔮 Вивчаю твої Кармічні Уроки...",pause:1500},{text:"🌙 З'єднуюсь з енергією твого Місяця...",pause:1500},{text:"🪐 Перевіряю транзити Сатурна...",pause:1500},{text:"💫 Рахую аспекти Венери до твого Асценденту...",pause:1500},{text:"📜 Формую стародавній сувій твоєї долі...",pause:1500},{text:"🧘‍♀️ Майже готово, Всесвіт підбирає слова...",pause:1500},{text:"🦋 Твоя унікальність потребує детального аналізу...",pause:1500},{text:"✨ Додаю трохи зіркового пилу в твій звіт...",pause:1500},{text:"⚡️ Фіналізація космічного паспорта...",pause:2e3},{text:"🌞 З твоїм звітом все гаразд, просто сьогодні спалахи на сонці і треба трохи більше часу ніж зазвичай. Звіт вже летить тобі на пошту, і зараз відкриється тут.",pause:0,isDelayMessage:!0}];const E=T.get("currentVariant");E&&E.ui&&E.ui.generation&&E.ui.generation.steps&&(w=E.ui.generation.steps);let x=!1,D=null;const L=6e5,S=async()=>{for(let I=0;I<w.length;I++){if(x&&D&&D.success){console.log("🚀 Report is ready! Skipping remaining animation.");return}const N=w[I];await ga(e,r,N.text,50,0,!1),N.isDelayMessage&&(r&&(r.style.display="inline-block"),e&&(e.style.fontSize="0.95rem",e.style.lineHeight="1.6"));const $=100;let F=0;const m=N.isDelayMessage?999999:N.pause;for(;F<m;){if(x&&D&&D.success)return;await new Promise(p=>setTimeout(p,$)),F+=$}}},A=async()=>{let C=0;const I=Date.now();for(;Date.now()-I<L;){C++;try{console.log(`🚀 Starting API Request (Attempt ${C})...`);const N=await ma(h,f);if(console.log("✅ API Request Finished:",N),N&&!N.error){T.set("fullReport",N),D={success:!0,data:N},x=!0;const $=T.get("pendingInvoiceId");if($&&N.sections){const F=T.get("currentVariant"),m=F?.productType||F?.aiContext?.productType,p=m==="partner"?"partner":m==="forecast"?"upsell":"main";ce(It.endpoints.UPDATE_REPORT,{invoiceId:$,sections:N.sections,reportType:p}).then(()=>{console.log("✅ Report synced to Firestore for Telegram")}).catch(b=>{console.warn("⚠️ Report sync failed (non-critical):",b.message)})}return}else console.warn("⚠️ Report Generation Failed (Logic). Retrying...",N),await new Promise($=>setTimeout($,3e3))}catch(N){console.error("API Network Error:",N),await new Promise($=>setTimeout($,3e3))}}console.error("❌ Max timeout reached. API failed.")};S(),await A(),x||(console.warn("⚠️ API took too long or failed silently. Proceeding to result anyway (check email fallback)."),D={success:!0,fromEmail:!0},x=!0),document.body.classList.remove("warp-mode"),l&&l(),setTimeout(()=>{n.navigateTo("premium-result")},300)}const Cf=`<section id="premium-result-step" class="funnel-step active space-y-6">

    <!-- 1. Контейнер звіту (Точна копія стилів #full-report-content з моноліту) -->
    <div id="full-report-content" class="text-left p-5 rounded-xl space-y-4"
        style="background-color: var(--card-bg-color); border: 1px solid var(--border-color); display: block;">
        <!-- Сюди JS вставить згенерований HTML звіту -->
        <div class="text-center py-10">
            <div class="spinner mx-auto"></div>
            <p class="mt-4 text-gray-400">Завантаження даних...</p>
        </div>
    </div>

    <!-- 2. Контейнер дій (Кнопки) -->
    <div id="report-actions-container"
        style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
        <!-- Кнопки будуть згенеровані через JS -->
    </div>

    <!-- 3. Модальне вікно Late Upsell (для кнопки "Отримати прогноз") -->
    <!-- Копія #late-upsell-modal з моноліту -->
    <div id="late-upsell-modal" class="modal-overlay">
        <div class="modal-content" style="width: 480px; max-width: 95%;">
            <div style="text-align: right; margin-bottom: 10px;">
                <button type="button" id="close-late-upsell"
                    style="background:none; border:none; color: #6b7280; font-size: 1.5rem;">&times;</button>
            </div>
            <div class="text-left relative overflow-hidden">
                <h3 class="font-bold text-lg text-white mb-2" style="color: var(--accent-secondary);">
                    Додай до свого замовлення
                </h3>
                <p class="text-sm mt-2 mb-6 leading-relaxed" style="color: var(--secondary-text-color);">
                    Хочеш повний <strong>Астрологічний Прогноз</strong> на найближчий рік? Дізнатися про свої фінансові
                    піки, періоди удачі та успіхи у стосунках?<br><br>
                    <!-- 🔥 UPDATE: Оновлено ціни апселу -->
                    <span style="color: var(--primary-text-color);">Лише зараз: <strong>199 грн.</strong> замість <span
                            style="text-decoration: line-through; opacity: 0.7;">572 грн</span> (знижка 65%)</span>
                </p>

                <!-- 🔥 КЛЮЧОВА ЗМІНА: id="ltv-upsell-btn" для коректного трекінгу -->
                <button id="ltv-upsell-btn" class="btn btn-violet w-full">
                    <span class="btn-text">Так, додати Прогноз всього за 199 грн. <span
                            style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">572
                            грн.</span></span>
                    <span class="btn-spinner"></span>
                </button>
            </div>
        </div>
    </div>
</section>`;function Af(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=Cf;const e=Xt(),r=document.getElementById("full-report-content"),i=document.getElementById("report-actions-container");r&&(r.style.backgroundColor="transparent",r.style.border="none",r.style.padding="0",r.className="w-full");const o=document.getElementById("late-upsell-modal"),l=document.getElementById("close-late-upsell"),u=document.getElementById("ltv-upsell-btn"),h=document.getElementById("upsell-purchased-modal"),f=document.getElementById("close-purchased-modal-btn"),w=T.get("userData")||{date:T.get("date"),time:T.get("time"),city:T.get("city"),geo:T.get("geo"),planets:T.get("planets")||[]},E=T.get("email"),x=T.get("currentVariant"),D="dc_full_report_backup_v2",L=new URLSearchParams(window.location.search);if(L.get("upsell_source")==="stage8"){T.set("hasPaidUpsell",!0);try{const v=localStorage.getItem(D);if(v){const d=JSON.parse(v);d&&d.sections&&(yt.log("⚡️ Instant Report Restore from LocalStorage success!"),T.set("fullReport",d))}}catch(v){console.error("Backup restore error:",v)}const y=window.location.pathname;window.history.replaceState({},document.title,y),setTimeout(()=>{i&&i.scrollIntoView({behavior:"smooth",block:"center"})},500)}l&&l.addEventListener("click",()=>o.style.display="none"),f&&f.addEventListener("click",()=>{h&&(h.style.display="none"),N()}),window.addEventListener("click",y=>{y.target===o&&(o.style.display="none"),y.target===h&&h&&(h.style.display="none")});function A(y){return y?y.map((v,d)=>{const O=d===0,R=d===y.length-1;let k=v.analysis_text||"";k=k.replace(/\*\*(.*?)\*\*/g,'<strong style="color: #fff; font-weight: 400;">$1</strong>');let V=k.includes("<ul")||k.includes("<ol")||k.includes("<br")?k.replace(/\n/g,"<br>"):k.split(`
`).map(K=>`<p>${K}</p>`).join("");const U=v.practical_advice?`
                <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
                    <strong style="display: block; color: #cda45e; margin-bottom: 6px; text-transform: uppercase; font-size: 0.75em; letter-spacing: 1px;">⚡️ Порада зірок:</strong>
                    <p style="font-style: italic; font-size: 0.9em; color: var(--secondary-text-color); margin: 0;">${v.practical_advice}</p>
                </div>
            `:"",H=R?"":`
                <button class="next-section-btn" data-target="${d+1}" style="
                    display: block;
                    margin: 20px auto 0;
                    padding: 10px 24px;
                    background: transparent;
                    border: 1px solid rgba(205, 164, 94, 0.3);
                    border-radius: 20px;
                    color: var(--accent-color);
                    font-size: 0.85em;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">Читати далі 👇</button>
            `;return`
                <div class="accordion-item ${O?"accordion-open":""}" style="
                    background-color: rgba(28, 28, 30, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    margin-bottom: 12px;
                    overflow: visible;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
                ">
                    <!-- Header -->
                    <div class="accordion-header" style="
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                    " data-index="${d}">
                        <h4 style="
                            color: var(--accent-color);
                            font-weight: 700;
                            text-transform: uppercase;
                            font-size: 0.85em;
                            letter-spacing: 1.5px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin: 0;
                        ">
                            <span style="font-size: 1.2em;">${v.icon}</span> ${v.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                    </div>

                    <!-- Content -->
                    <div class="accordion-content">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content report-content-text">
                            ${V}
                            ${U}
                            ${H}
                        </div>
                    </div>
                </div>
            `}).join(""):""}function B(y){const v=y.querySelectorAll(".accordion-header"),d=y.querySelectorAll(".accordion-item"),O=y.querySelectorAll(".next-section-btn");function R(k,V=!1){d.forEach((U,H)=>{if(H===k)if(U.classList.contains("accordion-open")){U.classList.remove("accordion-open");const K=U.querySelector(".accordion-content");K&&(K.style.maxHeight=null)}else{U.classList.add("accordion-open");const K=U.querySelector(".accordion-content");K&&(K.style.maxHeight=K.scrollHeight+100+"px",setTimeout(()=>{U.classList.contains("accordion-open")&&(K.style.maxHeight=null)},820)),setTimeout(()=>{const Q=U.querySelector(".accordion-header");Q&&Q.scrollIntoView({behavior:"smooth",block:"start"})},300)}else V||U.classList.remove("accordion-open")})}v.forEach(k=>{k.addEventListener("click",()=>{const V=parseInt(k.getAttribute("data-index"));R(V,!0)})}),O.forEach(k=>{k.addEventListener("click",V=>{V.stopPropagation();const U=parseInt(k.getAttribute("data-target"));U<d.length&&R(U,!0)})})}function C(){const y=r.querySelector(".astro-data-box");y&&(y.style.cursor="pointer",y.title="Натисніть, щоб прочитати розшифровку",y.onmouseenter=()=>{y.style.borderColor="rgba(205, 164, 94, 0.6)"},y.onmouseleave=()=>{y.style.borderColor="rgba(205, 164, 94, 0.3)"},y.addEventListener("click",()=>{if(x&&x.productType==="partner"){Sn("🔑 Розшифровка Коду Кохання",`
                        <p class="mb-3">Ти бачиш <strong>точні координати</strong> Венери, Марсу та 7-го дому — формулу твого кохання.</p>
                        
                        <p class="mb-3 text-sm italic" style="color: #cda45e; border-left: 2px solid #cda45e; padding-left: 10px;">
                            "Ці координати — унікальна карта твоїх бажань і потреб у стосунках."
                        </p>

                        <ul class="text-sm space-y-2 mb-4">
                            <li><strong>Венера ♀:</strong> Як ти кохаєш і що приносить тобі задоволення.</li>
                            <li><strong>Марс ♂:</strong> Типаж чоловіка, який запалює твій вогонь.</li>
                            <li><strong>7-й Дім (DSC):</strong> Обставини зустрічі та сценарій партнерства.</li>
                        </ul>

                        <p class="mb-1">У <strong>цьому звіті</strong> ми розшифрували все:</p>
                        <p class="text-white text-sm">✅ Де і коли ти зустрінеш свого партнера?<br>✅ Що притягне його саме до тебе?</p>
                    `);return}Sn("📡 Розшифровка Космічного Коду",`
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
                `)}))}async function I(){let y=T.get("fullReport");if(!y||!y.sections){const v=localStorage.getItem(D);if(v)try{y=JSON.parse(v),T.set("fullReport",y)}catch(d){console.warn("Backup parse fail",d)}}if(y&&y.sections){localStorage.setItem(D,JSON.stringify(y));const v=A(y.sections),d=await Oe(w,x);r.innerHTML=v+d,B(r),C(),N();return}console.warn("⚠️ Report data missing. Fetching from API..."),r.innerHTML=`
            <div class="text-center py-12 space-y-4">
                <div class="spinner mx-auto" style="width: 3rem; height: 3rem;"></div>
                <p class="text-gray-400 animate-pulse text-sm">Завантаження вашого звіту...</p>
            </div>
        `;try{const v=L.get("id");let d;if(v?d=await gc(v):d=await ma(w,E),d&&!d.error&&d.status==="ready"&&d.reportData&&d.reportData.sections){T.set("fullReport",d.reportData),localStorage.setItem(D,JSON.stringify(d.reportData));const O=A(d.reportData.sections),R=d.userData||w,k=d.variant||x,V=await Oe(R,k);r.innerHTML=O+V,B(r),C(),N()}else if(d&&!d.error&&d.sections){T.set("fullReport",d),localStorage.setItem(D,JSON.stringify(d));const O=A(d.sections),R=await Oe(w,x);r.innerHTML=O+R,B(r),C(),N()}else throw d&&d.status==="processing"?new Error("Report is processing"):new Error("Invalid recovery data")}catch(v){console.error("Recovery failed:",v),r.innerHTML=`
                <div class="text-center p-8 rounded-xl border border-gray-700 bg-gray-800/50">
                    <div class="text-5xl mb-4">📨</div>
                    <h3 class="text-xl font-bold text-[#cda45e] mb-2">Звіт вже у дорозі!</h3>
                    <p class="text-gray-300 mb-4">
                        Через велике навантаження генерація займає трохи більше часу. 
                        Твій Прогноз генерується і буде автоматично відправлений на <strong>${E}</strong>.
                    </p>
                    ${T.get("planets")?await Oe(w,x):""}
                </div>
            `,N()}}function N(){i.innerHTML="";const y=document.createElement("div");y.className="mb-6 p-4 rounded-xl border border-[rgba(205,164,94,0.3)] bg-[rgba(20,20,22,0.6)] text-center text-sm leading-relaxed",y.innerHTML=`
            <p class="text-white font-bold mb-2 text-base">Як зберегти цей звіт?</p>
            <p class="text-[#cda45e] mb-2">✅ Копія звіту (текст + PDF) вже відправлена на твою пошту.</p>
            <p class="text-gray-300">Нижче ти можеш відправити текст звіту собі в Telegram, завантажити PDF або <strong>скопіювати персональне посилання</strong> на цю сторінку (рекомендуємо зберегти його).</p>
        `,i.appendChild(y);const v=document.createElement("div");v.className="flex flex-col gap-3 w-full";const d=T.get("currentInvoiceId")||new URLSearchParams(window.location.search).get("id");if(d){const k=document.createElement("a");k.href=`https://t.me/DestinyCodeReportsBot?start=${d}`,k.target="_blank",k.rel="noopener noreferrer",k.className="btn btn-secondary",k.style.cssText=`
                display: flex; align-items: center; justify-content: center; gap: 8px;
                background: linear-gradient(135deg, #2AABEE, #229ED9);
                color: #fff; text-decoration: none; border: none;
            `,k.innerHTML=`
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span class="btn-text">Надіслати Звіт в Telegram</span>
            `,v.appendChild(k)}if(d){const k=document.createElement("button");k.className="btn btn-secondary",k.style.cssText=`
                display: flex; align-items: center; justify-content: center; gap: 8px;
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2);
                color: #fff;
            `,k.innerHTML=`
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span class="btn-text">Скопіювати посилання</span>
            `,k.onclick=()=>{const V=`${window.location.origin}/report?id=${d}`;navigator.clipboard.writeText(V).then(()=>{const U=k.innerHTML;k.innerHTML='<span class="btn-text text-green-400 font-bold">✅ Скопійовано!</span>',_("Посилання збережено в буфер обміну"),setTimeout(()=>k.innerHTML=U,2500)}).catch(U=>{console.error("Copy failed",U),_("Не вдалося скопіювати посилання")})},v.appendChild(k)}const O=document.createElement("button");if(O.className="btn btn-secondary",O.innerHTML='<span class="btn-text">Завантажити PDF (Звіт)</span><span class="btn-spinner"></span>',O.onclick=()=>F(O),v.appendChild(O),i.appendChild(v),m(),T.get("hasPaidUpsell")){const k=document.createElement("div");k.className="mt-4 mb-2 p-4 rounded-lg border text-center animate-fadeIn",k.style.backgroundColor="rgba(20, 83, 45, 0.2)",k.style.borderColor="rgba(34, 197, 94, 0.3)",k.innerHTML=`
                <div class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm font-bold text-green-400 tracking-wide">
                        ${x?.productType==="forecast"?"Портрет Партнера відправлено на пошту":"Твій Прогноз на рік відправлено на пошту"}
                    </span>
                </div>
            `,i.appendChild(k)}else{const k=x?.productType==="forecast",V=k?"Портрет Ідеального Партнера":"Прогноз на рік",U=document.createElement("button");U.className="btn btn-violet",U.style.marginTop="10px",U.innerHTML=`
                <span class="btn-text flex flex-col items-center justify-center leading-tight">
                    <span class="text-[16px] font-bold">Отримати ${V} за ${e.display.FORECAST_UPSELL} грн.</span>
                    <span class="text-[10px] opacity-80 font-normal mt-1 lowercase">буде відправлено на пошту</span>
                </span>
            `,U.onclick=()=>{const H=k?`Так, отримати Портрет Партнера за ${e.display.FORECAST_UPSELL} грн.`:`Так, отримати Прогноз за ${e.display.FORECAST_UPSELL} грн.`;u&&(u.querySelector(".btn-text").innerText=H),o.style.display="flex"},i.appendChild(U)}const R=document.createElement("button");R.className="btn btn-skip",R.style.marginTop="20px",R.innerText="Розрахувати ще одну натальну карту",R.onclick=()=>{confirm("Очистити дані та почати новий розрахунок?")&&(T.clear(),localStorage.removeItem(D),window.location.href="/")},i.appendChild(R)}function $(y){return!y||!Array.isArray(y)?"":y.map((v,d)=>`
            <div class="report-section" style="margin-bottom: 35px; ${d===0?"":"page-break-before: always;"}">
                <h2 style="color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px; page-break-before: avoid;">
                    <span style="margin-right: 8px;">${v.icon||"✨"}</span> ${v.title}
                </h2>
                <div class="report-content-text" style="font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #e0e0e0; margin-bottom: 12px; text-align: justify;">
                    ${(v.analysis_text||"").replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,'<strong style="color: #ffffff;">$1</strong>')}
                </div>
                ${v.practical_advice?`
                <div class="report-advice" style="background-color: #161b22; border: 1px solid rgba(205, 164, 94, 0.2); border-left: 4px solid #cda45e; padding: 20px; margin-top: 20px; border-radius: 0 8px 8px 0;">
                    <span style="color: #cda45e; display: block; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700;">⚡️ KOSMIC KEY:</span>
                    <p style="margin: 0; color: #cccccc; font-style: italic; font-size: 13px;">${v.practical_advice}</p>
                </div>`:""}
            </div>`).join("")}async function F(y){const v=T.get("fullReport");if(!v)return;const d=window.open("","_blank");if(d)d.document.write(`
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
            `);else{alert("Будь ласка, дозвольте спливаючі вікна для завантаження файлу.");return}y.classList.add("loading"),y.disabled=!0;try{const O=$(v.sections),R={...w};if(!R.planets||R.planets.length===0){const K=T.get("planets");K&&K.length>0&&(R.planets=K)}let k="main";x?.productType==="forecast"?k="upsell":x?.productType==="partner"&&(k="partner");const V={reportHtml:O,reportType:k,userData:R},U=await fetch(It.PDF,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(V)});if(!U.ok)throw new Error("Server error");const H=await U.json();if(H.success&&H.pdfBase64){const K=atob(H.pdfBase64),Q=new Array(K.length);for(let W=0;W<K.length;W++)Q[W]=K.charCodeAt(W);const G=new Uint8Array(Q),rt=new Blob([G],{type:"application/pdf"}),X=window.URL.createObjectURL(rt);if(d)d.location.href=X;else{const W=document.createElement("a");W.href=X,W.download="DestinyCode_Report.pdf",document.body.appendChild(W),W.click(),setTimeout(()=>document.body.removeChild(W),100)}setTimeout(()=>window.URL.revokeObjectURL(X),6e4)}else d&&d.close(),alert("Не вдалося сформувати PDF. Спробуйте пізніше.")}catch(O){d&&d.close(),console.error("PDF Download Error:",O),alert("Помилка завантаження. Перевірте з'єднання.")}finally{y.classList.remove("loading"),y.disabled=!1}}u&&u.addEventListener("click",async()=>{const y=u;y.classList.add("loading"),y.disabled=!0;const v=T.get("fullReport");v&&localStorage.setItem(D,JSON.stringify(v));try{const O=x?.productType==="forecast"?"Астро-Портрет Партнера (Promo)":"Астро-Прогноз на рік (Promo)";await On({name:O,price:e.charge.FORECAST_UPSELL},{email:E},w,{returnQueryParams:"upsell_source=stage8"})}catch(d){console.error("Late Upsell Error:",d),y.classList.remove("loading"),y.disabled=!1}}),I();function m(){if(i.querySelector(".feedback-controls"))return;const y=document.createElement("div");y.className="feedback-controls";const v=document.createElement("div");v.className="feedback-buttons";const d=p("👍","like"),O=p("👎","dislike");v.appendChild(O),v.appendChild(d),y.appendChild(v);const R=document.createElement("button");if(R.className="btn w-full",R.style.cssText=`
            display: flex; align-items: center; justify-content: center; gap: 8px;
            background: rgba(205, 164, 94, 0.1);
            border: 1px solid rgba(205, 164, 94, 0.3);
            color: #cda45e; font-size: 0.85em; padding: 12px; border-radius: 12px;
            font-weight: 600; cursor: pointer; margin-top: 15px; margin-bottom: 10px;
        `,R.innerHTML="<span>✨ Залишити відгук</span>",R.onclick=()=>b("premium_review_button"),y.appendChild(R),T.get("hasPaidUpsell")){const k=document.createElement("button");k.className="btn-feedback-text",k.innerText="Написати відгук розробникам",k.onclick=b,y.appendChild(k)}i.appendChild(y)}function p(y,v){const d=document.createElement("div");return d.className="btn-feedback-icon",d.innerText=y,d.onclick=async()=>{d.parentElement.querySelectorAll(".btn-feedback-icon").forEach(R=>R.classList.remove("active")),d.classList.add("active"),await Vr.send({type:v,value:v,source:"premium_report"}),_("Дякую 💜"),v==="dislike"&&setTimeout(b,500)},d}function b(y=null){const v=document.createElement("div");v.className="feedback-modal-overlay";const d=document.createElement("div");d.className="feedback-modal";const O=document.createElement("h3");O.innerText="Ваш відгук допоможе нам стати кращими",O.style.color="#cda45e",O.style.marginBottom="8px";const R=document.createElement("textarea");R.className="feedback-textarea",R.placeholder="Що нам варто покращити?";const k=document.createElement("button");k.className="btn btn-violet",k.innerText="Надіслати",v.onclick=V=>{V.target===v&&document.body.contains(v)&&document.body.removeChild(v)},k.onclick=async()=>{if(R.value.trim()){k.innerText="Відправка...",k.disabled=!0;try{const V=y||(T.get("hasPaidUpsell")?"premium_upsell":"premium_feedback");await Vr.send({type:"text",value:R.value,source:V})}catch(V){console.error("Feedback send error",V)}finally{document.body.contains(v)&&document.body.removeChild(v),Sn("Повідомлення відправлено","Ми дуже цінуємо ваш час та увагу. Дякуємо! 🙏")}}},d.appendChild(O),d.appendChild(R),d.appendChild(k),v.appendChild(d),document.body.appendChild(v)}function _(y){const v=document.createElement("div");v.innerText=y,v.style.position="fixed",v.style.top="20px",v.style.left="50%",v.style.transform="translate(-50%, -20px)",v.style.background="linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)",v.style.color="#fff",v.style.border="1px solid rgba(205, 164, 94, 0.3)",v.style.boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px -3px rgba(205, 164, 94, 0.1)",v.style.padding="12px 24px",v.style.borderRadius="99px",v.style.fontWeight="bold",v.style.opacity="0",v.style.transition="all 0.3s ease",v.style.zIndex="2000",document.body.appendChild(v),requestAnimationFrame(()=>{v.style.opacity="1",v.style.transform="translate(-50%, 0)"}),setTimeout(()=>{v.style.opacity="0",v.style.transform="translate(-50%, -20px)",setTimeout(()=>document.body.removeChild(v),300)},900)}}const Sf=`<!-- 🔥 PARTNER MATCH: Combined Result + Premium Data Screen -->
<section id="partner-result-step" class="funnel-step active space-y-6" style="padding-bottom: 160px;">

    <!-- SECTION 1: Free Result -->
    <h2 class="text-2xl font-bold text-center text-white" id="result-title">Твоя Любовна Карта</h2>

    <!-- Основна картка з результатом -->
    <div class="space-y-3" style="background-color: transparent; border: none; padding: 0;">
        <h3 class="text-xl font-bold" style="color: var(--accent-color);" id="free-report-title">
            <!-- Заголовок заповнюється через JS -->
        </h3>
        <div id="free-report-text" class="text-left leading-relaxed space-y-4"
            style="color: var(--secondary-text-color);">
            <i>(Тут з'явиться твій персональний аналіз...)</i>
        </div>
    </div>



    <!-- SECTION 3: Time & City Divider -->
    <div class="relative py-4">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-700"></div>
        </div>
        <div class="relative flex justify-center">
            <span class="px-3 text-sm text-gray-500" style="background-color: var(--bg-color);">УТОЧНИ ДАНІ</span>
        </div>
    </div>

    <!-- SECTION 4: Title & Description -->
    <div class="space-y-2 text-center">
        <h2 class="text-2xl font-bold text-white tracking-tight">
            Отримай повну інструкцію<br>по пошуку свого<br><span style="color: var(--accent-color);">ІДЕАЛЬНОГО
                ПАРТНЕРА</span>
        </h2>
        <p class="text-sm" style="color: var(--secondary-text-color);">
            Введи час свого народження для точного розрахунку всіх деталей
        </p>
    </div>

    <!-- SECTION 5: Time & City Form (No Card Wrapper) -->
    <div id="premium-form-container" class="w-full space-y-5 mt-4">
        <!-- Time Input -->
        <div>
            <label for="birth-time" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2"
                style="color: var(--accent-color);">Час народження</label>

            <div
                class="input-field h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2"
                    style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>

                <span id="time-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обери
                    час</span>
                <input type="time" id="birth-time" name="birth-time"
                    class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10">
            </div>

            <p id="time-error-message" class="error-text" style="display: none;">
                Будь ласка, обери час народження.
            </p>
        </div>

        <!-- City Input -->
        <div>
            <label for="birth-city" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2"
                style="color: var(--accent-color);">Місто народження</label>

            <input type="text" id="birth-city" name="birth-city" placeholder="Наприклад, Київ"
                class="input-field text-center hover:border-[#cda45e] transition-colors w-full"
                style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; background-color: var(--card-bg-color) !important; opacity: 1;">

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

                #birth-city:focus::placeholder {
                    opacity: 0;
                    color: transparent;
                    -webkit-text-fill-color: transparent !important;
                }
            </style>

            <p id="city-error-message" class="error-text">Текст помилки...</p>
            <p id="city-info-message" class="info-text"></p>
        </div>

        <!-- Skip Button (під формою) -->
        <button type="button" id="skip-button" class="btn btn-skip opacity-80 text-xs mt-1 w-full">
            Я не знаю точного часу
        </button>
    </div>

    <!-- Mars & Venus Decorative Symbols -->
    <div class="flex items-center justify-center gap-3 py-4 mt-2" style="color: var(--accent-color); opacity: 0.35;">
        <span style="font-size: 1.6em; line-height: 1;">♂</span>
        <span style="font-size: 0.6em; letter-spacing: 3px; color: var(--secondary-text-color);">✦</span>
        <span style="font-size: 1.6em; line-height: 1;">♀</span>
    </div>

    <!-- SECTION 4: Sticky Footer -->
    <div class="sticky-paywall-footer"
        style="padding-top: 1rem; padding-bottom: calc(1rem + env(safe-area-inset-bottom));">

        <!-- Кнопка -->
        <button id="continue-button"
            class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden">
            <span class="btn-text flex items-center justify-center gap-2">
                Дізнатися всі подробиці
                <span class="font-bold tracking-widest flex gap-[1px]">
                    <span class="runway-arrow">&gt;</span>
                    <span class="runway-arrow">&gt;</span>
                    <span class="runway-arrow">&gt;</span>
                </span>
            </span>
            <span class="btn-spinner"></span>
        </button>



        <!-- Локальні стилі для анімації стрілочок -->
        <style>
            @keyframes runway-lights {
                0% {
                    opacity: 0.3;
                }

                50% {
                    opacity: 1;
                }

                100% {
                    opacity: 0.3;
                }
            }

            .runway-arrow {
                animation: runway-lights 1.2s infinite ease-in-out both;
                display: inline-block;
                color: rgba(0, 0, 0, 0.75);
            }

            .runway-arrow:nth-child(1) {
                animation-delay: 0s;
            }

            .runway-arrow:nth-child(2) {
                animation-delay: 0.2s;
            }

            .runway-arrow:nth-child(3) {
                animation-delay: 0.4s;
            }
        </style>
    </div>
</section>`;function kf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=Sf;const e=document.getElementById("result-title"),r=document.getElementById("free-report-title"),i=document.getElementById("free-report-text"),o=document.getElementById("birth-time"),l=document.getElementById("time-placeholder"),u=o.closest(".input-field"),h=document.getElementById("time-error-message"),f=document.getElementById("birth-city"),w=document.getElementById("city-error-message"),E=document.getElementById("city-info-message"),x=document.getElementById("continue-button"),D=document.getElementById("skip-button"),L=document.getElementById("premium-form-container"),S=T.get("freeReport");if(!S){n.navigateTo("welcome");return}const A=d=>d?d.replace(/\*\*(.*?)\*\*/g,'<strong style="color: #ffffff; font-weight: 400;">$1</strong>').replace(/\\n/g,"<br>"):"";let B="";if(S.superpower||S.blind_spot||S.teaser_hook){let d=[];S.superpower&&d.push(`
                <div style="
                    background-color: var(--card-bg-color);
                    border: 1px solid var(--border-color);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 16px;
                ">
                    <h4 style="
                        color: var(--accent-color);
                        font-weight: 700;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        font-size: 0.85em;
                        letter-spacing: 1.5px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        ✨ ${S.superpower.title||"Твоя Суперсила"}
                    </h4>
                    <p style="color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;">
                        ${A(S.superpower.text)}
                    </p>
                </div>
            `),S.blind_spot&&d.push(`
                <div style="
                    background-color: var(--card-bg-color);
                    border: 1px solid var(--border-color);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 16px;
                ">
                    <h4 style="
                        color: var(--accent-color);
                        font-weight: 700;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        font-size: 0.85em;
                        letter-spacing: 1.5px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        🔮 ${S.blind_spot.title||"Сліпа Зона"}
                    </h4>
                    <p style="color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;">
                        ${A(S.blind_spot.text)}
                    </p>
                </div>
            `),B=d.join("")}if(e.innerText="Твоя Любовна Карта",S.title){let d="";const O=S.title.indexOf(":");if(O!==-1){const R=S.title.substring(0,O+1).trim(),k=S.title.substring(O+1).trim();d=`
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="
                        color: var(--secondary-text-color);
                        font-size: 0.85em;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        margin-bottom: 8px;
                        opacity: 0.8;
                    ">${R}</div>
                    <h3 style="
                        color: var(--accent-color);
                        font-size: 1.15em;
                        font-weight: 700;
                        line-height: 1.3;
                    ">${k}</h3>
                </div>
            `}else d=`
                <h3 style="
                    text-align: center;
                    color: var(--accent-color);
                    font-size: 1.1em;
                    font-weight: 700;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                ">${S.title}</h3>
            `;r.innerHTML=d,r.style.display="block",r.style.textAlign="",r.style.color="",r.style.textTransform="",r.style.letterSpacing="",r.style.fontSize="",r.style.marginBottom=""}else r.style.display="none";if(S.content_blocks){const d=[{emoji:"✨",title:"Твій Зірковий Архетип"},{emoji:"⚡️",title:"Прихований Внутрішній Конфлікт"},{emoji:"🗝️",title:"Твій Ключ до Змін"}],O=[{...d[0],content:A(S.content_blocks.archetype||"")},{...d[1],content:A(S.content_blocks.conflict||"")},{...d[2],content:A(S.content_blocks.solution||"")}];B=O.map((R,k)=>{const V=k===0,U=k===O.length-1;return`
                ${V?`
                <style>
                    @keyframes bounce-small {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(3px); }
                    }
                    .animate-bounce-small {
                        animation: bounce-small 2s infinite;
                        display: inline-block;
                    }
                </style>
            `:""}
                <div class="accordion-item ${V?"accordion-open":""}" style="
                    background-color: rgba(28, 28, 30, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
                ">
                    <div class="accordion-header" style="
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    " data-index="${k}">
                        <h4 style="
                            color: var(--accent-color);
                            font-weight: 700;
                            text-transform: uppercase;
                            font-size: 0.85em;
                            letter-spacing: 1.5px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin: 0;
                        ">
                            <span style="font-size: 1.2em;">${R.emoji}</span> ${R.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                    </div>
                    <div class="accordion-content" style="${V?"max-height: 1000px;":"max-height: 0;"} overflow: hidden; transition: max-height 0.4s ease-out;">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${R.content}
                            ${U?"":`
                                <button class="next-section-btn" data-target="${k+1}" style="
                                    display: block; width: 100%; margin-top: 20px; padding: 12px;
                                    background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 8px; color: var(--primary-text-color); font-size: 0.9em; cursor: pointer;
                                ">
                                    Читати далі <span class="animate-bounce-small">👇</span>
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `}).join("")}else if(S.psychological_analysis){const d=S.psychological_analysis,O=["💍 Твій любовний парадокс","💍 Хто він","💍 Хто він насправді","⚡️ Хто він","⚡️ Його Енергія","💔 Твоя Фатальна Помилка","📍 Передчуття Зустрічі","🔑 Твій Ключ до Щастя","📋 Чек-лист","📋 Чек-лист: чи підходить він тобі","📋 Чек-лист: чи підходить він тобі?"],R=new RegExp(`(${O.join("|")})`,"i"),k=d.split(R);let V=[],U=null;k.forEach(Q=>{const G=Q.trim();if(!G)return;const rt=O.find(X=>G.toLowerCase().includes(X.toLowerCase()));if(rt)U=rt;else if(U){const X=U.split(" ")[0]||"✨";let W=U.substring(X.length).trim();W.includes("Хто він")&&X==="💍"&&(W="Твій любовний парадокс"),W.includes("Його Енергія")&&(W="Хто він"),W.includes("Ключ до Щастя")&&(W="Твоя інструкція до щастя"),W.includes("Чек-лист")&&(W='Чек-лист "Нормального мужика"');let Z=G;Z=Z.replace(/^[:\s]+/,"").replace(/^<\/b>\s*/i,"").replace(/^\s*<br\s*\/?>/i,"").trim(),V.push({emoji:X,title:W,content:Z}),U=null}else V.length===0&&G.length>10});const H=Q=>Q?(Q=Q.replace(/(повному\s+)?(звіті|звіт|описі|опис)(?![^<]*>)/gi,(G,rt,X)=>{let W=X;const Z=X.toLowerCase();Z==="звіт"&&(W="ОПИС"),Z==="звіті"&&(W="ОПИСІ"),Z==="опис"&&(W="ОПИС"),Z==="описі"&&(W="ОПИСІ");const at=`<span class="interactive-cta" style="color: var(--accent-color); font-weight: 800; text-transform: uppercase; cursor: pointer; text-decoration: underline; text-underline-offset: 3px;">${W}</span>`;return rt?rt+at:at}),Q=Q.replace(/("?Дізнатися всі подробиці"?)/gi,G=>`<span class="interactive-cta" style="color: var(--accent-color); font-weight: 400; cursor: pointer; border: 1px solid var(--accent-color); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${G.replace(/"/g,"")}</span>`),Q):"",K=`
            <style>
                @keyframes bounce-small {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(3px); }
                }
                .animate-bounce-small {
                    animation: bounce-small 2s infinite;
                    display: inline-block;
                }
                .cta-click-area {
                    transition: transform 0.2s, opacity 0.2s;
                }
                .cta-click-area:active {
                    transform: scale(0.98);
                    opacity: 0.8;
                }
            </style>
        `;V.length>0?B=V.map((G,rt)=>{const X=rt===0,W=rt===V.length-1;let Z=G.content.replace(/<\/?b>/gi,"");const at="Саме цей мікс";if(Z.includes(at)){const fe=Z.split(at);if(fe.length>1){const Ze=fe[1].indexOf(".");if(Ze!==-1){const zn=fe[0]+at+fe[1].substring(0,Ze+1),tn=fe[1].substring(Ze+1);Z=zn+' Щоб отримати повний ОПИС - введи час та місце свого народження нижче і тисни на кнопку "Дізнатися всі подробиці".'+tn}}}W&&(Z=Z.replace(/^чи підходить він тобі\??/i,'<br><span style="color: var(--accent-color); font-size: 1.05em; font-weight: 600; display: block; margin-bottom: 8px;">Чи підходить він тобі?</span>'),Z+='<br><br>Щоб отримати повний опис свого <span class="interactive-cta" style="color: var(--accent-color); font-weight: 400; cursor: pointer;">ІДЕАЛЬНОГО ПАРТНЕРА</span> — введи час та місце свого народження нижче і тисни на кнопку Дізнатися всі подробиці.');const Bt=A(H(Z)),Je=W?`
                    ${K}
                    <div class="cta-block" style="margin-top: 24px; background: rgba(205, 164, 94, 0.08); padding: 24px 20px; border-radius: 12px; border: 1px solid rgba(205, 164, 94, 0.2); text-align: center;">
                        <div style="margin-bottom: 20px;">
                            <span style="background-color: rgba(20, 20, 22, 0.8); color: var(--secondary-text-color); padding: 4px 12px; border-radius: 20px; font-size: 0.75em; text-transform: uppercase; letter-spacing: 1px; border: 1px solid var(--border-color); backdrop-filter: blur(4px);">АЛЕ ЦЕ ЩЕ НЕ ВСЕ</span>
                        </div>
                        <p style="margin-bottom: 8px; font-size: 1.05em; line-height: 1.5; color: var(--primary-text-color); text-align: center;">
                            Це лише <span style="color: var(--accent-color); font-weight: 700;">8%</span> інформації про твої стосунки та кохання...
                        </p>
                        <div style="display: inline-block; text-align: left; margin-bottom: 24px; width: 100%;">
                            <p style="margin-bottom: 14px; font-size: 0.9em; color: var(--secondary-text-color); text-align: center; font-style: italic; font-weight: 400;">
                                Дізнайся все про свого майбутнього обранця:
                            </p>
                            <ul style="list-style: none; padding: 0; margin: 0 auto; color: var(--secondary-text-color); font-size: 0.95em; line-height: 1.8; max-width: 280px;">
                                <li style="display: flex; align-items: center; margin-bottom: 6px;"><span style="margin-right: 10px; font-size: 1.2em;">🎭</span> <strong style="color: var(--primary-text-color);">Психологічний Портрет</strong></li>
                                <li style="display: flex; align-items: center; margin-bottom: 6px;"><span style="margin-right: 10px; font-size: 1.2em;">🔗</span> <strong style="color: var(--primary-text-color);">Кармічна Сумісність</strong></li>
                                <li style="display: flex; align-items: center; margin-bottom: 6px;"><span style="margin-right: 10px; font-size: 1.2em;">📍</span> <strong style="color: var(--primary-text-color);">Ймовірні обставини зустрічі</strong></li>
                                <li style="display: flex; align-items: center; margin-bottom: 6px;"><span style="margin-right: 10px; font-size: 1.2em;">💄</span> <strong style="color: var(--primary-text-color);">Секрети Зваблення</strong></li>
                                <li style="display: flex; align-items: center;"><span style="margin-right: 10px; font-size: 1.2em;">💞</span> <strong style="color: var(--primary-text-color);">Побудова стосунків</strong></li>
                            </ul>
                        </div>
                        <div class="interactive-cta cta-click-area" style="cursor: pointer; padding: 10px; border-radius: 8px; border: 1px solid transparent; margin: 0 -10px;">
                            <p style="margin: 0; font-weight: 700; color: var(--accent-color); font-size: 0.95em; text-align: center; white-space: nowrap;">
                                <span class="animate-bounce-small">⬇️</span> Введи час та місце народження
                            </p>
                        </div>
                    </div>
                `:"";return`
                    <div class="accordion-item ${X?"accordion-open":""}" style="
                        background-color: rgba(28, 28, 30, 0.6);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-left: 3px solid var(--accent-color);
                        border-radius: 12px;
                        margin-bottom: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
                    ">
                        <div class="accordion-header" style="
                            padding: 16px 20px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        " data-index="${rt}">
                            <h4 style="
                                color: var(--accent-color);
                                font-weight: 700;
                                text-transform: uppercase;
                                font-size: 0.85em;
                                letter-spacing: 1.5px;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                margin: 0;
                            ">
                                <span style="font-size: 1.2em;">${G.emoji}</span> ${G.title}
                            </h4>
                            <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                                ${Bt}
                                ${Je}
                                ${W?"":`
                                    <button class="next-section-btn" data-target="${rt+1}">
                                        Читати далі 👇
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                `}).join(""):B=A(H(d))}else B="<p>Дані відсутні.</p>";i.innerHTML=B;const C=i.querySelectorAll(".accordion-header"),I=i.querySelectorAll(".accordion-item"),N=i.querySelectorAll(".next-section-btn");function $(d,O=!1){I.forEach((R,k)=>{k===d?R.classList.contains("accordion-open")?R.classList.remove("accordion-open"):(R.classList.add("accordion-open"),setTimeout(()=>{const V=R.querySelector(".accordion-header");V&&V.scrollIntoView({behavior:"smooth",block:"start"})},300)):O||R.classList.remove("accordion-open")})}C.forEach(d=>{d.addEventListener("click",()=>{const O=parseInt(d.getAttribute("data-index"));$(O,!0)})}),N.forEach(d=>{d.addEventListener("click",O=>{O.stopPropagation();const R=parseInt(d.getAttribute("data-target"));R<I.length&&$(R,!0)})});const F=T.get("currentVariant");F?.ui?.results?.title&&(e.innerText=F.ui.results.title);function m(){!o||!l||(o.value?(l.innerText=o.value,l.style.color="var(--primary-text-color)",u&&u.classList.remove("input-error"),h&&(h.style.display="none")):(l.innerText="Обери час",l.style.color="var(--secondary-text-color)"))}o.addEventListener("input",m),o.addEventListener("change",m),o.addEventListener("blur",m),m(),f.addEventListener("input",()=>{w.style.display="none",E.style.display="none",f.classList.remove("input-error")});function p(d,O){d&&(O?(d.classList.add("loading"),d.disabled=!0):(d.classList.remove("loading"),d.disabled=!1))}function b(d,O){d==="ambiguous"?w.innerText=`Місто "${O}" знайдено в кількох місцях. Уточни, додавши країну (напр: ${O}, Україна).`:w.innerText=`Не можемо знайти місто "${O}". Перевір назву.`,w.style.display="block",f.classList.add("input-error")}x.addEventListener("click",async()=>{const d=o.value;let O=f.value.trim();const R=O;let k=!1;if(w.style.display="none",h.style.display="none",u&&u.classList.remove("input-error"),f.classList.remove("input-error"),O||(f.classList.add("input-error"),w.innerText="Будь ласка, введи місто народження.",w.style.display="block",k=!0),d||(u&&u.classList.add("input-error"),h.style.display="block",k=!0),k){L&&L.scrollIntoView({behavior:"smooth",block:"center"}),navigator.vibrate&&navigator.vibrate(50);return}p(x,!0);const V=await Ke(O);let U=null;if(V&&V.latitude?(V.corrected_name&&(f.value=V.corrected_name,O=V.corrected_name,R.toLowerCase()!==V.corrected_name.toLowerCase()&&(U=`Ми уточнили: ${V.corrected_name} 😉`)),T.set("geo",{latitude:V.latitude||V.lat,longitude:V.longitude||V.lon,timezone:V.timezone}),T.set("city",V.corrected_name)):V&&V.error==="ambiguous"?(b("ambiguous",O),k=!0):(b("not_found",O),k=!0),U?(E.innerText=U,E.style.display="block"):E.style.display="none",k){p(x,!1),navigator.vibrate&&navigator.vibrate(50);return}T.set("time",d);const H={date:T.get("date"),time:d,city:T.get("city"),geo:T.get("geo")};T.set("userData",H),setTimeout(()=>{n.navigateTo("paywall")},U?1200:0)}),D.addEventListener("click",async()=>{let d=f.value.trim();const O=d;if(w.style.display="none",h.style.display="none",f.classList.remove("input-error"),u&&u.classList.remove("input-error"),!d){f.classList.add("input-error"),w.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",w.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}p(x,!0),D.disabled=!0;const R=await Ke(d);let k=null,V=!1;if(R&&R.latitude?(R.corrected_name&&(f.value=R.corrected_name,d=R.corrected_name,O.toLowerCase()!==R.corrected_name.toLowerCase()&&(k=`Ми уточнили: ${R.corrected_name} 😉`)),T.set("geo",{latitude:R.latitude||R.lat,longitude:R.longitude||R.lon,timezone:R.timezone}),T.set("city",R.corrected_name),T.set("time","")):R&&R.error==="ambiguous"?(b("ambiguous",d),V=!0):(b("not_found",d),V=!0),k&&(E.innerText=k,E.style.display="block"),V){p(x,!1),D.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}const U={date:T.get("date"),time:"",city:T.get("city"),geo:T.get("geo")};T.set("userData",U),setTimeout(()=>{n.navigateTo("paywall")},k?1200:0)}),_();function _(){if(document.querySelector(".feedback-controls"))return;const d=document.createElement("div");d.className="feedback-controls",d.style.marginTop="15px",d.style.marginBottom="0",d.style.borderTop="none",d.style.paddingTop="0";const O=document.createElement("div");O.className="feedback-buttons";const R=y("👍","like"),k=y("👎","dislike");O.appendChild(k),O.appendChild(R),d.appendChild(O),i&&i.parentNode&&i.after(d)}function y(d,O){const R=document.createElement("div");return R.className="btn-feedback-icon",R.innerText=d,R.onclick=async()=>{R.parentElement.querySelectorAll(".btn-feedback-icon").forEach(V=>V.classList.remove("active")),R.classList.add("active"),await Vr.send({type:O,value:O,source:"partner_free_report"}),v("Дякую! 💜")},R}function v(d){const O=document.createElement("div");O.innerText=d,O.style.position="fixed",O.style.top="20px",O.style.left="50%",O.style.transform="translate(-50%, -20px)",O.style.background="linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)",O.style.color="#fff",O.style.border="1px solid rgba(205, 164, 94, 0.3)",O.style.boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.8)",O.style.padding="12px 24px",O.style.borderRadius="99px",O.style.fontWeight="bold",O.style.opacity="0",O.style.transition="all 0.3s ease",O.style.zIndex="2000",document.body.appendChild(O),requestAnimationFrame(()=>{O.style.opacity="1",O.style.transform="translate(-50%, 0)"}),setTimeout(()=>{O.style.opacity="0",O.style.transform="translate(-50%, -20px)",setTimeout(()=>document.body.removeChild(O),300)},900)}}function Rf(n){const t="pv_"+Date.now()+"_"+Math.random().toString(36).substr(2,5),e={page_path:n,page_title:document.title,event_id:t,email:T.get("email")||""};window.DC_Analytics?.pushFilteredEvent?window.DC_Analytics.pushFilteredEvent("virtual_pageview",e):window.dataLayer&&window.dataLayer.push({event:"virtual_pageview",...e})}function Pf(){if(T.get("traffic_type"))return;try{const h=localStorage.getItem("destiny_traffic_source");if(h){yt.log(`🛰️ [Source] Restored traffic_type from LocalStorage: ${h}`),T.set("traffic_type",h);return}}catch{console.warn("LocalStorage access failed")}const n=new URLSearchParams(window.location.search),t=n.has("fbclid"),e=n.get("utm_medium")?.toLowerCase()||"",r=n.get("utm_source")?.toLowerCase()||"",i=document.referrer.toLowerCase(),o=i.includes("instagram.com")||i.includes("l.instagram.com"),l=t||["cpc","ads","ad","social_paid"].includes(e),u=!t&&o||r.includes("bio")||e.includes("bio");l&&!u?T.set("traffic_type","paid"):T.set("traffic_type","organic")}function Lf(){document.addEventListener("click",n=>{const t=n.target.closest("button, a, .paywall-item, .interactive-astro-box");if(t&&window.dataLayer){const e=t.id||t.getAttribute("name")||"no-id",r="clk_"+Date.now()+"_"+Math.random().toString(36).substr(2,5);let i="interaction_click";if(e==="upgrade-button"&&(i="click_upgrade_3scrn"),t.classList.contains("paywall-item")){const o=t.querySelector(".font-bold")?.innerText||"Unknown";i=`click_paywall_benefit_${{"Ядро Особистості":"personality","Код Твого Кохання":"love","Грошовий Потік":"money","Кармічні Уроки та Призначення":"karma","Твої Майбутні Можливості":"future"}[o]||"other"}`}else(t.classList.contains("interactive-astro-box")||e==="paywall-astro-data")&&(i="click_paywall_benefit_astro_imprint");if(window.DC_Analytics.pushFilteredEvent(i,{event_id:r,element_id:e,email:T.get("email")||"",page_path:window.location.pathname}),(e==="final-checkout-button"||e==="popup-checkout-btn")&&window.DC_Analytics.trackBeginCheckout(347,"Natal Chart Full Report"),e==="ltv-upsell-btn"){const l=window.location.pathname.includes("report")||window.location.pathname.includes("premium-result")?"Report":"Success";window.DC_Analytics.trackBeginCheckout(199,`Forecast Upsell (${l})`),T.set("last_checkout_value",199),T.set("upsell_origin",l)}}},!0),document.addEventListener("click",n=>{const t=n.target.closest('button, a, .btn, .clickable, input[type="radio"], input[type="checkbox"]');t&&(t.disabled||t.classList.contains("disabled")?Pt.trigger("error"):t.classList.contains("btn-primary")||t.classList.contains("btn-action")?Pt.trigger("medium"):Pt.trigger("light"))},!0)}window.DC_Analytics={generateEventId:(n="evt")=>`${n}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,pushFilteredEvent:(n,t)=>{const e=T.get("currentVariant"),r=["1uah","man1uah"].includes(e?.id),i=e?.skipMetaTracking||r,o=T.get("traffic_type");window.dataLayer&&n!=="purchase"&&window.dataLayer.push({event:`${n}_total`,traffic_source:o,...t}),o==="paid"&&(i||window.dataLayer&&window.dataLayer.push({event:n,...t}))},trackBeginCheckout:(n,t)=>{const e=window.DC_Analytics.generateEventId("bc");let r="begin_checkout_main";t.includes("(Success)")&&(r="begin_checkout_upsell_success"),t.includes("(Report)")&&(r="begin_checkout_upsell_report"),window.DC_Analytics.pushFilteredEvent(r,{event_id:e,item_name:t,email:T.get("email")||"",ecommerce:{currency:"UAH",value:n,items:[{item_name:t,price:n,quantity:1}]}}),yt.log(`🚀 [Analytics] ${r.toUpperCase()}: ${t}`)},trackPurchase:(n,t,e)=>{const r=T.get("currentVariant"),i=["1uah","man1uah"].includes(r?.id),o=r?.skipMetaTracking||i,l=T.get("traffic_type");if(window.dataLayer.push({event:"purchase_total",traffic_source:l,item_name:e,value:n,transaction_id:t}),l!=="paid")return;if(n<=1||o){yt.log(`🚫 [Analytics] Skip Meta tracking for test/promo variant: ${e} (Value: ${n} UAH, ID: ${r?.id||"unknown"})`);return}let u="purchase_main";e.includes("(Success)")&&(u="purchase_upsell_success"),e.includes("(Report)")&&(u="purchase_upsell_report"),window.dataLayer.push({event:"purchase",event_custom_name:u,event_id:t,email:T.get("email")||"",ecommerce:{transaction_id:t,value:n,currency:"UAH",items:[{item_name:e,price:n,quantity:1}]}}),yt.log(`💰💰💰 [Analytics] ${u.toUpperCase()}: ${e}`)}};async function Df(){window.starryBgInstance||(window.starryBgInstance=new Fe);const n=()=>{Pt.init(),document.body.removeEventListener("click",n),document.body.removeEventListener("touchstart",n)};document.body.addEventListener("click",n),document.body.addEventListener("touchstart",n),Pf(),Lf(),$t.init({onRoute:async t=>{Rf(t);const e=new URLSearchParams(window.location.search);switch(t){case"/":uo($t);break;case"/loading":window.DC_Analytics.pushFilteredEvent("lead_confirmed",{event_id:"ld_"+Date.now(),email:T.get("email")||""}),Ec($t);break;case"/result":["man","man1uah"].includes(T.get("currentVariant")?.id)?kf($t):mf($t);break;case"/premium":yf($t);break;case"/paywall":if(!T.get("userData"))return $t.navigate("/");window.DC_Analytics.pushFilteredEvent("premium_data_confirmed",{event_id:"pdc_"+Date.now(),email:T.get("email")||""}),bf();break;case"/success":wf($t);break;case"/generation":if(!T.get("isPaid"))return $t.navigate("/paywall");If($t);break;case"/report":case"/premium-result":if(!e.get("id")&&!T.get("isPaid"))return $t.navigate("/paywall");Fn(),Af();break;default:uo($t)}}})}document.addEventListener("DOMContentLoaded",Df);
