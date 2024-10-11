import React, { useState, useEffect } from "react";
import './ImageUploader.css';
import UsuarioService from "../../services/UsuarioService";

const ImageUploaderModalPerfil = ({ setFile, setImage, chosenImage }) => {
    const [currentFile, setCurrentFile] = useState(chosenImage);
    const [previewImage, setPreviewImage] = useState(undefined);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (currentFile) {
            setFile(currentFile);
            setImage(previewImage);
        }
    }, [currentFile, previewImage, setFile, setImage]);

    const selectFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCurrentFile(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    const deleteFile = () => {
        if (currentFile) {
            URL.revokeObjectURL(previewImage);
        }
        setCurrentFile(undefined);
        setPreviewImage(undefined);
        setFile(null);
        setImage(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataWithImage = { foto: chosenImage };

        UsuarioService.createImage(currentFile).then(
            (response) => {
                setMessage(response.data.message);
                alert("Foto Adicionada");
                // Fecha o modal programaticamente
                const modal = document.getElementById('imageModal');
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            },
            (error) => {
                const errorMessage = error.response?.data?.message || "An error occurred";
                setMessage(errorMessage);
            }
        );
    };

    return (
        <div>
            <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Imagem</h1>
                            <button type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="img-card">
                                <div className="d-flex">
                                    <label htmlFor="uploadImage" className="btn-open-image">
                                        <i className="bi bi-image"></i>
                                        <input type="file" name="fotoEvento" accept="image/*" id="uploadImage" onChange={selectFile} />
                                    </label>
                                    <p className="fw-bold fst-italic d-block mx-auto">{currentFile ? currentFile.name : 'Nenhum arquivo escolhido'}</p>
                                    <button type="button" className="btn-close-image" onClick={deleteFile}>
                                        <i className="bi bi-x-circle"></i>
                                    </button>
                                </div>
                                {previewImage && (
                                    <div>
                                        <img id="preView" className="img-preview" src={previewImage} alt="Preview" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={deleteFile} className="btn btn-warning" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" onSubmit={handleSubmit} className="btn btn-primary" data-bs-dismiss="modal">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploaderModalPerfil;
