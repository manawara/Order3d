import React from "react";
import { motion } from "framer-motion";

const loaderVariants = {
  animationOne: {},
};
const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <motion.div
        className="w-16 h-16 border-t-4 border-greenLight border-solid rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;
