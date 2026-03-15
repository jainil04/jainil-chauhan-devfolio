"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type PhotoFolder } from "@/data/photoFolders";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";

/** Build the list of display images from folder data. */
function getImages(folder: PhotoFolder): string[] {
  if (folder.beforeAfterPairs?.length) {
    return folder.beforeAfterPairs.map((p) => p.after);
  }
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
  const [comparisonMode, setComparisonMode] = useState(false);

  const images = folder ? getImages(folder) : [];
  const pairs = folder?.beforeAfterPairs;

  /* ── Sync main ↔ thumb carousels ── */
  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    setComparisonMode(false); // reset on slide change
    thumbApi.scrollTo(index);
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
    setComparisonMode(false);
  }, [folder?.id]);

  return (
    <AnimatePresence>
      {folder && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.4)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden rounded-t-2xl"
            style={{
              height: "93vh",
              background: "var(--background)",
              boxShadow: "0 -4px 40px rgba(0,0,0,0.12)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* ── Gallery — full-bleed ── */}
            <div className="relative h-full w-full" style={{ background: "#000" }}>
              {/* Main view — carousel or comparison */}
              {comparisonMode && pairs?.[selectedIndex] ? (
                <div
                  className="relative h-full w-full cursor-pointer"
                  onClick={() => setComparisonMode(false)}
                >
                  <ImageComparison className="h-full w-full">
                    <ImageComparisonImage
                      src={pairs[selectedIndex].after}
                      alt="After edit"
                      position="left"
                    />
                    <ImageComparisonImage
                      src={pairs[selectedIndex].before}
                      alt="Before edit"
                      position="right"
                    />
                    <ImageComparisonSlider className="bg-white/80 w-0.5 backdrop-blur-sm">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8L22 12L18 16" />
                          <path d="M6 8L2 12L6 16" />
                        </svg>
                      </div>
                    </ImageComparisonSlider>
                  </ImageComparison>

                  {/* Labels */}
                  <div className="absolute top-4 inset-x-0 flex justify-between px-4 text-xs pointer-events-none" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-mono)" }}>
                    <span className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">Before</span>
                    <span className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">After</span>
                  </div>
                </div>
              ) : (
                <div className="group relative h-full w-full overflow-hidden">
                  {/* Main Carousel */}
                  <Carousel setApi={setMainApi} className="h-full w-full [&>div]:h-full">
                    <CarouselContent className="h-full [&>div]:h-full">
                      {images.map((src, index) => (
                        <CarouselItem key={index} className="h-full">
                          <div
                            className="relative w-full cursor-pointer"
                            style={{ height: "93vh" }}
                            onClick={() => {
                              if (pairs?.[index]) setComparisonMode(true);
                            }}
                          >
                            <Image
                              src={src}
                              alt={`${folder.title} — ${index + 1}`}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />

                            {/* Compare hint badge */}
                            {pairs?.[index] && (
                              <div
                                className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs backdrop-blur-md transition-opacity group-hover:opacity-100 opacity-70"
                                style={{ background: "rgba(0,0,0,0.5)", color: "#fff", fontFamily: "var(--font-mono)" }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 8L22 12L18 16" />
                                  <path d="M6 8L2 12L6 16" />
                                </svg>
                                Compare
                              </div>
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  {/* Overlay Title */}
                  <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/50 to-transparent px-6 pt-5 pb-10 pointer-events-none">
                    <h2
                      className="text-xl md:text-2xl font-semibold"
                      style={{ color: "#fff", fontFamily: "var(--font-heading)" }}
                    >
                      {folder.title}
                    </h2>
                    <p
                      className="text-sm mt-1 max-w-lg"
                      style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}
                    >
                      {folder.description}
                    </p>
                  </div>

                  {/* Overlay Thumbnails */}
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
                                  <Image
                                    src={src}
                                    alt={`Thumb ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Close button — bottom right */}
            <button
              onClick={onClose}
              className="fixed bottom-6 right-6 z-60 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              }}
              aria-label="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
