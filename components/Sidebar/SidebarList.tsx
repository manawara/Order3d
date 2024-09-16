"use client";
import { Box, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { userRole } from "@/schema";

const SidebarList = () => {
  const pathName = usePathname();
  const slug = pathName.split("/").pop();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === userRole.ADMIN;
  let listItems = [
    {
      href: "/dashboard/orders",
      icon: <ShoppingCart size={20} strokeWidth={1} />,
      text: "Zamówienia",
      active: slug === "orders",
    },
    {
      href: "/dashboard/products",
      icon: <Box size={20} strokeWidth={1} />,
      text: "Produkty",
      active: slug === "products",
    },
    {
      href: "/dashboard/users",
      icon: <Users size={20} strokeWidth={1} />,
      text: "Użytkownicy",
      active: slug === "users",
    },
  ];

  if (!isAdmin) {
    listItems = listItems.filter((item) => item.text === "Zamówienia");
  }
  console.log(listItems);
  return (
    <ul className="text-greenLight text-xs flex flex-col gap-2">
      {listItems.map((item, index) => (
        <motion.li
          key={item.href}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link
            href={item.href}
            className={`flex gap-2 items-center p-2 rounded-md w-full 
              transition-colors duration-300 ease-in-out
              ${item.active ? "bg-green" : "hover:bg-green"}`}
          >
            {item.icon} {item.text}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default SidebarList;
