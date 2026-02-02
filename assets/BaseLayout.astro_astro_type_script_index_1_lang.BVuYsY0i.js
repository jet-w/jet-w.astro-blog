function B(a){try{const t=atob(a),e=new Uint8Array(t.length);for(let r=0;r<t.length;r++)e[r]=t.charCodeAt(r);return new TextDecoder("utf-8").decode(e)}catch(t){return console.error("Base64 decode failed:",t),atob(a)}}function Y(){const a=document.getElementById("mermaid-fullscreen-modal");if(a)return a;const t=document.createElement("div");t.id="mermaid-fullscreen-modal",t.className="mermaid-fullscreen-modal",t.innerHTML=`
    <div class="mermaid-fullscreen-backdrop"></div>
    <div class="mermaid-fullscreen-container">
      <div class="mermaid-fullscreen-header">
        <span class="mermaid-fullscreen-title">Mermaid 图表预览</span>
        <div class="mermaid-fullscreen-controls">
          <button class="mermaid-zoom-btn" data-action="zoom-out" title="缩小">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <span class="mermaid-zoom-level">100%</span>
          <button class="mermaid-zoom-btn" data-action="zoom-in" title="放大">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button class="mermaid-zoom-btn" data-action="zoom-fit" title="适配屏幕">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
            </svg>
          </button>
          <button class="mermaid-zoom-btn" data-action="zoom-reset" title="重置为100%">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
          </button>
          <button class="mermaid-close-btn" title="关闭 (Esc)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="mermaid-fullscreen-content">
        <div class="mermaid-fullscreen-svg-wrapper"></div>
      </div>
    </div>
  `,document.body.appendChild(t);let e=1;const s=.25,r=.25,i=4;let o=!1,d=0,c=0,l=0,u=0;const E=t.querySelector(".mermaid-fullscreen-backdrop"),C=t.querySelector(".mermaid-close-btn"),q=t.querySelector(".mermaid-zoom-level"),m=t.querySelector(".mermaid-fullscreen-svg-wrapper"),p=t.querySelector(".mermaid-fullscreen-content");function f(){q.textContent=Math.round(e*100)+"%",m.style.transform=`translate(${l}px, ${u}px) scale(${e})`}function h(){l=0,u=0}function y(){t.classList.remove("active"),document.body.style.overflow="",e=1,h(),f(),o=!1}E.addEventListener("click",y),C.addEventListener("click",y),m.addEventListener("mousedown",n=>{n.button===0&&(o=!0,d=n.clientX-l,c=n.clientY-u,m.style.cursor="grabbing",n.preventDefault())}),document.addEventListener("mousemove",n=>{!o||!t.classList.contains("active")||(l=n.clientX-d,u=n.clientY-c,f())}),document.addEventListener("mouseup",()=>{o&&(o=!1,m.style.cursor="grab")});let w=0,x=0;m.addEventListener("touchstart",n=>{n.touches.length===1&&(o=!0,w=n.touches[0].clientX-l,x=n.touches[0].clientY-u)},{passive:!0}),m.addEventListener("touchmove",n=>{!o||n.touches.length!==1||(l=n.touches[0].clientX-w,u=n.touches[0].clientY-x,f())},{passive:!0}),m.addEventListener("touchend",()=>{o=!1});function k(){const n=m.querySelector("svg");if(!n)return 1;const v=m.style.transform;m.style.transform="translate(0px, 0px) scale(1)";const L=n.getBoundingClientRect(),S=p.getBoundingClientRect();m.style.transform=v;const z=S.width-80,T=S.height-80,A=z/L.width,D=T/L.height;return Math.min(A,D,3)}return t.querySelectorAll(".mermaid-zoom-btn").forEach(n=>{n.addEventListener("click",()=>{const v=n.dataset.action;v==="zoom-in"&&e<i?e=Math.min(e+s,i):v==="zoom-out"&&e>r?e=Math.max(e-s,r):v==="zoom-reset"?(e=1,h()):v==="zoom-fit"&&(e=k(),h()),f()})}),document.addEventListener("keydown",n=>{t.classList.contains("active")&&(n.key==="Escape"?y():n.key==="+"||n.key==="="?e<i&&(e=Math.min(e+s,i),f()):n.key==="-"?e>r&&(e=Math.max(e-s,r),f()):n.key==="0"&&(e=1,h(),f()))}),p.addEventListener("wheel",n=>{t.classList.contains("active")&&(n.preventDefault(),n.deltaY<0&&e<i?e=Math.min(e+s*.5,i):n.deltaY>0&&e>r&&(e=Math.max(e-s*.5,r)),f())},{passive:!1}),t._fitToScreen=function(){e=k(),h(),f()},t}function F(a){const t=Y(),e=t.querySelector(".mermaid-fullscreen-svg-wrapper");e.innerHTML=a,e.style.transform="translate(0px, 0px) scale(1)",e.style.cursor="grab",t.classList.add("active"),document.body.style.overflow="hidden",requestAnimationFrame(()=>{t._fitToScreen&&t._fitToScreen()})}function H(){const a=document.createElement("button");return a.className="mermaid-fullscreen-btn",a.title="全屏预览",a.innerHTML=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
    </svg>
  `,a}function X(){return new Promise((a,t)=>{if(window.mermaid){a();return}const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js",e.onload=()=>a(),e.onerror=()=>t(new Error("Failed to load mermaid from CDN")),document.head.appendChild(e)})}async function $(){const a=document.querySelectorAll(".mermaid-container[data-mermaid-source]");if(a.length!==0)try{await X(),window.mermaid.initialize({startOnLoad:!1,theme:"default",securityLevel:"loose",fontFamily:'"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',flowchart:{useMaxWidth:!0,htmlLabels:!0,curve:"basis"}});for(let t=0;t<a.length;t++){const e=a[t];try{const s=e.getAttribute("data-mermaid-source");if(!s)continue;const r=e.getAttribute("data-id")||`mermaid-${Date.now()}-${t}`,i=B(s),o=await window.mermaid.render(r,i),d=document.createElement("div");d.className="mermaid-rendered",d.style.cssText=["margin: 1.5rem 0","padding: 1rem","border: 1px solid #e2e8f0","border-radius: 0.5rem","background: white","overflow-x: auto","text-align: center","position: relative"].join("; "),d.innerHTML=o.svg;const c=H();c.addEventListener("click",()=>{F(o.svg)}),d.appendChild(c);const l=e.querySelector(".mermaid-loading");l?e.replaceChild(d,l):e.appendChild(d)}catch(s){console.error(`Mermaid render error for container ${t+1}:`,s);const r=document.createElement("div");r.style.cssText="color: red; padding: 1rem; border: 1px solid red; margin: 1rem 0; background: #fee;",r.innerHTML=`<strong>Mermaid渲染错误:</strong> ${s.message}`;const i=e.querySelector(".mermaid-loading");i&&e.replaceChild(r,i);const o=e.querySelector(".mermaid-fallback");o&&(o.style.display="block")}}}catch(t){console.error("Failed to load mermaid library:",t)}}function g(){$()}function M(a,t){const e=document.querySelector(`[data-tabs-id="${a}"]`);if(!e)return;e.querySelectorAll(".tab-button").forEach((i,o)=>{o===t?i.classList.add("active"):i.classList.remove("active")}),e.querySelectorAll(".tab-panel").forEach((i,o)=>{o===t?i.classList.add("active"):i.classList.remove("active")})}function N(){document.querySelectorAll(".custom-tabs").forEach(t=>{const e=t.querySelector(".tab-button"),s=t.querySelector(".tab-panel");e&&!t.querySelector(".tab-button.active")&&e.classList.add("active"),s&&!t.querySelector(".tab-panel.active")&&s.classList.add("active");const r=t.querySelectorAll(".tab-button");r.forEach((i,o)=>{i.addEventListener("keydown",d=>{const c=d;let l=o;if(c.key==="ArrowRight"||c.key==="ArrowDown"?(c.preventDefault(),l=(o+1)%r.length):c.key==="ArrowLeft"||c.key==="ArrowUp"?(c.preventDefault(),l=(o-1+r.length)%r.length):c.key==="Home"?(c.preventDefault(),l=0):c.key==="End"&&(c.preventDefault(),l=r.length-1),l!==o){const u=t.getAttribute("data-tabs-id");u&&(M(u,l),r[l].focus())}})})})}function b(){window.switchTab=M,N()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{g(),b()}):(g(),b());document.addEventListener("astro:page-load",()=>{g(),b()});
