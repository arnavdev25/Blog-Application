import React, { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { postComment,callForComments } from "../redux/blogs/actions";

const CommentInputBox = ({ showComments , handleCommentSection}) => {
  const dispatch = useDispatch();
  const { singleBlog,comments } = useSelector((state) => state.blogs);
  const [c,setC] = useState("");
  const [com,setCom] = useState([]);
  useEffect(()=>{
    setCom(comments);
  },[showComments,comments]);

  const handleCommentSubmit = (e)=>{
    e.preventDefault();
    const payload = {
      blog: singleBlog._id,
      user : "62b740f282de52a4db7d1f39",
      comment: c
    }
    dispatch(postComment(payload));
    dispatch(callForComments(singleBlog._id));
  }
  return (
    <>
      <div className={`border border-gray-300 shadow-md h-full w-[50%] md:w-[30%] transition-all duration-500 bg-white absolute top-0 ${showComments?"right-0":"right-[-420px]"} overflow-auto`}>
        <div className="flex justify-between mt-3 px-3 items-center border-b pb-2">
          <h2 className="text-md sm:text-2xl">Comments</h2>
          <VscClose className="text-md sm:text-2xl" onClick={handleCommentSection}/>
        </div>
        <form onSubmit={handleCommentSubmit} className="flex items-center p-[10px] mt-3">
              {/* <FiSmile className="h-6 w-6" /> */}
              <input
                type="text"
                value={c}
                onChange={(e)=>setC(e.target.value)}
                placeholder="Add a comment..."
                className="border-none flex-1 outline-none focus:outline-blue-400 ml-2 rounded-md"
              />
              <button type="submit" className="font-semibold text-blue-400 ml-1">post</button>
            </form>

            
              <div className="mt-6">
              <h1 className="ml-3 text-2xl border-b pb-2">Most Relevant</h1>

              {com.map((el,ind)=>{
                return (
                  <div key={ind} className="border border-gray-200 shadow-md w-[95%] m-auto mt-3 p-3">
              <a className="inline-flex items-center">
                <img
                  alt="blog"
                  src="https://dummyimage.com/104x104"
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                  {el.user.name}
                  </span>
                  <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                    UI DEVELOPER
                  </span>
                  {/* <h6 className="text-xs sm:text-xs text-gray-400 font-normal">
              (Last Updated -{" "}
              )
            </h6> */}
                </span>
              </a>
              <p>{el.comment}</p>
              </div>
                )
              })}
              
            </div>
           
      </div>
    </>
  );
};

export default CommentInputBox;
