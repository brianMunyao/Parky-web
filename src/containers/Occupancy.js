import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

import colors from '../config/colors';
import BaseTab from '../components/BaseTab';
import ParkingLot from '../components/ParkingLot';
import AppBtn from '../components/AppBtn';

const Occupancy = ({ active }) => {
	const [parkingMap, setParkingMap] = useState(Array(14).fill(null));
	const [parkingStatus, setParkingStatus] = useState(Array(14).fill(null));

	const [timeRefreshed, setTimeRefreshed] = useState(moment());
	const [refreshing, setRefreshing] = useState(false);

	const getParkingMap = () => {
		axios
			.get('/api/parkingMap')
			.then((res) => {
				//const tt = JSON.parse(res.data.data);
				//const mm = [...tt];
				setParkingMap(res.data.data);
			})
			// .then((res) => setMap(JSON.parse(res.data.data)))
			.catch((err) => console.log('error', err));
	};

	const getStatus = async () => {
		const { data } = await axios.get('/api/space');
		return data;
		// axios.get('/api/space') //, { responseType: 'blob' })
		// 	.then((res) => {
		// 		setParkingStatus(res.data.data);
		// 		setTimeRefreshed(moment());
		// 		// console.log(res.data);
		// 	})
		// 	.catch((err) => console.log(err));
	};

	const getLotStatus = (lot) => {
		try {
			const found = parkingStatus.filter((ps) => ps.lot_name === lot);
			return found[0].occupied;
		} catch (e) {
			return false;
		}
	};

	const refreshStatus = () => {
		setRefreshing(true);

		getParkingMap();
		getStatus()
			.then((res) => {
				setParkingStatus(res.data);
				setTimeRefreshed(moment());
				setRefreshing(false);
			})
			.catch((err) => {
				console.log(err);
				setRefreshing(false);
			});
	};

	useEffect(() => {}, []);

	return (
		<Container>
			<BaseTab active={active} title="Occupancy">
				{/* {JSON.stringify(parkingStatus)} */}

				<div className="occ-status">
					<AppBtn
						loading={refreshing}
						className="occ-refresh-btn"
						onClick={refreshStatus}
						text="Refresh"
						width="100px"
					/>
					<span>Refreshed {moment(timeRefreshed).fromNow()}</span>
				</div>
				<div className="occ-parking-con">
					<div className="occ-parking-lots">
						{parkingMap.slice(7).map((c) => (
							<ParkingLot
								lot_name={c ? c.lot_name : '--'}
								occupied={
									c ? getLotStatus(c.lot_name) : 'pending'
								}
							/>
						))}
					</div>
					<div className="occ-parking-barrier"></div>
					<div className="occ-parking-lots">
						{parkingMap.slice(0, 7).map((c) => (
							<ParkingLot
								lot_name={c ? c.lot_name : '--'}
								occupied={
									c ? getLotStatus(c.lot_name) : 'pending'
								}
							/>
						))}
					</div>
				</div>
			</BaseTab>
		</Container>
	);
};

const Container = styled.div`
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
		height: 350px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 20px 1fr;
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
			height: 250px;
		}

		.occ-parking-lots {
			display: grid;
			grid-template-rows: 100%;
			grid-template-columns: repeat(7, 1fr);
			gap: 5px;
			.occ-parking-lot {
			}
		}
		.occ-parking-barrier {
			background: #cbcbcb;
			width: 100%;
			height: 4px;
			margin: auto 0;
			border-radius: 10px;
		}
	}
`;

export default Occupancy;
