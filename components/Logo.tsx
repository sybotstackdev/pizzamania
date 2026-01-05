'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  }

  // Confetti particles positions
  const confettiParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.1,
    color: ['#FBBF24', '#DC2626', '#F59E0B', '#22C55E'][Math.floor(Math.random() * 4)],
    shape: Math.random() > 0.5 ? 'circle' : 'square',
  }))

  // Rising ember particles for burning effect
  const emberParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    startX: [20, 50, 80, 25, 75, 45, 55, 35][i],
    startY: 85,
    endY: -10,
    delay: i * 0.15,
    size: Math.random() * 2.5 + 2,
    duration: Math.random() * 1.5 + 2,
    xVariation: (Math.random() - 0.5) * 15,
  }))

  return (
    <div className={`flex items-center gap-3 relative ${className}`}>
      <motion.div
        whileHover={{ 
          rotate: [0, -10, 10, -10, 0],
          scale: 1.05
        }}
        onHoverStart={() => setShowConfetti(true)}
        onHoverEnd={() => setShowConfetti(false)}
        transition={{ duration: 0.5 }}
        className={`${sizeClasses[size]} flex-shrink-0 relative overflow-visible`}
      >
        {/* Confetti Particles */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-visible -z-10">
            {confettiParticles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: '50%',
                  y: '50%',
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.5],
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  rotate: [0, 180, 360],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 1.5,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {particle.shape === 'circle' ? (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: particle.color }}
                  />
                ) : (
                  <div
                    className="w-2 h-2 rotate-45"
                    style={{ backgroundColor: particle.color }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 overflow-visible"
        >
          {/* Rising Ember Particles */}
          {emberParticles.map((ember) => (
            <motion.circle
              key={ember.id}
              cx={ember.startX}
              cy={ember.startY}
              r={ember.size}
              fill="#FF6B00"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0.5, 0],
                y: [0, ember.endY],
                x: [ember.startX, ember.startX + ember.xVariation],
                scale: [0.5, 1, 1.2, 0.8, 0.3],
              }}
              transition={{
                duration: ember.duration,
                delay: ember.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Animated Flames with rapid flickering */}
          {/* Left Flame */}
          <motion.path
            d="M 15 75 Q 20 65, 25 70 Q 22 75, 20 80 Q 18 78, 15 75 Z"
            fill="url(#flameGradient1)"
            animate={{
              d: [
                "M 15 75 Q 20 65, 25 70 Q 22 75, 20 80 Q 18 78, 15 75 Z",
                "M 15 75 Q 18 63, 23 68 Q 20 73, 18 78 Q 16 76, 15 75 Z",
                "M 15 75 Q 22 67, 27 72 Q 24 77, 22 82 Q 20 80, 15 75 Z",
                "M 15 75 Q 19 64, 24 69 Q 21 74, 19 79 Q 17 77, 15 75 Z",
                "M 15 75 Q 21 66, 26 71 Q 23 76, 21 81 Q 19 79, 15 75 Z",
                "M 15 75 Q 20 65, 25 70 Q 22 75, 20 80 Q 18 78, 15 75 Z",
              ],
              opacity: [0.7, 1, 0.9, 0.8, 0.95, 0.7],
              scale: [1, 1.15, 0.9, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M 20 80 Q 22 75, 25 70 Q 23 72, 22 78 Q 20 80, 20 80 Z"
            fill="url(#flameGradient2)"
            animate={{
              d: [
                "M 20 80 Q 22 75, 25 70 Q 23 72, 22 78 Q 20 80, 20 80 Z",
                "M 18 78 Q 20 73, 23 68 Q 21 70, 20 76 Q 18 78, 18 78 Z",
                "M 22 82 Q 24 77, 27 72 Q 25 74, 24 80 Q 22 82, 22 82 Z",
                "M 19 79 Q 21 74, 24 69 Q 22 71, 21 77 Q 19 79, 19 79 Z",
                "M 21 81 Q 23 76, 26 71 Q 24 73, 23 79 Q 21 81, 21 81 Z",
                "M 20 80 Q 22 75, 25 70 Q 23 72, 22 78 Q 20 80, 20 80 Z",
              ],
              opacity: [0.8, 1, 0.85, 0.9, 0.95, 0.8],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
          />

          {/* Right Flame */}
          <motion.path
            d="M 75 75 Q 80 65, 85 70 Q 82 75, 80 80 Q 78 78, 75 75 Z"
            fill="url(#flameGradient3)"
            animate={{
              d: [
                "M 75 75 Q 80 65, 85 70 Q 82 75, 80 80 Q 78 78, 75 75 Z",
                "M 75 75 Q 78 63, 83 68 Q 80 73, 78 78 Q 76 76, 75 75 Z",
                "M 75 75 Q 82 67, 87 72 Q 84 77, 82 82 Q 80 80, 75 75 Z",
                "M 75 75 Q 79 64, 84 69 Q 81 74, 79 79 Q 77 77, 75 75 Z",
                "M 75 75 Q 81 66, 86 71 Q 83 76, 81 81 Q 79 79, 75 75 Z",
                "M 75 75 Q 80 65, 85 70 Q 82 75, 80 80 Q 78 78, 75 75 Z",
              ],
              opacity: [0.7, 1, 0.9, 0.8, 0.95, 0.7],
              scale: [1, 1.15, 0.9, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.15,
            }}
          />
          <motion.path
            d="M 80 80 Q 82 75, 85 70 Q 83 72, 82 78 Q 80 80, 80 80 Z"
            fill="url(#flameGradient4)"
            animate={{
              d: [
                "M 80 80 Q 82 75, 85 70 Q 83 72, 82 78 Q 80 80, 80 80 Z",
                "M 78 78 Q 80 73, 83 68 Q 81 70, 80 76 Q 78 78, 78 78 Z",
                "M 82 82 Q 84 77, 87 72 Q 85 74, 84 80 Q 82 82, 82 82 Z",
                "M 79 79 Q 81 74, 84 69 Q 82 71, 81 77 Q 79 79, 79 79 Z",
                "M 81 81 Q 83 76, 86 71 Q 84 73, 83 79 Q 81 81, 81 81 Z",
                "M 80 80 Q 82 75, 85 70 Q 83 72, 82 78 Q 80 80, 80 80 Z",
              ],
              opacity: [0.8, 1, 0.85, 0.9, 0.95, 0.8],
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.25,
            }}
          />

          {/* Center Flame */}
          <motion.path
            d="M 45 85 Q 50 75, 55 85 Q 52 88, 50 90 Q 48 88, 45 85 Z"
            fill="url(#flameGradient5)"
            animate={{
              d: [
                "M 45 85 Q 50 75, 55 85 Q 52 88, 50 90 Q 48 88, 45 85 Z",
                "M 45 85 Q 48 73, 53 83 Q 50 86, 48 88 Q 46 86, 45 85 Z",
                "M 45 85 Q 52 77, 57 87 Q 54 90, 52 92 Q 50 90, 45 85 Z",
                "M 45 85 Q 49 74, 54 84 Q 51 87, 49 89 Q 47 87, 45 85 Z",
                "M 45 85 Q 51 76, 56 86 Q 53 89, 51 91 Q 49 89, 45 85 Z",
                "M 45 85 Q 50 75, 55 85 Q 52 88, 50 90 Q 48 88, 45 85 Z",
              ],
              opacity: [0.75, 1, 0.9, 0.85, 0.95, 0.75],
              scale: [1, 1.2, 0.85, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.05,
            }}
          />

          {/* Flame Gradients */}
          <defs>
            <linearGradient id="flameGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF4500" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="flameGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF8C00" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF4500" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="flameGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF4500" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="flameGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF8C00" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF4500" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="flameGradient5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF4500" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF6B00" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Pizza Base */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="#FBBF24"
            stroke="#F59E0B"
            strokeWidth="2"
          />
          
          {/* Pizza Slice Cut */}
          <path
            d="M 50 50 L 50 5 L 95 50 Z"
            fill="#FEF3C7"
            opacity="0.3"
          />
          
          {/* Toppings - Pepperoni */}
          <circle cx="35" cy="35" r="6" fill="#DC2626" />
          <circle cx="65" cy="40" r="5" fill="#DC2626" />
          <circle cx="40" cy="60" r="5.5" fill="#DC2626" />
          <circle cx="70" cy="65" r="6" fill="#DC2626" />
          
          {/* Toppings - Cheese/Herbs */}
          <circle cx="55" cy="30" r="3" fill="#FEF3C7" opacity="0.8" />
          <circle cx="30" cy="50" r="2.5" fill="#FEF3C7" opacity="0.8" />
          <circle cx="60" cy="55" r="3" fill="#FEF3C7" opacity="0.8" />
          
          {/* Highlight */}
          <ellipse
            cx="45"
            cy="40"
            rx="8"
            ry="12"
            fill="#FEF3C7"
            opacity="0.4"
          />

          {/* Confetti inside SVG (static decorative) */}
          <motion.circle
            cx="20"
            cy="20"
            r="2"
            fill="#DC2626"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.circle
            cx="80"
            cy="25"
            r="1.5"
            fill="#22C55E"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
          <motion.circle
            cx="25"
            cy="75"
            r="1.5"
            fill="#F59E0B"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          />
          <motion.circle
            cx="75"
            cy="80"
            r="2"
            fill="#DC2626"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.9,
            }}
          />
        </svg>
      </motion.div>
      
      {showText && (
        <span className={`font-bold text-neutral-900 tracking-tight ${textSizes[size]}`}>
          Pizza<span className="text-primary-600">Vibe</span>
        </span>
      )}
    </div>
  )
}

