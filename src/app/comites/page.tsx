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
                    className="absolute inset-0 scale-100 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                    style={{
                      backgroundImage: getCommitteeImage(committee),
                    }}
                  />
                  <div className="absolute inset-0 bg-black/45 transition-all duration-700 ease-out group-hover:bg-black/0 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-br from-light-blue-custom via-[#1F6FEB] to-blue-custom opacity-0 transition-all duration-700 ease-out group-hover:opacity-100" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  </div>
                  <div className="relative z-10 flex h-full items-center justify-center p-5 text-center">
                    <h2 className="translate-y-0 text-lg font-bold text-white underline underline-offset-2 drop-shadow transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105">
                      {committee.comite}
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
                  className="absolute inset-0 scale-100 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                  style={{
                    backgroundImage: specialCommittee.imagem
                      ? `url(/comites/${specialCommittee.imagem})`
                      : "url(/logo-senamun.png)",
                  }}
                />
                <div className="absolute inset-0 bg-black/45 transition-all duration-700 ease-out group-hover:bg-black/0 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-light-blue-custom via-[#1F6FEB] to-blue-custom opacity-0 transition-all duration-700 ease-out group-hover:opacity-100" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                </div>
                <div className="relative z-10 flex h-full items-center justify-center p-5 text-center">
                  <h2 className="translate-y-0 text-lg font-bold text-white underline underline-offset-2 drop-shadow transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105">
                    {specialCommittee.comite}
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
                  className="absolute inset-0 scale-100 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
                  style={{
                    backgroundImage: especialCommittee.imagem
                      ? `url(/comites/${especialCommittee.imagem})`
                      : "url(/logo-senamun.png)",
                  }}
                />
                <div className="absolute inset-0 bg-black/45 transition-all duration-700 ease-out group-hover:bg-black/0 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-light-blue-custom via-[#1F6FEB] to-blue-custom opacity-0 transition-all duration-700 ease-out group-hover:opacity-100" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                </div>
                <div className="relative z-10 flex h-full items-center justify-center p-5 text-center">
                  <h2 className="translate-y-0 text-lg font-bold text-white underline underline-offset-2 drop-shadow transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105">
                    {especialCommittee.comite}
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
              <div className="inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle"></span>
            <div
              className={`${
                isOpen
                  ? "opacity-100 transition-opacity duration-200"
                  : "opacity-0 transition-opacity duration-300"
              } inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-headline"
                    >
                      {modalData.tema}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Comitê: {modalData.comite}
                      </p>
                      <p className="text-sm text-gray-500">
                        Modalidade: {modalData.modalidade}
                      </p>
                      <p className="text-sm text-gray-500">
                        Idioma: {modalData.idioma.toUpperCase()}
                      </p>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <a
                          href={modalData.classroom}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                          Classroom
                        </a>
                        <a
                          href={modalData.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                        >
                          Whatsapp
                        </a>
                        {modalData.pdf && (
                          <a
                            href={modalData.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
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
