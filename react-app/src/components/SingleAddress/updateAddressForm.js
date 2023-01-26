import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateAddress } from "../../store/addresses";

const UpdateAddressForm = () => {
    const { closeModal } = useModal();
    const singleAddress = useSelector(state => state.addresses.singleAddress)
    const [errors, setErrors] = useState([]);

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
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
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
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
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
        <div className="pad0t pad30lr fdcol w30vw ofhidden h100p">
            <h1 className='marlrauto mar10b'>Update Address</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className="fdcol mar20b">
                    <label>Owner Name</label>
                    <input
                        type="text"
                        name="ownerName"
                        placeholder="owner name"
                        onChange={(e) => setOwnerName(e.target.value)}
                        value={ownerName}
                        className='iflight bnone h40px'
                    ></input>
                </div>

                <div className="fdcol mar20b">
                    <label>Owner Email</label>
                    <input
                        type="text"
                        name="ownerEmail"
                        placeholder="owner email"
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        value={ownerEmail}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner Street Address</label>
                    <input
                        type="text"
                        name="ownerFirstAddressLine"
                        placeholder="123 Streetname Ave"
                        onChange={(e) => setOwnerFirstAddressLine(e.target.value)}
                        value={ownerFirstAddressLine}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner apt, suite, or unit</label>
                    <input
                        type="text"
                        name="ownerSecondAddressLine"
                        placeholder='apt, suite, or unit'
                        onChange={(e) => setOwnerSecondAddressLine(e.target.value)}
                        value={ownerSecondAddressLine}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner City</label>
                    <input
                        type="text"
                        name="ownerCity"
                        placeholder="city"
                        onChange={(e) => setOwnerCity(e.target.value)}
                        value={ownerCity}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner State</label>
                    <select
                        type="select"
                        name="ownerState"
                        placeholder="state"
                        onChange={(e) => setOwnerState(e.target.value)}
                        defaultValue={ownerState ? ownerState : ''}
                        className='iflight bnone h40px'
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
                        placeholder="zip code"
                        onChange={(e) => setOwnerZipCode(e.target.value)}
                        value={ownerZipCode}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Notes:</label>
                    <input
                        type="text"
                        name="notes"
                        placeholder="notes"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Next Inspection Date: (mm/dd/yyyy)</label>
                    <input
                        type="text"
                        name="nextInspectionDate"
                        placeholder="mm/dd/yyyy"
                        onChange={(e) => setNextInspectionDate(e.target.value)}
                        value={nextInspectionDate}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="jccen mar30t">
                    <button type="submit" className='w100p h50px btndark pad0'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateAddressForm
