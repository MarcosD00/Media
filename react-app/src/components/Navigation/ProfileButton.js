import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      // if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      // }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(setShowMenu(false))
    history.push("/landing")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user &&
        <>
          <button className="nav-profile-btn nav-user-button" onClick={openMenu}>
            Profile
            <img className="nav-profile-photo-btn" src="https://myaaprojects.s3.us-east-2.amazonaws.com/profile-circle.png"/>
            <ul className={ulClassName} ref={ulRef}>
              <div className="user-info-container">
                <p className="nav-dropdown-li">{user.username}</p>
                <p className="nav-dropdown-li">{user.first_name} {user.last_name}</p>
                <p className="nav-dropdown-li">{user.email}</p>
                <p className="nav-dropdown-li nav-dropdown-sing-out" onClick={handleLogout}>Sign Out</p>
              </div>
            </ul>
          </button>
        </>
      }
    </>
  );
}

export default ProfileButton;
