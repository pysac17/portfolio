import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

const SimpleOffice = ({ onClick, onHover, isHovered, ...props }) => {
    const officeRef = useRef();
    const { scene } = useGLTF('/office.glb');

    useFrame(() => {
        if (officeRef.current) {
            // Building stays completely still - no rotation
            // Fixed scale - no lerping to prevent size changes over time
            if (isHovered) {
                officeRef.current.scale.set(1.1, 1.1, 1.1);
                // Add cyan emissive pulse on hover
                scene.traverse((child) => {
                    if (child.isMesh && child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(material => {
                                if (material.emissive) {
                                    material.emissive.setHex(0x00FFFF);
                                    material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
                                }
                            });
                        } else if (child.material.emissive) {
                            child.material.emissive.setHex(0x00FFFF);
                            child.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
                        }
                    }
                });
            } else {
                officeRef.current.scale.set(1, 1, 1);
                // Reset emissive on hover out
                scene.traverse((child) => {
                    if (child.isMesh && child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(material => {
                                if (material.emissive) {
                                    material.emissiveIntensity = 0;
                                }
                            });
                        } else if (child.material.emissive) {
                            child.material.emissiveIntensity = 0;
                        }
                    }
                });
            }
        }
    });

    return (
        <group 
            {...props} 
            ref={officeRef}
            onClick={onClick}
            onPointerOver={onHover}
            onPointerOut={onHover}
        >
            <primitive object={scene} scale={[0.08, 0.08, 0.08]} />
            {isHovered && (
                <Html position={[0, 2, 0]} center>
                    <div className="bg-black/80 text-cyan-400 px-3 py-1 rounded-lg font-mono text-sm border border-cyan-400/50 shadow-lg shadow-cyan-400/25">
                        SYSTEM_LOG: WORK_HISTORY {'>>>'}
                    </div>
                </Html>
            )}
        </group>
    )
}

export default SimpleOffice;
