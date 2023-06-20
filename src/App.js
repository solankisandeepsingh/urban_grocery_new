import { Navbar } from "./Component/Header/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { ProductDetails } from "./Component/Products/Product-Details/ProductDetails";
import Home from "./Component/Home";
import { useEffect, useReducer, useState } from "react";
import Payment from "./Component/Payment/Payment";
import "./index.css";
import { SubCategory } from "./Component/Category/Sub-Category/SubCategory";
import FilterData from "./Component/FilterData";
import Allproducts from "./Component/Products/Allproducts";
import { Faq } from "./Component/FAQ/Faq";
import { MyOrder } from "./Component/My-Order/MyOrder";
import { Success } from "./Component/Payment/Success";
import { Wallet } from "./Component/MyWallet/Wallet";
import { Aside } from "./Component/User-Account/Aside";
import { Login } from "./Component/Login.jsx/Login";
import { ForgetPass } from "./Component/Login.jsx/ForgetPass";
import { Address } from "./Component/MyAddress/Address";
import { API_TOKEN } from "./Component/Token/Token";
import { isDisabled } from "@testing-library/user-event/dist/utils";


const initialLoggedUserName = "User"

const loginReducer = (state, action) => {
  console.log(action);
    if(action.type === "LOGIN")
        state = action.payload
    if(action.type === "LOGOUT")
      state = "User"
    return state
}

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
  const [hideNav,setHideNav] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loggedUsername, dispatchLogin] = useReducer(loginReducer, initialLoggedUserName)
 

  useEffect(() => {
    const LoggedInStatus = () => {
      // console.log(localStorage.getItem(`${API_TOKEN}`));
      const token = localStorage.getItem(`token`);
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    };

    LoggedInStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogin = (e) => {

    e.preventDefault();
    localStorage.setItem("token",`${API_TOKEN}`);
    setLoggedIn(true);
  };

  return (
    <>
      {/* {loggedIn ? ( */}
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
            loggedUsername={loggedUsername}
          />
          <Routes>


          <Route
              path="/login"
              element={<Login onClick={handleLogin} dispatchLogin={dispatchLogin} setIsOpen={setIsOpen} isOpen={isOpen} setLoggedIn={setLoggedIn} />}
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
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  setHideNav={setHideNav}
                  hideNav={hideNav}
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
            <Route
              path="/payment"
              element={<Payment  setIsOpen={setIsOpen} isOpen={isOpen} hideNav={isDisabled} setHideNav={isDisabled} />}
             
            />
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
      {/* ) : (
        <>
          <Login onClick={handleLogin} dispatchLogin={dispatchLogin}  />
        </>
      )} */}
    </>
  );
}

export default App;
