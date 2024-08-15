import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/upload.module.css'; // Import modul CSS

function Upload() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUploadType, setActiveUploadType] = useState('');
  const [selfieFileName, setSelfieFileName] = useState('');
  const [idCardFileName, setIdCardFileName] = useState('');
  const [companyIdCardFileName, setCompanyIdCardFileName] = useState('');
  const [selfieImage, setSelfieImage] = useState(null);  // Untuk menyimpan gambar selfie yang diambil
  const [idCardImage, setIdCardImage] = useState(null);  // Untuk menyimpan gambar ID Card yang diambil
  const [companyIdCardImage, setCompanyIdCardImage] = useState(null);  // Untuk menyimpan gambar Company ID Card yang diambil
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleOpenModal = (uploadType) => {
    setActiveUploadType(uploadType);
    setIsModalOpen(true);
    setErrorMessage(''); // Clear error message when modal is opened
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveUploadType('');
    setIsCameraActive(false);
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (activeUploadType === 'selfie') {
        setSelfieFileName(file.name);
        setSelfieImage(fileURL);
      } else if (activeUploadType === 'idCard') {
        setIdCardFileName(file.name);
        setIdCardImage(fileURL);
      } else if (activeUploadType === 'companyIdCard') {
        setCompanyIdCardFileName(file.name);
        setCompanyIdCardImage(fileURL);
      }
      console.log('File yang diunggah:', file);
    }
    handleCloseModal();
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      handleCloseModal();
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.toBlob((blob) => {
        const fileURL = URL.createObjectURL(blob);
        if (activeUploadType === 'selfie') {
          setSelfieFileName('selfie.png');
          setSelfieImage(fileURL);
        } else if (activeUploadType === 'idCard') {
          setIdCardFileName('idCard.png');
          setIdCardImage(fileURL);
        } else if (activeUploadType === 'companyIdCard') {
          setCompanyIdCardFileName('companyIdCard.png');
          setCompanyIdCardImage(fileURL);
        }
        console.log('Foto yang diambil:', fileURL);
      });
      handleCloseModal();
    }
  };

  const handleNextClick = () => {
    if (selfieFileName) {
      navigate('/Soc');
    } else {
      setErrorMessage('Anda harus mengunggah semua foto sebelum melanjutkan.');
    }
  };

  return (
    <div className={styles.body}>
      <div className={isModalOpen ? `${styles.container} ${styles['blur-background']}` : styles.container}>
        <div className={styles.header}>
          <img src="/images/tth.png" alt="Logo tth Indonesia" className={styles.logo} />
          <img src="/images/telkom.png" alt="Logo Telkom " className={styles.logo2} />
        </div>
        <h1>Daftar Akun</h1>

        <div className={styles['upload-section']}>
          <h2>Foto Selfie / Selfie Foto</h2>
          <p>Sertakan foto selfie anda, pastikan foto terlihat jelas / Include your selfie photo, make sure the photo is clear</p>
          <button className={styles['upload-button']} onClick={() => handleOpenModal('selfie')}>
            Upload Gambar
          </button>
          {selfieFileName && <p className={styles['file-info']}>File yang diunggah: {selfieFileName}</p>}
          {selfieImage && <img src={selfieImage} alt="Selfie" className={styles['preview-image']} />}
        </div>

        {/* <div className={styles['upload-section']}>
          <h2>Foto Kartu Identitas (KTP/SIM/Pasport) / Photo ID Card (KTP/SIM/Passport)</h2>
          <p>Foto Kartu Identitas harus terlihat jelas / Photo ID Card must be clearly visible</p>
          <button className={styles['upload-button']} onClick={() => handleOpenModal('idCard')}>
            Upload Gambar
          </button>
          {idCardFileName && <p className={styles['file-info']}>File yang diunggah: {idCardFileName}</p>}
          {idCardImage && <img src={idCardImage} alt="ID Card" className={styles['preview-image']} />}
        </div>

        <div className={styles['upload-section']}>
          <h2>Foto Kartu Pakta Integritas / Photo of Integrity Pack</h2>
          <p>Sertakan foto selfie anda dengan memperlihatkan kartu identitas dari perusahaan anda berasal / Include your selfie photo by showing the identity card from the company you come from</p>
          <button className={styles['upload-button']} onClick={() => handleOpenModal('companyIdCard')}>
            Upload Gambar
          </button>
          {companyIdCardFileName && <p className={styles['file-info']}>File yang diunggah: {companyIdCardFileName}</p>}
          {companyIdCardImage && <img src={companyIdCardImage} alt="Company ID Card" className={styles['preview-image']} />}
        </div> */}

        <div className={styles.buttons}>  
          <button onClick={() => navigate('/RegisterVisitor')} className={styles.back}>Kembali / Back</button>
          <button onClick={handleNextClick} className={styles.next}>Selanjutnya / Next</button>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <img src="/images/closebutton.png" alt="Close" className={styles['close-button']} onClick={handleCloseModal} />
            <h2>Pilih Opsi</h2>
            <div className={styles.options}>
              <div className={styles.option} onClick={() => document.getElementById('file-upload').click()}>
                <img src="/images/upload2.png" alt="Upload Icon" />
                <p>Unggah Gambar</p>
                <button className={styles['upload-button']} onClick={() => document.getElementById('file-upload').click()}>Pilih Gambar</button>
              </div>
              <div className={styles.option} onClick={handleCameraCapture}>
                <img src="/images/upload1.png" alt="Camera Icon" />
                <p>Ambil Foto</p>
                <button className={styles['upload-button']} onClick={capturePhoto} disabled={!isCameraActive}>Capture Foto</button>
              </div>
            </div>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto', display: isCameraActive ? 'block' : 'none' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
