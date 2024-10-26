import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from '../styles/login.module.css';
import NotificationModal from './NotificationModal';
import axios from 'axios';

function LoginVendor() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);  // State for captcha
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);  // Set captcha value when completed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Email harus mengandung @');
      return;
    }
    
    if (!captchaValue) {
      setError('Silakan verifikasi reCAPTCHA terlebih dahulu');
      return;
    }

    setError('');
    axios.post("https://3ff9-36-95-89-226.ngrok-free.app/auth/login", {
      email: email, 
      password: password
    })
    .then((response) => {
      console.log(response);
      window.localStorage.setItem('token', response.data.data);
      setToken(response.data.data);
      setSuccess(response.data.data);
      setShowPopup(true);
      navigate('/dashboardVendor');
    })
    .catch((err) => {
      console.log(err);
      setError(err.response?.data?.message || 'Login failed');
    });
  };

  const handleVisitorLogin = () => {
    navigate('/Login');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalAgree = () => {
    setIsModalOpen(false);
    navigate('/RegisterVendor');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/backgroundregistervendor.png')", backgroundSize: '100%' }}>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <img src="/images/tth.png" alt="Logo tth Indonesia" className="h-16" />
          <button
            className={styles['visitor-button']}
            onClick={handleVisitorLogin }
          >
            <span className="inline-flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z" clipRule="evenodd" /></svg>
              <Link to="../Login">Log in as Visitor / Log in Sebagai Visitor</Link>
            </span>
          </button>
        </div>
        <h1 className="text-2xl mb-4"><b>Vendor Dashboard</b></h1>
        <p className="text-gray-600 mb-4">Selamat Datang | Welcome</p>
        <p className="text-gray-500 mb-4">Akses kemudahan dengan aplikasi kami / Easy access with our app</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">EMAIL*</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="email"
              type="email"
              placeholder="Masukkan alamat email / Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">PASSWORD*</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="password"
              type="password"
              placeholder="Masukkan Password / Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <ReCAPTCHA
              sitekey="6LdXuhgqAAAAAN1-ugZw70JwbeH2xXZLojZfNTZu"
              onChange={handleCaptchaChange}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-between text-red-500 text-sm mb-4">
            <a href="/images/faq.pdf" className='underline' download>FAQ and Disclaimer</a>
            <Link to="/forgot-password" className='underline'>Lupa password? Forgot password?</Link>
          </div>
          <button className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700" type="submit">Masuk / Log in</button>
        </form>
        <div className="text-center text-sm mt-4">
          <p className="text-gray-500">Belum punya akun? Don't have an account yet?</p>
          <Link to="#" onClick={handleRegisterClick} className="text-red-500">Daftar sekarang / Register now</Link>
        </div>
        <NotificationModal isOpen={isModalOpen} onClose={handleModalClose} onAgree={handleModalAgree} />
      </div>
    </div>
  );
}

export default LoginVendor;
