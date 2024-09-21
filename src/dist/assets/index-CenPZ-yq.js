(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const d=()=>`<header>
      <p class = "heading">TABLE HEADING</p>

      <nav>
         <div class="nav-option">
            <ul>
               <a href="/dashboard" class="nav-option-1">All</a>
               <a href="/paid" class="nav-option-2">Paid</a>
               <a href="/unpaid" class="nav-option-3">Unpaid</a>
               <a href="/overdue" class="nav-option-4">Overdue</a>
            </ul>
         </div>

         <p class="nav-total-amount">Total payable amount: 1000</p>
      </nav>
      </header>
    `,u=()=>`
      <div class="menu">

         <button class="menu-filter">
            <p><img src="../assets/icons/filter.svg" alt="filter-icon">Filter</p>
         </button>

         <div class="menu-search">
            <img src="../assets/icons/searchOption.svg" alt="search-bar">
            <input type="text" placeholder="Search Users by Name, Email or Date" >
         </div>

         <button class="menu-pay">PAY DUES</button>
      </div>
   `,p=()=>`

      <div class="table-tilte">
         <a href=""><img src="/src/assets/icons/userNonCheckbox.svg" alt="nonCheckbox"></a>
         <p class="name">NAME</p>
         <p class="status">USER STATUS</p>
         <p class="paymentStatus">PAYMENT STATUS</p>
         <p class="amount">AMOUNT</p>
         <a href=""><img src="/src/assets/icons/viewMoreOption.svg" alt="viewMoreOption"></a>
      </div>

   `;class m{constructor(){}Dashboard(){const n=document.createElement("div");n.className="container";const s=document.createElement("main");return s.className="main",n.appendChild(s),s.innerHTML+=d(),s.innerHTML+=u(),s.innerHTML+=p(),n}}const i=()=>new m,c={"^/":{template:i().Dashboard},"^/paid$":{},"^/unpaid$":{},"^/overdue$":{},404:{template:i().Dashboard}},h=()=>location.hash.slice(1).toLowerCase()||"/",l=()=>{const a=h();let n=Object.keys(c).find(s=>new RegExp(s).test(a));n?(document.getElementById("root").innerHTML="",document.getElementById("root").appendChild(c[n].template())):document.getElementById("root").innerHTML="<h3>Not Found</h3>"};window.addEventListener("hashchange",l);window.addEventListener("load",l);
