import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleInspection } from "../../store/inspections";
import QuestionCategory from "./questionCategory";
import { useParams } from "react-router-dom";
import './addInspectionForm.css'

const AddInspectionForm = () => {
    const { inspectionId } = useParams();
    const dispatch = useDispatch();
    const inspection = useSelector(
        (state) => state.inspections.singleInspection
    );
    const inspectionType = useSelector(
        (state) => state.inspectionTypes.singleInspectionType
    );
    const [loaded, setLoaded] = useState(false);

    const inspectionQuestionCategories = inspectionType?.question_categories;

    const content = inspectionQuestionCategories?.map((category) => {
        return (
            <QuestionCategory key={category.id} category={category} inspection={inspection}/>
        )
    });

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
                <div className="">
                    <h1>{inspectionType.type} Inspection</h1>
                    <div>{content}</div>
                </div>
            )}
        </>
    );
};

export default AddInspectionForm;
