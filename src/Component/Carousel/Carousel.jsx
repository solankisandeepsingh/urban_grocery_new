import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useImgStore } from "../zustand/useImgStore";

function CarouselComponent() {
  const {allImg} = useImgStore();

  return (
    <>
      <div className="rounded-xl">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          className="rounded-xl"
        >
          <div className="h-[300px] rounded-xl">
            <img
              alt=""
              src="https://cdn.metro-online.pk/dashboard/images/754617227.jpg"
              className="rounded-xl"
            />
          </div>
          <div className="h-[300px] rounded-xl">
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3A0GtgiOfH5GMKk9vD2M5adrPb3zRHbC1noVz0HHyqLQox2QJ3XTOA7qdgzzHGNyuZv0&usqp=CAU"
              className="rounded-xl"
            />
          </div>
          <div className="h-[300px] rounded-xl">
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLAPX9jmc2P2yeOifRMTOZ3ll1Lpvd9LH7J66t6AUaaf49mvk-0r3TjXDvhaSGPio9BL0&usqp=CAU"
              className="rounded-xl"
            />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default CarouselComponent;
