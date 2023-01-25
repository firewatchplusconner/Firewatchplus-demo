import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addAddress } from "../../store/addresses";

const AddAddressForm = () => {
    const { closeModal } = useModal();
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [firstAddressLine, setFirstAddressLine] = useState("");
    const [secondAddressLine, setSecondAddressLine] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [ownerFirstAddressLine, setOwnerFirstAddressLine] = useState("");
    const [ownerSecondAddressLine, setOwnerSecondAddressLine] = useState("");
    const [ownerCity, setOwnerCity] = useState("");
    const [ownerState, setOwnerState] = useState("");
    const [ownerZipCode, setOwnerZipCode] = useState("");
    const [notes, setNotes] = useState("");
    const [nextInspectionDate, setNextInspectionDate] = useState("");
    const dispatch = useDispatch()
    const singleAddress = useSelector(state => state.addresses.singleAddress)

    const states = [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ];
    const stateOptions = states.map((state) => {
        return <option key={state} value={state}>{state}</option>;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(addAddress({firstAddressLine, secondAddressLine, city, state, zipCode, ownerName, ownerEmail, ownerFirstAddressLine, ownerSecondAddressLine, ownerCity, ownerState, ownerZipCode, notes, nextInspectionDate}))
        if (data) {
            setErrors(data);
        } else {
            await closeModal()
            history.push(`/address/${singleAddress.id}`)
        }
    };

    return (
        <div className="pad30 fdcol w30vw">
            <h1>Add Address</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className="fdcol mar20b">
                    <label>Street Address *</label>
                    <input
                        type="text"
                        name="firstAddressLine"
                        onChange={(e) => setFirstAddressLine(e.target.value)}
                        value={firstAddressLine}
                        required={true}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Apt, suite, or unit</label>
                    <input
                        type="text"
                        name="secondAddressLine"
                        onChange={(e) => setSecondAddressLine(e.target.value)}
                        value={secondAddressLine}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>City *</label>
                    <input
                        type="text"
                        name="City"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required={true}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>State *</label>
                    <select
                        type="select"
                        name="state"
                        onChange={(e) => setState(e.target.value)}
                        required={true}
                    >
                        <option disabled selected value> -- select a State -- </option>
                        {stateOptions}
                    </select>
                </div>
                <div className="fdcol mar20b">
                    <label>Zip Code *</label>
                    <input
                        type="text"
                        name="zipCode"
                        onChange={(e) => setZipCode(e.target.value)}
                        value={zipCode}
                        required={true}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner Name</label>
                    <input
                        type="text"
                        name="ownerName"
                        onChange={(e) => setOwnerName(e.target.value)}
                        value={ownerName}
                    ></input>
                </div>

                <div className="fdcol mar20b">
                    <label>Owner Email</label>
                    <input
                        type="text"
                        name="ownerEmail"
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        value={ownerEmail}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner Street Address</label>
                    <input
                        type="text"
                        name="ownerFirstAddressLine"
                        onChange={(e) => setOwnerFirstAddressLine(e.target.value)}
                        value={ownerFirstAddressLine}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner apt, suite, or unit</label>
                    <input
                        type="text"
                        name="ownerSecondAddressLine"
                        onChange={(e) => setOwnerSecondAddressLine(e.target.value)}
                        value={ownerSecondAddressLine}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner City</label>
                    <input
                        type="text"
                        name="ownerCity"
                        onChange={(e) => setOwnerCity(e.target.value)}
                        value={ownerCity}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner State</label>
                    <select
                        type="select"
                        name="ownerState"
                        onChange={(e) => setOwnerState(e.target.value)}
                    >
                        <option selected value> -- select a State -- </option>
                        {stateOptions}
                    </select>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner Zip Code</label>
                    <input
                        type="text"
                        name="ownerZipCode"
                        onChange={(e) => setOwnerZipCode(e.target.value)}
                        value={ownerZipCode}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Notes:</label>
                    <input
                        type="text"
                        name="notes"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Next Inspection Date: (mm/dd/yyyy)</label>
                    <input
                        type="text"
                        name="nextInspectionDate"
                        onChange={(e) => setNextInspectionDate(e.target.value)}
                        value={nextInspectionDate}
                    ></input>
                </div>
                <div className="jccen mar20t">
                    <button type="submit" className="w100p">
                        Add Address
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddressForm;
