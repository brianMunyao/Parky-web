import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const BaseTab = ({
	title = '',
	belowTopBarComponent,
	topComponent,
	active,
	children,
}) => {
	return (
		<Container belowTop={belowTopBarComponent} active={active}>
			<div className="bt-topbar">
				<h2>{title}</h2>
				{topComponent}
			</div>
			{belowTopBarComponent}
			<div className="bt-body">{children}</div>
		</Container>
	);
};

const Container = styled.div`
	display: ${({ active }) => (active ? 'grid' : 'none')};
	width: 100%;
	grid-template-columns: 1fr;
	grid-template-rows: ${({ belowTop }) =>
		belowTop ? '50px 40px 1fr' : '50px 1fr'};

	.bt-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
		padding: 0 10px;
		border-bottom: 1.5px solid #f2f2f2;
		h2 {
			color: ${colors.blackLight};
		}
	}

	.bt-body {
		padding: 10px 20px;
	}

	/* width: 100%;
	height: 100%;
	padding: 10px;
	h2 {
		padding: 10px;
		color: ${colors.blackLight};
	}

	.bt-body {
		width: 100%;
		flex: 1;
	} */
`;

export default BaseTab;
