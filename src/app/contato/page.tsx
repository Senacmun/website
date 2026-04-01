import Link from "next/link";
import React from "react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/seu_instagram", "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:seuemail@gmail.com";
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-semibold">
        Sinta-se livre para nos contatar
      </h1>
      <p className="text-xl">Você pode nos encontrar aqui:</p>
      <div className="mt-8 flex gap-4">
        <Link
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-xl"
          href={"https://www.instagram.com/senamun_/"}
        >
          <FaInstagram className="inline-block mr-2" />
          Instagram
        </Link>
        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl"
          href={"mailto:senamunsenac@gmail.com"}
        >
          <FaEnvelope className="inline-block mr-2" />
          Email
        </Link>
      </div>
    </section>
  );
}
