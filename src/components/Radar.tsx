import React from 'react';
import { motion } from 'framer-motion';

interface RadarProps {
  playerPosition: { x: number; y: number };
  objects: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
  }>;
  size?: number;
}

export function Radar({ playerPosition, objects, size = 200 }: RadarProps) {
  const getObjectColor = (type: string) => {
    switch (type) {
      case 'police': return '#3B82F6';
      case 'mission': return '#10B981';
      case 'store': return '#F59E0B';
      case 'vehicle': return '#EF4444';
      case 'weapon': return '#6B7280';
      default: return '#FFFFFF';
    }
  };

  const getObjectIcon = (type: string) => {
    switch (type) {
      case 'police': return '👮';
      case 'mission': return '🎯';
      case 'store': return '🛍️';
      case 'vehicle': return '🚗';
      case 'weapon': return '🔫';
      default: return '•';
    }
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div 
        className="relative rounded-full overflow-hidden"
        style={{ 
          width: size,
          height: size,
          background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}
      >
        {/* Radar Background */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg')] bg-cover opacity-30" />
        
        {/* Radar Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%),
              linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)
            `,
            backgroundSize: '100% 100%, 20px 20px, 20px 20px'
          }}
        />

        {/* Radar Objects */}
        {objects.map(obj => {
          const relativeX = (obj.position.x - playerPosition.x) * 0.1;
          const relativeY = (obj.position.y - playerPosition.y) * 0.1;
          const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
          
          if (distance > size / 2) return null;

          return (
            <motion.div
              key={obj.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${relativeX}px, ${relativeY}px)`,
                color: getObjectColor(obj.type)
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              {getObjectIcon(obj.type)}
            </motion.div>
          );
        })}

        {/* Player Marker */}
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4"
          style={{
            background: 'linear-gradient(45deg, #F59E0B, #FCD34D)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />

        {/* Radar Border */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(255,255,255,0.2)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
          }}
        />

        {/* North Indicator */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">
          N
        </div>
      </div>
    </motion.div>
  );
} 