import React, { useState, useContext, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';
import UploadLetter from './UploadLetter';
import { CheckInContext } from '../contexts/CheckInContext';
import menuIcon from '../components/menu.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home'); // State untuk tab aktif
  const [selectedLab, setSelectedLab] = useState('');
  const [visitorCard, setVisitorCard] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State untuk notifikasi
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { addCheckIn, visitHistory } = useContext(CheckInContext); // Context untuk riwayat kunjungan
  const sidebarRef = useRef(null);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  useClickAway(sidebarRef, () => setIsSidebarOpen(false));
  useClickAway(profileMenuRef, () => setIsProfileMenuOpen(false));
  useClickAway(notificationRef, () => setIsNotificationOpen(false));

  const notifications = [
    { id: 1, message: 'Surat penunjukan untuk Lab. Device selesai.', date: '2024-12-04' },
    { id: 2, message: 'Surat penunjukan untuk Lab. Energy selesai.', date: '2024-12-04' },
  ];

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

  const renderNotifications = () => {
    if (notifications.length === 0) {
      return <p className="text-gray-600 px-4 py-2">Tidak ada notifikasi.</p>;
    }

    return notifications.map((notif) => (
      <div key={notif.id} className="px-4 py-2 border-b last:border-b-0">
        <p className="text-sm text-gray-800">{notif.message}</p>
        <p className="text-xs text-gray-500">{notif.date}</p>
      </div>
    ));
  };

  const handleLabChange = (e) => setSelectedLab(e.target.value);

  const handleVisitorCardChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 3) {
      setVisitorCard(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLab.trim() || !visitorCard.trim()) {
      setErrorMessage('Silakan lengkapi semua kolom sebelum melakukan check-in.');
      return;
    }

    if (visitorCard.length !== 3) {
      setErrorMessage('Nomor kartu visitor harus terdiri dari 3 digit.');
      return;
    }

    addCheckIn({
      lab: selectedLab,
      visitorCard: visitorCard,
      timestamp: new Date().toISOString(),
    });

    setSelectedLab('');
    setVisitorCard('');
    setErrorMessage('');
    alert('Check-in berhasil!');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderProfile = () => {
    const user = {
      fullname: 'Nama Pengguna',
      email: 'email@example.com',
      company: 'Nama Perusahaan',
      phone: '08123456789',
      photo: '/images/default-profile.png',
      integrityLetter: 'Surat Pakta Integritas.pdf', // Variabel untuk surat pakta integritas
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
        <h3 className="text-xl font-semibold mb-4">Profile</h3>
        <div className="flex flex-col items-center">
          <img
            src={user.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border border-gray-300 shadow"
          />
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-semibold">Nama Lengkap</p>
              <p className="text-gray-900">{user.fullname}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-semibold">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-semibold">Perusahaan</p>
              <p className="text-gray-900">{user.company}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-semibold">Nomor Telepon</p>
              <p className="text-gray-900">{user.phone}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-semibold">Pakta Integritas</p>
              <p className="text-gray-900">{user.integrityLetter}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-4">
            <h3 className="text-xl font-semibold mb-4">Check In</h3>
            <form onSubmit={handleSubmit}>
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="lab">Pilih Lab yang dituju</label>
                <select
                  id="lab"
                  value={selectedLab}
                  onChange={handleLabChange}
                  className="w-full p-2 border rounded"
                >
                <option value="">Pilih Lab</option>
                <option value="Lab. Device">Lab. Device</option>
                <option value="Lab. Energy">Lab. Energy</option>
                <option value="Lab. Kabel & Aksesori FTTH">Lab. Kabel & Aksesori FTTH</option>
                <option value="Lab. Kalibrasi">Lab. Kalibrasi</option>
                <option value="Lab. Transmisi">Lab. Transmisi</option>
                <option value="Lab. Infra Service Research (ISR)">Lab. Infra Service Research (ISR)</option>
                <option value="Lab. Broadband Access Network Research (BAN)">Lab. Broadband Access Network Research (BAN)</option>
                <option value="Lab. Mobility & FMC Research (FMC)">Lab. Mobility & FMC Research (FMC)</option>
                <option value="Lab System Integration & Readiness (SIR)">Lab System Integration & Readiness (SIR)</option>
                <option value="Bagian Infrastructure User Relation (UREL)">Bagian Infrastructure User Relation (UREL)</option>
              </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="visitorCard">Kartu Visitor</label>
                <input
                  type="text"
                  id="visitorCard"
                  value={visitorCard}
                  onChange={handleVisitorCardChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700 w-full"
              >
                Check In
              </button>
            </form>
          </div>
        </>
      );
    } else if (activeTab === 'visitHistory') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mb-4">
          <h3 className="text-xl font-semibold mb-4">Visit History</h3>
          {visitHistory.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">No</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Lab</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tanggal</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {visitHistory.map((history, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{history.lab}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(history.timestamp).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(history.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">Tidak ada riwayat kunjungan.</p>
          )}
        </div>
      );
    } else if (activeTab === 'profile') {
      return renderProfile();
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/images/backgroundregistervisitor.png')" }}>
      {/* Header */}
      <header className="bg-white shadow-lg p-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/images/tth.png" alt="Logo" className="h-10" />
          <nav className="hidden md:flex space-x-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button onClick={() => setActiveTab('home')} className={`text-lg font-bold ${activeTab === 'home' ? 'text-red-600' : 'text-gray-800'} hover:text-gray-600`}>Home</button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button onClick={() => setActiveTab('visitHistory')} className={`text-lg font-bold ${activeTab === 'visitHistory' ? 'text-red-600' : 'text-gray-800'} hover:text-gray-600`}>Visit History</button>
            </motion.div>
          </nav>
          <button className="md:hidden text-gray-800" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <img src={menuIcon} alt="menu" className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative" ref={notificationRef}>
            <img
              src="/images/notification.png"
              alt="Notifications"
              className="w-6 h-6 cursor-pointer"
              onClick={toggleNotification}
            />
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
                <div className="p-2 bg-gray-100 text-gray-700 font-semibold border-b">Notifikasi</div>
                {renderNotifications()}
              </div>
            )}
          </div>
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2"
            >
              <img src="/images/profile.png" alt="Profile" className="w-6 h-6" />
              <span className="text-sm font-bold">Visitor</span>
              <svg
                className={`w-4 h-4 transform ${isProfileMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.33l3.71-3.14a.75.75 0 111.04 1.1l-4.24 3.6a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <button
                onClick={() => setActiveTab('profile')}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
              >
                Profile
              </button>
              <button
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                onClick={() => alert('Logout berhasil!')}
              >
                Logout
              </button>
            </div>
          )}

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6">
        {renderContent()}
      </main>

      {/* Modal */}
      <UploadLetter isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
