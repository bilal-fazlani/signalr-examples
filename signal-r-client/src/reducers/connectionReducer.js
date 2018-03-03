import {EMPLOYEE_ADDED, EMPLOYEE_DELETED, EMPLOYEE_EDITED, SOCKET_CONNECTED, SOCKET_DISCONNECTED} from "../constants";
import {config} from "../config";
import {HubConnection} from "@aspnet/signalr/dist/esm/index";

export default (state = {}, action) => {
    switch (action.type) {
        case SOCKET_CONNECTED:
            return {...state, connected: true, connectionId: action.connectionId};
        case SOCKET_DISCONNECTED:
            return {connected: false};
        default:
            return state;
    }
}

export const connectToSocketAsync = () => {
    return async dispatch => {
        //here we will connect to signal r hub
        const connection = new HubConnection(config.apiBaseUrl + '/employees-hub');

        await connection.start();

        const connectionId = connection.connection.connectionId;

        console.info('connection started');

        dispatch({
            type: SOCKET_CONNECTED,
            connectionId
        });

        connection.on('employeeUpdated', employee => {
            dispatch({
                type: EMPLOYEE_EDITED,
                employee
            });
            //console.info('employee updated',employee);
        });

        connection.on('employeeCreated', employee => {
            dispatch({
                type: EMPLOYEE_ADDED,
                employee
            });
            //console.info('employee inserted', employee);
        });

        connection.on('employeeDeleted', employeeId => {
            //console.info('employee deleted: ' + employeeId);
            dispatch({
                type: EMPLOYEE_DELETED,
                id : employeeId
            })
        });
    };
};