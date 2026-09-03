import{n as u,c as m,h as w}from"./index-DvDa0iJv.js";const b="living-copy:token";function A(c){const o=new Map,y=new WeakMap,i=document.createElement("div");i.id="living-copy-bar",i.setAttribute("data-living-copy-ignore",""),i.innerHTML=`
    <style>
      #living-copy-bar {
        position: fixed; left: 50%; transform: translateX(-50%); bottom: 20px;
        z-index: 2147483647; display: flex; gap: 10px; align-items: center;
        background: #0a0a0aF2; color: #f2f2f2; border: 1px solid #a78bfa66;
        border-radius: 999px; padding: 10px 16px; backdrop-filter: blur(8px);
        font: 500 13px/1.2 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        box-shadow: 0 8px 32px #000000A6; max-width: calc(100vw - 32px);
      }
      #living-copy-bar button {
        font: inherit; border-radius: 999px; padding: 7px 14px; cursor: pointer;
        border: 1px solid transparent; background: #a78bfa; color: #0a0a0a; font-weight: 600;
      }
      #living-copy-bar button.ghost { background: transparent; color: #f2f2f2; border-color: #ffffff33; }
      #living-copy-bar button:disabled { opacity: .45; cursor: not-allowed; }
      #living-copy-bar .lc-count { color: #a78bfa; font-variant-numeric: tabular-nums; }
      #living-copy-bar .lc-status { color: #bdbdbd; max-width: 34ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      [data-living-copy-editing] { outline: 2px dashed #a78bfa99; outline-offset: 3px; cursor: text; }
      [data-living-copy-dirty] { outline: 2px solid #a78bfa; outline-offset: 3px; }
      @media (max-width: 480px) { #living-copy-bar { font-size: 12px; padding: 8px 12px; gap: 6px; } }
    </style>
    <span>✎ Living Copy</span>
    <span class="lc-count">0 edits</span>
    <button class="lc-publish" disabled>Publish</button>
    <button class="ghost lc-revert" disabled>Revert all</button>
    <button class="ghost lc-exit">Exit</button>
    <span class="lc-status"></span>
  `,document.body.appendChild(i);const g=i.querySelector(".lc-count"),h=i.querySelector(".lc-status"),s=i.querySelector(".lc-publish"),f=i.querySelector(".lc-revert"),x=i.querySelector(".lc-exit"),l=()=>{g.textContent=`${o.size} edit${o.size===1?"":"s"}`,s.disabled=o.size===0,f.disabled=o.size===0},r=t=>{h.textContent=t},d=Array.from(document.querySelectorAll(c.selector)).filter(t=>{if(t.closest("[data-living-copy-ignore]"))return!1;const e=u(t.textContent??"");return!e||e.length<2||e.length>2e3?!1:Array.from(t.childNodes).some(n=>n.nodeType===Node.TEXT_NODE&&(n.textContent??"").trim())});for(const t of d){const e=u(t.textContent??""),n=t.hasAttribute("data-living-copy-applied")?t.getAttribute("data-living-copy-source")??e:e;y.set(t,t.textContent??""),t.setAttribute("contenteditable","plaintext-only"),t.setAttribute("data-living-copy-editing",""),t.setAttribute("spellcheck","true"),t.addEventListener("input",()=>{const a=u(t.textContent??""),p=m(t,n,location.pathname);a===n?(o.delete(p),t.removeAttribute("data-living-copy-dirty")):(o.set(p,{copyKey:p,value:a,sourceHash:w(n),sourceText:n,route:location.pathname.replace(/\/+$/,"")||"/"}),t.setAttribute("data-living-copy-dirty","")),l()}),t.addEventListener("keydown",a=>{a.key==="Escape"&&t.blur()})}r(`${d.length} editable strings on this page`);const v=()=>{let t=localStorage.getItem(b);return t||(t=window.prompt("Paste your mythOS API key to publish (stored on this device only):"),t&&localStorage.setItem(b,t.trim())),t?t.trim():null};s.addEventListener("click",async()=>{const t=v();if(!t)return r("publish cancelled — no key");s.disabled=!0,r("publishing…");try{const e=await fetch(`${c.endpoint.replace(/\/$/,"")}/living-copy`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({site:c.siteId,edits:Array.from(o.values())})});if(e.status===401){localStorage.removeItem(b),r("key rejected — click Publish to re-enter"),s.disabled=!1;return}if(!e.ok)throw new Error(`${e.status}`);const n=await e.json();r(`published ${n.applied} — live now`),o.clear(),document.querySelectorAll("[data-living-copy-dirty]").forEach(a=>a.removeAttribute("data-living-copy-dirty")),l()}catch(e){r(`publish FAILED (${e.message}) — your edits are still on screen`),s.disabled=!1}}),f.addEventListener("click",()=>{for(const t of d){const e=y.get(t);e!==void 0&&(t.textContent=e),t.removeAttribute("data-living-copy-dirty")}o.clear(),l(),r("reverted to what was on screen")}),x.addEventListener("click",()=>{const t=new URL(location.href);t.searchParams.delete("edit"),location.href=t.toString()}),l()}export{A as mountEditor};
