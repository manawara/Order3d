"use client";
import { useRef, useState } from "react";
import { CircleEllipsis, Delete } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@/hook/useOnClickOutside";
import Link from "next/link";
import { DropDownItem } from "@/types/DropDownDetails.type";
import { useSession } from "next-auth/react";
import { Role } from "@/types/User.type";

const DropDownDetails = ({
  id,
  data,
  onDelete,
}: {
  id: number | string | null;
  data: DropDownItem[];
  onDelete: (id: number | string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const session = useSession();
  const user = session.data?.user;
  useOnClickOutside(dropdownRef, () => setOpen(false));

  const handleDelete = (id: string | number) => {
    onDelete(id);
  };
  const handleOpenDropDown = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      className="relative top-0 left-0 flex justify-center"
      ref={dropdownRef}
    >
      <button onClick={handleOpenDropDown}>
        <CircleEllipsis />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: -10,
                opacity: 0,
              }}
              className="absolute top-7 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-greenLight mx-auto"
            />
            <motion.div
              className="absolute top-9 p-2 bg-greenLight z-20 rounded-md"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: -10,
                opacity: 0,
              }}
            >
              {data && (
                <ul>
                  {data.map((el) => (
                    <li key={el.name} className="py-1">
                      <Link
                        className="flex items-center gap-2"
                        href={`${el.link + id}`}
                      >
                        {el.icon}
                        {el.name}
                      </Link>
                    </li>
                  ))}
                  {user?.role === Role.ADMIN && (
                    <li className="py-1">
                      <button
                        onClick={() => handleDelete(id as number)}
                        className="flex items-center gap-2"
                      >
                        <Delete size={15} />
                        Usuń
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDownDetails;
