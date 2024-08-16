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
  const { headers, sideHeaders, dataRun, sideData } = jsonData;
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
      <h2 className="mb-3 d-flex justify-content-center">Dashboard</h2>

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
                <th scope="col" >#</th>
                <th scope="col" width="3%">S <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">S <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">M <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">M <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">L <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">L <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">XL <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">XL <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">2XL <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">2XL <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">3XL <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">3XL <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">4XL <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">4XL <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">6XL <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">6XL <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">Total <br />ลงทะเบียนสมัคร</th>
                <th scope="col" width="3%">Total <br />รับเสื้อแล้ว</th>
                <th scope="col" width="3%">Total Diff</th>
              </tr>
            </thead>
            <tbody
              style={{
                textAlign: "right",
              }}>
              <tr style={{
                textAlign: "left",
              }}>
                <th scope="row" colspan="28">พนักงาน</th>
              </tr>
              <tr>
                <th scope="row">10 KM</th>
                <th scope="col">{data.all ? data.all.nomal_10_S_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_S_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_S_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_M_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_M_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_M_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_L_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_L_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_L_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_2XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_2XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_3XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_3XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_4XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_4XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_6XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_6XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_nomal_10_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_10_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_nomal_10_employee : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10_employee : '0')
                }
                </th>

              </tr>
              <tr>
                <th scope="row">5 KM</th>
                <th scope="col">{data.all ? data.all.nomal_5_S_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_S_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_S_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_M_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_M_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_M_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_L_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_L_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_L_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_2XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_2XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_3XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_3XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_4XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_4XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_6XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_6XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_nomal_5_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_5_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_nomal_5_employee : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5_employee : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row">2.5 KM</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_S_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_S_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_M_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_M_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_L_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_L_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_2XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_2XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_3XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_3XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_4XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_4XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_6XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_6XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_nomal_2_5_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_2_5_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_nomal_2_5_employee : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5_employee : '0')
                }
                </th>
              </tr>
              <tr style={{
                textAlign: "left",
              }}>
                <th scope="row" colspan="28">พนักงาน VIP</th>
              </tr>
              <tr>
                <th scope="row">10 KM</th>
                <th scope="col">{data.all ? data.all.vip_10_S_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_S_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_S_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_M_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_M_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_M_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_L_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_L_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_L_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_2XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_2XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_3XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_3XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_4XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_4XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_6XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_6XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_vip_10_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_10_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_vip_10_employee : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_10_employee : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row">5 KM</th>
                <th scope="col">{data.all ? data.all.vip_5_S_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_S_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_S_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_M_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_M_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_M_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_L_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_L_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_L_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_2XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_2XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_3XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_3XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_4XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_4XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_6XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_6XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_vip_5_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_5_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_vip_5_employee : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_5_employee : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row">2.5 KM</th>
                <th scope="col">{data.all ? data.all.vip_2_5_S_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_S_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_M_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_M_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_L_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_L_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_2XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_2XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_3XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_3XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_4XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_4XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_6XL_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_6XL_employee : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_vip_2_5_employee : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_2_5_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_vip_2_5_employee : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5_employee : '0')
                }
                </th>
              </tr>
              <tr style={{
                textAlign: "left",
              }}>
                <th scope="row" colspan="28">ลูกค้าทั่วไป</th>
              </tr>
              <tr>
                <th scope="row">10 KM</th>
                <th scope="col">{data.all ? data.all.nomal_10_S : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_S : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_S : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_S : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_M : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_M : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_M : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_M : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_L : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_L : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_L : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_L : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_2XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_2XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_2XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_3XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_3XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_3XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_4XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_4XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_4XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_10_6XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_6XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_10_6XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_nomal_10 : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_10 : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_nomal_10 : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10 : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row">5 KM</th>
                <th scope="col">{data.all ? data.all.nomal_5_S : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_S : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_S : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_S : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_M : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_M : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_M : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_M : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_L : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_L : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_L : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_L : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_2XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_2XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_2XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_3XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_3XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_3XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_4XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_4XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_4XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_5_6XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_6XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_5_6XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_nomal_5 : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_5 : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_nomal_5 : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5 : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row">2.5 KM</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_S : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_S : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_S : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_M : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_M : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_M : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_L : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_L : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_L : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_2XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_2XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_2XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_3XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_3XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_3XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_4XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_4XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_4XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL : '0')}</th>
                <th scope="col">{data.all ? data.all.nomal_2_5_6XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.nomal_2_5_6XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_nomal_2_5 : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_2_5 : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_nomal_2_5 : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5 : '0')
                }
                </th>
              </tr>
              <tr style={{
                textAlign: "left",
              }}>
                <th scope="row" colspan="28">ลูกค้าทั่วไป VIP</th>
              </tr>
              <tr>
                <th scope="row">10 KM</th>
                <th scope="col">{data.all ? data.all.vip_10_S : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_S : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_S : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_S : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_M : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_M : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_M : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_M : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_L : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_L : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_L : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_L : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_2XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_2XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_2XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_3XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_3XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_3XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_4XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_4XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_4XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_10_6XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_6XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_10_6XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_vip_10 : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_10 : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_vip_10 : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_10 : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row">5 KM</th>
                <th scope="col">{data.all ? data.all.vip_5_S : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_S : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_S : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_S : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_M : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_M : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_M : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_M : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_L : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_L : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_L : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_L : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_2XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_2XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_2XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_3XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_3XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_3XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_4XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_4XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_4XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_5_6XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_6XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_5_6XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_vip_5 : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_5 : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_vip_5 : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_5 : '0')
                }
                </th>

              </tr>
              <tr>
                <th scope="row">2.5 KM</th>
                <th scope="col">{data.all ? data.all.vip_2_5_S : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_S : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_S : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_M : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_M : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_M : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_L : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_L : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_L : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_2XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_2XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_2XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_3XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_3XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_3XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_4XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_4XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_4XL : '0') - parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL : '0')}</th>
                <th scope="col">{data.all ? data.all.vip_2_5_6XL : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_6XL : '0'}</th>
                <th scope="col">{parseInt(data.all ? data.all.vip_2_5_6XL : '0') - parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0')}</th>
                <th scope="col">{data.all ? data.all.sum_vip_2_5 : '0'}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_2_5 : '0'}</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_vip_2_5 : '0') -
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5 : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row" style={{
                  textAlign: "left",
                }}>Total</th>
                <th scope="col">{
                  parseInt(data.all ? data.all.vip_2_5_S : '0') +
                  parseInt(data.all ? data.all.vip_5_S : '0') +
                  parseInt(data.all ? data.all.vip_10_S : '0') +
                  parseInt(data.all ? data.all.vip_2_5_S_employee : '0') +
                  parseInt(data.all ? data.all.vip_5_S_employee : '0') +
                  parseInt(data.all ? data.all.vip_10_S_employee : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_S : '0') +
                  parseInt(data.all ? data.all.nomal_5_S : '0') +
                  parseInt(data.all ? data.all.nomal_10_S : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_S_employee : '0') +
                  parseInt(data.all ? data.all.nomal_5_S_employee : '0') +
                  parseInt(data.all ? data.all.nomal_10_S_employee : '0')}
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_S_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.vip_2_5_S : '0') +
                      parseInt(data.all ? data.all.vip_5_S : '0') +
                      parseInt(data.all ? data.all.vip_10_S : '0') +
                      parseInt(data.all ? data.all.vip_2_5_S_employee : '0') +
                      parseInt(data.all ? data.all.vip_5_S_employee : '0') +
                      parseInt(data.all ? data.all.vip_10_S_employee : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_S : '0') +
                      parseInt(data.all ? data.all.nomal_5_S : '0') +
                      parseInt(data.all ? data.all.nomal_10_S : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_S_employee : '0') +
                      parseInt(data.all ? data.all.nomal_5_S_employee : '0') +
                      parseInt(data.all ? data.all.nomal_10_S_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_S_employee : '0'))
                  }
                </th>

                <th scope="col">{
                  parseInt(data.all ? data.all.vip_2_5_M : '0') +
                  parseInt(data.all ? data.all.vip_5_M : '0') +
                  parseInt(data.all ? data.all.vip_10_M : '0') +
                  parseInt(data.all ? data.all.vip_2_5_M_employee : '0') +
                  parseInt(data.all ? data.all.vip_5_M_employee : '0') +
                  parseInt(data.all ? data.all.vip_10_M_employee : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_M : '0') +
                  parseInt(data.all ? data.all.nomal_5_M : '0') +
                  parseInt(data.all ? data.all.nomal_10_M : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_M_employee : '0') +
                  parseInt(data.all ? data.all.nomal_5_M_employee : '0') +
                  parseInt(data.all ? data.all.nomal_10_M_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_M_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.vip_2_5_M : '0') +
                      parseInt(data.all ? data.all.vip_5_M : '0') +
                      parseInt(data.all ? data.all.vip_10_M : '0') +
                      parseInt(data.all ? data.all.vip_2_5_M_employee : '0') +
                      parseInt(data.all ? data.all.vip_5_M_employee : '0') +
                      parseInt(data.all ? data.all.vip_10_M_employee : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_M : '0') +
                      parseInt(data.all ? data.all.nomal_5_M : '0') +
                      parseInt(data.all ? data.all.nomal_10_M : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_M_employee : '0') +
                      parseInt(data.all ? data.all.nomal_5_M_employee : '0') +
                      parseInt(data.all ? data.all.nomal_10_M_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_M_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.all ? data.all.vip_2_5_L : '0') +
                  parseInt(data.all ? data.all.vip_5_L : '0') +
                  parseInt(data.all ? data.all.vip_10_L : '0') +
                  parseInt(data.all ? data.all.vip_2_5_L_employee : '0') +
                  parseInt(data.all ? data.all.vip_5_L_employee : '0') +
                  parseInt(data.all ? data.all.vip_10_L_employee : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_L : '0') +
                  parseInt(data.all ? data.all.nomal_5_L : '0') +
                  parseInt(data.all ? data.all.nomal_10_L : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_L_employee : '0') +
                  parseInt(data.all ? data.all.nomal_5_L_employee : '0') +
                  parseInt(data.all ? data.all.nomal_10_L_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_L_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.vip_2_5_L : '0') +
                      parseInt(data.all ? data.all.vip_5_L : '0') +
                      parseInt(data.all ? data.all.vip_10_L : '0') +
                      parseInt(data.all ? data.all.vip_2_5_L_employee : '0') +
                      parseInt(data.all ? data.all.vip_5_L_employee : '0') +
                      parseInt(data.all ? data.all.vip_10_L_employee : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_L : '0') +
                      parseInt(data.all ? data.all.nomal_5_L : '0') +
                      parseInt(data.all ? data.all.nomal_10_L : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_L_employee : '0') +
                      parseInt(data.all ? data.all.nomal_5_L_employee : '0') +
                      parseInt(data.all ? data.all.nomal_10_L_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_L_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.all ? data.all.vip_2_5_XL : '0') +
                  parseInt(data.all ? data.all.vip_5_XL : '0') +
                  parseInt(data.all ? data.all.vip_10_XL : '0') +
                  parseInt(data.all ? data.all.vip_2_5_XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_5_XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_10_XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_XL : '0') +
                  parseInt(data.all ? data.all.nomal_5_XL : '0') +
                  parseInt(data.all ? data.all.nomal_10_XL : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_5_XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_10_XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.vip_2_5_XL : '0') +
                      parseInt(data.all ? data.all.vip_5_XL : '0') +
                      parseInt(data.all ? data.all.vip_10_XL : '0') +
                      parseInt(data.all ? data.all.vip_2_5_XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_5_XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_10_XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_XL : '0') +
                      parseInt(data.all ? data.all.nomal_5_XL : '0') +
                      parseInt(data.all ? data.all.nomal_10_XL : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_5_XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_10_XL_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.all ? data.all.vip_2_5_2XL : '0') +
                  parseInt(data.all ? data.all.vip_5_2XL : '0') +
                  parseInt(data.all ? data.all.vip_10_2XL : '0') +
                  parseInt(data.all ? data.all.vip_2_5_2XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_5_2XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_10_2XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_2XL : '0') +
                  parseInt(data.all ? data.all.nomal_5_2XL : '0') +
                  parseInt(data.all ? data.all.nomal_10_2XL : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_2XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_5_2XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_10_2XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.vip_2_5_2XL : '0') +
                      parseInt(data.all ? data.all.vip_5_2XL : '0') +
                      parseInt(data.all ? data.all.vip_10_2XL : '0') +
                      parseInt(data.all ? data.all.vip_2_5_2XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_5_2XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_10_2XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_2XL : '0') +
                      parseInt(data.all ? data.all.nomal_5_2XL : '0') +
                      parseInt(data.all ? data.all.nomal_10_2XL : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_2XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_5_2XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_10_2XL_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.all ? data.all.vip_2_5_3XL : '0') +
                  parseInt(data.all ? data.all.vip_5_3XL : '0') +
                  parseInt(data.all ? data.all.vip_10_3XL : '0') +
                  parseInt(data.all ? data.all.vip_2_5_3XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_5_3XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_10_3XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_3XL : '0') +
                  parseInt(data.all ? data.all.nomal_5_3XL : '0') +
                  parseInt(data.all ? data.all.nomal_10_3XL : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_3XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_5_3XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_10_3XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.vip_2_5_3XL : '0') +
                      parseInt(data.all ? data.all.vip_5_3XL : '0') +
                      parseInt(data.all ? data.all.vip_10_3XL : '0') +
                      parseInt(data.all ? data.all.vip_2_5_3XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_5_3XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_10_3XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_3XL : '0') +
                      parseInt(data.all ? data.all.nomal_5_3XL : '0') +
                      parseInt(data.all ? data.all.nomal_10_3XL : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_3XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_5_3XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_10_3XL_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.all ? data.all.vip_2_5_4XL : '0') +
                  parseInt(data.all ? data.all.vip_5_4XL : '0') +
                  parseInt(data.all ? data.all.vip_10_4XL : '0') +
                  parseInt(data.all ? data.all.vip_2_5_4XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_5_4XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_10_4XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_4XL : '0') +
                  parseInt(data.all ? data.all.nomal_5_4XL : '0') +
                  parseInt(data.all ? data.all.nomal_10_4XL : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_4XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_5_4XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_10_4XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.vip_2_5_4XL : '0') +
                      parseInt(data.all ? data.all.vip_5_4XL : '0') +
                      parseInt(data.all ? data.all.vip_10_4XL : '0') +
                      parseInt(data.all ? data.all.vip_2_5_4XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_5_4XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_10_4XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_4XL : '0') +
                      parseInt(data.all ? data.all.nomal_5_4XL : '0') +
                      parseInt(data.all ? data.all.nomal_10_4XL : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_4XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_5_4XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_10_4XL_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.all ? data.all.vip_2_5_6XL : '0') +
                  parseInt(data.all ? data.all.vip_5_6XL : '0') +
                  parseInt(data.all ? data.all.vip_10_6XL : '0') +
                  parseInt(data.all ? data.all.vip_2_5_6XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_5_6XL_employee : '0') +
                  parseInt(data.all ? data.all.vip_10_6XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_6XL : '0') +
                  parseInt(data.all ? data.all.nomal_5_6XL : '0') +
                  parseInt(data.all ? data.all.nomal_10_6XL : '0') +
                  parseInt(data.all ? data.all.nomal_2_5_6XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_5_6XL_employee : '0') +
                  parseInt(data.all ? data.all.nomal_10_6XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.vip_2_5_6XL : '0') +
                      parseInt(data.all ? data.all.vip_5_6XL : '0') +
                      parseInt(data.all ? data.all.vip_10_6XL : '0') +
                      parseInt(data.all ? data.all.vip_2_5_6XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_5_6XL_employee : '0') +
                      parseInt(data.all ? data.all.vip_10_6XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_6XL : '0') +
                      parseInt(data.all ? data.all.nomal_5_6XL : '0') +
                      parseInt(data.all ? data.all.nomal_10_6XL : '0') +
                      parseInt(data.all ? data.all.nomal_2_5_6XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_5_6XL_employee : '0') +
                      parseInt(data.all ? data.all.nomal_10_6XL_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.all ? data.all.sum_vip_2_5 : '0') +
                  parseInt(data.all ? data.all.sum_vip_5 : '0') +
                  parseInt(data.all ? data.all.sum_vip_10 : '0') +
                  parseInt(data.all ? data.all.sum_vip_2_5_employee : '0') +
                  parseInt(data.all ? data.all.sum_vip_5_employee : '0') +
                  parseInt(data.all ? data.all.sum_vip_10_employee : '0') +
                  parseInt(data.all ? data.all.sum_nomal_2_5 : '0') +
                  parseInt(data.all ? data.all.sum_nomal_5 : '0') +
                  parseInt(data.all ? data.all.sum_nomal_10 : '0') +
                  parseInt(data.all ? data.all.sum_nomal_2_5_employee : '0') +
                  parseInt(data.all ? data.all.sum_nomal_5_employee : '0') +
                  parseInt(data.all ? data.all.sum_nomal_10_employee : '0')}
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_5 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_10 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_5_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_10_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.all ? data.all.sum_vip_2_5 : '0') +
                      parseInt(data.all ? data.all.sum_vip_5 : '0') +
                      parseInt(data.all ? data.all.sum_vip_10 : '0') +
                      parseInt(data.all ? data.all.sum_vip_2_5_employee : '0') +
                      parseInt(data.all ? data.all.sum_vip_5_employee : '0') +
                      parseInt(data.all ? data.all.sum_vip_10_employee : '0') +
                      parseInt(data.all ? data.all.sum_nomal_2_5 : '0') +
                      parseInt(data.all ? data.all.sum_nomal_5 : '0') +
                      parseInt(data.all ? data.all.sum_nomal_10 : '0') +
                      parseInt(data.all ? data.all.sum_nomal_2_5_employee : '0') +
                      parseInt(data.all ? data.all.sum_nomal_5_employee : '0') +
                      parseInt(data.all ? data.all.sum_nomal_10_employee : '0')) -
                    (parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_5 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_10 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_5_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_10_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10_employee : '0'))
                  }
                </th>

              </tr>
            </tbody>
          </Table>


          {/* Table สรุปผลรับเหรียญ */}
          <h4 className="mb-3 d-flex" style={{ backgroundColor: "green", color: "white", padding: "0.5rem" }}>
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
                <th scope="col">#</th>
                <th scope="col" width="3%">S <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">S <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">M <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">M <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">L <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">L <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">XL <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">XL <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">2XL <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">2XL <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">3XL <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">3XL <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">4XL <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">4XL <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">6XL <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">6XL <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Diff</th>
                <th scope="col" width="3%">Total <br />ลงทะเบียนรับเสื้อ</th>
                <th scope="col" width="3%">Total <br />รับเหรียญแล้ว</th>
                <th scope="col" width="3%">Total Diff</th>

              </tr>
            </thead>
            <tbody
              style={{
                textAlign: "right",
                maxWidth: '100%'
              }}
            >
              <tr style={{
                textAlign: "left",
              }}>
                <th scope="row" colspan="28">พนักงาน</th>
              </tr>
              <tr>
                <th scope="row">10 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_S_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_S_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_S_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_M_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_M_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_M_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_L_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_L_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_L_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_2XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_2XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_3XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_3XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_4XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_4XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_6XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_6XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_10_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_nomal_10_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10_employee : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_10_employee : '0')
                }</th>
              </tr>
              <tr>
                <th scope="row">5 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_S_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_S_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_S_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_M_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_M_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_M_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_L_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_L_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_L_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_2XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_2XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_3XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_3XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_4XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_4XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_6XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_6XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_5_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_nomal_5_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5_employee : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_5_employee : '0')
                }
                </th> </tr>
              <tr>
                <th scope="row">2.5 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_S_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_S_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_M_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_M_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_L_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_L_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_2XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_2XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_3XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_3XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_4XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_4XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_6XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_2_5_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_nomal_2_5_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5_employee : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_2_5_employee : '0')
                }</th>
              </tr>
              <tr style={{
                textAlign: "left",
              }}>
                <th scope="row" colspan="28">พนักงาน VIP</th>
              </tr>
              <tr>
                <th scope="row">10 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_S_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_S_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_S_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_M_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_M_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_M_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_L_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_L_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_L_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_2XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_2XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_3XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_3XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_4XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_4XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_6XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_6XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_10_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_vip_10_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_10_employee : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_10_employee : '0')
                }</th>
              </tr>
              <tr>
                <th scope="row">5 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_S_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_S_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_S_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_M_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_M_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_M_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_L_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_L_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_L_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_2XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_2XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_3XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_3XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_4XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_4XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_6XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_6XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_5_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_vip_5_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_5_employee : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_5_employee : '0')
                }</th>
              </tr>
              <tr>
                <th scope="row">2.5 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_S_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_S_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_S_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_M_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_M_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_M_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_L_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_L_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_L_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_2XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_2XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_2XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_3XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_3XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_3XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_4XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_4XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_4XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_6XL_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_6XL_employee : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL_employee : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_6XL_employee : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_2_5_employee : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_vip_2_5_employee : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5_employee : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_2_5_employee : '0')
                }</th>

              </tr>
              <tr style={{
                textAlign: "left",
              }}>
                <th scope="row" colspan="28">ลูกค้าทั่วไป</th>
              </tr>
              <tr>
                <th scope="row">10 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_S : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_S : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_S : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_S : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_M : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_M : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_M : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_M : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_L : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_L : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_L : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_L : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_2XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_2XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_2XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_3XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_3XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_3XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_4XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_4XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_4XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_10_6XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_10_6XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_10_6XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_10 : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_nomal_10 : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10 : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_10 : '0')
                }
                </th>

              </tr>
              <tr>
                <th scope="row">5 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_S : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_S : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_S : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_S : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_M : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_M : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_M : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_M : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_L : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_L : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_L : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_L : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_2XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_2XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_2XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_3XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_3XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_3XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_4XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_4XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_4XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_5_6XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_5_6XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_5_6XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_5 : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_nomal_5 : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5 : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_5 : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row">2.5 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_S : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_S : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_S : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_M : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_M : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_M : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_L : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_L : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_L : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_2XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_2XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_2XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_3XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_3XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_3XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_4XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_4XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_4XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.nomal_2_5_6XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_6XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_nomal_2_5 : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_nomal_2_5 : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5 : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_2_5 : '0')
                }</th>
              </tr>
              <tr style={{
                textAlign: "left",
              }}>
                <th scope="row" colspan="28">ลูกค้าทั่วไป VIP</th>
              </tr>
              <tr>
                <th scope="row">10 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_S : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_S : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_S : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_S : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_M : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_M : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_M : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_M : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_L : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_L : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_L : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_L : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_2XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_2XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_2XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_3XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_3XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_3XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_4XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_4XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_4XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_10_6XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_10_6XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_10_6XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_10 : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_vip_10 : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_10 : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_10 : '0')
                }
                </th>
              </tr>
              <tr>
                <th scope="row">5 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_S : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_S : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_S : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_S : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_M : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_M : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_M : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_M : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_L : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_L : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_L : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_L : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_2XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_2XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_2XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_3XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_3XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_3XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_4XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_4XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_4XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_5_6XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_5_6XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_5_6XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_5 : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_vip_5 : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_5 : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_5 : '0')
                }</th>
              </tr>
              <tr>
                <th scope="row">2.5 KM</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_S : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_S : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_S : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_M : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_M : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_M : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_L : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_L : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_L : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_2XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_2XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_2XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_3XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_3XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_3XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_4XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_4XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL : '0') - parseInt(data.finisher_award ? data.finisher_award.vip_2_5_4XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.vip_2_5_6XL : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.vip_2_5_6XL : '0'}</th>
                <th scope="col">{parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL : '0') - parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_6XL : '0')}</th>
                <th scope="col">{data.shirt_received ? data.shirt_received.sum_vip_2_5 : '0'}</th>
                <th scope="col">{data.finisher_award ? data.finisher_award.sum_vip_2_5 : '0'}</th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5 : '0') -
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_2_5 : '0')
                } </th>

              </tr>

              <tr>
                <th scope="row" style={{
                  textAlign: "left",
                }}>Total</th>
                <th scope="col">{

                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_S : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_S_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_S_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_S : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_S : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_S : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_S_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_S_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_S_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_S : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_S : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_S : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_S_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_S_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_S_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_S : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_S_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_S_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.vip_2_5_S : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_S : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_S : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_2_5_S_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_S_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_S_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_S : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_S : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_S : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_S_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_S_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_S_employee : '0'))
                  }
                </th>

                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_M : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_M_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_M_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_M : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_M : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_M : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_M_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_M_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_M_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_M : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_M : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_M : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_M_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_M_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_M_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_M : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_M_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_M_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.vip_2_5_M : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_M : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_M : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_2_5_M_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_M_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_M_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_M : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_M : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_M : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_M_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_M_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_M_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_L : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_L_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_L_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_L : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_L : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_L : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_L_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_L_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_L_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_L : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_L : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_L : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_L_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_L_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_L_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_L : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_L_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_L_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.vip_2_5_L : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_L : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_L : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_2_5_L_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_L_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_L_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_L : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_L : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_L : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_L_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_L_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_L_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_XL_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.vip_2_5_XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_2_5_XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_2XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_2XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_2XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_2XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_2XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_2XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_2XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_2XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_2XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_2XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_2XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_2XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_2XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_2XL_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.vip_2_5_2XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_2XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_2XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_2_5_2XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_2XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_2XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_2XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_2XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_2XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_2XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_2XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_2XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_3XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_3XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_3XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_3XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_3XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_3XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_3XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_3XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_3XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_3XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_3XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_3XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_3XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_3XL_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.vip_2_5_3XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_3XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_3XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_2_5_3XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_3XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_3XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_3XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_3XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_3XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_3XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_3XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_3XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_4XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_4XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_4XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_4XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_4XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_4XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_4XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_4XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_4XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_4XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_4XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_4XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_4XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_4XL_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.vip_2_5_4XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_4XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_4XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_2_5_4XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_4XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_4XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_4XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_4XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_4XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_4XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_4XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_4XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL_employee : '0')}

                </th>
                <th scope="col">{

                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_6XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_6XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_6XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_2_5_6XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_5_6XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.vip_10_6XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_6XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_6XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_6XL : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_6XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_5_6XL_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.nomal_10_6XL_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_2_5_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_5_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.vip_10_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_2_5_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_5_6XL_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.nomal_10_6XL_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.vip_2_5_6XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_6XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_6XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_2_5_6XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_5_6XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.vip_10_6XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_6XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_6XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_6XL : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_2_5_6XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_5_6XL_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.nomal_10_6XL_employee : '0'))
                  }
                </th>
                <th scope="col">{
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_5 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_10 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_5_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_vip_10_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10 : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5_employee : '0') +
                  parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10_employee : '0')}
                </th>
                <th scope="col">{
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_2_5 : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_5 : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_10 : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_2_5_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_5_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_vip_10_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_2_5 : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_5 : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_10 : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_2_5_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_5_employee : '0') +
                  parseInt(data.finisher_award ? data.finisher_award.sum_nomal_10_employee : '0')}

                </th>
                <th scope="col">
                  {

                    (parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_5 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_10 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_2_5_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_5_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_vip_10_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10 : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_2_5_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_5_employee : '0') +
                      parseInt(data.shirt_received ? data.shirt_received.sum_nomal_10_employee : '0')) -
                    (parseInt(data.finisher_award ? data.finisher_award.sum_vip_2_5 : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_vip_5 : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_vip_10 : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_vip_2_5_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_vip_5_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_vip_10_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_nomal_2_5 : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_nomal_5 : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_nomal_10 : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_nomal_2_5_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_nomal_5_employee : '0') +
                      parseInt(data.finisher_award ? data.finisher_award.sum_nomal_10_employee : '0'))
                  }
                </th>

              </tr>
            </tbody>
          </Table>
        </div>


      )}




    </div>
  );
};

export default DashboardTable;