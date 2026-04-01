"use client";

import Image from "next/image";
import dados from "../dataMembros";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AcademicoPage() {
  const membros = dados["da"];
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleBack = () => {
    setVisible(false);
    setTimeout(() => router.push("/equipe"), 300);
  };

  return (
    <main className={`min-h-screen bg-white dark:bg-[#0B1E2D] py-10 px-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      
      {/* 🔙 BOTÃO */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <i className="fa-solid fa-arrow-left text-lg group-hover:-translate-x-1 transition"></i>
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            Voltar para Equipe
          </span>
        </button>
      </div>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10 flex items-center gap-4">
        <div className="bg-yellow-custom p-4 rounded-full text-white text-2xl">
          <i className="fa-solid fa-book"></i>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Diretoria Acadêmica
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Responsável pelo conteúdo acadêmico e organização dos comitês.
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {membros.map((membro, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 shadow-lg hover:scale-105 hover:-translate-y-1 transition duration-300 flex flex-col items-center text-center p-4 rounded-xl">
            <div className="relative w-full aspect-square mb-4">
              <Image src={`/time/academico/${membro.imagem}`} alt={membro.nome} fill className="object-cover rounded-xl" />
            </div>
            <h3 className="text-lg font-semibold text-blue-custom dark:text-[#f39322] mt-3">{membro.nome}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{membro.cargo}</p>
          </div>
        ))}
      </div>
    </main>
  );
}