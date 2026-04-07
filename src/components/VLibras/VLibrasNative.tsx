"use client";

import { useEffect } from "react";

export default function VLibrasNative() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create required DOM structure for VLibras
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

    // Initialize widget
    if ((window as any).VLibras) {
      new (window as any).VLibras.Widget("https://vlibras.gov.br/app");
    }
  }, []);

  return null;
}
