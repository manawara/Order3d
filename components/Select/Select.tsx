import { ChevronDown } from "lucide-react";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SelectOption from "./SelectOption";
import { SelectType } from "@/types/Select.type";
import useOnClickOutside from "@/hook/useOnClickOutside";

const Select = forwardRef<HTMLInputElement, SelectType>(
  ({ name, placeholder, label, data, onChange, value, ...rest }, ref) => {
    const [selectedOption, setSelectedOption] = useState(value || "");
    const [open, setOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(selectRef, () => setOpen(false));
    const handleOpenSelect = () => setOpen((prev) => !prev);

    useEffect(() => {
      setSelectedOption(value || "");
    }, [value]);

    const handleSelectOption = (option: string) => {
      setSelectedOption(option);
      setOpen(false);
      if (onChange) {
        onChange(option);
      }
    };

    return (
      <motion.div
        className="relative flex flex-col text-xs sm:w-2/3 mt-2"
        initial={false}
        animate={open ? "open" : "closed"}
        ref={selectRef}
      >
        <input
          type="hidden"
          ref={ref}
          name={name}
          value={selectedOption}
          onChange={(e) => handleSelectOption(e.target.value)}
          {...rest}
        />
        <label htmlFor={name}>{label}</label>
        <motion.button
          initial={false}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-green p-3 rounded-md flex justify-between items-center text-[#9CA3AF]"
          type="button"
          onClick={handleOpenSelect}
        >
          {selectedOption ? (
            <span className="text-greenLight truncate">{selectedOption}</span>
          ) : (
            placeholder
          )}
          <ChevronDown size={12} />
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.ul
              className="bg-green-500 mt-2 rounded-md absolute top-14 z-20  w-full bg-green border border-solid border-greenLight"
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
  }
);

Select.displayName = "Select";

export default Select;
