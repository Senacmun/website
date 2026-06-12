"use client";

import Image from "next/image";
import quemSomos from "./dataQuemSomos";
import { useEffect, useRef, useState } from "react";

const FadeInSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1E2D] overflow-x-hidden pt-10">
      
      {/* TOPO */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="hidden md:block h-[2px] bg-yellow-custom opacity-70 flex-grow"></div>

          <div className="flex flex-col items-center px-6 md:px-12 text-center shrink-0">
            <Image
              src="/logo-senamun.png"
              alt="Logo SenaMUN"
              width={150}
              height={150}
              className="mb-3 drop-shadow-sm"
            />
            <h1 className="text-blue-custom dark:text-white text-4xl md:text-5xl font-bold tracking-tight">
              Quem Somos
            </h1>
            <h2 className="text-yellow-custom text-2xl md:text-3xl font-semibold mt-1 dark:drop-shadow-[0_0_6px_rgba(243,147,34,0.6)]">
              SenaMUN V
            </h2>
          </div>

          <div className="hidden md:block h-[2px] bg-yellow-custom opacity-70 flex-grow"></div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        
        {/* Missão */}
        <FadeInSection className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-custom dark:text-[#f39322]">
              Missão
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mt-5">
              {quemSomos}
            </p>
          </div>
          <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
            <Image src="/quem-somos/Foto_1.jpeg" alt="Nossa Missão" fill className="object-cover" />
          </div>
        </FadeInSection>

        {/* Visões */}
        <FadeInSection className="grid md:grid-cols-2 gap-10 items-center">
          <div className="md:order-2 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-custom dark:text-[#f39322]">
              Visão
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mt-5">
              Tornar-se referência na área de MUN&apos;s pela excelência acadêmica, pluralidade, inclusão e impacto social.
            </p>
          </div>
          <div className="md:order-1 relative h-[280px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
            <Image src="/quem-somos/Foto_2.jpeg" alt="Visões" fill className="object-cover" />
          </div>
        </FadeInSection>

        {/* Ideal */}
        <FadeInSection className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-custom dark:text-[#f39322]">
              Valores
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mt-5">
              Excelência Acadêmica, ​Diplomacia, Respeito, ​Protagonismo Jovem, ​Inclusão e Pluralidade, ​Ética e Transparência
            </p>
          </div>
          <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
            <Image src="/quem-somos/Foto_3.jpeg" alt="Valores" fill className="object-cover" />
          </div>
        </FadeInSection>

      </section>
    </main>
  );
}
