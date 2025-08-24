
"use client";

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { menuCategories } from '@/lib/menu-data';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

const categoryImages = {
  'Tacos': 'https://images.pexels.com/photos/9525081/pexels-photo-9525081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Burritos': 'https://www.seriouseats.com/thmb/lOdEqFZsV3LOzX5Pc2Y6XCJuvTs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__10__20201002-mission-style-burrito-jillian-atkinson-2-6841455590ed4c3981529b232166643a.jpg',
  'Burrito Desayuno': 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Tortas': 'https://delishglobe.com/wp-content/uploads/2024/10/Mexican-Torta.png',
  'Platos': 'https://cdn.theatlantic.com/thumbor/6q9c2S7xV8Jh0MBru5oqrO5c_8c=/1613x1080:5002x3622/1200x900/media/img/mt/2016/04/selects_08/original.jpg',
  'Quesadillas': 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Desayunos': 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Ensaladas': 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Bebidas': 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Extras': 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
};

export function MenuSection() {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (category: string, protein: string, price: number) => {
    addItem({
      category: category.toLowerCase(),
      protein,
      price,
      quantity: 1
    });

    toast({
      title: "Added to cart!",
      description: `${protein} ${category.slice(0, -1)} added to your order`,
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Authentic Menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fresh ingredients, traditional recipes, and flavors that bring joy to every bite
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {menuCategories.map((category, categoryIndex) => (
            <div key={category.name} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center space-x-4">
                <div className="relative aspect-[4/3] w-20 h-15 rounded-lg overflow-hidden">
                  <Image
                    src={categoryImages[category.name as keyof typeof categoryImages]}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-mexican-orange">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description || "Choose your favorite protein"}
                  </p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="grid gap-6 md:grid-cols-2">
                {category.items.map((item, itemIndex) => (
                  <Card key={`${item.id}-${itemIndex}`} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-orange-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </CardTitle>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.proteins.length} options
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {item.proteins.map((protein, proteinIndex) => (
                          <div 
                            key={`${protein.name}-${proteinIndex}`} 
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                          >
                            <div className="flex-1">
                              <span className="font-medium text-gray-900">
                                {protein.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-lg font-bold text-mexican-orange">
                                ${protein.price.toFixed(2)}
                              </span>
                              <Button
                                size="sm"
                                onClick={() => handleAddToCart(category.name, protein.name, protein.price)}
                                className="h-8 w-8 rounded-full p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
