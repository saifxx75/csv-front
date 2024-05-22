import React, { useState, useRef } from 'react';
import { Container, Form, Button, ProgressBar, Toast, Alert } from 'react-bootstrap';
import axios from 'axios';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [requestId, setRequestId] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null); // Create a reference for the file input

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setProgress(0); // Reset progress bar
    setSuccessMessage(''); // Clear success message
    setError(''); // Clear error message

    if (!selectedFile) {
      setError('No file selected.');
      setFile(null);
      return;
    }

    if (selectedFile.type !== 'text/csv') {
      setError('Only CSV files are allowed.');
      setFile(null);
    } else {
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleIdChange = (e) => {
    setRequestId(e.target.value);
  };

  const handleUpload = async () => {
    if (!requestId) {
      setError('Please enter an ID.');
      return;
    }

    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('requestId', requestId);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProgress(percentCompleted);
        },
      });

      setSuccessMessage(response.data.message);
      setFile(null); // Reset file state after successful upload
      setRequestId(''); // Reset ID input after successful upload
      setProgress(0); // Reset progress bar
      fileInputRef.current.value = ''; // Clear the file input field using the ref
    } catch (error) {
      setError('Error uploading file.');
      setProgress(0); // Reset progress bar on error
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Upload CSV File</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="formId" className="mb-3">
          <Form.Label>Request ID</Form.Label>
          <Form.Control type="text" value={requestId} onChange={handleIdChange} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose CSV File</Form.Label>
          <Form.Control type="file" accept=".csv" onChange={handleFileChange} ref={fileInputRef} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Form>
      {progress > 0 && <ProgressBar className="mt-3" animated now={progress} label={`${progress}%`} />}
      {successMessage && (
        <Toast
          onClose={() => setSuccessMessage('')}
          show={!!successMessage}
          delay={3000}
          autohide
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{successMessage}</Toast.Body>
        </Toast>
      )}
    </Container>
  );
};

export default FileUploadComponent;
