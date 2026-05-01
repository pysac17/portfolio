import React, { useState } from 'react'
import { skills, experiences } from '../constants'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
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
        <div className='mt-8'>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='flex flex-wrap gap-3'
            >
              {skills.map((skill) => {
                const isInCategory = selectedCategory === 'All' || 
                  categories.find(cat => cat.name === selectedCategory)?.types.includes(skill.type);
                return (
                  <SkillBadge 
                    key={skill.name} 
                    skill={skill} 
                    isDimmed={!isInCategory}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className='mt-8 flex items-center gap-6 text-xs text-gray-600'>
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
        <h3 className='subhead-text'>Work Experience</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-900">
        <p>
          Here's where I've put the work in from founding the AI department 
          at a startup to shipping enterprise-grade NLP pipelines for 
          insurance clients.
        </p>       
        </div>



      <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[80%] h-[80%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {experience.title}
                  </h3>
                  <p
                    className='text-black-900 font-large text-base'
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {experience.points.map((point, index) => {
                    // Split the point at the first colon to separate header and content
                    const colonIndex = point.indexOf(':');
                    if (colonIndex > 0) {
                      const header = point.substring(0, colonIndex + 1);
                      const content = point.substring(colonIndex + 1).trim();
                      return (
                        <li
                          key={`experience-point-${index}`}
                          className='text-black-500/1000 font-normal pl-1 text-m'
                        >
                          <span className='font-semibold text-black-700'>{header}</span>
                          {content}
                        </li>
                      );
                    }
                    return (
                      <li
                        key={`experience-point-${index}`}
                        className='text-black-500/1000 font-normal pl-1 text-m'
                      >
                        {point}
                      </li>
                    );
                  })}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className='border-slate-200' />

      <CTA />

    </section>
  )
}

export default About
