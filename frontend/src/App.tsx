import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Button, Typography, Paper, Container, Box, IconButton, Snackbar, SnackbarContent } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import JsonViewer from './components/JsonViewer';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    background: #f4f4f4;
  }
`;

const StyledContainer = styled(Container)`
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  width: 100%;
`;

const JsonDisplay = styled(Paper)`
  max-height: 400px;
  overflow: auto;
  background-color: #fafafa;
  padding: 10px;
`;

const CopyButton = styled(IconButton)`
  position: absolute;
`

const StyledFooter = styled(Box)`
  width: 100%;
  padding: 20px 0px;
  background-color: #282c34;
  color: white;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const StyledLink = styled.a`
  color: #fafafa;
  text-decoration: none;

  &:hover, &:focus {
    text-decoration: underline; 
    color: #34a6db ; 
  }
`;

const StyledSnackbarContent = styled(SnackbarContent)`
  justify-content: center;  // Centers the content horizontally
`;

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<object | null>(null);
  const [fileName, setfileName] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
    setfileName(file ? file.name : "");
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8080/ppt", {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setJsonData(data);
        setfileName(file.name)
      } catch (error) {
        console.error("Error uploading file\n\n-Error Details-\n" + error);
        // setJsonData("Failed to upload file\n\n-Error Details-\n" + error);
      }
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(jsonData));
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  return (
    <>
      <GlobalStyle />
      <StyledContainer maxWidth="sm">
        <StyledPaper elevation={5}>
          <Typography variant="h4" style={{ marginBottom: "35px" }}>
            Welcome to jsonSlide!
          </Typography>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            style={{ marginBottom: "20px" }}
          >
            Upload .ppt(x)
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".ppt, .pptx"
            />
          </Button>
          <Box style={{ marginBottom: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file}>
              {file ? "Convert to json" : "Waiting on file"}
            </Button>
          </Box>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            JSON Output:
          </Typography>
          {jsonData && (
            <CopyButton onClick={handleCopy} aria-label='copy JSON to clipboard'>
              <Tooltip title="Copy to clipboard" placement='right'>
                <ContentCopyIcon />
              </Tooltip>
            </CopyButton>
          )}
          <JsonDisplay>
            {file && !jsonData && `${fileName} is ready for JSON conversion...\n\n`}
            {jsonData && <JsonViewer jsonData={jsonData} />}
          </JsonDisplay>
        </StyledPaper>
        <StyledFooter>
          - ©{new Date().getFullYear()} <StyledLink href='https://github.com/KBSwift/jsonSlide' target='_blank'>jsonSlide</StyledLink> -
          MVP by <StyledLink href='https://www.linkedin.com/in/kavinmoreno/' target='_blank'>Kavin Moreno</StyledLink> - BFF (Built For Fun) -
        </StyledFooter>
      </StyledContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ top: "10vh", transform: 'translateX(-42%)'}}
      >
        <StyledSnackbarContent message="JSON data copied!" />
      </Snackbar>
    </>
  );
}

export default App;
