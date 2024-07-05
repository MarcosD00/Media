import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import DemoUser from "../AuthPage/DemoUser";
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
       if(data == null || data.length == 0){
        setTimeout(
          closeModal, 2500
        )
      }
    };

    
    return (
    <div className="login-form-container">
      <h2 className="auth-title">Welcome back.</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <p className="login-error" key={idx}>{error}</p>
          ))}
        </ul>
        <label>
          Email
          <input
            className="login-text-and-password-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className="login-text-and-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-submit" 
             disabled={
                password.length < 1 || email.length < 1
            }
        type="submit">Sign In</button>
      <DemoUser
              itemText="Log in as Demo User"
            />
      </form>
      <div className="no-account-container">
        <p className="no-accont-question">No account?</p> <OpenModalButton
              buttonText="Create one"
              className="create-one-btn"
              modalComponent={<SignupFormModal />}
              modalProps={{hAlign: "center", className: "modal-create-comment", id: "white-modal-background"}}
            />
      </div>  
        <p className="agreement">Click “Sign In” to agree to Media’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</p>
    </div>
  );
}

export default LoginFormPage;
