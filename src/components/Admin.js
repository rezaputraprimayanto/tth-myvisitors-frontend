import React, { useState, useContext } from 'react';
import { CheckInContext } from '../contexts/CheckInContext';
import { Link } from 'react-router-dom';
import menuIcon from '../components/menu.png';

const Admin = () => {
  const { checkIns, removeCheckIn } = useContext(CheckInContext); // Mengambil data check-in dari context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isArrowUp, setIsArrowUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsArrowUp(!isArrowUp);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="bg-white shadow-lg p-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/images/tth.png" alt="Logo" className="h-10" />
          <nav className="hidden md:flex space-x-6">
            <Link to="#" className="text-lg font-bold text-gray-800 hover:text-gray-600">Home</Link>
            <Link to="#" className="text-lg font-bold text-gray-800 hover=text-gray-600">New Visit</Link>
            <Link to="#" className="text-lg font-bold text-gray-800 hover=text-gray-600">Visit History</Link>
            <Link to="#" className="text-lg font-bold text-gray-800 hover=text-gray-600">My Access</Link>
          </nav>
          <button className="md:hidden text-gray-800" onClick={toggleSidebar}>
            <img src={menuIcon} alt="menu" className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <img src="/images/notification.png" alt="Notifications" className="w-6 h-6 cursor-pointer" />
          <div className="relative">
            <button onClick={toggleProfileMenu} className="flex items-center space-x-2">
              <img src="/images/profile.png" alt="Profile" className="w-6 h-6" />
              <span className="text-sm font-bold">Rianco Marcellino Andreas</span>
              <svg className={`w-4 h-4 transform ${isArrowUp ? 'rotate-180' : 'rotate-0'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.33l3.71-3.14a.75.75 0 111.04 1.1l-4.24 3.6a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                <Link to="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-xl font-semibold mb-4">Check-In List</h2>
          {checkIns.length > 0 ? (
            checkIns.map((checkIn, index) => (
              <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg">
                {checkIn.fullName && (
                  <p><strong>Nama Lengkap:</strong> {checkIn.fullName}</p>
                )}
                {checkIn.phone && (
                  <p><strong>No Telp:</strong> {checkIn.phone}</p>
                )}
                {checkIn.institution && (
                  <p><strong>Institusi / Instansi:</strong> {checkIn.institution}</p>
                )}
                {checkIn.visitorCard && (
                  <p><strong>No Kartu Visitor:</strong> {checkIn.visitorCard}</p>
                )}
                {checkIn.selfiePhoto && (
                  <p><strong>Foto Selfie:</strong> <img src={checkIn.selfiePhoto} alt="Selfie" className="h-20" /></p>
                )}
                {checkIn.pic && (
                  <p><strong>PIC:</strong> {checkIn.pic}</p>
                )}
                {checkIn.lab && (
                  <p><strong>Lab yang dituju:</strong> {checkIn.lab}</p>
                )}
                {checkIn.timestamp && (
                  <p><strong>Waktu Check In:</strong> {new Date(checkIn.timestamp).toLocaleString()}</p>
                )}
                <button onClick={() => removeCheckIn(index)} className="mt-2 bg-red-500 text-white p-2 rounded">Hapus</button>
              </div>
            ))
          ) : (
            <p>Tidak ada data check-in.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
