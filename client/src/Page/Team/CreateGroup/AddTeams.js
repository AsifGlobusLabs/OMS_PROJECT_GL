// import React, { useState, useEffect } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";

// const AddTeams = ({ sdata, updateAssignedEmployees }) => {
//   const [workgroupEmployees, setWorkgroupEmployees] = useState([]);
//   const [assignedEmployees, setAssignedEmployees] = useState([]);
//   const [data, setData] = useState([]); // Define data state variable
//   const [filteredData, setFilteredData] = useState([]); // Define filteredData state variable

//   // console.log(assignedEmployees, "name aali");
//   console.log(sdata, "data aali");

//   useEffect(() => {
//     const fetchWorkgroupEmployees = async () => {
//       try {
//         const response = await fetch("http://localhost:3306/api/workGroup/allData");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setWorkgroupEmployees(data);
//       } catch (error) {
//         console.error("Error fetching workgroup employees:", error);
//       }
//     };

//     fetchWorkgroupEmployees();
//   }, []);

//   useEffect(() => {
//     if (sdata.length > 0 && workgroupEmployees.length > 0) {
//       const assigned = workgroupEmployees.filter((employee) => {
//         return sdata.some(
//           (item) => item.EmployeeID === employee.EmployeeID_Assigner
//         );
//       });
//       setAssignedEmployees(assigned);
//       updateAssignedEmployees(assigned);
//     }
//   }, [sdata, workgroupEmployees]);

//   const handleDelete = async (workgroupId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3306/api/workGroup/delete/${workgroupId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         // Filter out the deleted item from both data and filteredData
//         setData((prevData) => prevData.filter((item) => item.workgroupId !== workgroupId));
//         setFilteredData((prevData) => prevData.filter((item) => item.workgroupId !== workgroupId));
//         // Also update the assignedEmployees state
//         const updatedAssignedEmployees = assignedEmployees.filter(
//           (employee) => employee.WorkGroupID !== workgroupId
//         );
//         setAssignedEmployees(updatedAssignedEmployees);

//         window.alert("Item deleted successfully!");
//       } else {
//         console.error("Error deleting item:", response.status);
//       }
//     } catch (error) {
//       console.error("Error deleting workgroup:", error);
//     }
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       {sdata &&
//         sdata.map((item) => (
//           <div key={item.EmployeeID}>
//             <p style={{ fontSize: "18px", fontWeight: 600, color:'black' }}>
//               {item.FirstName} {item.LastName} <span>Teams</span>
//             </p>
//           </div>
//         ))}
//       <table className="table table-striped">
//         <thead style={{ fontSize: "15px" }}>
//           <tr>
//             <th>WorkGroupID</th>
//             {/* <th>EmployeeID_Assigner</th> */}
//             <th>Employee AssigTo</th>
//             <th>Department</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody style={{ fontSize: "13px" }}>
//           {assignedEmployees.map((employee) => (
//             <tr key={employee.WorkGroupID}>
//               <td>{employee.WorkGroupID}</td>
//               {/* <td>{employee.EmployeeID_Assigner}</td> */}
//               <td>
//                 {employee.EmployeeID_AssignTo} -- {employee.Assignee_FirstName}{" "}
//                 {employee.Assignee_LastName}{" "}
//               </td>
//               <td>{employee.Department_Name}</td>
//               <td>
//                 <DeleteIcon
//                   onClick={() => handleDelete(employee.WorkGroupID)}
//                   style={{ cursor: "pointer", color: "red" }}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AddTeams;











import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const AddTeams = ({ sdata, updateAssignedEmployees }) => {
  const [workgroupEmployees, setWorkgroupEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchWorkgroupEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3306/api/workGroup/allData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setWorkgroupEmployees(data);
      } catch (error) {
        console.error("Error fetching workgroup employees:", error);
      }
    };

    fetchWorkgroupEmployees();
  }, []);

  useEffect(() => {
    if (sdata.length > 0 && workgroupEmployees.length > 0) {
      const assigned = workgroupEmployees.filter((employee) => {
        return sdata.some(
          (item) => item.EmployeeID === employee.EmployeeID_Assigner
        );
      });
      setAssignedEmployees(assigned);
      updateAssignedEmployees(assigned);
    }
  }, [sdata, workgroupEmployees]);

  const handleDelete = async (workgroupId) => {
    try {
      const response = await fetch(
        `http://localhost:3306/api/workGroup/delete/${workgroupId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the state without filtering the data
        setData(prevData => prevData.filter(item => item.workgroupId !== workgroupId));
        setFilteredData(prevData => prevData.filter(item => item.workgroupId !== workgroupId));
        // Update assignedEmployees state directly
        setAssignedEmployees(prevEmployees => prevEmployees.filter(employee => employee.WorkGroupID !== workgroupId));

        window.alert("Item deleted successfully!");
      } else {
        console.error("Error deleting item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting workgroup:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {sdata &&
        sdata.map((item) => (
          <div key={item.EmployeeID}>
            <p style={{ fontSize: "18px", fontWeight: 600, color:'black' }}>
              {item.FirstName} {item.LastName} <span>Teams</span>
            </p>
          </div>
        ))}
      <table className="table table-striped">
        <thead style={{ fontSize: "15px" }}>
          <tr>
            <th>WorkGroupID</th>
            <th>Employee AssigTo</th>
            <th>Department</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "13px" }}>
          {assignedEmployees.map((employee) => (
            <tr key={employee.WorkGroupID}>
              <td>{employee.WorkGroupID}</td>
              <td>
                {employee.EmployeeID_AssignTo} -- {employee.Assignee_FirstName}{" "}
                {employee.Assignee_LastName}{" "}
              </td>
              <td>{employee.Department_Name}</td>
              <td>
                <DeleteIcon
                  onClick={() => handleDelete(employee.WorkGroupID)}
                  style={{ cursor: "pointer", color: "red" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddTeams;
