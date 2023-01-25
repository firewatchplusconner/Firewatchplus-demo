import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";

const NavBar = () => {
    const user = useSelector((state) => state.session.user);

    return (
        <div className="jccen lighterbg pad30">
            <nav className="flex sb tdnone w70p sticky">
                <div>
                    <NavLink
                        to="/"
                        exact={true}
                        activeClassName="active"
                        className="tdnone tclight"
                    >
                        Home
                    </NavLink>
                </div>
                {user && (
                    <div>
                        <NavLink to="/address" className="tdnone tclight">
                            Addresses
                        </NavLink>
                    </div>
                )}
                {/* <div>
                    <NavLink to="/users" exact={true} activeClassName="active" className='tdnone tclight'>
                        Users
                    </NavLink>
                </div> */}
                {!user && (
                    <>
                        <div>
                            <NavLink
                                to="/sign-up"
                                exact={true}
                                activeClassName="active"
                                className="tdnone tclight"
                            >
                                Sign Up
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/login"
                                exact={true}
                                activeClassName="active"
                                className="tdnone tclight"
                            >
                                Login
                            </NavLink>
                        </div>
                    </>
                )}
                {user &&
                <div>
                    <LogoutButton />
                </div>}
            </nav>
        </div>
    );
};

export default NavBar;
