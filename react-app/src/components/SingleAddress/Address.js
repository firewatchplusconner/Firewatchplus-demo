import React, { useEffect, useState } from "react";
import { loadSingleAddress } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateAddressForm from "./updateAddressForm";
import OpenModalButton from "../OpenModalButton";
import DeleteAddressModal from "./deleteAddressModal";

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
   // TODO - add second addres line
    return (
        <>
            {loaded && (
                <div>
                    <h2>
                        {address.firstAddressLine}{address.secondAddressLine ? ` ${address.secondAddressLine}` : ''} {address.city},{" "}
                        {address.state} {address.zipCode}
                    </h2>
                    <div>Owner: {address.ownerName}</div>
                    <div>Owner Phone Number: {address.ownerPhone}</div>
                    <div>Owner Email Address: {address.ownerEmail}</div>
                    <div>
                        Owner Address: {address.ownerFirstAddressLine}{" "}
                        {address.ownerCity}, {address.ownerState}{" "}
                        {address.ownerZipCode}
                    </div>
                    <div>
                        Notes
                        <div>{address.notes}</div>
                    </div>
                    <div>
                        Next Inspection Date: {address.nextInspectionDate}
                    </div>
                    <div className="sb mar30">
                        <div className="modal-button-container jccen w100p h40px mar10l mar10r">
                            <OpenModalButton
                                buttonText="Update Address"
                                modalComponent={<UpdateAddressForm />}
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
