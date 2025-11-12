import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/Timeline/EventsSlider.scss";

interface Event {
  id?: number; //
  year: string;
  text: string;
  description?: string; //
}

interface EventsSliderProps {
  events: Event[];
}

const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    let swiper: Swiper | null = null;
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: false,
      });
    }
    return () => {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
    };
  }, [events]);

  return (
    <div className="events-slider">
      <div ref={swiperRef} className="swiper">
        <div className="swiper-wrapper">
          {events.map((event, index) => (
            <div key={index} className="swiper-slide">
              <div className="event-card">
                <h3 className="event-year">{event.year}</h3>
                <p className="event-text">{event.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  );
};

export default EventsSlider;
