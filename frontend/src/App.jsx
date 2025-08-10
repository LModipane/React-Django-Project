import React from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import { NotFound, Explore, LoginPage, Register } from './pages';
import ProjectedRoute from './components/projectedRoute';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<ProjectedRoute>
							<Explore />
						</ProjectedRoute>
					}
				/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
				<Route path="/register" element={<RegisterAndLogout />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;

const Logout = () => {
	localStorage.clear();
	return <Navigate to="/login" replace />;
};

const RegisterAndLogout = () => {
	localStorage.clear();
	return <Register />;
};
