import React, { useState, useContext,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineRollback } from 'react-icons/ai';
import UploadLetter from './UploadLetter';
import { CheckInContext } from '../contexts/CheckInContext';
import menuIcon from '../components/menu.png';

const DashboardVendor = () => {
  const [selectedLab, setSelectedLab] = useState('');
  const [pic, setPic] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isArrowUp, setIsArrowUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addCheckIn } = useContext(CheckInContext); // Get the context function
  const navigate = useNavigate();

  const sidebarRef = useRef(null);

  const handleLabChange = (e) => setSelectedLab(e.target.value);
  const handlePicChange = (e) => setPic(e.target.value);
  const handleDeviceNameChange = (e) => setDeviceName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLab.trim() || !pic.trim() || !deviceName.trim()) {
      alert('Please fill in all fields before checking in.');
      return;
    }

    // Add the check-in to the context
    addCheckIn({
      lab: selectedLab,
      pic: pic,
      deviceName: deviceName,
      timestamp: new Date().toISOString(),
    });

    navigate('/Admin'); // Navigate to Admin page after submission
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsArrowUp(!isArrowUp);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/images/background_visitor.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="bg-white shadow-lg p-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/images/tth.png" alt="Logo" className="h-10" />
          <nav className="hidden md:flex space-x-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="#" className="text-lg font-bold text-gray-800 hover:text-gray-600">Home</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="#" className="text-lg font-bold text-gray-800 hover:text-gray-600">New Visit</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="#" className="text-lg font-bold text-gray-800 hover:text-gray-600">Visit History</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="#" className="text-lg font-bold text-gray-800 hover:text-gray-600">My Access</Link>
            </motion.div>
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
      
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <motion.div 
              ref={sidebarRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 bottom-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4"
            >
              <button className="mb-4" onClick={toggleSidebar}>
                <AiOutlineRollback className="w-6 h-6 text-gray-800" />
              </button>
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-lg font-bold text-gray-800 hover:text-gray-600">Home</Link>
                <Link to="/" className="text-lg font-bold text-gray-800 hover:text-gray-600">New Visit</Link>
                <Link to="/" className="text-lg font-bold text-gray-800 hover:text-gray-600">Visit History</Link>
                <Link to="/" className="text-lg font-bold text-gray-800 hover:text-gray-600">My Access</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-1 flex flex-col items-center p-6">
        <div className="bg-pink-100 p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
          <h3 className="text-xl font-semibold mb-4">Ingin menambahkan akses baru?</h3>
          <button 
            onClick={openModal} 
            className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700 w-full">
            Upload Surat Penunjukkan
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
          <h3 className="text-xl font-semibold mb-4">Check In</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tujuan Kunjungan</label>
              <div className="flex items-center">
                <input type="radio" id="tujuan1" name="tujuan" value="Lab" className="mr-2" />
                <label htmlFor="tujuan1" className="mr-4">Lab</label>
                <input type="radio" id="tujuan2" name="tujuan" value="Meeting" className="mr-2" />
                <label htmlFor="tujuan2">Meeting</label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="lab">Pilih Lab yang dituju</label>
              <select id="lab" value={selectedLab} onChange={handleLabChange} className="w-full p-2 border rounded">
                <option value="">Pilih Lab</option>
                <option value="Lab A">Lab A</option>
                <option value="Lab B">Lab B</option>
                <option value="Lab C">Lab C</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="pic">Person in Charge / PIC</label>
              <input
                type="text"
                id="pic"
                value={pic}
                onChange={handlePicChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="device">Nama Perangkat</label>
              <input
                type="text"
                id="device"
                value={deviceName}
                onChange={handleDeviceNameChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700 w-full">Check In</button>
          </form>
        </div>
      </main>
      <UploadLetter isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default DashboardVendor;
