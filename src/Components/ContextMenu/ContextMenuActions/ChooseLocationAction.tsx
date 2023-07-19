import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import FolderSharedIcon from '@mui/icons-material/FolderSharedOutlined';
import { openDialog, MyDispatch } from '../../../Actions/Actions';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

function ChooseLocationAction(props: ChooseLocationActionProps) {
    const { handleClick, handleClose } = props;

    const handleCloseAfter = (callback: () => void) => () => {
        callback();
        handleClose();
    };

    return (
        <MenuItem onClick={handleCloseAfter(handleClick)}>
            <ListItemIcon>
                <FolderSharedIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Choose root location
            </Typography>
        </MenuItem>        
    );
}

interface ChooseLocationActionProps {
    handleClick(): void;
    handleClose(): void;
}

const mapStateToProps = (state: AppState) => {
    return {};
};

const mapDispatchToProps = (dispatch: MyDispatch) => {
    return {
        handleClick: () => {
            dispatch(openDialog(DIALOGS.CHOOSE_LOCATION));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLocationAction);
