import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

const CheckInConfirmation = () => {
  const qrCodeValue = `${Math.random()}`; // This is just an example. You should use a better approach for generating QR codes.

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Vendor Check In</h2>
        <p className="mb-4">Tunjukkan QR Code pada resepsionis</p>
        <QRCode value={qrCodeValue} size={256} className="mx-auto mb-4" />
        <Link to="/dashboard" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Cancel</Link>
      </div>
    </div>
  );
};

export default CheckInConfirmation;
