import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import InteractiveRoomMap from '../components/InteractiveRoomMap';

const CreativeDenHome = () => {
  useEffect(() => {
    // Scroll to top when component mounts (new tab opens)
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-screen relative bg-[#FAF9F6]">
      <Navbar />
      
      {/* Interactive Image Map - Replaces 3D Scene */}
      <InteractiveRoomMap />
    </div>
  );
};

export default CreativeDenHome;
