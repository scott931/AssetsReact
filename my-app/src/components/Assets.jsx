import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./assets.css";

import { FaHome, FaBox, FaUsers, FaTools, FaExchangeAlt, FaEnvelope, FaInfoCircle, FaBars, FaEye } from 'react-icons/fa';

const Assets = () => {
  const [view, setView] = useState("add");
  const [addedAssets, setAddedAssets] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAssetDropdownOpen, setIsAssetDropdownOpen] = useState(false);
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

  // Fetch added assets on load
  useEffect(() => {
    fetchAddedAssets();
  }, []);

  const fetchAddedAssets = async () => {
    try {
      const response = await fetch("http://localhost:5000/addedAssets");
      if (response.ok) {
        const data = await response.json();
        setAddedAssets(data);
      } else {
        throw new Error("Failed to fetch added assets.");
      }
    } catch (error) {
      console.error("Error fetching added assets:", error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  // Handle form submission
  const handleAddAsset = async () => {
    const isFormValid = Object.values(newAsset).every((value) => value.trim() !== "");
    if (!isFormValid) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/addedAssets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAsset),
      });

      if (response.ok) {
        const addedAsset = await response.json();
        setAddedAssets((prev) => [...prev, addedAsset]);
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
        });
        alert("Asset added successfully!");
      } else {
        throw new Error("Failed to add asset.");
      }
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleAssetDropdown = () => setIsAssetDropdownOpen(!isAssetDropdownOpen);

  return (
    <>
    
      {/* Main Content */}
      <div className="main-content">
        {view === "add" && (
          <div className="add-asset-form">
            <h2>Add New Asset</h2>
            <form>
              {Object.entries(newAsset).map(([key, value]) => (
                <label key={key}>
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())}
                  :
                  <input
                    type={key.includes("Date") ? "date" : key === "repairThreshold" || key === "quantity" || key === "costPerUnit" ? "number" : "text"}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              ))}
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
    </>
  );
};

export default Assets;