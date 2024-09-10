import * as React from 'react';

type DocumentRendererProps = {
    fileData: string;
    fileName: string;
};

const DocumentRenderer: React.FC<DocumentRendererProps> = ({ fileData, fileName }) => {
    if (fileName !== '') {
        return <img src={`data:${fileName};base64,${fileData}`} alt="image" />;
    } else {
        return <p>Waiting for an image...</p>;
    }
}

export default DocumentRenderer;