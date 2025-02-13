import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateAddress } from "../../store/addresses";

const UpdateAddressForm = () => {
    const { closeModal } = useModal();
    const singleAddress = useSelector((state) => state.addresses.singleAddress);
    const [errors, setErrors] = useState([]);
    const [ownerErrors, setOwnerErrors] = useState([]);
    const [ownerName, setOwnerName] = useState(
        singleAddress.ownerName ? singleAddress.ownerName : ""
    );
    const [ownerEmail, setOwnerEmail] = useState(
        singleAddress.ownerEmail ? singleAddress.ownerEmail : ""
    );
    const [ownerFirstAddressLine, setOwnerFirstAddressLine] = useState(
        singleAddress.ownerFirstAddressLine
            ? singleAddress.ownerFirstAddressLine
            : ""
    );
    const [ownerSecondAddressLine, setOwnerSecondAddressLine] = useState(
        singleAddress.ownerSecondAddressLine
            ? singleAddress.ownerSecondAddressLine
            : ""
    );
    const [ownerCity, setOwnerCity] = useState(
        singleAddress.ownerCity ? singleAddress.ownerCity : ""
    );
    const [ownerState, setOwnerState] = useState(
        singleAddress.ownerState ? singleAddress.ownerState : ""
    );
    const [ownerZipCode, setOwnerZipCode] = useState(
        singleAddress.ownerZipCode ? singleAddress.ownerZipCode : ""
    );
    const [notes, setNotes] = useState(
        singleAddress.notes ? singleAddress.notes : ""
    );
    const [nextInspectionDate, setNextInspectionDate] = useState(
        singleAddress.nextInspectionDate ? singleAddress.nextInspectionDate : ""
    );
    const [googleResponse, setGoogleResponse] = useState(false);
    const dispatch = useDispatch();

    const date = new Date().toJSON().split("T")[0];

    const states = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "DC",
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

    const stateOptions = states.map((stateOption) => {
        return (
            <option key={stateOption} value={stateOption}>
                {stateOption}
            </option>
        );
    });

    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;

    const handleOwnerGoogleResponse = (addressResponse) => {
        if (addressResponse.result.verdict.hasReplacedComponents) {
            addressResponse.result.address.addressComponents.forEach(
                (component) => {
                    if (component.replaced === true) {
                        if (component.componentType === "locality") {
                            setOwnerCity(component.componentName.text);
                        } else if (component.componentType === "postal_code") {
                            setOwnerZipCode(component.componentName.text);
                        } else if (component.componentType === "subpremise") {
                            setOwnerSecondAddressLine(
                                component.componentName.text
                            );
                        }
                    }
                }
            );
        }

        if (addressResponse.result.verdict.hasInferredComponents) {
            addressResponse.result.address.addressComponents.forEach(
                (component) => {
                    if (component.inferred === true) {
                        if (component.componentType === "locality") {
                            setOwnerCity(component.componentName.text);
                        } else if (component.componentType === "postal_code") {
                            setOwnerZipCode(component.componentName.text);
                        } else if (component.componentType === "subpremise") {
                            setOwnerSecondAddressLine(
                                component.componentName.text
                            );
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
            let unconfirmedErrors = [];
            if (unconfirmedComponents) {
                unconfirmedComponents?.forEach((component) => {
                    if (component === "street_number") {
                        unconfirmedErrors.push(
                            "Owner Street Number: Please provide a valid Owner Street Number."
                        );
                    } else if (component === "route") {
                        unconfirmedErrors.push(
                            "Owner Street: Please provide a valid Owner street name."
                        );
                    } else if (component === "subpremise") {
                        unconfirmedErrors.push(
                            "Owner Apt/Suite/Unit: Please provide a valid Owner apt/suite/unit number."
                        );
                    } else if (component === "locality") {
                        unconfirmedErrors.push(
                            "Owner City: Please provide a valid Owner city."
                        );
                    } else if (
                        component === "administrative_area_level_3" ||
                        component === "administrative_area_level_1" ||
                        component === "administratrive_area_level_2"
                    ) {
                        unconfirmedErrors.push(
                            "State: Please provide a valid Owner State."
                        );
                    } else if (component === "postal_code") {
                        unconfirmedErrors.push(
                            "Owner Zip Code: Please provide a valid Owner Zip Code."
                        );
                    }
                });
            }

            const missingComponents =
                addressResponse.result.address.missingComponentTypes;
            let missingErrors = [];
            if (missingComponents) {
                missingComponents?.forEach((component) => {
                    if (component === "street_number") {
                        missingErrors.push(
                            "Owner Street Number: Please provide a valid Owner Street Number."
                        );
                    } else if (component === "route") {
                        missingErrors.push(
                            "Owner Street: Please provide a valid Owner street name."
                        );
                    } else if (component === "subpremise") {
                        missingErrors.push(
                            "Owner Apt/Suite/Unit: Please provide a valid Owner apt/suite/unit number."
                        );
                    } else if (component === "locality") {
                        missingErrors.push(
                            "Owner City: Please provide a valid Owner city."
                        );
                    } else if (
                        component === "administrative_area_level_3" ||
                        component === "administrative_area_level_1" ||
                        component === "administratrive_area_level_2"
                    ) {
                        missingErrors.push(
                            "State: Please provide a valid Owner State."
                        );
                    } else if (component === "postal_code") {
                        missingErrors.push(
                            "Owner Zip Code: Please provide a valid Owner Zip Code."
                        );
                    }
                });
            }

            if (addressResponse.result.address.unresolvedTokens) {
                setOwnerErrors([
                    "Invalid Input: Please provide a valid address.",
                ]);
            } else if (unconfirmedErrors[0] && missingErrors[0]) {
                setOwnerErrors([...unconfirmedErrors, ...missingErrors]);
            } else if (unconfirmedErrors[0]) {
                setOwnerErrors([...unconfirmedErrors]);
            } else if (missingErrors[0]) {
                setOwnerErrors([...missingErrors]);
            }
        }

        setGoogleResponse(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setOwnerErrors([]);
        setGoogleResponse(false);

        if (
            ownerFirstAddressLine ||
            ownerState ||
            ownerZipCode ||
            ownerSecondAddressLine ||
            ownerCity
        ) {
            const response = await fetch(
                `https://addressvalidation.googleapis.com/v1:validateAddress?key=${api_key}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        address: {
                            revision: 0,
                            addressLines: [
                                ownerFirstAddressLine,
                                ownerSecondAddressLine,
                                `${ownerCity}, ${ownerState} ${ownerZipCode}`,
                            ],
                        },
                        previousResponseId: "",
                        enableUspsCass: true,
                    }),
                }
            );
            if (response.ok) {
                const addressResponse = await response.json();

                await handleOwnerGoogleResponse(addressResponse);
            } else {
                setOwnerErrors([
                    "Invalid Input: Please provide a valid Owner Address.",
                ]);
            }
        } else {
            setGoogleResponse(true);
        }
        document.getElementById('modal-content').scrollTop = 0
    };

    useEffect(() => {
        const updateAddressFunc = async () => {
            const data = await dispatch(
                updateAddress(singleAddress.id, {
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
            }
        };

        if (googleResponse) {
            if (!errors[0] && !ownerErrors[0]) {
                updateAddressFunc();
            }
        }
    }, [
        googleResponse,
        errors,
        ownerErrors,
        ownerName,
        ownerEmail,
        ownerFirstAddressLine,
        ownerSecondAddressLine,
        ownerCity,
        ownerState,
        ownerZipCode,
        notes,
        nextInspectionDate,
        closeModal,
        dispatch,
        singleAddress.id,
    ]);

    return (
        <div className="pad0t pad30lr fdcol w80p wauto h100p">
            <h1 className="marlrauto mar10b">Update Address</h1>
            <form onSubmit={handleSubmit}>
                {(errors.length > 0 || ownerErrors.length > 0) && (
                    <div className="errors-div">
                        {errors.length > 0 &&
                            errors.map((error, ind) => (
                                <div key={ind}>- {error.split(":")[1]}</div>
                            ))}
                        {ownerErrors.length > 0 &&
                            ownerErrors.map((error, ind) => (
                                <div key={ind}>- {error.split(":")[1]}</div>
                            ))}
                    </div>
                )}

                <div className="fdcol mar20b">
                    <label>Owner Name</label>
                    <input
                        type="text"
                        name="ownerName"
                        placeholder="owner name"
                        onChange={(e) => setOwnerName(e.target.value)}
                        value={ownerName}
                        className="iflight bnone h40px"
                    ></input>
                </div>

                <div className="fdcol mar20b">
                    <label>Owner Email *</label>
                    <input
                        type="text"
                        name="ownerEmail"
                        placeholder="owner email"
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        value={ownerEmail}
                        className="iflight bnone h40px"
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner Street Address{'       '}<small>{'(required if applicable)'}</small></label>
                    <input
                        type="text"
                        name="ownerFirstAddressLine"
                        placeholder="123 Streetname Ave"
                        onChange={(e) =>
                            setOwnerFirstAddressLine(e.target.value)
                        }
                        value={ownerFirstAddressLine}
                        className="iflight bnone h40px"
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner apt, suite, or unit{'       '}<small>{'(required if applicable)'}</small></label>
                    <input
                        type="text"
                        name="ownerSecondAddressLine"
                        placeholder="apt, suite, or unit"
                        onChange={(e) =>
                            setOwnerSecondAddressLine(e.target.value)
                        }
                        value={ownerSecondAddressLine}
                        className="iflight bnone h40px"
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner City{'       '}<small>{'(required if applicable)'}</small></label>
                    <input
                        type="text"
                        name="ownerCity"
                        placeholder="city"
                        onChange={(e) => setOwnerCity(e.target.value)}
                        value={ownerCity}
                        className="iflight bnone h40px"
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner State{'       '}<small>{'(required if applicable)'}</small></label>
                    <select
                        type="select"
                        name="ownerState"
                        placeholder="state"
                        onChange={(e) => setOwnerState(e.target.value)}
                        defaultValue={ownerState ? ownerState : ""}
                        className="iflight bnone h40px"
                    >
                        <option value=""> -- select a State -- </option>
                        {stateOptions}
                    </select>
                </div>
                <div className="fdcol mar20b">
                    <label>Owner Zip Code{'       '}<small>{'(required if applicable)'}</small></label>
                    <input
                        type="text"
                        name="ownerZipCode"
                        placeholder="zip code"
                        onChange={(e) => setOwnerZipCode(e.target.value)}
                        value={ownerZipCode}
                        className="iflight bnone h40px"
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
                        className="iflight bnone h40px"
                    ></input>
                </div>
                <div className="fdcol mar20b">
                    <label>Next Inspection Date: </label>
                    <input
                        type="date"
                        name="nextInspectionDate"
                        min={date}
                        onChange={(e) => setNextInspectionDate(e.target.value)}
                        value={nextInspectionDate}
                        className="iflight bnone h40px"
                    ></input>
                </div>
                <div className="jccen mar30t">
                    <button type="submit" className="w100p h50px btndark pad0 flar">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateAddressForm;
