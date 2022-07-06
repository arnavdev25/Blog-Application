import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Create from '../components/Create'
import {useSelector} from 'react-redux';

const CreateBlog = () => {
  const {isAuth} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isAuth){
      navigate("/login");
    }
  },[])
  return (
    <div>
      <Create/>
    </div>
  )
}

export default CreateBlog
