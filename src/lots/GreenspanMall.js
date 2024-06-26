import React from 'react';
import styled from 'styled-components';

import ParkingLot from '../components/ParkingLot';
import Road from '../components/Road';

const GreenspanMall = ({ activeTab, parkingMap }) => {
	return (
		<Container>
			{activeTab === 0 ? (
				<div className="occ-parking-con">
					<div>
						<Road />
					</div>

					<div className="occ-parking-lots">
						{parkingMap.status.slice(0, 7).map((c) => (
							<ParkingLot
								rotate
								lot_name={c ? c.lot_name : '--'}
								occupied={c ? c.occupied : true}
							/>
						))}
					</div>

					<Road barrier />

					<div className="occ-parking-lots">
						{parkingMap.status.slice(7).map((c) => (
							<ParkingLot
								lot_name={c ? c.lot_name : '--'}
								occupied={c ? c.occupied : true}
							/>
						))}
					</div>

					<div>
						<Road />
					</div>
				</div>
			) : (
				<img
					className="status-image"
					src={`data:image/jpeg;base64,${parkingMap.img}`}
					alt="lot_image"
				/>
			)}
		</Container>
	);
};

const Container = styled.div`
	.occ-parking-con {
		height: 500px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 50px 1fr 35px 1fr 50px;
		& > * {
			width: 100%;
			height: 100%;
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

export default GreenspanMall;
