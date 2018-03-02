import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import EmployeeDetails from "./Components/EmployeeDetails";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";

class App extends Component {
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
                    <Route exact path="/" component={Home}/>
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
