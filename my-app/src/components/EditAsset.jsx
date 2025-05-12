import React, { useState, useEffect } from 'react';
import { updateAsset } from '../services/api';

const EditAsset = ({ asset, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    description: '',
    financedBy: '',
    serialNumber: '',
    tagNumber: '',
    makeModel: '',
    deliveryDate: '',
    originalLocation: '',
    currentLocation: '',
    purchaseAmount: '',
    depreciationRate: '',
    responsibleOfficer: '',
    condition: 'OPERATIONAL'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (asset) {
      setFormData({
        description: asset.description || '',
        financedBy: asset.financedBy || '',
        serialNumber: asset.serialNumber || '',
        tagNumber: asset.tagNumber || '',
        makeModel: asset.makeModel || '',
        deliveryDate: asset.deliveryDate ? new Date(asset.deliveryDate).toISOString().split('T')[0] : '',
        originalLocation: asset.originalLocation || '',
        currentLocation: asset.currentLocation || '',
        purchaseAmount: asset.purchaseAmount || '',
        depreciationRate: asset.depreciationRate || '',
        responsibleOfficer: asset.responsibleOfficer || '',
        condition: asset.condition || 'OPERATIONAL'
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedAsset = await updateAsset(asset.id, formData);
      onSave(updatedAsset);
      onClose();
    } catch (err) {
      setError('Failed to update asset. Please try again.');
      console.error('Error updating asset:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Edit Asset</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tag Number</label>
            <input
              type="text"
              name="tagNumber"
              value={formData.tagNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Make & Model</label>
            <input
              type="text"
              name="makeModel"
              value={formData.makeModel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Current Location</label>
            <input
              type="text"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Purchase Amount</label>
            <input
              type="number"
              name="purchaseAmount"
              value={formData.purchaseAmount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="OPERATIONAL">Operational</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="OBSOLETE">Obsolete</option>
              <option value="DISPOSED">Disposed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAsset;