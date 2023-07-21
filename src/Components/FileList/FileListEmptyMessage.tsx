import React from 'react';
import './FileListEmptyMessage.css';

const FileListEmptyMessage: React.FC = () => {
    return (
        <div className="FileListEmptyMessage">
            No files in this folder
        </div>
    );
};

export default FileListEmptyMessage;