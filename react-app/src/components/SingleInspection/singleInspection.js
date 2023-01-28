import React, { useEffect, useState } from "react";
import { loadSingleInspection } from "../../store/inspections";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import "./singleInspection.css";
import OpenModalButton from "../OpenModalButton";
import DeleteInspectionModal from "./deleteInspectionModal";

const Inspection = () => {
    const { inspectionId } = useParams();
    const inspection = useSelector(
        (state) => state.inspections.singleInspection
    );
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()

    let inspectionAnswers = null;
    if (inspection) {
        inspectionAnswers = inspection.inspectionAnswers.reverse();
    }

    const editInspection = () => {
        history.push(`/address/${inspection.address.id}/inspection/${inspection.id}`)
    }

    const inspectionAnswerContent = inspectionAnswers?.map(
        (inspectionAnswer) => {
            return (
                <div
                    key={inspectionAnswer.id}
                    className="inspection-answer-container"
                >
                    <div className="question-container">
                        <div className="question-label">Question: </div>
                        <div className="question">
                            {inspectionAnswer.question.question}
                        </div>
                    </div>
                    <div className="question-passing-container">
                        <div className="question-passing-label">Response:</div>
                        <div
                            className={
                                inspectionAnswer.passing
                                    ? "question-passing-passed"
                                    : "question-passing-failed"
                            }
                        >
                            {inspectionAnswer.passing ? "PASS" : "FAIL"}
                        </div>
                    </div>
                    {!inspectionAnswer.passing && (
                        <div className="comment-container">
                            <div className="comment-label">Comment: </div>
                            <div className="comment">
                                {inspectionAnswer.comment}
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    );



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
                <div className="single-inspection-container">
                    <h2 className="single-inspection-header-container">
                        {inspection.address.firstAddressLine}
                        {inspection.address.secondAddressLine
                            ? ` ${inspection.address.secondAddressLine}`
                            : ""}{" "}
                        {inspection.address.city}, {inspection.address.state}{" "}
                        {inspection.address.zipCode}
                    </h2>
                    <div className="info-label-container">
                        <div className="label-container">Date:</div>
                        <div className="info-container">
                            {moment(inspection.date).format("L")}
                        </div>
                    </div>
                    <div className="info-label-container">
                        <div className="label-container">Inspector:</div>
                        <div className="info-container">
                            {inspection.inspector.firstName}{" "}
                            {inspection.inspector.lastName}
                        </div>
                    </div>
                    <div className="info-label-container">
                        <div className="label-container">Status:</div>
                        <div
                            className={
                                inspection.passing
                                    ? "info-container-passing"
                                    : "info-container-failed"
                            }
                        >
                            {inspection.passing ? "PASSED" : "FAILED"}
                        </div>
                    </div>
                    <div>
                        <h2 className="single-inspection-header-container">
                            Inspection Details
                        </h2>
                        {inspectionAnswerContent}
                    </div>
                    <div className="edit-inspection-button-container">
                        <div className="edit-inspection-button" onClick={editInspection}>Edit Inspection</div>
                        <OpenModalButton
                            buttonText='Delete Inspection'
                            modalComponent={<DeleteInspectionModal />}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Inspection;
