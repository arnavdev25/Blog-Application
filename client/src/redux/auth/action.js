import axios from 'axios';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginSuccess = (token)=>({
    type: LOGIN_SUCCESS,
    payload: token
})


export const loginFailure = ()=>({
    type: LOGIN_FAILURE
})



export const callForLogin = (payload)=>(dispatch)=>{
    axios.post(`http://localhost:8080/users/login`,payload)
    .then(({data})=>{
        console.log(data)
        dispatch(loginSuccess(data.token))})
    .catch((err)=>console.log(err))
}

export const callForRegister = (payload)=>()=>{
    axios.post(`http://localhost:8080/users/register`,payload)
    .then(({data})=>console.log(data))
    .catch((err)=>console.log(err))
}
