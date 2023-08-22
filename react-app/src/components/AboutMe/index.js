import React from "react";
import "./AboutMeStyle.css"

function AboutMe () {

    return (
        <div className="about-me-section">
            <div className="about-me-content">
                <h2>Skills Used</h2>
                <div className="skills-container">
                    <div className="skill-section">
                        <img className="skill-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/html-circle.png" alt="" />
                        <img className="skill-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/css.png" alt=""></img>
                        <img className="skill-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/js.png" alt=""></img>
                        <img className="skill-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/flask.png" alt=""></img>
                    </div>
                    <div className="skill-section">
                        <img className="skill-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/react.png" alt=""></img>
                        <img className="skill-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/redux.png" alt=""></img>
                        <img className="skill-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/Python-Symbol.png" alt=""></img>
                        <img className="skill-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/postgress-circle.png" alt=""></img>
                    </div>
                </div>
                
            </div>

            <div className="about-me-content">
                <h2>Learn A Bit About Me</h2>
                <a href="https://marcosd00.github.io/">
                    <img className="aboutme-photo" src="../../profilepic.jpg"></img>
                </a>

                <p>Passionate developer shaping the digital landscape, merging creativity and code on this medium clone platform.</p>
                <div className="links-container">
                    <a className="links" href="https://marcosd00.github.io/">Portfolio</a>
                    <a className="links" href="https://www.linkedin.com/in/marcos-d-del-valle-46a590239/">Link-In</a>
                </div>
            </div>    
            <div className="about-me-content">
                <h2>Other Projects</h2>
                <a href="https://kora-group-project.onrender.com/login">
                    <img className="project-img" src="../../kora-page.jpg"></img>
                </a>
                <p>At this location, you will discover additional information pertaining to both my background and ongoing projects. Furthermore, the repository for the project is conveniently provided below</p>
                <div className="links-container">
                    <a className="links" href="https://github.com/MarcosD00/Media">Project Repo</a>
                    <a className="links" href="https://github.com/MarcosD00">Github</a>
                </div>
            </div>
        </div>
    )
}

export default AboutMe;