import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import App from '../App';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsDegrees = (time.getSeconds() / 60) * 360;
  const minutesDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
  const hoursDegrees = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
    {/* <div className="flex items-center justify-center min-h-screen text-white bg-black"> */}
    <div className="flex flex-col items-center">
      <div className="relative px-5 transition-shadow duration-300 ease-in-out bg-gray-100 rounded-full shadow-lg w-80 h-80 hover:shadow-xl">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-white rounded-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-lg font-semibold text-gray-800"
              style={{
                top: '47%',
                left: '48%',
                transform: `rotate(${i * 30}deg) translateY(-120px) rotate(-${i * 30}deg)`,
              }}
            >
              {i === 0 ? '12' : i}
            </div>
          ))}

          {/* markers */}
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className={`absolute bg-gray-400 ${i % 5 === 0 ? 'w-1 h-3' : 'w-0.5 h-1.5'}`}
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 6}deg) translateY(-140px)`,
              }}
            />
          ))}

          {/* hour hand */}
          <motion.div
            className="absolute w-1.5 h-20 bg-black rounded-full origin-bottom"
            style={{
              top: '25%',
              left: 'calc(50% - 0.75px)',
              transformOrigin: '50% 100%',
            }}
            animate={{ rotate: hoursDegrees }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />

          {/* minute hand */}
          <motion.div
            className="absolute w-1 origin-bottom bg-black rounded-full h-28"
            style={{
              top: '17%',
              left: 'calc(50% - 0.5px)',
              transformOrigin: '50% 100%',
            }}
            animate={{ rotate: minutesDegrees }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          />

          {/* second hand */}
          <motion.div
            className="absolute w-0.5 h-32 bg-green-500 rounded-full origin-bottom"
            style={{
              top: '10%',
              left: '50%',
              transformOrigin: '50% 100%',
            }}
            animate={{ rotate: secondsDegrees }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />

          {/* center dot */}
          <div className="absolute w-3 h-3 bg-green-500 rounded-full" style={{ top: 'calc(50% - 6px)', left: 'calc(50% - 6px)' }} />
        </motion.div>
      </div>
      
    <div className="p-4 mt-4 bg-gray-200 rounded-lg shadow-inner">
        <div className="font-mono text-2xl font-semibold text-gray-800">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
    </div>

      <div className="mt-2 text-lg text-gray-600">
        {formatDate(time)}
      </div>
    </div>
    {/* </div> */}
    <App />
    </>
  );
};

export default Clock;