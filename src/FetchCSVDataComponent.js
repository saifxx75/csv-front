import React, { useState, useEffect } from 'react';
import { Container, Button, Alert, Table, Form } from 'react-bootstrap';
import axios from 'axios';

const FetchCSVDataComponent = () => {
    const [csvData, setCsvData] = useState(null);
    const [error, setError] = useState(null);
    const [id, setId] = useState(''); // State to store the ID input value

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/csvData/${id}`); // Use the ID in the API URL
            setCsvData(response?.data?.data?.file);
            console.log("csvData", response?.data?.data?.file);

            setError(null);
        } catch (error) {
            setError('Error fetching CSV data.');
            setCsvData(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleIdChange = (e) => {
        setId(e.target.value); // Update the ID state when input value changes
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        fetchData(); // Fetch data when form is submitted
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Fetch CSV Data</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formId" className="mb-3">
                    <Form.Label>Enter ID</Form.Label>
                    <Form.Control type="text" value={id} onChange={handleIdChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {/* {csvData && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
              {Object.keys(csvData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )} */}
            {csvData}
        </Container>
    );
};

export default FetchCSVDataComponent;
