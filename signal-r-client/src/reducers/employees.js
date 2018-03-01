import {
    ADD_EMPLOYEE_REQUESTED, EMPLOYEE_ADDED, EMPLOYEE_LOADED, EMPLOYEE_REQUESTED, EMPLOYEES_LOADED,
    EMPLOYEES_REQUESTED
} from "../constants";

import {config} from '../config';

import { push } from 'react-router-redux'

//import store from '../store';

/*
employees : {
    data : [],
    loading : false,
    adding : false
}
 */
export default (state = {}, action) => {
    switch (action.type) {
        case EMPLOYEE_REQUESTED:
        case EMPLOYEES_REQUESTED:
            return {...state, loading: true};
        case EMPLOYEES_LOADED:
            return {...state, loading: false, data: action.employees};
        case EMPLOYEE_LOADED:
            const targetState = {...state, loading: false};
            if (!targetState.data) targetState.data = [];
            targetState.data.push(action.employee);
            return targetState;
        case ADD_EMPLOYEE_REQUESTED:
            return {...state, adding: true};
        case EMPLOYEE_ADDED:
            const addedState = {...state, adding: false};
            if (!addedState.data) addedState.data = [];
            addedState.data.push(action.employee);
            return addedState;
        default:
            return state;
    }

};

export const loadEmployeesAsync = () => {
    return async dispatch => {
        dispatch({
            type: EMPLOYEES_REQUESTED
        });

        const response = await fetch(config.apiBaseUrl + '/employees');

        const employees = await response.json();

        dispatch({
            type: EMPLOYEES_LOADED,
            employees
        });
    };
};

export const loadEmployeeAsync = (id) => {
    return async dispatch => {
        dispatch({
            type: EMPLOYEE_REQUESTED
        });

        const response = await fetch(config.apiBaseUrl + '/employees/' + id);

        const employee = await response.json();

        dispatch({
            type: EMPLOYEE_LOADED,
            employee
        });
    };
};

export const addNewEmployeeAsync = (e) => {
    return async (dispatch, getState) => {
        e.preventDefault();
        dispatch({
            type: ADD_EMPLOYEE_REQUESTED
        });
        const form = getState().form;

        const values = form['add-new-employee-form'].values;

        const response = await fetch(config.apiBaseUrl + '/employees', {
            method: 'post',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const id = await response.json().id;

        dispatch({
            type: EMPLOYEE_ADDED,
            employee: {...values, id}
        });

        dispatch(push('/'));
    }
};