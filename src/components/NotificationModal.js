import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function NotificationModal({ isOpen, onClose, onAgree }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-20 overflow-y-auto max-h-screen"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <h2 className="text-xl font-semibold mb-4">Pemberitahuan / Announcement</h2>
      <div className="max-h-60 overflow-y-auto pr-2 mb-4">
        <p className="mb-2"><strong>1.</strong> <b>Dalam memproses data pribadi Anda, kami tunduk terhadap Undang Undang (UU) No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.</b> <br></br> In relation to processing your personal data, we abide by the Indonesian Data Protection Law No. 27 / 2022.</p>
        <p className="mb-2"><strong>2.</strong> <b>Kami memproses data pribadi Anda berdasarkan pelaksanaan tugas kami sebagai Pengendali Data dalam rangka kepentingan umum dan pelayanan publik. </b> <br></br> The processing of your personal data is based on our duties as Personal Data Controller in the context of public interest and public services.</p>
        <p className="mb-2"><strong>3.</strong> <b>Kami mengumpulkan data pribadi Anda berupa nama lengkap, alamat e-mail, nomor telepon, kartu identitas, foto dokumen, dan foto diri untuk keperluan pencatatan kunjungan Anda di lingkungan Telkomsel.</b> <br></br> We collect your personal data which includes your name, e-mail address, phone numbers, ID card, photos of documents, and photos of yourself for the purpose of recording your visit at Telkomsel premises.</p>
        <p className="mb-2"><strong>4.</strong> <b>Data pribadi Anda akan disimpan dalam sistem elektronik yang kami kelola selama 90 (sembilan puluh) hari setelah kunjungan Anda berakhir, dan akan dihapus sesuai peraturan perundangan yang berlaku. </b><br></br>Your personal data will be stored in our electronic systems for 90 (ninety) days after you have completed your visit, and will be deleted in accordance to applicable laws and regulations.</p>
        <p className="mb-2"><strong>5.</strong> <b>Data pribadi Anda hanya akan dipergunakan untuk keperluan kunjungan Anda dan tidak akan diserahkan ke pihak lain tanpa dasar hukum yang dapat dibenarkan.</b><br></br>Your personal data will only be used for the purpose of your visit and will not be shared with any other party without valid legal basis.</p>
        <p className="mb-2"><strong>6.</strong> <b>Bilamana Anda perlu memperbaiki data pribadi Anda, atau memerlukan informasi lebih lanjut terkait pemrosesan data pribadi Anda, dapat menghubungi narahubung kami melalui e-mail dpo@telkomsel.co.id.</b><br></br> In the case that you need to rectify your personal data, or you need to get more information about the processing of your personal data, you may reach us by email at dpo@telkomsel.co.id.</p>
        <p className="mb-4"><b>Dengan mempergunakan situs ini, Anda setuju dengan kebijakan pengelolaan data kami.</b> <br></br> By using this site, you agree to our data management policy.</p>
      </div>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="checkbox"
          id="agree"
          name="agree"
          className="form-checkbox h-5 w-5 text-gray-600"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="agree" className="text-gray-700"><b>Ya, saya setuju /</b>
        Yes, i agree</label>
      </div>
      <div className="flex justify-end">
        
        <button
          className={`bg-red-500 text-white px-4 py-2 rounded ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onAgree}
          disabled={!isChecked}
        >
          Selesai / Done
        </button>
      </div>
    </Modal>
  );
}

export default NotificationModal;
