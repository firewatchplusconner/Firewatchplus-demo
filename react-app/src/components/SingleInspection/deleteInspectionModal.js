import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteInspection } from "../../store/inspections";

export default function DeleteInspectionModal({setLoaded}) {
    const inspection = useSelector(state => state.inspections.singleInspection)
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const history = useHistory()

    const handleDelete = async (e) => {
        e.preventDefault()
        history.push('/inspection')
        await dispatch(deleteInspection(inspection.id))
        await closeModal()
    }

    return (
        <div className="fdcol aicen">
            <h3 className="tacen">Are you sure you want to permanently delete this inspection?</h3>
            <div className="sa w100p">
                <button onClick={handleDelete} className='p20 w100p br10px mar10l mar10r h40px btndark fmed'>Yes, Delete Inspection</button>
                <button onClick={closeModal} className='p20 w100p br10px mar10l mar10r h40px btndark fmed'>Cancel</button>
            </div>
        </div>
    )
}
