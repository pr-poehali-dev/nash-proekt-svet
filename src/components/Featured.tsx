const features = [
  {
    number: "01",
    title: "Быстро",
    description: "Всего несколько вопросов — без лишней воды и затянутых анкет.",
  },
  {
    number: "02",
    title: "Удобно",
    description: "Отвечай с любого устройства: телефон, планшет или компьютер.",
  },
  {
    number: "03",
    title: "Анонимно",
    description: "Мы не собираем личные данные. Только честные ответы.",
  },
];

export default function Featured() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-500">
          Почему стоит пройти
        </h3>
        <p className="text-3xl lg:text-5xl mb-16 text-neutral-900 leading-tight max-w-2xl">
          Опрос, который уважает твоё время и мнение.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f) => (
            <div key={f.number} className="border-t border-neutral-200 pt-8">
              <span className="text-neutral-300 text-sm font-mono mb-4 block">{f.number}</span>
              <h4 className="text-xl font-bold text-neutral-900 mb-3">{f.title}</h4>
              <p className="text-neutral-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a
            href="#quiz"
            className="inline-block bg-black text-white border border-black px-8 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-black uppercase tracking-wide"
          >
            Пройти опрос
          </a>
        </div>
      </div>
    </div>
  );
}
