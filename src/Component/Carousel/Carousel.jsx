import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { useSliderStore } from "../zustand/useSliderStore";

function CarouselComponent() {
  const { allCarouselImg, setAllCarouselImg } = useSliderStore();
  console.log(
    allCarouselImg,
    setAllCarouselImg,
    "allllllllllll image slider will show"
  );

  const handleSliderImg = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    let sliderData = new FormData();
    sliderData.append("accesskey", "90336");
    sliderData.append("get-slider-images", "1");

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/slider-images.php`,
        sliderData,
        config
      )
      .then((res) => {
        let newArr = res.data.data;
        setAllCarouselImg(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleSliderImg();
  }, []);

  return (
    <>
      <div className="rounded-xl">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          className="rounded-xl"
        >
          {allCarouselImg.map((item) => {
            return (
              <div className="h-[300px] rounded-xl">
                <img alt="" src={item.image} className="rounded-xl h-[270px]" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default CarouselComponent;
