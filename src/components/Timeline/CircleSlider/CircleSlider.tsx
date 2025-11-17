import { AnimatedYear } from "../../../animations/AnimatedYear";
import { Slide } from "../../../types/timeline";
import "../../../styles/Timeline/CircleSlider.scss";
import { useCircleSlider } from "../../../hooks/useCircleSlider";
import { useEffect } from "react";
import gsap from "gsap";
import { animateCircleSlider } from "../../../animations/AnimatedCircle";

interface Props {
  slides: Slide[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

export const CircleSlider = ({ slides, activeSlide, onSlideChange }: Props) => {
  const { isMobile, swiperRef, wrapperRef, dotsRef } = useCircleSlider(
    slides,
    activeSlide,
    onSlideChange
  );

  const step: number = 360 / slides.length;

  const HandlePrev = () => {
    const newIndex = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
    onSlideChange(newIndex);
  };
  const HandleNext = () => {
    const newIndex = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
    onSlideChange(newIndex);
  };

  useEffect(() => {
    animateCircleSlider(wrapperRef, dotsRef, slides, activeSlide, isMobile);
  }, [activeSlide, slides.length, isMobile]);

  return (
    <div className="circle-slider">
      <div className="center-dates">
        <AnimatedYear
          className="YearOne"
          year={slides[activeSlide].startYear}
        />
        <AnimatedYear className="YearTwo" year={slides[activeSlide].endYear} />
      </div>

      <div className="circle-container">
        {!isMobile && <div className="circle-border" />}

        {isMobile ? (
          <div className="dots-row">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot-mobile ${i === activeSlide ? "active" : ""}`}
                onClick={() => onSlideChange(i)}
              />
            ))}
          </div>
        ) : (
          <div className="circle-wrapper" ref={wrapperRef}>
            {slides.map((_, index) => {
              const rotation = index * step;
              return (
                <button
                  key={index}
                  ref={(el) => (dotsRef.current[index] = el!)}
                  className={`dot ${index === activeSlide ? "active" : ""}`}
                  style={
                    {
                      "--dot-rotation": `${rotation}deg`,
                      transform: `rotate(${rotation}deg) translate(180px) scale(${
                        index === activeSlide ? 1 : 0.2
                      })`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    if (index !== activeSlide) {
                      e.currentTarget.style.transform = `rotate(${rotation}deg) translate(180px) scale(1)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== activeSlide) {
                      e.currentTarget.style.transform = `rotate(${rotation}deg) translate(180px) scale(0.2)`;
                    }
                  }}
                  onClick={() => onSlideChange(index)}
                >
                  <span className="dot-inner">
                    <span className="dot-number">{index + 1}</span>
                  </span>
                </button>
              );
            })}
          </div>
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
            onClick={HandlePrev}
          >
            <svg
              className="swiper-navigation-icon"
              width="5"
              height="10"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: "rotate(180deg)",
              }}
            >
              <path
                d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <button
            className="circle-nav-button next-button"
            onClick={HandleNext}
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

      <div ref={swiperRef} className="hidden-swiper">
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <div key={slide.id} className="swiper-slide" />
          ))}
        </div>
      </div>
    </div>
  );
};
