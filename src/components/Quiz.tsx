import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 1,
    question: "Как вы узнали о нас?",
    options: ["Из социальных сетей", "От друзей или знакомых", "Через поиск в интернете", "Из рекламы"],
  },
  {
    id: 2,
    question: "Как часто вы пользуетесь подобными сервисами?",
    options: ["Каждый день", "Несколько раз в неделю", "Раз в месяц", "Впервые пробую"],
  },
  {
    id: 3,
    question: "Что для вас важнее всего?",
    options: ["Простота и удобство", "Скорость работы", "Надёжность и безопасность", "Цена"],
  },
  {
    id: 4,
    question: "Оцените ваш опыт использования (1 — плохо, 5 — отлично)",
    options: ["1 — Плохо", "2 — Ниже среднего", "3 — Нормально", "4 — Хорошо", "5 — Отлично"],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  const handleAnswer = (option: string) => {
    const updated = { ...answers, [questions[current].id]: option };
    setAnswers(updated);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setDone(false);
  };

  return (
    <div id="quiz" className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        {!done ? (
          <>
            <div className="flex gap-2 mb-12">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-all duration-500 ${
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
                <h2 className="text-white text-2xl md:text-4xl font-bold mb-10 leading-tight">
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
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-neutral-500 uppercase text-xs tracking-widest mb-6">Готово!</p>
            <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">Спасибо!</h2>
            <p className="text-neutral-400 text-lg mb-10">
              Ваши ответы записаны. Мы ценим ваше мнение.
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
