import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 1,
    question: "Как вы оцениваете качество медицинской помощи в РКПЦ?",
    options: ["Отлично", "Хорошо", "Удовлетворительно", "Неудовлетворительно"],
  },
  {
    id: 2,
    question: "Как вы оцениваете отношение персонала?",
    options: ["Очень внимательное", "Внимательное", "Нейтральное", "Невнимательное"],
  },
  {
    id: 3,
    question: "Насколько вы довольны условиями пребывания в центре?",
    options: ["Полностью доволен(а)", "В целом доволен(а)", "Есть замечания", "Не доволен(а)"],
  },
  {
    id: 4,
    question: "Порекомендуете ли вы РКПЦ своим близким?",
    options: ["Обязательно порекомендую", "Скорее да", "Скорее нет", "Нет"],
  },
];

const BACKEND_URL = "https://functions.poehali.dev/4aaaaa54-1479-49d1-a15f-34da45f4eba8";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const sendToTelegram = async (finalAnswers: Record<number, string>) => {
    setSending(true);
    const questionsMap: Record<string, string> = {};
    questions.forEach((q) => {
      questionsMap[q.id] = q.question;
    });
    try {
      await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers, questions: questionsMap }),
      });
    } catch (e) {
      console.error('Ошибка отправки в Telegram', e);
    } finally {
      setSending(false);
      setDone(true);
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
    setDone(false);
  };

  return (
    <div id="quiz" className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        {!done && !sending ? (
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
        ) : sending ? (
          <div className="text-center text-white text-xl opacity-60">Отправляем ваши ответы...</div>
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