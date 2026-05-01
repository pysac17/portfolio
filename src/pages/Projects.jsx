import React from 'react'
import { Link } from 'react-router-dom';
import {projects} from '../constants'
import CTA from '../components/CTA'
import { motion } from 'framer-motion';

const Projects = () => {
  const getTechColor = (tech) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
    ];
    return colors[tech.length % colors.length];
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col min-h-[500px]'
    >
      {/* Patent Badge */}
      {project.hasPatent && (
        <div className='mb-4'>
          <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white'>
            🏆 Patent Holder
          </span>
        </div>
      )}

      {/* Project Title */}
      <h3 className='text-xl font-bold text-gray-900 mb-3'>
        {project.name}
      </h3>

      {/* Tech Tags */}
      <div className='flex flex-wrap gap-2 mb-4'>
        {project.tech.map((tech, techIndex) => (
          <span
            key={techIndex}
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Problem Statement */}
      <div className='mb-4'>
        <h4 className='text-sm font-semibold text-gray-700 mb-1'>The Problem:</h4>
        <p className='text-sm text-gray-600'>{project.problem}</p>
      </div>

      {/* Key Highlights */}
      <div className='mb-6'>
        <h4 className='text-sm font-semibold text-gray-700 mb-2'>Key Highlights:</h4>
        <ul className='space-y-1'>
          {project.impact.map((point, pointIndex) => (
            <li key={pointIndex} className='text-sm text-gray-600 flex items-start'>
              <span className='text-blue-500 mr-2'>•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-3 mt-auto'>
        {project.liveLink && project.liveLink !== '#' && (
          <motion.a
            href={project.liveLink}
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-32 bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors duration-200'
          >
            Live Demo
          </motion.a>
        )}
        
        {project.githubLink && project.githubLink !== '#' && (
          <motion.a
            href={project.githubLink}
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 ${project.liveLink && project.liveLink !== '#' ? 'bg-gray-800 hover:bg-gray-900' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg text-center font-medium transition-colors duration-200`}
          >
            Source Code
          </motion.a>
        )}
        
        {(!project.liveLink || project.liveLink === '#') && (!project.githubLink || project.githubLink === '#') && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='flex-1 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-center font-medium cursor-not-allowed'
          >
            Coming Soon
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <section className="max-container">
      <h1 className="head-text">
        My <span className="blue-gradient_text font-semibold drop-shadow">Projects</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-900">
        <p>I've worked on several projects that are close to my heart. They showcase my dedication and skills. Feel free to explore them further!</p>
      </div>

      {/* Two-Column Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-20'>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  )
}

export default Projects