"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const membros = [
  {
    nome: "Leonardo",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Marina de Anna.JPG",
  },
  {
    nome: "Gustavo",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Giovanna Queiroz.JPG",
  },
  {
    nome: "Kauan",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Gabriela Sanches.JPG",
  },
  {
    nome: "Ana",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Brenno Figueiredo (2).JPG",
  },
  {
    nome: "Emily",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Marina de Anna.JPG",
  },
  {
    nome: "Letícia",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Giovanna Queiroz.JPG",
  },
];

export default function SecretariadoPage() {
  const [current, setCurrent] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef<number | null>(null);
  const DRAG_THRESHOLD = 60;
  const SLIDE_WIDTH = 280;
  const AUTOPLAY_MS = 5000;

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FontAwesome) {
      (window as any).FontAwesome.dom.i2svg();
    }
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % membros.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slideTo = (dir: "left" | "right") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTrackOffset(dir === "right" ? -SLIDE_WIDTH : SLIDE_WIDTH);
    setTimeout(() => {
      setCurrent((c) =>
        dir === "right"
          ? (c + 1) % membros.length
          : (c - 1 + membros.length) % membros.length,
      );
      setIsTransitioning(false);
      setTrackOffset(0);
    }, 350);
    resetTimer();
  };

  const prev = () => slideTo("left");
  const next = () => slideTo("right");

  const goTo = (i: number) => {
    const dir = i > current ? "right" : "left";
    slideTo(dir);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === null || isTransitioning) return;
    const diff = e.clientX - dragStartX.current;
    setTrackOffset(diff * 0.4);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > DRAG_THRESHOLD) {
      slideTo(diff < 0 ? "right" : "left");
    } else {
      setIsTransitioning(true);
      setTrackOffset(0);
      setTimeout(() => setIsTransitioning(false), 350);
    }
    dragStartX.current = null;
  };

  const handleMouseLeave = () => {
    if (dragStartX.current !== null) {
      setIsTransitioning(true);
      setTrackOffset(0);
      setTimeout(() => setIsTransitioning(false), 350);
      dragStartX.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null || isTransitioning) return;
    const diff = e.touches[0].clientX - dragStartX.current;
    setTrackOffset(diff * 0.4);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(diff) > DRAG_THRESHOLD) {
      slideTo(diff < 0 ? "right" : "left");
    } else {
      setIsTransitioning(true);
      setTrackOffset(0);
      setTimeout(() => setIsTransitioning(false), 350);
    }
    dragStartX.current = null;
  };

  return (
    <main
      className={`min-h-screen bg-white px-6 py-10 transition-all duration-500 dark:bg-[#0B1E2D] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <Link
          href="/equipe"
          className="group inline-flex items-center gap-2 text-yellow-custom hover:text-yellow-400 font-semibold text-base mb-8 transition-all duration-200"
        >
          <span className="inline-block text-lg font-bold leading-none transition-transform duration-300 group-hover:-translate-x-1 group-active:-translate-x-2">
            ←
          </span>
          Voltar para Equipe
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="bg-yellow-custom/10 dark:bg-yellow-custom/20 rounded-full p-4 flex items-center justify-center">
            <i className="fa-solid fa-user-tie text-yellow-custom text-3xl" />
          </div>
          <div>
            <h1 className="text-white dark:text-white font-bold text-4xl md:text-5xl">
              Secretariado Geral
            </h1>
            <p className="text-gray-400 dark:text-gray-400 text-sm mt-1">
              Responsáveis pela coordenação geral do SenaMUN V
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-yellow-custom/40 via-transparent to-transparent mt-6 mb-10" />
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <div
            className="relative w-full select-none overflow-hidden py-8"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: "grab" }}
          >
            <div
              className="flex items-center justify-center gap-4"
              style={{
                transform: `translateX(${trackOffset}px)`,
                transition: isTransitioning
                  ? "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  : "none",
                willChange: "transform",
              }}
            >
              {[-1, 0, 1].map((offset) => {
                const index = (current + offset + membros.length) % membros.length;
                const membro = membros[index];
                const isCenter = offset === 0;

                return (
                  <div
                    key={`${index}-${offset}`}
                    onClick={() => !isCenter && goTo(index)}
                    className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-xl ${
                      isCenter
                        ? "w-64 md:w-72 h-80 md:h-96 opacity-100 scale-100 z-20"
                        : "w-48 md:w-56 h-68 md:h-80 opacity-50 scale-95 z-10 blur-[1px] hover:opacity-70 hover:blur-0"
                    }`}
                    style={{
                      transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    <Image
                      src={membro.imagem}
                      alt={membro.nome}
                      fill
                      className="object-cover object-top"
                      draggable={false}
                    />
                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/30 transition-all duration-300 hover:bg-black/10" />
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={prev}
              className="absolute left-0 top-1/2 z-30 -translate-y-1/2 p-2 text-white/50 transition-all duration-300 hover:scale-110 hover:text-white"
              aria-label="Membro anterior"
            >
              <i className="fa-solid fa-chevron-left text-xl" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 z-30 -translate-y-1/2 p-2 text-white/50 transition-all duration-300 hover:scale-110 hover:text-white"
              aria-label="Próximo membro"
            >
              <i className="fa-solid fa-chevron-right text-xl" />
            </button>

            <div className="mt-6 flex justify-center gap-2">
              {membros.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-yellow-custom"
                      : "w-2 bg-gray-400 dark:bg-slate-600"
                  }`}
                  aria-label={`Ir para membro ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          key={current}
          className="w-full rounded-2xl border-2 border-yellow-custom bg-[#0B1E2D]/60 p-6 shadow-xl backdrop-blur-sm animate-fade-in dark:bg-[#0F2A3D]/80 md:w-1/2"
        >
          <h2 className="mb-1 text-2xl font-bold text-yellow-custom md:text-3xl">
            {membros[current].nome}
          </h2>
          <p className="mb-4 text-base font-medium text-light-blue-custom">
            {membros[current].cargo}
          </p>
          <div className="mb-4 h-px w-full bg-yellow-custom/30" />
          <p className="text-sm font-light leading-relaxed text-gray-300 dark:text-gray-400">
            {membros[current].bio}
          </p>
        </div>
      </div>
    </main>
  );
}



