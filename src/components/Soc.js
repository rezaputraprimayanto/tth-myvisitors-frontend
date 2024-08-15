import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Soc = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckbox1Change = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckbox2Change = () => {
    setIsChecked2(!isChecked2);
  };

  const handleExpandClick = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleNextClick = (e) => {
    if (isChecked1 && isChecked2) {
      setShowSuccess(true);
    } else {
      e.preventDefault();
    }
  };

  const handleBackClick = () => {
    navigate('/upload');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/background.jpg')" }}>
        <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Berhasil Membuat Akun</h1>
          <h2 className="text-xl font-semibold mb-4">Silahkan LOGIN</h2>
          <button onClick={() => navigate('/login')} className="bg-red-400 text-white py-2 px-4 rounded hover:bg-gray-600">Masuk / Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <img src="/images/tth.png" alt="Logo tth" className="h-12" />
          <img src="/images/telkom.png" alt="Logo Telkom" className="h-12" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Daftar Akun</h1>
        <h2 className="text-xl font-semibold mb-4">Statement of Confidentiality (SOC)</h2>
        <div className="bg-gray-200 p-4 rounded mb-4">
          <p className="font-semibold mb-2">
            Saya memahami dan setuju bahwa semua informasi resmi yang didapat dalam hubungannya dengan pekerjaan atau suatu proyek adalah bersifat rahasia dan tertutup, yang selanjutnya untuk tidak disebarkan atau dikomunikasikan oleh saya ke orang lain atau dalam bentuk apapun kecuali dalam hal tugas resmi yang memang pada dasarnya diperlukan untuk diketahui.
          </p>
          <p className="italic">
            I understand and agree that all official information acquired by me in the course of my work in connection with this project is of a strictly secret and confidential nature, and is not to be published or communicated by me to any other person in any form whatsoever except in the course of my official duties on a strictly "need-to-know" basis.
          </p>
          {isExpanded && (
            <>
              <p className="font-semibold mb-2">
                Saya harus meyakinkan bahwa semua orang yang diberi hak oleh saya untuk melakukan akses ke informasi resmi, harus membubuhkan tanda-tangan untuk mengamankan informasi resmi tersebut.
              </p>
              <p className="italic">
                I shall ensure that any other person who is authorized by me to have access to any official information shall similarly sign an undertaking to safeguard official information.
              </p>
              <p className="font-semibold mb-2">
                Saya berkewajiban untuk mengembalikan segala dokumen yang diterima dari TELKOMSEL, segala bentuk salinan, reproduksi dari seluruh dokumen atau sebagiannya yang diperlukan oleh TELKOMSEL.
              </p>
              <p className="italic">
                I undertake to return any document received from the TELKOMSEL, any other copies made or reproduced from such document or part thereof whenever required by TELKOMSEL.
              </p>
              <p className="font-semibold mb-2">
                Saya memahami dan menerima pemberlakuan standar ISO 27001 tentang manajemen keamanan informasi, atas segala pelanggaran dan kelalaian terhadap ketentuan dimaksud akan dikenakan sanksi sesuai ketentuan hukum yang berlaku.
              </p>
              <p className="italic">
                I understand and accept the implementation of the ISO 27001 standard on Information Security Management, all non-compliance and negligence with these provisions will be subject to sanctions in accordance with applicable law.
              </p>
              <p className="font-semibold mb-2">
                Saya selanjutnya memahami dan setuju bahwa semua pelanggaran dengan perjanjian kerahasiaan ini akan berakibat pada tuntutan secara hukum dan/atau pemutusan hubungan kontrak dalam proyek yang bersangkutan.
              </p>
              <p className="italic">
                I further understand and agree that any non-compliance with this non-disclosure agreement may render me liable for prosecution by law and/or breach in contract for this project.
              </p>
            </>
          )}
          <a
            href="#"
            className="text-red-600 underline mt-2 hover:text-gray-600"
            onClick={handleExpandClick}
          >
            {isExpanded ? 'Tampilkan Lebih Sedikit' : 'Baca Selengkapnya'}
          </a>
        </div>
        <div className="flex items-start mb-4 space-x-2">
          <input
            type="checkbox"
            id="checkbox1"
            name="checkbox1"
            className="form-checkbox h-5 w-5 text-gray-600"
            checked={isChecked1}
            onChange={handleCheckbox1Change}
          />
          <label htmlFor="checkbox1" className="text-gray-700">
            <b>Dengan ini saya menyatakan bahwa saya telah membaca dan menyetujui SOC ini.</b>
            <span className="italic"> I hereby declare that I have read and agree to this SOC.</span>
          </label>
        </div>
        <div className="flex items-start mb-5 space-x-2">
          <input
            type="checkbox"
            id="checkbox2"
            name="checkbox2"
            className="form-checkbox h-5 w-5 text-gray-600"
            checked={isChecked2}
            onChange={handleCheckbox2Change}
          />
          <label htmlFor="checkbox2" className="text-gray-700">
            <b>Dengan ini saya menyatakan informasi yang saya berikan untuk keperluan registrasi pada aplikasi My Visitor adalah benar & saya pertanggungjawabkan. Saya bersedia mendapatkan konsekuensi apapun terkait perbedaan data pada aplikasi My Visitor.</b>
            <span className="italic"> I hereby declare that the information I have provided for registration purposes on the My Visitor application is correct & I take responsibility for it. I am willing to accept any consequences regarding data differences in the My Visitor application.</span>
          </label>
        </div>
        <div className="flex justify-between">
          <button onClick={handleBackClick} className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-blue-700">Kembali / Back</button>
          <button className={`bg-red-600 text-white py-2 px-4 rounded ${!isChecked1 || !isChecked2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`} onClick={handleNextClick}>Selanjutnya / Next</button>
        </div>
      </div>
    </div>
  );
};

export default Soc;
