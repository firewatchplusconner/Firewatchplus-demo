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
import InspectionList from "./components/InspectionList/inspectionList";
import Inspection from "./components/SingleInspection/singleInspection";
import AddInspectionForm from "./components/AddUpdateInspection/addInspectionForm";
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
            <div className="jccen w80p marlrauto mar20t mw1000px">
                <Switch>
                    <Route path="/login" exact={true}>
                        <LoginForm />
                    </Route>
                    <Route path="/sign-up" exact={true}>
                        <SignUpForm />
                    </Route>
                    <ProtectedRoute path='/address/:addressId/inspection/:inspectionId' exact={true}>
                        <AddInspectionForm />
                    </ProtectedRoute>
                    <ProtectedRoute path='/address/:addressId' exact={true}>
                        <Address />
                    </ProtectedRoute>
                    <ProtectedRoute path="/address" exact={true}>
                        <AddressList />
                    </ProtectedRoute>
                    <ProtectedRoute path='/inspection/:inspectionId' exact={true}>
                        <Inspection />
                    </ProtectedRoute>
                    <ProtectedRoute path='/inspection' exact={true}>
                        <InspectionList />
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
