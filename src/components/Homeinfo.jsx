import React from 'react';
import { Link } from "react-router-dom";

const Homeinfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Sachi</span>
        👋
        <br />
        Unlocking the future with AI/ML innovations from India 🚀
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Worked at several prestigious companies <br /> honing a diverse range of skills along the way
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Led multiple projects to success over the years. <br /> Curious about the results?
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          Visit my portfolio
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Looking to enhance your team with AI/ML expertise? <br/>
        </p>

        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Let's talk
        </Link>
      </div>
    );
  }

  return null;
};

export default Homeinfo;
