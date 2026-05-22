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
    nome: "Ana Luisa Brito",
    cargo: "Secretary General — SenaMUN V",
    texto: "Dear Delegates, Chairs, Advisors, and Guests, It is with immense pride and excitement that I welcome you all to SENAMUN V. My name is Ana Luisa Brito, and it is truly an honor to serve as the Secretary-General of this conference. Since beginning my journey in Model United Nations in 2024, MUN has become much more than an academic activity to me. It became a space where I learned how to challenge myself, listen to different perspectives, and grow both as a student and as a person. Through debates, resolutions, and diplomacy, I discovered the importance of empathy, dialogue, and international cooperation, values that continue to inspire me every day. SENAMUN V represents more than just a conference. It is a place where ideas are exchanged, friendships are created, and future leaders are shaped. Whether this is your first conference or one of many, I hope you find in this experience the same sense of belonging, growth, and passion that MUN gave me. Our Secretariat has worked with dedication and care to create a conference that is not only academically enriching, but also welcoming, engaging, and unforgettable for everyone involved. We hope every delegate feels encouraged to speak, collaborate, and make their voice heard throughout the conference. MUN teaches us that diplomacy is built through understanding, respect, and the willingness to work together despite our differences. In a constantly changing world, these values have never been more important. On behalf of the entire SENAMUN V Secretariat, thank you for being part of this journey. We are incredibly excited to welcome you to SENAMUN V, and we cannot wait to see the passion, creativity, and talent that each of you will bring to our committees. I sincerely hope this conference leaves a lasting impact on all of you, just as MUN has left on me. Warm regards, Ana Luisa Brito. Secretary General of SENAMUN V",
    textoPT: `Prezados Delegados, Presidentes de Comitê, Assessores e Convidados, é com imenso orgulho e entusiasmo que dou as boas-vindas a todos à SENAMUN V. Meu nome é Ana Luisa Brito e é uma verdadeira honra servir como Secretária-Geral desta conferência. Desde que comecei minha jornada no Model United Nations em 2024, o MUN se tornou muito mais do que uma atividade acadêmica para mim. Tornou-se um espaço onde aprendi a me desafiar, ouvir diferentes perspectivas e crescer tanto como estudante quanto como pessoa. Por meio de debates, resoluções e diplomacia, descobri a importância da empatia, do diálogo e da cooperação internacional, valores que continuam a me inspirar todos os dias. A SENAMUN V representa mais do que apenas uma conferência. É um lugar onde ideias são trocadas, amizades são criadas e futuros líderes são formados. Seja esta sua primeira conferência ou uma entre muitas, espero que você encontre nesta experiência o mesmo sentimento de pertencimento, crescimento e paixão que o MUN me proporcionou. Nosso Secretariado trabalhou com dedicação e cuidado para criar uma conferência que não seja apenas academicamente enriquecedora, mas também acolhedora, envolvente e inesquecível para todos os envolvidos. Esperamos que cada delegado se sinta encorajado a falar, colaborar e fazer sua voz ser ouvida ao longo da conferência. O MUN nos ensina que a diplomacia é construída por meio da compreensão, do respeito e da disposição de trabalhar juntos apesar de nossas diferenças. Em um mundo em constante mudança, esses valores nunca foram tão importantes. Em nome de todo o Secretariado da SENAMUN V, obrigado por fazer parte desta jornada. Estamos extremamente animados para recebê-los na SENAMUN V e mal podemos esperar para ver a paixão, criatividade e talento que cada um de vocês trará aos nossos comitês. Espero sinceramente que esta conferência deixe um impacto duradouro em todos vocês, assim como o MUN deixou em mim. Atenciosamente, Ana Luisa Brito. Secretária-Geral da SENAMUN V`,
    imagemFundo: "/images/foto_ana.jpeg",
    imagemSecretario: "/time/secretarios/Ana Luisa Brito.JPG",
  },
  {
    nome: "Leonardo Zanetti",
    cargo: "Under-Secretary General — SenaMUN V",
    texto: "Honorable public, dear delegates, chairs, advisors and else, We welcome you to the 5th edition of SenaMUN. I'm serving as this year’s Under Secretary-General of the conference, and couldn't possibly be more overjoyed to do so! Ever since September of last year, when I had my first contact with Model United Nations, I can say with certainty that I've seen the biggest period of growth of my entire life, not only academically, as a student, but above all else as a person. Along with all of the usual benefits and challenges MUN brings with itself, it not only taught me about understanding, looking into different perspectives and choosing diplomacy over violence, but it also taught me more about myself than any other academic activity I've ever taken part in. In every speech I learned a new way of conveying ideas or of using my voice, in every P.O.I. I could find a new way of negotiating, and in every new committee I could find new ways of applying and the same diplomacy that not only unites us, but also guides us. SenaMUN, more than just a club and along with being one of the most creative, inventive and inspiring academic environments I've had the chance to participate in, was also where some of my closest friends were found. Some of the most important and memorable moments in school happened here, where I not only saw myself evolve, but also all of my peers. Along with all of the sweat and tears we put onto every small bit of this project, I've seen bonds grow, students evolve, bonds bloom and I saw myself the happiest I had been in a long time. My objective this year is, more than just helping to create an amazing conference, is to give my all, my very best to make not only the study guides and academic sector of the conference the finest it can be, but to create a press that becomes truly remarkable. In the finest hour of the conference I wish to be able to look back and see all of the internal jokes, beautiful articles and, above all, something I’m truly proud to have made. And even above that, to look back at the conference, and even with all of the imperfections, be able to say it was beautiful. So dear… anyone that is reading this letter, not only thank you for your attention, but I hope my dreams can be fulfilled, and that the conference may just be as fun as we wish. Thank you, and I’ll see you there! ;]",
    textoPT: "Honrado público, queridos delegados, presidentes de comitê, assessores e demais presentes, damos as boas-vindas à 5ª edição da SenaMUN. Estou servindo como Under Secretary-General desta edição da conferência e não poderia estar mais feliz por fazê-lo! Desde setembro do ano passado, quando tive meu primeiro contato com o Model United Nations, posso dizer com certeza que vivi o maior período de crescimento da minha vida inteira, não apenas academicamente, como estudante, mas acima de tudo como pessoa. Junto de todos os benefícios e desafios que o MUN traz consigo, ele não apenas me ensinou sobre compreensão, análise de diferentes perspectivas e a escolha da diplomacia em vez da violência, mas também me ensinou mais sobre mim mesmo do que qualquer outra atividade acadêmica da qual já participei. Em cada discurso aprendi uma nova forma de transmitir ideias ou de usar minha voz; em cada P.O.I., descobri uma nova forma de negociar; e em cada novo comitê encontrei novas maneiras de aplicar a mesma diplomacia que não apenas nos une, mas também nos guia. A SenaMUN, mais do que apenas um clube e além de ser um dos ambientes acadêmicos mais criativos, inovadores e inspiradores dos quais tive a chance de participar, também foi onde encontrei alguns dos meus amigos mais próximos. Alguns dos momentos mais importantes e memoráveis da escola aconteceram aqui, onde não apenas vi a mim mesmo evoluir, mas também todos os meus colegas. Junto de todo o suor e lágrimas que colocamos em cada pequeno detalhe deste projeto, vi laços crescerem, estudantes evoluírem, amizades florescerem e me vi mais feliz do que havia estado em muito tempo. Meu objetivo neste ano é, mais do que apenas ajudar a criar uma conferência incrível, dar tudo de mim, o meu melhor, para tornar não apenas os study guides e o setor acadêmico da conferência os melhores possíveis, mas também criar uma imprensa verdadeiramente marcante. No melhor momento da conferência, desejo poder olhar para trás e ver todas as piadas internas, os belos artigos e, acima de tudo, algo do qual eu realmente me orgulhe de ter criado. E mais do que isso, olhar para a conferência e, mesmo com todas as imperfeições, poder dizer que foi algo belo. Então, querido… qualquer pessoa que esteja lendo esta carta, não apenas agradeço pela sua atenção, mas espero que meus sonhos possam se realizar e que a conferência seja tão divertida quanto desejamos. Obrigado, e nos vemos lá! ;]",
    imagemFundo: "/images/foto_leonardo.jpeg",
    imagemSecretario: "/time/secretarios/Leonardo Zenetti.JPG",
  },
  {
    nome: "Emily Dilser",
    cargo: "Secretária Geral — SenaMUN V",
    texto: `O SenaMUN foi algo inexplicável na minha vida, que me impactou de um modo que eu mal consigo colocar em palavras. Sei que não é nenhum eufemismo afirmar que o SenaMUN salvou meu ensino médio e me mudou para melhor como pessoa. Para mim tudo isso não é apenas uma simulação da ONU, mas é a simulação da ONU. Sou eternamente grata por tudo que o SenaMUN me proporcionou, desde discursos feitos às pressas até pessoas valiosas que desejo ter na minha vida para muito além do ensino médio.  Enquanto preparamos esta conferência, pensamos em cada mínimo detalhe, cada vírgula dos guias de estudos, cada post, cada email, cada brinde, preparamos tudo para que possamos fazer com que a experiência de quem vier para o nosso evento sinta-se tão maravilhado com o SenaMUN quanto todos ficamos pela primeira vez que participamos desta conferência. Esperamos, como todos os anos, nos superarmos e fazermos nosso melhor! `,
    imagemFundo: "/images/foto_emily.jpeg",
    imagemSecretario: "/time/secretarios/Emily Dilser.JPG",
  },
  {
    nome: "Kauan Oliveira",
    cargo: "Sub-Secretário Geral — SenaMUN V",
    texto: "O SenaMUN é o um projeto que vou levar para a vida, acredito que tudo o que eu faça quando sair do Senac vai ser lembrar principalmente das simulações e das brincadeiras com meus colegas. Acredito que é um ambiente que mudou a forma que eu vejo o mundo e que com toda certeza vou tentar continuar quando me formar. Espero acima de tudo que essa conferência seja a melhor de todas, todos estão muito empenhados nisso!",
    imagemFundo: "/images/foto_kauan.jpeg",
    imagemSecretario: "/time/secretarios/Kauan Oliveira.JPG",
  },
  {
    nome: "Letícia Leocadio",
    cargo: "Secretary of Communications — SenaMUN V",
    texto: "SenaMUN is very important to me; because of it, I was able to mature as a person and see the world in a different way with different points of view. I also met incredible places and people. Furthermore, SenaMUN was the only reason that kept me studying at Senac. I hope you enjoy the event and that this simulation is productive for everyone! Kisses, Leticia",
    textoPT: "O SenaMUN é muito importante para mim, por causa dele consegui amadurecer como pessoa e enxergar o mundo de uma maneira diferente com diferentes pontos de vista, também conheci lugares e pessoas incríveis. Além disso o senamun foi único motivo que me fez continuar estudando no Senac. Espero que vocês aproveitem o evento e que essa simulação seja produtiva para todos! Um beijo, Leticia",
    imagemFundo: "/images/foto_leticia.jpg",
    imagemSecretario: "/time/secretarios/Letícia Leocadio.JPG",
  },
    {
    nome: "Gustavo Vezzá",
    cargo: "Secretário Geral de Comunicação — SenaMUN V",
    texto: "O SenaMUN é muito mais que só um projeto. É um sentimento que envolve gente, amizade, memórias e muito companheirismo. Foi aqui que eu me encontrei e vou ser sempre grato por fazer parte da história desse projeto que eu amo tanto. ​A gente tá planejando cada detalhe pra que a conferência seja perfeita pra vocês. Meu maior desejo esse ano é fazer com que vocês se apaixonem pelo SenaMUN do mesmo jeito que eu sou apaixonado. ​Espero vocês na conferência!",
    imagemFundo: "/images/foto_gustavo.jpeg",
    imagemSecretario: "/time/secretarios/Gustavo Vezzá.JPG",
  },
];

