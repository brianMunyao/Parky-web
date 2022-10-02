import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const BaseTab = ({ title = '', active, children }) => {
	return (
		<Container active={active}>
			<h2>{title}</h2>
			<div className="bt-body">{children}</div>
		</Container>
	);
};

const Container = styled.div`
	display: ${({ active }) => (active ? 'block' : 'none')};
	width: 100%;
	height: 100%;
	padding: 10px;
	h2 {
		padding: 10px;
		color: ${colors.blackLight};
	}

	.bt-body {
		width: 100%;
		flex: 1;
	}
`;

export default BaseTab;
