import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { useProductsStore } from "../zustand/useProductsStore";
import { useLoaderState } from "../zustand/useLoaderState";
import { useApiStore } from "../zustand/useApiStore";
import { useApiToken } from "../zustand/useApiToken";
export const Category = () => {
  const { allCategories, setAllCategories } = useProductsStore();
  const { setisLoading } = useLoaderState();
  const { jwt, setJwt } = useApiStore();

  // const [categorydata, setCategorydata] = useState(categoryData.data);
  // const [categorydata, setCategorydata] = useState([]);
  const { apiToken } = useApiToken();
  
  const categryData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    var formData = new FormData();
    formData.append("accesskey", "90336");
    setisLoading(true);

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/get-categories.php`,
        formData,
        config
      )
      // .then((res) => setCategorydata(res.data.data))
      .then((res) => {
        setAllCategories(res?.data?.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    categryData();
  }, []);

  return (
    <>
      <div className="shadow-sm border xs:h-36 md:h-72 sm:h-72 border-[#e8e8e8] xs:my-3 md:p-5 md:mt-7 bg-[#fcfff3] rounded-md">
        {/* <div className=" flex  xs:py-2 md:justify-between md:text-[24px] xs:text-[16px]">
          <div className="text-customBlack">
            <h1 className="font-okra font-600 xs:mx-1">Shop By Category</h1>
          </div>
          <div className=" text-customGreen">
            <h1 className=" font-okra font-600 xs:mx-16">View All</h1>
          </div>
        </div> */}

        <div className="xs:my-2 xs:mx-2 mt-20 flex justify-between">
          <div className="text-customBlack text-[16px]">
            <h1 className="font-okra font-600">Shop By Category</h1>
          </div>
          <div className=" text-customGreen text-[16px]	">
            <h1 className="cursor-pointer font-okra font-600">View All</h1>
          </div>
        </div>

        <div className="category xs:mt-3 md:mt-5">
          {/* <div className=" grid md:grid-cols-4 sm:grid-cols-4 gap-4 xs:grid-cols-4 xs:mx-1  md:py-3"> */}
          <div className="flex justify-between items-center xs:gap-2">
            {allCategories &&
              allCategories.map((item) => {
                return (
                  <div
                    className="xs:w-18 md:w-36 md:ml-2 rounded-xl border-light_gray cursor-pointer hover:border-light_green hover:border-[2px] hover:shadow-sm border-[2px] bg-[#ffffff] "
                    key={item.id}
                  >
                    <NavLink to={`/subcategory-details/${item.id}`}>
                      <img
                        // className="xs:w-28 xs:h-12 sm:w-44 sm:h-32 md:w-32 md:h-28  md:ml-5 md:mt-2 object-cover md:rounded-3xl xs:rounded-lg bg-white sm:rounded-lg"
                        className="xs:w-28 xs:h-12 sm:w-44 sm:h-32 md:w-36 md:h-28  object-cover md:rounded-t-xl xs:rounded-t-lg  sm:rounded-t-lg"
                        src={item.image}
                        alt="item"
                      />
                    </NavLink>
                    <div className="px-4">
                    <div className="xs:text-center md:text-center xs:py-0.5  ">
                      <p className="xs:text-[12px] xs:font-light md:text-sm sm:text-md md:font-medium  sm:py-4 ">
                        {item.name}
                      </p>
                    </div>

                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
