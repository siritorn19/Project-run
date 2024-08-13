import React, { useRef } from "react";
import { Button } from "react-bootstrap";

function InvoicePage() {
    const printRef = useRef();

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    return (
        <div style={{ position: "relative", minHeight: "100vh", padding: "20px" }}>
            {/* Print Button positioned at the top right */}
            <Button
                variant="primary"
                onClick={handlePrint}
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                }}
            >
                Print
            </Button>

            <div ref={printRef} style={{ paddingBottom: "150px" }}>
                <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
                    ต้นฉบับใบกำกับภาษี / ใบเสร็จรับเงิน
                </h1>
                <p><strong>บริษัท บิ๊กซี ซูเปอร์เซ็นเตอร์ จำกัด (มหาชน) (สำนักงานใหญ่)</strong></p>
                <p>เลขที่: MC10100124080006</p>
                <p>วันที่: 01/08/2024</p>
                <p>ที่อยู่: เลขที่ 88/9 ซอย สมานฉันท์-บาร์โบส แขวง พระโขนง เขต คลองเตย</p>
                <p>จังหวัด: กรุงเทพมหานคร 10110</p>
                <p>เลขประจำตัวผู้เสียภาษี: 0107536000633</p>
                
                <p><strong>ชื่อลูกค้า:</strong> บริษัท ฮอว์ลีย์ แอนด์ ฮาเซล เคมิคอล (ประเทศไทย) จำกัด (สำนักงานใหญ่)</p>
                <p>ที่อยู่: เลขที่ 982/22 อาคารเกตเวย์เอกมัย ชั้น 5 ห้อง 5101 ถนนสุขุมวิท แขวงพระโขนง เขตคลองเตย กทม 10110</p>
                <p>เลขประจำตัวผู้เสียภาษี: 0105562175419</p>

                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black", padding: "8px" }}>จำนวน</th>
                            <th style={{ border: "1px solid black", padding: "8px" }}>รายการ</th>
                            <th style={{ border: "1px solid black", padding: "8px" }}>ราคารวม (บาท)</th>
                            <th style={{ border: "1px solid black", padding: "8px" }}>VAT</th>
                            <th style={{ border: "1px solid black", padding: "8px" }}>จำนวนเงิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "8px" }}>1.00</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>บัตรเดิน-วิ่ง วันที่ 17 ส.ค. 2567 : VIP ทุกระยะ</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>1,000.00</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>Y</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>1,000</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <div style={{ marginTop: "20px" }}>
                        <p style={{ margin: "0" }}>ส่วนลดเงินสด: 0.00 บาท</p>
                        <p style={{ margin: "0" }}>มูลค่าสินค้าที่เสียภาษีมูลค่าเพิ่ม: 934.58 บาท</p>
                        <p style={{ margin: "0" }}>ภาษีมูลค่าเพิ่ม: 65.42 บาท</p>
                        <p style={{ marginTop: "10px" }}>
                            <strong>รวมเงินสุทธิ:</strong> 1,000.00 บาท
                        </p>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <p style={{ fontSize: "12px", margin: "0" }}>
                            <strong>หมายเหตุ:</strong> โปรดเก็บไว้เป็นหลักฐาน บิ๊กซี ขอสงวนสิทธิ์ในการรับเปลี่ยน/คืนสินค้า
                            หากไม่มีใบเสร็จรับเงินมาแสดง
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoicePage;
