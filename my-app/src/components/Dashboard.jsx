import React, { useState, useEffect } from 'react';
import './Dashboard.css'

const Dashboard = () => {
  const [overview, setOverview] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    
    fetch("http://localhost:5000/overview")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setOverview(data)
  })
      .catch((error) => console.error("Error fetching overview:", error));

    fetch("http://localhost:5000/recentActivity")
      .then((response) => response.json())
      .then((data) => setRecentActivity(data))
      .catch((error) => console.error("Error fetching recent activity:", error));
  }, []);

  return (
    <div className="dashboard">
      <div className="overview-cards">
        <div className="card">
          <h3>OVERALL ASSETS</h3>
          <p>{overview.overallAssets}</p>
        </div>
        <div className="card">
          <h3>OVERALL QUANTITIES</h3>
          <p>{overview.overallQuantities}</p>
        </div>
        <div className="card">
          <h3>AVAILABLE ASSETS</h3>
          <p>{overview.availableAssets}</p>
        </div>
        <div className="card">
          <h3>REPAIR ASSETS</h3>
          <p>{overview.repairAssets}</p>
        </div>
        <div className="card">
          <h3>USERS LOGGED IN</h3>
          <p>{overview.usersLoggedIn}</p>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Company Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Brand</th>
              <th>Rate Per Unit</th>
              <th>Total Rate</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.company}</td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.brand}</td>
                <td>{item.rate}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="assets-summary">
        <div className="categorized-assets">
          <h3>Categorized Assets</h3>
          <div className="chart-placeholder">[Pie Chart Here]</div>
        </div>
        
        <div className="current-cost">
          <h3>Current Assets Cost</h3>
          <div className="chart-placeholder">[Cost Chart Here]</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
