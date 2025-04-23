"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { keyframes, css } from "@emotion/react";

import { navItems } from "@/data";
import { cn } from "@/lib/utils";

// Define underline animation
const underline = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

// Create Emotion style for animated underline
const underlineStyle = css`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(to right, #a855f7, #ec4899);
    transform-origin: left;
    transform: scaleX(0);
    animation: ${underline} 0.3s forwards;
  }
`;

type FloatingNavProps = {
  navItems: typeof navItems;
  className?: string;
};

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      if (current < 50) {
        setVisible(true);
      } else {
        if (current > lastScrollY) {
          setVisible(false); // Scrolling down
        } else {
          setVisible(true); // Scrolling up
        }
      }
      setLastScrollY(current);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-3xl border border-white/[0.2] bg-black-100 px-5 py-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-md",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className="group relative px-3 py-1"
          >
            <span className="relative z-10 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-red-500">
              {navItem.name}
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-red-500 to-red-700 transition-all duration-300 group-hover:w-full"></span>
            <span className="absolute -inset-1 -z-10 scale-[0.8] rounded-lg opacity-0 blur transition duration-300 group-hover:scale-100 group-hover:opacity-10 bg-red-500"></span>
          </Link>
        ))}
      </motion.nav>
    </AnimatePresence>
  );
};
