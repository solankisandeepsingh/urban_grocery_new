import React, { useEffect, useState } from "react";
import { Category } from "./Category/Category";
import CarouselComponent from "./Carousel/Carousel";
import Search from "./Header/Search/Search";
import { ProductCarousel } from "./Products/Product-Carousel/ProductCarousel";
import { API_TOKEN } from "./Token/Token";
import { useImgStore } from "./zustand/useImgStore";
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
  const {allImg, setAllImg} = useImgStore();
  console.log(allImg, setAllImg, "IMG STORE FROM ZUSTAND")

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
        let imgObj = {};
        res.data.data.forEach((item)=>{
          // console.log(item.id, item.image, "EACH OBJ PROPERTY FROM IMGA API");
          imgObj[item.id] = item.image; 
        })
        setAllImg(imgObj);
        setHomeImg(res.data.data);

      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleHomeImg();
  }, []);

  const ImageFilter = HomeImg && HomeImg.findIndex((item) => item.id === '27');
  console.log(ImageFilter, "HOME IMAGE TOP RED OFFER");
  // console.log(HomeImg)
  const FilterImage = HomeImg && HomeImg.findIndex((item) => item.id === '37');
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
                      // key={item.id === 37}
                      src={allImg['27']}
                      alt={'ALT'}
                      className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                    /> 
            </div>

            {/* <img
              src="http://grocery.intelliatech.in/upload/offers/1640419150453.jpg"
              alt=""
              className=" rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
            /> */}

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
                {HomeImg &&
                  HomeImg.map((item) => {
                    return (
                      item.id === '37' ? 
                      <img
                        // key={item.id === 37}
                        src={item.image}
                        alt={item.image}
                        className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                      /> : null
                    ) ;
                  })}

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
              <div className="md:w-[453px] md:p-2 md:mt-4 xs:py-2">
                {HomeImg &&
                  HomeImg.map((item) => {
                    return (
                      item.id === '30' ? 
                      <img
                        // key={item.id === 37}
                        src={item.image}
                        alt={item.image}
                        className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                      /> : null
                    ) ;
                  })}

                {/* {ImageFilter && (
                  <img
                    key={ImageFilter.id}
                    src={ImageFilter.image}
                    alt={ImageFilter.image}
                    className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
                  />
                )} */}
              </div>
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
