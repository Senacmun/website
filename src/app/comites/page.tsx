"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dados from "./dataComites";

const blurBackground = "backdrop-blur-md";

interface Chair {
  nome: string;
  cargo: string;
  foto: string;
  bio: string;
}

interface Committee {
  tema: string;
  comite: string;
  modalidade: string;
  classroom: string;
  whatsapp: string;
  pdf: string | null;
  idioma: string;
  imagem: string | null;
  posicao?: string;
  sinopse?: string;
  chairs: Chair[];
}

export default function ComitesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Committee | null>(null);
  const [showChairs, setShowChairs] = useState(false);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCommittees(dados);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeModal(); }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const openModal = (item: Committee) => {
    setModalData(item);
    setShowChairs(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setShowChairs(false), 300);
  };

  const primaryCommittees = committees.slice(0, 12);
  const rows = [];
  for (let i = 0; i < primaryCommittees.length; i += 3) {
    rows.push(primaryCommittees.slice(i, i + 3));
  }

  const specialCommittee = committees[12]; // Special
  const especialCommittee = committees[13]; // Especial

  const getCommitteeImage = (committee: Committee) => {
    const imagePath = committee.imagem
      ? `/comites/${committee.imagem}`
      : "/logo-senamun.png";

    return `url("${encodeURI(imagePath)}")`;
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#0B1E2D]">
      <section
        className={`mx-auto w-full max-w-5xl px-5 py-16 transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-custom md:text-5xl">
            Comitês
          </h1>
        <div className="mx-auto mt-4 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-yellow-custom/30 to-transparent dark:via-white/10"></div>
      </div>

      <div className="mx-auto mt-12 max-w-[38rem]">
        {/* Mobile List Layout */}
        <div className="flex flex-col gap-[12px] md:hidden">
          {committees.map((committee, index) => (
            <button
              key={`${committee.comite}-${index}`}
              type="button"
              onClick={() => openModal(committee)}
              className="flex w-full h-[100px] bg-white dark:bg-[#0d1b2e] border border-black/10 dark:border-white/10 rounded-lg overflow-hidden text-left shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="w-[40%] h-full relative shrink-0">
                <Image
                  src={committee.imagem ? `/comites/${committee.imagem}` : "/logo-senamun.png"}
                  alt={committee.comite}
                  fill
                  className="object-cover rounded-l-lg"
                />
              </div>
              <div className="w-[60%] p-3 flex flex-col justify-center">
                <h3 className="font-bold text-[16px] text-gray-900 dark:text-white truncate">
                  {committee.comite}
                </h3>
                <div className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
                  <p>{committee.idioma === 'en' ? 'Committee' : 'Comitê'}: {committee.comite}</p>
                  <p>{committee.idioma === 'en' ? 'Modality' : 'Modalidade'}: {committee.modalidade}</p>
                  <p>{committee.idioma === 'en' ? 'Language' : 'Idioma'}: {committee.idioma.toUpperCase()}</p>
                  {committee.chairs && committee.chairs.length > 0 && (
                    <p>Chairs: {committee.chairs.map(c => c.nome).join(", ")}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
          <Link href="/" className="flex items-center justify-center pt-8">
            <Image
              src="/logo-senamun.png"
              alt="Logo SenaMUN"
              width={140}
              height={140}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Grid Layout (unchanged logic) */}
        <div className="hidden md:flex md:flex-col md:gap-12">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3 gap-12">
              {row.map((committee, index) => (
                <button
                  key={`${committee.comite}-${index}`}
                  type="button"
                  onClick={() => openModal(committee)}
                  className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-light-blue-custom/20 focus:outline-none focus:ring-2 focus:ring-light-blue-custom focus:ring-offset-2 dark:hover:shadow-black/30 dark:focus:ring-offset-[#0B1E2D]"
                >
                  <div
                    className="absolute inset-0 scale-100 bg-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                    style={{
                      backgroundImage: getCommitteeImage(committee),
                      backgroundPosition: committee.posicao || "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/45 transition-all duration-700 ease-out group-hover:bg-black/0 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-br from-light-blue-custom via-[#1F6FEB] to-blue-custom opacity-0 transition-all duration-700 ease-out group-hover:opacity-100" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  </div>
                  <div className="relative z-10 flex h-full items-center justify-center p-5 text-center">
                    <h2 className="translate-y-0 text-lg font-bold text-white underline underline-offset-2 drop-shadow transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 flex flex-wrap justify-center items-center gap-x-1.5">
                      <span>{committee.comite}</span>
                    </h2>
                  </div>
                </button>
              ))}
            </div>
          ))}

          <div className="grid grid-cols-3 items-center gap-12">
            {specialCommittee && (
              <button
                type="button"
                onClick={() => openModal(specialCommittee)}
                className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-light-blue-custom/20"
              >
                <div
                  className="absolute inset-0 scale-100 bg-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                  style={{
                    backgroundImage: getCommitteeImage(specialCommittee),
                    backgroundPosition: specialCommittee.posicao || "center",
                  }}
                />
                <div className="absolute inset-0 bg-black/45 transition-all duration-700 ease-out group-hover:bg-black/0 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-light-blue-custom via-[#1F6FEB] to-blue-custom opacity-0 transition-all duration-700 ease-out group-hover:opacity-100" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                </div>
                <div className="relative z-10 flex h-full items-center justify-center p-5 text-center">
                  <h2 className="translate-y-0 text-lg font-bold text-white underline underline-offset-2 drop-shadow transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 flex flex-wrap justify-center items-center gap-x-1.5">
                    <span>{specialCommittee.comite}</span>
                  </h2>
                </div>
              </button>
            )}

            <Link href="/" className="flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
              <Image
                src="/logo-senamun.png"
                alt="Logo SenaMUN"
                width={180}
                height={180}
                className="h-auto w-[180px] object-contain"
              />
            </Link>

            {especialCommittee && (
              <button
                type="button"
                onClick={() => openModal(especialCommittee)}
                className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-light-blue-custom/20"
              >
                <div
                  className="absolute inset-0 scale-100 bg-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                  style={{
                    backgroundImage: getCommitteeImage(especialCommittee),
                    backgroundPosition: especialCommittee.posicao || "center",
                  }}
                />
                <div className="absolute inset-0 bg-black/45 transition-all duration-700 ease-out group-hover:bg-black/0 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-light-blue-custom via-[#1F6FEB] to-blue-custom opacity-0 transition-all duration-700 ease-out group-hover:opacity-100" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                </div>
                <div className="relative z-10 flex h-full items-center justify-center p-5 text-center">
                  <h2 className="translate-y-0 text-lg font-bold text-white underline underline-offset-2 drop-shadow transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 flex flex-wrap justify-center items-center gap-x-1.5">
                    <span>{especialCommittee.comite}</span>
                  </h2>
                </div>
              </button>
            )}
          </div>
          </div>
        </div>
      </section>

      {isOpen && modalData && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          
          {/* Container Relativo para as Camadas - Ajustado para não quebrar o tamanho */}
          <div className="relative flex w-full max-w-[550px] flex-col items-center gap-4">
            <div className="relative flex h-[550px] max-h-[calc(100vh-120px)] w-full items-center justify-center">
            
            {/* CARD SECUNDÁRIO (CHAIRS) - Fica atrás ou na frente dependendo do estado */}
            <div
              className={`absolute h-full w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#1c3a5e] p-8 shadow-2xl transition-all duration-700 ease-in-out custom-scrollbar dark:bg-[#1a2b44] ${
                showChairs 
                ? "z-30 translate-x-0 translate-y-0 opacity-100 scale-100" 
                : "z-10 md:translate-x-6 md:-translate-y-6 opacity-40 scale-95 blur-[1px]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {modalData.idioma === 'en' ? 'Committee Chairs' : 'Chairs do Comitê'}
                  </h3>
                  <button
                      onClick={() => setShowChairs(false)}
                    className="flex items-center gap-2 text-sm font-bold text-yellow-custom hover:text-white transition-colors group"
                    >
                    <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1" />
                    {modalData.idioma === 'en' ? 'Back to Info' : 'Voltar para Informações'}
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                  {modalData.chairs && [...modalData.chairs]
                    .sort((a, b) => {
                      const hierarchy: Record<string, number> = { "Head-Chair": 1, "Co-Chair": 2, "Diretor": 3 };
                      return (hierarchy[a.cargo] || 99) - (hierarchy[b.cargo] || 99);
                    })
                    .map((chair, i) => (
                      <div key={i} className="flex flex-col md:flex-row gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                        <div className="flex-1 text-center md:text-left">
                          <p className="text-yellow-custom font-bold text-lg">{chair.nome}</p>
                          <p className="text-white/60 text-sm font-medium mb-2">{chair.cargo}</p>
                          <p className="text-gray-300 text-xs leading-relaxed italic">
                            &ldquo;{chair.bio}&rdquo;
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* CARD PRINCIPAL (INFORMAÇÕES) */}
            <div
              className={`absolute flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1b2e] p-8 shadow-2xl transition-all duration-700 ease-in-out ${
                showChairs 
                ? "z-10 translate-y-8 opacity-0 scale-90 pointer-events-none" 
                : "z-20 translate-x-0 translate-y-0 opacity-100 scale-100"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Título Principal */}
              <div className="h-[150px] shrink-0 overflow-y-auto pr-1 custom-scrollbar">
                <div className="inline-block px-3 py-1 rounded-full bg-yellow-custom/10 border border-yellow-custom/20 mb-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.15em] text-yellow-custom">
                    {modalData.comite}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {modalData.tema || "Tema a definir"}
                </h2>
              </div>

              {/* Grid de Informações Rápidas */}
              <div className="mt-6 grid shrink-0 grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <p className="text-white/40 mb-1 uppercase font-bold tracking-wider">{modalData.idioma === 'en' ? 'Modality' : 'Modalidade'}</p>
                  <p className="text-white font-medium">{modalData.modalidade}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <p className="text-white/40 mb-1 uppercase font-bold tracking-wider">{modalData.idioma === 'en' ? 'Language' : 'Idioma'}</p>
                  <p className="text-white font-medium">{modalData.idioma.toUpperCase()}</p>
                </div>
              </div>

              {/* Seção de Sinopse */}
              <div className="mt-6 flex-1 overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-6 custom-scrollbar">
                <h3 className="text-sm font-black uppercase tracking-widest text-yellow-custom mb-2">
                  {modalData.idioma === 'en' ? 'Synopsis' : 'Sinopse'}
                </h3>
                <p className="text-[14px] text-gray-200 leading-relaxed italic opacity-90">
                  {modalData.sinopse || "A sinopse deste comitê estará disponível em breve para consulta dos delegados."}
                </p>
              </div>

              {/* Ações */}
              <div className="mt-6 flex shrink-0 flex-col gap-3">
                <button
                  onClick={() => setShowChairs(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-yellow-custom py-3 text-sm font-bold text-black transition-all hover:brightness-110 active:scale-95"
                >
                  <i className="fa-solid fa-users" />
                  {modalData.idioma === 'en' ? 'Meet the Chairs' : 'Ver Chairs / Mesários'}
                </button>

                <div className="flex gap-2">
                  <a
                    href={modalData.classroom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700"
                  >
                    Classroom
                  </a>
                  <a
                    href={modalData.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white transition-all hover:bg-green-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
            </div>

            {/* Botão de Fechar Externo */}
            <button
              onClick={closeModal}
              className="relative z-40 w-full rounded-xl border border-white/10 bg-black/20 py-3 text-sm font-black uppercase tracking-wider text-white/60 backdrop-blur-md transition-all hover:border-[#f87171]/50 hover:bg-[#f87171]/10 hover:text-[#f87171] active:scale-[0.99]"
            >
              {modalData.idioma === 'en' ? 'CLOSE' : 'FECHAR'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
