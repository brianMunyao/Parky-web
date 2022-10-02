import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import colors from '../config/colors';
import BaseTab from '../components/BaseTab';
import ParkingLot from '../components/ParkingLot';
import AppBtn from '../components/AppBtn';
import ModalLocation from '../components/ModalLocation';
import GreenspanMall from '../lots/GreenspanMall';
import { capitalize, removeSpaces } from '../config/utils';
import LotTest from '../lots/LotTest';

const Occupancy = ({ active }) => {
	const [activeLoc, setActiveLoc] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);

	const { locations, occupancyMap } = useSelector(
		(state) => state.occupancyReducer
	);

	const configuredLocations = {
		GreenspanMall: <GreenspanMall />,
	};

	const getLocationInfo = (id) => {
		const temp = locations.filter(({ loc_id }) => loc_id === id)[0];
		return temp;
	};

	const getLocInfo = (name = '') => {
		const temp = locations.filter(
			({ loc_name }) => removeSpaces(loc_name) === removeSpaces(name)
		)[0].loc_id;

		return temp;
	};

	// const [timeRefreshed, setTimeRefreshed] = useState(moment());
	// const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		if (locations.length > 0) setActiveLoc(locations[0].loc_id);
	}, [locations]);

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
					{Object.keys(occupancyMap).map((val) =>
						typeof occupancyMap[val] === 'string' ? (
							<LotTest
								loc_id={getLocInfo(val)}
								active={getLocInfo(val) === activeLoc}
								configure={() =>
									toast.error(
										`${getLocInfo(val)} configure first`
									)
								}
								loc_name={val}
							/>
						) : (
							<LotTest
								loc_id={getLocInfo(val)}
								active={getLocInfo(val) === activeLoc}
								loc_name={val}
								map={occupancyMap[val]}
							/>
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
