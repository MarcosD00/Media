import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormPage from "../LoginForm";
import OpenModalButton from "../OpenModalButton";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validation, setVavidation] = useState([])
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	let err = {}

			if (!email.trim()) err['email'] = 'email is required';
			if (!email.includes('@')) err['email'] = 'valid email is required'
			if (!username.trim() || username.trim().length < 4) err['username'] = 'Username is required and must be at least 4 characters';
			if (!first_name.trim()) err['firstName'] = 'First name is required';
			if (!last_name.trim()) err['lastName'] = 'Last name is required';
			if (!password.trim()) err['password'] = 'Password is required';
			if (password.length < 6) err['password'] = 'Password must be 6 characters or more';
			if (password.length && !confirmPassword.trim()) err['confirmPassword'] = 'Confirm password field is required';
			if (password !== confirmPassword) err['confirmPassword'] = "The confirmation password doesn't match the password";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors(err)
		if (!Object.values(err).length) {
			const data = await dispatch(signUp({
				email: email,
				password: password,
				username: username,
				first_name: first_name,
				last_name: last_name,
			}))
			if(data.length){
				setVavidation(data)
			}else{
				window.location.href = '/'
				closeModal()
			}
			
		}
	};

	let mustBeValid
		if (!email.includes('@')) mustBeValid = "- *Your email must contain a '@' to be valid*"

	return (
		<div className='signup-modal-container'>
			<h2 className="auth-title">Join Media</h2>
			<div className="signup-form">
				{/* {submitted && errors.length ? <h3 className="signup-error-title">Please complete each field as requested</h3> : null}
				{submitted && errors.map((error, index) => <p className="signup-error" key={index}>{error}</p>)} */}
				{validation.length > 0 && validation.map((error, index) => <p className="signup-error" key={index}>{error}</p>)}
				<label>Email</label>
				{errors.email && <p className="error">{errors.email}</p>}
				<input
					className="login-text-and-password-input"
					type="text"
					value={email}
					placeholder={mustBeValid}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label>Username</label>
				{errors.username && <p className="error">{errors.username}</p>}
				<input
					className="login-text-and-password-input"
					type="text"
					value={username}
					placeholder=""
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label>First Name</label>
				{errors.firstName && <p className="error" >{errors.firstName}</p>}
				<input
					className="login-text-and-password-input"
					type="text"
					value={first_name}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<label>Last Name</label>
				{errors.lastName && <p className="error">{errors.lastName}</p>}
				<input
					className="login-text-and-password-input"
					type="text"
					value={last_name}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				<label>Password</label>
				{errors.password && <p className="error">{errors.password}</p>}
				<input
					className="login-text-and-password-input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<label>Confirm Password</label>
				{errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
				<input
					className="login-text-and-password-input"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<div>
				<button
					onClick={handleSubmit}
					className="login-submit" 
					// disabled={Object.values(errors).length > 0 || email.length < 4 || !email.includes('@')}
					// id={Object.values(errors).length > 0 ? 'sign-up-disabled' : 'sign-up-active'}
				>Sign Up</button>
				</div>
				<div className="no-account-container">
				<p className="already-accont-question">Already have an account?</p> 
				<OpenModalButton
					buttonText="Sign In"
					className="have-account-sign-in-btn"
					modalComponent={<LoginFormPage />}
					modalProps={{hAlign: "center", className: "modal-create-comment", id: "white-modal-background"}}
					/>
      			</div>  
			<p className="agreement">Click “Sign Up” to agree to Media’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</p>
			</div>
		</div>
	);
}

export default SignupFormModal;
