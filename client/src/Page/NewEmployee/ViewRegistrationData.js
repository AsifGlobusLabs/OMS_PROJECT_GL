

//import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  // TablePagination,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },

  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    // color: theme.palette.getContrastText('white'),
  },

  name: {
    fontSize: "1rem",
  },
}));

const ViewRegistrationData = ({ employeeData, deleteEmployee }) => {
  const classes = useStyles();
  


  return (
    <div className="Employee-table">
      <div>
        <Typography variant="h5" style={{ fontWeight: "500" }}>
          Employee Data
        </Typography>
      </div>
      <br></br>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>
              Employee ID
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Designation
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Department
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((item, index) => (
            <TableRow
              key={item._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#D3D3D3" : "white",
              }}
            >
              <TableCell className={classes.name}>{item.EmployeeID}</TableCell>
              <TableCell
                className={classes.name}
              >{`${item.FirstName} ${item.LastName}`}</TableCell>
              <TableCell className={classes.name}>
                {item.DesignationID}
              </TableCell>
              <TableCell className={classes.name}>
                {item.DepartmentID}--{item.DepartmentID}
              </TableCell>
              <TableCell
                className={classes.status}
                style={{
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  color: "white",
                  borderRadius: 8,
                  padding: "5px 10px",
                  marginTop: "17px",
                  display: "inline-block",

                  backgroundColor:
                    (item.EmploymentStatus === "Active" && "#4E9B47") ||
                    (item.EmploymentStatus === "Inactive" && "#6d6b6b"),
                  //  padding: "2px 10px", // Adjust the padding to make it smaller
                }}
              >
                {item.EmploymentStatus}
              </TableCell>

              <TableCell>
                <IconButton sx={{ color: "#188bc0", height: "5px" }}>
                  <EditIcon />{" "}
                </IconButton>
                <IconButton
                  sx={{ color: "#c53531", height: "5px" }}
                  onClick={() => deleteEmployee(item.EmployeeID)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewRegistrationData;














  // const [currentPage, setCurrentPage] = useState(0); // Start from page 1
  // const [itemsPerPage] = useState(10);


  // const handleChangePage = (event, newPage) => {
  //   setCurrentPage(newPage);
  // };

  //   const handleDelete = async (employeeId) => {
  //     try {
  //         const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
  //         if (!confirmDelete) return;

  //         const apiUrl = `http://localhost:3306/api/employee/delete/${employeeId}`;
  //         const response = await fetch(apiUrl, {
  //             method: "DELETE",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //         });

  //         if (response.ok) {
  //             const updatedData = data.filter(item => item.EmployeeID !== employeeId);
  //             setData(updatedData);
  //             console.log("Employee deleted successfully");
  //         } else {
  //             console.error("Failed to delete employee");
  //         }
  //     } catch (error) {
  //         console.error("Error deleting employee:", error);
  //     }
  // };