import React from "react";
import { useParams } from "react-router-dom";
import QuestionAnswer from "./questionAnswer";

const QuestionCategory = ({ category, inspection }) => {
    const { addressId, inspectionId } = useParams();
    const inspectionAnswers = inspection.inspectionAnswers

    const questionContent = category.questions.map((question) => {
        const inspectionAnswer = inspectionAnswers.filter(inspectionAnswer => inspectionAnswer.questionId === question.id)
        return (
            <QuestionAnswer key={question.id} question={question} questionAnswer={inspectionAnswer[0]}/>
        )
    });

    return (
        <div key={category.id}>
            <h2 key={category.id}>{category.category}</h2>
            <div>{questionContent}</div>
        </div>
    );
};

export default QuestionCategory;
