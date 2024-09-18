import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  content: string;
}

const sections: Section[] = [
  { id: 'intro', title: 'Introduction', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 'features', title: 'Features', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 'benefits', title: 'Benefits', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: 'conclusion', title: 'Conclusion', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
];

const Scrollbar: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const controls = useAnimation();

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const newScrollPercentage = (scrollPosition / (fullHeight - windowHeight)) * 100;
    setScrollPercentage(newScrollPercentage);

    // determine active section
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          setActiveSection(section.title);
          break;
        }
      }
    }

    setIsScrolling(true);
    controls.start({ opacity: 1, x: 0 });
  }, [controls]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isScrolling) {
      const timer = setTimeout(() => {
        setIsScrolling(false);
        controls.start({ opacity: 0, x: '100%' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isScrolling, controls]);

  return (
    <div className="relative min-h-screen p-8 bg-white">
      <style>{`
        html {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-20">
          <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
          <p>{section.content.repeat(20)}</p>
        </section>
      ))}
      <AnimatePresence>
        {isScrolling && (
          <motion.div
            className="fixed top-0 flex items-center justify-center w-6 h-full right-4"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-5 h-full overflow-hidden bg-gray-300 rounded-full">
              <motion.div
                className="absolute w-3 h-12 transform -translate-x-1/2 bg-black rounded-full left-1/2"
                style={{ top: `${scrollPercentage}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            {activeSection && (
              <div className="absolute px-2 py-1 mr-4 text-sm text-white bg-black rounded right-full whitespace-nowrap">
                {activeSection}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scrollbar;