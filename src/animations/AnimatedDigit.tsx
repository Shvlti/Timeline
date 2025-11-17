import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Компонент для анимированной цифры
export const AnimatedDigit: React.FC<{
  digit: string;

  position: number;
}> = ({ digit, position }) => {
  const digitRef = useRef<HTMLSpanElement>(null);
  const prevDigitRef = useRef<string>(digit);

  useEffect(() => {
    if (digitRef.current && prevDigitRef.current !== digit) {
      const element = digitRef.current;

      // Анимация перелистывания для отдельной цифры
      gsap
        .timeline()
        .set(element, { y: -20, opacity: 0 })
        .to(element, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "bounce.out",
          delay: position * 0.1,
        });

      prevDigitRef.current = digit;
    }
  }, [digit, position]);

  return (
    <span
      ref={digitRef}
      style={{
        display: "inline-block",
        minWidth: "0.6em", // фиксированная ширина для цифр
        textAlign: "center",
      }}
    >
      {digit}
    </span>
  );
};
