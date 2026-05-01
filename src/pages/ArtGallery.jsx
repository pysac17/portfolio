import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTA from '../components/CTA';
import { lotus, boat, durga, krishna, lady, wave } from '../assets/images';

const Modal = ({ selectedPainting, setSelectedPainting }) => {
  if (!selectedPainting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedPainting(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl my-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button positioned at top */}
          <button
            onClick={() => setSelectedPainting(null)}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200"
          >
            ×
          </button>
          
          <div className="flex flex-col lg:flex-row h-full pt-8">
            {/* Image Section */}
            <div className="lg:w-1/2 p-6 flex items-center justify-center">
              <img 
                src={selectedPainting.image} 
                alt={selectedPainting.title}
                className="w-4/5 h-auto object-contain rounded-lg max-h-full mx-auto"
              />
            </div>
            
            {/* Details Section */}
            <div className="lg:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedPainting.title}
                </h3>
                <p className="text-xl text-gray-600 mb-4">
                  {selectedPainting.subtitle}
                </p>
                
                <div className="flex gap-4 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedPainting.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {selectedPainting.year}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Story</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedPainting.story}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Technical Detail</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedPainting.detail}
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedPainting(null)}
                className="mt-6 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ArtGallery = () => {
  const [selectedPainting, setSelectedPainting] = useState(null);

  const paintings = [
    {
      id: 1,
      title: 'The Alchemy of Solitude',
      subtitle: 'The Lotus',
      story: 'This piece explores beauty in loneliness. It suggests that sadness is not a state to be feared, but the necessary, nutrient-rich foundation for personal growth. Like the Lotus, we find our truest form when we learn to unfold in the quietude of our own presence, turning isolation into a sacred space for self-realization.',
      detail: 'Emergence from the Void. The Lotus is the sacred symbol of a soul that remains unstained by the "mud" of the material world.',
      category: 'Spiritual',
      year: '2024',
      image: lotus,
      height: 'tall'
    },
    {
      id: 2,
      title: 'The Paradox of Stillness',
      subtitle: 'The Boat',
      story: 'This represents the chaotic journey of "figuring it out." The turbulent water signifies the struggle of self-discovery and the noise of the ego. Yet, the boat remains upright and centered. It is a reminder that while you must navigate the movement of life, your true essence the observer remains untouched by the waves.',
      detail: 'The Unmoved Mover. Amidst the constant flux of the external world, there exists a core of absolute stillness.',
      category: 'Metaphorical',
      year: '2024',
      image: boat,
      height: 'medium'
    },
    {
      id: 3,
      title: 'The Righteous Warrior',
      subtitle: 'Durga',
      story: 'She represents the willpower to overcome every obstacle. As an amalgamation of all divine energies, Durga is the "unassailable" force within us. She teaches us to be calm in the heat of battle and to use our strength with righteous intent, proving that true protection is the highest form of beauty.',
      detail: 'Dharma & Shakti. Durga embodies "Desireless Action" fighting not out of hatred, but out of a divine duty to preserve moral order.',
      category: 'Mythological',
      year: '2025',
      image: durga,
      height: 'tall'
    },
    {
      id: 4,
      title: 'The Art of Surrender',
      subtitle: 'Krishna',
      story: 'This piece captures the transition to total acceptance. It reflects the teaching that "Right knowledge is the ultimate solution." Through surrender, we stop seeing the world as fragmented and start seeing divinity in all things. Every act becomes a prayer, and the renunciation of the ego reveals the path to inner bliss.',
      detail: 'Bhakti & Nishkama Karma. Based on the Bhagavad Gita, Krishna is the guide who leads us from Arjuna\'s dilemma to universal truth.',
      category: 'Spiritual',
      year: '2025',
      image: krishna,
      height: 'medium'
    },
    {
      id: 5,
      title: 'The Infinite Spark',
      subtitle: 'The Woman (WIP)',
      story: 'She sits in perfect stillness, moon-watching for hours. This piece represents the infinite potential found in a single moment of wonder. There is a spark in her eyes a realization that life is peaceful and she is happy exactly as she is. It is the end of seeking; it is the realization that the peace we look for in the stars is already within us.',
      detail: 'Sat-Chit-Ananda (Truth-Consciousness-Bliss). The moment of "Pratibha," or the flash of spiritual intuition.',
      category: 'Portrait',
      year: '2026',
      image: lady,
      height: 'tall'
    },
    {
      id: 6,
      title: 'The Transience of Power',
      subtitle: 'The Wave',
      story: 'A meditation on the ebb and flow of life. This piece captures the raw power of nature reminding us that our peaks and valleys are temporary. We should not attach ourselves to the height of our successes or the depths of our failures, but rather recognize ourselves as the vast, eternal ocean that remains when the wave subsides.',
      detail: 'Anicca (Impermanence). A wave is a momentary surge of energy that belongs entirely to the ocean.',
      category: 'Nature',
      year: '2025',
      image: wave,
      height: 'medium'
    }
  ];

  return (
    <section className="max-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <h1 className="head-text">
          My <span className="blue-gradient_text font-semibold drop-shadow">Art Gallery</span>
        </h1>
        <p className="mt-5 text-slate-900 max-w-2xl mx-auto">
          A collection of paintings exploring themes of spirituality, mythology, and personal growth
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="mt-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {paintings.map((painting, index) => (
            <motion.div
              key={painting.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`break-inside-avoid ${
                painting.height === 'tall' ? 'row-span-2' : ''
              }`}
            >
              <div 
                className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedPainting(painting)}
              >
                <div className="relative">
                  <img 
                    src={painting.image} 
                    alt={painting.title}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '400px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {painting.title}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {painting.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="subhead-text">
            Tech-Creative Philosophy
          </h3>
          <p className="mt-5 text-slate-900">
            My artistic practice informs my technical work. The same principles of pattern recognition, 
            iterative refinement, and attention to detail that guide my AI development also shape my approach to art. 
            Whether I'm optimizing a neural network or balancing composition in a painting, the goal remains the same: 
            creating systems that are both functional and beautiful.
          </p>
        </motion.div>
      </div>

      <hr className='border-slate-200' />

      <CTA />
      
      <Modal selectedPainting={selectedPainting} setSelectedPainting={setSelectedPainting} />
    </section>
  );
};

export default ArtGallery;
