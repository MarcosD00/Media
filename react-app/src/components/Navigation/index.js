import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation()

	return (
		<div className='nav-bar'>
			<NavLink className="home-img-btn" exact to="/">Home</NavLink>
			<div className='nav-write-profile-btn'>
				{ location.pathname !== '/new-post' && location.pathname !== '/login' ?
				<NavLink exact to="/new-post" className="new-post-btn"><i className="create-new-icon fa-regular fa-pen-to-square"/> Write</NavLink> 
				: null }

				{isLoaded && (
					<ProfileButton className="profile-btn" user={sessionUser} />
				)}
			</div>
		</div>
	);
}

export default Navigation;