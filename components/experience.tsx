"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExperienceTimeline } from "@/components/ui/experience-timeline";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  // Instead of using refs on BentoGridItem, we'll animate them using class selectors

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate section title
    gsap.fromTo(
      ".section-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );



    // Animate skills items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    });

    // Animate certification items
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 max-w-[90rem] mx-auto" ref={sectionRef}>
      <div className="section-title mb-16">
        <h1 className="heading">
          Professional <span className="text-purple">Experience</span>
        </h1>
        <p className="mx-auto mt-4 max-w-4xl text-center text-xl md:text-2xl text-white/70">
          Transforming legacy systems into cutting-edge digital platforms with AI, ML, and automation
        </p>
      </div>

      {/* Career Timeline */}
      <ExperienceTimeline />



      {/* Skills & Certifications */}
      <div className="mt-24" ref={skillsRef}>
        <div id="technical-skills" className="expertise-intro mb-12 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Technical Skills</h2>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Combined Skills */}
          <div className="flex flex-wrap gap-4">
            {[
              "Adobe Experience Manager (AEM)",
              "Python",
              "Java",
              "Machine Learning",
              "Artificial Intelligence",
              "RESTful Services",
              "AEM",
              "SOA",
              "Adobe LiveCycle Designer",
              "Android",
              "Web Development",
              "Adobe LiveCycle",
              "Agile Methodologies",
              "Web Services",
              "SDLC",
              "XML",
              "Java EE",
              "SQL",
              "Software Development",
              "Databases",
              "Requirements Analysis",
              "SOAP",
              "Spring",
              "Consulting",
              "Oracle",
              "Business Analysis"
            ].map((skill, index) => (
              <span
                key={index}
                className="skill-item opacity-0 transform translate-y-4 rounded-lg border border-purple-500/30 px-4 py-2 text-base font-medium text-purple-200 transition-all duration-500 hover:border-purple-500/70 hover:bg-gradient-to-r hover:from-[#6366f1]/20 hover:via-[#a855f7]/20 hover:to-[#ec4899]/20 hover:scale-110 hover:rotate-1 hover:shadow-lg hover:shadow-purple-500/30 hover:text-white group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#6366f1]/10 before:via-[#a855f7]/10 before:to-[#ec4899]/10 before:translate-y-full before:hover:translate-y-0 before:transition-transform before:duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
