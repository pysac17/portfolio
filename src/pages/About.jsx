import React, { useState, useMemo } from 'react'
import { skills, experiences } from '../constants'
import CTA from '../components/CTA';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Enhanced date parsing to fix NaN errors - handle both full and abbreviated month names
  const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };

  // Robust date parsing function to prevent NaN errors
  const parseDateSafely = (dateString) => {
    if (!dateString || dateString === 'Present') return new Date();
    
    try {
      const trimmed = dateString.trim();
      
      // Handle "September 2025" format
      const monthYearMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
      if (monthYearMatch) {
        const month = monthMap[monthYearMatch[1]];
        const year = parseInt(monthYearMatch[2]);
        if (month !== undefined && !isNaN(year)) {
          return new Date(year, month, 1);
        }
      }
      
      // Handle "2025-09-01" format
      if (trimmed.includes('-')) {
        const date = new Date(trimmed);
        if (!isNaN(date.getTime())) return date;
      }
      
      // Fallback - try generic parsing
      const fallbackDate = new Date(trimmed);
      if (!isNaN(fallbackDate.getTime())) return fallbackDate;
      
      // Ultimate fallback - return current date
      return new Date();
    } catch (error) {
      console.warn('Date parsing error for:', dateString);
      return new Date();
    }
  };

  // Global Time Constants
  const pxPerMonth = 6; // 1 Month = 40px
  const ANCHOR_DATE = new Date(2026, 11, 31); // December 2026 as top (top: 0px)

  // Calculate top position for coordinate-based timeline
  const calculateTop = (dateString) => {
    const date = parseDateSafely(dateString);
    const anchorDate = new Date(ANCHOR_DATE);
    
    const yearDiff = anchorDate.getFullYear() - date.getFullYear();
    const monthDiff = anchorDate.getMonth() - date.getMonth();
    const totalMonths = yearDiff * 12 + monthDiff;
    
    return totalMonths * pxPerMonth; // Top: 0px for December 2026
  };

  // Calculate year marker positions
  const getYearMarkers = () => {
    const markers = [];
    for (let year = 2026; year >= 2020; year--) {
      const yearDate = new Date(year, 11, 31); // End of each year
      const topPosition = calculateTop(`${year === 2026 ? 'December' : 'January'} ${year}`);
      markers.push({ year, top: topPosition });
    }
    return markers;
  };

  // Calculate total timeline height
  const getTotalTimelineHeight = () => {
    const earliestDate = new Date(2020, 0, 1); // January 2020
    const latestDate = new Date(2026, 11, 31); // December 2026
    const totalMonths = (latestDate.getFullYear() - earliestDate.getFullYear()) * 12 + 
                      (latestDate.getMonth() - earliestDate.getMonth()) + 1;
    return totalMonths * pxPerMonth; // TotalMonthsInTimeline * pxPerMonth
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (dateString === 'Present') return 'Present';
    
    const date = parseDateSafely(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  // Process experiences for two-section layout
  const { chronoMapData, detailedCards } = useMemo(() => {
    // COORDINATE FLIP: Dec 2026 = 0% (left), Jan 2020 = 100% (right)
    const originDate = new Date(2026, 11, 31); // December 2026 = 0%
    const targetDate = new Date(2020, 0, 1); // January 2020 = 100%
    
    // Fixed total months: 84 months from Dec 2026 to Jan 2020
    const totalMonths = 84;
    const percentagePerMonth = 100 / 84;

    // Process experiences for both sections
    const processed = experiences.map((exp, index) => {
      const dateParts = exp.date.includes('–') ? exp.date.split('–') : [exp.date];
      const dateStr1 = dateParts[0].trim();
      const dateStr2 = dateParts[1] ? dateParts[1].trim() : 'Present';
      
      const date1 = parseDateSafely(dateStr1);
      const date2 = dateStr2 === 'Present' ? targetDate : parseDateSafely(dateStr2);
      
      // LARGER DATE = START, SMALLER DATE = END (for reverse timeline)
      const start = date1.getTime() > date2.getTime() ? date1 : date2;
      const end = date1.getTime() > date2.getTime() ? date2 : date1;
      
      // Calculate months from Dec 2026 (origin)
      const startYear = start.getFullYear();
      const startMonth = start.getMonth();
      const endYear = end.getFullYear();
      const endMonth = end.getMonth();
      
      // Total months from Dec 2026 to the event date
      const startMonthsFromOrigin = (2026 - startYear) * 12 + (11 - startMonth);
      
      // Calculate duration from start to end (positive value)
      const durationMonths = (startYear - endYear) * 12 + (startMonth - endMonth) + 1;
      
      // REVERSED COORDINATES: Closer to Dec 2026 = closer to 0%
      const leftPercent = (startMonthsFromOrigin * percentagePerMonth).toFixed(2) + '%';
      const widthPercent = (durationMonths * percentagePerMonth).toFixed(2) + '%';
      
      // Generate unique ID for smooth scrolling
      const cardId = `experience-${index}`;
      
      return {
        ...exp,
        cardId,
        left: leftPercent,
        width: widthPercent,
        start,
        end,
        formattedDateRange: dateParts[1] 
          ? `${formatDateForDisplay(dateStr1)} – ${formatDateForDisplay(dateStr2)}`
          : formatDateForDisplay(dateStr1)
      };
    });

    // Assign categories and icons outside the processing loop
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

    // Group by category for chrono-map with stacking
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

    // Handle stacking for overlapping items
    Object.keys(categories).forEach(category => {
      const items = categories[category];
      const stacked = [];
      
      items.forEach(item => {
        let stackLevel = 0;
        let placed = false;
        
        while (!placed) {
          const canPlace = !stacked.some(stackedItem => 
            stackedItem.stackLevel === stackLevel &&
            !(item.end < stackedItem.start || item.start > stackedItem.end)
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

    // Sort detailed cards by date (most recent first)
    const sortedCards = [...processed].sort((a, b) => b.start.getTime() - a.start.getTime());

    return {
      chronoMapData: {
        categories,
        totalMonths,
        originDate,
        targetDate
      },
      detailedCards: sortedCards
    };
  }, []);

  // Generate timeline months for header
  const generateTimelineMonths = () => {
    const months = [];
    const currentDate = new Date(2020, 0, 1);
    const endDate = new Date(2026, 11, 31);
    
    while (currentDate <= endDate) {
      months.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return months;
  };

  // Smooth scroll to card
  const scrollToCard = (cardId) => {
    const element = document.getElementById(cardId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Helper function to get border color based on type
  const getBorderColor = (type) => {
    switch(type) {
      case 'education': return 'border-blue-500';
      case 'work': return 'border-cyan-500';
      case 'ngo': return 'border-amber-500';
      default: return 'border-gray-300';
    }
  };

  // Helper function to get tag color
  const getTagColor = (type) => {
    switch(type) {
      case 'education': return 'bg-blue-100 text-blue-700';
      case 'work': return 'bg-cyan-100 text-cyan-700';
      case 'ngo': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
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
      className={`relative inline-block ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <div className={`px-4 py-2 rounded-full border-2 font-medium text-sm transition-all duration-300 ${getCategoryColor(skill.type)}`}>
        <span>{skill.name}</span>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap"
        >
          <div className={`w-2 h-2 rounded-full ${getLevelColor(skill.level)} inline-block mr-1`}></div>
          {skill.level}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Sachi</span>
      </h1>
      <h3 className="mt-2 text-slate-900">CS Grad Student @ UC Irvine | Ex Associate AI Engineer  </h3>

      <div className="mt-5 flex flex-col gap-3 text-slate-900">
        <p>
          I build AI systems that dont just exist in research papers they work in production. From architecting GenAI pipelines for global insurance firms to securing a national patent for computer vision, I specialize in bridging the gap between complex algorithms and real-world utility.
        </p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        
        {/* Category Filter */}
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

        {/* Skills Grid */}
        <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredSkills.map((skill, index) => (
            <SkillBadge 
              key={skill.name} 
              skill={skill} 
              isDimmed={selectedCategory !== 'All' && !categories.find(cat => cat.name === selectedCategory)?.types.includes(skill.type)}
            />
          ))}
        </div>

        {/* Skill Level Legend */}
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

      <div className='py-16'>
        <h3 className='subhead-text'>Experience & Education</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-900">
        <p>
          A chronological journey through education, professional growth, and social impact.
        </p>       
        </div>

        {/* Two-Section Timeline Layout */}
        <div className='mt-12'>
          {/* Section A: Interactive Chrono-Map (Desktop Only) */}
          <div className='hidden md:block mb-12'>
            <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>Interactive Chrono-Map</h3>
              
              {/* Unified Chrono-Map */}
              <div className='relative' style={{ width: '100%', position: 'relative', height: 'auto' }}>
                {/* External Category Labels */}
                <div className='absolute left-0 top-6 w-24 h-full flex flex-col justify-start gap-y-4 py-2'>
                  {/* Education Label */}
                  <div className='flex items-center justify-center h-8'>
                    <div className='text-sm font-medium text-gray-700 flex flex-col items-center'>
                      <span>Education</span>
                    </div>
                  </div>
                  
                  {/* Work Label */}
                  <div className='flex items-center justify-center h-8'>
                    <div className='text-sm font-medium text-gray-700 flex flex-col items-center'>
                      <span>Work</span>
                    </div>
                  </div>
                  
                  {/* Impact Label */}
                  <div className='flex items-center justify-center h-8'>
                    <div className='text-sm font-medium text-gray-700 flex flex-col items-center'>
                      <span>Impact</span>
                    </div>
                  </div>
                </div>
                
                {/* Vertical Separator */}
                <div className='absolute left-24 top-0 bottom-0 w-px bg-gray-300'></div>
                
                {/* Main Timeline Container */}
                <div className='ml-28 relative' style={{ width: 'calc(100% - 106px)', height: 'auto' }}>
                  {/* Year Grid Header - Reversed (2026 to 2020) */}
                  <div className='relative h-6 border-b border-gray-300 mb-2'>
                    {/* Year Markers with Reduced Width */}
                    {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((year, index) => {
                      const yearPercent = ((index / 7) * 100).toFixed(2) + '%';
                      return (
                        <div 
                          key={year} 
                          className='absolute text-xs font-bold text-gray-700 flex items-center justify-center border-r border-gray-200'
                          style={{ 
                            left: yearPercent,
                            width: '14.2857%',
                          }}
                        >
                          {year}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Three-Lane Timeline */}
                  <div className='relative' style={{ height: '100px' }}>
                    {/* Lane 1: Education */}
                    <div className='relative' style={{ height: '10px' }}>
                      {/* Education Bars */}
                      {chronoMapData.categories.Education.map((item, itemIndex) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                          className='absolute cursor-pointer group'
                          style={{
                            left: item.left,
                            width: item.width,
                            top: '4px',
                            height: '16px'
                          }}
                          onClick={() => scrollToCard(item.cardId)}
                          whileHover={{ scale: 1.02, zIndex: 50 }}
                        >
                          {/* Blue Bar */}
                          <div className='h-full rounded-full border-2 border-blue-500 bg-blue-100 hover:shadow-lg transition-all duration-200'></div>
                          
                          {/* Tooltip */}
                          <div className='absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50'>
                            <div className='bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap'>
                              <div className='font-semibold'>{item.title}</div>
                              <div className='text-gray-300'>{item.formattedDateRange}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Lane 2: Work */}
                    <div className='relative' style={{ height: '7px', top: '35px' }}>
                      {/* Work Bars */}
                      {chronoMapData.categories.Work.map((item, itemIndex) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                          className='absolute cursor-pointer group'
                          style={{
                            left: item.left,
                            width: item.width,
                            top: '4px',
                            height: '16px'
                          }}
                          onClick={() => scrollToCard(item.cardId)}
                          whileHover={{ scale: 1.02, zIndex: 50 }}
                        >
                          {/* Cyan Bar */}
                          <div className='h-full rounded-full border-2 border-cyan-500 bg-cyan-100 hover:shadow-lg transition-all duration-200'></div>
                          
                          {/* Tooltip */}
                          <div className='absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50'>
                            <div className='bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap'>
                              <div className='font-semibold'>{item.title}</div>
                              <div className='text-gray-300'>{item.formattedDateRange}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Lane 3: Impact */}
                    <div className='relative' style={{ height: '25px', top: '70px' }}>
                      {/* NGO Continuous Bar - Hard-coded full span */}
                      {chronoMapData.categories.Impact.map((item, itemIndex) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                          className='absolute cursor-pointer group'
                          style={{
                            left: '0%',
                            width: '100%',
                            top: '4px',
                            height: '16px'
                          }}
                          onClick={() => scrollToCard(item.cardId)}
                          whileHover={{ scale: 1.02, zIndex: 50 }}
                        >
                          {/* Gold Bar */}
                          <div className='h-full rounded-full border-2 border-amber-500 bg-amber-100 hover:shadow-lg transition-all duration-200'></div>
                          
                          {/* Tooltip */}
                          <div className='absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50'>
                            <div className='bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap'>
                              <div className='font-semibold'>{item.title}</div>
                              <div className='text-gray-300'>{item.formattedDateRange}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section B: Detailed Milestone Cards */}
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold text-gray-800'>📋 Detailed Experience Timeline</h3>
            <p className='text-sm text-gray-600'>Complete details of my professional journey, from most recent to earliest</p>
            
            {/* Detailed Cards */}
            <div className='space-y-6'>
              {detailedCards.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  id={item.cardId}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 ${getBorderColor(item.type)}`}
                >
                  {/* Card Header */}
                  <div className='p-6'>
                    {/* Date Range */}
                    <div className='text-sm font-bold text-gray-600 mb-3'>
                      {item.formattedDateRange}
                    </div>
                    
                    {/* Type Tag */}
                    <div className='mb-4'>
                      <span className='text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700'>
                        {item.icon} {item.category}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h4 className='text-xl font-semibold text-gray-900 mb-2'>
                      {item.title}
                    </h4>
                    <p className='text-lg text-gray-700 mb-2'>
                      {item.type === 'education' ? `@ ${item.company_name}` : item.company_name}
                    </p>
                    {item.location && <p className='text-sm text-gray-500 mb-4'>{item.location}</p>}
                    
                    {/* All Points - Full Visibility */}
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
                  
                  {/* Visual Anchor Bar */}
                  <div className={`h-2 ${item.type === 'education' ? 'bg-blue-500' : item.type === 'work' ? 'bg-cyan-500' : 'bg-amber-500'}`}></div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Mobile: Only Detailed Cards */}
          <div className='md:hidden space-y-6'>
            <h3 className='text-xl font-semibold text-gray-800'>📋 Experience Timeline</h3>
            
            {/* Mobile Detailed Cards */}
            <div className='space-y-6'>
              {detailedCards.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  id={item.cardId}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 ${getBorderColor(item.type)}`}
                >
                  {/* Mobile Card Header */}
                  <div className='p-4'>
                    {/* Date Range */}
                    <div className='text-xs font-bold text-gray-600 mb-2'>
                      {item.formattedDateRange}
                    </div>
                    
                    {/* Type Tag */}
                    <div className='mb-3'>
                      <span className='text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700'>
                        {item.icon} {item.category}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h4 className='text-lg font-semibold text-gray-900 mb-1'>
                      {item.title}
                    </h4>
                    <p className='text-sm text-gray-700 mb-1'>
                      {item.type === 'education' ? `@ ${item.company_name}` : item.company_name}
                    </p>
                    {item.location && <p className='text-xs text-gray-500 mb-3'>{item.location}</p>}
                    
                    {/* All Points - Full Visibility */}
                    <div className='space-y-2'>
                      {item.points.map((point, idx) => (
                        <div key={idx} className='flex items-start'>
                          <span className='text-gray-400 mr-2 mt-1 text-xs'>•</span>
                          <p className='text-xs text-gray-700 leading-relaxed'>
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
                  
                  {/* Visual Anchor Bar */}
                  <div className={`h-1 ${item.type === 'education' ? 'bg-blue-500' : item.type === 'work' ? 'bg-cyan-500' : 'bg-amber-500'}`}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className='border-slate-200' />

      <CTA />

    </section>
  )
}

export default About
