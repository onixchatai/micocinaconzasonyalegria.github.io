
"use client";

import React, { useState } from 'react';
import { X, User, Mail, Phone, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderForm({ isOpen, onClose }: OrderFormProps) {
  const { items, getSubtotal, getTax, getTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialInstructions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer: formData,
        items: items,
        subtotal: getSubtotal(),
        tax: getTax(),
        total: getTotal()
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      
      setOrderNumber(result.orderNumber);
      
      // Send WhatsApp confirmation
      try {
        await fetch('/api/whatsapp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: formData.phone,
            orderNumber: result.orderNumber,
            customerName: formData.name,
            items: items,
            total: getTotal()
          }),
        });
        
        toast({
          title: "Order submitted!",
          description: `Your order #${result.orderNumber} has been received. WhatsApp confirmation sent!`,
        });
      } catch (whatsappError) {
        console.warn('WhatsApp notification failed:', whatsappError);
        toast({
          title: "Order submitted!",
          description: `Your order #${result.orderNumber} has been received`,
        });
      }
      
      setShowConfirmation(true);
      clearCart();
      
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: "Order failed",
        description: "There was an error submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialInstructions: ''
    });
    setOrderNumber('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          
          {showConfirmation ? (
            // Confirmation Screen
            <div className="p-6 text-center">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-lg text-gray-600">
                  Your order #{orderNumber} has been received
                </p>
              </div>

              <Card className="mb-6 bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center space-x-2 text-mexican-orange">
                    <Clock className="h-5 w-5" />
                    <div className="text-center">
                      <p className="font-semibold">PICKUP ONLY</p>
                      <p className="text-sm">We'll contact you when your order is ready</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900">Order Summary:</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.protein} {item.category.charAt(0).toUpperCase() + item.category.slice(1, -1)}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-semibold flex justify-between">
                  <span>Total:</span>
                  <span className="text-mexican-orange">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleClose} size="lg" className="w-full">
                Close
              </Button>
            </div>
          ) : (
            // Order Form
            <>
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Complete Your Order</h2>
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* PICKUP ONLY Notice */}
              <div className="p-4 bg-orange-50 border-b">
                <div className="flex items-center space-x-2 text-mexican-orange">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold text-sm">PICKUP ONLY - We'll call you when ready</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Customer Information</span>
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Enter your full name"
                      />
                      <User className="absolute left-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" style={{ position: 'absolute', marginTop: '-32px', marginLeft: '8px' }} />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="(555) 123-4567"
                      />
                      <Phone className="absolute left-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" style={{ position: 'absolute', marginTop: '-32px', marginLeft: '8px' }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="your.email@example.com"
                    />
                    <Mail className="absolute left-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" style={{ position: 'absolute', marginTop: '-32px', marginLeft: '8px' }} />
                  </div>

                  <div>
                    <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Instructions (Optional)
                    </label>
                    <Textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      placeholder="Any special requests or dietary restrictions..."
                      className="pl-10"
                      rows={3}
                    />
                    <MessageSquare className="absolute left-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" style={{ position: 'absolute', marginTop: '-32px', marginLeft: '8px' }} />
                  </div>
                </div>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.protein} {item.category.charAt(0).toUpperCase() + item.category.slice(1, -1)}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${getSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (8%):</span>
                        <span>${getTax().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span className="text-mexican-orange">${getTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Order...' : 'Submit Order for Pickup'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
