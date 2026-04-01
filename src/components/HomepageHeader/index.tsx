import Image from "next/image";

export default function HomepageHeader({ pageTitle, pageSubtitle }: any) {
  const headerHeight = 80;

  return (
    <>
      <header>
        <section
          className="flex items-center xl:justify-between xl:px-32 md:px-32 px-12 justify-center text-nowrap"
          style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
        >
          <div className="text-light-blue-custom font-semibold text-center xl:text-left xl:text-4xl md:text-3xl sm:text-2xl text-xl">
            <div className="flex xl:hidden justify-center">
              <Image
                src={"/logo-senamun.png"}
                alt="Logo Senamun"
                width={550}
                height={550}
              />
            </div>
            <h1 className="text-yellow-custom xl:text-8xl md:text-7xl sm:text-6xl text-5xl">
              {pageTitle}
            </h1>
            <p className="mb-5 mt-2 pl-1">{pageSubtitle}</p>
            <div className="flex items-center gap-4 xl:justify-normal justify-center xl:scale-100 md:scale-100"></div>
          </div>
          <div className="hidden xl:block">
            <Image
              src={"/logo-senamun.png"}
              alt="Logo Senamun"
              width={550}
              height={550}
            />
          </div>
        </section>
      </header>
    </>
  );
}
