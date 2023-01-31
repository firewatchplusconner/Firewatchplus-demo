import React, { useEffect, useState } from "react";
import { loadSingleAddress } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateAddressForm from "./updateAddressForm";
import OpenModalButton from "../OpenModalButton";
import DeleteAddressModal from "./deleteAddressModal";
import GenerateInspectionModal from "../GenerateInspectionModal/generateInspectionModal";
import AddressInspection from "./AddressInspections/AddressInspection";
import moment from "moment";
import Map from "./GoogleMaps/Map";
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

    const inspectionContent = address.inspections?.map((inspection) => {
        return (
            <AddressInspection key={inspection.id} inspection={inspection} />
        );
    });

    return (
        <>
            {loaded && (
                <div className="single-address-container">
                    <h1 className="single-address-header-container">
                        {address.firstAddressLine}
                        {address.secondAddressLine
                            ? ` ${address.secondAddressLine}`
                            : ""}{" "}
                        {address.city}, {address.state} {address.zipCode}
                    </h1>
                    {address.ownerName && (
                        <div className="info-label-container">
                            <div className="label-container">Owner:</div>
                            <div className="info-container">
                                {address.ownerName}
                            </div>
                        </div>
                    )}
                    {address.ownerPhone && (
                        <div className="info-label-container">
                            <div className="label-container">
                                Owner Phone Number:
                            </div>
                            <div className="info-container">
                                {address.ownerPhone}
                            </div>
                        </div>
                    )}
                    {address.ownerEmail && (
                        <div className="info-label-container">
                            <div className="label-container">
                                Owner Email Address:
                            </div>
                            <div className="info-container">
                                {address.ownerEmail}
                            </div>
                        </div>
                    )}
                    {address.ownerFirstAddressLine && (
                        <div className="info-label-container">
                            <div className="label-container">
                                Owner Address:
                            </div>
                            <div className="info-container">
                                {address.ownerFirstAddressLine}
                                {address.ownerSecondAddressLine
                                    ? ` ${address.ownerSecondAddressLine}`
                                    : ""}{" "}
                                {address.ownerCity}, {address.ownerState}{" "}
                                {address.ownerZipCode}
                            </div>
                        </div>
                    )}
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
                                ? `${moment(address.nextInspectionDate).format(
                                      "L"
                                  )}`
                                : "Pending"}
                        </div>
                    </div>
                    <div className="address-map-container-outer">
                        <Map address={address} />
                    </div>
                    {address.inspections[0] && (
                        <div className="address-inspections-container">
                            <h2 className="address-inspections-header">
                                Inspections
                            </h2>
                            <div>
                                <div className="address-inspection-container-header">
                                    <div className="address-id-container">
                                        ID
                                    </div>
                                    <div className="address-inspection-date">
                                        Date
                                    </div>
                                    <div className="address-inspection-number">
                                        Number
                                    </div>
                                    <div className="address-inspection-inspector">
                                        Inspector
                                    </div>
                                    <div className="address-inspection-status">
                                        Status
                                    </div>
                                </div>
                                {inspectionContent}
                            </div>
                        </div>
                    )}
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
