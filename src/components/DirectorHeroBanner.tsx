"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type DirectorHeroBannerProps = {
  title: string;
  subtitle: string;
  image: string;
};

function getDirectorIcon(title: string) {
  const normalizedTitle = title.toLowerCase();
  if (normalizedTitle.includes("secretariado")) return "fa-user-tie";
  if (normalizedTitle.includes("comunica")) return "fa-bullhorn";
  if (normalizedTitle.includes("crise")) return "fa-fire";
  if (normalizedTitle.includes("imprensa")) return "fa-newspaper";
  if (normalizedTitle.includes("log")) return "fa-table";
  if (normalizedTitle.includes("video") || normalizedTitle.includes("vídeo")) return "fa-mobile";
  if (normalizedTitle.includes("imagem")) return "fa-camera";
  if (normalizedTitle.includes("ingl") || normalizedTitle.includes("port") || normalizedTitle.includes("acad")) return "fa-book-open";
  return "fa-book";
}

export default function DirectorHeroBanner({ title, subtitle, image }: DirectorHeroBannerProps) {
  const icon = getDirectorIcon(title);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).FontAwesome) {
      (window as any).FontAwesome.dom.i2svg();
    }
  }, [icon]);

  return (
    <section className="relative isolate h-[420px] min-h-[420px] overflow-hidden bg-white dark:bg-[#0B1E2D] transition-colors duration-500 md:h-[450px] lg:h-[480px]">

      {/* 
         MUDANÇA: object-contain + position right
         - object-contain: Mostra a imagem INTEIRA sem cortar
         - object-[100%_0%]: Alinha o bloco da imagem no canto superior direito
      */}
      <div className="absolute inset-0 p-6 md:p-10 lg:p-14">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="rounded-3xl rounded-bl-[40px] md:rounded-bl-[80px] object-contain object-center md:object-[90%_center]"
          style={{
            maskImage: "linear-gradient(to right, black 0%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 85%, transparent 100%)",
          }}
        />
      </div>

      {/* Overlay: Totalmente transparente em ambos os temas para não filtrar a imagem */}
      <div className="absolute inset-0 z-10 bg-transparent transition-colors duration-500" />

      {/* Gradiente Esquerdo: Legibilidade do texto (Suavizado em 80% no Light Mode) */}
      <div className="absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-white via-white/70 to-transparent dark:from-[#0B1E2D] dark:via-[#0B1E2D]/90 md:via-white/40 md:dark:via-[#0B1E2D]/75 dark:to-transparent transition-all duration-500" />

      {/* Gradiente Direito: Reduzido para não tapar rostos no lado direito */}
      <div className="absolute inset-y-0 right-0 z-10 w-1/6 bg-gradient-to-l from-white/10 to-transparent dark:from-[#0B1E2D]/30 transition-all duration-500" />

      {/* Overlay topo: Desativado em ambos os modos para manter a nitidez da foto */}
      <div className="absolute inset-0 z-10 bg-none transition-all duration-500" />

      {/* Conteúdo */}
      <div className="relative z-20 mx-auto flex h-full max-w-[1408px] flex-col items-start justify-center px-6 pb-16 md:px-10 md:pb-20">
        <Link
          href="/equipe"
          className="group mb-7 inline-flex items-center gap-2 rounded-xl bg-gray-200/80 dark:bg-[#0B2A41]/70 px-4 py-2 text-sm font-medium text-yellow-custom shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105"
        >
          <span className="text-lg font-bold">←</span>
          Voltar para Equipe
        </Link>

        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-yellow-custom/15 text-yellow-custom ring-1 ring-yellow-custom/25 backdrop-blur-sm">
            <i className={`fa-solid ${icon} text-2xl`} />
          </div>

          <div className="flex flex-col">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#0B2E4A] dark:text-white transition-colors duration-500 md:text-5xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-200/90 transition-colors duration-500 md:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Onda Grande */}
     <svg
        className="pointer-events-none absolute bottom-[-1px] left-0 z-30 h-[80px] sm:h-[100px] md:h-[155px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="fill-white dark:fill-[#0B1E2D] transition-colors duration-500"
          d="M0 120V72L60 66C120 60 240 48 360 52C480 56 600 76 720 78C840 80 960 64 1080 54C1200 44 1320 40 1380 38L1440 36V120H0Z"
        />
      </svg>
    </section>
  );
}