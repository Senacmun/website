"use client";

import React, { useState, useRef, useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown, FiX, FiChevronsDown, FiChevronRight, FiMenu } from "react-icons/fi";
import IconHeader from "./icon-header.svg";
import StickyNavbarHandler from "../StickyNavbarHandler";
import committeeData from "@/app/comites/dataComites";

const sortedCommitteeData = [...committeeData].sort((a, b) => {
  const nameA = a.comite === "C. de Segurança Histórico" ? "Conselho de Segurança Histórico" : a.comite;
  const nameB = b.comite === "C. de Segurança Histórico" ? "Conselho de Segurança Histórico" : b.comite;
  return nameA.localeCompare(nameB);
});

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
};

const faqs = [
  { pergunta: "O que é o evento Senamun?", resposta: "O evento Senamun é o evento do Senac voltado às simulações da ONU." },
  { pergunta: "O que é a oficina Senamun?", resposta: "A oficina Senamun é onde os professores se reúnem para ensinar nossos estudantes." },
  { pergunta: "Quais os temas abordados em debates?", resposta: "Depende bastante da organização do debate em si!" },
  { pergunta: "Os debates necessitam de um código de vestimenta?", resposta: "Sim! Geralmente as especificações são guiadas pelos mesários." },
  { pergunta: "Existem outras simulações?", resposta: "Sim! Existem diversas outras simulações em outras escolas." },
  { pergunta: "Como me preparar para o evento Senamun?", resposta: "Com a inscrição no Evento Senamun os delegados receberão no e-mail um convite." },
];

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [committeesOpen, setCommitteesOpen] = useState(false);
  const [expandedCommittee, setExpandedCommittee] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const dropdownPanelStyle = "rounded-[10px] border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.18)] dark:border-white/10";

  const scrollbarStyles = `
    .dropdown-scrollbar::-webkit-scrollbar { width: 4px; }
    .dropdown-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
    .dropdown-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 10px; }
    .dark .dropdown-scrollbar::-webkit-scrollbar-track { background: #0d1b2e; }
  `;

  useEffect(() => {
    const handleInteraction = (e: any) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setFaqModalOpen(false);
      }
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
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <nav ref={navRef} className="bg-blue-custom relative z-50 w-full h-20 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image src={IconHeader} alt="Icone" width={45} />
            <p className="text-white text-xl tracking-widest font-semibold uppercase">S E N A M U N</p>
          </Link>

          <div className="hidden md:flex items-center gap-8 h-full">
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'sobre' ? null : 'sobre')}
                className={`flex items-center gap-2 text-[15px] font-normal transition-all duration-150 px-4 py-2 rounded-lg hover:bg-[#1f6feb] hover:text-white ${
                  activeDropdown === 'sobre' ? 'bg-[#1f6feb] text-white' : 'text-white'}`}
              >
                Sobre Nós
                <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'sobre' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-[calc(100%+8px)] left-0 min-w-[220px] py-2 transition-all duration-150 ${dropdownPanelStyle} ${
                activeDropdown === 'sobre' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              } bg-white/80 dark:bg-[rgba(10,20,45,0.75)] backdrop-blur-[12px]`}>
                {dropdownItems.sobre.map((item) => (
                  <Link key={item.name} href={item.href} className="block px-5 py-2 text-[15px] transition-colors dark:text-white text-[#1a1a2e] hover:bg-[#1f6feb] hover:text-white">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative h-full flex items-center">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'senamun' ? null : 'senamun')}
                className={`flex items-center gap-2 text-[15px] font-normal transition-all duration-150 px-4 py-2 rounded-lg hover:bg-[#1f6feb] hover:text-white ${
                  activeDropdown === 'senamun' ? 'bg-[#1f6feb] text-white' : 'text-white'}`}
              >
                SenaMUN 2026
                <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'senamun' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-[calc(100%+8px)] left-0 min-w-[220px] py-2 transition-all duration-150 ${dropdownPanelStyle} ${
                activeDropdown === 'senamun' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              } bg-white/80 dark:bg-[rgba(10,20,45,0.75)] backdrop-blur-[12px]`}>
                {dropdownItems.senamun.map(i => (
                  <div key={i.name} className="relative">
                    {i.hasSub ? (
                      <button
                        onMouseEnter={() => setCommitteesOpen(true)}
                        onMouseLeave={() => setCommitteesOpen(false)}
                        className="flex items-center justify-between w-full px-5 py-2 text-[15px] transition-colors dark:text-white text-[#1a1a2e] hover:bg-[#1f6feb] hover:text-white"
                      >
                        Comitês <FiChevronRight />
                      </button>
                    ) : (
                      <Link href={i.href} className="flex items-center justify-between px-5 py-2 text-[15px] transition-colors dark:text-white text-[#1a1a2e] hover:bg-[#1f6feb] hover:text-white">
                        {i.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div
                  onMouseEnter={() => setCommitteesOpen(true)}
                  onMouseLeave={() => setCommitteesOpen(false)}
                  className={`absolute left-[calc(100%+2px)] top-0 w-72 py-4 px-3 transition-all duration-150 ${dropdownPanelStyle} ${
                    committeesOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-2 pointer-events-none'
                  } bg-white/95 dark:bg-[rgba(10,20,45,0.92)] backdrop-blur-[12px]`}
                >
                  <Link href="/comites" className="block text-[13px] font-bold uppercase tracking-wider mb-2 border-b border-black/5 dark:border-white/7 pb-2 text-[#6b7280] dark:text-gray-400 hover:text-[#2563eb]">
                    Ver todos os comitês
                  </Link>
                  <div className="max-h-[260px] overflow-y-auto dropdown-scrollbar pr-2 flex flex-col gap-[2px]">
                    {sortedCommitteeData.map((committee) => (
                      <div key={committee.comite}>
                        <button
                          onClick={() => setExpandedCommittee(expandedCommittee === committee.comite ? null : committee.comite)}
                          className="flex items-center justify-between w-full px-3 py-1.5 text-[14px] transition-colors dark:text-white text-[#1a1a2e] hover:bg-[#1f6feb] hover:text-white rounded"
                        >
                          <span className="truncate">{committee.comite}</span>
                          <FiChevronRight className={`text-[12px] opacity-50 flex-shrink-0 transition-transform duration-200 ${expandedCommittee === committee.comite ? 'rotate-90' : ''}`} />
                        </button>

                        <div className={`overflow-hidden transition-all duration-200 ${
                          expandedCommittee === committee.comite ? 'max-h-40 mt-1' : 'max-h-0'
                        }`}>
                          <div className="pl-6">
                            <div className="inline-flex flex-col gap-2 px-8 py-3 min-w-[200px] text-[14px] text-black/70 dark:text-white/70 bg-gray-100 dark:bg-white/10 rounded-xl">
                              <a href={committee.classroom || ""} className="hover:text-black dark:hover:text-white">• Classroom</a>
                              <a href={committee.whatsapp || ""} className="hover:text-black dark:hover:text-white">• WhatsApp</a>
                              <a href={committee.pdf || ""} className="hover:text-black dark:hover:text-white">• Baixar PDF</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/inscricao" className="text-white text-[15px] font-normal px-4 py-2 rounded-lg hover:bg-[#1f6feb] transition-all duration-150">Inscrição</Link>
            <Link href="/contato" className="text-white text-[15px] font-normal px-4 py-2 rounded-lg hover:bg-[#1f6feb] transition-all duration-150">Fale Conosco</Link>

            <div className="relative h-full flex items-center">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'faq' ? null : 'faq')}
                className={`flex items-center gap-2 text-[15px] font-normal transition-all duration-150 px-4 py-1.5 rounded-lg hover:bg-yellow-custom/10 ${
                  activeDropdown === 'faq' ? 'bg-yellow-custom/10 text-yellow-custom' : 'text-yellow-custom'}`}
              >
                <i className="fa-solid fa-headset" /> FAQ
              </button>

              <div className={`absolute top-[calc(100%+8px)] right-0 w-[360px] md:w-[384px] rounded-2xl overflow-hidden transition-all duration-300 ease-out ${
                activeDropdown === 'faq' ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
              } bg-white dark:bg-[#0F2A3D] border border-yellow-custom/30 shadow-2xl`}>
                <div className="flex items-center gap-2 px-5 py-4 border-b border-yellow-custom/20">
                  <i className="fa-solid fa-headset text-yellow-custom" />
                  <h3 className="text-[#0B2E4A] dark:text-white font-semibold text-sm">Perguntas Frequentes</h3>
                </div>

                <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100 dark:divide-white/5">
                  {faqs.map((item, index) => (
                    <div key={index} className="px-5 py-3">
                      <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between gap-3 text-left text-sm font-medium text-[#0B2E4A] dark:text-white hover:text-yellow-custom transition-colors duration-200">
                        <span>{item.pergunta}</span>
                        <i className={`fa-solid fa-chevron-down text-yellow-custom text-xs flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : "rotate-0"}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-out ${openFaq === index ? 'max-h-96 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed pb-1">{item.resposta}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 border-t border-yellow-custom/20 text-center bg-black/[0.02] dark:bg-white/[0.02]">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=comunicacaosenamun@gmail.com" target="_blank" rel="noopener noreferrer" className="text-xs text-light-blue-custom hover:text-yellow-custom transition-colors duration-200 underline underline-offset-2 block mb-2">Sua dúvida não foi respondida? Fale com a gente</a>
                  <p className="text-xs text-gray-500 dark:text-gray-500 select-all">comunicacaosenamun@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* HAMBURGER BUTTON */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`md:hidden ${mobileMenuOpen ? 'p-4' : 'p-2'} text-white bg-transparent border-none focus:outline-none z-[110] transition-all`}
          >
            {mobileMenuOpen ? <FiX className="text-[20px]" /> : <FiMenu className="text-3xl" />}
          </button>
        </div>

        {/* MOBILE OVERLAY */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-[90] bg-black/40 md:hidden" 
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* MOBILE MENU PANEL */}
        <div className={`fixed top-0 right-0 z-[100] h-screen w-[70%] bg-[#f8fafc] dark:bg-[rgba(10,20,45,0.97)] backdrop-blur-[12px] md:hidden transform transition-transform duration-[250ms] ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header Bar */}
            <div className="h-20 bg-[#0d1b2e] w-full shrink-0 flex items-center justify-end" />

            <div className="flex-1 overflow-y-auto">
              
              {/* Sobre Nós Accordion */}
              <div>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'sobre' ? null : 'sobre')} 
                  className="w-full flex items-center justify-between px-6 py-4 text-[#0f172a] dark:text-white text-[16px] hover:bg-[#2563eb]/[0.06] dark:hover:bg-white/5 transition-colors"
                >
                  Sobre Nós 
                  <FiChevronRight className={`text-[#0f172a] dark:text-white transition-transform duration-200 ${activeDropdown === 'sobre' ? 'rotate-90' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'sobre' ? 'max-h-60' : 'max-h-0'}`}>
                  {dropdownItems.sobre.map(i => (
                    <Link key={i.name} href={i.href} onClick={() => setMobileMenuOpen(false)} className="block pl-10 pr-6 py-3 text-[14px] text-[#0f172a]/70 dark:text-white/75 hover:bg-[#2563eb]/[0.06] dark:hover:bg-white/5">
                      {i.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* SenaMUN 2026 Accordion */}
              <div>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'senamun' ? null : 'senamun')} 
                  className="w-full flex items-center justify-between px-6 py-4 text-[#0f172a] dark:text-white text-[16px] hover:bg-[#2563eb]/[0.06] dark:hover:bg-white/5 transition-colors"
                >
                  SenaMUN 2026 
                  <FiChevronRight className={`text-[#0f172a] dark:text-white transition-transform duration-200 ${activeDropdown === 'senamun' ? 'rotate-90' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'senamun' ? 'max-h-[1200px]' : 'max-h-0'}`}>
                  {dropdownItems.senamun.map(i => (
                    <div key={i.name}>
                      {i.hasSub ? (
                        <>
                          <button onClick={() => setCommitteesOpen(!committeesOpen)} className="w-full flex items-center justify-between pl-10 pr-6 py-3 text-[14px] text-[#0f172a]/70 dark:text-white/75 hover:bg-[#2563eb]/[0.06] dark:hover:bg-white/5">
                            {i.name} 
                            <FiChevronRight className={`text-[#0f172a] dark:text-white transition-transform duration-200 ${committeesOpen ? 'rotate-90' : ''}`} />
                          </button>
                          <div className={`overflow-hidden transition-all duration-300 ${committeesOpen ? 'max-h-[1000px] mb-2' : 'max-h-0'}`}>
                            <Link href="/comites" onClick={() => setMobileMenuOpen(false)} className="block pl-10 pr-6 py-2 text-light-blue-custom font-bold text-xs uppercase">Ver todos os comitês</Link>
                            {sortedCommitteeData.map(c => (
                              <div key={c.comite}>
                                <button 
                                  onClick={() => setExpandedCommittee(expandedCommittee === c.comite ? null : c.comite)}
                                  className="w-full flex items-center justify-between pl-10 pr-6 py-2 text-[14px] text-[#0f172a]/70 dark:text-white/70 hover:bg-[#2563eb]/[0.06] dark:hover:bg-white/5"
                                >
                                  <span className="truncate max-w-[200px]">{c.comite}</span>
                                  <FiChevronRight className={`text-xs text-[#0f172a] dark:text-white transition-transform duration-200 ${expandedCommittee === c.comite ? 'rotate-90' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-200 ${expandedCommittee === c.comite ? 'max-h-40' : 'max-h-0'}`}>
                                  <div className="flex flex-col gap-1 pl-14 py-2 text-[13px] text-[#0f172a]/70 dark:text-white/60">
                                    <a href={c.classroom} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>• Classroom</a>
                                    <a href={c.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>• WhatsApp</a>
                                    <a href={c.pdf || "#"} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>• Baixar PDF</a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link href={i.href} onClick={() => setMobileMenuOpen(false)} className="block pl-10 pr-6 py-3 text-[14px] text-[#0f172a]/70 dark:text-white/75 hover:bg-[#2563eb]/[0.06] dark:hover:bg-white/5">
                          {i.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/inscricao" onClick={() => setMobileMenuOpen(false)} className="block px-6 py-4 text-[#0f172a] dark:text-white text-[16px] hover:bg-[#2563eb]/[0.06] dark:hover:bg-white/5 transition-colors">Inscrição</Link>
              <Link href="/contato" onClick={() => setMobileMenuOpen(false)} className="block px-6 py-4 text-[#0f172a] dark:text-white text-[16px] hover:bg-[#2563eb]/[0.06] dark:hover:bg-white/5 transition-colors">Fale Conosco</Link>
            </div>

            {/* FAQ BUTTON FIXED AT BOTTOM */}
            <div className="p-5 border-t border-black/[0.07] dark:border-white/[0.07] bg-transparent">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setFaqModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-6 py-4 text-[#0f172a] dark:text-white text-[16px]"
              >
                <i className="fa-solid fa-headset text-[#f97316]" /> FAQ
              </button>
            </div>
          </div>
        </div>

        {/* FAQ MODAL MOBILE */}
        {faqModalOpen && typeof document !== 'undefined' && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:hidden">
            {/* Overlay */}
            <div 
              className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
              onClick={() => setFaqModalOpen(false)}
            />
            
            {/* Modal Box */}
            <div 
              className="relative z-[9999] w-[90vw] max-w-[420px] max-h-[80vh] bg-white dark:bg-[#0d1b2e] backdrop-blur-[12px] rounded-[14px] shadow-[0_16px_48px_rgba(0,0,0,0.3)] flex flex-col p-5 overflow-y-auto transition-all duration-200 animate-in fade-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-headset text-[#f97316]" />
                  <h3 className="text-[#0f172a] dark:text-white font-bold text-lg">Perguntas Frequentes</h3>
                </div>
                <button 
                  onClick={() => setFaqModalOpen(false)}
                  className="text-gray-400 dark:text-white/40 hover:text-[#1a1a2e] dark:hover:text-white text-[20px] p-1"
                >
                  <FiX />
                </button>
              </div>

              {/* Modal Content - FAQ List */}
              <div className="flex-1 pr-1">
                {faqs.map((item, index) => (
                  <div key={index} className="py-3 border-b border-black/[0.08] dark:border-white/[0.08] last:border-none">
                    <button 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)} 
                      className="w-full flex items-center justify-between gap-3 text-left text-sm font-medium text-[#0f172a] dark:text-white"
                    >
                      <span>{item.pergunta}</span>
                      <i className={`fa-solid fa-chevron-down text-[#f97316] text-xs flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : "rotate-0"}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${openFaq === index ? 'max-h-96 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed pb-1">{item.resposta}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-black/[0.08] dark:border-white/[0.08] text-center">
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=comunicacaosenamun@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-[#2563eb] underline underline-offset-2 block mb-1"
                >
                  Sua dúvida não foi respondida? Fale com a gente
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-500">comunicacaosenamun@gmail.com</p>
              </div>
            </div>
          </div>,
          document.body
        )}
      </nav>
    </>
  );
};

export default Navbar;