import React, { useEffect, useState } from "react";
import { loadSingleAddress } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Address = () => {
    const { addressId } = useParams()
    const address = useSelector((state) => state.addresses.singleAddress);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSingleAddress(addressId)).then(() => setLoaded(true));
    }, [dispatch, addressId]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            {loaded && (
                <div>
                    <h2>{address.firstAddressLine} {address.city}, {address.state} {address.zipCode}</h2>
                    <div>Owner: {address.ownerName}</div>
                    <div>Owner Phone Number: {address.ownerPhone}</div>
                    <div>Owner Email Address: {address.ownerEmail}</div>
                    <div>Owner Address: {address.ownerFirstAddressLine} {address.ownerCity}, {address.ownerState} {address.ownerZipCode}</div>
                    <div>Notes
                        <div>{address.notes}</div>
                    </div>
                    <div>Next Inspection Date: {address.nextInspectionDate}</div>
                </div>
            )}
        </>
    )
}

export default Address
