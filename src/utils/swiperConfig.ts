import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export interface SwiperConfig {
  slidesPerView: number | 'auto';
  spaceBetween: number;
  navigation?: {
    nextEl: string;
    prevEl: string;
  };
  pagination?: any;
  speed?: number;
  init?: boolean;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number | 'auto';
      spaceBetween: number;
    };
  };
}

export const getEventsSliderConfig = (): SwiperConfig => ({
  modules: [Navigation, Pagination],
  slidesPerView: 1.5,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: false,
  speed: 400,
  init: false,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});