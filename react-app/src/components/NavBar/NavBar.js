import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import { HomePlus } from 'tabler-icons-react';
const NavBar = () => {
    const user = useSelector((state) => state.session.user);

    return (
        <div className="flex sb lighterbg pad10">
                    <div>
                        <NavLink
                            to="/"
                            exact={true}
                            activeClassName="active"
                            className="tdnone tclight lighthover flarr mar10r mar10l"
                        >
                            <HomePlus size={48} color="white" className="mar10r" />
                        </NavLink>
                    </div>
                    
                    <div className="flex jccen aicen" >

                {user && (
                    <>
                        <div>
                            <NavLink
                                to="/address"
                                className="tdnone tclight lighthover flarr mar10r mar10l" 
                            >
                                Addresses
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                to="/inspection"
                                className="tdnone tclight lighthover flarr mar10r mar10l"
                            >
                                Inspections
                            </NavLink>
                        </div>
                    </>
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
                                to="/login"
                                exact={true}
                                activeClassName="active"
                                className="tdnone tclight lighthover flarr mar10r mar10l"
                            >
                                Login
                            </NavLink>
                        </div>
                    </>
                )}
                </div>
                {user && (
                    <div className = "flex jccen aicen">
                        <LogoutButton />
                    </div>
                )}
        </div>
    );
};

export default NavBar;
