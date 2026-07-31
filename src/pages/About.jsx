import React, { useState, useMemo } from 'react';
import { skills, experiences } from '../constants';
import CTA from '../components/CTA';
import { motion } from 'framer-motion';

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Month map for flexible date parsing
  const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };

  // Robust date parser with current date fallback (July 2026)
  const parseDateSafely = (dateString) => {
    if (!dateString || dateString === 'Present') return new Date(2026, 6, 31); // Jul 2026
    
    try {
      const trimmed = dateString.trim();
      
      const monthYearMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
      if (monthYearMatch) {
        const month = monthMap[monthYearMatch[1]];
        const year = parseInt(monthYearMatch[2]);
        if (month !== undefined && !isNaN(year)) {
          return new Date(year, month, 1);
        }
      }
      
      if (trimmed.includes('-')) {
        const date = new Date(trimmed);
        if (!isNaN(date.getTime())) return date;
      }
      
      const fallbackDate = new Date(trimmed);
      if (!isNaN(fallbackDate.getTime())) return fallbackDate;
      
      return new Date(2026, 6, 31);
    } catch (error) {
      console.warn('Date parsing error for:', dateString);
      return new Date(2026, 6, 31);
    }
  };

  // Format date display string
  const formatDateForDisplay = (dateString) => {
    if (dateString === 'Present') return 'Present';
    
    const date = parseDateSafely(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const ROW_HEIGHT = 20;
  
  // Process timeline data relative to Current Time (July 2026) -> Jan 2020
  const { chronoMapData, detailedCards } = useMemo(() => {
    // Current Anchor: July 2026 = 0% (left), Jan 2020 = 100% (right)
    const originDate = new Date(2026, 6, 31); // July 2026 ("now")
    
    // Total months between Jul 2026 and Jan 2020 = 79 months
    const totalMonths = (2026 - 2020) * 12 + 7; // 72 + 7 = 79 months
    const percentagePerMonth = 100 / totalMonths;

    const processed = experiences.map((exp, index) => {
      const dateParts = exp.date.includes('–') ? exp.date.split('–') : [exp.date];
      const dateStr1 = dateParts[0].trim();
      const dateStr2 = dateParts[1] ? dateParts[1].trim() : 'Present';
      const isOngoing = dateStr2 === 'Present';

      const date1 = parseDateSafely(dateStr1);
      const date2 = isOngoing ? originDate : parseDateSafely(dateStr2);
      
      const start = date1.getTime() > date2.getTime() ? date1 : date2;
      const end = date1.getTime() > date2.getTime() ? date2 : date1;
      
      const startYear = start.getFullYear();
      const startMonth = start.getMonth();
      const endYear = end.getFullYear();
      const endMonth = end.getMonth();
      
      // Calculate months from origin (July 2026)
      const startMonthsFromOrigin = (2026 - startYear) * 12 + (6 - startMonth);
      const durationMonths = (startYear - endYear) * 12 + (startMonth - endMonth) + 1;
      
      // Reversed coordinates (0% = July 2026)
      const leftPercent = Math.max(0, (startMonthsFromOrigin * percentagePerMonth)).toFixed(2) + '%';
      const widthPercent = Math.min(100, (durationMonths * percentagePerMonth)).toFixed(2) + '%';
      
      const cardId = `experience-${index}`;
      
      return {
        ...exp,
        cardId,
        isOngoing,
        left: leftPercent,
        width: widthPercent,
        start,
        end,
        formattedDateRange: dateParts[1] 
          ? `${formatDateForDisplay(dateStr1)} – ${formatDateForDisplay(dateStr2)}`
          : formatDateForDisplay(dateStr1)
      };
    });

    processed.forEach(exp => {
      if (exp.type === 'education') {
        exp.category = 'Education';
        exp.icon = '🎓';
      } else if (exp.type === 'ngo') {
        exp.category = 'Impact';
        exp.icon = '❤️';
      } else {
        exp.category = 'Work';
        exp.icon = '💼';
      }
    });

    const categories = {
      'Education': [],
      'Work': [],
      'Impact': []
    };

    processed.forEach(item => {
      if (categories[item.category]) {
        categories[item.category].push(item);
      }
    });

    // Compute overlapping stack levels
    Object.keys(categories).forEach(category => {
      const items = categories[category];
      const stacked = [];
      
      items.forEach(item => {
        let stackLevel = 0;
        let placed = false;
        
        while (!placed) {
          const canPlace = !stacked.some(stackedItem => 
            stackedItem.stackLevel === stackLevel &&
            !(item.end > stackedItem.start || item.start < stackedItem.end)
          );
          
          if (canPlace) {
            stacked.push({ ...item, stackLevel });
            placed = true;
          } else {
            stackLevel++;
          }
        }
      });
      
      categories[category] = stacked;
    });

    // Dynamic Lane Height calculation
    const laneMaxStack = {};
    Object.keys(categories).forEach(cat => {
      const levels = categories[cat].map(i => i.stackLevel);
      laneMaxStack[cat] = levels.length ? Math.max(...levels) : 0;
    });

    const lanePadding = 8;
    const laneHeight = (cat) => (laneMaxStack[cat] + 1) * ROW_HEIGHT + lanePadding;
    const laneGap = 16;
    
    const eduTop = 0;
    const workTop = eduTop + laneHeight('Education') + laneGap;
    const impactTop = workTop + laneHeight('Work') + laneGap;
    const totalLaneHeight = impactTop + laneHeight('Impact');

    const LANE_AREA_TOP = 32;
    const chronoMapTotalHeight = LANE_AREA_TOP + totalLaneHeight + 16;

    const sortedCards = [...processed].sort((a, b) => b.start.getTime() - a.start.getTime());

    return {
      chronoMapData: {
        categories,
        totalMonths,
        originDate,
        laneLayout: { 
          eduTop, 
          workTop, 
          impactTop, 
          totalLaneHeight, 
          chronoMapTotalHeight, 
          laneAreaTop: LANE_AREA_TOP, 
          heights: {
            Education: laneHeight('Education'), 
            Work: laneHeight('Work'), 
            Impact: laneHeight('Impact'),
          } 
        },
      },
      detailedCards: sortedCards
    };
  }, []);

  const scrollToCard = (cardId) => {
    const element = document.getElementById(cardId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const getBorderColor = (type) => {
    switch(type) {
      case 'education': return 'border-blue-500';
      case 'work': return 'border-cyan-500';
      case 'ngo': return 'border-amber-500';
      default: return 'border-gray-300';
    }
  };

  const categories = [
    { name: 'All', types: ['AI/ML', 'SDE', 'Backend', 'Cloud', 'Frontend', 'Design', 'Robotics'] },
    { name: 'AI/ML', types: ['AI/ML'] },
    { name: 'SDE & Systems', types: ['SDE'] },
    { name: 'Backend', types: ['Backend'] },
    { name: 'Cloud & Tools', types: ['Cloud'] },
    { name: 'Frontend & Design', types: ['Frontend', 'Design'] },
    { name: 'Robotics', types: ['Robotics'] }
  ];

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => categories.find(cat => cat.name === selectedCategory)?.types.includes(skill.type));

  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return 'bg-green-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (type) => {
    switch(type) {
      case 'AI/ML': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SDE': return 'bg-green-100 text-green-800 border-green-200';
      case 'Backend': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cloud': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Frontend': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Design': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Robotics': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const SkillBadge = ({ skill, isDimmed }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-block ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-medium text-sm transition-all duration-300 ${getCategoryColor(skill.type)}`}>
        <span
          className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getLevelColor(skill.level)}`}
          title={skill.level}
        ></span>
        <span>{skill.name}</span>
      </div>
    </motion.div>
  );

  // Reusable Timeline Bar
  const TimelineBar = ({ item, laneBorderClass, laneBgClass }) => (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3 }}
      className='absolute cursor-pointer group z-10'
      style={{
        left: item.left,
        width: item.width,
        top: `${4 + item.stackLevel * ROW_HEIGHT}px`,
        height: '16px'
      }}
      onClick={() => scrollToCard(item.cardId)}
      whileHover={{ scale: 1.02, zIndex: 50 }}
    >
      <div className={`h-full rounded-full border-2 ${laneBorderClass} ${laneBgClass} hover:shadow-lg transition-all duration-200 relative overflow-hidden`}>
        <span
          className='absolute left-0 top-0 bottom-0 w-1.5'
          style={{ backgroundColor: item.iconBg && item.iconBg !== 'black' ? item.iconBg : '#334155' }}
        ></span>
      </div>

      {/* Hover Tooltip */}
      <div className='absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50'>
        <div className='bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap'>
          <div className='font-semibold flex items-center gap-1'>
            <span
              className='inline-block w-2 h-2 rounded-full'
              style={{ backgroundColor: item.iconBg && item.iconBg !== 'black' ? item.iconBg : '#94a3b8' }}
            ></span>
            {item.title}
            {item.isOngoing && <span className='ml-1 text-emerald-300'>• Current</span>}
          </div>
          <div className='text-gray-300'>{item.company_name} — {item.formattedDateRange}</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Sachi</span>
      </h1>
      <h3 className="mt-2 text-slate-900">CS Grad Student @ UC Irvine | Ex Associate AI Engineer</h3>

      <div className="mt-5 flex flex-col gap-3 text-slate-900">
        <p>
          I build AI systems that don't just exist in research papers—they work in production. From architecting GenAI pipelines for global insurance firms to securing a national patent for computer vision, I specialize in bridging the gap between complex algorithms and real-world utility.
        </p>
      </div>

      {/* Skills Section */}
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        
        <div className='mt-6 flex flex-wrap gap-2'>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredSkills.map((skill) => (
            <SkillBadge 
              key={skill.name} 
              skill={skill} 
              isDimmed={selectedCategory !== 'All' && !categories.find(cat => cat.name === selectedCategory)?.types.includes(skill.type)}
            />
          ))}
        </div>

        <div className='mt-8 flex justify-center gap-6 text-sm text-gray-600'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-green-500'></div>
            <span>Expert</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-blue-500'></div>
            <span>Advanced</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
            <span>Intermediate</span>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className='py-16'>
        <h3 className='subhead-text'>Experience & Education</h3>

        <div className='mt-12'>
          <div className='hidden md:block mb-12'>
            <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Interactive Chrono-Map</h3>
              
              <div className='relative' style={{ width: '100%', position: 'relative', height: chronoMapData.laneLayout.chronoMapTotalHeight }}>
                
                {/* Headers column */}
                <div className='absolute left-0 w-24' style={{ top: chronoMapData.laneLayout.laneAreaTop, height: chronoMapData.laneLayout.totalLaneHeight }}>
                  <div
                    className='absolute flex items-center justify-center w-24'
                    style={{ top: chronoMapData.laneLayout.eduTop, height: chronoMapData.laneLayout.heights.Education }}
                  >
                    <span className='text-sm font-medium text-gray-700'>Education</span>
                  </div>
                  <div
                    className='absolute flex items-center justify-center w-24'
                    style={{ top: chronoMapData.laneLayout.workTop, height: chronoMapData.laneLayout.heights.Work }}
                  >
                    <span className='text-sm font-medium text-gray-700'>Work</span>
                  </div>
                  <div
                    className='absolute flex items-center justify-center w-24'
                    style={{ top: chronoMapData.laneLayout.impactTop, height: chronoMapData.laneLayout.heights.Impact }}
                  >
                    <span className='text-sm font-medium text-gray-700'>Impact</span>
                  </div>
                </div>
                
                <div className='absolute left-24 top-0 bottom-0 w-px bg-gray-300'></div>
                
                {/* Right Timeline Grid */}
                <div className='ml-28 relative' style={{ width: 'calc(100% - 112px)' }}>
                  
                  {/* Timeline Header starting from Present (2026) to 2020 */}
                  <div className='relative h-6 border-b border-gray-300 mb-2'>
                    {[
                      { label: '2026', year: 2026 },
                      { label: '2025', year: 2025 },
                      { label: '2024', year: 2024 },
                      { label: '2023', year: 2023 },
                      { label: '2022', year: 2022 },
                      { label: '2021', year: 2021 },
                      { label: '2020', year: 2020 }
                    ].map((item, index) => {
                      const yearPercent = ((index / 7) * 100).toFixed(2) + '%';
                      return (
                        <div 
                          key={item.year} 
                          className='absolute text-xs font-bold text-gray-700 flex items-center justify-center border-r border-gray-200'
                          style={{ 
                            left: yearPercent,
                            width: '14.2857%',
                          }}
                        >
                          {item.label}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Lanes Container */}
                  <div className='relative' style={{ height: chronoMapData.laneLayout.totalLaneHeight }}>
                    
                    {/* Education Lane */}
                    <div 
                      className='absolute left-0 right-0 rounded-md ' 
                      style={{ height: chronoMapData.laneLayout.heights.Education, top: chronoMapData.laneLayout.eduTop }}
                    >
                      {chronoMapData.categories.Education.map((item) => (
                        <TimelineBar
                          key={item.title}
                          item={item}
                          laneBorderClass='border-blue-500'
                          laneBgClass='bg-blue-100'
                        />
                      ))}
                    </div>
                    
                    {/* Work Lane */}
                    <div 
                      className='absolute left-0 right-0 rounded-md ' 
                      style={{ height: chronoMapData.laneLayout.heights.Work, top: chronoMapData.laneLayout.workTop }}
                    >
                      {chronoMapData.categories.Work.map((item) => (
                        <TimelineBar
                          key={item.title}
                          item={item}
                          laneBorderClass='border-cyan-500'
                          laneBgClass='bg-cyan-100'
                        />
                      ))}
                    </div>
                    
                    {/* Impact Lane - Fixed with standard TimelineBar hover & layout */}
                    <div 
                      className='absolute left-0 right-0 rounded-md' 
                      style={{ height: chronoMapData.laneLayout.heights.Impact, top: chronoMapData.laneLayout.impactTop }}
                    >
                      {chronoMapData.categories.Impact.map((item) => (
                        <TimelineBar
                          key={item.title}
                          item={item}
                          laneBorderClass='border-amber-500'
                          laneBgClass='bg-amber-100'
                        />
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Cards Section */}
          <div className='space-y-6'>
            {detailedCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                id={item.cardId}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 ${getBorderColor(item.type)} relative overflow-hidden`}
              >
                <span
                  className='absolute left-0 top-0 bottom-0 w-1.5'
                  style={{ backgroundColor: item.iconBg && item.iconBg !== 'black' ? item.iconBg : '#334155' }}
                ></span>

                <div className='p-6 pl-8'>
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='text-sm font-bold text-gray-600'>
                      {item.formattedDateRange}
                    </span>
                    {item.isOngoing && (
                      <span className='inline-flex items-center text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full'>
                        Current
                      </span>
                    )}
                  </div>
                  
                  <div className='mb-4'>
                    <span className='text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700'>
                      {item.icon} {item.category}
                    </span>
                  </div>
                  
                  <h4 className='text-xl font-semibold text-gray-900 mb-2'>
                    {item.title}
                  </h4>
                  <p className='text-lg text-gray-700 mb-2'>
                    {item.type === 'education' ? `@ ${item.company_name}` : item.company_name}
                  </p>
                  {item.location && <p className='text-sm text-gray-500 mb-4'>{item.location}</p>}
                  
                  <div className='space-y-3'>
                    {item.points.map((point, idx) => (
                      <div key={idx} className='flex items-start'>
                        <span className='text-gray-400 mr-2 mt-1'>•</span>
                        <p className='text-gray-700 leading-relaxed'>
                          {idx === 0 && item.type === 'ngo' ? (
                            <span className='italic font-medium'>"{point}"</span>
                          ) : (
                            point
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <hr className='border-slate-200' />
      <CTA />
    </section>
  );
};

export default About;