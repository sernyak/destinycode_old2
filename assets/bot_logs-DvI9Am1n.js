import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as w}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as L}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";const I={projectId:"destinycode-982fa",appId:"1:168629222416:web:3283f6a4051f57a85c9e95",storageBucket:"destinycode-982fa.firebasestorage.app",apiKey:"AIzaSyA20BvSogSuHTni09Y54HwmlpG7UKXuxk8",authDomain:"destinycode-982fa.firebaseapp.com",messagingSenderId:"168629222416",measurementId:"G-ZKS4RCNFGX"},E=w(I);L(E,"destiny-code-db");const S="https://europe-west1-destinycode-982fa.cloudfunctions.net",v="1536",f="dc_admin_auth",$=document.getElementById("login-screen"),M=document.getElementById("admin-content"),p=document.getElementById("password-input");document.getElementById("login-btn").addEventListener("click",h);p.addEventListener("keydown",e=>{e.key==="Enter"&&h()});function h(){p.value===v?(sessionStorage.setItem(f,"true"),y()):(alert("Wrong password"),p.value="")}function y(){$.classList.add("hidden"),M.classList.remove("hidden"),u()}sessionStorage.getItem(f)==="true"&&y();window.switchView=e=>{u()};window.refreshData=()=>{u()};async function u(){const e=document.getElementById("logs-container"),n=document.getElementById("error-container");e.innerHTML='<div class="text-center py-20 text-slate-500 animate-pulse">Завантаження даних...</div>',n.classList.add("hidden"),n.innerHTML="";try{const s=await fetch(`${S}/getBotLogs?type=summaries`,{method:"GET",headers:{"x-admin-key":v}});if(!s.ok)throw new Error(`Server Error: ${s.status} ${s.statusText}`);const c=(await s.json()).logs||[];if(c.sort((t,l)=>l.timestamp-t.timestamp),c.length===0){e.innerHTML='<div class="text-center py-20 text-slate-600">Архів пустий 🍃</div>';return}e.innerHTML="",c.forEach(t=>{const l=t.timestamp?new Date(t.timestamp).toLocaleString("uk-UA"):"Unknown Date",r=t.history||[],m=x(t.summary||""),b=t.username&&t.username!=="unknown"?t.username:"User "+(t.userId||"???"),o=document.createElement("div");o.className="card rounded-xl p-5 border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition cursor-pointer mb-4",r.length>0&&(o.onclick=a=>B(o,a));let i=`
                            <div class="flex justify-between items-start mb-3 pointer-events-none">
                                <div>
                                    <div class="flex items-center gap-2 mb-1">
                                        <div class="font-bold text-indigo-400 text-lg">@${b}</div>
                                        <span class="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full">Archive</span>
                                    </div>
                                    <div class="text-xs text-slate-500">ID: ${t.userId} • Msgs: ${t.messagesCount||r.length}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xs text-slate-400">${l}</div>
                                    <div class="text-xs text-slate-600 mt-1">${k(t.timestamp)}</div>
                                </div>
                            </div>
                        `;m&&m!=="No summary generated"?i+=`
                                <div class="mb-3 p-3 bg-indigo-900/10 rounded-lg border border-indigo-500/20 text-sm text-indigo-200/90 leading-relaxed pointer-events-none">
                                    ${m}
                                </div>
                            `:i+='<div class="text-xs text-slate-600 italic mb-2">Підсумок відсутній.</div>',r.length>0&&(i+=`
                                <div class="history-content hidden mt-4 border-t border-slate-700 pt-4 space-y-3">
                            `,r.forEach(a=>{const g=a.role==="user";i+=`
                                    <div class="${g?"text-right":"text-left"}">
                                        <div class="text-xs text-slate-500 mb-1">${g?"👤 Ви:":"🤖 Анна:"}</div>
                                        <div class="inline-block max-w-[85%] px-4 py-2 rounded-2xl ${g?"bg-indigo-600 text-white ml-auto":"bg-slate-700 text-slate-200 mr-auto"} text-sm whitespace-pre-wrap text-left">${x(a.text)}</div>
                                    </div>
                                `}),i+=`</div>
                                <div class="text-center mt-3 text-xs text-slate-500 pointer-events-none expand-hint">🔽 Розгорнути переписку</div>
            `),o.innerHTML=i,e.appendChild(o)})}catch(s){console.error(s),n.innerHTML=`⚠️ <b>Connection Error:</b><br>${s.message}`,n.classList.remove("hidden"),e.innerHTML=""}}function k(e){if(!e)return"";const n=Math.floor((Date.now()-e)/1e3);return n<60?"щойно":n<3600?Math.floor(n/60)+" хв тому":n<86400?Math.floor(n/3600)+" год тому":Math.floor(n/86400)+" дн тому"}function B(e,n){const s=e.querySelector(".history-content");if(!s)return;const d=e.querySelector(".expand-hint");s.classList.contains("hidden")?(s.classList.remove("hidden"),d.textContent="🔼 Згорнути",e.classList.add("ring-1","ring-indigo-500")):(s.classList.add("hidden"),d.textContent="🔽 Розгорнути переписку",e.classList.remove("ring-1","ring-indigo-500"))}function x(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}
