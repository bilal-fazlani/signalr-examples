import {EMPLOYEES_LOADED, EMPLOYEES_REQUESTED} from "../constants";

/*
employees : {
    data : [],
    loading : false
}
 */
export default (state = {}, action) => {
    switch (action.type){
        case EMPLOYEES_REQUESTED:
            return {...state, loading : true};
        case EMPLOYEES_LOADED:
            return {...state, loading : false, data: action.employees};
        default:
            return state;
    }

};

export const getEmployeesAsync = () =>{
    return async dispatch => {
        dispatch({
            type: EMPLOYEES_REQUESTED
        });

        const response = await fetch('http://localhost:5000/employees');
        const employees = await response.json();

        dispatch({
            type: EMPLOYEES_LOADED,
            employees
        });
    };
};