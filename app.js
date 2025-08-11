// Mary's Tacos PWA Ordering App
const state = {
  menu: null,
  cart: JSON.parse(localStorage.getItem('cart')||'[]'),
  taxRate: 0.0875, // adjust for your location
  business: {
    name: "Mary's Tacos",
    whatsapp: "+15555551234", // change to business WhatsApp
    address: "123 Main St, Your City",
    acceptsZelle: true
  }
};

const el = sel => document.querySelector(sel);
const els = sel => Array.from(document.querySelectorAll(sel));

const fmt = n => `$${n.toFixed(2)}`;

function saveCart(){ localStorage.setItem('cart', JSON.stringify(state.cart)); refreshCartBar(); }

function refreshCartBar(){
  const count = state.cart.reduce((a,i)=>a+i.qty,0);
  const total = state.cart.reduce((a,i)=>a+i.qty*i.price,0);
  el('#cartCount').textContent = count;
  el('#cartTotal').textContent = fmt(total);
  el('#cartBar').style.display = count>0 ? 'flex' : 'none';
}

async function loadMenu(){
  const res = await fetch('data/menu.json');
  state.menu = await res.json();
  buildCategories();
}

function buildCategories(){
  const nav = el('#categoryTabs'); nav.innerHTML = '';
  state.menu.categories.forEach((cat,idx)=>{
    const b = document.createElement('button');
    b.className = 'tab'+(idx===0?' active':'');
    b.textContent = cat.name;
    b.onclick = ()=>selectCategory(cat.id, b);
    nav.appendChild(b);
  });
  selectCategory(state.menu.categories[0].id, nav.firstChild);
}

function selectCategory(catId, btn){
  els('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const cat = state.menu.categories.find(c=>c.id===catId);
  const list = el('#menuList'); list.innerHTML = '';
  cat.items.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.desc||''}</p>
      <div class="row">
        <span class="price">${fmt(item.price)}</span>
        <button class="btn primary">Add</button>
      </div>
    `;
    card.querySelector('button').onclick = ()=>addToCart(item);
    list.appendChild(card);
  });
}

function addToCart(item){
  const found = state.cart.find(i=>i.id===item.id);
  if(found) found.qty++; else state.cart.push({id:item.id, name:item.name, price:item.price, qty:1});
  saveCart();
}

function openCart(){
  renderCart();
  el('#cartDialog').showModal();
}

function changeQty(id, delta){
  const it = state.cart.find(i=>i.id===id);
  if(!it) return;
  it.qty += delta;
  if(it.qty<=0) state.cart = state.cart.filter(i=>i.id!==id);
  saveCart(); renderCart();
}

function clearCart(){
  state.cart = [];
  saveCart(); renderCart();
  el('#cartDialog').close();
}

function renderCart(){
  const wrap = el('#cartItems'); wrap.innerHTML = '';
  const subtotal = state.cart.reduce((a,i)=>a+i.qty*i.price,0);
  const tax = subtotal * state.taxRate;
  const total = subtotal + tax;
  el('#subTotal').textContent = fmt(subtotal);
  el('#taxTotal').textContent = fmt(tax);
  el('#grandTotal').textContent = fmt(total);

  state.cart.forEach(item=>{
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <div><strong>${item.name}</strong><div class="muted tiny">${fmt(item.price)} • each</div></div>
      <div class="qty">
        <button class="btn ghost" aria-label="decrease">−</button>
        <strong>${item.qty}</strong>
        <button class="btn ghost" aria-label="increase">+</button>
      </div>
      <div><strong>${fmt(item.qty*item.price)}</strong></div>
    `;
    const [dec, , inc] = row.querySelectorAll('button');
    dec.onclick=()=>changeQty(item.id,-1);
    inc.onclick=()=>changeQty(item.id,1);
    wrap.appendChild(row);
  });

  // Pickup times (every 15 mins next 3 hours)
  const pt = el('#pickupTime'); pt.innerHTML = '';
  const now = new Date();
  const start = new Date(now.getTime()+20*60000);
  for(let i=0;i<12;i++){
    const t = new Date(start.getTime()+i*15*60000);
    const opt = document.createElement('option');
    opt.value = t.toISOString();
    opt.textContent = t.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    pt.appendChild(opt);
  }
}

function submitOrder(){
  const name = el('#custName').value.trim();
  const phone = el('#custPhone').value.trim();
  const pickupISO = el('#pickupTime').value;
  if(!name || !phone || !pickupISO || state.cart.length===0){
    alert('Please fill name, phone, pickup time, and add items to cart.'); return;
  }
  const pickup = new Date(pickupISO);
  const lines = [
    `*${state.business.name}* Order (Pickup)`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Pickup: ${pickup.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`,
    `Items:`,
    ...state.cart.map(i=>`- ${i.qty} x ${i.name} @ ${fmt(i.price)} = ${fmt(i.qty*i.price)}`),
  ];
  const subtotal = state.cart.reduce((a,i)=>a+i.qty*i.price,0);
  const tax = subtotal*state.taxRate;
  const total = subtotal+tax;
  lines.push(`Subtotal: ${fmt(subtotal)}`);
  lines.push(`Tax: ${fmt(tax)}`);
  lines.push(`Total: ${fmt(total)}`);
  if(state.business.acceptsZelle){
    lines.push(`Zelle: Optional. Show payment at pickup.`);
  }
  const msg = encodeURIComponent(lines.join('\n'));
  const phoneDigits = state.business.whatsapp.replace(/[^0-9]/g,'');
  const waLink = `https://wa.me/${phoneDigits}?text=${msg}`;
  window.open(waLink, '_blank');
}

function setupInstall(){
  let deferredPrompt;
  const btn = el('#installBtn');
  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault(); deferredPrompt = e;
    btn.style.display = 'inline-flex';
    btn.onclick = async ()=>{
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      btn.style.display='none';
      deferredPrompt=null;
    };
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  el('#year').textContent = new Date().getFullYear();
  loadMenu();
  refreshCartBar();
  el('#viewCartBtn').onclick = openCart;
  el('#clearCartBtn').onclick = clearCart;
  el('#submitOrderBtn').onclick = submitOrder;
  setupInstall();
});
