import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InteractiveRoomMap = () => {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [tappedZone, setTappedZone] = useState(null);
  const navigate = useNavigate();

  const handleZoneClick = (zone) => {
    if (zone === 'art') {
      navigate('/art');
    } else if (zone === 'tech') {
      navigate('/about#skills');
    } else if (zone === 'about') {
      navigate('/about');
    }
  };

  const handleZoneTouch = (zone) => {
    if (tappedZone === zone) {
      // Second tap - navigate
      handleZoneClick(zone);
      setTappedZone(null);
    } else {
      // First tap - show label
      setTappedZone(zone);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Filters */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/room.png)',
          filter: 'contrast(1.08) brightness(1.03)',
        }}
      />
      
      {/* ART Zone - Easel & Cart (Left side) */}
      <div
        className="absolute cursor-pointer transition-all duration-200 ease-in-out"
        style={{
          top: '15%',
          left: '8%',
          width: '30%',
          height: '65%',
        }}
        onMouseEnter={() => setHoveredZone('art')}
        onMouseLeave={() => setHoveredZone(null)}
        onClick={() => handleZoneClick('art')}
        onTouchStart={() => handleZoneTouch('art')}
      >
        {/* Hover Label for ART Zone */}
        {(hoveredZone === 'art' || tappedZone === 'art') && (
          <div className="absolute bottom-4 left-4 bg-gray-800/90 text-white px-4 py-2 rounded-lg font-sans text-sm border border-gray-600 shadow-lg transition-opacity duration-200 ease-in-out">
            [ CREATIVE_STUDIO // VIEW ART ]
          </div>
        )}
      </div>

      {/* TECH Zone - Monitor & Keyboard (Center-Right) */}
      <div
        className="absolute cursor-pointer transition-all duration-200 ease-in-out"
        style={{
          top: '25%',
          left: '45%',
          width: '35%',
          height: '45%',
        }}
        onMouseEnter={() => setHoveredZone('tech')}
        onMouseLeave={() => setHoveredZone(null)}
        onClick={() => handleZoneClick('tech')}
        onTouchStart={() => handleZoneTouch('tech')}
      >
                
        {/* Hover Label for TECH Zone */}
        {(hoveredZone === 'tech' || tappedZone === 'tech') && (
          <div className="absolute top-4 left-4 bg-gray-800/90 text-white px-4 py-2 rounded-lg font-sans text-sm border border-gray-600 shadow-lg transition-opacity duration-200 ease-in-out">
            [ ENGINEERING_LAB // TECH STACK ]
          </div>
        )}
      </div>

      {/* ABOUT Zone - Book Stack (Far Right on desk) */}
      <div
        className="absolute cursor-pointer transition-all duration-200 ease-in-out"
        style={{
          top: '40%',
          right: '8%',
          width: '12%',
          height: '35%',
        }}
        onMouseEnter={() => setHoveredZone('about')}
        onMouseLeave={() => setHoveredZone(null)}
        onClick={() => handleZoneClick('about')}
        onTouchStart={() => handleZoneTouch('about')}
      >
        {/* Hover Label for ABOUT Zone */}
        {(hoveredZone === 'about' || tappedZone === 'about') && (
          <div className="absolute top-4 right-4 bg-gray-800/90 text-white px-4 py-2 rounded-lg font-sans text-sm border border-gray-600 shadow-lg transition-opacity duration-200 ease-in-out">
            [ COSMERE // ABOUT SACHI ]
          </div>
        )}
      </div>

      {/* Mobile Tap Indicator */}
      {tappedZone && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white px-6 py-3 rounded-lg font-sans text-sm border border-gray-600 shadow-lg z-50">
          Tap again to navigate
        </div>
      )}

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveRoomMap;
