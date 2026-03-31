import"./modulepreload-polyfill-B5Qt9EMX.js";import{_ as d}from"./preload-helper-BXl3LOEh.js";const f="1536",r="dc_admin_auth",E=document.getElementById("login-screen"),_=document.getElementById("admin-content"),o=document.getElementById("password-input"),y=document.getElementById("login-btn"),I=document.getElementById("login-error");sessionStorage.getItem(r)==="true"&&a();y.addEventListener("click",c);o.addEventListener("keydown",s=>{s.key==="Enter"&&c()});function c(){o.value===f?(sessionStorage.setItem(r,"true"),a()):(I.classList.remove("hidden"),o.classList.add("border-red-500"))}function a(){E.classList.add("hidden"),_.classList.remove("hidden"),b()}async function b(){const{VARIANTS:s}=await d(async()=>{const{VARIANTS:e}=await import("./index-UPlVeYa9.js");return{VARIANTS:e}},[]),{DISPLAY_PRICES:l}=await d(async()=>{const{DISPLAY_PRICES:e}=await import("./config-Cnjk6YiG.js");return{DISPLAY_PRICES:e}},[]),g=document.getElementById("variants-grid");function u(e){return e.enabled===!1?{label:"Чорновик",class:"badge-draft"}:{label:"Активний",class:"badge-active"}}function m(e){return e.pricing&&e.pricing.display&&e.pricing.display.FULL_REPORT?e.pricing.display.FULL_REPORT+" грн":l.FULL_REPORT+" грн (стандартна)"}function p(e){const t=[];return e.ui&&Object.keys(e.ui).some(n=>e.ui[n])&&t.push("🎨 UI"),e.aiContext&&e.aiContext.additionalPrompt&&t.push("🤖 ШІ"),e.pricing&&t.push("💰 Ціна"),e.ui&&e.ui.backgroundColor&&t.push("🌈 Фон"),t.length>0?t.join(", "):"Немає (ідентичний головній)"}Object.entries(s).forEach(([e,t])=>{const n=u(t),i=document.createElement("div");i.className="card rounded-xl p-5 flex items-center justify-between",i.innerHTML=`
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <span class="text-xl font-bold text-white">/${e}</span>
                            <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${n.class}">${n.label}</span>
                        </div>
                        <div class="text-sm text-slate-400 space-y-1">
                            <div><strong>Тип:</strong> ${t.type||"N/A"}</div>
                            <div><strong>Ціна:</strong> ${m(t)}</div>
                            <div><strong>Оверрайди:</strong> ${p(t)}</div>
                            <div><strong>Трекінг:</strong> ${t.tracking?.campaignName||"N/A"}</div>
                        </div>
                    </div>
                    <a href="/${e}" target="_blank" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition">
                        Відкрити →
                    </a>
                `,g.appendChild(i)})}
