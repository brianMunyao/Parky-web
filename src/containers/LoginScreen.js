import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import * as Yup from 'yup';
import axios from 'axios';

import FormItem from '../components/FormItem';
import BaseForm from '../components/BaseForm';
import { encrypt, isLoggedIn } from '../config/utils';

const LoginScreen = () => {
	const [cookies, setCookie] = useCookies(['user']);
	const [formError, setFormError] = useState('');

	const formik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: Yup.object().shape({
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
			};

			axios
				.post('/api/login', data)
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
		<BaseForm handleSubmit={formik.handleSubmit} error={formError}>
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

export default LoginScreen;
