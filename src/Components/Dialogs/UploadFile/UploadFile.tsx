import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { connect } from 'react-redux';
import { resetFileUploader, uploadFiles, setFileUploadList, MyDispatch, resetFileUploadList } from '../../../Actions/Actions';
import FileUploader from '../../FileUploader/FileUploader';
import { DialogStateProps, DialogDispatchProps } from '../dialogTypes';
import { AppState } from '../../../Reducers/reducer';

const FormDialog: React.FC<UploadFileProps> = (props) => {
    const { handleClose, handleReset, handleSubmit, open, canUpload, progress, fileList, handleSelectedFiles } = props;

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-upload" fullWidth={true} maxWidth={'sm'}>
            <form>
                <DialogTitle id="form-dialog-upload">
                    Upload files
                </DialogTitle>
                <DialogContent>
                    <FileUploader fileList={fileList} handleSelectedFiles={handleSelectedFiles} handleReset={handleReset}/>
                    {canUpload ? <LinearProgress variant="determinate" value={progress} /> : null }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" type="button">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit} disabled={!canUpload} type="submit">
                        Upload
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

interface StateProps extends DialogStateProps {
    canUpload: boolean;
    fileList: FileList|null;
    progress: number;
}
interface DispatchProps extends DialogDispatchProps {
    handleSelectedFiles(event: React.ChangeEvent<HTMLInputElement>): void;
    handleReset(): void;
}
interface UploadFileProps extends StateProps, DispatchProps {}


const mapStateToProps = (state: AppState): StateProps => {
    return {
        open: state.visibleDialogs.UPLOAD_FILE,
        canUpload: state.upload.fileList ? state.upload.fileList.length > 0 : false,
        fileList: state.upload.fileList,
        progress: state.upload.progress,
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        handleClose: (event) => {
            dispatch(resetFileUploader());
        },
        handleSubmit: (event) => {
            event.preventDefault();
            dispatch(uploadFiles());
        },
        handleSelectedFiles: (event) => {
            const files = event.target.files;
            dispatch(setFileUploadList(files));
        },
        handleReset: () => {
            dispatch(resetFileUploadList());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
