import React, { useEffect, useState } from "react";
import { loadSingleAddress } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateAddressForm from "./updateAddressForm";
import OpenModalButton from "../OpenModalButton";
import DeleteAddressModal from "./deleteAddressModal";
import GenerateInspectionModal from "../GenerateInspectionModal/generateInspectionModal";
import "./singleAddress.css";

const Address = () => {
    const { addressId } = useParams();
    const address = useSelector((state) => state.addresses.singleAddress);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    let deletable = false;
    if (address) {
        if (address.id !== 1 && address.id !== 2 && address.id !== 3) {
            deletable = true;
        }
    }

    useEffect(() => {
        dispatch(loadSingleAddress(addressId)).then(() => setLoaded(true));
    }, [dispatch, addressId]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            {loaded && (
                <div className="single-address-container">
                    <h2 className="single-address-header-container">
                        {address.firstAddressLine}
                        {address.secondAddressLine
                            ? ` ${address.secondAddressLine}`
                            : ""}{" "}
                        {address.city}, {address.state} {address.zipCode}
                    </h2>
                    <div className="info-label-container">
                        <div className="label-container">Owner:</div>
                        <div className="info-container">
                            {address.ownerName}
                        </div>
                    </div>
                    <div className="info-label-container">
                        <div className="label-container">
                            Owner Phone Number:
                        </div>
                        <div className="info-container">
                            {address.ownerPhone}
                        </div>
                    </div>
                    <div className="info-label-container">
                        <div className="label-container">
                            Owner Email Address:
                        </div>
                        <div className="info-container">
                            {address.ownerEmail}
                        </div>
                    </div>
                    <div className="info-label-container">
                        <div className="label-container">Owner Address:</div>
                        <div className="info-container">
                            {address.ownerFirstAddressLine} {address.ownerCity},{" "}
                            {address.ownerState} {address.ownerZipCode}
                        </div>
                    </div>
                    {address.notes && (
                        <div className="info-label-container">
                            <div className="label-container">Notes:</div>
                            <div className="info-container">
                                <div>{address.notes}</div>
                            </div>
                        </div>
                    )}
                    <div className="info-label-container">
                        <div className="label-container">
                            Next Inspection Date:
                        </div>
                        <div className="info-container">
                            {address.nextInspectionDate
                                ? address.nextInspectionDate
                                : "Pending"}
                        </div>
                    </div>
                    <div className="sb mar30">
                        <div className="modal-button-container jccen w100p h40px mar10l mar10r">
                            <OpenModalButton
                                buttonText="Update Address"
                                modalComponent={<UpdateAddressForm />}
                            />
                        </div>
                        <div className="modal-button-container jccen w100p h40px mar10l mar10r">
                            <OpenModalButton
                                buttonText="Add Inspection"
                                modalComponent={<GenerateInspectionModal />}
                            />
                        </div>
                        {deletable && (
                            <div className="modal-button-container jccen w100p h40px mar10l mar10r">
                                <OpenModalButton
                                    buttonText="Delete Address"
                                    modalComponent={<DeleteAddressModal />}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Address;
