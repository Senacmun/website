"use client";

import dados from "../dataMembros";
import TeamMemberCard from "@/components/TeamMemberCard";
import DirectorHeroBanner from "@/components/DirectorHeroBanner";
import { useEffect, useState } from "react";

export default function AcademicoPtPage() {
  // Assumindo que 'dap' é a chave para a diretoria Acadêmica de Português em dataMembros
  const membros = dados["dap"]; 
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
      className={`min-h-screen overflow-x-hidden bg-white dark:bg-[#0B1E2D] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <DirectorHeroBanner
        title="Acadêmico de Português"
        subtitle="Responsáveis pelo suporte acadêmico e correção de documentos"
        image="/images/diretorias/Diretoria Academico - Portugues.jpg" // Ajuste o caminho da imagem se necessário
      />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-3 lg:grid-cols-4 bg-white dark:bg-[#0B1E2D] transition-colors duration-500">
        {membros.map((membro, index) => (
          <TeamMemberCard
            key={index}
            name={membro.nome}
            role={membro.cargo}
            imageSrc={`/time/academico-pt/${membro.imagem}`} // Ajuste o caminho da pasta se necessário
          />
        ))}
      </div>
    </main>
  );
}