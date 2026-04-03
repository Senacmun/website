"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import IconHeader from "./icon-header.svg";
import { menuData } from "./menuData";
import dadosComites from "@/app/comites/dataComites";

const faqs = [
  {
    pergunta: "O que é o evento Senamun?",
    resposta: "O evento Senamun é o evento do Senac voltado às simulações da ONU, com debates políticos, fantasiosos ou históricos, organizado e liderado por nosso time completamente formado por estudantes. Os debates têm como base eventos políticos reais, indo desde a regularização do comércio mundial até o debate da escala 6x1. O evento Senamun ocorre esse ano (2026) nos dias 11 e 12 de setembro, respectivamente uma sexta e um sábado.",
  },
  {
    pergunta: "O que é a oficina Senamun?",
    resposta: "A oficina Senamun é onde os professores (Fabrício, Naja e Thais) se reúnem para ensinar nossos estudantes desde a base de geopolítica até os debates em si, com simulações internas para aprendizado e prática e, por fim, saindo da escola para representar o Senac em outras organizações, sendo a oficina exclusiva para estudantes do Senac.",
  },
  {
    pergunta: "Quais os temas abordados em debates?",
    resposta: "Depende bastante da organização do debate em si! Porém, as MUN's são focadas em debates políticos tanto da atualidade quanto do passado, como comitês históricos. No Senac também temos os comitês especiais, voltados a temas mitológicos ou fantasiosos, como a extinção da humanidade sendo debatida por deuses.",
  },
  {
    pergunta: "Os debates necessitam de um código de vestimenta?",
    resposta: "Sim! Geralmente as especificações são guiadas pelos mesários, tudo depende da simulação. Grande parte exige um código de vestimenta formal, porém, a maior questão é a vestimenta dos seus companheiros de debate — todos vão estar, então esteja também!",
  },
  {
    pergunta: "Existem outras simulações?",
    resposta: "Sim! Existem diversas outras simulações em outras escolas ou instituições de ensino, onde muitas fazem parcerias garantindo vagas e participação. Lá, assim como no Senamun, debatemos assuntos do cenário político global, voltados à resolução de problemas, liderança, proatividade e, principalmente, trabalho em equipe.",
  },
  {
    pergunta: "Como me preparar para o evento Senamun?",
    resposta: "Com a inscrição no Evento Senamun os delegados receberão no e-mail um convite para participar da turma no Google Classroom, que também será divulgado no Instagram do Senamun. Assim o delegado terá acesso ao guia de estudos e todos os outros documentos produzidos para auxílio nos estudos.",
  },
];

