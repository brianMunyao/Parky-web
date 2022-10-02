import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import colors from '../config/colors';
import AppBtn from './AppBtn';
import Logo from './Logo';

const BaseForm = ({ children, handleSubmit, type = 'login', error = '' }) => {
	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<div className="ls-con">
					<Logo className="ls-logo" />

					<p className="ls-title">
						{type === 'login' ? 'Welcome Back' : 'Register'}
					</p>

					<p className="ls-form-error">{error}</p>

					{children}

					<AppBtn
						type="submit"
						text={type === 'login' ? 'Login' : 'Sign Up'}
						className="ls-btn"
					/>

					<p className="ls-account">
						{type === 'login' ? (
							<>
								Don't have an account?
								<Link to="/signup">Sign up</Link>
							</>
						) : (
							<>
								Already have an account?
								<Link to="/login">Login</Link>
							</>
						)}
					</p>
				</div>
			</form>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	min-height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${colors.white};

	.ls-con {
		width: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		.ls-logo {
			margin-bottom: 20px;
		}
		.ls-title {
			font-weight: 600;
			font-size: 30px;
		}
		.ls-form-error {
			color: ${colors.error};
			margin-top: 10px;
		}
		.ls-btn {
			margin-top: 20px;
		}
		.ls-account {
			text-align: center;
			margin: 20px 0;
			font-size: 15px;
			font-weight: 600;
			color: #545454;
		}
		a {
			transition: all 0.1s linear;
			border-bottom: 1.5px solid transparent;
			color: ${colors.primaryBlue};
			&:hover {
				border-bottom: 1.5px solid ${colors.primaryBlue};
			}
		}
	}
`;

export default BaseForm;
