"use client";

import dadosMembros from "../dataMembros";
import TeamMemberCard from "@/components/TeamMemberCard";
import DirectorHeroBanner from "@/components/DirectorHeroBanner";
import { useEffect } from "react";

export default function DiretoriaImagemPage() {
  const membros = dadosMembros.di.filter((membro) => membro.pasta === "midia_imagem");

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FontAwesome) {
      (window as any).FontAwesome.dom.i2svg();
    }
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#071c2c]">
      <DirectorHeroBanner
        title="Diretoria de Imagem"
        subtitle="Responsáveis pelos registros fotográficos e identidade visual"
        image="/images/diretorias/Diretoria Mídia - Imagem.jpg"
      />

      <div className="mx-auto mb-20 max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {membros.map((membro, index) => (
            <TeamMemberCard
              key={index}
              name={membro.nome}
              role={membro.cargo}
              imageSrc={`/time/${membro.pasta}/${membro.imagem}`}
              cardClassName="bg-white dark:bg-slate-800 shadow-lg hover:scale-105 transition duration-300 flex flex-col items-center text-center p-4 rounded-xl"
              imageClassName="aspect-square object-cover rounded-xl"
            />
          ))}
        </div>
      </div>
    </main>
  );
}




