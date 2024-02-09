// import React, { useState } from "react";
// import {
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Button,
// } from "@mui/material"; // Assuming you're using Material-UI
// import DeleteIcon from "@mui/icons-material/Delete";
// function AddTemp({ selectedEmployee, currentEmpolyee }) {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   console.log(currentEmpolyee);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       // Construct an array of data objects to be sent to the API
//       const dataToSend = selectedEmployee.map((employee) => ({
//         EmployeeID_Assigner: currentEmpolyee.map((item) => item.EmployeeID),
//         EmployeeID_AssignTo: employee.EmployeeID,
//         DepartmentID_AssignTo: employee.DepartmentID,
//         CreatedDate: new Date().toISOString(),
//         CreatedBy: "Admin",
//       }));

//       console.log(dataToSend);

//       // Perform your API call here
//       const response = await fetch(
//         "http://localhost:3306/api/workGroup/multiple",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataToSend),
//         }
//       );

//       if (response.ok) {
//         // Handle success
//         console.log("Data submitted successfully!");
//         window.location.reload();
//       } else {
//         // Handle error
//         console.error("Failed to submit data");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete =(EmployeeID) =>{
//     console.log(EmployeeID)
//   }

//   return (
//     <div>
//       <TableContainer
//         component={Paper}
//         style={{ maxWidth: "1000px", margin: "auto" }}
//       >
//         <Table aria-label="employee table">
//           <TableHead>
//             <TableRow style={{ backgroundColor: "#303F9F" }}>
//               <TableCell style={{ fontWeight: "bold", color: "white" }}>
//                 Employee ID
//               </TableCell>
//               <TableCell style={{ fontWeight: "bold", color: "white" }}>
//                 Name
//               </TableCell>
//               <TableCell style={{ fontWeight: "bold", color: "white" }}>
//                 Department
//               </TableCell>
//               <TableCell style={{ fontWeight: "bold", color: "white" }}>
//                 Status
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {selectedEmployee &&
//               selectedEmployee.map((employee, index) => (
//                 <TableRow
//                   key={employee.EmployeeID}
//                   style={{
//                     backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7e1e1",
//                   }}
//                 >
//                   <TableCell>{employee.EmployeeID}</TableCell>
//                   <TableCell>
//                     {employee.FirstName} {employee.LastName}
//                   </TableCell>
//                   <TableCell>
//                     {employee.DepartmentID}--{employee.DepartmentName}
//                   </TableCell>
//                   <TableCell>{employee.EmploymentStatus}</TableCell>

//                   <TableCell>
//                  <DeleteIcon
//                  onClick={() => handleDelete(employee.EmployeeID)}
//                  style={{ cursor: "pointer", color: "red" }}
                 
//                  />
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             margin: "5px 5px 5px 0",
//           }}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
            
//           >
//             {isSubmitting ? "Submitting..." : "ADD"}
//           </Button>
//         </div>
//       </TableContainer>
//     </div>
//   );
// }

// export default AddTemp;



import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material"; // Assuming you're using Material-UI
import DeleteIcon from "@mui/icons-material/Delete";


function AddTemp({ selectedEmployee, currentEmpolyee }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);

  console.log(currentEmpolyee);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Construct an array of data objects to be sent to the API
      const dataToSend = selectedEmployee.map((employee) => ({
        EmployeeID_Assigner: currentEmpolyee.map((item) => item.EmployeeID),
        EmployeeID_AssignTo: employee.EmployeeID,
        DepartmentID_AssignTo: employee.DepartmentID,
        CreatedDate: new Date().toISOString(),
        CreatedBy: "Admin",
      }));

      console.log(dataToSend);

      // Perform your API call here
      const response = await fetch(
        "http://localhost:3306/api/workGroup/multiple",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        // Handle success
        console.log("Data submitted successfully!");
        window.location.reload();
      } else {
        // Handle error
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (EmployeeID) => {
    console.log(EmployeeID);
    setDeletedItems([...deletedItems, EmployeeID]);
    
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ maxWidth: "1000px", margin: "auto" }}
      >
        <Table aria-label="employee table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#303F9F" }}>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Employee ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Department
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Status
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedEmployee &&
              selectedEmployee.map((employee, index) => (
                <TableRow
                  key={employee.EmployeeID}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#ffffff" : "#f7e1e1",
                    display: deletedItems.includes(employee.EmployeeID)
                      ? "none"
                      : "table-row",
                  }}
                >
                  <TableCell>{employee.EmployeeID}</TableCell>
                  <TableCell>
                    {employee.FirstName} {employee.LastName}
                  </TableCell>
                  <TableCell>
                    {employee.DepartmentID}--{employee.DepartmentName}
                  </TableCell>
                  <TableCell>{employee.EmploymentStatus}</TableCell>

                  <TableCell>
                    <DeleteIcon
                      onClick={() => handleDelete(employee.EmployeeID)}
                      style={{ cursor: "pointer", color: "red" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "5px 5px 5px 0",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "ADD"}
          </Button>
        </div>
      </TableContainer>
     
    </div>
  );
}

export default AddTemp;
