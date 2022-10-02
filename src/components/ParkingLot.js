import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';
import car from '../assets/car-top.png';

const ParkingLot = ({ occupied, lot_name }) => {
	return (
		<Container occupied={occupied} className="occ-parking-lot">
			<div className="occ-parking-lot-inner">
				<span className="lot-name">{lot_name}</span>
				{/* <img src={car} alt="car" /> */}
			</div>
		</Container>
	);
};

const Container = styled.div`
	background: ${({ occupied }) =>
		typeof occupied === 'string'
			? 'grey'
			: occupied
			? colors.errorLight
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
	}

	/* img {
		height: 40px;
		rotate: 90deg;
	} */
`;

export default ParkingLot;
