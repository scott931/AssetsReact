import React, { useState, useEffect } from "react";
import "./maintenance.css";
import Warehouse from "./Warehouse";
import Upcoming from "./Upcoming";

const Maintenance = () => {
  const [view, setView] = useState("assetService");
  const [assets, setAssets] = useState([]);
  const [currentAssets, setCurrentAssets] = useState([]);
  const [suggestedRepairs, setSuggestedRepairs] = useState([]);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [currentAssetDescription, setCurrentAssetDescription] = useState("");
  const [currentRepairDate, setCurrentRepairDate] = useState("");
  const [newAsset, setNewAsset] = useState({
    assetType: "",
    assetName: "",
    assetModelId: "",
    dealer: "",
    warrantyDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:5000/assets")
      .then((response) => response.json())
      .then((data) => {
        setAssets(data);
        setCurrentAssets(data.slice(0, itemsPerPage));
        const repairsNeeded = data.filter(
          (asset) => asset.repairCount >= asset.repairThreshold
        );
        setSuggestedRepairs(repairsNeeded);
      })
      .catch((error) => console.error("Error fetching assets:", error));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const handleClickPage = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    setCurrentAssets(assets.slice(startIndex, startIndex + itemsPerPage));
  };
  const handlePrevPage = () => currentPage > 1 && handleClickPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && handleClickPage(currentPage + 1);

  // Add new asset
  const handleAddAsset = () => {
    fetch("http://localhost:5000/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAsset),
    })
      .then((response) => response.json())
      .then((addedAsset) => {
        setAssets((prevAssets) => [...prevAssets, addedAsset]);
        setNewAsset({
          assetType: "",
          assetName: "",
          assetModelId: "",
          dealer: "",
          warrantyDate: "",
        });
        setView("viewAsset");
        handleClickPage(1);
      })
      .catch((error) => console.error("Error adding asset:", error));
  };

  // Delete asset
  const handleDeleteAsset = (id) => {
    fetch(`http://localhost:5000/assets/${id}`, { method: "DELETE" })
      .then(() => {
        setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
        const newPage = currentAssets.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
        handleClickPage(newPage);
      })
      .catch((error) => console.error("Error deleting asset:", error));
  };

  // Extend and Update asset
  const handleExtendAsset = (asset) => {
    setCurrentAsset(asset);
    setCurrentAssetDescription(asset.description || "");
    setCurrentRepairDate(asset.repairDate || "");
  };

  const handleUpdateAsset = () => {
    const updatedAsset = {
      ...currentAsset,
      description: currentAssetDescription,
      repairDate: currentRepairDate,
    };
    fetch(`http://localhost:5000/assets/${currentAsset.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAsset),
    })
      .then((response) => response.json())
      .then((updatedAsset) => {
        setAssets((prevAssets) =>
          prevAssets.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset))
        );
        setCurrentAsset(null);
      })
      .catch((error) => console.error("Error updating asset:", error));
  };

  const handleMoveToWarehouse = () => {
    console.log("Asset moved to warehouse:", currentAsset);
    setCurrentAsset(null);
  };

  return (
    <div className="maintenance-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className={view === "assetService" ? "active" : ""}
          onClick={() => setView("assetService")}
        >
          Asset Service
        </button>
        <button
          className={view === "serviceSuggestion" ? "active" : ""}
          onClick={() => setView("serviceSuggestion")}
        >
          Service Suggestion
        </button>
        <button
          className={view === "warehouse" ? "active" : ""}
          onClick={() => setView("warehouse")}
        >
          Warehouse
        </button>
        <button
          className={view === "upcomingAssets" ? "active" : ""}
          onClick={() => setView("upcomingAssets")}
        >
          Upcoming Assets
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {view === "assetService" && (
          <div>
            <button onClick={() => setView("addAsset")}>Add</button>
            <button onClick={() => setView("viewAsset")}>View</button>
          </div>
        )}

        {view === "serviceSuggestion" && (
          <div className="service-suggestion">
            <h2>Assets Crossed Repair Threshold</h2>
            <table>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Asset Name</th>
                  <th>Model ID</th>
                  <th>Dealer</th>
                  <th>Repair Count</th>
                  <th>Warranty Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suggestedRepairs.map((asset) => (
                  <tr key={asset.id}>
                    <td>{asset.assetType}</td>
                    <td>{asset.assetName}</td>
                    <td>{asset.assetModelId}</td>
                    <td>{asset.dealer}</td>
                    <td>{asset.repairCount}</td>
                    <td>{asset.warrantyDate || "N/A"}</td>
                    <td>
                      <button onClick={() => handleDeleteAsset(asset.id)}>Delete</button>
                      <button onClick={() => handleExtendAsset(asset)}>Extend</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "addAsset" && (
          <div className="add-asset-form">
            <h2>Add New Asset</h2>
            <form>
              <div className="input-group">
                <label>Asset Type:</label>
                <input
                  type="text"
                  value={newAsset.assetType}
                  onChange={(e) => setNewAsset({ ...newAsset, assetType: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Asset Name:</label>
                <input
                  type="text"
                  value={newAsset.assetName}
                  onChange={(e) => setNewAsset({ ...newAsset, assetName: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Model ID:</label>
                <input
                  type="text"
                  value={newAsset.assetModelId}
                  onChange={(e) => setNewAsset({ ...newAsset, assetModelId: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Dealer:</label>
                <input
                  type="text"
                  value={newAsset.dealer}
                  onChange={(e) => setNewAsset({ ...newAsset, dealer: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Warranty Date:</label>
                <input
                  type="date"
                  value={newAsset.warrantyDate}
                  onChange={(e) => setNewAsset({ ...newAsset, warrantyDate: e.target.value })}
                />
              </div>
              <button type="button" onClick={handleAddAsset}>
                Add Asset
              </button>
            </form>
          </div>
        )}

        {view === "viewAsset" && (
          <div className="view-asset-list">
            <h2>Items in Repair</h2>
            <table>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Asset Name</th>
                  <th>Model ID</th>
                  <th>Dealer</th>
                  <th>Warranty Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td>{asset.assetType}</td>
                    <td>{asset.assetName}</td>
                    <td>{asset.assetModelId}</td>
                    <td>{asset.dealer}</td>
                    <td>{asset.warrantyDate || "N/A"}</td>
                    <td>
                      <button onClick={() => handleDeleteAsset(asset.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleClickPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        )}

        {currentAsset && view === "serviceSuggestion" && (
          <div className="extend-asset">
            <h2>Extend Asset Details</h2>
            <div className="asset-details">
              <p>
                <strong>Asset Type:</strong> {currentAsset.assetType}
              </p>
              <p>
                <strong>Asset Name:</strong> {currentAsset.assetName}
              </p>
              <div className="input-group">
                <label>Description:</label>
                <textarea
                  value={currentAssetDescription}
                  onChange={(e) => setCurrentAssetDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="input-group">
                <label>Repair Date:</label>
                <input
                  type="date"
                  value={currentRepairDate}
                  onChange={(e) => setCurrentRepairDate(e.target.value)}
                />
              </div>
              <button onClick={handleUpdateAsset}>Update Asset</button>
              <button onClick={handleMoveToWarehouse}>Move to Warehouse</button>
            </div>
          </div>
        )}

        {view === "warehouse" && <Warehouse />}

        {view === "upcomingAssets" && <Upcoming />}
      </div>
    </div>
  );
};

export default Maintenance;
