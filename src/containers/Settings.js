import axios from 'axios';
import React from 'react';
import { IoImageOutline } from 'react-icons/io5';
import styled from 'styled-components';

import BaseTab from '../components/BaseTab';
import colors from '../config/colors';

const Settings = ({ active }) => {
	const testANPR = (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		// formData.append('entry_time', moment().toLocaleString());

		axios
			.post('/api/license', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => alert(JSON.stringify(res.data)))
			.catch((err) => console.log(err));
	};

	// const

	return (
		<Container>
			<BaseTab active={active} title="Settings">
				<div className="ac-option">
					<input
						type="file"
						name="anprTest"
						id="anprTest"
						onChange={(e) => testANPR(e)}
					/>
					<label htmlFor="anprTest">
						<div className="ac-option-inner">
							<IoImageOutline />
							<p className="ac-option-text">Test ANPR</p>
						</div>
					</label>
				</div>

				<div className="set-spots">
					<h4 className="set-title">Configure Parking Spots</h4>
				</div>
			</BaseTab>
		</Container>
	);
};

const Container = styled.div`
	.set-spots {
		margin: 10px 0;

		color: #2a2a2a;
		letter-spacing: 0.3px;
	}

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
`;

export default Settings;
