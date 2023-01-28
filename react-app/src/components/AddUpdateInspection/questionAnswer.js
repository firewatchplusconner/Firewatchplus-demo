import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateInspectionAnswer } from "../../store/inspections";
import { useParams } from "react-router-dom";

const QuestionAnswer = ({ question, questionAnswer }) => {
    const { inspectionId } = useParams();
    const [passing, setPassing] = useState(questionAnswer.passing);
    const [comment, setComment] = useState(questionAnswer.comment ? questionAnswer.comment : '');
    const [newFail, setNewFail] = useState(false);
    const [newPassing, setNewPassing] = useState(false);
    const dispatch = useDispatch();

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(
            updateInspectionAnswer(inspectionId, {
                id: questionAnswer.id,
                passing,
                comment,
            })
        ).then(() => setNewFail(false)).then(() => setNewPassing(true));
    };

    useEffect(() => {
        if (newPassing) {
            if (passing) {
                dispatch(
                    updateInspectionAnswer(inspectionId, {
                        id: questionAnswer.id,
                        passing,
                        comment,
                    })
                );
            }
        }
        // eslint-disable-next-line
    }, [
        newPassing,
        dispatch,
        inspectionId,
        passing,
        questionAnswer.id,
        questionAnswer.passing
    ]);

    return (
        <div key={question.id} className="inspection-question-container">
            <div className="inspection-question">{question.question}</div>
            <div className="inspection-question-answer-container">
                <div
                    onClick={() => {
                        setPassing(true);
                        setNewFail(false);
                        setComment("");
                        if (!passing) setNewPassing(true);
                    }}
                    className={
                        passing
                            ? "inspection-question-passing"
                            : "inspection-question-not-passing"
                    }
                >
                    PASS
                </div>
                <div
                    onClick={() => {
                        setNewFail(true);
                        setPassing(false)
                    }}
                    className={
                        passing
                            ? "inspection-question-not-failed"
                            : "inspection-question-failed"
                    }
                >
                    FAIL
                </div>
            </div>
            {newFail && (
                <form onSubmit={(e) => {
                    handleSave(e)
                    }}>
                    <div className="inspection-question-comment-input-container">
                        <label className="inspection-question-comment-input-label">
                            Comment *:
                        </label>
                        <textarea
                            type="textarea"
                            name="comment"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            required={true}
                            className="inspection-question-comment-input"
                        ></textarea>
                    </div>
                    <div className="inspection-question-comment-input-button-container">

                    <button type="submit" className="inspection-question-comment-input-button">Save</button>
                    </div>
                </form>
            )}
            {comment && !newFail && (
                <div className="inspection-question-comment-container">
                    <div className="inspection-question-comment-label">
                        Comments:
                    </div>
                    <div className="inspection-question-comment">{comment}</div>
                </div>
            )}
        </div>
    );
};

export default QuestionAnswer;
