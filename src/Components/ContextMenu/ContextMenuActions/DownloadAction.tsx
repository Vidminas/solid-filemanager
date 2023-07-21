import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import { downloadItems, MyDispatch } from '../../../Actions/Actions';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { FileItem, Item } from '../../../Api/Item';
import { AppState } from '../../../Reducers/reducer';

const DownloadAction: React.FC<DownloadActionProps> = (props) => {
    const { handleClick, selectedItems } = props;
    return (
        <MenuItem onClick={() => handleClick(selectedItems)}>
            <ListItemIcon>
                <CloudDownloadIcon />
            </ListItemIcon>
            <Typography variant="inherit">
                {(selectedItems.length === 1 && selectedItems[0] instanceof FileItem) ? 
                    'Download'
                    : 'Download Zip'
                }
            </Typography>
        </MenuItem>        
    );
}

interface DownloadActionProps {
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
            dispatch(downloadItems(selectedItems));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadAction);
