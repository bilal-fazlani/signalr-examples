import {combineReducers} from "redux";
import { routerReducer } from 'react-router-redux'
import employees from "./employees";
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
    routing: routerReducer,
    form: reduxFormReducer,
    employees
})