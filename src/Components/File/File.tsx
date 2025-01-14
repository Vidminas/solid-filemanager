import React from 'react';
import { connect } from 'react-redux';
import {
    setSelectedItemsFromLastTo, loadAndEditFile, loadAndDisplayFile, displaySelectedMediaFile,
    rightClickOnFile, enterFolderByItem, MyDispatch, openContextMenu, toggleSelectedItem, selectItems
} from '../../Actions/Actions';
import './File.css';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import blue from '@mui/material/colors/blue';
import { FileItem, Item } from '../../Api/Item';
import { AppState } from '../../Reducers/reducer';

const File: React.FC<FileProps> = (props) => {
    const { isSelected, item, handleClick, handleDoubleClick, handleContextMenu } = props;
    const avatarStyle = {
        backgroundColor: isSelected ? blue['A200'] : undefined
    };
    const realSize = (item instanceof FileItem) ? item.getDisplaySize() : null;
    return (
        <div className="File" onClick={handleClick} onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu} data-selected={isSelected}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar style={avatarStyle}>
                        { (item instanceof FileItem) ? <FileIcon /> : <FolderIcon />}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText className="filename" primary={item.getDisplayName()} secondary={realSize} />
            </ListItem>
        </div>
    );
}


interface FileOwnProps {
    item: Item;
}
interface StateProps {
    isSelected: boolean;
}
interface DispatchProps {
    handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    handleDoubleClick(): void;
    handleContextMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
interface FileProps extends FileOwnProps, StateProps, DispatchProps {}


const mapStateToProps = (state: AppState, ownProps: FileOwnProps): StateProps => {
    return {
        isSelected: state.items.selected.includes(ownProps.item)
    };
};


const mapDispatchToProps = (dispatch: MyDispatch, ownProps: FileOwnProps): DispatchProps => {
    return {
        handleDoubleClick: () => {
            const item = ownProps.item;

            if (item instanceof FileItem) {
                if (item.isEditable())
                    dispatch(loadAndEditFile(item.name));
                else if (item.isImage())
                    dispatch(loadAndDisplayFile(item.name));
                else if (item.isMedia())
                    dispatch(displaySelectedMediaFile());
            }
            else
                dispatch(enterFolderByItem(item));
        },

        handleContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent) => {
            event.preventDefault();
            event.stopPropagation();

            let x = 0;
            let y = 0;

            if (event.nativeEvent instanceof MouseEvent) {
                x = event.nativeEvent.clientX;
                y = event.nativeEvent.clientY;
            }
            else if (event.nativeEvent instanceof TouchEvent) {
                x = event.nativeEvent.touches[0].pageX;
                y = event.nativeEvent.touches[0].pageY;
            }
            else {
                console.warn("Unknown click event", event);
            }

            if (event.shiftKey) {
                dispatch(setSelectedItemsFromLastTo(ownProps.item));
            } else {
                dispatch(rightClickOnFile(ownProps.item));
            }
            
            dispatch(openContextMenu({ x, y }));
        },

        handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent) => {
            event.stopPropagation();

            if (event.ctrlKey) {
                dispatch(toggleSelectedItem(ownProps.item));
            } else if (event.shiftKey) {
                dispatch(setSelectedItemsFromLastTo(ownProps.item));
            } else {
                dispatch(selectItems([ownProps.item]));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(File);
