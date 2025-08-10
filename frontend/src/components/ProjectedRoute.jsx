import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN_ID, REFRESH_TOKEN_ID } from '../constants';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

function ProjectedRoute({ children }) {
	const [isAuthorised, setIsAuthorised] = useState(null);

	useEffect(() => {
		const refreshToken = async () => {
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_ID);
			try {
				const res = await api.post('api/token/refresh/', { refresh: refreshToken });
				if (res.status === 200) {
					localStorage.setItem(ACCESS_TOKEN_ID, res.data.access);
					setIsAuthorised(true);
				} else {
					setIsAuthorised(false);
				}
			} catch (error) {
				console.error('Error refreshing token:', error);
				setIsAuthorised(false);
			}
		};

		const auth = async () => {
			const token = localStorage.getItem(ACCESS_TOKEN_ID);
			if (!token) {
				setIsAuthorised(false);
				return;
			}

			const decodeded = jwtDecode(token);
			const currentTime = Date.now() / 1000; // Convert to seconds
			if (decodeded.exp < currentTime) {
				await refreshToken();
				return;
			} else {
				setIsAuthorised(true);
			}
		};

		auth().catch(() => setIsAuthorised(false));
	}, []);

	if (isAuthorised === null) return <div>Loading Page...</div>;
	return isAuthorised ? children : <Navigate to="/login" replace />;
}

export default ProjectedRoute;
