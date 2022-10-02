import React, { useEffect, useState } from 'react';
import { IoCarOutline } from 'react-icons/io5';
import { BiMoney } from 'react-icons//bi';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

import BaseTab from '../components/BaseTab';
import DashStats from '../components/DashStats';
import colors from '../config/colors';
import { convertMoney } from '../config/utils';
import AppBtnLink from '../components/AppBtnLink';
import DashBoardMore from '../components/DashBoardMore';
import AccessesRows from '../components/AccessesRows';

const getRevenue = (arr = []) => {
	let res = 0;
	arr.forEach((v) => {
		res += v.fee_paid;
	});
	return res;
};

const DashBoard = ({ active }) => {
	const [revenue, setRevenue] = useState(0);
	const [moreAccesses, setMoreAccesses] = useState(false);

	const { accesses } = useSelector((state) => state.accessesReducer);

	const viewMoreAccesses = () => setMoreAccesses(true);
	const viewLessAccesses = () => setMoreAccesses(false);

	useEffect(() => {
		setRevenue(getRevenue(accesses));
	}, [accesses]);

	return (
		<Container>
			<BaseTab title="DashBoard" active={active}>
				{moreAccesses ? (
					<DashBoardMore goBack={viewLessAccesses} />
				) : (
					<div className="db-main">
						<div className="db-topbar">
							<DashStats
								Icon={IoCarOutline}
								amount="16 / 25"
								title="Parking Space Available"
							/>
							<DashStats
								Icon={BiMoney}
								amount={convertMoney(revenue)}
								title="Total Revenue"
							/>
							<DashStats
								Icon={BiMoney}
								amount={convertMoney(revenue)}
								title="Total Revenue"
							/>
						</div>

						<div className="db-accesses-con">
							<div className="db-access-title-con">
								<h3 className="db-accesses-title">
									Recent Accesses
								</h3>

								<AppBtnLink onClick={viewMoreAccesses}>
									View More
								</AppBtnLink>
							</div>

							<AccessesRows data={accesses.slice(0, 6)} />
						</div>
					</div>
				)}
			</BaseTab>
		</Container>
	);
};

const Container = styled.div`
	.db-main {
		.db-topbar {
			padding: 10px;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			grid-auto-rows: 130px;
			column-gap: 40px;
			row-gap: 20px;
		}
		.db-accesses-con {
			margin: 10px 0;
			.db-access-title-con {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10px;

				.db-accesses-title {
					color: #545454;
				}
			}

			/* table {
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
			} */
		}
	}
`;

export default DashBoard;
