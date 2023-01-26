import React, { useEffect, useState } from "react";
import { loadAllAddresses } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddAddressForm from "./addAddressForm";
import "./addressList.css";

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
                className="tdnone tclight nhvr address-container"
                key={`${address.id}`}
            >
                <div className="id-container">{address.id}</div>
                <div className="address nhvr">
                    {address.firstAddressLine} {address.city}, {address.state}{" "}
                    {address.zipCode}
                </div>
                <div className="next-inspection-date">{address.nextInspectionDate ? address.nextInspectionDate : 'Pending'}</div>
            </NavLink>
        );
    });

    return (
        <>
            {loaded && (
                <div className="mar20b w60vw">
                    <div className="address-list-header-container">
                        <h1 className="address-list-header">Complete Address List</h1>
                    </div>

                    <div className="">
                        <div className="address-container-header">
                            <div className="id-container">ID</div>
                            <div className="address">Address</div>
                            <div className="next-inspection-date">
                                Next Inspection
                            </div>
                        </div>
                        {addressContent}
                    </div>
                    <div className="address-modal-button-container jccen pad20">
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
