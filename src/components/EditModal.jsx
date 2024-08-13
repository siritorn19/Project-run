import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { extractFileIdFromUrl, getGoogleDriveImageUrl } from "./utils";

function EditModal({ show, onClose, formData, onInputChange, onSaveChanges }) {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate(); // Updated useHistory to useNavigate
    const printRef = useRef();

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload the page to reset the original content
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        onInputChange(name, value);
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            dialogClassName="modal-xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>ข้อมูลผู้สมัคร</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex" ref={printRef}>
                    <div className="w-50 pe-3">
                        {formData.slip ? (
                            <div>
                                <img
                                    src={getGoogleDriveImageUrl(
                                        extractFileIdFromUrl(formData.slip)
                                    )}
                                    alt="Receipt"
                                    className="img-fluid"
                                    style={{
                                        maxWidth: "100%",
                                        border: "1px solid #dee2e6",
                                        borderRadius: "4px",
                                    }}
                                />
                                <br />
                                <a
                                    href={formData.slip}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
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
                                value={formData.cardId}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className="form-text"
                                style={{
                                    borderBottom: "1px solid #dee2e6",
                                    paddingBottom: "0.5rem",
                                    width: "80%",
                                    backgroundColor: isEditing ? "#fff" : "#e9ecef",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label as="h5" className="font-weight-bold">
                                ชื่อ-สกุล
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className="form-text"
                                style={{
                                    borderBottom: "1px solid #dee2e6",
                                    paddingBottom: "0.5rem",
                                    width: "80%",
                                    backgroundColor: isEditing ? "#fff" : "#e9ecef",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label as="h5" className="font-weight-bold">
                                ที่อยู่
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className="form-text"
                                style={{
                                    borderBottom: "1px solid #dee2e6",
                                    paddingBottom: "0.5rem",
                                    width: "80%",
                                    backgroundColor: isEditing ? "#fff" : "#e9ecef",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label as="h5" className="font-weight-bold">
                                เบอร์โทรศัพท์
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="tel"
                                value={formData.tel}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className="form-text"
                                style={{
                                    paddingBottom: "0.5rem",
                                    width: "80%",
                                    borderBottom: "1px solid #dee2e6",
                                    backgroundColor: isEditing ? "#fff" : "#e9ecef",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label as="h5" className="font-weight-bold">
                                ขนาดเสื้อที่ต้องการ
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="shirtSize"
                                value={formData.shirtSize}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className="form-text"
                                style={{
                                    width: "80%",
                                    borderBottom: "1px solid #dee2e6",
                                    backgroundColor: isEditing ? "#fff" : "#e9ecef",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label as="h5" className="font-weight-bold">
                                บัตรเดิน-วิ่ง ระยะ
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="km"
                                value={formData.km}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className="form-text"
                                style={{
                                    paddingBottom: "0.5rem",
                                    width: "80%",
                                    backgroundColor: isEditing ? "#fff" : "#e9ecef",
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-50">
                        <div className="mb-3">
                            <Form.Label as="h5" className="font-weight-bold">
                                สถานะรับเสื้อ :
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="shirtStatus"
                                value={formData.shirtStatus}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className="form-text"
                                style={{
                                    width: "80%",
                                    color:
                                        formData.shirtStatus === "รับเสื้อแล้ว"
                                            ? "green"
                                            : "red",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    backgroundColor: isEditing ? "#fff" : "#e9ecef",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label as="h5" className="font-weight-bold">
                                สถานะลงทะเบียน :
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="statusRegister"
                                value={formData.statusRegister}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className="form-text"
                                style={{
                                    width: "80%",
                                    color:
                                        formData.statusRegister ===
                                        "ลงทะเบียนแล้ว"
                                            ? "green"
                                            : "red",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    backgroundColor: isEditing ? "#fff" : "#e9ecef",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="info" onClick={handleEditToggle}>
                    {isEditing ? "Save" : "Edit"}
                </Button>
                <Button variant="primary" onClick={handlePrint} disabled={isEditing}>
                    Print
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditModal;
