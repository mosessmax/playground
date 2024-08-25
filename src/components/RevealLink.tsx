import React from "react";
import { motion } from "framer-motion";

export const RevealLinks = () => {
return (
    <>
        <section className="bg-orange-400 h-screen flex justify-left items-left">
            <div className="grid place-content-center gap-2 px-8 py-24 text-black">
                <FlipLink href="#">WELCOME</FlipLink>
                <FlipLink href="#">TO</FlipLink>
                <FlipLink href="#">MY</FlipLink>
                <FlipLink href="#">PLAYGROUND</FlipLink>
            </div>
        </section>
    </>
);
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-3xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children && children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children && children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default RevealLinks;

        // <motion.div
        //     initial={{ opacity: 0, y: -100 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     exit={{ opacity: 0, y: 100 }}
        //     transition={{ duration: 0.5 }}
        // >
        //     <h1>Reveal Link</h1>
        // </motion.div>
