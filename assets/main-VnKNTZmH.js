import"./modulepreload-polyfill-B5Qt9EMX.js";import{getVariantByUrl as ya,VARIANTS as Xe}from"./index-3ih_YSI2.js";import{_ as Tr}from"./preload-helper-BXl3LOEh.js";import{API_BASE as va,API as Ft,SYSTEM as Ai,DISPLAY_PRICES as uc,PAYMENT_PRICES as pc}from"./config-BqzeW2gq.js";class hc{constructor(){this.storageKey="destinyUser",this.trafficKey="destiny_traffic_source",this.data=this.load()}load(){try{const t=sessionStorage.getItem(this.storageKey);return t?JSON.parse(t):{}}catch{return console.warn("SessionStorage disabled or inaccessible"),{}}}save(){try{sessionStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch{console.warn("Failed to save to SessionStorage")}}get(t){return this.data[t]}set(t,e){if(this.data[t]=e,this.save(),t==="traffic_type")try{localStorage.setItem(this.trafficKey,e)}catch{console.warn("LocalStorage backup failed")}}clear(){this.data={},sessionStorage.removeItem(this.storageKey)}}const E=new hc;class tn{constructor(){document.getElementById("starry-background")||(this.container=document.createElement("div"),this.container.id="starry-background",this.container.style.cssText=`
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
        `,this.ctx=this.canvas.getContext("2d",{alpha:!1}),this.container.appendChild(this.canvas),document.body.prepend(this.container),this.stars=[],this.dustNodes=[],this.shootingStars=[],this.isMobile=window.innerWidth<768,this.initialGamma=null,this.initialBeta=null,this.width=window.innerWidth,this.height=window.innerHeight,this.mouseX=0,this.mouseY=0,this.targetX=0,this.targetY=0,this.lastShootingStar=0,this.shootingStarInterval=5e3+Math.random()*5e3,this.init())}init(){if(this.resize(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("mousemove",t=>this.onMouseMove(t)),window.addEventListener("deviceorientation",t=>this.onDeviceMove(t)),window.addEventListener("pageshow",t=>{t.persisted&&(console.log("🌌 StarryBackground: Restoring from bfcache..."),tn.ensureRunning())}),document.addEventListener("visibilitychange",()=>{document.hidden?this.active=!1:tn.ensureRunning()}),window.addEventListener("focus",()=>{tn.ensureRunning()}),this.isMobile&&typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"){const t=()=>{DeviceOrientationEvent.requestPermission().then(e=>{e==="granted"&&window.addEventListener("deviceorientation",r=>this.onDeviceMove(r))}).catch(console.error).finally(()=>{window.removeEventListener("click",t),window.removeEventListener("touchstart",t)})};window.addEventListener("click",t),window.addEventListener("touchstart",t)}this.createSystem(),this.animate()}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.canvas.width=this.width,this.canvas.height=this.height,this.isMobile=this.width<768,this.createSystem()}createSystem(){this.active=!0,this.stars=[],this.dustNodes=[],this.shootingStars=[];const t=this.isMobile?5:8,e=this.height*.1,r=200,s=200;for(let h=0;h<t;h++)this.dustNodes.push({x:Math.random()*this.width,y:Math.random()*e,radius:Math.random()*s+r,colorPhase:Math.random()*Math.PI*2,pulseSpeed:.2+Math.random()*.2,vx:(Math.random()-.5)*.05,vy:(Math.random()-.5)*.05});const o=this.height*.2,l=this.isMobile?240:600;for(let h=0;h<l;h++)this.stars.push({x:Math.random()*this.width,y:Math.random()*o,size:Math.random()*.6+.1,baseOpacity:Math.random()*.4+.1,phase:Math.random()*Math.PI*2,speed:Math.random()*.02+.01,parallax:.02,isMilkyWay:!0});const d=this.isMobile?3500:3e3,p=Math.floor(this.width*this.height/d*1.2);for(let h=0;h<p;h++){let _=Math.random()<.6?Math.random()*(this.height*.5):Math.random()*this.height;this.stars.push({x:Math.random()*this.width,y:_,size:Math.random()*(this.isMobile?1.2:1.8),baseOpacity:Math.random()*.7+.3,phase:Math.random()*Math.PI*2,speed:Math.random()*.03+.01,parallax:Math.random()*.08+.04,isMilkyWay:!1})}}spawnShootingStar(){const t=Math.random()>.5,e=t?Math.random()*this.width*.2:this.width*.8+Math.random()*this.width*.2,r=Math.random()*(this.height*.3),s=t?Math.PI/6+Math.random()*Math.PI/6:Math.PI-Math.PI/6-Math.random()*Math.PI/6;this.shootingStars.push({x:e,y:r,vx:Math.cos(s)*(10+Math.random()*5),vy:Math.sin(s)*(10+Math.random()*5),length:60+Math.random()*90,opacity:1,life:1})}onMouseMove(t){this.isMobile||(this.targetX=t.clientX/this.width-.5,this.targetY=t.clientY/this.height-.5)}onDeviceMove(t){if(t.beta===null||t.gamma===null)return;if(this.initialBeta===null){this.initialBeta=t.beta,this.initialGamma=t.gamma;return}let e=t.gamma-this.initialGamma,r=t.beta-this.initialBeta;const s=30;e=Math.min(Math.max(e,-s),s),r=Math.min(Math.max(r,-s),s),this.targetX=e/s*.5,this.targetY=r/s*.5}lerp(t,e,r){return(1-r)*t+r*e}animate(){if(!this.active)return;const t=Date.now(),e=t*.001;t-this.lastShootingStar>this.shootingStarInterval&&(this.spawnShootingStar(),this.lastShootingStar=t,this.shootingStarInterval=4e3+Math.random()*6e3);const r=this.isMobile?.08:.02;this.mouseX+=(this.targetX-this.mouseX)*r,this.mouseY+=(this.targetY-this.mouseY)*r;const s=this.isMobile?1200:600,o=this.mouseX*s,l=this.mouseY*s,d=document.querySelector(".funnel-container"),p=d?d.scrollTop:window.scrollY||0,h=this.ctx.createLinearGradient(0,0,0,this.height);h.addColorStop(0,"#080504"),h.addColorStop(1,"#050508"),this.ctx.fillStyle=h,this.ctx.fillRect(0,0,this.width,this.height);const _={r:131,g:105,b:60},T={r:100,g:50,b:160};this.ctx.globalCompositeOperation="lighter",this.dustNodes.forEach(x=>{x.x+=x.vx,x.y+=x.vy;const D=(Math.sin(e*x.pulseSpeed+x.colorPhase)+1)/2,S=Math.floor(this.lerp(_.r,T.r,D)),A=Math.floor(this.lerp(_.g,T.g,D)),z=Math.floor(this.lerp(_.b,T.b,D)),C=.05+(Math.sin(e*.5+x.colorPhase)+1)*.02,R=`rgba(${S}, ${A}, ${z}, ${C})`,K=p*.2,F=o*.15,G=l*.15,v=x.x-F,y=x.y-G-K,f=this.ctx.createRadialGradient(v,y,0,v,y,x.radius);f.addColorStop(0,R),f.addColorStop(1,"transparent"),this.ctx.fillStyle=f,this.ctx.beginPath(),this.ctx.arc(v,y,x.radius,0,Math.PI*2),this.ctx.fill()}),this.ctx.globalCompositeOperation="source-over",this.ctx.fillStyle="#FFFFFF",this.stars.forEach(x=>{const O=.7+.3*Math.sin(e*(x.speed*50)+x.phase),D=p*(x.parallax*3);let S=x.x-o*x.parallax,A=x.y-l*x.parallax-D;const z=50,C=this.height+z*2;for(;A<-z;)A+=C;for(;A>this.height+z;)A-=C;S<-z&&(S+=this.width+z*2),S>this.width+z&&(S-=this.width+z*2),this.ctx.globalAlpha=x.baseOpacity*O,this.ctx.beginPath(),this.ctx.arc(S,A,x.size,0,Math.PI*2),this.ctx.fill()}),this.ctx.globalAlpha=1,this.shootingStars=this.shootingStars.filter(x=>{if(x.x+=x.vx,x.y+=x.vy,x.life-=.015,x.opacity=x.life,x.life<=0||x.x>this.width+100||x.y>this.height+100)return!1;const O=x.x-x.vx/Math.hypot(x.vx,x.vy)*x.length,D=x.y-x.vy/Math.hypot(x.vx,x.vy)*x.length,S=this.ctx.createLinearGradient(O,D,x.x,x.y);return S.addColorStop(0,"transparent"),S.addColorStop(.5,`rgba(255, 255, 255, ${x.opacity*.5})`),S.addColorStop(1,`rgba(255, 255, 255, ${x.opacity})`),this.ctx.strokeStyle=S,this.ctx.lineWidth=1.5,this.ctx.lineCap="round",this.ctx.beginPath(),this.ctx.moveTo(O,D),this.ctx.lineTo(x.x,x.y),this.ctx.stroke(),this.ctx.fillStyle=`rgba(255, 255, 255, ${x.opacity})`,this.ctx.beginPath(),this.ctx.arc(x.x,x.y,1.5,0,Math.PI*2),this.ctx.fill(),!0}),this.ctx.globalAlpha=1,requestAnimationFrame(()=>this.animate())}destroy(){this.active=!1,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container)}static ensureRunning(){const t=window.starryBgInstance;t&&(console.log("🌌 StarryBackground: Ensuring animation is running..."),t.active=!0,requestAnimationFrame(()=>t.animate()))}}const Pt={log:(...n)=>{},warn:(...n)=>{},error:(...n)=>{console.error(...n)},debug:(...n)=>{}};class fc{constructor(){this.onRoute=null,this.currentVariant=null}init(t){if(!t||typeof t.onRoute!="function"){Pt.error("Router init failed: config.onRoute is missing");return}this.onRoute=t.onRoute;const e=ya();e&&(Pt.log(`🚀 Active Variant: ${e.id}`),this.currentVariant=e,E.set("currentVariant",e),this.trackVariantView(e)),window.addEventListener("popstate",()=>{tn.ensureRunning(),this.handleLocation()}),this.handleLocation()}async handleLocation(){let t=window.location.pathname;this.currentVariant&&(t===`/${this.currentVariant.id}`||t===`/${this.currentVariant.id}/`)?t="/":this.currentVariant||(document.body.style.backgroundColor=""),this.onRoute&&await this.onRoute(t)}navigate(t){window.history.pushState({},"",t),this.handleLocation(),window.scrollTo(0,0)}navigateTo(t){const e=t.startsWith("/")?t:`/${t}`;this.navigate(e)}trackVariantView(t){if(window.fbq){const e=E.get("traffic_type"),r=t?.skipMetaTracking||["1uah","man1uah"].includes(t?.id);if(e!=="paid"||r){Pt.log(`🍃 [Analytics] Skip fbq ViewContent for Organic/Test traffic: ${t.id}`);return}Pt.log("📊 Tracking Variant View:",t.id),window.fbq("track","ViewContent",{content_name:t.id,content_category:t.type})}}}const ee=new fc;class mc{constructor(){this.audioCtx=null,this.isAudioUnlocked=!1,this.canVibrate=typeof navigator<"u"&&"vibrate"in navigator,this.isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,this.tickBuffer=null,this.hasInitialized=!1}init(t=!1){if(!(this.hasInitialized&&!t))try{const e=window.AudioContext||window.webkitAudioContext;e&&(this.audioCtx=new e,this._createTickBuffer(),this.hasInitialized=!0,this._unlock())}catch(e){console.warn("Haptics: Web Audio API not supported",e)}}_createTickBuffer(){if(!this.audioCtx)return;const t=this.audioCtx.sampleRate,e=Math.floor(.015*t),r=this.audioCtx.createBuffer(1,e,t),s=r.getChannelData(0),o=150;for(let l=0;l<e;l++){const d=l/t,p=Math.sin(2*Math.PI*o*d);let h=1;l<e*.1?h=l/(e*.1):h=1-(l-e*.1)/(e*.9),s[l]=p*h}this.tickBuffer=r}_unlock(){this.isAudioUnlocked||!this.audioCtx||(this.audioCtx.state==="suspended"?this.audioCtx.resume().then(()=>{this.isAudioUnlocked=!0}).catch(t=>console.log("Audio unlock failed, waiting for next interaction")):this.isAudioUnlocked=!0)}trigger(t="light"){if(this.canVibrate){try{switch(t){case"light":navigator.vibrate(10);break;case"medium":navigator.vibrate(20);break;case"heavy":navigator.vibrate(40);break;case"success":navigator.vibrate([10,50,20]);break;case"error":navigator.vibrate([50,100,50]);break;default:navigator.vibrate(15)}}catch{}return}if(!this.isIOS&&this.audioCtx&&this.tickBuffer){this.audioCtx.state==="suspended"&&this.audioCtx.resume();const e=this.audioCtx.createBufferSource();e.buffer=this.tickBuffer;const r=this.audioCtx.createGain();let s=1,o=1;switch(t){case"light":s=.6,o=1.2;break;case"medium":s=.8,o=1;break;case"heavy":s=1,o=.8;break;case"success":this._playTone(.6,1.2,0),setTimeout(()=>this._playTone(1,1,.1),80);return;case"error":this._playTone(.8,.8,0),setTimeout(()=>this._playTone(.8,.8,.08),80),setTimeout(()=>this._playTone(.8,.8,.16),160);return}e.playbackRate.value=o,r.gain.setValueAtTime(s,this.audioCtx.currentTime),r.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+.05),e.connect(r),r.connect(this.audioCtx.destination),e.start()}}_playTone(t,e,r){if(!this.audioCtx||!this.tickBuffer)return;const s=this.audioCtx.createBufferSource();s.buffer=this.tickBuffer,s.playbackRate.value=e;const o=this.audioCtx.createGain();o.gain.setValueAtTime(t,this.audioCtx.currentTime+r),o.gain.exponentialRampToValueAtTime(.01,this.audioCtx.currentTime+r+.05),s.connect(o),o.connect(this.audioCtx.destination),s.start(this.audioCtx.currentTime+r)}}const Rt=new mc;let Pn=null;function Wi(){return window.CircularNatalHoroscope?Promise.resolve(!0):Pn?(console.log("⏳ Astro Library load request joined existing queue..."),Pn):(console.log("🚀 Starting Astro Library sequence..."),Pn=new Promise(n=>{window.module||(window.module={exports:{}}),window.exports=window.module.exports;const t=["https://unpkg.com/circular-natal-horoscope-js@1.1.0/dist/index.js","https://cdn.jsdelivr.net/npm/circular-natal-horoscope-js@1.1.0/dist/index.js","./js/astro-lib.js"];function e(r){if(r>=t.length){console.error("❌ CRITICAL: Всі джерела бібліотеки (включно з локальним) недоступні."),n(!1),Pn=null;return}const s=t[r],o=document.createElement("script");o.src=s,o.async=!0,o.onload=()=>{window.module&&window.module.exports&&window.module.exports.Horoscope?(window.CircularNatalHoroscope=window.module.exports,console.log(`✅ Astro Library Loaded Successfully from ${s}`),n(!0)):window.CircularNatalHoroscope?(console.log(`✅ Astro Library Loaded (Global) from ${s}`),n(!0)):(console.warn(`⚠️ Script loaded from ${s}, but exports missing.`),e(r+1))},o.onerror=()=>{console.warn(`⚠️ Failed to load from ${s}. Switching to backup source...`),e(r+1)},document.head.appendChild(o)}e(0)}),Pn)}async function ba(n){if(!await Wi())throw new Error("Astro Library not loaded");const{Origin:t,Horoscope:e,Renderer:r}=window.CircularNatalHoroscope,s=n.date.split("-"),o=parseInt(s[0]),l=parseInt(s[1])-1,d=parseInt(s[2]);let p=12,h=0;if(n.time){const v=n.time.split(":");p=parseInt(v[0]),h=parseInt(v[1])}let _=50.45,T=30.52,x="Europe/Kyiv";if(n.geo){const v=parseFloat(n.geo.latitude||n.geo.lat),y=parseFloat(n.geo.longitude||n.geo.lon);!isNaN(v)&&!isNaN(y)&&(_=v,T=y,x=n.geo.timezone||x)}let O=[],D=[],S=[],A=[],z="",C=null,R=null;const K={SUN:{domicile:["LEO"],detriment:["AQUARIUS"],exaltation:["ARIES"],fall:["LIBRA"]},MOON:{domicile:["CANCER"],detriment:["CAPRICORN"],exaltation:["TAURUS"],fall:["SCORPIO"]},MERCURY:{domicile:["GEMINI","VIRGO"],detriment:["SAGITTARIUS","PISCES"],exaltation:["VIRGO"],fall:["PISCES"]},VENUS:{domicile:["TAURUS","LIBRA"],detriment:["SCORPIO","ARIES"],exaltation:["PISCES"],fall:["VIRGO"]},MARS:{domicile:["ARIES","SCORPIO"],detriment:["LIBRA","TAURUS"],exaltation:["CAPRICORN"],fall:["CANCER"]},JUPITER:{domicile:["SAGITTARIUS","PISCES"],detriment:["GEMINI","VIRGO"],exaltation:["CANCER"],fall:["CAPRICORN"]},SATURN:{domicile:["CAPRICORN","AQUARIUS"],detriment:["CANCER","LEO"],exaltation:["LIBRA"],fall:["ARIES"]},URANUS:{domicile:["AQUARIUS"],detriment:["LEO"],exaltation:["SCORPIO"],fall:["TAURUS"]},NEPTUNE:{domicile:["PISCES"],detriment:["VIRGO"],exaltation:["CANCER"],fall:["CAPRICORN"]},PLUTO:{domicile:["SCORPIO"],detriment:["TAURUS"],exaltation:["ARIES"],fall:["LIBRA"]}};function F(v,y){const f=K[v.toUpperCase()];return f?f.domicile.includes(y.toUpperCase())?" [Domicile/Обитель]":f.detriment.includes(y.toUpperCase())?" [Detriment/Вигнання]":f.exaltation.includes(y.toUpperCase())?" [Exaltation/Екзальтація]":f.fall.includes(y.toUpperCase())?" [Fall/Падіння]":"":""}function G(v){const y=Math.floor(v),f=(v-y)*60,b=Math.floor(f),w=Math.round((f-b)*60);return`${y}° ${b}' ${w}"`}try{const v=new t({year:o,month:l,date:d,hour:p,minute:h,latitude:_,longitude:T,timezone:x});R=new e({origin:v,houseSystem:"placidus",zodiac:"tropical",aspectPoints:["bodies","points","angles"],aspectWithPoints:["bodies","points","angles"],aspectTypes:["major","minor"],customOrbs:{}});const y=R.CelestialBodies,f=R.CelestialPoints,b=["sun","moon","mercury","venus","mars","jupiter","saturn","uranus","neptune","pluto"],w=["northnode","southnode","lilith","chiron"],k=["ascendant","midheaven"],u={},M={};b.forEach(g=>{const I=y[g];if(I){const $=I.Sign.label.toUpperCase(),U=I.ChartPosition.Ecliptic.DecimalDegrees%30,L=G(U),B=g.toUpperCase();let H="";I.Speed&&I.Speed.DecimalDegrees<0&&(H=" (R)");const q=I.House?I.House.id:null,Q=q?` [House ${q}]`:"",J=F(B,$);O.push(`${B}: ${$} ${L}${H}${Q}${J}`),u[$]=(u[$]||0)+1,q&&(M[q]=(M[q]||0)+1)}});for(const[g,I]of Object.entries(u))I>=3&&A.push(`Stellium in ${g} (${I} planets)`);for(const[g,I]of Object.entries(M))I>=3&&A.push(`Stellium in House ${g} (${I} planets)`);w.forEach(g=>{const I=f?f[g]:null;if(I){const $=I.Sign?.label?.toUpperCase()||"UNKNOWN",U=(I.ChartPosition?.Ecliptic?.DecimalDegrees||0)%30,L=G(U);let B=g.toUpperCase();g==="northnode"&&(B="NORTH NODE (Rahu)"),g==="southnode"&&(B="SOUTH NODE (Ketu)"),g==="lilith"&&(B="LILITH (Black Moon)"),g==="chiron"&&(B="CHIRON"),O.push(`${B}: ${$} ${L}`)}}),k.forEach(g=>{let I=null;if(g==="ascendant"&&(I=R.Ascendant),g==="midheaven"&&(I=R.Midheaven),I){const $=I.Sign.label.toUpperCase(),U=I.ChartPosition.Ecliptic.DecimalDegrees%30,L=G(U),B=g.toUpperCase();O.push(`${B}: ${$} ${L}`)}}),A.length>0&&console.log("Calculated Configurations:",A),R.Aspects&&R.Aspects.all&&R.Aspects.all.forEach(g=>{const I=g.point1?.label||g.point1?.key||"Unknown",$=g.point2?.label||g.point2?.key||"Unknown",U=g.name||g.type||"Aspect",L=g.orb!==void 0?g.orb.toFixed(1):"?";D.push(`${I} ${U} ${$} (orb ${L}°)`)}),console.log("Calculated Planets (DMS + Retrograde + Houses):",O),console.log("Calculated Aspects:",D),R.Houses&&R.Houses.length>0&&(R.Houses.forEach((g,I)=>{const $=I+1,U=g.Sign?.label?.toUpperCase()||"UNKNOWN",L=(g.ChartPosition?.StartPosition?.Ecliptic?.DecimalDegrees||0)%30,B=G(L);S.push(`House ${$}: ${U} ${B}`)}),console.log("Calculated House Cusps:",S));const Y=y.sun,V=y.moon;if(Y&&V){const g=Y.ChartPosition.Ecliptic.DecimalDegrees;let $=(V.ChartPosition.Ecliptic.DecimalDegrees-g+360)%360;$<45?z="New Moon (Новий Місяць)":$<90?z="Waxing Crescent (Зростаючий Серп)":$<135?z="First Quarter (Перша Чверть)":$<180?z="Waxing Gibbous (Зростаючий Опуклий)":$<225?z="Full Moon (Повний Місяць)":$<270?z="Waning Gibbous (Спадаючий Опуклий)":$<315?z="Last Quarter (Остання Чверть)":z="Waning Crescent (Спадаючий Серп)",console.log("Moon Phase at Birth:",z)}}catch(v){return console.error("Horoscope Calculation Failed:",v),{planets:[],aspects:[],chartSvg:null,houseSystem:"Error"}}try{if(R){const v=document.createElement("div");v.style.position="absolute",v.style.left="-9999px",v.style.visibility="hidden",document.body.appendChild(v),new r(R).render(v);const f=v.querySelector("svg");f&&(f.style.backgroundColor="transparent",f.querySelectorAll("line, circle, path").forEach(b=>{const w=b.getAttribute("stroke");(!w||w==="#000000"||w==="#000")&&b.setAttribute("stroke","#cda45e");const k=b.getAttribute("fill");(k==="#000000"||k==="#000")&&b.setAttribute("fill","#cda45e")}),f.querySelectorAll("text").forEach(b=>{b.style.fill="#cda45e",b.setAttribute("fill","#cda45e"),b.style.fontFamily="'Montserrat', sans-serif"}),C=v.innerHTML),document.body.removeChild(v)}}catch(v){console.warn("SVG Render Error:",v)}return{planets:O,aspects:D,houses:S,configurations:A,moonPhase:z,chartSvg:C,houseSystem:"Placidus"}}async function Te(n,t={},e={}){try{let r;if(n.startsWith("http://")||n.startsWith("https://"))r=n;else{const l=n.startsWith("/")?n.slice(1):n;r=`${va}/${l}`}const s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),...e},o=await fetch(r,s);if(!o.ok){const l=await o.text();throw new Error(l||`API Error: ${o.status}`)}return await o.json()}catch(r){throw r.name!=="AbortError"&&Pt.error(`[API Core Error] ${n}:`,r),r}}let Ne=null,Ir=null;function Yn(){Ft&&Ft.PDF&&Te(Ft.PDF,{warmup:!0}).catch(()=>{}),Ft&&Ft.endpoints&&Ft.endpoints.PAYMENT_INIT&&Te(Ft.endpoints.PAYMENT_INIT,{warmup:!0}).catch(()=>{})}function Ki(n){if(!n)return null;try{return JSON.parse(n)}catch{}const t="```",e=new RegExp(t+"(?:json)?\\s*([\\s\\S]*?)\\s*"+t,"i"),r=n.match(e);if(r&&r[1])try{return JSON.parse(r[1])}catch{}const s=n.indexOf("{"),o=n.lastIndexOf("}");if(s!==-1&&o!==-1&&o>s){const l=n.substring(s,o+1);try{return JSON.parse(l)}catch(d){console.error("❌ JSON Extraction Failed (Brace Method):",d)}}throw console.error("❌ Fatal: Could not parse AI response. Raw content:",n),new Error("Invalid JSON format from AI")}function xa(n){if(!n||!Array.isArray(n))return"";const t={section:"margin-bottom: 35px; page-break-inside: avoid;",h2:"color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px;",p:"font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #e0e0e0; margin-bottom: 12px; text-align: justify;",strong:"color: #ffffff; font-weight: 600;",adviceBox:"background-color: #161b22; border: 1px solid rgba(205, 164, 94, 0.2); border-left: 4px solid #cda45e; padding: 20px; margin-top: 20px; border-radius: 0 8px 8px 0;",adviceHeader:"color: #cda45e; display: block; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700; font-family: 'Montserrat', sans-serif;",adviceText:"margin: 0; color: #cccccc; font-style: italic; font-family: 'Montserrat', sans-serif; font-size: 13px; line-height: 1.6;"};return n.map(e=>{let r=e.analysis_text||"";r=r.replace(/\\n/g,`
`),r=r.replace(/\*\*(.*?)\*\*/g,`<strong style="${t.strong}">$1</strong>`);const s=r.split(`
`).filter(o=>o.trim()!=="").map(o=>`<p style="${t.p}">${o}</p>`).join("");return`
            <div class="report-section" style="${t.section}">
                <h2 style="${t.h2}">
                    <span style="margin-right: 8px;">${e.icon}</span> ${e.title}
                </h2>
                <div class="report-content-text">${s}</div>
                <div class="report-advice" style="${t.adviceBox}">
                    <span style="${t.adviceHeader}">⚡️ KOSMIC KEY:</span>
                    <p style="${t.adviceText}">${e.practical_advice}</p>
                </div>
            </div>`}).join("")}async function Qi(n,t){const e=new AbortController,r=setTimeout(()=>e.abort(),Ai.REQUEST_TIMEOUT_MS);try{if(!Ft||!Ft.PROXY)throw new Error("Configuration Error: API.PROXY is missing. Please check src/config.js");Pt.log(`📡 Sending request to: ${Ft.PROXY} [Action: ${n}]`);const s=await Te(Ft.PROXY,{action:n,data:t,modelName:Ai.MODEL_NAME},{signal:e.signal});clearTimeout(r);const o=s.candidates?.[0]?.content?.parts?.[0]?.text;if(!o)throw new Error("AI returned empty response (no text candidate)");return o}catch(s){throw clearTimeout(r),console.error("AI Request Failed:",s),s}}async function gc(n){Yn();const t=2;for(let e=1;e<=t;e++)try{const r=E.get("currentVariant"),s=r?.productType||r?.aiContext?.productType,o=s==="partner",l=s==="forecast",d=r?.id==="natal_child",p=o?"partner_free_analysis":l?"forecast_free_analysis":d?"child_free_analysis":"free_analysis";let h=`Дата народження: ${n}`;try{const A=await ba({date:n});A&&A.planets&&(h=`Дата: ${n}
== Технічні Астрологічні Дані ==
${A.planets.join(`
`)}`,E.set("planets",A.planets),A.aspects&&A.aspects.length>0&&E.set("aspects",A.aspects),A.houses&&A.houses.length>0&&(h+=`

== Куспіди Домів (Placidus) ==
${A.houses.join(`
`)}`),A.configurations&&A.configurations.length>0&&(h+=`

== Планетарні Конфігурації ==
${A.configurations.join(`
`)}`),A.moonPhase&&(h+=`

== Фаза Місяця при народженні ==
${A.moonPhase}`))}catch(A){console.warn("Free astro calc skipped",A)}const{getZodiacSign:_}=await Tr(async()=>{const{getZodiacSign:A}=await Promise.resolve().then(()=>_c);return{getZodiacSign:A}},void 0),x=_(n)?.name||"";Pt.log(`📡 Requesting ${p} for productType: ${s||"default"} (Attempt ${e}/${t})`);const O={date:n,sunSign:x,userQuery:h};d&&(O.childGender=localStorage.getItem("childGender")||"male");const D=await Qi(p,O);return Ki(D)}catch(r){if(console.error(`Free Analysis Error (Attempt ${e}/${t}):`,r),e<t&&r.message?.includes("Invalid JSON")){await new Promise(s=>setTimeout(s,1500));continue}return{title:"Зірки ще не готові...",psychological_analysis:"<p>На жаль, зараз Всесвіт не зміг розкрити таємницю. Будь ласка, спробуй ще раз через хвилину — зірки вже вибудовуються у потрібний порядок ✨</p>"}}}async function _a(n){if(Ne)return Ne;const t=E.get("currentVariant"),e=t?.productType||t?.aiContext?.productType,r=e==="partner",s=e==="forecast",o=t?.id==="natal_child",l=r?"partner_full_report":s?"forecast_full_report":o?"child_full_report":"full_report";let d="";try{const x=await ba(n);x&&x.planets&&(d=`== Технічні Астрологічні Дані ==
${x.planets.join(`
`)}`,E.set("planets",x.planets),x.aspects&&x.aspects.length>0&&(d+=`

== Аспекти Натальної Карти ==
${x.aspects.join(`
`)}`,E.set("aspects",x.aspects)),x.houses&&x.houses.length>0&&(d+=`

== Куспіди Домів (Placidus) ==
${x.houses.join(`
`)}`),x.configurations&&x.configurations.length>0&&(d+=`

== Планетарні Конфігурації ==
${x.configurations.join(`
`)}`),x.moonPhase&&(d+=`

== Фаза Місяця при народженні ==
${x.moonPhase}`))}catch(x){console.warn("Local calc skipped",x)}let h=`Дата: ${n.date}
Час: ${n.time}
Місто: ${n.city}
${d}`;t&&t.aiContext&&t.aiContext.additionalPrompt&&(Pt.log("🧠 Injecting AI Context from Variant:",t.id),h+=`

[ВАЖЛИВИЙ КОНТЕКСТ МАРКЕТИНГУ: ${t.aiContext.additionalPrompt}]`);const _=E.get("planets")?{...n,planets:E.get("planets"),aspects:E.get("aspects")}:n,T={userQuery:h};return o&&(T.childGender=localStorage.getItem("childGender")||"male"),Ne=Qi(l,T).then(x=>{const O=Ki(x);return Ir={data:O,enrichedUserData:_},O}).catch(x=>{throw Ne=null,x}),Ne}async function wa(n,t){let e=null,r=n;try{if(Ir?(e=Ir.data,r=Ir.enrichedUserData):Ne?(e=await Ne,r=E.get("planets")?{...n,planets:E.get("planets")}:n):(e=await _a(n),r=E.get("planets")?{...n,planets:E.get("planets")}:n),t&&t.includes("@")){Pt.log("📧 Preparing Main Report Email (Frontend Trigger)...");const s=xa(e.sections),o=E.get("currentVariant"),l=o?.productType||o?.aiContext?.productType,d=l==="partner",p=l==="forecast",h=d?"Твій Астро-Портрет Ідеального Партнера":p?"Твій Персональний Прогноз на Рік":"Твій Повний Аналіз",_=d?"partner":p?"upsell":"main";Te(Ft.EMAIL,{userEmail:t,reportHtml:s,reportTitle:h,reportType:_,userData:r}).catch(T=>console.error("Email Error:",T))}return e}catch(s){return console.error("Generate Full Report Error:",s),{error:!0,message:"Не вдалося згенерувати звіт."}}}async function yc(n,t){E.get("planets");const e=`Користувач: Жінка. Дата: ${n.date}. Місто: ${n.city}`;try{Pt.log("🔮 Generating Forecast for UI preview...");const r=await Qi("forecast",{userQuery:e}),s=Ki(r);if(!s||!s.sections)throw new Error("Invalid Forecast JSON");const o=xa(s.sections);Pt.log("✅ Forecast HTML generated. Email буде відправлено backend'ом.")}catch(r){return console.error("Generate Forecast Error:",r),null}}async function vc(n){try{Pt.log(`🔄 Fetching report by ID: ${n}`);const t=`${va}/getReportById?id=${n}`,e=await fetch(t);if(e.status===202)return{status:"processing"};if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const r=await e.json();if(r.status==="ready"&&r.reportData)return r;throw new Error("Invalid report data received")}catch(t){return console.error("Fetch Report By ID Error:",t),{error:!0,message:t.message}}}const bc=`<section id="landing-step" class="funnel-step active space-y-8 text-center flex flex-col" style="flex-grow: 1;">

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
            <button type="submit" id="birth-form-btn" class="btn btn-primary w-full !text-base sm:!text-lg h-14" style="padding-left: 8px; padding-right: 8px;">
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
</div>
<style>
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
                text-align: left;
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
        
        
        
</style>`;function yo(n){const t=document.getElementById("app");t.classList.add("funnel-container");const e=document.createElement("div");e.innerHTML=bc;let r=null;try{if(r=E.get("currentVariant"),r&&r.ui){console.log("🎨 Applying Variant UI Overrides (Pre-render):",r.id);const k=e.querySelector("h2"),u=e.querySelector("p.text-lg"),M=e.querySelector("#birth-form button .btn-text"),Y=e.querySelector("#landing-step > div:first-child > div:first-child"),V=e.querySelector("#calculation-disclaimer");if(Y&&r.ui.heroIcon&&(Y.innerHTML=r.ui.heroIcon),r.id==="man"||r.id==="man1uah"){const g=e.querySelector("#landing-step > div:first-child");g&&(g.style.justifyContent="flex-start",g.style.paddingTop="60px")}if(r.id==="natal_chart"||r.id==="natal_chart2"||r.id==="natal-chart"||r.id==="natal_chart_original"||r.id==="natal_chart_price"||r.id==="natal_chart_offer"||r.id==="natal_chart_landoffer"||r.id==="natal_chart_sale"||r.id==="natal_chart_offer1uah"){const g=e.querySelector("#landing-step > div:first-child");g&&(g.style.justifyContent="flex-start",g.style.paddingBottom="10px",g.style.gap="12px"),requestAnimationFrame(()=>{const I=document.querySelector(".funnel-container");I&&(r.id==="natal_chart_offer"||r.id==="natal_chart_landoffer"||r.id==="natal_chart_sale"||r.id==="natal_chart_offer1uah"?I.scrollTop=150:I.scrollTop=r.id==="natal_chart2"?145:99)})}if(k&&r.ui.heroTitle&&(k.innerHTML=r.ui.heroTitle,r.id!=="february"&&r.id!=="man"&&r.id!=="man1uah"&&r.id!=="natal_chart"&&r.id!=="natal_chart_original"&&r.id!=="original"&&r.id!=="natal_chart2"&&r.id!=="natal-chart"&&r.id!=="forecast"&&(k.classList.remove("font-bold"),k.classList.add("font-semibold"),k.style.fontFamily="'Inter', sans-serif"),r.ui.heroPreTitle)){const g=document.createElement("p");g.className="text-base font-semibold mb-3",g.style.cssText="color: #cda45e; letter-spacing: 0.5px;",g.innerHTML=r.ui.heroPreTitle,k.parentNode&&k.parentNode.insertBefore(g,k)}if(u&&r.ui.heroSubtitle&&(u.innerHTML=r.ui.heroSubtitle),M&&r.ui.buttonText&&(M.innerText=r.ui.buttonText),V&&r.ui.buttonDisclaimer&&(V.innerText=r.ui.buttonDisclaimer,V.style.maxWidth="100%",V.style.margin="4px auto 0",V.style.whiteSpace="nowrap",V.style.fontSize="8.5px",V.style.letterSpacing="-0.2px",V.style.overflow="hidden",V.style.textOverflow="ellipsis"),r.ui.heroFeatures){const g=e.querySelector("#birth-form");if(g&&g.parentNode){const I=document.createElement("div");I.className="hero-features-wrapper",I.innerHTML=r.ui.heroFeatures,g.parentNode.insertBefore(I,g.nextSibling)}}r.tracking?.customPixelEvent&&window.DC_Analytics?.pushFilteredEvent&&window.DC_Analytics.pushFilteredEvent(r.tracking.customPixelEvent,{event_id:"vc_"+Date.now(),variant_id:r.id,page_path:window.location.pathname})}const f={default:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},man:{text:"жінок вже отримали інструкцію",base:12367,key:"man_women_counter"},man1uah:{text:"жінок вже отримали інструкцію",base:12367,key:"man_women_counter"},natal_chart:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_original:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},original:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart2:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_price:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_offer:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_landoffer:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_sale:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_chart_offer1uah:{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},forecast:{text:"жінок вже отримали свій прогноз на рік",base:8934,key:"forecast_counter"},"1uah":{text:"жінок вже отримали свою натальну карту",base:15420,key:"natal_chart_counter"},natal_child:{text:"жінок вже отримали натальну карту дитини",base:6712,key:"natal_child_counter"}},b=r?r.id:"default";if(f[b]){const k=f[b],u=e.querySelector("#birth-form");if(u){const M=document.createElement("div");M.className="mt-4 mb-2 text-center w-full flex justify-center",M.innerHTML=`
                    <div style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); max-width: 95vw;">
                        <span style="font-size: 14px; flex-shrink: 0;">🔥</span>
                        <span style="font-size: 13px; color: var(--secondary-text-color); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            <strong id="live-women-counter" style="color: var(--accent-color); font-size: 14px; transition: transform 0.2s ease, color 0.2s ease; display: inline-block;">${k.base.toLocaleString("uk-UA").replace(/\u00a0/g," ")}</strong> ${k.text}
                        </span>
                    </div>
        
        `;const V=e.querySelector(".hero-features-wrapper")||u;V.parentNode.insertBefore(M,V.nextSibling)}}const w=e.querySelector("#calculation-disclaimer");if((b==="natal_chart"||b==="natal_chart_original"||b==="original"||b==="natal_chart2"||b==="natal-chart"||b==="natal_chart_price"||b==="natal_chart_offer"||b==="natal_chart_landoffer"||b==="natal_chart_sale"||b==="natal_chart_offer1uah"||b==="default"||b==="1uah")&&w&&(w.style.display="none"),r&&r.isLandingPage&&r.landingSections){const k=e.querySelector("#landing-sections-container");if(k){k.style.display="block";const u=r.landingSections;let M="";r.id==="natal_chart_sale"?(u.paradigm&&(M+=`
                            <div class="landing-section">
                                <h3 class="landing-title">${u.paradigm.title}</h3>
                                <p class="landing-text-block">${u.paradigm.text}</p>
                            </div>
                        `),u.whatItShows&&(M+=`
                            <div class="landing-section">
                                <h3 class="landing-title">${u.whatItShows.title}</h3>
                                <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 24px;">
                                    ${u.whatItShows.items.map(g=>`
                                        <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px 16px; display: flex; gap: 16px; align-items: flex-start; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                                            <div style="font-size: 26px; line-height: 1; flex-shrink: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">${g.icon}</div>
                                            <div style="font-size: 15px; color: var(--secondary-text-color); line-height: 1.45; text-align: left;">
                                                <span class="text-white font-medium">${g.title}</span> — ${g.desc}
                                            </div>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        `),M+=`
        <div id="offer-block-science" class="offer-landing-block" >
            <div class="offer-section-card" style="background: rgba(205, 164, 94, 0.03); border: 1px solid rgba(205, 164, 94, 0.15);">
                <h3 class="offer-section-title">Чому Натальній карті <span>можна вірити</span></h3>
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
                                <span>Натальна карта — це не вирок, а інструкція. Знаючи свої «налаштування», ти бачиш, де варто «підкласти соломки», а де впевнено тиснути на газ.</span>
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
                    `,u.pain&&(M+=`
                            <div class="landing-section">
                                <h3 class="landing-title">${u.pain.title}</h3>
                                <div class="landing-pain-list">
                                    ${u.pain.items.map(g=>`<div class="landing-pain-item">${g}</div>`).join("")}
                                </div>
                            </div>
                        `),u.howItWorks&&(M+=`
                            <div class="landing-section" style="text-align: left;">
                                <h3 class="landing-title" style="text-align: center;">${u.howItWorks.title}</h3>
                                <div class="landing-how-it-works-card">
                                    <p class="landing-text-block" style="text-align: left;">${u.howItWorks.text}</p>
                                </div>
                            </div>
                        `),M+=`
        <div id="offer-block-transformation" class="offer-landing-block" >
            <div class="offer-section-card">
                <h3 class="offer-section-title">Структура твоєї <span>Натальної карти</span></h3>
                <div class="offer-section-body">
                    <p>Повна розшифровка Натальної Карти — це твоя <strong>інструкція до самої себе</strong>, яка покаже тобі:</p>
                    <div class="offer-feature-grid">
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">✨</span>
                            <div>
                                <strong>Свідоме і Підсвідоме: Твоє Ядро</strong>
                                <span>Твій справжній архетип та вирішення внутрішнього конфлікту, що саботує твої успіхи</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">❤️‍🔥</span>
                            <div>
                                <strong>Стосунки та Кохання</strong>
                                <span>Твій типаж ідеального партнера та як перестати притягувати «не тих» чоловіків</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">💰</span>
                            <div>
                                <strong>Гроші та Реалізація</strong>
                                <span>Де лежить твій фінансовий потенціал і як нарешті пробити "прозору стелю"</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">🗝️</span>
                            <div>
                                <strong>Призначення та Кармічні Уроки</strong>
                                <span>Твоя справжня місія у цьому житті, таланти та унікальний шлях твоєї душі</span>
                            </div>
                        </div>
                    </div>
                    <div class="offer-feature-item" style="margin-top: 14px; background: rgba(205, 164, 94, 0.06); border-color: rgba(205, 164, 94, 0.15);">
                        <span class="offer-feature-icon">⚡️</span>
                        <div>
                            <strong>Блок Майбутнього (Огляд на 6 місяців)</strong>
                            <span>Головні події, вікна можливостей та ключові астрологічні транзити, які чекають на тебе</span>
                        </div>
                    </div>
                    <div class="offer-feature-item" style="margin-top: 10px; background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08);">
                        <span class="offer-feature-icon">📡</span>
                        <div>
                            <strong>Точні Координати Планет та Вузлів</strong>
                            <span>Карта з градусами і секундами для кожної планети та кармічних вузлів.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `,M+=`
        <div id="offer-block-audience-s3" class="offer-landing-block" >
            <div class="offer-section-card">
                <h3 class="offer-section-title" id="s3-audience-title"></h3>
                <div class="offer-section-body">
                    <div class="landing-audience-grid">
                        <div class="landing-audience-card positive">
                            <h4 class="landing-audience-subtitle">✅ Для тих, хто:</h4>
                            <ul class="landing-audience-list" id="s3-audience-for-list"></ul>
                        </div>
                        <div class="landing-audience-card negative">
                            <h4 class="landing-audience-subtitle" id="s3-audience-not-subtitle">❌ Кому НЕ варто:</h4>
                            <ul class="landing-audience-list" id="s3-audience-not-list"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `,M+=`
        <div id="offer-block-transformation-s3" class="offer-landing-block" >
            <div class="offer-section-card">
                <h3 class="offer-section-title" id="s3-transformation-title"></h3>
                <div class="offer-section-body">
                    <div class="landing-transformation-box">
                        <div class="landing-transformation-item before">
                            <div class="landing-transformation-badge">Раніше:</div>
                            <p id="s3-transformation-before"></p>
                        </div>
                        <div class="landing-transformation-arrow">⬇️</div>
                        <div class="landing-transformation-item after">
                            <div class="landing-transformation-badge">З Натальною картою:</div>
                            <p id="s3-transformation-after"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `,u.features&&(M+=`
                            <div class="landing-section">
                                <h3 class="landing-title">${u.features.title}</h3>
                                <div class="landing-features-grid">
                                    ${u.features.items.map(g=>`
                                        <div class="landing-feature-card">
                                            <h4 class="landing-feature-title">${g.title}</h4>
                                            <p class="landing-feature-desc">${g.desc}</p>
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        `),M+=`
        <div id="offer-block-delivery" class="offer-landing-block" >
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
                                <strong>Персональне посилання</strong>
                                <span>Унікальний URL, за яким звіт доступний назавжди</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `,M+=`
        <div id="offer-preview-block" class="offer-mockup-section" >
            <h3 class="offer-section-title" id="mockup-title-heading" >Приклад <span>PDF-варіанту</span> твоєї Карти</h3>
            <div class="offer-mockup-image-wrapper" id="mockup-carousel-main-wrapper">
                <div id="mockup-carousel-scroll"></div>
            </div>
            <div id="destiny-dots-new" class="destiny-dots-container-new"></div>
            <p class="offer-mockup-caption" id="mockup-caption-text"></p>
        </div>
                    `,M+=`
        <div id="offer-block-reviews" class="offer-landing-block" >
            <div id="reviews-container" class="offer-section-card" style="padding: 24px 16px; border-top: none; background: transparent; border: none; box-shadow: none;">
                <h3 class="offer-section-title" style="margin-bottom: 24px;">Що кажуть ті, хто вже отримав повний <span>Розрахунок</span></h3>
                <div id="reviews-list" style="display: flex; flex-direction: column; gap: 14px;"></div>
            </div>
        </div>
                    `,M+=`
        <div id="offer-block-guarantee" class="offer-landing-block" >
            <div class="offer-guarantee-container">
                <div class="offer-guarantee-card">
                    <div class="offer-guarantee-badge">
                        <span class="guarantee-icon">🛡️</span>
                    </div>
                    <div class="offer-guarantee-content">
                        <h3 class="guarantee-title">100% Впевненість у якості</h3>
                        <p class="guarantee-text">Ми на 100% впевнені у глибині та точності нашої Розшифровки. Якщо протягом 24 годин ти вирішиш, що звіт тобі не підійшов — ми повернемо кошти без зайвих питань.</p>
                    </div>
                </div>
            </div>
        </div>
                    `,M+=`
        <div id="offer-block-faq" class="offer-landing-block" >
            <div class="offer-section-card" style="border-top: 1px solid rgba(255,255,255,0.1);">
                <h3 class="offer-section-title">Часті <span>запитання</span></h3>
                <div id="faq-list" class="offer-faq-list"></div>
            </div>
        </div>
                    `,M+=`
        <div id="premium-form-title-container" class="space-y-2 text-center" style="margin-top: 36px; scroll-margin-top: 10px;">
            <h2 class="text-2xl font-bold text-white tracking-tight">
                Отримай повну розшифровку своєї <span class="text-[#cda45e]">Натальної карти</span>
            </h2>
            <p class="text-sm" style="color: var(--secondary-text-color);">
                Введи час і місце народження - і отримай свій персональний звіт одразу після оплати
            </p>
        </div>

        <div id="premium-form-container" class="w-full space-y-5 mt-4" >

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

                <p id="time-error-message" class="error-text" >
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

                <p id="city-error-message" class="error-text" >Текст помилки...</p>
                <p id="city-info-message" class="info-text" ></p>
            </div>

            <!-- Validation Error Messages -->
            <div id="offer-validation-error" style="display: none;"
                class="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-red-500 text-sm text-center">
            </div>

            <div id="city-suggestions" class="suggestions-list" ></div>

            <!-- Skip Button -->
            <button type="button" id="skip-button" class="btn btn-skip opacity-80 text-xs mt-1 w-full" style="padding: 12px; height: auto;">
                Розрахунок без точного часу (точність 95%)
            </button>

            <!-- Urgency Timer -->
            <div id="offer-urgency-timer-bottom" style="text-align: center; margin-bottom: 12px; margin-top: 16px;">
                <span style="font-size: 11px; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; background: rgba(205,164,94,0.15); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(205,164,94,0.3); display: inline-block;">
                    Спеціальна ціна діє ще: <span id="offer-timer-display-bottom" style="color: var(--accent-color); font-weight: 700; margin-left: 2px;">15:00</span>
                </span>
            </div>

            <button id="bottom-pay-btn"
                class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden">
                <span class="btn-text flex items-center justify-center gap-2" id="bottom-pay-btn-text">
                    Отримати Розшифровку
                </span>
                <span class="btn-spinner"></span>
            </button>
            <!-- Trust text -->
            <div class="mt-2 flex items-center justify-center opacity-70">
                <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    🔒 Безпечна оплата через Monobank
                </span>
            </div>
        </div>
                    `):(u.paradigm&&(M+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${u.paradigm.title}</h3>
                            <p class="landing-text-block">${u.paradigm.text}</p>
                        </div>
                    `),u.whatItShows&&(M+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${u.whatItShows.title}</h3>
                            <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 24px;">
                                ${u.whatItShows.items.map(g=>`
                                    <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px 16px; display: flex; gap: 16px; align-items: flex-start; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                                        <div style="font-size: 26px; line-height: 1; flex-shrink: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">${g.icon}</div>
                                        <div style="font-size: 15px; color: var(--secondary-text-color); line-height: 1.45; text-align: left;">
                                            <span class="text-white font-medium">${g.title}</span> — ${g.desc}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `),u.pain&&(M+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${u.pain.title}</h3>
                            <div class="landing-pain-list">
                                ${u.pain.items.map(g=>`<div class="landing-pain-item">${g}</div>`).join("")}
                            </div>
                        </div>
                    `),u.howItWorks&&(M+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${u.howItWorks.title}</h3>
                            <div class="landing-how-it-works-card">
                                <p class="landing-text-block">${u.howItWorks.text}</p>
                            </div>
                        </div>
                    `),u.solution&&(M+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${u.solution.title}</h3>
                            <p class="landing-subtitle">${u.solution.subtitle}</p>
                            <div class="landing-solution-list">
                                ${u.solution.items.map(g=>`
                                    <div class="landing-solution-item">
                                        <div class="landing-solution-icon">${g.icon}</div>
                                        <div class="landing-solution-text">${g.text}</div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `),u.features&&(M+=`
                        <div class="landing-section">
                            <h3 class="landing-title">${u.features.title}</h3>
                            <div class="landing-features-grid">
                                ${u.features.items.map(g=>`
                                    <div class="landing-feature-card">
                                        <h4 class="landing-feature-title">${g.title}</h4>
                                        <p class="landing-feature-desc">${g.desc}</p>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `),M+=`
                    <div class="landing-section">
                        <h3 class="landing-title">Що ти отримаєш <span>безкоштовно</span></h3>
                        <div class="landing-preview-list">
                            <div class="landing-preview-item">
                                <div class="landing-preview-icon">✨</div>
                                <div class="landing-preview-content">
                                    <div class="landing-preview-title">Твій Зірковий Архетип</div>
                                    <div class="landing-preview-desc">Хто ти за своєю космічною природою</div>
                                </div>
                            </div>
                            <div class="landing-preview-item">
                                <div class="landing-preview-icon">⚡</div>
                                <div class="landing-preview-content">
                                    <div class="landing-preview-title">Прихований Внутрішній Конфлікт</div>
                                    <div class="landing-preview-desc">Що тебе стримує зсередини</div>
                                </div>
                            </div>
                            <div class="landing-preview-item">
                                <div class="landing-preview-icon">🗝️</div>
                                <div class="landing-preview-content">
                                    <div class="landing-preview-title">Твій Ключ до Змін</div>
                                    <div class="landing-preview-desc">Перший крок до трансформації</div>
                                </div>
                            </div>
                        </div>
                        <div class="landing-preview-timer">
                            <span>⏱️</span> Розрахунок займе менше хвилини
                        </div>
                    </div>
                `,u.welcomeTestimonials&&u.welcomeTestimonials.length>0&&(M+=`
                        <div class="landing-section">
                            <h3 class="landing-title">Що кажуть ті, хто вже <span>спробував</span></h3>
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                ${u.welcomeTestimonials.map(g=>`
                                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px;">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <img src="${g.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(205, 164, 94, 0.3);">
                                            <div>
                                                <div style="color: #fff; font-weight: 600; font-size: 0.95em;">${g.name}</div>
                                                <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                                            </div>
                                        </div>
                                        <p style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">
                                            "${g.text}"
                                        </p>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `));let Y="",V="";if(r.id==="natal_chart_sale")V=`
                        <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 440px;">
                                <button id="sticky-action-btn" class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden" onclick="
                                    const topInput = document.getElementById('birth-date');
                                    const fc = document.querySelector('.funnel-container');
                                    const mode = this.getAttribute('data-mode');
                                    
                                    if (mode === 'pay') {
                                        const payBtn = document.getElementById('bottom-pay-btn');
                                        if (payBtn) payBtn.click();
                                        return;
                                    }

                                    if (!topInput || !topInput.value) {
                                        if (fc) fc.scrollTo({top: 150, behavior: 'smooth'});
                                        const err = document.getElementById('error-message');
                                        if(err) {
                                            err.innerText = 'Спочатку обери дату народження';
                                            err.style.display = 'block';
                                        }
                                        if(window.haptics) window.haptics.trigger('error');
                                    } else {
                                        // Analytics Parity: Fire Lead when transitioning to Step 2
                                        if (!window._dcLeadFired && window.DC_Analytics?.pushFilteredEvent) {
                                            window._dcLeadFired = true;
                                            window.DC_Analytics.pushFilteredEvent('lead_confirmed', {
                                                event_id: 'ld_' + Date.now(),
                                                email: state.get('email') || ''
                                            });
                                        }
                                        const title = document.getElementById('premium-form-title-container');
                                        if (title) title.scrollIntoView({behavior: 'smooth', block: 'start'});
                                    }
                                ">
                                    <span class="btn-text" id="sticky-btn-content">
                                        <span class="flex flex-col items-center gap-0 w-full">
                                            <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Почати розрахунок Натальної карти</span>
                                            <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Персональна розшифровка • 100% гарантія</span>
                                        </span>
                                    </span>
                                </button>
                                <div id="sticky-trust-badge" style="text-align: center; margin-top: 6px; display: none;">
                                    <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px; color: rgba(255, 255, 255, 0.5); font-weight: 600;">🔒 Безпечна оплата через Monobank</span>
                                </div>
                            </div>
                        </div>
                    `;else{const g=e.querySelector("#birth-form").outerHTML.replace('id="birth-form"','id="birth-form-bottom"').replace('id="birth-date"','id="birth-date-bottom"').replace('id="submit-btn"','id="submit-btn-bottom"').replace('id="error-message"','id="error-message-bottom"').replace('id="date-placeholder"','id="date-placeholder-bottom"');V=`
                        <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                            <button id="sticky-action-btn" class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden" onclick="document.querySelector('.funnel-container').scrollTo({top: 150, behavior: 'smooth'})">
                                <span class="btn-text" id="sticky-btn-content">${r?.ui?.buttonText?.toUpperCase()||"ОТРИМАТИ НАТАЛЬНУ КАРТУ"}</span>
                            </button>
                        </div>
                    `,Y=`
                        <div class="landing-bottom-form-wrapper" id="bottom-form-wrapper" style="scroll-margin-top: 20px;">
                            <h3 class="landing-title text-center text-xl mb-4 !mt-0">${r?.ui?.bottomFormTitle||"Готова змінити життя?"}</h3>
                            ${g}
                        </div>
                    `}k.innerHTML=M+Y+V}}}catch(f){console.error("❌ Error preparing variant UI:",f)}if(t.innerHTML=e.innerHTML,r&&r.isLandingPage){const f=document.getElementById("birth-form");if(f){f.style.position="relative";const b=document.createElement("div");b.innerHTML=`
                <style>
                    @keyframes subtle-arrows {
                        0%, 100% { transform: translateY(0); opacity: 0.2; }
                        50% { transform: translateY(4px); opacity: 0.9; }
                    }
                    .site-chevron {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        pointer-events: none;
                        color: var(--accent-color);
                        top: 78px; /* Aligned with the submit button (down from top of form) */
                    }
                    .site-chevron.left { left: -14px; }
                    .site-chevron.right { right: -14px; }
                    @media (min-width: 400px) {
                        .site-chevron.left { left: -20px; }
                        .site-chevron.right { right: -20px; }
                    }
                    .site-chevron svg { width: 12px; height: 12px; opacity: 0.6; }
                    .site-chevron svg:nth-child(1) { animation: subtle-arrows 1.5s infinite 0s; }
                    .site-chevron svg:nth-child(2) { animation: subtle-arrows 1.5s infinite 0.2s; margin-top: -6px; }
                    .site-chevron svg:nth-child(3) { animation: subtle-arrows 1.5s infinite 0.4s; margin-top: -6px; }
                </style>
                <div class="site-chevron left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="site-chevron right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            `,f.appendChild(b)}}r&&(r.id==="man"||r.id==="man1uah"||r.id==="forecast")&&setTimeout(()=>{const f=document.querySelector("#landing-step h2"),b=document.querySelector(".funnel-container");if(f&&b){const w=f.offsetTop;b.scrollTo({top:w- -25,behavior:"auto"})}},100);try{const f={default:{key:"natal_chart_counter",base:15420},man:{key:"man_women_counter",base:12367},man1uah:{key:"man_women_counter",base:12367},natal_chart:{key:"natal_chart_counter",base:15420},natal_chart_original:{key:"natal_chart_counter",base:15420},original:{key:"natal_chart_counter",base:15420},natal_chart2:{key:"natal_chart_counter",base:15420},natal_chart_price:{key:"natal_chart_counter",base:15420},natal_chart_offer:{key:"natal_chart_counter",base:15420},natal_chart_offer1uah:{key:"natal_chart_counter",base:15420},forecast:{key:"forecast_counter",base:8934},"1uah":{key:"natal_chart_counter",base:15420},natal_child:{key:"natal_child_counter",base:6712}},b=r?r.id:"default";if(f[b]){const w=f[b],k=document.getElementById("live-women-counter");if(k){let u=parseInt(localStorage.getItem(w.key))||w.base;const M=(V,g)=>{k.innerText=V.toLocaleString("uk-UA").replace(/\u00a0/g," "),g&&(k.style.transform="scale(1.2)",k.style.color="#fff",setTimeout(()=>{k.style.transform="scale(1)",k.style.color="var(--accent-color)"},250))};M(u,!1);const Y=()=>{const V=Math.random()*4e3+4e3;setTimeout(()=>{u+=Math.floor(Math.random()*3)+1,localStorage.setItem(w.key,u),M(u,!0),Y()},V)};Y()}}r&&r.ui}catch(f){console.error("❌ Error attaching post-render variant logic:",f)}if(!document.getElementById("global-anim-styles")){const f=document.createElement("style");f.id="global-anim-styles",f.innerHTML=`
            @keyframes gentle-shake {
                0%, 100% { transform: translateX(0); box-shadow: 0 0 0 0 rgba(205, 164, 94, 0); }
                25% { transform: translateX(-5px) rotate(-1deg); }
                75% { transform: translateX(5px) rotate(1deg); box-shadow: 0 0 20px 0 rgba(205, 164, 94, 0.5); }
            }

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
            
            @keyframes bounce-subtle {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(5px); }
                60% { transform: translateY(3px); }
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

            
`,document.head.appendChild(f),document.head.appendChild(f)}const s=document.getElementById("info-modal"),o=document.getElementById("legal-modal"),l=document.getElementById("open-info-modal-btn"),d=document.getElementById("close-info-modal-icon"),p=document.getElementById("close-info-modal-btn"),h=document.getElementById("close-legal-modal-icon"),_=document.getElementById("close-legal-modal-btn"),T=document.getElementById("legal-modal-body"),x=document.querySelectorAll(".legal-link[data-legal-type]");function O(){s&&(s.style.display="flex")}function D(){s&&(s.style.display="none")}function S(f){const b=document.getElementById("legal-content-"+f);b&&o&&T&&(T.innerHTML=b.innerHTML,o.style.display="flex")}function A(){o&&(o.style.display="none")}l&&l.addEventListener("click",()=>{Rt.trigger("light"),O()}),d&&d.addEventListener("click",()=>{Rt.trigger("light"),D()}),p&&p.addEventListener("click",()=>{Rt.trigger("light"),D()}),h&&h.addEventListener("click",()=>{Rt.trigger("light"),A()}),_&&_.addEventListener("click",()=>{Rt.trigger("light"),A()}),s&&s.addEventListener("click",f=>{f.target===s&&D()}),o&&o.addEventListener("click",f=>{f.target===o&&A()}),x.forEach(f=>{f.addEventListener("click",b=>{const w=b.target.getAttribute("data-legal-type");D(),setTimeout(()=>{S(w)},50)})});function z(f,b,w,k){const u=document.getElementById(f),M=document.getElementById(b),Y=document.getElementById(w),V=document.getElementById(k);if(!u||!M)return;const g=u.querySelector('button[type="submit"]');M.addEventListener("blur",$=>{$.target.value&&g&&(g.style.animation="none",requestAnimationFrame(()=>{g.style.animation="gentle-shake 0.5s ease-in-out 2"}),setTimeout(()=>{g.style.animation=""},1e3))});function I(){const $=M.value;if(!$)V&&(V.innerText="Обрати дату народження",V.style.color="var(--secondary-text-color)");else{const U=$.split("-");if(U.length===3){const L=`${U[2]}.${U[1]}.${U[0]}`;V&&(V.innerText=L,V.style.color="var(--primary-text-color)"),Y&&(Y.style.display="none");const B=b==="birth-date"?"birth-date-bottom":"birth-date",H=document.getElementById(B);H&&H.value!==$&&(H.value=$,H.dispatchEvent(new Event("change",{bubbles:!0})))}}}M.addEventListener("input",I),M.addEventListener("change",I),M.addEventListener("blur",I),I(),u.addEventListener("submit",async function($){$.preventDefault(),Rt.trigger("heavy");const U=M.value;if(U==="")Rt.trigger("error"),Y&&(Y.innerText="Будь ласка, обери дату народження.",Y.style.display="block");else{let L=function(B,H){B&&(H?(B.classList.add("loading"),B.disabled=!0):(B.classList.remove("loading"),B.disabled=!1))};if(Y&&(Y.style.display="none"),E.set("date",U),L(g,!0),Wi(),r.id==="natal_chart_sale"){L(g,!1),!window._dcLeadFired&&window.DC_Analytics?.pushFilteredEvent&&(window._dcLeadFired=!0,window.DC_Analytics.pushFilteredEvent("lead_confirmed",{event_id:"ld_"+Date.now(),email:E.get("email")||""}));const B=document.getElementById("premium-form-title-container");B&&B.scrollIntoView({behavior:"smooth",block:"start"})}else n.navigateTo("loading")}})}document.querySelectorAll(".landing-faq-question").forEach(f=>{f.addEventListener("click",()=>{const b=f.closest(".landing-faq-item");b&&b.classList.toggle("active")})});const R=document.getElementById("mockup-carousel-scroll"),K=document.getElementById("destiny-dots-new");if(R&&K){const f=K.querySelectorAll(".destiny-dot");R.addEventListener("scroll",()=>{const b=Math.round(R.scrollLeft/R.clientWidth);f.forEach((w,k)=>w.classList.toggle("active",k===b))},{passive:!0})}if(z("birth-form","birth-date","error-message","date-placeholder"),r.id!=="natal_chart_sale"&&z("birth-form-bottom","birth-date-bottom","error-message-bottom","date-placeholder-bottom"),r.id==="natal_chart_sale"){const f=r.marketing?.mockup||r.landingSections?.mockup;if(f&&f.images?.length>0){const Z=document.getElementById("mockup-carousel-scroll"),rt=document.getElementById("destiny-dots-new"),st=document.getElementById("mockup-caption-text");Z&&(Z.innerHTML=f.images.map(ht=>`
                    <div class="carousel-slide">
                        <img src="${ht}" class="offer-mockup-image" alt="PDF Preview">
                    </div>
                `).join("")),rt&&(rt.innerHTML=f.images.map((ht,vt)=>`<div class="destiny-dot ${vt===0?"active":""}"></div>`).join(""),setTimeout(()=>{const ht=rt.querySelectorAll(".destiny-dot");Z&&ht.length>0&&Z.addEventListener("scroll",()=>{const vt=Math.round(Z.scrollLeft/Z.clientWidth);ht.forEach((wt,te)=>wt.classList.toggle("active",te===vt))},{passive:!0})},100)),st&&f.caption&&(st.innerText=f.caption)}const b=document.getElementById("reviews-list"),w=r.landingSections?.testimonials||[];b&&w.length>0&&(b.innerHTML=w.map(Z=>`
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px; text-align: left;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <img src="${Z.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(205, 164, 94, 0.3);">
                        <div>
                            <div style="color: #fff; font-weight: 600; font-size: 0.95em;">${Z.name}</div>
                            <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                        </div>
                    </div>
                    <p style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">
                        "${Z.text}"
                    </p>
                </div>
            `).join(""));const k=document.getElementById("offer-timer-display-bottom");if(k){let Z=900;const rt=setInterval(()=>{if(Z--,Z<=0)clearInterval(rt),k.innerText="00:00";else{const st=Math.floor(Z/60),ht=Z%60;k.innerText=st+":"+(ht<10?"0":"")+ht}},1e3)}const u=document.getElementById("faq-list"),M=r.landingSections?.faq||[];u&&M.length>0&&(u.innerHTML=M.map(Z=>`
                <div class="offer-faq-item">
                    <div class="offer-faq-question" onclick="this.parentElement.classList.toggle('faq-open')">
                        <span>${Z.q}</span>
                        <span class="offer-faq-arrow">▼</span>
                    </div>
                    <div class="offer-faq-answer">
                        <p>${Z.a}</p>
                    </div>
                </div>
            `).join(""));const Y=r.pricing?.display?.FULL_REPORT||347,V=r.pricing?.display?.FULL_REPORT_OLD||1499,g=document.getElementById("bottom-pay-btn-text");g&&(g.innerHTML=`
                <span class="flex flex-col items-center gap-0 w-full">
                    <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${Y} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">${V} грн</span></span>
                    <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Одноразовий платіж • Довічний доступ</span>
                </span>
            `);const I=r.landingSections?.audience;if(I){const Z=document.getElementById("s3-audience-title"),rt=document.getElementById("s3-audience-for-list"),st=document.getElementById("s3-audience-not-list"),ht=document.getElementById("s3-audience-not-subtitle");Z&&(Z.innerHTML=I.title||""),ht&&I.negativeSubtitle&&(ht.textContent=I.negativeSubtitle),rt&&I.for_who&&(rt.innerHTML=I.for_who.map(vt=>`<li>${vt}</li>`).join("")),st&&I.not_for_who&&(st.innerHTML=I.not_for_who.map(vt=>`<li>${vt}</li>`).join(""))}const $=r.landingSections?.transformation;if($){const Z=document.getElementById("s3-transformation-title"),rt=document.getElementById("s3-transformation-before"),st=document.getElementById("s3-transformation-after");Z&&(Z.innerHTML=$.title||""),rt&&(rt.textContent=$.before||""),st&&(st.textContent=$.after||"")}const U=document.getElementById("birth-time"),L=document.getElementById("birth-city"),B=document.getElementById("bottom-pay-btn"),H=document.getElementById("skip-button"),q=document.getElementById("time-placeholder"),Q=document.getElementById("city-error-message"),J=document.getElementById("city-info-message");H&&(H.style.display="inline-block",H.style.border="1px solid rgba(255, 255, 255, 0.3)",H.style.borderRadius="30px",H.style.padding="8px 16px",H.style.marginTop="12px",H.style.fontSize="12px",H.style.opacity="0.9",H.style.backgroundColor="rgba(255, 255, 255, 0.05)",H.style.cursor="pointer"),U&&U.addEventListener("change",Z=>{E.set("timeKnown",!0),q&&(q.textContent=Z.target.value,q.style.color="#ffffff",q.style.fontSize=""),U.parentElement&&(U.parentElement.style.opacity="1"),document.getElementById("time-error-message").style.display="none",U&&U.parentElement.classList.remove("input-error")});async function et(Z=!1){const rt=document.querySelector(".funnel-container"),st=document.getElementById("time-error-message"),ht=document.getElementById("city-error-message"),vt=document.getElementById("birth-date"),wt=Z?H:B;if(!wt)return;if(!vt||!vt.value){const it=document.getElementById("error-message");it&&(it.innerText="Спочатку обери дату народження",it.style.display="block"),document.activeElement&&document.activeElement.blur(),rt&&setTimeout(()=>{rt.scrollTo({top:150,behavior:"smooth"})},50),typeof Rt<"u"&&Rt.trigger("error");return}else E.set("date",vt.value);Z&&(E.set("timeKnown",!1),E.set("time","12:00"),U&&(U.value="12:00",q&&(q.textContent="Розрахунок без точного часу (точність 95%)",q.style.color="#aaaaaa",q.style.fontSize="11px"),U.parentElement.style.opacity="0.8",U.parentElement.classList.remove("input-error"),st&&(st.style.display="none")));let te=!1;Z||(!U||!U.value?(st&&(st.style.display="block"),U&&U.parentElement.classList.add("input-error"),te=!0):(E.set("time",U.value),E.set("timeKnown",!0)));const Mt=L?L.value.trim():"";if((!Mt||Mt.length<2)&&(ht&&(ht.textContent="Будь ласка, введи місце народження.",ht.style.display="block"),L&&L.classList.add("input-error"),te=!0),te){typeof Rt<"u"&&Rt.trigger("error");return}wt.disabled=!0;const qt=wt.querySelector(".btn-text");let Yt="";const gt=r&&r.id==="natal_chart_sale";gt&&qt?(Yt=qt.innerHTML,qt.innerHTML=`
                    <span style="display: flex; align-items: center; gap: 8px; font-size: 1.125rem;">
                        З'єднуюсь з банком...
                        <div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                    </span>
                `):wt.classList.add("loading");try{const[it,ot]=await Promise.all([Tr(()=>Promise.resolve().then(()=>gf),void 0),r&&r.id==="natal_chart_sale"?Tr(()=>Promise.resolve().then(()=>ga),void 0):Promise.resolve(null)]),{getCoordinates:ft}=it,dt=await ft(Mt);let yt=null;if(dt&&(dt.latitude||dt.lat)){const Kt=dt.corrected_name||Mt;E.set("city",Kt),E.set("birth_lat",dt.latitude||dt.lat),E.set("birth_lon",dt.longitude||dt.lon),L&&(L.value=Kt,Mt.toLowerCase()!==Kt.toLowerCase()&&(yt=`Ми уточнили: ${Kt} 😉`));const Et=document.getElementById("city-info-message");yt&&Et&&(Et.innerText=yt,Et.style.display="block"),U&&U.value&&!Z&&E.set("time",U.value);const We={latitude:dt.latitude||dt.lat,longitude:dt.longitude||dt.lon,timezone:dt.timezone||null};E.set("geo",We);const mn={date:E.get("date"),time:E.get("time")||"12:00",city:E.get("city"),geo:We};E.set("userData",mn),setTimeout(async()=>{if(r&&["natal_chart_sale"].includes(r.id)){try{const{processPayment:Se}=ot,rr=r.productName||"Natal Chart Full Report";let ir="source=landing_direct";ir+=`&variant=${r.id}`;try{localStorage.setItem("pendingVariantId",r.id)}catch{}window.DC_Analytics?.trackBeginCheckout&&window.DC_Analytics.trackBeginCheckout(r.pricing?.charge?.FULL_REPORT||347,rr),await Se({name:rr,price:r.pricing?.charge?.FULL_REPORT||347},{email:E.get("email")||""},mn,{returnQueryParams:ir,variant:r.id})}catch(Se){console.error("Direct payment error:",Se),gt&&qt&&Yt&&(qt.innerHTML=Yt),wt.classList.remove("loading"),wt.disabled=!1}return}n.navigateTo("paywall")},yt&&r?.id!=="natal_chart_sale"?1200:0)}else dt&&dt.error==="ambiguous"?(ht&&(ht.innerText=`Місто "${Mt}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну (наприклад: ${Mt}, Україна).`,ht.style.display="block"),L&&L.classList.add("input-error"),gt&&qt&&Yt&&(qt.innerHTML=Yt),wt.classList.remove("loading"),wt.disabled=!1):(ht&&(ht.innerText=`Не можемо знайти місто "${Mt}". Перевірте назву.`,ht.style.display="block"),L&&L.classList.add("input-error"),gt&&qt&&Yt&&(qt.innerHTML=Yt),wt.classList.remove("loading"),wt.disabled=!1)}catch(it){if(console.error("Conversion Error:",it),r&&["natal_chart_sale"].includes(r.id)){const ot=wt.querySelector(".btn-text");let ft="";ot&&(ft=ot.innerHTML,ot.innerHTML=`<span class="text-lg">З'єднуюсь з банком...</span>`);try{const{processPayment:dt}=await Tr(async()=>{const{processPayment:yt}=await Promise.resolve().then(()=>ga);return{processPayment:yt}},void 0);await dt({name:r.productName||"Natal Chart Full Report",price:r.pricing?.charge?.FULL_REPORT||347},{email:E.get("email")||""},{date:E.get("date"),time:E.get("timeKnown")?E.get("time"):"12:00",city:Mt},{returnQueryParams:`source=landing_direct&variant=${r.id}`,variant:r.id})}catch(dt){console.error("Fallback Direct payment error:",dt),ot&&ft&&(ot.innerHTML=ft),wt.classList.remove("loading"),wt.disabled=!1}return}n.navigateTo("paywall")}}H&&H.addEventListener("click",Z=>{Z.preventDefault(),et(!0)}),L&&L.addEventListener("input",()=>{Q&&(Q.style.display="none"),J&&(J.style.display="none"),L.classList.remove("input-error")}),B&&B.addEventListener("click",Z=>{Z.preventDefault(),et(!1)})}const F=document.getElementById("landing-sticky-cta"),G=document.getElementById("sticky-action-btn"),v=document.getElementById("sticky-btn-content"),y=document.getElementById("sticky-trust-badge");if(F&&G){const f=document.querySelector(".funnel-container");f.addEventListener("scroll",()=>{if(f.scrollTop>500){const w=document.getElementById("bottom-pay-btn");if(w){const k=w.getBoundingClientRect();k.top<window.innerHeight&&k.bottom>0?F.classList.remove("visible"):F.classList.add("visible")}else{const k=document.getElementById("bottom-form-wrapper");k&&k.getBoundingClientRect().top<window.innerHeight-100?F.classList.remove("visible"):F.classList.add("visible")}if(r&&r.id==="natal_chart_sale"){const k=document.getElementById("premium-form-title-container");k&&(k.getBoundingClientRect().top<window.innerHeight?G.getAttribute("data-mode")!=="pay"&&(G.setAttribute("data-mode","pay"),y&&(y.style.display="block"),v&&(v.innerHTML=`
                                        <span class="flex flex-col items-center gap-0 w-full animate-fade-in">
                                            <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${r.pricing?.display?.FULL_REPORT||347} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">${r.pricing?.display?.FULL_REPORT_OLD||1499} грн</span></span>
                                            <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">одноразовий платіж • довічний доступ</span>
                                        </span>
                                    `)):G.getAttribute("data-mode")==="pay"&&(G.setAttribute("data-mode","calculate"),y&&(y.style.display="none"),v&&(v.innerHTML=`
                                        <span class="flex flex-col items-center gap-0 w-full animate-fade-in">
                                            <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Почати розрахунок Натальної карти</span>
                                            <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Персональна розшифровка • 100% гарантія</span>
                                        </span>
                                    `)))}}else F.classList.remove("visible")})}}const xc=`<!-- 🔥 UPDATE: Equal Spacing Layout with space-evenly -->
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

</section>`;function Ea(n,t,e,r=50,s=0,o=!1){return new Promise(l=>{let d=0;t&&(t.style.display="inline-block"),n.innerHTML="";function p(){d<e.length?(n.innerHTML=e.substring(0,d+1),d++,setTimeout(p,r)):setTimeout(()=>{!o&&t&&(t.style.display="none"),l()},s)}p()})}const gr=[{id:"capricorn",name:"Козеріг",startMonth:12,startDay:22,endMonth:1,endDay:19},{id:"aquarius",name:"Водолій",startMonth:1,startDay:20,endMonth:2,endDay:18},{id:"pisces",name:"Риби",startMonth:2,startDay:19,endMonth:3,endDay:20},{id:"aries",name:"Овен",startMonth:3,startDay:21,endMonth:4,endDay:19},{id:"taurus",name:"Телець",startMonth:4,startDay:20,endMonth:5,endDay:20},{id:"gemini",name:"Близнюки",startMonth:5,startDay:21,endMonth:6,endDay:20},{id:"cancer",name:"Рак",startMonth:6,startDay:21,endMonth:7,endDay:22},{id:"leo",name:"Лев",startMonth:7,startDay:23,endMonth:8,endDay:22},{id:"virgo",name:"Діва",startMonth:8,startDay:23,endMonth:9,endDay:22},{id:"libra",name:"Терези",startMonth:9,startDay:23,endMonth:10,endDay:22},{id:"scorpio",name:"Скорпіон",startMonth:10,startDay:23,endMonth:11,endDay:21},{id:"sagittarius",name:"Стрілець",startMonth:11,startDay:22,endMonth:12,endDay:21}];function Ta(n){if(!n)return gr[0];const t=n.split("-"),e=parseInt(t[1],10),r=parseInt(t[2],10),s=gr[0];if(e===12&&r>=22||e===1&&r<=19)return s;for(const o of gr)if(o.id!=="capricorn"&&(e===o.startMonth&&r>=o.startDay||e===o.endMonth&&r<=o.endDay))return o;return console.warn(`[Zodiac] Could not determine sign for ${n}, defaulting to Aries`),gr[3]}const _c=Object.freeze(Object.defineProperty({__proto__:null,getZodiacSign:Ta},Symbol.toStringTag,{value:"Module"})),Ia={aquarius:{name:"Водолій",symbol:"♒",stars:[[160,63.7,3],[156,62.1,3],[124.7,51.1,3],[97.2,34.2,3],[84.4,37.6,1],[78.7,33.2,1],[73.4,33.5,1],[59.5,57.5,1],[39.2,62.7,1],[46,101.3,1],[96.7,77.8,1],[88.3,58.2,1],[81.5,28.7,1],[35.1,97.8,1],[20,90.5,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[2,10],[3,11],[5,12],[13,8],[8,14]]},aries:{name:"Овен",symbol:"♈",stars:[[20,25.5,3],[126.2,63.2,3],[157.2,89.5,3],[160,104.5,3]],lines:[[0,1],[1,2],[2,3]]},cancer:{name:"Рак",symbol:"♋",stars:[[65.9,97.7,3],[81.7,68.8,3],[83.4,53.5,3],[79.5,20,3],[114.1,110,1]],lines:[[0,1],[1,2],[2,3],[1,4]]},capricorn:{name:"Козеріг",symbol:"♑",stars:[[159.8,20,3],[154.5,34.2,3],[142.3,53.1,3],[115.4,99.7,3],[106.4,110,1],[52,81.8,1],[20.2,42.6,1],[31.1,45.9,1],[58.9,47,1],[84.4,49.5,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0]]},gemini:{name:"Близнюки",symbol:"♊",stars:[[143.6,64.5,3],[134,64.4,3],[109.1,52,3],[76.9,27.8,3],[49.1,20,1],[36.4,38.3,1],[47.6,43.7,1],[66.3,66.9,1],[85.2,73.6,1],[116.5,93.4,1],[107.5,110,1],[68.7,92.7,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[7,11]]},leo:{name:"Лев",symbol:"♌",stars:[[134.4,96.9,3],[135.6,75.1,3],[121.2,61.1,3],[59.7,58,3],[20,85.1,1],[59.6,81.2,1],[125,44.9,1],[152.1,33.1,1],[160,43.2,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[2,6],[6,7],[7,8]]},libra:{name:"Терези",symbol:"♎",stars:[[101.8,90.2,3],[116.4,49.4,3],[87.5,20,3],[67.1,43.9,3],[65.4,102.8,1],[63.6,110,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[1,3]]},pisces:{name:"Риби",symbol:"♓",stars:[[58.2,37.2,3],[59.8,20,3],[53.7,28.8,3],[60,48.3,3],[44.3,66,1],[33.5,85.3,1],[20.5,105.3,1],[27.1,104,1],[36.6,96.8,1],[45.3,94.7,1],[58.2,90.3,1],[66.6,89.3,1],[77.7,90.2,1],[116.3,92.5,1],[131.4,96.4,1],[140.7,94,1],[146.7,97.1,1],[149.1,103.7,1],[141.5,110,1],[129.7,108.4,1],[126.3,103,1],[159.5,102,1]],lines:[[0,1],[1,2],[2,0],[0,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,14],[17,21]]},sagittarius:{name:"Стрілець",symbol:"♐",stars:[[125.6,85.7,3],[120.5,78.2,3],[123,63.8,3],[117.5,49.9,3],[128.7,36.1,1],[74.3,110,1],[73.3,97.9,1],[90.1,64,1],[103.5,54.8,1],[48.6,101.8,1],[45,81,1],[48.1,52.7,1],[63.2,48.2,1],[72.2,47,1],[79.9,49.4,1],[95.9,52.7,1],[135,65.7,1],[86.7,57,1],[88.5,38.3,1],[84.5,36,1],[78.3,29.5,1],[75.1,26,1],[75,20,1],[94,36.3,1],[96.8,41.4,1]],lines:[[0,1],[1,2],[2,3],[3,4],[5,6],[6,7],[7,8],[8,3],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,8],[8,2],[2,16],[16,1],[1,7],[7,17],[17,15],[15,18],[18,19],[19,20],[20,21],[21,22],[18,23],[23,24],[24,15]]},scorpio:{name:"Скорпіон",symbol:"♏",stars:[[142.2,44.2,3],[140.8,30.8,3],[135.9,20,3],[120.8,42.2,3],[112.9,45.4,1],[106.6,52.3,1],[92.9,75.6,1],[91.3,90.1,1],[88.7,106.6,1],[71.8,110,1],[47.7,109.1,1],[37.8,98,1],[42.7,93.8,1],[51.2,86.4,1]],lines:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13]]},taurus:{name:"Телець",symbol:"♉",stars:[[37,43.8,3],[86.3,58.6,3],[92,60.6,3],[99.1,61.4,3],[96.6,55.3,1],[92.1,50.1,1],[46.1,20,1],[114.4,71.4,1],[141.1,80.2,1],[112.4,92.2,1],[143,82.5,1],[133.4,110,1]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[3,7],[7,8],[8,9],[8,10],[10,11]]},virgo:{name:"Діва",symbol:"♍",stars:[[125,30,3],[105,45,2],[90,55,3],[60,45,3],[80,75,3],[70,95,2],[40,110,3],[100,105,2]],lines:[[0,1],[1,2],[2,3],[2,4],[4,5],[5,6],[5,7]]}};function wc(n){const t=Ia[n];if(!t)return console.warn(`[Constellation] Unknown sign: ${n}`),"";const{stars:e,lines:r}=t,s=r.map(([d,p],h)=>{const[_,T]=e[d],[x,O]=e[p];return`<line 
            x1="${_}" y1="${T}" 
            x2="${x}" y2="${O}" 
            class="constellation-line" 
            style="animation-delay: ${h*.3}s"
        />`}).join(`
`),o=r.map(([d,p],h)=>{const[_,T]=e[d],[x,O]=e[p];return`<line 
            x1="${_}" y1="${T}" 
            x2="${x}" y2="${O}" 
            class="constellation-line-shimmer" 
            pathLength="100"
            style="animation-delay: ${3.5+h*.2}s"
        />`}).join(`
`),l=e.map(([d,p,h],_)=>{const T=h*1.2+1;return`<polygon 
            points="${`${d},${p-T} ${d+T},${p} ${d},${p+T} ${d-T},${p}`}" 
            class="constellation-star star-size-${h}" 
            style="animation-delay: ${_*.15}s"
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
                ${s}
                ${l}
            </g>
            <!-- 🔥 NEW: Шар бліку поверх основних ліній -->
            <g class="shimmer-layer" pointer-events="none">
                ${o}
            </g>
        </svg>
    `}const yr=[{id:"aries",symbol:"♈",angle:0,paths:["M7,2 C4.239,2 2,4.239 2,7 L4,7 C4,5.343 5.343,4 7,4 C8.657,4 10,5.343 10,7 L12,7 C12,4.239 9.761,2 7,2","M17,2 C14.239,2 12,4.239 12,7 L14,7 C14,5.343 15.343,4 17,4 C18.657,4 20,5.343 20,7 L22,7 C22,4.239 19.761,2 17,2","M13 22 11 22 10 9 14 9z"]},{id:"taurus",symbol:"♉",angle:30,paths:["M12,20 C9.791,20 8,18.209 8,16 C8,13.791 9.791,12 12,12 C14.209,12 16,13.791 16,16 C16,18.209 14.209,20 12,20 M12,10 C8.686,10 6,12.686 6,16 C6,19.314 8.686,22 12,22 C15.314,22 18,19.314 18,16 C18,12.686 15.314,10 12,10","M20,3 C20,7.418 16.418,11 12,11 C7.582,11 4,7.418 4,3 L2,3 C2,7.734 5.293,11.69 9.711,12.726 C10.36,12.272 11.147,12 12,12 C12.853,12 13.64,12.272 14.289,12.726 C18.707,11.69 22,7.734 22,3 L20,3 Z"]},{id:"gemini",symbol:"♊",angle:60,paths:["M8.9864,5.5221 C8.2824,5.2991 7.6134,5.0021 6.9864,4.6361 L6.9864,19.3641 C7.6134,18.9981 8.2824,18.7011 8.9864,18.4781 L8.9864,5.5221 Z","M14.9864,18.4779 C15.6904,18.7009 16.3594,18.9979 16.9864,19.3639 L16.9864,4.6359 C16.3594,5.0019 15.6904,5.2989 14.9864,5.5219 L14.9864,18.4779 Z","M16.9864,19.3639 C16.3594,18.9979 15.6904,18.7009 14.9864,18.4779 C14.0384,18.1779 13.0354,17.9999 11.9864,17.9999 C10.9374,17.9999 9.9344,18.1779 8.9864,18.4779 C8.2824,18.7009 7.6134,18.9979 6.9864,19.3639 C5.8254,20.0409 4.8044,20.9309 4.0004,21.9999 L6.7124,21.9999 C8.1224,20.7589 9.9654,19.9999 11.9864,19.9999 C14.0074,19.9999 15.8504,20.7589 17.2604,21.9999 L19.9724,21.9999 C19.1684,20.9309 18.1474,20.0409 16.9864,19.3639","M11.9864,6 C13.0354,6 14.0384,5.822 14.9864,5.522 C15.6904,5.299 16.3594,5.002 16.9864,4.636 C18.1474,3.96 19.1684,3.069 19.9724,2 L17.2604,2 C15.8504,3.241 14.0074,4 11.9864,4 C9.9654,4 8.1224,3.241 6.7124,2 L4.0004,2 C4.8044,3.069 5.8254,3.96 6.9864,4.636 C7.6134,5.002 8.2824,5.299 8.9864,5.522 C9.9344,5.822 10.9374,6 11.9864,6"]},{id:"cancer",symbol:"♋",angle:90,paths:["M18,8 C15.791,8 14,9.791 14,12 C14,14.209 15.791,16 18,16 C20.209,16 22,14.209 22,12 C22,9.791 20.209,8 18,8 M18,10 C19.103,10 20,10.897 20,12 C20,13.103 19.103,14 18,14 C16.897,14 16,13.103 16,12 C16,10.897 16.897,10 18,10","M6,8 C3.791,8 2,9.791 2,12 C2,14.209 3.791,16 6,16 C8.209,16 10,14.209 10,12 C10,9.791 8.209,8 6,8 M6,10 C7.103,10 8,10.897 8,12 C8,13.103 7.103,14 6,14 C4.897,14 4,13.103 4,12 C4,10.897 4.897,10 6,10","M12,4 C14.206,4 16.206,4.897 17.654,6.346 L19.073,4.931 C17.263,3.12 14.763,2 12,2 C6.477,2 2,6.477 2,12 L4,12 C4,7.589 7.589,4 12,4","M12,20 C9.786,20 7.781,19.095 6.331,17.638 L4.912,19.052 C6.723,20.872 9.229,22 12,22 C17.523,22 22,17.523 22,12 L20,12 C20,16.411 16.411,20 12,20"]},{id:"leo",symbol:"♌",angle:120,paths:["M6,9 C3.791,9 2,10.791 2,13 C2,15.209 3.791,17 6,17 C8.209,17 10,15.209 10,13 C10,10.791 8.209,9 6,9 M6,11 C7.103,11 8,11.897 8,13 C8,14.103 7.103,15 6,15 C4.897,15 4,14.103 4,13 C4,11.897 4.897,11 6,11","M20,18 C20,19 19.103,20 18,20 C16.897,20 16,19.103 16,18 L16,8 C16,4.686 13.314,2 10,2 C6.686,2 4,4.686 4,8 C4,8.933 4.223,9.811 4.603,10.598 L6.295,9.47 C6.111,9.014 6,8.522 6,8 C6,5.794 7.794,4 10,4 C12.206,4 14,5.794 14,8 L14,18 C14,20.209 15.791,22 18,22 C20.209,22 22,20 22,18 L20,18 Z"]},{id:"virgo",symbol:"♍",angle:150,paths:["M6,2 C3.791,2 2,3.791 2,6 L2,15 L4,15 L4,6 C4,4.897 4.897,4 6,4 C7.103,4 8,4.897 8,6 L10,6 C10,3.791 8.209,2 6,2","M12,2 C9.791,2 8,3.791 8,6 L8,15 L10,15 L10,6 C10,4.897 10.897,4 12,4 C13.103,4 14,4.897 14,6 L14,22 L16,22 L16,6 C16,3.791 14.209,2 12,2","M18,11 C15.791,11 14,12.791 14,15 L16,15 C16,13.897 16.897,13 18,13 C19.103,13 20,13.897 20,15 C20,16.103 19.103,17 18,17 L18,19 C20.209,19 22,17.209 22,15 C22,12.791 20.209,11 18,11","M12 19 18 19 18 17 12 17z"]},{id:"libra",symbol:"♎",angle:180,paths:["M2 22 22 22 22 20 2 20z","M17.2736,16 C18.9426,14.537 19.9996,12.395 19.9996,10 C19.9996,5.582 16.4186,2 11.9996,2 C7.5816,2 3.9996,5.582 3.9996,10 C3.9996,12.395 5.0576,14.537 6.7266,16 L1.9996,16 L1.9996,18 L9.9996,18 L9.9996,17.738 L9.9996,16 L9.9996,15.65 C7.6736,14.824 5.9996,12.606 5.9996,10 C5.9996,6.692 8.6916,4 11.9996,4 C15.3086,4 17.9996,6.692 17.9996,10 C17.9996,12.606 16.3266,14.824 13.9996,15.65 L13.9996,16 L13.9996,17.738 L13.9996,18 L21.9996,18 L21.9996,16 L17.2736,16 Z"]},{id:"scorpio",symbol:"♏",angle:210,paths:["M6,2 C3.791,2 2,3.791 2,6 L2,15 L4,15 L4,6 C4,4.897 4.897,4 6,4 C7.103,4 8,4.897 8,6 L10,6 C10,3.791 8.209,2 6,2","M22,20 L19,18 L19,19 L18,19 C16.897,19 16,18.103 16,17 L16,6 C16,3.791 14.209,2 12,2 C9.791,2 8,3.791 8,6 L8,15 L10,15 L10,6 C10,4.897 10.897,4 12,4 C13.103,4 14,4.897 14,6 L14,17 C14,19.209 15.791,21 18,21 L19,21 L19,22 L22,20 Z"]},{id:"sagittarius",symbol:"♐",angle:240,paths:["M2 19.7785 3.414 21.1925 20.385 4.2215 18.97 2.8075z","M14.0208 16.2426 6.9498 9.1716 8.3638 7.7576 15.4348 14.8286z","M11.1926 1.9999 11.1926 3.9999 19.1926 3.9999 19.1926 11.9999 21.1926 11.9999 21.1926 1.9999z"]},{id:"capricorn",symbol:"♑",angle:270,paths:["M6,2 C3.791,2 2,3.791 2,6 L4,6 C4,4.897 4.897,4 6,4 C7.103,4 8,4.897 8,6 L10,6 C10,3.791 8.209,2 6,2","M12,2 C9.791,2 8,3.791 8,6 L8,13 L10,13 L10,6 C10,4.897 10.897,4 12,4 C13.103,4 14,4.897 14,6 L14,18 L16,18 L16,6 C16,3.791 14.209,2 12,2","M12,22 L10,22 L10,20 L12,20 C13.103,20 14,19 14,18 L16,18 C16,20 14.209,22 12,22 Z","M18,14 C15.791,14 14,15.791 14,18 C14,20.209 15.791,22 18,22 C20.209,22 22,20.209 22,18 C22,15.791 20.209,14 18,14 M18,16 C19.103,16 20,16.897 20,18 C20,19.103 19.103,20 18,20 C16.897,20 16,19.103 16,18 C16,16.897 16.897,16 18,16"]},{id:"aquarius",symbol:"♒",angle:300,paths:["M12,17 C14.209,17 16,15 16,13 L14,13 C14,14 13.103,15 12,15 C10.897,15 10,14.103 10,13 L8,13 C8,15.209 9.791,17 12,17","M18,17 C20.209,17 22,15 22,13 L20,13 C20,14 19.103,15 18,15 C16.897,15 16,14.103 16,13 L14,13 C14,15.209 15.791,17 18,17","M6,17 C8.209,17 10,15 10,13 L8,13 C8,14 7.103,15 6,15 C4.897,15 4,14.103 4,13 L2,13 C2,15.209 3.791,17 6,17","M12,11 C14.209,11 16,9 16,7 L14,7 C14,8 13.103,9 12,9 C10.897,9 10,8.103 10,7 L8,7 C8,9.209 9.791,11 12,11","M18,11 C20.209,11 22,9 22,7 L20,7 C20,8 19.103,9 18,9 C16.897,9 16,8.103 16,7 L14,7 C14,9.209 15.791,11 18,11","M6,11 C8.209,11 10,9 10,7 L8,7 C8,8 7.103,9 6,9 C4.897,9 4,8.103 4,7 L2,7 C2,9.209 3.791,11 6,11"]},{id:"pisces",symbol:"♓",angle:330,paths:["M5 13.7993 19 13.7993 19 11.7993 5 11.7993z","M10,12.7992 C10,7.9612 6.564,3.9272 2,3.0002 L2,4.9642 C5.498,5.8582 8.095,9.0272 8.095,12.7992 C8.095,16.5712 5.498,19.7402 2,20.6342 L2,22.5982 C6.564,21.6712 10,17.6372 10,12.7992","M14,12.7992 C14,17.6372 17,21.6712 22,22.5982 L22,20.6342 C19,19.7402 15.905,16.5712 15.905,12.7992 C15.905,9.0272 18.502,5.8582 22,4.9642 L22,3.0002 C17.436,3.9272 14,7.9612 14,12.7992"]}];function Ec(n){const o=yr.map(_=>{const T=(_.angle-90)*(Math.PI/180),x=100+70*Math.cos(T)-14/2,O=100+70*Math.sin(T)-14/2,D=_.id===n,S=14/24,A=_.paths.map(z=>`<path d="${z}" />`).join("");return`
        <g class="wheel-sign-group ${D?"active-sign":""}" 
           transform="translate(${x}, ${O}) scale(${S})">
            ${A}
        </g>`}).join(`
`),l=yr.find(_=>_.id===n)||yr[0],d=40/24;return`
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
            ${yr.map(_=>{const T=(_.angle-15-90)*(Math.PI/180),x=100+50*Math.cos(T),O=100+50*Math.sin(T),D=100+90*Math.cos(T),S=100+90*Math.sin(T);return`<line x1="${x}" y1="${O}" x2="${D}" y2="${S}" stroke="url(#white-gradient)" stroke-width="0.5" opacity="0.9" />`}).join("")}





            <!-- Символи знаків (90% непрозорість для неактивних) -->
            <g class="wheel-signs-container">
                ${o}
            </g>
            
            <!-- Центральний елемент (темний фон + білий знак) -->
            <g class="wheel-center-group" filter="url(#wheel-glow)">
                <circle cx="100" cy="100" r="30" fill="rgba(22, 27, 34, 0.9)" stroke="url(#white-gradient)" stroke-width="2" />
                <g class="center-sign-icon" transform="translate(80, 80) scale(${d})">
                    ${l.paths.map(_=>`<path d="${_}" />`).join("")}
                </g>
            </g>
        </svg>
    `}function Tc(n,t){console.log("🌌 [Orbit] Starting 3D Comet Animation");const e=document.createElement("div");e.className="comet-head",e.style.position="absolute",e.style.top="0",e.style.left="0",n.appendChild(e);const r={radiusX:160,centerX:n.offsetWidth/2,centerY:n.offsetHeight/2,speed:.025,trailLength:30},s=[],o=[];for(let _=0;_<r.trailLength;_++){const T=document.createElement("div");T.className="trail-segment",T.style.position="absolute",T.style.top="0",T.style.left="0",n.appendChild(T),s.push(T)}let l=0,d,p=!0;function h(){if(!p)return;r.centerX=n.offsetWidth/2,r.centerY=n.offsetHeight/2;const _=n.offsetWidth/2+40;r.radiusX=Math.max(80,Math.min(_,160));const T=20;n.style.transform=`perspective(1000px) rotateX(${T}deg)`,n.style.transformStyle="preserve-3d";const x=n.querySelector(".constellation-label")||n.querySelector(".constellation-label-partner");x&&(x.style.transform=`rotateX(${-T}deg)`,x.style.transformStyle="preserve-3d"),l+=r.speed;const O=Math.cos(l),D=Math.sin(l),S=O*r.radiusX,A=D*45,z=1+D*.25,C=D>0?100:1;o.unshift({x:S,y:A,scale:z,zIndex:C}),o.length>r.trailLength&&o.pop(),e.style.transform=`translate3d(${r.centerX+S}px, ${r.centerY+A}px, 0) scale(${z})`,e.style.zIndex=C;for(let R=0;R<s.length;R++){const K=s[R],F=o[R];if(F){const G=R/r.trailLength,v=F.scale*(1-G*.6),y=.6*(1-G);K.style.transform=`translate3d(${r.centerX+F.x}px, ${r.centerY+F.y}px, 0) scale(${v})`,K.style.opacity=y,K.style.zIndex=F.zIndex-1,K.style.display="block"}else K.style.display="none"}d=requestAnimationFrame(h)}return h(),()=>{console.log("🌌 [Orbit] Stopping Animation"),p=!1,cancelAnimationFrame(d),e.remove(),s.forEach(_=>_.remove())}}async function Ic(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=xc,console.log("🌌 [Stage-2] Loading Module Init");const e=E.get("currentVariant")||ya();document.getElementById("zodiac-label-container");const r=t.querySelector(".spinner");r&&(r.style.display="none"),document.body.classList.add("warp-mode");const s=document.getElementById("forecast-loading-descriptor");s&&e&&e.id==="forecast"&&(s.style.display="block");const o=document.getElementById("loading-text"),l=document.getElementById("loading-cursor"),d=document.getElementById("constellation-container"),p=E.get("date");if(d&&p){const D=Ta(p);console.log(`🌟 Zodiac Sign: ${D.name} (${D.id})`);const S=wc(D.id);d.innerHTML=S;const A=Ia[D.id],z=document.getElementById("zodiac-label-container");if(A&&z){if(e&&(e.id==="man"||e.id==="man1uah")){const C=`
                    <div class="constellation-label" style="display: flex; flex-direction: column; align-items: center; line-height: 1.2;">
                        <span style="font-size: 0.5em; opacity: 0.7; font-weight: 500; margin-bottom: 5px; color: var(--secondary-text-color); letter-spacing: 2px;">ТВІЙ ЗНАК</span>
                        <span>${A.symbol} ${A.name}</span>
                    </div>
                `;z.innerHTML=C}else{const C=`<div class="constellation-label">${A.symbol} ${A.name}</div>`;z.innerHTML=C}z&&Tc(z)}if(e&&e.id==="dev"){const C=document.getElementById("zodiac-wheel-container"),R=t.querySelector(".spinner");console.log("🔍 DEBUG: Containers - Wheel:",C,"Spinner:",R),C&&R?(console.log("🎡 DEV MODE: Showing Zodiac Wheel"),R.style.display="none",C.style.display="flex",C.innerHTML=Ec(D.id)):console.error("❌ DEBUG: Missing containers!")}}Yn();let h=!1;const _=gc(p).then(D=>(E.set("freeReport",D),h=!0,D)).catch(D=>(console.error("API Error:",D),{error:!0,title:"Зірки ще не готові...",psychological_analysis:"<p>На жаль, зараз Всесвіт не зміг розкрити таємницю. Будь ласка, спробуй ще раз через хвилину ✨</p>"})),T=[{text:"Аналізую положення планет...",pause:1e3},{text:"З'єднуюсь з ефемеридами NASA...",pause:1200},{text:"Зчитую твій енергетичний код...",pause:1200},{text:"Розшифровую кармічні вузли...",pause:1500},{text:"Будую твою натальну карту...",pause:1500},{text:"Приготуйся дізнатись, наскільки ти дивовижна 💖",pause:2500},{text:"Розкриття твоєї дивовижності потребує ще трохи часу 😇",pause:3e3,final:!0}],x=e&&e.ui&&e.ui.loading&&e.ui.loading.steps?e.ui.loading.steps:T,O=(async()=>{for(let D=0;D<x.length;D++){if(h){console.log("🚀 API Ready! Skipping remaining animation steps.");break}const S=x[D];if(o&&l){const A=h?300:S.pause;await Ea(o,l,S.text,50,A,S.final)}if(h){console.log("🚀 API Ready! Animation loop stopped.");break}}l&&(l.style.display="none")})();await Promise.all([O,_]),document.body.classList.remove("warp-mode"),n.navigateTo("result")}const kc=`<!-- 🔥 UPDATE: Зменшено padding-bottom секції до 140px, щоб відповідати компактнішому футеру -->
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

        <!-- Hook block removed, now injected via JS into the accordion -->

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
                Отримай повну розшифровку твоєї <span class="text-[#cda45e]">Натальної карти</span>
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

            <!-- Validation Error Messages -->
            <div id="offer-validation-error" style="display: none;"
                class="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-red-500 text-sm text-center">
            </div>

            <div id="city-suggestions" class="suggestions-list" style="display: none;"></div>

            <!-- Skip Button (під формою) -->
            <button type="button" id="skip-button" class="btn btn-skip opacity-80 text-xs mt-1 w-full" style="padding: 12px; height: auto;">
                Розрахувати без точного часу (точність 95%)
            </button>
        </div>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- 🔥 OFFER LANDING PAGE BLOCKS (Only for natal_chart_offer variant) -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->

        <!-- BLOCK 1: COSMIC IMPRINT PREVIEW -->
        <div id="offer-block-cosmic" class="offer-landing-block w-full" style="display: none; margin-top: 16px;">
            <div id="offer-astro-data-container" class="interactive-astro-box"></div>
        </div>

        <!-- BLOCK 2: HOW IT WORKS — 4 Pillars (from Knowledge Base) -->
        <div id="offer-block-science" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card" style="background: rgba(205, 164, 94, 0.03); border: 1px solid rgba(205, 164, 94, 0.15);">
                <h3 class="offer-section-title">Чому Натальній карті <span>можна вірити</span></h3>
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
                                <span>Натальна карта — це не вирок, а інструкція. Знаючи свої «налаштування», ти бачиш, де варто «підкласти соломки», а де впевнено тиснути на газ.</span>
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

        <!-- BLOCK 3: Comparison Table Section -->
        <div id="offer-comparison-block" class="offer-comparison-container" style="display: none; width: 100%; overflow: hidden;">
            <h3 id="comparison-table-title" class="text-xl font-bold text-center text-white mb-6">Що ти отримаєш у <span>повній Розшифровці</span></h3>
            <!-- Wrapper for table to allow internal horizontal scroll if needed without breaking page -->
            <div style="width: 100%; overflow-x: auto; padding-bottom: 15px;">
                <div id="comparison-table-content" style="min-width: 100%;"></div>
            </div>
        </div>

        <!-- BLOCK 4: TRANSFORMATION — What She Gets (Structure) -->
        <div id="offer-block-transformation" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card">
                <h3 class="offer-section-title">Структура твоєї <span>Натальної карти</span></h3>
                <div class="offer-section-body">
                    <p>Повна розшифровка Натальної Карти — це твоя <strong>інструкція до самої себе</strong>, яка покаже тобі:</p>
                    <div class="offer-feature-grid">
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">✨</span>
                            <div>
                                <strong>Свідоме і Підсвідоме: Твоє Ядро</strong>
                                <span>Твій справжній архетип та вирішення внутрішнього конфлікту, що саботує твої успіхи</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">❤️‍🔥</span>
                            <div>
                                <strong>Стосунки та Кохання</strong>
                                <span>Твій типаж ідеального партнера та як перестати притягувати «не тих» чоловіків</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">💰</span>
                            <div>
                                <strong>Гроші та Реалізація</strong>
                                <span>Де лежить твій фінансовий потенціал і як нарешті пробити "прозору стелю"</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">🗝️</span>
                            <div>
                                <strong>Призначення та Кармічні Уроки</strong>
                                <span>Твоя справжня місія у цьому житті, таланти та унікальний шлях твоєї душі</span>
                            </div>
                        </div>
                    </div>
                    <!-- Future Forecast highlight -->
                    <div class="offer-feature-item" style="margin-top: 14px; background: rgba(205, 164, 94, 0.06); border-color: rgba(205, 164, 94, 0.15);">
                        <span class="offer-feature-icon">⚡️</span>
                        <div>
                            <strong>Блок Майбутнього (Огляд на 6 місяців)</strong>
                            <span>Головні події, вікна можливостей та ключові астрологічні транзити, які чекають на тебе</span>
                        </div>
                    </div>
                    <!-- Planet & Nodes coordinates highlight -->
                    <div class="offer-feature-item" style="margin-top: 10px; background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08);">
                        <span class="offer-feature-icon">📡</span>
                        <div>
                            <strong>Точні Координати Планет та Вузлів</strong>
                            <span>Карта з градусами і секундами для кожної планети та кармічних вузлів.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 5: DELIVERY FORMAT -->
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
                                <strong>Персональне посилання</strong>
                                <span>Унікальний URL, за яким звіт доступний назавжди</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 6: Visual Preview Mockup Section -->
        <div id="offer-preview-block" class="offer-mockup-section" style="display: none;">
            <h3 class="offer-section-title" id="mockup-title-heading" style="display: none;">Приклад <span>PDF-варіанту</span> твоєї Карти</h3>
            
            <!-- Bordered wrapper for the scrollable images only -->
            <div class="offer-mockup-image-wrapper" id="mockup-carousel-main-wrapper">
                <div id="mockup-carousel-scroll">
                    <!-- JS will inject images here (index.js) -->
                </div>
            </div>

            <!-- Dots container outside the bordered wrapper -->
            <div id="destiny-dots-new" class="destiny-dots-container-new"></div>
            
            <p class="offer-mockup-caption" id="mockup-caption-text"></p>
        </div>

        <!-- BLOCK 7: AUDIENCE (For Whom / Not For Whom) -->
        <div id="offer-block-audience-s3" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card">
                <h3 class="offer-section-title" id="s3-audience-title"></h3>
                <div class="offer-section-body">
                    <div class="landing-audience-grid">
                        <div class="landing-audience-card positive">
                            <h4 class="landing-audience-subtitle">✅ Для тих, хто:</h4>
                            <ul class="landing-audience-list" id="s3-audience-for-list"></ul>
                        </div>
                        <div class="landing-audience-card negative">
                            <h4 class="landing-audience-subtitle" id="s3-audience-not-subtitle">❌ Кому НЕ варто:</h4>
                            <ul class="landing-audience-list" id="s3-audience-not-list"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 8: TRANSFORMATION (Before/After) -->
        <div id="offer-block-transformation-s3" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card">
                <h3 class="offer-section-title" id="s3-transformation-title"></h3>
                <div class="offer-section-body">
                    <div class="landing-transformation-box">
                        <div class="landing-transformation-item before">
                            <div class="landing-transformation-badge">Раніше:</div>
                            <p id="s3-transformation-before"></p>
                        </div>
                        <div class="landing-transformation-arrow">⬇️</div>
                        <div class="landing-transformation-item after">
                            <div class="landing-transformation-badge">З Натальною картою:</div>
                            <p id="s3-transformation-after"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 9: REVIEWS COUNTER -->
        <div id="offer-reviews-counter-block" class="offer-landing-block" style="display: none; margin-bottom: -16px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.03); padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); max-width: 90%; margin: 0 auto;">
                <span style="font-size: 1.1rem;">🔥</span>
                <span style="font-size: 0.95rem; color: var(--secondary-text-color); font-weight: 500;">
                    Вже <strong id="s3-live-women-counter" style="color: var(--accent-color); font-size: 1.05rem; transition: transform 0.2s ease, color 0.2s ease;">15 420</strong> жінок отримали
                </span>
            </div>
        </div>

        <!-- BLOCK 10: REVIEWS (SOCIAL PROOF) -->
        <div id="offer-block-reviews" class="offer-landing-block" style="display: none;">
            <div id="reviews-container" class="offer-section-card" style="padding: 24px 16px; border-top: none; background: transparent; border: none; box-shadow: none;">
                <h3 class="offer-section-title" style="margin-bottom: 24px;">Що кажуть ті, хто вже отримав повний <span>Розрахунок</span></h3>
                <div id="reviews-list" style="display: flex; flex-direction: column; gap: 14px;">
                    <!-- Динамічні відгуки завантажуються тут -->
                </div>
            </div>
        </div>

        <!-- BLOCK 11: GUARANTEE -->
        <div id="offer-block-guarantee" class="offer-landing-block" style="display: none;">
            <div class="offer-guarantee-container">
                <div class="offer-guarantee-card">
                    <div class="offer-guarantee-badge">
                        <span class="guarantee-icon">🛡️</span>
                    </div>
                    <div class="offer-guarantee-content">
                        <h3 class="guarantee-title">100% Впевненість у якості</h3>
                        <p class="guarantee-text">Ми на 100% впевнені у глибині та точності нашої Розшифровки. Якщо протягом 24 годин ти вирішиш, що звіт тобі не підійшов — ми повернемо кошти без зайвих питань.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOCK 12: FAQ -->
        <div id="offer-block-faq" class="offer-landing-block" style="display: none;">
            <div class="offer-section-card" style="border-top: 1px solid rgba(255,255,255,0.1);">
                <h3 class="offer-section-title">Часті <span>запитання</span></h3>
                <div id="faq-list" class="offer-faq-list">
                    <!-- Динамічний FAQ завантажується тут -->
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
                Спеціальна ціна діє ще: <span id="offer-timer-display" style="color: var(--accent-color); font-weight: 700; margin-left: 2px;">15:00</span>
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
</section>`,Cc=()=>{};var vo={};const ka=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Ac=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],l=n[e++],d=n[e++],p=((s&7)<<18|(o&63)<<12|(l&63)<<6|d&63)-65536;t[r++]=String.fromCharCode(55296+(p>>10)),t[r++]=String.fromCharCode(56320+(p&1023))}else{const o=n[e++],l=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|l&63)}}return t.join("")},Ca={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],l=s+1<n.length,d=l?n[s+1]:0,p=s+2<n.length,h=p?n[s+2]:0,_=o>>2,T=(o&3)<<4|d>>4;let x=(d&15)<<2|h>>6,O=h&63;p||(O=64,l||(x=64)),r.push(e[_],e[T],e[x],e[O])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(ka(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Ac(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],d=s<n.length?e[n.charAt(s)]:0;++s;const h=s<n.length?e[n.charAt(s)]:64;++s;const T=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||d==null||h==null||T==null)throw new Sc;const x=o<<2|d>>4;if(r.push(x),h!==64){const O=d<<4&240|h>>2;if(r.push(O),T!==64){const D=h<<6&192|T;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Sc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Rc=function(n){const t=ka(n);return Ca.encodeByteArray(t,!0)},Pr=function(n){return Rc(n).replace(/\./g,"")},Pc=function(n){try{return Ca.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Lc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const Dc=()=>Lc().__FIREBASE_DEFAULTS__,Mc=()=>{if(typeof process>"u"||typeof vo>"u")return;const n=vo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Vc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Pc(n[1]);return t&&JSON.parse(t)},Yi=()=>{try{return Cc()||Dc()||Mc()||Vc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Nc=n=>Yi()?.emulatorHosts?.[n],Oc=n=>{const t=Nc(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Aa=()=>Yi()?.config;class Bc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}function Xi(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function $c(n){return(await fetch(n,{credentials:"include"})).ok}function Fc(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Pr(JSON.stringify(e)),Pr(JSON.stringify(l)),""].join(".")}const Vn={};function Uc(){const n={prod:[],emulator:[]};for(const t of Object.keys(Vn))Vn[t]?n.emulator.push(t):n.prod.push(t);return n}function zc(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let bo=!1;function qc(n,t){if(typeof window>"u"||typeof document>"u"||!Xi(window.location.host)||Vn[n]===t||Vn[n]||bo)return;Vn[n]=t;function e(x){return`__firebase__banner__${x}`}const r="__firebase__banner",o=Uc().prod.length>0;function l(){const x=document.getElementById(r);x&&x.remove()}function d(x){x.style.display="flex",x.style.background="#7faaf0",x.style.position="fixed",x.style.bottom="5px",x.style.left="5px",x.style.padding=".5em",x.style.borderRadius="5px",x.style.alignItems="center"}function p(x,O){x.setAttribute("width","24"),x.setAttribute("id",O),x.setAttribute("height","24"),x.setAttribute("viewBox","0 0 24 24"),x.setAttribute("fill","none"),x.style.marginLeft="-6px"}function h(){const x=document.createElement("span");return x.style.cursor="pointer",x.style.marginLeft="16px",x.style.fontSize="24px",x.innerHTML=" &times;",x.onclick=()=>{bo=!0,l()},x}function _(x,O){x.setAttribute("id",O),x.innerText="Learn more",x.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",x.setAttribute("target","__blank"),x.style.paddingLeft="5px",x.style.textDecoration="underline"}function T(){const x=zc(r),O=e("text"),D=document.getElementById(O)||document.createElement("span"),S=e("learnmore"),A=document.getElementById(S)||document.createElement("a"),z=e("preprendIcon"),C=document.getElementById(z)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(x.created){const R=x.element;d(R),_(A,S);const K=h();p(C,z),R.append(C,D,A,K),document.body.appendChild(R)}o?(D.innerText="Preview backend disconnected.",C.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",O)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",T):T()}function jc(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Hc(){const n=Yi()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Gc(){return!Hc()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Wc(){try{return typeof indexedDB=="object"}catch{return!1}}function Kc(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{t(s.error?.message||"")}}catch(e){t(e)}})}const Qc="FirebaseError";class pn extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Qc,Object.setPrototypeOf(this,pn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Sa.prototype.create)}}class Sa{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],l=o?Yc(o,r):"Error",d=`${this.serviceName}: ${l} (${s}).`;return new pn(s,d,r)}}function Yc(n,t){return n.replace(Xc,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Xc=/\{\$([^}]+)}/g;function Lr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],l=t[s];if(xo(o)&&xo(l)){if(!Lr(o,l))return!1}else if(o!==l)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function xo(n){return n!==null&&typeof n=="object"}function Dr(n){return n&&n._delegate?n._delegate:n}class zn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}const Ve="[DEFAULT]";class Jc{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Bc;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(td(t))try{this.getOrInitializeService({instanceIdentifier:Ve})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=Ve){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ve){return this.instances.has(t)}getOptions(t=Ve){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,l]of this.instancesDeferred.entries()){const d=this.normalizeInstanceIdentifier(o);r===d&&l.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Zc(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Ve){return this.component?this.component.multipleInstances?t:Ve:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Zc(n){return n===Ve?void 0:n}function td(n){return n.instantiationMode==="EAGER"}class ed{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Jc(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}var pt;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(pt||(pt={}));const nd={debug:pt.DEBUG,verbose:pt.VERBOSE,info:pt.INFO,warn:pt.WARN,error:pt.ERROR,silent:pt.SILENT},rd=pt.INFO,id={[pt.DEBUG]:"log",[pt.VERBOSE]:"log",[pt.INFO]:"info",[pt.WARN]:"warn",[pt.ERROR]:"error"},sd=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=id[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Ra{constructor(t){this.name=t,this._logLevel=rd,this._logHandler=sd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in pt))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?nd[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,pt.DEBUG,...t),this._logHandler(this,pt.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,pt.VERBOSE,...t),this._logHandler(this,pt.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,pt.INFO,...t),this._logHandler(this,pt.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,pt.WARN,...t),this._logHandler(this,pt.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,pt.ERROR,...t),this._logHandler(this,pt.ERROR,...t)}}const od=(n,t)=>t.some(e=>n instanceof e);let _o,wo;function ad(){return _o||(_o=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ld(){return wo||(wo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Pa=new WeakMap,Si=new WeakMap,La=new WeakMap,bi=new WeakMap,Ji=new WeakMap;function cd(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",l)},o=()=>{e(we(n.result)),s()},l=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",l)});return t.then(e=>{e instanceof IDBCursor&&Pa.set(e,n)}).catch(()=>{}),Ji.set(t,n),t}function dd(n){if(Si.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",l),n.removeEventListener("abort",l)},o=()=>{e(),s()},l=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",l),n.addEventListener("abort",l)});Si.set(n,t)}let Ri={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Si.get(n);if(t==="objectStoreNames")return n.objectStoreNames||La.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return we(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function ud(n){Ri=n(Ri)}function pd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(xi(this),t,...e);return La.set(r,t.sort?t.sort():[t]),we(r)}:ld().includes(n)?function(...t){return n.apply(xi(this),t),we(Pa.get(this))}:function(...t){return we(n.apply(xi(this),t))}}function hd(n){return typeof n=="function"?pd(n):(n instanceof IDBTransaction&&dd(n),od(n,ad())?new Proxy(n,Ri):n)}function we(n){if(n instanceof IDBRequest)return cd(n);if(bi.has(n))return bi.get(n);const t=hd(n);return t!==n&&(bi.set(n,t),Ji.set(t,n)),t}const xi=n=>Ji.get(n);function fd(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const l=indexedDB.open(n,t),d=we(l);return r&&l.addEventListener("upgradeneeded",p=>{r(we(l.result),p.oldVersion,p.newVersion,we(l.transaction),p)}),e&&l.addEventListener("blocked",p=>e(p.oldVersion,p.newVersion,p)),d.then(p=>{o&&p.addEventListener("close",()=>o()),s&&p.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),d}const md=["get","getKey","getAll","getAllKeys","count"],gd=["put","add","delete","clear"],_i=new Map;function Eo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(_i.get(t))return _i.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=gd.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||md.includes(e)))return;const o=async function(l,...d){const p=this.transaction(l,s?"readwrite":"readonly");let h=p.store;return r&&(h=h.index(d.shift())),(await Promise.all([h[e](...d),s&&p.done]))[0]};return _i.set(t,o),o}ud(n=>({...n,get:(t,e,r)=>Eo(t,e)||n.get(t,e,r),has:(t,e)=>!!Eo(t,e)||n.has(t,e)}));class yd{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(vd(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function vd(n){return n.getComponent()?.type==="VERSION"}const Pi="@firebase/app",To="0.14.7";const me=new Ra("@firebase/app"),bd="@firebase/app-compat",xd="@firebase/analytics-compat",_d="@firebase/analytics",wd="@firebase/app-check-compat",Ed="@firebase/app-check",Td="@firebase/auth",Id="@firebase/auth-compat",kd="@firebase/database",Cd="@firebase/data-connect",Ad="@firebase/database-compat",Sd="@firebase/functions",Rd="@firebase/functions-compat",Pd="@firebase/installations",Ld="@firebase/installations-compat",Dd="@firebase/messaging",Md="@firebase/messaging-compat",Vd="@firebase/performance",Nd="@firebase/performance-compat",Od="@firebase/remote-config",Bd="@firebase/remote-config-compat",$d="@firebase/storage",Fd="@firebase/storage-compat",Ud="@firebase/firestore",zd="@firebase/ai",qd="@firebase/firestore-compat",jd="firebase",Hd="12.8.0";const Li="[DEFAULT]",Gd={[Pi]:"fire-core",[bd]:"fire-core-compat",[_d]:"fire-analytics",[xd]:"fire-analytics-compat",[Ed]:"fire-app-check",[wd]:"fire-app-check-compat",[Td]:"fire-auth",[Id]:"fire-auth-compat",[kd]:"fire-rtdb",[Cd]:"fire-data-connect",[Ad]:"fire-rtdb-compat",[Sd]:"fire-fn",[Rd]:"fire-fn-compat",[Pd]:"fire-iid",[Ld]:"fire-iid-compat",[Dd]:"fire-fcm",[Md]:"fire-fcm-compat",[Vd]:"fire-perf",[Nd]:"fire-perf-compat",[Od]:"fire-rc",[Bd]:"fire-rc-compat",[$d]:"fire-gcs",[Fd]:"fire-gcs-compat",[Ud]:"fire-fst",[qd]:"fire-fst-compat",[zd]:"fire-vertex","fire-js":"fire-js",[jd]:"fire-js-all"};const Mr=new Map,Wd=new Map,Di=new Map;function Io(n,t){try{n.container.addComponent(t)}catch(e){me.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Vr(n){const t=n.name;if(Di.has(t))return me.debug(`There were multiple attempts to register component ${t}.`),!1;Di.set(t,n);for(const e of Mr.values())Io(e,n);for(const e of Wd.values())Io(e,n);return!0}function Kd(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Qd(n){return n==null?!1:n.settings!==void 0}const Yd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ee=new Sa("app","Firebase",Yd);class Xd{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new zn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Ee.create("app-deleted",{appName:this._name})}}const Jd=Hd;function Da(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:Li,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Ee.create("bad-app-name",{appName:String(s)});if(e||(e=Aa()),!e)throw Ee.create("no-options");const o=Mr.get(s);if(o){if(Lr(e,o.options)&&Lr(r,o.config))return o;throw Ee.create("duplicate-app",{appName:s})}const l=new ed(s);for(const p of Di.values())l.addComponent(p);const d=new Xd(e,r,l);return Mr.set(s,d),d}function Zd(n=Li){const t=Mr.get(n);if(!t&&n===Li&&Aa())return Da();if(!t)throw Ee.create("no-app",{appName:n});return t}function en(n,t,e){let r=Gd[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const l=[`Unable to register library "${r}" with version "${t}":`];s&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),me.warn(l.join(" "));return}Vr(new zn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}const tu="firebase-heartbeat-database",eu=1,qn="firebase-heartbeat-store";let wi=null;function Ma(){return wi||(wi=fd(tu,eu,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(qn)}catch(e){console.warn(e)}}}}).catch(n=>{throw Ee.create("idb-open",{originalErrorMessage:n.message})})),wi}async function nu(n){try{const e=(await Ma()).transaction(qn),r=await e.objectStore(qn).get(Va(n));return await e.done,r}catch(t){if(t instanceof pn)me.warn(t.message);else{const e=Ee.create("idb-get",{originalErrorMessage:t?.message});me.warn(e.message)}}}async function ko(n,t){try{const r=(await Ma()).transaction(qn,"readwrite");await r.objectStore(qn).put(t,Va(n)),await r.done}catch(e){if(e instanceof pn)me.warn(e.message);else{const r=Ee.create("idb-set",{originalErrorMessage:e?.message});me.warn(r.message)}}}function Va(n){return`${n.name}!${n.options.appId}`}const ru=1024,iu=30;class su{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new au(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Co();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:e}),this._heartbeatsCache.heartbeats.length>iu){const s=lu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){me.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Co(),{heartbeatsToSend:e,unsentEntries:r}=ou(this._heartbeatsCache.heartbeats),s=Pr(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return me.warn(t),""}}}function Co(){return new Date().toISOString().substring(0,10)}function ou(n,t=ru){const e=[];let r=n.slice();for(const s of n){const o=e.find(l=>l.agent===s.agent);if(o){if(o.dates.push(s.date),Ao(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Ao(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class au{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Wc()?Kc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await nu(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ko(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ko(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Ao(n){return Pr(JSON.stringify({version:2,heartbeats:n})).length}function lu(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}function cu(n){Vr(new zn("platform-logger",t=>new yd(t),"PRIVATE")),Vr(new zn("heartbeat",t=>new su(t),"PRIVATE")),en(Pi,To,n),en(Pi,To,"esm2020"),en("fire-js","")}cu("");var du="firebase",uu="12.8.0";en(du,uu,"app");var So=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Zi;(function(){var n;function t(v,y){function f(){}f.prototype=y.prototype,v.F=y.prototype,v.prototype=new f,v.prototype.constructor=v,v.D=function(b,w,k){for(var u=Array(arguments.length-2),M=2;M<arguments.length;M++)u[M-2]=arguments[M];return y.prototype[w].apply(b,u)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,y,f){f||(f=0);const b=Array(16);if(typeof y=="string")for(var w=0;w<16;++w)b[w]=y.charCodeAt(f++)|y.charCodeAt(f++)<<8|y.charCodeAt(f++)<<16|y.charCodeAt(f++)<<24;else for(w=0;w<16;++w)b[w]=y[f++]|y[f++]<<8|y[f++]<<16|y[f++]<<24;y=v.g[0],f=v.g[1],w=v.g[2];let k=v.g[3],u;u=y+(k^f&(w^k))+b[0]+3614090360&4294967295,y=f+(u<<7&4294967295|u>>>25),u=k+(w^y&(f^w))+b[1]+3905402710&4294967295,k=y+(u<<12&4294967295|u>>>20),u=w+(f^k&(y^f))+b[2]+606105819&4294967295,w=k+(u<<17&4294967295|u>>>15),u=f+(y^w&(k^y))+b[3]+3250441966&4294967295,f=w+(u<<22&4294967295|u>>>10),u=y+(k^f&(w^k))+b[4]+4118548399&4294967295,y=f+(u<<7&4294967295|u>>>25),u=k+(w^y&(f^w))+b[5]+1200080426&4294967295,k=y+(u<<12&4294967295|u>>>20),u=w+(f^k&(y^f))+b[6]+2821735955&4294967295,w=k+(u<<17&4294967295|u>>>15),u=f+(y^w&(k^y))+b[7]+4249261313&4294967295,f=w+(u<<22&4294967295|u>>>10),u=y+(k^f&(w^k))+b[8]+1770035416&4294967295,y=f+(u<<7&4294967295|u>>>25),u=k+(w^y&(f^w))+b[9]+2336552879&4294967295,k=y+(u<<12&4294967295|u>>>20),u=w+(f^k&(y^f))+b[10]+4294925233&4294967295,w=k+(u<<17&4294967295|u>>>15),u=f+(y^w&(k^y))+b[11]+2304563134&4294967295,f=w+(u<<22&4294967295|u>>>10),u=y+(k^f&(w^k))+b[12]+1804603682&4294967295,y=f+(u<<7&4294967295|u>>>25),u=k+(w^y&(f^w))+b[13]+4254626195&4294967295,k=y+(u<<12&4294967295|u>>>20),u=w+(f^k&(y^f))+b[14]+2792965006&4294967295,w=k+(u<<17&4294967295|u>>>15),u=f+(y^w&(k^y))+b[15]+1236535329&4294967295,f=w+(u<<22&4294967295|u>>>10),u=y+(w^k&(f^w))+b[1]+4129170786&4294967295,y=f+(u<<5&4294967295|u>>>27),u=k+(f^w&(y^f))+b[6]+3225465664&4294967295,k=y+(u<<9&4294967295|u>>>23),u=w+(y^f&(k^y))+b[11]+643717713&4294967295,w=k+(u<<14&4294967295|u>>>18),u=f+(k^y&(w^k))+b[0]+3921069994&4294967295,f=w+(u<<20&4294967295|u>>>12),u=y+(w^k&(f^w))+b[5]+3593408605&4294967295,y=f+(u<<5&4294967295|u>>>27),u=k+(f^w&(y^f))+b[10]+38016083&4294967295,k=y+(u<<9&4294967295|u>>>23),u=w+(y^f&(k^y))+b[15]+3634488961&4294967295,w=k+(u<<14&4294967295|u>>>18),u=f+(k^y&(w^k))+b[4]+3889429448&4294967295,f=w+(u<<20&4294967295|u>>>12),u=y+(w^k&(f^w))+b[9]+568446438&4294967295,y=f+(u<<5&4294967295|u>>>27),u=k+(f^w&(y^f))+b[14]+3275163606&4294967295,k=y+(u<<9&4294967295|u>>>23),u=w+(y^f&(k^y))+b[3]+4107603335&4294967295,w=k+(u<<14&4294967295|u>>>18),u=f+(k^y&(w^k))+b[8]+1163531501&4294967295,f=w+(u<<20&4294967295|u>>>12),u=y+(w^k&(f^w))+b[13]+2850285829&4294967295,y=f+(u<<5&4294967295|u>>>27),u=k+(f^w&(y^f))+b[2]+4243563512&4294967295,k=y+(u<<9&4294967295|u>>>23),u=w+(y^f&(k^y))+b[7]+1735328473&4294967295,w=k+(u<<14&4294967295|u>>>18),u=f+(k^y&(w^k))+b[12]+2368359562&4294967295,f=w+(u<<20&4294967295|u>>>12),u=y+(f^w^k)+b[5]+4294588738&4294967295,y=f+(u<<4&4294967295|u>>>28),u=k+(y^f^w)+b[8]+2272392833&4294967295,k=y+(u<<11&4294967295|u>>>21),u=w+(k^y^f)+b[11]+1839030562&4294967295,w=k+(u<<16&4294967295|u>>>16),u=f+(w^k^y)+b[14]+4259657740&4294967295,f=w+(u<<23&4294967295|u>>>9),u=y+(f^w^k)+b[1]+2763975236&4294967295,y=f+(u<<4&4294967295|u>>>28),u=k+(y^f^w)+b[4]+1272893353&4294967295,k=y+(u<<11&4294967295|u>>>21),u=w+(k^y^f)+b[7]+4139469664&4294967295,w=k+(u<<16&4294967295|u>>>16),u=f+(w^k^y)+b[10]+3200236656&4294967295,f=w+(u<<23&4294967295|u>>>9),u=y+(f^w^k)+b[13]+681279174&4294967295,y=f+(u<<4&4294967295|u>>>28),u=k+(y^f^w)+b[0]+3936430074&4294967295,k=y+(u<<11&4294967295|u>>>21),u=w+(k^y^f)+b[3]+3572445317&4294967295,w=k+(u<<16&4294967295|u>>>16),u=f+(w^k^y)+b[6]+76029189&4294967295,f=w+(u<<23&4294967295|u>>>9),u=y+(f^w^k)+b[9]+3654602809&4294967295,y=f+(u<<4&4294967295|u>>>28),u=k+(y^f^w)+b[12]+3873151461&4294967295,k=y+(u<<11&4294967295|u>>>21),u=w+(k^y^f)+b[15]+530742520&4294967295,w=k+(u<<16&4294967295|u>>>16),u=f+(w^k^y)+b[2]+3299628645&4294967295,f=w+(u<<23&4294967295|u>>>9),u=y+(w^(f|~k))+b[0]+4096336452&4294967295,y=f+(u<<6&4294967295|u>>>26),u=k+(f^(y|~w))+b[7]+1126891415&4294967295,k=y+(u<<10&4294967295|u>>>22),u=w+(y^(k|~f))+b[14]+2878612391&4294967295,w=k+(u<<15&4294967295|u>>>17),u=f+(k^(w|~y))+b[5]+4237533241&4294967295,f=w+(u<<21&4294967295|u>>>11),u=y+(w^(f|~k))+b[12]+1700485571&4294967295,y=f+(u<<6&4294967295|u>>>26),u=k+(f^(y|~w))+b[3]+2399980690&4294967295,k=y+(u<<10&4294967295|u>>>22),u=w+(y^(k|~f))+b[10]+4293915773&4294967295,w=k+(u<<15&4294967295|u>>>17),u=f+(k^(w|~y))+b[1]+2240044497&4294967295,f=w+(u<<21&4294967295|u>>>11),u=y+(w^(f|~k))+b[8]+1873313359&4294967295,y=f+(u<<6&4294967295|u>>>26),u=k+(f^(y|~w))+b[15]+4264355552&4294967295,k=y+(u<<10&4294967295|u>>>22),u=w+(y^(k|~f))+b[6]+2734768916&4294967295,w=k+(u<<15&4294967295|u>>>17),u=f+(k^(w|~y))+b[13]+1309151649&4294967295,f=w+(u<<21&4294967295|u>>>11),u=y+(w^(f|~k))+b[4]+4149444226&4294967295,y=f+(u<<6&4294967295|u>>>26),u=k+(f^(y|~w))+b[11]+3174756917&4294967295,k=y+(u<<10&4294967295|u>>>22),u=w+(y^(k|~f))+b[2]+718787259&4294967295,w=k+(u<<15&4294967295|u>>>17),u=f+(k^(w|~y))+b[9]+3951481745&4294967295,v.g[0]=v.g[0]+y&4294967295,v.g[1]=v.g[1]+(w+(u<<21&4294967295|u>>>11))&4294967295,v.g[2]=v.g[2]+w&4294967295,v.g[3]=v.g[3]+k&4294967295}r.prototype.v=function(v,y){y===void 0&&(y=v.length);const f=y-this.blockSize,b=this.C;let w=this.h,k=0;for(;k<y;){if(w==0)for(;k<=f;)s(this,v,k),k+=this.blockSize;if(typeof v=="string"){for(;k<y;)if(b[w++]=v.charCodeAt(k++),w==this.blockSize){s(this,b),w=0;break}}else for(;k<y;)if(b[w++]=v[k++],w==this.blockSize){s(this,b),w=0;break}}this.h=w,this.o+=y},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var y=1;y<v.length-8;++y)v[y]=0;y=this.o*8;for(var f=v.length-8;f<v.length;++f)v[f]=y&255,y/=256;for(this.v(v),v=Array(16),y=0,f=0;f<4;++f)for(let b=0;b<32;b+=8)v[y++]=this.g[f]>>>b&255;return v};function o(v,y){var f=d;return Object.prototype.hasOwnProperty.call(f,v)?f[v]:f[v]=y(v)}function l(v,y){this.h=y;const f=[];let b=!0;for(let w=v.length-1;w>=0;w--){const k=v[w]|0;b&&k==y||(f[w]=k,b=!1)}this.g=f}var d={};function p(v){return-128<=v&&v<128?o(v,function(y){return new l([y|0],y<0?-1:0)}):new l([v|0],v<0?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return T;if(v<0)return A(h(-v));const y=[];let f=1;for(let b=0;v>=f;b++)y[b]=v/f|0,f*=4294967296;return new l(y,0)}function _(v,y){if(v.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(v.charAt(0)=="-")return A(_(v.substring(1),y));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const f=h(Math.pow(y,8));let b=T;for(let k=0;k<v.length;k+=8){var w=Math.min(8,v.length-k);const u=parseInt(v.substring(k,k+w),y);w<8?(w=h(Math.pow(y,w)),b=b.j(w).add(h(u))):(b=b.j(f),b=b.add(h(u)))}return b}var T=p(0),x=p(1),O=p(16777216);n=l.prototype,n.m=function(){if(S(this))return-A(this).m();let v=0,y=1;for(let f=0;f<this.g.length;f++){const b=this.i(f);v+=(b>=0?b:4294967296+b)*y,y*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(D(this))return"0";if(S(this))return"-"+A(this).toString(v);const y=h(Math.pow(v,6));var f=this;let b="";for(;;){const w=K(f,y).g;f=z(f,w.j(y));let k=((f.g.length>0?f.g[0]:f.h)>>>0).toString(v);if(f=w,D(f))return k+b;for(;k.length<6;)k="0"+k;b=k+b}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function D(v){if(v.h!=0)return!1;for(let y=0;y<v.g.length;y++)if(v.g[y]!=0)return!1;return!0}function S(v){return v.h==-1}n.l=function(v){return v=z(this,v),S(v)?-1:D(v)?0:1};function A(v){const y=v.g.length,f=[];for(let b=0;b<y;b++)f[b]=~v.g[b];return new l(f,~v.h).add(x)}n.abs=function(){return S(this)?A(this):this},n.add=function(v){const y=Math.max(this.g.length,v.g.length),f=[];let b=0;for(let w=0;w<=y;w++){let k=b+(this.i(w)&65535)+(v.i(w)&65535),u=(k>>>16)+(this.i(w)>>>16)+(v.i(w)>>>16);b=u>>>16,k&=65535,u&=65535,f[w]=u<<16|k}return new l(f,f[f.length-1]&-2147483648?-1:0)};function z(v,y){return v.add(A(y))}n.j=function(v){if(D(this)||D(v))return T;if(S(this))return S(v)?A(this).j(A(v)):A(A(this).j(v));if(S(v))return A(this.j(A(v)));if(this.l(O)<0&&v.l(O)<0)return h(this.m()*v.m());const y=this.g.length+v.g.length,f=[];for(var b=0;b<2*y;b++)f[b]=0;for(b=0;b<this.g.length;b++)for(let w=0;w<v.g.length;w++){const k=this.i(b)>>>16,u=this.i(b)&65535,M=v.i(w)>>>16,Y=v.i(w)&65535;f[2*b+2*w]+=u*Y,C(f,2*b+2*w),f[2*b+2*w+1]+=k*Y,C(f,2*b+2*w+1),f[2*b+2*w+1]+=u*M,C(f,2*b+2*w+1),f[2*b+2*w+2]+=k*M,C(f,2*b+2*w+2)}for(v=0;v<y;v++)f[v]=f[2*v+1]<<16|f[2*v];for(v=y;v<2*y;v++)f[v]=0;return new l(f,0)};function C(v,y){for(;(v[y]&65535)!=v[y];)v[y+1]+=v[y]>>>16,v[y]&=65535,y++}function R(v,y){this.g=v,this.h=y}function K(v,y){if(D(y))throw Error("division by zero");if(D(v))return new R(T,T);if(S(v))return y=K(A(v),y),new R(A(y.g),A(y.h));if(S(y))return y=K(v,A(y)),new R(A(y.g),y.h);if(v.g.length>30){if(S(v)||S(y))throw Error("slowDivide_ only works with positive integers.");for(var f=x,b=y;b.l(v)<=0;)f=F(f),b=F(b);var w=G(f,1),k=G(b,1);for(b=G(b,2),f=G(f,2);!D(b);){var u=k.add(b);u.l(v)<=0&&(w=w.add(f),k=u),b=G(b,1),f=G(f,1)}return y=z(v,w.j(y)),new R(w,y)}for(w=T;v.l(y)>=0;){for(f=Math.max(1,Math.floor(v.m()/y.m())),b=Math.ceil(Math.log(f)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),k=h(f),u=k.j(y);S(u)||u.l(v)>0;)f-=b,k=h(f),u=k.j(y);D(k)&&(k=x),w=w.add(k),v=z(v,u)}return new R(w,v)}n.B=function(v){return K(this,v).h},n.and=function(v){const y=Math.max(this.g.length,v.g.length),f=[];for(let b=0;b<y;b++)f[b]=this.i(b)&v.i(b);return new l(f,this.h&v.h)},n.or=function(v){const y=Math.max(this.g.length,v.g.length),f=[];for(let b=0;b<y;b++)f[b]=this.i(b)|v.i(b);return new l(f,this.h|v.h)},n.xor=function(v){const y=Math.max(this.g.length,v.g.length),f=[];for(let b=0;b<y;b++)f[b]=this.i(b)^v.i(b);return new l(f,this.h^v.h)};function F(v){const y=v.g.length+1,f=[];for(let b=0;b<y;b++)f[b]=v.i(b)<<1|v.i(b-1)>>>31;return new l(f,v.h)}function G(v,y){const f=y>>5;y%=32;const b=v.g.length-f,w=[];for(let k=0;k<b;k++)w[k]=y>0?v.i(k+f)>>>y|v.i(k+f+1)<<32-y:v.i(k+f);return new l(w,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.B,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=h,l.fromString=_,Zi=l}).apply(typeof So<"u"?So:typeof self<"u"?self:typeof window<"u"?window:{});var vr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Na,Mn,Oa,kr,Mi,Ba,$a,Fa;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof vr=="object"&&vr];for(var a=0;a<i.length;++a){var c=i[a];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function s(i,a){if(a)t:{var c=r;i=i.split(".");for(var m=0;m<i.length-1;m++){var P=i[m];if(!(P in c))break t;c=c[P]}i=i[i.length-1],m=c[i],a=a(m),a!=m&&a!=null&&t(c,i,{configurable:!0,writable:!0,value:a})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(a){var c=[],m;for(m in a)Object.prototype.hasOwnProperty.call(a,m)&&c.push([m,a[m]]);return c}});var o=o||{},l=this||self;function d(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function p(i,a,c){return i.call.apply(i.bind,arguments)}function h(i,a,c){return h=p,h.apply(null,arguments)}function _(i,a){var c=Array.prototype.slice.call(arguments,1);return function(){var m=c.slice();return m.push.apply(m,arguments),i.apply(this,m)}}function T(i,a){function c(){}c.prototype=a.prototype,i.Z=a.prototype,i.prototype=new c,i.prototype.constructor=i,i.Ob=function(m,P,N){for(var X=Array(arguments.length-2),at=2;at<arguments.length;at++)X[at-2]=arguments[at];return a.prototype[P].apply(m,X)}}var x=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function O(i){const a=i.length;if(a>0){const c=Array(a);for(let m=0;m<a;m++)c[m]=i[m];return c}return[]}function D(i,a){for(let m=1;m<arguments.length;m++){const P=arguments[m];var c=typeof P;if(c=c!="object"?c:P?Array.isArray(P)?"array":c:"null",c=="array"||c=="object"&&typeof P.length=="number"){c=i.length||0;const N=P.length||0;i.length=c+N;for(let X=0;X<N;X++)i[c+X]=P[X]}else i.push(P)}}class S{constructor(a,c){this.i=a,this.j=c,this.h=0,this.g=null}get(){let a;return this.h>0?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function A(i){l.setTimeout(()=>{throw i},0)}function z(){var i=v;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class C{constructor(){this.h=this.g=null}add(a,c){const m=R.get();m.set(a,c),this.h?this.h.next=m:this.g=m,this.h=m}}var R=new S(()=>new K,i=>i.reset());class K{constructor(){this.next=this.g=this.h=null}set(a,c){this.h=a,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let F,G=!1,v=new C,y=()=>{const i=Promise.resolve(void 0);F=()=>{i.then(f)}};function f(){for(var i;i=z();){try{i.h.call(i.g)}catch(c){A(c)}var a=R;a.j(i),a.h<100&&(a.h++,i.next=a.g,a.g=i)}G=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var k=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};l.addEventListener("test",c,a),l.removeEventListener("test",c,a)}catch{}return i})();function u(i){return/^[\s\xa0]*$/.test(i)}function M(i,a){w.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,a)}T(M,w),M.prototype.init=function(i,a){const c=this.type=i.type,m=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget,a||(c=="mouseover"?a=i.fromElement:c=="mouseout"&&(a=i.toElement)),this.relatedTarget=a,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&M.Z.h.call(this)},M.prototype.h=function(){M.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Y="closure_listenable_"+(Math.random()*1e6|0),V=0;function g(i,a,c,m,P){this.listener=i,this.proxy=null,this.src=a,this.type=c,this.capture=!!m,this.ha=P,this.key=++V,this.da=this.fa=!1}function I(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function $(i,a,c){for(const m in i)a.call(c,i[m],m,i)}function U(i,a){for(const c in i)a.call(void 0,i[c],c,i)}function L(i){const a={};for(const c in i)a[c]=i[c];return a}const B="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function H(i,a){let c,m;for(let P=1;P<arguments.length;P++){m=arguments[P];for(c in m)i[c]=m[c];for(let N=0;N<B.length;N++)c=B[N],Object.prototype.hasOwnProperty.call(m,c)&&(i[c]=m[c])}}function q(i){this.src=i,this.g={},this.h=0}q.prototype.add=function(i,a,c,m,P){const N=i.toString();i=this.g[N],i||(i=this.g[N]=[],this.h++);const X=J(i,a,m,P);return X>-1?(a=i[X],c||(a.fa=!1)):(a=new g(a,this.src,N,!!m,P),a.fa=c,i.push(a)),a};function Q(i,a){const c=a.type;if(c in i.g){var m=i.g[c],P=Array.prototype.indexOf.call(m,a,void 0),N;(N=P>=0)&&Array.prototype.splice.call(m,P,1),N&&(I(a),i.g[c].length==0&&(delete i.g[c],i.h--))}}function J(i,a,c,m){for(let P=0;P<i.length;++P){const N=i[P];if(!N.da&&N.listener==a&&N.capture==!!c&&N.ha==m)return P}return-1}var et="closure_lm_"+(Math.random()*1e6|0),Z={};function rt(i,a,c,m,P){if(Array.isArray(a)){for(let N=0;N<a.length;N++)rt(i,a[N],c,m,P);return null}return c=gt(c),i&&i[Y]?i.J(a,c,d(m)?!!m.capture:!1,P):st(i,a,c,!1,m,P)}function st(i,a,c,m,P,N){if(!a)throw Error("Invalid event type");const X=d(P)?!!P.capture:!!P;let at=qt(i);if(at||(i[et]=at=new q(i)),c=at.add(a,c,m,X,N),c.proxy)return c;if(m=ht(),c.proxy=m,m.src=i,m.listener=c,i.addEventListener)k||(P=X),P===void 0&&(P=!1),i.addEventListener(a.toString(),m,P);else if(i.attachEvent)i.attachEvent(te(a.toString()),m);else if(i.addListener&&i.removeListener)i.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return c}function ht(){function i(c){return a.call(i.src,i.listener,c)}const a=Mt;return i}function vt(i,a,c,m,P){if(Array.isArray(a))for(var N=0;N<a.length;N++)vt(i,a[N],c,m,P);else m=d(m)?!!m.capture:!!m,c=gt(c),i&&i[Y]?(i=i.i,N=String(a).toString(),N in i.g&&(a=i.g[N],c=J(a,c,m,P),c>-1&&(I(a[c]),Array.prototype.splice.call(a,c,1),a.length==0&&(delete i.g[N],i.h--)))):i&&(i=qt(i))&&(a=i.g[a.toString()],i=-1,a&&(i=J(a,c,m,P)),(c=i>-1?a[i]:null)&&wt(c))}function wt(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[Y])Q(a.i,i);else{var c=i.type,m=i.proxy;a.removeEventListener?a.removeEventListener(c,m,i.capture):a.detachEvent?a.detachEvent(te(c),m):a.addListener&&a.removeListener&&a.removeListener(m),(c=qt(a))?(Q(c,i),c.h==0&&(c.src=null,a[et]=null)):I(i)}}}function te(i){return i in Z?Z[i]:Z[i]="on"+i}function Mt(i,a){if(i.da)i=!0;else{a=new M(a,this);const c=i.listener,m=i.ha||i.src;i.fa&&wt(i),i=c.call(m,a)}return i}function qt(i){return i=i[et],i instanceof q?i:null}var Yt="__closure_events_fn_"+(Math.random()*1e9>>>0);function gt(i){return typeof i=="function"?i:(i[Yt]||(i[Yt]=function(a){return i.handleEvent(a)}),i[Yt])}function it(){b.call(this),this.i=new q(this),this.M=this,this.G=null}T(it,b),it.prototype[Y]=!0,it.prototype.removeEventListener=function(i,a,c,m){vt(this,i,a,c,m)};function ot(i,a){var c,m=i.G;if(m)for(c=[];m;m=m.G)c.push(m);if(i=i.M,m=a.type||a,typeof a=="string")a=new w(a,i);else if(a instanceof w)a.target=a.target||i;else{var P=a;a=new w(m,i),H(a,P)}P=!0;let N,X;if(c)for(X=c.length-1;X>=0;X--)N=a.g=c[X],P=ft(N,m,!0,a)&&P;if(N=a.g=i,P=ft(N,m,!0,a)&&P,P=ft(N,m,!1,a)&&P,c)for(X=0;X<c.length;X++)N=a.g=c[X],P=ft(N,m,!1,a)&&P}it.prototype.N=function(){if(it.Z.N.call(this),this.i){var i=this.i;for(const a in i.g){const c=i.g[a];for(let m=0;m<c.length;m++)I(c[m]);delete i.g[a],i.h--}}this.G=null},it.prototype.J=function(i,a,c,m){return this.i.add(String(i),a,!1,c,m)},it.prototype.K=function(i,a,c,m){return this.i.add(String(i),a,!0,c,m)};function ft(i,a,c,m){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();let P=!0;for(let N=0;N<a.length;++N){const X=a[N];if(X&&!X.da&&X.capture==c){const at=X.listener,Dt=X.ha||X.src;X.fa&&Q(i.i,X),P=at.call(Dt,m)!==!1&&P}}return P&&!m.defaultPrevented}function dt(i,a){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=h(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(a)>2147483647?-1:l.setTimeout(i,a||0)}function yt(i){i.g=dt(()=>{i.g=null,i.i&&(i.i=!1,yt(i))},i.l);const a=i.h;i.h=null,i.m.apply(null,a)}class Kt extends b{constructor(a,c){super(),this.m=a,this.l=c,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:yt(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Et(i){b.call(this),this.h=i,this.g={}}T(Et,b);var We=[];function mn(i){$(i.g,function(a,c){this.g.hasOwnProperty(c)&&wt(a)},i),i.g={}}Et.prototype.N=function(){Et.Z.N.call(this),mn(this)},Et.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Se=l.JSON.stringify,rr=l.JSON.parse,ir=class{stringify(i){return l.JSON.stringify(i,void 0)}parse(i){return l.JSON.parse(i,void 0)}};function ni(){}function ks(){}var gn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ri(){w.call(this,"d")}T(ri,w);function ii(){w.call(this,"c")}T(ii,w);var Re={},Cs=null;function sr(){return Cs=Cs||new it}Re.Ia="serverreachability";function As(i){w.call(this,Re.Ia,i)}T(As,w);function yn(i){const a=sr();ot(a,new As(a))}Re.STAT_EVENT="statevent";function Ss(i,a){w.call(this,Re.STAT_EVENT,i),this.stat=a}T(Ss,w);function Qt(i){const a=sr();ot(a,new Ss(a,i))}Re.Ja="timingevent";function Rs(i,a){w.call(this,Re.Ja,i),this.size=a}T(Rs,w);function vn(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){i()},a)}function bn(){this.g=!0}bn.prototype.ua=function(){this.g=!1};function ql(i,a,c,m,P,N){i.info(function(){if(i.g)if(N){var X="",at=N.split("&");for(let bt=0;bt<at.length;bt++){var Dt=at[bt].split("=");if(Dt.length>1){const Vt=Dt[0];Dt=Dt[1];const ae=Vt.split("_");X=ae.length>=2&&ae[1]=="type"?X+(Vt+"="+Dt+"&"):X+(Vt+"=redacted&")}}}else X=null;else X=N;return"XMLHTTP REQ ("+m+") [attempt "+P+"]: "+a+`
`+c+`
`+X})}function jl(i,a,c,m,P,N,X){i.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+P+"]: "+a+`
`+c+`
`+N+" "+X})}function Ke(i,a,c,m){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+Gl(i,c)+(m?" "+m:"")})}function Hl(i,a){i.info(function(){return"TIMEOUT: "+a})}bn.prototype.info=function(){};function Gl(i,a){if(!i.g)return a;if(!a)return null;try{const N=JSON.parse(a);if(N){for(i=0;i<N.length;i++)if(Array.isArray(N[i])){var c=N[i];if(!(c.length<2)){var m=c[1];if(Array.isArray(m)&&!(m.length<1)){var P=m[0];if(P!="noop"&&P!="stop"&&P!="close")for(let X=1;X<m.length;X++)m[X]=""}}}}return Se(N)}catch{return a}}var or={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ps={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ls;function si(){}T(si,ni),si.prototype.g=function(){return new XMLHttpRequest},Ls=new si;function xn(i){return encodeURIComponent(String(i))}function Wl(i){var a=1;i=i.split(":");const c=[];for(;a>0&&i.length;)c.push(i.shift()),a--;return i.length&&c.push(i.join(":")),c}function ge(i,a,c,m){this.j=i,this.i=a,this.l=c,this.S=m||1,this.V=new Et(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ds}function Ds(){this.i=null,this.g="",this.h=!1}var Ms={},oi={};function ai(i,a,c){i.M=1,i.A=lr(oe(a)),i.u=c,i.R=!0,Vs(i,null)}function Vs(i,a){i.F=Date.now(),ar(i),i.B=oe(i.A);var c=i.B,m=i.S;Array.isArray(m)||(m=[String(m)]),Ks(c.i,"t",m),i.C=0,c=i.j.L,i.h=new Ds,i.g=ho(i.j,c?a:null,!i.u),i.P>0&&(i.O=new Kt(h(i.Y,i,i.g),i.P)),a=i.V,c=i.g,m=i.ba;var P="readystatechange";Array.isArray(P)||(P&&(We[0]=P.toString()),P=We);for(let N=0;N<P.length;N++){const X=rt(c,P[N],m||a.handleEvent,!1,a.h||a);if(!X)break;a.g[X.key]=X}a=i.J?L(i.J):{},i.u?(i.v||(i.v="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,a)):(i.v="GET",i.g.ea(i.B,i.v,null,a)),yn(),ql(i.i,i.v,i.B,i.l,i.S,i.u)}ge.prototype.ba=function(i){i=i.target;const a=this.O;a&&be(i)==3?a.j():this.Y(i)},ge.prototype.Y=function(i){try{if(i==this.g)t:{const at=be(this.g),Dt=this.g.ya(),bt=this.g.ca();if(!(at<3)&&(at!=3||this.g&&(this.h.h||this.g.la()||eo(this.g)))){this.K||at!=4||Dt==7||(Dt==8||bt<=0?yn(3):yn(2)),li(this);var a=this.g.ca();this.X=a;var c=Kl(this);if(this.o=a==200,jl(this.i,this.v,this.B,this.l,this.S,at,a),this.o){if(this.U&&!this.L){e:{if(this.g){var m,P=this.g;if((m=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!u(m)){var N=m;break e}}N=null}if(i=N)Ke(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ci(this,i);else{this.o=!1,this.m=3,Qt(12),Pe(this),_n(this);break t}}if(this.R){i=!0;let Vt;for(;!this.K&&this.C<c.length;)if(Vt=Ql(this,c),Vt==oi){at==4&&(this.m=4,Qt(14),i=!1),Ke(this.i,this.l,null,"[Incomplete Response]");break}else if(Vt==Ms){this.m=4,Qt(15),Ke(this.i,this.l,c,"[Invalid Chunk]"),i=!1;break}else Ke(this.i,this.l,Vt,null),ci(this,Vt);if(Ns(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),at!=4||c.length!=0||this.h.h||(this.m=1,Qt(16),i=!1),this.o=this.o&&i,!i)Ke(this.i,this.l,c,"[Invalid Chunked Response]"),Pe(this),_n(this);else if(c.length>0&&!this.W){this.W=!0;var X=this.j;X.g==this&&X.aa&&!X.P&&(X.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),yi(X),X.P=!0,Qt(11))}}else Ke(this.i,this.l,c,null),ci(this,c);at==4&&Pe(this),this.o&&!this.K&&(at==4?lo(this.j,this):(this.o=!1,ar(this)))}else cc(this.g),a==400&&c.indexOf("Unknown SID")>0?(this.m=3,Qt(12)):(this.m=0,Qt(13)),Pe(this),_n(this)}}}catch{}};function Kl(i){if(!Ns(i))return i.g.la();const a=eo(i.g);if(a==="")return"";let c="";const m=a.length,P=be(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return Pe(i),_n(i),"";i.h.i=new l.TextDecoder}for(let N=0;N<m;N++)i.h.h=!0,c+=i.h.i.decode(a[N],{stream:!(P&&N==m-1)});return a.length=0,i.h.g+=c,i.C=0,i.h.g}function Ns(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Ql(i,a){var c=i.C,m=a.indexOf(`
`,c);return m==-1?oi:(c=Number(a.substring(c,m)),isNaN(c)?Ms:(m+=1,m+c>a.length?oi:(a=a.slice(m,m+c),i.C=m+c,a)))}ge.prototype.cancel=function(){this.K=!0,Pe(this)};function ar(i){i.T=Date.now()+i.H,Os(i,i.H)}function Os(i,a){if(i.D!=null)throw Error("WatchDog timer not null");i.D=vn(h(i.aa,i),a)}function li(i){i.D&&(l.clearTimeout(i.D),i.D=null)}ge.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Hl(this.i,this.B),this.M!=2&&(yn(),Qt(17)),Pe(this),this.m=2,_n(this)):Os(this,this.T-i)};function _n(i){i.j.I==0||i.K||lo(i.j,i)}function Pe(i){li(i);var a=i.O;a&&typeof a.dispose=="function"&&a.dispose(),i.O=null,mn(i.V),i.g&&(a=i.g,i.g=null,a.abort(),a.dispose())}function ci(i,a){try{var c=i.j;if(c.I!=0&&(c.g==i||di(c.h,i))){if(!i.L&&di(c.h,i)&&c.I==3){try{var m=c.Ba.g.parse(a)}catch{m=null}if(Array.isArray(m)&&m.length==3){var P=m;if(P[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<i.F)hr(c),ur(c);else break t;gi(c),Qt(18)}}else c.xa=P[1],0<c.xa-c.K&&P[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=vn(h(c.Va,c),6e3));Fs(c.h)<=1&&c.ta&&(c.ta=void 0)}else De(c,11)}else if((i.L||c.g==i)&&hr(c),!u(a))for(P=c.Ba.g.parse(a),a=0;a<P.length;a++){let bt=P[a];const Vt=bt[0];if(!(Vt<=c.K))if(c.K=Vt,bt=bt[1],c.I==2)if(bt[0]=="c"){c.M=bt[1],c.ba=bt[2];const ae=bt[3];ae!=null&&(c.ka=ae,c.j.info("VER="+c.ka));const Me=bt[4];Me!=null&&(c.za=Me,c.j.info("SVER="+c.za));const xe=bt[5];xe!=null&&typeof xe=="number"&&xe>0&&(m=1.5*xe,c.O=m,c.j.info("backChannelRequestTimeoutMs_="+m)),m=c;const _e=i.g;if(_e){const mr=_e.g?_e.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(mr){var N=m.h;N.g||mr.indexOf("spdy")==-1&&mr.indexOf("quic")==-1&&mr.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(ui(N,N.h),N.h=null))}if(m.G){const vi=_e.g?_e.g.getResponseHeader("X-HTTP-Session-Id"):null;vi&&(m.wa=vi,_t(m.J,m.G,vi))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-i.F,c.j.info("Handshake RTT: "+c.T+"ms")),m=c;var X=i;if(m.na=po(m,m.L?m.ba:null,m.W),X.L){Us(m.h,X);var at=X,Dt=m.O;Dt&&(at.H=Dt),at.D&&(li(at),ar(at)),m.g=X}else oo(m);c.i.length>0&&pr(c)}else bt[0]!="stop"&&bt[0]!="close"||De(c,7);else c.I==3&&(bt[0]=="stop"||bt[0]=="close"?bt[0]=="stop"?De(c,7):mi(c):bt[0]!="noop"&&c.l&&c.l.qa(bt),c.A=0)}}yn(4)}catch{}}var Yl=class{constructor(i,a){this.g=i,this.map=a}};function Bs(i){this.l=i||10,l.PerformanceNavigationTiming?(i=l.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function $s(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Fs(i){return i.h?1:i.g?i.g.size:0}function di(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function ui(i,a){i.g?i.g.add(a):i.h=a}function Us(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}Bs.prototype.cancel=function(){if(this.i=zs(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function zs(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let a=i.i;for(const c of i.g.values())a=a.concat(c.G);return a}return O(i.i)}var qs=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xl(i,a){if(i){i=i.split("&");for(let c=0;c<i.length;c++){const m=i[c].indexOf("=");let P,N=null;m>=0?(P=i[c].substring(0,m),N=i[c].substring(m+1)):P=i[c],a(P,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function ye(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let a;i instanceof ye?(this.l=i.l,wn(this,i.j),this.o=i.o,this.g=i.g,En(this,i.u),this.h=i.h,pi(this,Qs(i.i)),this.m=i.m):i&&(a=String(i).match(qs))?(this.l=!1,wn(this,a[1]||"",!0),this.o=Tn(a[2]||""),this.g=Tn(a[3]||"",!0),En(this,a[4]),this.h=Tn(a[5]||"",!0),pi(this,a[6]||"",!0),this.m=Tn(a[7]||"")):(this.l=!1,this.i=new kn(null,this.l))}ye.prototype.toString=function(){const i=[];var a=this.j;a&&i.push(In(a,js,!0),":");var c=this.g;return(c||a=="file")&&(i.push("//"),(a=this.o)&&i.push(In(a,js,!0),"@"),i.push(xn(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&i.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(In(c,c.charAt(0)=="/"?tc:Zl,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",In(c,nc)),i.join("")},ye.prototype.resolve=function(i){const a=oe(this);let c=!!i.j;c?wn(a,i.j):c=!!i.o,c?a.o=i.o:c=!!i.g,c?a.g=i.g:c=i.u!=null;var m=i.h;if(c)En(a,i.u);else if(c=!!i.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var P=a.h.lastIndexOf("/");P!=-1&&(m=a.h.slice(0,P+1)+m)}if(P=m,P==".."||P==".")m="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){m=P.lastIndexOf("/",0)==0,P=P.split("/");const N=[];for(let X=0;X<P.length;){const at=P[X++];at=="."?m&&X==P.length&&N.push(""):at==".."?((N.length>1||N.length==1&&N[0]!="")&&N.pop(),m&&X==P.length&&N.push("")):(N.push(at),m=!0)}m=N.join("/")}else m=P}return c?a.h=m:c=i.i.toString()!=="",c?pi(a,Qs(i.i)):c=!!i.m,c&&(a.m=i.m),a};function oe(i){return new ye(i)}function wn(i,a,c){i.j=c?Tn(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function En(i,a){if(a){if(a=Number(a),isNaN(a)||a<0)throw Error("Bad port number "+a);i.u=a}else i.u=null}function pi(i,a,c){a instanceof kn?(i.i=a,rc(i.i,i.l)):(c||(a=In(a,ec)),i.i=new kn(a,i.l))}function _t(i,a,c){i.i.set(a,c)}function lr(i){return _t(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function Tn(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function In(i,a,c){return typeof i=="string"?(i=encodeURI(i).replace(a,Jl),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Jl(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var js=/[#\/\?@]/g,Zl=/[#\?:]/g,tc=/[#\?]/g,ec=/[#\?@]/g,nc=/#/g;function kn(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function Le(i){i.g||(i.g=new Map,i.h=0,i.i&&Xl(i.i,function(a,c){i.add(decodeURIComponent(a.replace(/\+/g," ")),c)}))}n=kn.prototype,n.add=function(i,a){Le(this),this.i=null,i=Qe(this,i);let c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(a),this.h+=1,this};function Hs(i,a){Le(i),a=Qe(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function Gs(i,a){return Le(i),a=Qe(i,a),i.g.has(a)}n.forEach=function(i,a){Le(this),this.g.forEach(function(c,m){c.forEach(function(P){i.call(a,P,m,this)},this)},this)};function Ws(i,a){Le(i);let c=[];if(typeof a=="string")Gs(i,a)&&(c=c.concat(i.g.get(Qe(i,a))));else for(i=Array.from(i.g.values()),a=0;a<i.length;a++)c=c.concat(i[a]);return c}n.set=function(i,a){return Le(this),this.i=null,i=Qe(this,i),Gs(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},n.get=function(i,a){return i?(i=Ws(this,i),i.length>0?String(i[0]):a):a};function Ks(i,a,c){Hs(i,a),c.length>0&&(i.i=null,i.g.set(Qe(i,a),O(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],a=Array.from(this.g.keys());for(let m=0;m<a.length;m++){var c=a[m];const P=xn(c);c=Ws(this,c);for(let N=0;N<c.length;N++){let X=P;c[N]!==""&&(X+="="+xn(c[N])),i.push(X)}}return this.i=i.join("&")};function Qs(i){const a=new kn;return a.i=i.i,i.g&&(a.g=new Map(i.g),a.h=i.h),a}function Qe(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function rc(i,a){a&&!i.j&&(Le(i),i.i=null,i.g.forEach(function(c,m){const P=m.toLowerCase();m!=P&&(Hs(this,m),Ks(this,P,c))},i)),i.j=a}function ic(i,a){const c=new bn;if(l.Image){const m=new Image;m.onload=_(ve,c,"TestLoadImage: loaded",!0,a,m),m.onerror=_(ve,c,"TestLoadImage: error",!1,a,m),m.onabort=_(ve,c,"TestLoadImage: abort",!1,a,m),m.ontimeout=_(ve,c,"TestLoadImage: timeout",!1,a,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=i}else a(!1)}function sc(i,a){const c=new bn,m=new AbortController,P=setTimeout(()=>{m.abort(),ve(c,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:m.signal}).then(N=>{clearTimeout(P),N.ok?ve(c,"TestPingServer: ok",!0,a):ve(c,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(P),ve(c,"TestPingServer: error",!1,a)})}function ve(i,a,c,m,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),m(c)}catch{}}function oc(){this.g=new ir}function hi(i){this.i=i.Sb||null,this.h=i.ab||!1}T(hi,ni),hi.prototype.g=function(){return new cr(this.i,this.h)};function cr(i,a){it.call(this),this.H=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}T(cr,it),n=cr.prototype,n.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=a,this.readyState=1,An(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const a={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(a.body=i),(this.H||l).fetch(new Request(this.D,a)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Cn(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,An(this)),this.g&&(this.readyState=3,An(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ys(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ys(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.B.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?Cn(this):An(this),this.readyState==3&&Ys(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,Cn(this))},n.Na=function(i){this.g&&(this.response=i,Cn(this))},n.ga=function(){this.g&&Cn(this)};function Cn(i){i.readyState=4,i.l=null,i.j=null,i.B=null,An(i)}n.setRequestHeader=function(i,a){this.A.append(i,a)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],a=this.h.entries();for(var c=a.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=a.next();return i.join(`\r
`)};function An(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(cr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Xs(i){let a="";return $(i,function(c,m){a+=m,a+=":",a+=c,a+=`\r
`}),a}function fi(i,a,c){t:{for(m in c){var m=!1;break t}m=!0}m||(c=Xs(c),typeof i=="string"?c!=null&&xn(c):_t(i,a,c))}function kt(i){it.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}T(kt,it);var ac=/^https?$/i,lc=["POST","PUT"];n=kt.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,a,c,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ls.g(),this.g.onreadystatechange=x(h(this.Ca,this));try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(N){Js(this,N);return}if(i=c||"",c=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var P in m)c.set(P,m[P]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const N of m.keys())c.set(N,m.get(N));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(c.keys()).find(N=>N.toLowerCase()=="content-type"),P=l.FormData&&i instanceof l.FormData,!(Array.prototype.indexOf.call(lc,a,void 0)>=0)||m||P||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,X]of c)this.g.setRequestHeader(N,X);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(N){Js(this,N)}};function Js(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.o=5,Zs(i),dr(i)}function Zs(i){i.A||(i.A=!0,ot(i,"complete"),ot(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,ot(this,"complete"),ot(this,"abort"),dr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),dr(this,!0)),kt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?to(this):this.Xa())},n.Xa=function(){to(this)};function to(i){if(i.h&&typeof o<"u"){if(i.v&&be(i)==4)setTimeout(i.Ca.bind(i),0);else if(ot(i,"readystatechange"),be(i)==4){i.h=!1;try{const N=i.ca();t:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var c;if(!(c=a)){var m;if(m=N===0){let X=String(i.D).match(qs)[1]||null;!X&&l.self&&l.self.location&&(X=l.self.location.protocol.slice(0,-1)),m=!ac.test(X?X.toLowerCase():"")}c=m}if(c)ot(i,"complete"),ot(i,"success");else{i.o=6;try{var P=be(i)>2?i.g.statusText:""}catch{P=""}i.l=P+" ["+i.ca()+"]",Zs(i)}}finally{dr(i)}}}}function dr(i,a){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const c=i.g;i.g=null,a||ot(i,"ready");try{c.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function be(i){return i.g?i.g.readyState:0}n.ca=function(){try{return be(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),rr(a)}};function eo(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function cc(i){const a={};i=(i.g&&be(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<i.length;m++){if(u(i[m]))continue;var c=Wl(i[m]);const P=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const N=a[P]||[];a[P]=N,N.push(c)}U(a,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Sn(i,a,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||a}function no(i){this.za=0,this.i=[],this.j=new bn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Sn("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Sn("baseRetryDelayMs",5e3,i),this.Za=Sn("retryDelaySeedMs",1e4,i),this.Ta=Sn("forwardChannelMaxRetries",2,i),this.va=Sn("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new Bs(i&&i.concurrentRequestLimit),this.Ba=new oc,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=no.prototype,n.ka=8,n.I=1,n.connect=function(i,a,c,m){Qt(0),this.W=i,this.H=a||{},c&&m!==void 0&&(this.H.OSID=c,this.H.OAID=m),this.F=this.X,this.J=po(this,null,this.W),pr(this)};function mi(i){if(ro(i),i.I==3){var a=i.V++,c=oe(i.J);if(_t(c,"SID",i.M),_t(c,"RID",a),_t(c,"TYPE","terminate"),Rn(i,c),a=new ge(i,i.j,a),a.M=2,a.A=lr(oe(c)),c=!1,l.navigator&&l.navigator.sendBeacon)try{c=l.navigator.sendBeacon(a.A.toString(),"")}catch{}!c&&l.Image&&(new Image().src=a.A,c=!0),c||(a.g=ho(a.j,null),a.g.ea(a.A)),a.F=Date.now(),ar(a)}uo(i)}function ur(i){i.g&&(yi(i),i.g.cancel(),i.g=null)}function ro(i){ur(i),i.v&&(l.clearTimeout(i.v),i.v=null),hr(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&l.clearTimeout(i.m),i.m=null)}function pr(i){if(!$s(i.h)&&!i.m){i.m=!0;var a=i.Ea;F||y(),G||(F(),G=!0),v.add(a,i),i.D=0}}function dc(i,a){return Fs(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=a.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=vn(h(i.Ea,i,a),co(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const P=new ge(this,this.j,i);let N=this.o;if(this.U&&(N?(N=L(N),H(N,this.U)):N=this.U),this.u!==null||this.R||(P.J=N,N=null),this.S)t:{for(var a=0,c=0;c<this.i.length;c++){e:{var m=this.i[c];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(a+=m,a>4096){a=c;break t}if(a===4096||c===this.i.length-1){a=c+1;break t}}a=1e3}else a=1e3;a=so(this,P,a),c=oe(this.J),_t(c,"RID",i),_t(c,"CVER",22),this.G&&_t(c,"X-HTTP-Session-Id",this.G),Rn(this,c),N&&(this.R?a="headers="+xn(Xs(N))+"&"+a:this.u&&fi(c,this.u,N)),ui(this.h,P),this.Ra&&_t(c,"TYPE","init"),this.S?(_t(c,"$req",a),_t(c,"SID","null"),P.U=!0,ai(P,c,null)):ai(P,c,a),this.I=2}}else this.I==3&&(i?io(this,i):this.i.length==0||$s(this.h)||io(this))};function io(i,a){var c;a?c=a.l:c=i.V++;const m=oe(i.J);_t(m,"SID",i.M),_t(m,"RID",c),_t(m,"AID",i.K),Rn(i,m),i.u&&i.o&&fi(m,i.u,i.o),c=new ge(i,i.j,c,i.D+1),i.u===null&&(c.J=i.o),a&&(i.i=a.G.concat(i.i)),a=so(i,c,1e3),c.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),ui(i.h,c),ai(c,m,a)}function Rn(i,a){i.H&&$(i.H,function(c,m){_t(a,m,c)}),i.l&&$({},function(c,m){_t(a,m,c)})}function so(i,a,c){c=Math.min(i.i.length,c);const m=i.l?h(i.l.Ka,i.l,i):null;t:{var P=i.i;let at=-1;for(;;){const Dt=["count="+c];at==-1?c>0?(at=P[0].g,Dt.push("ofs="+at)):at=0:Dt.push("ofs="+at);let bt=!0;for(let Vt=0;Vt<c;Vt++){var N=P[Vt].g;const ae=P[Vt].map;if(N-=at,N<0)at=Math.max(0,P[Vt].g-100),bt=!1;else try{N="req"+N+"_"||"";try{var X=ae instanceof Map?ae:Object.entries(ae);for(const[Me,xe]of X){let _e=xe;d(xe)&&(_e=Se(xe)),Dt.push(N+Me+"="+encodeURIComponent(_e))}}catch(Me){throw Dt.push(N+"type="+encodeURIComponent("_badmap")),Me}}catch{m&&m(ae)}}if(bt){X=Dt.join("&");break t}}X=void 0}return i=i.i.splice(0,c),a.G=i,X}function oo(i){if(!i.g&&!i.v){i.Y=1;var a=i.Da;F||y(),G||(F(),G=!0),v.add(a,i),i.A=0}}function gi(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=vn(h(i.Da,i),co(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,ao(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=vn(h(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Qt(10),ur(this),ao(this))};function yi(i){i.B!=null&&(l.clearTimeout(i.B),i.B=null)}function ao(i){i.g=new ge(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var a=oe(i.na);_t(a,"RID","rpc"),_t(a,"SID",i.M),_t(a,"AID",i.K),_t(a,"CI",i.F?"0":"1"),!i.F&&i.ia&&_t(a,"TO",i.ia),_t(a,"TYPE","xmlhttp"),Rn(i,a),i.u&&i.o&&fi(a,i.u,i.o),i.O&&(i.g.H=i.O);var c=i.g;i=i.ba,c.M=1,c.A=lr(oe(a)),c.u=null,c.R=!0,Vs(c,i)}n.Va=function(){this.C!=null&&(this.C=null,ur(this),gi(this),Qt(19))};function hr(i){i.C!=null&&(l.clearTimeout(i.C),i.C=null)}function lo(i,a){var c=null;if(i.g==a){hr(i),yi(i),i.g=null;var m=2}else if(di(i.h,a))c=a.G,Us(i.h,a),m=1;else return;if(i.I!=0){if(a.o)if(m==1){c=a.u?a.u.length:0,a=Date.now()-a.F;var P=i.D;m=sr(),ot(m,new Rs(m,c)),pr(i)}else oo(i);else if(P=a.m,P==3||P==0&&a.X>0||!(m==1&&dc(i,a)||m==2&&gi(i)))switch(c&&c.length>0&&(a=i.h,a.i=a.i.concat(c)),P){case 1:De(i,5);break;case 4:De(i,10);break;case 3:De(i,6);break;default:De(i,2)}}}function co(i,a){let c=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(c*=2),c*a}function De(i,a){if(i.j.info("Error code "+a),a==2){var c=h(i.bb,i),m=i.Ua;const P=!m;m=new ye(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||wn(m,"https"),lr(m),P?ic(m.toString(),c):sc(m.toString(),c)}else Qt(2);i.I=0,i.l&&i.l.pa(a),uo(i),ro(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Qt(2)):(this.j.info("Failed to ping google.com"),Qt(1))};function uo(i){if(i.I=0,i.ja=[],i.l){const a=zs(i.h);(a.length!=0||i.i.length!=0)&&(D(i.ja,a),D(i.ja,i.i),i.h.i.length=0,O(i.i),i.i.length=0),i.l.oa()}}function po(i,a,c){var m=c instanceof ye?oe(c):new ye(c);if(m.g!="")a&&(m.g=a+"."+m.g),En(m,m.u);else{var P=l.location;m=P.protocol,a=a?a+"."+P.hostname:P.hostname,P=+P.port;const N=new ye(null);m&&wn(N,m),a&&(N.g=a),P&&En(N,P),c&&(N.h=c),m=N}return c=i.G,a=i.wa,c&&a&&_t(m,c,a),_t(m,"VER",i.ka),Rn(i,m),m}function ho(i,a,c){if(a&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Aa&&!i.ma?new kt(new hi({ab:c})):new kt(i.ma),a.Fa(i.L),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function fo(){}n=fo.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function fr(){}fr.prototype.g=function(i,a){return new Zt(i,a)};function Zt(i,a){it.call(this),this.g=new no(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.sa&&(i?i["X-WebChannel-Client-Profile"]=a.sa:i={"X-WebChannel-Client-Profile":a.sa}),this.g.U=i,(i=a&&a.Qb)&&!u(i)&&(this.g.u=i),this.A=a&&a.supportsCrossDomainXhr||!1,this.v=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!u(a)&&(this.g.G=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new Ye(this)}T(Zt,it),Zt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Zt.prototype.close=function(){mi(this.g)},Zt.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.v&&(c={},c.__data__=Se(i),i=c);a.i.push(new Yl(a.Ya++,i)),a.I==3&&pr(a)},Zt.prototype.N=function(){this.g.l=null,delete this.j,mi(this.g),delete this.g,Zt.Z.N.call(this)};function mo(i){ri.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){t:{for(const c in a){i=c;break t}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}T(mo,ri);function go(){ii.call(this),this.status=1}T(go,ii);function Ye(i){this.g=i}T(Ye,fo),Ye.prototype.ra=function(){ot(this.g,"a")},Ye.prototype.qa=function(i){ot(this.g,new mo(i))},Ye.prototype.pa=function(i){ot(this.g,new go)},Ye.prototype.oa=function(){ot(this.g,"b")},fr.prototype.createWebChannel=fr.prototype.g,Zt.prototype.send=Zt.prototype.o,Zt.prototype.open=Zt.prototype.m,Zt.prototype.close=Zt.prototype.close,Fa=function(){return new fr},$a=function(){return sr()},Ba=Re,Mi={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},or.NO_ERROR=0,or.TIMEOUT=8,or.HTTP_ERROR=6,kr=or,Ps.COMPLETE="complete",Oa=Ps,ks.EventType=gn,gn.OPEN="a",gn.CLOSE="b",gn.ERROR="c",gn.MESSAGE="d",it.prototype.listen=it.prototype.J,Mn=ks,kt.prototype.listenOnce=kt.prototype.K,kt.prototype.getLastError=kt.prototype.Ha,kt.prototype.getLastErrorCode=kt.prototype.ya,kt.prototype.getStatus=kt.prototype.ca,kt.prototype.getResponseJson=kt.prototype.La,kt.prototype.getResponseText=kt.prototype.la,kt.prototype.send=kt.prototype.ea,kt.prototype.setWithCredentials=kt.prototype.Fa,Na=kt}).apply(typeof vr<"u"?vr:typeof self<"u"?self:typeof window<"u"?window:{});class Ht{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Ht.UNAUTHENTICATED=new Ht(null),Ht.GOOGLE_CREDENTIALS=new Ht("google-credentials-uid"),Ht.FIRST_PARTY=new Ht("first-party-uid"),Ht.MOCK_USER=new Ht("mock-user");let hn="12.8.0";function pu(n){hn=n}const Fe=new Ra("@firebase/firestore");function Je(){return Fe.logLevel}function tt(n,...t){if(Fe.logLevel<=pt.DEBUG){const e=t.map(ts);Fe.debug(`Firestore (${hn}): ${n}`,...e)}}function Ue(n,...t){if(Fe.logLevel<=pt.ERROR){const e=t.map(ts);Fe.error(`Firestore (${hn}): ${n}`,...e)}}function Kr(n,...t){if(Fe.logLevel<=pt.WARN){const e=t.map(ts);Fe.warn(`Firestore (${hn}): ${n}`,...e)}}function ts(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}function ct(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Ua(n,r,e)}function Ua(n,t,e){let r=`FIRESTORE (${hn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Ue(r),new Error(r)}function Ct(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||Ua(t,s,r)}function xt(n,t){return n}const W={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class nt extends pn{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}class Be{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}class za{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class hu{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Ht.UNAUTHENTICATED)))}shutdown(){}}class fu{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class mu{constructor(t){this.t=t,this.currentUser=Ht.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Ct(this.o===void 0,42304);let r=this.i;const s=p=>this.i!==r?(r=this.i,e(p)):Promise.resolve();let o=new Be;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Be,t.enqueueRetryable((()=>s(this.currentUser)))};const l=()=>{const p=o;t.enqueueRetryable((async()=>{await p.promise,await s(this.currentUser)}))},d=p=>{tt("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=p,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit((p=>d(p))),setTimeout((()=>{if(!this.auth){const p=this.t.getImmediate({optional:!0});p?d(p):(tt("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Be)}}),0),l()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(tt("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ct(typeof r.accessToken=="string",31837,{l:r}),new za(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Ct(t===null||typeof t=="string",2055,{h:t}),new Ht(t)}}class gu{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=Ht.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class yu{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new gu(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(Ht.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Ro{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class vu{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qd(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Ct(this.o===void 0,3512);const r=o=>{o.error!=null&&tt("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.m;return this.m=o.token,tt("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>r(o)))};const s=o=>{tt("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):tt("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Ro(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(Ct(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Ro(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function bu(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}class es{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=bu(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function mt(n,t){return n<t?-1:n>t?1:0}function Vi(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return Ei(s)===Ei(o)?mt(s,o):Ei(s)?1:-1}return mt(n.length,t.length)}const xu=55296,_u=57343;function Ei(n){const t=n.charCodeAt(0);return t>=xu&&t<=_u}function on(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}const Po="__name__";class le{constructor(t,e,r){e===void 0?e=0:e>t.length&&ct(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&ct(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return le.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof le?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=le.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return mt(t.length,e.length)}static compareSegments(t,e){const r=le.isNumericId(t),s=le.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?le.extractNumericId(t).compare(le.extractNumericId(e)):Vi(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Zi.fromString(t.substring(4,t.length-2))}}class At extends le{construct(t,e,r){return new At(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new nt(W.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new At(e)}static emptyPath(){return new At([])}}const wu=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ut extends le{construct(t,e,r){return new Ut(t,e,r)}static isValidIdentifier(t){return wu.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ut.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Po}static keyField(){return new Ut([Po])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new nt(W.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let l=!1;for(;s<t.length;){const d=t[s];if(d==="\\"){if(s+1===t.length)throw new nt(W.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const p=t[s+1];if(p!=="\\"&&p!=="."&&p!=="`")throw new nt(W.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=p,s+=2}else d==="`"?(l=!l,s++):d!=="."||l?(r+=d,s++):(o(),s++)}if(o(),l)throw new nt(W.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Ut(e)}static emptyPath(){return new Ut([])}}class lt{constructor(t){this.path=t}static fromPath(t){return new lt(At.fromString(t))}static fromName(t){return new lt(At.fromString(t).popFirst(5))}static empty(){return new lt(At.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&At.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return At.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new lt(new At(t.slice()))}}function Eu(n,t,e){if(!e)throw new nt(W.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Tu(n,t,e,r){if(t===!0&&r===!0)throw new nt(W.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Lo(n){if(!lt.isDocumentKey(n))throw new nt(W.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function qa(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ns(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":ct(12329,{type:typeof n})}function Ni(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new nt(W.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ns(n);throw new nt(W.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function Lt(n,t){const e={typeString:n};return t&&(e.value=t),e}function Xn(n,t){if(!qa(n))throw new nt(W.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const l=n[r];if(s&&typeof l!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&l!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new nt(W.INVALID_ARGUMENT,e);return!0}const Do=-62135596800,Mo=1e6;class It{static now(){return It.fromMillis(Date.now())}static fromDate(t){return It.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Mo);return new It(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new nt(W.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new nt(W.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Do)throw new nt(W.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new nt(W.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Mo}_compareTo(t){return this.seconds===t.seconds?mt(this.nanoseconds,t.nanoseconds):mt(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:It._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Xn(t,It._jsonSchema))return new It(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Do;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}It._jsonSchemaVersion="firestore/timestamp/1.0",It._jsonSchema={type:Lt("string",It._jsonSchemaVersion),seconds:Lt("number"),nanoseconds:Lt("number")};class Tt{static fromTimestamp(t){return new Tt(t)}static min(){return new Tt(new It(0,0))}static max(){return new Tt(new It(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}const jn=-1;function Iu(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=Tt.fromTimestamp(r===1e9?new It(e+1,0):new It(e,r));return new Ie(s,lt.empty(),t)}function ku(n){return new Ie(n.readTime,n.key,jn)}class Ie{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Ie(Tt.min(),lt.empty(),jn)}static max(){return new Ie(Tt.max(),lt.empty(),jn)}}function Cu(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=lt.comparator(n.documentKey,t.documentKey),e!==0?e:mt(n.largestBatchId,t.largestBatchId))}const Au="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Su{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}async function rs(n){if(n.code!==W.FAILED_PRECONDITION||n.message!==Au)throw n;tt("LocalStore","Unexpectedly lost primary lease")}class j{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&ct(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new j(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof j?e:j.resolve(e)}catch(e){return j.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):j.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):j.reject(e)}static resolve(t){return new j(((e,r)=>{e(t)}))}static reject(t){return new j(((e,r)=>{r(t)}))}static waitFor(t){return new j(((e,r)=>{let s=0,o=0,l=!1;t.forEach((d=>{++s,d.next((()=>{++o,l&&o===s&&e()}),(p=>r(p)))})),l=!0,o===s&&e()}))}static or(t){let e=j.resolve(!1);for(const r of t)e=e.next((s=>s?j.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,o)=>{r.push(e.call(this,s,o))})),this.waitFor(r)}static mapArray(t,e){return new j(((r,s)=>{const o=t.length,l=new Array(o);let d=0;for(let p=0;p<o;p++){const h=p;e(t[h]).next((_=>{l[h]=_,++d,d===o&&r(l)}),(_=>s(_)))}}))}static doWhile(t,e){return new j(((r,s)=>{const o=()=>{t()===!0?e().next((()=>{o()}),s):r()};o()}))}}function Ru(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Jn(n){return n.name==="IndexedDbTransactionError"}class is{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}is.ce=-1;const ss=-1;function os(n){return n==null}function Nr(n){return n===0&&1/n==-1/0}function Pu(n){return typeof n=="number"&&Number.isInteger(n)&&!Nr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}const ja="";function Lu(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Vo(t)),t=Du(n.get(e),t);return Vo(t)}function Du(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case ja:e+="";break;default:e+=o}}return e}function Vo(n){return n+ja+""}function No(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function fn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Ha(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}class Jt{constructor(t,e){this.comparator=t,this.root=e||Bt.EMPTY}insert(t,e){return new Jt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Bt.BLACK,null,null))}remove(t){return new Jt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Bt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new br(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new br(this.root,t,this.comparator,!1)}getReverseIterator(){return new br(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new br(this.root,t,this.comparator,!0)}}class br{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Bt{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??Bt.RED,this.left=s??Bt.EMPTY,this.right=o??Bt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new Bt(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Bt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Bt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Bt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Bt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ct(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ct(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw ct(27949);return t+(this.isRed()?0:1)}}Bt.EMPTY=null,Bt.RED=!0,Bt.BLACK=!1;Bt.EMPTY=new class{constructor(){this.size=0}get key(){throw ct(57766)}get value(){throw ct(16141)}get color(){throw ct(16727)}get left(){throw ct(29726)}get right(){throw ct(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new Bt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};class zt{constructor(t){this.comparator=t,this.data=new Jt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Oo(this.data.getIterator())}getIteratorFrom(t){return new Oo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof zt)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new zt(this.comparator);return e.data=t,e}}class Oo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}class se{constructor(t){this.fields=t,t.sort(Ut.comparator)}static empty(){return new se([])}unionWith(t){let e=new zt(Ut.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new se(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return on(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}class Mu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}class ue{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Mu("Invalid base64 string: "+o):o}})(t);return new ue(e)}static fromUint8Array(t){const e=(function(s){let o="";for(let l=0;l<s.length;++l)o+=String.fromCharCode(s[l]);return o})(t);return new ue(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return mt(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ue.EMPTY_BYTE_STRING=new ue("");const Vu=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ze(n){if(Ct(!!n,39018),typeof n=="string"){let t=0;const e=Vu.exec(n);if(Ct(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:$t(n.seconds),nanos:$t(n.nanos)}}function $t(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function an(n){return typeof n=="string"?ue.fromBase64String(n):ue.fromUint8Array(n)}const Ga="server_timestamp",Wa="__type__",Ka="__previous_value__",Qa="__local_write_time__";function as(n){return(n?.mapValue?.fields||{})[Wa]?.stringValue===Ga}function ls(n){const t=n.mapValue.fields[Ka];return as(t)?ls(t):t}function Or(n){const t=ze(n.mapValue.fields[Qa].timestampValue);return new It(t.seconds,t.nanos)}class Nu{constructor(t,e,r,s,o,l,d,p,h,_,T){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=d,this.longPollingOptions=p,this.useFetchStreams=h,this.isUsingEmulator=_,this.apiKey=T}}const Br="(default)";class $r{constructor(t,e){this.projectId=t,this.database=e||Br}static empty(){return new $r("","")}get isDefaultDatabase(){return this.database===Br}isEqual(t){return t instanceof $r&&t.projectId===this.projectId&&t.database===this.database}}function Ou(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new nt(W.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new $r(n.options.projectId,t)}const Ya="__type__",Bu="__max__",xr={mapValue:{}},Xa="__vector__",Oi="value";function qe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?as(n)?4:Fu(n)?9007199254740991:$u(n)?10:11:ct(28295,{value:n})}function pe(n,t){if(n===t)return!0;const e=qe(n);if(e!==qe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Or(n).isEqual(Or(t));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const l=ze(s.timestampValue),d=ze(o.timestampValue);return l.seconds===d.seconds&&l.nanos===d.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,o){return an(s.bytesValue).isEqual(an(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,o){return $t(s.geoPointValue.latitude)===$t(o.geoPointValue.latitude)&&$t(s.geoPointValue.longitude)===$t(o.geoPointValue.longitude)})(n,t);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return $t(s.integerValue)===$t(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const l=$t(s.doubleValue),d=$t(o.doubleValue);return l===d?Nr(l)===Nr(d):isNaN(l)&&isNaN(d)}return!1})(n,t);case 9:return on(n.arrayValue.values||[],t.arrayValue.values||[],pe);case 10:case 11:return(function(s,o){const l=s.mapValue.fields||{},d=o.mapValue.fields||{};if(No(l)!==No(d))return!1;for(const p in l)if(l.hasOwnProperty(p)&&(d[p]===void 0||!pe(l[p],d[p])))return!1;return!0})(n,t);default:return ct(52216,{left:n})}}function Hn(n,t){return(n.values||[]).find((e=>pe(e,t)))!==void 0}function ln(n,t){if(n===t)return 0;const e=qe(n),r=qe(t);if(e!==r)return mt(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return mt(n.booleanValue,t.booleanValue);case 2:return(function(o,l){const d=$t(o.integerValue||o.doubleValue),p=$t(l.integerValue||l.doubleValue);return d<p?-1:d>p?1:d===p?0:isNaN(d)?isNaN(p)?0:-1:1})(n,t);case 3:return Bo(n.timestampValue,t.timestampValue);case 4:return Bo(Or(n),Or(t));case 5:return Vi(n.stringValue,t.stringValue);case 6:return(function(o,l){const d=an(o),p=an(l);return d.compareTo(p)})(n.bytesValue,t.bytesValue);case 7:return(function(o,l){const d=o.split("/"),p=l.split("/");for(let h=0;h<d.length&&h<p.length;h++){const _=mt(d[h],p[h]);if(_!==0)return _}return mt(d.length,p.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,l){const d=mt($t(o.latitude),$t(l.latitude));return d!==0?d:mt($t(o.longitude),$t(l.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return $o(n.arrayValue,t.arrayValue);case 10:return(function(o,l){const d=o.fields||{},p=l.fields||{},h=d[Oi]?.arrayValue,_=p[Oi]?.arrayValue,T=mt(h?.values?.length||0,_?.values?.length||0);return T!==0?T:$o(h,_)})(n.mapValue,t.mapValue);case 11:return(function(o,l){if(o===xr.mapValue&&l===xr.mapValue)return 0;if(o===xr.mapValue)return 1;if(l===xr.mapValue)return-1;const d=o.fields||{},p=Object.keys(d),h=l.fields||{},_=Object.keys(h);p.sort(),_.sort();for(let T=0;T<p.length&&T<_.length;++T){const x=Vi(p[T],_[T]);if(x!==0)return x;const O=ln(d[p[T]],h[_[T]]);if(O!==0)return O}return mt(p.length,_.length)})(n.mapValue,t.mapValue);default:throw ct(23264,{he:e})}}function Bo(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return mt(n,t);const e=ze(n),r=ze(t),s=mt(e.seconds,r.seconds);return s!==0?s:mt(e.nanos,r.nanos)}function $o(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=ln(e[s],r[s]);if(o)return o}return mt(e.length,r.length)}function cn(n){return Bi(n)}function Bi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=ze(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return an(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return lt.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Bi(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const l of r)o?o=!1:s+=",",s+=`${l}:${Bi(e.fields[l])}`;return s+"}"})(n.mapValue):ct(61005,{value:n})}function Cr(n){switch(qe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=ls(n);return t?16+Cr(t):16;case 5:return 2*n.stringValue.length;case 6:return an(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,o)=>s+Cr(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return fn(r.fields,((o,l)=>{s+=o.length+Cr(l)})),s})(n.mapValue);default:throw ct(13486,{value:n})}}function $i(n){return!!n&&"integerValue"in n}function cs(n){return!!n&&"arrayValue"in n}function Ar(n){return!!n&&"mapValue"in n}function $u(n){return(n?.mapValue?.fields||{})[Ya]?.stringValue===Xa}function Nn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return fn(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=Nn(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Nn(n.arrayValue.values[e]);return t}return{...n}}function Fu(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Bu}class re{constructor(t){this.value=t}static empty(){return new re({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Ar(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Nn(e)}setAll(t){let e=Ut.emptyPath(),r={},s=[];t.forEach(((l,d)=>{if(!e.isImmediateParentOf(d)){const p=this.getFieldsMap(e);this.applyChanges(p,r,s),r={},s=[],e=d.popLast()}l?r[d.lastSegment()]=Nn(l):s.push(d.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());Ar(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return pe(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Ar(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){fn(e,((s,o)=>t[s]=o));for(const s of r)delete t[s]}clone(){return new re(Nn(this.value))}}function Ja(n){const t=[];return fn(n.fields,((e,r)=>{const s=new Ut([e]);if(Ar(r)){const o=Ja(r.mapValue).fields;if(o.length===0)t.push(s);else for(const l of o)t.push(s.child(l))}else t.push(s)})),new se(t)}class ne{constructor(t,e,r,s,o,l,d){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=l,this.documentState=d}static newInvalidDocument(t){return new ne(t,0,Tt.min(),Tt.min(),Tt.min(),re.empty(),0)}static newFoundDocument(t,e,r,s){return new ne(t,1,e,Tt.min(),r,s,0)}static newNoDocument(t,e){return new ne(t,2,e,Tt.min(),Tt.min(),re.empty(),0)}static newUnknownDocument(t,e){return new ne(t,3,e,Tt.min(),Tt.min(),re.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Tt.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=re.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Tt.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof ne&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ne(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}class Fr{constructor(t,e){this.position=t,this.inclusive=e}}function Fo(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],l=n.position[s];if(o.field.isKeyField()?r=lt.comparator(lt.fromName(l.referenceValue),e.key):r=ln(l,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Uo(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!pe(n.position[e],t.position[e]))return!1;return!0}class Ur{constructor(t,e="asc"){this.field=t,this.dir=e}}function Uu(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}class Za{}class Ot extends Za{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new qu(t,e,r):e==="array-contains"?new Gu(t,r):e==="in"?new Wu(t,r):e==="not-in"?new Ku(t,r):e==="array-contains-any"?new Qu(t,r):new Ot(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new ju(t,r):new Hu(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(ln(e,this.value)):e!==null&&qe(this.value)===qe(e)&&this.matchesComparison(ln(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return ct(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ke extends Za{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new ke(t,e)}matches(t){return tl(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function tl(n){return n.op==="and"}function el(n){return zu(n)&&tl(n)}function zu(n){for(const t of n.filters)if(t instanceof ke)return!1;return!0}function Fi(n){if(n instanceof Ot)return n.field.canonicalString()+n.op.toString()+cn(n.value);if(el(n))return n.filters.map((t=>Fi(t))).join(",");{const t=n.filters.map((e=>Fi(e))).join(",");return`${n.op}(${t})`}}function nl(n,t){return n instanceof Ot?(function(r,s){return s instanceof Ot&&r.op===s.op&&r.field.isEqual(s.field)&&pe(r.value,s.value)})(n,t):n instanceof ke?(function(r,s){return s instanceof ke&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,l,d)=>o&&nl(l,s.filters[d])),!0):!1})(n,t):void ct(19439)}function rl(n){return n instanceof Ot?(function(e){return`${e.field.canonicalString()} ${e.op} ${cn(e.value)}`})(n):n instanceof ke?(function(e){return e.op.toString()+" {"+e.getFilters().map(rl).join(" ,")+"}"})(n):"Filter"}class qu extends Ot{constructor(t,e,r){super(t,e,r),this.key=lt.fromName(r.referenceValue)}matches(t){const e=lt.comparator(t.key,this.key);return this.matchesComparison(e)}}class ju extends Ot{constructor(t,e){super(t,"in",e),this.keys=il("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Hu extends Ot{constructor(t,e){super(t,"not-in",e),this.keys=il("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function il(n,t){return(t.arrayValue?.values||[]).map((e=>lt.fromName(e.referenceValue)))}class Gu extends Ot{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return cs(e)&&Hn(e.arrayValue,this.value)}}class Wu extends Ot{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Hn(this.value.arrayValue,e)}}class Ku extends Ot{constructor(t,e){super(t,"not-in",e)}matches(t){if(Hn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Hn(this.value.arrayValue,e)}}class Qu extends Ot{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!cs(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Hn(this.value.arrayValue,r)))}}class Yu{constructor(t,e=null,r=[],s=[],o=null,l=null,d=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=l,this.endAt=d,this.Te=null}}function zo(n,t=null,e=[],r=[],s=null,o=null,l=null){return new Yu(n,t,e,r,s,o,l)}function ds(n){const t=xt(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>Fi(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),os(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>cn(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>cn(r))).join(",")),t.Te=e}return t.Te}function us(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Uu(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!nl(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Uo(n.startAt,t.startAt)&&Uo(n.endAt,t.endAt)}class Qr{constructor(t,e=null,r=[],s=[],o=null,l="F",d=null,p=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=l,this.startAt=d,this.endAt=p,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Xu(n,t,e,r,s,o,l,d){return new Qr(n,t,e,r,s,o,l,d)}function Ju(n){return new Qr(n)}function qo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Zu(n){return lt.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function tp(n){return n.collectionGroup!==null}function On(n){const t=xt(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(l){let d=new zt(Ut.comparator);return l.filters.forEach((p=>{p.getFlattenedFilters().forEach((h=>{h.isInequality()&&(d=d.add(h.field))}))})),d})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new Ur(o,r))})),e.has(Ut.keyField().canonicalString())||t.Ie.push(new Ur(Ut.keyField(),r))}return t.Ie}function $e(n){const t=xt(n);return t.Ee||(t.Ee=ep(t,On(n))),t.Ee}function ep(n,t){if(n.limitType==="F")return zo(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new Ur(s.field,o)}));const e=n.endAt?new Fr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Fr(n.startAt.position,n.startAt.inclusive):null;return zo(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ui(n,t,e){return new Qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function sl(n,t){return us($e(n),$e(t))&&n.limitType===t.limitType}function ol(n){return`${ds($e(n))}|lt:${n.limitType}`}function Ln(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>rl(s))).join(", ")}]`),os(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(l){return`${l.field.canonicalString()} (${l.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>cn(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>cn(s))).join(",")),`Target(${r})`})($e(n))}; limitType=${n.limitType})`}function ps(n,t){return t.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):lt.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,t)&&(function(r,s){for(const o of On(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(l,d,p){const h=Fo(l,d,p);return l.inclusive?h<=0:h<0})(r.startAt,On(r),s)||r.endAt&&!(function(l,d,p){const h=Fo(l,d,p);return l.inclusive?h>=0:h>0})(r.endAt,On(r),s))})(n,t)}function np(n){return(t,e)=>{let r=!1;for(const s of On(n)){const o=rp(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function rp(n,t,e){const r=n.field.isKeyField()?lt.comparator(t.key,e.key):(function(o,l,d){const p=l.data.field(o),h=d.data.field(o);return p!==null&&h!==null?ln(p,h):ct(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ct(19790,{direction:n.dir})}}class He{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){fn(this.inner,((e,r)=>{for(const[s,o]of r)t(s,o)}))}isEmpty(){return Ha(this.inner)}size(){return this.innerSize}}const ip=new Jt(lt.comparator);function zr(){return ip}const al=new Jt(lt.comparator);function _r(...n){let t=al;for(const e of n)t=t.insert(e.key,e);return t}function ll(n){let t=al;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function Oe(){return Bn()}function cl(){return Bn()}function Bn(){return new He((n=>n.toString()),((n,t)=>n.isEqual(t)))}const sp=new Jt(lt.comparator),op=new zt(lt.comparator);function Gt(...n){let t=op;for(const e of n)t=t.add(e);return t}const ap=new zt(mt);function lp(){return ap}function hs(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Nr(t)?"-0":t}}function dl(n){return{integerValue:""+n}}function cp(n,t){return Pu(t)?dl(t):hs(n,t)}class Yr{constructor(){this._=void 0}}function dp(n,t,e){return n instanceof Gn?(function(s,o){const l={fields:{[Wa]:{stringValue:Ga},[Qa]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&as(o)&&(o=ls(o)),o&&(l.fields[Ka]=o),{mapValue:l}})(e,t):n instanceof Wn?pl(n,t):n instanceof Kn?hl(n,t):(function(s,o){const l=ul(s,o),d=jo(l)+jo(s.Ae);return $i(l)&&$i(s.Ae)?dl(d):hs(s.serializer,d)})(n,t)}function up(n,t,e){return n instanceof Wn?pl(n,t):n instanceof Kn?hl(n,t):e}function ul(n,t){return n instanceof qr?(function(r){return $i(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(t)?t:{integerValue:0}:null}class Gn extends Yr{}class Wn extends Yr{constructor(t){super(),this.elements=t}}function pl(n,t){const e=fl(t);for(const r of n.elements)e.some((s=>pe(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Kn extends Yr{constructor(t){super(),this.elements=t}}function hl(n,t){let e=fl(t);for(const r of n.elements)e=e.filter((s=>!pe(s,r)));return{arrayValue:{values:e}}}class qr extends Yr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function jo(n){return $t(n.integerValue||n.doubleValue)}function fl(n){return cs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}class pp{constructor(t,e){this.field=t,this.transform=e}}function hp(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof Wn&&s instanceof Wn||r instanceof Kn&&s instanceof Kn?on(r.elements,s.elements,pe):r instanceof qr&&s instanceof qr?pe(r.Ae,s.Ae):r instanceof Gn&&s instanceof Gn})(n.transform,t.transform)}class fp{constructor(t,e){this.version=t,this.transformResults=e}}class he{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new he}static exists(t){return new he(void 0,t)}static updateTime(t){return new he(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Sr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Xr{}function ml(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new yl(n.key,he.none()):new Zn(n.key,n.data,he.none());{const e=n.data,r=re.empty();let s=new zt(Ut.comparator);for(let o of t.fields)if(!s.has(o)){let l=e.field(o);l===null&&o.length>1&&(o=o.popLast(),l=e.field(o)),l===null?r.delete(o):r.set(o,l),s=s.add(o)}return new Ge(n.key,r,new se(s.toArray()),he.none())}}function mp(n,t,e){n instanceof Zn?(function(s,o,l){const d=s.value.clone(),p=Go(s.fieldTransforms,o,l.transformResults);d.setAll(p),o.convertToFoundDocument(l.version,d).setHasCommittedMutations()})(n,t,e):n instanceof Ge?(function(s,o,l){if(!Sr(s.precondition,o))return void o.convertToUnknownDocument(l.version);const d=Go(s.fieldTransforms,o,l.transformResults),p=o.data;p.setAll(gl(s)),p.setAll(d),o.convertToFoundDocument(l.version,p).setHasCommittedMutations()})(n,t,e):(function(s,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()})(0,t,e)}function $n(n,t,e,r){return n instanceof Zn?(function(o,l,d,p){if(!Sr(o.precondition,l))return d;const h=o.value.clone(),_=Wo(o.fieldTransforms,p,l);return h.setAll(_),l.convertToFoundDocument(l.version,h).setHasLocalMutations(),null})(n,t,e,r):n instanceof Ge?(function(o,l,d,p){if(!Sr(o.precondition,l))return d;const h=Wo(o.fieldTransforms,p,l),_=l.data;return _.setAll(gl(o)),_.setAll(h),l.convertToFoundDocument(l.version,_).setHasLocalMutations(),d===null?null:d.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((T=>T.field)))})(n,t,e,r):(function(o,l,d){return Sr(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):d})(n,t,e)}function gp(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=ul(r.transform,s||null);o!=null&&(e===null&&(e=re.empty()),e.set(r.field,o))}return e||null}function Ho(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&on(r,s,((o,l)=>hp(o,l)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Zn extends Xr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ge extends Xr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function gl(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function Go(n,t,e){const r=new Map;Ct(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let s=0;s<e.length;s++){const o=n[s],l=o.transform,d=t.data.field(o.field);r.set(o.field,up(l,d,e[s]))}return r}function Wo(n,t,e){const r=new Map;for(const s of n){const o=s.transform,l=e.data.field(s.field);r.set(s.field,dp(o,l,t))}return r}class yl extends Xr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class yp extends Xr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}class vp{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&mp(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=$n(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=$n(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=cl();return this.mutations.forEach((s=>{const o=t.get(s.key),l=o.overlayedDocument;let d=this.applyToLocalView(l,o.mutatedFields);d=e.has(s.key)?null:d;const p=ml(l,d);p!==null&&r.set(s.key,p),l.isValidDocument()||l.convertToNoDocument(Tt.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),Gt())}isEqual(t){return this.batchId===t.batchId&&on(this.mutations,t.mutations,((e,r)=>Ho(e,r)))&&on(this.baseMutations,t.baseMutations,((e,r)=>Ho(e,r)))}}class fs{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){Ct(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=(function(){return sp})();const o=t.mutations;for(let l=0;l<o.length;l++)s=s.insert(o[l].key,r[l].version);return new fs(t,e,r,s)}}class bp{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}var St,ut;function xp(n){switch(n){case W.OK:return ct(64938);case W.CANCELLED:case W.UNKNOWN:case W.DEADLINE_EXCEEDED:case W.RESOURCE_EXHAUSTED:case W.INTERNAL:case W.UNAVAILABLE:case W.UNAUTHENTICATED:return!1;case W.INVALID_ARGUMENT:case W.NOT_FOUND:case W.ALREADY_EXISTS:case W.PERMISSION_DENIED:case W.FAILED_PRECONDITION:case W.ABORTED:case W.OUT_OF_RANGE:case W.UNIMPLEMENTED:case W.DATA_LOSS:return!0;default:return ct(15467,{code:n})}}function _p(n){if(n===void 0)return Ue("GRPC error has no .code"),W.UNKNOWN;switch(n){case St.OK:return W.OK;case St.CANCELLED:return W.CANCELLED;case St.UNKNOWN:return W.UNKNOWN;case St.DEADLINE_EXCEEDED:return W.DEADLINE_EXCEEDED;case St.RESOURCE_EXHAUSTED:return W.RESOURCE_EXHAUSTED;case St.INTERNAL:return W.INTERNAL;case St.UNAVAILABLE:return W.UNAVAILABLE;case St.UNAUTHENTICATED:return W.UNAUTHENTICATED;case St.INVALID_ARGUMENT:return W.INVALID_ARGUMENT;case St.NOT_FOUND:return W.NOT_FOUND;case St.ALREADY_EXISTS:return W.ALREADY_EXISTS;case St.PERMISSION_DENIED:return W.PERMISSION_DENIED;case St.FAILED_PRECONDITION:return W.FAILED_PRECONDITION;case St.ABORTED:return W.ABORTED;case St.OUT_OF_RANGE:return W.OUT_OF_RANGE;case St.UNIMPLEMENTED:return W.UNIMPLEMENTED;case St.DATA_LOSS:return W.DATA_LOSS;default:return ct(39323,{code:n})}}(ut=St||(St={}))[ut.OK=0]="OK",ut[ut.CANCELLED=1]="CANCELLED",ut[ut.UNKNOWN=2]="UNKNOWN",ut[ut.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ut[ut.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ut[ut.NOT_FOUND=5]="NOT_FOUND",ut[ut.ALREADY_EXISTS=6]="ALREADY_EXISTS",ut[ut.PERMISSION_DENIED=7]="PERMISSION_DENIED",ut[ut.UNAUTHENTICATED=16]="UNAUTHENTICATED",ut[ut.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ut[ut.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ut[ut.ABORTED=10]="ABORTED",ut[ut.OUT_OF_RANGE=11]="OUT_OF_RANGE",ut[ut.UNIMPLEMENTED=12]="UNIMPLEMENTED",ut[ut.INTERNAL=13]="INTERNAL",ut[ut.UNAVAILABLE=14]="UNAVAILABLE",ut[ut.DATA_LOSS=15]="DATA_LOSS";new Zi([4294967295,4294967295],0);class wp{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function zi(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Ep(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Tp(n,t){return zi(n,t.toTimestamp())}function nn(n){return Ct(!!n,49232),Tt.fromTimestamp((function(e){const r=ze(e);return new It(r.seconds,r.nanos)})(n))}function vl(n,t){return qi(n,t).canonicalString()}function qi(n,t){const e=(function(s){return new At(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function Ip(n){const t=At.fromString(n);return Ct(Dp(t),10190,{key:t.toString()}),t}function ji(n,t){return vl(n.databaseId,t.path)}function kp(n){const t=Ip(n);return t.length===4?At.emptyPath():Ap(t)}function Cp(n){return new At(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ap(n){return Ct(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ko(n,t,e){return{name:ji(n,t),fields:e.value.mapValue.fields}}function Sp(n,t){let e;if(t instanceof Zn)e={update:Ko(n,t.key,t.value)};else if(t instanceof yl)e={delete:ji(n,t.key)};else if(t instanceof Ge)e={update:Ko(n,t.key,t.data),updateMask:Lp(t.fieldMask)};else{if(!(t instanceof yp))return ct(16599,{dt:t.type});e={verify:ji(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(o,l){const d=l.transform;if(d instanceof Gn)return{fieldPath:l.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(d instanceof Wn)return{fieldPath:l.field.canonicalString(),appendMissingElements:{values:d.elements}};if(d instanceof Kn)return{fieldPath:l.field.canonicalString(),removeAllFromArray:{values:d.elements}};if(d instanceof qr)return{fieldPath:l.field.canonicalString(),increment:d.Ae};throw ct(20930,{transform:l.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:Tp(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:ct(27497)})(n,t.precondition)),e}function Rp(n,t){return n&&n.length>0?(Ct(t!==void 0,14353),n.map((e=>(function(s,o){let l=s.updateTime?nn(s.updateTime):nn(o);return l.isEqual(Tt.min())&&(l=nn(o)),new fp(l,s.transformResults||[])})(e,t)))):[]}function Pp(n){let t=kp(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){Ct(r===1,65062);const _=e.from[0];_.allDescendants?s=_.collectionId:t=t.child(_.collectionId)}let o=[];e.where&&(o=(function(T){const x=bl(T);return x instanceof ke&&el(x)?x.getFilters():[x]})(e.where));let l=[];e.orderBy&&(l=(function(T){return T.map((x=>(function(D){return new Ur(Ze(D.field),(function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(x)))})(e.orderBy));let d=null;e.limit&&(d=(function(T){let x;return x=typeof T=="object"?T.value:T,os(x)?null:x})(e.limit));let p=null;e.startAt&&(p=(function(T){const x=!!T.before,O=T.values||[];return new Fr(O,x)})(e.startAt));let h=null;return e.endAt&&(h=(function(T){const x=!T.before,O=T.values||[];return new Fr(O,x)})(e.endAt)),Xu(t,s,l,o,d,"F",p,h)}function bl(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Ze(e.unaryFilter.field);return Ot.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ze(e.unaryFilter.field);return Ot.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ze(e.unaryFilter.field);return Ot.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=Ze(e.unaryFilter.field);return Ot.create(l,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ct(61313);default:return ct(60726)}})(n):n.fieldFilter!==void 0?(function(e){return Ot.create(Ze(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ct(58110);default:return ct(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return ke.create(e.compositeFilter.filters.map((r=>bl(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ct(1026)}})(e.compositeFilter.op))})(n):ct(30097,{filter:n})}function Ze(n){return Ut.fromServerFormat(n.fieldPath)}function Lp(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Dp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function xl(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}class Mp{constructor(t){this.yt=t}}function Vp(n){const t=Pp({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ui(t,t.limit,"L"):t}class Np{constructor(){this.Sn=new Op}addToCollectionParentIndex(t,e){return this.Sn.add(e),j.resolve()}getCollectionParents(t,e){return j.resolve(this.Sn.getEntries(e))}addFieldIndex(t,e){return j.resolve()}deleteFieldIndex(t,e){return j.resolve()}deleteAllFieldIndexes(t){return j.resolve()}createTargetIndexes(t,e){return j.resolve()}getDocumentsMatchingTarget(t,e){return j.resolve(null)}getIndexType(t,e){return j.resolve(0)}getFieldIndexes(t,e){return j.resolve([])}getNextCollectionGroupToUpdate(t){return j.resolve(null)}getMinOffset(t,e){return j.resolve(Ie.min())}getMinOffsetFromCollectionGroup(t,e){return j.resolve(Ie.min())}updateCollectionGroup(t,e,r){return j.resolve()}updateIndexEntries(t,e){return j.resolve()}}class Op{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new zt(At.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new zt(At.comparator)).toArray()}}const Qo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},_l=41943040;class Xt{static withCacheSize(t){return new Xt(t,Xt.DEFAULT_COLLECTION_PERCENTILE,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}Xt.DEFAULT_COLLECTION_PERCENTILE=10,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Xt.DEFAULT=new Xt(_l,Xt.DEFAULT_COLLECTION_PERCENTILE,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Xt.DISABLED=new Xt(-1,0,0);class dn{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new dn(0)}static ar(){return new dn(-1)}}const Yo="LruGarbageCollector",Bp=1048576;function Xo([n,t],[e,r]){const s=mt(n,e);return s===0?mt(t,r):s}class $p{constructor(t){this.Pr=t,this.buffer=new zt(Xo),this.Tr=0}Ir(){return++this.Tr}Er(t){const e=[t,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Xo(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Fp{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){tt(Yo,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Jn(e)?tt(Yo,"Ignoring IndexedDB error during garbage collection: ",e):await rs(e)}await this.Ar(3e5)}))}}class Up{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return j.resolve(is.ce);const r=new $p(e);return this.Vr.forEachTarget(t,(s=>r.Er(s.sequenceNumber))).next((()=>this.Vr.mr(t,(s=>r.Er(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(tt("LruGarbageCollector","Garbage collection skipped; disabled"),j.resolve(Qo)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(tt("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Qo):this.gr(t,e)))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let r,s,o,l,d,p,h;const _=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((T=>(T>this.params.maximumSequenceNumbersToCollect?(tt("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${T}`),s=this.params.maximumSequenceNumbersToCollect):s=T,l=Date.now(),this.nthSequenceNumber(t,s)))).next((T=>(r=T,d=Date.now(),this.removeTargets(t,r,e)))).next((T=>(o=T,p=Date.now(),this.removeOrphanedDocuments(t,r)))).next((T=>(h=Date.now(),Je()<=pt.DEBUG&&tt("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${l-_}ms
	Determined least recently used ${s} in `+(d-l)+`ms
	Removed ${o} targets in `+(p-d)+`ms
	Removed ${T} documents in `+(h-p)+`ms
Total Duration: ${h-_}ms`),j.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:T}))))}}function zp(n,t){return new Up(n,t)}class qp{constructor(){this.changes=new He((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,ne.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?j.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}class jp{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}class Hp{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&$n(r.mutation,s,se.empty(),It.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,Gt()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=Gt()){const s=Oe();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((o=>{let l=_r();return o.forEach(((d,p)=>{l=l.insert(d,p.overlayedDocument)})),l}))))}getOverlayedDocuments(t,e){const r=Oe();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,Gt())))}populateOverlays(t,e,r){const s=[];return r.forEach((o=>{e.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(t,s).next((o=>{o.forEach(((l,d)=>{e.set(l,d)}))}))}computeViews(t,e,r,s){let o=zr();const l=Bn(),d=(function(){return Bn()})();return e.forEach(((p,h)=>{const _=r.get(h.key);s.has(h.key)&&(_===void 0||_.mutation instanceof Ge)?o=o.insert(h.key,h):_!==void 0?(l.set(h.key,_.mutation.getFieldMask()),$n(_.mutation,h,_.mutation.getFieldMask(),It.now())):l.set(h.key,se.empty())})),this.recalculateAndSaveOverlays(t,o).next((p=>(p.forEach(((h,_)=>l.set(h,_))),e.forEach(((h,_)=>d.set(h,new jp(_,l.get(h)??null)))),d)))}recalculateAndSaveOverlays(t,e){const r=Bn();let s=new Jt(((l,d)=>l-d)),o=Gt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((l=>{for(const d of l)d.keys().forEach((p=>{const h=e.get(p);if(h===null)return;let _=r.get(p)||se.empty();_=d.applyToLocalView(h,_),r.set(p,_);const T=(s.get(d.batchId)||Gt()).add(p);s=s.insert(d.batchId,T)}))})).next((()=>{const l=[],d=s.getReverseIterator();for(;d.hasNext();){const p=d.getNext(),h=p.key,_=p.value,T=cl();_.forEach((x=>{if(!o.has(x)){const O=ml(e.get(x),r.get(x));O!==null&&T.set(x,O),o=o.add(x)}})),l.push(this.documentOverlayCache.saveOverlays(t,h,T))}return j.waitFor(l)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return Zu(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):tp(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((o=>{const l=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):j.resolve(Oe());let d=jn,p=o;return l.next((h=>j.forEach(h,((_,T)=>(d<T.largestBatchId&&(d=T.largestBatchId),o.get(_)?j.resolve():this.remoteDocumentCache.getEntry(t,_).next((x=>{p=p.insert(_,x)}))))).next((()=>this.populateOverlays(t,h,o))).next((()=>this.computeViews(t,p,h,Gt()))).next((_=>({batchId:d,changes:ll(_)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new lt(e)).next((r=>{let s=_r();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let l=_r();return this.indexManager.getCollectionParents(t,o).next((d=>j.forEach(d,(p=>{const h=(function(T,x){return new Qr(x,null,T.explicitOrderBy.slice(),T.filters.slice(),T.limit,T.limitType,T.startAt,T.endAt)})(e,p.child(o));return this.getDocumentsMatchingCollectionQuery(t,h,r,s).next((_=>{_.forEach(((T,x)=>{l=l.insert(T,x)}))}))})).next((()=>l))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s)))).next((l=>{o.forEach(((p,h)=>{const _=h.getKey();l.get(_)===null&&(l=l.insert(_,ne.newInvalidDocument(_)))}));let d=_r();return l.forEach(((p,h)=>{const _=o.get(p);_!==void 0&&$n(_.mutation,h,se.empty(),It.now()),ps(e,h)&&(d=d.insert(p,h))})),d}))}}class Gp{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return j.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:nn(s.createTime)}})(e)),j.resolve()}getNamedQuery(t,e){return j.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,(function(s){return{name:s.name,query:Vp(s.bundledQuery),readTime:nn(s.readTime)}})(e)),j.resolve()}}class Wp{constructor(){this.overlays=new Jt(lt.comparator),this.Lr=new Map}getOverlay(t,e){return j.resolve(this.overlays.get(e))}getOverlays(t,e){const r=Oe();return j.forEach(e,(s=>this.getOverlay(t,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,o)=>{this.bt(t,e,o)})),j.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.Lr.delete(r)),j.resolve()}getOverlaysForCollection(t,e,r){const s=Oe(),o=e.length+1,l=new lt(e.child("")),d=this.overlays.getIteratorFrom(l);for(;d.hasNext();){const p=d.getNext().value,h=p.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===o&&p.largestBatchId>r&&s.set(p.getKey(),p)}return j.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new Jt(((h,_)=>h-_));const l=this.overlays.getIterator();for(;l.hasNext();){const h=l.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>r){let _=o.get(h.largestBatchId);_===null&&(_=Oe(),o=o.insert(h.largestBatchId,_)),_.set(h.getKey(),h)}}const d=Oe(),p=o.getIterator();for(;p.hasNext()&&(p.getNext().value.forEach(((h,_)=>d.set(h,_))),!(d.size()>=s)););return j.resolve(d)}bt(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const l=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,l)}this.overlays=this.overlays.insert(r.key,new bp(e,r));let o=this.Lr.get(e);o===void 0&&(o=Gt(),this.Lr.set(e,o)),this.Lr.set(e,o.add(r.key))}}class Kp{constructor(){this.sessionToken=ue.EMPTY_BYTE_STRING}getSessionToken(t){return j.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,j.resolve()}}class ms{constructor(){this.kr=new zt(Nt.Kr),this.qr=new zt(Nt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const r=new Nt(t,e);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Wr(new Nt(t,e))}Qr(t,e){t.forEach((r=>this.removeReference(r,e)))}Gr(t){const e=new lt(new At([])),r=new Nt(e,t),s=new Nt(e,t+1),o=[];return this.qr.forEachInRange([r,s],(l=>{this.Wr(l),o.push(l.key)})),o}zr(){this.kr.forEach((t=>this.Wr(t)))}Wr(t){this.kr=this.kr.delete(t),this.qr=this.qr.delete(t)}jr(t){const e=new lt(new At([])),r=new Nt(e,t),s=new Nt(e,t+1);let o=Gt();return this.qr.forEachInRange([r,s],(l=>{o=o.add(l.key)})),o}containsKey(t){const e=new Nt(t,0),r=this.kr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class Nt{constructor(t,e){this.key=t,this.Hr=e}static Kr(t,e){return lt.comparator(t.key,e.key)||mt(t.Hr,e.Hr)}static Ur(t,e){return mt(t.Hr,e.Hr)||lt.comparator(t.key,e.key)}}class Qp{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Jr=new zt(Nt.Kr)}checkEmpty(t){return j.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new vp(o,e,r,s);this.mutationQueue.push(l);for(const d of s)this.Jr=this.Jr.add(new Nt(d.key,o)),this.indexManager.addToCollectionParentIndex(t,d.key.path.popLast());return j.resolve(l)}lookupMutationBatch(t,e){return j.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Xr(r),o=s<0?0:s;return j.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return j.resolve(this.mutationQueue.length===0?ss:this.Yn-1)}getAllMutationBatches(t){return j.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new Nt(e,0),s=new Nt(e,Number.POSITIVE_INFINITY),o=[];return this.Jr.forEachInRange([r,s],(l=>{const d=this.Zr(l.Hr);o.push(d)})),j.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new zt(mt);return e.forEach((s=>{const o=new Nt(s,0),l=new Nt(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([o,l],(d=>{r=r.add(d.Hr)}))})),j.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;lt.isDocumentKey(o)||(o=o.child(""));const l=new Nt(new lt(o),0);let d=new zt(mt);return this.Jr.forEachWhile((p=>{const h=p.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(d=d.add(p.Hr)),!0)}),l),j.resolve(this.Yr(d))}Yr(t){const e=[];return t.forEach((r=>{const s=this.Zr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){Ct(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return j.forEach(e.mutations,(s=>{const o=new Nt(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Jr=r}))}nr(t){}containsKey(t,e){const r=new Nt(e,0),s=this.Jr.firstAfterOrEqual(r);return j.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,j.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}class Yp{constructor(t){this.ti=t,this.docs=(function(){return new Jt(lt.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,l=this.ti(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return j.resolve(r?r.document.mutableCopy():ne.newInvalidDocument(e))}getEntries(t,e){let r=zr();return e.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():ne.newInvalidDocument(s))})),j.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=zr();const l=e.path,d=new lt(l.child("__id-9223372036854775808__")),p=this.docs.getIteratorFrom(d);for(;p.hasNext();){const{key:h,value:{document:_}}=p.getNext();if(!l.isPrefixOf(h.path))break;h.path.length>l.length+1||Cu(ku(_),r)<=0||(s.has(_.key)||ps(e,_))&&(o=o.insert(_.key,_.mutableCopy()))}return j.resolve(o)}getAllFromCollectionGroup(t,e,r,s){ct(9500)}ni(t,e){return j.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new Xp(this)}getSize(t){return j.resolve(this.size)}}class Xp extends qp{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Mr.addEntry(t,s)):this.Mr.removeEntry(r)})),j.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}class Jp{constructor(t){this.persistence=t,this.ri=new He((e=>ds(e)),us),this.lastRemoteSnapshotVersion=Tt.min(),this.highestTargetId=0,this.ii=0,this.si=new ms,this.targetCount=0,this.oi=dn._r()}forEachTarget(t,e){return this.ri.forEach(((r,s)=>e(s))),j.resolve()}getLastRemoteSnapshotVersion(t){return j.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return j.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),j.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ii&&(this.ii=e),j.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new dn(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,j.resolve()}updateTargetData(t,e){return this.lr(e),j.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,j.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ri.forEach(((l,d)=>{d.sequenceNumber<=e&&r.get(d.targetId)===null&&(this.ri.delete(l),o.push(this.removeMatchingKeysForTargetId(t,d.targetId)),s++)})),j.waitFor(o).next((()=>s))}getTargetCount(t){return j.resolve(this.targetCount)}getTargetData(t,e){const r=this.ri.get(e)||null;return j.resolve(r)}addMatchingKeys(t,e,r){return this.si.$r(e,r),j.resolve()}removeMatchingKeys(t,e,r){this.si.Qr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach((l=>{o.push(s.markPotentiallyOrphaned(t,l))})),j.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),j.resolve()}getMatchingKeysForTargetId(t,e){const r=this.si.jr(e);return j.resolve(r)}containsKey(t,e){return j.resolve(this.si.containsKey(e))}}class wl{constructor(t,e){this._i={},this.overlays={},this.ai=new is(0),this.ui=!1,this.ui=!0,this.ci=new Kp,this.referenceDelegate=t(this),this.li=new Jp(this),this.indexManager=new Np,this.remoteDocumentCache=(function(s){return new Yp(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new Mp(e),this.Pi=new Gp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Wp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this._i[t.toKey()];return r||(r=new Qp(e,this.referenceDelegate),this._i[t.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,r){tt("MemoryPersistence","Starting transaction:",t);const s=new Zp(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((o=>this.referenceDelegate.Ii(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Ei(t,e){return j.or(Object.values(this._i).map((r=>()=>r.containsKey(t,e))))}}class Zp extends Su{constructor(t){super(),this.currentSequenceNumber=t}}class gs{constructor(t){this.persistence=t,this.Ri=new ms,this.Ai=null}static Vi(t){return new gs(t)}get di(){if(this.Ai)return this.Ai;throw ct(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.di.delete(r.toString()),j.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.di.add(r.toString()),j.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),j.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((o=>this.di.add(o.toString())))})).next((()=>r.removeTargetData(t,e)))}Ti(){this.Ai=new Set}Ii(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return j.forEach(this.di,(r=>{const s=lt.fromPath(r);return this.mi(t,s).next((o=>{o||e.removeEntry(s,Tt.min())}))})).next((()=>(this.Ai=null,e.apply(t))))}updateLimboDocument(t,e){return this.mi(t,e).next((r=>{r?this.di.delete(e.toString()):this.di.add(e.toString())}))}hi(t){return 0}mi(t,e){return j.or([()=>j.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class jr{constructor(t,e){this.persistence=t,this.fi=new He((r=>Lu(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=zp(this,e)}static Vi(t,e){return new jr(t,e)}Ti(){}Ii(t){return j.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}pr(t){let e=0;return this.mr(t,(r=>{e++})).next((()=>e))}mr(t,e){return j.forEach(this.fi,((r,s)=>this.wr(t,r,s).next((o=>o?j.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ni(t,(l=>this.wr(t,l,e).next((d=>{d||(r++,o.removeEntry(l,Tt.min()))})))).next((()=>o.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),j.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),j.resolve()}removeReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),j.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),j.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Cr(t.data.value)),e}wr(t,e,r){return j.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.fi.get(e);return j.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}class ys{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Ts=r,this.Is=s}static Es(t,e){let r=Gt(),s=Gt();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new ys(t,e.fromCache,r,s)}}class th{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}class eh{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Gc()?8:Ru(jc())>0?6:4})()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.gs(t,e).next((l=>{o.result=l})).next((()=>{if(!o.result)return this.ps(t,e,s,r).next((l=>{o.result=l}))})).next((()=>{if(o.result)return;const l=new th;return this.ys(t,e,l).next((d=>{if(o.result=d,this.As)return this.ws(t,e,l,d.size)}))})).next((()=>o.result))}ws(t,e,r,s){return r.documentReadCount<this.Vs?(Je()<=pt.DEBUG&&tt("QueryEngine","SDK will not create cache indexes for query:",Ln(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),j.resolve()):(Je()<=pt.DEBUG&&tt("QueryEngine","Query:",Ln(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Je()<=pt.DEBUG&&tt("QueryEngine","The SDK decides to create cache indexes for query:",Ln(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,$e(e))):j.resolve())}gs(t,e){if(qo(e))return j.resolve(null);let r=$e(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=Ui(e,null,"F"),r=$e(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((o=>{const l=Gt(...o);return this.fs.getDocuments(t,l).next((d=>this.indexManager.getMinOffset(t,r).next((p=>{const h=this.bs(e,d);return this.Ss(e,h,l,p.readTime)?this.gs(t,Ui(e,null,"F")):this.Ds(t,h,e,p)}))))})))))}ps(t,e,r,s){return qo(e)||s.isEqual(Tt.min())?j.resolve(null):this.fs.getDocuments(t,r).next((o=>{const l=this.bs(e,o);return this.Ss(e,l,r,s)?j.resolve(null):(Je()<=pt.DEBUG&&tt("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ln(e)),this.Ds(t,l,e,Iu(s,jn)).next((d=>d)))}))}bs(t,e){let r=new zt(np(t));return e.forEach(((s,o)=>{ps(t,o)&&(r=r.add(o))})),r}Ss(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ys(t,e,r){return Je()<=pt.DEBUG&&tt("QueryEngine","Using full collection scan to execute query:",Ln(e)),this.fs.getDocumentsMatchingQuery(t,e,Ie.min(),r)}Ds(t,e,r,s){return this.fs.getDocumentsMatchingQuery(t,r,s).next((o=>(e.forEach((l=>{o=o.insert(l.key,l)})),o)))}}const nh="LocalStore";class rh{constructor(t,e,r,s){this.persistence=t,this.Cs=e,this.serializer=s,this.vs=new Jt(mt),this.Fs=new He((o=>ds(o)),us),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(r)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Hp(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.vs)))}}function ih(n,t,e,r){return new rh(n,t,e,r)}async function El(n,t){const e=xt(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,e.Os(t),e.mutationQueue.getAllMutationBatches(r)))).next((o=>{const l=[],d=[];let p=Gt();for(const h of s){l.push(h.batchId);for(const _ of h.mutations)p=p.add(_.key)}for(const h of o){d.push(h.batchId);for(const _ of h.mutations)p=p.add(_.key)}return e.localDocuments.getDocuments(r,p).next((h=>({Ns:h,removedBatchIds:l,addedBatchIds:d})))}))}))}function sh(n,t){const e=xt(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),o=e.xs.newChangeBuffer({trackRemovals:!0});return(function(d,p,h,_){const T=h.batch,x=T.keys();let O=j.resolve();return x.forEach((D=>{O=O.next((()=>_.getEntry(p,D))).next((S=>{const A=h.docVersions.get(D);Ct(A!==null,48541),S.version.compareTo(A)<0&&(T.applyToRemoteDocument(S,h),S.isValidDocument()&&(S.setReadTime(h.commitVersion),_.addEntry(S)))}))})),O.next((()=>d.mutationQueue.removeMutationBatch(p,T)))})(e,r,t,o).next((()=>o.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(d){let p=Gt();for(let h=0;h<d.mutationResults.length;++h)d.mutationResults[h].transformResults.length>0&&(p=p.add(d.batch.mutations[h].key));return p})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function oh(n){const t=xt(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.li.getLastRemoteSnapshotVersion(e)))}function ah(n,t){const e=xt(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=ss),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}class Jo{constructor(){this.activeTargetIds=lp()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class lh{constructor(){this.vo=new Jo,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,r){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new Jo,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}class ch{Mo(t){}shutdown(){}}const Zo="ConnectivityMonitor";class ta{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){tt(Zo,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){tt(Zo,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}let wr=null;function Hi(){return wr===null?wr=(function(){return 268435456+Math.round(2147483648*Math.random())})():wr++,"0x"+wr.toString(16)}const Ti="RestConnection",dh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class uh{get Ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Br?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(t,e,r,s,o){const l=Hi(),d=this.Qo(t,e.toUriEncodedString());tt(Ti,`Sending RPC '${t}' ${l}:`,d,r);const p={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(p,s,o);const{host:h}=new URL(d),_=Xi(h);return this.zo(t,d,p,r,_).then((T=>(tt(Ti,`Received RPC '${t}' ${l}: `,T),T)),(T=>{throw Kr(Ti,`RPC '${t}' ${l} failed with error: `,T,"url: ",d,"request:",r),T}))}jo(t,e,r,s,o,l){return this.Wo(t,e,r,s,o)}Go(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+hn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,o)=>t[o]=s)),r&&r.headers.forEach(((s,o)=>t[o]=s))}Qo(t,e){const r=dh[t];let s=`${this.qo}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}class ph{constructor(t){this.Ho=t.Ho,this.Jo=t.Jo}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Jo()}send(t){this.Ho(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}const jt="WebChannelConnection",Dn=(n,t,e)=>{n.listen(t,(r=>{try{e(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class rn extends uh{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!rn.c_){const t=$a();Dn(t,Ba.STAT_EVENT,(e=>{e.stat===Mi.PROXY?tt(jt,"STAT_EVENT: detected buffering proxy"):e.stat===Mi.NOPROXY&&tt(jt,"STAT_EVENT: detected no buffering proxy")})),rn.c_=!0}}zo(t,e,r,s,o){const l=Hi();return new Promise(((d,p)=>{const h=new Na;h.setWithCredentials(!0),h.listenOnce(Oa.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case kr.NO_ERROR:const T=h.getResponseJson();tt(jt,`XHR for RPC '${t}' ${l} received:`,JSON.stringify(T)),d(T);break;case kr.TIMEOUT:tt(jt,`RPC '${t}' ${l} timed out`),p(new nt(W.DEADLINE_EXCEEDED,"Request time out"));break;case kr.HTTP_ERROR:const x=h.getStatus();if(tt(jt,`RPC '${t}' ${l} failed with status:`,x,"response text:",h.getResponseText()),x>0){let O=h.getResponseJson();Array.isArray(O)&&(O=O[0]);const D=O?.error;if(D&&D.status&&D.message){const S=(function(z){const C=z.toLowerCase().replace(/_/g,"-");return Object.values(W).indexOf(C)>=0?C:W.UNKNOWN})(D.status);p(new nt(S,D.message))}else p(new nt(W.UNKNOWN,"Server responded with status "+h.getStatus()))}else p(new nt(W.UNAVAILABLE,"Connection failed."));break;default:ct(9055,{l_:t,streamId:l,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{tt(jt,`RPC '${t}' ${l} completed.`)}}));const _=JSON.stringify(s);tt(jt,`RPC '${t}' ${l} sending request:`,s),h.send(e,"POST",_,r,15)}))}T_(t,e,r){const s=Hi(),o=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],l=this.createWebChannelTransport(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},p=this.longPollingOptions.timeoutSeconds;p!==void 0&&(d.longPollingTimeout=Math.round(1e3*p)),this.useFetchStreams&&(d.useFetchStreams=!0),this.Go(d.initMessageHeaders,e,r),d.encodeInitMessageHeaders=!0;const h=o.join("");tt(jt,`Creating RPC '${t}' stream ${s}: ${h}`,d);const _=l.createWebChannel(h,d);this.I_(_);let T=!1,x=!1;const O=new ph({Ho:D=>{x?tt(jt,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(T||(tt(jt,`Opening RPC '${t}' stream ${s} transport.`),_.open(),T=!0),tt(jt,`RPC '${t}' stream ${s} sending:`,D),_.send(D))},Jo:()=>_.close()});return Dn(_,Mn.EventType.OPEN,(()=>{x||(tt(jt,`RPC '${t}' stream ${s} transport opened.`),O.i_())})),Dn(_,Mn.EventType.CLOSE,(()=>{x||(x=!0,tt(jt,`RPC '${t}' stream ${s} transport closed`),O.o_(),this.E_(_))})),Dn(_,Mn.EventType.ERROR,(D=>{x||(x=!0,Kr(jt,`RPC '${t}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),O.o_(new nt(W.UNAVAILABLE,"The operation could not be completed")))})),Dn(_,Mn.EventType.MESSAGE,(D=>{if(!x){const S=D.data[0];Ct(!!S,16349);const A=S,z=A?.error||A[0]?.error;if(z){tt(jt,`RPC '${t}' stream ${s} received error:`,z);const C=z.status;let R=(function(G){const v=St[G];if(v!==void 0)return _p(v)})(C),K=z.message;R===void 0&&(R=W.INTERNAL,K="Unknown error status: "+C+" with message "+z.message),x=!0,O.o_(new nt(R,K)),_.close()}else tt(jt,`RPC '${t}' stream ${s} received:`,S),O.__(S)}})),rn.u_(),setTimeout((()=>{O.s_()}),0),O}terminate(){this.a_.forEach((t=>t.close())),this.a_=[]}I_(t){this.a_.push(t)}E_(t){this.a_=this.a_.filter((e=>e===t))}Go(t,e,r){super.Go(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Fa()}}function hh(n){return new rn(n)}function Ii(){return typeof document<"u"?document:null}function Jr(n){return new wp(n,!0)}rn.c_=!1;class Tl{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Ci=t,this.timerId=e,this.R_=r,this.A_=s,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&tt("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}const ea="PersistentStream";class fh{constructor(t,e,r,s,o,l,d,p){this.Ci=t,this.b_=r,this.S_=s,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=d,this.listener=p,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Tl(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(t){this.q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===W.RESOURCE_EXHAUSTED?(Ue(e.toString()),Ue("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===W.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===e&&this.G_(r,s)}),(r=>{t((()=>{const s=new nt(W.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(t,e){const r=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.H_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return tt(ea,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget((()=>this.D_===t?e():(tt(ea,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class mh extends fh{constructor(t,e,r,s,o,l){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,l),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}H_(t){return Ct(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Ct(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){Ct(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Rp(t.writeResults,t.commitTime),r=nn(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=Cp(this.serializer),this.K_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>Sp(this.serializer,r)))};this.K_(e)}}class gh{}class yh extends gh{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new nt(W.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,l])=>this.connection.Wo(t,qi(e,r),s,o,l))).catch((o=>{throw o.name==="FirebaseError"?(o.code===W.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new nt(W.UNKNOWN,o.toString())}))}jo(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([l,d])=>this.connection.jo(t,qi(e,r),s,l,d,o))).catch((l=>{throw l.name==="FirebaseError"?(l.code===W.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new nt(W.UNKNOWN,l.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function vh(n,t,e,r){return new yh(n,t,e,r)}class bh{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ue(e),this.aa=!1):tt("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}const tr="RemoteStore";class xh{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=o,this.Aa.Mo((l=>{r.enqueueAndForget((async()=>{nr(this)&&(tt(tr,"Restarting streams for network reachability change."),await(async function(p){const h=xt(p);h.Ea.add(4),await er(h),h.Va.set("Unknown"),h.Ea.delete(4),await Zr(h)})(this))}))})),this.Va=new bh(r,s)}}async function Zr(n){if(nr(n))for(const t of n.Ra)await t(!0)}async function er(n){for(const t of n.Ra)await t(!1)}function nr(n){return xt(n).Ea.size===0}async function Il(n,t,e){if(!Jn(t))throw t;n.Ea.add(1),await er(n),n.Va.set("Offline"),e||(e=()=>oh(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{tt(tr,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Zr(n)}))}function kl(n,t){return t().catch((e=>Il(n,e,t)))}async function ti(n){const t=xt(n),e=Ce(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:ss;for(;_h(t);)try{const s=await ah(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,wh(t,s)}catch(s){await Il(t,s)}Cl(t)&&Al(t)}function _h(n){return nr(n)&&n.Ta.length<10}function wh(n,t){n.Ta.push(t);const e=Ce(n);e.O_()&&e.Y_&&e.ea(t.mutations)}function Cl(n){return nr(n)&&!Ce(n).x_()&&n.Ta.length>0}function Al(n){Ce(n).start()}async function Eh(n){Ce(n).ra()}async function Th(n){const t=Ce(n);for(const e of n.Ta)t.ea(e.mutations)}async function Ih(n,t,e){const r=n.Ta.shift(),s=fs.from(r,t,e);await kl(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await ti(n)}async function kh(n,t){t&&Ce(n).Y_&&await(async function(r,s){if((function(l){return xp(l)&&l!==W.ABORTED})(s.code)){const o=r.Ta.shift();Ce(r).B_(),await kl(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s))),await ti(r)}})(n,t),Cl(n)&&Al(n)}async function na(n,t){const e=xt(n);e.asyncQueue.verifyOperationInProgress(),tt(tr,"RemoteStore received new credentials");const r=nr(e);e.Ea.add(3),await er(e),r&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Zr(e)}async function Ch(n,t){const e=xt(n);t?(e.Ea.delete(2),await Zr(e)):t||(e.Ea.add(2),await er(e),e.Va.set("Unknown"))}function Ce(n){return n.fa||(n.fa=(function(e,r,s){const o=xt(e);return o.sa(),new mh(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Eh.bind(null,n),t_:kh.bind(null,n),ta:Th.bind(null,n),na:Ih.bind(null,n)}),n.Ra.push((async t=>{t?(n.fa.B_(),await ti(n)):(await n.fa.stop(),n.Ta.length>0&&(tt(tr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}class vs{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new Be,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((l=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const l=Date.now()+r,d=new vs(t,e,l,s,o);return d.start(r),d}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new nt(W.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Sl(n,t){if(Ue("AsyncQueue",`${t}: ${n}`),Jn(n))return new nt(W.UNAVAILABLE,`${t}: ${n}`);throw n}class Ah{constructor(){this.queries=ra(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=xt(e),o=s.queries;s.queries=ra(),o.forEach(((l,d)=>{for(const p of d.ba)p.onError(r)}))})(this,new nt(W.ABORTED,"Firestore shutting down"))}}function ra(){return new He((n=>ol(n)),sl)}function Sh(n){n.Ca.forEach((t=>{t.next()}))}var ia,sa;(sa=ia||(ia={})).Ma="default",sa.Cache="cache";const Rh="SyncEngine";class Ph{constructor(t,e,r,s,o,l){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.Pu={},this.Tu=new He((d=>ol(d)),sl),this.Iu=new Map,this.Eu=new Set,this.Ru=new Jt(lt.comparator),this.Au=new Map,this.Vu=new ms,this.du={},this.mu=new Map,this.fu=dn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Lh(n,t,e){const r=Nh(n);try{const s=await(function(l,d){const p=xt(l),h=It.now(),_=d.reduce(((O,D)=>O.add(D.key)),Gt());let T,x;return p.persistence.runTransaction("Locally write mutations","readwrite",(O=>{let D=zr(),S=Gt();return p.xs.getEntries(O,_).next((A=>{D=A,D.forEach(((z,C)=>{C.isValidDocument()||(S=S.add(z))}))})).next((()=>p.localDocuments.getOverlayedDocuments(O,D))).next((A=>{T=A;const z=[];for(const C of d){const R=gp(C,T.get(C.key).overlayedDocument);R!=null&&z.push(new Ge(C.key,R,Ja(R.value.mapValue),he.exists(!0)))}return p.mutationQueue.addMutationBatch(O,h,z,d)})).next((A=>{x=A;const z=A.applyToLocalDocumentSet(T,S);return p.documentOverlayCache.saveOverlays(O,A.batchId,z)}))})).then((()=>({batchId:x.batchId,changes:ll(T)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(l,d,p){let h=l.du[l.currentUser.toKey()];h||(h=new Jt(mt)),h=h.insert(d,p),l.du[l.currentUser.toKey()]=h})(r,s.batchId,e),await ei(r,s.changes),await ti(r.remoteStore)}catch(s){const o=Sl(s,"Failed to persist write");e.reject(o)}}function oa(n,t,e){const r=xt(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach(((o,l)=>{const d=l.view.va(t);d.snapshot&&s.push(d.snapshot)})),(function(l,d){const p=xt(l);p.onlineState=d;let h=!1;p.queries.forEach(((_,T)=>{for(const x of T.ba)x.va(d)&&(h=!0)})),h&&Sh(p)})(r.eventManager,t),s.length&&r.Pu.J_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Dh(n,t){const e=xt(n),r=t.batch.batchId;try{const s=await sh(e.localStore,t);Pl(e,r,null),Rl(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await ei(e,s)}catch(s){await rs(s)}}async function Mh(n,t,e){const r=xt(n);try{const s=await(function(l,d){const p=xt(l);return p.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let _;return p.mutationQueue.lookupMutationBatch(h,d).next((T=>(Ct(T!==null,37113),_=T.keys(),p.mutationQueue.removeMutationBatch(h,T)))).next((()=>p.mutationQueue.performConsistencyCheck(h))).next((()=>p.documentOverlayCache.removeOverlaysForBatchId(h,_,d))).next((()=>p.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,_))).next((()=>p.localDocuments.getDocuments(h,_)))}))})(r.localStore,t);Pl(r,t,e),Rl(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await ei(r,s)}catch(s){await rs(s)}}function Rl(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function Pl(n,t,e){const r=xt(n);let s=r.du[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.du[r.currentUser.toKey()]=s}}async function ei(n,t,e){const r=xt(n),s=[],o=[],l=[];r.Tu.isEmpty()||(r.Tu.forEach(((d,p)=>{l.push(r.pu(p,t,e).then((h=>{if((h||e)&&r.isPrimaryClient){const _=h?!h.fromCache:e?.targetChanges.get(p.targetId)?.current;r.sharedClientState.updateQueryState(p.targetId,_?"current":"not-current")}if(h){s.push(h);const _=ys.Es(p.targetId,h);o.push(_)}})))})),await Promise.all(l),r.Pu.J_(s),await(async function(p,h){const _=xt(p);try{await _.persistence.runTransaction("notifyLocalViewChanges","readwrite",(T=>j.forEach(h,(x=>j.forEach(x.Ts,(O=>_.persistence.referenceDelegate.addReference(T,x.targetId,O))).next((()=>j.forEach(x.Is,(O=>_.persistence.referenceDelegate.removeReference(T,x.targetId,O)))))))))}catch(T){if(!Jn(T))throw T;tt(nh,"Failed to update sequence numbers: "+T)}for(const T of h){const x=T.targetId;if(!T.fromCache){const O=_.vs.get(x),D=O.snapshotVersion,S=O.withLastLimboFreeSnapshotVersion(D);_.vs=_.vs.insert(x,S)}}})(r.localStore,o))}async function Vh(n,t){const e=xt(n);if(!e.currentUser.isEqual(t)){tt(Rh,"User change. New user:",t.toKey());const r=await El(e.localStore,t);e.currentUser=t,(function(o,l){o.mu.forEach((d=>{d.forEach((p=>{p.reject(new nt(W.CANCELLED,l))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await ei(e,r.Ns)}}function Nh(n){const t=xt(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Dh.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Mh.bind(null,t),t}class Hr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Jr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return ih(this.persistence,new eh,t.initialUser,this.serializer)}Cu(t){return new wl(gs.Vi,this.serializer)}Du(t){return new lh}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Hr.provider={build:()=>new Hr};class Oh extends Hr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){Ct(this.persistence.referenceDelegate instanceof jr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Fp(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Xt.withCacheSize(this.cacheSizeBytes):Xt.DEFAULT;return new wl((r=>jr.Vi(r,e)),this.serializer)}}class Gi{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>oa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Vh.bind(null,this.syncEngine),await Ch(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Ah})()}createDatastore(t){const e=Jr(t.databaseInfo.databaseId),r=hh(t.databaseInfo);return vh(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,o,l,d){return new xh(r,s,o,l,d)})(this.localStore,this.datastore,t.asyncQueue,(e=>oa(this.syncEngine,e,0)),(function(){return ta.v()?new ta:new ch})())}createSyncEngine(t,e){return(function(s,o,l,d,p,h,_){const T=new Ph(s,o,l,d,p,h);return _&&(T.gu=!0),T})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){await(async function(e){const r=xt(e);tt(tr,"RemoteStore shutting down."),r.Ea.add(5),await er(r),r.Aa.shutdown(),r.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Gi.provider={build:()=>new Gi};const Ae="FirestoreClient";class Bh{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=Ht.UNAUTHENTICATED,this.clientId=es.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async l=>{tt(Ae,"Received user=",l.uid),await this.authCredentialListener(l),this.user=l})),this.appCheckCredentials.start(r,(l=>(tt(Ae,"Received new app check token=",l),this.appCheckCredentialListener(l,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Be;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Sl(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function ki(n,t){n.asyncQueue.verifyOperationInProgress(),tt(Ae,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await El(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function aa(n,t){n.asyncQueue.verifyOperationInProgress();const e=await $h(n);tt(Ae,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>na(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>na(t.remoteStore,s))),n._onlineComponents=t}async function $h(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){tt(Ae,"Using user provided OfflineComponentProvider");try{await ki(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===W.FAILED_PRECONDITION||s.code===W.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Kr("Error using user provided cache. Falling back to memory cache: "+e),await ki(n,new Hr)}}else tt(Ae,"Using default OfflineComponentProvider"),await ki(n,new Oh(void 0));return n._offlineComponents}async function Fh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(tt(Ae,"Using user provided OnlineComponentProvider"),await aa(n,n._uninitializedComponentsProvider._online)):(tt(Ae,"Using default OnlineComponentProvider"),await aa(n,new Gi))),n._onlineComponents}function Uh(n){return Fh(n).then((t=>t.syncEngine))}function zh(n,t){const e=new Be;return n.asyncQueue.enqueueAndForget((async()=>Lh(await Uh(n),t,e))),e.promise}function Ll(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}const qh="ComponentProvider",la=new Map;function jh(n,t,e,r,s){return new Nu(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Ll(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}const Dl="firestore.googleapis.com",ca=!0;class da{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new nt(W.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Dl,this.ssl=ca}else this.host=t.host,this.ssl=t.ssl??ca;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=_l;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Bp)throw new nt(W.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Tu("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ll(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new nt(W.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new nt(W.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new nt(W.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class bs{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new da({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new nt(W.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new nt(W.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new da(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new hu;switch(r.type){case"firstParty":return new yu(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new nt(W.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=la.get(e);r&&(tt(qh,"Removing Datastore"),la.delete(e),r.terminate())})(this),Promise.resolve()}}function Hh(n,t,e,r={}){n=Ni(n,bs);const s=Xi(t),o=n._getSettings(),l={...o,emulatorOptions:n._getEmulatorOptions()},d=`${t}:${e}`;s&&($c(`https://${d}`),qc("Firestore",!0)),o.host!==Dl&&o.host!==d&&Kr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const p={...o,host:d,ssl:s,emulatorOptions:r};if(!Lr(p,l)&&(n._setSettings(p),r.mockUserToken)){let h,_;if(typeof r.mockUserToken=="string")h=r.mockUserToken,_=Ht.MOCK_USER;else{h=Fc(r.mockUserToken,n._app?.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new nt(W.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new Ht(T)}n._authCredentials=new fu(new za(h,_))}}class xs{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new xs(this.firestore,t,this._query)}}class Wt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Qn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Wt(this.firestore,t,this._key)}toJSON(){return{type:Wt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(Xn(e,Wt._jsonSchema))return new Wt(t,r||null,new lt(At.fromString(e.referencePath)))}}Wt._jsonSchemaVersion="firestore/documentReference/1.0",Wt._jsonSchema={type:Lt("string",Wt._jsonSchemaVersion),referencePath:Lt("string")};class Qn extends xs{constructor(t,e,r){super(t,e,Ju(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Wt(this.firestore,null,new lt(t))}withConverter(t){return new Qn(this.firestore,t,this._path)}}function Gh(n,t,...e){if(n=Dr(n),arguments.length===1&&(t=es.newId()),Eu("doc","path",t),n instanceof bs){const r=At.fromString(t,...e);return Lo(r),new Wt(n,null,new lt(r))}{if(!(n instanceof Wt||n instanceof Qn))throw new nt(W.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(At.fromString(t,...e));return Lo(r),new Wt(n.firestore,n instanceof Qn?n.converter:null,new lt(r))}}const ua="AsyncQueue";class pa{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Tl(this,"async_queue_retry"),this._c=()=>{const r=Ii();r&&tt(ua,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=Ii();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Ii();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new Be;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Yu.push(t),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!Jn(t))throw t;tt(ua,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,Ue("INTERNAL UNHANDLED ERROR: ",ha(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=vs.createAndSchedule(this,t,e,r,(o=>this.hc(o)));return this.tc.push(s),s}uc(){this.nc&&ct(47125,{Pc:ha(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function ha(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Ml extends bs{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new pa,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new pa(t),this._firestoreClient=void 0,await t}}}function Wh(n,t){const e=typeof n=="object"?n:Zd(),r=typeof n=="string"?n:Br,s=Kd(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Oc("firestore");o&&Hh(s,...o)}return s}function Kh(n){if(n._terminated)throw new nt(W.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Qh(n),n._firestoreClient}function Qh(n){const t=n._freezeSettings(),e=jh(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,t);n._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new Bh(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(s){const o=s?._online.build();return{_offline:s?._offline.build(o),_online:o}})(n._componentsProvider))}class ie{constructor(t){this._byteString=t}static fromBase64String(t){try{return new ie(ue.fromBase64String(t))}catch(e){throw new nt(W.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new ie(ue.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:ie._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Xn(t,ie._jsonSchema))return ie.fromBase64String(t.bytes)}}ie._jsonSchemaVersion="firestore/bytes/1.0",ie._jsonSchema={type:Lt("string",ie._jsonSchemaVersion),bytes:Lt("string")};class Vl{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new nt(W.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ut(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}class _s{constructor(t){this._methodName=t}}class fe{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new nt(W.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new nt(W.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return mt(this._lat,t._lat)||mt(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:fe._jsonSchemaVersion}}static fromJSON(t){if(Xn(t,fe._jsonSchema))return new fe(t.latitude,t.longitude)}}fe._jsonSchemaVersion="firestore/geoPoint/1.0",fe._jsonSchema={type:Lt("string",fe._jsonSchemaVersion),latitude:Lt("number"),longitude:Lt("number")};class de{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:de._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Xn(t,de._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new de(t.vectorValues);throw new nt(W.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}de._jsonSchemaVersion="firestore/vectorValue/1.0",de._jsonSchema={type:Lt("string",de._jsonSchemaVersion),vectorValues:Lt("object")};const Yh=/^__.*__$/;class Xh{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ge(t,this.data,this.fieldMask,e,this.fieldTransforms):new Zn(t,this.data,e,this.fieldTransforms)}}function Nl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ct(40011,{dataSource:n})}}class ws{constructor(t,e,r,s,o,l){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.validatePath(),this.fieldTransforms=o||[],this.fieldMask=l||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new ws({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){const e=this.path?.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePathSegment(t),r}childContextForFieldPath(t){const e=this.path?.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePath(),r}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return Gr(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if(Nl(this.dataSource)&&Yh.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class Jh{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Jr(t)}createContext(t,e,r,s=!1){return new ws({dataSource:t,methodName:e,targetDoc:r,path:Ut.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Zh(n){const t=n._freezeSettings(),e=Jr(n._databaseId);return new Jh(n._databaseId,!!t.ignoreUndefinedProperties,e)}function tf(n,t,e,r,s,o={}){const l=n.createContext(o.merge||o.mergeFields?2:0,t,e,s);Fl("Data must be an object, but it was:",l,r);const d=Bl(r,l);let p,h;if(o.merge)p=new se(l.fieldMask),h=l.fieldTransforms;else if(o.mergeFields){const _=[];for(const T of o.mergeFields){const x=Ts(t,T,e);if(!l.contains(x))throw new nt(W.INVALID_ARGUMENT,`Field '${x}' is specified in your field mask but missing from your input data.`);rf(_,x)||_.push(x)}p=new se(_),h=l.fieldTransforms.filter((T=>p.covers(T.field)))}else p=null,h=l.fieldTransforms;return new Xh(new re(d),p,h)}class Es extends _s{_toFieldTransform(t){return new pp(t.path,new Gn)}isEqual(t){return t instanceof Es}}function Ol(n,t){if($l(n=Dr(n)))return Fl("Unsupported field value:",t,n),Bl(n,t);if(n instanceof _s)return(function(r,s){if(!Nl(s.dataSource))throw s.createError(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.createError(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return(function(r,s){const o=[];let l=0;for(const d of r){let p=Ol(d,s.childContextForArray(l));p==null&&(p={nullValue:"NULL_VALUE"}),o.push(p),l++}return{arrayValue:{values:o}}})(n,t)}return(function(r,s){if((r=Dr(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return cp(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=It.fromDate(r);return{timestampValue:zi(s.serializer,o)}}if(r instanceof It){const o=new It(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:zi(s.serializer,o)}}if(r instanceof fe)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ie)return{bytesValue:Ep(s.serializer,r._byteString)};if(r instanceof Wt){const o=s.databaseId,l=r.firestore._databaseId;if(!l.isEqual(o))throw s.createError(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:vl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof de)return(function(l,d){const p=l instanceof de?l.toArray():l;return{mapValue:{fields:{[Ya]:{stringValue:Xa},[Oi]:{arrayValue:{values:p.map((_=>{if(typeof _!="number")throw d.createError("VectorValues must only contain numeric values.");return hs(d.serializer,_)}))}}}}}})(r,s);if(xl(r))return r._toProto(s.serializer);throw s.createError(`Unsupported field value: ${ns(r)}`)})(n,t)}function Bl(n,t){const e={};return Ha(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):fn(n,((r,s)=>{const o=Ol(s,t.childContextForField(r));o!=null&&(e[r]=o)})),{mapValue:{fields:e}}}function $l(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof It||n instanceof fe||n instanceof ie||n instanceof Wt||n instanceof _s||n instanceof de||xl(n))}function Fl(n,t,e){if(!$l(e)||!qa(e)){const r=ns(e);throw r==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+r)}}function Ts(n,t,e){if((t=Dr(t))instanceof Vl)return t._internalPath;if(typeof t=="string")return nf(n,t);throw Gr("Field path arguments must be of type string or ",n,!1,void 0,e)}const ef=new RegExp("[~\\*/\\[\\]]");function nf(n,t,e){if(t.search(ef)>=0)throw Gr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Vl(...t.split("."))._internalPath}catch{throw Gr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Gr(n,t,e,r,s){const o=r&&!r.isEmpty(),l=s!==void 0;let d=`Function ${t}() called with invalid data`;e&&(d+=" (via `toFirestore()`)"),d+=". ";let p="";return(o||l)&&(p+=" (found",o&&(p+=` in field ${r}`),l&&(p+=` in document ${s}`),p+=")"),new nt(W.INVALID_ARGUMENT,d+n+p)}function rf(n,t){return n.some((e=>e.isEqual(t)))}function sf(){return new Es("serverTimestamp")}const fa="@firebase/firestore",ma="4.10.0";class Ul{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Wt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new of(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(t){if(this._document){const e=this._document.data.field(Ts("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class of extends Ul{data(){return super.data()}}function af(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class Er{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class sn extends Ul{constructor(t,e,r,s,o,l){super(t,e,r,s,l),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Rr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Ts("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new nt(W.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=sn._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}sn._jsonSchemaVersion="firestore/documentSnapshot/1.0",sn._jsonSchema={type:Lt("string",sn._jsonSchemaVersion),bundleSource:Lt("string","DocumentSnapshot"),bundleName:Lt("string"),bundle:Lt("string")};class Rr extends sn{data(t={}){return super.data(t)}}class Fn{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Er(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new Rr(this._firestore,this._userDataWriter,r.key,r,new Er(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new nt(W.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let l=0;return s._snapshot.docChanges.map((d=>{const p=new Rr(s._firestore,s._userDataWriter,d.doc.key,d.doc,new Er(s._snapshot.mutatedKeys.has(d.doc.key),s._snapshot.fromCache),s.query.converter);return d.doc,{type:"added",doc:p,oldIndex:-1,newIndex:l++}}))}{let l=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((d=>o||d.type!==3)).map((d=>{const p=new Rr(s._firestore,s._userDataWriter,d.doc.key,d.doc,new Er(s._snapshot.mutatedKeys.has(d.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,_=-1;return d.type!==0&&(h=l.indexOf(d.doc.key),l=l.delete(d.doc.key)),d.type!==1&&(l=l.add(d.doc),_=l.indexOf(d.doc.key)),{type:lf(d.type),doc:p,oldIndex:h,newIndex:_}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new nt(W.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Fn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=es.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function lf(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ct(61501,{type:n})}}Fn._jsonSchemaVersion="firestore/querySnapshot/1.0",Fn._jsonSchema={type:Lt("string",Fn._jsonSchemaVersion),bundleSource:Lt("string","QuerySnapshot"),bundleName:Lt("string"),bundle:Lt("string")};function cf(n,t,e){n=Ni(n,Wt);const r=Ni(n.firestore,Ml),s=af(n.converter,t),o=Zh(r);return df(r,[tf(o,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,he.none())])}function df(n,t){const e=Kh(n);return zh(e,t)}(function(t,e=!0){pu(Jd),Vr(new zn("firestore",((r,{instanceIdentifier:s,options:o})=>{const l=r.getProvider("app").getImmediate(),d=new Ml(new mu(r.getProvider("auth-internal")),new vu(l,r.getProvider("app-check-internal")),Ou(l,s),l);return o={useFetchStreams:e,...o},d._setSettings(o),d}),"PUBLIC").setMultipleInstances(!0)),en(fa,ma,t),en(fa,ma,"esm2020")})();const uf={projectId:"destinycode-982fa",appId:"1:168629222416:web:3283f6a4051f57a85c9e95",storageBucket:"destinycode-982fa.firebasestorage.app",apiKey:"AIzaSyA20BvSogSuHTni09Y54HwmlpG7UKXuxk8",authDomain:"destinycode-982fa.firebaseapp.com",messagingSenderId:"168629222416",measurementId:"G-ZKS4RCNFGX"};let Ci=null;function pf(){if(!Ci)try{const n=Da(uf);Ci=Wh(n),Pt.log("🔥 FeedbackService: Firebase initialized.")}catch(n){console.error("Firebase Init Error:",n)}return Ci}const Wr={async send(n){const t=pf();if(!t){console.warn("Feedback skipped: DB not ready");return}const e=E.get("email")||null,r=n.source||"general";let s=sessionStorage.getItem("dc_feedback_session_id");s||(s="sess_"+Math.random().toString(36).substr(2,9)+"_"+Date.now().toString(36),sessionStorage.setItem("dc_feedback_session_id",s));let o=`feedback_${s}_${r}`;n.type==="text"&&(o+=`_${Date.now()}_${Math.random().toString(36).substr(2,5)}`);const l={...n,email:e,timestamp:sf(),localTime:new Date().toISOString(),userAgent:navigator.userAgent,path:window.location.pathname};try{await cf(Gh(t,"web_feedback",o),l),Pt.log("📝 [Feedback Updated/Saved]:",o,l)}catch(d){console.error("Feedback Save Error:",d)}}},hf=Ft.PROXY,ff=Ai.MODEL_NAME;async function mf(n){try{const e=(await Te(hf,{action:"geo",data:{query:n},modelName:ff})).candidates?.[0]?.content?.parts?.[0]?.text;if(e){const r=e.replace(/```json\n?([\s\S]*?)\n?```/g,"$1").trim();return JSON.parse(r)}return{error:"parse_error"}}catch(t){return console.error("Geo API Network Error:",t),{error:"network_failure"}}}async function je(n){const t=await mf(n);return t&&(typeof t.lat=="number"||typeof t.latitude=="number")?(console.log(`Geocoding success for ${n}:`,t),{latitude:t.latitude||t.lat,longitude:t.longitude||t.lon,timezone:t.timezone,corrected_name:t.corrected_name,error:null}):t&&t.error?{error:t.error}:{error:"parse_error"}}const gf=Object.freeze(Object.defineProperty({__proto__:null,getCoordinates:je},Symbol.toStringTag,{value:"Module"}));async function un(n,t,e,r={}){Pt.log(`💳 Starting Payment: ${n.name} (${n.price} UAH)`);try{let o=function(h){const _=document.cookie.match(new RegExp("(^| )"+h+"=([^;]+)"));return _?_[2]:null};const s=Number(n.price);if(isNaN(s))throw console.error("❌ Invalid price detected:",n.price),new Error(`Payment error: Invalid price (${n.price})`);const l={fbp:o("_fbp"),fbc:o("_fbc"),userAgent:navigator.userAgent},d={amount:s,productName:n.name,userEmail:t.email,userName:t.name||"Client",userData:e,variant:r.variant||null,trafficSource:E.get("traffic_type"),trackingData:l,origin:window.location.origin,returnQueryParams:r.returnQueryParams||""},p=await Te(Ft.endpoints.PAYMENT_INIT,d);if(p&&p.pageUrl)if(E.set("pendingInvoiceId",p.invoiceId),r.paymentWindow)r.paymentWindow.location.href=p.pageUrl;else{const h=document.createElement("a");h.href=p.pageUrl,h.target="_top",h.rel="noopener noreferrer",document.body.appendChild(h),h.click(),setTimeout(()=>{document.body.removeChild(h)},100)}else throw console.error("❌ Invalid Payment Response:",p),new Error("Invalid response from payment provider (no pageUrl)")}catch(s){console.error("❌ Payment Init Failed Details:",s);let o="Помилка ініціалізації оплати.";throw s.message&&s.message.includes("400")&&(o+=" Невірні дані."),s.message&&s.message.includes("500")&&(o+=" Сервер тимчасово недоступний."),alert(`${o}
Спробуйте ще раз.`),s}}async function zl(n){try{return await Te(Ft.endpoints.PAYMENT_CHECK,n)}catch(t){return console.error("Status Check Failed:",t),{status:"error",message:t.message}}}const ga=Object.freeze(Object.defineProperty({__proto__:null,checkPaymentStatus:zl,processPayment:un},Symbol.toStringTag,{value:"Module"}));function ce(){const n=E.get("currentVariant");let t={...uc},e={...pc};return n&&n.pricing&&(n.pricing.display&&(t={...t,...n.pricing.display}),n.pricing.charge&&(e={...e,...n.pricing.charge})),{display:t,charge:e}}async function Is(n,t=null){if(await Wi(),!window.CircularNatalHoroscope)return`
            <div class="astro-data-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.1);">
                <p class="text-xs text-yellow-400 text-center pulse-text">
                    ⏳ Завантаження астро-даних...<br>
                    (Спробуйте зачекати кілька секунд)
                </p>
            </div>
        `;const{Origin:e,Horoscope:r,Renderer:s}=window.CircularNatalHoroscope;let o=n.geo;if(o||(o={latitude:50.45,longitude:30.52,timezone:"Europe/Kyiv"}),!n.date)return"";try{let S=function(R,K){let F=D[R];if(!F&&R==="ascendant"&&(F=O.Ascendant),!F&&R==="midheaven"&&(F=O.Midheaven),F){const G=F.Sign.label,v=F.ChartPosition.Ecliptic.DecimalDegrees%30,y=Math.floor(v),f=(v-y)*60,b=Math.floor(f),w=Math.round((f-b)*60);return`
                    <div class="astro-data-item">
                        <div class="astro-label-row">
                            <span class="astro-planet-name">${K}:</span>
                             <span class="astro-sign-name">${G}</span>
                        </div>
                        <div class="astro-coords-row">${y}° ${b}' ${w}"</div>
                    </div>
                `}return`<div class="astro-data-item"><strong>${K}:</strong> n/a</div>`};const l=n.date.split("-"),d=parseInt(l[0]),p=parseInt(l[1])-1,h=parseInt(l[2]);let _=12,T=0;if(n.time){const R=n.time.split(":");_=parseInt(R[0]),T=parseInt(R[1])}const x=new e({year:d,month:p,date:h,hour:_,minute:T,latitude:parseFloat(o.latitude),longitude:parseFloat(o.longitude),timezone:o.timezone}),O=new r({origin:x,houseSystem:"placidus",zodiac:"tropical"}),D=O.CelestialBodies,A=[];A.push(S("sun","Сонце")),A.push(S("mercury","Меркурій")),A.push(S("venus","Венера")),A.push(S("mars","Марс")),A.push(S("jupiter","Юпітер")),A.push(S("saturn","Сатурн"));let z="";const C=document.createElement("div");C.style.position="absolute",C.style.left="-9999px",C.style.width="600px",C.style.height="600px",document.body.appendChild(C);try{new s(O).render(C);const K=C.querySelector("svg");K&&(K.style.backgroundColor="transparent",K.querySelectorAll("line, circle, path").forEach(v=>{const y=v.getAttribute("stroke");(!y||y==="#000000"||y==="#000"||y==="black")&&(v.setAttribute("stroke","#cda45e"),v.setAttribute("stroke-width","1.5"))}),K.querySelectorAll("text").forEach(v=>{v.setAttribute("fill","#cda45e"),v.style.fill="#cda45e",v.style.fontFamily="'Montserrat', sans-serif",v.style.fontWeight="500"}),z=`
                    <div class="astro-chart-preview">
                        ${C.innerHTML}
                    </div>
                `)}catch(R){console.warn("Chart Render Error:",R)}return document.body.removeChild(C),`
            <div class="astro-data-box">
                <div class="astro-data-title">${t&&t.productType==="partner"?"Твій Астро-Код Кохання":"Твій Космічний Відбиток"}</div>
                ${z} 
                <div class="astro-data-grid">
                    ${A.join("")}
                </div>
            </div>
        `}catch(l){return console.error("Fingerprint render error:",l),`<div class="astro-data-box"><p class="text-xs text-red-400 text-center">Помилка розрахунку: ${l.message}</p></div>`}}function yf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=kc;const e=document.getElementById("result-title"),r=document.getElementById("free-report-title"),s=document.getElementById("free-report-text"),o=document.getElementById("upgrade-button"),l=document.getElementById("marketing-divider"),d=document.getElementById("marketing-hook-block"),p=document.getElementById("premium-form-title-container"),h=document.getElementById("premium-form-container"),_=document.getElementById("birth-time"),T=document.getElementById("time-placeholder"),x=_?_.closest(".input-field"):null,O=document.getElementById("time-error-message"),D=document.getElementById("birth-city"),S=document.getElementById("city-error-message"),A=document.getElementById("city-info-message"),z=document.getElementById("skip-button"),C=E.get("freeReport");if(!C){n.navigateTo("welcome");return}let R="";const K=g=>g?g.replace(/\*\*(.*?)\*\*/g,'<span style="color: var(--primary-text-color); font-weight: normal;">$1</span>').replace(/\\n/g,"<br>"):"",F=E.get("currentVariant");let G="твого архетипу";const v=F?.marketing;if(v){const g=C?.title||"",I=C?.content_blocks?.archetype||"";if(I){const U=[...I.matchAll(/\*\*(.*?)\*\*/g)].map(H=>H[1]),L=/(?:ти(?:\sє)?\s*[-–—]?\s*|(?:архетип|роль|суті|енергетикою)\s*[-–—:]?\s*)\*\*(.*?)\*\*/i,B=I.match(L);if(B&&B[1])G=B[1].trim().replace(/[.,!]$/,"");else if(U.length>0){const H=U.find(q=>{const Q=q.trim();return Q.length>=2&&!Q.match(/^\d/)&&Q[0]===Q[0].toUpperCase()});if(H)G=H.trim().replace(/[.,!]$/,"");else{const q=U.find(Q=>!Q.match(/^\d/)&&!Q.match(/важливо|увага|знак/i));q&&(G=q.trim().replace(/[.,!]$/,""))}}}if(G==="твого архетипу"&&g){const $=g.match(/(?:Архетип|Архетип:\s*|:\s*)([^<\n,]+)$/i);$&&$[1]&&(G=$[1].trim())}G==="твого архетипу"&&C?.archetype&&typeof C.archetype=="string"&&(G=C.archetype)}if(C.forecast_preview||C.theme_year){console.log("Rendering Forecast Preview (Accordion)...");let g="";C.theme_year&&(g=`<div class="mb-4" style="text-align: center; padding: 12px 0;">
                <span style="color: var(--accent-color); font-size: 0.75em; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Архетип Року</span>
                <h3 style="color: #fff; font-size: 1.3em; font-weight: 700; margin-top: 4px;">🦁 ${C.theme_year}</h3>
            </div>`);const I=[{emoji:"🌪",title:"Вітер Змін"},{emoji:"⚓️",title:"Прихована Пастка"},{emoji:"🎫",title:"Золотий Квиток"}];let $=[];if(C.forecast_preview){const B=C.forecast_preview.split(/<br\s*\/?>\s*<br\s*\/?>/gi).map(J=>J.replace(/^<br\s*\/?>|<br\s*\/?>$/gi,"").trim()).filter(J=>J.length>10),H=["Вітер Змін","Прихована Пастка","Золотий Квиток"],q=[[],[],[]];let Q=-1;for(const J of B){const et=J.replace(/<[^>]*>/g,""),Z=H.findIndex(rt=>et.includes(rt));if(Z!==-1){if(Q=Z,et.replace(/[:\s]/g,"").length<40)continue;const rt=J.replace(/<(?:span[^>]*|b)>[^<]*(?:Вітер Змін|Прихована Пастка|Золотий Квиток)[^<]*<\/(?:span|b)>/gi,"").replace(/^[:\s]+/g,"").trim();rt&&q[Q].push(rt);continue}Q>=0?q[Q].push(J):q[0].push(J)}$=I.map((J,et)=>({...J,content:K(q[et].join("<br><br>"))}))}($.length===0||$.every(L=>!L.content))&&($=[{emoji:"🔮",title:"Попередній Прогноз",content:K(C.forecast_preview||"")}]),R=g+`
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
        `+$.map((L,B)=>{const H=B===0,q=B===$.length-1;return`
                <div class="accordion-item ${H?"accordion-open":""}" style="
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
                    " data-index="${B}">
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
                            <span style="font-size: 1.2em;">${L.emoji}</span> ${L.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em; transition: transform 0.3s ease;">▼</span>
                    </div>

                    <div class="accordion-content" style="
                        max-height: ${H?"1000px":"0"};
                        overflow: hidden;
                        transition: max-height 0.4s ease-out;
                    ">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${L.content}
                            
                            ${q?"":`
                                <button class="next-section-btn" data-target="${B+1}" style="
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
            `}).join("")}else if(C.superpower||C.blind_spot||C.teaser_hook){console.log("Rendering Partner Match Data...");let g=[];C.superpower&&g.push(`<div class="mb-4"><h4 style="color: var(--accent-color); font-weight: 700; margin-bottom: 5px;">${C.superpower.title||"Твоя Суперсила"}</h4><p>${K(C.superpower.text)}</p></div>`),C.blind_spot&&g.push(`<div class="mb-4"><h4 style="color: var(--accent-color); font-weight: 700; margin-bottom: 5px;">${C.blind_spot.title||"Сліпа Зона"}</h4><p>${K(C.blind_spot.text)}</p></div>`),C.teaser_hook&&g.push(`<div class="mt-5 p-4 rounded-lg" style="background: rgba(205, 164, 94, 0.1);"><h4 style="color: #fff; font-weight: 700;">${C.teaser_hook.title||"Ключ до щастя"} 🗝️</h4><p>${K(C.teaser_hook.text)}</p></div>`),R=g.join("")}else if(C.psychological_analysis||C.content_blocks){const g=[{emoji:"✨",title:"Твій Зірковий Архетип"},{emoji:"⚡️",title:"Прихований Внутрішній Конфлікт"},{emoji:"🗝️",title:"Твій Ключ до Змін"}];let I=[];if(C.content_blocks){let U=K(C.content_blocks.archetype||"");if(G&&G!=="твого архетипу"){const L=G.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),B=new RegExp(`(<span[^>]*font-weight:\\s*normal;?[^>]*>)(${L})(<\\/span>)`,"gi");if(U.match(B))U=U.replace(B,'<span style="color: var(--primary-text-color); font-weight: 700;">$2</span>');else{const H=new RegExp(`(${L})`,"gi");U=U.replace(H,'<span style="color: var(--primary-text-color); font-weight: 700;">$1</span>')}}I=[{...g[0],content:U},{...g[1],content:K(C.content_blocks.conflict||"")},{...g[2],content:K(C.content_blocks.solution||"")}]}else{const U=C.psychological_analysis||"",L=U.split(/(?:\\n\\n|\n\n|<br\s*\/?>\s*<br\s*\/?>)/gi).map(B=>B.trim()).filter(B=>B.length>20);I=g.map((B,H)=>{let q="";return L.length>=3?H<2?q=L[H]:q=L.slice(H).join("<br><br>"):L.length===2?(H===0&&(q=L[0]),H===1&&(q=L[1]),H===2&&(q="Це лише початок твоєї історії... Справжня глибина розкриється у повному звіті.")):(H===0&&(q=U),H===1&&(q="Ця частина твого характеру часто залишається в тіні, але саме вона дає тобі перевагу в критичні моменти."),H===2&&(q="Твоя карта містить ще багато таємниць, які ми готові розкрити.")),{...B,content:K(q)}})}R=`
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
        `+I.map((U,L)=>{const B=L===0,H=L===2;return`
                <div class="accordion-item ${B?"accordion-open":""}" style="
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
                    " data-index="${L}">
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
                        max-height: ${B?"1000px":"0"};
                        overflow: hidden;
                        transition: max-height 0.4s ease-out;
                    ">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${U.content}
                            
                            ${H?`
                                <div id="last-accordion-item-extras">
                                    <!-- Marketing / Feedback injected here -->
                                </div>
                            `:`
                                <button class="next-section-btn" data-target="${L+1}" style="
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
            `}).join("")}else R="<p>Дані відсутні.</p>";let y=C.title||"Результат";if(C.archetype_she&&C.archetype_he&&(y=`💖 Твій Любовний Сценарій: ${C.archetype_she} та ${C.archetype_he}`),e.innerText="Аналіз твоєї особистості",r.innerHTML=y,s.innerHTML=R,V(s),F&&F.ui&&F.ui.results){const g=F.ui.results;if(g.title&&(e.innerText=g.title),g.marketingHook){const I=document.querySelector("#marketing-hook-block p");I&&(I.innerHTML=g.marketingHook)}if(g.features&&Array.isArray(g.features)){const I=document.querySelector("#marketing-hook-block ul");I&&(I.innerHTML=g.features.map($=>`
                    <li class="flex items-center"><span class="mr-2 text-xl">${$.icon}</span> ${$.text}</li>
                `).join(""))}if(g.buttonText){const I=o.querySelector(".btn-text");I&&(I.innerHTML=`
                    ${g.buttonText}
                    <span class="font-bold tracking-widest flex gap-[1px]">
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                    </span>
                `)}}const f=["natal_chart_price","natal_chart_offer","natal_chart_offer1uah","natal_chart_landoffer","natal_chart_sale"].includes(F?.id),b=["natal_chart_offer","natal_chart_offer1uah","natal_chart_landoffer","natal_chart_sale"].includes(F?.id);if(f){let g=function(){!_||!T||(_.value?(T.innerText=_.value,T.style.color="var(--primary-text-color)",x&&x.classList.remove("input-error"),O&&(O.style.display="none")):(T.innerText="Обери час",T.style.color="var(--secondary-text-color)"))};if(l&&(l.style.display="none"),d&&(d.style.display="none"),p&&(p.style.display="block"),h&&(h.style.display="block"),b){const I=ce();Yn(),e&&(e.innerText="Твій Персональний Розбір");const $=o.querySelector(".btn-text");$&&($.innerHTML=`
                    <span class="flex flex-col items-center gap-0 w-full">
                        <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${I.display.FULL_REPORT} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">${I.display.FULL_REPORT_OLD} грн</span></span>
                        <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Одноразовий платіж • Довічний доступ</span>
                    </span>
                `);const U=document.getElementById("footer-trust-text");U&&(U.innerHTML='<span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">🔒 Безпечна оплата через Monobank</span>'),document.querySelectorAll(".offer-landing-block").forEach(et=>et.style.display="block");const B=document.getElementById("offer-form-divider");B&&(B.style.display="block");const H=document.getElementById("offer-urgency-timer");if(H){let et=900;const Z=document.getElementById("offer-timer-display");Z&&!window._offerTimerStarted&&(window._offerTimerStarted=!0,setInterval(()=>{et--,et<0&&(et=0);const rt=Math.floor(et/60).toString().padStart(2,"0"),st=(et%60).toString().padStart(2,"0");Z.textContent=`${rt}:${st}`},1e3))}const q=document.querySelector(".sticky-paywall-footer");q&&(q.style.opacity="0",q.style.transform="translateY(100%)",q.style.transition="opacity 0.5s ease, transform 0.5s ease",q.style.pointerEvents="none");const Q=document.getElementById("offer-form-divider");if(Q&&q&&"IntersectionObserver"in window){const et=new IntersectionObserver(Z=>{Z.forEach(rt=>{rt.isIntersecting&&(H&&(H.style.display="block"),q.style.opacity="1",q.style.transform="translateY(0)",q.style.pointerEvents="auto",et.disconnect())})},{threshold:.3});et.observe(Q)}else H&&(H.style.display="block"),q&&(q.style.opacity="1",q.style.transform="translateY(0)",q.style.pointerEvents="auto");const J=document.getElementById("offer-astro-data-container");if(J){const et=E.get("userData")||{date:E.get("date"),time:E.get("time"),city:E.get("city"),geo:E.get("geo")};Is(et).then(Z=>{Z&&(J.innerHTML=Z)})}if(setTimeout(()=>{const et=document.getElementById("last-accordion-item-extras");if(et){let Z="";v&&v.hook&&v.hook.template&&(Z=`<p style="color: var(--primary-text-color); font-size: 0.95em; line-height: 1.6; margin-bottom: 12px;">${v.hook.template.replace(/{archetype}/g,`<span style="color: var(--primary-text-color); font-weight: 700;">${G}</span>`)}</p>`),et.innerHTML=`
                        <div style="margin-top: 20px; padding: 18px 16px; background: rgba(205, 164, 94, 0.08); border: 1px solid rgba(205, 164, 94, 0.2); border-radius: 12px;">
                            ${Z}
                            <p style="color: var(--secondary-text-color); font-size: 0.88em; line-height: 1.6; margin: 0;">
                                Важливо знати власні «природні налаштування», щоб використовувати свої сильні сторони на повну і знати свої слабкі сторони, щоб двічі не наступати на ті самі граблі.<br>
                                Відповіді на всі твої запитання вже закладені у твоїй Натальній карті.
                            </p>
                        </div>
                    `;const rt=et.closest(".accordion-content");if(rt){const st=rt.closest(".accordion-item");st&&st.classList.contains("accordion-open")&&(rt.style.maxHeight=parseInt(rt.style.maxHeight||0)+350+"px")}}},100),v){const et=ce(),Z=Math.round((et.display.FULL_REPORT_OLD-et.display.FULL_REPORT)/et.display.FULL_REPORT_OLD*100),rt=document.getElementById("offer-comparison-block"),st=document.getElementById("comparison-table-content");if(v.comparison&&rt&&st){const{title:gt,headers:it,rows:ot}=v.comparison,ft=document.getElementById("comparison-table-title");ft&&gt&&(ft.innerHTML=gt);const dt=ot.map(yt=>{const Kt=Et=>Et==="check"?'<span class="offer-comparison-icon check">✅</span>':Et==="cross"?'<span class="offer-comparison-icon cross">❌</span>':Et==="discount"||typeof Et=="string"&&Et.startsWith("discount:")?`
                                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
                                        <span class="offer-comparison-icon bonus" style="margin: 0; line-height: 1;">🎁</span>
                                        <div class="bonus-tag" style="margin-top: 0;">ЗНИЖКА ${Et.includes(":")?Et.split(":")[1]:Z}%</div>
                                    </div>
                                `:Et==="bonus"?`
                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
                                    <span class="offer-comparison-icon bonus" style="margin: 0; line-height: 1;">🎁</span>
                                    <div class="bonus-tag" style="margin-top: 0;">БЕЗКОШТОВНО</div>
                                </div>
                            `:Et;return`
                            <tr>
                                <td>${yt.label}</td>
                                <td>${Kt(yt.free)}</td>
                                <td class="highlight-col">${Kt(yt.premium)}</td>
                            </tr>
                        `}).join("");st.innerHTML=`
                        <table class="offer-comparison-table shadow-xl">
                            <thead>
                                <tr>
                                    <th>${it[0]||"Функція"}</th>
                                    <th style="opacity: 0.6;">${it[1]||"Free"}</th>
                                    <th class="highlight-col premium-header">${it[2]||"Premium"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dt}
                            </tbody>
                        </table>
                    `,rt.style.display="block"}const ht=document.getElementById("offer-preview-block");if(ht&&v.mockup){const gt=document.getElementById("mockup-title-heading");gt&&(gt.innerText=v.mockup.title,gt.style.display="block");const it=document.getElementById("mockup-carousel-scroll"),ot=document.getElementById("destiny-dots-new");it&&v.mockup.images?.length>0&&(it.innerHTML=v.mockup.images.map(dt=>`
                            <div class="carousel-slide">
                                <img src="${dt}" class="offer-mockup-image" alt="PDF Preview">
                            </div>
                        `).join(""),ot&&(ot.innerHTML=v.mockup.images.map((dt,yt)=>`<div class="destiny-dot ${yt===0?"active":""}"></div>`).join("")),setTimeout(()=>{const dt=ot?ot.querySelectorAll(".destiny-dot"):[];it&&dt.length>0&&it.addEventListener("scroll",()=>{const yt=Math.round(it.scrollLeft/it.clientWidth);dt.forEach((Kt,Et)=>Kt.classList.toggle("active",Et===yt))},{passive:!0})},100));const ft=document.getElementById("mockup-caption-text");ft&&v.mockup.caption&&(ft.innerText=v.mockup.caption),ht.style.display="block"}const vt=F.landingSections;if(vt?.transformation){const gt=document.getElementById("offer-block-transformation-s3"),it=document.getElementById("s3-transformation-title"),ot=document.getElementById("s3-transformation-before"),ft=document.getElementById("s3-transformation-after");gt&&it&&ot&&ft&&(it.innerHTML=vt.transformation.title,ot.textContent=vt.transformation.before,ft.textContent=vt.transformation.after,gt.style.display="block")}if(vt?.audience){const gt=document.getElementById("offer-block-audience-s3"),it=document.getElementById("s3-audience-title"),ot=document.getElementById("s3-audience-for-list"),ft=document.getElementById("s3-audience-not-list"),dt=document.getElementById("s3-audience-not-subtitle");gt&&it&&ot&&ft&&(it.innerHTML=vt.audience.title,ot.innerHTML=vt.audience.for_who.map(yt=>`<li>${yt}</li>`).join(""),ft.innerHTML=vt.audience.not_for_who.map(yt=>`<li>${yt}</li>`).join(""),dt&&vt.audience.negativeSubtitle&&(dt.textContent=vt.audience.negativeSubtitle),gt.style.display="block")}const wt=document.getElementById("reviews-list"),te=F.landingSections?.testimonials||[];wt&&te.length>0&&(wt.innerHTML=te.map(gt=>`
                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <img src="${gt.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(205, 164, 94, 0.3);">
                                <div>
                                    <div style="color: #fff; font-weight: 600; font-size: 0.95em;">${gt.name}</div>
                                    <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                                </div>
                            </div>
                            <p class="review-text" style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">
                                "${gt.text}"
                            </p>
                        </div>
                    `).join(""));const Mt=document.getElementById("s3-live-women-counter");if(Mt){const it={forecast:"forecast_counter",natal_child:"natal_child_counter",man:"man_women_counter",man1uah:"man_women_counter",natal_chart_landoffer:"natal_chart_counter",natal_chart_sale:"natal_chart_counter"}[F.id]||"natal_chart_counter",ot=(yt,Kt)=>{const Et=yt.toLocaleString("uk-UA").replace(/\u00a0/g," ");Mt.innerText!==Et&&(Mt.innerText=Et,Kt&&(Mt.style.transform="scale(1.15)",Mt.style.transition="transform 0.2s ease",setTimeout(()=>{Mt.style.transform="scale(1)"},250)))};let ft=parseInt(localStorage.getItem(it))||15420;ot(ft,!1);const dt=()=>{const yt=Math.random()*4e3+4e3;setTimeout(()=>{const Kt=Math.floor(Math.random()*3)+1;ft=(parseInt(localStorage.getItem(it))||ft)+Kt,localStorage.setItem(it,ft),ot(ft,!0),dt()},yt)};dt(),window.addEventListener("storage",yt=>{yt.key===it&&(ft=parseInt(yt.newValue)||ft,ot(ft,!0))})}const qt=document.getElementById("faq-list"),Yt=F.landingSections?.faq||[];qt&&Yt.length>0&&(qt.innerHTML=Yt.map((gt,it)=>`
                        <div class="offer-faq-item">
                            <div class="offer-faq-question" onclick="this.parentElement.classList.toggle('faq-open')">
                                <span>${gt.q}</span>
                                <span class="offer-faq-arrow">▼</span>
                            </div>
                            <div class="offer-faq-answer">
                                <p>${gt.a}</p>
                            </div>
                        </div>
                    `).join(""))}}else{const I=o.querySelector(".btn-text");I&&(I.innerHTML=`
                    Дізнатися всі подробиці
                    <span class="font-bold tracking-widest flex gap-[1px]">
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                    </span>
                `)}_&&(_.addEventListener("input",g),_.addEventListener("change",g),_.addEventListener("blur",g),g()),D&&D.addEventListener("input",()=>{S&&(S.style.display="none"),A&&(A.style.display="none"),D.classList.remove("input-error")})}function w(g,I){g&&(I?(g.classList.add("loading"),g.disabled=!0):(g.classList.remove("loading"),g.disabled=!1))}function k(g,I){!S||!D||(g==="ambiguous"?S.innerText=`Місто "${I}" знайдено в кількох місцях. Уточни, додавши країну (напр: ${I}, Україна).`:S.innerText=`Не можемо знайти місто "${I}". Перевір назву.`,S.style.display="block",D.classList.add("input-error"))}o.addEventListener("click",async()=>{if(f){const g=_?_.value:"";let I=D?D.value.trim():"";const $=I;let U=!1;if(S&&(S.style.display="none"),O&&(O.style.display="none"),x&&x.classList.remove("input-error"),D&&D.classList.remove("input-error"),I||(D&&D.classList.add("input-error"),S&&(S.innerText="Будь ласка, введи місто народження.",S.style.display="block"),U=!0),g||(x&&x.classList.add("input-error"),O&&(O.style.display="block"),U=!0),U){h&&h.scrollIntoView({behavior:"smooth",block:"center"}),navigator.vibrate&&navigator.vibrate(50);return}w(o,!0);const L=await je(I);let B=null;if(L&&L.latitude?(L.corrected_name&&(D&&(D.value=L.corrected_name),I=L.corrected_name,$.toLowerCase()!==L.corrected_name.toLowerCase()&&(B=`Ми уточнили: ${L.corrected_name} 😉`)),E.set("geo",{latitude:L.latitude||L.lat,longitude:L.longitude||L.lon,timezone:L.timezone}),E.set("city",L.corrected_name)):L&&L.error==="ambiguous"?(k("ambiguous",I),U=!0):(k("not_found",I),U=!0),B&&A?(A.innerText=B,A.style.display="block"):A&&(A.style.display="none"),U){w(o,!1),navigator.vibrate&&navigator.vibrate(50);return}E.set("time",g);const H={date:E.get("date"),time:g,city:E.get("city"),geo:E.get("geo")};if(E.set("userData",H),b){const q=async()=>{try{const Q=ce();window.DC_Analytics?.trackBeginCheckout&&window.DC_Analytics.trackBeginCheckout(Q.charge.FULL_REPORT,"Natal Chart Full Report");const J=E.get("planets");let et=J?{...H,planets:J}:{...H};const Z=F?.productName||"Natal Chart Full Report",rt=E.get("email")||"";try{localStorage.setItem("pendingVariantId",F.id)}catch{}let st="source=offer";F?.id&&(st+=`&variant=${F.id}`),await un({name:Z,price:Q.charge.FULL_REPORT},{email:rt},et,{returnQueryParams:st,variant:F?.id})}catch(Q){console.error("❌ Offer Payment Error:",Q),w(o,!1)}};B?setTimeout(q,1200):q();return}setTimeout(()=>{n.navigateTo("paywall")},B?1200:0)}else n.navigateTo("premium")}),z&&z.addEventListener("click",async()=>{if(!f)return;let g=D?D.value.trim():"";const I=g;if(S&&(S.style.display="none"),O&&(O.style.display="none"),D&&D.classList.remove("input-error"),x&&x.classList.remove("input-error"),!g){D&&D.classList.add("input-error"),S&&(S.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",S.style.display="block"),navigator.vibrate&&navigator.vibrate(50);return}w(o,!0),z.disabled=!0;const $=await je(g);let U=null,L=!1;if($&&$.latitude?($.corrected_name&&(D&&(D.value=$.corrected_name),g=$.corrected_name,I.toLowerCase()!==$.corrected_name.toLowerCase()&&(U=`Ми уточнили: ${$.corrected_name} 😉`)),E.set("geo",{latitude:$.latitude||$.lat,longitude:$.longitude||$.lon,timezone:$.timezone}),E.set("city",$.corrected_name),E.set("time","")):$&&$.error==="ambiguous"?(k("ambiguous",g),L=!0):(k("not_found",g),L=!0),U&&A&&(A.innerText=U,A.style.display="block"),L){w(o,!1),z.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}const B={date:E.get("date"),time:"",city:E.get("city"),geo:E.get("geo")};if(E.set("userData",B),b){const H=async()=>{try{const q=ce();window.DC_Analytics?.trackBeginCheckout&&window.DC_Analytics.trackBeginCheckout(q.charge.FULL_REPORT,"Natal Chart Full Report");const Q=E.get("planets");let J=Q?{...B,planets:Q}:{...B};const et=F?.productName||"Natal Chart Full Report",Z=E.get("email")||"";try{localStorage.setItem("pendingVariantId",F.id)}catch{}let rt="source=offer";F?.id&&(rt+=`&variant=${F.id}`),await un({name:et,price:q.charge.FULL_REPORT},{email:Z},J,{returnQueryParams:rt,variant:F?.id})}catch(q){console.error("❌ Offer Skip Payment Error:",q),w(o,!1),z.disabled=!1}};U?setTimeout(H,1200):H();return}setTimeout(()=>{n.navigateTo("paywall")},U?1200:0)}),u();function u(){if(document.querySelector(".feedback-controls"))return;const g=document.createElement("div");g.className="feedback-controls";const I=document.createElement("div");I.className="feedback-buttons";const $=M("👍","like"),U=M("👎","dislike");I.appendChild(U),I.appendChild($),g.appendChild(I),s&&s.parentNode?s.after(g):console.warn("Feedback System: Could not find insertion point (freeReportTextEl)")}function M(g,I){const $=document.createElement("div");return $.className="btn-feedback-icon",$.innerText=g,$.onclick=async()=>{$.parentElement.querySelectorAll(".btn-feedback-icon").forEach(L=>L.classList.remove("active")),$.classList.add("active"),await Wr.send({type:I,value:I,source:"free_report"}),Y("Дякую! 💜")},$}function Y(g){const I=document.createElement("div");I.innerText=g,I.style.position="fixed",I.style.top="20px",I.style.left="50%",I.style.transform="translate(-50%, -20px)",I.style.background="linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)",I.style.color="#fff",I.style.border="1px solid rgba(205, 164, 94, 0.3)",I.style.boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px -3px rgba(205, 164, 94, 0.1)",I.style.padding="12px 24px",I.style.borderRadius="99px",I.style.fontWeight="bold",I.style.opacity="0",I.style.transition="all 0.3s ease",I.style.zIndex="2000",document.body.appendChild(I),requestAnimationFrame(()=>{I.style.opacity="1",I.style.transform="translate(-50%, 0)"}),setTimeout(()=>{I.style.opacity="0",I.style.transform="translate(-50%, -20px)",setTimeout(()=>document.body.removeChild(I),300)},900)}function V(g){const I=g.querySelectorAll(".accordion-header"),$=g.querySelectorAll(".accordion-item"),U=g.querySelectorAll(".next-section-btn");function L(B,H=!1){$.forEach((q,Q)=>{const J=q.querySelector(".accordion-content"),et=q.querySelector(".accordion-icon");Q===B?(q.classList.contains("accordion-open")?(q.classList.remove("accordion-open"),J&&(J.style.maxHeight=null),et&&(et.style.transform="rotate(0deg)")):(q.classList.add("accordion-open"),J&&(J.style.maxHeight=J.scrollHeight+300+"px"),et&&(et.style.transform="rotate(180deg)")),setTimeout(()=>{const Z=q.querySelector(".accordion-header");Z&&Z.scrollIntoView({behavior:"smooth",block:"start"})},300)):H||(q.classList.remove("accordion-open"),J&&(J.style.maxHeight=null),et&&(et.style.transform="rotate(0deg)"))})}I.forEach(B=>{B.addEventListener("click",()=>{const H=parseInt(B.getAttribute("data-index"));L(H,!0)})}),U.forEach(B=>{B.addEventListener("click",H=>{H.stopPropagation();const q=parseInt(B.getAttribute("data-target"));q<$.length&&L(q,!0)})})}}const vf=`<section id="premium-data-step" class="funnel-step active space-y-5 text-center" style="padding-bottom: 110px;">

    <div class="space-y-2">
        <h2 class="text-2xl font-bold text-white tracking-tight">
            Отримай повну розшифровку своєї Натальної карти
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
</section>`;function bf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=vf;const e=document.getElementById("birth-time"),r=document.getElementById("time-placeholder"),s=e.closest(".input-field"),o=document.getElementById("time-error-message"),l=document.getElementById("birth-city"),d=document.getElementById("city-error-message"),p=document.getElementById("city-info-message"),h=document.getElementById("continue-to-paywall-button"),_=document.getElementById("skip-button"),T=E.get("currentVariant");if(T&&T.ui&&T.ui.premium){const S=T.ui.premium,A=document.querySelector("h2");A&&S.title&&(A.innerText=S.title);const z=document.querySelector(".space-y-2 p.text-sm");if(z&&S.subtitle&&(z.innerText=S.subtitle),S.features&&Array.isArray(S.features)){const C=document.querySelector(".max-w-\\[340px\\] ul");C&&(C.innerHTML=S.features.map(R=>`
                    <li class="flex items-center gap-3">
                        <span class="text-lg min-w-[24px] text-center">${R.icon}</span>
                        <span style="color: var(--primary-text-color);">${R.text}</span>
                    </li>
                `).join(""))}if(S.buttonText){const C=h.querySelector(".btn-text");C&&(C.innerText=S.buttonText)}}function x(){!e||!r||(e.value?(r.innerText=e.value,r.style.color="var(--primary-text-color)",s&&s.classList.remove("input-error"),o&&(o.style.display="none")):(r.innerText="Обери час",r.style.color="var(--secondary-text-color)"))}e.addEventListener("input",x),e.addEventListener("change",x),e.addEventListener("blur",x),x(),l.addEventListener("input",()=>{d.style.display="none",p.style.display="none",l.classList.remove("input-error")});function O(S,A){S&&(A?(S.classList.add("loading"),S.disabled=!0):(S.classList.remove("loading"),S.disabled=!1))}function D(S,A){S==="ambiguous"?d.innerText=`Місто "${A}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну (наприклад: ${A}, Україна).`:d.innerText=`Не можемо знайти місто "${A}". Перевірте назву.`,d.style.display="block",l.classList.add("input-error")}h.addEventListener("click",async()=>{const S=e.value;let A=l.value.trim();const z=A;let C=!1;if(d.style.display="none",o.style.display="none",s.classList.remove("input-error"),l.classList.remove("input-error"),A||(l.classList.add("input-error"),d.innerText="Будь ласка, введи місто народження.",d.style.display="block",C=!0),S||(s.classList.add("input-error"),o.style.display="block",C=!0),!A&&C){navigator.vibrate&&navigator.vibrate(50);return}O(h,!0);const R=await je(A);let K=null;if(R&&R.latitude?(R.corrected_name&&(l.value=R.corrected_name,A=R.corrected_name,z.toLowerCase()!==R.corrected_name.toLowerCase()&&(K=`Ми уточнили: ${R.corrected_name} 😉`)),E.set("geo",{latitude:R.latitude||R.lat,longitude:R.longitude||R.lon,timezone:R.timezone}),E.set("city",R.corrected_name)):R&&R.error==="ambiguous"?(D("ambiguous",A),C=!0):(D("not_found",A),C=!0),K?(p.innerText=K,p.style.display="block"):p.style.display="none",C){O(h,!1),navigator.vibrate&&navigator.vibrate(50);return}E.set("time",S);const F={date:E.get("date"),time:S,city:E.get("city"),geo:E.get("geo")};E.set("userData",F),setTimeout(()=>{n.navigateTo("paywall")},K?1200:0)}),_.addEventListener("click",async()=>{let S=l.value.trim();const A=S;if(d.style.display="none",o.style.display="none",l.classList.remove("input-error"),s.classList.remove("input-error"),!S){l.classList.add("input-error"),d.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",d.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}O(h,!0),_.disabled=!0;const z=await je(S);let C=null,R=!1;if(z&&z.latitude?(z.corrected_name&&(l.value=z.corrected_name,S=z.corrected_name,A.toLowerCase()!==z.corrected_name.toLowerCase()&&(C=`Ми уточнили: ${z.corrected_name} 😉`)),E.set("geo",{latitude:z.latitude||z.lat,longitude:z.longitude||z.lon,timezone:z.timezone}),E.set("city",z.corrected_name),E.set("time","")):z&&z.error==="ambiguous"?(D("ambiguous",S),R=!0):(D("not_found",S),R=!0),C&&(p.innerText=C,p.style.display="block"),R){O(h,!1),_.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}console.log("User skipped time, but city is valid.");const K={date:E.get("date"),time:"",city:E.get("city"),geo:E.get("geo")};E.set("userData",K),setTimeout(()=>{n.navigateTo("paywall")},C?1200:0)})}const xf=`<!-- 🔥 UPDATE: Додано padding-bottom: 140px, щоб відповідати компактнішому футеру -->
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
            <span class="btn-text flex flex-col items-center justify-center gap-0 w-full tracking-tighter overflow-hidden">
                <span class="flex items-center justify-center gap-1 xs:gap-2 whitespace-nowrap text-center">
                    <span class="text-[13px] xs:text-[16px] sm:text-[19px] font-bold leading-tight tracking-tighter">
                        Розблокувати зараз за 347 грн
                    </span>
                    <span
                        class="whitespace-nowrap text-[11px] xs:text-sm font-normal opacity-60 line-through decoration-white/50 leading-none pb-[1px]">
                        1499 грн
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
</section>`;function _f(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=xf,t.scrollTop=0,window.scrollTo(0,0);const e=ce(),r=document.getElementById("paywall-timer"),s=document.getElementById("paywall-astro-data"),o=document.querySelector(".static-placeholder"),l=document.getElementById("final-checkout-button"),d=document.getElementById("paywall-popup"),p=document.getElementById("popup-title"),h=document.getElementById("popup-text"),_=document.getElementById("popup-checkout-btn"),T=document.getElementById("popup-close-btn"),x=document.getElementById("popup-close-icon");Yn();function O(){const F=l.querySelector(".btn-text span span.font-bold");F&&(F.innerText=`Розблокувати все за ${e.display.FULL_REPORT} грн`);const G=l.querySelector(".line-through");G&&(G.innerText=`${e.display.FULL_REPORT_OLD||799} грн`);const v=_.querySelector(".font-bold");v&&(v.innerText=`Розблокувати все за ${e.display.FULL_REPORT} грн`)}O();const D=E.get("currentVariant");if(D&&D.ui&&D.ui.paywall){const F=D.ui.paywall,G=document.querySelector("h2");G&&F.title&&(G.innerHTML=F.title);const v=document.querySelector("p.text-sm.sm\\:text-base");if(v&&F.description&&(v.innerHTML=F.description),F.features&&Array.isArray(F.features)){const y=document.querySelector(".space-y-3.pt-2");if(y){const f=b=>b?b.replace(/'/g,"\\'").replace(/"/g,"&quot;"):"";y.innerHTML=F.features.map(b=>`
                    <div class="paywall-item" onclick="showPaywallPopup('${f(b.popupTitle||b.title)}', '${f(b.popupText||b.text)}')">
                        <span class="paywall-icon">${b.icon}</span>
                        <div>
                            <span class="block font-bold text-white text-[15px]">${b.title}</span>
                            <span class="text-xs text-gray-400">${b.text}</span>
                        </div>
                    </div>
                `).join("")}}if(F.buttonText){const y=l.querySelector(".btn-text span span.font-bold");y&&(y.innerText=`${F.buttonText} за ${e.display.FULL_REPORT} грн`);const f=l.querySelector(".line-through");f&&(f.innerText=`${e.display.FULL_REPORT_OLD} грн`);const b=_.querySelector(".font-bold");b&&(b.innerText=`${F.buttonText} за ${e.display.FULL_REPORT} грн`)}}window.showPaywallPopup=function(F,G){d&&p&&h&&(p.innerText=F,h.innerHTML=G,d.style.display="flex")};const S=()=>{d&&(d.style.display="none")};T&&T.addEventListener("click",()=>{Rt.trigger("light"),S()}),x&&x.addEventListener("click",()=>{Rt.trigger("light"),S()}),_&&_.addEventListener("click",()=>{Rt.trigger("heavy"),S(),K(l)}),d&&d.addEventListener("click",F=>{F.target===d&&S()});const A=E.get("userData")||{date:E.get("date"),time:E.get("time"),city:E.get("city"),geo:E.get("geo")};s&&Is(A).then(F=>{if(F){o&&(o.style.display="none"),s.innerHTML=F,s.style.display="block";const G=E.get("currentVariant");if(G&&G.productType==="partner"){const v=s.querySelector(".astro-data-title");v&&(v.innerText="Твій Астро-Код Кохання")}}else s.style.display="none"});const z=()=>{const F=E.get("currentVariant");if(F&&F.productType==="partner"){window.showPaywallPopup("🔑 Код Твого Кохання",`
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
        `)};s&&s.addEventListener("click",()=>{Rt.trigger("medium"),z()}),window.paywallInterval&&clearInterval(window.paywallInterval);let C=420;function R(){if(!r)return;const F=Math.floor(C/60),G=C%60;r.textContent=`${F<10?"0":""}${F}:${G<10?"0":""}${G}`,--C<0&&(C=0,clearInterval(window.paywallInterval))}R(),window.paywallInterval=setInterval(R,1e3);async function K(F){F.classList.add("loading"),F.disabled=!0;const G=F.querySelector(".btn-text");G&&(F.dataset.originalText=G.innerHTML,G.innerHTML=`<span class="text-lg">З'єднуюсь з банком...</span>`);try{const v=E.get("userData")||{date:E.get("date"),time:E.get("time"),city:E.get("city"),geo:E.get("geo")},y=E.get("planets");let f=y?{...v,planets:y}:{...v};const b=E.get("currentVariant");if(b&&b.id==="natal_child"){const M=localStorage.getItem("childGender");M&&(f.childGender=M,console.log("👶 Injected childGender into payload:",M))}y?console.log("🪐 Planets attached to payment payload:",y.length,"bodies"):console.warn("⚠️ No pre-calculated planets found in state. Backend will use date only."),console.log("📦 Preparing backup data for Safari:",f);const w=b&&b.productName?b.productName:"Natal Chart Full Report",k=E.get("email")||"";if(b&&b.id)try{localStorage.setItem("pendingVariantId",b.id),console.log("💾 Backup Variant ID to LocalStorage:",b.id)}catch(M){console.warn("LocalStorage backup failed",M)}let u="source=paywall";b&&b.id&&(u+=`&variant=${b.id}`),await un({name:w,price:e.charge.FULL_REPORT},{email:k},f,{returnQueryParams:u,variant:b?.id})}catch(v){console.error("Payment error:",v),F.classList.remove("loading"),F.disabled=!1,G&&F.dataset.originalText&&(G.innerHTML=F.dataset.originalText)}}l&&l.addEventListener("click",()=>{Rt.trigger("heavy"),K(l)})}const wf=`<section id="success-step" class="funnel-step active space-y-6">
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
                        style="text-decoration: line-through; opacity: 0.7;">1499 грн</span> (знижка 85%)</span>
            </p>

            <button id="ltv-upsell-btn" class="btn btn-violet w-full opacity-90 hover:opacity-100">
                <!-- 🔥 UPDATE: Оновлено ціни апселу -->
                <span class="btn-text">Так, додати Прогноз всього за 199 грн. <span
                        style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">1499
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
</section>`;function Ef(){if(document.getElementById("global-info-modal"))return;document.body.insertAdjacentHTML("beforeend",`
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
    `);const t=document.getElementById("global-info-modal"),e=document.getElementById("global-modal-close"),r=()=>{t.style.display="none"};e.addEventListener("click",r),t.addEventListener("click",s=>{s.target===t&&r()})}function Un(n,t){Ef();const e=document.getElementById("global-info-modal"),r=document.getElementById("global-modal-title"),s=document.getElementById("global-modal-message");e&&r&&s?(r.innerText=n,s.innerHTML=t,e.style.display="flex"):alert(`${n}

${t}`)}async function Tf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=wf;const e=new URLSearchParams(window.location.search),r=e.get("orderRef"),s=e.get("upsell_source"),o=e.get("variant");if(o&&Xe[o]&&(console.log("🔄 Restoring Variant Session:",o),E.set("currentVariant",Xe[o])),r){console.log("💳 Validating payment & restoring session:",r);const C=document.createElement("div");C.className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center fixed top-0 left-0 w-full h-full",C.style.zIndex="9999",C.innerHTML='<div class="spinner"></div>',document.body.appendChild(C);try{const R=await zl({invoiceId:E.get("pendingInvoiceId"),orderRef:r});if(R.status==="approved"||R.status==="success"){if(console.log("✅ Payment Validated!"),R.variant&&Xe[R.variant]&&(console.log("🔄 Restoring Variant from Backend:",R.variant),E.set("currentVariant",Xe[R.variant])),R.trafficSource&&(console.log("🛰️ Restoring Traffic Source from Backend:",R.trafficSource),E.set("traffic_type",R.trafficSource)),!E.get("currentVariant")){const K=localStorage.getItem("pendingVariantId");K&&Xe[K]&&(console.log("🔄 Restoring Variant from LocalStorage:",K),E.set("currentVariant",Xe[K]))}if(localStorage.removeItem("pendingVariantId"),E.set("isPaid",!0),E.set("currentInvoiceId",R.invoiceId),!E.get("purchaseTracked")){if(window.DC_Analytics){const{charge:K}=ce();window.DC_Analytics.trackPurchase(K.FULL_REPORT,R.invoiceId||r,"Natal Chart Full Report")}E.set("purchaseTracked",!0)}if(R.userData&&(E.set("userData",R.userData),R.userData.date&&E.set("date",R.userData.date),R.userData.time&&E.set("time",R.userData.time),R.userData.city&&E.set("city",R.userData.city),R.userData.geo&&E.set("geo",R.userData.geo)),R.userEmail&&E.set("email",R.userEmail),C.remove(),!s){const K=E.get("userData")||{date:E.get("date"),time:E.get("time"),city:E.get("city")},F=E.get("currentVariant");if(F&&F.id==="natal_child"){const G=localStorage.getItem("childGender");G&&(K.childGender=G,console.log("👶 Injected childGender into background generation payload:",G))}_a(K).catch(G=>console.warn("Bg gen error",G))}}else{alert(`Оплата не підтверджена. Статус: ${R.status}`),C.remove(),n.navigate("/paywall");return}}catch(R){console.error(R),C.remove(),alert("Помилка перевірки статусу.")}}const l=document.getElementById("email-form"),d=document.getElementById("user-email"),p=document.getElementById("main-report-btn"),h=document.getElementById("ltv-upsell-box"),_=document.getElementById("ltv-upsell-btn"),T=document.getElementById("upsell-success-modal"),x=document.getElementById("upsell-success-form"),O=document.getElementById("upsell-success-email");d&&d.addEventListener("input",C=>{const R=C.target.value.trim();R&&E.set("email",R)});function D(){const C=ce(),R=E.get("currentVariant"),F=(R?.productType||R?.aiContext?.productType)==="forecast";if(h)if(F){const G=h.querySelector("h3");G&&(G.innerText="Додай до свого замовлення");const v=h.querySelector("p");v&&(v.innerHTML=`
                    Хочеш дізнатися, який <strong>Ідеальний Партнер</strong> тобі підходить за твоєю натальною картою? Психологічний портрет, місце зустрічі та секрети зваблення.<br>
                    <span style="color: var(--primary-text-color);">Лише зараз: <strong>${C.display.FORECAST_UPSELL} грн.</strong> замість <span style="text-decoration: line-through; opacity: 0.7;">${C.display.FORECAST_OLD} грн</span></span>
                `);const y=_?.querySelector(".btn-text");y&&(y.innerHTML=`Так, додати Портрет Партнера за ${C.display.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">${C.display.FORECAST_OLD} грн.</span>`);const f=T?.querySelector("p strong");f&&(f.innerText='"Портрет Ідеального Партнера"')}else{const G=h.querySelector("p span strong");G&&(G.innerText=`${C.display.FORECAST_UPSELL} грн.`);const v=_?.querySelector(".btn-text");v&&(v.innerHTML=`Так, додати Прогноз всього за ${C.display.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; margin-left: 4px;">${C.display.FORECAST_OLD} грн.</span>`)}}D();function S(){h&&(h.style.display="none");const C=E.get("currentVariant"),K=(C?.productType||C?.aiContext?.productType)==="forecast";if(p){p.classList.remove("btn-primary"),p.classList.add("btn-gold-purple");const F=p.querySelector(".btn-text");F&&(F.innerText=K?"Надіслати мені Прогноз + Партнер":"Надіслати мені Звіт + Прогноз")}E.get("email")&&d&&(d.value=E.get("email"))}const A=E.get("currentVariant");if(A&&A.ui&&A.ui.success){if(p&&A.ui.success.buttonText){const C=p.querySelector(".btn-text");C&&!E.get("hasPaidUpsell")&&(C.innerText=A.ui.success.buttonText)}if(A.ui.success.description){const C=document.querySelector("#email-capture-box > p");C&&(C.innerHTML=A.ui.success.description)}}if(E.get("isPendingUpsell")||!!s){if(E.set("hasPaidUpsell",!0),E.set("isPendingUpsell",!1),!E.get("upsellPurchaseTracked")){if(window.DC_Analytics){const{charge:K}=ce(),F=E.get("currentVariant"),v=(F?.productType||F?.aiContext?.productType)==="forecast";window.DC_Analytics.trackPurchase(K.FORECAST_UPSELL,`upsell_${Date.now()}`,v?"Partner Match Upsell":"Forecast Year Upsell")}E.set("upsellPurchaseTracked",!0)}if(s==="stage8"){console.log("🔙 Redirecting back to premium-result after successful Late Upsell..."),setTimeout(()=>{n.navigate("/premium-result?upsell_source=stage8")},100);return}const C=window.location.pathname;window.history.replaceState({},document.title,C);const R=E.get("email");if(R){S();const K=E.get("currentVariant");K?.productType||K?.aiContext?.productType,Un("✨ Дякую за покупку!",`Твій Прогноз генерується і буде автоматично відправлений на <strong>${R}</strong><br><br> Натискай <strong>Надіслати мені Звіт</strong> на наступній сторінці`)}else T&&(T.style.display="flex")}E.get("hasPaidUpsell")&&S(),E.get("email")&&(d.value=E.get("email")),_&&_.addEventListener("click",async()=>{const C=_,R=C.querySelector(".btn-text").innerHTML;C.classList.add("loading"),C.disabled=!0,C.querySelector(".btn-text").innerText="Перехід до оплати...";try{const K=d.value?d.value.trim():"";E.set("isPendingUpsell",!0),K&&E.set("email",K);const F=E.get("userData"),{charge:G}=ce(),v=E.get("currentVariant"),b=(v?.productType||v?.aiContext?.productType)==="forecast"?"Астро-Портрет Партнера":"Астро-Прогноз на рік";await un({name:b,price:G.FORECAST_UPSELL},{email:K},F,{returnQueryParams:"upsell_source=stage6"})}catch(K){console.error("Upsell Error:",K),C.classList.remove("loading"),C.disabled=!1,C.querySelector(".btn-text").innerHTML=R,E.set("isPendingUpsell",!1)}}),x&&x.addEventListener("submit",C=>{C.preventDefault();const R=O.value;R&&(E.set("email",R),d.value=R,T.style.display="none",S(),Un("✨ Дякую за покупку!",`Твій Прогноз генерується і буде автоматично відправлений на <strong>${R}</strong><br><br>📧 Перевір папку <strong>'Вхідні'</strong> та <strong>'Спам'</strong>.`))}),l.addEventListener("submit",C=>{C.preventDefault();const R=d.value;R&&(E.set("email",R),n.navigateTo("generation"))})}const If=`<!-- 🔥 UPDATE: 3D Comet orbits around "Підготовка звіту!" heading -->
<section id="generation-step" class="funnel-step active"
    style="display: flex; flex-direction: column; height: 100%; min-height: 70vh; padding-top: 0; align-items: center;">

    <!-- 🎯 EVENLY DISTRIBUTED: Label + Text -->
    <div
        style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-evenly; align-items: center; width: 100%; padding-bottom: 10vh;">

        <!-- ☄️ Heading (Orbit target for comet) -->
        <div id="generation-orbit-target"
            style="display: flex; align-items: center; justify-content: center; position: relative;">
            <div class="constellation-label" style="display: flex; flex-direction: column; align-items: center; opacity: 1; animation: none;">
                <span id="generation-main-title" style="color: var(--accent-color); text-transform: uppercase;">Генерація звіту</span>
                <span id="global-generation-descriptor" style="display: block; font-size: 0.45em; color: var(--secondary-text-color); font-weight: normal; margin-top: 8px; opacity: 0.7; letter-spacing: 0.5px; text-transform: none; text-align: center; max-width: 250px; line-height: 1.2;">(може знадобитися трохи більше хвилини)</span>
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

</section>`;function kf(n){console.log("⚛️ [Atom Orbit] Starting 3-Comet Animation");const t=3,e=33,r=.022,s=45,o=18,l=[0,Math.PI/3,-Math.PI/3],d=[0,0,0];n.style.transformStyle="preserve-3d",n.style.transform=`perspective(800px) rotateX(${o}deg)`;const p=n.querySelector(".constellation-label");p&&(p.style.transform=`rotateX(${-o}deg)`,p.style.transformStyle="preserve-3d",p.style.position="relative",p.style.zIndex="50");const h=[];for(let O=0;O<t;O++){const D=document.createElement("div");D.className="comet-head",D.style.position="absolute",D.style.top="0",D.style.left="0",n.appendChild(D);const S=[];for(let A=0;A<e;A++){const z=document.createElement("div");z.className="trail-segment",z.style.position="absolute",z.style.top="0",z.style.left="0",n.appendChild(z),S.push(z)}h.push({head:D,trails:S,positionHistory:[],angle:d[O],rotation:l[O]})}let _=!0,T;function x(){if(!_)return;const O=n.offsetWidth/2,D=n.offsetHeight/2,S=Math.max(80,Math.min(n.offsetWidth/2+40,160));for(const A of h){A.angle+=r;const z=Math.cos(A.angle),C=Math.sin(A.angle),R=S*z,K=s*C,F=Math.cos(A.rotation),G=Math.sin(A.rotation),v=R*F-K*G,y=R*G+K*F,f=C,b=1+f*.25,w=f>0?100:1;A.positionHistory.unshift({x:v,y,scale:b,zIndex:w}),A.positionHistory.length>e&&A.positionHistory.pop(),A.head.style.transform=`translate3d(${O+v}px, ${D+y}px, 0) scale(${b})`,A.head.style.zIndex=w;for(let k=0;k<A.trails.length;k++){const u=A.trails[k],M=A.positionHistory[k];if(M){const Y=k/e,V=M.scale*(1-Y*.6),g=.5*(1-Y);u.style.transform=`translate3d(${O+M.x}px, ${D+M.y}px, 0) scale(${V})`,u.style.opacity=g,u.style.zIndex=M.zIndex-1,u.style.display="block"}else u.style.display="none"}}T=requestAnimationFrame(x)}return x(),()=>{console.log("⚛️ [Atom Orbit] Stopping Animation"),_=!1,cancelAnimationFrame(T),h.forEach(({head:O,trails:D})=>{O.remove(),D.forEach(S=>S.remove())}),n.style.transform="",n.style.transformStyle=""}}async function Cf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=If;const e=document.getElementById("report-loading-text"),r=document.getElementById("report-cursor"),s=E.get("currentVariant")||{};if(s.productType==="forecast"||s.id==="forecast"){const z=document.getElementById("generation-main-title");z&&(z.innerText="ГЕНЕРАЦІЯ ПРОГНОЗУ",z.style.textTransform="uppercase")}let o=null;const l=document.getElementById("generation-orbit-target");l&&(o=kf(l)),document.body.classList.add("warp-mode");const d={date:E.get("date"),time:E.get("time"),city:E.get("city"),geo:E.get("geo")},p=E.get("email");E.get("hasPaidUpsell")&&yc(d).catch(z=>console.warn("Forecast bg error:",z));let h=[{text:"✨ Аналізую Ядро твоєї Особистості...",pause:1500},{text:"❤️‍🔥 Розшифровую твої сценарії Кохання...",pause:1500},{text:"👑 Шукаю, де приховані твої Гроші...",pause:1500},{text:"🔮 Вивчаю твої Кармічні Уроки...",pause:1500},{text:"🌙 З'єднуюсь з енергією твого Місяця...",pause:1500},{text:"🪐 Перевіряю транзити Сатурна...",pause:1500},{text:"💫 Рахую аспекти Венери до твого Асценденту...",pause:1500},{text:"📜 Формую стародавній сувій твоєї долі...",pause:1500},{text:"🧘‍♀️ Майже готово, Всесвіт підбирає слова...",pause:1500},{text:"🦋 Твоя унікальність потребує детального аналізу...",pause:1500},{text:"✨ Додаю трохи зіркового пилу в твій звіт...",pause:1500},{text:"⚡️ Фіналізація космічного паспорта...",pause:2e3},{text:"🌞 З твоїм звітом все гаразд, просто сьогодні спалахи на сонці і треба трохи більше часу ніж зазвичай. Звіт вже летить тобі на пошту, і зараз відкриється тут.",pause:0,isDelayMessage:!0}];const _=E.get("currentVariant");_&&_.ui&&_.ui.generation&&_.ui.generation.steps&&(h=_.ui.generation.steps);let T=!1,x=null;const O=6e5,D=async()=>{for(let C=0;C<h.length;C++){if(T&&x&&x.success){console.log("🚀 Report is ready! Skipping remaining animation.");return}const R=h[C];await Ea(e,r,R.text,50,0,!1),R.isDelayMessage&&(r&&(r.style.display="inline-block"),e&&(e.style.fontSize="0.95rem",e.style.lineHeight="1.6"));const K=100;let F=0;const G=R.isDelayMessage?999999:R.pause;for(;F<G;){if(T&&x&&x.success)return;await new Promise(v=>setTimeout(v,K)),F+=K}}},S=async()=>{let z=0;const C=Date.now();for(;Date.now()-C<O;){z++;try{console.log(`🚀 Starting API Request (Attempt ${z})...`);const R=await wa(d,p);if(console.log("✅ API Request Finished:",R),R&&!R.error){E.set("fullReport",R),x={success:!0,data:R},T=!0;const K=E.get("pendingInvoiceId");if(K&&R.sections){const F=E.get("currentVariant"),G=F?.productType||F?.aiContext?.productType,v=G==="partner"?"partner":G==="forecast"?"upsell":"main";Te(Ft.endpoints.UPDATE_REPORT,{invoiceId:K,sections:R.sections,reportType:v}).then(()=>{console.log("✅ Report synced to Firestore for Telegram")}).catch(y=>{console.warn("⚠️ Report sync failed (non-critical):",y.message)})}return}else console.warn("⚠️ Report Generation Failed (Logic). Retrying...",R),await new Promise(K=>setTimeout(K,3e3))}catch(R){console.error("API Network Error:",R),await new Promise(K=>setTimeout(K,3e3))}}console.error("❌ Max timeout reached. API failed.")};D(),await S(),T||(console.warn("⚠️ API took too long or failed silently. Proceeding to result anyway (check email fallback)."),x={success:!0,fromEmail:!0},T=!0),document.body.classList.remove("warp-mode"),o&&o(),setTimeout(()=>{n.navigateTo("premium-result")},300)}const Af=`<section id="premium-result-step" class="funnel-step active space-y-6">

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

    <!-- 3. Модальне вікно Late Upsell (динамічний контент заповнюється через JS) -->
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
                <p id="upsell-modal-description" class="text-sm mt-2 mb-6 leading-relaxed" style="color: var(--secondary-text-color);">
                    <!-- Динамічний опис заповнюється через JS -->
                </p>

                <!-- 🔥 КЛЮЧОВА ЗМІНА: id="ltv-upsell-btn" для коректного трекінгу -->
                <button id="ltv-upsell-btn" class="btn btn-violet w-full">
                    <span class="btn-text">Завантаження...</span>
                    <span class="btn-spinner"></span>
                </button>
            </div>
        </div>
    </div>
</section>`;function Sf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=Af;const e=ce(),r=document.getElementById("full-report-content"),s=document.getElementById("report-actions-container");r&&(r.style.backgroundColor="transparent",r.style.border="none",r.style.padding="0",r.className="w-full");const o=document.getElementById("late-upsell-modal"),l=document.getElementById("close-late-upsell"),d=document.getElementById("ltv-upsell-btn"),p=document.getElementById("upsell-purchased-modal"),h=document.getElementById("close-purchased-modal-btn"),_=E.get("userData")||{date:E.get("date"),time:E.get("time"),city:E.get("city"),geo:E.get("geo"),planets:E.get("planets")||[]},T=E.get("email"),x=E.get("currentVariant"),O="dc_full_report_backup_v2",D=document.getElementById("upsell-modal-description");function S(){const V=x?.productType;return V==="forecast"?"partner":V==="partner"?null:"forecast"}function A(V){if(!D||!d)return;const g=e.display.FORECAST_UPSELL||199,I=e.display.FORECAST_UPSELL_OLD||e.display.FORECAST_OLD||1499;V==="partner"?(D.innerHTML=`
                Хочеш дізнатися <strong>Портрет свого Ідеального Партнера</strong>?
                Який чоловік підходить саме тобі, де його шукати та як завоювати його серце?<br><br>
                <span style="color: var(--primary-text-color);">Лише зараз: <strong>${g} грн.</strong> замість <span
                    style="text-decoration: line-through; opacity: 0.7;">${I} грн</span> (знижка 87%)</span>
            `,d.querySelector(".btn-text").innerHTML=`Так, отримати Портрет Партнера за ${g} грн. <span
                style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">${I} грн.</span>`):(D.innerHTML=`
                Хочеш повний <strong>Астрологічний Прогноз</strong> на найближчий рік? Дізнатися про свої фінансові
                піки, періоди удачі та успіхи у стосунках?<br><br>
                <span style="color: var(--primary-text-color);">Лише зараз: <strong>${g} грн.</strong> замість <span
                    style="text-decoration: line-through; opacity: 0.7;">${I} грн</span> (знижка 87%)</span>
            `,d.querySelector(".btn-text").innerHTML=`Так, додати Прогноз за ${g} грн. <span
                style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">${I} грн.</span>`)}const z=S();z&&A(z);const C=new URLSearchParams(window.location.search);if(C.get("upsell_source")==="stage8"){E.set("hasPaidUpsell",!0);try{const g=localStorage.getItem(O);if(g){const I=JSON.parse(g);I&&I.sections&&(Pt.log("⚡️ Instant Report Restore from LocalStorage success!"),E.set("fullReport",I))}}catch(g){console.error("Backup restore error:",g)}const V=window.location.pathname;window.history.replaceState({},document.title,V),setTimeout(()=>{s&&s.scrollIntoView({behavior:"smooth",block:"center"})},500)}l&&l.addEventListener("click",()=>o.style.display="none"),h&&h.addEventListener("click",()=>{p&&(p.style.display="none"),f()}),window.addEventListener("click",V=>{V.target===o&&(o.style.display="none"),V.target===p&&p&&(p.style.display="none")});function K(V){return V?V.map((g,I)=>{const $=I===0,U=I===V.length-1;let L=g.analysis_text||"";L=L.replace(/\*\*(.*?)\*\*/g,'<strong style="color: #fff; font-weight: 400;">$1</strong>');let B=L.includes("<ul")||L.includes("<ol")||L.includes("<br")?L.replace(/\n/g,"<br>"):L.split(`
`).map(Q=>`<p>${Q}</p>`).join("");const H=g.practical_advice?`
                <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
                    <strong style="display: block; color: #cda45e; margin-bottom: 6px; text-transform: uppercase; font-size: 0.75em; letter-spacing: 1px;">⚡️ Порада зірок:</strong>
                    <p style="font-style: italic; font-size: 0.9em; color: var(--secondary-text-color); margin: 0;">${g.practical_advice}</p>
                </div>
            `:"",q=U?"":`
                <button class="next-section-btn" data-target="${I+1}" style="
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
                <div class="accordion-item ${$?"accordion-open":""}" style="
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
                    " data-index="${I}">
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
                            <span style="font-size: 1.2em;">${g.icon}</span> ${g.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                    </div>

                    <!-- Content -->
                    <div class="accordion-content">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content report-content-text">
                            ${B}
                            ${H}
                            ${q}
                        </div>
                    </div>
                </div>
            `}).join(""):""}function F(V,g){if(!V||!Array.isArray(V)||V.length===0)return"";const I=V.map((U,L)=>{const B=U.split(":"),H=B[0]?.trim(),q=B[1]?.trim()||"";return`
                <div class="astro-data-item planet-copy-item" data-copy-val="${H}: ${q}" style="cursor: pointer; position: relative;">
                    <div class="astro-label-row">
                        <span class="astro-planet-name" style="font-size: 11px;">${H}:</span>
                    </div>
                    <div class="astro-coords-row" style="font-size: 11px; margin-top: 2px;">${q}</div>
                    <span class="copy-hint" style="
                        position: absolute; right: 5px; top: 50%; transform: translateY(-50%);
                        font-size: 9px; color: #a8ffb5; opacity: 0; transition: opacity 0.3s;
                        background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px; pointer-events: none;
                    ">Копія</span>
                </div>
            `}).join(""),$=V.join(`
`);return`
            <div class="accordion-item exact-coords-container" style="
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
                " data-index="${g}">
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
                        <span style="font-size: 1.2em;">🪐</span> Точні координати планет
                    </h4>
                    <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                </div>

                <!-- Content -->
                <div class="accordion-content">
                    <div style="padding: 0 20px 20px 20px;" class="accordion-text-content">
                        <p style="color: rgba(255,255,255,0.6); line-height: 1.5; margin-bottom: 15px; font-size: 0.8em; text-align: center;">
                            Натисніть на об'єкт або кнопку нижче, щоб скопіювати дані.
                        </p>
                        
                        <div class="astro-data-box" style="margin-top: 0; box-shadow: none; padding: 15px;">
                            <div class="astro-data-grid" id="exact-astro-grid" style="user-select: all; cursor: pointer;">
                                ${I}
                            </div>
                        </div>

                        <button class="copy-all-planets-btn" data-copy-val="${$.replace(/"/g,"&quot;")}" style="
                            width: 100%;
                            margin-top: 15px;
                            padding: 12px;
                            border: 1px solid rgba(205, 164, 94, 0.4);
                            background: rgba(205, 164, 94, 0.05);
                            color: #cda45e;
                            border-radius: 8px;
                            font-family: 'Montserrat', sans-serif;
                            font-size: 0.85em;
                            font-weight: 600;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">
                            📋 Скопіювати координати планет
                        </button>
                    </div>
                </div>
            </div>
        `}function G(V){const g=V.querySelectorAll(".accordion-header"),I=V.querySelectorAll(".accordion-item"),$=V.querySelectorAll(".next-section-btn");V.querySelectorAll(".planet-copy-item").forEach(q=>{q.addEventListener("click",()=>{const Q=q.getAttribute("data-copy-val");Q&&navigator.clipboard.writeText(Q).then(()=>{const J=q.querySelector(".copy-hint");J&&(J.style.opacity="1",setTimeout(()=>J.style.opacity="0",1500))})})});const L=V.querySelector(".copy-all-planets-btn");L&&L.addEventListener("click",()=>{const q=L.getAttribute("data-copy-val");q&&navigator.clipboard.writeText(q).then(()=>{const Q=L.innerHTML;L.innerHTML="✅ Скопійовано!",L.style.backgroundColor="#2c402e",L.style.borderColor="#4caf50",L.style.color="#a8ffb5",setTimeout(()=>{L.innerHTML=Q,L.style.backgroundColor="",L.style.borderColor="",L.style.color=""},2e3)})});const B=V.querySelector("#exact-astro-grid");if(B&&L){let q;const Q=()=>{const J=L.getAttribute("data-copy-val");J&&navigator.clipboard.writeText(J)};B.addEventListener("touchstart",()=>{q=setTimeout(Q,800)}),B.addEventListener("touchend",()=>{clearTimeout(q)}),B.addEventListener("mousedown",()=>{q=setTimeout(Q,800)}),B.addEventListener("mouseup",()=>{clearTimeout(q)})}function H(q,Q=!1){I.forEach((J,et)=>{if(et===q)if(J.classList.contains("accordion-open")){J.classList.remove("accordion-open");const Z=J.querySelector(".accordion-content");Z&&(Z.style.maxHeight=null)}else{J.classList.add("accordion-open");const Z=J.querySelector(".accordion-content");Z&&(Z.style.maxHeight=Z.scrollHeight+100+"px",setTimeout(()=>{J.classList.contains("accordion-open")&&(Z.style.maxHeight=null)},820)),setTimeout(()=>{const rt=J.querySelector(".accordion-header");rt&&rt.scrollIntoView({behavior:"smooth",block:"start"})},300)}else Q||J.classList.remove("accordion-open")})}g.forEach(q=>{q.addEventListener("click",()=>{const Q=parseInt(q.getAttribute("data-index"));H(Q,!0)})}),$.forEach(q=>{q.addEventListener("click",Q=>{Q.stopPropagation();const J=parseInt(q.getAttribute("data-target"));J<I.length&&H(J,!0)})})}function v(){const V=r.querySelector(".astro-data-box");V&&(V.style.cursor="pointer",V.title="Натисніть, щоб прочитати розшифровку",V.onmouseenter=()=>{V.style.borderColor="rgba(205, 164, 94, 0.6)"},V.onmouseleave=()=>{V.style.borderColor="rgba(205, 164, 94, 0.3)"},V.addEventListener("click",()=>{if(x&&x.productType==="partner"){Un("🔑 Розшифровка Коду Кохання",`
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
                    `);return}Un("📡 Розшифровка Космічного Коду",`
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
                `)}))}async function y(){let V=E.get("fullReport");if(!V||!V.sections){const g=localStorage.getItem(O);if(g)try{V=JSON.parse(g),E.set("fullReport",V)}catch(I){console.warn("Backup parse fail",I)}}if(V&&V.sections){const g=x?.marketing?.bonuses?[...x.marketing.bonuses]:[];g.some(L=>L.id==="lunar_guide")||g.push({id:"lunar_guide",title:"🎁 Бонус: Гайд по циклам Місяця",icon:"🌙",text:`Цей гайд допоможе тобі синхронізувати своє життя з природними ритмами Місяця. Кожні 28 днів він проходить 8 фаз:

**1. Новий Місяць (Молодик)**
Час для планування. Енергія на мінімумі. Найкраще — писати списки бажань та медитувати.

**2. Молодий Місяць**
Час для перших кроків. Енергія зростає. Добре заявляти про себе.

**3. Перша чверть**
Час для рішучих дій. Подолання перешкод.

**4. Випуклий Місяць**
Час для вдосконалення та деталізації планів.

**5. Повня**
Пік енергії та емоцій. Час для завершення та святкування.

**6. Спадаючий Місяць**
Час для аналізу. Добре ділитися знаннями та очищувати простір.

**7. Остання чверть**
Час для очищення та завершення справ.

**8. Старий Місяць**
Час для відпочинку та накопичення сил перед новим циклом.

*Використовуючи ці фази, ти перестанеш боротися з течією і почнеш використовувати силу космосу собі на користь.*`,advice:"Перевіряй фазу Місяця щоранку — це твій персональний GPS енергії."}),g&&Array.isArray(g)&&g.forEach(L=>{V.sections.some(H=>H.id===L.id||H.title.includes(L.title.replace("🎁 ","")))||V.sections.push({id:L.id,title:L.title,icon:L.icon,analysis_text:L.text,practical_advice:L.advice})}),localStorage.setItem(O,JSON.stringify(V));let $=K(V.sections);const U=_.planets||E.get("planets");U&&Array.isArray(U)&&U.length>0&&($+=F(U,V.sections.length)),r.innerHTML=$,G(r),f();return}console.warn("⚠️ Report data missing. Fetching from API..."),r.innerHTML=`
            <div class="text-center py-12 space-y-4">
                <div class="spinner mx-auto" style="width: 3rem; height: 3rem;"></div>
                <p class="text-gray-400 animate-pulse text-sm">Завантаження вашого звіту...</p>
            </div>
        `;try{const g=C.get("id");let I;if(g?I=await vc(g):I=await wa(_,T),I&&!I.error&&I.status==="ready"&&I.reportData&&I.reportData.sections){E.set("fullReport",I.reportData),localStorage.setItem(O,JSON.stringify(I.reportData));let $=K(I.reportData.sections);const L=(I.userData||_).planets||E.get("planets");L&&Array.isArray(L)&&L.length>0&&($+=F(L,I.reportData.sections.length)),r.innerHTML=$,G(r),v(),f()}else if(I&&!I.error&&I.sections){E.set("fullReport",I),localStorage.setItem(O,JSON.stringify(I));let $=K(I.sections);const U=_.planets||E.get("planets");U&&Array.isArray(U)&&U.length>0&&($+=F(U,I.sections.length)),r.innerHTML=$,G(r),v(),f()}else throw I&&I.status==="processing"?new Error("Report is processing"):new Error("Invalid recovery data")}catch(g){console.error("Recovery failed:",g),r.innerHTML=`
                <div class="text-center p-8 rounded-xl border border-gray-700 bg-gray-800/50">
                    <div class="text-5xl mb-4">📨</div>
                    <h3 class="text-xl font-bold text-[#cda45e] mb-2">Звіт вже у дорозі!</h3>
                    <p class="text-gray-300 mb-4">
                        Через велике навантаження генерація займає трохи більше часу. 
                        Твій Прогноз генерується і буде автоматично відправлений на <strong>${T}</strong>.
                    </p>
                    ${E.get("planets")?await Is(_,x):""}
                </div>
            `,f()}}function f(){s.innerHTML="";const V=document.createElement("div");V.className="mb-6 p-4 rounded-xl border border-[rgba(205,164,94,0.3)] bg-[rgba(20,20,22,0.6)] text-center text-sm leading-relaxed",V.innerHTML=`
            <p class="text-white font-bold mb-2 text-base">Як зберегти цей звіт?</p>
            <p class="text-[#cda45e] mb-2">✅ Копія звіту (текст + PDF) вже відправлена на твою пошту.</p>
            <p class="text-gray-300">Нижче ти можеш відправити текст звіту собі в Telegram, завантажити PDF або <strong>скопіювати персональне посилання</strong> на цю сторінку (рекомендуємо зберегти його).</p>
        `,s.appendChild(V);const g=document.createElement("div");g.className="flex flex-col gap-3 w-full";const I=E.get("currentInvoiceId")||new URLSearchParams(window.location.search).get("id");if(I){const B=document.createElement("a");B.href=`https://t.me/DestinyCodeReportsBot?start=${I}`,B.target="_blank",B.rel="noopener noreferrer",B.className="btn btn-secondary",B.style.cssText=`
                display: flex; align-items: center; justify-content: center; gap: 8px;
                background: linear-gradient(135deg, #2AABEE, #229ED9);
                color: #fff; text-decoration: none; border: none;
            `,B.innerHTML=`
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span class="btn-text">Надіслати Звіт в Telegram</span>
            `,g.appendChild(B)}if(I){const B=document.createElement("button");B.className="btn btn-secondary",B.style.cssText=`
                display: flex; align-items: center; justify-content: center; gap: 8px;
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2);
                color: #fff;
            `,B.innerHTML=`
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span class="btn-text">Скопіювати посилання</span>
            `,B.onclick=()=>{const H=`${window.location.origin}/report?id=${I}`;navigator.clipboard.writeText(H).then(()=>{const q=B.innerHTML;B.innerHTML='<span class="btn-text text-green-400 font-bold">✅ Скопійовано!</span>',Y("Посилання збережено в буфер обміну"),setTimeout(()=>B.innerHTML=q,2500)}).catch(q=>{console.error("Copy failed",q),Y("Не вдалося скопіювати посилання")})},g.appendChild(B)}const $=document.createElement("button");$.className="btn btn-secondary",$.innerHTML='<span class="btn-text">Завантажити PDF (Звіт)</span><span class="btn-spinner"></span>',$.onclick=()=>w($),g.appendChild($),s.appendChild(g),k();const U=S();if(E.get("hasPaidUpsell")&&!U){const B=document.createElement("div");B.className="mt-4 mb-2 p-4 rounded-lg border text-center animate-fadeIn",B.style.backgroundColor="rgba(20, 83, 45, 0.2)",B.style.borderColor="rgba(34, 197, 94, 0.3)";const H=x?.productType==="partner"?"Портрет Ідеального Партнера відправлено на пошту":"Твій Прогноз на рік відправлено на пошту";B.innerHTML=`
                <div class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm font-bold text-green-400 tracking-wide">
                        ${H}
                    </span>
                </div>
            `,s.appendChild(B)}else if(E.get("hasPaidUpsell")&&U){const B=document.createElement("div");B.className="mt-4 mb-2 p-4 rounded-lg border text-center animate-fadeIn",B.style.backgroundColor="rgba(20, 83, 45, 0.2)",B.style.borderColor="rgba(34, 197, 94, 0.3)";const H=x?.productType==="forecast"?"Твій Прогноз на рік відправлено на пошту":"Портрет Ідеального Партнера відправлено на пошту";B.innerHTML=`
                <div class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm font-bold text-green-400 tracking-wide">
                        ${H}
                    </span>
                </div>
            `,s.appendChild(B);const q=U==="partner"?"Портрет Ідеального Партнера":"Прогноз на рік",Q=document.createElement("button");Q.className="btn btn-violet",Q.style.marginTop="10px",Q.innerHTML=`
                <span class="btn-text flex flex-col items-center justify-center leading-tight">
                    <span class="text-[16px] font-bold">Отримати ${q} за ${e.display.FORECAST_UPSELL} грн.</span>
                    <span class="text-[10px] opacity-80 font-normal mt-1 lowercase">буде відправлено на пошту</span>
                </span>
            `,Q.onclick=()=>{A(U),o.style.display="flex"},s.appendChild(Q)}else{const B=U==="partner"?"Портрет Ідеального Партнера":"Прогноз на рік",H=document.createElement("button");H.className="btn btn-violet",H.style.marginTop="10px",H.innerHTML=`
                <span class="btn-text flex flex-col items-center justify-center leading-tight">
                    <span class="text-[16px] font-bold">Отримати ${B} за ${e.display.FORECAST_UPSELL} грн.</span>
                    <span class="text-[10px] opacity-80 font-normal mt-1 lowercase">буде відправлено на пошту</span>
                </span>
            `,H.onclick=()=>{A(U||"forecast"),o.style.display="flex"},s.appendChild(H)}const L=document.createElement("button");L.className="btn btn-skip",L.style.marginTop="20px",L.innerText="Розрахувати ще одну натальну карту",L.onclick=()=>{confirm("Очистити дані та почати новий розрахунок?")&&(E.clear(),localStorage.removeItem(O),window.location.href="/")},s.appendChild(L)}function b(V){return!V||!Array.isArray(V)?"":V.map((g,I)=>`
            <div class="report-section" style="margin-bottom: 35px; ${I===0?"":"page-break-before: always;"}">
                <h2 style="color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px; page-break-before: avoid;">
                    <span style="margin-right: 8px;">${g.icon||"✨"}</span> ${g.title}
                </h2>
                <div class="report-content-text" style="font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #e0e0e0; margin-bottom: 12px; text-align: justify;">
                    ${(g.analysis_text||"").replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,'<strong style="color: #ffffff;">$1</strong>')}
                </div>
                ${g.practical_advice?`
                <div class="report-advice" style="background-color: #161b22; border: 1px solid rgba(205, 164, 94, 0.2); border-left: 4px solid #cda45e; padding: 20px; margin-top: 20px; border-radius: 0 8px 8px 0;">
                    <span style="color: #cda45e; display: block; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700;">⚡️ KOSMIC KEY:</span>
                    <p style="margin: 0; color: #cccccc; font-style: italic; font-size: 13px;">${g.practical_advice}</p>
                </div>`:""}
            </div>`).join("")}async function w(V){const g=E.get("fullReport");if(!g)return;const I=window.open("","_blank");if(I)I.document.write(`
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
            `);else{alert("Будь ласка, дозвольте спливаючі вікна для завантаження файлу.");return}V.classList.add("loading"),V.disabled=!0;try{const $=b(g.sections),U={..._};if(!U.planets||U.planets.length===0){const Q=E.get("planets");Q&&Q.length>0&&(U.planets=Q)}let L="main";x?.productType==="forecast"?L="upsell":x?.productType==="partner"&&(L="partner");const B={reportHtml:$,reportType:L,userData:U},H=await fetch(Ft.PDF,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(B)});if(!H.ok)throw new Error("Server error");const q=await H.json();if(q.success&&q.pdfBase64){const Q=atob(q.pdfBase64),J=new Array(Q.length);for(let st=0;st<Q.length;st++)J[st]=Q.charCodeAt(st);const et=new Uint8Array(J),Z=new Blob([et],{type:"application/pdf"}),rt=window.URL.createObjectURL(Z);if(I)I.location.href=rt;else{const st=document.createElement("a");st.href=rt,st.download="DestinyCode_Report.pdf",document.body.appendChild(st),st.click(),setTimeout(()=>document.body.removeChild(st),100)}setTimeout(()=>window.URL.revokeObjectURL(rt),6e4)}else I&&I.close(),alert("Не вдалося сформувати PDF. Спробуйте пізніше.")}catch($){I&&I.close(),console.error("PDF Download Error:",$),alert("Помилка завантаження. Перевірте з'єднання.")}finally{V.classList.remove("loading"),V.disabled=!1}}d&&d.addEventListener("click",async()=>{const V=d;V.classList.add("loading"),V.disabled=!0;const g=window.open("","_blank");g&&g.document.write(`
                    <html>
                        <head>
                            <title>Завантаження сторінки оплати...</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                body { background-color: #0f1115; color: #cda45e; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; margin: 0; }
                                .loader { border: 3px solid rgba(205, 164, 94, 0.3); border-top: 3px solid #cda45e; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 20px; }
                                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                            </style>
                        </head>
                        <body>
                            <div class="loader"></div>
                            <p style="font-size: 14px; text-transform: uppercase; font-weight: bold; color: #fff;">Підключення до банку...</p>
                            <p style="font-size: 11px; opacity: 0.6; margin-top: 10px;">Це займе всього кілька секунд.</p>
                        </body>
                    </html>
                `);const I=E.get("fullReport");I&&localStorage.setItem(O,JSON.stringify(I)),localStorage.setItem("dc_cross_tab_state",JSON.stringify(E.data));try{const $=S()||"forecast";await un({name:$==="partner"?"Астро-Портрет Ідеального Партнера (Promo)":"Астро-Прогноз на рік (Promo)",price:e.charge.FORECAST_UPSELL},{email:T},_,{returnQueryParams:`upsell_source=stage8&restore_upsell=1&upsell_type=${$}`,paymentWindow:g}),o&&(o.style.display="none"),V.classList.remove("loading"),V.disabled=!1}catch($){console.error("Late Upsell Error:",$),V.classList.remove("loading"),V.disabled=!1,g&&g.close()}}),y();function k(){if(s.querySelector(".feedback-controls"))return;const V=document.createElement("div");V.className="feedback-controls";const g=document.createElement("div");g.className="feedback-buttons";const I=u("👍","like"),$=u("👎","dislike");g.appendChild($),g.appendChild(I),V.appendChild(g);const U=document.createElement("button");if(U.className="btn w-full",U.style.cssText=`
            display: flex; align-items: center; justify-content: center; gap: 8px;
            background: rgba(205, 164, 94, 0.1);
            border: 1px solid rgba(205, 164, 94, 0.3);
            color: #cda45e; font-size: 0.85em; padding: 12px; border-radius: 12px;
            font-weight: 600; cursor: pointer; margin-top: 15px; margin-bottom: 10px;
        `,U.innerHTML="<span>✨ Залишити відгук</span>",U.onclick=()=>M("premium_review_button"),V.appendChild(U),E.get("hasPaidUpsell")){const L=document.createElement("button");L.className="btn-feedback-text",L.innerText="Написати відгук розробникам",L.onclick=M,V.appendChild(L)}s.appendChild(V)}function u(V,g){const I=document.createElement("div");return I.className="btn-feedback-icon",I.innerText=V,I.onclick=async()=>{I.parentElement.querySelectorAll(".btn-feedback-icon").forEach(U=>U.classList.remove("active")),I.classList.add("active"),await Wr.send({type:g,value:g,source:"premium_report"}),Y("Дякую 💜"),g==="dislike"&&setTimeout(M,500)},I}function M(V=null){const g=document.createElement("div");g.className="feedback-modal-overlay";const I=document.createElement("div");I.className="feedback-modal";const $=document.createElement("h3");$.innerText="Ваш відгук допоможе нам стати кращими",$.style.color="#cda45e",$.style.marginBottom="8px";const U=document.createElement("textarea");U.className="feedback-textarea",U.placeholder="Що нам варто покращити?";const L=document.createElement("button");L.className="btn btn-violet",L.innerText="Надіслати",g.onclick=B=>{B.target===g&&document.body.contains(g)&&document.body.removeChild(g)},L.onclick=async()=>{if(U.value.trim()){L.innerText="Відправка...",L.disabled=!0;try{const B=V||(E.get("hasPaidUpsell")?"premium_upsell":"premium_feedback");await Wr.send({type:"text",value:U.value,source:B})}catch(B){console.error("Feedback send error",B)}finally{document.body.contains(g)&&document.body.removeChild(g),Un("Повідомлення відправлено","Ми дуже цінуємо ваш час та увагу. Дякуємо! 🙏")}}},I.appendChild($),I.appendChild(U),I.appendChild(L),g.appendChild(I),document.body.appendChild(g)}function Y(V){const g=document.createElement("div");g.innerText=V,g.style.position="fixed",g.style.top="20px",g.style.left="50%",g.style.transform="translate(-50%, -20px)",g.style.background="linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)",g.style.color="#fff",g.style.border="1px solid rgba(205, 164, 94, 0.3)",g.style.boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px -3px rgba(205, 164, 94, 0.1)",g.style.padding="12px 24px",g.style.borderRadius="99px",g.style.fontWeight="bold",g.style.opacity="0",g.style.transition="all 0.3s ease",g.style.zIndex="2000",document.body.appendChild(g),requestAnimationFrame(()=>{g.style.opacity="1",g.style.transform="translate(-50%, 0)"}),setTimeout(()=>{g.style.opacity="0",g.style.transform="translate(-50%, -20px)",setTimeout(()=>document.body.removeChild(g),300)},900)}}const Rf=`<!-- 🔥 PARTNER MATCH: Combined Result + Premium Data Screen -->
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
</section>`;function Pf(n){const t=document.getElementById("app");t.classList.add("funnel-container"),t.innerHTML=Rf;const e=document.getElementById("result-title"),r=document.getElementById("free-report-title"),s=document.getElementById("free-report-text"),o=document.getElementById("birth-time"),l=document.getElementById("time-placeholder"),d=o.closest(".input-field"),p=document.getElementById("time-error-message"),h=document.getElementById("birth-city"),_=document.getElementById("city-error-message"),T=document.getElementById("city-info-message"),x=document.getElementById("continue-button"),O=document.getElementById("skip-button"),D=document.getElementById("premium-form-container"),S=E.get("freeReport");if(!S){n.navigateTo("welcome");return}const A=u=>u?u.replace(/\*\*(.*?)\*\*/g,'<strong style="color: #ffffff; font-weight: 400;">$1</strong>').replace(/\\n/g,"<br>"):"";let z="";if(S.superpower||S.blind_spot||S.teaser_hook){let u=[];S.superpower&&u.push(`
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
            `),S.blind_spot&&u.push(`
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
            `),z=u.join("")}if(e.innerText="Твоя Любовна Карта",S.title){let u="";const M=S.title.indexOf(":");if(M!==-1){const Y=S.title.substring(0,M+1).trim(),V=S.title.substring(M+1).trim();u=`
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="
                        color: var(--secondary-text-color);
                        font-size: 0.85em;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        margin-bottom: 8px;
                        opacity: 0.8;
                    ">${Y}</div>
                    <h3 style="
                        color: var(--accent-color);
                        font-size: 1.15em;
                        font-weight: 700;
                        line-height: 1.3;
                    ">${V}</h3>
                </div>
            `}else u=`
                <h3 style="
                    text-align: center;
                    color: var(--accent-color);
                    font-size: 1.1em;
                    font-weight: 700;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                ">${S.title}</h3>
            `;r.innerHTML=u,r.style.display="block",r.style.textAlign="",r.style.color="",r.style.textTransform="",r.style.letterSpacing="",r.style.fontSize="",r.style.marginBottom=""}else r.style.display="none";if(S.content_blocks){const u=[{emoji:"✨",title:"Твій Зірковий Архетип"},{emoji:"⚡️",title:"Прихований Внутрішній Конфлікт"},{emoji:"🗝️",title:"Твій Ключ до Змін"}],M=[{...u[0],content:A(S.content_blocks.archetype||"")},{...u[1],content:A(S.content_blocks.conflict||"")},{...u[2],content:A(S.content_blocks.solution||"")}];z=M.map((Y,V)=>{const g=V===0,I=V===M.length-1;return`
                ${g?`
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
                <div class="accordion-item ${g?"accordion-open":""}" style="
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
                    " data-index="${V}">
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
                            <span style="font-size: 1.2em;">${Y.emoji}</span> ${Y.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                    </div>
                    <div class="accordion-content" style="${g?"max-height: 1000px;":"max-height: 0;"} overflow: hidden; transition: max-height 0.4s ease-out;">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${Y.content}
                            ${I?"":`
                                <button class="next-section-btn" data-target="${V+1}" style="
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
            `}).join("")}else if(S.psychological_analysis){const u=S.psychological_analysis,M=["💍 Твій любовний парадокс","💍 Хто він","💍 Хто він насправді","⚡️ Хто він","⚡️ Його Енергія","💔 Твоя Фатальна Помилка","📍 Передчуття Зустрічі","🔑 Твій Ключ до Щастя","📋 Чек-лист","📋 Чек-лист: чи підходить він тобі","📋 Чек-лист: чи підходить він тобі?"],Y=new RegExp(`(${M.join("|")})`,"i"),V=u.split(Y);let g=[],I=null;V.forEach(L=>{const B=L.trim();if(!B)return;const H=M.find(q=>B.toLowerCase().includes(q.toLowerCase()));if(H)I=H;else if(I){const q=I.split(" ")[0]||"✨";let Q=I.substring(q.length).trim();Q.includes("Хто він")&&q==="💍"&&(Q="Твій любовний парадокс"),Q.includes("Його Енергія")&&(Q="Хто він"),Q.includes("Ключ до Щастя")&&(Q="Твоя інструкція до щастя"),Q.includes("Чек-лист")&&(Q='Чек-лист "Нормального мужика"');let J=B;J=J.replace(/^[:\s]+/,"").replace(/^<\/b>\s*/i,"").replace(/^\s*<br\s*\/?>/i,"").trim(),g.push({emoji:q,title:Q,content:J}),I=null}else g.length===0&&B.length>10});const $=L=>L?(L=L.replace(/(повному\s+)?(звіті|звіт|описі|опис)(?![^<]*>)/gi,(B,H,q)=>{let Q=q;const J=q.toLowerCase();J==="звіт"&&(Q="ОПИС"),J==="звіті"&&(Q="ОПИСІ"),J==="опис"&&(Q="ОПИС"),J==="описі"&&(Q="ОПИСІ");const et=`<span class="interactive-cta" style="color: var(--accent-color); font-weight: 800; text-transform: uppercase; cursor: pointer; text-decoration: underline; text-underline-offset: 3px;">${Q}</span>`;return H?H+et:et}),L=L.replace(/("?Дізнатися всі подробиці"?)/gi,B=>`<span class="interactive-cta" style="color: var(--accent-color); font-weight: 400; cursor: pointer; border: 1px solid var(--accent-color); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${B.replace(/"/g,"")}</span>`),L):"",U=`
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
        `;g.length>0?z=g.map((B,H)=>{const q=H===0,Q=H===g.length-1;let J=B.content.replace(/<\/?b>/gi,"");const et="Саме цей мікс";if(J.includes(et)){const st=J.split(et);if(st.length>1){const ht=st[1].indexOf(".");if(ht!==-1){const vt=st[0]+et+st[1].substring(0,ht+1),wt=st[1].substring(ht+1);J=vt+' Щоб отримати повний ОПИС - введи час та місце свого народження нижче і тисни на кнопку "Дізнатися всі подробиці".'+wt}}}Q&&(J=J.replace(/^чи підходить він тобі\??/i,'<br><span style="color: var(--accent-color); font-size: 1.05em; font-weight: 600; display: block; margin-bottom: 8px;">Чи підходить він тобі?</span>'),J+='<br><br>Щоб отримати повний опис свого <span class="interactive-cta" style="color: var(--accent-color); font-weight: 400; cursor: pointer;">ІДЕАЛЬНОГО ПАРТНЕРА</span> — введи час та місце свого народження нижче і тисни на кнопку Дізнатися всі подробиці.');const Z=A($(J)),rt=Q?`
                    ${U}
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
                    <div class="accordion-item ${q?"accordion-open":""}" style="
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
                                <span style="font-size: 1.2em;">${B.emoji}</span> ${B.title}
                            </h4>
                            <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                                ${Z}
                                ${rt}
                                ${Q?"":`
                                    <button class="next-section-btn" data-target="${H+1}">
                                        Читати далі 👇
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                `}).join(""):z=A($(u))}else z="<p>Дані відсутні.</p>";s.innerHTML=z;const C=s.querySelectorAll(".accordion-header"),R=s.querySelectorAll(".accordion-item"),K=s.querySelectorAll(".next-section-btn");function F(u,M=!1){R.forEach((Y,V)=>{V===u?Y.classList.contains("accordion-open")?Y.classList.remove("accordion-open"):(Y.classList.add("accordion-open"),setTimeout(()=>{const g=Y.querySelector(".accordion-header");g&&g.scrollIntoView({behavior:"smooth",block:"start"})},300)):M||Y.classList.remove("accordion-open")})}C.forEach(u=>{u.addEventListener("click",()=>{const M=parseInt(u.getAttribute("data-index"));F(M,!0)})}),K.forEach(u=>{u.addEventListener("click",M=>{M.stopPropagation();const Y=parseInt(u.getAttribute("data-target"));Y<R.length&&F(Y,!0)})});const G=E.get("currentVariant");G?.ui?.results?.title&&(e.innerText=G.ui.results.title);function v(){!o||!l||(o.value?(l.innerText=o.value,l.style.color="var(--primary-text-color)",d&&d.classList.remove("input-error"),p&&(p.style.display="none")):(l.innerText="Обери час",l.style.color="var(--secondary-text-color)"))}o.addEventListener("input",v),o.addEventListener("change",v),o.addEventListener("blur",v),v(),h.addEventListener("input",()=>{_.style.display="none",T.style.display="none",h.classList.remove("input-error")});function y(u,M){u&&(M?(u.classList.add("loading"),u.disabled=!0):(u.classList.remove("loading"),u.disabled=!1))}function f(u,M){u==="ambiguous"?_.innerText=`Місто "${M}" знайдено в кількох місцях. Уточни, додавши країну (напр: ${M}, Україна).`:_.innerText=`Не можемо знайти місто "${M}". Перевір назву.`,_.style.display="block",h.classList.add("input-error")}x.addEventListener("click",async()=>{const u=o.value;let M=h.value.trim();const Y=M;let V=!1;if(_.style.display="none",p.style.display="none",d&&d.classList.remove("input-error"),h.classList.remove("input-error"),M||(h.classList.add("input-error"),_.innerText="Будь ласка, введи місто народження.",_.style.display="block",V=!0),u||(d&&d.classList.add("input-error"),p.style.display="block",V=!0),V){D&&D.scrollIntoView({behavior:"smooth",block:"center"}),navigator.vibrate&&navigator.vibrate(50);return}y(x,!0);const g=await je(M);let I=null;if(g&&g.latitude?(g.corrected_name&&(h.value=g.corrected_name,M=g.corrected_name,Y.toLowerCase()!==g.corrected_name.toLowerCase()&&(I=`Ми уточнили: ${g.corrected_name} 😉`)),E.set("geo",{latitude:g.latitude||g.lat,longitude:g.longitude||g.lon,timezone:g.timezone}),E.set("city",g.corrected_name)):g&&g.error==="ambiguous"?(f("ambiguous",M),V=!0):(f("not_found",M),V=!0),I?(T.innerText=I,T.style.display="block"):T.style.display="none",V){y(x,!1),navigator.vibrate&&navigator.vibrate(50);return}E.set("time",u);const $={date:E.get("date"),time:u,city:E.get("city"),geo:E.get("geo")};E.set("userData",$),setTimeout(()=>{n.navigateTo("paywall")},I?1200:0)}),O.addEventListener("click",async()=>{let u=h.value.trim();const M=u;if(_.style.display="none",p.style.display="none",h.classList.remove("input-error"),d&&d.classList.remove("input-error"),!u){h.classList.add("input-error"),_.innerText="Будь ласка, введи місто, навіть якщо не знаєш часу.",_.style.display="block",navigator.vibrate&&navigator.vibrate(50);return}y(x,!0),O.disabled=!0;const Y=await je(u);let V=null,g=!1;if(Y&&Y.latitude?(Y.corrected_name&&(h.value=Y.corrected_name,u=Y.corrected_name,M.toLowerCase()!==Y.corrected_name.toLowerCase()&&(V=`Ми уточнили: ${Y.corrected_name} 😉`)),E.set("geo",{latitude:Y.latitude||Y.lat,longitude:Y.longitude||Y.lon,timezone:Y.timezone}),E.set("city",Y.corrected_name),E.set("time","")):Y&&Y.error==="ambiguous"?(f("ambiguous",u),g=!0):(f("not_found",u),g=!0),V&&(T.innerText=V,T.style.display="block"),g){y(x,!1),O.disabled=!1,navigator.vibrate&&navigator.vibrate(50);return}const I={date:E.get("date"),time:"",city:E.get("city"),geo:E.get("geo")};E.set("userData",I),setTimeout(()=>{n.navigateTo("paywall")},V?1200:0)}),b();function b(){if(document.querySelector(".feedback-controls"))return;const u=document.createElement("div");u.className="feedback-controls",u.style.marginTop="15px",u.style.marginBottom="0",u.style.borderTop="none",u.style.paddingTop="0";const M=document.createElement("div");M.className="feedback-buttons";const Y=w("👍","like"),V=w("👎","dislike");M.appendChild(V),M.appendChild(Y),u.appendChild(M),s&&s.parentNode&&s.after(u)}function w(u,M){const Y=document.createElement("div");return Y.className="btn-feedback-icon",Y.innerText=u,Y.onclick=async()=>{Y.parentElement.querySelectorAll(".btn-feedback-icon").forEach(g=>g.classList.remove("active")),Y.classList.add("active"),await Wr.send({type:M,value:M,source:"partner_free_report"}),k("Дякую! 💜")},Y}function k(u){const M=document.createElement("div");M.innerText=u,M.style.position="fixed",M.style.top="20px",M.style.left="50%",M.style.transform="translate(-50%, -20px)",M.style.background="linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)",M.style.color="#fff",M.style.border="1px solid rgba(205, 164, 94, 0.3)",M.style.boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.8)",M.style.padding="12px 24px",M.style.borderRadius="99px",M.style.fontWeight="bold",M.style.opacity="0",M.style.transition="all 0.3s ease",M.style.zIndex="2000",document.body.appendChild(M),requestAnimationFrame(()=>{M.style.opacity="1",M.style.transform="translate(-50%, 0)"}),setTimeout(()=>{M.style.opacity="0",M.style.transform="translate(-50%, -20px)",setTimeout(()=>document.body.removeChild(M),300)},900)}}function Lf(n){const t="pv_"+Date.now()+"_"+Math.random().toString(36).substr(2,5),e={page_path:n,page_title:document.title,event_id:t,email:E.get("email")||""};window.DC_Analytics?.pushFilteredEvent?window.DC_Analytics.pushFilteredEvent("virtual_pageview",e):window.dataLayer&&window.dataLayer.push({event:"virtual_pageview",...e})}function Df(){if(E.get("traffic_type"))return;try{const p=localStorage.getItem("destiny_traffic_source");if(p){Pt.log(`🛰️ [Source] Restored traffic_type from LocalStorage: ${p}`),E.set("traffic_type",p);return}}catch{console.warn("LocalStorage access failed")}const n=new URLSearchParams(window.location.search),t=n.has("fbclid"),e=n.get("utm_medium")?.toLowerCase()||"",r=n.get("utm_source")?.toLowerCase()||"",s=document.referrer.toLowerCase(),o=s.includes("instagram.com")||s.includes("l.instagram.com"),l=t||["cpc","ads","ad","social_paid"].includes(e),d=!t&&o||r.includes("bio")||e.includes("bio");l&&!d?E.set("traffic_type","paid"):E.set("traffic_type","organic")}function Mf(){document.addEventListener("click",n=>{const t=n.target.closest("button, a, .paywall-item, .interactive-astro-box");if(t&&window.dataLayer){const e=t.id||t.getAttribute("name")||"no-id",r="clk_"+Date.now()+"_"+Math.random().toString(36).substr(2,5);let s="interaction_click";if(e==="upgrade-button"&&(s="click_upgrade_3scrn"),t.classList.contains("paywall-item")){const o=t.querySelector(".font-bold")?.innerText||"Unknown";s=`click_paywall_benefit_${{"Ядро Особистості":"personality","Код Твого Кохання":"love","Грошовий Потік":"money","Кармічні Уроки та Призначення":"karma","Твої Майбутні Можливості":"future"}[o]||"other"}`}else(t.classList.contains("interactive-astro-box")||e==="paywall-astro-data")&&(s="click_paywall_benefit_astro_imprint");if(window.DC_Analytics.pushFilteredEvent(s,{event_id:r,element_id:e,email:E.get("email")||"",page_path:window.location.pathname}),(e==="final-checkout-button"||e==="popup-checkout-btn")&&window.DC_Analytics.trackBeginCheckout(347,"Natal Chart Full Report"),e==="ltv-upsell-btn"){const l=window.location.pathname.includes("report")||window.location.pathname.includes("premium-result")?"Report":"Success";window.DC_Analytics.trackBeginCheckout(199,`Forecast Upsell (${l})`),E.set("last_checkout_value",199),E.set("upsell_origin",l)}}},!0),document.addEventListener("click",n=>{const t=n.target.closest('button, a, .btn, .clickable, input[type="radio"], input[type="checkbox"]');t&&(t.disabled||t.classList.contains("disabled")?Rt.trigger("error"):t.classList.contains("btn-primary")||t.classList.contains("btn-action")?Rt.trigger("medium"):Rt.trigger("light"))},!0)}window.DC_Analytics={generateEventId:(n="evt")=>`${n}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,pushFilteredEvent:(n,t)=>{const e=E.get("currentVariant"),r=["1uah","man1uah"].includes(e?.id),s=e?.skipMetaTracking||r,o=E.get("traffic_type");window.dataLayer&&n!=="purchase"&&window.dataLayer.push({event:`${n}_total`,traffic_source:o,...t}),o==="paid"&&(s||window.dataLayer&&window.dataLayer.push({event:n,...t}))},trackBeginCheckout:(n,t)=>{const e=window.DC_Analytics.generateEventId("bc");let r="begin_checkout_main";t.includes("(Success)")&&(r="begin_checkout_upsell_success"),t.includes("(Report)")&&(r="begin_checkout_upsell_report"),window.DC_Analytics.pushFilteredEvent(r,{event_id:e,item_name:t,email:E.get("email")||"",ecommerce:{currency:"UAH",value:n,items:[{item_name:t,price:n,quantity:1}]}}),Pt.log(`🚀 [Analytics] ${r.toUpperCase()}: ${t}`)},trackPurchase:(n,t,e)=>{const r=E.get("currentVariant"),s=["1uah","man1uah"].includes(r?.id),o=r?.skipMetaTracking||s,l=E.get("traffic_type");if(window.dataLayer.push({event:"purchase_total",traffic_source:l,item_name:e,value:n,transaction_id:t}),l!=="paid")return;if(n<=1||o){Pt.log(`🚫 [Analytics] Skip Meta tracking for test/promo variant: ${e} (Value: ${n} UAH, ID: ${r?.id||"unknown"})`);return}let d="purchase_main";e.includes("(Success)")&&(d="purchase_upsell_success"),e.includes("(Report)")&&(d="purchase_upsell_report"),window.dataLayer.push({event:"purchase",event_custom_name:d,event_id:t,email:E.get("email")||"",ecommerce:{transaction_id:t,value:n,currency:"UAH",items:[{item_name:e,price:n,quantity:1}]}}),Pt.log(`💰💰💰 [Analytics] ${d.toUpperCase()}: ${e}`)}};async function Vf(){const n=new URLSearchParams(window.location.search);if(n.get("restore_upsell")==="1"){const e=localStorage.getItem("dc_cross_tab_state");if(e)try{const l=JSON.parse(e);for(const d in l)E.set(d,l[d])}catch(l){console.error("Error parsing cross-tab state",l)}E.set("hasPaidUpsell",!0),E.set("isPaid",!0),(n.get("upsell_type")||"forecast")==="partner"?E.set("currentVariant",{id:"partner_upsell",productType:"partner",skipMetaTracking:!0,ui:{generation:{steps:[{text:"✨ Аналізую твій 7-й дім (Дім Стосунків)...",pause:1500},{text:"❤️‍🔥 Сканую положення Венери та Марса...",pause:1500},{text:"⚡️ Розраховую аспекти пристрасті та сумісності...",pause:1500},{text:"🗝 Визначаю ключ до серця твого ідеального партнера...",pause:1500},{text:"📍 Шукаю місце та обставини вашої зустрічі...",pause:1500},{text:"💍 Фіналізація Астро-Портрета Ідеального Партнера...",pause:1500},{text:"🌹 З твоїм звітом все гаразд, просто Всесвіт перевіряє ще одну деталь про твого суженого. Звіт вже летить тобі на пошту, і зараз відкриється тут.",pause:0,isDelayMessage:!0}]}}}):E.set("currentVariant",{id:"forecast",productType:"forecast",skipMetaTracking:!0,ui:{generation:{steps:[{text:"✨ Аналізую твої планетарні транзити на цей рік...",pause:1500},{text:"❤️‍🔥 Розраховую сприятливі періоди для кохання...",pause:1500},{text:"💰 Шукаю фінансові вікна можливостей...",pause:1500},{text:"🔮 Формую детальний прогноз...",pause:1500},{text:"⚡️ Фіналізація космічного календаря...",pause:1500},{text:"🌞 З твоїм прогнозом все гаразд, треба трохи більше часу ніж зазвичай. Звіт вже летить тобі на пошту, і зараз відкриється тут.",pause:0,isDelayMessage:!0}]}}}),n.delete("restore_upsell"),n.delete("upsell_source"),n.delete("upsell_type"),n.delete("orderRef");const s=n.toString(),o="/generation"+(s?"?"+s:"");window.history.replaceState({},document.title,o)}window.starryBgInstance||(window.starryBgInstance=new tn);const t=()=>{Rt.init(),document.body.removeEventListener("click",t),document.body.removeEventListener("touchstart",t)};document.body.addEventListener("click",t),document.body.addEventListener("touchstart",t),Df(),Mf(),ee.init({onRoute:async e=>{Lf(e);const r=new URLSearchParams(window.location.search);switch(e){case"/":yo(ee);break;case"/loading":window.DC_Analytics.pushFilteredEvent("lead_confirmed",{event_id:"ld_"+Date.now(),email:E.get("email")||""}),Ic(ee);break;case"/result":["man","man1uah"].includes(E.get("currentVariant")?.id)?Pf(ee):yf(ee);break;case"/premium":bf(ee);break;case"/paywall":if(!E.get("userData"))return ee.navigate("/");window.DC_Analytics.pushFilteredEvent("premium_data_confirmed",{event_id:"pdc_"+Date.now(),email:E.get("email")||""}),_f();break;case"/success":Tf(ee);break;case"/generation":if(!E.get("isPaid"))return ee.navigate("/paywall");Cf(ee);break;case"/report":case"/premium-result":if(!r.get("id")&&!E.get("isPaid"))return ee.navigate("/paywall");Yn(),Sf();break;default:yo(ee)}}})}document.addEventListener("DOMContentLoaded",Vf);
