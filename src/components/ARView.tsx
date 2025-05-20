import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, Download, Share2, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface ARViewProps {
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
  } | null;
  onClose: () => void;
}

export function ARView({ vehicle, onClose }: ARViewProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (isCameraActive) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          setIsCameraActive(false);
        });
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive]);

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate capture delay
    setTimeout(() => {
      setIsCapturing(false);
      // Here you would implement actual photo capture and saving
    }, 1000);
  };

  if (!vehicle) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="text-white text-xl">Selecione um veículo primeiro</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="relative w-full max-w-6xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {/* Camera View */}
        <div className="relative w-full h-full">
          {isCameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <button
                onClick={() => setIsCameraActive(true)}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                <Camera className="w-5 h-5" />
                <span>Ativar Câmera</span>
              </button>
            </div>
          )}

          {/* AR Vehicle Overlay */}
          {isCameraActive && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`
              }}
            >
              {/* Placeholder for 3D model */}
              <div className="w-64 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-80">
                <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
                  {vehicle.brand} {vehicle.name}
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/50 p-2 rounded-full">
            <button
              onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setRotation(prev => (prev + 90) % 360)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <RotateCw className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleCapture}
              className={`p-2 rounded-full transition-colors ${
                isCapturing ? 'bg-red-500' : 'hover:bg-white/10'
              }`}
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <span className="text-white font-bold">
                {vehicle.brand} {vehicle.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Download className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 