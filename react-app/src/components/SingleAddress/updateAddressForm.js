import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { updateAddress } from "../../store/addresses";

const UpdateAddressForm = () => {
    const { closeModal } = useModal();
    const singleAddress = useSelector(state => state.addresses.singleAddress)
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    // const [firstAddressLine, setFirstAddressLine] = useState(singleAddress.firstAddressLine);
    // const [secondAddressLine, setSecondAddressLine] = useState(singleAddress.secondAddressLine);
    // const [city, setCity] = useState(singleAddress.city);
    // const [state, setState] = useState(singleAddress.state);
    // const [zipCode, setZipCode] = useState(singleAddress.zipCode);
    const [ownerName, setOwnerName] = useState(singleAddress.ownerName);
    const [ownerEmail, setOwnerEmail] = useState(singleAddress.Email);
    const [ownerFirstAddressLine, setOwnerFirstAddressLine] = useState(singleAddress.ownerFirstAddressLine);
    const [ownerSecondAddressLine, setOwnerSecondAddressLine] = useState(singleAddress.ownerSecondAddressLine);
    const [ownerCity, setOwnerCity] = useState(singleAddress.ownerCity);
    const [ownerState, setOwnerState] = useState(singleAddress.ownerState);
    const [ownerZipCode, setOwnerZipCode] = useState(singleAddress.ownerZipCode);
    const [notes, setNotes] = useState(singleAddress.notes);
    const [nextInspectionDate, setNextInspectionDate] = useState(singleAddress.nextInspectionDate);
    const dispatch = useDispatch()

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

    // const updateState = async (e) => {
    //     console.log('initial state ------------------', state)
    //     console.log('value', e.target.value)
    //     await setState(e.target.value)
    //     console.log('after state ------------------', state)
    // }

    const stateOptions = states.map((stateOption) => {
        return <option key={stateOption} value={stateOption}>{stateOption}</option>;
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(updateAddress(singleAddress.id, {ownerName, ownerEmail, ownerFirstAddressLine, ownerSecondAddressLine, ownerCity, ownerState, ownerZipCode, notes, nextInspectionDate}))
        if (data) {
            setErrors(data);
        } else {
            await closeModal()
        }
    };

    return (
        <div className="pad30 fdcol w30vw">
            <h1>Update Address</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                {/* <div className="fdcol mar20b">
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
                        defaultValue={state}
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
                        name="state"
                        required={true}
                        onChange={updateState}
                    >
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
                </div> */}
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
                        defaultValue={ownerState ? ownerState : ''}
                    >
                        <option value=''> -- select a State -- </option>
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
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateAddressForm
