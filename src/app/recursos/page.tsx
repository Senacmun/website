"use client";

import Image from "next/image";
import resources from "./dataRecursos";

export default function Recursos() {
  const headerHeight = 80;

  const ResourceCard = ({ title, description, link, ativado }: any) => (
    <div
      onClick={() => {
        if (ativado) {
          const downloadLink = document.createElement("a");
          downloadLink.href = link;
          downloadLink.download = title;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } else {
          alert("Em construção.");
        }
      }}
      className={`group border-2 border-yellow-custom p-6 rounded-xl text-center transition-all duration-300 ${
        ativado
          ? "cursor-pointer hover:scale-[1.03] hover:bg-yellow-custom hover:shadow-lg"
          : "cursor-not-allowed opacity-50"
      }`}
    >
      <h5 className="text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-white">
        {title}
      </h5>

      <p className="mt-4 text-yellow-custom transition-all duration-300 group-hover:text-white">
        {description}
      </p>
    </div>
  );

  return (
    <div>
      <section className="flex flex-col items-center justify-center pt-16 pb-6 text-center bg-white dark:bg-[#0B1E2D] transition-colors duration-300">
        <div className="px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide text-blue-custom dark:text-[#f39322]">
            Recursos
          </h1>
          <p className="mt-3 text-gray-700 dark:text-gray-300 text-lg">
            Acesse materiais e documentos importantes
          </p>
          <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-yellow-custom/40 to-transparent dark:via-[#013563]/40"></div>
        </div>
      </section>

      <section className="bg-blue-custom py-16 mt-4 flex flex-col justify-center">
        <div className="text-center text-white px-6 mt-2">
          <h1 className="font-bold text-4xl">
            Encontre os recursos desejados
          </h1>
          <p className="text-white text-lg mt-1">Consulte abaixo</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mt-10 px-6">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </section>
    </div>
  );
}
