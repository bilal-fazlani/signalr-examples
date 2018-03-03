import React from "react";
import {Field, reduxForm} from "redux-form";
import {editEmployeeAsync, loadEmployeeAsync} from "../reducers/employees";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class EditEmployee extends React.Component {

    async componentWillMount() {
        if (!this.props.initialValues) {
            await this.props.loadEmployeeAsync(this.props.employeeId);
        }
    }

    render() {
        const { editEmployeeAsync, pristine, reset, submitting, editing, loading } = this.props;

        if(loading)
            return <div>Loading...</div>
        else return <div>
            <h1>Edit employee</h1>
            <div>
                <form onSubmit={editEmployeeAsync}>
                    <div>
                        <label>Name</label>
                        <div>
                            <Field
                                name='name'
                                type='text'
                                placeholder='Name'
                                component='input'/>
                        </div>
                    </div>
                    <div>
                        <label>Age</label>
                        <div>
                            <Field
                                name='age'
                                type='number'
                                placeholder='Age'
                                component='input'/>
                        </div>
                    </div>
                    <div>
                        <br/>
                        <button type="submit" disabled={pristine || submitting || editing}>Save</button>
                        &nbsp;
                        <button type="button" disabled={pristine || submitting || editing} onClick={reset}>Clear</button>
                    </div>
                </form>
            </div>
            {editing? <div>
                Saving...
            </div>: null}
        </div>
    }
}

const form = reduxForm({
    form: 'edit-employee-form', // a unique identifier for this form
})(EditEmployee);

const mapStateToProps = (state, ownProps) => {
    const employeeId = ownProps.match.params.id;
    const employee = state.employees && state.employees.data && state.employees.data.find(x => x.id == employeeId);
    return {
        employeeId,
        editing : state.employees && state.employees.editing === true,
        loading : state.employees && state.employees.loading === true,
        initialValues: employee
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    editEmployeeAsync,
    loadEmployeeAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(form);
