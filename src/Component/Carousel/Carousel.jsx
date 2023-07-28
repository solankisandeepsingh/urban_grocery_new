import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { API_TOKEN } from "../Token/Token";
import axios from "axios";
import { useSliderStore } from "../zustand/useSliderStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";

function CarouselComponent() {
  const { allCarouselImg, setAllCarouselImg } = useSliderStore();
  const {setisLoading} = useLoaderState();
  const { jwt, setJwt } = useApiStore();
  console.log(
    allCarouselImg,
    setAllCarouselImg,
    "allllllllllll image slider will show"
  );

  const handleSliderImg = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    let sliderData = new FormData();
    sliderData.append("accesskey", "90336");
    sliderData.append("get-slider-images", "1");
    setisLoading(true);

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/slider-images.php`,
        sliderData,
        config
      )
      .then((res) => {
        let newArr = res?.data?.data;
        setAllCarouselImg(newArr);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
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
          {allCarouselImg?.map((item) => {
            return (
              <div className="h-auto rounded-xl">
                <img alt="" src={item.image} className="rounded-xl h-auto" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default CarouselComponent;
