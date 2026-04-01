"use client";

import React, { useEffect, useState, useRef } from "react";
import { FiMoon, FiSun, FiChevronLeft } from "react-icons/fi";

const STORAGE_KEY = "site-theme";
const HIDE_KEY = "theme-toggle-hidden";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [minimized, setMinimized] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const lastScroll = useRef<number>(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
      const savedHide = localStorage.getItem(HIDE_KEY);

      if (saved === "dark") setTheme("dark");
      if (savedHide === "1") setMinimized(true);
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(HIDE_KEY, minimized ? "1" : "0");
    } catch {}
  }, [minimized]);

  useEffect(() => {
    let raf = 0;

    function onScroll() {
      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const current = window.scrollY || window.pageYOffset;
        const isDown = current > lastScroll.current && current > 40;

        lastScroll.current = current;
        setVisible(!isDown);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const toggleMinimized = () => {
    setMinimized((v) => !v);
  };

  return (
    <>
      {children}

      {/* BOTÃO DARK MODE */}
      <div
        className={`
          fixed bottom-4 right-4 z-[9999]
          flex items-center gap-2 h-12
          transition-all duration-300 ease-in-out
          ${minimized ? "translate-x-4 opacity-90" : ""}
          ${!visible && !minimized ? "translate-y-16 opacity-0 pointer-events-none" : ""}
        `}
      >
        {/* BOTÃO TEMA */}
        <button
          onClick={toggleTheme}
          title="Alternar tema"
          className={`w-12 h-12 rounded-full bg-[#1F6FEB] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
            minimized ? "opacity-0 scale-75 pointer-events-none w-0" : "opacity-100 scale-100 w-12"
          }`}
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        {/* BOTÃO ESCONDER */}
        <button
          onClick={toggleMinimized}
          title="Minimizar"
          className="w-9 h-9 rounded-lg bg-[#1F6FEB] text-white flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300"
        >
          <FiChevronLeft
            size={16}
            className={`transition-transform duration-300 ${
              minimized ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
}