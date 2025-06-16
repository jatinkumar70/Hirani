"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { Separator } from "../../../../ui/Separator/Separator";
import { User } from "../../../../../types/types";
import { Album, CircleUser, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../ui/Avatar/Avatar";
import { useRouter } from "next/router";

interface UserDropdownProps {
  open: boolean;
  handleToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
  isUser: User | null;
  handleSignOut: () => void;
  isColor: boolean;
}

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export const UserDropdown: React.FC<UserDropdownProps> = ({
  open,
  handleToggle,
  isUser,
  handleSignOut,
  isColor,
}) => {
  const router = useRouter();
  const isMyBookingsPage = router.pathname === "/my-bookings";
  const isMyAccountPage = router.pathname === "/my-account";
  const menuItems = isUser
    ? [
        ...(!isMyAccountPage
          ? [
              {
                href: "/my-account",
                icon: <CircleUser size={20} />,
                label: "My Account",
              },
            ]
          : []),
        ...(!isMyBookingsPage
          ? [
              {
                href: "/my-bookings",
                icon: <Album size={20} />,
                label: "My Bookings",
              },
            ]
          : []),
        {
          action: handleSignOut,
          icon: <LogOut size={20} />,
          label: "Sign Out",
        },
      ]
    : [
        { href: "/login", icon: <CiLogin size={20} />, label: "Log in" },
        {
          href: "/register",
          icon: <AiOutlineUserAdd size={20} className="font-semibold" />,
          label: "Register",
        },
      ];
  return (
    <div
      className="flex cursor-pointer items-center relative"
      onClick={handleToggle}>
      {isUser ? (
        <Avatar className="border-[#D4B779] border-4 h-10 shadow-lg w-10 duration-300 group-hover:scale-105 transition-transform">
          <AvatarImage src={isUser?.photo} alt={isUser?.name} />
          <AvatarFallback className="bg-amber-100 text-amber-800 text-sm font-semibold">
            {isUser?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <FaUserCircle
          className={`${
            isColor ? "text-primary-gold" : "text-gray-100"
          } text-3xl`}
        />
      )}

      {open && (
        <motion.div
          className="bg-white rounded-md shadow-lg text-gray-800 w-40 -translate-x-1/2 absolute right-4 top-12 transform z-50"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
              {item.href ? (
                <Link href={item.href}>
                  <div className="flex border-b border-gray-200 cursor-pointer hover:bg-gray-100 items-center last:border-1 px-4 py-3">
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              ) : (
                <div
                  onClick={item.action}
                  className={`flex items-center px-4 py-3 cursor-pointer border-b border-gray-400 last:border-1 
                   ${
                     item.label === "Sign Out"
                       ? " text-red-500 border-none"
                       : "hover:bg-gray-100"
                   }
                `}>
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              )}
              {index < menuItems.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </motion.div>
      )}
    </div>
  );
};
