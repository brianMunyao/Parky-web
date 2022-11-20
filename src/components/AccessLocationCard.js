import React, { useEffect, useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import styled from '@emotion/styled';

import { getLocationImage } from '../config/apis';
import colors from '../config/colors';
import { capitalize } from '../config/utils';

const AccessLocationCard = ({ key, data, onClick }) => {
	const [img, setImg] = useState(null);

	useEffect(() => {
		getLocationImage(data.prefix)
			.then((res) => {
				if (res.data) {
					setImg(res.data);
				}
			})
			.catch((e) => console.log('Error getting location image'));
	}, [data]);
	return (
		<Container key={key} onClick={onClick}>
			{/* onClick={() => setLocation(loc)}> */}
			<div className="ac-loc-img">
				{img ? (
					<img
						className="loc-image"
						src={`data:image/jpeg;base64,${img}`}
						alt="lot_image"
					/>
				) : (
					<div className="ac-loc-icon">
						<IoImageOutline size={120} />
					</div>
				)}
			</div>
			<p className="ac-loc-title">{capitalize(data.loc_name)}</p>
			<p className="ac-loc-prefix">{data.prefix}</p>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	background: white;
	padding: 15px;
	border-radius: 10px;
	color: #353535;
	cursor: pointer;
	user-select: none;
	box-shadow: 1px 2px 2px #ececec;
	transition: all 0.2s linear;
	display &:hover {
		box-shadow: 5px 2px 2px #ececec;
		transform: scale(1.03);
	}
	.ac-loc-img {
		position: relative;
		width: 100%;
		height: 175px;
		overflow: hidden;
		border-radius: 5px;
		img {
			height: 100%;
			position: absolute;
			margin: auto;
			top: -9999px;
			left: -9999px;
			right: -9999px;
			bottom: -9999px;
		}
	}

	.ac-loc-title {
		margin-top: 10px;
		/* font-weight: 600; */
	}
	.ac-loc-prefix {
		font-weight: 700;
		color: ${colors.primaryBlue};
		margin-top: 0px;
	}
	.ac-loc-icon {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		svg {
			width: 100%;
			color: ${colors.errorLighter};
		}
	}
`;

export default AccessLocationCard;
