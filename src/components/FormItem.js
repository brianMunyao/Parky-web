import React, { useState } from 'react';
import styled from 'styled-components';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import colors from '../config/colors';

const FormItem = ({
	label = '',
	value,
	error = '',
	touched = false,
	name = '',
	type = 'text',
	className = '',
	placeholder = '',
	onChange,
	onBlur,
}) => {
	const [see, setSee] = useState(false);

	const toggleSee = () => setSee(!see);

	return (
		<Container pass={type === 'password'} className={className}>
			<label htmlFor={name} className="fi-label">
				{label}
			</label>
			<div className="fi-input">
				<input
					type={type === 'password' && see ? 'text' : type}
					name={name}
					id={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
				/>

				{type === 'password' && (
					<span className="fi-eye" onClick={toggleSee}>
						{see ? <IoEyeOff /> : <IoEye />}
					</span>
				)}
			</div>
			{touched && <p className="fi-error">{error}</p>}
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	margin: 7px 0;

	label {
		font-weight: 600;
		font-size: 13.5px;
		opacity: 0.7;
		padding: 0 3px;
		user-select: none;
	}
	.fi-input {
		width: 100%;
		height: 40px;
		position: relative;

		input {
			position: absolute;
			border-radius: 5px;
			width: 100%;
			height: 100%;
			padding: ${({ pass }) => (pass ? '0 35px 0 10px' : '0 10px')};
			border: 1.5px solid #d8d8d8;
			font-size: 16px;
		}
		.fi-eye {
			position: absolute;
			height: 100%;
			width: 40px;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			color: #868686;
		}
	}
	.fi-error {
		color: ${colors.error};
		font-size: 13px;
		font-weight: 600;
		margin-top: 2px;
		/* text-align: end; */
	}
`;

export default FormItem;
