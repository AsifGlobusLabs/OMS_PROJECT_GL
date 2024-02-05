import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "./Department.css"

const Department = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/department";
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
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
     
            <div className="New-departmemt">
          <Typography variant="h5" style={{fontWeight:"500"}}>New Department</Typography>
          <Form >
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>Department ID</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      style={{ fontWeight: "600", fontSize: "15px" }}
                      type="text"
                      placeholder="Department ID"
                      aria-describedby="inputGroupPrepend"
                      name="DeparmentID"
              
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Department ID.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Department Name"
                    name="DepartmentName"
               
                    required
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                
              </Row>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  className="btn mt-2"
               
                 style={{backgroundColor:"#055f85", borderColor:"#055f85"}}
                >
                submit
                </Button>
              </div>
            </Form>
            </div>

            <div className="Department-table">
            <div >
          <Typography variant="h5" style={{fontWeight:"500"}}>Employee Data</Typography>
          </div>
          <div
            
            style={{ maxHeight: "400px", overflowY: "auto", marginTop:"20px" }}
          >
            <table className="table table-striped">
              <thead style={{ fontSize: "15px" }}>
                <tr>
                  <th>Department ID</th>
                  <th>Department Name</th>
                 
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.DepartmentID}</td>
                    <td>
                      {item.DepartmentName}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
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
      
       
      </Box>
    </Box>
  );
};

export default Department;
