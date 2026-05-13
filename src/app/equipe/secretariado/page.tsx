"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

const membros = [
  {
    nome: "Ana Luisa Brito",
    cargo: "Secretary General",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Ana Luisa Brito.JPG",
  },
  {
    nome: "Leonardo Zanetti",
    cargo: "Under-Secretary General",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Leonardo Zenetti.JPG",
  },
  {
    nome: "Emily Dilser",
    cargo: "Secretária Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Emily Dilser.JPG",
  },
  {
    nome: "Kauan Oliveira",
    cargo: "Sub-Secretário Geral",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Kauan Oliveira.JPG",
  },
    {
    nome: "Letícia Leocadio",
    cargo: "Secretária Geral de Comunicação",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Letícia Leocadio.JPG",
  },
  {
    nome: "Gustavo Vezzá",
    cargo: "Sub-Secretário Geral de Comunicação",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imagem: "/time/secretarios/Gustavo Vezzá.JPG",
  },
];

export default function SecretariadoPage() {
  const [visible, setVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<(typeof membros)[number] | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(membros.length).fill(false)
  );

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FontAwesome) {
      (window as any).FontAwesome.dom.i2svg();
    }
  }, []);

  useEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedMember(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, i) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <main
      className={`min-h-screen overflow-x-hidden bg-white px-4 py-12 transition-all duration-500 dark:bg-[#0B1E2D] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        {/* Botão Voltar */}
        <Link
          href="/equipe"
          className="group mb-8 inline-flex items-center gap-2 rounded-xl bg-[#0B2A41]/70 px-4 py-2 text-sm font-medium text-yellow-custom shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:text-yellow-400"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Voltar para Equipe
        </Link>

        {/* Header */}
        <div className="mb-2 flex items-center gap-4">
          <div className="rounded-full bg-yellow-custom/10 p-4">
            <i className="fa-solid fa-user-tie text-3xl text-yellow-custom" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#0B2E4A] dark:text-white md:text-5xl">
              Secretariado Geral
            </h1>
            <p className="mt-1 text-sm text-[#36566F] dark:text-gray-400">
              Responsáveis pela coordenação geral do SenaMUN V
            </p>
          </div>
        </div>
        <div className="mb-16 mt-6 h-px w-full bg-gradient-to-r from-yellow-custom/40 via-transparent to-transparent" />

        {/* Lista de membros */}
        <div className="flex flex-col gap-10">
          {membros.map((membro, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                ref={(el) => { observerRefs.current[i] = el; }}
                className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ease-out ${
                  visibleItems[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Foto */}
                <button
                  type="button"
                  onClick={() => setSelectedMember(membro)}
                  aria-label={`Abrir foto de ${membro.nome}`}
                  className="relative w-full md:w-1/3 aspect-[2/3] max-h-[480px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={membro.imagem}
                    alt={membro.nome}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    draggable={false}
                  />
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </button>

                {/* Card informativo — sempre visível */}
                <div
                  className="w-full md:flex-1 transition-all duration-500 ease-out"
                >
                  <div className="border-2 border-yellow-custom rounded-2xl p-8 bg-[#0B1E2D]/60 dark:bg-[#0F2A3D]/80 backdrop-blur-sm shadow-xl">
                    {/* Nome */}
                    <h2 className="text-yellow-custom font-bold text-2xl md:text-3xl mb-1">
                      {membro.nome}
                    </h2>
                    {/* Cargo */}
                    <p className="text-light-blue-custom font-medium text-base mb-4">
                      {membro.cargo}
                    </p>
                    {/* Divisória */}
                    <div className="w-full h-px bg-yellow-custom/30 mb-4" />
                    {/* Bio */}
                    <p className="text-gray-300 dark:text-gray-400 text-sm font-light leading-relaxed">
                      {membro.bio}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {selectedMember &&
        isMounted &&
        createPortal(
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto de ${selectedMember.nome}`}
        >
          <button
            type="button"
            onClick={() => setSelectedMember(null)}
            className="fixed right-6 top-6 z-[90] text-2xl font-light leading-none text-white transition-transform duration-200 hover:scale-110 hover:text-yellow-custom focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-custom"
            aria-label="Fechar imagem"
          >
            x
          </button>

          <div
            className="flex w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative h-[70vh] w-full bg-transparent">
                <Image
                  src={selectedMember.imagem}
                  alt={selectedMember.nome}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white">
              {selectedMember.nome}
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-200">
              {selectedMember.cargo}
            </p>
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
