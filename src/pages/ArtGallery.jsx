import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTA from '../components/CTA';
import { lotus, boat, durga, krishna, lady, wave, bells } from '../assets/images';

const Modal = ({ selectedPainting, setSelectedPainting }) => {
  if (!selectedPainting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 pt-16 backdrop-blur-sm"
        onClick={() => setSelectedPainting(null)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col lg:flex-row h-full p-6 lg:p-8 gap-6">
            {/* Image Container */}
            <div className="lg:w-1/2 flex items-center justify-center bg-slate-50 rounded-xl p-4">
              <img 
                src={selectedPainting.image} 
                alt={selectedPainting.title}
                className="w-full h-auto object-contain max-h-[60vh] rounded-md shadow-sm"
              />
            </div>
            
            {/* Story & Details */}
            <div className="lg:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-blue-600 mb-1 block">
                  {selectedPainting.category} • {selectedPainting.year}
                </span>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">
                  {selectedPainting.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 mb-6">
                  {selectedPainting.subtitle}
                </p>
                
                <div className="space-y-4 text-slate-700">
                  <p className="leading-relaxed text-base italic border-l-2 border-slate-900 pl-4 py-1">
                    "{selectedPainting.story}"
                  </p>
                  
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                      Medium & Technique
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedPainting.detail}
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedPainting(null)}
                className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all duration-200"
              >
                Close Story
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
      title: 'The Bloom in the Shadow',
      subtitle: 'Acrylic on canvas',
      story: "42 hours of quiet devotion layer upon layer. A lotus doesn't ask permission to bloom in murky water; it simply grows. This piece is a reminder that beauty isn't fragile, it is resilient. In life's chaos, you are the only constant. You always have yourself, and you can choose whether to anchor your spirit in the storm around you or the bloom within.",
      detail: 'Pure acrylic built through dozens of translucent glazes to give the petals an ethereal, living glow against dark waters.',
      category: 'Acrylic Painting',
      year: '2024',
      image: lotus,
      height: 'tall'
    },
    {
      id: 2,
      title: 'Anchor in the Current',
      subtitle: 'Acrylic on canvas',
      story: "Perspective is everything. You can look at this canvas and see an unsettled sky, or you can see the boat holding perfectly steady in the stillness of the water below. Life operates the same way, the chaos is real, but so is your calm center. You choose what to focus on.",
      detail: 'Layered acrylic, combining loose, expressive brushwork in the skies with steady, disciplined lines on the water and vessel.',
      category: 'Acrylic Painting',
      year: '2024',
      image: boat,
      height: 'medium'
    },
    {
      id: 3,
      title: 'Fierce & Tender (Durga)',
      subtitle: 'Acrylic and gold leaf on canvas',
      story: "The ultimate harmony of fierce power and unconditional tender love. Durga represents the fire of rebirth, destroying what no longer serves us so something sacred can take root. Yet in her eyes, there is only the gentle comfort of a mother's embrace. At her feet, you remember you are safe.",
      detail: 'Layered acrylics with genuine gold leaf hand-applied across her traditional jewelry to catch the light from every angle.',
      category: 'Mythological',
      year: '2025',
      image: durga,
      height: 'tall'
    },
    {
      id: 4,
      title: 'The Infinite Sanctuary (Krishna)',
      subtitle: 'Acrylic on canvas',
      story: "I wanted his eyes to hold the entire world, warm, playful, accepting, and profound. The high contrast of vibrant yellow silk against deep blue skin creates a focal point that meets you exactly as you are, gently reminding you that growth and beauty come when you embrace your own path.",
      detail: 'Acrylic built in fine, continuous glazes, concentrating the deepest textural layers in his expression.',
      category: 'Portrait',
      year: '2025',
      image: krishna,
      height: 'medium'
    },
    {
      id: 5,
      title: 'Lost in the Moonlight',
      subtitle: 'Acrylic on canvas (in progress)',
      story: "A quiet refuge from the noise. When life is full of variables and ambiguity, there are moments where you look up at the moon and the whole world drops away. She isn't posed for anyone; she is simply present, lost in the moonlight, enjoying her own company, completely untethered from worry.",
      detail: 'In progress. Building cool moonlight glazes across the skin before anchoring the background tone.',
      category: 'Portrait',
      year: '2026',
      image: lady,
      height: 'tall'
    },
    {
      id: 6,
      title: 'The Quiet After the Tide',
      subtitle: 'Acrylic on canvas',
      story: "Finding stillness right at the heart of movement. There is a sacred moment when sunlight strikes crashing water, transforming temporary turbulence into pure, luminous grace. Standing before vast waters resets our heavy worries and reminds us of the grander, everlasting canvas of existence.",
      detail: 'Directional acrylic layering designed to capture light refracting through the peak of dynamic water.',
      category: 'Nature',
      year: '2025',
      image: wave,
      height: 'medium'
    },
    {
      id: 7,
      title: 'Resonance of Devotion',
      subtitle: 'Acrylic on canvas',
      story: "An ode to devotion, sacred sound, and new beginnings. Every transformative journey starts with faith and a humble surrender to something greater than ourselves. I wanted this piece to feel grounded, aged, and ringing with pure intention.",
      detail: 'Acrylic on canvas built up using palette knives and cloth-scrubbing techniques to give the bronze a weathered, tactile texture.',
      category: 'Acrylic Painting',
      year: '2026',
      image: bells,
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
          Creative <span className="blue-gradient_text font-semibold drop-shadow">Practice</span>
        </h1>
        <p className="mt-5 text-slate-700 max-w-2xl mx-auto text-lg leading-relaxed">
          Art built slowly, layer by layer. Hours of patience, emotional presence, and devotion translated onto raw canvas.
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="mt-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {paintings.map((painting, index) => (
            <motion.div
              key={painting.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div 
                className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
                onClick={() => setSelectedPainting(painting)}
              >
                <div className="relative">
                  <img 
                    src={painting.image} 
                    alt={painting.title}
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: '480px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h5 className="text-m font-bold text-white mb-1">
                      {painting.title}
                    </h5>
                    <p className="text-slate-300 text-xs">
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
      <div className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto text-center bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200/60"
        >
          <h3 className="subhead-text mb-6">
            The Philosophy Behind the Brush
          </h3>
          <div className="space-y-4 text-slate-700 leading-relaxed text-base md:text-lg">
            <p>
              I am obsessed with the concept of <strong>brain elasticity</strong>- the idea that by stepping into vastly different creative mediums, you forcibly expand how your mind thinks, solves, and perceives reality.
            </p>
            <p>
              Every single canvas here is painted in <strong>acrylic, built up in slow, deliberate layers</strong>. Some take 40+ hours of patient execution. There are no shortcuts here, only presence, labor, and heart.
            </p>
            <p className="pt-2 text-slate-900 font-medium">
              I believe that <em>you cannot be late in your own life</em>. Put your head down, do the work with humility, lead with kindness, and trust that everything unfolds exactly when it is meant to.
            </p>
          </div>
        </motion.div>
      </div>

      <hr className='border-slate-200' />

      <CTA />
      
      <Modal selectedPainting={selectedPainting} setSelectedPainting={setSelectedPainting} />
    </section>
  );
};

export default ArtGallery;