import React from "react";
import { usePhotoModal } from "../../context/PhotoModal";
import "./openPhotoModalButton.css";

const ModalPhotoComponent = ({ image }) => {
    const { closeModal } = usePhotoModal();

    return (
        <div className="modal-photo-outer-container">
            <div className="modal-photo-title">
                <div>{image.title}</div>
                <div className="close-modal-button" onClick={() => closeModal()}>CLOSE</div>
            </div>
            <div className="modal-photo-container">
                <img
                    src={image.url}
                    alt="address"
                    className="modal-photo"
                ></img>
            </div>
        </div>
    );
};

export default ModalPhotoComponent;
