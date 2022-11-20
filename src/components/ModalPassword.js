import React, { useState } from 'react';
import { useFormik } from 'formik';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';

import { updatePassword } from '../config/apis';
import colors from '../config/colors';
import AppBtn from './AppBtn';
import AppModal from './AppModal';
import FormItem from './FormItem';
import { encrypt } from '../config/utils';

const ModalPassword = ({ isOpen, onClose }) => {
	const [cookies] = useCookies(['user']);
	const [submitting, setSubmitting] = useState(false);
	const [formError, setFormError] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: cookies.user.email,
			current_password: '',
			new_password: '',
			new_password2: '',
		},
		validationSchema: Yup.object().shape({
			current_password: Yup.string().required('Field required'),
			new_password: Yup.string()
				.min(8, 'Min of 8 characters')
				.required('Field required'),
			new_password2: Yup.string()
				.min(8, 'Min of 8 characters')
				.required('Field required'),
		}),
		onSubmit: (values, helper) => {
			setSubmitting(true);
			setFormError('');

			if (values.new_password !== values.new_password2) {
				helper.setErrors({ new_password2: "Passwords don't match" });
				setSubmitting(false);
			} else {
				updatePassword({
					...values,
					current_password: encrypt(values.current_password),
					new_password: encrypt(values.new_password),
				})
					.then((res) => {
						if (res.error) {
							setFormError(res.error);
						} else {
							toast.success('Settings Updated');
							onClose();
						}
						setSubmitting(false);
					})
					.catch((e) => {
						setFormError(e);
						setSubmitting(false);
					});
			}
		},
	});

	return (
		<AppModal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={formik.handleSubmit}>
				<Container>
					<div className="mp-topbar">
						<span>Update Password</span>
						<IoClose onClick={onClose} />
					</div>

					<div className="mp-form-err">{formError}</div>

					<FormItem
						name="current_password"
						label="Current Password"
						value={formik.values.current_password}
						error={formik.errors.current_password}
						touched={formik.touched.current_password}
						placeholder="Enter the current password"
						type="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<FormItem
						name="new_password"
						label="New Password"
						value={formik.values.new_password}
						error={formik.errors.new_password}
						touched={formik.touched.new_password}
						placeholder="Enter new password"
						type="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<FormItem
						name="new_password2"
						label="Confirm Password"
						value={formik.values.new_password2}
						error={formik.errors.new_password2}
						touched={formik.touched.new_password2}
						placeholder="Re-enter new password"
						type="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<AppBtn
						type="submit"
						loading={submitting}
						text="Update"
						className="mp-btn"
					/>
				</Container>
			</form>
		</AppModal>
	);
};

const Container = styled.div`
	background: white;
	width: 300px;
	padding: 15px;
	border-radius: 10px;

	.mp-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15px;
		span {
			font-weight: 600;
			color: ${colors.blackLight};
		}
		svg {
			font-size: 20px;
			cursor: pointer;
		}
	}
	.mp-form-err {
		color: ${colors.error};
		margin-top: 10px;
		text-align: center;
	}
	.mp-btn {
		margin-top: 10px;
	}
`;

export default ModalPassword;
