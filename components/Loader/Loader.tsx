import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-10 w-full h-24">
      <motion.div
        className="w-16 h-16 border-t-4 border-transparent border-t-greenLight border-solid rounded-full box-border"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </div>
  );
};

export default Loader;
