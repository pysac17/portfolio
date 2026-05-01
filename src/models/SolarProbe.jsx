import React, { useRef, useEffect, useMemo } from 'react';
import solarProbeScene from '../assets/public/solarProbe.glb';
import { useAnimations, useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SolarProbe = () => {
    const probeRef = useRef();
    const curveRef = useRef();
    const trailPointsRef = useRef([]);
    const trailGeometryRef = useRef();
    const timeRef = useRef(0);
    const { scene, animations } = useGLTF(solarProbeScene);
    const { actions } = useAnimations(animations, probeRef);

    // Debug: Log when model loads
    console.log('Solar Probe model loaded:', scene);
    console.log('Available animations:', animations);

    // Fallback movement for safety
    const fallbackMovement = (time) => {
        return {
            x: Math.sin(time * 0.5) * 6,
            y: 2 + Math.sin(time * 2) * 0.5,
            z: Math.cos(time * 0.5) * 6
        };
    };

    // Orbital parameters around the building - outskirts with wave motion
    const orbitRadius = 35; // Much larger orbit radius for outskirts
    const orbitSpeed = 10.0; // Doubled for more dynamic scene (2.0x faster)
    const waveAmplitude = 3; // Sine wave amplitude for Y movement
    const waveFrequency = 15; // Maximum wave frequency

    // Create particle system for data trail
    const particleSystem = useMemo(() => {
        const particleCount = 20; // Reduced from 50 to save memory
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        // Initialize particle attributes
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;
            
            colors[i * 3] = 0;     // R
            colors[i * 3 + 1] = 0.95; // G  
            colors[i * 3 + 2] = 1; // B (#00F2FE - bright cyan)
            
            sizes[i] = 0.05;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        return new THREE.Points(geometry, material);
    }, []);

    // Apply high-tech materials based on mesh names
    const applyHighTechMaterials = (object) => {
        console.log('Applying high-tech materials to model with', object.children.length, 'children');
        object.traverse((child) => {
            if (child.isMesh) {
                console.log('Found mesh:', child.name || 'unnamed');
                const meshName = (child.name || '').toLowerCase();
                
                // Solar panels - cyan emissive glow
                if (meshName.includes('panel') || meshName.includes('solar') || meshName.includes('wing')) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0x00D2FF, // Cyan
                        emissive: 0x00D2FF, // Cyan emissive
                        emissiveIntensity: 2.0, // Strong glow
                        metalness: 0.8,
                        roughness: 0.1,
                        transparent: false,
                        opacity: 1.0
                    });
                }
                // Sensors and wiring - gold
                else if (meshName.includes('sensor') || meshName.includes('wire') || meshName.includes('cable') || 
                         meshName.includes('instrument') || meshName.includes('detector') || meshName.includes('antenna')) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xFFB800, // Gold
                        emissive: 0xFFB800, // Gold emissive
                        emissiveIntensity: 0.3,
                        metalness: 0.9,
                        roughness: 0.2,
                        transparent: false,
                        opacity: 1.0
                    });
                }
                // Main body - dark metallic navy
                else {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0x1A2B3C, // Dark metallic navy
                        emissive: 0x0A1520, // Very subtle navy emissive
                        emissiveIntensity: 0.1,
                        metalness: 0.9,
                        roughness: 0.2,
                        transparent: false,
                        opacity: 1.0
                    });
                }
            }
        });
    };

    useEffect(() => {
        // Apply high-tech materials to the loaded scene
        applyHighTechMaterials(scene);
        
        // Play any available animations
        if (actions && Object.keys(actions).length > 0) {
            const firstAnimation = Object.keys(actions)[0];
            actions[firstAnimation].play();
        }
        
        trailGeometryRef.current = particleSystem.geometry;
    }, [scene, actions, particleSystem.geometry]);

    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        timeRef.current = time;

        try {
            // 1. COMPLEX AI CURVE (Lissajous-inspired orbit)
            // Using different frequencies for X and Z creates an evolving path that isn't a simple circle
            const orbitRadiusX = 65; // Wide horizontal clearance
            const orbitRadiusZ = 45; // Deep clearance
            const orbitSpeed = 2.5;  // Multiplied speed for high-energy motion
            const waveAmplitude = 8; // Higher vertical peaks
            const waveFrequency = 1.2; // Smoother, more 'intelligent' curve

            const x = Math.cos(time) * orbitRadiusX;
            const z = Math.sin(time * 0.8) * orbitRadiusZ; 
        
            // The 'Fancy AI Wave' - stacking sine waves for unpredictable height
            const y = Math.sin(time * waveFrequency) * waveAmplitude + 
                      Math.sin(time * waveFrequency * 2.5) * (waveAmplitude * 0.3);

            // Update probe position
            probeRef.current.position.set(x, y, z);

            // 2. DYNAMIC LOOK-AT (Tangential Orientation)
            // Instead of just looking at the center, we calculate the 'Forward' vector
            const nextTime = time + 0.1;
            const nextX = Math.cos(nextTime) * orbitRadiusX;
            const nextZ = Math.sin(nextTime * 0.8) * orbitRadiusZ;
            const nextY = Math.sin(nextTime * waveFrequency) * waveAmplitude;
            
            // Point the probe toward where it is GOING (Surfing the data stream)
            probeRef.current.lookAt(nextX, nextY, nextZ);

            // 3. PARTICLE TRAIL FIX
            const positions = trailGeometryRef.current.attributes.position.array;
            
            // Shift existing particles
            for (let i = (positions.length / 3) - 1; i > 0; i--) {
                positions[i * 3] = positions[(i - 1) * 3];
                positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
                positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
            }
            
            // Anchor start of trail to probe position
            positions[0] = x;
            positions[1] = y;
            positions[2] = z;

            trailGeometryRef.current.attributes.position.needsUpdate = true;

        } catch (error) {
            console.warn('Solar probe animation error, using fallback:', error.message);
            
            // Fallback movement for safety
            const fallback = fallbackMovement(timeRef.current);
            probeRef.current.position.set(fallback.x, fallback.y, fallback.z);
        }
    });

    return (
        <group>
            <mesh 
                ref={probeRef} 
                scale={[0.15, 0.15, 0.15]} // Much smaller scale
                position={[0, 2, 0]} // Better centered position
            >
                <primitive object={scene} />
            </mesh>
            <primitive object={particleSystem} />
            <Html position={[0, 1, 0]} center>
                <div className="bg-black/80 text-cyan-400 px-3 py-1 rounded-lg font-mono text-sm border border-cyan-400/50 shadow-lg shadow-cyan-400/25">
                    BROWSE_PROJECTS {'>>>'}
                </div>
            </Html>
        </group>
    );
};

export default SolarProbe;
