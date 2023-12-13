import React, { createContext, useState } from 'react';

// Crea el contexto
export const FilterContext = createContext();

// Crea el proveedor del contexto
export const FilterProvider = ({ children }) => {
	const [filters, setFilters] = useState({});

	// Función para actualizar los filtros
	const updateFilters = (newFilters) => {
		setFilters(newFilters);
	};

	return (
		<FilterContext.Provider value={{ filters, updateFilters }}>
			{children}
		</FilterContext.Provider>
	);
};
