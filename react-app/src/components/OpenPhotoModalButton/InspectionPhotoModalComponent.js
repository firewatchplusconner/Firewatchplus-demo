import React from "react";
import { usePhotoModal } from "../../context/PhotoModal";
import OpenModalButton from "../OpenModalButton";
import "./openPhotoModalButton.css";

const InspectionModalPhotoComponent = ({ image }) => {
    const { closePhotoModal } = usePhotoModal();

    return (
        <div className="modal-photo-outer-container">
            <div className="inspection-modal-photo-title-container">
                <div
                    className="close-modal-button"
                    onClick={() => closePhotoModal()}
                >
                    CLOSE
                </div>
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

export default InspectionModalPhotoComponent;
