import React, { FC } from 'react';
import { BasicModal } from '../../../common/pages/modal/BasicModal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


type DeleteCardModalType = {
	handleOperation: () => void
	cardName: string
}

export const DeleteCardModal: FC<DeleteCardModalType> = ({handleOperation, cardName}) => {

	return (
		<BasicModal operationButtonName={"Delete"}
		            operationName={"Delete Card"}
		            handleOperation={handleOperation}
		            openModalButton={<IconButton
			            aria-label="delete" size="small">
			            <DeleteIcon fontSize="inherit"/>
		            </IconButton>}>
			<div>
				Do you really want to remove card with question '<b>{cardName}</b>' ?
			</div>


		</BasicModal>
	);
};

