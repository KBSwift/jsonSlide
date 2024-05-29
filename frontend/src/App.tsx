import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Button, Typography, Paper, Container, Box } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

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

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
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
        setJsonData(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Error uploading file:", error);
        setJsonData("Failed to upload file");
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledContainer maxWidth="sm">
        <StyledPaper elevation={5}>
          <Typography variant="h4" style={{ marginBottom: "50px" }}>
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
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Convert to JSON
            </Button>
          </Box>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            JSON Output:
          </Typography>
          <JsonDisplay>
            <pre>{jsonData}</pre>
          </JsonDisplay>
        </StyledPaper>
        <StyledFooter>
          © {new Date().getFullYear()} <StyledLink href='https://github.com/KBSwift/jsonSlide' target='_blank'>jsonSlide</StyledLink>.
          MVP by <StyledLink href='https://www.linkedin.com/in/kavinmoreno/' target='_blank'>Kavin Moreno</StyledLink>. BFF (Built For Fun).
        </StyledFooter>
      </StyledContainer>
    </>
  );
}

export default App;
