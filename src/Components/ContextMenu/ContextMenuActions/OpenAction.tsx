import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import { loadAndDisplayFile, displaySelectedMediaFile, loadAndEditFile, enterFolderByItem, MyDispatch } from '../../../Actions/Actions';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { FileItem, FolderItem, Item } from '../../../Api/Item';
import { AppState } from '../../../Reducers/reducer';

const OpenAction: React.FC<OpenActionProps> = (props) => {
    const { handleClick, selectedItems } = props;
    return (
        <MenuItem onClick={() => handleClick(selectedItems)}>
            <ListItemIcon>
                <OpenInBrowserIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                Open
            </Typography>
        </MenuItem>        
    );
}

interface OpenActionProps {
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
            const item = selectedItems[0];

            if (item instanceof FolderItem)
                dispatch(enterFolderByItem(item));
            else if (item instanceof FileItem) {
                if (item.isEditable())
                    dispatch(loadAndEditFile(item.name));
                else if (item.isImage())
                    dispatch(loadAndDisplayFile(item.name));
                else if (item.isMedia())
                    dispatch(displaySelectedMediaFile());
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenAction);
