import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { openDialog, MyDispatch } from '../../../Actions/Actions';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

const MoveAction: React.FC<MoveActionProps> = (props) => {
    const { handleClick } = props;

    return (
        <MenuItem onClick={() => handleClick()}>
            <ListItemIcon>
                <HowToVoteIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Move
            </Typography>
        </MenuItem>        
    );
}

interface MoveActionProps {
    handleClick(): void;
}

const mapStateToProps = (state: AppState) => {
    return {};
};

const mapDispatchToProps = (dispatch: MyDispatch) => {
    return {
        handleClick: () => {
            dispatch(openDialog(DIALOGS.MOVE));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveAction);
