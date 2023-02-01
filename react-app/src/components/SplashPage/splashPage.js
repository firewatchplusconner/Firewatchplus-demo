import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./splashPage.css";

const SplashPage = () => {
    const user = useSelector((state) => state.session.user);

    return (
        <div className="splash-page-container">
            <div className="splash-page-header">Ready Response</div>
            <div className="description-container">
                <div className="description">
                    Ready Response is designed to help responders before they
                    arrive to an emergency. When dispatched to an address,
                    responders are able to access owner information, google maps
                    data, and details/photos from past inspections. Sign up for
                    Ready Response to be able manage addresses and inspections.
                    Currently, all users are given add, update, and delete
                    permissions. In a scalable version, these permissions would
                    be limited to organization's admin or inspectors. Join our
                    Ready Response community and be ready to respond!
                </div>
                {!user && (
                    <div className="button-container">
                        <NavLink
                            to="/sign-up"
                            exact={true}
                            activeClassName="active"
                            className="signup-login-button"
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/login"
                            exact={true}
                            activeClassName="active"
                            className="signup-login-button"
                        >
                            Login
                        </NavLink>
                    </div>
                )}
                {user && (
                    <div className="button-container">
                        <NavLink
                            to="/address"
                            exact={true}
                            activeClassName="active"
                            className="signup-login-button"
                        >
                            Addresses
                        </NavLink>
                        <NavLink
                            to="/inspection"
                            exact={true}
                            activeClassName="active"
                            className="signup-login-button"
                        >
                            Inspections
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SplashPage;
