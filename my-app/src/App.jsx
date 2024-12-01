import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Maintainence from './components/Maintainence';
import Dashboard from './components/Dashboard';
import Assets from './components/Assets';
import Dealers from './components/Dealers';
import Transactions from './components/Transactions';
import Contact from './components/Contact'; 
import Aboutus from './components/AboutUs';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/assets' element={<Assets />} />
                <Route path='/dealers' element={<Dealers />} />
                <Route path='/maintainence' element={<Maintainence />} />
                <Route path='/transactions' element={<Transactions />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/aboutus' element={<Aboutus/>}/> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;
