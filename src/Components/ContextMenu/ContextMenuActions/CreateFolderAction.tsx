import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { openDialog, MyDispatch } from '../../../Actions/Actions';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

const CreateFolderAction: React.FC<CreateFolderActionProps> = (props) => {
    const {handleClick, handleClose} = props;

    const handleCloseAfter = (callback: () => void) => () => {
        callback();
        handleClose();
    };

    return (
        <MenuItem onClick={handleCloseAfter(handleClick)}>
            <ListItemIcon>
                <CreateNewFolderIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Create folder
            </Typography>
        </MenuItem>        
    );
}

interface CreateFolderActionProps {
    handleClick(): void;
    handleClose(): void;
}

const mapStateToProps = (state: AppState) => {
    return {};
};

const mapDispatchToProps = (dispatch: MyDispatch) => {
    return {
        handleClick: () => {
            dispatch(openDialog(DIALOGS.CREATE_FOLDER));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFolderAction);
