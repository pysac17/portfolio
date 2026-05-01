import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

const SimpleBrain = ({ onClick, onHover, isHovered, ...props }) => {
    const brainRef = useRef();
    const lightRef = useRef();
    const { scene } = useGLTF('/brain.glb');
    const timeRef = useRef(0);

    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        timeRef.current = time;
        
        if (brainRef.current) {
            const baseScale = 1 + Math.sin(time * 2) * 0.1;
            const hoverScale = isHovered ? 1.1 : 1;
            const finalScale = baseScale * hoverScale;
            brainRef.current.scale.setScalar(finalScale);
            brainRef.current.rotation.y += 0.008;
            
            // Pulse the cyan light
            if (lightRef.current) {
                const pulseIntensity = 2 + Math.sin(time * 4) * 1.5;
                lightRef.current.intensity = isHovered ? pulseIntensity * 1.5 : pulseIntensity;
            }
        }
    });

    return (
        <group 
            {...props} 
            ref={brainRef}
            rotation={[0.6, 0.2, 0]}
            onClick={onClick}
            onPointerOver={onHover}
            onPointerOut={onHover}
        >
            <primitive object={scene} scale={[1.996, 1.996, 1.996]} />
            <pointLight
                ref={lightRef}
                position={[0, 0, 0]}
                intensity={15}
                color="#00FFFF"
                distance={20}
                decay={1.5}
            />
            <pointLight
                position={[0, 1, 0]}
                intensity={8}
                color="#00FFFF"
                distance={15}
                decay={2}
            />
            <pointLight
                position={[0, -1, 0]}
                intensity={8}
                color="#00FFFF"
                distance={15}
                decay={2}
            />
            <pointLight
                position={[2, 0, 2]}
                intensity={6}
                color="#00FFFF"
                distance={12}
            />
            <pointLight
                position={[-2, 0, -2]}
                intensity={6}
                color="#00FFFF"
                distance={12}
            />
            {isHovered && (
                <Html position={[0, 3, 0]} center>
                    <div className="bg-black/80 text-cyan-400 px-3 py-1 rounded-lg font-mono text-sm border border-cyan-400/50 shadow-lg shadow-cyan-400/25">
                        CORE_SKILLS: TECH_STACK {'>>>'}
                    </div>
                </Html>
            )}
        </group>
    )
}

export default SimpleBrain;
