import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux'
import employees from "./employees";

export default combineReducers({
    routing: routerReducer,
    employees
})