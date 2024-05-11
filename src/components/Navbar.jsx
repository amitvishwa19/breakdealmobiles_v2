'use client'
import { useEffect, useState } from "react";
import { close, logo, menu, logo_dark, logo_light } from "@/assets";
import { navLinks } from "../constants";
import styles, { layout } from "@/app/style";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const path = usePathname()



  const getRoute = () => {
    //console.log('path', path.pathname)
  }



  const setPath = (link) => {
    console.log('link', link)
    console.log('path', path.pathname)
    //path === link ? setActive(path) : ''
  }



  return (
    <div className={` w-full l items-center  bg-slate-900 p-4 z-20`}>
      <div >
        <nav className="w-full flex  justify-between items-center navbar">

          <Link href={'/'}><img src={logo_dark.src} alt="breakdealmobiles" className="w-[220px] h-[25px]" /></Link>

          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            <li className={`font-poppins  cursor-pointer text-[16px] mr-10 ${path === '/' ? "text-slate-800 bg-gray-100 p-2 rounded-xl font-bold" : "text-gray-100"} `} >
              <Link href='/' onClick={() => { }}>Home</Link>
            </li>
            <li className={`font-poppins  cursor-pointer text-[16px] mr-10 ${path === '/product' ? "text-slate-800 bg-gray-100 p-2 rounded-xl font-bold" : "text-gray-100"} `} >
              <Link href='/product' onClick={() => { }}>Product</Link>
            </li>
            <li className={`font-poppins  cursor-pointer text-[16px] mr-10 ${path === '/about' ? "text-slate-800 bg-gray-100 p-2 rounded-xl font-bold" : "text-gray-100"} `} >
              <Link href='/about' onClick={() => { }}>About</Link>
            </li>
            <li className={`font-poppins  cursor-pointer text-[16px] mr-10 ${path === '/contact' ? "text-slate-800 bg-gray-100 p-2 rounded-xl font-bold" : "text-gray-100"} `} >
              <Link href='/contact' onClick={() => { }}>Contact</Link>
            </li>
          </ul>

          <div className="sm:hidden flex flex-1 justify-end items-center z-50">
            <img
              src={toggle ? close.src : menu.src}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${!toggle ? "hidden" : "flex"
                } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col">


                <li className={`font-poppins cursor-pointer text-[16px] mb-4 ${path === '/' ? "text-slate-800 bg-gray-100 p-2  px-4 rounded-xl font-bold" : "text-dimWhite"} `} >
                  <Link href='/' onClick={() => { }}>Home</Link>
                </li>
                <li className={`font-poppins cursor-pointer text-[16px] mb-4 ${path === '/product' ? "text-slate-800 bg-gray-100 p-2 px-4 rounded-xl font-bold" : "text-dimWhite"} `} >
                  <Link href='/product' onClick={() => { }}>Product</Link>
                </li>
                <li className={`font-poppins cursor-pointer text-[16px] mb-4 ${path === '/about' ? "text-slate-800 bg-gray-100 p-2  px-4 rounded-xl font-bold" : "text-dimWhite"} `} >
                  <Link href='/about' onClick={() => { }}>About</Link>
                </li>
                <li className={`font-poppins cursor-pointer text-[16px] mb-4 ${path === '/contact' ? "text-slate-800 bg-gray-100 p-2  px-4 rounded-xl font-bold" : "text-dimWhite"} `} >
                  <Link href='/contact' onClick={() => { }}>Contact</Link>
                </li>




              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
