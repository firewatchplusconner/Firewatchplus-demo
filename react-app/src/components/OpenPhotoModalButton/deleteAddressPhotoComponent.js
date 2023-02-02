import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { usePhotoModal } from "../../context/PhotoModal";
import { deleteAddressImage } from "../../store/addresses";

export default function DeleteAddressPhotoModal({addressId, imageId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const { closePhotoModal } = usePhotoModal()

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteAddressImage(addressId, imageId))
        await closeModal()
        await closePhotoModal()
    }

    return (
        <div className="fdcol aicen">
            <h3 className="tacen">Are you sure you want to delete this image?</h3>
            <div className="sa w100p">
                <button onClick={handleDelete} className='p20 w100p br10px mar10l mar10r h40px btndark fmed'>Yes, Delete Image</button>
                <button onClick={closeModal} className='p20 w100p br10px mar10l mar10r h40px btndark fmed'>Cancel</button>
            </div>
        </div>
    )
}
