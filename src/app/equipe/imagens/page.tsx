"use client";

import Image from "next/image";
import Link from "next/link";
import dadosMembros from "../dataMembros";
import { useEffect } from "react";

export default function DiretoriaImagemPage() {
  const membros = dadosMembros.di;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FontAwesome) {
      (window as any).FontAwesome.dom.i2svg();
    }
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1E2D] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/equipe"
          className="group inline-flex items-center gap-2 text-yellow-custom hover:text-yellow-400 font-semibold text-base mb-8 transition-all duration-200"
        >
          <span className="inline-block text-lg font-bold leading-none transition-transform duration-300 group-hover:-translate-x-1 group-active:-translate-x-2">
            ←
          </span>
          Voltar para Equipe
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="bg-yellow-custom/10 dark:bg-yellow-custom/20 rounded-full p-4 flex items-center justify-center">
            <i className="fa-solid fa-camera text-yellow-custom text-3xl" />
          </div>
          <div>
            <h1 className="text-white dark:text-white font-bold text-4xl md:text-5xl">
              Diretoria de Imagem
            </h1>
            <p className="text-gray-400 dark:text-gray-400 text-sm mt-1">
              Responsáveis pelos registros fotográficos e identidade visual
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-yellow-custom/40 via-transparent to-transparent mt-6 mb-10" />
      </div>

      <div className="max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {membros.map((membro, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 shadow-lg hover:scale-105 transition duration-300 flex flex-col items-center text-center p-4 rounded-xl"
            >
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={`/time/${membro.imagem}`}
                  alt={membro.nome}
                  fill
                  className="aspect-square object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-semibold mt-3 text-blue-custom dark:text-[#f39322]">
                {membro.nome}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {membro.cargo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}



