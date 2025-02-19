import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ISectionProps {
  children: React.ReactNode;
  delay?: number;
  isInView?: boolean;
}

const Section = (props: ISectionProps) => {
  const { children, delay } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.div>
  );
};

export default Section;
