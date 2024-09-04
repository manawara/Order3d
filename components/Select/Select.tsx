import { ChevronDown } from "lucide-react";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import SelectOption from "./SelectOption";
import { SelectType } from "@/types/Select.type";
import useOnClickOutside from "@/hook/useOnClickOutside";
const listVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 22,
      staggerChildren: 0.02,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, when: "afterChildren" },
  },
};

const Select = ({ name, placeholder, label, data }: SelectType) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const selectRef = useRef(null);
  useOnClickOutside(selectRef, () => setOpen(false));
  const handleOpenSelect = () => setOpen((prev) => !prev);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
  };

  return (
    <motion.div
      className="relative flex flex-col text-xs w-1/2 mt-2"
      initial={false}
      animate={open ? "open" : "closed"}
      ref={selectRef}
    >
      <input type="hidden" name={name} value={selectedOption} />
      <label>{label}</label>
      <motion.button
        initial={false}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-green p-3 rounded-md flex justify-between items-center text-[#9CA3AF]"
        type="button"
        onClick={handleOpenSelect}
      >
        {selectedOption ? (
          <span className="text-greenLight">{selectedOption}</span>
        ) : (
          placeholder
        )}
        <ChevronDown size={12} />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="bg-green-500 mt-2 rounded-md absolute top-14 z-20 w-full bg-green"
            variants={listVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {data.map((item) => (
              <SelectOption
                key={item.id}
                label={item.value}
                onClick={() => handleSelectOption(item.value)}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Select;
