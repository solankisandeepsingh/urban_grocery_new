import React, { useEffect, useState } from "react";
import { Category } from "./Category/Category";
import CarouselComponent from "./Carousel/Carousel";
import Search from "./Header/Search/Search";
import { ProductCarousel } from "./Products/Product-Carousel/ProductCarousel";
import { API_TOKEN } from "./Token/Token";
import axios from "axios";

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
  const [HomeImg, setHomeImg] = useState([]);

  console.log(HomeImg, "<<<<<<<<<<<<<<<<<<<<");

  const handleHomeImg = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
    let imgData = new FormData();
    imgData.append("accesskey", "90336");
    imgData.append("get-offer-images", "1");
    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/offer-images.php`,
        imgData,
        config
      )
      .then((res) => {
        console.log(res.data.data);
        setHomeImg(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleHomeImg();
  }, []);

  const ImageFilter = HomeImg && HomeImg.findIndex((item) => item.id === 27);
  const FilterImage = HomeImg && HomeImg.findIndex((item) => item.id === 37);
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
            {/* <div className="mb-4">
              {HomeImg &&
                HomeImg.map((item) => {
                  return (
                    <img
                      key={item.id === 37}
                      src={item.image}
                      alt={item.image}
                      className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                    />
                  );
                })}
            </div> */}

            <img
              src="http://grocery.intelliatech.in/upload/offers/1640419150453.jpg"
              alt=""
              className=" rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
            />

            {/* <div>
              {ImageFilter && (
                <img
                  key={ImageFilter.id}
                  src={ImageFilter.image}
                  alt={ImageFilter.image}
                  className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                />
              )}
            </div> */}

            <div className="flex md:flex-row justify-between xs:flex-col xs:mt-3">
              <div className="md:w-[453px] md:p-2 md:mt-4 xs:py-2">
                <img
                  src="http://grocery.intelliatech.in/upload/offers/1643441045328.png"
                  alt=""
                  className="rounded-xl md:h-[228px]  "
                />

                {/* {ImageFilter && (
                  <img
                    key={ImageFilter.id}
                    src={ImageFilter.image}
                    alt={ImageFilter.image}
                    className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                  />
                )} */}
              </div>
              <div className="md:w-[453px] md:p-2 md:mt-4 xs:pt-3 sm:h-[400px]">
                <CarouselComponent />
              </div>
              <div className="md:w-[453px]  md:p-2 xs:-mt-20 md:mt-4 xs:py-2">
                <img
                  src="http://grocery.intelliatech.in/upload/offers/1640419180838.jpg"
                  alt=""
                  className="rounded-xl md:h-[230px]"
                />
              </div>
            </div>
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
          </div>
        </div>
      </>
    </div>
  );
}

export default Home;
