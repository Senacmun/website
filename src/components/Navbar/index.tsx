"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import IconHeader from "./icon-header.svg";
import { menuData } from "./menuData";
import dadosComites from "@/app/comites/dataComites";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [lateralOpen, setLateralOpen] = useState<string | null>(null);
  const [activeCommittee, setActiveCommittee] = useState<number | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  console.log("Comitês carregados no menu:", dadosComites);

  const toggleDropdown = (name: string) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
    setLateralOpen(null);
    setActiveCommittee(null);
  };

  const handleLateralHover = (name: string | null) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (name) {
      hoverTimeout.current = setTimeout(() => setLateralOpen(name), 150);
    } else {
      hoverTimeout.current = setTimeout(() => setLateralOpen(null), 150);
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: any
  ) => {
    if (item.submenu) {
      e.preventDefault();
      toggleDropdown(item.name);
    }
  };

  return (
    <nav className="bg-blue-custom relative z-50">
      <div className="2xl:max-w-screen-2xl max-w-screen-xl mx-auto px-2 md:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-light-blue-custom focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center md:justify-between justify-center md:items-stretch lg">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-4 opacity-95 hover:scale-105 transition-all duration-200"
              >
                <Image
                  className="image hover:rotate-6 hover:scale-105 transition-transform duration-300"
                  src={IconHeader}
                  alt="Icone do Header"
                  width={45}
                />
                <p className="text-white font-medium text-xl tracking-widest text-center position">
                  S E N A M U N
                </p>
              </Link>
            </div>
            <div className="hidden md:flex md:ml-6 items-center">
              <div className="flex space-x-4">
                {menuData.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseLeave={closeDropdown}
                  >
                    <a
                      href={item.href}
                      style={{ fontSize: "14px" }}
                      className={`text-white hover:bg-light-blue-custom lg:px-5 px-2 py-2 rounded-lg tracking-widest duration-150 relative ${
                        item.submenu ? "cursor-pointer" : ""
                      }`}
                      onClick={(e) => handleLinkClick(e, item)}
                    >
                      {item.name}
                      {item.submenu && (
                        <FiChevronDown
                          className={`inline-block ml-1 h-4 w-4 transform transition-transform ${
                            dropdownOpen === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </a>
                    {item.submenu && (
                      <div
                        className={`z-50 origin-top-right absolute right-0 mt-2 w-56 dropdown-glass transition-all duration-300 ease-out transform ${
                          dropdownOpen === item.name
                            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                        }`}
                        aria-hidden={dropdownOpen !== item.name}
                      >
                        {item.submenu.map((subItem) => {
                          const isComites = subItem.name === "Comitês";
                          return (
                            <div 
                              key={subItem.name} 
                              className="relative"
                              onMouseEnter={() => isComites && handleLateralHover(subItem.name)}
                              onMouseLeave={() => isComites && handleLateralHover(null)}
                            >
                              <a
                                href={subItem.href}
                                onClick={(e) => isComites && e.preventDefault()}
                                onDoubleClick={(e) => { window.location.href = subItem.href; }}
                                className="flex items-center justify-between px-4 py-2 text-md text-gray-800 dark:text-gray-200 rounded-md hover:bg-[#1F6FEB] hover:text-white dark:hover:bg-[#013563] transition-all duration-200"
                              >
                                <span>{subItem.name}</span>
                                {isComites && <span className="ml-2">›</span>}
                              </a>

                              {/* Submenu Lateral para Comitês */}
                              {isComites && (
                                <div
                                  className={`absolute left-full top-0 ml-0 w-72 z-50 origin-top-left dropdown-glass transition-all duration-300 ease-in-out transform ${
                                    lateralOpen === subItem.name
                                      ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                                      : "opacity-0 -translate-x-2 scale-95 pointer-events-none"
                                  }`}
                                >
                                  <div className="p-2">
                                    <a
                                      href="/comites"
                                      className="block px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 rounded-md hover:bg-[#1F6FEB] hover:text-white transition-all duration-200 mb-1 border-b border-white/10 pb-2"
                                    >
                                      Ver todos os comitês
                                    </a>
                                    <div className="mt-1">
                                      <ul className="space-y-0 max-h-60 overflow-auto">
                                        {dadosComites.map((c, ci) => (
                                          <li key={ci}>
                                            <button
                                              onClick={(e) => {
                                                e.preventDefault();
                                                setActiveCommittee(ci === activeCommittee ? null : ci);
                                              }}
                                              className={`w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 rounded-md transition-all duration-200 flex items-center justify-between ${activeCommittee === ci ? 'bg-[#1F6FEB] text-white' : 'hover:bg-white/10'}`}
                                            >
                                              <span className="truncate">{c.comite}</span>
                                              <span className="ml-2 text-xs text-gray-400">›</span>
                                            </button>
                                            {activeCommittee === ci && (
                                              <div className="mt-1 ml-2 mb-2 p-2 bg-black/20 dark:bg-white/5 rounded-lg space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                                <a href={c.classroom || "#"} className="block px-2 py-1 text-xs text-gray-700 dark:text-gray-300 hover:text-[#1F6FEB] dark:hover:text-white transition-colors" target="_blank" rel="noreferrer">• Classroom</a>
                                                <a href={c.whatsapp || "#"} className="block px-2 py-1 text-xs text-gray-700 dark:text-gray-300 hover:text-[#1F6FEB] dark:hover:text-white transition-colors" target="_blank" rel="noreferrer">• WhatsApp</a>
                                                <a href={c.pdf || "#"} className="block px-2 py-1 text-xs text-gray-700 dark:text-gray-300 hover:text-[#1F6FEB] dark:hover:text-white transition-colors" target="_blank" rel="noreferrer">• Baixar PDF</a>
                                              </div>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden transition-all duration-200 ${
          isOpen
            ? "max-h-screen opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95 overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuData.map((item) => (
            <div key={item.name}>
              <a
                href={item.href}
                style={{ fontSize: "14px" }}
                className="text-gray-300 hover:bg-light-blue-custom hover:text-white block px-3 py-2 rounded-md font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(item.name);
                }}
              >
                {item.name}
                {item.submenu && (
                  <FiChevronDown
                    className={`inline-block ml-1 h-4 w-4 transform transition-transform ${
                      dropdownOpen === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </a>
              {item.submenu && (
                <div className={`pl-5 transition-all duration-300 ease-out transform ${dropdownOpen === item.name ? "opacity-100 max-h-screen translate-y-0 pointer-events-auto" : "opacity-0 max-h-0 -translate-y-1 pointer-events-none"}`}>
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      style={{ fontSize: "14px" }}
                            className="block px-4 py-2 text-md text-gray-800 dark:text-gray-200 rounded-md hover:bg-[#1F6FEB] hover:text-white dark:hover:bg-[#013563] transition-all duration-200"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;