﻿"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import DirectorHeroBanner from "@/components/DirectorHeroBanner";

const membros = [
  {
    nome: "Ana Luisa Brito",
    cargo: "Secretary General",
    bio: "Esteemed Delegates, My name is Ana Luisa Brito, and it is with great honor and enthusiasm that I present myself as the Secretary-General of SENAMUN V!! I began my journey in Model United Nations in 2024, and since then, I have dedicated myself actively and consistently to this community, immersing myself in an environment that quickly became one of my greatest passions. I am truly honored to have the opportunity to contribute to SENAMUN V and help create an enriching, welcoming, and unforgettable experience for every delegate involved.",
    bioPT: "Prezados Delegados, Meu nome é Ana Luisa Brito e é com grande honra e entusiasmo que me apresento como Secretária-Geral da SENAMUN V!! Iniciei minha jornada no Model United Nations em 2024 e, desde então, tenho me dedicado ativa e consistentemente a essa comunidade, mergulhando em um ambiente que rapidamente se tornou uma das minhas maiores paixões. Estou verdadeiramente honrada por ter a oportunidade de contribuir com o SENAMUN V e ajudar a criar uma experiência enriquecedora, acolhedora e inesquecível para cada delegado envolvido.",
    imagem: "/time/secretarios/Ana Luisa Brito.JPG",
  },
  {
    nome: "Leonardo Zanetti",
    cargo: "Under-Secretary General",
    bio: "Hello! I am Leonardo, the conference's Under-Secretary General. I am 17 years old and have been with SenaMUN since 2025. I have attended 10 conferences and am one of the secretaries responsible for the event's academic and press sectors.",
    bioPT: "Olá! Sou o Leonardo, Under Secretary General da conferência. Tenho 17 anos, estou desde 2025 no SenaMUN, já fui em 10 conferências e sou um dos secretários responsáveis pelo setor acadêmico e de imprensa do evento.",
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
    cargo: "Secretary of Communications",
    bio: "Hi everyone, my name is Leticia Leocadio, and I am in my final year of marketing at Senac Nações Unidas. I have been doing UN simulations since my first year of high school, and since then, MUNs have gained a huge place in my life, changing several aspects of it. Currently, I have participated in over 10 simulations, exploring all roles: delegate, chair, press, and now I have the honor of debuting the role of General Secretary of Communication at SenaMUN V! I am extremely excited to meet you and hope you enjoy this edition of SenaMUN, as well as the social media posts prepared with much love and dedication. See you soon, kisses, Leticia!",
    bioPT: "Oi gente, meu nome é Leticia Leocadio, estou cursando meu último ano em marketing no Senac Nações Unidas. Faço simulações da ONU desde o meu primeiro ano do ensino médio e desde então as simulações da ONU ganharam um grande espaço na minha vida, mudando vários aspectos dela. Atualmente já fiz mais de 10 simulações, explorando todas as funções, delegada, mesária, imprensa e agora tenho a honra de estrear o cargo de General Secretary of Communication no Senamun V! Estou extremamente animada para conhecer vocês e espero que vocês aproveitem essa edição do Senamun e que também aproveitem as postagens nas redes sociais que foram preparados com muito carinho e dedicação. Vejo vocês em breve, beijos Leticia!",
    imagem: "/time/secretarios/Letícia Leocadio.JPG",
  },
  {
    nome: "Gustavo Vezzá",
    cargo: "Secretário Geral de Comunicação",
    bio: "Olá! Eu sou o Gustavo o Secretário Geral de Comunicação, tenho 17 anos e estou no Senamun desde 2025, já fui para 8 conferencias e criei memórias incriveis em todas elas. Nessa edição, eu sou o responsável por toda a comunicação do Senamun.",
    imagem: "/time/secretarios/Gustavo Vezzá.JPG",
  },
];

const SecretaryCard = ({
  membro,
  i,
  isVisible,
  onPhotoClick,
}: {
  membro: (typeof membros)[0];
  i: number;
  isVisible: boolean;
  onPhotoClick: (m: (typeof membros)[0]) => void;
}) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const isLeft = i % 2 === 0;

  const toggleTranslation = () => {
    setTextOpacity(0);
    setTimeout(() => {
      setIsTranslated(!isTranslated);
      setTextOpacity(1);
    }, 100);
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-3 md:gap-8 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      {/* Foto */}
      <button
        type="button"
        onClick={() => onPhotoClick(membro)}
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
      </button>

      {/* Card informativo */}
      <div className="w-full md:flex-1 transition-all duration-500 ease-out relative">
        <div className="border-2 border-yellow-custom rounded-2xl p-4 md:p-8 bg-white dark:bg-[#0B1E2D]/60 backdrop-blur-sm shadow-xl relative">
          <h2 className="text-yellow-custom font-bold text-2xl md:text-3xl mb-1">
            {membro.nome}
          </h2>
          <p className="text-light-blue-custom font-medium text-base mb-4">
            {membro.cargo} — Secretariado Geral
          </p>
          <div className="w-full h-px bg-yellow-custom/30 mb-4" />
          <p
            className="text-gray-600 dark:text-gray-300 text-sm font-light leading-relaxed whitespace-pre-line transition-opacity duration-200"
            style={{ opacity: textOpacity }}
          >
            {isTranslated && (membro as any).bioPT ? (membro as any).bioPT : membro.bio}
          </p>

          {(membro as any).bioPT && (
            <button
              onClick={toggleTranslation}
              className={`absolute bottom-[12px] right-[12px] w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 ease-in-out cursor-pointer bg-transparent hover:bg-[#2563eb] hover:text-white hover:scale-105 ${
                isTranslated ? "text-[#2563eb]" : "text-[#94a3b8]"
              }`}
            > 
              <i className="fa-solid fa-language" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

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
            return (
              <div
                key={i}
                ref={(el) => { observerRefs.current[i] = el; }}
              >
                <SecretaryCard
                  membro={membro}
                  i={i}
                  isVisible={visibleItems[i]}
                  onPhotoClick={setSelectedMember}
                />
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
