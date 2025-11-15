import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/Timeline/EventsSlider.scss";
import { gsap } from "gsap";

interface Event {
  id?: number;
  year: string;
  text: string;
  description?: string;
}

interface EventsSliderProps {
  events: Event[];
}

const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);
  const isInitialized = useRef(false);
  const animationTimeline = useRef<gsap.core.Timeline | null>(null);

  // Единая функция анимации
  const runAppearanceAnimation = () => {
    if (!sliderContainerRef.current || !swiperInstance.current) return;

    // Останавливаем предыдущую анимацию если она есть
    if (animationTimeline.current) {
      animationTimeline.current.kill();
    }

    const slides = sliderContainerRef.current.querySelectorAll(".swiper-slide");
    const navButtons = sliderContainerRef.current.querySelectorAll(
      ".swiper-button-prev, .swiper-button-next"
    );

    // Создаем новую timeline для управления всеми анимациями
    animationTimeline.current = gsap.timeline();

    // Анимация контейнера
    animationTimeline.current.fromTo(
      sliderContainerRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      0 // начинаем сразу
    );

    // Анимация слайдов
    animationTimeline.current.fromTo(
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
      0.2 // начинаем через 0.2 секунды после начала
    );

    // Анимация кнопок навигации
    animationTimeline.current.fromTo(
      navButtons,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      },
      0.4 // начинаем через 0.4 секунды
    );
  };

  useEffect(() => {
    let swiper: Swiper | null = null;

    if (swiperRef.current && events.length > 0) {
      // Уничтожаем предыдущий экземпляр
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }

      swiper = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination],
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: false,
        speed: 400,
        init: false, // отключаем авто-инициализацию
      });

      // Инициализируем вручную
      swiper.init();
      swiperInstance.current = swiper;

      // Запускаем анимацию только после полной инициализации
      setTimeout(() => {
        runAppearanceAnimation();
        isInitialized.current = true;
      }, 50);
    }

    return () => {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
      // Останавливаем анимации при размонтировании
      if (animationTimeline.current) {
        animationTimeline.current.kill();
      }
    };
  }, [events]); // Только при изменении events

  // Эффект для обновления Swiper при изменении слайдов
  useEffect(() => {
    if (swiperInstance.current && isInitialized.current) {
      // Плавное обновление без пересоздания
      setTimeout(() => {
        swiperInstance.current?.update();
      }, 100);
    }
  }, [events]);

  return (
    <div className="events-slider" ref={sliderContainerRef}>
      <div ref={swiperRef} className="swiper">
        <div className="swiper-wrapper">
          {events.map((event, index) => (
            <div
              key={`${event.year}-${index}-${event.id || ""}`}
              className="swiper-slide"
            >
              <div className="event-card">
                <h3 className="event-year">{event.year}</h3>
                <p className="event-text">{event.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default EventsSlider;
