import { Modal, Button, Form } from "react-bootstrap";
import { extractFileIdFromUrl, getGoogleDriveImageUrl } from "./utils"; // Assume you have utils for these

function EditModal({ show, onClose, formData, onInputChange, onSaveChanges }) {
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
            {/* <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                เวลาที่ลงทะเบียน
              </Form.Label>
              <div
                className="form-text"
                style={{
                  borderBottom: "1px solid #dee2e6",
                  paddingBottom: "0.5rem",
                  width: "80%",
                }}
              >
                {formData.timestamp}
              </div>
            </div> */}
            {/* ช่องรูปภาพ */}
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

          {/* ช่องข้อมูลที่เหลือ */}
          <div className="w-50">
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

            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                ที่อยู่
              </Form.Label>
              <div
                className="form-text"
                style={{
                  borderBottom: "1px solid #dee2e6",
                  paddingBottom: "0.5rem",
                  width: "80%",
                }}
              >
                {formData.address}
              </div>
            </div>

            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                เบอร์โทรศัพท์
              </Form.Label>
              <div
                className="form-text"
                style={{
                  paddingBottom: "0.5rem",
                  width: "80%",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {formData.tel}
              </div>
            </div>
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                ขนาดเสื้อที่ต้องการ
              </Form.Label>
              <div
                className="form-text"
                style={{
                  width: "80%",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                <b>{formData.shirtSize}</b>
              </div>
            </div>

            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                บัตรเดิน-วิ่ง ระยะ
              </Form.Label>
              <div
                className="form-text"
                style={{
                  paddingBottom: "0.5rem",
                  width: "80%",
                }}
              >
                {formData.km}
              </div>
            </div>
          </div>
          {/* ช่องขนาดเสื้อ */}
          <div className="w-50">
            <div className="mb-3">
              <Form.Label as="h5" className="font-weight-bold">
                สถานะรับเสื้อ :
              </Form.Label>
            <div
              className="form-text"
              style={{
                width: "80%",
                color:
                  formData.shirtStatus === "รับเสื้อแล้ว" ? "green" : "red",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <b>
                {formData.shirtStatus
                  ? formData.shirtStatus
                  : "ยังไม่ได้รับเสื้อ"}
              </b>
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
                  color:
                    formData.statusRegister === "ลงทะเบียนแล้ว"
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                <b>
                  {formData.statusRegister
                    ? formData.statusRegister
                    : "ยังไม่ลงทะเบียน"}
                </b>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
