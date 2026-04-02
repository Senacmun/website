"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const photosData: Record<number, string[]> = {
  2025: [],
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.5;
  const currentPhotos = photosData[selectedYear] || [];

  const resetControlsTimer = () => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setZoom(1);
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
  };

  useEffect(() => {
    if (selectedImage) resetControlsTimer();
  }, [selectedImage]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#0B1E2D] transition-colors duration-300">
      {/* Cabeçalho Padronizado */}
      <section className="flex flex-col items-center justify-center py-16 text-center">
        <div className="px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide text-blue-custom dark:text-[#f39322]">
            Galeria de Fotos
          </h1>
          <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg">
            Reviva os momentos marcantes das nossas conferÃªncias
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
                  onClick={() => {
                    setSelectedImage(img);
                    setZoom(1);
                  }}
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
                      <i className="fa-solid fa-magnifying-glass mr-2" />
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
              {selectedYear === 2025
                ? "Ainda não temos imagens de 2025."
                : `Nenhuma foto disponí­vel ainda para ${selectedYear}`}
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
          onMouseMove={resetControlsTimer}
        >
          <button
            onClick={() => {
              closeLightbox();
            }}
            className={`fixed top-4 right-4 z-[60] bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:scale-110 font-bold text-xl transition-all duration-500 ${
              showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            ✕
          </button>

          <div
            className="relative mx-4 w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              >
                <Image
                  src={selectedImage}
                  alt="Imagem expandida"
                  fill
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </div>

            <div
              className={`flex items-center justify-center gap-3 mt-4 transition-all duration-500 ${
                showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <button
                onClick={() => {
                  setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
                  resetControlsTimer();
                }}
                disabled={zoom <= MIN_ZOOM}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-800 shadow transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-white"
                title="Diminuir zoom"
              >
                −
              </button>

              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white shadow backdrop-blur-sm dark:bg-slate-800/60">
                <i className="fa-solid fa-magnifying-glass text-yellow-custom" />
                {Math.round(zoom * 100)}%
              </div>

              <button
                onClick={() => {
                  setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
                  resetControlsTimer();
                }}
                disabled={zoom >= MAX_ZOOM}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-800 shadow transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-white"
                title="Aumentar zoom"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
