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
          src="https://cdn.poehali.dev/projects/9bf1b59e-6851-4d79-b1df-a33711e827a2/files/21aa1b56-27d2-4373-a886-1415f5258722.jpg"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="uppercase tracking-widest text-sm opacity-70 mb-4">Республиканский клинический перинатальный центр</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          РКПЦ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-10">
          Опрос пациентов и сотрудников — помогите нам стать лучше, ответив на несколько вопросов
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