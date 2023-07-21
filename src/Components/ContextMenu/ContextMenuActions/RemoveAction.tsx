import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import { removeItems, MyDispatch } from '../../../Actions/Actions';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Item } from '../../../Api/Item';
import { AppState } from '../../../Reducers/reducer';

const RemoveAction: React.FC<RemoveActionProps> = (props) => {
    const { handleClick, selectedItems } = props;
    return (
        <MenuItem onClick={() => handleClick(selectedItems)}>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Remove
            </Typography>
        </MenuItem>        
    );
}

interface RemoveActionProps {
    handleClick(selectedItems: Item[]): void;
    selectedItems: Item[];
}

const mapStateToProps = (state: AppState) => {
    return {
        selectedItems: state.items.selected
    };
};

const mapDispatchToProps = (dispatch: MyDispatch) => {
    return {
        handleClick: (selectedItems: Item[]) => {
            dispatch(removeItems(selectedItems));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAction);
