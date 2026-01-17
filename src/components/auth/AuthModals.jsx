import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { login, signup, loginWithGoogle } from "../../api/api";
import googleIcon from "../../assets/Google-Logo-Icon-PNG-Photo.png";

function AuthModals({ modalToShow, setModalToShow }) {
  const handleClose = () => setModalToShow(null);

  const switchToLogin = (e) => {
    e.preventDefault();
    setModalToShow("login");
  };

  const switchToSignup = (e) => {
    e.preventDefault();
    setModalToShow("signup");
  };

  // ---------------- SIGNUP ----------------
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await signup(signupData);
      alert("Signup successful");
      handleClose();
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  // ---------------- LOGIN ----------------
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginData);
      alert("Login successful");
      handleClose();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ---------------- GOOGLE LOGIN ----------------
  const handleGoogleLoginClick = async () => {
    try {
      await loginWithGoogle();
      alert("Google login successful");
      handleClose();
    } catch (err) {
      alert(err.response?.data?.message || "Google login failed");
    }
  };

  const googleBtnStyle = {
    padding: "14px 0",
    fontSize: "16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  };

  return (
    <>
      {/* ================= SIGNUP MODAL ================= */}
      <Modal
        show={modalToShow === "signup"}
        onHide={handleClose}
        centered
        dialogClassName="auth-modal-dialog"
      >
        <Modal.Body className="p-4 p-md-5">
          <h2 className="fw-bold text-center mb-2">Create Account</h2>
          <p className="text-muted text-center mb-4">
            Join Mitronix and explore more
          </p>

          <form onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="name"
              className="form-control mb-3"
              placeholder="Full Name"
              value={signupData.name}
              onChange={handleSignupChange}
              required
            />
            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Email Address"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
            <input
              type="text"
              name="mobile"
              className="form-control mb-3"
              placeholder="Mobile Number"
              value={signupData.mobile}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="password"
              className="form-control mb-3"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              className="form-control mb-4"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              required
            />

            {/* Google Login */}
            <button
              type="button"
              className="btn btn-outline-dark w-100 mb-3"
              style={googleBtnStyle}
              onClick={handleGoogleLoginClick}
            >
              <img src={googleIcon} alt="Google" style={{ width: 28, height: 28 }} />
              Continue with Google
            </button>

            <button className="btn btn-dark w-100 py-2">Sign Up</button>
          </form>

          <p className="text-center mt-4 mb-0">
            Already have an account?{" "}
            <span
              className="fw-semibold text-decoration-underline cursor-pointer"
              onClick={switchToLogin}
            >
              Login
            </span>
          </p>
        </Modal.Body>
      </Modal>

      {/* ================= LOGIN MODAL ================= */}
      <Modal
        show={modalToShow === "login"}
        onHide={handleClose}
        centered
        dialogClassName="auth-modal-dialog"
      >
        <Modal.Body className="p-4 p-md-5">
          <h2 className="fw-bold text-center mb-2">Welcome Back</h2>
          <p className="text-muted text-center mb-4">Login to continue</p>

          <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="identifier"
              className="form-control mb-3"
              placeholder="Email or Mobile Number"
              value={loginData.identifier}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              className="form-control mb-4"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            {/* Google Login */}
            <button
              type="button"
              className="btn btn-outline-dark w-100 mb-3"
              style={googleBtnStyle}
              onClick={handleGoogleLoginClick}
            >
              <img src={googleIcon} alt="Google" style={{ width: 28, height: 28 }} />
              Continue with Google
            </button>

            <button className="btn btn-dark w-100 py-2">Login</button>
          </form>

          <p className="text-center mt-4 mb-0">
            Don’t have an account?{" "}
            <span
              className="fw-semibold text-decoration-underline cursor-pointer"
              onClick={switchToSignup}
            >
              Sign Up
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AuthModals;
