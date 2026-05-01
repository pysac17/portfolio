import React from 'react';
import { Link } from "react-router-dom";

const Homeinfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Bridging the gap between Complex Research and Production AI.
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Architecting GenAI pipelines that turn hours of work into seconds.
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          My Journey
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          From National Patents to Enterprise LLM Solutions.
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          See my work
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Open to AI/ML roles for Summer/Fall 2026 <br /> Let's build something that actually works 🤝
        </p>

        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Get in touch
        </Link>
      </div>
    );
  }

  return null;
};

export default Homeinfo;
