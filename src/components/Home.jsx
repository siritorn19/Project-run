import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
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
  });
  const [selectedIds, setSelectedIds] = useState([]);



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

      setData(respData);
    };
    fetchData();
  }, []);

  const filteredData = data.filter((val) =>
    Object.values(val).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (item) => {
    //console.log("ตรวจสอบข้อมูล ID:", item.id);
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
    });
    setShowEditModal(true);
  };

  const handleCloseEdit = async() => {
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



  const handleUpdateClick = async () => {
    if (selectedIds.length === 1) {
      // Update shirtStatus for a single checkbox
      try {
        const url = `${process.env.REACT_APP_BACKEND_DOMAIN_API}/running72/account/update/`;
        const payload = {
          shirt_status: "Received",
          id: selectedIds[0],
        };
        const response = await axios.post(url, payload, {
          headers: {
            "x-api-key": process.env.REACT_APP_X_API_KEY,
          },
        });
        if (response.status === 200) {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === selectedIds[0]
                ? { ...item, shirt_status: "Received" }
                : item
            )
          );
          setAlertTitle("Success");
          setAlertMessage("Shirt status updated successfully");
        } else {
          setAlertTitle("Error");
          setAlertMessage("Error updating shirt status");
        }
      } catch (error) {
        console.error("Error updating shirt status:", error);
        setAlertTitle("Error");
        setAlertMessage("Error updating shirt status");
      } finally {
        setShowAlertModal(true);
      }
    }else if (selectedIds.length > 1) {
        // Update group status for multiple checkboxes
        try {
          const url = `${process.env.REACT_APP_BACKEND_DOMAIN_API}/running72/account/group-received`;
          const payload = {
            id: selectedIds, // Send the selected IDs as an array
            shirt_status: "Received"
          };
          //console.log("API URL:", url);
          //console.log("Payload:", payload);
      
          const response = await axios.post(url, payload, {
            headers: {
              "x-api-key": process.env.REACT_APP_X_API_KEY,
            },
          });
      
          if (response.status === 200) {
            // Update state with new status
            setData((prevData) =>
              prevData.map((item) =>
                selectedIds.includes(item.id)
                  ? { ...item, shirt_status: "Received" }
                  : item
              )
            );
            setAlertTitle("Success");
            setAlertMessage("Shirt statuses updated successfully.");
          } else {
            setAlertTitle("Error");
            setAlertMessage("Error updating shirt statuses");
          }
        } catch (error) {
          console.error("Error updating shirt statuses:", error);
          setAlertTitle("Error");
          setAlertMessage("Error updating shirt statuses");
        } finally {
          setShowAlertModal(true);
        }
      }
      
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }



  return (
    <Container
      style={{ maxWidth: "1500px", margin: "auto", padding: "10px" }}
    >
      <InputGroup
        className="mb-3 d-flex justify-content-center"
        style={{ maxWidth: "600px", width: "100%", float: "right"  }}
      >
        <FormControl
          placeholder="Search..."
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
            className="table table-striped table-hover"
            style={{ marginTop: "20px" }}
          >
            <thead style={{ fontSize: "18px" }}>
              <tr>
                <th width="10%">หมายเลขบัตรประชาชน</th>
                <th width="10%">ชื่อ-สกุล</th>
                <th width="10%">เบอร์โทรศัพท์</th>
                <th width="15%">ระยะวิ่ง</th>
                <th width="5%">BIB No</th>
                <th width="10%">ขนาดเสื้อที่ต้องการ</th>
                <th width="10%">บริษัท/รหัสพนักงาน</th>
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
                  <td>{item.km}</td>
                  <td>{item.bib_id}</td>
                  <td>{item.shirt_size}</td>
                  <td>{item.company?item.company+"/":""}{item.employee_code}</td>
                  <td style={{ backgroundColor: (item.remark_award)?"yellow":"" }}>{item.remark_award}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditClick(item)}
                    >
                      ตรวจสอบข้อมูล
                    </Button>
                  </td>
                  <td>
                  {item.status_register === "Check" ? ( <span
                        style={{
                          backgroundColor: "red",
                         // color: "green",
                          fontWeight: "bold",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        สถานะการสมัคร Check
                      </span>):
                    (item.shirt_status === "Received" ? (
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          display: "block",
                          textAlign: "center",
                        }}
                      >
                        รับเสื้อแล้ว
                      </span>
                    ) : (
                      <Form.Check
                        type="checkbox"
                        label={
                          <span style={{ color: "red" }} onClick={() =>
                            handleCheckboxChange(item.id, item.shirt_status)}>
                            ยังไม่ได้รับเสื้อ
                          </span>
                        }
                        checked={checkedItems[item.id] || false}
                        onChange={() =>
                          handleCheckboxChange(item.id, item.shirt_status)
                        }
                      />
                    ))
                  }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
         {/* Pagination */}
<div className="d-flex justify-content-center">
  <Pagination>
    {currentPage > 1 && (
      <Pagination.First onClick={() => setCurrentPage(1)} />
    )}
    {currentPage > 1 && (
      <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
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
      <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
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
