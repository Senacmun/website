"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function StickyNavbarHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector("nav") as HTMLElement;
    if (!header) return;

    // ❌ Páginas onde NÃO aplica a animação
    const disabledPages = ["galeria", "parcerias", "inscricao"];

    if (disabledPages.some(page => pathname.includes(page))) return;

    let timeout: ReturnType<typeof setTimeout>;

    header.classList.add(
      "sticky",
      "top-0",
      "left-0",
      "w-full",
      "z-50",
      "transition-all",
      "duration-500",
      "ease-out"
    );

    header.style.transform = "translateY(0)";
    header.style.opacity = "1";

    // 🔒 Detecta se algum dropdown está aberto ou ativo no DOM
    const isDropdownActive = () => {
      return (
        !!document.querySelector(".dropdown-glass:hover") || 
        !!document.querySelector(".dropdown-glass.opacity-100") || 
        !!document.querySelector("[data-state='open']") ||
        document.body.classList.contains("menu-open")
      );
    };

    const handleScroll = () => {
      // Sempre mostra ao mexer
      header.style.transform = "translateY(0)";
      header.style.opacity = "1";

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        // ❗ NÃO esconder se algum dropdown estiver visível ou ativo
        if (isDropdownActive()) return;

        if (window.scrollY > 50) {
          header.style.transform = "translateY(-110%)";
          header.style.opacity = "0";
        }
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);

      header.classList.remove(
        "sticky",
        "top-0",
        "left-0",
        "w-full",
        "z-50",
        "transition-all",
        "duration-500",
        "ease-out"
      );

      header.style.transform = "";
      header.style.opacity = "";
    };
  }, [pathname]);

  return null;
}