import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_TOKEN } from "../Token/Token";
import { useProductsStore } from "../zustand/useProductsStore";
import { useLoaderState } from "../zustand/useLoaderState";

export const Category = () => {
  const { allCategories, setAllCategories } = useProductsStore();
  const { setisLoading } = useLoaderState();
  // const [categorydata, setCategorydata] = useState(categoryData.data);
  // const [categorydata, setCategorydata] = useState([]);

  const categryData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
        setAllCategories(res.data.data);
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
      <div className="shadow-sm border border-[#e8e8e8] p-5 md:mt-7 bg-[#fcfff3] rounded-md">
        <div className=" flex justify-between">
          <div className="text-customBlack text-[24px] ">
            <h1 className="font-okra font-600">Shop By Category</h1>
          </div>
          <div className=" text-customGreen text-[20px]	">
            <h1 className=" font-okra font-600">View All</h1>
          </div>
        </div>

        <div className="category xs:mx-1 xs:mt-3 md:mt-5 xs:ml-3">
          <div className=" grid md:grid-cols-4 sm:grid-cols-4 gap-4 xs:grid-cols-2 md:py-3">
            {allCategories &&
              allCategories.map((item) => {
                return (
                  <div
                    className="md:w-48 md:ml-2 rounded-xl border border-light_gray cursor-pointer hover:border-light_green hover:border-[2px] hover:shadow-sm border-[2px]  xs:py-2 bg-white "
                    key={item.id}
                  >
                    <NavLink to={`/subcategory-details/${item.id}`}>
                      <img
                        className="xs:w-32 xs:h-28 xs:ml-2.5 sm:w-36 sm:h-32 md:w-32 md:h-28 md:ml-8 md:mt-2 object-cover md:rounded-3xl xs:rounded-lg bg-white sm:rounded-lg"
                        src={item.image}
                        alt="item"
                      />
                    </NavLink>
                    <div className="xs:text-center md:text-center bg-white ">
                      <p className="md:text-sm sm:text-md md:font-medium md:ml-2 sm:py-2 bg-white">
                        {item.name}
                      </p>
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
