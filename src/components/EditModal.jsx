import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { extractFileIdFromUrl, getGoogleDriveImageUrl } from "./utils";

function EditModal({ show, onClose, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const printRef = useRef();

  useEffect(() => {
    if (show) {
      fetchApiData();
    }
  }, [show]);

  const fetchApiData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN_API}/running72/account/${id}`,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_X_API_KEY
          }
        }
      );
      //console.log(result.data);
      setData(result.data.data);  // Assuming data is nested under 'data'
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
   
    try {

      await Axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN_API}/running72/account/update`,
        data,  // Send the updated data
        {
          headers: {
            'x-api-key': process.env.REACT_APP_X_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      setIsEditing(false);  // Turn off editing mode after saving
    } catch (error) {
      console.error("Error saving data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    navigate("/invoice", { state: { invoiceData: data } });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();  // Save data when switching out of edit mode
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClose = () => {
    setIsEditing(false); // Reset isEditing when the modal closes
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>ข้อมูลผู้สมัคร</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex" ref={printRef}>
          <div className="w-50 pe-3">
            {data.slip ? (
              <div>
                <img
                  src={getGoogleDriveImageUrl(extractFileIdFromUrl(data.slip))}
                  alt="Receipt"
                  className="img-fluid"
                  style={{ maxWidth: "100%", border: "1px solid #dee2e6", borderRadius: "4px" }}
                />
                <br />
                <a href={data.slip} target="_blank" rel="noopener noreferrer">
                  ดูรูปใบเสร็จ
                </a>
              </div>
            ) : (
              <div>ไม่พบรูปใบเสร็จ</div>
            )}
          </div>
          <div className="w-50">
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                หมายเลขบัตรประชาชน
              </Form.Label>
              <Form.Control
                type="text"
                name="cardId"
                value={data.card_id || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="form-text"
                style={{ borderBottom: "1px solid #dee2e6", paddingBottom: "0.5rem", width: "80%", backgroundColor: isEditing ? "#fff" : "#e9ecef" }}
              />
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                ชื่อ-สกุล
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="form-text"
                style={{ borderBottom: "1px solid #dee2e6", paddingBottom: "0.5rem", width: "80%", backgroundColor: isEditing ? "#fff" : "#e9ecef" }}
              />
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                ที่อยู่
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={data.address || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="form-text"
                style={{ borderBottom: "1px solid #dee2e6", paddingBottom: "0.5rem", width: "80%", backgroundColor: isEditing ? "#fff" : "#e9ecef" }}
              />
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                เบอร์โทรศัพท์
              </Form.Label>
              <Form.Control
                type="text"
                name="tel"
                value={data.tel || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="form-text"
                style={{ paddingBottom: "0.5rem", width: "80%", borderBottom: "1px solid #dee2e6", backgroundColor: isEditing ? "#fff" : "#e9ecef" }}
              />
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                ขนาดเสื้อที่ต้องการ
              </Form.Label>
              <Form.Control
                type="text"
                name="shirtSize"
                value={data.shirt_size || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="form-text"
                style={{ width: "80%", borderBottom: "1px solid #dee2e6", backgroundColor: "#e9ecef"  }}
              />
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                บัตรเดิน-วิ่ง ระยะ
              </Form.Label>
              <Form.Control
                type="text"
                name="km"
                value={data.km || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="form-text"
                style={{ paddingBottom: "0.5rem", width: "80%", backgroundColor: isEditing ? "#fff" : "#e9ecef" }}
              />
            </div>
          </div>

          {/* Add the missing sections for status */}
          <div className="w-50">
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                สถานะรับเสื้อ :
              </Form.Label>
              <div
                className="form-text"
                style={{
                  width: "80%",
                  color: data.shirt_status === "Received" ? "green" : "red",
                  fontWeight: "bold",
                  fontSize: "18px",
                  padding: "0.375rem 0.75rem", // Mimics padding of input
                  backgroundColor: "#e9ecef",
                  borderRadius: "4px",
                  border: "1px solid #ced4da", // Mimics border of input
                }}
              >
                {data.shirt_status==="Received" ? "รับเสื้อแล้ว" : "ยังไม่ได้รับเสื้อ"}
              </div>
            </div>

            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                สถานะลงทะเบียน :
              </Form.Label>
              <div
                className="form-text"
                style={{
                  width: "80%",
                  color: data.status_register === "Completed" ? "green" : "red",
                  fontWeight: "bold",
                  fontSize: "18px",
                  padding: "0.375rem 0.75rem", // Mimics padding of input
                  backgroundColor: "#e9ecef",
                  borderRadius: "4px",
                  border: "1px solid #ced4da", // Mimics border of input
                }}
              >
                {data.status_register || "ยังไม่ลงทะเบียน"}
              </div>
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                BIB
              </Form.Label>
              <Form.Control
                type="text"
                name="bib_id"
                value={data.bib_id || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="form-text"
                style={{ paddingBottom: "0.5rem", width: "80%", borderBottom: "1px solid #dee2e6", backgroundColor: isEditing ? "#fff" : "#e9ecef" }}
              />
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                PDPA : 
              </Form.Label>
                <Form.Select 
                  onChange={handleInputChange}
                  name="pdpa"
                  disabled={!isEditing}      
                  style={{
                    width: "80%",
                    color: data.pdpa === "Accept" ? "green" : "red",
                    fontWeight: "bold",
                    fontSize: "18px",
                    padding: "0.375rem 0.75rem", // Mimics padding of input
                    borderRadius: "4px",
                    border: "1px solid #ced4da", // Mimics border of input
                  }} 
                  value={data.pdpa || ""}

                >
                  <option value="Accept">Accept</option>
                  <option value="Not Accept">Not Accept</option>
                </Form.Select>
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                Remark :
              </Form.Label>
              <div
                className="form-text"
                style={{
                  width: "80%",
                  minHeight: "120px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  padding: "0.375rem 0.75rem", // Mimics padding of input
                  backgroundColor: "#e9ecef",
                  borderRadius: "4px",
                  border: "1px solid #ced4da", // Mimics border of input
                }}
              >
                {data.payment_remarks || ""}
                {data.remark_award || ""}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant={isEditing ? "info" : "primary"} onClick={handleEditToggle} disabled={isLoading}>
          {isEditing ? "บันทึก" : "แก้ไข"}
        </Button>
        <Button variant="primary" onClick={handlePrint} disabled={isEditing}>
          ใบกำกับภาษี
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
