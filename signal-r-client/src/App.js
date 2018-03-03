import React, {Component} from 'react';
import {Link, Route, withRouter} from "react-router-dom";
import About from "./Components/About";
import EmployeeDetails from "./Components/EmployeeDetails";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Dashboard from "./Components/Dashboard";
import {bindActionCreators} from "redux";
import {connectToSocketAsync} from "./reducers/connectionReducer";
import {connect} from "react-redux";

class App extends Component {

    async componentWillMount(){
        if(this.props.socketConnected !== true)
        {
            await this.props.connectToSocketAsync();
        }
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

const mapStateToProps = (state) => {
    return {
        socketConnected : state.socketConnection.connected
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    connectToSocketAsync
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

