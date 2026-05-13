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

        <div className="mx-auto mt-12 flex max-w-[38rem] flex-col gap-12">
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
                      {committee.tema && committee.tema !== "Tema a definir" && (
                        <span className="no-underline text-base font-medium opacity-90">
                          — {committee.tema}
                        </span>
                      )}
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
                    {specialCommittee.tema && specialCommittee.tema !== "Tema a definir" && (
                      <span className="no-underline text-base font-medium opacity-90">
                        — {specialCommittee.tema}
                      </span>
                    )}
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
                    {especialCommittee.tema && especialCommittee.tema !== "Tema a definir" && (
                      <span className="no-underline text-base font-medium opacity-90">
                        — {especialCommittee.tema}
                      </span>
                    )}
                  </h2>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {isOpen && modalData && (
        <div
          className={`fixed inset-0 z-10 overflow-y-auto ${
            isOpen ? blurBackground : ""
          }`}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="inset-0 bg-black/60 opacity-100"></div>
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle"></span>
            <div
              className={`${
                isOpen
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95"
              } inline-block transform overflow-hidden rounded-3xl bg-gray-50 text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle dark:bg-slate-900`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-6 py-8 sm:px-10">
                <div className="text-left">
                  {/* Título Principal */}
                  <h3
                    className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight"
                    id="modal-headline"
                  >
                    {modalData.tema}
                  </h3>

                  {/* Informações do Comitê */}
                  <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p><span className="font-semibold text-gray-800 dark:text-gray-200">Comitê:</span> {modalData.comite}</p>
                    <p><span className="font-semibold text-gray-800 dark:text-gray-200">Modalidade:</span> {modalData.modalidade}</p>
                    <p><span className="font-semibold text-gray-800 dark:text-gray-200">Idioma:</span> {modalData.idioma.toUpperCase()}</p>
                  </div>

                  {/* Seção de Sinopse */}
                  <div className="mt-8">
                    <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      Sinopse sobre o comitê
                    </h4>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                      {modalData.sinopse || "A sinopse deste comitê estará disponível em breve para consulta dos delegados."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Área de Botões Alinhada */}
              <div className="bg-gray-100/50 px-6 py-5 sm:px-10 flex flex-row items-center justify-between dark:bg-slate-800/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-3">
                  <a
                    href={modalData.classroom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95"
                  >
                    Classroom
                  </a>
                  <a
                    href={modalData.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:scale-105 active:scale-95"
                  >
                    Whatsapp
                  </a>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-red-500/10 px-6 py-2.5 text-sm font-bold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white active:scale-95"
                  onClick={closeModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
