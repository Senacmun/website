import Card from "@/components/Card";
import Link from "next/link";
import { RiTeamLine } from "react-icons/ri";

export default function Equipe() {
  return (
    <section className="h-fit">
      <article className="flex flex-col lg:flex-row justify-between items-center xl:px-32 px-5 py-10">
        <div>
          <img
            className="border-4 border-blue-custom rounded-md"
            src={"/time/equipe.JPG"}
            alt="Time Senamun"
            width={800}
            height={400}
          />
        </div>
        <div className="text-blue-custom dark:text-blue-light mt-10 lg:mt-0 lg:ml-10">
            <h1 className="text-4xl text-yellow-custom font-semibold">
            Nos somos o time SenaMUN 2025,
          </h1>
          <p className="text-2xl dark:text-blue-light">no total 37 pessoas!</p>

          <div className="mt-10 text-lg">
            <p className="text-xl dark:text-soft-white">Subdivididos em 10 grupos: </p>
            <ul className="pl-10 list-disc space-y-1">
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/secretariado">Secretariado Geral</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/logistica">Logística</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/comunicacao">Comunicação</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/crises">Diretoria de Crises</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/imprensa">Diretoria de Imprensa</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/midia">Mídia</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/imagens">Imagem</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/academica-portugues">Acadêmica Português</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/academica-ingles">Acadêmica Inglês</Link>
              </li>
              <li className="dark:text-soft-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-yellow-custom w-fit">
                <Link href="/equipe/orientadores">Orientadores</Link>
              </li>
            </ul>
          </div>
        </div>
      </article>
      <hr className="border-yellow-custom mx-40" />
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mx-6 my-12 xl:px-20">
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
          <Card
            title="Diretoria de Imprensa"
            href="/equipe/imprensa"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de imprensa"
          />
          <Card
            title="Mídia"
            href="/equipe/midia"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de mídia"
          />
          <Card
            title="Imagem"
            href="/equipe/imagens"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de imagem"
          />
          <Card
            title="Acadêmico Português"
            href="/equipe/academica-portugues"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time acadêmico em português"
          />
          <Card
            title="Acadêmico Inglês"
            href="/equipe/academica-ingles"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time acadêmico em inglês"
          />
          <Card
            title="Orientadores"
            href="/equipe/orientadores"
            icon={<RiTeamLine />}
            subtitle="Conheça nosso time de orientadores"
          />
        </div>
      </div>
    </section>
  );
}
