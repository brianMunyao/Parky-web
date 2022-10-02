import React from 'react';

import mini_img from '../assets/logo-mini.png';
import full_img from '../assets/logo-full.png';
import styled from 'styled-components';

const Logo = ({ full = false, height = 40, className = '' }) => {
	const styles = { height: height, width: 'auto' };

	return full ? (
		<Img
			className={className}
			src={full_img}
			style={styles}
			alt="logo-full"
		/>
	) : (
		<Img
			className={className}
			src={mini_img}
			style={styles}
			alt="logo-mini"
		/>
	);
};

const Img = styled.img`
	user-select: none;
`;

export default Logo;
