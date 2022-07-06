import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useDispatch, useSelector } from "react-redux";
import { callForSingleBlog , callForGiveLikes, callForComments} from "../redux/blogs/actions";
import CustomizedProgressBars from "../components/Progress";
import {FcLike,FcLikePlaceholder} from 'react-icons/fc';
import CommentInputBox from "../components/CommentInputBox";

const SingleBlog = () => {
  const formatter = buildFormatter(englishStrings);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleBlog, loading, error , comments} = useSelector((state) => state.blogs);
  const {isAuth} = useSelector((state) => state.auth);
  const params = useParams();
  const id = params.id;
  const [categories,setCategories] = useState([]);
  const [giveLike,setGiveLike] = useState(false);
  const [showComments,setShowComments] = useState(false);
  const [like,setLike] = useState(0);
  const [commentCount,setCommentCount] = useState(0);

  useEffect(() => {
    if(!isAuth){
      navigate("/login")
    }
    dispatch(callForSingleBlog(id));
    dispatch(callForComments(id));
  }, []);
  useEffect(()=>{
    if(singleBlog){
      // setCategories(singleBlog.category);
      // setLike(singleBlog.likes.length);
      // setCommentCount(comments.length);
    }
  },[singleBlog,comments])

  const handleGiveLike = ()=>{
    let payload = {
      user : "62b740f282de52a4db7d1f39",
      blog : singleBlog._id
    }
    dispatch(callForGiveLikes(payload))
    setGiveLike((!giveLike));
    setLike(Number(like)+1);
  }

  const handleTakeLike = ()=>{
    setGiveLike((!giveLike));
    setLike(Number(like)-1)
  }
  const handleCommentSection = () => {
    setShowComments(!showComments)
  }
  console.log(singleBlog);
  return (
    <div className="overflow-hidden">
      {loading ? (
        <div className="w-[10%] m-auto">
          <CustomizedProgressBars />
        </div>
      ) : error ? (
        <div className="m-auto w-[20%]">
          <h1 className="text-2xl text-gray-600 ">Internal Server error</h1>
        </div>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-12">
            <div className="p-12 md:w-[78%] m-auto flex flex-col items-start">
              <div>
                {categories.map((el,index)=>{
                  return <span key={index} className="py-1 px-2 rounded bg-pink-50 text-sky-800 text-xs font-medium tracking-widest">
                    {el.name}
                  </span>
                })}
              </div>
              <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                {singleBlog.title}
              </h2>
              <p className="leading-relaxed mb-8">
                {singleBlog.body}
              </p>
              <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                {giveLike ? <FcLike onClick={handleTakeLike} className="cursor-pointer"/> : <FcLikePlaceholder onClick={handleGiveLike} className="cursor-pointer"/>}
                  {like}
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm cursor-pointer" onClick={()=>setShowComments(!showComments)}>
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
                  {commentCount}
                </span>
              </div>
              <a className="inline-flex items-center">
                <img
                  alt="blog"
                  src="https://dummyimage.com/104x104"
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                  {/* {singleBlog.user.name} */}
                  </span>
                  <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                    UI DEVELOPER
                  </span>
                  <h6 className="text-xs sm:text-xs text-gray-400 font-normal">
              (Last Updated -{" "}
              <TimeAgo date={singleBlog.updatedAt} formatter={formatter} />)
            </h6>
                </span>
              </a>
            </div>
          </div>
        </div>
      <CommentInputBox showComments={showComments} handleCommentSection={handleCommentSection}/>
      </section>
      )}

     
    </div>
  );
};

export default SingleBlog;
