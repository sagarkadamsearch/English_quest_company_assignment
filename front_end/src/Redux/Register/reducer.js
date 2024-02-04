import { HANDLE_REGISTER_RESET, SET_EMAIL, SET_NAME, SET_PASSWORD, SET_ROLE } from "../actionTypes"

const init = {
    name:"",
    email:"",
    password:"",
    role:""
}


export const reducer = (state=init,{type,payload})=>{
   switch(type){
    case SET_NAME: return {...state,name:payload};
    case SET_EMAIL : return {...state,email:payload};
    case SET_PASSWORD :return {...state,password:payload};
    case SET_ROLE : return {...state,role:payload};
    case HANDLE_REGISTER_RESET: return init;
    default : return state;
   } 
}