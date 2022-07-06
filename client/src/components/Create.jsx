import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callForCategories, callForUsers,callForCreateBlog } from "../redux/blogs/actions.js";
import axios from "axios";
import CustomizedProgressBars from "../components/Progress";

const Create = () => {
  const dispatch = useDispatch();
  const { categories, users, loading, error } = useSelector(
    (state) => state.blogs
  );
  const [form, setForm] = useState({
    title: "",
    body: "",
    user:"",
  });
  const [category,setCategory] = useState({})
  useEffect(() => {
    dispatch(callForUsers());
    dispatch(callForCategories());
  }, []);
  const handleChange = (e) => {
    let input = e.target.name;
    setForm({
      ...form,
      [input]: e.target.value,
    });
  };
  const handleCategoryChange = (e)=>{
    let input = e.target.name;
    setCategory({
      ...category,
    [input]: e.target.checked
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = {category: category};
     dispatch(callForCreateBlog(form,temp));
    setForm({
      title: "",
      body: "",
      user:""
    });
    alert("Blog added to All Blogs");
  };
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
        <div>
          <div className="w-[70%] m-auto">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <h1 className="ml-3 text-xl font-bold text-gray-800">
                Create your own Blog
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={(e) => handleChange(e)}
                            className="block w-full sm:text-sm border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Title"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="body"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Blog Content
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={form.body}
                          name="body"
                          onChange={(e) => handleChange(e)}
                          rows={3}
                          className="shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Your Content"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-[50%]">
                        <label
                          htmlFor="user"
                          className="block text-sm font-medium text-gray-700"
                        >
                          User
                        </label>
                        <select
                          id="userName"
                          name="user"
                          autoComplete="user-name"
                          value={form.user}
                          onChange={(e) => handleChange(e)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="----">----</option>
                          {users.map((el) => {
                            return (
                              <option key={el._id} value={el._id}>
                                {el.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <fieldset className="w-[35%]">
                        <legend className="sr-only">Category</legend>
                        <div
                          className="text-base font-medium text-gray-900"
                          aria-hidden="true"
                        >
                          Category
                        </div>
                        <div className="mt-4 space-y-4">
                          {categories.map((el) => {
                            return (
                              <div key={el._id} className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input
                                    id={el.name}
                                    name={el.name}
                                    type="checkbox"
                                    onChange={(e)=>handleCategoryChange(e)}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor={el.name}
                                    className="font-medium text-gray-700"
                                  >
                                    {el.name}
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
