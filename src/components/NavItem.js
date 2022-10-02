import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const NavItem = ({ logout, label = '', Icon, active = false, onClick }) => {
	return (
		<Container logout={logout} active={active} onClick={onClick}>
			<Icon />
			<span className="ni-label">{label}</span>
		</Container>
	);
};

const Container = styled.div`
	background: ${({ logout, active }) =>
		logout ? colors.errorLighter : active ? colors.primaryBlue : 'inherit'};
	color: ${({ logout, active }) =>
		logout ? colors.error : active ? colors.white : colors.blackLight};
	transition: all 0.1s linear;
	margin: 10px;
	padding: 0 10px;
	height: 40px;
	display: flex;
	align-items: center;
	border-radius: 8px;
	user-select: none;
	cursor: pointer;

	svg {
		margin-right: 6px;
		font-size: 18px;
	}

	&:hover {
		background: ${({ logout, active }) =>
			logout
				? colors.error
				: active
				? colors.primaryBlueDark
				: colors.primaryBlueLighter};
		color: ${({ logout, active }) =>
			logout
				? colors.white
				: active
				? colors.white
				: colors.primaryBlueDarker};
	}
	&:active {
		background: ${({ active }) =>
			active ? colors.primaryBlueDarker : colors.primaryBlueLight};
	}

	@media (max-width: 720px) {
		justify-content: center;
		span {
			display: none;
		}
		svg {
			margin-right: 0;
			font-size: 20px;
		}
	}
`;

export default NavItem;
