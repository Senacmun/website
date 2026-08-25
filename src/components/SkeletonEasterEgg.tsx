"use client";

import { useEffect, useRef, useState } from "react";

// Valores maiores removem também tons escuros próximos ao preto.
const BLACK_THRESHOLD = 40;

export default function SkeletonEasterEgg() {
  const [isRunning, setIsRunning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "e";

      if (!isShortcut) return;

      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      event.preventDefault();
      setIsRunning(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    let sizeSet = false;

    const drawFrame = () => {
      if (!video.paused && !video.ended) {
        if (!sizeSet && video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          sizeSet = true;
        }

        if (sizeSet) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = context.getImageData(0, 0, canvas.width, canvas.height);
          const data = frame.data;

          for (let index = 0; index < data.length; index += 4) {
            if (
              data[index] < BLACK_THRESHOLD &&
              data[index + 1] < BLACK_THRESHOLD &&
              data[index + 2] < BLACK_THRESHOLD
            ) {
              data[index + 3] = 0;
            }
          }

          context.putImageData(frame, 0, 0);
        }

        rafRef.current = requestAnimationFrame(drawFrame);
      }
    };

    const handleEnded = () => setIsRunning(false);

    video.currentTime = 0;
    video.addEventListener("ended", handleEnded);
    video.play().then(() => {
      rafRef.current = requestAnimationFrame(drawFrame);
    }).catch(() => {
      // O atalho de teclado normalmente conta como uma interação do usuário.
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isRunning]);

  if (!isRunning) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src="/easter-egg/esqueleto.mp4"
        muted
        playsInline
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="skeleton-run absolute top-1/2 h-[20.8rem] w-auto -translate-y-1/2"
      />
      <style jsx>{`
        .skeleton-run {
          right: -20%;
          animation: run-across 3.5s linear forwards;
        }

        @keyframes run-across {
          from {
            right: -20%;
          }
          to {
            right: 120%;
          }
        }
      `}</style>
    </div>
  );
}
