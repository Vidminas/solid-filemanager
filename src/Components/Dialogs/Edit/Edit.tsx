import React, { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from 'react-redux';
import { updateTextFile, MyDispatch, closeDialog } from '../../../Actions/Actions';
import { DialogStateProps, DialogDispatchProps, DialogButtonClickEvent } from '../dialogTypes';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';
import { Item } from '../../../Api/Item';

const FormDialog: React.FC<EditProps> = (props) => {
    const { blobUrl, handleClose, open, item } = props;
    const textField = useRef<HTMLTextAreaElement>(null);
    const [lastBlobUrl, setLastBlobUrl] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [contentType, setContentType] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (blobUrl !== lastBlobUrl) {
            setLastBlobUrl(blobUrl);
            setLoading(true);

            blobUrl && fetch(blobUrl).then(async r => {
                setContent(await r.text());
                setContentType(r.headers.get('content-type'));
                setLoading(false);
            });
        }
    }, [blobUrl, lastBlobUrl, setLastBlobUrl, setLoading, setContent, setContentType]);

    const handleSave = (event: DialogButtonClickEvent) => {
        event.preventDefault();
        if (textField.current && item) {
            props.handleSubmit(event, {
                itemName: item.name,
                content: textField.current.value,
                contentType: contentType ?? 'text/plain',
            });
        }
    };

    const itemName = item ? item.getDisplayName() : 'No item selected';
    const textAreaStyle = {
        width: '100%',
        minHeight: '300px'
    };
    const textArea = <textarea style={textAreaStyle} defaultValue={content || ''} ref={textField} />;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-edit" fullWidth={true} maxWidth={'sm'}>
            <form>
                <DialogTitle id="form-dialog-edit">Editing file: {itemName} </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {loading ? 'Loading...' : textArea}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" type="button">
                    Close
                </Button>
                <Button color="primary" onClick={handleSave} type="submit">
                    Update
                </Button>
                </DialogActions>
            </form>
            </Dialog>
        </div>
    );
}

interface StateProps extends DialogStateProps {
    item: Item;
    blobUrl: string;
}
interface DispatchProps extends DialogDispatchProps {
    handleSubmit(event: DialogButtonClickEvent, { itemName, content, contentType }: { itemName: string, content: string, contentType: string }): void;
}
interface EditProps extends StateProps, DispatchProps {}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        open: state.visibleDialogs.EDIT, // TODO: rename visibleDialogs (e.g. to dialogIsOpen)
        item: state.items.selected[0],
        blobUrl: state.blob || ''
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        handleClose: () => {
            dispatch(closeDialog(DIALOGS.EDIT));
        },
        handleSubmit: (event, { itemName, content, contentType }) => {
            dispatch(updateTextFile(itemName, content, contentType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
