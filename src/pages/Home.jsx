import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Island from '../models/Island';
import Loader from "../components/Loader";
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';
import Homeinfo from '../components/Homeinfo';
import arrowLeftIcon from '../assets/icons/arrowLeftIcon.png';
import arrowRightIcon from '../assets/icons/arrowRightIcon.png'; 


const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true); 

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -9.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -9.5, -43.4];
    }
    return [screenScale, screenPosition];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 1500);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      clearTimeout(timer); 
    };
  }, []);

  const handleClickAnywhere = () => {
    setShowInstructions(false);
  };

  return (
    <section className="w-full h-screen relative">
      {showInstructions && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-75 z-50 text-white">
          <div className="text-center">
            <p className="text-lg mb-4">Explore the island!</p>
            <div className="flex items-center justify-center space-x-4">
              <img
                src={arrowLeftIcon}
                alt="Left Arrow"
                className="cursor-pointer transform hover:scale-110 motion-reduce:transform-none"
                style={{ width: '48px', height: '48px' }}
                onClick={() => {
                  if (!isRotating) setIsRotating(true);
                }}
              />
              <img
                src={arrowRightIcon}
                alt="Right Arrow"
                className="cursor-pointer transform hover:scale-110 motion-reduce:transform-none"
                style={{ width: '48px', height: '48px' }}
                onClick={() => {
                  if (!isRotating) setIsRotating(true);
                }}
              />
            </div>
            <p className="text-sm mt-2">Use Arrow Keys or Swipe</p>
          </div>
        </div>
      )}

      <div className='absolute top-20 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <Homeinfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
        onClick={handleClickAnywhere}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight skyColor="#ble1ff" groundColor="#000000" intensity={1} />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={planePosition}
            rotation={[0, 20.1, 0]}
            scale={planeScale}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;