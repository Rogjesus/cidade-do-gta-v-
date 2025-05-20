import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GameMapProps {
  playerPosition: { x: number; y: number };
  onCollision: (type: string) => void;
}

interface GameObject {
  id: string;
  type: 'building' | 'mission' | 'store' | 'police' | 'vehicle' | 'weapon';
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation?: number;
  color?: string;
}

const gameObjects: GameObject[] = [
  {
    id: 'bank',
    type: 'building',
    position: { x: 300, y: 200 },
    size: { width: 120, height: 100 },
    color: '#4B5563'
  },
  {
    id: 'store',
    type: 'store',
    position: { x: 500, y: 300 },
    size: { width: 100, height: 80 },
    color: '#F59E0B'
  },
  {
    id: 'mission1',
    type: 'mission',
    position: { x: 200, y: 400 },
    size: { width: 80, height: 80 },
    color: '#10B981'
  },
  {
    id: 'police',
    type: 'police',
    position: { x: 400, y: 100 },
    size: { width: 100, height: 80 },
    color: '#3B82F6'
  },
  {
    id: 'car1',
    type: 'vehicle',
    position: { x: 600, y: 200 },
    size: { width: 60, height: 30 },
    rotation: 45,
    color: '#EF4444'
  },
  {
    id: 'weapon1',
    type: 'weapon',
    position: { x: 150, y: 150 },
    size: { width: 40, height: 40 },
    color: '#6B7280'
  }
];

export function GameMap({ playerPosition, onCollision }: GameMapProps) {
  const [collisionCooldown, setCollisionCooldown] = useState<Set<string>>(new Set());
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(prev => prev === 'day' ? 'night' : 'day');
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const checkCollision = (obj: GameObject) => {
    const playerSize = { width: 48, height: 48 };
    const objId = obj.id;
    
    if (collisionCooldown.has(objId)) {
      return false;
    }

    const collision = (
      playerPosition.x < obj.position.x + obj.size.width &&
      playerPosition.x + playerSize.width > obj.position.x &&
      playerPosition.y < obj.position.y + obj.size.height &&
      playerPosition.y + playerSize.height > obj.position.y
    );

    if (collision) {
      setCollisionCooldown(prev => new Set(prev).add(objId));
      setTimeout(() => {
        setCollisionCooldown(prev => {
          const newSet = new Set(prev);
          newSet.delete(objId);
          return newSet;
        });
      }, 1000);
    }

    return collision;
  };

  const getObjectIcon = (type: GameObject['type']) => {
    switch (type) {
      case 'building': return '🏦';
      case 'store': return '🛍️';
      case 'mission': return '🎯';
      case 'police': return '👮';
      case 'vehicle': return '🚗';
      case 'weapon': return '🔫';
      default: return '❓';
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden transition-colors duration-1000 ${
      timeOfDay === 'day' ? 'bg-gray-800' : 'bg-gray-900'
    }`}>
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-1000"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg')",
            transform: `translate(${playerPosition.x * 0.05}px, ${playerPosition.y * 0.05}px)`
          }}
        />
      </div>

      {/* Game Objects */}
      {gameObjects.map(obj => {
        const isColliding = checkCollision(obj);
        
        if (isColliding) {
          onCollision(obj.type);
        }

        return (
          <motion.div
            key={obj.id}
            className="absolute"
            style={{
              left: obj.position.x,
              top: obj.position.y,
              width: obj.size.width,
              height: obj.size.height,
              transform: `rotate(${obj.rotation || 0}deg)`,
              backgroundColor: obj.color
            }}
            animate={{
              scale: isColliding ? 1.1 : 1,
              boxShadow: isColliding ? '0 0 20px rgba(255, 255, 0, 0.5)' : 'none',
              y: isColliding ? [0, -5, 0] : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              {getObjectIcon(obj.type)}
            </div>
          </motion.div>
        );
      })}

      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${playerPosition.x * 0.1}px, ${playerPosition.y * 0.1}px)`
        }}
      />

      {/* Time of Day Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          timeOfDay === 'night' ? 'bg-blue-900 opacity-30' : 'opacity-0'
        }`}
      />
    </div>
  );
} 