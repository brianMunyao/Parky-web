import React, { useEffect, useState } from 'react';
import { IoCarOutline } from 'react-icons/io5';
import { BiMoney } from 'react-icons//bi';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import BaseTab from '../components/BaseTab';
import DashStats from '../components/DashStats';
import {
	convertMoney,
	getFeeSum,
	getMonthlyData,
	getMonthlyTotals,
} from '../config/utils';
import AppBtnLink from '../components/AppBtnLink';
import DashBoardMore from '../components/DashBoardMore';
import AccessesRows from '../components/AccessesRows';

const DashBoard = ({ active }) => {
	const [revenue, setRevenue] = useState(0);
	const [moreAccesses, setMoreAccesses] = useState(false);
	const [parkingSpaces, setParkingSpaces] = useState(0);

	const { accesses } = useSelector((state) => state.accessesReducer);
	const { occupancyMap } = useSelector((state) => state.occupancyReducer);

	const viewMoreAccesses = () => setMoreAccesses(true);
	const viewLessAccesses = () => setMoreAccesses(false);

	useEffect(() => {
		setRevenue(getFeeSum(accesses, 'fee_paid'));

		if (Object.keys(occupancyMap).length > 0) {
			let num = 0;
			Object.entries(occupancyMap).forEach((loc) => {
				if (typeof loc[1] !== 'string') {
					loc[1].status.forEach((lot) => {
						if (!lot.occupied) num += 1;
					});
				}
			});
			setParkingSpaces(num);
		}
	}, [accesses, occupancyMap]);

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
								amount={`${parkingSpaces} / 25`}
								title="Parking Space Available"
							/>
							<DashStats
								Icon={BiMoney}
								amount={convertMoney(revenue)}
								title="Total Revenue"
							/>
							<DashStats
								// Icon={BiMoney}
								// amount={convertMoney(revenue)}
								title="Monthly Revenue"
								data={getMonthlyTotals(accesses)}
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
