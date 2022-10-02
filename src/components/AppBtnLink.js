import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const AppBtnLink = ({ children, onClick }) => {
	return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.span`
	color: ${colors.primaryBlue};
	cursor: pointer;
	transition: all 0.1s linear;
	font-weight: 600;
	letter-spacing: 0.4px;
	font-size: 15px;

	&:hover {
		text-decoration: underline;
	}
`;

export default AppBtnLink;
