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
    correct: "Б) Правилами по охране труда, утверждёнными Минтрудом России, и иными нормативными правовыми актами",
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
    correct: "В) Все медицинские работники, а также иные работники медицинских организаций в случаях, предусмотренных законодательством",
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
    correct: "В) 39 часов",
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
    correct: "Б) Первичный инструктаж на рабочем месте",
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
    correct: "В) Микроорганизмы-продуценты и возбудители инфекционных заболеваний",
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
    correct: "Б) Каждый работник медицинской организации",
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
    correct: "Б) Не реже 1 раза в 6 месяцев",
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
    correct: "Б) Средства индивидуальной и коллективной защиты в соответствии с типовыми нормами и характером работы",
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
    correct: "В) Комиссия, созданная работодателем, с участием представителей профсоюза и специалиста по охране труда",
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
    correct: "А) Да, в случаях, предусмотренных трудовым законодательством (например, для предотвращения катастрофы или устранения последствий аварии)",
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
    correct: "В) Медицинские (смотровые или хирургические) одноразовые перчатки, соответствующие требованиям защиты от биологических факторов",
  },
  {
    id: 12,
    question: "Что обязан сделать работник в случае порчи (прокола) перчаток во время манипуляции с кровью пациента?",
    options: [
      "А) Немедленно снять повреждённые перчатки, вымыть руки, обработать антисептиком и надеть новую пару перчаток",
      "Б) Продолжить манипуляцию в повреждённых перчатках до её завершения",
    ],
    correct: "А) Немедленно снять повреждённые перчатки, вымыть руки, обработать антисептиком и надеть новую пару перчаток",
  },
  {
    id: 13,
    question: "В медицинской организации произошло поражение электрическим током (медработник коснулся оголённого провода). Ваше первоочередное действие:",
    options: [
      "А) Обесточить пострадавшего (отключить рубильник/выдернуть вилку) или оттащить его с помощью диэлектрических предметов, не прикасаясь открытыми руками",
      "Б) Позвать на помощь и ждать электрика",
      "В) Облить пострадавшего водой",
      "Г) Оттащить за руку как можно быстрее",
    ],
    correct: "А) Обесточить пострадавшего (отключить рубильник/выдернуть вилку) или оттащить его с помощью диэлектрических предметов, не прикасаясь открытыми руками",
  },
  {
    id: 14,
    question: "При подозрении на пневмоторакс (открытая рана грудной клетки с «сосущим» звуком) необходимо:",
    options: [
      "А) Промыть рану и наложить обычную марлевую повязку",
      "Б) Наложить окклюзионную (герметизирующую) повязку, заклеив рану лейкопластырем/специальной плёнкой с трёх сторон (клапанная), придать полусидячее положение",
      "В) Наложить тугую циркулярную повязку на грудную клетку",
      "Г) Уложить на живот и не трогать рану",
    ],
    correct: "Б) Наложить окклюзионную (герметизирующую) повязку, заклеив рану лейкопластырем/специальной плёнкой с трёх сторон (клапанная), придать полусидячее положение",
  },
  {
    id: 15,
    question: "Какая тактика оказания помощи коллеге при отравлении парами хлора (например, при аварии с дезсредствами)?",
    options: [
      "А) Немедленно вынести пострадавшего на свежий воздух, освободить от стесняющей одежды, при отсутствии дыхания начать СЛР, обеспечить покой и срочно вызвать врача",
      "Б) Вызвать рвоту и дать активированный уголь",
      "В) Провести промывание желудка зондовым методом",
      "Г) Давать вдыхать пары нашатырного спирта",
    ],
    correct: "А) Немедленно вынести пострадавшего на свежий воздух, освободить от стесняющей одежды, при отсутствии дыхания начать СЛР, обеспечить покой и срочно вызвать врача",
  },
];

const BACKEND_URL = "https://functions.poehali.dev/4aaaaa54-1479-49d1-a15f-34da45f4eba8";
const PASS_SCORE = 10;
const TOTAL = questions.length;

