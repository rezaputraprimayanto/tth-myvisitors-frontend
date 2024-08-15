import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/RegisterVendor.module.css'; // Import modul CSS

function RegisterVendor() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    company: '',
    id_card: '',
    password: '',
    confirm_password: '',
    phone: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextClick = () => {
    const { fullname, email, company, id_card, password, confirm_password, phone } = formData;

    // Cek jika ada field yang kosong
    if (!fullname || !email || !company || !password || !confirm_password || !phone) {
      setError('Harap isi semua field sebelum melanjutkan.');
      return;
    }

    // Cek jika ID Card dan Phone Number bukan angka
    if (isNaN(id_card) || isNaN(phone)) {
      setError('ID Card dan Nomor Telepon harus berupa angka.');
      return;
    }

    // Cek jika password dan konfirmasi password tidak cocok
    if (password !== confirm_password) {
      setError('Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    setError('');
    window.location.href = '/UploadVendor'; // Lanjut ke halaman berikutnya
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/images/tth.png" alt="Logo tth Indonesia" className={styles.logo} />
          <img src="/images/telkom.png" alt="Logo Telkom " className={styles.logo2} />
        </div>
        <h1>Daftar Akun</h1>
        <p>Lengkapi data diri anda / Complete Your Personal Data</p>
        <form className={styles.form}>
          <label htmlFor="fullname" className={styles.label}>Nama Lengkap (Sesuai KTP) / Full Name (According to ID Card)</label>
          <input type="text" id="fullname" name="fullname" className={styles.input} value={formData.fullname} onChange={handleChange} />

          <label htmlFor="email" className={styles.label}>Email (Pribadi) / Email (Your Personal Mail)</label>
          <input type="email" id="email" name="email" className={styles.input} value={formData.email} onChange={handleChange} />

          <label htmlFor="company" className={styles.label}>Instansi Perusahaan / Instantion Company</label>
          <input type="text" id="company" name="company" className={styles.input} value={formData.company} onChange={handleChange} />
{/* 
          <label htmlFor="id_card" className={styles.label}>Kartu Identitas / ID Card</label>
          <input type="number" id="id_card" name="id_card" className={styles.input} value={formData.id_card} onChange={handleChange} /> */}

          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" name="password" className={styles.input} value={formData.password} onChange={handleChange} />

          <label htmlFor="confirm_password" className={styles.label}>Masukan Ulang Password / Re-enter Password</label>
          <input type="password" id="confirm_password" name="confirm_password" className={styles.input} value={formData.confirm_password} onChange={handleChange} />

          <label htmlFor="phone" className={styles.label}>Nomor Telepon / Phone Number</label>
          <input type="number" id="phone" name="phone" className={styles.input} value={formData.phone} onChange={handleChange} />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttons}>
            <button type="button" className={`${styles.button} ${styles.back}`} onClick={() => window.location.href = '/LoginVendor'}>Kembali / Back</button>
            <button type="button" className={`${styles.button} ${styles.next}`} onClick={handleNextClick}>Selanjutnya / Next</button>
          </div>
        </form>
        <p className={styles.loginLink}>Sudah Punya Akun?  <Link to="../Login">Masuk</Link></p>
      </div>
    </div>
  );
}

export default RegisterVendor;
