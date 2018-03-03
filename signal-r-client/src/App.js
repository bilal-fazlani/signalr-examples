import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import About from "./Components/About";
import EmployeeDetails from "./Components/EmployeeDetails";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Dashboard from "./Components/Dashboard";
import {config} from "./config";
import {HubConnection} from "@aspnet/signalr/dist/esm/index";

class App extends Component {

    async componentWillMount(){
        //here we will connect to signal r hub
        const connection = new HubConnection(config.apiBaseUrl + '/employees-hub');

        await connection.start();
        console.info('connection started');

        connection.on('employeeUpdated', employee => {
            console.info('employee updated',employee);
        });

        connection.on('employeeInserted', employee => {
            console.info('employee inserted',employee);
        });

        connection.on('employeeDeleted', employeeId => {
            console.info('employee deleted: ' + employeeId);
        });
    }

    render() {
        return (
            <div className="App">
                <header>
                    &nbsp;
                    <Link to="/">Home</Link>
                    &nbsp; | &nbsp;
                    <Link to="/add-new-employee">Add new employee</Link>
                    &nbsp; | &nbsp;
                    <Link to="/about">About</Link>
                </header>
                <hr />
                <main>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/add-new-employee" component={AddEmployee}/>
                    <Route exact path="/employee/:id" component={EmployeeDetails}/>
                    <Route path="/employee/:id/edit" component={EditEmployee}/>
                </main>
            </div>
        );
    }
}

export default App;