const SACButton = ({
  isOpen,
  onToggle,
  onClose,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) nav.setAttribute("data-faq-open", isOpen ? "true" : "false");
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Só dispara o fechamento se clicar fora E se o FAQ estiver aberto
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, isOpen]);

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        onClick={(e) => {
          e.stopPropagation(); // Evita que o clique feche outros elementos
          onToggle();
        }}
        title="Perguntas Frequentes"
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-yellow-custom hover:bg-yellow-custom/10 transition-all duration-200"
      >
        <i className="fa-solid fa-headset text-base" />
        <span className="hidden lg:inline text-xs font-medium">FAQ</span>
      </button>

      <div
        className={`absolute right-0 top-14 z-50 w-80 md:w-96 rounded-2xl bg-white dark:bg-[#0F2A3D] border border-yellow-custom/30 shadow-2xl dropdown-glass transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-4 border-b border-yellow-custom/20">
          <i className="fa-solid fa-headset text-yellow-custom" />
          <h3 className="text-[#0B2E4A] dark:text-white font-semibold text-sm">
            Perguntas Frequentes
          </h3>
        </div>

        <div className="max-h-[400px] overflow-y-auto divide-y divide-white/5">
          {faqs.map((faq, i) => (
            <div key={i} className="px-5 py-3">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 text-left text-sm font-medium text-[#0B2E4A] dark:text-white hover:text-yellow-custom dark:hover:text-yellow-custom transition-colors duration-200"
              >
                <span>{faq.pergunta}</span>
                <i className={`fa-solid fa-chevron-down text-yellow-custom text-xs flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : "rotate-0"}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-out ${openIndex === i ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed pb-1">
                  {faq.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-yellow-custom/20 text-center">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=comunicacaosenamun@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-light-blue-custom hover:text-yellow-custom transition-colors duration-200 underline underline-offset-2 block mb-2"
          >
            Sua dúvida não foi respondida? Fale com a gente
          </a>
          <p className="text-xs text-gray-500 dark:text-gray-500 select-all">
            comunicacaosenamun@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [lateralOpen, setLateralOpen] = useState<string | null>(null);
  const [activeCommittee, setActiveCommittee] = useState<number | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleDropdown = (name: string) => {
    setDropdownOpen(prev => prev === name ? null : name);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
    setLateralOpen(null);
    setActiveCommittee(null);
  };

  // Função específica para fechar apenas o FAQ sem resetar outros estados globais se não necessário
  const closeFAQ = () => {
    if (dropdownOpen === "FAQ") {
      setDropdownOpen(null);
    }
  };

  const handleLateralHover = (name: string | null) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (name) {
      hoverTimeout.current = setTimeout(() => setLateralOpen(name), 150);
    } else {
      hoverTimeout.current = setTimeout(() => setLateralOpen(null), 150);
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: any
  ) => {
    if (item.submenu) {
      e.preventDefault();
      toggleDropdown(item.name);
    }
  };

  return (
    <nav className="bg-blue-custom relative z-50">
      <div className="2xl:max-w-screen-2xl max-w-screen-xl mx-auto px-2 md:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-light-blue-custom focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="flex-1 flex items-center md:justify-between justify-center md:items-stretch lg">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-4 opacity-95 hover:scale-105 transition-all duration-200">
                <Image src={IconHeader} alt="Icone do Header" width={45} className="hover:rotate-6 transition-transform" />
                <p className="text-white font-medium text-xl tracking-widest">S E N A M U N</p>
              </Link>
            </div>

            <div className="hidden md:flex md:ml-6 items-center">
              <div className="flex space-x-4">
                {menuData.map((item) => (
                  <div key={item.name} className="relative" onMouseLeave={closeDropdown}>
                    <a
                      href={item.href}
                      style={{ fontSize: "14px" }}
                      className={`text-white hover:bg-light-blue-custom lg:px-5 px-2 py-2 rounded-lg tracking-widest duration-150 ${item.submenu ? "cursor-pointer" : ""}`}
                      onClick={(e) => handleLinkClick(e, item)}
                    >
                      {item.name}
                      {item.submenu && (
                        <FiChevronDown className={`inline-block ml-1 h-4 w-4 transform transition-transform ${dropdownOpen === item.name ? "rotate-180" : ""}`} />
                      )}
                    </a>
                    
                    {item.submenu && (
                      <div className={`z-50 origin-top-right absolute right-0 mt-2 w-56 dropdown-glass transition-all duration-300 ease-out transform ${dropdownOpen === item.name ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}>
                        {item.submenu.map((subItem) => {
                          const isComites = subItem.name === "Comitês";
                          return (
                            <div key={subItem.name} className="relative" onMouseEnter={() => isComites && handleLateralHover(subItem.name)} onMouseLeave={() => isComites && handleLateralHover(null)}>
                              <a
                                href={subItem.href}
                                onClick={(e) => isComites && e.preventDefault()}
                                onDoubleClick={() => { window.location.href = subItem.href; }}
                                className="flex items-center justify-between px-4 py-2 text-md text-gray-800 dark:text-gray-200 rounded-md hover:bg-[#1F6FEB] hover:text-white transition-all duration-200"
                              >
                                <span>{subItem.name}</span>
                                {isComites && <span className="ml-2">›</span>}
                              </a>

                              {isComites && (
                                <div className={`absolute left-full top-0 ml-0 w-72 z-50 origin-top-left dropdown-glass transition-all duration-300 transform ${lateralOpen === subItem.name ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-2 scale-95 pointer-events-none"}`}>
                                  <div className="p-2">
                                    <a href="/comites" className="block px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 rounded-md hover:bg-[#1F6FEB] hover:text-white transition-all mb-1 border-b border-white/10 pb-2">Ver todos os comitês</a>
                                    <div className="mt-1 max-h-60 overflow-auto">
                                      {dadosComites.map((c, ci) => (
                                        <div key={ci}>
                                          <button
                                            onClick={() => setActiveCommittee(ci === activeCommittee ? null : ci)}
                                            className={`w-full text-left px-4 py-2 text-sm rounded-md flex items-center justify-between ${activeCommittee === ci ? 'bg-[#1F6FEB] text-white' : 'hover:bg-white/10'}`}
                                          >
                                            <span className="truncate">{c.comite}</span>
                                            <span className="ml-2 text-xs opacity-50">›</span>
                                          </button>
                                          {activeCommittee === ci && (
                                            <div className="mt-1 ml-2 mb-2 p-2 bg-black/10 dark:bg-white/5 rounded-lg space-y-1">
                                              <a href={c.classroom || "#"} className="block px-2 py-1 text-xs hover:text-[#1F6FEB]" target="_blank" rel="noreferrer">• Classroom</a>
                                              <a href={c.whatsapp || "#"} className="block px-2 py-1 text-xs hover:text-[#1F6FEB]" target="_blank" rel="noreferrer">• WhatsApp</a>
                                              <a href={c.pdf || "#"} className="block px-2 py-1 text-xs hover:text-[#1F6FEB]" target="_blank" rel="noreferrer">• Baixar PDF</a>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
                <SACButton
                  isOpen={dropdownOpen === "FAQ"}
                  onToggle={() => toggleDropdown("FAQ")}
                  onClose={closeFAQ}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-200 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuData.map((item) => (
            <div key={item.name}>
              <button
                className="w-full text-left text-gray-300 hover:bg-light-blue-custom hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => toggleDropdown(item.name)}
              >
                {item.name}
                {item.submenu && <FiChevronDown className={`inline-block ml-1 transform transition-transform ${dropdownOpen === item.name ? "rotate-180" : ""}`} />}
              </button>
              {item.submenu && (
                <div className={`pl-5 transition-all duration-300 ${dropdownOpen === item.name ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  {item.submenu.map((subItem) => (
                    <a key={subItem.name} href={subItem.href} className="block px-4 py-2 text-sm text-gray-300 hover:text-white">
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;