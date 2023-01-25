import React, { useEffect, useState } from "react";
import { loadAllAddresses } from "../../store/addresses";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const AddressList = () => {
    const addresses = useSelector((state) => state.addresses.allAddresses);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllAddresses()).then(() => setLoaded(true));
    }, []);

    let addressList = null;
    if (addresses) {
        addressList = Object.values(addresses);
    }

    if (!loaded) {
        return null;
    }

    const addressContent = addressList.map(address => {
        return (
            <NavLink to={`/address/${address.id}`} className="tdnone tclight mar20 nhvr">
                <div className="nhvr">{address.firstAddressLine} {address.city}, {address.state} {address.zipCode}</div>
            </NavLink>
        )
    })

    return (
        <>
            {loaded && (
                <div>
                    <h2>Address List</h2>
                    <div>{addressContent}</div>
                </div>
            )}
        </>
    );
};

export default AddressList;
