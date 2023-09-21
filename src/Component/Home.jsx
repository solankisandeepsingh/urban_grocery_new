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
import { Link } from "react-router-dom";
import { FlashSales } from "./Flash_Sales/FlashSales";
import { SignJWT } from "jose";
import axioss from "../api/axios";
import { useApiStore } from "./zustand/useApiStore";
import { Footer } from "./Footer/Footer";
import { AccessToken } from "./AccessToken/AccessToken";
import { useApiToken } from "./zustand/useApiToken";

function Home({
  data,
  SubCategory,
  productDetails,
  setData,
  addItem,
  setAddItem,
  isOpen,
  user_id,
  setNavbarOpen,
}) {
  const { allImg, setAllImg } = useImgStore();
  const { jwt, setJwt } = useApiStore();
  const { setisLoading } = useLoaderState();
  const [visible, setVisible] = useState(false);
  const { apiToken, accessTokenApi } = useApiToken();
  setNavbarOpen(true);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  const handleHomeImg = () => {
    let config = {
      headers: {
        // Authorization: `Bearer ${jwt}`,
        Authorization: `Bearer ${apiToken}`,
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

  // useEffect(() => {
  //   (async function createJwt() {
  //     const alg = "HS256";
  //     const secret = new TextEncoder().encode(
  //       "replace_with_your_strong_jwt_secret_key"
  //     );

  //     const jwt = await new SignJWT({ "urn:example:claim": true })
  //       .setProtectedHeader({ alg })
  //       // .setIssuedAt()
  //       .setIssuer("eKart")
  //       .setAudience("eKart Authentication")

  //       .sign(secret);

  //     console.log(jwt);
  //     setJwt(jwt);
  //     // console.log(jwt.sign(secret, {iss : "eKart", sub : 'eKart Authentication' }).then((res)=> console.log(res)))
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (jwt) handleHomeImg();
  // }, [jwt]);

  useEffect(() => {
    if (apiToken) handleHomeImg();
  }, [apiToken]);

  return (
    <div className=" md:mt-0.5 xs:mt-14">
      <>
        {/* <div className="md:invisible xs:visible">
          <Search
            setData={setData}
            data={data}
            addItem={addItem}
            setAddItem={setAddItem}
            user_id={user_id}
          />
        </div> */}
        <div className="flex justify-center md:mt-16 items-center mx-auto xs:py-4 ">
          <div className="container w-full items-center">
            <div
              className={
                isOpen ? "opacity-75" : "opacity-100" + "  xs:px-3 sm:px-5 "
              }
            >
              <div className="md:w-auto text-center m-auto xs:py-2 sm:h-auto">
                <CarouselComponent />
              </div>

              <div className="md:flex md:justify-between md:items-center">
                <div className="md:w-auto md:p-2 md:my-4 ">
                  <img
                    src={allImg["30"]}
                    alt=""
                    // className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
                    className="rounded-xl xs:h-[145px] md:w-full md:h-[250px] xs:w-full sm:h-[232px]"
                  />
                </div>

                <div className="md:w-auto md:p-2 xs:py-2">
                  <img
                    src={allImg["32"]}
                    alt=""
                    // className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
                    className="rounded-xl xs:h-[145px] md:w-full md:h-[250px] xs:w-full sm:h-[232px]"
                  />
                </div>
              </div>

              <Category
                SubCategory={SubCategory}
                productDetails={productDetails}
                user_id={user_id}
              />

              <div className="md:w-auto md:p-2 md:my-1">
                <img
                  src={allImg["27"]}
                  alt={"ALT"}
                  className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
                />
              </div>

              {/* <FoodDelivery /> */}
              <div className="">
                <ProductCarousel
                  addItem={addItem}
                  setAddItem={setAddItem}
                  user_id={user_id}
                />
              </div>

              {/* <LocallySourced /> */}
              <div className="md:w-auto md:p-2 md:mt-4 xs:py-2">
                <img
                  src={allImg["37"]}
                  alt=""
                  className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
                />
              </div>
            </div>
            <div className="">
              <FlashSales />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Home;
