"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/image-data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    src: IMAGES.home.Banner1,
    alt: "Banner 1",
  },
  // {
  //   id: 2,
  //   src: IMAGES.home.Banner2,
  //   alt: "Banner 2",
  // },
  {
    id: 3,
    src: IMAGES.home.Banner3,
    alt: "Banner 3",
  },
  {
    id: 4,
    src: IMAGES.home.Banner4,
    alt: "Banner 4",
  },
];

export function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSlides = banners.length;

  // Create a circular array of slides for smooth infinite scrolling
  const slidesArray = [...banners];

  const nextSlide = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, totalSlides]);

  const previousSlide = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, totalSlides]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    // Reset the auto-play timer when manually changing slides
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 100);
    }
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;

    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      previousSlide();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying && !isAnimating) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000); // 4 seconds interval
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide, isAnimating]);

  // Pause auto-play when user interacts with controls
  const handleControlInteraction = (callback: () => void) => {
    setIsAutoPlaying(false);
    callback();
    // Resume auto-play after a short delay
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main slider container */}
      <div
        className="relative h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div className="flex w-full h-full relative">
          {slidesArray.map((banner, index) => (
            <div
              key={banner.id}
              className={`min-w-full transition-all duration-500 ease-out ${
                index === currentSlide ? "block" : "hidden"
              }`}
            >
              <div className="relative aspect-[16/9] w-full sm:aspect-[16/9]">
                <Image
                  src={banner.src || "/placeholder.svg"}
                  alt={banner.alt}
                  fill
                  priority={index === currentSlide}
                  className="object-cover"
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent" />
              </div>
            </div>
          ))}

          {/* Content Overlay */}

          <div className="absolute inset-0">
            <div className="flex flex-col justify-center items-center gap-4 md:gap-8 lg:gap-10 w-full h-full text-white text-center">
              <div className="flex flex-col gap-1 md:gap-4">
                <h6 className="md:text-2xl lg:text-3xl font-medium">
                  Today’s Exclusive Flash Deals
                </h6>
                <h2 className="text-xl md:text-4xl lg:text-6xl font-semibold">
                  AT THE BEST MARKET RATES!
                </h2>
              </div>
              <Link href={`/products`}>
                <Button className="md:px-8 md:py-5 rounded-xs">
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows with Preview */}
        <button
          onClick={() => handleControlInteraction(previousSlide)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-all hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:p-3 group overflow-hidden cursor-pointer hidden md:block"
          aria-label="Previous slide"
          disabled={isAnimating}
        >
          {/* Preview of previous slide */}
          <div className="absolute inset-0 opacity-40 transition-opacity">
            <Image
              src={
                slidesArray[
                  currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
                ].src
              }
              alt="Previous slide preview"
              fill
              className="object-cover"
            />
          </div>
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 drop-shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
        </button>

        <button
          onClick={() => handleControlInteraction(nextSlide)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-all hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:p-3 group overflow-hidden cursor-pointer hidden md:block"
          aria-label="Next slide"
          disabled={isAnimating}
        >
          {/* Preview of next slide */}
          <div className="absolute inset-0 opacity-40 transition-opacity">
            <Image
              src={
                slidesArray[
                  currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
                ].src
              }
              alt="Next slide preview"
              fill
              className="object-cover"
            />
          </div>
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 drop-shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {slidesArray.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all sm:h-3 sm:w-3 cursor-pointer",
              currentSlide === index
                ? "bg-primary scale-110"
                : "bg-white/70 hover:bg-white"
            )}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute -bottom-1 left-1/2 z-10 flex -translate-x-1/2 transform translate-y-full transition-transform duration-300 ease-in-out hover:translate-y-0 bg-white/90 p-2 rounded-t-lg shadow-md">
        <div className="flex space-x-2">
          {slidesArray.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative h-12 w-20 overflow-hidden rounded border-2 transition-all",
                currentSlide === index
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              disabled={isAnimating}
            >
              <Image
                src={banner.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
