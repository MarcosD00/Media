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
    setTimeout(
      closeModal, 2500
    )
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <h2>Welcome back.</h2>
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
        type="submit">Log In</button>
      </form>
      <DemoUser
              itemText="Log in as Demo User"
            />
      <p>No account?</p> <OpenModalButton
            buttonText="Create one"
            className="sign-in-btn"
            modalComponent={<SignupFormModal />}
          />
    </>
  );
}

export default LoginFormPage;
