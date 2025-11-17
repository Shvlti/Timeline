import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../styles/Timeline/EventsSlider.scss";
import { Event } from "../../../types/timeline";
import { useEventsSlider } from "../../../hooks/useEventsSlider";

interface EventsSliderProps {
  events: Event[];
}

const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  const { swiperRef, sliderContainerRef } = useEventsSlider(events);

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
