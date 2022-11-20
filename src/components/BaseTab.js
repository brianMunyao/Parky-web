import React, { useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

import colors from '../config/colors';
import { MdAdminPanelSettings } from 'react-icons/md';
import ModalPassword from './ModalPassword';

const BaseTab = ({
	title = '',
	belowTopBarComponent,
	topComponent,
	active,
	children,
}) => {
	const [cookies] = useCookies(['user']);

	const [userInfo, setUserInfo] = useState(false);
	const [password, setPassword] = useState(false);

	const handleOpen = () => setPassword(true);
	const handleClose = () => setPassword(false);

	return (
		<>
			<Container belowTop={belowTopBarComponent} active={active}>
				<div className="bt-topbar">
					<h2>{title}</h2>
					<IoPersonCircleOutline
						size={30}
						onMouseOver={() => setUserInfo(true)}
					/>
					{topComponent}
				</div>
				{belowTopBarComponent}
				<div className="bt-body">{children}</div>
			</Container>

			<UserCard
				userInfo={userInfo}
				onMouseLeave={() => setUserInfo(false)}>
				<MdAdminPanelSettings size={35} />

				<div className="uc-list">
					<p className="uc-item-lbl">Fullname:</p>
					<p className="uc-item">{cookies.user.fullname}</p>
				</div>

				<div className="uc-list">
					<p className="uc-item-lbl">Email:</p>
					<p className="uc-item">{cookies.user.email}</p>
				</div>

				<div className="uc-change-pwd" onClick={handleOpen}>
					Change Password
				</div>

				{/* <span className="uc-badge">{cookies.user.role}</span> */}
			</UserCard>

			<ModalPassword isOpen={password} onClose={handleClose} />
		</>
	);
};

const UserCard = styled.div`
	position: fixed;
	background: white;
	top: 10px;
	right: 10px;
	padding: 10px;
	min-width: 200px;
	box-shadow: 2px 5px 5px #e3e3e395;
	border-radius: 10px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	transform: ${({ userInfo }) =>
		userInfo ? 'translateX(0%)' : 'translateX(120%)'};
	border: 0.5px solid #e8e8e8;
	transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

	svg {
		opacity: 0.6;
		margin-bottom: 10px;
	}
	.uc-list {
		width: 100%;
		text-align: left;
		margin-bottom: 5px;
		.uc-item-lbl {
			color: ${colors.primaryBlue};
			font-weight: 600;
			font-size: 14px;
		}
		.uc-item {
			padding-left: 5px;
			color: #292929;
		}
	}
	.uc-change-pwd {
		margin-top: 10px;
		background: ${colors.primaryBlueLightest};
		color: ${colors.primaryBlueDark};
		font-weight: 600;
		width: 100%;
		padding: 5px;
		border-radius: 5px;
		cursor: pointer;
		user-select: none;
		transition: all 0.2s linear;

		&:hover {
			color: ${colors.primaryBlueDarker};
			background: ${colors.primaryBlueLight};
		}
	}
`;

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
		svg {
			color: #2f495aac;
			cursor: pointer;
			transition: all 0.2s linear;
			&:hover {
				color: #2f495aef;
			}
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
