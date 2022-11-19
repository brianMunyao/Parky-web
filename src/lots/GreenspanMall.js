import React from 'react';

import ParkingLot from '../components/ParkingLot';

const GreenspanMall = ({ activeTab, parkingMap }) => {
	return (
		<div>
			{activeTab === 0 ? (
				<div className="occ-parking-con">
					<div className="occ-parking-lots">
						{parkingMap.status.slice(0, 7).map((c) => (
							<ParkingLot
								lot_name={c ? c.lot_name : '--'}
								occupied={c ? c.occupied : true}
							/>
						))}
					</div>
					<div className="occ-parking-barrier"></div>
					<div className="occ-parking-lots">
						{parkingMap.status.slice(7).map((c) => (
							<ParkingLot
								lot_name={c ? c.lot_name : '--'}
								occupied={c ? c.occupied : true}
							/>
						))}
					</div>
				</div>
			) : (
				<img
					className="status-image"
					src={`data:image/jpeg;base64,${parkingMap.img}`}
					alt="lot_image"
				/>
			)}
		</div>
	);
};

export default GreenspanMall;
