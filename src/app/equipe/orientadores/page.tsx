"use client";

import Image from "next/image";
import Link from "next/link";
import dados from "../dataMembros";
import { useEffect, useState } from "react";

export default function OrientadoresPage() {
  const membros = dados["ori"];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FontAwesome) {
      (window as any).FontAwesome.dom.i2svg();
    }
  }, []);

  return (
    <main
      className={`min-h-screen bg-white dark:bg-[#0B1E2D] py-10 px-6 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <Link
          href="/equipe"
          className="group mb-8 inline-flex items-center gap-2 rounded-xl bg-[#0B2A41]/70 px-4 py-2 text-sm font-medium text-yellow-custom shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:text-yellow-400"
        >
          <span className="inline-block text-lg font-bold leading-none transition-transform duration-300 group-hover:-translate-x-1 group-active:-translate-x-2">
            ←
          </span>
          Voltar para Equipe
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="bg-yellow-custom/10 dark:bg-yellow-custom/20 rounded-full p-4 flex items-center justify-center">
            <i className="fa-solid fa-chalkboard-user text-yellow-custom text-3xl" />
          </div>
          <div>
            <h1 className="text-[#0B2E4A] dark:text-white font-bold text-4xl md:text-5xl">
              Orientadores
            </h1>
            <p className="text-[#36566F] dark:text-gray-400 text-sm mt-1">
              Responsáveis pela orientação dos delegados
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-yellow-custom/40 via-transparent to-transparent mt-6 mb-10" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {membros.map((membro, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 shadow-lg hover:scale-105 hover:-translate-y-1 transition duration-300 flex flex-col items-center text-center p-4 rounded-xl"
          >
            <div className="relative w-full aspect-square mb-4">
              <Image
                src={`/time/orientadores/${membro.imagem}`}
                alt={membro.nome}
                fill
                className="object-cover object-top rounded-xl"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#0B2E4A] dark:text-white mt-3">
              {membro.nome}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {membro.cargo}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}




