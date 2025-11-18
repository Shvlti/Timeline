import { useEffect, useRef, useState, useCallback } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { animateCircleSlider } from "../animations/AnimatedCircle";
import { Slide } from "../types/timeline";

export const useCircleSlider = (
  slides: Slide[],
  activeSlide: number,
  onSlideChange: (index: number) => void
) => {
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLButtonElement[]>([]);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 500
  );

  
  useEffect(() => {
    if (!swiperRef.current || swiperInstance.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Navigation],
      slidesPerView: 1,
      loop: true,
      speed: 300,
      
      on: {
        slideChange: (swiper) => onSlideChange(swiper.realIndex),
      },
    });

    return () => swiperInstance.current?.destroy();
  }, [onSlideChange]);

  // --- sync swiper with activeSlide ---
  useEffect(() => {
    if (!swiperInstance.current) return;

    if (swiperInstance.current.realIndex !== activeSlide) {
      swiperInstance.current.slideToLoop(activeSlide);
    }
  }, [activeSlide]);

  // --- resize handler ---
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // --- GSAP rotation ---
  useEffect(() => {
    animateCircleSlider(wrapperRef, dotsRef, slides, activeSlide, isMobile);
  }, [activeSlide, slides.length, isMobile]);

  return {
    swiperRef,
    wrapperRef,
    dotsRef,
    isMobile,
  };
};