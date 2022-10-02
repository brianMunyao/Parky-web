import axios from 'axios';
import React from 'react';
import { IoImageOutline } from 'react-icons/io5';
import styled from 'styled-components';

import BaseTab from '../components/BaseTab';
import FileUpload from '../components/FileUpload';
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
				<FileUpload
					name="anprTest"
					title="Test ANPR"
					onChange={testANPR}
				/>

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
`;

export default Settings;
