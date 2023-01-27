import React, { useEffect, useState } from "react";
import { loadAllInspections } from "../../store/inspections";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from 'moment'
import './inspectionList.css'

const InspectionList = () => {
    const inspections = useSelector((state) => state.inspections.allInspections)
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('in the use effect')
        dispatch(loadAllInspections()).then(() => setLoaded(true))
    }, [dispatch])

    let inspectionList = null
    if (inspections) {
        inspectionList = Object.values(inspections)
    }

    if (!loaded) {
        return null
    }

    const inspectionContent = inspectionList.map((inspection) => {
        return (
            <NavLink
                to={`/inspection/${inspection.id}`}
                className='tdnone tclight nhvr inspection-container'
                key={`${inspection.id}`}
            >
                <div className="id-container">{inspection.id}</div>
                <div className="address nhvr">
                    {inspection.address.firstAddressLine}
                    {inspection.address.secondAddressLine
                        ? ` ${inspection.address.secondAddressLine}`
                        : ""}{" "}
                    {inspection.address.city}, {inspection.address.state} {inspection.address.zipCode}
                </div>
                <div className="inspection-date">
                    {moment(inspection.date).format('L')}
                </div>
                <div className={inspection.passing ? 'status-passed' : 'status-failed'}>
                    {inspection.passing ? 'PASSED' : 'FAILED'}
                </div>
            </NavLink>
        )
    })

    return (
        <>
            <div className="mar20b w60vw">
                <div className="inspection-list-header-container">
                    <h1 className="inspection-list-header">
                        All Inspections
                    </h1>
                </div>
                <div>
                    <div className="inspection-container-header">
                        <div className="id-container">ID</div>
                        <div className="address">Inspection Address</div>
                        <div className="inspection-date">Date</div>
                        <div className="status">Status</div>
                    </div>
                    {inspectionContent}
                </div>
            </div>
        </>
    )
}

export default InspectionList
