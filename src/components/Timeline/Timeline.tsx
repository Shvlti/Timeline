import React, { useMemo, useState } from "react";
import { CircleSlider } from "./CircleSlider/CircleSlider";
import EventsSlider from "./EventSlider/EventsSlider";
import { timelineData } from "../../data/data";
import "../../styles/Timeline/Timeline.scss";

const Timeline = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slidesData = useMemo(
    () =>
      timelineData.periods.map((period) => ({
        id: period.id,
        startYear: period.yearsOne,
        endYear: period.yearsTwo,
        title: period.title,
      })),
    [timelineData]
  );

  const eventsData = useMemo(
    () =>
      timelineData.periods.map((period) =>
        period.events.map((event) => ({
          year: event.year,
          text: event.description,
        }))
      ),
    [timelineData]
  );

  return (
    <div className="container">
      <div className="timeline">
        <div className="cross-lines">
          <div className="cross-line horizontal"></div>
          <div className="cross-line vertical"></div>
        </div>
        <div className="timeline-title">
          <h1 className="timeline-title_h1">
            Исторические <span>даты</span>
          </h1>
        </div>

        <div className="timeline-content">
          <CircleSlider
            slides={slidesData}
            activeSlide={activeSlide}
            onSlideChange={setActiveSlide}
          />

          <EventsSlider events={eventsData[activeSlide] || []} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
