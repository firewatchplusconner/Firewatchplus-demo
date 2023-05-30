import React, { useEffect, useState } from "react";
import { loadSingleInspection } from "../../store/inspections";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import moment from "moment";
import OpenPhotoModalButton from "../OpenPhotoModalButton";
import "./singleInspection.css";
import OpenModalButton from "../OpenModalButton";
import InspectionModalPhotoComponent from "../OpenPhotoModalButton/InspectionPhotoModalComponent";
import DeleteInspectionModal from "./deleteInspectionModal";

const Inspection = () => {
    window.scrollTo(0, 0)
    const { inspectionId } = useParams();
    const inspection = useSelector(
        (state) => state.inspections.singleInspection
    );
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    let inspectionAnswers = null;
    if (inspection) {
        inspectionAnswers = inspection.inspectionAnswers;
    }

    const editInspection = () => {
        history.push(
            `/address/${inspection.address.id}/inspection/${inspection.id}`
        );
        window.scrollTo(0, 0);
    };

    const inspectionAnswerContent = inspectionAnswers
        ?.map((inspectionAnswer, i, {length}) => {
            console.log("inspectionAnswers length:", length)
            if (inspectionAnswer.passing) {
                return (
                    <div
                        key={inspectionAnswer.id}
                        className="inspection-answer-container"
                        style={{border: (length - 1 === i) && 'none' }}

                    >
                        <div className="question-container">
                            <div className="question-label">Question: </div>
                            <div className="question">
                                {inspectionAnswer.question.question}
                            </div>
                        </div>
                        <div className="question-passing-container">
                            <div className="question-passing-label mar5r">
                                Response:{" "}
                            </div>
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
                    </div>
                );
            } else {
                return (
                    <div
                        key={inspectionAnswer.id}
                        className="inspection-answer-failed-container"
                        style={{border: (length - 1 === i) && 'none' }}
                        >
                        <div className="inspection-answer-left-container">
                            <div className="question-container">
                                <div className="question-label">Question: </div>
                                <div className="question">
                                    {inspectionAnswer.question.question}
                                </div>
                            </div>
                            <div className="question-passing-container">
                                <div className="question-passing-label">
                                    Response:{" "}
                                </div>
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
                            <div className="comment-container">
                                <div className="comment-label">Comment: </div>
                                <div className="comment">
                                    {inspectionAnswer.comment}
                                </div>
                            </div>
                        </div>
                        <div className="inspection-answer-right-container">
                            <div className="inspection-photo-container">
                                <OpenPhotoModalButton
                                    modalComponent={
                                        <InspectionModalPhotoComponent
                                            image={{
                                                url: inspectionAnswer.imgUrl,
                                            }}
                                        />
                                    }
                                    imageUrl={inspectionAnswer.imgUrl}
                                />
                            </div>
                        </div>
                    </div>
                );
            }
        });

    useEffect(() => {
        dispatch(loadSingleInspection(inspectionId)).then((data) => {
            if (data.errors) {
                history.push("/error");
            } else {
                setLoaded(true);
            }
        });
    }, [dispatch, inspectionId, history]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            {loaded && (
                <div>
                    <NavLink
                        to={`/address/${inspection.address.id}`}
                        className="nhvr single-inspection-header-container"
                    >
                        {inspection.address.firstAddressLine}
                        {inspection.address.secondAddressLine
                            ? ` ${inspection.address.secondAddressLine}`
                            : ""}{" "}
                        {inspection.address.city}, {inspection.address.state}{" "}
                        {inspection.address.zipCode}
                    </NavLink>
                <div className="single-inspection-container">
                    <div className = "flex jccen aicen sb info-label-container-container">
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
                    </div>
                    </div>
                    <div className= "flex accen aicen mar20 fxlar">
                    Questions
                    </div>
                    
                    <div className="single-inspection-container">
                        {inspectionAnswerContent}
                    </div>
                    <div className="edit-inspection-button-container">
                        <button
                            className="edit-inspection-button"
                            onClick={editInspection}
                        >
                            Edit Inspection
                        </button>
                        <OpenModalButton
                            buttonText="Delete Inspection"
                            modalComponent={<DeleteInspectionModal />}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Inspection;
