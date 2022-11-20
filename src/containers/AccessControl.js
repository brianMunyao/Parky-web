import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoArrowBack, IoImageOutline } from 'react-icons/io5';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../config/colors';
import BaseTab from '../components/BaseTab';
import { capitalize, getFee } from '../config/utils';
import { vehicleEnter, vehicleEnterPut, vehicleExitPost } from '../config/apis';
import FileUpload from '../components/FileUpload';
import { addAccesses, updateAccesses } from '../store/accessesSlice';
import AccessLocationCard from '../components/AccessLocationCard';

const AccessControl = ({ active }) => {
	const [location, setLocation] = useState(0);
	const [entryLoading, setEntryLoading] = useState(false);
	const [exitLoading, setExitLoading] = useState(false);

	const dispatch = useDispatch();
	const { locations } = useSelector((state) => state.occupancyReducer);

	const entry = (e) => {
		if (e.target.files.length === 0) return;
		setEntryLoading(true);
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		formData.append('entry_time', moment().toLocaleString());
		formData.append('location', location.loc_id);

		vehicleEnter(formData)
			.then((res) => {
				if (res.data) {
					dispatch(addAccesses(res.data));
					toast.success('Car entered');
				} else {
					toast.error(res.error);
				}
			})
			.catch((err) => toast.error(err))
			.finally(() => setEntryLoading(false));
	};

	const exit = (e) => {
		if (e.target.files.length === 0) return;
		setExitLoading(true);
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		formData.append('location', location.loc_id);

		const exit_time = moment().toLocaleString();

		vehicleExitPost(formData)
			.then((res) => {
				if (res.error) {
					toast.error(res.error);
				} else {
					const { entry_time, access_id, owner_id, balance } =
						res.data;

					const time_taken = moment(exit_time).diff(
						moment(entry_time),
						'minutes'
					);

					const fee_to_pay = getFee(time_taken);

					if (balance < fee_to_pay) {
						toast.error('Balance not adequate');
					} else {
						const obj = {
							exit_time,
							fee_paid: fee_to_pay,
							access_id,
							owner_id,
						};

						vehicleEnterPut(obj)
							.then((res) => {
								if (res.error) {
									toast.error(res.error);
								} else {
									dispatch(updateAccesses(res.data));
									const { entry_time, exit_time, fee_paid } =
										res.data;

									toast.success(
										`From: ${moment(entry_time).format(
											'HH:MM:SS'
										)}, To: ${moment(exit_time).format(
											'HH:MM:SS'
										)}, Time taken: ${time_taken}, Fee Paid: ${fee_paid}`
									);
								}
							})
							.catch((e) => {
								toast.error('Call Error', JSON.stringify(e));
							});
					}
				}
			})
			.catch((err) => console.log(err))
			.finally(() => setExitLoading(false));
	};

	return (
		<Container>
			<BaseTab title="Access Control" active={active}>
				<div className="ac-loc-con">
					{location === 0 ? (
						<>
							<p className="ac-locs-title">Available Locations</p>
							<div className="ac-locations">
								{locations.map((loc, i) => (
									<AccessLocationCard
										key={i}
										data={loc}
										onClick={() => setLocation(loc)}
									/>
								))}
							</div>
						</>
					) : (
						<>
							<div
								className="ac-back"
								onClick={() => setLocation(0)}>
								<IoArrowBack />
								<span>Back to Locations</span>
							</div>

							<p className="ac-opened-loc">
								{capitalize(location.loc_name)}
							</p>

							<div className="ac-options">
								<FileUpload
									loading={entryLoading}
									title="Simulate Vehicle Entry"
									name="entry"
									onChange={(e) => entry(e)}
								/>
								<FileUpload
									loading={exitLoading}
									title="Simulate Vehicle Exit"
									name="exit"
									onChange={(e) => exit(e)}
								/>
							</div>
						</>
					)}
				</div>
			</BaseTab>
		</Container>
	);
};

const Container = styled.div`
	.ac-loc-con {
		.ac-back {
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
		.ac-opened-loc {
			opacity: 0.7;
			font-weight: 600;
			letter-spacing: 0.4px;
			margin: 10px;
		}

		.ac-locs-title {
			opacity: 0.7;
			font-weight: 700;
		}
		.ac-locations {
			padding: 10px 0;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(100px, 250px));
			gap: 10px;
		}
	}
	.ac-options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 200px;
		grid-gap: 10px;
	}
`;

export default AccessControl;
