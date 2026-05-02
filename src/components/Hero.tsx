import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/9bf1b59e-6851-4d79-b1df-a33711e827a2/files/efc5a98a-b20c-46cd-8580-007f25bd7bf0.jpg"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="uppercase tracking-widest text-sm opacity-70 mb-4">Узнай себя лучше</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          ОПРОС
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-10">
          Ответь на несколько вопросов — это займёт всего пару минут
        </p>
        <a
          href="#quiz"
          className="inline-block bg-white text-black px-8 py-3 uppercase text-sm tracking-wide font-medium hover:bg-opacity-90 transition-all duration-300"
        >
          Начать опрос
        </a>
      </div>
    </div>
  );
}