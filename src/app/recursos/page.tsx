"use client";

import { FileText } from "lucide-react";
import { useState } from "react";

const resources = [
  {
    id: "dpo",
    title: "Documento de Posição Oficial (DPO)",
    description:
      "Documento onde o delegado apresenta a posição oficial do seu país ou organização sobre o tema em debate.",
    file: "recursos/documento-de-posicao-oficial.pdf",
    type: "PDF",
  },
  {
    id: "abertura",
    title: "Exemplo de Abertura",
    description:
      "Modelo de discurso utilizado para dar início aos trabalhos, apresentando o posicionamento inicial da delegação.",
    file: "recursos/discurso-de-abertura.pdf",
    type: "PDF",
  },
  {
    id: "resolucao-pt",
    title: "Exemplo de Resolução",
    description:
      "Template em português para redigir resoluções, contendo preâmbulo e cláusulas operativas.",
    file: "recursos/modelo-resolucao.docx",
    type: "DOCX",
  },
  {
    id: "resolucao-en",
    title: "Resolution Example",
    description:
      "Template used to write draft resolutions in the standard Model UN format.",
    file: "recursos/resolution-model.docx",
    type: "DOCX",
  },
];

function ResourceCard({
  title,
  description,
  file,
  type,
}: {
  title: string;
  description: string;
  file: string;
  type: string;
}) {
  const [hovered, setHovered] = useState(false);

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = file;
    downloadLink.download = file.split("/")[1];
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleDownload}
      className={`flex flex-col items-start gap-3 rounded-xl border border-orange-400/20 px-5 py-5 cursor-pointer transition-all duration-300 ease-out ${
        hovered ? "scale-[1.02] shadow-lg border-orange-400/50 bg-gray-50 dark:bg-[#0F2A3D]" : "bg-transparent dark:bg-[#0F2A3D]"
      }`}
    >
      {/* Topo: ícone + badge + título */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#1F6FEB]/10 flex items-center justify-center">
          <FileText className="h-5 w-5 text-[#1F6FEB]" />
        </div>
        <h3 className="text-base font-bold text-[#0B2E4A] dark:text-white">
          {title}
        </h3>
      </div>

      {/* Descrição */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Rodapé: badge + botão */}
      <div className="flex items-center justify-between w-full mt-auto">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-orange-400 bg-orange-400/10 px-2.5 py-0.5 rounded-full">
          {type}
        </span>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            hovered
              ? "bg-[#1F6FEB] text-white shadow-sm"
              : "bg-[#1F6FEB]/10 text-[#1F6FEB]"
          }`}
        >
          <FileText className="h-4 w-4" />
          Baixar
        </div>
      </div>
    </div>
  );
}

export default function Recursos() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111827]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        {/* Titulo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-[#0B2E4A] dark:text-white">
            Recursos
          </h1>
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
            Acesse materiais e documentos importantes
          </p>
          <div className="w-48 h-[2px] mx-auto mt-4 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
        </div>

        {/* Subtitulo */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-[#0B2E4A] dark:text-white">
            Documentos
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Clique em qualquer card para baixar
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
}
