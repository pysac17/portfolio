import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const SimpleSolarProbe = ({ onClick, onHover, isHovered, ...props }) => {
    const probeRef = useRef();
    const timeRef = useRef(0);
    const { scene } = useGLTF('/robot.glb');

    
    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        timeRef.current = time;
        
        if (probeRef.current) {
            // AI curve movement - always active
            const orbitRadius = 5;
            const x = Math.cos(time * 0.3) * orbitRadius;
            const z = Math.sin(time * 0.3) * (orbitRadius * 0.6);
            const y = Math.sin(time * 0.5) * 0.5 + 2;
            
            probeRef.current.position.set(x, y, z);
            probeRef.current.rotation.y = time * 0.5;
            
            // Hover effect
            if (isHovered) {
                probeRef.current.scale.lerp(new THREE.Vector3(0.33, 0.33, 0.33), 0.1);
            } else {
                probeRef.current.scale.lerp(new THREE.Vector3(0.3, 0.3, 0.3), 0.1);
            }
        }
    });

    return (
        <group 
            {...props} 
            ref={probeRef}
            onClick={onClick}
            onPointerOver={onHover}
            onPointerOut={onHover}
        >
            <primitive object={scene} scale={[2, 2, 2]} />
            {isHovered && (
                <Html position={[0, 2, 0]} center>
                    <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-lg font-sans text-sm border border-gray-200 shadow-lg">
                        [CONTACT_ASSISTANT]
                    </div>
                </Html>
            )}
        </group>
    )
}

export default SimpleSolarProbe;
