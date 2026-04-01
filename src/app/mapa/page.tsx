"use client";

import React from "react";
import Image from "next/image";
import { FaMapPin } from "react-icons/fa";

export default function Campus() {
  return (
    <div>
      {/* Header */}
      <section className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-[#0B1E2D] transition-colors duration-300">
        <div className="px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide text-blue-custom dark:text-[#f39322]">
            Mapa
          </h1>
          <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg">
            Localize-se durante o evento
          </p>
          <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-yellow-custom/40 to-transparent dark:via-[#013563]/40"></div>
        </div>
      </section>

      {/* Imagem do mapa */}
      <section className="bg-white dark:bg-[#0B1E2D] flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/mapa/campus.jpg"
            alt="Mapa Senamun"
            className="mt-10"
            width={1600}
            height={800}
            priority
          />
          <a
            href="/mapa/campus.jpg"
            download="campus.jpg"
            className="mb-10 bg-yellow-custom text-white py-2 px-4 rounded hover:opacity-90 transition"
          >
            Baixar Imagem
          </a>
        </div>
      </section>

      {/* Info */}
      <section className="bg-white dark:bg-[#0B1E2D]">
        <div className="py-16 px-14 text-gray-800 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <FaMapPin />
            Centro Universitário Senac Santo Amaro – Av. Eng. Eusébio Stevaux,
            823 - Campo Grande - São Paulo - SP, 04696-000 (Portaria 1)
          </p>

          <h1 className="mt-6 font-semibold text-gray-900 dark:text-white">
            Mais informações:
          </h1>

          <div className="text-justify flex flex-col gap-3 mt-1">
            <p>
              Esta é a principal entrada da unidade, porém há a Portaria 2, que
              fica localizada na Rua Professor Campos de Oliveira, 588 - Jardim
              Anhanguera, São Paulo - SP, 04675-100.
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
      </section>
    </div>
  );
}