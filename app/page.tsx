"use client";

import { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

export default function Home() {
  const pages = [
    "/guidebook/page1.png",
    "/guidebook/page2.png",
    "/guidebook/page3.png",
    "/guidebook/page4.png",
    "/guidebook/page5.png",
    "/guidebook/page6.png",
    "/guidebook/page7.png",
    "/guidebook/page8.png",
    "/guidebook/page9.png",
    "/guidebook/page10.png",
    "/guidebook/page11.png",
    "/guidebook/page12.png",
    "/guidebook/page13.png",
    "/guidebook/page14.png",
    "/guidebook/page15.png",
    "/guidebook/page16.png",
    "/guidebook/page17.png",
    "/guidebook/page18.png",
  ];

  const bookRef = useRef<any>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [bookSize, setBookSize] = useState({ width: 900, height: 1200 });

  // 🔹 Deteksi ukuran layar dan update ukuran buku
  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      const width = mobile ? 360 : window.innerWidth * 0.3;
      const height = mobile ? 520 : window.innerHeight * 0.85;

      setBookSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const nextPage = () => bookRef.current?.pageFlip()?.flipNext?.();
  const prevPage = () => bookRef.current?.pageFlip()?.flipPrev?.();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 overflow-hidden">
      <div className="shadow-2xl rounded-2xl bg-white flex flex-col items-center justify-center">
        <div
          className="relative flex items-center justify-center"
          style={{
            width: isMobile ? "95vw" : "30vw",
            height: isMobile ? "70vh" : "85vh",
          }}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={bookSize.width}
            height={bookSize.height}
            size="fixed"
            minWidth={300}
            maxWidth={2500}
            minHeight={400}
            maxHeight={3000}
            showCover={true}
            mobileScrollSupport={true}
            usePortrait={true}
            drawShadow={true}
            flippingTime={1000}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            style={{
              backgroundColor: "white",
              boxShadow: "0 0 60px rgba(0,0,0,0.15)",
              borderRadius: "1rem",
            }}
          >
            {pages.map((page, index) => (
              <div key={index} className="flex items-center justify-center bg-white">
                <Image
                  src={page}
                  alt={`Halaman ${index + 1}`}
                  width={bookSize.width * 2}
                  height={bookSize.height * 2}
                  className="object-contain w-full h-full select-none"
                  priority={index === 0}
                  quality={100}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex gap-8 mt-10 flex-wrap justify-center">
        {/* Sebelumnya */}
        <button
          onClick={prevPage}
          className="group relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-[#343684]/40 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-gradient-to-r from-[#343684] via-[#660D41] to-[#343684]"></span>
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-10 py-4 text-base font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-white/90">
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-3 h-6 w-6 text-[#343684] transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path
                d="M11 19l-7-7 7-7M19 19l-7-7 7-7"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            <span className="relative bg-gradient-to-r from-[#343684] via-[#660D41] to-[#343684] bg-clip-text text-transparent font-semibold">
              Sebelumnya
            </span>
          </span>
        </button>

        {/* Selanjutnya */}
        <button
          onClick={nextPage}
          className="group relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-[#660D41]/40 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-gradient-to-r from-[#660D41] via-[#343684] to-[#660D41]"></span>
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-10 py-4 text-base font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-white/90">
            <span className="relative bg-gradient-to-r from-[#660D41] via-[#343684] to-[#660D41] bg-clip-text text-transparent font-semibold">
              Selanjutnya
            </span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-3 h-6 w-6 text-[#660D41] transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </button>
      </div>

      <p className="mt-8 text-gray-600 text-base text-center">
        Geser atau klik tombol untuk membuka halaman
      </p>

      <style jsx global>{`
        html,
        body {
          overflow-x: hidden !important;
        }
        canvas {
          touch-action: pan-y;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
