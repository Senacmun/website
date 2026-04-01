import HomepageHeader from "@/components/HomepageHeader";
import Image from "next/image";

export default function Cronogramas() {
  const headerHeight = 80;

  return (
    <div>
      <HomepageHeader
        pageTitle="Cronogramas"
        pageSubtitle="Veja o planejamento"
      />
      <main className="bg-blue-custom flex justify-center md:p-0 ">
        <img
          src="/cronogramas/cronograma.jpg"
          alt="Cronograma"
          className="md:block hidden"
        />
        <img
          src="/cronogramas/cronograma-senamun24-mobile.png"
          alt="Cronograma"
          className="md:hidden block border-y-4 border-yellow-custom"
        />
      </main>
    </div>
  );
}
