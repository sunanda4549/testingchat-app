import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../shared/api';
import Loading from '../shared/Loading';

export default function ProductsChart() {

  const [data, setData] = useState({
    labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
    datasets: [{
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: false
    }]
  });

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  }
  const [, setProducts] = useState([]);
  const [, setError] = useState("")
  const [loading, setLoading] = useState(false);
  let fixedColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'];
  const fetchProducts = () => {
    setLoading(true);
    api("http://localhost:4000/products", "GET")
      .then(response => {
        let labels = response.map(item => item.productName);
        let productsData = response.map(item => item.productPrice);
        let colors = response.map(item => {
          return fixedColors[Math.floor(Math.random() * (fixedColors.length - 1 + 1) + 1)]
        })
        let updatedData = { ...data };
        updatedData.labels = labels;
        updatedData.datasets[0].data = productsData;
        updatedData.datasets[0].backgroundColor = colors;
        updatedData.datasets[0].borderColor = colors;
        setData(updatedData);
        setProducts(response);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      })
  }
  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, [])
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          Products Chart
        </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Charts</a></li>
            <li className="breadcrumb-item active" aria-current="page">Products Chart</li>
          </ol>
        </nav>
      </div>
      {loading ? <Loading /> :
        <div className="row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>}
    </div>
  )
}