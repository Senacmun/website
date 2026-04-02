"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const membros = [
  {
    nome: "Leonardo",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    imagem: "/time/secretarios/Marina de Anna.JPG",
  },
  {
    nome: "Gustavo",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    imagem: "/time/secretarios/Giovanna Queiroz.JPG",
  },
  {
    nome: "Kauan",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    imagem: "/time/secretarios/Gabriela Sanches.JPG",
  },
  {
    nome: "Ana",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    imagem: "/time/secretarios/Brenno Figueiredo (2).JPG",
  },
  {
    nome: "Emily",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    imagem: "/time/secretarios/Marina de Anna.JPG",
  },
  {
    nome: "Letícia",
    cargo: "Secretariado Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    imagem: "/time/secretarios/Giovanna Queiroz.JPG",
  },
];

export default function SecretariadoPage() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const COUNT = membros.length;
  const AUTOPLAY_MS = 5000;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % COUNT);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FontAwesome) {
      (window as any).FontAwesome.dom.i2svg();
    }
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const selectMembro = (i: number) => {
    setCurrent(i);
    resetTimer();
  };

  const prev = () => {
    setCurrent((c) => (c - 1 + COUNT) % COUNT);
    resetTimer();
  };

  const next = () => {
    setCurrent((c) => (c + 1) % COUNT);
    resetTimer();
  };

  return (
    <main
      className={`min-h-screen overflow-x-hidden bg-white px-4 py-12 transition-all duration-500 dark:bg-[#0B1E2D] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <Link
          href="/equipe"
          className="group mb-8 inline-flex items-center gap-2 rounded-xl bg-[#0B2A41]/70 px-4 py-2 text-sm font-medium text-yellow-custom shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:text-yellow-400"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Voltar para Equipe
        </Link>

        <div className="mb-2 flex items-center gap-4">
          <div className="rounded-full bg-yellow-custom/10 p-4">
            <i className="fa-solid fa-user-tie text-3xl text-yellow-custom" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#0B2E4A] dark:text-white md:text-5xl">Secretariado Geral</h1>
            <p className="mt-1 text-sm text-[#36566F] dark:text-gray-400">Responsáveis pela coordenação geral do SenaMUN V</p>
          </div>
        </div>
        <div className="mb-16 mt-6 h-px w-full bg-gradient-to-r from-yellow-custom/40 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col items-center gap-16 xl:flex-row xl:justify-start">
        <div className="relative w-full max-w-2xl xl:-ml-8">
          <div className="relative h-[340px] w-full md:h-[380px]">
            {[-1, 0, 1].map((offset) => {
              const index = (current + offset + COUNT) % COUNT;
              const membro = membros[index];
              const isCenter = offset === 0;

              const offsetClass =
                offset === -1
                  ? "-translate-x-[48%] md:-translate-x-[56%] scale-[0.85] opacity-65 z-20"
                  : offset === 1
                    ? "translate-x-[48%] md:translate-x-[56%] scale-[0.85] opacity-65 z-20"
                    : "translate-x-0 scale-100 opacity-100 z-30";

              return (
                <button
                  key={`${index}-${offset}`}
                  type="button"
                  onClick={() => selectMembro(index)}
                  className={`absolute left-1/2 top-1/2 h-60 w-40 -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 ease-out md:h-[320px] md:w-52 ${offsetClass}`}
                >
                  <Image
                    src={membro.imagem}
                    alt={membro.nome}
                    fill
                    className={`object-cover object-top transition-all duration-700 ${
                      isCenter ? "grayscale-0" : "grayscale"
                    }`}
                    draggable={false}
                  />
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/35 transition-all duration-500 hover:bg-black/20" />
                  )}
                  {isCenter && (
                    <div className="pointer-events-none absolute inset-0 ring-2 ring-yellow-custom ring-offset-2 ring-offset-[#0B1E2D]" />
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onClick={prev}
              className="absolute left-52 top-1/2 z-40 -translate-y-1/2 p-2 text-[#0B2E4A]/80 transition-all duration-300 hover:scale-125 hover:text-[#0B2E4A] dark:text-white/40 dark:hover:text-white"
              aria-label="Membro anterior"
            >
              <i className="fa-solid fa-chevron-left text-lg" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-0 top-1/2 z-40 -translate-y-1/2 p-2 text-[#0B2E4A]/80 transition-all duration-300 hover:scale-125 hover:text-[#0B2E4A] dark:text-white/40 dark:hover:text-white"
              aria-label="Próximo membro"
            >
              <i className="fa-solid fa-chevron-right text-lg" />
            </button>
          </div>
        </div>

        <div
          key={current}
          className="animate-fade-in w-full max-w-sm rounded-2xl border-2 border-yellow-custom bg-[#0B1E2D]/60 p-8 shadow-xl backdrop-blur-sm dark:bg-[#0F2A3D]/80"
        >
          <h2 className="mb-1 text-3xl font-bold text-yellow-custom">{membros[current].nome}</h2>
          <p className="mb-4 text-base font-medium text-light-blue-custom">{membros[current].cargo}</p>
          <div className="mb-4 h-px w-full bg-yellow-custom/30" />
          <p className="text-sm font-light leading-relaxed text-gray-300">{membros[current].bio}</p>

          <div className="mt-6 flex gap-2">
            {membros.map((_, i) => (
              <button
                key={i}
                onClick={() => selectMembro(i)}
                style={{ transition: "all 0.4s ease" }}
                className={`h-1.5 rounded-full ${i === current ? "w-8 bg-yellow-custom" : "w-2 bg-gray-500"}`}
                aria-label={`Selecionar membro ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

