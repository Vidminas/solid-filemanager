import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { extractZipFile, MyDispatch } from '../../../Actions/Actions';
import { AppState } from '../../../Reducers/reducer';
import { Item } from '../../../Api/Item';

function ExtractAction(props: ExtractActionProps) {
    const {handleClick, selectedItems} = props;

    return (
        <MenuItem onClick={() => handleClick(selectedItems)}>
            <ListItemIcon>
                <UnarchiveIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Extract here
            </Typography>
        </MenuItem>        
    );
}

interface ExtractActionProps {
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
            dispatch(extractZipFile(selectedItems[0].name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtractAction);
