import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FileUpload from '../components/FileUpload';
import { configureSpots } from '../config/apis';

const BaseLot = ({ loc_id, active, children, configure }) => {
	const handleConfiguration = (e) => {
		console.log('starting configuration', loc_id);
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		formData.append('loc_id', loc_id);

		configureSpots(formData)
			.then((res) => toast.success(JSON.stringify(res)))
			.catch((err) => toast.error(JSON.stringify(err)));
	};

	return (
		<Container active={active}>
			{configure ? (
				<FileUpload
					name="configure"
					title="Enter sample image of parking lot"
					// title="Parking lot is not configured"
					subtitle="Lot is not configured"
					onChange={handleConfiguration}
					// subtitle="Sample image of the parking lot"
				/>
			) : (
				children
			)}
		</Container>
	);
};

const Container = styled.div`
	display: ${({ active }) => (active ? 'grid' : 'none')};
	grid-template-rows: 1fr;
	width: 100%;

	.bl-config-con {
	}
`;

export default BaseLot;
