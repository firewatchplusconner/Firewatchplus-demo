import React from "react";
import OpenPhotoModalButton from "../../../OpenPhotoModalButton";
import InspectionModalPhotoComponent from "../../../OpenPhotoModalButton/InspectionPhotoModalComponent";
import { useHistory } from "react-router-dom";

const InspectionAnswer = ({ inspectionAnswer, addressId }) => {
    const history = useHistory()

    const handlePhotoClick = (e) => {
        e.preventDefault()
        history.push(`/address/${addressId}`)
    }
    if (inspectionAnswer.passing) {
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
            </div>
        );
    } else {
        return (
            <div
                key={inspectionAnswer.id}
                className="inspection-answer-failed-container"
            >
                <div className="inspection-answer-left-container">
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
                    <div className="comment-container">
                        <div className="comment-label">Comment: </div>
                        <div className="comment">
                            {inspectionAnswer.comment}
                        </div>
                    </div>
                </div>
                <div className="inspection-answer-right-container">
                    <div className="inspection-photo-container" onClick={handlePhotoClick} >
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
};

export default InspectionAnswer;
