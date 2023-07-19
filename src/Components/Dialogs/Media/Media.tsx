import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from 'react-redux';
import { MyDispatch, closeDialog } from '../../../Actions/Actions';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { FileItem } from '../../../Api/Item';
import { DialogStateProps, DialogDispatchProps } from '../dialogTypes';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

class FormDialog extends Component<MediaProps> {
    render() {
        const { file, handleClose, open } = this.props;

        const fileName = file ? file.name : undefined;
        const url = file ? file.url : undefined;
        // TODO: const provider = file ? (file.isVideo() ? 'html5' : 'audio') : '';
        const type = file ? (file.isVideo() ? 'video' : 'audio') : undefined;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-display-media" fullWidth={true} maxWidth={'lg'}>
                <DialogTitle id="form-dialog-display-media">Display Media</DialogTitle>
                <DialogContent>
                    {
                        file ?
                            (
                                <div>
                                    <p>Playing {fileName}</p>
                                    <Plyr
                                        options={{
                                            iconUrl: "./vendor/plyr/plyr.svg"   
                                        }}
                                        source={{
                                            type: type!,
                                            sources: [{ src: url!, /*TODO: provider=provider*/ }]
                                        }}
                                    />
                                </div>
                            )
                            : <p>No media file opened</p>
                            
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" type="button">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

interface StateProps extends DialogStateProps {
    file?: FileItem;
}
interface MediaProps extends StateProps, DialogDispatchProps {}


const mapStateToProps = (state: AppState): StateProps => {
    const open = state.visibleDialogs.MEDIA;

    const file = state.items.selected[0];   

    if (file instanceof FileItem) {
            return {
                open,
                file,
            };
    }
    return { open };
};

const mapDispatchToProps = (dispatch: MyDispatch): DialogDispatchProps => {
    return {
        handleClose: () => {
            dispatch(closeDialog(DIALOGS.MEDIA));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
