import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginForm from "../LoginForm";
import mediaLogo from "../../assets/mediaLogo.png"
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation()

	let navBarclass
	if(location.pathname === "/landing"){
		navBarclass = 'landing-nav-bar'
	} else {
		navBarclass = 'nav-bar'
	}

	if(location.pathname === '/landing' ){
		return (
			<div className={navBarclass}>
					<NavLink exact to="/"><img className='home-img-btn' src={mediaLogo}></img></NavLink>
					<NavLink className="landing-media-title" exact to="/">Media</NavLink>
				<div className='nav-write-profile-btn'>
				<OpenModalButton
					buttonText="Write"
					className="sign-in-btn"
					modalComponent={<LoginForm />}
					modalProps={{hAlign: "center", className: "modal-create-comment", id: "white-modal-background"}}
					/>
					<OpenModalButton
						buttonText="Sign In"
						className="sign-in-btn"
						modalComponent={<LoginForm />}
						modalProps={{hAlign: "center", className: "modal-create-comment", id: "white-modal-background"}}
					/>
					<OpenModalButton
						buttonText="Get started"
						className="get-started-btn"
						modalComponent={<SignupFormModal />}
						modalProps={{hAlign: "center", className: "modal-create-comment", id: "white-modal-background"}}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div className='nav-bar'>
				<img className='home-img-btn' src={mediaLogo}></img>
				<NavLink className="media-title" exact to="/">Media</NavLink>
				<div className='nav-write-profile-btn'>
					{ location.pathname !== '/new-post' && location.pathname !== '/landing'?
					<NavLink exact to="/new-post" className="new-post-btn"><i className="create-new-icon fa-regular fa-pen-to-square"/> Write</NavLink> 
					: null }
	
					{ location.pathname === '/landing'? (
					<NavLink exact to="/new-post" className="new-post-btn"> Write</NavLink> )
					: null }
					
	
					{isLoaded && (
						<ProfileButton className="profile-btn" user={sessionUser} />
					)}
				</div>
			</div>
		);
	}
}

export default Navigation;