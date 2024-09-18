import { useState, useEffect, Suspense } from 'react';
import moment from "moment-timezone";
// import { getTimeOfDay } from '../utils/getTime';
import { Sun, Moon, Cloud, Star} from "@phosphor-icons/react"
import { motion, AnimatePresence } from 'framer-motion';

const getTimeOfDay = (time: moment.Moment): string => {
  const hour = time.hour();

  if (hour >= 5 && hour < 12) {
      return "morning";
  }

  if (hour >= 12 && hour < 17) {
      return "afternoon";
  }

  if (hour >= 17 && hour < 20) {
      return "evening";
  }

  return "night";
};

const CurrentTime = () => {
    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const [location, setLocation] = useState<string>("loading...");
    const [time, setTime] = useState<moment.Moment | null>(null);
    const [timeOfDay, setTimeOfDay] = useState<string>("");

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTime(moment());
    //     }, 1000);

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    useEffect(() => {
        const fetchLocationAndTime = async () => {
            try {
                const locationData = { city: "Lagos", timezone: "Africa/Lagos" };
                const currentTime = moment().tz(locationData.timezone);
                setLocation(locationData.city);
                setTime(currentTime);
                setTimeOfDay(getTimeOfDay(currentTime));
            } catch (error) {
                console.error("error fetching location and time: ", error);
            }
        };

        fetchLocationAndTime();
    }, []);

    const renderIcon = () => {
        switch (timeOfDay) {
          case "morning":
            return <Sun size={12} weight="fill" />;
          case "afternoon":
            return <Cloud size={12} weight="fill" />;
          case "evening":
            return <Moon size={12} weight="fill" />;
          case "night":
            return <Star size={12} weight="fill" />;
          default:
            return null;
        }
      };

    return (
        <AnimatePresence>
          <motion.div
            key={`${location}-${timeOfDay}`}
            className="flex items-center gap-2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                {renderIcon()}
              </Suspense>
            </motion.div>
            {time && (
              <motion.span
                className="text-xs transition duration-150 text-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                {location}, {time.format("h")}
                <motion.span
                  className="animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  :
                </motion.span>
                {time.format("mm A")}
              </motion.span>
            )}
          </motion.div>
        </AnimatePresence>
      );
    };



    export default CurrentTime;