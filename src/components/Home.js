import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css'; // Import CSS module

function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.landingPage}>
        <div className={styles.overlapGroupWrapper}>
          <div className={styles.overlapGroup}>
            <img className={styles.backgroundVisitor} src="/images/backgroundvisitor.png" alt="Background Visitor" />
            <div className={styles.rectangle}></div>
            <img className={styles.img} src="/images/logotthmyvisitorputih.png" alt="Logo" />
            <img className={styles.motif} src="/images/motif2.png" alt="Motif" />
            <img className={styles.doodle} src="/images/doodle.png" alt="Doodle" />

            <div className={styles.textWrapper}>W</div>
            <div className={styles.textWrapper2}>e</div>
            <div className={styles.textWrapper3}>l</div>
            <div className={styles.textWrapper4}>c</div>
            <div className={styles.textWrapper5}>o</div>
            <div className={styles.textWrapper6}>m</div>
            <div className={styles.textWrapper7}>e</div>
            <div className={styles.textWrapper8}>!</div>
            
            <div className={styles.textWrapper9}>Telkom Test House</div>
            <div className={styles.textWrapper10}>Visitor Reservation</div>

            <div className={styles.loginButtons}>
              <Link to="/LoginVendor">
              <button className={styles.buttonVendor}>
                <div>
                  <div>
                      Masuk sebagai Vendor
                  </div>
                  <div>
                  <span className={styles.subTextButton}>Sign as Vendor</span>
                  </div>
                </div>
              </button>
            </Link>
            <Link to="/Login">
              <button className={styles.buttonVisitor}>
              <div>
                  <div>
                  Masuk sebagai Visitor
                  </div>
                  <div>
                  <span className={styles.subTextButton}>Sign as Visitor</span>
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
