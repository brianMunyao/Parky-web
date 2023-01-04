import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import Lottie from 'react-lottie';

import colors from '../config/colors';
import BaseTab from '../components/BaseTab';
// import ParkingLot from '../components/ParkingLot';
import AppBtn from '../components/AppBtn';
import ModalLocation from '../components/ModalLocation';
// import GreenspanMall from '../lots/GreenspanMall';
import { removeSpaces } from '../config/utils';
import LotTest from '../lots/LotTest';
import * as animation from '../assets/circle_loading_blue.json';
import { getParkingMap, getParkingStatus } from '../config/apis';
import { updateOccupancyMap } from '../store/occupancySlice';
import { toast } from 'react-toastify';

const Occupancy = ({ active }) => {
	const [activeLoc, setActiveLoc] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);

	// const [getMap, setGetMap] = useState(true);

	const dispatch = useDispatch();
	const { locations, occupancyMap } = useSelector(
		(state) => state.occupancyReducer
	);

	// const configuredLocations = {
	// 	// GreenspanMall: <GreenspanMall />,
	// };

	// const getLocationInfo = (id) => {
	// 	const temp = locations.filter(({ loc_id }) => loc_id === id)[0];
	// 	return temp;
	// };

	// const getLocInfo = (name = '') => {
	// 	try {
	// 		const temp = locations.filter(
	// 			({ loc_name }) => removeSpaces(loc_name) === removeSpaces(name)
	// 		)[0].loc_id;

	// 		return temp;
	// 	} catch (e) {
	// 		return null;
	// 	}
	// };

	// const [timeRefreshed, setTimeRefreshed] = useState(moment());
	// const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		if (locations.length > 0) setActiveLoc(locations[0].loc_id);

		const timer = setInterval(() => {
			getParkingStatus()
				.then((res) => {
					dispatch(updateOccupancyMap(res));
					// toast.success('Parking status updated');
				})
				.catch((err) => toast.error('Server Error. Try Again Later.'));
		}, 20000);

		// if (getMap) {
		// 	setGetMap(false);
		// 	// getParkingMap()
		// 	// 	.then((res) => {
		// 	// 		dispatch(updateOccupancyMap(res.data));
		// 	// 	})
		// 	// 	.catch((err) =>
		// 	// 		console.log('Server unreachable. Try again later.')
		// 	// 	);
		// }
	}, [locations, dispatch]);

	return (
		<>
			<Container>
				<BaseTab
					active={active}
					title="Occupancy"
					belowTopBarComponent={
						<div className="occ-below-top">
							<div className="occ-below-left">
								<AppBtn
									text="Add Location"
									className="occ-below-btn"
									onClick={() => setModalOpen(true)}
								/>
							</div>
							<div className="occ-below-right">
								{locations.map(({ loc_id, loc_name }) => (
									<LocTab
										active={loc_id === activeLoc}
										onClick={() => setActiveLoc(loc_id)}>
										{loc_name}
									</LocTab>
								))}
							</div>
						</div>
					}>
					{Object.keys(occupancyMap).length === 0 ? (
						<>
							<Lottie
								width={150}
								options={{
									animationData: animation,
									autoplay: true,
									loop: true,
									rendererSettings: {
										preserveAspectRatio: 'xMidYMid slice',
									},
								}}
							/>
							<p className="space-loading">
								Checking space status...
							</p>
						</>
					) : (
						locations.map(({ loc_id, loc_name }, i) =>
							Object.keys(occupancyMap).includes(loc_name) ? (
								<LotTest
									key={i}
									loc_id={loc_id}
									active={loc_id === activeLoc}
									loc_name={loc_name}
									map={occupancyMap[loc_name]}
								/>
							) : (
								<LotTest
									key={i}
									loc_id={loc_id}
									active={loc_id === activeLoc}
									configure={'not configured'}
									loc_name={loc_name}
								/>
							)
						)
					)}
				</BaseTab>
			</Container>
			<ModalLocation
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</>
	);
};

const LocTab = styled.div`
	background: ${({ active }) =>
		active ? colors.primaryYellowLighter : 'transparent'};
	color: ${({ active }) => (active ? colors.primaryYellowDark : '#8d8d8d')};
	border-bottom: ${({ active }) =>
		active
			? `2px solid ${colors.primaryYellowLight}`
			: '2px solid transparent'};
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 10px;
	transition: all 0.1s linear;
	cursor: pointer;
	user-select: none;
	font-weight: 600;
	font-size: 15px;
	letter-spacing: 0.1px;
	text-transform: capitalize;

	&:hover {
		background: ${({ active }) =>
			active ? colors.primaryYellowLight : '#f0f0f0'};
		border-bottom: ${({ active }) =>
			active ? `2px solid ${colors.primaryYellow}` : '2px solid #e1e1e1'};
	}
	&:active {
		color: ${({ active }) =>
			active ? colors.primaryYellowDarker : '#828282'};
		background: ${({ active }) =>
			active ? colors.primaryYellowLight : '#e8e8e8'};
		border-bottom: ${({ active }) =>
			active ? `2px solid ${colors.primaryYellow}` : '2px solid #d3d3d3'};
	}
`;

const Container = styled.div`
	.occ-below-top {
		background: #fff;
		border-bottom: 1.5px solid #f2f2f2;
		display: grid;
		grid-template-columns: 105px 1fr;
		grid-template-rows: 1fr;
		gap: 15px;
		padding: 0 0 0 10px;

		.occ-below-left {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.occ-below-btn {
				height: 30px;
				font-size: 15px;
				margin: auto;
			}
		}
		.occ-below-right {
			overflow-x: auto;
			display: flex;
			align-items: center;
			::-webkit-scrollbar {
				display: none;
			}
			div {
				white-space: nowrap;
				/* background-color: $; */
			}
		}
	}
	.space-loading {
		color: #858585;
		text-align: center;
		/* font-size: 15px; */
		letter-spacing: 0.4px;
	}

	/* ?
	
	
	*/
	.occ-status {
		margin-bottom: 20px;
		.occ-refresh-btn {
			margin-right: 10px;
		}
		span {
			font-style: italic;
		}
	}

	.occ-parking-con {
		border-radius: 3px;
		/* height: 350px; */
		padding: 0 100px;
		transition: all 0.2s linear;

		@media (max-width: 1100px) {
			padding: 0 60px;
		}
		@media (max-width: 950px) {
			padding: 0 30px;
		}
		@media (max-width: 800px) {
			padding: 0 0;
			height: 400px;
		}
	}
`;

export default Occupancy;
