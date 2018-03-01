import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getEmployeesAsync} from "../reducers/employees";

class Employees extends React.Component {

    async componentWillMount(){
        await this.props.getEmployeesAsync();
    }

    render() {
        return <div>
            {
                this.props.isLoadingEmployees ? <div>
                    Loading...
                </div> : this.props.hasData ? <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.employees.map((emp, index) => <tr key={index}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.age}</td>
                        </tr>)
                    }
                    </tbody>
                </table> : <div> No records </div>
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    console.info('state', state);

    const hasData = (state.employees !== undefined &&
        state.employees.data !== undefined &&
        state.employees.data.length > 0);

    const isLoadingEmployees = state.employees.loading;

    return {
        employees: state.employees.data,
        hasData,
        isLoadingEmployees
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getEmployeesAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Employees);