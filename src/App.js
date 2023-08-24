import { Navbar } from "./Component/Header/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { ProductDetails } from "./Component/Products/Product-Details/ProductDetails";
import Home from "./Component/Home";
import { useEffect, useState } from "react";
import Payment from "./Component/Payment/Payment";
import "./index.css";
import { SubCategory } from "./Component/Category/Sub-Category/SubCategory";
import FilterData from "./Component/FilterData";
import Allproducts from "./Component/Products/Allproducts";
import { Faq } from "./Component/FAQ/Faq";
import { MyOrder } from "./Component/My-Order/MyOrder";
import { Success } from "./Component/Payment/Success";
import { Wallet } from "./Component/MyWallet/Wallet";
import { Login } from "./Component/Login.jsx/Login";
import { Address } from "./Component/MyAddress/Address";
import { Privacy } from "./Component/Privacy/Privacy";
import { Coditions } from "./Component/Term & Conditions/Coditions";
import { Contact } from "./Component/Contact/Contact";
import { About } from "./Component/About/About";
import { API_TOKEN } from "./Component/Token/Token";
import Loader from "./Component/Loader";
import Review from "./Component/MyCart/Review/Review";
import { OrderDetails } from "./Component/Order-Details/OrderDetails";
import { MyProfile } from "./Component/Profile/MyProfile";
import { OrderDetailsPage } from "./Component/Order-Details/OrderDetailsPage";
import Search from "./Component/Header/Search/Search";
import { FavPage } from "./Component/Favourites/FavPage";
import { Footer } from "./Component/Footer/Footer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [addItem, setAddItem] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormdata] = useState({
    username: "",
    address: "",
    city: "",
    phone: "",
    pin: "",
  });

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [name, setName] = useState("");
  const [NavbarOpen, setNavbarOpen] = useState(true);
  const [price, setPrice] = useState(0);
  // const [loading, setLoading] = useState(true);
  const [user_id, setUser_id] = useState("14");

  useEffect(() => {
    localStorage.setItem("NavbarOpen", JSON.stringify(NavbarOpen));
  }, [NavbarOpen]);

  // useEffect(() => {
  //   const LoggedInStatus = () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       setLoggedIn(true);
  //     } else {
  //       // dispatchLogin({ type: "LOGOUT" });
  //       setLoggedIn(false);
  //     }
  //     setLoading(false);
  //   };
  //   LoggedInStatus();
  // });
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <Navbar
          setData={setData}
          addItem={addItem}
          setAddItem={setAddItem}
          formData={formData}
          setFormdata={setFormdata}
          setShowSearchBar={setShowSearchBar}
          name={name}
          // loggedIn={loggedIn}
          setName={setName}
          // loggedUsername={loggedUsername}
          NavbarOpen={NavbarOpen}
          setNavbarOpen={setNavbarOpen}
          setLoggedIn={setLoggedIn}
          // dispatchLogin={dispatchLogin}
          // user_id={user_id}
          setUser_id={setUser_id}

          // handleLogin={handleLogin}
        />
        <Loader />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                // dispatchLogin={dispatchLogin}
                // setLoggedIn={setLoggedIn}
                // user_id={user_id}
                setUser_id={setUser_id}
                // handleLogin={handleLogin}
              />
            }
          />

          <Route
            path="/"
            element={
              <Home
                data={data}
                addItem={addItem}
                setAddItem={setAddItem}
                setData={setData}
                showSearchBar={showSearchBar}
                user_id={user_id}
                setUser_id={setUser_id}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/subcategory-details/:category_name/product-details/:id"
            element={
              <ProductDetails
                setAddItem={setAddItem}
                addItem={addItem}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          />

          <Route
            path="/subcategory-details/:category_id"
            element={
              <SubCategory
                setAddItem={setAddItem}
                addItem={addItem}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          />
          <Route
            path="/search"
            element={
              <FilterData
                setData={setData}
                setName={setName}
                data={data}
                name={name}
                addItem={addItem}
                setAddItem={setAddItem}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <Payment
                NavbarOpen={NavbarOpen}
                setNavbarOpen={setNavbarOpen}
                setData={true}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          />

          {/* <Route
            path="/review"
            element={
              <Review
                NavbarOpen={NavbarOpen}
                setNavbarOpen={setNavbarOpen}
                setData={true}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          /> */}

          <Route path="/wallet" element={<Wallet />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/conditons" element={<Coditions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/orderdetailspage" element={<OrderDetailsPage />} />
          <Route path="/favpage" element={<FavPage />} />

          <Route
            path="/success"
            element={
              <Success NavbarOpen={NavbarOpen} setNavbarOpen={setNavbarOpen} />
            }
          />
          <Route
            path="/address"
            element={<Address user_id={user_id} setUser_id={setUser_id} />}
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route
            path="/myorder"
            element={
              <MyOrder
                setAddItem={setAddItem}
                addItem={addItem}
                price={price}
                user_id={user_id}
                setUser_id={setUser_id}
                setPrice={setPrice}
              />
            }
          />

          <Route
            path="/allproducts"
            element={
              <Allproducts
                name={name}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          />
        </Routes>
        <div className="bg-[#212122]  border w-full mt-4 border-white text-center ">
              <footer className="bg-gray-800 ">
                {/* <div className="container mx-auto px-6 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-4">About Us</h3>
                      <p className="text-sm">
                        About Us Urban-Grocery is one of the most selling and
                        trending&nbsp; Grocery, Food Delivery, Fruits &amp;
                        Vegetable store, Full Android eCommerce &amp; Website.
                        which is helps to create your own app and web with your
                        brand name.
                      </p>
                    </div>
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-4">
                        Quick Links
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            to={"/"}
                            className="text-gray-300 hover:text-white"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/allproducts"}
                            className="text-gray-300 hover:text-white"
                          >
                            Products
                          </Link>
                        </li>
                        <li>
                          <a to="#" className="text-gray-300 hover:text-white">
                            Services
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                      <p className="text-sm">123 Street, City, State</p>
                      <p className="text-sm">Email: info@example.com</p>
                      <p className="text-sm">Phone: 123-456-7890</p>
                    </div>
                  </div>
              
                  <div className="text-white text-sm text-center mt-6">
                    <p>&copy; 2023 Urban Grocery. All rights reserved.</p>
                    <p>Terms of Service | Privacy Policy</p>
                  </div>
                </div> */}

                <div className="text-white text-sm mt-4 mb-4">
                  <Footer/>
                </div>
              </footer>
            </div>
      </div>
     
    </>
  );
}

export default App;
