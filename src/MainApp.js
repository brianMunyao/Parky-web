import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';

import 'react-toastify/dist/ReactToastify.css';

import LoginScreen from './containers/LoginScreen';
import HomeScreen from './containers/HomeScreen';
import SignUpScreen from './containers/SignUpScreen';
import NotFound from './containers/NotFound';
import DashBoard from './containers/DashBoard';
import Settings from './containers/Settings';
import { isLoggedIn } from './config/utils';

const MainApp = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	const { cookies } = useCookies;

	const [map, setMap] = useState([]);

	const getStatus = () => {
		axios
			.get('/api/space') //, { responseType: 'blob' })
			.then((res) => {
				setData(res.data.data);
				// console.log(res.data);
			})
			.catch((err) => setError(err));
	};

	const getParkingMap = () => {
		axios
			.get('/api/parkingMap')
			.then((res) => {
				//const tt = JSON.parse(res.data.data);
				//const mm = [...tt];
				setMap(res.data.data);
			})
			// .then((res) => setMap(JSON.parse(res.data.data)))
			.catch((err) => console.log('error', err));
	};

	// return (
	// 	<div>
	// 		<h1>Data</h1>
	// 		{/* {data && <img src={URL.createObjectURL(data)} alt="space" />} */}
	// 		{JSON.stringify(data)}
	// 		{/* {typeof data} */}

	// 		<br />
	// 		<br />
	// 		<hr />
	// 		<br />

	// 		<h1>Parking Map</h1>
	// 		{/*<LotCon>{map.map((w) => renderLot(JSON.stringify(w)))}</LotCon>*/}
	// 		{<div>{JSON.stringify(map)}</div>}

	// 		{/* <Lots />
	// 		<Lots /> */}

	// 		<br />
	// 		<hr />
	// 		<br />

	// 		<button onClick={getStatus}>getStatus</button>
	// 		<br />
	// 		<button onClick={getParkingMap}>getParkingMap</button>

	// 		<br />
	// 		<br />
	// 		<hr />
	// 		<br />

	// 		<h1>Error</h1>
	// 		<p>{error | 'none'}</p>
	// 	</div>
	// );

	return (
		<BrowserRouter>
			<ToastContainer
				autoClose={2000}
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
