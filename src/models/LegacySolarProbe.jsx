import React, {useRef, useEffect} from 'react'
// Using solarProbe.glb as replacement since flying_machine.glb doesn't exist
import solarProbeScene from '../assets/public/solarProbe.glb'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Bird = () => {
    const birdRef = useRef();
    const particleTrailRef = useRef([]);
    const { scene, animations } = useGLTF(solarProbeScene);
    const { actions } = useAnimations(animations, birdRef);

    // Gradient Descent path parameters
    const gradientPath = useRef({
        x: -3.5,
        y: 1.5,
        z: 2,
        targetX: 3.5,
        targetZ: -2,
        learningRate: 0.01,
        momentum: 0.9
    });

    useEffect(() => {
        actions['Flapping wings'].play();
    }, []);

    // Gradient Descent path calculation
    const calculateGradientDescentPosition = (time) => {
        const path = gradientPath.current;
        
        // Create a gradient descent-like curve
        const progress = (Math.sin(time * 0.5) + 1) / 2; // 0 to 1
        
        // Calculate position using gradient descent formula
        const errorX = path.targetX - path.x;
        const errorZ = path.targetZ - path.z;
        
        path.x += errorX * path.learningRate;
        path.z += errorZ * path.learningRate;
        
        // Add oscillation for natural movement
        const y = 1.5 + Math.sin(time * 2) * 0.3;
        
        // Reverse direction when reaching target
        if (Math.abs(errorX) < 0.5 && Math.abs(errorZ) < 0.5) {
            path.targetX = path.targetX > 0 ? -3.5 : 3.5;
            path.targetZ = path.targetZ > 0 ? -2 : 2;
        }
        
        return { x: path.x, y, z: path.z };
    };

    // Create particle trail
    const createParticle = (position) => {
        const geometry = new THREE.SphereGeometry(0.02, 4, 4);
        const material = new THREE.MeshBasicMaterial({
            color: '#00ffff',
            transparent: true,
            opacity: 0.6
        });
        
        return new THREE.Mesh(geometry, material);
    };

    useFrame(({ clock, camera }) => {
        const time = clock.elapsedTime;
        const newPosition = calculateGradientDescentPosition(time);
        
        // Update bird position
        birdRef.current.position.set(newPosition.x, newPosition.y, newPosition.z);
        
        // Rotate bird to face direction
        const direction = new THREE.Vector3(
            gradientPath.current.targetX - newPosition.x,
            0,
            gradientPath.current.targetZ - newPosition.z
        ).normalize();
        
        birdRef.current.lookAt(
            newPosition.x + direction.x,
            newPosition.y,
            newPosition.z + direction.z
        );
        
        // Add particle trail
        if (Math.floor(time * 10) % 2 === 0) { // Create particles every 0.2 seconds
            const particle = createParticle(newPosition);
            particle.userData = {
                createdAt: time,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.01,
                    -Math.random() * 0.01,
                    (Math.random() - 0.5) * 0.01
                )
            };
            particleTrailRef.current.push(particle);
        }
        
        // Update and remove old particles
        particleTrailRef.current = particleTrailRef.current.filter(particle => {
            const age = time - particle.userData.createdAt;
            
            if (age > 2) { // Remove particles after 2 seconds
                particle.geometry.dispose();
                particle.material.dispose();
                return false;
            }
            
            // Update particle position and opacity
            particle.position.add(particle.userData.velocity);
            particle.material.opacity = 0.6 * (1 - age / 2);
            
            return true;
        });
    });

    return (
    <group>
        <mesh scale={[0.06,0.06,0.06]} ref={birdRef}>
            <primitive object={scene} />
        </mesh>
        {particleTrailRef.current.map((particle, index) => (
            <primitive key={index} object={particle} />
        ))}
    </group>
    )
}

export default Bird