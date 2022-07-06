import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {BiSearchAlt} from 'react-icons/bi';
import Logo from '../assets/logo.svg';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {useSelector} from 'react-redux';

const Navbar = () => {
  const {isAuth} = useSelector((state) => state.auth);
  const [visibility,setVisibility] = useState(false);
  return (
    <div className="w-[90%] m-auto p-2 mb-10">
    <div className="flex w-full justify-between items-center border-b-gray-300 border-b-[1px] pb-2">
      <div className="cursor-pointer">
      <Link to="/">
        <img className="h-[30px]" src={Logo} alt="Logo" />
      </Link>
      </div>
      <h1 className="text-3xl font-normal text-gray-700">Blogo</h1>
      <div className="flex gap-2 items-center">
        <BiSearchAlt className="text-xl"/>
        <Link to="/login">
        <div className="cursor-pointer border-blue-900 border-[1.5px] rounded-md px-2 hover:border-blue-500 text-sky-700 font-semibold">{isAuth?"Logout":"Login"}</div>
        </Link>
      </div>
    </div>
    <div className="pt-2">
      <ul className="flex gap-x-6 text-gray-700">
        <li className="hover:underline"> <Link to="/blogs">All Blogs</Link> </li>
        <li className="hover:underline"> <Link to="/blogs/create">Create Blog</Link> </li>
        <li className="hover:underline"> <Link to="/blogs/trash">Deleted Blogs</Link> </li>
        <li className="cursor-pointer relative"> <a onClick={()=>setVisibility(!visibility)}>Categories<MdKeyboardArrowDown className="inline"/></a>
            {visibility && <div className="absolute border border-gray-300 w-full shadow-md p-1 z-10 bg-white">
              <ul>
                <li> <Link onClick={()=>setVisibility(!visibility)} to="/blogs/category/horror"> horror </Link></li>
                <li> <Link onClick={()=>setVisibility(!visibility)} to="/blogs/category/movies"> movies </Link></li>
                <li> <Link onClick={()=>setVisibility(!visibility)} to="/blogs/category/education"> education </Link></li>
                <li> <Link onClick={()=>setVisibility(!visibility)} to="/blogs/category/business"> business </Link></li>
              </ul>
            </div> }       
         </li>
      </ul>
      
    </div>
    </div>
  )
}

export default Navbar
