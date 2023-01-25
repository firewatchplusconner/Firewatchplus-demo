import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/User/UsersList";
import User from "./components/User/User";
import AddressList from "./components/AddressList/addressList";
import { authenticate } from "./store/session";
import Address from "./components/SingleAddress/Address";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <NavBar />
            <div className="jccen bred w80p marlrauto mar20t">
                <Switch>
                    <Route path="/login" exact={true}>
                        <LoginForm />
                    </Route>
                    <Route path="/sign-up" exact={true}>
                        <SignUpForm />
                    </Route>
                    <ProtectedRoute path='/address/:addressId'>
                        <Address />
                    </ProtectedRoute>
                    <ProtectedRoute path="/address">
                        <AddressList />
                    </ProtectedRoute>
                    <ProtectedRoute path="/users" exact={true}>
                        <UsersList />
                    </ProtectedRoute>
                    <ProtectedRoute path="/users/:userId" exact={true}>
                        <User />
                    </ProtectedRoute>
                    <Route path="/" exact={true}>
                        <h1>My Home Page</h1>
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default App;
