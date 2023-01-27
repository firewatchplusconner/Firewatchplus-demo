import React, { useEffect, useState } from "react";
import { loadSingleInspection } from "../../store/inspections";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

const Inspection = () => {
    const { inspectionId } = useParams();
    const inspection = useSelector(
        (state) => state.inspections.singleInspection
    );
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    let inspectionAnswers = null
    if (inspection) {
        inspectionAnswers = inspection.inspectionAnswers
    }

    const inspectionAnswerContent = inspectionAnswers?.map((inspectionAnswer) => {
        return (
            <div>
                <div>{inspectionAnswer.question.question}</div>
                <div>{inspectionAnswer.passing ? "PASSED" : "FAILED"}</div>
                <div>Comments: {inspectionAnswer.comment}</div>
            </div>
        )
    })

    useEffect(() => {
        dispatch(loadSingleInspection(inspectionId)).then(() =>
            setLoaded(true)
        );
    }, [dispatch, inspectionId]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            {loaded && (
                <div>
                    <h2>
                        {inspection.address.firstAddressLine}
                        {inspection.address.secondAddressLine
                            ? ` ${inspection.address.secondAddressLine}`
                            : ""}{" "}
                        {inspection.address.city}, {inspection.address.state}{" "}
                        {inspection.address.zipCode}
                    </h2>
                    <div>Date: {moment(inspection.date).format("L")}</div>
                    <div>Inspector: {inspection.inspector.firstName} {inspection.inspector.lastName}</div>
                    <div>
                        Status: {inspection.passing ? "PASSED" : "FAILED"}
                    </div>
                    <div>
                        <h2>Inspection Details</h2>
                        {inspectionAnswerContent}
                    </div>
                </div>
            )}
        </>
    );
};

export default Inspection;
