import React, {FC} from 'react';
import {BasicModal} from "../../../common/pages/modal/BasicModal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


type DeletePackModalType = {
    handleOperation: () => void
    packName: string

}

export const DeletePackModal: FC<DeletePackModalType> = ({handleOperation, packName}) => {
    return (
        <BasicModal operationButtonName={"Delete"}
                    operationName={"Delete Pack"}
                    handleOperation={handleOperation}
                    openModalButton={<IconButton
                        aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>}>
            <div>
                <div>Do you really want to remove <b>{packName}</b>?</div>

                <div>All cards will be excluded from this course.</div>
            </div>
        </BasicModal>
    );
};

