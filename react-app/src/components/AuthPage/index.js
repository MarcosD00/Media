import React from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginForm from "../LoginForm";
import DemoUser from "./DemoUser";
import "./authPage.css"


function AuthPage() {

  return (
    <div className="auth-main">
      <div className="auth-container">
        <div className="auth-container-section signupform-container">
          <DemoUser
            itemText="Log in as Demo User"
          />
          <OpenModalButton
            buttonText="Sign Up"
            className="signup-btn"
            modalComponent={<SignupFormModal />}
          />
        </div>
        <div className="auth-container-section loginform-container">
          <h1 className="login-title">Log In</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
