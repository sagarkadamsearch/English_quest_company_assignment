import { SET_EMAIL, SET_NAME, SET_PASSWORD, SET_ROLE } from "../actionTypes"


export const handleRegisterName = (payload)=>{
    return {type:SET_NAME,payload}
} 

export const handleRegisterEmail = (payload)=>{
    return {type:SET_EMAIL,payload}
} 

export const handleRegisterPassword = (payload)=>{
    return {type:SET_PASSWORD,payload}
} 

export const handleRegisterRole = (payload)=>{
    return {type:SET_ROLE,payload}
}