import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { jsonData } from "../data/dataTableShirt";
import { jsonDataA } from "../data/dataTableAward";
import { FaTshirt, FaMedal } from "react-icons/fa";

const initialData = {
    Received: {},
    finisher_award: {}
  };

const DashboardTable = () => {
  const { headers, sideHeaders,dataRun,sideData } = jsonData;
  const { headersAward, sideHeadersAward } = jsonDataA;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {    
    const fetchData = async () => {
      try {
        const result = await axios.get(
            `${process.env.REACT_APP_BACKEND_DOMAIN_API}/report/account/report`,
            {
                headers: {
                  "x-api-key": process.env.REACT_APP_X_API_KEY,
                },
              }
                );
        if (result.data.status === 'success') {
          setData(result.data.data);
        } else {
          setError("Data fetch unsuccessful.");
        }
      } catch (error) {
        setError("Error fetching data.");
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="container mt-4" style={{ maxWidth: "1700px" }}>
      <h2 className="mb-3 d-flex justify-content-center">Data Fetching</h2>

      {loading && (
        <div className="alert alert-info" role="alert">
          Loading data, please wait...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {data && !loading && !error && (
        <div>
          <h4>Data:</h4>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    

      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th> 
      <th scope="col">S <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">S <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">M <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">M <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">L <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">L <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">2XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">2XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">3XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">3XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">4XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">4XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">5XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">5XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">6XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">6XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">พนักงาน</th>
          </tr> 
    <tr>
      <th scope="row">10 KM</th>
      <th scope="col">{data.all.nomal_10_S_employee}</th>
      <th scope="col">S <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">{data.all.nomal_10_M_employee}</th>
      <th scope="col">M <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">{data.all.nomal_10_L_employee}</th>
      <th scope="col">L <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">{data.all.nomal_10_XL_employee}</th>
      <th scope="col">XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">2XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">2XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">3XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">3XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">4XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">4XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">5XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">5XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>
      <th scope="col">6XL <br/>ลงทะเบียนทั้งหมด</th>
      <th scope="col">6XL <br/>รับเหรียญแล้ว</th>
      <th scope="col">Diff</th>

    </tr>
    <tr>
      <th scope="row">5 KM</th>
      <td>Larry</td>
    </tr>
    <tr>
      <th scope="row">2.5 KM</th>
      <td>Larry</td>
    </tr>
    <tr>
      <th scope="row">พนักงาน VIP</th>
      <td>Mark</td>
    </tr>
    <tr>
      <th scope="row">พนักงาน VIP</th>
      <td>Mark</td>
    </tr>
    <tr>
      <th scope="row">10 KM</th>
      <td>Jacob</td>
    </tr>
    <tr>
      <th scope="row">5 KM</th>
      <td>Larry</td>
    </tr>
    <tr>
      <th scope="row">2.5 KM</th>
      <td>Larry</td>
    </tr>
  </tbody>
</table>





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
              {dataRun.map((data, colIndex) => (
                <td key={colIndex}>
                {sideData[rowIndex]}{data}
                </td>
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