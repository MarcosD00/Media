import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<NavLink className="home-img-btn" exact to="/">Home</NavLink>
			<div className='nav-write-profile-btn'>
				<NavLink exact to="/new-post" className="new-post-btn"><i className="create-new-icon fa-regular fa-pen-to-square"/> Write</NavLink>
				{isLoaded && (
					<ProfileButton className="profile-btn" user={sessionUser} />
				)}
			</div>
		</div>
	);
}

export default Navigation;