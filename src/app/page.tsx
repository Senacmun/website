"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { BiWorld } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { LiaCalendarMinusSolid } from "react-icons/lia";
import { MdLeaderboard } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import Card from "@/components/Card";

const cartas = [
  {
    nome: "Leonardo",
    cargo: "Secretário Geral — SenaMUN V",
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "/cronogramas/foto 1.webp",
  },
  {
    nome: "Gustavo",
    cargo: "Secretário Geral — SenaMUN V",
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "/cronogramas/foto 2.webp",
  },
  {
    nome: "Kauan",
    cargo: "Secretário Geral — SenaMUN V",
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "/cronogramas/foto 3.webp",
  },
  {
    nome: "Ana",
    cargo: "Secretária Geral — SenaMUN V",
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "/cronogramas/foto 4.jpg",
  },
  {
    nome: "Emily",
    cargo: "Secretária Geral — SenaMUN V",
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "/cronogramas/foto 5.webp",
  },
  {
    nome: "Letícia",
    cargo: "Secretária Geral — SenaMUN V",
    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imagem: "/cronogramas/foto 6.webp",
  },
];

const CartaCarrossel = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTOPLAY_MS = 6000;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % cartas.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const prev = () => { setCurrent((c) => (c - 1 + cartas.length) % cartas.length); resetTimer(); };
  const next = () => { setCurrent((c) => (c + 1) % cartas.length); resetTimer(); };

  return (
    <section className="bg-white dark:bg-[#0B1E2D] py-20 px-4 md:px-12 xl:px-32">
      <div className="flex flex-col xl:flex-row items-center gap-8 max-w-5xl mx-auto">

        {/* LADO ESQUERDO — Carrossel de fotos com texto sobreposto */}
        <div className="relative w-full xl:w-3/5 rounded-2xl overflow-hidden shadow-2xl aspect-video">

          {/* Slides */}
          {cartas.map((carta, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
              <Image src={carta.imagem} alt={carta.nome} fill className="object-cover object-top" draggable={false} />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                <p className="text-white text-sm md:text-base leading-relaxed max-w-md">&ldquo;{carta.texto}&rdquo;</p>
                <div>
                  <p className="text-white italic font-medium">{carta.nome},</p>
                  <p className="text-gray-300 italic text-sm">{carta.cargo}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Setas */}
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-all duration-300 hover:scale-125 p-2"><i className="fa-solid fa-chevron-left text-lg" /></button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-all duration-300 hover:scale-125 p-2"><i className="fa-solid fa-chevron-right text-lg" /></button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {cartas.map((_, i) => (
              <button key={i} onClick={() => { setCurrent(i); resetTimer(); }} style={{ transition: "all 0.4s ease" }} className={`h-1.5 rounded-full ${i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} />
            ))}
          </div>
        </div>

        {/* LADO DIREITO — Texto fixo */}
        <div className="w-full xl:w-2/5 text-center px-4">
          <h2 className="text-light-blue-custom dark:text-white font-bold text-lg md:text-xl leading-tight mb-2">
            Carta dos <br /> Secretarios Gerais
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ao longo dos anos, o SenaMUN foi moldado pela visão e dedicação de seus Secretários Gerais. Cada um deixou sua marca — guiando delegados pelos desafios, fomentando a colaboração e construindo a forte comunidade que define nossa conferência hoje.</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Lorem ipsum dolor sit amet, suas contribuições ajudaram a conferência a crescer e florescer, tornando cada edição uma experiência inesquecível.</p>
        </div>

      </div>
    </section>
  );
};

export default function Home() {
  const headerHeight = 80;

  const handleClickScroll = () => {
    const element = document.getElementById("video");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      {/* SeÃ§Ã£o principal */}
      <section
        className="flex items-center xl:justify-between xl:px-32 md:px-32 px-12 justify-center text-nowrap"
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        {/* ConteÃºdo Ã  esquerda */}
        <div className="text-light-blue-custom font-semibold text-center xl:text-left xl:text-4xl md:text-3xl sm:text-2xl text-xl">
          <div className="flex xl:hidden justify-center">
            {/* Logo (visÃ­vel em dispositivos menores) */}
            <Image
              className="mb-5 md:mb-2"
              src={"/logo-senamun.png"}
              alt="Logo Senamun"
              width={350}
              height={350}
            />
          </div>
          <h1 className="text-yellow-custom xl:text-8xl md:text-7xl sm:text-6xl text-5xl drop-shadow-[0_0_6px_rgba(243,147,34,0.28)]">
            SenaMUN V
          </h1>
          <p>Conferência Modelo ONU</p>
          <p className="mb-5">Senac Nações Unidas</p>
          {/* Botões de ação */}
          <div className="flex items-center sm:gap-4 gap-3 xl:justify-normal justify-center xl:scale-100 md:scale-100">
            {/* Link para "Saiba Mais" */}
            <Link
              href="/quem-somos"
              className="text-xl font-medium text-center xl:px-12 xl:py-4 md:px-8 md:py-3 sm:px-4 sm:py-3 px-2 py-3 border-4 border-light-blue-custom rounded-2xl hover:text-white hover:bg-light-blue-custom duration-300"
            >
              Saiba Mais
            </Link>
            {/* Botão para assistir ao vídeo */}
          </div>
        </div>
        {/* Imagem  direita (visí­vel em telas grandes) */}
        <div className="xl:block hidden ml-auto xl:ml-16">
          <Image
            src={"/logo-senamun.png"}
            alt="Logo Senamun"
            width={550}
            height={550}
          />
        </div>
      </section>

      <CartaCarrossel />

      {/* Seção de Vídeo e Detalhes do Evento */}
      <section
        className="xl:px-20 lg:px-16 md:px-12 sm:px-12 px-4 flex flex-col justify-center py-12"
        id="video"
      >
        <div className="flex justify-center">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-yellow-custom font-semibold text-4xl md:text-5xl lg:text-6xl">
              Tema da Conferência
            </h1>

            <h2 className="text-light-blue-custom italic font-semibold text-2xl md:text-3xl mt-4">
              {'"'}Viver sem conhecer o passado é viver no escuro{'"'}
            </h2>

            <p className="text-right text-sm text-gray-500 mt-2">Luis Bolognesi</p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <Link href="/cronograma" className="bg-transparent dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl p-6 transition-transform hover:scale-[1.02] hover:shadow-lg block">
                <FaRegCalendarAlt className="text-3xl text-yellow-custom mx-auto" />
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-4">Data</h3>
                <p className="text-base font-light text-gray-700 dark:text-gray-200 mt-1">11 e 12 de setembro</p>
              </Link>

              <Link href="/cronograma" className="bg-transparent dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl p-6 transition-transform hover:scale-[1.02] hover:shadow-lg block">
                <FaRegClock className="text-3xl text-yellow-custom mx-auto" />
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-4">Horário</h3>
                <div className="text-base font-light text-gray-700 dark:text-gray-200 mt-1">
                  <p>Sexta: 12h-18h15</p>
                  <p>Sábado: 13h-19h</p>
                </div>
              </Link>

              <Link href="/mapa" className="bg-transparent dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:opacity-80 block">
                <FiMapPin className="text-3xl text-yellow-custom mx-auto" />
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-4">Local</h3>
                <p className="text-base font-light text-gray-700 dark:text-gray-200 mt-1">
                  Centro Universitário Senac - Santo Amaro<br />
                  Av. Eng. Eusébio Stevaux 823, São Paulo, SP
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Detalhes Adicionais */}
      <section className="container mx-auto">
        {/* Linha decorativa */}
        <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-yellow-custom/40 to-transparent dark:via-[#013563]/40"></div>
        <div className="text-center mt-12 tracking-wider">
          <h1 className="text-yellow-custom font-medium xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl">
            Para mais detalhes importantes
          </h1>
          <p className="xl:text-xl lg:text-xl md:text-xl sm:text-xl text-lg text-light-blue-custom">
            Consulte o que deseja saber
          </p>
        </div>
        {/* Grid de Cards de InformaÃ§Ãµes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-center mx-6 my-12">
          <Card
            title="Comitês"
            href="/comites"
            icon={<BiWorld />}
            subtitle="Descubra os temas"
          />
          <Card
            title="Equipe"
            href="/equipe"
            icon={<FaPeopleGroup />}
            subtitle="Conheça nosso time"
          />
          <Card
            title="Cronograma"
            href="/cronograma"
            icon={<LiaCalendarMinusSolid />}
            subtitle="Veja nosso planejamento"
          />
          <Card
            title="Recursos"
            href="/recursos"
            icon={<MdLeaderboard />}
            subtitle="Documentos"
          />
          <Card
            title="Mapa"
            href="/mapa"
            icon={<FaMapMarkedAlt />}
            subtitle="Se localize melhor"
          />
          <Card
            title="Contato"
            href="/contato"
            icon={<HiOutlineSpeakerphone />}
            subtitle="Nos contate"
          />
        </div>
      </section>
    </main>
  );
}
