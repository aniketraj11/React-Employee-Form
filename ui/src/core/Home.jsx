import React, { Component } from "react";
import "../styles.css";
import Base from "./Base";

class Home extends Component {
  state = {
    name: "",
    employeeid: "",
    department: "Frontend Developer",
    email: "",
    doj: "",
    id: "",
    error: false,
    message: "",
    employees: [],
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleClear = () => {
    this.setState({
      name: "",
      employeeid: "",
      department: "Frontend Developer",
      email: "",
      doj: "",
      id: "",
    });
  };

  onSubmit = (event) => {
    const { name, employeeid, department, email, doj } = this.state;
    if (!!(name && employeeid && department && email && doj)) {
      let employee = {
        name: this.state.name,
        employeeid: this.state.employeeid,
        department: this.state.department,
        email: this.state.email,
        doj: this.state.doj,
        id: new Date().getTime(),
      };
      let employees = [...this.state.employees, employee];
      this.setState({ error: false, employees: employees }, () => {
        document.getElementById("close").click();
        this.handleClear();
      });
    } else {
      this.setState({
        error: true,
        message: "All fileds are required !",
      });
    }
  };

  handleDelete = (id) => {
    let employees = [...this.state.employees];
    employees = employees.filter((employee) => employee.id !== id);
    console.log(employees);
    this.setState({ employees: employees });
  };

  showMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "" : "none" }}
          >
            {this.state.message}
          </div>
        </div>
      </div>
    );
  };

  //form container for the employee details
  detailsForm = () => {
    const { name, employeeid, department, email, doj } = this.state;
    return (
      <div className="row">
        <div className="col-md-12 text-left">
          <form>
            {this.showMessage()}
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                onChange={this.handleChange("name")}
                name={name}
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Employee ID</label>
              <input
                className="form-control"
                type="text"
                onChange={this.handleChange("employeeid")}
                name={employeeid}
                value={employeeid}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                className="form-control"
                onChange={this.handleChange("department")}
                name={department}
                value={department}
              >
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Fullstack Developer</option>
                <option>Lead UI/UX Designer</option>
                <option>Bot Developer</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                onChange={this.handleChange("email")}
                name={email}
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Joining (DOJ)</label>
              <input
                className="form-control"
                type="date"
                onChange={this.handleChange("doj")}
                name={doj}
                value={doj}
              />
            </div>
          </form>
        </div>
      </div>
    );
  };

  //modal container
  modal = () => {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="exampleModalLabel">
                Employee Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-dark">{this.detailsForm()}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleClear}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit}
                data-target="#exampleModal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //table container
  tableDiv = () => {
    return (
      <div className="row m-3">
        <div className="card text-dark col-md-8 offset-sm-2 text-left">
          <div className="card-body">
            <h5 className="card-title">New Hiring Details</h5>
            <div className="table-responsive">
              <div
                className="alert alert-primary text-center"
                style={{
                  display: this.state.employees.length === 0 ? "" : "none",
                }}
              >
                No record found !
              </div>
              <table
                className="table table-hover fixed_header"
                style={{
                  display: this.state.employees.length !== 0 ? "" : "none",
                }}
              >
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Department</th>
                    <th scope="col">Email ID</th>
                    <th scope="col">DOJ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map((employee) => {
                    return (
                      <tr key={employee.id}>
                        <td>
                          <button
                            className="btn badge badge-pill badge-danger mr-1"
                            onClick={() => this.handleDelete(employee.id)}
                          >
                            X
                          </button>
                          {employee.name}
                        </td>
                        <td>{employee.employeeid}</td>
                        <td>{employee.department}</td>
                        <td>{employee.email}</td>
                        <td>{employee.doj}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Base>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-center">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              New Employee
            </button>
          </div>
        </div>
        {this.modal()}
        {this.tableDiv()}
      </Base>
    );
  }
}

export default Home;
