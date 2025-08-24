
"use client";

import { useState, useEffect } from "react";
import { CartItem } from "@/lib/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Set mounted flag after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load cart from localStorage after mount
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const saved = localStorage.getItem("mi-cocina-cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, [mounted]);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (!mounted) return;
    
    try {
      localStorage.setItem("mi-cocina-cart", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [items, mounted]);

  const addItem = (newItem: Omit<CartItem, "id">) => {
    console.log("🛒 Adding item:", newItem);
    
    const id = `${newItem.category}-${newItem.protein}-${Date.now()}`;
    const item: CartItem = { ...newItem, id };
    
    setItems(prev => {
      console.log("📦 Current items:", prev);
      
      // Check if same item already exists
      const existingIndex = prev.findIndex(
        i => i.category === item.category && i.protein === item.protein
      );
      
      if (existingIndex >= 0) {
        // Update quantity if item exists
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity
        };
        console.log("✅ Updated existing item, new cart:", updated);
        return updated;
      } else {
        // Add new item
        const newCart = [...prev, item];
        console.log("✅ Added new item, new cart:", newCart);
        return newCart;
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    console.log("🔢 Item count:", count, "Items:", items);
    return count;
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    getTax,
    getTotal,
    isLoaded: mounted
  };
}