export default function Quiz() {
  const [step, setStep] = useState<"title" | "fio" | "quiz" | "sending" | "done">("title");
  const [fio, setFio] = useState({ lastName: "", firstName: "", middleName: "", position: "", department: "" });
  const [fioError, setFioError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleFioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fio.lastName.trim() || !fio.firstName.trim() || !fio.position.trim() || !fio.department.trim()) {
      setFioError("Пожалуйста, заполните все обязательные поля");
      return;
    }
    setFioError("");
    setStep("quiz");
  };

  const sendToTelegram = async (finalAnswers: Record<number, string>) => {
    setStep("sending");
    const questionsMap: Record<string, string> = {};
    const correctMap: Record<string, string> = {};
    questions.forEach((q) => {
      questionsMap[String(q.id)] = q.question;
      correctMap[String(q.id)] = q.correct;
    });
    const fullName = [fio.lastName, fio.firstName, fio.middleName].filter(Boolean).join(" ");
    const correctCount = questions.filter((q) => finalAnswers[q.id] === q.correct).length;
    const passed = correctCount >= PASS_SCORE;
    const grade = !passed ? "Неудовлетворительно" : correctCount === TOTAL ? "Отлично" : "Удовлетворительно";
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: finalAnswers,
          questions: questionsMap,
          correct: correctMap,
          fullName,
          position: fio.position,
          department: fio.department,
          score: correctCount,
          total: TOTAL,
          passed,
          grade,
        }),
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
    setFio({ lastName: "", firstName: "", middleName: "", position: "", department: "" });
    setStep("title");
  };

  const score = questions.filter((q) => answers[q.id] === q.correct).length;
  const passed = score >= PASS_SCORE;
  const grade = !passed ? "Неудовлетворительно" : score === TOTAL ? "Отлично" : "Удовлетворительно";

  return (
    <div id="quiz" className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">

        {/* ТИТУЛЬНЫЙ ЛИСТ */}
        {step === "title" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-300 shadow-xl"
          >
            <div className="bg-blue-900 px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://cdn.poehali.dev/projects/9bf1b59e-6851-4d79-b1df-a33711e827a2/files/1bed2723-a77e-49dc-bbfd-8597cef911b6.jpg"
                  alt="Эмблема РКПЦ"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/40"
                />
                <div>
                  <p className="text-blue-200 text-xs uppercase tracking-widest">Республика Башкортостан</p>
                  <p className="text-white font-bold">ГБУЗ РБ РКПЦ</p>
                </div>
              </div>
              <img
                src="https://cdn.poehali.dev/projects/9bf1b59e-6851-4d79-b1df-a33711e827a2/files/21aa1b56-27d2-4373-a886-1415f5258722.jpg"
                alt="РКПЦ"
                className="w-16 h-16 object-cover rounded opacity-70"
              />
            </div>

            <div className="px-10 py-10 text-center border-b border-gray-200">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Аттестационный экзамен по охране труда</p>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Охрана труда<br />в медицинской организации
              </h1>
              <p className="text-gray-500 text-sm">Республиканский клинический перинатальный центр</p>
            </div>

            <div className="px-10 py-8 grid grid-cols-3 gap-4 text-center border-b border-gray-200 bg-gray-50">
              <div>
                <p className="text-3xl font-bold text-blue-900">{TOTAL}</p>
                <p className="text-gray-500 text-xs mt-1">вопросов</p>
              </div>
              <div className="border-x border-gray-200">
                <p className="text-3xl font-bold text-blue-900">{PASS_SCORE}</p>
                <p className="text-gray-500 text-xs mt-1">баллов для сдачи</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-900">1 балл</p>
                <p className="text-gray-500 text-xs mt-1">за каждый ответ</p>
              </div>
            </div>

            <div className="px-10 py-7 border-b border-gray-200">
              <p className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-3">Инструкция</p>
              <ol className="text-sm text-gray-700 space-y-2">
                <li>1. Внимательно прочитайте каждый вопрос и выберите один вариант ответа.</li>
                <li>2. Для сдачи необходимо набрать не менее <strong>{PASS_SCORE}</strong> из <strong>{TOTAL}</strong> баллов.</li>
                <li>3. После завершения вы увидите результат и разбор ошибок.</li>
                <li>4. Итоги будут переданы ответственному специалисту по охране труда.</li>
              </ol>
            </div>

            <div className="px-10 py-7 text-center">
              <button
                onClick={() => setStep("fio")}
                className="bg-blue-900 text-white px-10 py-4 text-sm font-bold uppercase tracking-wide hover:bg-blue-800 transition-colors duration-200 cursor-pointer w-full"
              >
                Заполнить данные и начать →
              </button>
            </div>
          </motion.div>
        )}

        {/* ФОРМА ФИО */}
        {step === "fio" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-300 shadow-xl"
          >
            <div className="bg-blue-900 px-8 py-5">
              <p className="text-blue-200 text-xs uppercase tracking-widest">Шаг 1 из 2</p>
              <h2 className="text-white font-bold text-xl">Данные участника</h2>
            </div>
            <form onSubmit={handleFioSubmit} className="px-8 py-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Фамилия *</label>
                  <input
                    type="text" placeholder="Иванова" value={fio.lastName}
                    onChange={(e) => setFio({ ...fio, lastName: e.target.value })}
                    className="border border-gray-300 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Имя *</label>
                  <input
                    type="text" placeholder="Мария" value={fio.firstName}
                    onChange={(e) => setFio({ ...fio, firstName: e.target.value })}
                    className="border border-gray-300 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Отчество</label>
                <input
                  type="text" placeholder="Петровна" value={fio.middleName}
                  onChange={(e) => setFio({ ...fio, middleName: e.target.value })}
                  className="border border-gray-300 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Должность *</label>
                <input
                  type="text" placeholder="Медицинская сестра" value={fio.position}
                  onChange={(e) => setFio({ ...fio, position: e.target.value })}
                  className="border border-gray-300 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Подразделение *</label>
                <input
                  type="text" placeholder="Родильное отделение" value={fio.department}
                  onChange={(e) => setFio({ ...fio, department: e.target.value })}
                  className="border border-gray-300 text-gray-900 px-4 py-3 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors"
                />
              </div>
              {fioError && (
                <p className="text-red-700 text-sm bg-red-50 border border-red-300 px-4 py-3">{fioError}</p>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("title")}
                  className="border border-gray-300 text-gray-600 px-6 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  ← Назад
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-900 text-white px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Начать экзамен →
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ВОПРОСЫ */}
        {step === "quiz" && (
          <div className="bg-white border border-gray-300 shadow-xl">
            <div className="bg-blue-900 px-8 py-5 flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-xs uppercase tracking-widest">Охрана труда — РКПЦ</p>
                <p className="text-white font-bold">Экзаменационный тест</p>
              </div>
              <div className="text-right bg-white/10 rounded px-4 py-2">
                <p className="text-white font-bold text-2xl leading-none">{current + 1}<span className="text-blue-300 text-base font-normal"> / {TOTAL}</span></p>
              </div>
            </div>

            <div className="px-8 pt-5 pb-1">
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      i < current ? "bg-blue-600" : i === current ? "bg-blue-400" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="px-8 py-7"
              >
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-4">
                  Вопрос {current + 1} из {TOTAL}
                </p>
                <h2 className="text-gray-900 text-lg font-semibold mb-6 leading-snug">
                  {questions[current].question}
                </h2>
                <div className="flex flex-col gap-3">
                  {questions[current].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="text-left text-gray-800 border-2 border-gray-200 bg-white px-5 py-4 text-sm hover:border-blue-600 hover:bg-blue-50 hover:text-blue-900 transition-all duration-150 cursor-pointer leading-snug font-medium"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ЗАГРУЗКА */}
        {step === "sending" && (
          <div className="bg-white border border-gray-300 shadow-xl px-8 py-20 text-center">
            <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
            <p className="text-gray-700 font-medium">Обрабатываем результаты...</p>
          </div>
        )}

        {/* РЕЗУЛЬТАТЫ */}
        {step === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-300 shadow-xl"
          >
            <div className={`px-8 py-8 text-center ${passed ? "bg-green-700" : "bg-red-700"}`}>
              <p className="text-white/70 text-xs uppercase tracking-widest mb-2">Результат экзамена</p>
              <p className="text-white text-5xl font-bold mb-1">{score} <span className="text-2xl font-normal opacity-70">/ {TOTAL}</span></p>
              <p className="text-white text-xl font-bold mt-2">
                {passed ? "✓ ЭКЗАМЕН СДАН" : "✗ ЭКЗАМЕН НЕ СДАН"}
              </p>
              <div className={`inline-block mt-4 px-6 py-2 text-sm font-bold uppercase tracking-widest rounded-full ${
                grade === "Отлично"
                  ? "bg-yellow-300 text-yellow-900"
                  : grade === "Удовлетворительно"
                  ? "bg-white text-green-800"
                  : "bg-white/20 text-white border border-white/60"
              }`}>
                {grade}
              </div>
            </div>

            <div className="px-8 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-4 justify-between text-sm text-gray-600">
              <span>Правильных: <strong className="text-gray-900">{score}</strong></span>
              <span>Ошибок: <strong className="text-gray-900">{TOTAL - score}</strong></span>
              <span>Проходной балл: <strong className="text-gray-900">{PASS_SCORE}</strong></span>
            </div>

            <div className="px-8 py-6 flex flex-col gap-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Разбор ответов</p>
              {questions.map((q) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`border-l-4 px-5 py-4 ${isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
                  >
                    <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                      {isCorrect ? "✓ Верно" : "✗ Ошибка"} — Вопрос {q.id}
                    </p>
                    <p className="text-gray-800 text-sm font-semibold mb-3 leading-snug">{q.question}</p>
                    <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-600"}`}>
                      Ваш ответ: {userAnswer}
                    </p>
                    {!isCorrect && (
                      <p className="text-green-700 text-sm mt-1 font-semibold">
                        Правильный ответ: {q.correct}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-8 py-6 border-t border-gray-200 text-center">
              <button
                onClick={restart}
                className="bg-blue-900 text-white px-10 py-3 text-sm font-bold uppercase tracking-wide hover:bg-blue-800 transition-colors cursor-pointer"
              >
                Пройти заново
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
