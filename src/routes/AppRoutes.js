import React from "react";
// REACT ROUTER DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// VIEWS
import LoginPage from '../views/LoginPage/LoginPage';
import DashboardPage from '../views/DashboardPage/DashboardPage';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../views/NotFoundPage/NotFoundPage';
import About from '../components/About/About';
import Notes from '../components/Notes/Notes';
import User from '../components/User/User';



function AppRoutes() {
    return (
    	<Router>
			<Routes>
				<Route path='/' element={<PrivateRoute/>}>
					<Route path='/' element={<DashboardPage />}>
						<Route path='' element={<Notes />} />
						<Route path='about' element={<About />} />
						<Route path='user' element={<User />} />
					</Route>
				</Route>
				<Route path='/login' element={<LoginPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
    );
}

export default AppRoutes;