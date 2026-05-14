"use client";

import dados from "../dataMembros";
import TeamMemberCard from "@/components/TeamMemberCard";
import DirectorHeroBanner from "@/components/DirectorHeroBanner";
import { useEffect, useState } from "react";

export default function AcademicoPage() {
  const membros = dados["da"];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <main className={`min-h-screen overflow-x-hidden bg-[#071c2c] transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <DirectorHeroBanner
        title="Diretoria Acadêmica"
        subtitle="Responsável pelo conteúdo acadêmico e organização dos comitês."
        image="/images/diretorias/Diretoria Acadêmico PT.jpg"
      />

      {/* CARDS */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-3 lg:grid-cols-4">
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
