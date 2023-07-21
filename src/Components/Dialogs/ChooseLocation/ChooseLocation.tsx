import React, { useRef, useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileListSublist from '../../FileList/FileListSublist/FileListSublist'; 
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Item, FolderItem } from '../../../Api/Item';
import * as ApiHandler from '../../../Api/ApiHandler';

const usePrevious = <T extends any>(value: T) => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
}

// Borrowed from https://stackoverflow.com/a/61842546
const useStateCallback = <T extends any>(
    initialState: T
    ): [T, (state: T, cb?: (state: T) => void) => void] => {
    const [state, setState] = useState(initialState);
    const cbRef = useRef<((state: T) => void) | undefined>(undefined); // init mutable ref container for callbacks
  
    const setStateCallback = useCallback((state: T, cb?: (state: T) => void) => {
      cbRef.current = cb; // store current, passed callback in ref
      setState(state);
    }, []); // keep object reference stable, exactly like `useState`
  
    useEffect(() => {
      // cb.current is `undefined` on initial render,
      // so we only invoke callback on state *updates*
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = undefined; // reset callback after execution
      }
    }, [state]);
  
    return [state, setStateCallback];
  }

const FormDialog: React.FC<OwnProps> = (props) => {
    const { initialHost, initialPath, open, handleClose, handleSubmit, actionName } = props;
    const [host, setHost] = useState(initialHost);
    const [path, setPath] = useStateCallback(initialPath);
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [wasPreviouslyOpen, setWasPreviouslyOpen] = useStateCallback(false);

    const previousHost = usePrevious(initialHost);
    const previousPath = usePrevious(initialPath);

    const updateItems = useCallback(async (itemsPath: string[]) => {
        setLoading(true);
        const newItems = (await ApiHandler.getItemList(itemsPath.join('/')))
            .filter(item => item instanceof FolderItem);
        setLoading(false);
        setItems(newItems);
    }, [setLoading, setItems]);

    useEffect(() => {
        if (previousHost !== initialHost || previousPath?.join('') !== initialPath.join('')) {
            setHost(initialHost);
            setPath(initialPath);
        }
        if (open && !wasPreviouslyOpen) {
            setWasPreviouslyOpen(true, () => updateItems(path));
        }
        if (!open && wasPreviouslyOpen) {
            setWasPreviouslyOpen(false);
        }
    }, [previousHost, initialHost, previousPath, initialPath, setHost, setPath, open, wasPreviouslyOpen, setWasPreviouslyOpen, updateItems, path]);


    const handleGoBack = () => {
        setPath(path.slice(0, -1), updateItems);
    };

    const handleOpenFolder = (folder: FolderItem) => {
        setPath([...folder.path, folder.name], updateItems);
    };

    const url = `${host}/${path.join('/')}`;
    const canGoBack = path.length > 0;
    
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-move" fullWidth={true} maxWidth={'sm'}>
            <form>
                <DialogTitle id="form-dialog-move">
                    {actionName} items to <small style={{color: 'grey'}}>{ url }</small>
                </DialogTitle>
                <DialogContent>
                    <FileListSublist items={items} isLoading={isLoading} handleOpenFolder={handleOpenFolder}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleGoBack} color="primary" type="button" disabled={!canGoBack}>
                        <KeyboardArrowLeftIcon /> Go back directory
                    </Button>

                    <Button onClick={handleClose} color="primary" type="button">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={(e) => { e.preventDefault(); handleSubmit({ host, path }) }} type="submit">
                        {actionName}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

interface OwnProps {
    open: boolean;
    actionName: string;
    initialHost: string;
    initialPath: string[];
    handleSubmit({ host, path }: { host: string, path: string[] }): void;
    handleClose(): void;
}

export default FormDialog;
