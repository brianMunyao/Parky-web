import React, { useCallback, useEffect, useState } from 'react';
import { IoCarOutline } from 'react-icons/io5';
import { BiMoney } from 'react-icons//bi';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
import { getParkingStatus } from '../config/apis';
import { updateOccupancyMap } from '../store/occupancySlice';

const DashBoard = ({ active }) => {
	const [revenue, setRevenue] = useState(0);
	const [moreAccesses, setMoreAccesses] = useState(false);
	const [parkingSpaces, setParkingSpaces] = useState(0);
	const [parkingSpacesTotal, setParkingSpacesTotal] = useState(0);
	const [response, setResponse] = useState('');

	const { accesses } = useSelector((state) => state.accessesReducer);
	const { occupancyMap } = useSelector((state) => state.occupancyReducer);

	// const dispatch = useDispatch();

	const viewMoreAccesses = () => setMoreAccesses(true);
	const viewLessAccesses = () => setMoreAccesses(false);

	// const getImg = () => {};

	useEffect(() => {
		setRevenue(getFeeSum(accesses, 'amount'));

		if (Object.keys(occupancyMap).length > 0) {
			let available = 0;
			let total = 0;

			Object.entries(occupancyMap).forEach((loc) => {
				if (typeof loc[1] !== 'string') {
					loc[1].status.forEach((lot) => {
						if (!lot.occupied) available += 1;
						total += 1;
					});
				}
			});
			setParkingSpaces(available);
			setParkingSpacesTotal(total);
		}
	}, [accesses, occupancyMap]);

	return (
		<Container>
			<BaseTab title="DashBoard" active={active}>
				{moreAccesses ? (
					<DashBoardMore goBack={viewLessAccesses} />
				) : (
					<div className="db-main">
						{/* <button onClick={getImg}>refresh</button> */}
						{/* <img
							className="status-image"
							src={`data:image/jpeg;base64,${response['GreenSpan Mall'].img}`}
							alt="lot_image"
						/> */}
						<div className="db-topbar">
							<DashStats
								Icon={IoCarOutline}
								amount={`${parkingSpaces} / ${parkingSpacesTotal}`}
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
