import React from 'react';
import styled from 'styled-components';
import { BsImageFill } from 'react-icons/bs';

import colors from '../config/colors';
import Lottie from 'react-lottie';
import * as animation from '../assets/processing-loading.json';

const FileUpload = ({
	loading,
	name,
	title = 'Browse for files',
	subtitle = 'Supports jpg, png, jpeg',
	onChange,
}) => {
	return (
		<Container>
			<label htmlFor={name}>
				<div className="fu-inner">
					{loading ? (
						<Lottie
							style={{ position: 'absolute' }}
							width={300}
							options={{
								animationData: animation,
								autoplay: true,
								loop: true,
								rendererSettings: {
									preserveAspectRatio: 'xMidYMid slice',
								},
							}}
						/>
					) : (
						<>
							<input
								type="file"
								name={name}
								id={name}
								onChange={onChange}
							/>

							<BsImageFill />

							<p className="fu-title">{title}</p>
							<p className="fu-subtitle">{subtitle}</p>
						</>
					)}
				</div>
			</label>
		</Container>
	);
};

const Container = styled.div`
	.fu-inner {
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: ${colors.primaryBlueLightest};
		border: 2px dashed ${colors.primaryBlueLight};
		border-radius: 10px;
		padding: 25px 5px;

		svg {
			font-size: 40px;
			color: ${colors.primaryBlue};
		}

		.fu-title {
			margin: 10px 0 5px;
			font-weight: 600;
			font-size: 18px;
		}
		.fu-subtitle {
			font-size: 15px;
			letter-spacing: 0.2px;
			color: #808080ee;
		}
		input {
			position: absolute;
			width: 0;
			height: 0;
		}
	}
`;

export default FileUpload;
