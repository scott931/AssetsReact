const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock data
const stats = [
  { title: 'Total Assets', value: '1,234', icon: 'FaBox', color: '#4CAF50' },
  { title: 'Active Dealers', value: '85', icon: 'FaUsers', color: '#2196F3' },
  { title: 'Pending Maintenance', value: '12', icon: 'FaTools', color: '#FF9800' },
  { title: 'Monthly Transactions', value: '456', icon: 'FaExchangeAlt', color: '#9C27B0' }
];

const assets = [
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
];

// API Routes
app.get('/api/stats', (req, res) => {
  res.json(stats);
});

app.get('/api/assets', (req, res) => {
  res.json(assets);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});