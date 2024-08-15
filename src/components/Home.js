import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css'; // Import modul CSS

function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/images/tth.png" alt="Logo tth Indonesia" className={styles.logo} />
          <img src="/images/telkom.png" alt="Logo Telkom" className={styles.logo2} />
        </div>
        <div className={styles['login-buttons']}>
          <Link to="/LoginVendor"><button className={styles.button}>Vendor</button></Link>
          <Link to="/Login"><button className={styles.button}>Visitor</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
