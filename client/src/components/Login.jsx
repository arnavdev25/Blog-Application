import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ()=> {
   
    const navigate = useNavigate();
    // const {isAuth,token} = useSelector((state)=>state.auth)
    const [userData,setUserData] = useState({
        email:"",
        password:""
    })
    const handleChange = (e)=>{
        let inputName = e.target.name;
        setUserData({
            ...userData,
            [inputName]: e.target.value
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        // dispatch(callForLogin(userData));
    }
    // useEffect(()=>{
    //     if(isAuth){
    //         navigate("/blogs")
    //     }
    //     console.log(isAuth)
    // },[isAuth])
  return (
    <>
     
      <div className=''>
       
          
           
            <h2>Login in to your account</h2>
            
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            
            <div>
              <div>
                <label htmlFor="email-address" >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                />
              </div>
              <input type="submit" value="Login" className='btn'/>
            </div>

         
           
          </form>
          <div>
                <Link to="/signin">
                  New User?
                </Link>
                <a href="https://github.com/login/oauth/authorize?client_id=948a7d9167377daf905e" >
                  Github
                </a>
              </div>
        </div>
      
    </>
  )
}

export default Login
