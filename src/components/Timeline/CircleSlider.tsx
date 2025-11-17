import React, { useEffect, useRef, useCallback, useState } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/Timeline/CircleSlider.scss";
import "../../styles/Timeline/Mobile.scss";
import { gsap } from "gsap";
import { AnimatedYear } from "./AnimatedYear";

interface Slide {
  id: number;
  startYear: string;
  endYear: string;
  title: string;
}

interface CircleSliderProps {
  slides: Slide[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

const CircleSlider: React.FC<CircleSliderProps> = ({
  slides,
  activeSlide,
  onSlideChange,
}) => {
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstance = useRef<Swiper | null>(null);
  const dotsRef = useRef<HTMLButtonElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const numbersRef = useRef<HTMLSpanElement[]>([]);

  const handleSlideChange = useCallback(
    (swiper: Swiper) => {
      onSlideChange(swiper.realIndex);
    },
    [onSlideChange]
  );

  // Инициализация Swiper
  useEffect(() => {
    if (swiperRef.current && !swiperInstance.current) {
      swiperInstance.current = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 300,
        navigation: {
          nextEl: ".circle-swiper-button-next",
          prevEl: ".circle-swiper-button-prev",
        },
        on: {
          slideChange: handleSlideChange,
        },
      });
    }

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy();
        swiperInstance.current = null;
      }
    };
  }, [handleSlideChange]);

  useEffect(() => {
    if (
      swiperInstance.current &&
      swiperInstance.current.realIndex !== activeSlide
    ) {
      swiperInstance.current.slideToLoop(activeSlide);
    }
  }, [activeSlide]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  // Анимация вращения с компенсацией для цифр
  useEffect(() => {
    if (isMobile) return;

    const step = 360 / slides.length;
    const angle = -activeSlide * step;

    gsap.to(wrapperRef.current, {
      rotate: angle,
      duration: 0.8,
      ease: "power2.inOut",
    });

    dotsRef.current.forEach((dot, index) => {
      if (dot) {
        const dotAngle = (index - activeSlide) * step;

        dot.style.setProperty("--dot-rotation", `${dotAngle}deg`);

        const targetX = Math.cos((index * step * Math.PI) / 180) * 180;
        const targetY = Math.sin((index * step * Math.PI) / 180) * 180;

        gsap.to(dot, {
          x: targetX,
          y: targetY,
          scale: index === activeSlide ? 1 : 0.2,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeSlide, slides.length, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    if (swiperInstance.current) {
      swiperInstance.current.slideToLoop(index);
    }
  }, []);

  const handlePrevClick = useCallback(() => {
    if (swiperInstance.current) {
      swiperInstance.current.slidePrev();
    }
  }, []);

  const handleNextClick = useCallback(() => {
    if (swiperInstance.current) {
      swiperInstance.current.slideNext();
    }
  }, []);

  const handleSimplePrevClick = useCallback(() => {
    const newIndex = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
    onSlideChange(newIndex);
  }, [activeSlide, slides.length, onSlideChange]);

  const handleSimpleNextClick = useCallback(() => {
    const newIndex = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
    onSlideChange(newIndex);
  }, [activeSlide, slides.length, onSlideChange]);

  const handleSimpleDotClick = useCallback(
    (index: number) => {
      onSlideChange(index);
    },
    [onSlideChange]
  );

  return (
    <div className="circle-slider">
      <div className="center-dates">
        <AnimatedYear
          year={slides[activeSlide]?.startYear || ""}
          color="#3877EE"
          className="start-year"
        />
        <AnimatedYear
          year={slides[activeSlide]?.endYear || ""}
          color="#EF5DA8"
          className="end-year"
        />
      </div>

      <div className="circle-container">
        {isMobile ? (
          <div className="dots-row">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`dot-mobile ${
                  index === activeSlide ? "active" : ""
                }`}
                onClick={() => onSlideChange(index)}
              ></button>
            ))}
          </div>
        ) : (
          <>
            <div className="circle-border"></div>
            <div className="circle-wrapper" ref={wrapperRef}>
              {slides.map((slide, index: number) => {
                const step = 360 / slides.length;
                return (
                  <button
                    ref={(el) => (dotsRef.current[index] = el!)}
                    key={slide.id}
                    className={`dot ${index === activeSlide ? "active" : ""}`}
                    style={{
                      transform: `rotate(${
                        index * step
                      }deg) translate(180px) scale(${
                        index === activeSlide ? 1 : 0.2
                      })`,
                    }}
                    onMouseEnter={(e) => {
                      if (index !== activeSlide) {
                        e.currentTarget.style.transform = `rotate(${
                          index * step
                        }deg) translate(180px) scale(1)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (index !== activeSlide) {
                        e.currentTarget.style.transform = `rotate(${
                          index * step
                        }deg) translate(180px) scale(0.20)`;
                      }
                    }}
                    onClick={() => handleSimpleDotClick(index)}
                  >
                    <span className="dot-inner">
                      <span
                        className="dot-number"
                        ref={(el) => (numbersRef.current[index] = el!)}
                      >
                        {index + 1}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="circle-navigation">
        <div className="slide-counter">
          <span className="current-slide">
            {(activeSlide + 1).toString().padStart(2, "0")}
          </span>
          <span className="total-slides">
            / {slides.length.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="navigation-buttons">
          <button
            className="circle-nav-button prev-button"
            onClick={handleSimplePrevClick}
          >
            <svg
              className="swiper-navigation-icon"
              width="5"
              height="10"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotate(180deg)" }}
            >
              <path
                d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button
            className="circle-nav-button next-button"
            onClick={handleSimpleNextClick}
          >
            <svg
              className="swiper-navigation-icon"
              width="5"
              height="10"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={swiperRef}
        className="swiper hidden-swiper"
        style={{ display: "none" }}
      >
        <div className="swiper-wrapper">
          {slides.map((slide, index: number) => (
            <div key={slide.id} className="swiper-slide"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircleSlider;
