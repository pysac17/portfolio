import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Robot = ({ currentAnimation, ...props }) => {
  const robotRef = useRef();
  const { scene, animations } = useGLTF('src/assets/public/robot.glb');
  const { actions } = useAnimations(animations, robotRef);

  useEffect(() => {
    console.log('Available animations:', animations.map(a => a.name));
    console.log('Current animation:', currentAnimation);
    console.log('Available actions:', Object.keys(actions || {}));
    
    if (actions && actions[currentAnimation]) {
      actions[currentAnimation].reset().fadeIn(0.5).play();
      return () => {
        actions[currentAnimation]?.fadeOut(0.5);
      };
    } else {
      // Try alternative animation names
      const alternativeNames = ['idle', 'walk', 'hit', 'Take 001', 'Animation'];
      for (const name of alternativeNames) {
        if (actions[name]) {
          console.log(`Using alternative animation: ${name}`);
          actions[name].reset().fadeIn(0.5).play();
          return () => {
            actions[name]?.fadeOut(0.5);
          };
        }
      }
    }
  }, [currentAnimation, actions, animations]);

  return (
    <mesh {...props} ref={robotRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Robot;
