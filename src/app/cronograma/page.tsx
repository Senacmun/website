const dia1 = {
  data: "11 de Setembro",
  diaSemana: "sexta-feira",
  atividades: [
    { horario: "12h20 – 13h", atividade: "Credenciamento", local: "Centro de Convenções" },
    { horario: "13h – 14h20", atividade: "Cerimônia de Abertura", local: "Centro de Convenções" },
    { horario: "14h20 – 14h30", atividade: "Intervalo", local: "-" },
    { horario: "14h30 – 15h50", atividade: "Sessão 1", local: "Salas Específicas" },
    { horario: "15h50 – 16h", atividade: "Intervalo", local: "-" },
    { horario: "16h – 18h", atividade: "Sessão 2", local: "Salas Específicas" },
    { horario: "18h – 18h30", atividade: "Reunião do Secretariado", local: "Salas Específicas" },
  ],
};

const dia2 = {
  data: "12 de Setembro",
  diaSemana: "sábado",
  atividades: [
    { horario: "09h – 10h20", atividade: "Sessão 3", local: "Salas Específicas" },
    { horario: "10h20 – 10h40", atividade: "Intervalo", local: "-" },
    { horario: "10h40 – 12h20", atividade: "Sessão 4", local: "Salas Específicas" },
    { horario: "12h20 – 13h20", atividade: "Almoço", local: "-" },
    { horario: "13h – 14h50", atividade: "Sessão 5", local: "Salas Específicas" },
    { horario: "14h50 – 16h20", atividade: "Cerimônia de Encerramento", local: "Quadra Interna" },
  ],
};

const TabelaDia = ({ dia }: { dia: typeof dia1 }) => (
  <>
    {dia.atividades.map((item, i) => (
      <div
        key={i}
        className={`grid grid-cols-3 border-b border-slate-300 dark:border-white/10 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-white/5 ${
          i % 2 === 0
            ? "bg-slate-100 dark:bg-[#0B1E2D]"
            : "bg-slate-200 dark:bg-[#0d2235]"
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
  </>
);

export default function CronogramaPage() {
  return (
    <main>
      <section className="px-4 md:px-12 xl:px-32 pb-20">
        <p className="text-gray-800 dark:text-white text-lg md:text-xl font-medium mb-8">
          Programação SenaMun 2026 |{" "}
          <strong className="font-bold">11 e 12 de setembro</strong>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TabelaDia dia={dia1} />
          <TabelaDia dia={dia2} />
        </div>
      </section>
    </main>
  );
}