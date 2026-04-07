"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function VLibrasWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [activeTab, setActiveTab] = useState<"avatar" | "phrases" | "alphabet" | "reader">("avatar");
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const dragRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const avatarIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen]);

  // Load VLibras plugin from local
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create required DOM structure
    if (document.querySelector("[vw]")) return;

    const vwDiv = document.createElement("div");
    vwDiv.setAttribute("vw", "");
    const accessBtn = document.createElement("div");
    accessBtn.setAttribute("vw-access-button", "");
    vwDiv.appendChild(accessBtn);
    const wrapper = document.createElement("div");
    wrapper.setAttribute("vw-plugin-wrapper", "");
    const innerWrapper = document.createElement("div");
    innerWrapper.className = "vw-plugin-top-wrapper";
    wrapper.appendChild(innerWrapper);
    vwDiv.appendChild(wrapper);
    document.body.appendChild(vwDiv);

    // Load local plugin
    const script = document.createElement("script");
    script.src = "/vlibras/vlibras-plugin.js";
    script.onload = () => {
      if ((window as any).VLibras) {
        new (window as any).VLibras.Widget("/vlibras");
        setAvatarLoaded(true);
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleClose = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setCurrentText("");
    setIsOpen(false);
    setOffsetX(0);
    setOffsetY(0);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    dragRef.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = { x: e.clientX, y: e.clientY };
      setOffsetX((p) => p + dx);
      setOffsetY((p) => p + dy);
    };
    const onUp = () => { dragRef.current = false; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const readSelected = () => {
    const t = window.getSelection()?.toString().trim();
    if (!t) return;
    window.speechSynthesis.cancel();
    setCurrentText(t);
    setIsReading(true);
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "pt-BR";
    u.rate = 0.9;
    u.onend = () => setIsReading(false);
    u.onerror = () => setIsReading(false);
    window.speechSynthesis.speak(u);
  };

  const readPage = () => {
    const el = document.querySelector("main, article, [role=main], body") as HTMLElement;
    if (!el) return;
    const t = el.innerText.replace(/\s+/g, " ").trim().substring(0, 3000);
    if (!t) return;
    window.speechSynthesis.cancel();
    setCurrentText(t.substring(0, 200) + "...");
    setIsReading(true);
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "pt-BR";
    u.rate = 0.85;
    u.onend = () => setIsReading(false);
    u.onerror = () => setIsReading(false);
    window.speechSynthesis.speak(u);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  const librasAlphabet = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
  ];

  const commonPhrases = [
    { pt: "Bom dia", desc: "Mão aberta no queixo, move para frente" },
    { pt: "Boa tarde", desc: "Mão aberta no queixo, move levemente" },
    { pt: "Boa noite", desc: "Mão no queixo, sobe e desce" },
    { pt: "Obrigado/a", desc: "Mão aberta no peito, inclina" },
    { pt: "Por favor", desc: "Mãos abertas, movimento circular" },
    { pt: "Sim", desc: "Mão fecha em punho, acena" },
    { pt: "Não", desc: "Dedo indicador balança" },
    { pt: "Desculpe", desc: "Mão fechada esfrega no peito" },
    { pt: "Ajuda", desc: "Mãos abertas sobem juntas" },
    { pt: "Água", desc: "Mão em A toca o queixo" },
    { pt: "Comida", desc: "Mão em O toca a boca" },
    { pt: "Banheiro", desc: "Mão em T balança" },
  ];

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[99998] bg-black/30"
            onClick={handleClose}
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className="fixed z-[99999] w-[440px] max-w-[90vw] h-[80vh] max-h-[680px] bg-white dark:bg-[#0F2A3D] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              top: `calc(50% - 340px + ${offsetY}px)`,
              left: `calc(50% - 220px + ${offsetX}px)`,
            }}
          >
            {/* Header */}
            <div
              className="relative bg-gradient-to-r from-[#1F6FEB] to-[#1560c0] px-5 py-4 flex items-center gap-4 cursor-grab active:cursor-grabbing select-none"
              onPointerDown={onPointerDown}
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-hands text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-base">
                  Acessibilidade — Libras
                </h3>
                <p className="text-white/70 text-xs mt-0.5">
                  {avatarLoaded ? "Avatar ativo" : "Iniciando avatar..." }
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-lg font-bold hover:bg-white/30 shrink-0"
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0B1E2D]">
              {[
                { key: "avatar" as const, label: "Avatar", icon: "fa-hands" },
                { key: "phrases" as const, label: "Frases", icon: "fa-comments" },
                { key: "alphabet" as const, label: "Alfabeto", icon: "fa-font" },
                { key: "reader" as const, label: "Leitor", icon: "fa-volume-high" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 text-[11px] font-semibold transition-colors ${
                    activeTab === tab.key
                      ? "bg-[#1F6FEB] text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <i className={`fa-solid ${tab.icon} text-[10px]`} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {/* AVATAR TAB */}
              {activeTab === "avatar" && (
                <div className="flex flex-col h-full">
                  {/* Avatar container */}
                  <div className="bg-[#0B1E2D] flex items-center justify-center p-4 min-h-[300px]">
                    <div className="w-full max-w-[300px] aspect-[3/4] rounded-xl overflow-hidden bg-[#0B1E2D] flex items-center justify-center">
                      {/* The VLibras widget will render inside its own container.
                          We try to trigger it here via the native plugin. */}
                      {!avatarLoaded ? (
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 mx-auto rounded-full bg-[#1F6FEB]/20 flex items-center justify-center">
                            <i className="fa-solid fa-spinner fa-spin text-[#1F6FEB] text-2xl" />
                          </div>
                          <p className="text-sm text-gray-300">
                            Carregando avatar...
                          </p>
                        </div>
                      ) : (
                        <div className="text-center space-y-3">
                          <div className="w-20 h-20 mx-auto rounded-full bg-[#1F6FEB]/20 flex items-center justify-center">
                            <i className="fa-solid fa-hands text-[#1F6FEB] text-3xl" />
                          </div>
                          <p className="text-sm text-gray-300 font-medium">Avatar carregado</p>
                          <p className="text-xs text-gray-500">
                            Selecione texto na página e clique em traduzir
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="p-4 border-t border-gray-200 dark:border-white/5">
                    <button
                      onClick={() => setActiveTab("reader")}
                      className="w-full py-2.5 bg-[#1F6FEB]/10 text-[#1F6FEB] rounded-xl hover:bg-[#1F6FEB]/20 text-xs font-semibold"
                    >
                      <i className="fa-solid fa-volume-high mr-1" />
                      Ouvir texto selecionado
                    </button>
                  </div>
                </div>
              )}

              {/* PHRASES TAB */}
              {activeTab === "phrases" && (
                <div className="p-4 space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                    Frases essenciais em Libras
                  </p>
                  {commonPhrases.map((phrase, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-[#1F6FEB]/5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#1F6FEB]/10 flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-hands text-[#1F6FEB] text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {phrase.pt}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                          {phrase.desc}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          window.speechSynthesis.cancel();
                          const u = new SpeechSynthesisUtterance(phrase.pt);
                          u.lang = "pt-BR";
                          u.rate = 0.8;
                          window.speechSynthesis.speak(u);
                        }}
                        className="w-8 h-8 rounded-lg bg-[#1F6FEB]/10 text-[#1F6FEB] flex items-center justify-center hover:bg-[#1F6FEB]/20 flex-shrink-0"
                      >
                        <i className="fa-solid fa-play text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ALPHABET TAB */}
              {activeTab === "alphabet" && (
                <div className="p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                    Alfabeto em Libras
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {librasAlphabet.map((letter) => (
                      <button
                        key={letter}
                        onClick={() => {
                          window.speechSynthesis.cancel();
                          const u = new SpeechSynthesisUtterance(letter);
                          u.lang = "pt-BR";
                          u.rate = 0.7;
                          window.speechSynthesis.speak(u);
                        }}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-[#1F6FEB]/10 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-[#1F6FEB]/10 flex items-center justify-center">
                          <span className="text-xl font-bold text-[#1F6FEB]">{letter}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{letter}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* READER TAB */}
              {activeTab === "reader" && (
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={readSelected}
                      className="flex items-center justify-center gap-2 px-3 py-3 bg-[#1F6FEB]/10 text-[#1F6FEB] rounded-xl hover:bg-[#1F6FEB]/20 transition-colors text-xs font-semibold"
                    >
                      <i className="fa-solid fa-text-height" />
                      Ler Selecionado
                    </button>
                    <button
                      onClick={isReading ? stopReading : readPage}
                      className="flex items-center justify-center gap-2 px-3 py-3 bg-[#1F6FEB]/10 text-[#1F6FEB] rounded-xl hover:bg-[#1F6FEB]/20 transition-colors text-xs font-semibold"
                    >
                      <i className={`fa-solid fa-${isReading ? "pause" : "play"}`} />
                      {isReading ? "Parar" : "Ler Página"}
                    </button>
                  </div>
                  {currentText && (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1 font-medium">
                        {isReading ? "Lendo:" : "Último texto:"}
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 max-h-32 overflow-auto leading-relaxed">
                        {currentText}
                      </p>
                    </div>
                  )}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Selecione texto na página e clique em &quot;Ler Selecionado&quot;
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Drag hint */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-[#0B1E2D] text-center border-t border-gray-200 dark:border-white/5">
              <p className="text-[10px] text-gray-400 dark:text-gray-500">
                <i className="fa-solid fa-arrows-up-down-left-right mr-1" />
                Arraste pelo cabeçalho azul
              </p>
            </div>
          </div>
        </>
      )}

      {/* Trigger */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        title="Acessibilidade - Libras"
        className="w-12 h-12 rounded-full bg-[#1F6FEB] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
      >
        <i className="fa-solid fa-hands" style={{ fontSize: "20px" }} />
      </button>
    </>
  );
}
