"use client";

import dados from "../dataMembros";
import TeamMemberCard from "@/components/TeamMemberCard";
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
      
      {/* ðŸ”™ BOTÃƒO */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 rounded-xl bg-[#0B2A41]/70 px-4 py-2 text-sm font-medium text-yellow-custom shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:text-yellow-400"
        >
          <i className="fa-solid fa-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"></i>
          <span className="font-medium text-yellow-custom">
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
            Diretoria AcadÃªmica
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            ResponsÃ¡vel pelo conteÃºdo acadÃªmico e organizaÃ§Ã£o dos comitÃªs.
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {membros.map((membro, index) => (
          <TeamMemberCard
            key={index}
            name={membro.nome}
            role={membro.cargo}
            imageSrc={`/time/academico/${membro.imagem}`}
            nameClassName="text-lg font-semibold text-blue-custom dark:text-[#f39322] mt-3"
          />
        ))}
      </div>
    </main>
  );
}
