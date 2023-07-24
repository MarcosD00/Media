import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormPage from "../LoginForm";
import OpenModalButton from "../OpenModalButton";
import DemoUser from "../AuthPage/DemoUser";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		let errors = [];

		if (submitted) {
			if (!first_name.trim()) errors.push('First name is required');
			if (!last_name.trim()) errors.push('Last name is required');
			if (!email.trim()) errors.push('Email is required');
			if (!email.includes('@')) errors.push('Must be a valid email');
			if (!username.trim() || username.trim().length < 4) errors.push('Username is required and must be at least 4 characters');
			if (!password.trim()) errors.push('Password is required');
			if (password.trim().length < 6) errors.push('Password must be 6 characters or more');
			if (!confirmPassword.trim()) errors.push('Confirm password field is required');
		}

		setErrors(errors);
	}, [submitted, first_name, last_name, email, username, password, confirmPassword]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(errors.length) return null
		setSubmitted(true);
		if (password === confirmPassword) {
			setErrors([]);
			try {
				await dispatch(
					signUp({
						email: email,
						password: password,
						username: username,
						first_name: first_name,
						last_name: last_name,
					})
				).then(() => {
					closeModal()
					window.location.href = '/'
				})
			} catch (error) {
				if (Array.isArray(error)) {
					setErrors(error);
				}
				else {
					setErrors(["An error occured. Please try again"])
				}
			};
		} else if (password !== confirmPassword) {
			setErrors(["Confirm Password field must be the same as the Password field"]);
		}
	};

	return (
		<div className='signup-modal-container'>
			<h2 className="auth-title">Join Media</h2>
			<div className="signup-form">
				{submitted && errors.email && <p className="error">{errors.email}</p>}
				{submitted && errors.username && <p className="error">{errors.username}</p>}
				{submitted && errors.firstName && <p className="error">{errors.firstName}</p>}
				{submitted && errors.lastName && <p className="error">{errors.lastName}</p>}
				{submitted && errors.password && <p className="error">{errors.password}</p>}
				{submitted && errors.map((error, index) => <p className="error" key={index}>{error}</p>)}
				<label>
					Email
				</label>
				<input
					className="login-text-and-password-input"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label>
					Username
				</label>
				<input
					className="login-text-and-password-input"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label>
					First Name
				</label>
				<input
					className="login-text-and-password-input"
					type="text"
					value={first_name}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<label>
					Last Name
				</label>
				<input
					className="login-text-and-password-input"
					type="text"
					value={last_name}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				<label>
					Password
				</label>
				<input
					className="login-text-and-password-input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<label>
					Confirm Password
				</label>
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
					disabled={Object.values(errors).length > 0 || email.length < 4 || !email.includes('@')}
					id={Object.values(errors).length > 0 ? 'sign-up-disabled' : 'sign-up-active'}
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
