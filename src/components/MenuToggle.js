import React from 'react';
import { motion } from 'framer-motion';

export const MenuToggle = ({ toggle }) => (
  <button onClick={toggle} className="md:hidden text-gray-800">
    <motion.img
      src="/menu.png"
      alt="Menu"
      className="w-10 h-10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    />
  </button>
);
