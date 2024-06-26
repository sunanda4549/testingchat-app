import React, { useState, useEffect } from 'react';
import api from '../shared/api'
import Loading from '../shared/Loading';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fetchOrders = () => {
    setLoading(true);
    api("http://localhost:4000/orders", "GET")
      .then(response => {
        setOrders(response);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      })
  }
  useEffect(() => {
    fetchOrders();
  }, [])
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Orders </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
            <li className="breadcrumb-item active" aria-current="page">Orders</li>
          </ol>
        </nav>
      </div>
      {error && <div className='text-danger'>
        Error: {error}
      </div>}
      {loading ? <Loading /> : <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className='d-flex justify-content-end'>
                <button className="card-description btn btn-primary "> Add Order
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Order ID</th>
                      <th>Toal Order</th>
                      <th>Total Items</th>
                      <th>Tax</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 && orders.map((user, index) => (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.orderId}</td>
                        <td className="text-danger"> {user.orderTotal}</td>
                        <td>{user.items.length}</td>
                        <td>{user.tax}</td>
                        <td>
                          <button className='btn btn-secondary m-2'>Edit</button>
                          <button className='btn btn-danger m-2'>Delete</button>
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
