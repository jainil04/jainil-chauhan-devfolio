"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type PhotoFolder } from "@/data/photoFolders";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
/** Build the list of display images from folder data. */
function getImages(folder: PhotoFolder): string[] {
  if (folder.photos?.length) return folder.photos;
  return [folder.coverImage];
}

export default function FolderFlyout({
  folder,
  onClose,
}: {
  folder: PhotoFolder | null;
  onClose: () => void;
}) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const dragControls = useDragControls();

  const images = folder ? getImages(folder) : [];

  /* ── Measure natural image size for dynamic panel dims ── */
  useEffect(() => {
    if (!images.length) return;
    const img = new window.Image();
    img.onload = () => setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = images[0];
  }, [folder?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Compute panel dimensions that fit the image within the viewport */
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const maxW = vw * 0.92;
  const maxH = vh * 0.88;
  let panelW = maxW;
  let panelH = maxH;
  if (imgSize) {
    const ratio = imgSize.w / imgSize.h;
    if (maxW / maxH > ratio) {
      panelH = maxH;
      panelW = maxH * ratio;
    } else {
      panelW = maxW;
      panelH = maxW / ratio;
    }
  }

  /* ── Sync main ↔ thumb carousels ── */
  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi?.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  /* Reset state when folder changes */
  useEffect(() => {
    setSelectedIndex(0);
    setImgSize(null);
  }, [folder?.id]);

  /* ── Swipe to dismiss (mobile) ── */
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number } }) => {
    if (info.offset.y > 120) onClose();
  };

  return (
    <AnimatePresence>
      {folder && (
        <>
          {/* Backdrop — blurred */}
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-md"
            style={{ background: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {isMobile ? (
            /* ═══ MOBILE: Full-screen bottom sheet ═══ */
            <motion.div
              ref={containerRef}
              className="fixed inset-0 z-50 flex flex-col"
              style={{ background: "#000" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={handleDragEnd}
            >
              {/* Drag handle */}
              <div
                className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-10 h-1 rounded-full bg-white/40" />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-3 z-[60] w-9 h-9 flex items-center justify-center rounded-full cursor-pointer"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Image section */}
              <div className="relative flex-1 min-h-0">
                <Carousel setApi={setMainApi} className="h-full w-full [&>div]:h-full">
                  <CarouselContent className="h-full [&>div]:h-full">
                    {images.map((src, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="relative h-full w-full">
                          <Image
                            src={src}
                            alt={`${folder.title} — ${index + 1}`}
                            fill
                            className="object-contain"
                            priority={index === 0}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                {/* Dot indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          index === selectedIndex ? "bg-white w-5" : "bg-white/40 w-1.5"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info section — below image */}
              <div className="px-5 pt-4 pb-8">
                <h2 className="text-lg font-semibold" style={{ color: "#fff", fontFamily: "var(--font-heading)" }}>
                  {folder.title}
                </h2>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {folder.description}
                </p>
                <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
                  {selectedIndex + 1} / {images.length}
                </p>
              </div>
            </motion.div>
          ) : (
            /* ═══ DESKTOP: Original centered panel ═══ */
            <motion.div
              ref={containerRef}
              className="fixed z-50 overflow-hidden rounded-2xl"
              style={{
                width: panelW,
                height: panelH,
                top: "50%",
                left: "50%",
                x: "-50%",
                background: "#000",
                boxShadow: "0 8px 60px rgba(0,0,0,0.35)",
              }}
              initial={{ y: "-30%", opacity: 0, scale: 0.95 }}
              animate={{ y: "-50%", opacity: 1, scale: 1 }}
              exit={{ y: "-30%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="relative h-full w-full">
                <div className="group relative h-full w-full overflow-hidden">
                  <Carousel setApi={setMainApi} className="h-full w-full [&>div]:h-full">
                    <CarouselContent className="h-full [&>div]:h-full">
                      {images.map((src, index) => (
                        <CarouselItem key={index} className="h-full">
                          <div className="relative h-full w-full">
                            <Image
                              src={src}
                              alt={`${folder.title} — ${index + 1}`}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/50 to-transparent px-6 pt-5 pb-10 pointer-events-none">
                    <h2 className="text-xl md:text-2xl font-semibold" style={{ color: "#fff", fontFamily: "var(--font-heading)" }}>
                      {folder.title}
                    </h2>
                    <p className="text-sm mt-1 max-w-lg" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                      {folder.description}
                    </p>
                  </div>

                  {images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300">
                      <div className="relative mx-auto w-full max-w-md">
                        <Carousel
                          setApi={setThumbApi}
                          opts={{ containScroll: "keepSnaps", dragFree: true }}
                          className="w-full"
                        >
                          <CarouselContent className="-ml-2 flex-row">
                            {images.map((src, index) => (
                              <CarouselItem
                                key={index}
                                className="basis-1/4 cursor-pointer pl-2 sm:basis-1/5"
                                onClick={() => onThumbClick(index)}
                              >
                                <div
                                  className={cn(
                                    "relative aspect-square overflow-hidden rounded-md border-2 transition-all duration-300",
                                    index === selectedIndex
                                      ? "border-white opacity-100 ring-2 ring-black/20"
                                      : "border-white/40 opacity-50 hover:opacity-80",
                                  )}
                                >
                                  <Image src={src} alt={`Thumb ${index + 1}`} fill className="object-cover" />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="absolute bottom-4 right-4 z-60 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: "#000",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                }}
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
