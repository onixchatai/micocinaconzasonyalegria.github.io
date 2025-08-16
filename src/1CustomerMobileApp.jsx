import React, { useState, useEffect } from 'react';
import { 
  Home, Search, ShoppingBag, User, MessageCircle, Clock, MapPin, 
  Star, Plus, Minus, ChevronRight, Heart, Tag, Bell, CreditCard,
  Check, X, Send, Bot, Loader, Filter, Grid, List, Sparkles, Settings,
  Lock, Mail, Eye, EyeOff, Shield, LogOut, UserPlus, CheckCircle
} from 'lucide-react';

const CustomerMobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "¡Hola! Welcome to MI COCINA! I can help you with our menu, hours, or take your order. What can I get started for you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [language, setLanguage] = useState('en');
  const [showZelleQR, setShowZelleQR] = useState(false);
  const [orderReady, setOrderReady] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [savedCards, setSavedCards] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    zip: ''
  });

  const translations = {
    en: {
      home: 'Home',
      search: 'Search',
      orders: 'Orders',
      profile: 'Profile',
      cart: 'Cart',
      menu: 'Menu',
      yourCart: 'Your Cart',
      subtotal: 'Subtotal',
      tax: 'Tax',
      total: 'Total',
      placeOrder: 'Place Pickup Order',
      signIn: 'Sign In to Order',
      pickupOnly: 'Pickup Only - No Delivery',
      paymentInfo: 'Payment: Cash or Zelle at pickup',
      addToCart: 'Add',
      specialInstructions: 'Customize Your Order',
      onion: 'Onion',
      cilantro: 'Cilantro',
      hotSauce: 'Hot Sauce',
      orderReady: 'Your order is ready for pickup!',
      callUs: 'Call us at'
    },
    es: {
      home: 'Inicio',
      search: 'Buscar',
      orders: 'Órdenes',
      profile: 'Perfil',
      cart: 'Carrito',
      menu: 'Menú',
      yourCart: 'Tu Carrito',
      subtotal: 'Subtotal',
      tax: 'Impuesto',
      total: 'Total',
      placeOrder: 'Ordenar para Recoger',
      signIn: 'Iniciar Sesión para Ordenar',
      pickupOnly: 'Solo para Recoger - No Entrega',
      paymentInfo: 'Pago: Efectivo o Zelle al recoger',
      addToCart: 'Agregar',
      specialInstructions: 'Personaliza Tu Orden',
      onion: 'Cebolla',
      cilantro: 'Cilantro',
      hotSauce: 'Salsa Picante',
      orderReady: '¡Tu orden está lista para recoger!',
      callUs: 'Llámanos al'
    }
  };

  const t = (key) => translations[language][key] || key;

  const businessInfo = {
    name: "MI COCINA",
    slogan: language === 'es' ? "Con Sazón y Alegría" : "With Flavor and Joy",
    rating: 4.9,
    reviews: 287,
    address: "Mason & Devonshire (across from Vons)",
    hours: language === 'es' ? "Lun-Vie: 7:00 AM - 12:00 PM" : "Mon-Fri: 7:00 AM - 12:00 PM",
    phone: "(818) 938-3955",
    delivery: language === 'es' ? "Solo para recoger - NO entrega" : "Pickup only - NO delivery available"
  };

  const menuItems = [
    { id: 1, name: 'Taco de Asada', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.9, reviews: 145, time: '5-10 min', popular: true, description: 'Grilled beef with onions and cilantro' },
    { id: 2, name: 'Taco de Pastor', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.9, reviews: 178, time: '5-10 min', popular: true, description: 'Marinated pork with pineapple, onions and cilantro' },
    { id: 3, name: 'Taco de Chorizo', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.8, reviews: 112, time: '5-10 min', description: 'Mexican sausage with onions and cilantro' },
    { id: 4, name: 'Taco de Pollo', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.7, reviews: 89, time: '5-10 min', description: 'Seasoned chicken with onions and cilantro' },
    { id: 5, name: 'Taco de Ranchera', category: 'Tacos', price: 3.00, image: '🌮', rating: 4.9, reviews: 134, time: '5-10 min', popular: true, description: 'Ranch-style beef with special sauce' },
    { id: 6, name: 'Taco de Camarón', category: 'Tacos', price: 3.00, image: '🦐', rating: 4.8, reviews: 156, time: '5-10 min', description: 'Grilled shrimp with chipotle mayo' },
    { id: 7, name: 'Taco de Pescado', category: 'Tacos', price: 3.00, image: '🐟', rating: 4.8, reviews: 123, time: '5-10 min', description: 'Grilled fish with cabbage and cream' },
    { id: 8, name: 'Taco de Cecina', category: 'Tacos', price: 3.00, image: '🌮', rating: 4.7, reviews: 98, time: '5-10 min', description: 'Salted beef with onions and cilantro' },
    { id: 9, name: 'Burrito de Asada', category: 'Burritos', price: 10.00, image: '🌯', rating: 4.9, reviews: 167, time: '10-15 min', popular: true, description: 'Large flour tortilla with grilled beef, beans, rice, and salsa' },
    { id: 10, name: 'Burrito de Pastor', category: 'Burritos', price: 10.00, image: '🌯', rating: 4.8, reviews: 145, time: '10-15 min', description: 'Large flour tortilla with marinated pork, beans, rice, and salsa' },
    { id: 11, name: 'Burrito de Chorizo', category: 'Burritos', price: 10.00, image: '🌯', rating: 4.8, reviews: 93, time: '10-15 min', description: 'Large flour tortilla with Mexican sausage, beans, rice, and salsa' },
    { id: 12, name: 'Burrito de Pollo', category: 'Burritos', price: 10.00, image: '🌯', rating: 4.7, reviews: 81, time: '10-15 min', description: 'Large flour tortilla with chicken, beans, rice, and salsa' },
    { id: 13, name: 'Burrito de Ranchera', category: 'Burritos', price: 12.00, image: '🌯', rating: 4.9, reviews: 112, time: '10-15 min', description: 'Large flour tortilla with ranch-style beef, beans, rice, and salsa' },
    { id: 14, name: 'Burrito de Camarón', category: 'Burritos', price: 12.00, image: '🌯', rating: 4.8, reviews: 134, time: '10-15 min', description: 'Large flour tortilla with shrimp, beans, rice, and chipotle sauce' },
    { id: 15, name: 'Burrito de Pescado', category: 'Burritos', price: 12.00, image: '🌯', rating: 4.8, reviews: 98, time: '10-15 min', description: 'Large flour tortilla with fish, beans, rice, and cream sauce' },
    { id: 16, name: 'Burrito de Cecina', category: 'Burritos', price: 12.00, image: '🌯', rating: 4.7, reviews: 76, time: '10-15 min', description: 'Large flour tortilla with salted beef, beans, rice, and salsa' },
    { id: 17, name: 'Torta de Asada', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.9, reviews: 134, time: '10-15 min', popular: true, description: 'Mexican sandwich with grilled beef, beans, lettuce, tomato, and avocado' },
    { id: 18, name: 'Torta de Pastor', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.8, reviews: 123, time: '10-15 min', description: 'Mexican sandwich with marinated pork, beans, lettuce, tomato, and avocado' },
    { id: 19, name: 'Torta de Chorizo', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.8, reviews: 78, time: '10-15 min', description: 'Mexican sandwich with Mexican sausage, beans, lettuce, tomato, and avocado' },
    { id: 20, name: 'Torta de Pollo', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.7, reviews: 72, time: '10-15 min', description: 'Mexican sandwich with chicken, beans, lettuce, tomato, and avocado' },
    { id: 21, name: 'Torta de Ranchera', category: 'Tortas', price: 12.00, image: '🥖', rating: 4.9, reviews: 98, time: '10-15 min', description: 'Mexican sandwich with ranch-style beef, beans, lettuce, tomato, and avocado' },
    { id: 22, name: 'Torta de Camarón', category: 'Tortas', price: 12.00, image: '🥖', rating: 4.8, reviews: 112, time: '10-15 min', description: 'Mexican sandwich with shrimp, beans, lettuce, tomato, and chipotle mayo' },
    { id: 23, name: 'Torta de Pescado', category: 'Tortas', price: 12.00, image: '🥖', rating: 4.8, reviews: 89, time: '10-15 min', description: 'Mexican sandwich with fish, beans, lettuce, tomato, and cream' },
    { id: 24, name: 'Torta de Cecina', category: 'Tortas', price: 12.00, image: '🥖', rating: 4.7, reviews: 67, time: '10-15 min', description: 'Mexican sandwich with salted beef, beans, lettuce, tomato, and avocado' },
    { id: 25, name: 'Plato de Asada', category: 'Platos', price: 12.00, image: '🍽️', rating: 4.9, reviews: 156, time: '15-20 min', popular: true, description: 'Grilled beef plate with rice, beans, salad, and tortillas' },
    { id: 26, name: 'Plato de Pastor', category: 'Platos', price: 12.00, image: '🍽️', rating: 4.8, reviews: 134, time: '15-20 min', description: 'Marinated pork plate with rice, beans, salad, and tortillas' },
    { id: 27, name: 'Plato de Chorizo', category: 'Platos', price: 12.00, image: '🍽️', rating: 4.8, reviews: 98, time: '15-20 min', description: 'Mexican sausage plate with rice, beans, salad, and tortillas' },
    { id: 28, name: 'Plato de Pollo', category: 'Platos', price: 12.00, image: '🍽️', rating: 4.7, reviews: 87, time: '15-20 min', description: 'Chicken plate with rice, beans, salad, and tortillas' },
    { id: 29, name: 'Plato de Ranchera', category: 'Platos', price: 15.00, image: '🍽️', rating: 4.9, reviews: 123, time: '15-20 min', description: 'Ranch-style beef plate with rice, beans, salad, and tortillas' },
    { id: 30, name: 'Plato de Camarón', category: 'Platos', price: 15.00, image: '🦐', rating: 4.9, reviews: 145, time: '15-20 min', popular: true, description: 'Grilled shrimp plate with rice, beans, salad, and tortillas' },
    { id: 31, name: 'Plato de Pescado', category: 'Platos', price: 15.00, image: '🐟', rating: 4.8, reviews: 112, time: '15-20 min', description: 'Grilled fish plate with rice, beans, salad, and tortillas' },
    { id: 32, name: 'Plato de Cecina', category: 'Platos', price: 15.00, image: '🍽️', rating: 4.7, reviews: 89, time: '15-20 min', description: 'Salted beef plate with rice, beans, salad, and tortillas' }
  ];

  const categories = ['all', 'Tacos', 'Burritos', 'Tortas', 'Platos'];

  const promos = [
    { id: 1, title: "Early Bird Special", desc: "Order before 9 AM", time: "Mon-Fri 7-9 AM", color: "bg-yellow-500" },
    { id: 2, title: "Combo Deal", desc: "Any 3 Tacos + Drink", price: "$8.50", color: "bg-green-500" },
    { id: 3, title: "Con Sazón y Alegría", desc: "Authentic Mexican Flavors Daily", time: "All Day", color: "bg-red-500" }
  ];

  const addToCart = (item) => {
    const customizations = {
      onion: true,
      cilantro: true,
      hotSauce: false
    };
    
    const existingItem = cartItems.find(cartItem => 
      cartItem.id === item.id && 
      JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
    );
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id && JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, customizations }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId]
    );
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { id: messages.length + 1, type: 'user', text: inputMessage };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      setTimeout(() => {
        const responses = [
          "Our most popular items are the Taco de Pastor and Plato de Camarón! Tacos start at just $2.50. Would you like to add some to your order?",
          "We're open Monday to Friday from 7:00 AM to 12:00 PM. Perfect for breakfast and lunch! Remember, we're pickup only.",
          "All our food is made con sazón y alegría! We have Asada, Pastor, Chorizo, Pollo, and our premium options: Ranchera, Camarón, Pescado, and Cecina.",
          "For payment, we accept Cash or Zelle with our QR code. No online payments yet, but we're working on it!"
        ];
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          text: responses[Math.floor(Math.random() * responses.length)]
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const placeOrder = () => {
    setShowCart(false);
    setOrderStatus('preparing');
    setCartItems([]);
    
    setTimeout(() => setOrderStatus('cooking'), 3000);
    setTimeout(() => setOrderStatus('ready'), 6000);
    setTimeout(() => {
      setOrderStatus('ready');
      setOrderReady(true);
      setTimeout(() => setOrderReady(false), 10000);
    }, 8000);
  };

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 min-h-screen relative">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{businessInfo.name}</h1>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="mr-3">{businessInfo.address}</span>
                <Clock className="w-3 h-3 mr-1" />
                <span>{businessInfo.hours}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
              >
                {language === 'en' ? 'ES' : 'EN'}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        {activeTab === 'home' && (
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </header>

      <main className="pb-20">
        {activeTab === 'home' && (
          <div>
            <div className="px-4 py-4">
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex space-x-3">
                  {promos.map(promo => (
                    <div key={promo.id} className={`${promo.color} rounded-lg p-4 text-white min-w-[280px]`}>
                      <h3 className="font-bold text-lg">{promo.title}</h3>
                      <p className="text-sm opacity-90 mt-1">{promo.desc}</p>
                      {promo.time && <p className="text-sm mt-2 font-medium">{promo.time}</p>}
                      {promo.price && <p className="text-xl font-bold mt-2">{promo.price}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">{t('menu')}</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAddCard(true)}
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                  >
                    {t('specialInstructions')}
                  </button>
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex space-x-2 overflow-x-auto -mx-4 px-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-700 border'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className={`px-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-3'}`}>
              {filteredItems.map(item => {
                const cartItem = cartItems.find(ci => ci.id === item.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                
                return (
                  <div key={item.id} className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`${viewMode === 'list' ? 'flex items-center p-4 flex-1' : 'p-4'}`}>
                      <div className={`${viewMode === 'list' ? 'flex items-center flex-1' : ''}`}>
                        <div className={`text-4xl mb-2 ${viewMode === 'list' ? 'mr-4 mb-0' : 'text-center'}`}>
                          {item.image}
                        </div>
                        <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium text-gray-900 flex-1">{item.name}</h3>
                            {item.popular && (
                              <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full flex items-center">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="ml-1">{item.rating}</span>
                            <span className="mx-1">·</span>
                            <span>{item.reviews} reviews</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                            <button
                              onClick={() => toggleFavorite(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current text-red-500' : ''}`} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {item.time}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`flex items-center justify-center mt-3 ${viewMode === 'list' ? 'ml-4 mt-0' : ''}`}>
                        {quantity > 0 ? (
                          <div className="flex items-center bg-red-500 rounded-full">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-white hover:bg-red-600 rounded-l-full"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 text-white font-medium">{quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="p-2 text-white hover:bg-red-600 rounded-r-full"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            {t('addToCart')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="px-4 py-4">
            <h2 className="text-xl font-semibold mb-4">Search & Discover</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium mb-2">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Tacos', 'Burrito', 'Asada', 'Pollo'].map(term => (
                    <button key={term} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium mb-2">Trending Now</h3>
                <div className="space-y-2">
                  {menuItems.filter(item => item.popular).map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{item.image}</span>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-2 bg-red-500 text-white rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="px-4 py-4">
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
            
            {orderStatus && (
              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-3">Current Order</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Order #12345</span>
                  <span className="text-sm font-medium">Ready in: 10 min</span>
                </div>
                
                <div className="relative">
                  <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 rounded"></div>
                  <div className={`absolute top-3 left-0 h-1 bg-green-500 rounded transition-all duration-500 ${
                    orderStatus === 'preparing' ? 'w-1/3' :
                    orderStatus === 'cooking' ? 'w-2/3' :
                    'w-full'
                  }`}></div>
                  
                  <div className="relative flex justify-between">
                    {[
                      { status: 'preparing', label: 'Preparing' },
                      { status: 'cooking', label: 'Cooking' },
                      { status: 'ready', label: 'Ready' }
                    ].map((step, index) => (
                      <div key={step.status} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          ['preparing', 'cooking', 'ready'].indexOf(orderStatus) >= index
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-xs mt-2">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">
                  Call Restaurant
                </button>
              </div>
            )}
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Past Orders</h3>
              {[
                { id: '#12344', date: 'Yesterday', items: 3, total: 45.97, status: 'Picked up' },
                { id: '#12343', date: 'March 15', items: 2, total: 28.98, status: 'Picked up' },
                { id: '#12342', date: 'March 10', items: 5, total: 67.95, status: 'Picked up' }
              ].map(order => (
                <div key={order.id} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date} · {order.items} items</p>
                      <p className="text-sm font-medium mt-1">${order.total}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <button className="mt-3 text-red-500 text-sm font-medium">
                    Order Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="px-4 py-4">
            {!isAuthenticated ? (
              <div className="max-w-sm mx-auto">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">Welcome to MI COCINA</h2>
                    <p className="text-gray-600 mt-2">Sign in to order for pickup</p>
                  </div>
                  
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 mb-4"
                  >
                    Sign In with Email
                  </button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <button 
                        onClick={() => {
                          setAuthMode('signup');
                          setShowAuthModal(true);
                        }}
                        className="text-red-500 font-medium"
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Your data is secure</p>
                        <p>We use bank-level encryption to protect your payment information</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {authData.name ? authData.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg">{authData.name || 'User'}</h3>
                        <p className="text-sm text-gray-600">{authData.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsAuthenticated(false);
                        setAuthData({ email: '', password: '', confirmPassword: '', name: '' });
                        setSavedCards([]);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <h3 className="font-medium mb-3">Loyalty Rewards</h3>
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-90">Points Balance</p>
                        <p className="text-3xl font-bold">1,245</p>
                        <p className="text-sm mt-2 opacity-90">Gold Member</p>
                      </div>
                      <Tag className="w-8 h-8 opacity-50" />
                    </div>
                    <div className="mt-4 bg-white/20 rounded-lg p-3">
                      <p className="text-sm">55 points until your next reward!</p>
                      <div className="mt-1 bg-white/30 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { icon: Heart, label: 'Favorites', count: favorites.length },
                    { icon: MapPin, label: 'Saved Addresses', count: 2 },
                    { icon: Bell, label: 'Notifications' },
                    { icon: Settings, label: 'Settings' }
                  ].map((item, index) => (
                    <button key={index} className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 text-gray-600 mr-3" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center">
                        {item.count !== undefined && (
                          <span className="text-sm text-gray-500 mr-2">{item.count}</span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t('yourCart')} ({getCartItemCount()} items)</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{item.image}</span>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      {item.customizations && (
                        <div className="text-xs text-gray-500 mt-1">
                          {item.customizations.onion && <span className="mr-2">✓ {t('onion')}</span>}
                          {item.customizations.cilantro && <span className="mr-2">✓ {t('cilantro')}</span>}
                          {item.customizations.hotSauce && <span>✓ {t('hotSauce')}</span>}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="mx-3 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>{t('subtotal')}</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{t('tax')}</span>
                  <span>${(getCartTotal() * 0.0975).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>{t('total')}</span>
                  <span>
                    ${(getCartTotal() + (getCartTotal() * 0.0975)).toFixed(2)}
                  </span>
                </div>
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">
                    📍 {t('pickupOnly')}
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    {t('paymentInfo')}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowCart(false);
                    setActiveTab('profile');
                    setShowAuthModal(true);
                  } else {
                    placeOrder();
                  }
                }}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600"
              >
                {!isAuthenticated ? t('signIn') : t('placeOrder')}
              </button>
              
              {isAuthenticated && (
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => setShowZelleQR(true)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center justify-center"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    View Zelle QR Code
                  </button>
                  <div className="text-center text-sm text-gray-600">
                    <p>📞 {t('callUs')} {businessInfo.phone}</p>
                    <p className="mt-1">{t('paymentInfo')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {chatOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl z-40">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Bot className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={sendMessage}
                className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-24 right-4 w-12 h-12 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 z-30"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'home', icon: Home, label: t('home') },
            { id: 'search', icon: Search, label: t('search') },
            { id: 'orders', icon: ShoppingBag, label: t('orders') },
            { id: 'profile', icon: User, label: t('profile') }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-3 ${
                activeTab === item.id ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={() => setShowCart(true)}
            className="relative flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs mt-1">{t('cart')}</span>
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </button>
        </div>
      </nav>
      
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <button onClick={() => setShowAuthModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={authData.name}
                    onChange={(e) => setAuthData({...authData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Juan García"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={authData.email}
                    onChange={(e) => setAuthData({...authData, email: e.target.value})}
                    className="w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="juan@email.com"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={authData.password}
                    onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    className="w-full px-3 py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="••••••••"
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={authData.confirmPassword}
                    onChange={(e) => setAuthData({...authData, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="••••••••"
                  />
                </div>
              )}
              
              <button
                onClick={() => {
                  setIsAuthenticated(true);
                  setShowAuthModal(false);
                }}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600"
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
              
              <div className="text-center text-sm">
                <p className="text-gray-600">
                  {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                    className="text-red-500 font-medium"
                  >
                    {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-center text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      )}
      
      {showZelleQR && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Zelle Payment QR Code</h2>
              <button onClick={() => setShowZelleQR(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 p-8 rounded-lg mb-4">
                <div className="w-48 h-48 bg-white mx-auto flex items-center justify-center border-2 border-gray-300">
                  <span className="text-gray-500">QR Code Here</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Scan with your Zelle app</p>
              <p className="font-medium">{businessInfo.phone}</p>
              <p className="text-xs text-gray-500 mt-4">
                Show this QR code when picking up your order
              </p>
            </div>
          </div>
        </div>
      )}
      
      {orderReady && (
        <div className="fixed top-20 left-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 mr-3" />
            <div>
              <p className="font-medium">{t('orderReady')}</p>
              <p className="text-sm opacity-90">Order #12345</p>
            </div>
          </div>
          <button onClick={() => setOrderReady(false)} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{t('specialInstructions')}</h2>
              <button onClick={() => setShowAddCard(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center p-3 bg-gray-50 rounded-lg">
                <input type="checkbox" defaultChecked className="mr-3" />
                <span>{t('onion')}</span>
              </label>
              
              <label className="flex items-center p-3 bg-gray-50 rounded-lg">
                <input type="checkbox" defaultChecked className="mr-3" />
                <span>{t('cilantro')}</span>
              </label>
              
              <label className="flex items-center p-3 bg-gray-50 rounded-lg">
                <input type="checkbox" className="mr-3" />
                <span>{t('hotSauce')}</span>
              </label>
              
              <button
                onClick={() => setShowAddCard(false)}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600"
              >
                Apply to All Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerMobileApp;