
"use client";

import React from 'react';
import { ShoppingCart, Clock, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { getItemCount, isLoaded } = useCart();
  const { data: session, status } = useSession() || {};
  
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-mexican-orange rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">MC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MI COCINA</h1>
              <p className="text-xs text-mexican-orange font-medium">Con Zason y Alegría</p>
            </div>
          </div>

          {/* PICKUP ONLY Badge & Auth Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-mexican-orange" />
              <span className="text-sm font-semibold text-mexican-orange">PICKUP ONLY</span>
            </div>
            
            {/* Authentication Buttons */}
            {status === 'loading' ? (
              <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-md" />
            ) : session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 hidden md:inline">
                  Hi, {session.user?.name?.split(' ')[0]}!
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-mexican-orange"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="ml-1 hidden md:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-mexican-orange">
                    <User className="h-4 w-4" />
                    <span className="ml-1 hidden md:inline">Login</span>
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-mexican-orange hover:bg-mexican-orange-dark text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Auth & Cart */}
          <div className="flex items-center space-x-2">
            {/* Mobile Auth Buttons */}
            <div className="sm:hidden flex items-center space-x-1">
              {status !== 'loading' && !session && (
                <>
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-mexican-orange px-2">
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="bg-mexican-orange hover:bg-mexican-orange-dark text-white text-xs px-2">
                      Join
                    </Button>
                  </Link>
                </>
              )}
              {session && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-mexican-orange px-2"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Cart Button */}
            <Button 
              onClick={onCartClick}
              variant="outline" 
              className="relative border-mexican-orange text-mexican-orange hover:bg-orange-50"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Cart</span>
              {isLoaded && itemCount > 0 && (
                <Badge variant="default" className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
              {!isLoaded && (
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-gray-300 animate-pulse rounded-full"></div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
