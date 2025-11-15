import { useEffect, useRef } from "react";
import { AnimatedDigit } from "./AnimatedDigit";
import { gsap } from "gsap";

export const AnimatedYear: React.FC<{
  year: string;
  color: string;
  className: string;
}> = ({ year, color, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevYearRef = useRef<string>(year);

  useEffect(() => {
    if (containerRef.current && prevYearRef.current !== year) {
      // Легкая анимация для всего контейнера
      gsap.fromTo(
        containerRef.current,
        {
          scale: 0.98,
        },
        {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );

      prevYearRef.current = year;
    }
  }, [year]);

  return (
    <div ref={containerRef} className={className} style={{ display: "flex" }}>
      {year.split("").map((digit, index) => (
        <AnimatedDigit
          key={index}
          digit={digit}
          color={color}
          position={index}
        />
      ))}
    </div>
  );
};
