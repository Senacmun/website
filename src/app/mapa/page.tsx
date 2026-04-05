"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaMapPin, FaMinus, FaPlus } from "react-icons/fa";

const maps = [
  { label: "Campus", src: "/mapa/campus.jpg", download: "campus.jpg" },
  { label: "Salas", src: "/mapa/salas.jpg", download: "salas.jpg" },
];

export default function Campus() {
  const [mapZoomed, setMapZoomed] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom modal state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (imageExpanded && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setImageExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [imageExpanded]);

  // Reset zoom when closing modal or switching tabs
  useEffect(() => {
    if (!mapZoomed) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [mapZoomed, activeTab]);

  const closeZoom = () => {
    setMapZoomed(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleExpanded = () => setImageExpanded((prev) => !prev);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.3 : 0.3;
    setZoom((z) => Math.min(Math.max(z + delta, 1), 5));
  };

  const handlePanStart = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handlePanMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  };

  const handlePanEnd = () => setIsPanning(false);

  const active = maps[activeTab];

  return (
    <div>
      {/* Header */}
      <section className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-[#0B1E2D] transition-colors duration-300">
        <div className="px-4 md:px-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-blue-custom dark:text-[#f39322]">
            Mapa
          </h1>
          <p className="mt-2 text-gray-400 dark:text-gray-600 text-sm font-light tracking-widest">
            Localize-se durante o evento
          </p>
          <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-yellow-custom/40 to-transparent dark:via-[#013563]/40"></div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white dark:bg-[#0B1E2D] px-4 md:px-14 pt-4">
        <div className="flex gap-2 justify-center" onClick={() => setImageExpanded(false)}>
          {maps.map((map, i) => (
            <button
              key={map.label}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === i
                  ? "bg-yellow-custom text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {map.label}
            </button>
          ))}
        </div>
      </section>

      {/* Imagem + Info */}
      <section className="bg-white dark:bg-[#0B1E2D] px-4 md:px-14 py-10 md:py-16">
        <div className="flex flex-wrap items-start gap-4">
          {/* Imagem Desktop */}
          {activeTab !== 0 ? (
          <div
            className="cursor-pointer"
            style={{ width: "420px" }}
            onClick={() => setMapZoomed(true)}
          >
            <div
              className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md transition-shadow duration-500"
              style={{ height: 320 }}
            >
              <Image
                src={active.src}
                alt={active.label}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-black/40 text-white text-sm px-3 py-1.5 rounded-full">
                  Toque para ampliar
                </span>
              </div>
            </div>

            <div className="mt-3">
              <a
                href={active.src}
                download={active.download}
                className="inline-block bg-yellow-custom text-white text-sm py-2 px-5 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Baixar Imagem
              </a>
            </div>
          </div>
          ) : (
          <div
            ref={containerRef}
            className="cursor-pointer transition-all duration-500 ease-in-out"
            style={{ width: imageExpanded ? "100%" : "420px" }}
            onMouseEnter={() => setImageExpanded(true)}
            onMouseLeave={() => setImageExpanded(false)}
            onClick={toggleExpanded}
          >
            <div
              className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md transition-shadow duration-500"
              style={{ height: imageExpanded ? 480 : 320 }}
            >
              <Image
                src={active.src}
                alt={active.label}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
              {!imageExpanded && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="bg-black/40 text-white text-sm px-3 py-1.5 rounded-full">
                    Passe o mouse para ampliar
                  </span>
                </div>
              )}
            </div>

            <div className={`overflow-hidden transition-all duration-500 ${imageExpanded ? "max-h-0 opacity-0 mt-0" : "max-h-20 opacity-100 mt-3"}`}>
              <a
                href={active.src}
                download={active.download}
                className="inline-block bg-yellow-custom text-white text-sm py-2 px-5 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Baixar Imagem
              </a>
            </div>
          </div>
          )}

          {/* Info */}
          <div
            className="text-gray-800 dark:text-gray-300 leading-relaxed"
            style={{
              width: imageExpanded ? "100%" : "calc(100% - 436px)",
              maxWidth: 560,
              minWidth: 300,
            }}
          >
            <p className="flex items-center gap-2 text-base">
              <FaMapPin className="flex-shrink-0" />
              <span>
                Centro Universitário Senac Santo Amaro – Av. Eng. Eusébio
                Stevaux, 823 - Campo Grande - São Paulo - SP, 04696-000 (Portaria 1)
              </span>
            </p>

            <h1 className="mt-8 font-semibold text-gray-900 dark:text-white text-lg">
              Mais informações:
            </h1>

            <div className="text-justify flex flex-col gap-4 mt-4 text-sm">
              <p>
                Esta é a principal entrada da unidade, porém há a Portaria 2,
                que fica localizada na Rua Professor Campos de Oliveira, 588 -
                Jardim Anhanguera, São Paulo - SP, 04675-100.
              </p>
              <p>
                O Senac Nações Unidas está localizado no bairro Campo Grande, na
                zona Sul de São Paulo. Possui fácil acesso pelas principais vias
                da região, como as avenidas Marginal Pinheiros e Nações Unidas.
              </p>
              <p>
                Na frente do Senac (Portaria 1) passam 2 ônibus: Jd. Luso
                (546L-10) e Metrô Conceição (675P-10). A estação Jurubatuba-Senac
                fica apenas 1.1km de distância do Campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Imagem Mobile (visível só em mobile/tablet) */}
      <section className="lg:hidden bg-white dark:bg-[#0B1E2D] px-4 pb-8">
        <div
          className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md cursor-pointer"
          onClick={() => setMapZoomed(true)}
        >
          <Image
            src={active.src}
            alt={active.label}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 active:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-black/40 text-white text-sm px-3 py-1.5 rounded-full">
              Toque para ampliar
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <a
            href={active.src}
            download={active.download}
            className="inline-block bg-yellow-custom text-white text-sm py-2 px-5 rounded-lg hover:opacity-90 transition-all shadow-md"
          >
            Baixar Imagem
          </a>
        </div>
      </section>

      {/* Google Maps Iframe */}
      <section className="bg-white dark:bg-[#0B1E2D] px-4 md:px-14 pb-16">
        <div className="w-full h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.7758!2d-46.7024387!3d-23.6710058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce497db00627e7%3A0x9e1e31d52e1b6!2sAv.+Eng.+Eus%C3%A9bio+Stevaux%2C+823+-+Campo+Grande%2C+S%C3%A3o+Paulo+-+SP%2C+04696-000!5e0!3m2!1spt-BR!2sbr!4v1712000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Senac Santo Amaro"
          />
        </div>
      </section>

      {/* Modal zoom na imagem */}
      {mapZoomed && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          onWheel={handleWheel}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-yellow-custom transition-colors z-50"
            onClick={closeZoom}
          >
            &times;
          </button>

          {/* Zoom controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.3, 1))}
              className="bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              <FaMinus />
            </button>
            <span className="text-white/80 text-sm min-w-[40px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.3, 5))}
              className="bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              <FaPlus />
            </button>
          </div>

          {/* Hint text */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-xs z-50">
            Scroll ou +/− para zoom · Arraste para mover
          </div>

          {/* Image with pan/zoom */}
          <div
            className={`w-full h-full flex items-center justify-center overflow-hidden ${
              zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
            }`}
            onMouseDown={handlePanStart}
            onMouseMove={handlePanMove}
            onMouseUp={handlePanEnd}
            onMouseLeave={handlePanEnd}
          >
            <Image
              src={active.src}
              alt={active.label}
              width={1920}
              height={1280}
              className="max-w-full max-h-[90vh] object-contain"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: isPanning ? "none" : "transform 0.2s ease",
              }}
              priority
              onClick={closeZoom}
            />
          </div>
        </div>
      )}
    </div>
  );
}
