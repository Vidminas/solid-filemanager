import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ArchiveIcon from '@mui/icons-material/Archive';
import { zipAndUpload, MyDispatch } from '../../../Actions/Actions';
import { Item } from '../../../Api/Item';
import { AppState } from '../../../Reducers/reducer';

const ZipAction: React.FC<ZipActionProps> = (props) => {
    const { handleClick, selectedItems } = props;

    return (
        <MenuItem onClick={() => handleClick(selectedItems)}>
            <ListItemIcon>
                <ArchiveIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Zip here
            </Typography>
        </MenuItem>        
    );
}

interface ZipActionProps {
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
            dispatch(zipAndUpload(selectedItems));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ZipAction);
