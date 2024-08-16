import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaTshirt, FaMedal } from "react-icons/fa";

import {
  Container,
  Table,
  InputGroup,
  FormControl,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import EditModal from "./EditModal";
import AlertModal from "./AlertModal";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [formData, setFormData] = useState({
    statusRegister: "",
    shirtStatus: "",
    timestamp: "",
    km: "",
    slip: "",
    cardId: "",
    name: "",
    address: "",
    tel: "",
    shirtSize: "",
    finisher_award: "",
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [contactNameData, setContactNameData] = useState([]);
  const [contactTelData, setContactTelData] = useState([]);

  const fetchDataApi = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN_API}/running72/account/`,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_X_API_KEY,
          },
        }
      );
      //console.log(result.data.data);

      return result.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const respData = await fetchDataApi();
      respData.forEach(async (val) => {
        setContactNameData((prev) => ({
          ...prev,
          [val.id]: val.contact_name,
        }));
        setContactTelData((prev) => ({
          ...prev,
          [val.id]: val.contact_tel,
        }));
      });

      setData(respData);
    };
    fetchData();
  }, []);

  const filteredData = data.filter((val) =>
    val.bib_id.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setFormData({
      statusRegister: item.statusRegister || "",
      shirtStatus: item.shirt_status || "",
      timestamp: item.Timestamp || "",
      km: item.km || "",
      slip: item.slip || "",
      cardId: item.card_id || "",
      name: item.name || "",
      address: item.address || "",
      tel: item.tel || "",
      shirtSize: item.shirt_size || "",
      finisher_award: item.finisher_award || "",
    });
    setShowEditModal(true);
  };

  const handleCloseEdit = async () => {
    setShowEditModal(false);
    const respData = await fetchDataApi();
    setData(respData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (id, currentStatus) => {
    const newStatus = currentStatus === "Received" ? "" : "Received";
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setSelectedIds((prev) => {
      const newSelectedIds = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      return newSelectedIds;
    });
  };
  

  {/*Update API รับเหรียญ*/}
  const handleUpdateClick = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_DOMAIN_API}/running72/account/group-finisher`;
      const payload = {
        id: selectedIds,
        finisher_award: "Received",
      };
      // console.log("API URL รับเหรียญ:", url);
      // console.log("Payload:", payload);

      const response = await axios.post(url, payload, {
        headers: {
          "x-api-key": process.env.REACT_APP_X_API_KEY,
        },
      });

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            selectedIds.includes(item.id)
              ? { ...item, finisher_award: "Received" }
              : item
          )
        );
        setAlertTitle("Success");
        setAlertMessage("Medals status updated successfully.");
      } else {
        setAlertTitle("Error");
        setAlertMessage("Error updating Medals status.");
      }
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage("An error occurred while updating Medals status.");
      console.error("Error:", error);
    } finally {
      setShowAlertModal(true);
    }
  };

  {/*Pagination*/}
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  {/*Search*/}
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Container style={{ maxWidth: "1500px", margin: "auto", padding: "10px" }}>
      <h2 className="mb-3 d-flex justify-content-center"> รับเหรียญ​รางวัล</h2>
      <br />
      <InputGroup
        className="mb-3 d-flex justify-content-center"
        style={{ maxWidth: "600px", width: "100%", float: "right" }}
      >
        <FormControl
          placeholder="Search BIB No."
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={search}
          onChange={(e) => handleSearch(e)}
          style={{ fontSize: "1.25rem", padding: "10px" }}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          style={{ fontSize: "1.25rem" }}
        >
          <FaSearch />
        </Button>
      </InputGroup>
 
      {currentItems.length > 0 ? (
        <>
          <Table
            className="table table-striped table-hover table table-bordered"
            style={{ marginTop: "20px" }}
          >
            <thead style={{ fontSize: "18px", textAlign: "center" }}>
              <tr>
                <th width="10%">หมายเลขบัตรประชาชน</th>
                <th width="10%">ชื่อ-สกุล</th>
                <th width="10%">เบอร์โทรศัพท์</th>
                <th width="15%">ระยะวิ่ง</th>
                <th width="5%">BIB No</th>
                <th width="5%">บริษัท/รหัสพนักงาน</th>
                <th width="10%">remark</th>
                <th width="10%"></th>
                <th width="10%">
                  {" "}
                  {/* Update Button */}
                  {selectedIds.length > 0 && (
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: "20px" }}
                    >
                      <Button variant="success" onClick={handleUpdateClick}>
                        Update
                      </Button>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.card_id}</td>
                  <td>{item.name}</td>
                  <td>{item.tel}</td>
                  <td style={{backgroundColor: (item.km.indexOf("2.5")>1?"pink":item.km.indexOf("5")>1?"red":item.km.indexOf("10")>1?"blue":""),
                   color: (item.km.indexOf("2.5")>1?"#000":"#FFF")
                   }}
                  >{item.km}</td>
                  <td>
                    <b
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      {item.bib_id}
                    </b>
                  </td>
                  <td>
                    {item.company ? item.company + "/" : ""}
                    {item.employee_code}
                  </td>
                  <td
                    style={{
                      backgroundColor: item.remark_award ? "yellow" : "",
                    }}
                  >
                    {item.remark_award}
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditClick(item)}
                    >
                      ตรวจสอบข้อมูล
                    </Button>
                    <br />
                    {item.payment_amount ? "มีใบกำกับภาษี" : ""}
                    <br />
                    <div style={{ width: "150px", display: "flex" }}>
                      {item.status_register === "Check" ? (
                        <span
                          style={{
                            backgroundColor: "red",
                            fontWeight: "bold",
                            display: "block",
                            textAlign: "center",
                          }}
                        >
                          สถานะการสมัคร Check
                        </span>
                      ) : item.shirt_status === "Received" ? (
                        <span
                          style={{
                            color: "green",
                            fontWeight: "bold",
                            display: "block",
                            textAlign: "center",
                          }}
                        >
                          <FaTshirt /> รับเสื้อแล้ว
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            display: "block",
                            textAlign: "center",
                          }}
                        >
                          ยังไม่ได้รับเสื้อ
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Checkbox รับเหรียญ */}
                  <td>
                    <div
                      style={{
                        width: "150px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {item.finisher_award === "Received" ? (
                        <span
                          style={{
                            color: "green",
                            fontWeight: "bold",
                            display: "block",
                            textAlign: "center",
                          }}
                        >
                          <FaMedal /> รับเหรียญแล้ว
                        </span>
                      ) : (
                        <Form.Check
                          type="checkbox"
                          label={
                            <span
                              style={{ color: "red" }}
                              onClick={() =>
                                handleCheckboxChange(
                                  item.id,
                                  item.finisher_award
                                )
                              }
                            >
                              ยังไม่ได้รับเหรียญ
                            </span>
                          }
                          checked={checkedItems[item.id] || false}
                          onChange={() =>
                            handleCheckboxChange(item.id, item.finisher_award)
                          }
                        />
                      )}
                    </div>
                  </td>

                  {/*  <td>
                   <div style={{ width: "150px" }}>
                      <IoMdContact style={{ width: "30px", float: "left" }} />
                      <Form.Control
                        type="text"
                        name="contact_name"
                        value={contactNameData[item.id]}
                        readOnly={
                          item.shirt_status === "Received" ? true : false
                        }
                        placeholder="ชื่อผู้ติดต่อ"
                        onChange={(event) =>
                          handleInputContactName(item.id, event.target.value)
                        }
                        className="form-text"
                        style={{
                          float: "left",
                          paddingBottom: "0.5rem",
                          width: "120px",
                          backgroundColor:
                            item.shirt_status === "Received"
                              ? "#e9ecef"
                              : "#fff",
                        }}
                      />
                    </div> */}
                  {/* <br />
                    <div style={{ width: "150px" }}>
                      <FaPhoneAlt style={{ width: "30px", float: "left" }} />

                      <Form.Control
                        type="text"
                        name="contact_phone"
                        value={contactTelData[item.id]}
                        readOnly={
                          item.shirt_status === "Received" ? true : false
                        }
                        placeholder="เบอร์ผู้ติดต่อ"
                        onChange={(event) =>
                          handleInputContactTel(item.id, event.target.value)
                        }
                        className="form-text"
                        style={{
                          paddingBottom: "0.5rem",
                          width: "120px",
                          backgroundColor:
                            item.shirt_status === "Received"
                              ? "#e9ecef"
                              : "#fff",
                        }}
                      />
                    </div> 
                  </td>*/}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <Pagination>
              {currentPage > 1 && (
                <Pagination.First onClick={() => setCurrentPage(1)} />
              )}
              {currentPage > 1 && (
                <Pagination.Prev
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              )}

              {Array.from({ length: Math.min(10, totalPages) }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                );
              })}

              {totalPages > 10 && currentPage < totalPages && (
                <>
                  <Pagination.Ellipsis />
                  <Pagination.Item
                    active={totalPages === currentPage}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Pagination.Item>
                </>
              )}

              {currentPage < totalPages && (
                <Pagination.Next
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              )}
              {currentPage < totalPages && (
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
              )}
            </Pagination>
          </div>
        </>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <p>No results found</p>
        </div>
      )}

      {/* Show ตรวจสอบข้อมูล */}
      <EditModal
        show={showEditModal}
        onClose={handleCloseEdit}
        formData={formData}
        id={selectedItem?.id}
        onInputChange={handleInputChange}
        onSaveChanges={() => {
          //console.log("Saving changes for ID:", selectedItem?.id);
          handleCloseEdit();
        }}
      />

      {/* Alert Checkbox 1 recive */}
      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={alertTitle}
        message={alertMessage}
      />
    </Container>
  );
}

export default Home;
