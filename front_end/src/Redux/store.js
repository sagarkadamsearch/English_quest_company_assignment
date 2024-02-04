
import {combineReducers, legacy_createStore} from "redux"
import { reducer as registerReducer } from "./Register/reducer";
import {reducer as authReducer} from "./Auth/reducer"

const allReducer = combineReducers({
    registerReducer,
    authReducer
})


export const store = legacy_createStore(allReducer)