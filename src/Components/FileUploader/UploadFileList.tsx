import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import { getHumanFileSize } from '../../Api/Item';

const UploadFileList: React.FC<UploadFileListProps> = (props) => {
    const { files } = props;
    const list = Array.from(files).map((f, i) =>
        <ListItem dense key={i}>
            <ListItemIcon>
                <FileIcon />
            </ListItemIcon>
            <ListItemText primary={`${f.name} (${getHumanFileSize(f.size)})`} />
        </ListItem>
    );

    return (
        <div>
            <List component="nav">
                {list}
            </List>
        </div>
    );
}

interface UploadFileListProps {
    files: FileList;
}

export default UploadFileList;
