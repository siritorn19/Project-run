import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
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
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const fetchData = async () => {
    try {
      const url =
        "https://sheet.best/api/sheets/4564c89f-94a7-45dc-988e-842b17b2dc76";
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((val) =>
    Object.values(val).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // ปุ่มลงทะเบียน
  const handleRegisterClick = async (val) => {
    if (val.statusRegister !== "ลงทะเบียนแล้ว") {
      try {
        await axios.patch(
          `https://sheet.best/api/sheets/4564c89f-94a7-45dc-988e-842b17b2dc76/${val.id}`,
          {
            statusRegister: "ลงทะเบียนแล้ว",
          }
        );
        // Refresh data after update
        fetchData();
      } catch (error) {
        console.error("Error updating registration status:", error);
        alert("An error occurred while updating the registration status.");
      }
    }
  };

  const handleEditClick = (val) => {
    setSelectedItem(val);
    setFormData({
      statusRegister: val.statusRegister,
      shirtStatus: val.shirtStatus,
      timestamp: val.Timestamp,
      km: val.km,
      slip: val.slip,
      cardId: val.card_id,
      name: val.name,
      address: val.address,
      tel: val.tel,
      shirtSize: val.shirtSize,
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

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    const newCheckedItems = {};

    if (isChecked) {
      currentItems.forEach((item) => {
        newCheckedItems[item.id] = true;
      });
      setShowCheckboxes(true);
    } else {
      setShowCheckboxes(false);
    }

    setCheckedItems(newCheckedItems);
  };

  const handleUpdate = async () => {
    const selectedIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id]
    );

    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.patch(
            `https://sheet.best/api/sheets/4564c89f-94a7-45dc-988e-842b17b2dc76/${id}`,
            {
              statusRegister: "รับเสื้อแล้ว",
            }
          )
        )
      );
      alert("Shirt status updated successfully!");

      // Refresh data after update
      fetchData();
    } catch (error) {
      console.error("Error updating shirt status:", error);
      alert("An error occurred while updating the shirt status.");
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Pagination logic
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
          Search
        </Button>
      </InputGroup>

      {/* Table โชว์ข้อมูล */}
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
            <th>สถานะ</th>
            <th></th>
            <th>
              {/* Select all */}
              {search && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // Space between checkbox and button
                    padding: "0 20px", // Add padding to prevent elements from touching the edges
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    label="เลือกทั้งหมด"
                    checked={
                      currentItems.length > 0 &&
                      currentItems.every((val) => checkedItems[val.id])
                    }
                    onChange={handleSelectAllChange}
                    style={{ marginRight: "20px" }} // Space between checkbox and button
                  />
                  <Button
                    variant="primary"
                    onClick={handleUpdate}
                    style={{ width: "100px", textAlign: "center" }} // Width of the button
                  >
                    Update
                  </Button>
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((val) => (
            <tr key={val.id}>
              <td>{val.card_id}</td>
              <td>{val.name}</td>
              <td>{val.tel}</td>
              <td>{val.shirtSize}</td>

              {/* โชว์ Status ลงทะเบียน */}
              <td>
                <Button
                  variant={
                    val.statusRegister === "ลงทะเบียนแล้ว"
                      ? "success"
                      : "danger"
                  }
                  onClick={() => handleRegisterClick(val)}
                  disabled={val.statusRegister === "ลงทะเบียนแล้ว"}
                >
                  {val.statusRegister ? val.statusRegister : "ยังไม่ลงทะเบียน"}
                </Button>
              </td>

              <td>
                <Button variant="primary" onClick={() => handleEditClick(val)}>
                  ตรวจสอบข้อมูล
                </Button>
              </td>

              {/* Checkbox or Text for shirt status */}
              <td>
                {showCheckboxes ? (
                  val.shirtStatus === "รับเสื้อแล้ว" ? (
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        checked={!!checkedItems[val.id]}
                        onChange={(e) => {
                          const newCheckedItems = {};

                          if (e.target.checked) {
                            newCheckedItems[val.id] = true;
                          }

                          setCheckedItems(newCheckedItems);
                        }}
                        style={{ marginRight: "10px" }} // Add space between checkbox and text
                      />
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        ยังไม่ได้รับเสื้อ
                      </span>
                    </div>
                  )
                ) : val.shirtStatus === "รับเสื้อแล้ว" ? (
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
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    ยังไม่ได้รับเสื้อ
                  </span>
                )}
              </td>

              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>

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

      <EditModal
        show={showEditModal}
        onClose={handleCloseEdit}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </Container>
  );
}

export default Home;
