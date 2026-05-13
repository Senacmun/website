"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  cardClassName = "bg-white dark:bg-slate-800 shadow-lg hover:scale-105 hover:-translate-y-1 transition duration-300 flex flex-col items-center text-center p-4 rounded-xl",
  imageWrapperClassName = "relative w-full aspect-square mb-4",
  imageClassName = "object-cover rounded-xl",
  nameClassName = "text-lg font-semibold text-[#0B2E4A] dark:text-white mt-3",
  roleClassName = "text-sm text-gray-600 dark:text-gray-400 mt-1",
  contentClassName = "",
}: TeamMemberCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
      <div className={cardClassName}>
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
            className="fixed right-6 top-6 z-[90] text-2xl font-light leading-none text-white transition-transform duration-200 hover:scale-110 hover:text-yellow-custom focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-custom"
            aria-label="Fechar imagem"
          >
            x
          </button>

          <div
            className="flex w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative h-[70vh] w-full bg-transparent">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white">{name}</h2>
            <p className="mt-1 text-sm font-medium text-gray-200">{role}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
