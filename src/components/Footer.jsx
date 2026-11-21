import React from 'react';

const links = [
  { name: 'Email', href: 'mailto:sachijs@uci.edu' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sachijshah/', external: true },
  { name: 'GitHub', href: 'https://github.com/pysac17', external: true },
  // Placeholder: drop Sachi_Shah_Resume.pdf into /public for this link to work.
  { name: 'Resume', href: '/Sachi_Shah_Resume.pdf', download: true },
];

const Footer = () => (
  <footer className='border-t border-slate-200'>
    <div className='max-w-5xl mx-auto px-8 sm:px-16 py-6 min-h-[80px] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600'>
      <p>
        © {new Date().getFullYear()}{' '}
        <span className='blue-gradient_text font-semibold'>Sachi Shah</span>
      </p>
      <nav className='flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium'>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
            {...(link.download && { download: true })}
            className='hover:text-slate-900 transition-colors duration-200'
          >
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
