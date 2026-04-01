"use client";

import Image from "next/image";
import dadosMembros from "../dataMembros";

export default function DiretoriaImagemPage() {
  const membros = dadosMembros.di;

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1E2D] py-10 px-6">
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center my-14 underline text-blue-custom dark:text-[#f39322]">
          Diretoria de Imagem
        </h2>

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