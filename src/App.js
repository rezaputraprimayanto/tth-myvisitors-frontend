import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Visitor from './components/RegisterVisitor';
import Upload from './components/Upload';
import Login from './components/Login';
import Soc from './components/Soc';
import Dashboard from './components/Dashboard';
import CheckConfirmation from './components/CheckInConfirmation';
import UploadLetter from './components/UploadLetter';
import LoginVendor from './components/LoginVendor';
import RegisterVendor from './components/RegisterVendor';
import UploadVendor from './components/UploadVendor';
import SocVendor from './components/SocVendor';
import DashboardVendor from './components/DashboardVendor';
import Admin from './components/Admin';
import { CheckInProvider } from './contexts/CheckInContext';
import LabProvider from './contexts/LabContext'; // Import LabProvider
import './index.css';

function App() {
  return (
    <CheckInProvider>
      <LabProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/RegisterVisitor" element={<Visitor />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/Soc" element={<Soc />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/check-confirmation" element={<CheckConfirmation />} />
            <Route path="/upload-letter" element={<UploadLetter />} />
            <Route path="/LoginVendor" element={<LoginVendor />} />
            <Route path="/RegisterVendor" element={<RegisterVendor />} />
            <Route path="/UploadVendor" element={<UploadVendor />} />
            <Route path="/SocVendor" element={<SocVendor />} />
            <Route path="/DashboardVendor" element={<DashboardVendor />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </Router>
      </LabProvider>
    </CheckInProvider>
  );
}

export default App;
