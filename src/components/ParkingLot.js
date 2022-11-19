import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';
import car from '../assets/car-top.png';

const ParkingLot = ({ occupied, lot_name }) => {
	return (
		<Container occupied={occupied} className="occ-parking-lot">
			<div className="occ-parking-lot-inner">
				{occupied ? (
					<img src={car} alt="car" />
				) : (
					<span className="lot-name">{lot_name}</span>
				)}
			</div>
		</Container>
	);
};

const Container = styled.div`
	background: ${({ occupied }) =>
		typeof occupied === 'string'
			? 'grey'
			: occupied
			? 'transparent'
			: colors.successLight};
	border-radius: 5px;
	font-size: 14px;
	font-weight: 600;
	color: #515151;
	letter-spacing: 0.4px;
	text-align: center;
	padding: 5px;

	.occ-parking-lot-inner {
		border: 1.5px dashed #cbcbcb;
		height: 100%;
		width: 100%;
		border-radius: 5px;
		position: relative;
	}

	img {
		height: 50px;
		rotate: 90deg;
		position: absolute;
		left: 30%;
		top: 50%;
		transform: translate(-30%, 50%);
		@media (max-width: 1200px) {
			height: 40px;
			left: 30%;
			top: 50%;
			transform: translate(-30%, 50%);
		}
		@media (max-width: 950px) {
			left: 28%;
			top: 50%;
			transform: translate(-30%, 50%);
		}
		@media (max-width: 860px) {
			height: 35px;
			left: 25%;
			top: 50%;
			transform: translate(-30%, 50%);
		}
		@media (max-width: 650px) {
			height: 30px;
			left: 20%;
			top: 50%;
			transform: translate(-30%, 50%);
		}
	}
`;

export default ParkingLot;
