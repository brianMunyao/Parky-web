import React from 'react';
import styled from 'styled-components';

import background from '../assets/background.jpg';
import barrierImg from '../assets/barrier.gif';

const Road = ({ barrier }) => {
	return <Container barrier={barrier}></Container>;
};

const Container = styled.div`
	background-image: ${({ barrier }) =>
		barrier ? `url(${barrierImg})` : `url(${background})`};
	background-repeat: repeat-x;
	background-size: ${({ barrier }) => (barrier ? '120px' : 'contain')};
	height: 65%;
	margin: ${({ barrier }) => (barrier ? '0' : '10px 0')};
	width: 100%;

	opacity: ${({ barrier }) => (barrier ? 1 : 0.6)};
	border-radius: ${({ barrier }) => (barrier ? '10px' : 0)};
	border: ${({ barrier }) => (barrier ? '1px solid #ddd' : 'none')};
`;

export default Road;
