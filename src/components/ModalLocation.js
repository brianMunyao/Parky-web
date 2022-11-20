import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import colors from '../config/colors';
import AppModal from './AppModal';
import FormItem from './FormItem';
import { addLocation } from '../config/apis';
import { addNewLocation } from '../store/occupancySlice';
import AppBtn from './AppBtn';

const ModalLocation = ({ isOpen, onClose }) => {
	const [submitting, setSubmitting] = useState(false);
	const [formError, setFormError] = useState('');
	const [cookies] = useCookies(['user']);

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: { location: '', prefix: '', admin_id: cookies.user.id },
		validationSchema: Yup.object().shape({
			location: Yup.string().required('Location required'),
			prefix: Yup.string()
				.min(2, 'Min of 2 characters')
				.max(4, 'Max of 4 characters')
				.required('Prefix required'),
		}),
		onSubmit: (values) => {
			setSubmitting(true);
			setFormError('');

			addLocation(values)
				.then((res) => {
					if (res.error) {
						setFormError(res.error);
					} else {
						dispatch(addNewLocation(res.data));
						toast.success('New Location added');
						onClose();
					}
					setSubmitting(false);
				})
				.catch((e) => {
					setFormError(e);
					setSubmitting(false);
				});
		},
	});

	return (
		<AppModal isOpen={isOpen} onClose={onClose}>
			<Container>
				<div className="ml-topbar">
					<span>Add New Location</span>
					<IoClose onClick={onClose} />
				</div>
				<div className="ml-form-err">{formError}</div>
				<form onSubmit={formik.handleSubmit}>
					<FormItem
						name="location"
						label="Location"
						value={formik.values.location}
						error={formik.errors.location}
						touched={formik.touched.location}
						placeholder="Enter a new location"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<FormItem
						name="prefix"
						label="Prefix"
						value={formik.values.prefix}
						error={formik.errors.prefix}
						touched={formik.touched.prefix}
						placeholder="Location abbreviation"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<AppBtn
						loading={submitting}
						type="submit"
						text="Add"
						className="ml-btn"
					/>
				</form>
			</Container>
		</AppModal>
	);
};

const Container = styled.div`
	background: white;
	width: 300px;
	padding: 15px;
	border-radius: 10px;

	.ml-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		span {
			font-weight: 600;
			color: ${colors.blackLight};
		}
		svg {
			font-size: 20px;
			cursor: pointer;
		}
	}
	.ml-form-err {
		color: ${colors.error};
		margin-top: 10px;
		text-align: center;
	}
	.ml-btn {
		margin-top: 10px;
	}
`;

export default ModalLocation;
