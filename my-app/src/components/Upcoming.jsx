import React, { useState, useEffect } from "react";
import "./Upcoming.css";

const UpcomingAssets = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [formData, setFormData] = useState({
    assetType: "",
    assetName: "",
    assetModelId: "",
    repairThreshold: "",
    dealer: "",
    quantity: "",
    issueDate: "",
    warrantyDate: "",
    costPerUnit: "",
  });
  const [assets, setAssets] = useState([]);

  // Fetch assets from the database
  const fetchAssets = async () => {
    try {
      const response = await fetch("http://localhost:5000/assets");
      const data = await response.json();
      setAssets(data);
      setShowAssets(true);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new asset
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Asset added successfully!");
        setFormData({
          assetType: "",
          assetName: "",
          assetModelId: "",
          repairThreshold: "",
          dealer: "",
          quantity: "",
          issueDate: "",
          warrantyDate: "",
          costPerUnit: "",
        });
        setShowForm(false);
      } else {
        alert("Failed to add asset. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding asset.");
    }
  };

  // Move asset to "upcomingAssets"
  const handleMove = async (asset) => {
    try {
      // Add to upcomingAssets
      const response = await fetch("http://localhost:5000/upcomingAssets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(asset),
      });

      if (response.ok) {
        alert(`${asset.assetName} moved to upcoming assets!`);
        // Optionally, refresh assets
        fetchAssets();
      } else {
        alert("Failed to move asset.");
      }
    } catch (error) {
      console.error("Error moving asset:", error);
    }
  };

  return (
    <div className="upcoming-assets">
      <div className="buttons">
        <button onClick={() => setShowForm(true)}>Add</button>
        <button onClick={fetchAssets}>View</button>
      </div>

      {showForm && (
        <form className="asset-form" onSubmit={handleSubmit}>
          <h3>Add New Product</h3>
          {/* Form inputs */}
          <label>
            Asset Type:
            <input
              type="text"
              name="assetType"
              value={formData.assetType}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Asset Name:
            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Asset Model ID:
            <input
              type="text"
              name="assetModelId"
              value={formData.assetModelId}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Repair Threshold:
            <input
              type="number"
              name="repairThreshold"
              value={formData.repairThreshold}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Dealer:
            <input
              type="text"
              name="dealer"
              value={formData.dealer}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Issue Date:
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Warranty Date:
            <input
              type="date"
              name="warrantyDate"
              value={formData.warrantyDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Cost Per Unit:
            <input
              type="number"
              name="costPerUnit"
              value={formData.costPerUnit}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Add Asset</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}

      {showAssets && (
        <div className="asset-list">
          <h3>Assets</h3>
          <table>
            <thead>
              <tr>
                <th>Asset Type</th>
                <th>Asset Name</th>
                <th>Asset Model ID</th>
                <th>Dealer</th>
                <th>Warranty Date</th>
                <th>Move</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.assetType}</td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetModelId}</td>
                  <td>{asset.dealer}</td>
                  <td>{asset.warrantyDate}</td>
                  <td>
                    <button onClick={() => handleMove(asset)}>Move</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpcomingAssets;
