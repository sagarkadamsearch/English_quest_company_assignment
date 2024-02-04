import { RESET_TOKEN_ROLE, SET_TOKEN_ROLE } from "../actionTypes"




export const set_Token_AND_Role = (payload)=>{
return {type:SET_TOKEN_ROLE,payload};
}

export const reset_Token_And_Role = ()=>{
    return {type:RESET_TOKEN_ROLE};
}