import { useEffect, useRef } from "react";
import { useSwiper } from "./useSwiper";
import { getEventsSliderConfig } from "../utils/swiperConfig";
import { runSliderAppearanceAnimation } from "../animations/AnimatedEvent";

export const useEventsSlider = (events: any[]) => {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const animationTimeline = useRef<gsap.core.Timeline | null>(null);

  const {
    swiperRef,
    swiperInstance,
    updateSwiper,
  } = useSwiper(getEventsSliderConfig(), [events]);

  const handleAppearanceAnimation = () => {
    if (!sliderContainerRef.current || !swiperInstance.current) return;

    if (animationTimeline.current) {
      animationTimeline.current.kill();
    }

    animationTimeline.current = runSliderAppearanceAnimation(
      sliderContainerRef.current,
      () => {
        isInitialized.current = true;
      }
    );
  };

  useEffect(() => {
    if (swiperInstance.current && events.length > 0) {
      setTimeout(() => {
        handleAppearanceAnimation();
      }, 50);
    }
  }, [swiperInstance.current, events]);

  useEffect(() => {
    if (swiperInstance.current && isInitialized.current) {
      setTimeout(() => {
        updateSwiper();
      }, 100);
    }
  }, [events, swiperInstance.current, updateSwiper]);

  return {
    swiperRef,
    sliderContainerRef,
    isInitialized: isInitialized.current,
  };
};