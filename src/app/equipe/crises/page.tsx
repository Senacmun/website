"use client";

import dados from "../dataMembros";
import TeamMemberCard from "@/components/TeamMemberCard";
import DirectorHeroBanner from "@/components/DirectorHeroBanner";
import { useEffect, useRef, useState } from "react";

export default function CrisesPage() {
  const membros = dados["ddcr"];
  const [visible, setVisible] = useState(false);
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setVisible(true);
      });
    });

    const currentRef = pageRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FontAwesome) {
      (window as any).FontAwesome.dom.i2svg();
    }
  }, []);

  return (
    <main
      ref={pageRef}
      className={`min-h-screen overflow-x-hidden bg-[#071c2c] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <DirectorHeroBanner
        title="Diretoria de Crises"
        subtitle="Responsáveis pelos comitês e simulações de crise"
        image="/images/diretorias/Diretoria de Crise.jpg"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-3 lg:grid-cols-4">
        {membros && membros.length > 0 ? (
          membros.map((membro, index) => (
            <TeamMemberCard
              key={index}
              name={membro.nome}
              role={membro.cargo}
              imageSrc={`/time/crises/${membro.imagem}`}
              nameClassName="font-bold text-[#0B2E4A] dark:text-white text-lg mt-3"
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 dark:text-gray-400">
            Nenhum membro encontrado na Diretoria de Crises.
          </div>
        )}
      </div>
    </main>
  );
}




