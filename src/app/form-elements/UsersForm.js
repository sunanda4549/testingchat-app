import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import api from '../shared/api';
import ErrorMessage from '../shared/ErrorMessage';
import Loading from '../shared/Loading';
import { Validator } from '../shared/validations';

export default function UsersForm() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const { id } = useParams();
  const history = useHistory();
  const [, forceUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const validator = Validator()
  const handleChange = ({ target: { name, value } }) => {
    let updatedUsers = { ...user };
    updatedUsers[name] = value;
    setUser(updatedUsers)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      //success
      let headers = { "content-type": "application/json" };
      let body = { ...user };
      delete body.confirm_password;
      if (id) {
        api("http://localhost:4000/users/" + id, "PUT", headers, body)
          .then(response => {
            alert("user updated");
            history.push("/tables/users");
            setLoading(false);
          }).catch(err => {
            setError(err);
            setLoading(false);
          })
      } else {
        api("http://localhost:4000/users", "POST", headers, body)
          .then(response => {
            alert("New user added");
            history.push("/tables/users");
            setLoading(false);
          }).catch(err => {
            setError(err);
            setLoading(false);
          })
      }
    } else {
      validator.current.showMessages();
      forceUpdate(true)
    }
  }
  const fetchUsers = () => {
    if (id) {
      setLoading(true);
      api("http://localhost:4000/users/" + id, "GET")
        .then(response => {
          setUser({ fullname: response.fullname, email: response.email, password: response.password, confirm_password: response.password })
          setLoading(false);
        }).catch(err => {
          setError(err);
          setLoading(false);
        })
    }
  }
  useEffect(() => {
    fetchUsers();
    //eslint-disable-next-line
  }, [id])
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Users</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Forms</a></li>
            <li className="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>
      </div>
      {error && <ErrorMessage error={error} />}
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{id ? "Edit" : "Add"} User</h4>
              <form className="forms-sample" onSubmit={handleSubmit}>
                <Form.Group>
                  <label htmlFor="exampleInputUsername1">Full Name</label>
                  <Form.Control type="text" id="exampleInputUsername1" name="fullname" placeholder="Enter your full name" value={user.fullname} onChange={handleChange} />
                  {validator.current.message("Full Name ", user.fullname, 'required')}
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <Form.Control type="email" className="form-control" name="email" id="exampleInputEmail1" placeholder="Email" value={user.email} onChange={handleChange} />
                  {validator.current.message("Email ", user.email, 'required|email')}
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <Form.Control type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" value={user.password} onChange={handleChange} />
                  {validator.current.message("Password ", user.password, 'required|password')}
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                  <Form.Control type="password" className="form-control" name="confirm_password" id="exampleInputConfirmPassword1" placeholder="Confirm Password" value={user.confirm_password} onChange={handleChange} />
                  {validator.current.message("Confirm Password ", user.confirm_password, 'required|password')}
                  {user.password.length > 0 && user.confirm_password.length > 0 && user.password !== user.confirm_password ? <span className='srv-validation-message'>Passwords are not matching</span> : null}
                </Form.Group>
                {loading ? <Loading /> :
                  <div>
                    <button type="submit" className="btn btn-primary mr-2">{id ? "Update" : "Submit"}</button>
                    <Link to="/tables/users" className='text-decoration-none'> <button className="btn btn-dark">Go Back</button></Link>
                  </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
