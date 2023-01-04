import React from 'react';
import {
	Bar,
	BarChart,
	Label,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from 'recharts';
import styled from 'styled-components';

import colors from '../config/colors';

const DashStats = ({ Icon, amount = 0, title = '', data }) => {
	return (
		<Container>
			{data ? (
				<ResponsiveContainer>
					<BarChart width={150} height={40} data={data}>
						<Bar dataKey="amount" fill="#1894b6" label="name" />
						<XAxis dataKey="name" />
						<Tooltip />
					</BarChart>
				</ResponsiveContainer>
			) : (
				<div className="ds-icon-amount">
					<div className="ds-icon">
						<Icon color={colors.primaryBlue} size={20} />
					</div>
					<p className="ds-amount">{amount}</p>
				</div>
			)}
			<p className="ds-title">{title}</p>
		</Container>
	);
};

const Container = styled.div`
	padding: 15px;
	background: white;
	box-shadow: rgba(185, 190, 195, 0.2) 0px 8px 24px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.ds-icon-amount {
		.ds-icon {
			background: ${colors.primaryBlueLighter};
			width: fit-content;
			height: 30px;
			width: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 5px;
			margin-bottom: 5px;
		}

		.ds-amount {
			font-size: 25px;
			font-weight: 700;
			color: #414141;
		}
	}
	.ds-title {
		font-weight: 500;
		color: #737373;
	}
	/* max-width: 300px; */
	/* margin: 0 auto; */
`;

export default DashStats;
