"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import DirectorHeroBanner from "@/components/DirectorHeroBanner";

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
    bio: "Olá! Sou o Leonardo, Under Secretary General da conferência. Tenho 17 anos, estou desde 2025 no SenaMUN, já fui em 10 conferências e sou um dos secretários responsáveis pelo setor acadêmico e de imprensa do evento.",
    imagem: "/time/secretarios/Leonardo Zenetti.JPG",
  },
  {
    nome: "Emily Dilser",
    cargo: "Secretária Geral",
    bio: "Olá, senhores delegados! Me chamo Emily, tenho 17 anos, estudo no Senac Nações Unidas e tenho a honra de ser a Secretária-Geral da 5ª edição do SenaMUN. Ingressei no SenaMUN em 2024, ainda no meu 1⁰ ano do Ensino Médio, e acabei por me encontrar no mundo das simulações. Desde então nunca mais parei!",
    imagem: "/time/secretarios/Emily Dilser.JPG",
  },
  {
    nome: "Kauan Oliveira",
    cargo: "Sub-Secretário Geral",
    bio: "Oii! Me chamo Kauan e sou vice-secretário geral de português do Senamun! Tenho 17 anos e estou no senamun desde 2023, já fui em torno de 20+ simulações, sendo só uma sendo mesa. Dentro do projeto, sou responsável pela equipe acadêmica e imprensa!!",
    imagem: "/time/secretarios/Kauan Oliveira.JPG",
  },
    {
    nome: "Letícia Leocadio",
    cargo: "Secretary General of Communication",
    bio: "Oi gente, meu nome é Leticia Leocadio, estou cursando meu último ano em marketing no Senac Nações Unidas. Faço simulações da ONU desde o meu primeiro ano do ensino médio e desde então as simulações da ONU ganharam um grande espaço na minha vida, mudando vários aspectos dela. Atualmente já fiz mais de 10 simulações, explorando todas as funções, delegada, mesária, imprensa e agora tenho a honra de estrear o cargo de General Secretary of Communication no Senamun V! Estou extremamente animada para conhecer vocês e espero que vocês aproveitem essa edição do Senamun e que também aproveitem as postagens nas redes sociais que foram preparados com muito carinho e dedicação. Vejo vocês em breve, beijos Leticia!",
    imagem: "/time/secretarios/Letícia Leocadio.JPG",
  },
  {
    nome: "Gustavo Vezzá",
    cargo: "Secretário Geral de Comunicação",
    bio: "Olá! Eu sou o Gustavo o Secretário Geral de Comunicação, tenho 17 anos e estou no Senamun desde 2025, já fui para 8 conferencias e criei memórias incriveis em todas elas. Nessa edição, eu sou o responsável por toda a comunicação do Senamun.",
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
      className={`min-h-screen overflow-x-hidden bg-white dark:bg-[#0B1E2D] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <DirectorHeroBanner
        title="Secretariado Geral"
        subtitle="Responsáveis pela coordenação geral do SenaMUN V"
        image="/images/diretorias/Secretariado.jpg"
      />

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Lista de membros */}
        <div className="flex flex-col gap-6 md:gap-10">
          {membros.map((membro, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                ref={(el) => { observerRefs.current[i] = el; }}
                className={`flex flex-col md:flex-row items-center gap-3 md:gap-8 transition-all duration-700 ease-out ${
                  visibleItems[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Foto */}
                <button
                  type="button"
                  onClick={() => setSelectedMember(membro)}
                  aria-label={`Abrir foto de ${membro.nome}`}
                  className="relative w-full md:w-1/3 aspect-[2/3] max-h-[480px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-gray-50 dark:bg-[#0d1b2e]/20"
                >
                  <Image
                    src={membro.imagem}
                    alt={membro.nome}
                    fill
                    className="object-contain object-top transition-transform duration-500 hover:scale-105"
                    draggable={false}
                  />
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Efeito de Ondinha */}
                  <svg
                    className="pointer-events-none absolute bottom-[-1px] left-0 z-20 h-[45px] w-full"
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      className="fill-white dark:fill-[#0B1E2D] transition-colors duration-500"
                      d="M0 120V72L60 66C120 60 240 48 360 52C480 56 600 76 720 78C840 80 960 64 1080 54C1200 44 1320 40 1380 38L1440 36V120H0Z"
                    />
                  </svg>
                </button>

                {/* Card informativo — sempre visível */}
                <div className="w-full md:flex-1 transition-all duration-500 ease-out">
                  <div className="border-2 border-yellow-custom rounded-2xl p-4 md:p-8 bg-white dark:bg-[#0B1E2D]/60 backdrop-blur-sm shadow-xl">
                    {/* Nome */}
                    <h2 className="text-yellow-custom font-bold text-2xl md:text-3xl mb-1">
                      {membro.nome}
                    </h2>
                    {/* Cargo */}
                    <p className="text-light-blue-custom font-medium text-base mb-4">
                      {membro.cargo} — Secretariado Geral
                    </p>
                    {/* Divisória */}
                    <div className="w-full h-px bg-yellow-custom/30 mb-4" />
                    {/* Bio */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-light leading-relaxed whitespace-pre-line">
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
            className="fixed right-6 top-6 z-[90] text-4xl font-light leading-none text-white transition-transform duration-200 hover:scale-110 hover:text-yellow-custom focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-custom"
            aria-label="Fechar imagem"
          >
            &times;
          </button>

          <div
            className="flex w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-2xl">
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
            <p className="mt-1 text-sm font-medium text-gray-300">
              {selectedMember.cargo} — Secretariado Geral
            </p>
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
