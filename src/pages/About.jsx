import React from 'react'
import { skills, experiences } from '../constants'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA';

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Sachi</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-900">
        <p>
          I'm a CS grad student at UC Irvine and a former AI Engineer who loves 
          building things that actually work — from LLM pipelines used by real 
          clients to a yoga pose detector that earned a national patent. I care 
          about making AI useful, not just impressive.
        </p>      
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill, index) => (
            <div key={ index }  className="block-container w-20 h-20 relative group">
              <div className="btn-front rounded-xl flex justify-center items-center relative group-hover:scale-105 transition-transform duration-300">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {skill.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-900">
        <p>
          Here's where I've put the work in — from founding the AI department 
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
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className='text-black-500/1000 font-normal pl-1 text-m'
                    >
                      {point}
                    </li>
                  ))}
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
