import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 1,
    question: "Каким документом устанавливаются государственные нормативные требования охраны труда в медицинской организации?",
    options: [
      "А) Только трудовым договором с работником",
      "Б) Правилами по охране труда, утверждёнными Минтрудом России, и иными нормативными правовыми актами",
      "В) Исключительно коллективным договором",
      "Г) Локальными актами без учёта федеральных норм",
    ],
  },
  {
    id: 2,
    question: "Кто обязан проходить обязательные предварительные и периодические медицинские осмотры?",
    options: [
      "А) Только сотрудники хирургических отделений",
      "Б) Только работники, занятые на работах с вредными условиями труда",
      "В) Все медицинские работники, а также иные работники медицинских организаций в случаях, предусмотренных законодательством",
      "Г) Исключительно работники пищеблока больницы",
    ],
  },
  {
    id: 3,
    question: "Какова максимальная продолжительность рабочего времени для медицинских работников в неделю (по общему правилу)?",
    options: [
      "А) 36 часов",
      "Б) 40 часов",
      "В) 39 часов",
      "Г) 42 часа",
    ],
  },
  {
    id: 4,
    question: "Какой вид инструктажа по охране труда проводится при поступлении на работу до начала трудовой деятельности?",
    options: [
      "А) Повторный",
      "Б) Первичный инструктаж на рабочем месте",
      "В) Внеплановый",
      "Г) Целевой",
    ],
  },
  {
    id: 5,
    question: "Что из перечисленного является опасным биологическим фактором в медицинской организации?",
    options: [
      "А) Электромагнитное излучение от аппаратуры МРТ",
      "Б) Повышенная температура в стерилизационной",
      "В) Микроорганизмы-продуценты и возбудители инфекционных заболеваний",
      "Г) Ионизирующее излучение",
    ],
  },
  {
    id: 6,
    question: "Кто обязан немедленно извещать своего непосредственного руководителя о любой ситуации, угрожающей жизни и здоровью людей?",
    options: [
      "А) Только специалист по охране труда",
      "Б) Каждый работник медицинской организации",
      "В) Только заведующий отделением",
      "Г) Только представитель профсоюза",
    ],
  },
  {
    id: 7,
    question: "Какая периодичность проведения повторного инструктажа по охране труда установлена для работников медицинских организаций?",
    options: [
      "А) Не реже 1 раза в год",
      "Б) Не реже 1 раза в 6 месяцев",
      "В) Не реже 1 раза в 3 месяца",
      "Г) Повторный инструктаж отменён, проводится только внеплановый",
    ],
  },
  {
    id: 8,
    question: "Что обязан применять работник при выполнении работ, связанных с биологической опасностью?",
    options: [
      "А) Только специальную обувь",
      "Б) Средства индивидуальной и коллективной защиты в соответствии с типовыми нормами и характером работы",
      "В) Любые перчатки по своему усмотрению",
      "Г) Только медицинскую шапочку и халат",
    ],
  },
  {
    id: 9,
    question: "Кто проводит расследование несчастного случая на производстве с медицинским работником?",
    options: [
      "А) Непосредственный руководитель пострадавшего",
      "Б) Только профсоюзный комитет",
      "В) Комиссия, созданная работодателем, с участием представителей профсоюза и специалиста по охране труда",
      "Г) Сам пострадавший",
    ],
  },
  {
    id: 10,
    question: "Допускается ли привлечение медицинского работника к сверхурочной работе без его письменного согласия в случае аварийной ситуации в отделении?",
    options: [
      "А) Да, в случаях, предусмотренных трудовым законодательством (например, для предотвращения катастрофы или устранения последствий аварии)",
      "Б) Нет, никогда",
      "В) Да, по устному распоряжению заведующего отделением",
      "Г) Да, в любых случаях при производственной необходимости",
    ],
  },
  {
    id: 11,
    question: "Какие перчатки необходимо использовать при проведении инвазивных процедур и контакте с биологическими жидкостями?",
    options: [
      "А) Хозяйственные резиновые перчатки многократного применения",
      "Б) Хлопчатобумажные перчатки",
      "В) Медицинские (смотровые или хирургические) одноразовые перчатки, соответствующие требованиям защиты от биологических факторов",
      "Г) Строительные перчатки с полимерным покрытием",
    ],
  },
  {
    id: 12,
    question: "Что обязан сделать работник в случае порчи (прокола) перчаток во время манипуляции с кровью пациента?",
    options: [
      "А) Немедленно снять повреждённые перчатки, вымыть руки, обработать антисептиком и надеть новую пару перчаток",
      "Б) Продолжить манипуляцию в повреждённых перчатках до её завершения",
    ],
  },
];

