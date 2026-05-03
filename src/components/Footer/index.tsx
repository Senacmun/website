"use client";

import { useState, useRef, useEffect } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";

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

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative h-20 bg-blue-custom items-center flex justify-center bottom-0">
      <div className="flex justify-center items-center flex-col opacity-65">
        <p className="text-white">SenaMUN © Todos direitos reservados.</p>
        <div className="flex text-white gap-3 text-xl">
          <Link href={"https://www.instagram.com/senamun_/"}>
            <FaInstagram />
          </Link>
          <Link href={"https://www.tiktok.com/@senamun_"} aria-label="TikTok do SenaMUN">
            <FaTiktok />
          </Link>
          <Link href={"mailto:senamunsenac@gmail.com"}>
            <IoIosMail />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            title="Perguntas Frequentes"
            className="inline-flex items-center"
          >
            <i className="fa-solid fa-headset" />
          </button>
        </div>
      </div>

      <div
        className={`absolute bottom-20 right-4 md:right-10 z-50 w-80 md:w-96 rounded-2xl bg-white dark:bg-[#0F2A3D] border border-yellow-custom/30 shadow-2xl dropdown-glass transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
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
}
