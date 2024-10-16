import React, { useEffect, useState } from "react";
import SliderSection from "./SliderSection";
import VideoPopover from "./VideoPopover";
import api from "@/utility/api";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderItems, setSliderItems] = useState([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [isVideoPopoverOpen, setIsVideoPopoverOpen] = useState(false);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + sliderItems.length) % sliderItems.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderItems.length);
  };

  const handleButtonClick = (button) => {
    if (button.isVideo) {
      setCurrentVideoUrl(button.link);
      setIsVideoPopoverOpen(true);
    } else {
      window.open(button.link, "_blank");
    }
  };

  useEffect(() => {
    if (sliderItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderItems.length);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [currentSlide]);

  useEffect(() => {
    async function fetchSliderDetails() {
      const response = await api.getHomePageDetails();
      if (response.length > 0) {
        const filteredSliderItems = response
          .filter((item) => item.SHOW_IN_SLIDER)
          .map((item) => ({
            backgroundImage: item.BACKGROUND_IMAGE_PATH,
            headerText: item.HEADER_TEXT,
            tagline: item.TAGLINE_TEXT,
            primaryButton: {
              text: item.PRIMARY_BUTTON_TEXT,
              link: item.PRIMARY_BUTTON_LINK,
              isVideo: item.PRIMARY_BUTTON_TYPE === "video",
            },
            secondaryButton: {
              text: item.SECONDARY_BUTTON_TEXT,
              link: item.SECONDARY_BUTTON_LINK,
              isVideo: item.SECONDARY_BUTTON_TYPE === "video",
            },
            opacity: item.OPACITY / 100,
            alignment: item.HEADER_TEXT_ALIGNMENT,
          }));

        setSliderItems(filteredSliderItems);
      } else {
        setSliderItems([]);
      }
    }
    fetchSliderDetails();
  }, []);

  return (
    <>
      <SliderSection
        sliderItems={sliderItems}
        currentSlide={currentSlide}
        goToSlide={goToSlide}
        goToPrevSlide={goToPrevSlide}
        goToNextSlide={goToNextSlide}
        handleButtonClick={handleButtonClick}
      />
      <VideoPopover
        isOpen={isVideoPopoverOpen}
        onClose={() => setIsVideoPopoverOpen(false)}
        videoUrl={currentVideoUrl}
      />
    </>
  );
}
