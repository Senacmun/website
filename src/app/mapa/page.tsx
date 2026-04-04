"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaMapPin } from "react-icons/fa";

export default function Campus() {
  const [mapZoomed, setMapZoomed] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (imageExpanded && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setImageExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [imageExpanded]);

  const toggleExpanded = () => setImageExpanded((prev) => !prev);

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

      {/* Imagem + Info */}
      <section className="bg-white dark:bg-[#0B1E2D] px-4 md:px-14 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-x-4 gap-y-6">
          {/* Imagem */}
          <div
            ref={containerRef}
            className="hidden lg:flex-shrink-0 cursor-pointer transition-all duration-500 ease-in-out"
            style={{ width: imageExpanded ? "calc(100% - 12px)" : 420 }}
            onMouseEnter={() => setImageExpanded(true)}
            onMouseLeave={() => setImageExpanded(false)}
            onClick={toggleExpanded}
          >
            <div
              className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md transition-shadow duration-500"
              style={{ height: imageExpanded ? 480 : 320 }}
            >
              <Image
                src="/mapa/campus.jpg"
                alt="Mapa Senamun"
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500"
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
                href="/mapa/campus.jpg"
                download="campus.jpg"
                className="inline-block bg-yellow-custom text-white text-sm py-2 px-5 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Baixar Imagem
              </a>
            </div>
          </div>

          {/* Info */}
          <div
            className="text-gray-800 dark:text-gray-300 leading-relaxed"
            style={{ width: "100%" }}
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
            src="/mapa/campus.jpg"
            alt="Mapa Senamun"
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
            href="/mapa/campus.jpg"
            download="campus.jpg"
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
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-6"
          onClick={() => setMapZoomed(false)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:text-yellow-custom transition-colors"
            onClick={() => setMapZoomed(false)}
          >
            &times;
          </button>
          <Image
            src="/mapa/campus.jpg"
            alt="Mapa Senamun"
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            priority
          />
        </div>
      )}
    </div>
  );
}