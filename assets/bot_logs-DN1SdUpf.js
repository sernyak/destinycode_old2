import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as L}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as h,query as c,collection as m,orderBy as g,limit as p,getDocs as u}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";const I={projectId:"destinycode-982fa",appId:"1:168629222416:web:3283f6a4051f57a85c9e95",storageBucket:"destinycode-982fa.firebasestorage.app",apiKey:"AIzaSyA20BvSogSuHTni09Y54HwmlpG7UKXuxk8",authDomain:"destinycode-982fa.firebaseapp.com",messagingSenderId:"168629222416",measurementId:"G-ZKS4RCNFGX"},E=L(I),b=h(E),B="1536",v="dc_admin_auth";sessionStorage.getItem(v)==="true"&&(document.getElementById("login-screen").classList.add("hidden"),document.getElementById("admin-content").classList.remove("hidden"),loadLogs());document.getElementById("login-btn").addEventListener("click",x);document.getElementById("password-input").addEventListener("keydown",e=>{e.key==="Enter"&&x()});function x(){document.getElementById("password-input").value===B?(sessionStorage.setItem(v,"true"),document.getElementById("login-screen").classList.add("hidden"),document.getElementById("admin-content").classList.remove("hidden"),loadLogs()):alert("Wrong password")}let l="all",r=[];window.filterLogs=e=>{l=e,document.querySelectorAll(".filter-btn").forEach(a=>{a.classList.remove("bg-indigo-600","text-white"),a.classList.add("bg-slate-700","text-slate-300")});let s="btn-all";e==="-"&&(s="btn-neg"),e==="!"&&(s="btn-idea"),e==="+"&&(s="btn-pos");const t=document.getElementById(s);t.classList.remove("bg-slate-700","text-slate-300"),t.classList.add("bg-indigo-600","text-white"),w()};let f="logs";window.switchView=e=>{f=e,e==="logs"?(document.getElementById("view-logs").classList.remove("hidden"),document.getElementById("view-summaries").classList.add("hidden"),document.getElementById("btn-view-logs").classList.replace("bg-slate-700","bg-indigo-600"),document.getElementById("btn-view-logs").classList.replace("text-slate-300","text-white"),document.getElementById("btn-view-summaries").classList.replace("bg-indigo-600","bg-slate-700"),document.getElementById("btn-view-summaries").classList.replace("text-white","text-slate-300"),loadLogs()):(document.getElementById("view-logs").classList.add("hidden"),document.getElementById("view-summaries").classList.remove("hidden"),document.getElementById("btn-view-logs").classList.replace("bg-indigo-600","bg-slate-700"),document.getElementById("btn-view-logs").classList.replace("text-white","text-slate-300"),document.getElementById("btn-view-summaries").classList.replace("bg-slate-700","bg-indigo-600"),document.getElementById("btn-view-summaries").classList.replace("text-slate-300","text-white"),loadSummaries())};window.refreshData=()=>{f==="logs"?loadLogs():loadSummaries()};window.loadSummaries=async()=>{const e=document.getElementById("summaries-container");e.innerHTML='<div class="col-span-full text-center py-20 text-slate-500 animate-pulse">Завантаження підсумків...</div>';try{const s=c(m(b,"telegram_summaries"),g("timestamp","desc"),p(50)),t=await u(s);if(t.empty){e.innerHTML='<div class="col-span-full text-center py-10 text-slate-600">Поки що немає підсумків 🍃</div>';return}e.innerHTML="",t.forEach(a=>{const n=a.data(),i=n.timestamp?new Date(n.timestamp.seconds*1e3).toLocaleString("uk-UA"):"No Date",d=document.createElement("div");d.className="card rounded-xl p-5 border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition",d.innerHTML=`
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <div class="font-bold text-indigo-400">@${n.username}</div>
                                <div class="text-xs text-slate-500">ID: ${n.userId}</div>
                            </div>
                            <div class="text-xs text-slate-500 text-right">
                                ${i}<br>
                                <span class="text-slate-600">${n.messagesCount||"?"} msgs</span>
                            </div>
                        </div>
                        <div class="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed border-t border-slate-700/50 pt-3">
                            ${n.summary}
                        </div>
                    `,e.appendChild(d)})}catch(s){console.error(s),e.innerHTML=`<div class="col-span-full text-red-500 text-center">Error: ${s.message}</div>`}};window.loadLogs=async()=>{const e=document.getElementById("logs-container");e.innerHTML='<div class="text-center py-20 text-slate-500 animate-pulse">Завантаження логів...</div>';try{const s=c(m(b,"telegram_logs"),g("timestamp","desc"),p(100)),t=await u(s);r=[];let a={all:0,neg:0,idea:0,pos:0};t.forEach(n=>{const i={id:n.id,...n.data()};r.push(i),a.all++,i.tag==="-"&&a.neg++,i.tag==="!"&&a.idea++,i.tag==="+"&&a.pos++}),document.getElementById("stat-all").innerText=a.all,document.getElementById("stat-neg").innerText=a.neg,document.getElementById("stat-idea").innerText=a.idea,document.getElementById("stat-pos").innerText=a.pos,w()}catch(s){e.innerHTML=`<div class="text-red-500 text-center">Error: ${s.message}</div>`,console.error(s)}};function w(){const e=document.getElementById("logs-container");e.innerHTML="";const s=l==="all"?r:r.filter(t=>t.tag===l);if(s.length===0){e.innerHTML='<div class="text-center py-10 text-slate-500">Пусто 🍃</div>';return}s.forEach(t=>{const a=t.timestamp?new Date(t.timestamp.seconds*1e3).toLocaleString("uk-UA"):"Just now",n=t.isPaid===!0;let i="bg-slate-600",d="border-slate-700";t.tag==="-"&&(i="bg-red-500",d="border-red-900/50"),t.tag==="+"&&(i="bg-green-500",d="border-green-900/50"),t.tag==="!"&&(i="bg-yellow-500 text-black",d="border-yellow-900/50");const y=`
                    <div class="card rounded-xl p-5 ${d} border-l-4">
                        <div class="flex justify-between items-start mb-3">
                            <div class="flex items-center gap-3">
                                <div class="relative">
                                    <span class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-slate-300">
                                        ${t.username?t.username[0].toUpperCase():"U"}
                                    </span>
                                    ${n?'<span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-black border border-slate-900">💎</span>':""}
                                </div>
                                <div>
                                    <div class="font-semibold text-white flex items-center gap-2">
                                        ${t.username||"Anon"} 
                                        ${n?'<span class="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20 uppercase font-bold">Paid</span>':""}
                                    </div>
                                    <div class="text-xs text-slate-400">${a} <span class="ml-2 opacity-50">ID: ${t.userId}</span></div>
                                </div>
                            </div>
                            <span class="px-2 py-1 rounded text-[10px] font-bold ${i} text-white">${S(t.tag)}</span>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                <div class="text-[10px] text-slate-500 mb-1 uppercase tracking-wider font-bold">User Context</div>
                                <div class="text-slate-200 text-sm whitespace-pre-wrap max-h-48 overflow-y-auto custom-scroll">${o(t.userMessage)}</div>
                            </div>
                            <div class="bg-indigo-900/10 p-3 rounded-lg border border-indigo-900/20">
                                <div class="text-[10px] text-indigo-400 mb-1 uppercase tracking-wider font-bold">Anna (Astrologer)</div>
                                <div class="text-indigo-200 text-sm whitespace-pre-wrap max-h-48 overflow-y-auto custom-scroll">${o(t.aiResponse)}</div>
                            </div>
                        </div>
                    </div>
                `;e.insertAdjacentHTML("beforeend",y)})}function S(e){return e==="-"?"НЕГАТИВ":e==="+"?"ПОЗИТИВ":e==="!"?"ІДЕЯ":e==="0"?"INFO":e}function o(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}
