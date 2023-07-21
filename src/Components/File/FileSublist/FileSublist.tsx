import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import blue from '@mui/material/colors/blue';
import '../File.css';
import { FileItem, Item } from '../../../Api/Item';

// TODO: Check main differences between normal File.tsx component
const FileSublist: React.FC<OwnProps> = (props) => {
    const { item, isSelected, handleClick, handleDoubleClick } = props;
    const avatarStyle = {
        backgroundColor: isSelected ? blue['A200'] : undefined
    };
    return (
        <div className="File" onClick={handleClick} data-selected={isSelected} onDoubleClick={handleDoubleClick}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar style={avatarStyle}>
                        { (item instanceof FileItem) ? <FileIcon /> : <FolderIcon />}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary="" />
            </ListItem>
        </div>
    );
}

interface OwnProps {
    item: Item;
    isSelected: boolean;
    handleClick(): void;
    handleDoubleClick(): void;
}

export default FileSublist;

