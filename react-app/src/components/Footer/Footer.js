import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-info-outer-container">
                <div className="footer-info-container">
                    <div className="footer-info-header">Technologies:</div>
                    <div className="technologies-div">
                        <div className="technology">React</div>
                        <div className="technology">JSX</div>
                        <div className="technology">Redux</div>
                    </div>
                    <div className="technologies-div">
                        <div className="technology">HTML/CSS</div>
                        <div className="technology">Javascript</div>
                        <div className="technology">Python 3</div>
                    </div>
                    <div className="technologies-div">
                        <div className="technology">SQLAlchemy</div>
                        <div className="technology">Flask</div>
                        <div className="technology">PostgreSQL</div>
                    </div>
                    <div className="technologies-div">
                        <div className="technology">SQLite3</div>
                        <div className="technology">Alembic</div>
                        <div className="technology">Google API</div>
                    </div>
                </div>
                <div className="footer-info-container">
                    <div className="footer-info-header">Developer Links:</div>
                    <div className="developer-links-container">
                        <a href='https://github.com/owencshoop' className="developer-link" target='_blank' rel="noreferrer" alt='github'>
                            <img src='/assets/github.png' className="link-image"></img>
                        </a>
                        <a href='https://www.linkedin.com/in/owen-shoop-62ba36231/' className="developer-link" target='_blank' rel="noreferrer" alt='linkedin'>
                            <img src='/assets/linkedin.png' className="link-image"></img>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
