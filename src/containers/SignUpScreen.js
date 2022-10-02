import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import moment from 'moment';
import axios from 'axios';

import BaseForm from '../components/BaseForm';
import FormItem from '../components/FormItem';
import { encrypt, isLoggedIn } from '../config/utils';

const SignUpScreen = () => {
	const [cookies, setCookie] = useCookies(['user']);
	const [formError, setFormError] = useState('');

	const formik = useFormik({
		initialValues: { fullname: '', email: '', password: '' },
		validationSchema: Yup.object().shape({
			fullname: Yup.string().required('Name required'),
			email: Yup.string()
				.email('Invalid email')
				.required('Email required'),
			password: Yup.string()
				.min(8, 'Must be longer than 8 characters')
				.required('Password required'),
		}),
		onSubmit: (values) => {
			const data = {
				...values,
				password: encrypt(values.password),
				joined_on: moment().toLocaleString(),
				role: 'user', //! CHANGE THIS LATER
			};

			axios
				.post('/api/register', data)
				.then((res) => {
					if (res.data.error) {
						setFormError(res.data.error);
					} else {
						setFormError('');
						setCookie('user', JSON.stringify(res.data.data));
					}
				})
				.catch((err) => {
					setFormError('Server Error. Try Again Later.');
				});
		},
	});

	return isLoggedIn(cookies) ? (
		<Navigate to="/" />
	) : (
		<BaseForm
			type="signup"
			handleSubmit={formik.handleSubmit}
			error={formError}>
			<FormItem
				name="fullname"
				label="Fullname"
				value={formik.values.fullname}
				error={formik.errors.fullname}
				touched={formik.touched.fullname}
				placeholder="Enter your fullname"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			<FormItem
				name="email"
				label="Email"
				type="email"
				value={formik.values.email}
				error={formik.errors.email}
				touched={formik.touched.email}
				placeholder="Enter your email"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			<FormItem
				name="password"
				label="Password"
				value={formik.values.password}
				error={formik.errors.password}
				touched={formik.touched.password}
				type="password"
				placeholder="Enter your password"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		</BaseForm>
	);
};

export default SignUpScreen;
