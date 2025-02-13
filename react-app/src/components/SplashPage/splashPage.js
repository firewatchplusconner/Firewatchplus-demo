import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./splashPage.css";
import { Plus } from 'tabler-icons-react';

const SplashPage = () => {
    const user = useSelector((state) => state.session.user);

    return (
        <div className="splash-page-container">
            <div className="splash-page-header">Firewatch 
            <Plus size={48} color="#ffe5b4" className="mar10r" />
            </div>
            <div className="description-container">
                <div className="description">
                    Firewatch Plus is designed to help responders before and during a fire
                    inspection. When dispatched to an address,
                    responders are able to access owner information, google maps
                    data, details from past inspections, and images/plans for the address. Sign up for
                    Firewatch Plus to be able manage addresses and inspections.
                    Currently, all users are given add, update, and delete
                    permissions. In a scalable version, these permissions would
                    be limited to organization's admin or inspectors. Join our
                    Firewatch Plus community and be ready to respond!
                </div>
            </div>
                {!user && (
                    <div className="button-container">
                        {/* <NavLink
                            to="/sign-up"
                            exact={true}
                            activeClassName="active"
                            className="signup-login-button"
                        >
                            Sign Up
                        </NavLink> */}
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
                {/* {user && (
                    <div className="button-container">
                        <NavLink
                            to="/address"
                            className="signup-login-button"
                        >
                            Addresses
                        </NavLink>
                        <NavLink
                            to="/inspection"
                            className="signup-login-button"
                        >
                            Inspections
                        </NavLink>
                    </div>
                )} */}
        </div>
    );
};

export default SplashPage;
