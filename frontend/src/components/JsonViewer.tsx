import React from 'react';
import ReactJson from '@uiw/react-json-view';
import { nordTheme } from '@uiw/react-json-view/nord';

interface JsonViewerProps {
    jsonData: object;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData }) => {
    return <ReactJson value={jsonData} style={nordTheme} displayDataTypes={false}/>;
}

export default JsonViewer;
