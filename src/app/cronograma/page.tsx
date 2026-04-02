const dia1 = {
  data: "11 de Setembro",
  diaSemana: "sexta-feira",
  atividades: [
    { horario: "12h – 13h", atividade: "Credenciamento", local: "Auditório" },
    { horario: "13h – 14h20", atividade: "Cerimônia de Abertura", local: "Auditório" },
    { horario: "14h20–14h40", atividade: "Intervalo", local: "-" },
    { horario: "14h40–16h", atividade: "Sessão 1", local: "Salas Específicas" },
    { horario: "16h – 16h15", atividade: "Intervalo", local: "-" },
    { horario: "16h15– 18h15", atividade: "Sessão 2", local: "Salas Específicas" },
  ],
};

const dia2 = {
  data: "12 de Setembro",
  diaSemana: "sábado",
  atividades: [
    { horario: "13h – 14h20", atividade: "Sessão 3", local: "Salas Específicas" },
    { horario: "14h20–14h40", atividade: "Intervalo", local: "-" },
    { horario: "14h40–16h", atividade: "Sessão 4", local: "Salas Específicas" },
    { horario: "16h–16h15", atividade: "Intervalo", local: "-" },
    { horario: "16h15– 17h15", atividade: "Sessão 5", local: "Salas Específicas" },
    { horario: "17h15 – 19h", atividade: "Cerimônia de Encerramento", local: "Auditório" },
  ],
};

const TabelaDia = ({ dia }: { dia: typeof dia1 }) => (
  <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-white/20 shadow-xl w-full">
    <div className="bg-slate-200 dark:bg-white/5 px-6 py-4 text-center border-b border-slate-300 dark:border-white/20">
      <h2 className="text-slate-800 dark:text-white font-bold text-lg">
        {dia.data} <span className="font-normal text-slate-600 dark:text-gray-300">({dia.diaSemana})</span>
      </h2>
    </div>

    {dia.atividades.map((item, i) => (
      <div
        key={i}
        className={`grid grid-cols-3 border-b border-slate-300 dark:border-white/10 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-white/5 ${
          i % 2 === 0 ? "bg-slate-100 dark:bg-[#0B1E2D]" : "bg-slate-200 dark:bg-[#0d2235]"
        }`}
      >
        <div className="px-4 py-4 text-slate-800 dark:text-white text-sm text-center border-r border-slate-300 dark:border-white/10 flex items-center justify-center">
          {item.horario}
        </div>
        <div className="px-4 py-4 text-slate-800 dark:text-white text-sm text-center border-r border-slate-300 dark:border-white/10 flex items-center justify-center">
          {item.atividade}
        </div>
        <div className="px-4 py-4 text-slate-800 dark:text-white text-sm text-center flex items-center justify-center">
          {item.local}
        </div>
      </div>
    ))}
  </div>
);

export default function CronogramaPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B1E2D]">
      <section className="py-12 bg-white dark:bg-[#0B1E2D]">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-custom">
            Cronogramas
          </h1>
          <div className="mx-auto mt-4 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-yellow-custom/30 to-transparent dark:via-white/10"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Veja o planejamento
          </p>
        </div>
      </section>

      <section className="px-4 md:px-12 xl:px-32 pb-20">
        <p className="text-gray-800 dark:text-white text-lg md:text-xl font-medium mb-8">
          Programação SenaMun 2026 | <strong className="font-bold">11 e 12 de setembro</strong>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TabelaDia dia={dia1} />
          <TabelaDia dia={dia2} />
        </div>
      </section>
    </main>
  );
}