const BACKEND_URL = "https://functions.poehali.dev/4aaaaa54-1479-49d1-a15f-34da45f4eba8";

export default function Quiz() {
  const [step, setStep] = useState<"fio" | "quiz" | "sending" | "done">("fio");
  const [fio, setFio] = useState({ lastName: "", firstName: "", middleName: "" });
  const [fioError, setFioError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleFioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fio.lastName.trim() || !fio.firstName.trim()) {
      setFioError("Пожалуйста, заполните фамилию и имя");
      return;
    }
    setFioError("");
    setStep("quiz");
  };

  const sendToTelegram = async (finalAnswers: Record<number, string>) => {
    setStep("sending");
    const questionsMap: Record<string, string> = {};
    questions.forEach((q) => {
      questionsMap[q.id] = q.question;
    });
    const fullName = [fio.lastName, fio.firstName, fio.middleName].filter(Boolean).join(" ");
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers, questions: questionsMap, fullName }),
      });
    } catch (e) {
      console.error("Ошибка отправки в Telegram", e);
    } finally {
      setStep("done");
    }
  };

  const handleAnswer = (option: string) => {
    const updated = { ...answers, [questions[current].id]: option };
    setAnswers(updated);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      sendToTelegram(updated);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setFio({ lastName: "", firstName: "", middleName: "" });
    setStep("fio");
  };

  return (
    <div id="quiz" className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">

        {step === "fio" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-neutral-500 uppercase text-xs tracking-widest mb-4">Начало опроса</p>
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-10 leading-tight">
              Представьтесь, пожалуйста
            </h2>
            <form onSubmit={handleFioSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Фамилия *"
                value={fio.lastName}
                onChange={(e) => setFio({ ...fio, lastName: e.target.value })}
                className="bg-transparent border border-neutral-700 text-white px-6 py-4 text-base placeholder-neutral-500 focus:outline-none focus:border-white transition-colors duration-200"
              />
              <input
                type="text"
                placeholder="Имя *"
                value={fio.firstName}
                onChange={(e) => setFio({ ...fio, firstName: e.target.value })}
                className="bg-transparent border border-neutral-700 text-white px-6 py-4 text-base placeholder-neutral-500 focus:outline-none focus:border-white transition-colors duration-200"
              />
              <input
                type="text"
                placeholder="Отчество"
                value={fio.middleName}
                onChange={(e) => setFio({ ...fio, middleName: e.target.value })}
                className="bg-transparent border border-neutral-700 text-white px-6 py-4 text-base placeholder-neutral-500 focus:outline-none focus:border-white transition-colors duration-200"
              />
              {fioError && <p className="text-red-400 text-sm">{fioError}</p>}
              <button
                type="submit"
                className="mt-4 bg-white text-black px-8 py-4 uppercase text-sm tracking-wide font-medium hover:bg-neutral-200 transition-all duration-200 cursor-pointer"
              >
                Начать опрос →
              </button>
            </form>
          </motion.div>
        )}

        {step === "quiz" && (
          <>
            <div className="flex gap-1 mb-12 flex-wrap">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 min-w-[8px] transition-all duration-500 ${
                    i <= current ? "bg-white" : "bg-neutral-700"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-neutral-500 uppercase text-xs tracking-widest mb-4">
                  Вопрос {current + 1} из {questions.length}
                </p>
                <h2 className="text-white text-xl md:text-3xl font-bold mb-10 leading-tight">
                  {questions[current].question}
                </h2>
                <div className="flex flex-col gap-3">
                  {questions[current].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="text-left text-white border border-neutral-700 px-6 py-4 text-base hover:border-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {step === "sending" && (
          <div className="text-center text-white text-xl opacity-60">Отправляем ваши ответы...</div>
        )}

        {step === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-neutral-500 uppercase text-xs tracking-widest mb-6">Готово!</p>
            <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">Спасибо!</h2>
            <p className="text-neutral-400 text-lg mb-10">
              Ваши ответы переданы в РКПЦ. Мы обязательно учтём ваше мнение.
            </p>
            <button
              onClick={restart}
              className="bg-white text-black px-8 py-3 uppercase text-sm tracking-wide hover:bg-neutral-200 transition-all duration-200 cursor-pointer"
            >
              Пройти снова
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
