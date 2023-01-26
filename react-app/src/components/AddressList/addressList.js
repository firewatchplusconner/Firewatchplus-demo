import React, { useEffect, useState } from "react";
import { loadAllAddresses } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddAddressForm from "./addAddressForm";

const AddressList = () => {
    const addresses = useSelector((state) => state.addresses.allAddresses);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllAddresses()).then(() => setLoaded(true));
    }, [dispatch]);

    let addressList = null;
    if (addresses) {
        addressList = Object.values(addresses);
    }

    if (!loaded) {
        return null;
    }

    const addressContent = addressList.map((address) => {
        return (
            <NavLink
                to={`/address/${address.id}`}
                className="tdnone tclight mar20 nhvr"
                key={`${address.id}`}
            >
                <div className="nhvr">
                    {address.firstAddressLine} {address.city}, {address.state}{" "}
                    {address.zipCode}
                </div>
            </NavLink>
        );
    });

    return (
        <>
            {loaded && (
                <div className="mar20b">
                    <h2>Address List</h2>
                    <div>{addressContent}</div>
                    <div className="modal-button-container jccen">
                        <OpenModalButton
                            buttonText="Add Address"
                            modalComponent={<AddAddressForm />}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default AddressList;
