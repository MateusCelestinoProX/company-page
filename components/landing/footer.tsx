"use client";

export function Footer() {
  return (
    <footer
      className="relative bg-black border-t border-white/10 py-16 px-6 z-10 overflow-hidden"
      aria-label="Rodapé"
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-sanguine-deep/10 rounded-full blur-[120px]"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-gray-900 pb-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center bg-black border border-sanguine rounded-lg shadow-neon-red">
              <span className="text-sanguine-glow font-black text-xl">S</span>
            </div>
            <span className="text-white font-tech font-bold text-2xl tracking-widest uppercase">
              Smart<span className="text-sanguine-glow">Flow</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-6">
            Sistemas autônomos de alta performance de nível enterprise.
            Automatizando processos de marketing, vendas e gestão sob medida.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/mateus-celestino/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in text-lg" aria-hidden />
            </a>
            <a
              href="https://instagram.com/CELESTINOAUTOMACAO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram text-lg" aria-hidden />
            </a>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-mono uppercase text-sanguine-glow tracking-widest mb-6">
            Navegação
          </h5>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <a href="#home" className="hover:text-white transition">
                Início
              </a>
            </li>
            <li>
              <a href="#squad" className="hover:text-white transition">
                Squad
              </a>
            </li>
            <li>
              <a href="#agendar" className="hover:text-white transition">
                Agendar
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-mono uppercase text-sanguine-glow tracking-widest mb-6">
            Fale Conosco
          </h5>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <i
                className="fa-solid fa-location-dot text-sanguine-glow"
                aria-hidden
              />{" "}
              Sete Lagoas, MG
            </li>
            <li className="flex items-center gap-2">
              <i
                className="fa-brands fa-instagram text-sanguine-glow"
                aria-hidden
              />{" "}
              @CELESTINOAUTOMACAO
            </li>
            <li className="pt-2">
              <a
                href="https://wa.me/5531997724257"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/15 transition-all duration-300"
                aria-label="Conversar no WhatsApp"
              >
                <i
                  className="fa-brands fa-whatsapp text-lg text-emerald-500"
                  aria-hidden
                />
                Conversar WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>© 2026 SmartFlow Platform. Todos os direitos reservados.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-white transition">
            Política de Privacidade
          </a>
          <a
            href="https://mateus-celestino-pro.bullet.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Sobre Mateus
          </a>
        </div>
      </div>
    </footer>
  );
}
