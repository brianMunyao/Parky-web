import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoImageOutline } from 'react-icons/io5';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import colors from '../config/colors';
import BaseTab from '../components/BaseTab';
import { getFee } from '../config/utils';
import { vehicleEnter, vehicleEnterPut, vehicleExitPost } from '../config/apis';
import FileUpload from '../components/FileUpload';
import { addAccesses, updateAccesses } from '../store/accessesSlice';

const AccessControl = ({ active }) => {
	const dispatch = useDispatch();

	const entry = (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		formData.append('entry_time', moment().toLocaleString());

		vehicleEnter(formData)
			.then((res) => {
				if (res.data) {
					dispatch(addAccesses(res.data));
					toast.success('Car entered');
				} else {
					toast.error(res.error);
				}
			})
			.catch((err) => toast.error(err));
	};

	const exit = (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);

		const exit_time = moment().toLocaleString();

		vehicleExitPost(formData)
			.then((res) => {
				const { entry_time } = res.data;

				const time_taken = moment(exit_time).diff(
					moment(entry_time),
					'minutes'
				);

				const obj = {
					...res.data,
					exit_time,
					fee_paid: getFee(time_taken),
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
			})
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<BaseTab title="Access Control" active={active}>
				{/* <img src="/api/access/stream" alt="stream" /> */}
				<div className="ac-options">
					<FileUpload
						title="Simulate Vehicle Entry"
						name="entry"
						onChange={(e) => entry(e)}
					/>
					<FileUpload
						title="Simulate Vehicle Exit"
						name="exit"
						onChange={(e) => exit(e)}
					/>
				</div>
			</BaseTab>
		</Container>
	);
};

const Container = styled.div`
	.ac-options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 10px;
	}
`;

export default AccessControl;
