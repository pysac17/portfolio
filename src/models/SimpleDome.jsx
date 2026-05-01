import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

const SimpleDome = ({ onClick, onHover, isHovered, ...props }) => {
    const domeRef = useRef();
    const { scene } = useGLTF('/dome.glb');

    // Remove black circle/base from dome model
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const meshName = (child.name || '').toLowerCase();
                // Remove or hide black base/circle meshes
                if (meshName.includes('base') || meshName.includes('circle') || meshName.includes('disc') || meshName.includes('ground')) {
                    child.visible = false;
                }
                // Ensure dome materials are properly set
                else if (child.material.color) {
                    child.material.transparent = true;
                    child.material.opacity = 0.9;
                    child.material.side = THREE.DoubleSide;
                }
            }
        });
    }, [scene]);

    useFrame(({ clock }) => {
        if (domeRef.current) {
            const time = clock.elapsedTime;
            
            // Simple wide circular orbit on flat plane around building center [0, 0, 0] - counter-clockwise
            const orbitRadius = 12;
            const orbitSpeed = -0.1; // Negative for counter-clockwise, much slower than probe
            const x = 0 + Math.cos(time * orbitSpeed) * orbitRadius;
            const z = 0 + Math.sin(time * orbitSpeed) * orbitRadius;
            const y = 2; // Fixed height on flat plane
            
            domeRef.current.position.set(x, y, z);
            domeRef.current.rotation.y += 0.006;
            
            if (isHovered) {
                domeRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
            } else {
                domeRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    return (
        <group 
            {...props} 
            ref={domeRef}
            position={[5, 2, -2]}
            onClick={onClick}
            onPointerOver={onHover}
            onPointerOut={onHover}
        >
            <primitive object={scene} scale={[1.5, 1.5, 1.5]} />
            {isHovered && (
                <Html position={[0, 3, 0]} center>
                    <div className="bg-black/80 text-cyan-400 px-3 py-1 rounded-lg font-mono text-sm border border-cyan-400/50 shadow-lg shadow-cyan-400/25">
                        HUMAN_INTERFACE: ART_STUDIO {'>>>'}
                    </div>
                </Html>
            )}
        </group>
    )
}

export default SimpleDome;
