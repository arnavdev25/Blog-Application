import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const EditPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const [form,setForm] = useState({
        title: "",
        body:"",
    })
    useEffect(()=>{
      axios.get(`http://localhost:8080/blogs/${id}`).then(({data})=>setForm({
        title: data.blog.title,
        body: data.blog.body,
      }));
    },[])
    const handleChange = (e)=>{
        let input = e.target.name;
        setForm({
            ...form,
            [input]: e.target.value,
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/blogs/${id}`,form);
        setForm({
            title: "",
        body:"",
        })
        alert("Blog updated");
        navigate("/blogs")
    }
  return (
    <div>
     <div>
        <div className="w-[70%] m-auto" >
          <div className="mt-5 md:mt-0 md:col-span-2">
        <h1 className="ml-3 text-xl font-bold text-gray-800">Create your own Blog</h1>
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={(e)=>handleChange(e)}
                          className="focus:border-sky-500  block w-full sm:text-sm border border-gray-300 rounded-md p-1  "
                          placeholder="Title"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                      Blog Content
                    </label>
                    <div className="mt-1">
                      <textarea
                        value={form.body}
                        name="body"
                        onChange={(e)=>handleChange(e)}
                        rows={3}
                        className="shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Your Content"
                      />
                    </div>
                   
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


export default EditPage
