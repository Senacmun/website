"use client";

import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignInButton from "./GoogleSignInButton";
import emailjs from "@emailjs/browser";
import {
  FaInstagram,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

const GOOGLE_CLIENT_ID = "370484270444-sgrc01s05t15tk6e9unf8puqcj7ihup0.apps.googleusercontent.com";

function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
    foto_perfil: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = (data: { name: string; email: string; picture: string }) => {
    setFormData((prev) => ({
      ...prev,
      nome: data.name,
      email: data.email,
      foto_perfil: data.picture,
    }));
    setLoggedIn(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const foto = formData.foto_perfil || "https://ui-avatars.com/api/?name=" + encodeURIComponent(formData.nome) + "&background=random&size=100";

      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, foto_perfil: foto }),
      });

      if (!res.ok) throw new Error("Erro ao enviar email");

      setStatus("success");
      setFormData({ nome: "", email: "", assunto: "", mensagem: "", foto_perfil: "" });
      setLoggedIn(false);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      setStatus("error");
      console.error("Erro ao enviar:", error);
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="min-h-screen bg-white dark:bg-[#111827] relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 35px, #1F6FEB11 35px, #1F6FEB11 36px), repeating-linear-gradient(-45deg, transparent, transparent 35px, #1F6FEB11 35px, #1F6FEB11 36px)",
          }}
        />
      </div>
      {/* Esferas decorativas */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-light-blue-custom/20 to-yellow-custom/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-tr from-light-blue-custom/10 to-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Conteído principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Lado Esquerdo – Texto de contato */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0B2E4A] dark:text-white leading-tight">
                Ficou com alguma dúvida?
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-gray-500 dark:text-gray-400 leading-relaxed border-l-[3px] border-yellow-custom/40 pl-4">
                Sinta-se à vontade para nos contatar por aqui.
              </p>

              {/* Ícone decorativo */}
              <div className="mt-4 inline-flex items-center gap-2 text-[#1F6FEB] dark:text-light-blue-custom">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium">Resposta em até 24h</span>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:senamunsenac@gmail.com"
                className="contact-card flex items-center gap-3 p-4 rounded-2xl bg-transparent dark:bg-[#0F2A3D] border border-gray-200 dark:border-white/10 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-light-blue-custom/10 text-light-blue-custom group-hover:bg-light-blue-custom group-hover:text-white transition-colors">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    E-mail
                  </p>
                  <p className="text-sm text-[#0B2E4A] dark:text-white font-medium">
                    senamunsenac@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/senamun_/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card flex items-center gap-3 p-4 rounded-2xl bg-transparent dark:bg-[#0F2A3D] border border-gray-200 dark:border-white/10 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <FaInstagram className="text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    Instagram
                  </p>
                  <p className="text-sm text-[#0B2E4A] dark:text-white font-medium">
                    @senamun_
                  </p>
                </div>
              </a>
            </div>

            {/* Google Login */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0F2A3D] border border-gray-100 dark:border-white/10 shadow-sm">
              <p className="text-sm text-[#0B2E4A] dark:text-white font-medium mb-2">
                {loggedIn
                  ? "Conta vinculada!"
                  : "Entre com Google para preencher automático:"}
              </p>
              <GoogleSignInButton onSuccess={handleGoogleLogin} />
            </div>
          </div>

          {/* Lado Direito – Formulário */}
          <div className="rounded-3xl bg-white dark:bg-[#0F2A3D] border border-gray-100 dark:border-white/10 shadow-xl p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0B2E4A] dark:text-white">
                Fale conosco
              </h2>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Estamos aqui para ajudar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Foto de perfil */}
              {loggedIn && formData.foto_perfil && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <img
                    src={formData.foto_perfil}
                    alt="Foto de perfil"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm text-[#0B2E4A] dark:text-white font-medium">
                    {formData.nome}
                  </span>
                </div>
              )}

              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-[#0B2E4A] dark:text-gray-300"
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-[#0B2E4A] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-blue-custom/50 focus:border-light-blue-custom transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#0B2E4A] dark:text-gray-300"
                >
                  Endereço de e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-[#0B2E4A] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-blue-custom/50 focus:border-light-blue-custom transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="assunto"
                  className="block text-sm font-medium text-[#0B2E4A] dark:text-gray-300"
                >
                  Assunto
                </label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  required
                  value={formData.assunto}
                  onChange={handleChange}
                  placeholder="Sobre o que quer falar?"
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-[#0B2E4A] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-blue-custom/50 focus:border-light-blue-custom transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-medium text-[#0B2E4A] dark:text-gray-300"
                >
                  Nos conte um pouco mais sobre o que quer falar
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={5}
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva aqui sua mensagem..."
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-[#0B2E4A] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-light-blue-custom/50 focus:border-light-blue-custom transition-all resize-none"
                />
              </div>

              {status === "success" ? (
                <div className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white font-medium py-3.5 text-sm">
                  <FaCheckCircle />
                  Mensagem enviada com sucesso!
                </div>
              ) : status === "error" ? (
                <div className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 text-white font-medium py-3.5 text-sm">
                  Erro ao enviar. Tente novamente.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1F6FEB] hover:bg-blue-600 text-white font-medium py-3.5 text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "sending" ? (
                    <FaSpinner className="text-sm animate-spin" />
                  ) : (
                    <FaPaperPlane className="text-sm" />
                  )}
                  {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ContactForm />
    </GoogleOAuthProvider>
  );
}
