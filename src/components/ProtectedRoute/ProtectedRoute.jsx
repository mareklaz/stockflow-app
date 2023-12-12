import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
	const { user, getToken } = useContext(AuthContext);

	const token = localStorage.getItem('token');

	if (!token && !user) {
		return <Navigate to='/login' replace />;
	}

	return children;
}
