import React, { useState, useEffect } from "react";
import "./assets.css";

const Assets = () => {
  const [view, setView] = useState("add"); // Default view is "add"
  const [addedAssets, setAddedAssets] = useState([]); // Array to store added assets
  const [newAsset, setNewAsset] = useState({
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

  // Fetch added assets from `addedAssets` array in db.json
  useEffect(() => {
    fetchAddedAssets();
  }, []);

  const fetchAddedAssets = async () => {
    try {
      const response = await fetch("http://localhost:5000/addedAssets");
      if (response.ok) {
        const data = await response.json();
        setAddedAssets(data); // Update the addedAssets state with fetched data
      } else {
        throw new Error("Failed to fetch added assets.");
      }
    } catch (error) {
      console.error("Error fetching added assets:", error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  // Handle adding a new asset
  const handleAddAsset = async () => {
    // Validate form fields
    const isFormValid = Object.values(newAsset).every((value) => value.trim() !== "");
    if (!isFormValid) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/addedAssets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsset), // Send the new asset to db.json under `addedAssets`
      });

      if (response.ok) {
        const addedAsset = await response.json();
        setAddedAssets((prevAssets) => [...prevAssets, addedAsset]); // Update the UI immediately
        setNewAsset({
          assetType: "",
          assetName: "",
          assetModelId: "",
          repairThreshold: "",
          dealer: "",
          quantity: "",
          issueDate: "",
          warrantyDate: "",
          costPerUnit: "",
        }); // Reset the form
        alert("Asset added successfully!");
      } else {
        throw new Error("Failed to add asset.");
      }
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  return (
    <div className="asset-management-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className={view === "add" ? "active" : ""}
          onClick={() => setView("add")}
        >
          Add Asset
        </button>
        <button
          className={view === "display" ? "active" : ""}
          onClick={() => setView("display")}
        >
          Display Assets
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {view === "add" && (
          <div className="add-asset-form">
            <h2>Add New Asset</h2>
            <form>
              <label>
                Asset Type:
                <input
                  type="text"
                  name="assetType"
                  value={newAsset.assetType}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Asset Name:
                <input
                  type="text"
                  name="assetName"
                  value={newAsset.assetName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Asset Model ID:
                <input
                  type="text"
                  name="assetModelId"
                  value={newAsset.assetModelId}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Repair Threshold:
                <input
                  type="number"
                  name="repairThreshold"
                  value={newAsset.repairThreshold}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Dealer:
                <input
                  type="text"
                  name="dealer"
                  value={newAsset.dealer}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={newAsset.quantity}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Issue Date:
                <input
                  type="date"
                  name="issueDate"
                  value={newAsset.issueDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Warranty Date:
                <input
                  type="date"
                  name="warrantyDate"
                  value={newAsset.warrantyDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Cost per Unit:
                <input
                  type="number"
                  name="costPerUnit"
                  value={newAsset.costPerUnit}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="button" onClick={handleAddAsset}>
                Add Asset
              </button>
            </form>
          </div>
        )}

        {view === "display" && (
          <div className="display-assets">
            <h2>Added Assets: {addedAssets.length}</h2>
            <table>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Asset Name</th>
                  <th>Model ID</th>
                  <th>Repair Threshold</th>
                  <th>Dealer</th>
                  <th>Quantity</th>
                  <th>Issue Date</th>
                  <th>Warranty Date</th>
                  <th>Cost Per Unit</th>
                </tr>
              </thead>
              <tbody>
                {addedAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td>{asset.assetType}</td>
                    <td>{asset.assetName}</td>
                    <td>{asset.assetModelId}</td>
                    <td>{asset.repairThreshold}</td>
                    <td>{asset.dealer}</td>
                    <td>{asset.quantity}</td>
                    <td>{asset.issueDate}</td>
                    <td>{asset.warrantyDate}</td>
                    <td>{asset.costPerUnit}</td>
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

export default Assets;
