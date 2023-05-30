import React, { useEffect, useState } from "react";
import { loadSingleAddress } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UpdateAddressForm from "./updateAddressForm";
import OpenModalButton from "../OpenModalButton";
import DeleteAddressModal from "./deleteAddressModal";
import GenerateInspectionModal from "../GenerateInspectionModal/generateInspectionModal";
import AddressInspection from "./AddressInspections/AddressInspection";
import moment from "moment";
import Map from "./GoogleMaps/Map";
import UploadImage from "./addPhotosModal";
import AddressPhotos from "./AddressPhotos/AddressPhotos";
import "./singleAddress.css";

const Address = () => {
    const { addressId } = useParams();
    const address = useSelector((state) => state.addresses.singleAddress);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    let deletable = false;
    if (address) {
        if (address.id !== 1 && address.id !== 2 && address.id !== 3) {
            deletable = true;
        }
    }

    useEffect(() => {
        dispatch(loadSingleAddress(addressId)).then((data) => {
            if (data.errors) {
                history.push("/error");
            } else {
                setLoaded(true);
            }
        });
    }, [dispatch, addressId, history, address?.images?.length]);

    if (!loaded) {
        return null;
    }

    const inspectionContent = address?.inspections?.map((inspection, i, {length}) => {
        return (
            <AddressInspection
            i = {i}
            length={length}
            key={inspection.id} inspection={inspection} />
        );
    });

    return (
        <>
            {loaded && (
                <div>
                    <h1 className="single-address-header-container">
                        {address.firstAddressLine}
                        {address.secondAddressLine
                            ? ` ${address.secondAddressLine}`
                            : ""}{" "}
                        {address.city}, {address.state} {address.zipCode}
                    </h1>
                <div className="single-address-container">
                    {address.ownerName && (
                        <div className="address-info-label-container">
                            <div className="label-container">Owner:</div>
                            <div className="info-container">
                                {address.ownerName}
                            </div>
                        </div>
                    )}
                    {address.ownerPhone && (
                        <div className="address-info-label-container">
                            <div className="label-container">
                                Owner Phone Number:
                            </div>
                            <div className="info-container">
                                {address.ownerPhone}
                            </div>
                        </div>
                    )}
                    {address.ownerEmail && (
                        <div className="address-info-label-container">
                            <div className="label-container">
                                Owner Email Address:
                            </div>
                            <div className="info-container">
                                {address.ownerEmail}
                            </div>
                        </div>
                    )}
                    {address.ownerFirstAddressLine && (
                        <div className="address-info-label-container">
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
                        <div className="address-info-label-container">
                            <div className="label-container">Notes:</div>
                            <div className="info-container">
                                <div>{address.notes}</div>
                            </div>
                        </div>
                    )}
                    <div className="address-info-label-container">
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
                    </div>
                    {address.inspections[0] && (
                        <div>
                            <h2 className="address-inspections-header mar30t">
                                Inspections
                            </h2>
                        <div className="single-address-container">
                        <div className="address-inspections-container">
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
                            </div>
                            </div>
                    )}
                    {address.images[0] && (
                        <AddressPhotos images={address.images} />
                    )}
                    {/* <div className="address-responses-container">
                        <h2 className="address-responses-header">
                            Previous Responses
                        </h2>

                        <div className="address-response-container-header">
                            <div className="address-response-top-container">
                                <div className="address-response-id-container">
                                    ID
                                </div>
                                <div className="address-response-date">
                                    Date
                                </div>
                                <div className="address-response-dept">
                                    Department
                                </div>
                                <div className="address-response-type">
                                    Type
                                </div>
                            </div>
                            <div className="address-response-bottom-container">
                                <div className="address-response-units">
                                    <div className="address-response-units-header">
                                        Units
                                    </div>
                                    <div className="address-response-units-list">
                                        <div>- Unit 1</div>
                                        <div>- Unit 2</div>
                                    </div>
                                </div>
                                <div className="address-response-description">
                                    <div className="address-response-description-header">
                                        Description
                                    </div>
                                    <div className="address-response-description-text">
                                        This is an example. Responses Feature is
                                        in development.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="address-response-container">
                            <div className="address-response-top-container">
                                <div className="address-response-id-container">
                                    5337632
                                </div>
                                <div className="address-response-date">
                                    12/25/2022 1:46am
                                </div>
                                <div className="address-response-dept">
                                    FIRE
                                </div>
                                <div className="address-response-type">
                                    Structure Fire
                                </div>
                            </div>
                            <div className="address-response-bottom-container">
                                <div className="address-response-units">
                                    <div className="address-response-units-header">
                                        Units
                                    </div>
                                    <div className="address-response-units-list">
                                        <div>- E101</div>
                                        <div>- T101</div>
                                        <div>- CARE 1203</div>
                                    </div>
                                </div>
                                <div className="address-response-description">
                                    <div className="address-response-description-header">
                                        Description
                                    </div>
                                    <div className="address-response-description-text">
                                        Christmas tree is on fire in the living room. Residents outside. Dog is still in crate in 2nd floor bedroom.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="address-response-container">
                            <div className="address-response-top-container">
                                <div className="address-response-id-container">
                                    4566764
                                </div>
                                <div className="address-response-date">
                                    11/24/2022 5:17pm
                                </div>
                                <div className="address-response-dept">
                                    EMS
                                </div>
                                <div className="address-response-type">
                                    Abd Pain
                                </div>
                            </div>
                            <div className="address-response-bottom-container">
                                <div className="address-response-units">
                                    <div className="address-response-units-header">
                                        Units
                                    </div>
                                    <div className="address-response-units-list">
                                        <div>- E101</div>
                                        <div>- SQ102</div>
                                        <div>- CARE 1411</div>
                                    </div>
                                </div>
                                <div className="address-response-description">
                                    <div className="address-response-description-header">
                                        Description
                                    </div>
                                    <div className="address-response-description-text">
                                    M/48 abdominal pain, nausea, vomitting. Negative covid symptoms. Pt says he ate too much turkey.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="address-response-container">
                            <div className="address-response-top-container">
                                <div className="address-response-id-container">
                                    3654632
                                </div>
                                <div className="address-response-date">
                                    07/04/2022 9:48pm
                                </div>
                                <div className="address-response-dept">
                                    POLICE
                                </div>
                                <div className="address-response-type">
                                    Illegal Fire
                                </div>
                            </div>
                            <div className="address-response-bottom-container">
                                <div className="address-response-units">
                                    <div className="address-response-units-header">
                                        Units
                                    </div>
                                    <div className="address-response-units-list">
                                        <div>- T105</div>
                                        <div>- PD235</div>
                                        <div>- PD230</div>
                                    </div>
                                </div>
                                <div className="address-response-description">
                                    <div className="address-response-description-header">
                                        Description
                                    </div>
                                    <div className="address-response-description-text">
                                    Caller states loud noises and explosions outside of house. She cannot tell if its fireworks or gunshots. Caller states neighbors having party.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="sb mar30">
                        <div className="modal-button-container jccen">
                            <OpenModalButton
                                buttonText="Update Address"
                                modalComponent={<UpdateAddressForm />}
                            />
                        </div>
                        <div className="modal-button-container jccen">
                            <OpenModalButton
                                buttonText="Add Inspection"
                                modalComponent={<GenerateInspectionModal />}
                            />
                        </div>
                        <div className="modal-button-container jccen">
                            <OpenModalButton
                                buttonText="Add Images/Plans"
                                modalComponent={<UploadImage />}
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
