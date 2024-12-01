import React, { useState, useEffect } from "react";
import "./Dealers.css";

const Dealers = () => {
  const [view, setView] = useState("add"); // Toggle between "add" and "view"
  const [recentActivity, setRecentActivity] = useState([]); // State for fetched recent activity
  const [newAsset, setNewAsset] = useState({
    dealerName: "",
    assetModelId: "",
    DealerId: "",
    EntryDate: "",
  });

  // Fetch recent activity from db.json on component mount
  useEffect(() => {
    fetch("http://localhost:5000/recentActivity")
      .then((response) => response.json())
      .then((data) => setRecentActivity(data))
      .catch((error) => console.error("Error fetching recent activity:", error));
  }, []);

  // Handle input changes in the add form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  // Add a new asset to db.json
  const handleAddAsset = () => {
    fetch("http://localhost:5000/assets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAsset),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewAsset({
          dealerName: "",
          assetModelId: "",
          DealerId: "",
          EntryDate: "",
        });
      })
      .catch((error) => console.error("Error adding asset:", error));
  };

  return (
    <div className="asset-management-container">
      {/* Sidebar for navigation */}
      <div className="sidebar">
        <button
          className={view === "add" ? "active" : ""}
          onClick={() => setView("add")}
        >
          Add
        </button>
        <button
          className={view === "view" ? "active" : ""}
          onClick={() => setView("view")}
        >
          View
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        {view === "add" && (
          <div className="add-asset-form">
            <h2>Add New Product</h2>
            <form>
              <label>
                Dealer Name:
                <input
                  type="text"
                  name="dealerName"
                  value={newAsset.dealerName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Asset Model ID:
                <input
                  type="text"
                  name="assetModelId"
                  value={newAsset.assetModelId}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Dealer ID:
                <input
                  type="text"
                  name="DealerId"
                  value={newAsset.DealerId}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Entry Date:
                <input
                  type="text"
                  name="EntryDate"
                  value={newAsset.EntryDate}
                  onChange={handleInputChange}
                />
              </label>
              <button type="button" onClick={handleAddAsset}>
                Add Asset
              </button>
            </form>
          </div>
        )}

        {view === "view" && (
          <div className="display-assets">
            <h2>Recent Activity</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Brand</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.id}</td>
                    <td>{activity.company}</td>
                    <td>{activity.product}</td>
                    <td>{activity.quantity}</td>
                    <td>{activity.brand}</td>
                    <td>{activity.rate}</td>
                    <td>{activity.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dealers;
