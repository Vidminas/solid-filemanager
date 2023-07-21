import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import { openInNewTab, MyDispatch } from '../../../Actions/Actions';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import { Item } from '../../../Api/Item';
import { AppState } from '../../../Reducers/reducer';

const OpenInNewTabAction: React.FC<OpenInNewTabActionProps> = (props) => {
    const { handleClick, selectedItems } = props;
    return (
        <MenuItem onClick={() => handleClick(selectedItems)}>
            <ListItemIcon>
                <LinkIcon   />
            </ListItemIcon>
            <Typography variant="inherit">
                Open in new Tab
            </Typography>
        </MenuItem>        
    );
}

interface OpenInNewTabActionProps {
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
            dispatch(openInNewTab(selectedItems[0]));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenInNewTabAction);
