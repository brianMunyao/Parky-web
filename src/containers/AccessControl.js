import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoImageOutline } from 'react-icons/io5';
import moment from 'moment';
import { toast } from 'react-toastify';

import colors from '../config/colors';
import BaseTab from '../components/BaseTab';
import { getFee } from '../config/utils';
import { vehicleEnter, vehicleEnterPut, vehicleExitPost } from '../config/apis';

const AccessControl = ({ active }) => {
	const entry = (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		formData.append('entry_time', moment().toLocaleString());

		vehicleEnter(formData)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
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
						if (res.data.error) {
							toast.error(res.data);
						} else {
							const { entry_time, exit_time, fee_paid } =
								res.data.data;

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
					<div className="ac-option">
						<input
							type="file"
							name="entrance"
							id="entrance"
							onChange={(e) => entry(e)}
						/>
						<label htmlFor="entrance">
							<div className="ac-option-inner">
								<IoImageOutline />
								<p className="ac-option-text">
									Simulate Vehicle
									<br /> Entrance
								</p>
							</div>
						</label>
					</div>
					<div className="ac-option">
						<input
							type="file"
							name="exit"
							id="exit"
							onChange={(e) => exit(e)}
						/>
						<label htmlFor="exit">
							<div className="ac-option-inner">
								<IoImageOutline />
								<p className="ac-option-text">
									Simulate Vehicle
									<br /> Exit
								</p>
							</div>
						</label>
					</div>
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
		.ac-option {
			box-shadow: rgba(185, 190, 195, 0.2) 0px 8px 24px;
			border-radius: 8px;
			padding: 5px;
			background: white;
			position: relative;
			.ac-option-inner {
				padding: 5px;
				border: 1.5px dashed ${colors.primaryBlueLighter};
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				padding: 50px 0;
				svg {
					font-size: 100px;
					color: ${colors.primaryBlueLighter};
					margin-bottom: 10px;
				}
				p {
					text-align: center;
					font-weight: 600;
					color: ${colors.primaryBlueDarker};
				}
			}
			input {
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 0;
			}
		}
	}
`;

export default AccessControl;
