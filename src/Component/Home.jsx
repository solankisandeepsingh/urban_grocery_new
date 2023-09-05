import React, { useEffect, useState } from "react";
import { Category } from "./Category/Category";
import CarouselComponent from "./Carousel/Carousel";
import Search from "./Header/Search/Search";
import { ProductCarousel } from "./Products/Product-Carousel/ProductCarousel";
import { API_TOKEN } from "./Token/Token";
import { useImgStore } from "./zustand/useImgStore";
import axios from "axios";
import { useLoaderState } from "./zustand/useLoaderState";
import { Link } from "react-router-dom";
import { FlashSales } from "./Flash_Sales/FlashSales";
import { SignJWT } from "jose";
import axioss from "../api/axios";
import { useApiStore } from "./zustand/useApiStore";
import { Footer } from "./Footer/Footer";
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
}) {
  const { allImg, setAllImg } = useImgStore();
  const { jwt, setJwt } = useApiStore();
  console.log(allImg, setAllImg, "IMG STORE FROM ZUSTAND");
  const { setisLoading } = useLoaderState();
  const [visible, setVisible] = useState(false);

  const { accessTokenApi, apiToken } = useApiToken();
  console.log(apiToken,"apiToken??")
  // console.log(axioss);

  // async function getData () {
  //   try{
  //     let imgData = new FormData();
  //     imgData.append("accesskey", "90336");
  //     imgData.append("get_user_data", "1");
  //     imgData.append("user_id", "14");

  //     const resp = await axioss.post("/get-user-data.php", imgData)
  //     console.log(resp);
  //   } catch (err){
  //     console.log(err);
  //   }
  // }

  // getData();

  // axioss.interceptors.request.use(
  //   (config) => {

  //     const token = TokenService.getLocalAccessToken();
  //     if (token) {
  //       // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
  //       config.headers["x-access-token"] = token; // for Node.js Express back-end
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // const instance = axios.create({
  //   baseURL: "https://grocery.intelliatech.in/api-firebase/get-user-data.php",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

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
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  const handleHomeImg = () => {
    let config = {
      headers: {
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

      // const jwt = await new SignJWT({ "urn:example:claim": true })
      //   .setProtectedHeader({ alg })
      //   // .setIssuedAt()
      //   .setIssuer("eKart")
      //   .setAudience("eKart Authentication")

      //   .sign(secret);

      // console.log(jwt);
  //     accessTokenApi(apiToken);
  //     // console.log(jwt.sign(secret, {iss : "eKart", sub : 'eKart Authentication' }).then((res)=> console.log(res)))
  //   })();
  // }, []);

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
