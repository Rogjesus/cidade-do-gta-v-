import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PlayerProps {
  position: { x: number; y: number };
  onMove: (newPosition: { x: number; y: number }) => void;
}

export function Player({ position, onMove }: PlayerProps) {
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [isRunning, setIsRunning] = useState(false);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed(prev => new Set(prev).add(e.key));
      
      if (e.key === 'Shift') {
        setIsRunning(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key);
        return newKeys;
      });

      if (e.key === 'Shift') {
        setIsRunning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const speed = isRunning ? 15 : 8;
      let newPosition = { ...position };
      let moved = false;

      if (keysPressed.has('ArrowUp') || keysPressed.has('w')) {
        newPosition.y -= speed;
        setDirection('up');
        moved = true;
      }
      if (keysPressed.has('ArrowDown') || keysPressed.has('s')) {
        newPosition.y += speed;
        setDirection('down');
        moved = true;
      }
      if (keysPressed.has('ArrowLeft') || keysPressed.has('a')) {
        newPosition.x -= speed;
        setDirection('left');
        moved = true;
      }
      if (keysPressed.has('ArrowRight') || keysPressed.has('d')) {
        newPosition.x += speed;
        setDirection('right');
        moved = true;
      }

      if (moved) {
        setIsMoving(true);
        onMove(newPosition);
      } else {
        setIsMoving(false);
      }
    }, 16); // 60 FPS

    return () => clearInterval(moveInterval);
  }, [position, onMove, keysPressed, isRunning]);

  return (
    <motion.div
      className="absolute w-12 h-12"
      style={{
        left: position.x,
        top: position.y,
        transform: `scaleX(${direction === 'left' ? -1 : 1})`,
      }}
      animate={{
        scale: isMoving ? [1, 1.1, 1] : 1,
        y: isMoving ? [0, -2, 0] : 0,
      }}
      transition={{
        duration: 0.5,
        repeat: isMoving ? Infinity : 0,
      }}
    >
      <div className="relative w-full h-full">
        {/* Character Body */}
        <div className="absolute inset-0 bg-blue-600 rounded-full" />
        
        {/* Character Details */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full" />
        </div>
        
        {/* Running Effect */}
        {isRunning && (
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          />
        )}
      </div>
    </motion.div>
  );
} 