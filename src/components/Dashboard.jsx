import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsonData } from "../data/dataTableShirt";
import { jsonDataA } from "../data/dataTableAward";
import { FaSearch, FaTshirt, FaMedal } from "react-icons/fa";


const DashboardTable = () => {
  const { headers, sideHeaders } = jsonData;
  const { headersAward, sideHeadersAward } = jsonDataA;



  return (
    <div className="container mt-4" style={{ maxWidth: "1700px" }}>
      <h2 className="mb-3 d-flex justify-content-center">Dashboard</h2>
      
      {/* Table รับเสื้อ */}
      <h4 className="mb-3 d-flex" style={{ backgroundColor: "green", color: "white", padding: "0.5rem" }}>
      <FaTshirt />สรุปผลรับเสื้อ
      </h4>
      <Table striped bordered hover style={{ marginBottom: "2rem" }}>
        <thead
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
          }}
        >
          <tr>
            <th></th>
            {headers.map((header, index) => (
              <th key={index} dangerouslySetInnerHTML={{ __html: header }} />
            ))}
          </tr>
        </thead>
        <tbody>
          {sideHeaders.map((sideHeader, rowIndex) => (
            <tr key={rowIndex}>
              <td
                style={{
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{ __html: sideHeader }}
              />
              {headers.map((_, colIndex) => (
                <td key={colIndex}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Table รับเหรียญ */}
      <h4 className="mb-3 d-flex" style={{ backgroundColor: "#022682", color: "white", padding: "0.5rem" }}>
        <FaMedal />สรุปผลรับเหรียญ
      </h4>
      <Table striped bordered hover style={{ marginBottom: "2rem" }}>
        <thead
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
          }}
        >
          <tr>
            <th></th>
            {headersAward.map((headerAward, index) => (
              <th key={index} dangerouslySetInnerHTML={{ __html: headerAward }} />
            ))}
          </tr>
        </thead>
        <tbody>
          {sideHeadersAward.map((sideHeaderAward, rowIndex) => (
            <tr key={rowIndex}>
              <td
                style={{
                  backgroundColor: "#022682",
                  color: "white",
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{ __html: sideHeaderAward }}
              />
              {headersAward.map((_, colIndex) => (
                <td key={colIndex}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DashboardTable;