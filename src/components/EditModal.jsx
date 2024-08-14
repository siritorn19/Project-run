import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { extractFileIdFromUrl, getGoogleDriveImageUrl } from "./utils"; // Assume you have utils for these

function EditModal({ show, onClose, formData, id, onInputChange, onSaveChanges }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (formData.slip) {
      setImageUrl(getGoogleDriveImageUrl(extractFileIdFromUrl(formData.slip)));
    }
  }, [formData.slip]);

  useEffect(() => {
    if (id) {
      // Example: Use the ID to fetch or update additional data if needed
      console.log("EditModal received ID:", id);
      // Example: Fetch additional data or set state based on ID
    }
  }, [id]);

  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="modal-xl" // ใช้คลาส modal-xl
    >
      <Modal.Header closeButton>
        <Modal.Title>ข้อมูลผู้สมัคร</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <div className="w-50 pe-3">
            {/* ช่องรูปภาพ */}
            {formData.slip ? (
              <div>
                <img
                  src={imageUrl}
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

          {/* ช่องข้อมูลที่เหลือ */}
          <div className="w-50">
            {/* Add fields as needed */}
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                หมายเลขบัตรประชาชน
              </Form.Label>
              <div
                className="form-text"
                style={{
                  borderBottom: "1px solid #dee2e6",
                  paddingBottom: "0.5rem",
                  width: "80%",
                }}
              >
                {formData.cardId}
              </div>
            </div>

            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                ชื่อ-สกุล
              </Form.Label>
              <div
                className="form-text"
                style={{
                  borderBottom: "1px solid #dee2e6",
                  paddingBottom: "0.5rem",
                  width: "80%",
                }}
              >
                {formData.name}
              </div>
            </div>

            {/* Add other fields here */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
