"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Slide {
  name: string;
  role: string;
  text: string;
  image: string;
}

const slides: Slide[] = [
  {
    name: "Ana Silva",
    role: "Coordenadora",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/secretariat1.jpg",
  },
  {
    name: "Bruno Costa",
    role: "Vice-coordenador",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/secretariat2.jpg",
  },
  {
    name: "Carla Rodrigues",
    role: "Secretária",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/secretariat3.jpg",
  },
  {
    name: "Diego Martins",
    role: "Chefe de Cerimonial",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/secretariat4.jpg",
  },
  {
    name: "Elisa Freitas",
    role: "Relações Públicas",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/secretariat5.jpg",
  },
];

export default function SecretariatCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const AUTOPLAY_MS = 25000; // 25s

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setCurrent(i);

  // reset interval helper
  const resetInterval = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    // @ts-ignore - window.setInterval returns number in browser
    intervalRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, AUTOPLAY_MS) as unknown as number;
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset timer when user navigates manually
  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      // small timeout to ensure state applied before restarting
      intervalRef.current = window.setInterval(() => {
        setCurrent((c) => (c + 1) % slides.length);
      }, AUTOPLAY_MS) as unknown as number;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div className="relative overflow-hidden rounded-2xl h-[400px] md:h-[500px]">
      {/* slides stack */}
      {slides.map((s, i) => {
        const active = i === current;
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              active
                ? "opacity-100 blur-0 scale-100 z-20"
                : "opacity-0 blur-sm scale-105 z-10 pointer-events-none"
            }`}
            style={{ backgroundImage: `url(${s.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-30 h-full flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-3xl text-center md:text-left text-white">
                  <h3 className={`text-2xl md:text-4xl font-bold transition-all duration-700 ease-in-out ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    {s.name}
                  </h3>
                  <p className={`mt-2 text-sm md:text-lg font-medium transition-all duration-700 ease-in-out ${active ? "opacity-100 translate-y-0 delay-75" : "opacity-0 translate-y-2"}`}>
                    {s.role}
                  </p>
                  <p className={`mt-4 text-sm md:text-base text-gray-200 transition-all duration-700 ease-in-out ${active ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-2"}`}>
                    {s.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* nav buttons */}
      <button
        onClick={() => {
          prev();
        }}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full z-40 transition-colors"
      >
        <FiChevronLeft size={20} />
      </button>

      <button
        onClick={() => {
          next();
        }}
        aria-label="Próximo"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full z-40 transition-colors"
      >
        <FiChevronRight size={20} />
      </button>

      {/* indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-40 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-1.5 md:h-2 w-8 md:w-12 rounded-full transition-all duration-300 ${
              i === current ? "bg-yellow-custom scale-105" : "bg-gray-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
