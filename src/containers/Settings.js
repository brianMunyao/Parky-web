import axios from 'axios';
import React from 'react';
import { IoImageOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useCookies } from 'react-cookie';

import BaseTab from '../components/BaseTab';
import FileUpload from '../components/FileUpload';
import colors from '../config/colors';

const Settings = ({ active }) => {
	const [cookies] = useCookies(['user']);

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
				<div className="sett-topbar">
					<div className="sett-admin-icon">
						<MdAdminPanelSettings />
					</div>

					<div className="sett-info">
						<span className="sett-info-email">
							{cookies.user.email}
						</span>

						<span className="sett-badge">{cookies.user.role}</span>
					</div>
				</div>
				{/* <FileUpload
					name="anprTest"
					title="Test ANPR"
					onChange={testANPR}
				/>

				<div className="set-spots">
					<h4 className="set-title">Configure Parking Spots</h4>
				</div> */}
			</BaseTab>
		</Container>
	);
};

const Container = styled.div`
	.sett-topbar {
		display: flex;
		align-items: center;

		.sett-badge {
			background: ${colors.error};
			color: white;
			border-radius: 5px;
			padding: 2px 8px;
			font-size: 15px;
		}

		.sett-admin-icon {
			background: white;
			width: fit-content;
			height: 100px;
			width: 100px;
			font-size: 80px;
			border-radius: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 20px;
		}
	}

	.set-spots {
		margin: 10px 0;

		color: #2a2a2a;
		letter-spacing: 0.3px;
	}
`;

export default Settings;
