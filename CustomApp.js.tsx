<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Cosina Mobile Ordering</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/lucide-static@0.16.0/font/lucide.css" rel="stylesheet">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 28rem;
      margin: 0 auto;
      background-color: #f9fafb;
    }
    .menu-item-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    [data-tab-content] {
      display: none;
    }
    .active[data-tab-content] {
      display: block;
    }
    .nav-active {
      color: #ef4444;
    }
  </style>
</head>
<body class="bg-gray-50 min-h-screen relative">
  <!-- Header -->
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="px-4 py-3">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-gray-900">Mary's Tacos</h1>
          <div class="flex items-center text-sm text-gray-600 mt-1">
            <i data-lucide="map-pin" class="w-3 h-3 mr-1"></i>
            <span class="mr-3">Mason & Devonshire (across from Vons)</span>
            <i data-lucide="clock" class="w-3 h-3 mr-1"></i>
            <span>Mon-Fri: 7:00 AM - 12:00 PM</span>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button id="languageToggle" class="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
            EN
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100">
            <i data-lucide="bell" class="w-5 h-5 text-gray-600"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div id="searchContainer" class="px-4 pb-3">
      <div class="relative">
        <i data-lucide="search" class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Search menu..."
          class="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="searchInput"
        />
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="pb-20">
    <!-- Home Tab -->
    <div data-tab-content id="home" class="active">
      <!-- Promo Cards -->
      <div class="px-4 py-4">
        <div class="overflow-x-auto -mx-4 px-4 no-scrollbar">
          <div class="flex space-x-3">
            <div class="bg-yellow-500 rounded-lg p-4 text-white min-w-[280px]">
              <h3 class="font-bold text-lg">Early Bird Special</h3>
              <p class="text-sm opacity-90 mt-1">Order before 9 AM</p>
              <p class="text-sm mt-2 font-medium">Mon-Fri 7-9 AM</p>
            </div>
            <div class="bg-green-500 rounded-lg p-4 text-white min-w-[280px]">
              <h3 class="font-bold text-lg">Combo Deal</h3>
              <p class="text-sm opacity-90 mt-1">Any 3 Tacos + Drink</p>
              <p class="text-xl font-bold mt-2">$7.50</p>
            </div>
            <div class="bg-red-500 rounded-lg p-4 text-white min-w-[280px]">
              <h3 class="font-bold text-lg">Made with Love</h3>
              <p class="text-sm opacity-90 mt-1">Authentic Flavor in Every Bite</p>
              <p class="text-sm mt-2 font-medium">All Day</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div class="px-4 mb-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-semibold text-gray-900">Menu</h2>
          <button id="viewToggle" class="p-2 rounded-lg hover:bg-gray-100">
            <i data-lucide="list" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="flex space-x-2 overflow-x-auto -mx-4 px-4 no-scrollbar" id="categoryContainer">
          <button data-category="all" class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-blue-600 text-white">
            All
          </button>
          <button data-category="Tacos" class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-white text-gray-700 border">
            Tacos
          </button>
          <button data-category="Burritos" class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-white text-gray-700 border">
            Burritos
          </button>
          <button data-category="Tortas" class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-white text-gray-700 border">
            Tortas
          </button>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="menu-item-grid px-4" id="menuContainer">
        <!-- Menu items will be dynamically inserted here -->
      </div>
    </div>

    <!-- Search Tab -->
    <div data-tab-content id="search" class="px-4 py-4">
      <h2 class="text-xl font-semibold mb-4">Search & Discover</h2>
      <div class="space-y-4">
        <div class="bg-white rounded-lg p-4">
          <h3 class="font-medium mb-2">Recent Searches</h3>
          <div class="flex flex-wrap gap-2">
            <button class="px-3 py-1 bg-gray-100 rounded-full text-sm">Tacos</button>
            <button class="px-3 py-1 bg-gray-100 rounded-full text-sm">Burritos</button>
            <button class="px-3 py-1 bg-gray-100 rounded-full text-sm">Tortas</button>
            <button class="px-3 py-1 bg-gray-100 rounded-full text-sm">Drinks</button>
          </div>
        </div>
        
        <div class="bg-white rounded-lg p-4">
          <h3 class="font-medium mb-2">Popular Items</h3>
          <div class="space-y-2" id="popularItems">
            <!-- Popular items will be inserted here -->
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Tab -->
    <div data-tab-content id="orders" class="px-4 py-4">
      <h2 class="text-xl font-semibold mb-4">Your Orders</h2>
      
      <div id="currentOrderContainer">
        <!-- Current order will be inserted here if exists -->
      </div>
      
      <div class="space-y-3" id="pastOrdersContainer">
        <h3 class="font-medium text-gray-900">Past Orders</h3>
        <!-- Past orders will be inserted here -->
      </div>
    </div>

    <!-- Profile Tab -->
    <div data-tab-content id="profile" class="px-4 py-4">
      <div id="authContainer">
        <!-- Authentication content will be inserted here -->
      </div>
    </div>
  </main>

  <!-- Cart Overlay -->
  <div id="cartOverlay" class="fixed inset-0 bg-black/50 z-50 hidden">
    <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white p-4 border-b">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Your Cart (<span id="cartItemCount">0</span> items)</h2>
          <button id="closeCart" class="p-2 hover:bg-gray-100 rounded-full">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
      
      <div class="p-4 space-y-3" id="cartItemsContainer">
        <!-- Cart items will be inserted here -->
      </div>
      
      <div class="p-4 pt-4 border-t">
        <div class="flex justify-between mb-2">
          <span>Subtotal</span>
          <span id="cartSubtotal">$0.00</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Tax</span>
          <span id="cartTax">$0.00</span>
        </div>
        <div class="flex justify-between font-semibold text-lg pt-2 border-t">
          <span>Total</span>
          <span id="cartTotal">$0.00</span>
        </div>
        <div class="mt-3 p-3 bg-yellow-50 rounded-lg">
          <p class="text-sm text-yellow-800 font-medium">
            📍 Pickup Only - No Delivery
          </p>
          <p class="text-xs text-yellow-700 mt-1">
            Payment: Cash or Zelle at pickup
          </p>
        </div>
      </div>
      
      <div class="p-4">
        <button id="checkoutButton" class="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600">
          Place Pickup Order
        </button>
        
        <div class="mt-3 text-center text-sm text-gray-600">
          <p>📞 Call us at (818) 938-3955</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Order Confirmation Modal -->
  <div id="orderConfirmation" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-lg w-full max-w-sm p-6">
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <i data-lucide="check" class="w-8 h-8 text-white"></i>
        </div>
        <h2 class="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p class="text-gray-600">Your order #<span id="orderNumber">12345</span> has been placed</p>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">Estimated Ready</span>
          <span class="font-medium" id="estimatedReadyTime">15-20 minutes</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Total</span>
          <span class="font-medium" id="orderTotalAmount">$0.00</span>
        </div>
      </div>
      
      <button id="closeConfirmation" class="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600">
        Done
      </button>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t">
    <div class="flex items-center justify-around py-2">
      <button data-tab="home" class="flex flex-col items-center py-2 px-3 nav-active">
        <i data-lucide="home" class="w-6 h-6"></i>
        <span class="text-xs mt-1">Home</span>
      </button>
      
      <button data-tab="search" class="flex flex-col items-center py-2 px-3 text-gray-400">
        <i data-lucide="search" class="w-6 h-6"></i>
        <span class="text-xs mt-1">Search</span>
      </button>
      
      <button data-tab="orders" class="flex flex-col items-center py-2 px-3 text-gray-400">
        <i data-lucide="shopping-bag" class="w-6 h-6"></i>
        <span class="text-xs mt-1">Orders</span>
      </button>
      
      <button data-tab="profile" class="flex flex-col items-center py-2 px-3 text-gray-400">
        <i data-lucide="user" class="w-6 h-6"></i>
        <span class="text-xs mt-1">Profile</span>
      </button>
      
      <button id="cartButton" class="relative flex flex-col items-center py-2 px-3 text-gray-400">
        <i data-lucide="shopping-bag" class="w-6 h-6"></i>
        <span class="text-xs mt-1">Cart</span>
        <span id="cartBadge" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hidden">
          0
        </span>
      </button>
    </div>
  </nav>

  <!-- Floating Chat Button -->
  <button id="chatButton" class="fixed bottom-24 right-4 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 z-30">
    <i data-lucide="message-circle" class="w-6 h-6"></i>
  </button>

  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Menu Data
    const menuItems = [
      { id: 1, name: 'Taco de Asada', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.9, reviews: 145, time: '5-10 min', popular: true, description: 'Grilled beef with onions and cilantro' },
      { id: 2, name: 'Taco de Lengua', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.8, reviews: 98, time: '5-10 min', description: 'Tender beef tongue with onions and cilantro' },
      { id: 3, name: 'Taco de Suadero', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.9, reviews: 112, time: '5-10 min', popular: true, description: 'Soft beef brisket with onions and cilantro' },
      { id: 4, name: 'Taco de Pollo', category: 'Tacos', price: 2.50, image: '🌮', rating: 4.7, reviews: 89, time: '5-10 min', description: 'Seasoned chicken with onions and cilantro' },
      { id: 5, name: 'Burrito de Asada', category: 'Burritos', price: 11.00, image: '🌯', rating: 4.9, reviews: 167, time: '10-15 min', popular: true, description: 'Large flour tortilla with grilled beef, beans, rice, and salsa' },
      { id: 6, name: 'Burrito de Lengua', category: 'Burritos', price: 11.00, image: '🌯', rating: 4.8, reviews: 76, time: '10-15 min', description: 'Large flour tortilla with beef tongue, beans, rice, and salsa' },
      { id: 7, name: 'Burrito de Suadero', category: 'Burritos', price: 11.00, image: '🌯', rating: 4.8, reviews: 93, time: '10-15 min', description: 'Large flour tortilla with beef brisket, beans, rice, and salsa' },
      { id: 8, name: 'Burrito de Pollo', category: 'Burritos', price: 11.00, image: '🌯', rating: 4.7, reviews: 81, time: '10-15 min', description: 'Large flour tortilla with chicken, beans, rice, and salsa' },
      { id: 9, name: 'Torta de Asada', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.9, reviews: 134, time: '10-15 min', popular: true, description: 'Mexican sandwich with grilled beef, beans, lettuce, tomato, and avocado' },
      { id: 10, name: 'Torta de Lengua', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.8, reviews: 67, time: '10-15 min', description: 'Mexican sandwich with beef tongue, beans, lettuce, tomato, and avocado' },
      { id: 11, name: 'Torta de Suadero', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.8, reviews: 78, time: '10-15 min', description: 'Mexican sandwich with beef brisket, beans, lettuce, tomato, and avocado' },
      { id: 12, name: 'Torta de Pollo', category: 'Tortas', price: 10.00, image: '🥖', rating: 4.7, reviews: 72, time: '10-15 min', description: 'Mexican sandwich with chicken, beans, lettuce, tomato, and avocado' }
    ];

    // Cart state
    let cart = [];
    let orders = [];
    let activeCategory = 'all';
    let viewMode = 'grid';
    let language = 'en';

    // DOM Elements
    const menuContainer = document.getElementById('menuContainer');
    const popularItemsContainer = document.getElementById('popularItems');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartButton = document.getElementById('cartButton');
    const closeCart = document.getElementById('closeCart');
    const cartBadge = document.getElementById('cartBadge');
    const cartItemCount = document.getElementById('cartItemCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkoutButton');
    const orderConfirmation = document.getElementById('orderConfirmation');
    const closeConfirmation = document.getElementById('closeConfirmation');
    const orderNumber = document.getElementById('orderNumber');
    const estimatedReadyTime = document.getElementById('estimatedReadyTime');
    const orderTotalAmount = document.getElementById('orderTotalAmount');
    const categoryButtons = document.querySelectorAll('[data-category]');
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    const languageToggle = document.getElementById('languageToggle');
    const viewToggle = document.getElementById('viewToggle');
    const searchInput = document.getElementById('searchInput');

    // Initialize the app
    function init() {
      renderMenuItems();
      renderPopularItems();
      setupEventListeners();
    }

    // Render menu items based on current category
    function renderMenuItems() {
      const filteredItems = activeCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === activeCategory);
      
      menuContainer.innerHTML = filteredItems.map(item => `
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="p-4">
            <div class="text-4xl mb-2 text-center">${item.image}</div>
            <div>
              <div class="flex items-start justify-between">
                <h3 class="font-medium text-gray-900 flex-1">${item.name}</h3>
                ${item.popular ? `
                  <span class="ml-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full flex items-center">
                    <i data-lucide="sparkles" class="w-3 h-3 mr-1"></i>
                    Popular
                  </span>
                ` : ''}
              </div>
              <div class="flex items-center mt-1 text-sm text-gray-600">
                <i data-lucide="star" class="w-3 h-3 text-yellow-400 fill-current"></i>
                <span class="ml-1">${item.rating}</span>
                <span class="mx-1">·</span>
                <span>${item.reviews} reviews</span>
              </div>
              <div class="flex items-center justify-between mt-2">
                <span class="font-bold text-lg">$${item.price.toFixed(2)}</span>
                <button class="text-gray-400 hover:text-red-500">
                  <i data-lucide="heart" class="w-4 h-4"></i>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                <i data-lucide="clock" class="w-3 h-3 inline mr-1"></i>
                ${item.time}
              </p>
            </div>
            
            <div class="flex items-center justify-center mt-3">
              ${getCartItemQuantity(item.id) > 0 ? `
                <div class="flex items-center bg-red-500 rounded-full">
                  <button data-id="${item.id}" class="decrease-item p-2 text-white hover:bg-red-600 rounded-l-full">
                    <i data-lucide="minus" class="w-4 h-4"></i>
                  </button>
                  <span class="px-3 text-white font-medium">${getCartItemQuantity(item.id)}</span>
                  <button data-id="${item.id}" class="increase-item p-2 text-white hover:bg-red-600 rounded-r-full">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                  </button>
                </div>
              ` : `
                <button data-id="${item.id}" class="add-item flex items-center px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                  <i data-lucide="plus" class="w-4 h-4 mr-1"></i>
                  Add
                </button>
              `}
            </div>
          </div>
        </div>
      `).join('');
      
      // Reinitialize icons for new elements
      lucide.createIcons();
    }

    // Render popular items for search tab
    function renderPopularItems() {
      const popularItems = menuItems.filter(item => item.popular);
      
      popularItemsContainer.innerHTML = popularItems.map(item => `
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="text-2xl mr-3">${item.image}</span>
            <div>
              <p class="font-medium">${item.name}</p>
              <p class="text-sm text-gray-600">$${item.price.toFixed(2)}</p>
            </div>
          </div>
          <button data-id="${item.id}" class="add-item p-2 bg-blue-600 text-white rounded-full">
            <i data-lucide="plus" class="w-4 h-4"></i>
          </button>
        </div>
      `).join('');
      
      lucide.createIcons();
    }

    // Get quantity of item in cart
    function getCartItemQuantity(itemId) {
      const item = cart.find(item => item.id === itemId);
      return item ? item.quantity : 0;
    }

    // Add item to cart
    function addToCart(itemId) {
      const menuItem = menuItems.find(item => item.id === itemId);
      if (!menuItem) return;
      
      const existingItem = cart.find(item => item.id === itemId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...menuItem,
          quantity: 1,
          customizations: {
            onion: true,
            cilantro: true,
            hotSauce: false
          }
        });
      }
      
      updateCart();
      renderMenuItems();
    }

    // Remove item from cart
    function removeFromCart(itemId) {
      const existingItem = cart.find(item => item.id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart = cart.filter(item => item.id !== itemId);
      }
      
      updateCart();
      renderMenuItems();
    }

    // Update cart UI
    function updateCart() {
      // Update cart badge
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      if (itemCount > 0) {
        cartBadge.textContent = itemCount;
        cartBadge.classList.remove('hidden');
      } else {
        cartBadge.classList.add('hidden');
      }
      
      // Update cart items list
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="bg-gray-50 rounded-lg p-3">
          <div class="flex items-center">
            <span class="text-2xl mr-3">${item.image}</span>
            <div class="flex-1">
              <h4 class="font-medium">${item.name}</h4>
              <p class="text-sm text-gray-600">$${item.price.toFixed(2)}</p>
              <div class="text-xs text-gray-500 mt-1">
                ${item.customizations.onion ? '<span class="mr-2">✓ Onion</span>' : ''}
                ${item.customizations.cilantro ? '<span class="mr-2">✓ Cilantro</span>' : ''}
                ${item.customizations.hotSauce ? '<span>✓ Hot Sauce</span>' : ''}
              </div>
            </div>
            <div class="flex items-center">
              <button data-id="${item.id}" class="decrease-item p-1 hover:bg-gray-200 rounded">
                <i data-lucide="minus" class="w-4 h-4"></i>
              </button>
              <span class="mx-3 font-medium">${item.quantity}</span>
              <button data-id="${item.id}" class="increase-item p-1 hover:bg-gray-200 rounded">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
      
      // Update totals
      const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const tax = subtotal * 0.0975;
      const total = subtotal + tax;
      
      cartItemCount.textContent = itemCount;
      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      cartTax.textContent = `$${tax.toFixed(2)}`;
      cartTotal.textContent = `$${total.toFixed(2)}`;
      
      // Reinitialize icons
      lucide.createIcons();
    }

    // Place order
    function placeOrder() {
      if (cart.length === 0) return;
      
      // Generate random order number
      const orderNum = Math.floor(10000 + Math.random() * 90000);
      orderNumber.textContent = orderNum;
      
      // Calculate estimated ready time (15-25 minutes from now)
      const now = new Date();
      const readyTime = new Date(now.getTime() + (15 + Math.floor(Math.random() * 10)) * 60000);
      const hours = readyTime.getHours();
      const minutes = readyTime.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      
      estimatedReadyTime.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
      
      // Set order total
      const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const tax = subtotal * 0.0975;
      const total = subtotal + tax;
      orderTotalAmount.textContent = `$${total.toFixed(2)}`;
      
      // Save order to history
      orders.unshift({
        id: `#${orderNum}`,
        date: 'Today',
        items: cart.reduce((total, item) => total + item.quantity, 0),
        total: total.toFixed(2),
        status: 'Preparing'
      });
      
      // Clear cart
      cart = [];
      updateCart();
      
      // Close cart and show confirmation
      cartOverlay.classList.add('hidden');
      orderConfirmation.classList.remove('hidden');
      
      // Update orders tab
      renderOrders();
    }

    // Render orders in orders tab
    function renderOrders() {
      const currentOrderContainer = document.getElementById('currentOrderContainer');
      const pastOrdersContainer = document.getElementById('pastOrdersContainer');
      
      // Current order (if any)
      if (orders.length > 0 && orders[0].status !== 'Completed') {
        currentOrderContainer.innerHTML = `
          <div class="bg-white rounded-lg p-4 mb-4">
            <h3 class="font-medium mb-3">Current Order</h3>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-600">${orders[0].id}</span>
              <span class="text-sm font-medium">ETA: 15-25 min</span>
            </div>
            
            <div class="relative">
              <div class="absolute top-3 left-0 right-0 h-1 bg-gray-200 rounded"></div>
              <div class="absolute top-3 left-0 h-1 bg-green-500 rounded w-1/4"></div>
              
              <div class="relative flex justify-between">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white">
                    <i data-lucide="check" class="w-4 h-4"></i>
                  </div>
                  <span class="text-xs mt-2">Preparing</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
                    <i data-lucide="check" class="w-4 h-4"></i>
                  </div>
                  <span class="text-xs mt-2">Cooking</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
                    <i data-lucide="check" class="w-4 h-4"></i>
                  </div>
                  <span class="text-xs mt-2">Ready</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
                    <i data-lucide="check" class="w-4 h-4"></i>
                  </div>
                  <span class="text-xs mt-2">On the way</span>
                </div>
              </div>
            </div>
            
            <button class="w-full mt-6 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">
              Track Order
            </button>
          </div>
        `;
      } else {
        currentOrderContainer.innerHTML = '';
      }
      
      // Past orders
      pastOrdersContainer.innerHTML = `
        <h3 class="font-medium text-gray-900">Past Orders</h3>
        ${orders.map(order => `
          <div class="bg-white rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium">${order.id}</p>
                <p class="text-sm text-gray-600">${order.date} · ${order.items} items</p>
                <p class="text-sm font-medium mt-1">$${order.total}</p>
              </div>
              <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                ${order.status}
              </span>
            </div>
            <button class="mt-3 text-blue-600 text-sm font-medium">
              Order Again
            </button>
          </div>
        `).join('')}
      `;
      
      lucide.createIcons();
    }

    // Set up event listeners
    function setupEventListeners() {
      // Cart button
      cartButton.addEventListener('click', () => {
        cartOverlay.classList.remove('hidden');
      });
      
      // Close cart
      closeCart.addEventListener('click', () => {
        cartOverlay.classList.add('hidden');
      });
      
      // Close order confirmation
      closeConfirmation.addEventListener('click', () => {
        orderConfirmation.classList.add('hidden');
      });
      
      // Checkout button
      checkoutButton.addEventListener('click', placeOrder);
      
      // Category buttons
      categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
          activeCategory = button.dataset.category;
          renderMenuItems();
          
          // Update active category button
          categoryButtons.forEach(btn => {
            if (btn.dataset.category === activeCategory) {
              btn.classList.add('bg-blue-600', 'text-white');
              btn.classList.remove('bg-white', 'text-gray-700', 'border');
            } else {
              btn.classList.remove('bg-blue-600', 'text-white');
              btn.classList.add('bg-white', 'text-gray-700', 'border');
            }
          });
        });
      });
      
      // Tab buttons
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tabId = button.dataset.tab;
          
          // Update active tab
          tabButtons.forEach(btn => {
            if (btn.dataset.tab === tabId) {
              btn.classList.add('nav-active');
              btn.classList.remove('text-gray-400');
            } else {
              btn.classList.remove('nav-active');
              btn.classList.add('text-gray-400');
            }
          });
          
          // Show corresponding content
          tabContents.forEach(content => {
            if (content.id === tabId) {
              content.classList.add('active');
            } else {
              content.classList.remove('active');
            }
          });
          
          // Special handling for orders tab
          if (tabId === 'orders') {
            renderOrders();
          }
        });
      });
      
      // Language toggle
      languageToggle.addEventListener('click', () => {
        language = language === 'en' ? 'es' : 'en';
        languageToggle.textContent = language === 'en' ? 'ES' : 'EN';
        // In a real app, you would update all text based on language
      });
      
      // View toggle
      viewToggle.addEventListener('click', () => {
        viewMode = viewMode === 'grid' ? 'list' : 'grid';
        viewToggle.innerHTML = viewMode === 'grid' 
          ? '<i data-lucide="list" class="w-4 h-4"></i>' 
          : '<i data-lucide="grid" class="w-4 h-4"></i>';
        lucide.createIcons();
        // In a real app, you would re-render the menu with the new view mode
      });
      
      // Search input
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // In a real app, you would filter menu items based on search term
      });
      
      // Delegate events for dynamic elements
      document.addEventListener('click', (e) => {
        // Add item buttons
        if (e.target.closest('.add-item')) {
          const itemId = parseInt(e.target.closest('.add-item').dataset.id);
          addToCart(itemId);
        }
        
        // Increase quantity buttons
        if (e.target.closest('.increase-item')) {
          const itemId = parseInt(e.target.closest('.increase-item').dataset.id);
          addToCart(itemId);
        }
        
        // Decrease quantity buttons
        if (e.target.closest('.decrease-item')) {
          const itemId = parseInt(e.target.closest('.decrease-item').dataset.id);
          removeFromCart(itemId);
        }
      });
    }

    // Initialize the app
    init();
  </script>
</body>
</html>
