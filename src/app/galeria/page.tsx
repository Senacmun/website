"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Exemplo de estrutura de dados. Substitua pelos caminhos reais das suas imagens.
const photosData: Record<number, string[]> = {
  2025: [
    "/galeria/2025/foto1.jpg",
    "/galeria/2025/foto2.jpg",
    "/galeria/2025/foto3.jpg",
    "/galeria/2025/foto4.jpg",
    "/galeria/2025/foto5.jpg",
    "/galeria/2025/foto6.jpg",
  ],
  2024: [
    "/galeria/2024/foto1.jpg",
    "/galeria/2024/foto2.jpg",
    "/galeria/2024/foto3.jpg",
    "/galeria/2024/foto4.jpg",
    "/galeria/2024/foto5.jpg",
    "/galeria/2024/foto6.jpg",
    "/galeria/2024/foto7.jpg",
    "/galeria/2024/foto8.jpg",
  ],
  2023: [
    "/galeria/2023/foto1.jpg",
    "/galeria/2023/foto2.jpg",
    "/galeria/2023/foto3.jpg",
    "/galeria/2023/foto4.jpg",
  ],
  2022: [
    "/galeria/2022/foto1.jpg",
    "/galeria/2022/foto2.jpg",
  ],
};

const years = [2025, 2024, 2023, 2022];

export default function GaleriaPage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const currentPhotos = photosData[selectedYear] || [];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#0B1E2D] transition-colors duration-300">
      {/* Cabeçalho Padronizado */}
      <section className="flex flex-col items-center justify-center py-16 text-center">
        <div className="px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide text-blue-custom dark:text-[#f39322]">
            Galeria de Fotos
          </h1>
          <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg">
            Reviva os momentos marcantes das nossas conferências
          </p>
          <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-yellow-custom/40 to-transparent dark:via-[#013563]/40"></div>
        </div>
      </section>

      {/* Seção de Abas (Anos) */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4 p-2 rounded-2xl bg-gray-50 dark:bg-[#0B1E2D] border border-gray-100 dark:border-white/5">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-xl px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                selectedYear === year
                  ? "bg-blue-custom text-white shadow-md dark:bg-[#f39322] dark:text-[#0B1E2D]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[#06283D] dark:text-gray-300 dark:hover:bg-[#013563]"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Fotos com Animação */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {currentPhotos.length > 0 ? (
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {currentPhotos.map((img, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer dark:border dark:border-white/10"
                >
                  <Image
                    src={img}
                    alt={`SenaMUN ${selectedYear} - Foto ${index + 1}`}
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay Premium */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-lg font-medium transition-all duration-300">
                      Ver imagem
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg italic"
            >
              Nenhuma foto disponível ainda para {selectedYear}
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}