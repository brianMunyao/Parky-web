import React from 'react';

import { capitalize } from '../config/utils';
import BaseLot from './BaseLot';
import GreenspanMall from './GreenspanMall';

const LotTest = ({ configure, loc_id, loc_name, active, map }) => {
	if (configure)
		return (
			<BaseLot loc_id={loc_id} active={active} configure={configure} />
		);

	const temp_name = capitalize(loc_name).replace(/\s/g, '');

	switch (temp_name) {
		case 'GreenspanMall':
			return <GreenspanMall active={active} parkingMap={map} />;

		default:
			return (
				<BaseLot
					loc_id={loc_id}
					active={active}
					configure={configure}
				/>
			);
	}
};

export default LotTest;
