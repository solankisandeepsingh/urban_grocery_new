import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import axios from "axios";
import { useSliderStore } from "../zustand/useSliderStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiToken } from "../zustand/useApiToken";

function CarouselComponent() {
  const { allCarouselImg, setAllCarouselImg } = useSliderStore();
  const {setisLoading} = useLoaderState();
  const {apiToken} = useApiToken()


  const handleSliderImg = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
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
  // useEffect(() => {
  //   handleSliderImg();
  // }, []);

  useEffect(() => {
    if(apiToken)
    handleSliderImg();
  }, [apiToken]);


  return (
    <>
      <div className="rounded-xl">
        {apiToken && <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          className="rounded-xl"
        >
          {allCarouselImg && allCarouselImg?.map((item) => {
            return (
              <div className="h-auto rounded-xl">
                <img alt="" src={item?.image} className="rounded-xl h-auto" />
              </div>
            );
          })}
        </Carousel>}
        
      </div>
    </>
  );
}

export default CarouselComponent;
