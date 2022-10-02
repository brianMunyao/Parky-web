import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { convertMoney } from '../config/utils';

const AccessesRows = ({ data = [] }) => {
	const { appWidth } = useSelector((state) => state.mainReducer);

	return (
		<Container>
			{appWidth > 500 ? (
				<table id="db-a-tbl">
					<tr>
						<th className="db-a-model">Car Model</th>
						<th className="db-a-license">
							{appWidth > 650 ? 'License Plate' : 'Plate No.'}
						</th>
						<th className="db-a-entry">Entry Time</th>
						<th className="db-a-exit">Exit Time</th>
						<th className="db-a-fee_paid">Fee Paid</th>
					</tr>

					{data.map((acc) => (
						<tr className="db-a-info">
							<td className="db-a-model">{acc.model}</td>
							<td className="db-a-license">{acc.license}</td>
							<td className="db-a-entry">
								{moment(acc.entry_time).format('MMM DD HH:mm')}
							</td>
							<td className="db-a-exit">
								{acc.exit_time ? (
									moment(acc.exit_time).format('MMM DD HH:mm')
								) : (
									<i className="db-a-pending">Pending</i>
								)}
							</td>
							<td className="db-a-fee_paid">
								{convertMoney(acc.fee_paid)}
							</td>
						</tr>
					))}
				</table>
			) : (
				<table id="mob-table">
					{data.map((acc) => (
						<tr className="db-mob-top-tr db-a-info">
							<tr>
								<th>Model</th>
								<td>{acc.model}</td>
							</tr>
							<tr>
								<th>Plate No.</th>
								<td>{acc.license}</td>
							</tr>
							<tr>
								<th>Date</th>
								<td>
									{moment(acc.entry_time).format('MMM D')}
								</td>
							</tr>
							<tr>
								<th>Time</th>
								<td>
									{moment(acc.entry_time).format('HH:mm')} -{' '}
									{acc.exit_time ? (
										moment(acc.exit_time).format('HH:mm')
									) : (
										<i className="db-a-pending">Pending</i>
									)}
								</td>
							</tr>
							<tr>
								<th>Fee Paid</th>
								<td>{convertMoney(acc.fee_paid)}</td>
							</tr>
						</tr>
					))}
				</table>
			)}
		</Container>
	);
};

const Container = styled.div`
	table {
		padding: 10px;
		background: white;
		width: 100%;
		border-radius: 5px;
		border-collapse: collapse;
		overflow: hidden;

		th {
			color: #1f1f1f;
			font-weight: 600;
		}
		td {
			opacity: 0.8;
		}

		.db-a-info {
			&:hover {
				background: #f3f3f3;
			}
		}
		.db-a-pending {
			color: #aeaeae;
		}
	}

	#db-a-tbl {
		th,
		td {
			text-align: left;
			padding: 15px 10px;
			letter-spacing: 0.3px;
		}

		tr {
			border-bottom: 1px solid #e0e0e0d2;
		}
		.db-a-info {
			&:hover {
				background: #f3f3f3;
			}
		}
		.db-a-pending {
			color: #aeaeae;
		}

		@media (max-width: 650px) {
			.db-a-model {
				display: none;
			}
		}
	}

	#mob-table {
		margin: 0 0 10px;
		.db-mob-top-tr {
			border-bottom: 1.5px solid #e0e0e0d2;
			tr {
				th,
				td {
					padding: 5px 10px;
					text-align: left;
				}
			}
		}
	}
`;

export default AccessesRows;
