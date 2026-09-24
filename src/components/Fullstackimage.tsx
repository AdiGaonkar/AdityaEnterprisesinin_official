import React from 'react';
import { motion } from 'framer-motion';

const Fullstackimage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="relative mx-auto max-w-5xl mt-20"
    >
      <div className="glass rounded-xl overflow-hidden">
        <img
          src="\Add a heading.png"
          alt="CryptoTrade Dashboard"
          className="w-full h-auto"
        />
      </div>
    </motion.div>
  );
};

export default Fullstackimage;
