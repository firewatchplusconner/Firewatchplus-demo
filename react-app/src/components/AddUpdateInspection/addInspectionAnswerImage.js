import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addInspectionAnswerImage } from "../../store/inspections";
import { useModal } from "../../context/Modal";

const UploadInspectionAnswerImage = ({inspectionId, inspectionAnswerId}) => {
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        const data = await dispatch(addInspectionAnswerImage(inspectionId, inspectionAnswerId, formData));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            await closeModal();
        }
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
        }
    }, [image]);

    return (
        <div className="pad0t pad30lr fdcol w30vw ofhidden h100p">
            <h1 className="marlrauto mar10b">Upload Image</h1>
            {imageUrl && (
                <div className="image-preview-container" >
                    <img src={imageUrl} alt="uploaded" className="image-preview"></img>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <div className="errors-div">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                )}
                <div className="mar20b">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                        required
                    />
                </div>
                <div className="jccen mar30t">
                    <button
                        type="submit"
                        className="w100p h50px btndark pad0 flar"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadInspectionAnswerImage;
