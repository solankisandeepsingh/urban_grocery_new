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
import { ForgetPass } from "./Component/Login.jsx/ForgetPass";
import { Address } from "./Component/MyAddress/Address";
import { Privacy } from "./Component/Privacy/Privacy";
import { Coditions } from "./Component/Term & Conditions/Coditions";
import { Contact } from "./Component/Contact/Contact";
import { About } from "./Component/About/About";
import { API_TOKEN } from "./Component/Token/Token";
import Loader from "./Component/Loader";
import Review from "./Component/MyCart/Review/Review";

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
  const [loading, setLoading] = useState(true);
  const [user_id, setUser_id] = useState("14");

  useEffect(() => {
    localStorage.setItem("NavbarOpen", JSON.stringify(NavbarOpen));
  }, [NavbarOpen]);

  useEffect(() => {
    const LoggedInStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
      } else {
        // dispatchLogin({ type: "LOGOUT" });
        setLoggedIn(false);
      }
      setLoading(false);
    };
    LoggedInStatus();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Navbar
          setData={setData}
          addItem={addItem}
          setAddItem={setAddItem}
          formData={formData}
          setFormdata={setFormdata}
          setShowSearchBar={setShowSearchBar}
          name={name}
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
                setLoggedIn={setLoggedIn}
                user_id={user_id}
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

          <Route path="/reset" element={<ForgetPass />} />

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
                setAddItem={setAddItem}
                addItem={addItem}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
