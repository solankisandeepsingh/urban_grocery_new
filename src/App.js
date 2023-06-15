import { Navbar } from "./Component/Header/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { Myprofile } from "./Component/User-Account/Myprofile";
import { Success } from "./Component/Payment/Success";
import { Wallet } from "./Component/MyWallet/Wallet";
import { Aside } from "./Component/User-Account/Aside";
import { Login } from "./Component/Login.jsx/Login";
import { ForgetPass } from "./Component/Login.jsx/ForgetPass";
import { Address } from "./Component/MyAddress/Address";
import { API_TOKEN } from "./Component/Token/Token";

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
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const LoggedInStatus = () => {
      const token = localStorage.getItem(`${API_TOKEN}`);
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    LoggedInStatus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("your_login_token", `${API_TOKEN}`);
    setLoggedIn(true);
  };

  return (
    <>
      {loggedIn ? (
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
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  data={data}
                  addItem={addItem}
                  setAddItem={setAddItem}
                  setData={setData}
                  showSearchBar={showSearchBar}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              }
            />
            <Route
              path="/subcategory-details/:category_name/product-details/:id"
              element={
                <ProductDetails
                  setAddItem={setAddItem}
                  addItem={addItem}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              }
            />

            <Route
              path="/subcategory-details/:category_id"
              element={
                <SubCategory
                  setAddItem={setAddItem}
                  addItem={addItem}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
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
                />
              }
            />
            <Route path="/payment" element={<Payment />} />
            {/* <Route path="/account" element={<Account />} /> */}
            <Route
              path="/wallet"
              element={<Wallet setIsOpen={setIsOpen} isOpen={isOpen} />}
            />
            {/* <Route path="/myprofile" element={<Myprofile/>} /> */}
            <Route path="/aside" element={<Aside />} />
            <Route
              path="/reset"
              element={<ForgetPass isOpen={isOpen} setIsOpen={setIsOpen} />}
            />

            <Route path="/success" element={<Success />} />
            <Route
              path="/address"
              element={<Address isOpen={isOpen} setIsOpen={setIsOpen} />}
            />
            <Route
              path="/login"
              element={<Login setIsOpen={setIsOpen} isOpen={isOpen} />}
            />
            <Route
              path="/faq"
              element={<Faq isOpen={isOpen} setIsOpen={setIsOpen} />}
            />
            <Route
              path="/myorder"
              element={
                <MyOrder
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  setAddItem={setAddItem}
                  addItem={addItem}
                  price={price}
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
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              }
            />
          </Routes>
        </div>
      ) : (
        <>
          <Login onClick={handleLogin} />
        </>
      )}
    </>
  );
}

export default App;
