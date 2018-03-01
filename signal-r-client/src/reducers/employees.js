import {EMPLOYEE_LOADED, EMPLOYEE_REQUESTED, EMPLOYEES_LOADED, EMPLOYEES_REQUESTED} from "../constants";

/*
employees : {
    data : [],
    loading : false
}
 */
export default (state = {}, action) => {
    switch (action.type){
        case EMPLOYEE_REQUESTED:
        case EMPLOYEES_REQUESTED:
            return {...state, loading : true};
        case EMPLOYEES_LOADED:
            return {...state, loading : false, data: action.employees};
        case EMPLOYEE_LOADED:
            const targetState = {...state, loading : false};
            if(!targetState.data) targetState.data = [];
            targetState.data.push(action.employee);
            return targetState;
        default:
            return state;
    }

};

export const loadEmployeesAsync = () =>{
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

export const loadEmployeeAsync = (id) =>{
    return async dispatch => {
        dispatch({
            type: EMPLOYEE_REQUESTED
        });

        const response = await fetch('http://localhost:5000/employees/' + id);

        const employee = await response.json();

        dispatch({
            type: EMPLOYEE_LOADED,
            employee
        });
    };
};