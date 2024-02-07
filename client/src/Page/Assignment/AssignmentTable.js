import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";

const AssignmentTable = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/assignmentDetails";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        const reversedData = result.reverse();
        setTableData(reversedData);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
 // Change page
 const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="assignment-table">
      <Typography variant="h5" style={{ fontWeight: "500" }}>
        Assignment Data
      </Typography>

<div className="p-2" >
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2"
      >

        {/* pending table data  */}
        <Tab eventKey="home" title="Pending" style={{ maxHeight: "400px", overflowY: "auto", marginTop:"20px" }}>
          <Table striped bordered hover size="sm" > 
            <thead>
              <tr>
                <th>AssignmentID</th>
                <th>EmployeeID</th>
                <th>EmployeeID AssignTo</th>
                <th>Assignment Description</th>
                <th>Assign Date</th>
                <th>Deadline Date</th>
                <th>Assignment Status</th>
                <th>Assignment Priority</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
            {currentItems.map((item) => (
              <tr>
                <td>{item.AssignmentID}</td>
                <td>{item.EmployeeID}</td>
                <td>{item.EmployeeID_AssignTo}</td>
                <td>{item.Assignment_Description}</td>
                <td>{item.AssignDate}</td>
                <td>{item.DeadlineDate}</td>
                <td>{item.AssignmentStatus}</td>
                <td>{item.AssignmentPriority}</td>
                <td>{item.Type}</td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* progress table data  */}

        <Tab eventKey="profile" title="Progress" style={{ maxHeight: "400px", overflowY: "auto", marginTop:"20px" }}>
          <Table striped bordered hover size="sm"> 
            <thead>
              <tr>
                <th>AssignmentID</th>
                <th>EmployeeID</th>
                <th>EmployeeID AssignTo</th>
                <th>Assignment Description</th>
                <th>Assign Date</th>
                <th>Deadline Date</th>
                <th>Assignment Status</th>
                <th>Assignment Priority</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
            {currentItems.map((item) => (
              <tr>
                <td>{item.AssignmentID}</td>
                <td>{item.EmployeeID}</td>
                <td>{item.EmployeeID_AssignTo}</td>
                <td>{item.Assignment_Description}</td>
                <td>{item.AssignDate}</td>
                <td>{item.DeadlineDate}</td>
                <td>{item.AssignmentStatus}</td>
                <td>{item.AssignmentPriority}</td>
                <td>{item.Type}</td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* complete table data  */}
        <Tab eventKey="contact" title="Complete" style={{ maxHeight: "400px", overflowY: "auto", marginTop:"20px" }}>
        <Table striped bordered hover size="sm"> 
            <thead>
              <tr>
                <th>AssignmentID</th>
                <th>EmployeeID</th>
                <th>EmployeeID AssignTo</th>
                <th>Assignment Description</th>
                <th>Assign Date</th>
                <th>Deadline Date</th>
                <th>Assignment Status</th>
                <th>Assignment Priority</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
            {currentItems.map((item) => (
              <tr>
                <td>{item.AssignmentID}</td>
                <td>{item.EmployeeID}</td>
                <td>{item.EmployeeID_AssignTo}</td>
                <td>{item.Assignment_Description}</td>
                <td>{item.AssignDate}</td>
                <td>{item.DeadlineDate}</td>
                <td>{item.AssignmentStatus}</td>
                <td>{item.AssignmentPriority}</td>
                <td>{item.Type}</td>
              </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
      </div>

       {/* Pagination */}
       <ul className="pagination">
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
    </div>
  );
};

export default AssignmentTable;
