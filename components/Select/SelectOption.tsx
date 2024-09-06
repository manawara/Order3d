import React from "react";
import { motion, Variants } from "framer-motion";
import { SelectOptionProps } from "../../types/Select.type";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300, // Increased stiffness for faster animation
      damping: 12, // Reduced damping for quicker stop
      delay: 0.02,
    },
  },
  closed: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};
const SelectOption = ({ label, onClick }: SelectOptionProps) => (
  <motion.li
    variants={itemVariants}
    className="p-2 px-4 truncate cursor-pointer hover:bg-green-200"
    onClick={onClick}
  >
    {label}
  </motion.li>
);

export default SelectOption;
