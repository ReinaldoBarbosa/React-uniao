// src/context/SearchContext.js
import React, { createContext, useState } from 'react';

// Criando o contexto de busca
export const SearchContext = createContext();

// Componente provedor que encapsula toda a aplicação e fornece o estado de busca
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
