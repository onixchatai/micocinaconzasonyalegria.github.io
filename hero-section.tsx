
"use client";

import React from 'react';
import Image from 'next/image';
import { Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onOrderNowClick: () => void;
}

export function HeroSection({ onOrderNowClick }: HeroSectionProps) {
  return (
    <section className="relative parallax-container">
      {/* Hero Image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/67fd78980bbdd53cb5ff3306/17cb6b2d-1e05-4f3b-a4a9-55bf029ff19e/heroimage5_elagaveazul.jpg"
          alt="Mi Cocina Mexican Restaurant"
          fill
          className="object-cover parallax-element"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            MI COCINA
          </h1>
          <p className="text-xl md:text-3xl font-light mb-2 text-yellow-200">
            Con Zason y Alegría
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Authentic Mexican flavors prepared with passion and joy
          </p>
          
          <Button 
            size="lg" 
            className="mexican-gradient text-white hover:scale-105 transition-all duration-300 shadow-lg px-8 py-3 text-lg font-semibold"
            onClick={onOrderNowClick}
          >
            Order Now - Pickup Only
          </Button>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm">
            <div className="flex items-center space-x-2 text-mexican-orange">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">PICKUP ONLY</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>www.micocinaconzasonyalegria.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>Call for pickup times</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
