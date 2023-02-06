import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { addInspection } from "../../store/inspections";
import { loadAllInspectionTypes } from "../../store/inspectionTypes";

export default function GenerateInspectionModal() {
    const address = useSelector((state) => state.addresses.singleAddress);
    const inspectionTypes = useSelector(
        (state) => state.inspectionTypes.allInspectionTypes
    );
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState();
    const [inspectionTypeId, setInspectionTypeId] = useState("");
    const [inspectionNumber, setInspectionNumber] = useState("");
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();
    const history = useHistory();

    let inspectionTypeList = null;
    if (inspectionTypes) {
        inspectionTypeList = inspectionTypes.inspectionTypes
    }

    const inspectionTypeOptions = inspectionTypeList?.map((inspectionType) => {
        return (
            <option key={inspectionType.id} value={inspectionType.id}>
                {inspectionType.type}
            </option>
        );
    });

    useEffect(() => {
        dispatch(loadAllInspectionTypes()).then(() => setLoaded(true));
    }, [dispatch]);

    const handleCloseModal = async (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(addInspection({addressId: address.id, inspectionTypeId, inspectionNumber}))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            await closeModal()
            history.push(`/address/${address.id}/inspection/${data.id}`)
            window.scroll(0, 0)
        }
    };

    if (!loaded) {
        return null;
    }

    return (
        <div className="pad0t pad30lr fdcol w30vw ofhidden h100p">
            <h1 className='marlrauto mar10b'>Create an Inspection</h1>
            <h3 className="marlrauto mar10b">
                {address.firstAddressLine}
                {address.secondAddressLine
                    ? ` ${address.secondAddressLine}`
                    : ""}{" "}
                {address.city}, {address.state} {address.zipCode}
            </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className="fdcol mar20b">
                    <label>Inspection Type *</label>
                    <select
                        type="select"
                        name="inspection-type"
                        onChange={(e) => setInspectionTypeId(e.target.value)}
                        required={true}
                        defaultValue=""
                        className='iflight bnone h40px state'
                    >
                        <option disabled value="">
                            -- select an inspection type --
                        </option>
                        {inspectionTypeOptions}
                    </select>
                </div>
                <div className="fdcol mar20b">
                    <label>Inspection Number *</label>
                    <select
                        type="select"
                        name="inspection-number"
                        onChange={(e) => setInspectionNumber(e.target.value)}
                        required={true}
                        defaultValue=""
                        className='iflight bnone h40px state'
                    >
                        <option disabled value="">
                            -- select an inspection number --
                        </option>
                        <option value={1}>1st</option>
                        <option value={2}>2nd</option>
                        <option value={3}>3rd</option>
                    </select>
                </div>
                <div className="sa w100p">
                    <button
                        type="submit"
                        className="btnlight p20 w100p br10px mar10l mar10r h40px"
                    >
                        Generate Inspection
                    </button>
                    <button
                        onClick={handleCloseModal}
                        className="btnlight p20 w100p br10px mar10l mar10r h40px"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
