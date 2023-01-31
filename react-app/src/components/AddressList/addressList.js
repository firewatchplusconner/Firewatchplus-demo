import React, { useEffect, useState } from "react";
import { loadAllAddresses } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddAddressForm from "./addAddressForm";
import moment from "moment";
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
        return <div className="placeholder"></div>;
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
                    {address.firstAddressLine}
                    {address.secondAddressLine
                        ? ` ${address.secondAddressLine}`
                        : ""}{" "}
                    {address.city}, {address.state} {address.zipCode}
                </div>
                <div className="next-inspection-date">
                    {address.nextInspectionDate
                        ? `${moment(address.nextInspectionDate).format(
                            "L"
                        )}`
                        : "Pending"}
                </div>
            </NavLink>
        );
    });

    return (
        <>
            {loaded && (
                <div className="mar20b w100p address-list-container">
                    <div className="address-list-header-container">
                        <h1 className="address-list-header">
                            All Addresses
                        </h1>
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
