import React, { useState } from 'react';
import AuthModals from '../auth/AuthModals';

// Assume you have these assets in src/assets/icons/ and src/assets/images/
const logoBanner = 'src/assets/MILTRONIX APP DESIGN 3.png';
const cartIcon = 'src/assets/SVG.svg';
const userIcon = 'src/assets/Icon 6.svg';

function Header() {
  // State to manage which modal is visible
  const [modalToShow, setModalToShow] = useState(null); // 'login', 'signup', or null

  return (
    <>
      <div className="fixed-top">
        <section className="miltronix-banner d-flex justify-content-center align-items-center">
          <img src={logoBanner} alt="Miltronix Logo" className="img-fluid miltronix-logo" />
        </section>
        
        <div className="header-container bg-transparent d-flex justify-content-between align-items-center px-4 py-2">
          <a href="#" className="text-decoration-none see-more">
            <div className="cart-box d-flex align-items-center justify-content-center">
              <img src={cartIcon} alt="Cart" className="me-lg-2" width="16" height="16" />
              <span className="d-none d-lg-block">Cart</span>
            </div>
          </a>

          {/* Search Bar */}
          <div
            className="search-bar d-lg-flex d-none align-items-center px-3 py-1"
            style={{ flex: '0 1 45%', marginLeft: 'auto', justifyContent: 'space-between' }}
          >
            <div className="d-flex align-items-center me-2">
              <img src="src/assets/Icon 2.svg" alt="Location" className="me-2" width="16" height="16" />
              <span className="text-nowrap text-muted">Set location</span>
            </div>
            <div className="vr mx-2"></div>
            <img src="src/assets/Icon 3.svg" alt="Location" className="me-1" width="16" height="16" />
            <input
              type="text"
              className="form-control border-0 shadow-none p-0 search-input"
              placeholder="Search for LED TV, CCTV, Video Wall...."
            />
            <span className="ms-2 text-nowrap">
              <strong>All</strong>
              <img src="src/assets/Icon 4.svg" alt="Location" className="me-1 ms-2" width="16" height="16" />
            </span>
          </div>

          {/* wishlist */}

          <div className="wishlist-box overflow-hidden mx-l-5 mx-1" link="#" style={{ cursor: 'pointer' }}>
            <img src="src/assets/icon 5.svg" alt="Wishlist" className="img-fluid w-100 h-100 object-fit-cover" />
          </div>

          <div
            className="signup-box d-flex align-items-center justify-content-center"
            onClick={() => setModalToShow('signup')}
            style={{ cursor: 'pointer' }}
          >
            <img src={userIcon} alt="Sign Up" className="me-lg-2" width="16" height="16" />
            <span className="d-none d-lg-block">Sign/Signup</span>
          </div>
        </div>
      </div>

      <AuthModals
        modalToShow={modalToShow}
        setModalToShow={setModalToShow}
      />
    </>
  );
}

export default Header;