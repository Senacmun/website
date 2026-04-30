"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const photosData: Record<number, string[]> = {
  2025: [
    "/edicoes/2025/IMG_5931.JPG",
    "/edicoes/2025/DSC_0057.webp",
    "/edicoes/2025/IMG_0471.CR2.webp",
    "/edicoes/2025/IMG_0498.CR2.webp",
    "/edicoes/2025/IMG_0535.CR2.webp",
    "/edicoes/2025/IMG_0607.CR2.webp",
    "/edicoes/2025/IMG_0676.CR2.webp",
    "/edicoes/2025/IMG_0731.CR2.webp",
    "/edicoes/2025/IMG_0748.CR2.webp",
    "/edicoes/2025/IMG_5388.png",
    "/edicoes/2025/IMG_5429.webp",
    "/edicoes/2025/IMG_5446.webp",
    "/edicoes/2025/IMG_5453.webp",
    "/edicoes/2025/IMG_5462.webp",
    "/edicoes/2025/IMG_5498.webp",
    "/edicoes/2025/IMG_5502.webp",
    "/edicoes/2025/IMG_5539.webp",
    "/edicoes/2025/IMG_5546.webp",
    "/edicoes/2025/IMG_5554.webp",
    "/edicoes/2025/IMG_5569.webp",
    "/edicoes/2025/IMG_5600.webp",
    "/edicoes/2025/IMG_5602.webp",
    "/edicoes/2025/IMG_5692.webp",
    "/edicoes/2025/IMG_5697.webp",
    "/edicoes/2025/IMG_5720.JPG",
    "/edicoes/2025/IMG_5809.webp",
    "/edicoes/2025/IMG_5928.webp",
  ],
  2024: [
    "/edicoes/2024/DSC_0024_1_11zon.jpg",
    "/edicoes/2024/DSC_0090_2_11zon.jpg",
    "/edicoes/2024/IMG_2476 1_3_11zon.jpg",
    "/edicoes/2024/IMG_2497_4_11zon.jpg",
    "/edicoes/2024/IMG_2547_5_11zon.jpg",
    "/edicoes/2024/IMG_2560_6_11zon.jpg",
    "/edicoes/2024/IMG_2578_7_11zon.jpg",
    "/edicoes/2024/IMG_2596_8_11zon.jpg",
    "/edicoes/2024/IMG_2604_9_11zon.jpg",
    "/edicoes/2024/IMG_4936_10_11zon.jpg",
    "/edicoes/2024/IMG_4938 (1)_11_11zon.jpg",
    "/edicoes/2024/IMG_7959_12_11zon.jpg",
    "/edicoes/2024/IMG_7970_13_11zon.jpg",
    "/edicoes/2024/IMG_7993_14_11zon.jpg",
    "/edicoes/2024/IMG_8006_15_11zon.jpg",
    "/edicoes/2024/IMG_8008_16_11zon.jpg",
    "/edicoes/2024/IMG_8023_17_11zon.jpg",
    "/edicoes/2024/IMG_8029_18_11zon.jpg",
    "/edicoes/2024/IMG_8042_19_11zon.jpg",
    "/edicoes/2024/IMG_8050_20_11zon.jpg",
    "/edicoes/2024/IMG_8059_21_11zon.jpg",
    "/edicoes/2024/IMG_8065_22_11zon.jpg",
    "/edicoes/2024/IMG_8067_23_11zon.jpg",
    "/edicoes/2024/IMG_8107_24_11zon.jpg",
  ],
  2023: [
    "/edicoes/2023/foto18JPG.jpg",
    "/edicoes/2023/foto19JPG.jpg",
    "/edicoes/2023/foto20JPG.jpg",
    "/edicoes/2023/foto21JPG.jpg",
    "/edicoes/2023/IMG_1178JPG.jpg",
    "/edicoes/2023/IMG_1190JPG.jpg",
    "/edicoes/2023/IMG_1193JPG.jpg",
    "/edicoes/2023/IMG_1197JPG.jpg",
    "/edicoes/2023/IMG_1208JPG.jpg",
    "/edicoes/2023/IMG_1220JPG.jpg",
    "/edicoes/2023/IMG_1232JPG.jpg",
    "/edicoes/2023/IMG_1258JPG.jpg",
    "/edicoes/2023/IMG_1303JPG.jpg",
    "/edicoes/2023/IMG_1395JPG.jpg",
    "/edicoes/2023/IMG_1504JPG.jpg",
    "/edicoes/2023/IMG_1590JPG.jpg",
    "/edicoes/2023/IMG_1612JPG.jpg",
    "/edicoes/2023/IMG_1649JPG.jpg",
  ],
  2022: [
    "/edicoes/2022/foto1.jpg",
    "/edicoes/2022/foto2.jpg",
    "/edicoes/2022/foto3.jpg",
    "/edicoes/2022/foto4.jpg",
    "/edicoes/2022/foto5.jpg",
    "/edicoes/2022/foto6.jpg",
    "/edicoes/2022/foto7.jpg",
    "/edicoes/2022/foto10.jpg",
    "/edicoes/2022/foto11.jpg",
    "/edicoes/2022/foto12.jpg",
    "/edicoes/2022/foto13.jpg",
    "/edicoes/2022/foto14.jpg",
    "/edicoes/2022/foto15.jpg",
    "/edicoes/2022/foto16.jpg",
    "/edicoes/2022/foto17.jpg",
  ],
};

