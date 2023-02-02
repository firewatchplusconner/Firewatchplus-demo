import React from "react";
import { usePhotoModal } from "../../context/PhotoModal";
import OpenModalButton from "../OpenModalButton";
import DeleteAddressPhotoModal from "./deleteAddressPhotoComponent";
import "./openPhotoModalButton.css";

const ModalPhotoComponent = ({ image }) => {
    const { closePhotoModal } = usePhotoModal();

    return (
        <div className="modal-photo-outer-container">
            <div className="modal-photo-title">
                <div className="close-modal-button" onClick={() => closePhotoModal()}>CLOSE</div>
                <div>{image.title}</div>
                <div className="delete-image-button">
                    <OpenModalButton modalComponent={<DeleteAddressPhotoModal addressId={image.addressId} imageId={image.id} />}  buttonText='Delete'/>
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

export default ModalPhotoComponent;
