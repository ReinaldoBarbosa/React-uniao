import React, { useState, useEffect } from "react";
import './ImageUploader.css';

const ImageUploaderModal = ({ setFile, setImage, chosenImage }) => {
    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);

    const selectFile = (event) => {
        const currentFile = event.target.files[0];
        const previewImage = URL.createObjectURL(event.target.files[0]);
        setCurrentFile(currentFile);
        setPreviewImage(previewImage);
    };

    useEffect(() => {
        setFile(currentFile);
    }, [currentFile]);

    const confirmFile = (event) => {
        setImage(previewImage);
    };

    const deleteFile = (event) => {
        setCurrentFile(undefined);
        setPreviewImage(undefined);
    };

    return (
        <div>
            

            <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Imagem</h1>
                            <button type="button"  data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="img-card">
                                <div className="d-flex">
                                    <label htmlFor="uploadImage" className="btn-open-image">
                                        <i className="bi bi-image"></i>
                                        <input type="file" name="fotoEvento" accept="image/*" id="uploadImage"
                                            onChange={selectFile} />
                                    </label>
                                    <p className="fw-bold fst-italic d-block mx-auto">{currentFile != null ? currentFile.name : 'Nenhum arquivo escolhido'}</p>
                                    <button type="button" className="btn-close-image" onClick={deleteFile}>
                                        <i className="bi bi-x-circle"></i>
                                    </button>
                                </div>

                                {previewImage && (
                                    <div>
                                        <img id="preView" className="img-preview"
                                            src={previewImage} alt="" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={deleteFile}
                                className="btn btn-warning" data-bs-dismiss="modal" >Cancelar</button>
                            <button type="button" onClick={confirmFile}
                                className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploaderModal;