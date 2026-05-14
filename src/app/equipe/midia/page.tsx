"use client";

import dados from "../dataMembros";
import TeamMemberCard from "@/components/TeamMemberCard";
import DirectorHeroBanner from "@/components/DirectorHeroBanner";
import { useEffect, useState } from "react";

export default function MidiaPage() {
  const membros = dados["dm"].filter((membro) => membro.pasta === "midia_video");
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
      className={`min-h-screen overflow-x-hidden bg-[#071c2c] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <DirectorHeroBanner
        title="Vídeo"
        subtitle="Responsáveis pela produção audiovisual"
        image="/images/diretorias/Diretoria Mídia - Vídeo.jpg"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-3 lg:grid-cols-4">
        {membros.map((membro, index) => (
          <TeamMemberCard
            key={index}
            name={membro.nome}
            role={membro.cargo}
            imageSrc={`/time/${membro.pasta}/${membro.imagem}`}
          />
        ))}
      </div>
    </main>
  );
}




