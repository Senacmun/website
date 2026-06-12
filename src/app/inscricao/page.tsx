"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaUserTie, FaFire, FaCamera, FaGavel } from "react-icons/fa";

const data = [
  {
    id: "delegacoes",
    title: "Delegações",
    href: "https://forms.gle/LcoZxPhci9bx8nqR6",
    icon: FaUserTie,
  },
  {
    id: "crises",
    title: "Performance de Crises",
    href: "https://forms.gle/MkJho8DfvdCktcZ48",
    icon: FaFire,
  },
  {
    id: "imprensa",
    title: "Imprensa (Press)",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfhBprdTpVEpvBLACg0QpTpMUrpFGiI96GAlVjUzbR-I_fTpA/viewform?usp=publish-editor",
    icon: FaCamera,
  },
  {
    id: "mesarios",
    title: "Mesários / Chairs (Encerrado)",
    href: "#",
    icon: FaGavel,
  },
];

export default function InscricaoPage() {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const router = useRouter();

  const handleClick = (id: string, link: string) => {
    setActiveAnimation(null);

    setTimeout(() => {
      setActiveAnimation(id);
      setAnimationKey((prev) => prev + 1);
    }, 10);

    setTimeout(() => {
      if (link.startsWith("http")) {
        window.location.href = link;
      } else {
        router.push(link);
      }
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-white transition-colors duration-300 dark:bg-[#0B1E2D]">
      <section className="flex flex-col items-center justify-center py-16 text-center">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-semibold tracking-wide text-blue-custom dark:text-[#f39322] md:text-5xl">
              Participe do Evento
            </h1>
            <p className="mx-auto mt-3 max-w-[700px] text-lg font-medium text-gray-700 dark:text-gray-300">
              <span className="block">
                AS INSCRIÇÕES PARA O SENAMUN V ESTÃO ABERTAS
              </span>
              <span className="block">VENHA DEBATER O MUNDO!</span>
            </p>
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-yellow-custom/40 to-transparent dark:via-[#013563]/40"></div>
          </div>
        </div>
      </section>

      <section className="w-full pb-12 pt-4 md:pb-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item.id, item.href)}
              className="group flex cursor-pointer flex-col items-center gap-6 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none dark:border-[#044b8b] dark:bg-[#022c43] dark:hover:bg-[#044b8b]"
            >
              <div className="relative">
                {item.id === "imprensa" ? (
                  <div className="relative">
                    <FaCamera
                      key={animationKey}
                      className={`text-blue-600 transition-colors duration-300 dark:text-[#f39322] ${
                        activeAnimation === "imprensa" ? "anim-imprensa" : ""
                      }`}
                      size={40}
                    />

                    {activeAnimation === "imprensa" && (
                      <span className="sparkle">✨</span>
                    )}
                  </div>
                ) : item.id === "mesarios" ? (
                  <div className="relative">
                    <FaGavel
                      key={animationKey}
                      className={`text-blue-600 dark:text-[#f39322] ${
                        activeAnimation === "mesarios" ? "anim-mesarios" : ""
                      }`}
                      size={40}
                    />

                    {activeAnimation === "mesarios" && (
                      <>
                        <span
                          className="particle"
                          style={{ "--x": "10px", "--y": "-10px" } as any}
                        ></span>
                        <span
                          className="particle"
                          style={{ "--x": "-12px", "--y": "-8px" } as any}
                        ></span>
                        <span
                          className="particle"
                          style={{ "--x": "0px", "--y": "-14px" } as any}
                        ></span>
                      </>
                    )}
                  </div>
                ) : (
                  <item.icon
                    key={animationKey}
                    className={`inline-block text-4xl text-blue-600 transition-colors duration-300 dark:text-[#f39322] ${
                      activeAnimation === item.id ? `anim-${item.id}` : ""
                    }`}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <Button className="mt-2 h-auto w-full rounded-xl bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto">
                Inscrever-se
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