const years = [2025, 2024, 2023, 2022];

export default function GaleriaPage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  const currentPhotos = photosData[selectedYear] || [];
  const selectedPhoto =
    selectedPhotoIndex === null ? null : currentPhotos[selectedPhotoIndex] ?? null;
  const selectedPhotoKey =
    selectedPhotoIndex === null || selectedPhoto === null
      ? ""
      : `${selectedYear}-${selectedPhotoIndex}-${selectedPhoto}`;
  const isFirstPhoto = selectedPhotoIndex === 0;
  const isLastPhoto =
    selectedPhotoIndex !== null && selectedPhotoIndex === currentPhotos.length - 1;
  const editionButtonYear =
    selectedYear === 2022 ? 2025 : years[years.indexOf(selectedYear) + 1];
  const editionButtonText =
    selectedYear === 2022
      ? "Ver fotos da edição mais recente"
      : "Ver fotos da edição anterior";
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.5;

  const selectYear = (year: number) => {
    setSelectedYear(year);
    setSelectedPhotoIndex(null);
    setZoom(1);
  };

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setZoom(1);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    setZoom(1);
  };

  const showPreviousPhoto = () => {
    setSelectedPhotoIndex((index) => {
      if (index === null) return index;
      return Math.max(0, index - 1);
    });
    setZoom(1);
  };

  const showNextPhoto = () => {
    setSelectedPhotoIndex((index) => {
      if (index === null) return index;
      return Math.min(currentPhotos.length - 1, index + 1);
    });
    setZoom(1);
  };

  const showEditionGallery = () => {
    if (!editionButtonYear) return;

    setSelectedYear(editionButtonYear);
    setSelectedPhotoIndex(null);
    setZoom(1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    if (selectedPhotoIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhotoIndex]);

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
              onClick={() => selectYear(year)}
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
                <button
                  key={img}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg dark:border dark:border-white/10"
                  aria-label={`Abrir foto ${index + 1} de ${selectedYear}`}
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
                      <i className="fa-solid fa-magnifying-glass mr-2" />
                      Ver imagem
                    </span>
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg italic"
            >
              {selectedYear === 2025
                ? "Ainda não temos imagens de 2025."
                : `Nenhuma foto disponí­vel ainda para ${selectedYear}`}
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      {selectedPhoto && selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização da foto"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-800 shadow-lg transition-transform duration-200 hover:scale-110 dark:bg-slate-800 dark:text-white"
            aria-label="Fechar imagem"
          >
            ✕
          </button>

          <div
            className="flex w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative h-[70vh] w-full bg-transparent">
                <div
                  key={selectedPhotoKey}
                  className="absolute inset-0 transition-transform duration-300 ease-out"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center center",
                  }}
                >
                  <Image
                    key={selectedPhotoKey}
                    src={selectedPhoto}
                    alt={`SenaMUN ${selectedYear} - Foto ${selectedPhotoIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    draggable={false}
                  />
                </div>
              </div>

              {!isFirstPhoto && (
                <button
                  type="button"
                  onClick={showPreviousPhoto}
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-white transition-all duration-200 hover:bg-black/70"
                  aria-label="Foto anterior"
                >
                  {"<"}
                </button>
              )}

              {!isLastPhoto && (
                <button
                  type="button"
                  onClick={showNextPhoto}
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl font-bold text-white transition-all duration-200 hover:bg-black/70"
                  aria-label="Próxima foto"
                >
                  {">"}
                </button>
              )}
            </div>

            <p className="mt-4 text-sm font-medium text-white">
              Foto {selectedPhotoIndex + 1} de {currentPhotos.length} - {selectedYear}
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP))}
                disabled={zoom <= MIN_ZOOM}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-800 shadow transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-white"
                title="Diminuir zoom"
                aria-label="Diminuir zoom"
              >
                −
              </button>

              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow backdrop-blur-sm dark:bg-slate-800 dark:text-white">
                <i className="fa-solid fa-magnifying-glass text-yellow-custom" />
                {Math.round(zoom * 100)}%
              </div>

              <button
                type="button"
                onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))}
                disabled={zoom >= MAX_ZOOM}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-800 shadow transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-white"
                title="Aumentar zoom"
                aria-label="Aumentar zoom"
              >
                +
              </button>
            </div>

            {isLastPhoto && (
              <button
                type="button"
                onClick={showEditionGallery}
                className="mt-5 rounded-xl bg-blue-custom px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:opacity-90 dark:bg-[#f39322] dark:text-[#0B1E2D]"
              >
                {editionButtonText}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
