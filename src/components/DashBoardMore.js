import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import AccessesRows from './AccessesRows';

const DashBoardMore = ({ goBack }) => {
	const { accesses } = useSelector((state) => state.accessesReducer);
	return (
		<Container>
			<div className="dbm-back" onClick={goBack}>
				<IoArrowBack />
				<span>Back to Main</span>
			</div>

			<AccessesRows data={accesses} />
		</Container>
	);
};

const Container = styled.div`
	padding: 0 10px;
	.dbm-back {
		margin: 5px 0 10px;
		padding: 3px 10px;
		border-radius: 20px;
		display: flex;
		align-items: center;
		color: grey;
		width: fit-content;
		letter-spacing: 0.2px;
		font-size: 15px;
		transition: all 0.1s linear;
		cursor: pointer;

		&:hover {
			background: #ebebeb;
		}

		svg {
			margin-right: 5px;
		}
	}
`;

export default DashBoardMore;
