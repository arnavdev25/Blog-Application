import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callForCategoryBlogs } from "../redux/blogs/actions";
import CustomizedProgressBars from "../components/Progress";
import {FcLike} from 'react-icons/fc';

const CategoryPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { categoryBlogs, loading, error} = useSelector((state) => state.blogs);
  const name = params.name;
  useEffect(() => {
    dispatch(callForCategoryBlogs(name));
  }, [name]);
  return (
    <div>
      {loading ? (
        <div className="w-[10%] m-auto">
          <CustomizedProgressBars />
        </div>
      ) : error ? (
        <div className="m-auto w-[20%]">
          <h1 className="text-2xl text-gray-600 ">Internal Server error</h1>
        </div>
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-wrap -m-4">
            {categoryBlogs.map((el)=>{
                return (
                    <div className="p-4 lg:w-1/3">
                <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <div className="flex gap-2 justify-center">
                    {el.category.map((ele)=> {return <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{ele.name}</h2>})}
                  </div>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    {el.title}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {el.body.split(" ").splice(0,40).join(" ")}
                  </p>
                  <Link to={`/blogs/${el._id}`} className="text-indigo-500 inline-flex items-center">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                    <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                     <FcLike/>
                      {el.likes?el.likes.length:0}
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      {el.comments.length?el.comments.length:0}
                    </span>
                  </div>
                </div>
              </div>
                )
            })}
              
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoryPage;
