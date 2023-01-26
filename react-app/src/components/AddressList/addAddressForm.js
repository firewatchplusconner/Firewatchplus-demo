import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addAddress } from "../../store/addresses";

const AddAddressForm = () => {
    const { closeModal } = useModal();
    const history = useHistory();
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
    const [googleResponse, setGoogleResponse] = useState(false);
    const dispatch = useDispatch();

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
    const stateOptions = states.map((state) => {
        return (
            <option key={state} value={state} className='opt h40px'>
                {state}
            </option>
        );
    });

    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;

    const handleGoogleResponse = (addressResponse) => {
        if (addressResponse.result.verdict.hasReplacedComponents) {
            addressResponse.result.address.addressComponents.forEach(
                (component) => {
                    if (component.replaced === true) {
                        if (component.componentType === "locality") {
                            setCity(component.componentName.text);
                        } else if (component.componentType === "postal_code") {
                            setZipCode(component.componentName.text);
                        } else if (component.componentType === "subpremise") {
                            setSecondAddressLine(component.componentName.text);
                        }
                    }
                }
            );
        }

        if (
            addressResponse.result.verdict.hasUnconfirmedComponents ||
            addressResponse.result.address.missingComponentTypes ||
            addressResponse.result.verdict.validationGranularity === "OTHER" ||
            addressResponse.result.address.unresolvedTokens
        ) {
            const unconfirmedComponents =
                addressResponse.result.address.unconfirmedComponentTypes;
            const unconfirmedErrors = unconfirmedComponents?.map(
                (component) => {
                    if (component === "route") {
                        return "Street: Please provide a valid street name.";
                    } else if (component === "locality") {
                        return "City: Please provide a valid city.";
                    } else if (component === "postal_code") {
                        return "Zip Code: Please provide a valid Zip Code.";
                    } else if (component === "street_number") {
                        return "Street Number: Please provide a valid Street Number.";
                    } else if (component === "subpremise") {
                        return "Apt/Suite/Unit: Please provide a valid apt/suite/unit number.";
                    } else {
                        return null;
                    }
                }
            );
            if (unconfirmedErrors) {
                setErrors(unconfirmedErrors);
            }

            const missingComponents =
                addressResponse.result.address.missingComponentTypes;
            const missingErrors = missingComponents?.map((component) => {
                if (component === "route") {
                    return "Street: Please provide a valid street name.";
                } else if (component === "locality") {
                    return "City: Please provide a valid city.";
                } else if (component === "postal_code") {
                    return "Zip Code: Please provide a valid Zip Code.";
                } else if (component === "street_number") {
                    return "Street Number: Please provide a valid Street Number.";
                } else if (component === "subpremise") {
                    return "Apt/Suite/Unit: Please provide a valid apt/suite/unit number.";
                } else {
                    return null;
                }
            });
            if (missingErrors) {
                setErrors([...errors, ...missingErrors]);
            }

            if (addressResponse.result.address.unresolvedTokens) {
                setErrors([
                    ...errors,
                    "Invalid Input: Please provide a valid address.",
                ]);
            }
        }

        setGoogleResponse(true);
    };


    const HandleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setGoogleResponse(false);
        const response = await fetch(
            `https://addressvalidation.googleapis.com/v1:validateAddress?key=${api_key}`,
            {
                method: "POST",
                body: JSON.stringify({
                    address: {
                        revision: 0,
                        addressLines: [
                            firstAddressLine,
                            secondAddressLine,
                            `${city}, ${state} ${zipCode}`,
                        ],
                    },
                    previousResponseId: "",
                    enableUspsCass: true,
                }),
            }
        );
        const addressResponse = await response.json();

        handleGoogleResponse(addressResponse);
    };



    useEffect(() => {
        const submitNewAddress = async () => {
            const data = await dispatch(
                addAddress({
                    firstAddressLine,
                    secondAddressLine,
                    city,
                    state,
                    zipCode,
                    ownerName,
                    ownerEmail,
                    ownerFirstAddressLine,
                    ownerSecondAddressLine,
                    ownerCity,
                    ownerState,
                    ownerZipCode,
                    notes,
                    nextInspectionDate,
                })
            );
            if (data.errors) {
                setErrors(data.errors);
            } else {
                await closeModal();
                history.push(`/address/${data.id}`);
            }
        };

        if (googleResponse) {
            if (!errors[0]) {
                submitNewAddress();
            }
        }
    }, [googleResponse, errors, firstAddressLine, secondAddressLine, city, state, zipCode, ownerName, ownerEmail, ownerFirstAddressLine, ownerSecondAddressLine, ownerCity, ownerState, ownerZipCode, notes, nextInspectionDate, closeModal, dispatch, history]);

    return (
        <div className="pad0t pad30lr fdcol w30vw ofhidden h100p">
            <h1 className='marlrauto mar10b'>Add Address</h1>
            <form onSubmit={HandleSubmit}>
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
                        placeholder="123 Streetname Ave"
                        onChange={(e) => setFirstAddressLine(e.target.value)}
                        value={firstAddressLine}
                        required={true}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Apt, suite, or unit</label>
                    <input
                        type="text"
                        name="secondAddressLine"
                        placeholder='apt, suite, or unit'
                        onChange={(e) => setSecondAddressLine(e.target.value)}
                        value={secondAddressLine}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>City *</label>
                    <input
                        type="text"
                        name="City"
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='city'
                        value={city}
                        required={true}
                        className='iflight bnone h40px'
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>State *</label>
                    <select
                        type="select"
                        name="state"
                        onChange={(e) => setState(e.target.value)}
                        required={true}
                        defaultValue=""
                        className='iflight bnone h40px state'
                    >
                        <option disabled value="">
                            {" "}
                            -- select a State --{" "}
                        </option>
                        {stateOptions}
                    </select>
                </div>
                <div className="fdcol mar20b">
                    <label>Zip Code *</label>
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="zip code"
                        onChange={(e) => setZipCode(e.target.value)}
                        value={zipCode}
                        required={true}
                        className='iflight bnone h40px'
                    ></input>
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
                        onChange={(e) =>
                            setOwnerFirstAddressLine(e.target.value)
                        }
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
                        onChange={(e) =>
                            setOwnerSecondAddressLine(e.target.value)
                        }
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
                        defaultValue=""
                        className='iflight bnone h40px'
                    >
                        <option value=""> -- select a State -- </option>
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
                        Add Address
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddressForm;
