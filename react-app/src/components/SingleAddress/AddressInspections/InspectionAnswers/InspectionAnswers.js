import React from "react";


const InspectionAnswer = ({ inspectionAnswer }) => {
    return (
        <div key={inspectionAnswer.id} className="inspection-answer-container">
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
                    <div className="comment">{inspectionAnswer.comment}</div>
                </div>
            )}
        </div>
    );
};

export default InspectionAnswer
