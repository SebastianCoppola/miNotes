import React from "react";
// REACT ROUTER DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// VIEWS
import LoginPage from '../views/LoginPage/LoginPage';
import SignUpPage from '../views/SignupPage/SignupPage.js';
import DashboardPage from '../views/DashboardPage/DashboardPage';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../views/NotFoundPage/NotFoundPage';

function AppRoutes() {
    return (
    	<Router>
			<Routes>
				<Route path='/' element={<PrivateRoute/>}>
					<Route path='/' element={<DashboardPage />} />
				</Route>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/singup' element={<SignUpPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
    );
}

export default AppRoutes;