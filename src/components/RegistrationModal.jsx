import axios from "axios";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const RegistrationModal = ({ show, onClose, name }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const url = "https://sheet.best/api/sheets/4564c89f-94a7-45dc-988e-842b17b2dc76";
      const payload = { statusRegister: "ลงทะเบียนแล้ว" };
      //console.log("url:", url);
      //console.log("Sending payload:", payload);

      const response = await axios.post(url, payload);
      
      //console.log("API response:", response);
      alert("ลงทะเบียนสำเร็จแล้ว");
      onClose();
    } catch (error) {
      console.error("Error registering:", error);
      alert("เกิดข้อผิดพลาดในการลงทะเบียน");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>ลงทะเบียนรับเสื้อ</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" style={{ paddingBottom: "50px" }}>
        <div style={{ fontSize: "90px", color: "#28a745" }}>
          <FaCheckCircle style={{ paddingBottom: "5px" }} />
        </div>
        <Button
          variant="primary"
          style={{ fontSize: "1.25rem", padding: "0.75rem 1.5rem" }}
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "กำลังลงทะเบียน..." : <><b> ยืนยันการลงทะเบียนรับเสื้อ</b></>}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationModal;
