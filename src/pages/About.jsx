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
        <p>Passionate AI innovator and award-winning technologist, pioneering breakthroughs in healthcare, environmental sustainability, and human well-being through creative and impactful solutions.</p>
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
        <p>I have collaborated with diverse teams, advancing my expertise in AI and software development while pioneering innovative solutions that blend creativity with technical rigor. This experience has equipped me to leverage cutting-edge technologies effectively, ensuring impactful contributions to projects.</p>
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
