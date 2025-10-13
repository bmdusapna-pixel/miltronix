import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const googleIcon = '/assets/devicon_google.png';

// This component receives props to control its visibility
function AuthModals({ modalToShow, setModalToShow }) {
  
  const handleClose = () => setModalToShow(null);
  
  const switchToLogin = () => setModalToShow('login');
  const switchToSignup = () => setModalToShow('signup');

  return (
    <>
      {/* Signup Modal */}
      <Modal show={modalToShow === 'signup'} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title as="h2">Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {/* Signup form fields go here */}
          <p className="mt-3 mb-0">
            Have an account? <a href="#" onClick={switchToLogin}>Log in</a>
          </p>
        </Modal.Body>
      </Modal>

      {/* Login Modal */}
      <Modal show={modalToShow === 'login'} onHide={handleClose} centered>
         <Modal.Header closeButton>
          <Modal.Title as="h2">Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
           {/* Login form fields go here */}
           <p className="mt-3 mb-0">
            Don't have an account? <a href="#" onClick={switchToSignup}>Sign Up</a>
           </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AuthModals;