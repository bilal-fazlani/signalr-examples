import React from "react";
import {connect} from "react-redux";
import {deleteEmployeeAsync, loadEmployeeAsync} from "../reducers/employees";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";

class EmployeeDetails extends React.Component {

    async componentWillMount() {
        if (!this.props.employee) {
            await this.props.loadEmployeeAsync(this.props.employeeId);
        }
    }

    render() {

        const {deleteEmployeeAsync, loading, deleting, employeeId} = this.props;

        if(deleting === true)
            return <div>Deleting...</div>;

        if(loading)
            return <div>Loading...</div>;

        return <div>
            <h3>
                Employee details - {this.props.employee.id}
            </h3>
            <div>
                {this.props.employee.name} ({this.props.employee.age} years)
            </div>
            <div>
                <br/>
                <Link to={'/employee/' + this.props.employeeId + '/edit'} >
                    <button>Edit</button>
                </Link>
                &nbsp;
                <button onClick={() => deleteEmployeeAsync(employeeId)}>Delete</button>
            </div>
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const employeeId = ownProps.match.params.id;
    const employee = state.employees && state.employees.data && state.employees.data.find(x => x.id == employeeId);
    const loading = state.employees.loading !== false;
    const deleting = state.employees.deleting === true;
    return {
        employee,
        employeeId,
        loading,
        deleting
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEmployeeAsync,
    deleteEmployeeAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);