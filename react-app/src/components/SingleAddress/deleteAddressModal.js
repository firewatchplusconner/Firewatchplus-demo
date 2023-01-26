import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteAddress } from "../../store/addresses";

export default function DeleteAddressModal() {
    const address = useSelector(state => state.addresses.singleAddress)
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()
        history.push('/address')
        await dispatch(deleteAddress(address.id))
        await closeModal()
    }

    return (
        <div>
            <h3>Are you sure you want to delete this address and all associated data?</h3>
            <div>
                <button onClick={handleDelete}>Yes, Delete Address</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}
