import React from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import MediaMovingLogo from './mediaMovingLogo'
import "./Landing.css"

function LandingPage () {

    return (
        <>
            <div className="landing-page-top-section">
                <div className="slogan-side">
                    <h1 className="landing-title">Stay curious.</h1>
                    <h2 className="landing-slogan-frase">Discover stories, thinking, and expertise from writers on any topic.</h2>
                    <div className="start-reading-container">
                        <OpenModalButton
                                    buttonText="Start reading"
                                    fontSize={"20px"}
                                    className="start-reading-btn"
                                    modalComponent={<SignupFormModal />}
                                    modalProps={{hAlign: "center", className: "modal-create-comment", id: "white-modal-background"}}
                                />
                    </div>
                </div>
                <div>
                    <MediaMovingLogo />
                </div>
            </div>
        </>
    )
}

export default LandingPage;