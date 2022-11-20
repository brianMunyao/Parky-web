import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import LoginScreen from './containers/LoginScreen';
import HomeScreen from './containers/HomeScreen';
import SignUpScreen from './containers/SignUpScreen';
import NotFound from './containers/NotFound';

const MainApp = () => {
	return (
		<BrowserRouter>
			<ToastContainer
				autoClose={3000}
				position="top-center"
				hideProgressBar={false}
				pauseOnHover={false}
			/>
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />

				<Route path="/login" element={<LoginScreen />} />
				<Route path="/signup" element={<SignUpScreen />} />
				<Route path="/home/*" element={<HomeScreen />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default MainApp;
