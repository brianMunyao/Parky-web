import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';

import * as animation from '../assets/circle_loading_white.json';
import colors from '../config/colors';

const AppBtn = ({
	loading,
	text,
	type = 'button',
	onClick,
	width = '100%',
	className = '',
}) => {
	return (
		<Container
			type={type}
			onClick={onClick}
			style={{ width: width }}
			className={className}>
			{loading ? (
				<div className="btn-overlay">
					<Lottie
						width={80}
						options={{
							animationData: animation,
							autoplay: true,
							loop: true,
							rendererSettings: {
								preserveAspectRatio: 'xMidYMid slice',
							},
						}}
					/>
				</div>
			) : (
				text
			)}
		</Container>
	);
};

const Container = styled.button`
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 40px;
	/* padding: 8px 5px; */
	text-align: center;
	color: white;
	font-size: 17px;
	letter-spacing: 0.3px;
	background: ${colors.primaryBlue};
	border-radius: 5px;
	cursor: pointer;
	border: none;
	transition: all 0.1s linear;
	user-select: none;

	.btn-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	&:hover {
		background: ${colors.primaryBlueDark};
	}
	&:active {
		background: ${colors.primaryBlueDarker};
	}
`;

export default AppBtn;
