import { gsap } from "gsap";

export const runSliderAppearanceAnimation = (
  container: HTMLElement,
  onComplete?: () => void
) => {
  const slides = container.querySelectorAll(".swiper-slide");

  const timeline = gsap.timeline({
    onComplete,
  });

  timeline.fromTo(
    container,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    0
  );

  timeline.fromTo(
    slides,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    },
    0.2
  );

  return timeline;
};

export const createSlideHoverAnimation = (slide: HTMLElement) => {
  return gsap.to(slide, {
    y: -5,
    scale: 1.02,
    duration: 0.3,
    ease: "power2.out",
  });
};

export const createSlideLeaveAnimation = (slide: HTMLElement) => {
  return gsap.to(slide, {
    y: 0,
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};
