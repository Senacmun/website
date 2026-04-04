"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export default function PartnershipPage() {
  // Função para baixar o arquivo PDF
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href =
      "/Regras para a competição de campanha de arrecadação SenaMUN e casa Hope.pdf"; // Coloque o caminho do arquivo PDF aqui
    link.download =
      "Regras para a competição de campanha de arrecadação SenaMUN e casa Hope.pdf"; // Nome do arquivo que será baixado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111827] relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 35px, #1F6FEB11 35px, #1F6FEB11 36px), repeating-linear-gradient(-45deg, transparent, transparent 35px, #1F6FEB11 35px, #1F6FEB11 36px)",
          }}
        />
      </div>
      {/* Esferas decorativas */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-light-blue-custom/20 to-yellow-custom/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-yellow-custom/10 to-light-blue-custom/10 rounded-full blur-3xl pointer-events-none" />

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Título */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0B2E4A] dark:text-white leading-tight">
            Parceria
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Juntos fazendo a diferença pela comunidade.
          </p>
        </div>

        {/* Card Corrente do Bem */}
        <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-[#0F2A3D] rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden">
          {/* Imagem */}
          <div className="md:w-2/5 relative min-h-[280px]">
            <Image
              src="/correntebem.jpg"
              alt="Corrente do Bem"
              fill
              className="object-cover"
            />
          </div>

          {/* Texto */}
          <div className="md:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-yellow-custom rounded-full"></span>
              <h2 className="text-2xl font-bold text-[#0B2E4A] dark:text-white">
                Corrente do Bem
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              A Corrente do Bem é uma iniciativa que visa arrecadar alimentos e
              recursos para auxiliar famílias em situação de vulnerabilidade.
              O SenaMUN é parceiro ativo nesta causa, promovendo campanhas de
              arrecadação e ações solidárias durante todo o ano.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Cada quilo de alimento doado faz a diferença na vida de quem mais
              precisa. Participe e ajude a transformar vidas!
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button asChild className="bg-[#1F6FEB] hover:bg-blue-600 text-white">
                <a
                  href="https://www.canva.com/design/DAGo3IZa2S0/NpwwXD7OK3zuF2ZItHNVDg/view?utm_content=DAGo3IZa2S0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h888188b6db"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conheça mais e ajude!
                </a>
              </Button>

              <Button variant="outline" onClick={handleDownload} className="border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10">
                <FileDown className="mr-2 h-4 w-4" />
                Baixar regulamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
