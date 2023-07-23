import React from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import { useLocation } from 'react-router-dom';
import LoginForm from "../LoginForm";
import SignupFormPage from "../SignupFormPage";
import DemoUser from "./DemoUser";
import "./authPage.css"


function AuthPage() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/login' ?
      <div className="auth-main">
        <div className="auth-container">
          <div className="auth-container-section loginform-container">
            <h1 className="login-title">Log In</h1>
            <LoginForm />
            <DemoUser
              itemText="Log in as Demo User"
            />
          </div>
        </div>
      </div> 
        :
      <div className="auth-main">
        <div className="auth-container">
          <div className="auth-container-section sign-up-form-container">
            <SignupFormPage />
            <DemoUser
              itemText="Log in as Demo User"
            />
          </div>
        </div>
      </div>
      }
    </>
  );
}

export default AuthPage;
