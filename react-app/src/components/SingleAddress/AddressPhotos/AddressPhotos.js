import React from "react";
import OpenPhotoModalButton from "../../OpenPhotoModalButton";
import ModalPhotoComponent from "../../OpenPhotoModalButton/ModalPhotoComponent";
import './addressPhotos.css'

const AddressPhotos = ({images}) => {

    const imageContent = images.map(image => {
        return (
            <div className="address-photo-container" key={image.id}>
                    <div className="address-photo-title">{image.title}</div>
                    <div className="address-photo">
                        <OpenPhotoModalButton imageUrl={image.url} modalComponent={<ModalPhotoComponent image={image}/>}/>
                    </div>
            </div>
        )
    })

    return (
        <div className="address-photos-outer-container">
            <h2 className="address-photos-header mar30t">Images and Plans</h2>
            <div className="address-photos-container">
                {imageContent}
            </div>
        </div>
    )
}

export default AddressPhotos
