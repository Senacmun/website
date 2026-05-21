"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dados from "./dataComites";

const blurBackground = "backdrop-blur-md";

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
}

export default function ComitesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Committee | null>(null);
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCommittees(dados);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const openModal = (item: Committee) => {
    setModalData(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
          onClick={closeModal}
        >
          <div className="fixed inset-0 bg-black/50" />
          
          <div
            className="relative w-full max-w-[420px] bg-white dark:bg-[#0d1b2e] rounded-[12px] p-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.3)] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Título Principal */}
            <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-[16px] leading-tight">
              {modalData.tema || "Tema a definir"}
            </h2>

            {/* Informações do Comitê */}
            <div className="text-[13px] leading-[1.8] text-gray-800 dark:text-gray-200">
              <p><span className="font-bold">{modalData.idioma === 'en' ? 'Committee' : 'Comitê'}:</span> {modalData.comite}</p>
              <p><span className="font-bold">{modalData.idioma === 'en' ? 'Modality' : 'Modalidade'}:</span> {modalData.modalidade}</p>
              <p><span className="font-bold">{modalData.idioma === 'en' ? 'Language' : 'Idioma'}:</span> {modalData.idioma.toUpperCase()}</p>
            </div>

            {/* Divisor */}
            <div className="my-4 border-t border-black/[0.08] dark:border-white/[0.08]" />

            {/* Seção de Sinopse */}
            <div className="mt-[16px]">
              <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">
                {modalData.idioma === 'en' ? 'Synopsis about the committee' : 'Sinopse sobre o comitê'}
              </h3>
              <p className="mt-2 text-[13px] text-gray-500 dark:text-gray-400 italic leading-relaxed">
                {modalData.sinopse || "A sinopse deste comitê estará disponível em breve para consulta dos delegados."}
              </p>
            </div>

            {/* Footer com Botões */}
            <div className="mt-8 flex gap-2">
              <a
                href={modalData.classroom}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center rounded-[8px] bg-[#2563eb] py-[10px] px-[16px] text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95"
              >
                Classroom
              </a>
              <a
                href={modalData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center rounded-[8px] bg-[#16a34a] py-[10px] px-[16px] text-sm font-semibold text-white transition-all hover:bg-green-700 active:scale-95"
              >
                WhatsApp
              </a>
              <button
                onClick={closeModal}
                className="flex-1 inline-flex items-center justify-center rounded-[8px] bg-[#fecaca] py-[10px] px-[16px] text-sm font-semibold text-[#dc2626] transition-all hover:bg-red-200 active:scale-95"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
