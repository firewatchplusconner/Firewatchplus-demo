import React, { useEffect, useState } from "react";
import { loadAllInspections } from "../../store/inspections";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import AddInspectionModal from "./addInspectionModal";
import OpenModalButton from "../OpenModalButton";
import moment from 'moment'
import './inspectionList.css'
import { Notebook } from 'tabler-icons-react';

const InspectionList = () => {
    const inspections = useSelector((state) => state.inspections.allInspections)
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()

    let inspectionList = null
    if (inspections) {
        inspectionList = Object.values(inspections)
    }

    useEffect(() => {
        dispatch(loadAllInspections()).then(() => setLoaded(true))
    }, [dispatch, inspectionList?.length])


    if (!loaded) {
        return null
    }

    const inspectionContent = inspectionList.map((inspection, i, {length}) => {
        return (
            <NavLink
                to={`/inspection/${inspection.id}`}
                className='tdnone tclight inspection-container-nav'
                style={{border: (length - 1 === i) && 'none' }}
                key={`${inspection.id}`}
            >
                <div className="id-container">{inspection.id}</div>
                <div className="address">
                    {inspection.address.firstAddressLine}
                    {inspection.address.secondAddressLine
                        ? ` ${inspection.address.secondAddressLine}`
                        : ""}{" "}
                    {inspection.address.city}, {inspection.address.state} {inspection.address.zipCode}
                </div>
                <div className="inspection-date">
                    {moment(inspection.date).format('L')}
                </div>
                <div className="inspection-number">
                    {inspection.inspectionNumber === 1 ? '1st' : ''}{inspection.inspectionNumber === 2 ? '2nd' : ''}{inspection.inspectionNumber === 3 ? '3rd' : ''}
                </div>
                <div className={inspection.passing ? 'status-passed' : 'status-failed'}>
                    {inspection.passing ? 'PASSED' : 'FAILED'}
                </div>
            </NavLink>
        )
    })

    return (
        <div className = "fdcol">
            <h1 className="inspection-list-header jccen aicen w100p mar10l">
                <Notebook size={48} color="#b7c2c1" className="mar10r" />
                Inspections
            </h1>
            <div className="mar20b w60vw w100p inspection-list-container">
                <div className="inspection-list-header-container">
                </div>
                <div>
                    <div className="inspection-container-header">
                        <div className="id-container">ID</div>
                        <div className="address">Inspection Address</div>
                        <div className="inspection-date">Date</div>
                        <div className="inspection-number">Number</div>
                        <div className="status">Status</div>
                    </div>
                    {inspectionContent}
                </div>
            </div>
                <div className="address-modal-button-container jccen pad20">
                        <OpenModalButton
                            buttonText="Add Inspection"
                            modalComponent={<AddInspectionModal />}
                        />
                    </div>
        </div>
    )
}

export default InspectionList
