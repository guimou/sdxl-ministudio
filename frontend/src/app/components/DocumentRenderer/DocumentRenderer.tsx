import { Spinner } from '@patternfly/react-core';
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
        return <div>
            <p>Please wait, your image is being generated. It should take 30 to 60 seconds...</p>
            <p>&nbsp;</p>
            <p style={{ textAlign: 'center' }}><Spinner size="xl" /></p>
            </div>;
    }
}

export default DocumentRenderer;