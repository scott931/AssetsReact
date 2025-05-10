import React, { useState } from 'react';
import { FaChartLine, FaBox, FaUsers, FaTools, FaExchangeAlt, FaSort, FaSearch, FaFilter, FaEye, FaTimes } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Assets', value: '1,234', icon: <FaBox />, color: '#4CAF50' },
    { title: 'Active Dealers', value: '85', icon: <FaUsers />, color: '#2196F3' },
    { title: 'Pending Maintenance', value: '12', icon: <FaTools />, color: '#FF9800' },
    { title: 'Monthly Transactions', value: '456', icon: <FaExchangeAlt />, color: '#9C27B0' },
  ];

  // Sample asset data
  const [assets, setAssets] = useState([
    {
      id: 1,
      description: 'Dell Laptop XPS 15',
      financedBy: 'Corporate Budget',
      serialNumber: 'DL-XPS-78952',
      tagNumber: 'IT-001-2023',
      makeModel: 'Dell XPS 15 9510',
      deliveryDate: '2023-05-15',
      pvNumber: 'PV-2023-0054',
      originalLocation: 'IT Department',
      currentLocation: 'Finance Department',
      replacementDate: '2026-05-15',
      purchaseAmount: 1899.99,
      depreciationRate: 0.25,
      annualDepreciation: 474.99,
      accumulatedDepreciation: 712.49,
      netBookValue: 1187.50,
      disposalDate: '',
      disposalValue: 0,
      responsibleOfficer: 'John Smith',
      condition: 'OPERATIONAL'
    },
    {
      id: 2,
      description: 'Office Desk',
      financedBy: 'Facility Budget',
      serialNumber: 'IK-DESK-3462',
      tagNumber: 'FUR-042-2022',
      makeModel: 'IKEA Bekant',
      deliveryDate: '2022-11-10',
      pvNumber: 'PV-2022-0187',
      originalLocation: 'Office Floor 3',
      currentLocation: 'Office Floor 3',
      replacementDate: '2027-11-10',
      purchaseAmount: 349.99,
      depreciationRate: 0.1,
      annualDepreciation: 35.00,
      accumulatedDepreciation: 78.75,
      netBookValue: 271.24,
      disposalDate: '',
      disposalValue: 0,
      responsibleOfficer: 'Sarah Johnson',
      condition: 'OPERATIONAL'
    },
    {
      id: 3,
      description: 'Projector',
      financedBy: 'IT Infrastructure Grant',
      serialNumber: 'EP-PRJ-5673',
      tagNumber: 'IT-057-2021',
      makeModel: 'Epson PowerLite 992F',
      deliveryDate: '2021-08-22',
      pvNumber: 'PV-2021-0136',
      originalLocation: 'Conference Room A',
      currentLocation: 'Storage',
      replacementDate: '2025-08-22',
      purchaseAmount: 799.99,
      depreciationRate: 0.2,
      annualDepreciation: 160.00,
      accumulatedDepreciation: 560.00,
      netBookValue: 239.99,
      disposalDate: '',
      disposalValue: 0,
      responsibleOfficer: 'Michael Wong',
      condition: 'OBSOLETE'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAssets = assets.filter(asset =>
    asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.makeModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.tagNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const openAssetDetails = (asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Asset Dashboard</h1>
        <div className="date-picker">
          {/* Date picker can be added here if needed */}
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-details">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-card asset-table-container">
        <div className="table-header">
          <h2>Asset Inventory</h2>
          <div className="table-actions">
            <div className="search-container">
              {/* <FaSearch className="search-icon" /> */}
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            {/* <button className="filter-btn">
              <FaFilter /> Filter
            </button> */}
          </div>
        </div>

        <div className="table-responsive">
          <table className="asset-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('description')}>
                  Asset Description <FaSort className="sort-icon" />
                </th>
                <th onClick={() => requestSort('financedBy')}>
                  Financed by <FaSort className="sort-icon" />
                </th>
                <th onClick={() => requestSort('serialNumber')}>
                  Serial Number <FaSort className="sort-icon" />
                </th>
                <th onClick={() => requestSort('tagNumber')}>
                  Tag Number <FaSort className="sort-icon" />
                </th>
                <th onClick={() => requestSort('makeModel')}>
                  Make & Model <FaSort className="sort-icon" />
                </th>
                <th onClick={() => requestSort('deliveryDate')}>
                  Delivery Date <FaSort className="sort-icon" />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAssets.map((asset) => (
                <tr key={asset.id} className={asset.condition === 'OBSOLETE' ? 'obsolete-row' : ''}>
                  <td>{asset.description}</td>
                  <td>{asset.financedBy}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.tagNumber}</td>
                  <td>{asset.makeModel}</td>
                  <td>{asset.deliveryDate}</td>
                  <td>
                    <button
                      className="view-more-btn"
                      onClick={() => openAssetDetails(asset)}
                    >
                      <FaEye />More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="pagination">
            <button disabled>&lt; Previous</button>
            <span className="page-indicator">Page 1 of 1</span>
            <button disabled>Next &gt;</button>
          </div>
          <div className="items-per-page">
            <span>Items per page:</span>
            <select defaultValue="10">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modal for displaying full asset details */}
      {showModal && selectedAsset && (
        <div className="modal-overlay">
          <div className="asset-details-modal">
            <div className="modal-header">
              <h3>Asset Details: {selectedAsset.description}</h3>
              <button className="close-modal-btn" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <div className="asset-details-grid">
                <div className="asset-detail-item">
                  <span className="detail-label">Asset Description:</span>
                  <span className="detail-value">{selectedAsset.description}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Financed by:</span>
                  <span className="detail-value">{selectedAsset.financedBy}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Serial Number:</span>
                  <span className="detail-value">{selectedAsset.serialNumber}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Tag Number:</span>
                  <span className="detail-value">{selectedAsset.tagNumber}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Make & Model:</span>
                  <span className="detail-value">{selectedAsset.makeModel}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Delivery Date:</span>
                  <span className="detail-value">{selectedAsset.deliveryDate}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">PV Number:</span>
                  <span className="detail-value">{selectedAsset.pvNumber}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Original Location:</span>
                  <span className="detail-value">{selectedAsset.originalLocation}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Current Location:</span>
                  <span className="detail-value">{selectedAsset.currentLocation}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Replacement Date:</span>
                  <span className="detail-value">{selectedAsset.replacementDate || 'N/A'}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Purchase Amount:</span>
                  <span className="detail-value">${selectedAsset.purchaseAmount.toFixed(2)}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Depreciation Rate:</span>
                  <span className="detail-value">{(selectedAsset.depreciationRate * 100).toFixed(0)}%</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Annual Depreciation:</span>
                  <span className="detail-value">${selectedAsset.annualDepreciation.toFixed(2)}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Accumulated Depreciation:</span>
                  <span className="detail-value">${selectedAsset.accumulatedDepreciation.toFixed(2)}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Net Book Value:</span>
                  <span className="detail-value">${selectedAsset.netBookValue.toFixed(2)}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Disposal Date:</span>
                  <span className="detail-value">{selectedAsset.disposalDate || 'N/A'}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Disposal Value:</span>
                  <span className="detail-value">${selectedAsset.disposalValue.toFixed(2)}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Responsible Officer:</span>
                  <span className="detail-value">{selectedAsset.responsibleOfficer}</span>
                </div>
                <div className="asset-detail-item">
                  <span className="detail-label">Asset Condition:</span>
                  <span className={`status-badge ${selectedAsset.condition.toLowerCase()}`}>
                    {selectedAsset.condition}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="edit-asset-btn">Edit Asset</button>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;