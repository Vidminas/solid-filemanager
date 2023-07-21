import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { connect } from 'react-redux';
import CreateFolderAction from '../ContextMenu/ContextMenuActions/CreateFolderAction';
import CreateFileAction from '../ContextMenu/ContextMenuActions/CreateFileAction';
import UploadFileAction from '../ContextMenu/ContextMenuActions/UploadFileAction';
import ChooseLocationAction from '../ContextMenu/ContextMenuActions/ChooseLocationAction';

const ThreeDotsMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <div style={{marginLeft:'1em'}}>
      <IconButton
        color="inherit"
        aria-label="More"
        aria-owns={Boolean(anchorEl) ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        size="large">
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <CreateFolderAction handleClose={() => setAnchorEl(null)} />
        <CreateFileAction handleClose={() => setAnchorEl(null)} />
        <UploadFileAction handleClose={() => setAnchorEl(null)} />
        <ChooseLocationAction handleClose={() => setAnchorEl(null)} />
      </Menu>
    </div>
  );
}


const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ThreeDotsMenu);
