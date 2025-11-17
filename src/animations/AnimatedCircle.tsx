import gsap from "gsap";
export const animateCircleSlider = (
  wrapperRef: React.RefObject<HTMLDivElement>,
  dotsRef: React.RefObject<(HTMLButtonElement | null)[]>,
  slides: any[],
  activeSlide: number,
  isMobile: boolean
) => {
  if (isMobile) return;

  const step = 360 / slides.length;
  const angle = -activeSlide * step;

  gsap.to(wrapperRef.current, {
    rotate: angle,
    duration: 0.3,
    ease: "power2.inOut",
  });

  dotsRef.current?.forEach((dot, index) => {
    if (!dot) return;

    const dotAngle = (index - activeSlide) * step;
    dot.style.setProperty("--dot-rotation", `${dotAngle}deg`);

    const targetX = Math.cos((index * step * Math.PI) / 180) * 180;
    const targetY = Math.sin((index * step * Math.PI) / 180) * 180;

    gsap.to(dot, {
      x: targetX,
      y: targetY,
      scale: index === activeSlide ? 1 : 0.2,
      duration: 0.3,
      ease: "power2.inOut",
    });
  });
};
