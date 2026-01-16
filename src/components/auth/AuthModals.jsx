import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { login, signup } from "../../api/api";

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

  // =================== STATE ===================
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // =================== HANDLERS ===================
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await signup({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });
      console.log("Signup success:", res);
      handleClose();
    } catch (err) {
      alert(err.message || "Signup failed");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginData);
      console.log("Login success:", res);
      handleClose();
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <>
      {/* ================= SIGNUP MODAL ================= */}
      <Modal
        show={modalToShow === "signup"}
        onHide={handleClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title as="h3" className="fw-bold">
            Create Account
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 pb-4">
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg rounded-3"
                placeholder="John Doe"
                value={signupData.name}
                onChange={handleSignupChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg rounded-3"
                placeholder="john@email.com"
                value={signupData.email}
                onChange={handleSignupChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg rounded-3"
                placeholder="••••••••"
                value={signupData.password}
                onChange={handleSignupChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control form-control-lg rounded-3"
                placeholder="••••••••"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-lg w-100 rounded-3"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-4 mb-0 text-muted">
            Already have an account?{" "}
            <a href="#" onClick={switchToLogin} className="fw-semibold">
              Login
            </a>
          </p>
        </Modal.Body>
      </Modal>

      {/* ================= LOGIN MODAL ================= */}
      <Modal
        show={modalToShow === "login"}
        onHide={handleClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title as="h3" className="fw-bold">
            Welcome Back
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 pb-4">
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg rounded-3"
                placeholder="john@email.com"
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg rounded-3"
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-lg w-100 rounded-3"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 mb-0 text-muted">
            Don’t have an account?{" "}
            <a href="#" onClick={switchToSignup} className="fw-semibold">
              Sign Up
            </a>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AuthModals;
