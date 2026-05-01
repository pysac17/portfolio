import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SimpleOffice from '../models/SimpleOffice';
import SimpleSolarProbe from '../models/SimpleSolarProbe';
import SimpleBrain from '../models/SimpleBrain';
import SimpleDome from '../models/SimpleDome';
import * as THREE from 'three';


// Responsive hook
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet };
};

// Stars Background Component
const Stars = () => {
  const pointsRef = useRef();
  
  useEffect(() => {
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
    });
    
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starsVertices.push(x, y, z);
    }
    
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    
    if (pointsRef.current) {
      pointsRef.current.add(points);
    }
  }, []);
  
  return <points ref={pointsRef} />;
};






// Main Scene Component
const Scene = ({ onModelClick, onModelHover, isTyping }) => {
  const { camera, scene } = useThree();
  const [hoveredModel, setHoveredModel] = useState(null);

  // Set up raycaster for interactive hover detection
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  // Mobile touch detection for single tap
  const handlePointerDown = (event) => {
    // For mobile: single tap should trigger hover and click
    if (event.touches && event.touches.length === 1) {
      const touch = event.touches[0];
      const model = event.object;
      if (model) {
        setHoveredModel(model);
        onModelHover(model);
        // Trigger click after short delay for mobile UX
        setTimeout(() => {
          onModelClick(model.userData?.type || 'unknown');
        }, 100);
      }
    }
  };

  // Set up galaxy fog
  useEffect(() => {
    scene.fog = new THREE.Fog(0x000033, 5, 30);
  }, [scene]);

  return (
    <>
      {/* Galaxy Background */}
      <Stars />
      
      {/* Enhanced Lighting */}
      <hemisphereLight 
        skyColor={0x4040ff} 
        groundColor={0x202020} 
        intensity={0.6} 
      />
      <spotLight 
        position={[0, 10, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        castShadow
        color="#FFDAB9"
        target-position={[0, 0, 0]}
      />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 0]} intensity={1.0} color="#22D3EE" />
      <pointLight position={[2, 3, 2]} intensity={0.8} color="#FFFFFF" />
      
      {/* 3D Models with proper positioning and scaling */}
      {/* Office Building - Central command above brain */}
      <SimpleOffice 
        onClick={() => onModelClick('office')} 
        onHover={(model) => {
          setHoveredModel(model);
          onModelHover(model);
        }}
        position={[0, -6, 0]}
        rotation={[0, -0.4, 0]}
      />
      {/* Glowing Brain - Neural core at bottom */}
      <SimpleBrain 
        onClick={() => onModelClick('brain')} 
        onHover={(model) => {
          setHoveredModel(model);
          onModelHover(model);
        }}
        position={[0, -10, 4]}
      />
      
      {/* Light Bridge Effect - Under-building glow pointing down */}
      <spotLight
        position={[0, -1.5, 0]}
        angle={0.6}
        penumbra={0.8}
        intensity={2}
        color="#00FFFF"
        distance={8}
        decay={1.5}
      >
        <object3D position={[0, -4, 0]} />
      </spotLight>
      <pointLight
        position={[0, -1.5, 0]}
        intensity={1.5}
        color="#00FFFF"
        distance={6}
        decay={2}
      />
      
      {/* Light Bridge Effect - Over-brain glow pointing up */}
      <spotLight
        position={[0, -4.5, 0]}
        angle={0.6}
        penumbra={0.8}
        intensity={2}
        color="#00FFFF"
        distance={8}
        decay={1.5}
      >
        <object3D position={[0, -2, 0]} />
      </spotLight>
      <pointLight
        position={[0, -4.5, 0]}
        intensity={1.5}
        color="#00FFFF"
        distance={6}
        decay={2}
      />
      
      {/* Solar Probe - AI curve movement */}
      <SimpleSolarProbe 
        onClick={() => onModelClick('robot')} 
        onHover={(model) => {
          setHoveredModel(model);
          onModelHover(model);
        }}
        position={[6, 0, 0]}
      />
      {/* Dome - Art gallery with enhanced Z-depth */}
      <SimpleDome 
        onClick={() => onModelClick('dome')} 
        onHover={(model) => {
          setHoveredModel(model);
          onModelHover(model);
        }}
        position={[8, 1, -8]}
      />
      
      {/* Dynamic dome lighting to prevent invisibility when in back */}
      <pointLight
        position={[0, 2, -12]}
        intensity={2}
        color="#FFD700"
        distance={15}
        decay={1.5}
      />
      <pointLight
        position={[0, 2, -8]}
        intensity={1.5}
        color="#FFFFFF"
        distance={10}
        decay={2}
      />
      
            
            
      <OrbitControls 
        autoRotate={false}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.5}
      />
    </>
  );
};

// Main Component
const HighTechNexus = () => {
  const navigate = useNavigate();
  const cameraRef = useRef();
  const { isMobile, isTablet } = useResponsive();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef();

  // Detect typing activity
  useEffect(() => {
    const handleTypingStart = () => {
      setIsTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };

    const handleTypingEnd = () => {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 2000); // Stop typing animation after 2 seconds of inactivity
    };

    // Listen for keyboard events
    const handleKeyDown = () => handleTypingStart();
    const handleKeyUp = () => handleTypingEnd();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleModelClick = (modelName) => {
    const routes = {
      office: '/about#experience',
      robot: '/projects',
      brain: '/about#skills',
      dome: '/art'
    };

    const targetRoute = routes[modelName];
    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  // Configure camera FOV based on device
  const cameraFOV = isMobile ? 90 : 75;
  const cameraPosition = isMobile ? [0, 0, 20] : [0, 0, 18];

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#020617]">
      <Navbar />

      <Canvas
        className="w-full h-full"
        camera={{ position: cameraPosition, fov: cameraFOV, far: 1000 }}
        ref={cameraRef}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <Suspense fallback={null}>
          <Scene 
            onModelClick={handleModelClick}
            onModelHover={() => {}} // Labels are handled internally now
            isTyping={isTyping}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HighTechNexus;
