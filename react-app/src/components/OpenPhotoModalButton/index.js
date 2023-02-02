import React from "react";
import { usePhotoModal } from "../../context/PhotoModal";
import './openPhotoModalButton.css'

function OpenPhotoModalButton({
    modalComponent, // component to render inside the modal
    buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    imageUrl, // imageUrl to be rendered on button and In modal
}) {
    const { setModalContent, setOnModalClose } = usePhotoModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    return (
        <div className="open-photo-modal-button" onClick={onClick}>
            <img src={imageUrl} alt="address" className="modal-photo-preview" />
        </div>
    );
}

export default OpenPhotoModalButton;
