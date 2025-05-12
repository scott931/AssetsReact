import React, { useState, useEffect } from 'react';
import { FaBox, FaUsers, FaTools, FaExchangeAlt } from 'react-icons/fa';
import { getStats, getAssets } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, assetsData] = await Promise.all([
          getStats(),
          getAssets()
        ]);
        setStats(statsData);
        setAssets(assetsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-lg shadow p-6"
            style={{ borderLeft: `4px solid ${stat.color}` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                {stat.icon === 'FaBox' && <FaBox className="text-xl" style={{ color: stat.color }} />}
                {stat.icon === 'FaUsers' && <FaUsers className="text-xl" style={{ color: stat.color }} />}
                {stat.icon === 'FaTools' && <FaTools className="text-xl" style={{ color: stat.color }} />}
                {stat.icon === 'FaExchangeAlt' && <FaExchangeAlt className="text-xl" style={{ color: stat.color }} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Assets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{asset.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{asset.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{asset.currentLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      asset.condition === 'OPERATIONAL' ? 'bg-green-100 text-green-800' :
                      asset.condition === 'MAINTENANCE' ? 'bg-yellow-100 text-yellow-800' :
                      asset.condition === 'OBSOLETE' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {asset.condition}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;