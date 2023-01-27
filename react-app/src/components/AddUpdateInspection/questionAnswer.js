import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateInspectionAnswer } from "../../store/inspections";
import { useParams } from "react-router-dom";

const QuestionAnswer = ({ question, questionAnswer }) => {
    const { addressId, inspectionId } = useParams();
    const [passing, setPassing] = useState(questionAnswer.passing);
    const [comment, setComment] = useState(questionAnswer.comment);
    const [newFail, setNewFail] = useState(false);
    const [newPassing, setNewPassing] = useState(false)
    const dispatch = useDispatch();

    const handleSave = (e) => {
        e.preventDefault()
        dispatch(
            updateInspectionAnswer(inspectionId, {
                id: questionAnswer.id,
                passing,
                comment,
            })
        ).then(() => setNewFail(false));
    };

    useEffect(() => {
        if (newPassing) {
            dispatch(updateInspectionAnswer(inspectionId, {
                id: questionAnswer.id,
                passing,
                comment
            }))
        }
    }, [newPassing])

    return (
        <div key={question.id}>
            <h4>{question.question}</h4>
            <div>
                <div
                    onClick={() => {
                        setPassing(true);
                        setComment("");
                        setNewFail(false);
                        setNewPassing(true)
                    }}
                >
                    PASS
                </div>
                <div
                    onClick={() => {
                        setPassing(false);
                        setNewFail(true);
                    }}
                >
                    FAIL
                </div>
            </div>
            {newFail && (
                <form onSubmit={handleSave}>
                    <div>
                        <label>Comment *</label>
                        <textarea
                            type="textarea"
                            name="comment"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            required={true}
                        ></textarea>
                    </div>
                    <button type="submit">Save</button>
                </form>
            )}
            {comment && !newFail && <div>Comment: {comment}</div>}
        </div>
    );
};

export default QuestionAnswer;
