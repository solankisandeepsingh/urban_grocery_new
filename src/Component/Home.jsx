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
    <div className=" mt-0.5">
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
      <div className="flex justify-center md:mt-16 items-center mx-auto "> 

        <div className="container   w-full items-center">
          <div
            className={
              isOpen ? "opacity-75" : "opacity-100" + "  xs:px-3 sm:px-5 "
            }
          >
            <div className="md:w-auto text-center m-auto   xs:pt-3 sm:h-auto">
              <CarouselComponent />
            </div>

            <div className="flex justify-between items-center">
              <div className="md:w-auto md:p-2 md:mt-4 xs:py-2">
                <img
                  src={allImg["30"]}
                  alt=""
                  className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
                />
              </div>

              {/* <div className="md:w-auto md:p-2 md:mt-4 xs:py-2">
                <img
                  src={allImg["37"]}
                  alt=""
                  className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
                />
              </div> */}
              <div className="md:w-auto md:p-2 md:mt-4 xs:py-2">
                <img
                  src={allImg["32"]}
                  alt=""
                  className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
                />
              </div>
            </div>

            <Category
              SubCategory={SubCategory}
              productDetails={productDetails}
              user_id={user_id}
            />

            <div className="my-8">
              <img
                src={allImg["27"]}
                alt={"ALT"}
                className="rounded-xl xs:h-[145px] md:w-full md:h-auto xs:w-full sm:h-[232px]"
              />
            </div>
            {/* <FoodDelivery /> */}

            <ProductCarousel
              addItem={addItem}
              setAddItem={setAddItem}
              user_id={user_id}
            />

            <LocallySourced />
          </div>
          <div className="bg-[#212122] flex border w-full border-white rounded-md ">
            <footer class="bg-gray-800">
              <div class="container mx-auto px-6 py-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div class="text-white">
                    <h3 class="text-lg font-semibold mb-4">About Us</h3>
                    <p class="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div class="text-white">
                    <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                      <li>
                        <a href="#" class="text-gray-300 hover:text-white">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-300 hover:text-white">
                          Products
                        </a>
                      </li>
                      <li>
                        <a href="#" class="text-gray-300 hover:text-white">
                          Services
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="text-white">
                    <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
                    <p class="text-sm">123 Street, City, State</p>
                    <p class="text-sm">Email: info@example.com</p>
                    <p class="text-sm">Phone: 123-456-7890</p>
                  </div>
                </div>
                {/* <hr class="border-gray-700 my-8" /> */}
                <div class="text-white text-sm text-center">
                  <p>&copy; 2023 Urban Grocery. All rights reserved.</p>
                  <p>Terms of Service | Privacy Policy</p>
                </div>
              </div>
            </footer>
          </div>
        </div>

      </div>
      </>
    </div>
  );
}

export default Home;
