import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import UploadFileList from './UploadFileList';

const FileUploader: React.FC<FileUploadProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleReset = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent) => {
        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.value = '';
            props.handleReset(event);
        }
    }

    const { fileList, handleSelectedFiles } = props;
    const styles = {
        inputfile: {
            // TODO: Change this to display none as soon, as the label button works
            // display: 'none'
        }, inputreset: {
            display: (fileList && fileList.length) ? 'inline-flex' : 'none'
        }
    }

    return (
        <div>
            <label htmlFor="button-file">
                <input style={styles.inputfile} id="button-file" ref={inputRef} multiple type="file" onChange={handleSelectedFiles} />
                {/*<Button component="span" variant="contained" color="primary">
                    Select Files
                </Button>*/}
            </label>

            <Button style={styles.inputreset} type="reset" onClick={handleReset}>
                Clear
            </Button>

            { fileList && <UploadFileList files={fileList} /> }
        </div>
    );
}

interface FileUploadProps {
    fileList: FileList|null;
    handleReset(event: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent): void;
    handleSelectedFiles(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default FileUploader;
