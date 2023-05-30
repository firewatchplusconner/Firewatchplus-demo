import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import InspectionAnswer from "./InspectionAnswers/InspectionAnswers";
import "./AddressInspection.css";

const AddressInspection = ({ inspection,i,length }) => {

    const failedAnswers = inspection.inspectionAnswers
        .filter((answer) => {
            return answer.passing === false;
        })
        .map((inspectionAnswer) => {
            return <InspectionAnswer key={inspectionAnswer.id} inspectionAnswer={inspectionAnswer} addressId={inspection.addressId} />;
        });

    return (
        <NavLink
            to={`/inspection/${inspection.id}`}
            className="tdnone tclight address-inspection-container-nav"
            key={`${inspection.id}`}
            style={{border: (length - 1 === i) && 'none' }}

        >
            <div className="address-inspection-container">
                <div className="address-id-container">{inspection.id}</div>
                <div className="address-inspection-date">
                    {moment(inspection.date).format("L")}
                </div>
                <div className="address-inspection-number">
                    {inspection.inspectionNumber === 1 ? "1st" : ""}
                    {inspection.inspectionNumber === 2 ? "2nd" : ""}
                    {inspection.inspectionNumber === 3 ? "3rd" : ""}
                </div>
                <div className="address-inspection-inspector">
                    {inspection.inspector.firstName}{" "}
                    {inspection.inspector.lastName}
                </div>
                <div
                    className={
                        inspection.passing
                            ? "address-inspection-status-passed"
                            : "address-inspection-status-failed"
                    }
                >
                    {inspection.passing ? "PASSED" : "FAILED"}
                </div>
            </div>
            {!inspection.passing && <div className="address-inspection-answers-container" >
                {failedAnswers}
            </div>}
        </NavLink>
    );
};

export default AddressInspection;
