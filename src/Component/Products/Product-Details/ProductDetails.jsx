import React, { useEffect, useState } from "react";
import {
  FaRegHeart,
  FaAlignLeft,
  FaArrowsAlt,
  FaHeart,
  FaDove,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from "../../StarRating/Rating";
import axios from "axios";
import { API_TOKEN } from "../../Token/Token";
import { useApiStore } from "../../zustand/useApiStore";
import ProductBtn from "../../Button/ProductBtn";
import { useLoaderState } from "../../zustand/useLoaderState";
import { useCartStore } from "../../zustand/useCartStore";
import { useUserStore } from "../../zustand/useUserStore";
import CartQuantity from "../../Button/CartQuantity";
import { Rating as MUIRating } from "@mui/material/";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { useFavStore } from "../../zustand/useFavStore";
import { SimilarProduct } from "../../Similar-Products/SimilarProduct";
import { useApiToken } from "../../zustand/useApiToken";

export const ProductDetails = ({ isOpen, setIsOpen,setNavbarOpen }) => {
  const [productPageData, setProductPage] = useState([]);
  const [wishlist, setWishlist] = useState(false);
  const [reviewList, setReviewList] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [reviewIndex, setReviewIndex] = useState("");
  const { id } = useParams();
  const { setisLoading } = useLoaderState();
  const { allCartItems, setAllCartItems, variant, setVariant } = useCartStore();
  const { userInfo } = useUserStore();
  const [value, setValue] = React.useState(0);
  const [isValidImg, setisValidImg] = useState(false);
  const [review, setReview] = useState("");
  const { jwt, setJwt } = useApiStore();
  const { allFavItems, setAllFavItems } = useFavStore();
  const {
    userInfo: { user_id },
  } = useUserStore();

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  let imageModalRef = useRef(null);
  const { apiToken } = useApiToken();
  setNavbarOpen(true)

  const handleImageClick = (image, index) => {
    if (image) {
      setReviewIndex(index);
      setSelectedImage(image);
      setShowImageModal((prev) => !prev);
    }
  };

  const handleVariantChange = (id, e) => {

    let updatedvariant = { ...variant, [id]: e.target.value };

    setVariant(updatedvariant);
  };

  const addItemHandler = (item, data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };
    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", user_id);
    bodyFormData.append("product_id", `${data.id}`);
    bodyFormData.append("product_variant_id", `${item.id}`);
    bodyFormData.append("qty", 1);
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then(console.log(allCartItems, "[before some method]"))
      .then((res) => {
        // setisLoading(false);
        if (allCartItems.some((cartItem) => cartItem.product_id === item.id)) {
          let newArr = allCartItems.map((data) =>
            data.product_id === item.id
              ? {
                  ...data,
                  amount: data.amount + 1,
                }
              : data
          );
          console.log(newArr);
          setAllCartItems(newArr);
        
          return;
        }

        let item1 = {
          amount: 1,
          discounted_price: item.discounted_price,
          id: item.id,
          price: item.price,
          product_id: item.product_id,
          product_variant_id: item.id,
          qty: 1,
          user_id: user_id,
        };

        let newArr = [...allCartItems, { ...item1, amount: 1 }];
        toast.success("Item added to user cart successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose:500
          
        });
        // setAllCartItems((cart) => [...cart, { ...item1, amount: 1 }]);
        setAllCartItems(newArr);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "Network Error. Please check your connection and try again.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        setisLoading(false);
      });
  };
  const addItemUI = (mainItem) => {
    let newArr = [];
    if (mainItem?.variants?.length > 1) {
      newArr = [
        ...allCartItems,
        {
          ...mainItem.variants[variant[mainItem.id] || 0],
          amount: 1,
          name: mainItem.name,
          image: mainItem.variants[variant[mainItem.id] || 0].images[0],
          product_variant_id: mainItem.variants[variant[mainItem.id] || 0].id,
        },
      ];
    } else {
      toast.success("Item added to user cart successfully !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:300
      });
      newArr = [
        ...allCartItems,
        {
          ...mainItem.variants[variant[mainItem.id] || 0],

          amount: 1,
          name: mainItem.name,
          image: mainItem.image,
          product_variant_id: mainItem.variants[variant[mainItem.id] || 0].id,
        },
      ];
    }
    setAllCartItems(newArr);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowImageModal(false);
  };

  const handleClickProuctDetailsOutside = (event) => {
    if (
      imageModalRef.current &&
      !imageModalRef.current.contains(event.target)
    ) {
      setShowImageModal(false);
    }
  };
  useEffect(() => {

    return () => {
      document.removeEventListener("mousedown", handleClickProuctDetailsOutside);
    };
  }, []);

  const addReview = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    if (value >= 1 && review) {
      var bodyFormData = new FormData();
      bodyFormData.append("accesskey", "90336");
      bodyFormData.append("add_products_review", "1");
      bodyFormData.append("product_id", id);
      bodyFormData.append("user_id", userInfo.user_id);
      bodyFormData.append("rate", value);
      bodyFormData.append("review", review);

      images.forEach((image, index) => {
        bodyFormData.append(`images[]`, image);
      });

      setisLoading(true);

      axios
        .post(
          "https://grocery.intelliatech.in/api-firebase/get-all-products.php",
          bodyFormData,
          config
        )
        .then((res) => {
          console.log(res);
          setisLoading(false);
          setReviewOpen(false);
          res.data.error
            ? toast.error(`${res.data.message}`, {
                position: toast.POSITION.TOP_RIGHT,
              })
            : toast.success("Review Added Successfully  !", {
                position: toast.POSITION.TOP_RIGHT,
              });
          setReview("");
          setValue(0);
        })
        .catch((error) => {
          console.log(error);
          setisLoading(false);
        });
    } else {
      toast.error("Please Enter All Details !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const productReviews = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    var bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("get_product_reviews", "1");
    bodyFormData.append("product_id", id);
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/get-all-products.php",
        bodyFormData,
        config
      )
      .then((res) => {
        setReviewList(res.data.product_review);
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  const imagesHandler = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);
    setImages(imagesArray);
  };
  const inputHandler = (event) => {
    setReview(event.target.value);
  };

 

  const productDetail = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    var bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("product_id", id);
    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/get-product-by-id.php",
        bodyFormData,
        config
      )
      .then((res) => {
        setProductPage(res?.data?.data);
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  // useEffect(() => {
  //   console.log("rendered");
  //   productDetail();
  //   productReviews();
  // }, [id]);

  useEffect(() => {
    if (apiToken) {
      productDetail();
      productReviews();
    }
  }, [apiToken,id]);

  const allCartItemsHandler = (item, data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    const bodyFormData = new FormData();
    bodyFormData.append("accesskey", "90336");
    bodyFormData.append("add_to_cart", "1");
    bodyFormData.append("user_id", "14");

    bodyFormData.append("product_id", `${data.id}`);
    bodyFormData.append("product_variant_id", `${item.id}`);

    // const qtys = (item.qty || 0) + 1;

    bodyFormData.append("qty", 1);

    setisLoading(true);

    axios
      .post(
        "https://grocery.intelliatech.in/api-firebase/cart.php",
        bodyFormData,
        config
      )
      .then((res) => {
        // setAllCartItems(res)
        if (allCartItems.some((cartItem) => cartItem.product_id === item.id)) {
          let newArr = allCartItems.map((data) =>
            data.product_id === item.id
              ? {
                  ...data,
                  amount: data.amount + 1,
                }
              : data
          );
          setAllCartItems(newArr);
          return;
        }
        let item1 = {
          amount: 1,
          discounted_price: item.discounted_price,
          id: item.id,
          image: data.image,
          images: [
            "http://grocery.intelliatech.in/upload/variant_images/1676618514.4521-883.png",
          ],
          price: item.price,
          product_id: item.product_id,
          product_variant_id: item.id,
          qty: 1,
          save_for_later: "0",
          serve_for: "Available",
          slug: "butterscotch-flavorsome-cake",
          stock: "29",

          type: "packet",
          unit: "gm",
          user_id: "14",
        };
        let newArr = [...allCartItems, { ...item1, amount: 1 }];
        setAllCartItems(newArr);
        setisLoading(false);
        // setAllCartItems((cart) => [...cart, { ...item1, amount: 1 }]);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  const filterData = productPageData.filter((data) => {
    return data.id === id;
  });

 


  const handleRemoveFavorite = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    let favData = new FormData();
    favData.append("accesskey", "90336");
    favData.append("remove_from_favorites", "1");
    favData.append("user_id", user_id);
    favData.append("product_id", item.id);
    setisLoading(true);

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/favorites.php`,

        favData,
        config
      )
      .then((res) => {
        console.log(res, "favdata");
        setisLoading(false);
        setWishlist((prev) => !prev);

        let newArr = allFavItems.filter((fav) => {
          return fav.id !== item.id;
        });
        setAllFavItems(newArr);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const handleAddFavorite = (item) => {
    let config = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    };

    let favData = new FormData();
    favData.append("accesskey", "90336");
    favData.append("add_to_favorites", "1");
    favData.append("user_id", user_id);
    favData.append("product_id", item.id);
    setisLoading(true);

    axios
      .post(
        `https://grocery.intelliatech.in/api-firebase/favorites.php`,

        favData,
        config
      )
      .then((res) => {
        setisLoading(false);
        // setFavPos((prev) => !prev);
        setWishlist((prev) => !prev);

        console.log(res, "favdata");
        let newArr = [...allFavItems, item];
        setAllFavItems(newArr);
      })
      .catch((err) => {
        setisLoading(false);

        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />

      {/*Produc-details Page */}
      <div className="2xs:mt-10 xs:mt-10 md:w-[50%] md:p-20 xs:p-8">
        {filterData &&
          filterData.map((item) => {
            return (
              <>
                <div className="md:flex ">
                  <div className="img md:ml-20 sm:mx-14 xs:ml-1">
                    <Carousel
                      showIndicators={false}
                      className="rounded-xl md:w-[400px] xs:w-80 sm:w-[600px] "
                    >
                      <div className="transition-all hover:scale-105 rounded-xl ">
                        <img src={item.image} alt="" className="rounded-xl " />
                      </div>
                      <div className=" ">
                        <img
                          src={item.other_images}
                          alt=""
                          className="rounded-xl"
                        />
                      </div>
                    </Carousel>
                  </div>

                  <div className="xs:flex-col md:ml-[750px] md:p-6 md:fixed xs:bg-[#f7f7f7] xs:p-2 sm:px-3 md:bg-[#f7f7f7] md:rounded-xl">
                    {/* {item &&
                      item.variants.map((item) =>
                        item.stock > 0 ? null : (
                          <p className="text-orange text-sm md:text-lg font-medium sm:text-2xl">
                            Out of stock
                          </p>
                        )
                      )} */}
                    <div className="2xs:flex 2xs:mt-4 xs:flex xs:mt-4 sm:mt-8 md:flex md:gap-4 sm:gap-7 xs:gap-6 2xs:gap-3">
                      <div className="2xs:flex xs:flex 2xs:gap-1 xs:gap-1  md:flex md:gap-1 ">
                        {user_id !== 14 &&
                        allFavItems?.find((fav) => {
                          return fav.id === item.id;
                        }) ? (
                          <FaHeart
                            className="2xs:text-xs xs:text-sm sm:text-3xl  md:text-lg  text-red animate-hbeat cursor-pointer"
                            onClick={(e) => {
                              setWishlist(true);
                              e.stopPropagation();
                              handleRemoveFavorite(item);
                            }}
                          />
                        ) : (
                          <FaRegHeart
                            className="2xs:text-xs xs:text-sm sm:text-3xl  md:text-lg  text-lime cursor-pointer"
                            onClick={(e) => {
                              setWishlist(true);
                              e.stopPropagation();
                              handleAddFavorite(item);
                            }}
                          />
                        )}
                        <p className="2xs:text-xs xs:text-sm sm:text-3xl md:text-sm ">
                          Add Wishlist
                        </p>
                      </div>
                      {/* <div className="2xs:flex xs:flex 2xs:gap-1 xs:gap-1  md:flex md:gap-1 ">
                        {wishlist ? (
                          <FaHeart
                            className="2xs:text-xs xs:text-sm sm:text-3xl  md:text-lg  text-red animate-hbeat"
                            onClick={handleWishlist}
                          />
                        ) : (
                          <FaRegHeart
                            className="2xs:text-xs xs:text-sm sm:text-3xl  md:text-lg  text-lime "
                            onClick={handleWishlist}
                          />
                        )}
                        <p className="2xs:text-xs xs:text-sm sm:text-3xl md:text-sm">
                          Wish_List
                        </p>
                      </div> */}
                      <div className="2xs:flex xs:flex xs:gap-1  md:flex md:gap-1 ">
                        <FaArrowsAlt className="2xs:text-xs xs:text-sm sm:text-3xl md:text-lg text-lime " />
                        <p className="2xs:text-xs xs:text-sm sm:text-3xl md:text-sm">
                          Share
                        </p>
                      </div>
                      <div className="2xs:flex xs:flex xs:gap-1 md:flex md:gap-1 ">
                        <FaAlignLeft className="2xs:text-xs xs:text-sm xs:gap-1 sm:text-3xl md:text-lg text-lime" />
                        <p className="2xs:text-xs xs:text-sm sm:text-3xl md:text-sm">
                          Similar_Products
                        </p>
                      </div>
                    </div>

                    <div className="data 2xs:mt-3 xs:mb-3 ">
                      <p className="  2xs:text-xl 2xs:font-semibold xs:mt-2 mr-50 xs:text-2xl xs:font-semibold sm:mt-4 sm:text-4xl md:mt-3 md:text-3xl  md:font-medium ">
                        {item.name}
                      </p>

                      {item &&
                        item.variants.map((variant) => {
                          return (
                            <>
                              <div className="xs:text-sm xs:text-left sm:mt-2  md:text-left  ">
                                <p className="text-lime text-lg font-bold sm:text-3xl md:text-lg">
                                  You save ₹
                                  {variant.price - variant.discounted_price}
                                  .00
                                </p>
                                <p className="2xs:text-base  sm:text-2xl md:text-base text-black font-medium md:mt-1 sm:mt-2">
                                  ₹{variant.discounted_price}.00{" "}
                                  <span className="text-xs sm:text-xl md:text-sm text-black line-through">
                                    ₹{variant.price}.00{" "}
                                  </span>
                                </p>
                                <p className="2xs:text-base  sm:text-2xl md:text-sm  mt-1 font-light">
                                  {variant.measurement}{" "}
                                  {variant.measurement_unit_name}
                                </p>
                                <div className="flex flex-row gap-4 mt-2 sm:mt-5 ">
                                  <div className="box-border h-16 md:w-40 xs:w-44 px-4 xs:px-2 border-2 bg-white border-light_gray rounded-lg text-center text-lime">
                                    <img
                                      src="https://media.istockphoto.com/id/1426338781/vector/return-parcel-box-line-icon-exchange-package-of-delivery-service-linear-pictogram-arrow-back.jpg?b=1&s=170x170&k=20&c=wJ3CCtEVjfm-5h8m-auMfNdIbRB2ouYfe8CX9eAExVs="
                                      alt=""
                                      className="w-9 h-9 ml-auto mr-auto"
                                    />
                                    {item.return_status === "1" ? (
                                      <p>10 Days Returnable</p>
                                    ) : (
                                      <p>Not Returnable</p>
                                    )}
                                  </div>
                                  <div className="box-border h-16 w-40 md:px-2 xs:px-2 border-2 bg-white border-light_gray rounded-lg text-center text-lime">
                                    <img
                                      src="https://static.thenounproject.com/png/3679002-200.png"
                                      alt=""
                                      className="w-9 h-9 ml-auto mr-auto "
                                    />
                                    Not Cancellable
                                  </div>
                                </div>
                                {/* {data.stock > 0 && (
                                  <button
                                    className="bg-lime 2xs:px-2 2xs:mt-2 2xs:rounded xs:mt-3 xs:w-24 xs:rounded-lg xs:py-1 md:mt-3 md:w-[118px] sm:w-[130px] sm:mt-5  text-white md:font-bold md:py-3 sm:text-lg md:text-sm md:px-4 md:rounded-lg md:hover:opacity-90"
                                    onClick={() => allCartItemsHandler(data, item)}
                                  >
                                    Add to cart
                                  </button>
                                )} */}

                                <div>
                                  {item.variants.some(
                                    (variant) => variant.stock > 0
                                  ) ? (
                                    allCartItems.find(
                                      (i) => i.product_id === item.id
                                    ) ? (
                                      <>
                                        <div className="bg-lime 2xs:px-2 2xs:mt-2 2xs:rounded xs:mt-3 xs:w-24 xs:rounded-lg xs:py-1 md:mt-3 md:w-[118px] sm:w-[130px] sm:mt-5 md:text-2xl text-white md:font-bold md:py-2 sm:text-lg md:px-4 md:rounded-lg md:hover:opacity-90">
                                          {/* <ProductBtn
                                            item={item}
                                            setAllCartItems={setAllCartItems}
                                            allCartItems={allCartItems}
                                          /> */}
                                          <CartQuantity
                                            item={item}
                                            variant={variant}
                                            // setAllCartItems={setAllCartItems}
                                            // allCartItems={allCartItems}
                                            // user_id={user_id}
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <button
                                        className="bg-lime 2xs:px-2 2xs:mt-2 2xs:rounded xs:mt-3 xs:w-24 xs:rounded-lg xs:py-1 md:mt-3 md:w-[118px] sm:w-[130px] sm:mt-5  text-white md:font-bold md:py-3 sm:text-lg md:text-sm md:px-4 md:rounded-lg md:hover:opacity-90"
                                        // onClick={() =>
                                        //   allCartItemsHandler(data, item)
                                        // }
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          user_id
                                            ? addItemHandler(variant, item)
                                            : addItemUI(item);
                                        }}
                                      >
                                        Add
                                      </button>
                                    )
                                  ) : (
                                    <p className="text-orange md:text-[11px]  mt-4 pb-4 sm:mb-4 s  xs:text-xs text-sm md:text-lg font-medium sm:text-2xl">
                                      Out of stock
                                    </p>
                                  )}
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="text-left md:ml-20 xs:ml-1 mb-3">
                  <div dangerouslySetInnerHTML={{ __html: item.description }}>
                    {/* {JSON.parse(item.description)} */}
                  </div>

                  <div className="mt-4">
                    <div className="">
                      <SimilarProduct id={id} />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-1">
                    <h1 className="font-bold text-2xl">RATINGS AND REVIEWS</h1>
                    <div className="flex items-center   gap-1 border-b border-[#e8e8e8e8]">
                      <p className="font-bold  text-[40px]">{item.ratings}</p>
                      {/* <div className="flex text-yellow_rating mt-2 sm:mt-3 sm:text-2xl md:text-sm">
                                      <Rating
                                        star={4.3}
                                        reviews={item.number_of_ratings}
                                      />
                                    </div> */}
                      <div className="flex justify-between items-center w-full">
                        <MUIRating
                          name="half-rating-read"
                          defaultValue={+item.ratings}
                          precision={0.1}
                          readOnly
                        />
                        <a
                          className="px-[15px] py-[9px]  rounded-[20px] text-black font-bold bg-yellowAwaiting inline-block"
                          href=""
                          onClick={(event) => {
                            event.preventDefault();
                            setReviewOpen(true);
                          }}
                        >
                          Add review
                        </a>
                      </div>
                    </div>
                    <div className="">
                      <h2 className="font-bold text-[20px] mb-4">
                        {`Customer reviews ${
                          reviewList?.length
                            ? "(" + reviewList?.length + ")"
                            : ""
                        }`}
                      </h2>
                      {reviewList?.length > 0 ? (
                        reviewList.map((review, mainindex) => {
                          // const img = new Image();
                          // // let validImg;
                          // img.src = review.user_profile;

                          // img.onload = () => {
                          //   setisValidImg(true);
                          // };
                          // img.onerror = () => {
                          //   // validImg = 0;
                          //   setisValidImg(false);

                          // };
                          // console.log("AFTER REVIEWLIST POPULATED");
                          // checkImageValidity(review.user_profile)

                          return (
                            <div className="border-b px-3 border-[#e8e8e8e8] mb-3">
                              <div className="flex items-center gap-3">
                                {isValidImg ? (
                                  <img
                                    className="h-10 w-10"
                                    src={review.user_profile}
                                    alt=""
                                  />
                                ) : (
                                  <FaUserCircle className="text-2xl" />
                                )}
                                <div className="text-md mt-2 font-semibold text-[gray]">
                                  {review.username}
                                </div>
                              </div>
                              <MUIRating
                                name="half-rating-read"
                                defaultValue={+review.rate}
                                precision={0.1}
                                readOnly
                              />
                              {/* <div className="flex gap-2">
                                {review.images.length > 0 &&
                                  review.images.map((image) => {
                                    return (
                                      <img
                                        src={image}
                                        className="w-24 h-24 rounded-lg object-cover"
                                      />
                                    );
                                  })}
                              </div> */}

                              <div>
                                <div className="xs:grid xs:grid-cols-3 md:grid-cols-6 relative sm:grid-cols-6 gap-2">
                                  {review?.images?.length > 0 &&
                                    review.images.map((image, index) =>
                                      index < 3 ? (
                                        // <div className="last:opacity-70 last:before:absolute last:before:content-['+3'] text-3xl text-[#f5f5f5] before:w-24 before:h-24 ">
                                        <div
                                          onClick={() =>
                                            handleImageClick(image, mainindex)
                                          }
                                          className={`${
                                            review?.images?.length > 2
                                              ? 'last:before:content-["+3"]  cursor-pointer before:w-24 before:h-24 last:opacity-60  last:before:absolute'
                                              : ""
                                          } 
 text-3xl text-[#f5f5f5]`}
                                        >
                                          <img
                                            key={index}
                                            src={image}
                                            className="w-24 h-24 rounded-lg object-cover"
                                          />
                                        </div>
                                      ) : null
                                    )}
                                </div>

                                {showImageModal &&
                                  reviewIndex === mainindex && (
                                    <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
                                      <div
                                        className="bg-white p-4 sm:h-[auto] rounded-lg grid grid-cols-3 gap-2 h-auto mt-3"
                                        ref={imageModalRef}
                                      >
                                        <>
                                          {review.images.map((image, index) => (
                                            <img
                                              key={index}
                                              src={image}
                                              className={`w-24 h-24 rounded-lg  object-cover ${
                                                image === selectedImage
                                                  ? "border-4 border-blue-500"
                                                  : ""
                                              }`}
                                            />
                                          ))}
                                        </>
                                      </div>
                                    </div>
                                  )}
                              </div>
                              <p className="mt-3">{review.review}</p>
                            </div>
                          );
                        })
                      ) : (
                        <p>No Customer Reviews</p>
                      )}
                    </div>
                    {/* <MUIRating
                                  name="simple-controlled"
                                  value={value}
                                  onChange={(event, newValue) => {
                                    setValue(newValue);
                                  }}
                                /> */}
                  </div>
                  {item.manufacturer && (
                    <>
                      <p className="font-medium 2xs:mt-2 xs:mt-2 xs:text-lg sm:text-3xl md:text-base md:mt-3 sm:mt-5">
                        Manufacturer
                      </p>
                      <p className="2xs:text-sm xs:text-sm sm:mt-1 sm:text-2xl md:text-xs md:mt-0 font-light text-secondary">
                        {item.manufacturer}
                      </p>
                    </>
                  )}
                  {item.made_in && (
                    <>
                      <p className="font-medium 2xs:mt-2 xs:mt-2 xs:text-lg border-b border-[#e8e8e8e8] sm:text-3xl md:text-sm sm:mt-4 ">
                        Made In
                      </p>
                      <p className="2xs:text-sm 2xs:mb-2 xs:text-sm sm:mt-1 sm:text-2xl md:text-xs md:mt-0 font-light text-secondary">
                        {item.made_in}
                      </p>
                    </>
                  )}
                </div>
              </>
            );
          })}

        {/*  Similar products Page */}
      </div>

      {reviewOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="bg-white rounded top-[5%] left-[5%]">
            <div className="flex justify-center items-center relative">
              <div className="container relative  ">
                <button
                  className="absolute top-[5%] right-[5%]"
                  onClick={() => {
                    setReviewOpen(false);
                  }}
                >
                  <AiOutlineCloseCircle className="text-red text-2xl hover:opacity-50" />
                </button>
                <div className="w-full p-8 md:px-12 mr-auto rounded-2xl shadow-2xl">
                  <div className="flex justify-between">
                    <h1 className="font-bold  text-3xl">Write a review :</h1>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addReview();
                    }}
                  >
                    <div className="gap-5 mt-5">
                      <div className="border border-[#e8e8e8] p-3 rounded-lg">
                        <p className="  text-[gray] font-bold text-lg">
                          Rate your product:{" "}
                        </p>
                        <div className="flex mt-1 items-center">
                          <MUIRating
                            name="simple-controlled"
                            size="large"
                            value={value}
                            onChange={(event, newValue) => {
                              if (newValue === null) {
                                setValue(0);
                                return;
                              }
                              setValue(newValue);
                            }}
                          />

                          <div className="text-xl">({value})</div>
                        </div>
                      </div>

                      <label
                        className=" text-[gray] font-bold text-lg pl-3 inline-block mt-5"
                        htmlFor="images"
                      >
                        Add product images
                      </label>
                      <input
                        className="w-full bg-gray-100 border-gray-400 text-gray-900  p-3 rounded-lg  focus:shadow-outline"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={imagesHandler}
                        // value={logins.password}
                        name="review images"
                        id="images"
                      />

                      <label
                        className=" text-[gray] font-bold pl-3 text-lg inline-block mt-5"
                        htmlFor="text"
                      >
                        Add your Review
                      </label>
                      <textarea
                        className="w-full border border-[#e8e8e8] bg-gray-100 text-gray-900 mt-1 p-3 rounded-lg  focus:border-[black] "
                        type="text"
                        onChange={inputHandler}
                        name="review"
                        id="text"
                        value={review.text}
                        placeholder="Write your review"
                      />
                    </div>

                    <div className="mb-8 mt-6 flex items-center justify-between">
                      <button
                        // type="submit"
                        className="inline-block  bg-lime px-7 pb-2.5 pt-3 text-sm rounded-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
