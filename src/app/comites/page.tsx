"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dados from "./dataComites"; // Assuming dataComites is still needed for the content below

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

  useEffect(() => {
    setCommittees(dados);
  }, []);

  const openModal = (item: Committee) => {
    setModalData(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Novo cabeçalho simplificado */}
      <section className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-[#0B1E2D] transition-colors duration-300">
        <div className="px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide text-blue-custom dark:text-[#f39322]">
            Comitês
          </h1>
          <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg">
            Explore os temas e escolha onde participar
          </p>
          <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-yellow-custom/40 to-transparent dark:via-[#013563]/40"></div>
        </div>
      </section>

      {/* Conteúdo existente da página de Comitês */}
      <div className="flex flex-col bg-gray-100 min-h-fit p-6">
        {committees.map((committee, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-xl mb-8 flex flex-col lg:flex-row h-auto max-w-full"
          >
            <div className="w-full lg:w-1/3">
              <Image
                src={
                  committee.imagem
                    ? `/comites/${committee.imagem}`
                    : "/logo-senamun.png"
                }
                alt="Imagem do Comitê"
                width={800}
                height={500}
                className="object-cover rounded-lg w-full h-64 lg:h-72"
              />
            </div>
            <div className="ml-0 lg:ml-6 w-full lg:w-2/3 p-4 lg:p-6">
              <h2 className="text-2xl font-bold">{committee.tema}</h2>
              <p className="mt-2 text-lg font-semibold">{committee.comite}</p>
              <p className="mt-2">Modalidade: {committee.modalidade}</p>
              <p className="mt-2">Idioma: {committee.idioma.toUpperCase()}</p>
              <button
                onClick={() => openModal(committee)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && modalData && (
        <div
          className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? blurBackground : ""
            }`}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div
              className={`${isOpen
                  ? "opacity-100 transition-opacity duration-200"
                  : "opacity-0 transition-opacity duration-300"
                } inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
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

                      {/* Links em Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <a
                          href={modalData.classroom}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Classroom
                        </a>
                        <a
                          href={modalData.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Whatsapp 
                        </a>
                        {modalData.pdf && (
                          <a
                            href={modalData.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            PDF 
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
