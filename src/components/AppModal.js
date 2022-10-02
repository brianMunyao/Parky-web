import { Modal } from '@mui/material';
import React from 'react';

const AppModal = ({ isOpen, handleClose, children }) => {
	return (
		<Modal
			open={isOpen}
			onClose={handleClose}
			style={{ overflowY: 'auto' }}>
			{children}
		</Modal>
	);
};

export default AppModal;
