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

  const fetchDataApi = async () => {
    try {
      const result = await axios.get(
        "https://bigc-special-project-api-stg-aedsyeswba-as.a.run.app/running72/account/",
        {
          headers: {
            "x-api-key": "line-stg",
          },
        }
      );
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataApi();
      setData(data);
    };
    fetchData();
  }, []);

  const filteredData = data.filter((val) =>
    Object.values(val).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (item) => {
    console.log("ตรวจสอบข้อมูล ID:", item.id);

    setSelectedItem(item);
    setFormData({
      //   statusRegister: item.statusRegister,
      //   shirtStatus: item.shirtStatus,
      //   timestamp: item.Timestamp,
      km: item.km,
      slip: item.slip,
      cardId: item.card_id,
      name: item.name,
      address: item.address,
      tel: item.tel,
      //   shirtSize: item.shirtSize,
    });
    setShowEditModal(true);
  };

  const handleCloseEdit = () => setShowEditModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "รับเสื้อแล้ว" ? "" : "รับเสื้อแล้ว";
    try {
      const url =
        "https://bigc-special-project-api-stg-aedsyeswba-as.a.run.app/running72/account/update";
      const payload = {
        shirtStatus: newStatus,
        id: id,
      };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: "Bearer YOUR_AUTH_TOKEN",
        },
      });

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, shirtStatus: newStatus } : item
          )
        );
        setCheckedItems((prevCheckedItems) => ({
          ...prevCheckedItems,
          [id]: newStatus === "รับเสื้อแล้ว",
        }));
        setAlertTitle("Success");
        setAlertMessage("Status updated successfully");
        setShowAlertModal(true);
      } else {
        setAlertTitle("Error");
        setAlertMessage("Error updating status");
        setShowAlertModal(true);
      }
    } catch (error) {
      console.error("Error updating shirt status:", error);
      setAlertTitle("Error");
      setAlertMessage("Error updating status");
      setShowAlertModal(true);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container
      style={{ maxWidth: "1500px", margin: "auto", paddingTop: "50px" }}
    >
      <InputGroup
        className="mb-3 d-flex justify-content-center"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      <Table
        className="table table-striped table-hover"
        style={{ marginTop: "20px" }}
      >
        <thead style={{ fontSize: "18px" }}>
          <tr>
            <th>หมายเลขบัตรประชาชน</th>
            <th>ชื่อ-สกุล</th>
            <th>เบอร์โทรศัพท์</th>
            <th>ขนาดเสื้อที่ต้องการ</th>
            <th>remark</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.card_id}</td>
              <td>{item.name}</td>
              <td>{item.tel}</td>
              <td>{item.shirt_size}</td>
              <td>{item.remark_award}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(item)}>
                  ตรวจสอบข้อมูล
                </Button>
              </td>
              <td>
                {item.shirtStatus === "รับเสื้อแล้ว" ? (
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
                      <span style={{ color: "red" }}>ยังไม่ได้รับเสื้อ</span>
                    }
                    checked={checkedItems[item.id] || false}
                    onChange={() =>
                      handleCheckboxChange(item.id, item.shirtStatus)
                    }
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/* Show ตรวจสอบข้อมูล */}
      <EditModal
        show={showEditModal}
        onClose={handleCloseEdit}
        formData={formData} // ส่งข้อมูล item ทั้งหมด
        id={selectedItem?.id} // ส่ง ID
        onInputChange={handleInputChange}
        onSaveChanges={() => {
          // Handle save changes logic
          console.log("Saving changes for ID:", selectedItem?.id);
          handleCloseEdit(); // Close modal after saving
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
