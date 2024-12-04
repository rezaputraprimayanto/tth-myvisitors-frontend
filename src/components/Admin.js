import React, { useState, useContext, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';
import { CheckInContext } from '../contexts/CheckInContext';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { visitHistory } = useContext(CheckInContext);
  const [verificationList, setVerificationList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);

  useClickAway(notificationRef, () => setIsNotificationOpen(false));
  useClickAway(profileMenuRef, () => setIsProfileMenuOpen(false));

  useEffect(() => {
    // Sinkronisasi verificationList dengan visitHistory
    setVerificationList(visitHistory);
  }, [visitHistory]);

  const notifications = [
    { id: 1, message: 'Pengunjung baru telah check-in.', date: '2024-12-04' },
    { id: 2, message: 'Lab report telah diperbarui.', date: '2024-12-05' },
  ];

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

  const handleAccess = (index, accessCardNumber) => {
    const item = verificationList[index];
    const updatedItem = { ...item, accessCardNumber };
    setVerificationList((prev) => prev.filter((_, i) => i !== index));
    setApprovedList((prev) => [...prev, updatedItem]);
  };

  const handleCardReturned = (index) => {
    const item = approvedList[index];
    const updatedItem = { ...item, cardReturnedTime: new Date().toLocaleTimeString() };
    setApprovedList((prev) => prev.filter((_, i) => i !== index));
    setFinishedList((prev) => [...prev, updatedItem]);
  };

  const renderDetails = (item) => {
    if (item.type === 'Visitor') {
      return (
        <div>
          <p>Lab yang dituju: {item.lab}</p>
          <p>Kartu Visitor: {item.visitorCard}</p>
          {item.accessCardNumber && <p>Nomor Kartu Akses: {item.accessCardNumber}</p>}
          {item.cardReturnedTime && <p>Waktu Kembali: {item.cardReturnedTime}</p>}
        </div>
      );
    } else if (item.type === 'Vendor') {
      return (
        <div>
          <p>File Surat Penunjukkan: {item.letterFile}</p>
          <p>Lab yang dituju: {item.lab}</p>
          <p>Nama PIC: {item.pic}</p>
          <p>Nama Perangkat: {item.deviceName}</p>
          {item.accessCardNumber && <p>Nomor Kartu Akses: {item.accessCardNumber}</p>}
          {item.cardReturnedTime && <p>Waktu Kembali: {item.cardReturnedTime}</p>}
        </div>
      );
    }
  };

  const renderHome = () => (
    <div className="flex flex-row justify-around p-4">
      <div className="bg-white shadow-lg p-4 rounded w-1/3">
        <h3 className="text-lg font-semibold mb-4">Verification</h3>
        {verificationList.length > 0 ? (
          verificationList.map((item, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <p>{item.name || item.visitorCard}</p>
              <button
                onClick={() => alert(JSON.stringify(renderDetails(item)))}
                className="text-blue-500 hover:underline"
              >
                Detail
              </button>
              <button
                onClick={() =>
                  handleAccess(index, prompt('Masukkan nomor kartu akses untuk user ini:'))
                }
                className="ml-2 text-green-500 hover:underline"
              >
                Access
              </button>
            </div>
          ))
        ) : (
          <p>Tidak ada data verifikasi.</p>
        )}
      </div>
      <div className="bg-white shadow-lg p-4 rounded w-1/3">
        <h3 className="text-lg font-semibold mb-4">Approved</h3>
        {approvedList.length > 0 ? (
          approvedList.map((item, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <p>{item.name || item.visitorCard}</p>
              <button
                onClick={() => alert(JSON.stringify(renderDetails(item)))}
                className="text-blue-500 hover:underline"
              >
                Detail
              </button>
              <span className="ml-2 text-gray-600">Status: Dalam Kunjungan</span>
              <button
                onClick={() => handleCardReturned(index)}
                className="ml-2 text-red-500 hover:underline"
              >
                Card Returned
              </button>
            </div>
          ))
        ) : (
          <p>Tidak ada data yang disetujui.</p>
        )}
      </div>
      <div className="bg-white shadow-lg p-4 rounded w-1/3">
        <h3 className="text-lg font-semibold mb-4">Finished</h3>
        {finishedList.length > 0 ? (
          finishedList.map((item, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <p>{item.name || item.visitorCard}</p>
              <button
                onClick={() => alert(JSON.stringify(renderDetails(item)))}
                className="text-blue-500 hover:underline"
              >
                Detail
              </button>
              <span className="ml-2 text-gray-600">Status: Card Returned</span>
            </div>
          ))
        ) : (
          <p>Tidak ada data selesai.</p>
        )}
      </div>
    </div>
  );

  const renderVisitHistory = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Visit History</h2>
      {visitHistory.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">No</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nama</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            {visitHistory.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name || item.visitorCard}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => alert(JSON.stringify(renderDetails(item)))}
                    className="text-blue-500 hover:underline"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Tidak ada data riwayat kunjungan.</p>
      )}
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'home') {
      return renderHome();
    } else if (activeTab === 'visitHistory') {
      return renderVisitHistory();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/images/backgroundadmin.png')" }}
    >
      <header className="bg-white shadow-lg p-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/images/tth.png" alt="Logo" className="h-10" />
          <nav className="hidden md:flex space-x-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button
                onClick={() => setActiveTab('home')}
                className={`text-lg font-bold ${
                  activeTab === 'home' ? 'text-teal-700' : 'text-gray-800'
                } hover:text-gray-600`}
              >
                Home
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button
                onClick={() => setActiveTab('visitHistory')}
                className={`text-lg font-bold ${
                  activeTab === 'visitHistory' ? 'text-teal-700' : 'text-gray-800'
                } hover:text-gray-600`}
              >
                Visit History
              </button>
            </motion.div>
          </nav>
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
                {notifications.map((notif) => (
                  <div key={notif.id} className="px-4 py-2 border-b last:border-b-0">
                    <p className="text-sm text-gray-800">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2"
            >
              <img src="/images/profile.png" alt="Profile" className="w-6 h-6" />
              <span className="text-sm font-bold">Admin</span>
              <svg
                className={`w-4 h-4 transform ${isProfileMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.33l3.71-3.14a.75.75 0 111.04 1.1l-4.24 3.6a.75.75 0 01-1.04 0L5.21 8.29a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
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

      <main className="flex-1 flex flex-col items-center p-6">{renderContent()}</main>
    </div>
  );
};

export default Admin;
