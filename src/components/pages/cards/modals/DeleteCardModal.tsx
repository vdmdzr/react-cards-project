import React, {FC} from 'react';
import {BasicModal} from '../../../common/pages/modal/BasicModal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import style from '../../../common/styles/FormStyles.module.css'
import {useAppSelector} from "../../../../store/store";


type DeleteCardModalType = {
	handleOperation: () => void
	cardName: string
}

export const DeleteCardModal: FC<DeleteCardModalType> = ({handleOperation, cardName}) => {

	const status = useAppSelector(state => state.profile.status)


	return (
		<BasicModal operationButtonName={"Delete"}
		            operationName={"Delete Card"}
		            handleOperation={handleOperation}
		            openModalButton={<IconButton
						disabled={status==='loading'}
			            aria-label="delete" size="small">
			            <DeleteIcon fontSize="inherit"/>
		            </IconButton>}>
			<div>
				Do you really want to remove card with question? {cardName.slice(0, 11) === 'data:image/'
				? <div className={style.deleteImg}><img src={cardName}/></div>
				: <div style={{fontWeight: 'bold', marginTop: '18px'}}>{cardName}</div>
			}
			</div>

		</BasicModal>
	);
};

