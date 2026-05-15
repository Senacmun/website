"use client";

import { useEffect, useState } from "react";
import dados from "../dataMembros";
import TeamMemberCard from "@/components/TeamMemberCard";
import DirectorHeroBanner from "@/components/DirectorHeroBanner";

export default function DiretoriaImagemPage() {
  // Filtramos os membros da diretoria de mídia que pertencem especificamente à delegação de imagem
  const membros = dados["di"].filter((m) => m.pasta === "midia_imagem");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para garantir a animação de entrada
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`min-h-screen overflow-x-hidden bg-white dark:bg-[#0B1E2D] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <DirectorHeroBanner
        title="Mídia & Imagem"
        subtitle="Responsáveis pela cobertura visual e identidade do SenaMUN V"
        image="/images/diretorias/Midia.jpg"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-3 lg:grid-cols-4 bg-white dark:bg-[#0B1E2D] transition-colors duration-500">
        {membros.map((membro, index) => (
          <TeamMemberCard
            key={index}
            name={membro.nome}
            role="Delegação de Mídia Imagem"
            imageSrc={`/time/midia_imagem/${membro.imagem}`}
          />
        ))}
      </div>
    </main>
  );
}