import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const exportData = async () => {
  try {
    const exportUrl = `${process.env.REACT_APP_BACKEND_DOMAIN_API}/export-to-sheet/export-account_run72`;
    const exportPayload = {
      status: "success",
      message: "success",
    };
    console.log("API URL ส่งออกข้อมูล:", exportUrl);
    console.log("Payload:", exportPayload);

    const response = await axios.post(exportUrl, exportPayload, {
      headers: {
        "x-api-key": process.env.REACT_APP_X_API_KEY,
      },
    });

    if (
      response.data.status === "success" &&
      response.data.message === "success"
    ) {
      window.open("https://docs.google.com/spreadsheets/d/1xzRhw2idJqdS6cT8SRwYRFPNUdZaXq1nO3bwtg48L-I/edit?gid=0#gid=0", "_blank");
    } else {
      console.error("Error exporting data:", response.data);
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

const Export = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleExportClick = async () => {
    setLoading(true);
    try {
      await exportData();
      setAlertTitle("Success");
      setAlertMessage("Data exported successfully.");
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage("Failed to export data.");
    } finally {
      setLoading(false);
      setShowAlert(true);
    }
  };

  return (
    <Container style={containerStyle}>
      {showAlert && (
        <Alert
          variant={alertTitle === "Success" ? "success" : "danger"}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>{alertTitle}</Alert.Heading>
          <p>{alertMessage}</p>
        </Alert>
      )}
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status" style={spinnerStyle}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Waiting...</p>
        </div>
      )}
      <Button style={buttonStyle} onClick={handleExportClick}>
        Export File
      </Button>
    </Container>
  );
};

// Inline styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  borderColor: "#007bff",
  color: "#fff",
  fontSize: "1.25rem",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.5rem",
  border: "none",
  marginBottom: "1rem",
};

const spinnerStyle = {
  marginBottom: "1rem",
};

export default Export;
