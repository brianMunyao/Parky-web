import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FileUpload from '../components/FileUpload';
import { configureSpots } from '../config/apis';
import colors from '../config/colors';

const BaseLot = ({
	loc_id,
	active,
	children,
	configure,
	activeTab,
	setActiveTab,
}) => {
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
				<div>
					<div className="bl-topbar">
						<span
							style={{
								color:
									activeTab === 0
										? colors.primaryBlue
										: 'grey',
							}}
							className="bl-topbar-options"
							onClick={() => setActiveTab(0)}>
							Mapping
						</span>
						<span
							style={{
								color:
									activeTab === 1
										? colors.primaryBlue
										: 'grey',
							}}
							className="bl-topbar-options"
							onClick={() => setActiveTab(1)}>
							CCTV
						</span>
					</div>

					<div className="bl-inner">{children}</div>
				</div>
			)}
		</Container>
	);
};

const Container = styled.div`
	display: ${({ active }) => (active ? 'grid' : 'none')};
	grid-template-rows: 1fr;
	width: 100%;

	.bl-topbar {
		margin: 10px 0 20px;
		text-align: center;
		.bl-topbar-options {
			background: white;
			cursor: pointer;
			user-select: none;
			padding: 5px 10px;
			margin-right: 10px;
			border-radius: 10px;
			box-shadow: 10px 10px 10px #dadada2f;
		}
	}
`;

export default BaseLot;
