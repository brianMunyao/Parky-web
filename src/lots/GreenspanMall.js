import React from 'react';
import ParkingLot from '../components/ParkingLot';
import BaseLot from './BaseLot';

const GreenspanMall = ({ active, parkingMap }) => {
	return (
		<BaseLot active={active}>
			<div className="occ-parking-con">
				<div className="occ-parking-lots">
					{parkingMap.slice(7).map((c) => (
						<ParkingLot
							lot_name={c ? c.lot_name : '--'}
							occupied={c ? c.occupied : true}
						/>
					))}
				</div>
				<div className="occ-parking-barrier"></div>
				<div className="occ-parking-lots">
					{parkingMap.slice(0, 7).map((c) => (
						<ParkingLot
							lot_name={c ? c.lot_name : '--'}
							occupied={c ? c.occupied : true}
						/>
					))}
				</div>
			</div>
		</BaseLot>
	);
};

export default GreenspanMall;
