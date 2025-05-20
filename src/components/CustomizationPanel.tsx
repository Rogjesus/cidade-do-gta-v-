import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaintBucket, Wrench, Layers, Zap, Settings, Star, Download, Share2 } from 'lucide-react';

interface CustomizationPanelProps {
  vehicle: {
    id: string;
    name: string;
    brand: string;
    year: number;
    type: string;
    modifications?: {
      body: string[];
      paint: string[];
      wheels: string[];
      performance: string[];
      lighting: string[];
    };
    currentMods?: {
      body?: string;
      paint?: string;
      wheels?: string;
      performance?: string;
      lighting?: string;
    };
  } | null;
  activeTab: 'visual' | 'performance';
  onTabChange: (tab: 'visual' | 'performance') => void;
}

export function CustomizationPanel({ vehicle, activeTab, onTabChange }: CustomizationPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<'body' | 'paint' | 'wheels' | 'performance' | 'lighting'>('body');

  if (!vehicle) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Selecione um veículo para personalizar
      </div>
    );
  }

  const categories = [
    { id: 'body', icon: <Layers className="w-5 h-5" />, label: 'Body Kit' },
    { id: 'paint', icon: <PaintBucket className="w-5 h-5" />, label: 'Pintura' },
    { id: 'wheels', icon: <Settings className="w-5 h-5" />, label: 'Rodas' },
    { id: 'performance', icon: <Wrench className="w-5 h-5" />, label: 'Performance' },
    { id: 'lighting', icon: <Zap className="w-5 h-5" />, label: 'Iluminação' }
  ];

  const getModifications = () => {
    if (!vehicle.modifications) return [];
    return vehicle.modifications[selectedCategory] || [];
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold mb-2">{vehicle.brand} {vehicle.name}</h2>
        <p className="text-gray-400 text-sm">{vehicle.year}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => onTabChange('visual')}
          className={`flex-1 py-3 text-center ${
            activeTab === 'visual'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Visual
        </button>
        <button
          onClick={() => onTabChange('performance')}
          className={`flex-1 py-3 text-center ${
            activeTab === 'performance'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Performance
        </button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto p-4 space-x-2 border-b border-gray-700">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.icon}
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Modifications List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {getModifications().map((mod, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="aspect-video bg-gray-700 rounded mb-2" />
              <h3 className="font-bold mb-1">{mod}</h3>
              <p className="text-sm text-gray-400">R$ 5.000</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-700 flex justify-between">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <Star className="w-5 h-5" />
          <span>Salvar Preset</span>
        </button>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 