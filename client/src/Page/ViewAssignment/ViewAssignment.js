import { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import { Modal, Button, Table, Tab, Tabs, Pagination } from "react-bootstrap";
import { format } from "date-fns";
import { Typography } from "@mui/material";
import "./ViewAssignment.css";

const ViewAssignment = () => {
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
    const fetchAssignedEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/assignmentDetails/allData"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const assigned = data.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID_AssignTo
        );

        const reversedData = assigned.reverse();
        setTableData(reversedData);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset current page when switching tabs
  };

  const filterDataByTab = () => {
    if (activeTab === "Pending") {
      return tableData.filter((item) => item.AssignmentStatus === "Pending");
    } else if (activeTab === "Progress") {
      return tableData.filter((item) => item.AssignmentStatus === "Progress");
    } else if (activeTab === "Complete") {
      return tableData.filter((item) => item.AssignmentStatus === "Complete");
    }
    return [];
  };

  const filteredItems = filterDataByTab();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="assignment-table">
          <Typography variant="h5" style={{ fontWeight: "500" }}>
            Assignment Data
          </Typography>
          <div className="p-2">
            <Tabs
              defaultActiveKey="Pending"
              id="uncontrolled-tab-example"
              className="mb-3 mt-2"
              onSelect={(tab) => handleTabChange(tab)}
            >
              <Tab eventKey="Pending" title="Pending">
                <TableComponent data={currentItems} />
              </Tab>
              <Tab eventKey="Progress" title="Progress">
                <TableComponent data={currentItems} />
              </Tab>
              <Tab eventKey="Complete" title="Complete">
                <TableComponent data={currentItems} />
              </Tab>
            </Tabs>
            <Pagination>
              {Array.from({
                length: Math.ceil(filteredItems.length / itemsPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </Box>
    </Box>
  );
};

const TableComponent = ({ data }) => {
  const [selectedDescription, setSelectedDescription] = useState(null);

  // Function to handle click on description cell
  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
  };

  // Function to close the modal
  const handleClose = () => {
    setSelectedDescription(null);
  };

  return (
    <div>
      <Table striped bordered hover size="sm" className="small-table">
        <thead>
          <tr>
            <th>AssignmentID</th>
            <th>Assigner</th>
            <th>AssignTo</th>
            <th>Assignment Description</th>
            <th>Assign Date</th>
            <th>Deadline Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.AssignmentID}</td>
              <td>{item.EmployeeID}-{item.Assigner_FirstName}</td>
              <td>
                {item.EmployeeID_AssignTo}--{item.Assignee_FirstName}
              </td>
              <td
                onClick={() =>
                  handleDescriptionClick(item.Assignment_Description)
                }
                style={{ cursor: "pointer" }}
              >
                {item.Assignment_Description.slice(0, 50)}
              </td>
              <td>{format(new Date(item.AssignDate), "dd/MM/yyyy")}</td>
              <td>{format(new Date(item.DeadlineDate), "dd/MM/yyyy")}</td>
              <td>{item.AssignmentStatus}</td>
              <td>{item.AssignmentPriority}</td>
              <td>{item.Type}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to display full description */}
      <Modal
        show={selectedDescription !== null}
        onHide={handleClose}
        style={{ marginTop: "60px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assignment Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedDescription}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAssignment;
