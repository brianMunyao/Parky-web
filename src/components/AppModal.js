import { Modal } from '@mui/material';
import React from 'react';

const AppModal = ({ isOpen, onClose, children }) => {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflowY: 'auto',
			}}>
			{children}
		</Modal>
	);
};

export default AppModal;
