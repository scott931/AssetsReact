import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './transactions.css';

const Transactions = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  const [upcomingAssetsData, setUpcomingAssetsData] = useState([]);
  const [repairCount, setRepairCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    // Fetch assets data
    Promise.all([
      fetch("http://localhost:5000/assets").then((response) => response.json()),
      fetch("http://localhost:5000/warehouse").then((response) => response.json()),
      fetch("http://localhost:5000/upcomingAssets").then((response) => response.json()),
    ])
      .then(([assets, warehouse, upcomingAssets]) => {
        setAssetsData(assets);
        setWarehouseData(warehouse);
        setUpcomingAssetsData(upcomingAssets);

        // Count assets under repair
        const repairAssetsCount = assets.filter((item) => item.repairThreshold && item.repairThreshold > 0).length;
        setRepairCount(repairAssetsCount);

        // Prepare category counts
        const assetsCount = assets.length;
        const warehouseCount = warehouse.length;
        const upcomingAssetsCount = upcomingAssets.length;

        // Set counts for the Pie chart
        setCategoryCounts([assetsCount, repairAssetsCount, warehouseCount, upcomingAssetsCount]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const data = {
    labels: ['Assets', 'Repair', 'Warehouse', 'Upcoming Assets'],
    datasets: [
      {
        data: categoryCounts, // Include repair count in chart data
        backgroundColor: ['#00474f', '#67b7d1', '#e74a4a', '#ffb74d'],
        hoverBackgroundColor: ['#003840', '#5ca4c3', '#c63e3e', '#e6a03c'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}`, // Show raw counts directly
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="transactions-container">
      <h2>Asset Overview</h2>
      <div className="pie-chart-container">
        <Pie data={data} options={options} />
      </div>
      <div className="counts-container">
        <p>Total Assets: {assetsData.length}</p>
        <p>Total Repair Items: {repairCount}</p>
        <p>Total Warehouse Items: {warehouseData.length}</p>
        <p>Total Upcoming Assets: {upcomingAssetsData.length}</p>
      </div>
    </div>
  );
};

export default Transactions;
