import React from 'react'
import { AiTwotoneBank, AiTwotoneSafetyCertificate, AiTwotoneWallet } from 'react-icons/ai'
import { FaBell, FaFileContract, FaFoursquare, FaHome, FaMoneyBill, FaRegAddressBook, FaWallet } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export const Aside = () => {
  return (
    <>
         <div className='max-w-[100%]'>
          <ul className="font-medium w-full">
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/address"}>
                <a
                  to="/address"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:hover:bg-gray-700"
                >
                  <FaHome className="text-darkgray text-[25px]" />
                  <span className="ml-3 text-light_gray  text-lg font-light">
                    My Address
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg ">
              <NavLink to={"/myorder"}>
                <a
                  to="/myorder"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaRegAddressBook className="text-darkgray text-[25px]" />
                  <span className="flex-1 ml-3 text-lightgray text-lg  font-thin">
                    My Order
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/about"}>
                <a
                  to="#"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaBell className="text-darkgray text-[25px]" />
                  <span className="flex-1 ml-3  text-lightgray text-lg  font-normal">
                    About_Us
                  </span>
                </a>
              </NavLink>
            </li>

            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/contact"}>
                <a
                  to="#"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaFileContract className="text-darkgray text-[25px]" />
                  <span className="flex-1 ml-3  text-lightgray text-lg  font-normal">
                    Contact
                  </span>
                </a>
              </NavLink>
            </li>
            

            {/* <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/payment"}>
                <a
                  to="#"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AiTwotoneBank className="text-darkgray text-lg" />
                  <span className="flex-1 ml-3  text-lightgray xs:text-xs font-normal">
                    Payment
                  </span>
                </a>
              </NavLink>
            </li> */}

            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/wallet"}>
                <a
                  to="/wallet"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AiTwotoneWallet className="text-darkgray text-[25px]" />
                  <span className="flex-1 ml-3  text-lightgray text-lg  font-normal">
                    My Wallet
                  </span>
                </a>
              </NavLink>
            </li>
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/privacy"}>
                <a
                  to="#"
          
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AiTwotoneSafetyCertificate className="text-darkgray text-[25px]" />
                  <span className="flex-1 ml-3  text-lightgray text-lg  font-normal">
                    Privacy
                  </span>
                </a>
              </NavLink>
            </li>
           
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/conditons"}>
                <a
                  to="#"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaBell className="text-darkgray text-[25px]" />
                  <span className="flex-1 ml-3  text-lightgray text-lg  font-normal">
                    Term & Conditons
                  </span>
                </a>
              </NavLink>
            </li>
            
            <li className="border border-light_gray mb-2 shadow-lg">
              <NavLink to={"/faq"}>
                <a
                  to="#"
                  className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaFoursquare className="text-darkgray text-[25px]" />
                  <span className="flex-1 ml-3  text-lightgray text-lg  font-normal">
                    FAQ
                  </span>
                </a>
              </NavLink>
            </li>
          </ul>
        </div>
    </>
  )
}
