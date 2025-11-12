import React, { useEffect, useRef, useCallback } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/Timeline/CircleSlider.scss";

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
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

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
        <span className="start-year" style={{ color: "#3877EE" }}>
          {slides[activeSlide]?.startYear}
        </span>
        <span className="end-year" style={{ color: "#EF5DA8" }}>
          {slides[activeSlide]?.endYear}
        </span>
      </div>

      <div className="circle-container">
        <div className="circle-border"></div>
        {slides.map((slide, index: number) => {
          const angle = (index * 360) / slides.length;
          const radian = (angle * Math.PI) / 180;
          const radius = 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <button
              key={slide.id}
              className={`dot ${index === activeSlide ? "active" : ""}`}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleSimpleDotClick(index)}
            >
              <span className="dot-number">{index + 1}</span>
            </button>
          );
        })}
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
            {`<`}
          </button>
          <button
            className="circle-nav-button next-button"
            onClick={handleSimpleNextClick}
          >
            {`>`}
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
