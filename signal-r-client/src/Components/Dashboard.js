import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadEmployeesAsync} from "../reducers/employees";
import {Link} from "react-router-dom";
import {HubConnection} from '@aspnet/signalr'
import {config} from '../config';
import employees from "../reducers/employees";

class Dashboard extends React.Component {

    async componentWillMount(){
        //loading data only first time
        if(this.props.shouldLoadEmployees){
            await this.props.loadEmployeesAsync();
        }
    }

    render() {
        return <div>
            <h1>
                Dashboard
            </h1>
            {
                this.props.isLoadingEmployees ? <div>
                    Loading...
                </div> : this.props.hasData ? <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.employees.map((emp, index) => <tr key={index}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.age}</td>
                            <th><Link to={"/employee/"+emp.id}>details</Link></th>
                        </tr>)
                    }
                    </tbody>
                </table> : <div> No records </div>
            }
        </div>
    }
}

const mapStateToProps = (state) => {

    const hasData = (state.employees !== undefined &&
        state.employees.data !== undefined &&
        state.employees.data.length > 0);

    const isLoadingEmployees = state.employees.loading;

    const shouldLoadEmployees = state.employees === undefined || state.employees.data === undefined;

    return {
        employees: state.employees.data,
        hasData,
        isLoadingEmployees,
        shouldLoadEmployees
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEmployeesAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);