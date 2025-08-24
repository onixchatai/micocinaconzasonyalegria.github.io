
import React from 'react';
import { Clock, MapPin, Phone, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <span className="w-8 h-8 bg-mexican-orange rounded-full flex items-center justify-center text-sm font-bold">
                MC
              </span>
              <span>MI COCINA</span>
            </h3>
            <p className="text-yellow-200 font-medium mb-4">Con Zason y Alegría</p>
            <p className="text-gray-300 leading-relaxed">
              Authentic Mexican flavors prepared with passion and joy. 
              Experience traditional recipes passed down through generations.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact & Service</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-mexican-orange" />
                <div>
                  <span className="font-semibold text-mexican-orange">PICKUP ONLY</span>
                  <p className="text-sm">Call for pickup times</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-mexican-orange" />
                <span>www.micocinaconzasonyalegria.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-mexican-orange" />
                <span>Call for orders & pickup</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Specialties</h4>
            <div className="space-y-2 text-gray-300">
              <p>• Fresh Tacos ($2.50 - $3.00)</p>
              <p>• Authentic Burritos ($10.00 - $12.00)</p>
              <p>• Traditional Tortas ($10.00 - $12.00)</p>
              <p>• Delicious Platos ($12.00 - $15.00)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by Mi Cocina - Con Zason y Alegría</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 Mi Cocina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
