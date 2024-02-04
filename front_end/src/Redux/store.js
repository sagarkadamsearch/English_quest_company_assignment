
import {combineReducers, legacy_createStore} from "redux"
import { reducer as registerReducer } from "./Register/reducer";


const allReducer = combineReducers({
    registerReducer
})


export const store = legacy_createStore(allReducer)