const CartaCarrossel = () => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTOPLAY_MS = 6000;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!expanded) setCurrent((c) => (c + 1) % cartas.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [expanded]);

  const prev = () => { setCurrent((c) => (c - 1 + cartas.length) % cartas.length); resetTimer(); };
  const next = () => { setCurrent((c) => (c + 1) % cartas.length); resetTimer(); };

  const carta = cartas[current];

  return (
    <>
      <section className="bg-white dark:bg-[#0B1E2D] py-20 px-4 md:px-12 xl:px-32">
        <div className="flex flex-col xl:flex-row items-center gap-8 max-w-5xl mx-auto">

          {/* LADO ESQUERDO — Carrossel clicável */}
          <div
            className="relative w-full xl:w-3/5 rounded-2xl overflow-hidden shadow-2xl aspect-video cursor-pointer"
            onClick={() => setExpanded(true)}
          >
            {cartas.map((c, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              >
                {/* Imagem de fundo */}
                <Image src={c.imagemFundo} alt={c.nome} fill className="object-cover object-top" draggable={false} />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                  <p className="text-white text-xs md:text-sm leading-relaxed max-w-md line-clamp-[7] md:line-clamp-none whitespace-pre-line">
                    &ldquo;{c.texto.length > 300 ? c.texto.substring(0, 300) + "..." : c.texto}&rdquo;
                  </p>
                  <div>
                    <p className="text-white italic font-medium">{c.nome},</p>
                    <p className="text-gray-300 italic text-sm">{c.cargo}</p>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-all duration-300 hover:scale-125 p-2">
              <i className="fa-solid fa-chevron-left text-lg" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-all duration-300 hover:scale-125 p-2">
              <i className="fa-solid fa-chevron-right text-lg" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {cartas.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); resetTimer(); }}
                  style={{ transition: "all 0.4s ease" }}
                  className={`h-1.5 rounded-full ${i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* LADO DIREITO — Texto fixo */}
          <div className="w-full xl:w-2/5 text-center px-4">
            <h2 className="text-light-blue-custom dark:text-white font-bold text-lg md:text-xl leading-tight mb-2">
              Uma palavrinha do <br /> Secretariado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-3">
              Ao longo dos anos, o SenaMUN foi moldado pela visão e dedicação de seus Secretários Gerais. Cada um deixou sua marca — guiando delegados pelos desafios, fomentando a colaboração e construindo a forte comunidade que define nossa conferência hoje.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Suas contribuições ajudaram a conferência a crescer e florescer, tornando cada edição uma experiência inesquecível.
            </p>
          </div>

        </div>
      </section>

      {/* Lightbox — foto real do secretário + card bio */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-[#0B1E2D]/95 backdrop-blur-sm px-4"
          onClick={() => { setExpanded(false); setIsTranslated(false); }}
        >
          <div
            className="relative w-full max-w-4xl flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Foto real do secretário — ajustada para ser mais fina */}
            <div className="relative w-full md:w-[35%] min-h-[350px] md:min-h-[460px] flex-shrink-0 bg-white dark:bg-[#0B1E2D]">
              <Image
                src={carta.imagemSecretario}
                alt={carta.nome}
                fill
                className="object-cover object-top"
                draggable={false}
              />
            </div>

            {/* Card bio */}
            <div className="w-full md:flex-1 bg-white dark:bg-[#0B1E2D] border-t-2 border-b-2 border-r-2 border-yellow-custom p-6 md:p-10 flex flex-col justify-between overflow-hidden relative">
              <div>
                <h2 className="text-yellow-custom font-bold text-2xl md:text-3xl mb-1">
                  {carta.nome}
                </h2>
                <p className="text-light-blue-custom font-medium text-base mb-5">
                  {carta.cargo}
                </p>
                <div className="w-full h-px bg-yellow-custom/30 mb-5" />
                <div className="max-h-[250px] md:max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm font-light leading-relaxed whitespace-pre-line transition-opacity duration-200">
                    {isTranslated && (carta as any).textoPT ? (carta as any).textoPT : carta.texto}
                  </p>
                </div>
              </div>

              {/* Botão Ver Secretariado — parte inferior direita */}
              <div className="flex justify-between items-center mt-8">
                {(carta as any).textoPT && (
                  <button
                    onClick={() => setIsTranslated((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-yellow-custom text-yellow-custom text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-yellow-custom hover:text-white"
                  >
                    {isTranslated ? "Ver em inglês" : "Traduzir Carta"}
                    <i className="fa-solid fa-language text-sm" />
                  </button>
                )}
                {!((carta as any).textoPT) && <div />}
                <Link
                  href="/equipe/secretariado"
                  onClick={() => setExpanded(false)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-yellow-custom text-yellow-custom text-sm font-medium hover:bg-yellow-custom hover:text-white transition-all duration-200 hover:scale-105"
                >
                  Ver Secretariado
                  <i className="fa-solid fa-arrow-right text-xs" />
                </Link>
              </div>
            </div>

            {/* Botão X */}
            <button
              onClick={() => { setExpanded(false); setIsTranslated(false); }}
              className="fixed top-4 right-4 z-[60] bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function Home() {
  const headerHeight = 80;

  return (
    <main>
      <section
        className="flex items-center xl:justify-between xl:px-32 md:px-32 px-12 justify-center text-nowrap bg-white dark:bg-[#0B1E2D] transition-colors duration-500"
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        <div className="text-light-blue-custom font-semibold text-center xl:text-left xl:text-4xl md:text-3xl sm:text-2xl text-xl">
          <div className="flex xl:hidden justify-center">
            <Image className="mb-5 md:mb-2" src={"/logo-senamun.png"} alt="Logo Senamun" width={350} height={350} />
          </div>
          <h1 className="text-yellow-custom xl:text-8xl md:text-7xl sm:text-6xl text-5xl drop-shadow-[0_0_6px_rgba(243,147,34,0.28)]">
            SenaMUN V
          </h1>
          <p>Conferência Modelo ONU</p>
          <p className="mb-5">Senac Nações Unidas</p>
          <div className="flex items-center sm:gap-4 gap-3 xl:justify-normal justify-center xl:scale-100 md:scale-100">
            <Link href="/quem-somos" className="text-xl font-medium text-center xl:px-12 xl:py-4 md:px-8 md:py-3 sm:px-4 sm:py-3 px-2 py-3 border-4 border-light-blue-custom rounded-2xl hover:text-white hover:bg-light-blue-custom duration-300">
              Saiba Mais
            </Link>
          </div>
        </div>
        <div className="xl:block hidden ml-auto xl:ml-16">
          <Image src={"/logo-senamun.png"} alt="Logo Senamun" width={550} height={550} />
        </div>
      </section>

      <CartaCarrossel />

      <section className="xl:px-20 lg:px-16 md:px-12 sm:px-12 px-4 flex flex-col justify-center py-12" id="video">
        <div className="flex justify-center">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-yellow-custom font-semibold text-4xl md:text-5xl lg:text-6xl">
              Tema da Conferência
            </h1>
            <h2 className="text-light-blue-custom italic font-semibold text-2xl md:text-3xl mt-4">
              &ldquo;Viver sem conhecer o passado é viver no escuro&rdquo;
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
                  <p>Sexta: 12h30-18h</p>
                  <p>Sábado: 09h-16h20</p>
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

      <section className="container mx-auto">
        <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-yellow-custom/40 to-transparent dark:via-[#013563]/40"></div>
        <div className="text-center mt-12 tracking-wider">
          <h1 className="text-yellow-custom font-medium xl:text-3xl lg:text-3xl md:text-3xl sm:text-3xl text-xl">
            Para mais detalhes importantes
          </h1>
          <p className="xl:text-xl lg:text-xl md:text-xl sm:text-xl text-lg text-light-blue-custom">
            Consulte o que deseja saber
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-center mx-6 my-12">
          <Card title="Comitês" href="/comites" icon={<BiWorld />} subtitle="Descubra os temas" />
          <Card title="Equipe" href="/equipe" icon={<FaPeopleGroup />} subtitle="Conheça nosso time" />
          <Card title="Cronograma" href="/cronograma" icon={<LiaCalendarMinusSolid />} subtitle="Veja nosso planejamento" />
          <Card title="Recursos" href="/recursos" icon={<MdLeaderboard />} subtitle="Documentos" />
          <Card title="Mapa" href="/mapa" icon={<FaMapMarkedAlt />} subtitle="Se localize melhor" />
          <Card title="Contato" href="/contato" icon={<HiOutlineSpeakerphone />} subtitle="Nos contate" />
        </div>
      </section>
    </main>
  );
}
