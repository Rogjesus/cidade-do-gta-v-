import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface VehicleViewerProps {
  vehicle: {
    id: string;
    name: string;
    brand: string;
    year: number;
    type: string;
    currentMods?: {
      body?: string;
      paint?: string;
      wheels?: string;
      performance?: string;
      lighting?: string;
    };
    image: string;
  } | null;
  isNightMode: boolean;
}

export function VehicleViewer({ vehicle, isNightMode }: VehicleViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle auto-rotation
  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isRotating]);

  // Handle mouse drag for manual rotation
  useEffect(() => {
    if (!containerRef.current) return;

    let isDragging = false;
    let startX = 0;
    let startRotation = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startRotation = rotation;
      setIsRotating(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      setRotation(startRotation + deltaX * 0.5);
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    containerRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [rotation]);

  return (
    <div className="relative w-full h-full">
      {/* 3D View Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Garage Environment */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isNightMode 
            ? 'bg-gradient-to-b from-gray-900 to-black' 
            : 'bg-gradient-to-b from-gray-100 to-gray-300'
        }`}>
          {/* Neon Lights */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/30 blur-sm" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500/30 blur-sm" />
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30 blur-sm" />
            <div className="absolute top-0 right-0 w-1 h-full bg-green-500/30 blur-sm" />
          </div>

          {/* Grid Floor */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'bottom'
            }}
          />
        </div>

        {/* Vehicle Model */}
        {vehicle ? (
          <motion.div
            className="relative"
            style={{
              transform: `scale(${zoom}) rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d'
            }}
            animate={{
              y: [0, -5, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Vehicle Image */}
            <div className="w-96 h-48 rounded-lg shadow-2xl relative overflow-hidden">
              <img
                src={vehicle.image}
                alt={`${vehicle.brand} ${vehicle.name}`}
                className="w-full h-full object-cover"
              />
              {/* Vehicle Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center">
                <div className="text-white text-lg font-bold">
                  {vehicle.brand} {vehicle.name}
                </div>
                <div className="text-white/80 text-sm">
                  {vehicle.year}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-gray-400 text-xl">
            Selecione um veículo para começar
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/50 p-2 rounded-full">
        <button
          onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-2 rounded-full transition-colors ${
            isRotating ? 'bg-blue-500' : 'hover:bg-white/10'
          }`}
        >
          <RotateCw className="w-5 h-5" />
        </button>
        <button
          onClick={() => setRotation(0)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 