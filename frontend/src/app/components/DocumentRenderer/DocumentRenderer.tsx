import * as React from 'react';

type DocumentRendererProps = {
    fileData: string;
    fileName: string;
};

const DocumentRenderer: React.FC<DocumentRendererProps> = ({ fileData, fileName }) => {
    if (fileName !== '') {
        const extension = fileName.split('.').pop()?.toLowerCase();
        const mimeType = extension === 'png' ? 'image/png' : `image/${extension}`;
        return <img src={`data:${mimeType};base64,${fileData}`} alt="image" />;
    } else {
        return <p>Waiting for an image...</p>;
    }
}

export default DocumentRenderer;