import React, { useEffect } from "react";
import Image from "next/image";

interface Member {
  nome: string;
  cargo: string;
  imageSrc: string; // Agora espera o caminho completo
}

interface TeamMemberGalleryModalProps {
  members: Member[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function TeamMemberGalleryModal({
  members,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: TeamMemberGalleryModalProps) {
  if (!members || members.length === 0) {
    return null;
  }

  const currentMember = members[currentIndex];

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" onClick={onClose}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed right-6 top-6 z-[120] text-5xl font-extralight leading-none text-white transition-all duration-200 hover:scale-110 hover:text-yellow-custom focus:outline-none cursor-pointer"
        aria-label="Fechar galeria"
      >
        &times;
      </button>

      {/* Main content wrapper - This block will be centered by its parent (the modal overlay) */}
      {/* We apply a transform to shift the entire block up slightly */}
      <div className="relative flex flex-col items-center w-full max-w-4xl transform -translate-y-8" onClick={(e) => e.stopPropagation()}>
        {/* Image Container with fixed relative height */}
        <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
          <Image 
            src={currentMember.imageSrc} 
            alt={currentMember.nome} 
            fill 
            className="object-contain rounded-md" 
            priority 
          />
          {/* Navigation Arrows - Absolute to the image container */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 text-white text-6xl font-extralight hover:scale-110 transition-all focus:outline-none opacity-70 hover:opacity-100 cursor-pointer p-4 select-none"
            aria-label="Foto anterior"
          >
            &lt;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 text-white text-6xl font-extralight hover:scale-110 transition-all focus:outline-none opacity-70 hover:opacity-100 cursor-pointer p-4 select-none"
            aria-label="Próxima foto"
          >
            &gt;
          </button>
        </div>

        {/* Member Info */}
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-semibold text-white">
            {currentMember.nome}
          </h3>
          <p className="text-gray-300 text-lg">
            {currentMember.cargo}
          </p>
        </div>
      </div>
    </div>
  );
}