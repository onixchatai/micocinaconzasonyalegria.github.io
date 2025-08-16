import React, { useState, useEffect } from 'react';
import { 
  Home, Search, ShoppingBag, User, MessageCircle, Clock, MapPin, 
  Star, Plus, Minus, ChevronRight, Heart, Tag, Bell, CreditCard,
  Check, X, Send, Bot, Grid, List, Sparkles, Settings, LogOut
} from 'lucide-react';

const CustomerMobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "¡Hola! Welcome to ocina! Pickup only. How can I help?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [language, setLanguage] = useState('es'); // default Spanish
  const [showZelleQR, setShowZelleQR] = useState(false);
  const [orderReady, setOrderReady] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const t = (key) => ({
    en: {
      home:'Home',search:'Search',orders:'Orders',profile:'Profile',cart:'Cart',
      menu:'Menu',yourCart:'Your Cart',subtotal:'Subtotal',tax:'Tax',total:'Total',
      placeOrder:'Place Pickup Order', signIn:'Sign In to Order',
      pickupOnly:'Pickup Only - No Delivery', paymentInfo:'Payment: Cash or Zelle at pickup',
      addToCart:'Add', orderReady:'Your order is ready for pickup!', callUs:'Call us at',
      viewQR:'View Zelle QR Code'
    },
    es: {
      home:'Inicio',search:'Buscar',orders:'Órdenes',profile:'Perfil',cart:'Carrito',
      menu:'Menú',yourCart:'Tu Carrito',subtotal:'Subtotal',tax:'Impuesto',total:'Total',
      placeOrder:'Ordenar para Recoger', signIn:'Inicia Sesión para Ordenar',
      pickupOnly:'Solo para Recoger - No Entrega', paymentInfo:'Pago: Efectivo o Zelle al recoger',
      addToCart:'Agregar', orderReady:'¡Tu orden está lista para recoger!', callUs:'Llámanos al',
      viewQR:'Ver QR de Zelle'
    }
  }[language][key] || key);

  const businessInfo = {
    name: "ocina",
    slogan: language === 'es' ? "Auténtico Sabor Hecho con Amor" : "Authentic Flavor Made with Love",
    rating: 4.9, reviews: 287,
    address: "Mason & Devonshire (frente a Vons)",
    hours: language === 'es' ? "Lun–Vie: 7:00 AM – 12:00 PM" : "Mon–Fri: 7:00 AM – 12:00 PM",
    phone: "(818) 938-3955"
  };

  const categories = ['all', 'Tacos', 'Burritos', 'Tortas'];

  const promos = [
    { id: 1, title: "Especial mañanero", desc: "Pide antes de las 9 AM", time: "Lun–Vie 7–9 AM", color: "background:#f59e0b" },
    { id: 2, title: "Combo 3 Tacos + Bebida", desc: "Solo en mostrador", price: "$7.50", color: "background:#22c55e" },
    { id: 3, title: "Hecho con Amor", desc: "Auténtico sabor en cada bocado", time: "Todo el día", color: "background:#ef4444" }
  ];

  useEffect(() => {
    // load editable menu.json
    fetch('/menu.json')
      .then(r => r.json())
      .then(data => setMenuItems(data.items || []))
      .catch(() => {
        // fallback minimal if menu.json not found
        setMenuItems([
          { id: 1, name: 'Taco de Asada', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.9, reviews: 145, time: '5-10 min', popular: true },
          { id: 5, name: 'Burrito de Asada', category: 'Burritos', price: 11.00, image: '🌯', rating: 4.9, reviews: 167, time: '10-15 min', popular: true },
          { id: 9, name: 'Torta de Asada', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.9, reviews: 134, time: '10-15 min', popular: true }
        ]);
      });
  }, []);

  const addToCart = (item) => {
    const existing = cartItems.find(ci => ci.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(ci => ci.id===item.id?{...ci, quantity:ci.quantity+1}:ci));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  const removeFromCart = (id) => {
    const existing = cartItems.find(ci => ci.id===id);
    if (existing && existing.quantity>1) {
      setCartItems(cartItems.map(ci => ci.id===id?{...ci, quantity:ci.quantity-1}:ci));
    } else {
      setCartItems(cartItems.filter(ci => ci.id!==id));
    }
  };
  const getCartTotal = ()=> cartItems.reduce((t,i)=>t+i.price*i.quantity,0);
  const getCartItemCount = ()=> cartItems.reduce((t,i)=>t+i.quantity,0);

  const filteredItems = activeCategory === 'all' ? menuItems : menuItems.filter(i=>i.category===activeCategory);

  const placeOrder = () => {
    setShowCart(false);
    setOrderStatus('preparing');
    setCartItems([]);
    setTimeout(()=>setOrderStatus('cooking'), 3000);
    setTimeout(()=>setOrderStatus('ready'), 6000);
    setTimeout(()=>{ setOrderReady(true); setTimeout(()=>setOrderReady(false), 8000); }, 8000);
  };

  return (
    <div className="w-full" style={{maxWidth: 420, margin:'0 auto', background:'#f9fafb', minHeight:'100vh', position:'relative'}}>
      <header className="header">
        <div className="row">
          <div>
            <div style={{fontWeight:700,fontSize:18}}>{businessInfo.name}</div>
            <div style={{display:'flex',gap:8,alignItems:'center',color:'#6b7280',fontSize:12}}>
              <MapPin size={14}/><span>{businessInfo.address}</span>
              <Clock size={14}/><span>{businessInfo.hours}</span>
            </div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <button className="btn btn-secondary" onClick={()=>setLanguage(language==='en'?'es':'en')}>{language==='en'?'ES':'EN'}</button>
            <button className="btn btn-secondary"><Bell size={18}/></button>
          </div>
        </div>
        {activeTab==='home' && (
          <div className="search">
            <input type="text" placeholder={language==='es'?'Buscar en el menú...':'Search menu...'} />
          </div>
        )}
      </header>

      <main style={{paddingBottom:72}}>
        {activeTab==='home' && (
          <div>
            <div className="container">
              <div style={{overflow: 'auto'}}>
                <div style={{display: 'flex', gap: '12px', minHeight: '120px'}}>
                  {promos.map(p => (
                    <div
                      key={p.id}
                      className="card"
                      style={{
                        minWidth: 260,
                        padding: 12,
                        color: '#fff',
                        background: p.color.split(':')[1]
                      }}
                    >
                      <div style={{fontWeight:700,fontSize:16}}>{p.title}</div>
                      <div style={{opacity:.9,fontSize:13,marginTop:4}}>{p.desc}</div>
                      {p.time && <div style={{marginTop:8,fontSize:12,fontWeight:600}}>{p.time}</div>}
                      {p.price && <div style={{marginTop:8,fontSize:18,fontWeight:800}}>{p.price}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="container">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{fontWeight:700}}>{t('menu')}</div>
                <button className="btn btn-secondary" onClick={()=>setViewMode(viewMode==='grid'?'list':'grid')}>
                  {viewMode==='grid'?<List size={16}/>:<Grid size={16}/>}
                </button>
              </div>
              <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:8}}>
                {categories.map(c => (
                  <button key={c} onClick={()=>setActiveCategory(c)} className="badge" style={{border:'1px solid #e5e7eb', background: activeCategory===c?'#ef4444':'#fff', color: activeCategory===c?'#fff':'#111'}}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="container">
              <div className={viewMode==='grid'?'grid grid-2':'grid'}>
                {filteredItems.map(item => {
                  const qty = (cartItems.find(ci=>ci.id===item.id)||{}).quantity||0;
                  return (
                    <div key={item.id} className="card" style={{padding:12, display:viewMode==='list'?'flex':'block', alignItems:'center'}}>
                      <div style={{fontSize:36, marginRight:viewMode==='list'?12:0}}>{item.image}</div>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                          <div style={{fontWeight:600}}>{item.name}</div>
                          {item.popular && <span className="badge" style={{background:'#fff7ed',color:'#c2410c',border:'1px solid #fed7aa',display:'inline-flex',alignItems:'center',gap:4}}><Sparkles size={12}/>Popular</span>}
                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:6,color:'#6b7280',fontSize:12,marginTop:4}}>
                          <Star size={12} style={{fill:'#facc15',color:'#facc15'}}/><span>{item.rating}</span> · <span>{item.reviews} reviews</span>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                          <div style={{fontWeight:700}}>${item.price.toFixed(2)}</div>
                          {qty>0 ? (
                            <div style={{display:'flex',borderRadius:9999,overflow:'hidden',background:'#ef4444',color:'#fff'}}>
                              <button onClick={()=>removeFromCart(item.id)} className="btn" style={{background:'transparent'}}><Minus size={16}/></button>
                              <div style={{padding:'0 10px',display:'flex',alignItems:'center'}}>{qty}</div>
                              <button onClick={()=>addToCart(item)} className="btn" style={{background:'transparent'}}><Plus size={16}/></button>
                            </div>
                          ):(
                            <button onClick={()=>addToCart(item)} className="btn btn-primary"><Plus size={16}/> {t('addToCart')}</button>
                          )}
                        </div>
                        <div style={{fontSize:11,color:'#6b7280',marginTop:4}}><Clock size={12}/> {item.time}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab==='orders' && (
          <div className="container">
            <h2 style={{fontWeight:700,marginBottom:12}}>{language==='es'?'Tus Órdenes':'Your Orders'}</h2>
            {orderStatus && (
              <div className="card" style={{padding:12, marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:12,color:'#6b7280'}}>Order #12345</span>
                  <span style={{fontSize:12,fontWeight:600}}>ETA: 20 min</span>
                </div>
                <div style={{position:'relative',height:8,background:'#e5e7eb',borderRadius:9999,overflow:'hidden'}}>
                  <div style={{position:'absolute',left:0,top:0,bottom:0,width: orderStatus==='preparing'?'25%':orderStatus==='cooking'?'50%':orderStatus==='ready'?'75%':'100%', background:'#22c55e'}}></div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab==='profile' && (
          <div className="container">
            <div className="card" style={{padding:16, marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700}}>ocina</div>
                  <div style={{fontSize:12,color:'#6b7280'}}>{businessInfo.phone}</div>
                </div>
                <button className="btn btn-secondary" onClick={()=>setShowZelleQR(true)}>
                  <CreditCard size={16}/> {t('viewQR')}
                </button>
              </div>
            </div>

            <div className="card" style={{padding:16}}>
              <div className="notice">📍 {t('pickupOnly')}<br/>💳 {t('paymentInfo')}</div>
            </div>
          </div>
        )}
      </main>

      {showCart && (
        <div className="modal-backdrop">
          <div className="modal">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <h3 style={{fontWeight:700}}>{t('yourCart')} ({getCartItemCount()} {language==='es'?'artículos':'items'})</h3>
              <button onClick={()=>setShowCart(false)}><X size={18}/></button>
            </div>
            <div>
              {cartItems.map(item=>(
                <div key={item.id} className="card" style={{padding:8, marginBottom:8}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{fontSize:24}}>{item.image}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600}}>{item.name}</div>
                      <div style={{fontSize:12,color:'#6b7280'}}>${item.price.toFixed(2)}</div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <button onClick={()=>removeFromCart(item.id)} className="btn btn-secondary"><Minus size={14}/></button>
                      <div>{item.quantity}</div>
                      <button onClick={()=>addToCart(item)} className="btn btn-secondary"><Plus size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{marginTop:12,borderTop:'1px solid #eee',paddingTop:12}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span>{t('subtotal')}</span><span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span>{t('tax')}</span><span>${(getCartTotal()*0.0975).toFixed(2)}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:18}}>
                <span>{t('total')}</span><span>${(getCartTotal()*1.0975).toFixed(2)}</span>
              </div>
              <div className="notice" style={{marginTop:8}}>
                📍 {t('pickupOnly')} · 💳 {t('paymentInfo')}
              </div>
              <button onClick={placeOrder} className="btn btn-primary" style={{width:'100%',marginTop:10}}>
                {t('placeOrder')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showZelleQR && (
        <div className="modal-backdrop">
          <div className="modal">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <h3 style={{fontWeight:700}}>Zelle</h3>
              <button onClick={()=>setShowZelleQR(false)}><X size={18}/></button>
            </div>
            <div className="qr-box">
              <img src="/qr-zelle.png" alt="Zelle QR" style={{maxWidth:'100%',maxHeight:'100%'}}/>
            </div>
            <div style={{textAlign:'center',marginTop:8,fontSize:13}}>
              {language==='es'?'Escanéalo con tu app de Zelle':'Scan with your Zelle app'}<br/>
              {businessInfo.phone}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed-bottom nav">
        {[
          { id:'home', icon: Home, label: t('home') },
          { id:'search', icon: Search, label: t('search') },
          { id:'orders', icon: ShoppingBag, label: t('orders') },
          { id:'profile', icon: User, label: t('profile') }
        ].map(i => (
          <button key={i.id} onClick={()=>setActiveTab(i.id)} className={activeTab===i.id?'active':''}>
            <i.icon size={20}/>
            <span style={{fontSize:10,marginTop:2}}>{i.label}</span>
          </button>
        ))}
        <button onClick={()=>setShowCart(true)}>
          <ShoppingBag size={20}/>
          <span style={{fontSize:10,marginTop:2}}>{t('cart')}</span>
          {getCartItemCount()>0 && <span style={{position:'absolute',transform:'translate(8px,-6px)',background:'#ef4444',color:'#fff',borderRadius:'9999px',fontSize:10,padding:'2px 6px'}}>{getCartItemCount()}</span>}
        </button>
      </nav>
    </div>
  );
};

export default CustomerMobileApp;
