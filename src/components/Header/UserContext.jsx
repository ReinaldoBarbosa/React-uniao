import React, { createContext, useState, useEffect } from 'react';
import UsuarioService from '../../services/UsuarioService'; // Ajuste o caminho conforme necessário

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);

    // Método para buscar usuários
    const fetchUsuarios = async () => {
        try {
            const response = await UsuarioService.findAll(); // Ajuste conforme necessário
            setUsuarios(response.data); // Assumindo que a resposta contém uma lista de usuários
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <UserContext.Provider value={{ usuarios }}>
            {children}
        </UserContext.Provider>
    );
};
