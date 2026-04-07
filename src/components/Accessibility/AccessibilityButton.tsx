"use client";

import { useEffect, useState } from "react";

export default function AccessibilityButton() {
  const [widgetVisible, setWidgetVisible] = useState(false);

  useEffect(() => {
    // Hide VLibras default button
    const style = document.createElement("style");
    style.textContent = `[vw],
[vw-plugin-wrapper],
[vw-access-button] {
  display: none !important;
}

[vw].enabled {
  display: none !important;
}

[vw].enabled.active {
  display: flex !important;
}

[vw] [vw-plugin-wrapper] {
  display: block !important;
}

[vw] [vw-access-button] {
  display: none !important;
}
`;
    document.head.appendChild(style);
  }, []);

  const toggleWidget = () => {
    const vwDiv = document.querySelector("[vw]") as HTMLElement;
    if (!vwDiv && !widgetVisible) {
      // Initial setup wasn't ready, try again
      return;
    }

    const newState = !widgetVisible;
    setWidgetVisible(newState);

    if (vwDiv) {
      if (newState) {
        vwDiv.classList.add("enabled");
        vwDiv.classList.add("active");
        // Trigger the widget
        setTimeout(() => {
          const wrapper = vwDiv.querySelector("[vw-plugin-wrapper]");
          if (wrapper) {
            const inner = wrapper.querySelector("div");
            if (inner) {
              inner.style.display = "block";
            }
          }
        }, 100);
      } else {
        vwDiv.classList.remove("active");
        // Close any open widget UI
        const closeBtn = document.querySelector('#vlibras-close') as HTMLElement;
        if (closeBtn) closeBtn.click();
      }
    }
  };

  return (
    <button
      onClick={toggleWidget}
      title="Acessibilidade - Libras"
      className="w-12 h-12 rounded-full bg-[#1F6FEB] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
    >
      <i className="fa-solid fa-hands" style={{ fontSize: "20px" }} />
    </button>
  );
}
