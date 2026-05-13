import Card from "@/components/Card";
import Link from "next/link";
import { RiTeamLine } from "react-icons/ri";

export default function Equipe() {
  return (
    <section className="min-h-screen bg-white dark:bg-[#0B1E2D]">
      <article className="flex flex-col items-center justify-between px-5 py-10 lg:flex-row xl:px-32">
        <div className="w-full max-w-2xl">
          <img
            className="w-full rounded-md border-4 border-blue-custom object-cover"
            src={"/time/equipe.JPG"}
            alt="Time Senamun"
            width={800}
            height={400}
          />
        </div>
        <div className="mt-10 text-blue-custom dark:text-blue-light lg:ml-10 lg:mt-0">
          <h1 className="text-4xl text-yellow-custom font-semibold">
            Nos somos o time SenaMUN 2026,
          </h1>
          <p className="text-2xl dark:text-blue-light">no total 37 pessoas!</p>

          <div className="mt-10 text-lg">
            <p className="text-xl dark:text-soft-white">
              Subdivididos em 10 grupos:{" "}
            </p>
            <ul className="pl-10 list-disc space-y-1">
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/secretariado">Secretariado Geral</Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/logistica">Logística</Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/comunicacao">Comunicação</Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/crises">Diretoria de Crises</Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/imprensa">Diretoria de Imprensa</Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/imagens">Imagem</Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/midia">Vídeo</Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/academica-portugues">
                  Acadêmica Português
                </Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/academica-ingles">Acadêmica Inglês</Link>
              </li>
              <li className="w-fit cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom dark:text-soft-white">
                <Link href="/equipe/orientadores">Orientadores</Link>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <hr className="mx-40 border-yellow-custom" />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-12 xl:px-20">
        <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Secretariado Geral"
            href="/equipe/secretariado"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de secretários"
          />
          <Card
            title="Logística"
            href="/equipe/logistica"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de logística"
          />
          <Card
            title="Comunicação"
            href="/equipe/comunicacao"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de comunicação"
          />
          <Card
            title="Diretoria de Crises"
            href="/equipe/crises"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de crises"
          />
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Diretoria de Imprensa"
            href="/equipe/imprensa"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de imprensa"
          />
          <Card
            title="Imagem"
            href="/equipe/imagens"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de imagem"
          />
          <Card
            title="Vídeo"
            href="/equipe/midia"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de vídeo"
          />
          <Card
            title="Orientadores"
            href="/equipe/orientadores"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de orientadores"
          />
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title={
              <span className="block text-base leading-5">
                <span className="block">Acadêmico</span>
                <span className="block">Inglês</span>
              </span>
            }
            href="/equipe/academica-ingles"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time acadêmico em inglês"
          />

          <div className="hidden items-center justify-center lg:flex">
            <img
              src="/logo-senamun.png"
              alt="Logo SenaMUN"
              width={180}
              height={180}
              className="h-auto w-[180px] object-contain"
            />
          </div>

          <Card
            title={
              <span className="block text-base leading-5">
                <span className="block">Acadêmico</span>
                <span className="block">Português</span>
              </span>
            }
            href="/equipe/academica-portugues"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time acadêmico em português"
          />

          <div className="hidden sm:block" />
        </div>
      </div>
    </section>
  );
}
