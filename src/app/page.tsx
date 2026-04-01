"use client";

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
      {/* Seção principal */}
      <section
        className="flex items-center xl:justify-between xl:px-32 md:px-32 px-12 justify-center text-nowrap"
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        {/* Conteúdo à esquerda */}
        <div className="text-light-blue-custom font-semibold text-center xl:text-left xl:text-4xl md:text-3xl sm:text-2xl text-xl">
          <div className="flex xl:hidden justify-center">
            {/* Logo (visível em dispositivos menores) */}
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
        {/* Imagem à direita (visível em telas grandes) */}
        <div className="xl:block hidden ml-auto xl:ml-16">
          <Image
            src={"/logo-senamun.png"}
            alt="Logo Senamun"
            width={550}
            height={550}
          />
        </div>
      </section>

      {/* Seção da Carta do Secretariado */}
      <section className="bg-blue-custom py-20 2xl:px-96 xl:px-48 lg:px-40 md:px-32 flex flex-col justify-center h-auto">
        <div className="">
          {/* Título da Carta do Secretariado */}
          <h1 className="text-white text-3xl xl:text-5xl font-semibold tracking-widest text-center py-5 mx-12">
            Carta do Secretariado
          </h1>
        </div>
      </section>

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
              <div className="bg-transparent dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl p-6 transition-transform hover:scale-[1.02] hover:shadow-lg">
                <FaRegCalendarAlt className="text-3xl text-yellow-custom mx-auto" />
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-4">Data</h3>
                <p className="text-base font-light text-gray-700 dark:text-gray-200 mt-1">9 e 10 de outubro</p>
              </div>

              <div className="bg-transparent dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl p-6 transition-transform hover:scale-[1.02] hover:shadow-lg">
                <FaRegClock className="text-3xl text-yellow-custom mx-auto" />
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-4">Horário</h3>
                <div className="text-base font-light text-gray-700 dark:text-gray-200 mt-1">
                  <p>Quinta: 12h-18h15</p>
                  <p>Sexta: 13h-19h</p>
                </div>
              </div>

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
        {/* Grid de Cards de Informações */}
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
