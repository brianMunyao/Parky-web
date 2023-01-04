import React, { useState } from 'react';
import styled from 'styled-components';

import { capitalize } from '../config/utils';
import BaseLot from './BaseLot';
import GreenspanMall from './GreenspanMall';
import BraveComplex from './BraveComplex';

const LotTest = ({ configure, loc_id, loc_name, active, map }) => {
	const [activeTab, setActiveTab] = useState(0);

	if (configure) {
		return (
			<BaseLot loc_id={loc_id} active={active} configure={configure} />
		);
	}

	const getMap = (loc_n) => {
		switch (loc_n) {
			case 'GreenSpanMall':
				return (
					<BaseLot
						setActiveTab={setActiveTab}
						active={active}
						activeTab={activeTab}>
						<GreenspanMall
							activeTab={activeTab}
							// active={active}
							parkingMap={map}
						/>
					</BaseLot>
				);

			case 'BraveComplex':
				return (
					<BaseLot
						setActiveTab={setActiveTab}
						active={active}
						activeTab={activeTab}>
						<BraveComplex
							activeTab={activeTab}
							// active={active}
							parkingMap={map}
						/>
					</BaseLot>
				);

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
	const temp_name = capitalize(loc_name).replace(/\s/g, '');

	return <Container>{getMap(temp_name)}</Container>;
};

const Container = styled.div`
	.status-image {
		width: 100%;
		padding: 0 10%;
		transition: all 0.2s linear;
		@media (max-width: 1150px) {
			padding: 0 5%;
		}
		@media (max-width: 900px) {
			padding: 0;
		}
	}
`;

export default LotTest;
