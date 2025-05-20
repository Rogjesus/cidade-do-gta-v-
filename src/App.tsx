import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Settings, Share2, Download, Upload, Layers, PaintBucket, Wrench, Zap, Star } from 'lucide-react';
import { VehicleViewer } from './components/VehicleViewer';
import { CustomizationPanel } from './components/CustomizationPanel';
import { VehicleDatabase } from './components/VehicleDatabase';
import { ARView } from './components/ARView';
import { CommunityGallery } from './components/CommunityGallery';

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  year: number;
  type: 'sports' | 'muscle' | 'jdm' | 'suv' | 'electric' | 'classic' | 'hatchback';
  basePrice: number;
  image: string;
  modifications: {
    body: string[];
    paint: string[];
    wheels: string[];
    performance: string[];
    lighting: string[];
  };
  currentMods: {
    body?: string;
    paint?: string;
    wheels?: string;
    performance?: string;
    lighting?: string;
  };
}

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>({
    id: '1',
    name: 'Sanja GT',
    brand: 'Sanja Motors',
    year: 2024,
    type: 'sports',
    basePrice: 75000,
    image: '/sanja-gt.jpg',
    modifications: {
      body: [
        'Sanja Street Kit',
        'GT Wing',
        'Carbon Side Skirts',
        'Aggressive Front Bumper',
        'Diffuser Kit'
      ],
      paint: [
        'Sanja Racing Red',
        'Midnight Black',
        'Arctic White',
        'Neon Green',
        'Electric Blue'
      ],
      wheels: [
        'Sanja 19" Forged',
        'Track Edition 20"',
        'Street Spec 18"',
        'Drift Series 17"',
        'Carbon Fiber 19"'
      ],
      performance: [
        'Sanja Stage 2',
        'Titanium Exhaust',
        'Race Intake',
        'Coilover Kit',
        'Big Brake Kit'
      ],
      lighting: [
        'Sanja LED Kit',
        'Underglow System',
        'Sequential Taillights',
        'Interior RGB',
        'HID Projectors'
      ]
    },
    currentMods: {}
  });
  const [showDatabase, setShowDatabase] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'performance'>('visual');
  const [isNightMode, setIsNightMode] = useState(true);

  return (
    <div className={`min-h-screen ${isNightMode ? 'bg-gray-900' : 'bg-gray-100'} text-white transition-colors duration-500`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/80 p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Garage Underground 3D
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowDatabase(!showDatabase)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Car className="w-5 h-5" />
              <span>Garagem</span>
            </button>
            <button
              onClick={() => setShowGallery(!showGallery)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Star className="w-5 h-5" />
              <span>Galeria</span>
            </button>
            <button
              onClick={() => setShowAR(!showAR)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>AR View</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 h-screen flex">
        {/* Vehicle Viewer */}
        <div className="flex-1 relative">
          <VehicleViewer 
            vehicle={selectedVehicle}
            isNightMode={isNightMode}
          />
        </div>

        {/* Customization Panel */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <CustomizationPanel
            vehicle={selectedVehicle}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showDatabase && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <VehicleDatabase
              onSelect={setSelectedVehicle}
              onClose={() => setShowDatabase(false)}
            />
          </motion.div>
        )}

        {showGallery && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <CommunityGallery
              onClose={() => setShowGallery(false)}
            />
          </motion.div>
        )}

        {showAR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <ARView
              vehicle={selectedVehicle}
              onClose={() => setShowAR(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;