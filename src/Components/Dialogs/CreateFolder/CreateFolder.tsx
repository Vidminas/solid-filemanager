import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from 'react-redux';
import { createNewFolder, closeDialog, MyDispatch } from '../../../Actions/Actions';
import { DialogStateProps, DialogDispatchProps, DialogButtonClickEvent } from '../dialogTypes';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

const FormDialog: React.FC<CreateFolderProps> = (props) => {
    const { handleClose, open } = props;
    const textField = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: DialogButtonClickEvent) => {
        if (textField.current) {
            const folderName = textField.current.value;
            props.handleSubmit(event, { folderName });
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-create-folder" fullWidth={true} maxWidth={'sm'}>
            <form>
                <DialogTitle id="form-dialog-create-folder">Create folder</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth margin="dense" label="Folder name" type="text" inputRef={textField} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" type="button">
                        Cancel
                </Button>
                    <Button color="primary" type="submit" onClick={handleSubmit}>
                        Save
                </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

interface DispatchProps extends DialogDispatchProps {
    handleSubmit(event: DialogButtonClickEvent, { folderName }: { folderName: string }): void;
}
interface CreateFolderProps extends DialogStateProps, DispatchProps { }

const mapStateToProps = (state: AppState): DialogStateProps => {
    return {
        open: state.visibleDialogs.CREATE_FOLDER
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        handleClose: () => {
            dispatch(closeDialog(DIALOGS.CREATE_FOLDER));
        },
        handleSubmit: (event, { folderName }) => {
            event.preventDefault();
            dispatch(createNewFolder(folderName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
