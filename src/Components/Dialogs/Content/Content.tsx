import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from 'react-redux';
import { closeDialog, MyDispatch } from '../../../Actions/Actions';
import { DialogStateProps, DialogDispatchProps } from '../dialogTypes';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

const FormDialog: React.FC<ContentProps> = (props) => {
    const { handleClose, open, blobUrl } = props;
    const [lastBlobUrl, setLastBlobUrl] = useState<string | undefined | null>(null);

    useEffect(() => {
        if (blobUrl !== lastBlobUrl) {
            setLastBlobUrl(blobUrl);
        }
    }, [blobUrl, lastBlobUrl, setLastBlobUrl]);

    return (
        <div style={{marginLeft:'1em'}}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-content" fullWidth={true} maxWidth={'sm'}>
            <DialogTitle id="form-dialog-content">Viewing file </DialogTitle>
            <DialogContent>
                <img src={blobUrl} alt="" style={{maxWidth: '100%'}}/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" type="button">
                Close
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

interface StateProps extends DialogStateProps {
    blobUrl: string | undefined;
}
interface DispatchProps extends DialogDispatchProps {}
interface ContentProps extends StateProps, DispatchProps {}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        open: state.visibleDialogs.CONTENT,
        blobUrl: state.blob || undefined
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DialogDispatchProps => {
    return {
        handleClose: () => {
            dispatch(closeDialog(DIALOGS.CONTENT));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
