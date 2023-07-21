import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { openDialog, MyDispatch } from '../../../Actions/Actions';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

const CopyAction: React.FC<CopyActionProps> = (props) => {
    const { handleClick } = props;

    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>
                <FileCopyIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Copy
            </Typography>
        </MenuItem>        
    );
}

interface CopyActionProps {
    handleClick(): void;
}

const mapStateToProps = (state: AppState) => {
    return {};
};

const mapDispatchToProps = (dispatch: MyDispatch) => {
    return {
        handleClick: () => {
            dispatch(openDialog(DIALOGS.COPY));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyAction);
