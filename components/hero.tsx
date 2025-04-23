"use client";

import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";

import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MagicButton } from "@/components/ui/magic-button";
import { AIScene } from "@/components/ui/ai-scene";
import { links } from "@/config";

export const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black-100 dark:bg-grid-white/[0.03]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />
      </div>

      <div className="relative z-10 my-10 flex flex-col justify-center lg:flex-row lg:items-center lg:gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[40vw] lg:items-start"
        >
          <h2 className="max-w-80 text-center text-xs uppercase tracking-widest text-blue-100 lg:text-left">
          AI & Automation Expert | Senior Manager at Deloitte Digital
          </h2>

          <TextGenerateEffect
            className="text-center text-[35px] md:text-4xl lg:text-5xl lg:text-left"
            words="Crafting Intelligent Digital Experiences with AI"
          />
<p className="mb-3 text-center text-xs sm:text-sm lg:text-left lg:text-sm tracking-normal">
  Hi, I'm Naveen, a Senior Manager and AI expert specializing in digital transformation using AI, ML, and Adobe Experience Manager (AEM). I build intelligent, scalable platforms that modernize legacy systems and enhance user experiences.
</p>



          <div className="flex gap-4">
            <Link href="#about">
              <MagicButton
                title="View my work"
                icon={<FaLocationArrow />}
                position="right"
                asChild
              />
            </Link>
            <Link href="#contact">
              <MagicButton
                title="Hire me"
                variant="outline"
                asChild
              />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 w-full lg:mt-0 lg:w-1/2"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur-xl"></div>
            <div className="relative overflow-hidden rounded-lg">
              <AIScene />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
