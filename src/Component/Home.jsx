import React, { useEffect, useState } from "react";
import { Category } from "./Category/Category";
import CarouselComponent from "./Carousel/Carousel";
import Search from "./Header/Search/Search";
import { ProductCarousel } from "./Products/Product-Carousel/ProductCarousel";
import { API_TOKEN } from "./Token/Token";
import { useImgStore } from "./zustand/useImgStore";
import axios from "axios";
import { FoodDelivery } from "../Food Delivery Image/FoodDelivery";
import { LocallySourced } from "../Food Delivery Image/LocallySourced";
import { useLoaderState } from "./zustand/useLoaderState";

function Home({
  data,
  SubCategory,
  productDetails,
  setData,
  addItem,
  setAddItem,
  isOpen,
  user_id,
}) {
  const { allImg, setAllImg } = useImgStore();
  console.log(allImg, setAllImg, "IMG STORE FROM ZUSTAND");
  const { setisLoading } = useLoaderState();

  const handleHomeImg = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    let imgData = new FormData();
    imgData.append("accesskey", "90336");
    imgData.append("get-offer-images", "1");
    setisLoading(true);
    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/offer-images.php`,
        imgData,
        config
      )
      .then((res) => {
        let imgObj = {};
        res?.data?.data?.forEach((item) => {
          imgObj[item.id] = item.image;
        });
        setAllImg(imgObj);
        setisLoading(false);
        // setHomeImg(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  useEffect(() => {
    handleHomeImg();
  }, []);

  return (
    <div className="relative mt-0.5">
      <>
        <div className="md:invisible xs:visible">
          <Search
            setData={setData}
            data={data}
            addItem={addItem}
            setAddItem={setAddItem}
            user_id={user_id}
          />
        </div>

        <div className="container md:mt-10 w-full items-center md:ml-20 absolute">
          <div
            className={
              isOpen ? "opacity-75" : "opacity-100" + "  xs:px-3 sm:px-5 "
            }
          >
            <div className="mb-4">
              <img
                src={allImg["27"]}
                alt={"ALT"}
                className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
              />
            </div>

            <div className="flex md:flex-row justify-between xs:flex-col xs:mt-3">
              <div className="md:w-[453px] md:p-2 md:mt-4 xs:py-2">
                <img
                  src={allImg["37"]}
                  alt=""
                  className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                />
              </div>
              <div className="md:w-[453px] md:p-2 md:mt-4 xs:pt-3 sm:h-[400px]">
                <CarouselComponent />
              </div>
              <div className="md:w-[453px]  md:p-2 xs:-mt-20 md:mt-4 xs:py-2">
                <div className="md:w-[453px] md:p-2 md:mt-4 xs:py-2">
                  <img
                    src={allImg["30"]}
                    alt=""
                    className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                  />
                </div>
              </div>
            </div>
            
            <FoodDelivery />

            <Category
              SubCategory={SubCategory}
              productDetails={productDetails}
              user_id={user_id}
            />
           
          
            <ProductCarousel
              addItem={addItem}
              setAddItem={setAddItem}
              user_id={user_id}
            />

            <LocallySourced />
          </div>
        </div>
      </>
    </div>
  );
}

export default Home;
