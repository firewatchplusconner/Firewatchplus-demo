import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp, updateUser } from "../../store/session";
import { useModal } from "../../context/Modal";

const AddAddressForm = () => {
    const {closeModal} = useModal()
    const [errors, setErrors] = useState([]);

    return (
        <h1>Add Address form</h1>
    )
}

export default AddAddressForm
