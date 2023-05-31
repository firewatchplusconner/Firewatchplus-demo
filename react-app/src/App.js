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
import Footer from "./components/Footer/Footer";
import SplashPage from "./components/SplashPage/splashPage";
import ErrorPage from "./components/404Page/404page";
import { authenticate } from "./store/session";
import Address from "./components/SingleAddress/Address";

function App() {
    // TODO - more seed data!
    // TODO - note about deleting inspection images is not intuitive
    // TODO - note on add address form that addresses are validated using google api (and owner address)
    // TODO - previous responses for address in production
    // TODO - check Scroll height between pages
    // TODO - edit favicon
    // TODO - add siren to 404 page
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
        <div className="w100p bsbb fdcol h100p sb">
            <NavBar />
            <div className="jccen w80p marlrauto mar20t mw1000px mh75vh">
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
                        <SplashPage />
                    </Route>
                    <Route path='/error' exact={true}>
                        <ErrorPage />
                    </Route>
                    <Route path=''>
                        <ErrorPage />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default App;
