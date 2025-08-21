"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Section {
  id: string;
  labelKey: string;
}

const SideNavigation: React.FC = () => {
  const t = useTranslations("SideNavigation");
  const [activeSection, setActiveSection] = useState<string>("hero");

  const sections: Section[] = useMemo(() => [
    { id: "hero", labelKey: "home" },
    { id: "about", labelKey: "about" },
    { id: "group", labelKey: "group" },
    { id: "certifications", labelKey: "certifications" },
    { id: "products", labelKey: "products" },
    { id: "news", labelKey: "news" },
    { id: "stats", labelKey: "stats" },
    { id: "newsletter", labelKey: "newsletter" },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden md:block fixed top-1/2 right-30 h-64 w-5 bg-transparent rounded-l-full flex flex-col justify-center items-center gap-3 transform -translate-y-1/2  z-50"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${activeSection === section.id
            ? "bg-[#E3A347] shadow-lg"
            : "bg-[#E2E2E2] hover:bg-gray-400"
            }`}
          title={t(section.labelKey)}
        />
      ))}
    </motion.div>
  );
};

export default SideNavigation;
