"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

type TeamMemberCardProps = {
  name: string;
  role: string;
  imageSrc: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  nameClassName?: string;
  roleClassName?: string;
  contentClassName?: string;
};

export default function TeamMemberCard({
  name,
  role,
  imageSrc,
  cardClassName = "bg-white dark:bg-[#0B1E2D] border border-gray-200/50 dark:border-white/5 shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center p-4 rounded-xl",
  imageWrapperClassName = "relative w-full aspect-square mb-4",
  imageClassName = "object-cover rounded-xl",
  nameClassName = "text-lg font-semibold text-[#0B2E4A] dark:text-white mt-3",
  roleClassName = "text-sm text-gray-600 dark:text-gray-400 mt-1",
  contentClassName = "",
}: TeamMemberCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Para a animação rodar apenas uma vez ao entrar na tela
          if (cardRef.current) observer.unobserve(cardRef.current);
        }
      },
      { 
        threshold: 0.1, // Dispara quando 10% do card está visível
        rootMargin: "0px 0px -30px 0px" // Ajuste fino para o disparo
      }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div 
        ref={cardRef}
        className={`${cardClassName} transition-all duration-700 ease-out will-change-transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`${imageWrapperClassName} block cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-custom focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1E2D]`}
          aria-label={`Abrir foto de ${name}`}
        >
          <Image src={imageSrc} alt={name} fill className={imageClassName} />
        </button>

        <div className={contentClassName}>
          <h3 className={nameClassName}>{name}</h3>
          <p className={roleClassName}>{role}</p>
        </div>
      </div>

      {isOpen &&
        isMounted &&
        createPortal(
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto de ${name}`}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="fixed right-6 top-6 z-[90] text-4xl font-light leading-none text-white transition-transform duration-200 hover:scale-110 hover:text-yellow-custom focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-custom"
            aria-label="Fechar imagem"
          >
            &times;
          </button>

          <div
            className="flex w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-2xl">
              <div className="relative h-[70vh] w-full bg-transparent">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white">{name}</h2>
            <p className="mt-1 text-sm font-medium text-gray-300">{role}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
