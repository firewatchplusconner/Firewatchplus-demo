import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./404page.css";

const ErrorPage = () => {

    return (
        <div className="splash-page-container">
            <div className="splash-page-header">404: Page Not Found</div>
            <div className="error-description-container">
                <div className="404-description">
                    The requested page does not exist. Return home
                </div>

                <div className="button-container">
                    <NavLink
                        to="/"
                        exact={true}
                        activeClassName="active"
                        className="signup-login-button"
                    >
                        Home
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
