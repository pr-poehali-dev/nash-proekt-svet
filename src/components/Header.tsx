interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-700 font-bold text-xs">Р</span>
          </div>
          <div className="text-white text-sm uppercase tracking-widest font-bold">РКПЦ</div>
        </div>
        <nav className="flex gap-8">
          <a
            href="#quiz"
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm"
          >
            Пройти опрос
          </a>
          <a
            href="#about"
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm"
          >
            О центре
          </a>
        </nav>
      </div>
    </header>
  );
}