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
import { Login } from "./Component/Login.jsx/Login";
import { ForgetPass } from "./Component/Login.jsx/ForgetPass";
import { Address } from "./Component/MyAddress/Address";
import { API_TOKEN } from "./Component/Token/Token";

const initialLoggedUserName = "User";

const loginReducer = (state, action) => {
  console.log(action);
  if (action.type === "LOGIN") state = action.payload;
  if (action.type === "LOGOUT") state = "User";
  return state;
};

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
  const [NavbarOpen, setNavbarOpen] = useState(true);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user_id, setUser_id] = useState("14");
  const [loggedUsername, dispatchLogin] = useReducer(
    loginReducer,
    initialLoggedUserName
  );

  useEffect(() => {
    const NavOpen = localStorage.getItem("NavbarOpen");
    if (NavOpen) {
      setNavbarOpen(JSON.parse(NavOpen));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("NavbarOpen", JSON.stringify(NavbarOpen));
  }, [NavbarOpen]);

  useEffect(() => {
    const LoggedInStatus = () => {
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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          loggedUsername={loggedUsername}
          NavbarOpen={NavbarOpen}
          setNavbarOpen={setNavbarOpen}
          setLoggedIn={setLoggedIn}
          dispatchLogin={dispatchLogin}
          user_id={user_id}
          setUser_id={setUser_id}
        />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                dispatchLogin={dispatchLogin}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setLoggedIn={setLoggedIn}
                user_id={user_id}
                setUser_id={setUser_id}
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
                isOpen={isOpen}
                setIsOpen={setIsOpen}
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
                isOpen={isOpen}
                user_id={user_id}
                setUser_id={setUser_id}
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
                user_id={user_id}
                setUser_id={setUser_id}
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
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <Payment
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                NavbarOpen={NavbarOpen}
                setNavbarOpen={setNavbarOpen}
                setData={true}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
          />

          <Route
            path="/wallet"
            element={<Wallet setIsOpen={setIsOpen} isOpen={isOpen} />}
          />

          <Route
            path="/reset"
            element={<ForgetPass isOpen={isOpen} setIsOpen={setIsOpen} />}
          />

          <Route
            path="/success"
            element={
              <Success
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                NavbarOpen={NavbarOpen}
                setNavbarOpen={setNavbarOpen}
              />
            }
          />
          <Route
            path="/address"
            element={
              <Address
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                user_id={user_id}
                setUser_id={setUser_id}
              />
            }
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
                isOpen={isOpen}
                setIsOpen={setIsOpen}
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
