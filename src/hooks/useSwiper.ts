import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { SwiperConfig } from "../utils/swiperConfig";

export const useSwiper = (config: SwiperConfig, dependencies: any[] = []) => {
  const swiperInstance = useRef<Swiper | null>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let swiper: Swiper | null = null;

    if (swiperRef.current) {
      
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }

      
      swiper = new Swiper(swiperRef.current, config);
      
      
      if (config.init === false) {
        swiper.init();
      }
      
      swiperInstance.current = swiper;
    }

    return () => {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
        swiperInstance.current = null;
      }
    };
  }, dependencies);

  const updateSwiper = () => {
    if (swiperInstance.current) {
      swiperInstance.current.update();
    }
  };

  const slideTo = (index: number) => {
    if (swiperInstance.current) {
      swiperInstance.current.slideTo(index);
    }
  };

  return {
    swiperRef,
    swiperInstance,
    updateSwiper,
    slideTo,
  };
};