import { loadData, saveData } from "../../utils/localStorage"
import { LOGIN_FAILURE, LOGIN_SUCCESS } from "./action"

let token = loadData("token");

const iniState = {
    isAuth: token?true:false,
    token: token || ""
}

export const authReducer = (state=iniState,{type,payload})=>{
    switch (type) {
        case LOGIN_SUCCESS: 
        saveData("token",payload)
        return{
            ...state,
            isAuth: true,
            token: payload
        }
        case LOGIN_FAILURE:
            return{
                ...state,
                isAuth: false,
                token: ""
            }
    
        default:
            return state
    }
}