"use client";

import { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

export default function Home() {
  const pages = [
    "/guidebook/page1.svg",
    "/guidebook/page2.svg",
    "/guidebook/page3.svg",
    "/guidebook/page4.svg",
    "/guidebook/page5.svg",
    "/guidebook/page6.svg",
    "/guidebook/page7.svg",
    "/guidebook/page8.svg",
    "/guidebook/page9.svg",
    "/guidebook/page10.svg",
    "/guidebook/page11.svg",
    "/guidebook/page12.svg",
    "/guidebook/page13.svg",
    "/guidebook/page14.svg",
    "/guidebook/page15.svg",
    "/guidebook/page16.svg",
    "/guidebook/page17.svg",
    "/guidebook/page18.svg",
  ];

  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi layar mobile
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Update halaman aktif setiap kali flip dilakukan
  useEffect(() => {
    const flipInstance = bookRef.current?.pageFlip();
    if (!flipInstance) return;

    const updatePage = () => {
      const current = bookRef.current?.pageFlip()?.getCurrentPageIndex?.();
      if (typeof current === "number") setCurrentPage(current);
    };

    // Delay untuk memastikan flipbook siap
    const timer = setTimeout(() => {
      updatePage(); // sinkronisasi awal
      flipInstance.on("flip", updatePage);
    }, 300);

    // Cleanup listener
    return () => {
      clearTimeout(timer);
      flipInstance?.off?.("flip", updatePage);
    };
  }, []);

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext?.();
  };

  const prevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev?.();
  };

  // Tentukan ukuran dinamis
  const bookWidth = isMobile ? 340 : 900;
  const bookHeight = isMobile ? 480 : 1280;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8 overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
        📘 Guidebook Kompetisi Konten Kreator
      </h1>

      <div className="shadow-2xl rounded-xl bg-white flex flex-col items-center">
        <HTMLFlipBook
          ref={bookRef}
          width={bookWidth}
          height={bookHeight}
          size="stretch"
          minWidth={300}
          maxWidth={1200}
          minHeight={400}
          maxHeight={1600}
          showCover={true}
          className="rounded-xl"
          mobileScrollSupport={true}
          usePortrait={true}
          style={{
            backgroundColor: "white",
            boxShadow: "0 0 40px rgba(0,0,0,0.15)",
          }}
        >
          {pages.map((page, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-white"
            >
              <Image
                src={page}
                alt={`Halaman ${index + 1}`}
                width={bookWidth * 2}
                height={bookHeight * 2}
                className="object-contain w-full h-auto select-none"
                priority={index === 0}
                quality={100}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex gap-6 mt-6 flex-wrap justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`px-5 py-2 rounded-xl transition ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-800"
          }`}
        >
          ⬅️ Sebelumnya
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className={`px-5 py-2 rounded-xl transition ${
            currentPage === pages.length - 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Selanjutnya ➡️
        </button>
      </div>

      <p className="mt-4 text-gray-600 text-sm">
        Halaman {currentPage + 1} dari {pages.length}
      </p>

      <style jsx global>{`
        html,
        body {
          overflow-x: hidden !important;
        }
        canvas {
          touch-action: pan-y;
        }
      `}</style>
    </main>
  );
}
