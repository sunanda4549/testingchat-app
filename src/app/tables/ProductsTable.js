import React, { useState, useEffect } from 'react';
import api from '../shared/api'
import Loading from '../shared/Loading';

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fetchProducts = () => {
    setLoading(true);
    api("http://localhost:4000/products", "GET")
      .then(response => {
        setProducts(response);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      })
  }
  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Products </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
            <li className="breadcrumb-item active" aria-current="page">Products</li>
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
                <button className="card-description btn btn-primary "> Add Product
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Version</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 && products.map((user, index) => (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.productName}</td>
                        <td className="text-danger"> {user.productVersion}</td>
                        <td>{user.productPrice}</td>
                        <td>{user.stock}</td>
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
