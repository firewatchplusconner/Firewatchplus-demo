import React, { useEffect, useState } from "react";
import { loadAllAddresses } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddAddressForm from "./addAddressForm";
import moment from "moment";
import "./addressList.css";
import { BuildingCommunity } from 'tabler-icons-react';

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

    const addressContent = addressList.map((address, i, {length}) => {
        return (
            <NavLink
                to={`/address/${address.id}`}
                className="tdnone tclight address-container"
                key={`${address.id}`}
                style={{borderBottom: (length - 1 === i) && 'none' }}

            >
                <div className="id-container">{address.id}</div>
                <div className="address">
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
                <div className = "fdcol">
                    <h1 className="address-list-header jccen aicen mar10l">
                    <BuildingCommunity size={48} color="#ffe5b4" className="mar10r" />
                        Addresses
                    </h1>
                <div className="mar20b w100p address-list-container">

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
