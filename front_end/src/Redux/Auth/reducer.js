import { RESET_TOKEN_ROLE, SET_TOKEN_ROLE } from "../actionTypes"

const init = {
    token:"",
    role:'',
    name:'',
    email:'',
}


export const reducer = (state=init,{type,payload})=>{
   switch(type){
    case SET_TOKEN_ROLE: return {
        token:payload.token,
        role:payload.role,
        name:payload.name,
        email:payload.email};
        
    case RESET_TOKEN_ROLE: return init;
    default : return state;
   } 
}