import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../shared/api'
import ErrorMessage from '../shared/ErrorMessage';
import Loading from '../shared/Loading';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fetchUsers = () => {
    setLoading(true);
    api("http://localhost:4000/users", "GET")
      .then(response => {
        setUsers(response);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      })
  }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      setLoading(true);
      api("http://localhost:4000/users/" + id, "DELETE")
        .then(response => {
          let updatedData = [...users];
          let index = updatedData.findIndex(item => item.id === id);
          updatedData.splice(index, 1);
          setUsers(updatedData);
          setLoading(false);
        }).catch(err => {
          setError(err);
          setLoading(false);
        })
    }
  }
  useEffect(() => {
    fetchUsers();
  }, [])
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Users </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
            <li className="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>
      </div>
      {error && <ErrorMessage error={error} />}
      {loading ? <Loading /> : <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className='d-flex justify-content-end'>
                <Link to="/form-elements/users"><button className="card-description btn btn-primary "> Add User
                </button></Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 && users.map((user, index) => (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.fullname}</td>
                        <td className="text-danger"> {user.email}</td>
                        <td>
                          <Link to={"/form-elements/users/" + user.id}><button className='btn btn-secondary m-2'>Edit</button></Link>
                          <button className='btn btn-danger m-2' onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}
