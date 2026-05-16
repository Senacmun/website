"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { FaWhatsapp, FaGoogle } from "react-icons/fa"; // Para Classroom e WhatsApp
import IconHeader from "./icon-header.svg";
import { menuData } from "./menuData";
import StickyNavbarHandler from "../StickyNavbarHandler";
import { FiChevronRight } from "react-icons/fi";

const dropdownItems = {
  sobre: [
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Equipe", href: "/equipe" },
    { name: "Galeria de Fotos", href: "/galeria" },
  ],
  senamun: [
    { name: "Comitês", href: "#", hasSub: true },
    { name: "Recursos", href: "/recursos" },
    { name: "Mapa", href: "/mapa" },
    { name: "Parcerias", href: "/parcerias" },
    { name: "Edições Anteriores", href: "/edicoes" },
  ],
  comites: [
    "Direitos Humanos",
    "Conselho de Segurança",
    "Conselho de Segurança",
    "Câmara dos Deputados",
    "Parlamento Americano",
    "Human Rights",
    "Historical Security Council",
  ]
};

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [committeesOpen, setCommitteesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora ou ESC
  useEffect(() => {
    const handleInteraction = (e: any) => {
      if (e.key === "Escape") setActiveDropdown(null);
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return (
    <>
      <StickyNavbarHandler />
      <nav ref={navRef} className="bg-blue-custom relative z-50 w-full h-20 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-4">
            <Image src={IconHeader} alt="Icone" width={45} />
            <p className="text-white text-xl tracking-widest font-semibold uppercase">S E N A M U N</p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {/* Item Simples: Sobre Nós */}
            <div className="relative h-full flex items-center">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'sobre' ? null : 'sobre')}
                className={`flex items-center gap-2 text-[15px] font-medium transition-all duration-200 px-4 py-1.5 ${activeDropdown === 'sobre' ? 'bg-[#3b82f6] text-white rounded-full' : 'text-white hover:text-yellow-custom'}`}
              >
                Sobre Nós 
                <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'sobre' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-[calc(100%-10px)] left-0 min-w-[220px] glass-v2 rounded-[10px] py-2 transition-all duration-150 ${activeDropdown === 'sobre' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                {dropdownItems.sobre.map(i => (
                  <Link key={i.name} href={i.href} className="block px-5 py-[10px] text-[15px] text-[#1a1a2e] dark:text-white hover:bg-blue-500/10 hover:text-[#3b82f6] transition-colors">{i.name}</Link>
                ))}
              </div>
            </div>

            {/* Item Complexo: SenaMUN 2026 */}
            <div className="relative h-full flex items-center">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'senamun' ? null : 'senamun')}
                className={`flex items-center gap-2 text-[15px] font-medium transition-all duration-200 px-4 py-1.5 ${activeDropdown === 'senamun' ? 'bg-[#3b82f6] text-white rounded-full' : 'text-white hover:text-yellow-custom'}`}
              >
                SenaMUN 2026
                <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'senamun' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-[calc(100%-10px)] left-0 min-w-[220px] glass-v2 rounded-[10px] py-2 transition-all duration-150 ${activeDropdown === 'senamun' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                {dropdownItems.senamun.map(i => (
                  <div key={i.name} className="relative group/sub">
                    <Link 
                      href={i.href} 
                      onMouseEnter={() => i.hasSub && setCommitteesOpen(true)}
                      onMouseLeave={() => i.hasSub && setCommitteesOpen(false)}
                      className={`flex items-center justify-between px-5 py-[10px] text-[15px] transition-colors ${i.hasSub && committeesOpen ? 'bg-[#3b6fc4] text-white' : 'text-[#1a1a2e] dark:text-white hover:bg-blue-500/10 hover:text-[#3b82f6]'}`}
                    >
                      {i.name} {i.hasSub && <FiChevronRight />}
                    </Link>

                    {/* Sub-painel Comitês */}
                    {i.hasSub && (
                      <div className={`absolute left-[calc(100%+2px)] top-0 w-72 glass-v2 rounded-[10px] p-4 transition-all duration-150 ${committeesOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`}>
                        <Link href="/comites" className="block text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-2 border-b border-white/10 pb-2 hover:text-[#3b82f6]">Ver todos os comitês</Link>
                        <div className="max-height-[260px] overflow-y-auto dropdown-scrollbar pr-2 flex flex-col gap-[2px]">
                          {dropdownItems.comites.map(c => (
                            <Link key={c} href="#" className="flex items-center justify-between px-3 py-[10px] text-[14px] text-[#1a1a2e] dark:text-white hover:bg-blue-500/10 hover:text-[#3b82f6] rounded-md transition-colors">
                              {c} <FiChevronRight className="text-[12px] opacity-50" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/inscricao" className="text-white text-[15px] font-medium hover:text-yellow-custom">Inscrição</Link>
            <Link href="/contato" className="text-white text-[15px] font-medium hover:text-yellow-custom">Fale Conosco</Link>
            
            <button className="flex items-center gap-2 text-[15px] text-yellow-custom font-medium hover:text-white">
              <i className="fa-solid fa-headset" /> FAQ
            </button>
          </div>

          {/* Hamburger Mobile */}
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-white">
             <i className="fa-solid fa-bars text-2xl" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
