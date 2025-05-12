import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './EditAsset.css';

const EditAsset = ({ asset, onClose, onSave }) => {
  const [editedAsset, setEditedAsset] = useState(asset);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedAsset(asset);
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAsset(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editedAsset.description) newErrors.description = 'Description is required';
    if (!editedAsset.serialNumber) newErrors.serialNumber = 'Serial number is required';
    if (!editedAsset.tagNumber) newErrors.tagNumber = 'Tag number is required';
    if (!editedAsset.makeModel) newErrors.makeModel = 'Make & Model is required';
    if (!editedAsset.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
    if (!editedAsset.purchaseAmount || editedAsset.purchaseAmount <= 0) {
      newErrors.purchaseAmount = 'Purchase amount must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(editedAsset);
    }
  };

  return (
    <div className="edit-asset-modal">
      <div className="edit-asset-content">
        <div className="edit-asset-header">
          <h2>Edit Asset</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="description">Asset Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={editedAsset.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="financedBy">Financed By</label>
              <input
                type="text"
                id="financedBy"
                name="financedBy"
                value={editedAsset.financedBy}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="serialNumber">Serial Number</label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={editedAsset.serialNumber}
                onChange={handleChange}
                className={errors.serialNumber ? 'error' : ''}
              />
              {errors.serialNumber && <span className="error-message">{errors.serialNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tagNumber">Tag Number</label>
              <input
                type="text"
                id="tagNumber"
                name="tagNumber"
                value={editedAsset.tagNumber}
                onChange={handleChange}
                className={errors.tagNumber ? 'error' : ''}
              />
              {errors.tagNumber && <span className="error-message">{errors.tagNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="makeModel">Make & Model</label>
              <input
                type="text"
                id="makeModel"
                name="makeModel"
                value={editedAsset.makeModel}
                onChange={handleChange}
                className={errors.makeModel ? 'error' : ''}
              />
              {errors.makeModel && <span className="error-message">{errors.makeModel}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="deliveryDate">Delivery Date</label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={editedAsset.deliveryDate}
                onChange={handleChange}
                className={errors.deliveryDate ? 'error' : ''}
              />
              {errors.deliveryDate && <span className="error-message">{errors.deliveryDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="originalLocation">Original Location</label>
              <input
                type="text"
                id="originalLocation"
                name="originalLocation"
                value={editedAsset.originalLocation}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentLocation">Current Location</label>
              <input
                type="text"
                id="currentLocation"
                name="currentLocation"
                value={editedAsset.currentLocation}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="purchaseAmount">Purchase Amount</label>
              <input
                type="number"
                id="purchaseAmount"
                name="purchaseAmount"
                value={editedAsset.purchaseAmount}
                onChange={handleChange}
                step="0.01"
                className={errors.purchaseAmount ? 'error' : ''}
              />
              {errors.purchaseAmount && <span className="error-message">{errors.purchaseAmount}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="depreciationRate">Depreciation Rate</label>
              <input
                type="number"
                id="depreciationRate"
                name="depreciationRate"
                value={editedAsset.depreciationRate}
                onChange={handleChange}
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="responsibleOfficer">Responsible Officer</label>
              <input
                type="text"
                id="responsibleOfficer"
                name="responsibleOfficer"
                value={editedAsset.responsibleOfficer}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                name="condition"
                value={editedAsset.condition}
                onChange={handleChange}
              >
                <option value="OPERATIONAL">Operational</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="OBSOLETE">Obsolete</option>
                <option value="DISPOSED">Disposed</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAsset;