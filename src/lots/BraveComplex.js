import React from 'react';
import styled from 'styled-components';

import ParkingLot from '../components/ParkingLot';
import Road from '../components/Road';

const BraveComplex = ({ activeTab, parkingMap }) => {
	return (
		<Container>
			{activeTab === 0 ? (
				<div className="bc-parking-con occ-parking-con">
					<Road barrier />
					<div className="bc-lots">
						{parkingMap.status.slice(0, 9).map((c) => (
							<ParkingLot
								lot_name={c ? c.lot_name : '--'}
								occupied={c ? c.occupied : true}
							/>
						))}
					</div>
					<div>
						<Road />
					</div>
					{/* <div className="occ-parking-barrier"></div> */}
					<div className="bc-lots">
						<div></div>
						<div></div>
						<div></div>
						{parkingMap.status.slice(9).map((c) => (
							<ParkingLot
								rotate
								lot_name={c ? c.lot_name : '--'}
								occupied={c ? c.occupied : true}
							/>
						))}
					</div>

					<Road barrier />
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
	.bc-parking-con {
		height: 500px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 35px 1fr 50px 1fr 35px;
		& > * {
			width: 100%;
			height: 100%;
		}

		.bc-lots {
			display: grid;
			grid-template-rows: 100%;
			grid-template-columns: repeat(9, 1fr);
			gap: 5px;
		}
	}
`;

export default BraveComplex;
