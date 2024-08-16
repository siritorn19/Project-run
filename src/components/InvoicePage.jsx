import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function InvoicePage() {
  const location = useLocation();
  const { invoiceData } = location.state || {}; // Access the passed data
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Ensure payment_amount is a valid number, even if it contains commas
  const paymentAmount =
    parseFloat(invoiceData?.payment_amount.replace(/,/g, "")) || 0.0;
  const vatAmount = ((paymentAmount * 100) / 107).toFixed(2);
  const vatValue = (paymentAmount - vatAmount).toFixed(2);

  return (
    <div style={{ position: "relative", minHeight: "100vh", padding: "20px" }}>
      {/* Print Button positioned at the bottom right */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <Button variant="primary" onClick={handlePrint}>
          Print
        </Button>
      </div>

      <div
        ref={printRef}
        style={{
          width: "210mm",
          padding: "0 20px",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <style>
          {`
                    @media print {
                        @page {
                            size: A4; /* Set the page size to A4 */
                            margin: 20mm; /* Adjust margins as needed */
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            box-shadow: none;
                        }
                        header, footer {
                            display: none;
                        }
                        .invoice-container {
                            width: 100%;
                            height: 100%;
                            overflow: visible;
                            page-break-inside: avoid;
                        }
                        button {
                            display: none;
                        }
                    }
                    `}
        </style>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ width: "60%" }}>
            <p>
              <strong>
                บริษัท บิ๊กซี ซูเปอร์เซ็นเตอร์ จำกัด (มหาชน) (สำนักงานใหญ่)
              </strong>
            </p>
            <p>
              <strong>
                เลขที่ 88/9 ซอย สมานฉันท์-บาร์โบส แขวง พระโขนง เขต คลองเตย
              </strong>
            </p>
            <p>
              <strong>จังหวัดกรุงเทพมหานคร 10110</strong>
            </p>
            <p>
              <strong>เลขประจำตัวผู้เสียภาษี :0107536000633</strong>
            </p>
          </div>
          <div style={{ width: "40%", textAlign: "right" }}>
            <p>
              <strong>เลขที่:</strong>{" "}
              {invoiceData?.ref_1}
            </p>
            <p>
              <strong>วันที่: </strong>
              {formatDate(invoiceData?.payment_date) || "01/08/2024"}
            </p>
            <p>
              <strong>แผ่นที่ 1/1</strong>
            </p>
            <div
              style={{
                border: "1px solid black",
                padding: "5px",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              <strong>ต้นฉบับใบกำกับภาษี / ใบเสร็จรับเงิน</strong>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>ชื่อลูกค้า:</strong>{" "}
            {invoiceData?.name ||
              "บริษัท ฮอว์ลีย์ แอนด์ ฮาเซล เคมิคอล (ประเทศไทย) จำกัด (สำนักงานใหญ่)"}
          </p>
          <p>
            <strong>ที่อยู่:</strong>{" "}
            {invoiceData?.address ||
              "เลขที่ 982/22 อาคารเกตเวย์เอกมัย ชั้น 5 ห้อง 5101 ถนนสุขุมวิท แขวงพระโขนง เขตคลองเตย กทม 10110"}
          </p>
          <p>
            <strong>เลขประจำตัวผู้เสียภาษี:</strong>{" "}
            {invoiceData?.card_id}
          </p>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                จำนวน
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                รายการ
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                ราคารวม (บาท)
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                VAT
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                จำนวนเงิน
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                1.00
              </td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {"บัตรวิ่งวันที่ 17 ส.ค. 2567"}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "right",
                }}
              >
                {paymentAmount.toFixed(2)}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Y
              </td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "right",
                }}
              >
                {paymentAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <p>รับชำระโดย QR TTB</p>
        </div>

        <div
          style={{
            width: "210mm",
            position: "absolute",
            bottom: "20px",
            left: "20px",
            right: "20px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <p>รวมเงิน: {paymentAmount.toFixed(2)} บาท</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <p>N: สินค้าที่ได้รับการยกเว้นภาษีมูลค่าเพิ่ม</p>
              <p>มูลค่าสินค้าที่ได้รับการยกเว้นภาษีมูลค่าเพิ่ม: 0.00 บาท</p>
              <p>มูลค่าสินค้าที่เสียภาษีมูลค่าเพิ่ม: {vatAmount} บาท</p>
              <p>ภาษีมูลค่าเพิ่ม: {vatValue} บาท</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p>ส่วนลดเงินสด: 0.00 บาท</p>
              <p>
                <strong>รวมเงินสุทธิ:</strong> {paymentAmount.toFixed(2)} บาท
              </p>
              <p>
                <strong>ผู้รับเงิน:</strong>{" "}
                <img
                  src="/signature.png"
                  alt="Signature"
                  style={{ width: "100px" }}
                />
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: "12px" }}>
            <p>
              <strong>หมายเหตุ:</strong> โปรดเก็บไว้เป็นหลักฐาน บิ๊กซี
              ขอสงวนสิทธิ์ในการรับเปลี่ยน/คืนสินค้า หากไม่มีใบเสร็จรับเงินมาแสดง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
