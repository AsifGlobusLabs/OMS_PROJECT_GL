
import React, { useState, useEffect } from 'react';
import SideBar from '../../Component/SideBar';
import { Box } from '@mui/material';
import NewRegistration from './NewRegistration';
import ViewRegistrationData from './ViewRegistrationData';

const RegisterPage = () => {
  const [employee, setEmployee] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch employee data

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3306/api/employee/');
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      const data = await response.json();
      console.log(data, "skjcbv");
      const reversedData = data.reverse(); // Reverse the order of data
      setEmployee(reversedData);
      setError(null); // Reset error state if data fetch is successful
    } catch (error) {
      console.error('Error fetching employee data', error);
      setError('Error fetching employee data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch employee data on component mount
  useEffect(() => {
    fetchEmployee();
  }, []);



  // const addEmployee = async (formData) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('http://localhost:3306/api/employee', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to add employee');
  //     }
  //     // Handle success response
  //     setSuccessMessage("Registration successful!");
       

  //     // Clear the success message after 2 seconds
  //     setTimeout(() => {
  //       setSuccessMessage("");
  //     }, 2000);
  //     fetchEmployee();
  //   } catch (error) {
  //     console.error('Error adding employee', error);
  //     setError('Error adding employee');
  //   } finally {
  //     setLoading(false);
  //   }
  // 

  const addEmployee = async (formData) => {
    setLoading(true);
    try {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      const response = await fetch('http://localhost:3306/api/employee', {
        method: 'POST',
        body: formDataWithImage,
      });
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
      // Handle success response
      setSuccessMessage("Registration successful!");
  
      // Clear the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      fetchEmployee();
    } catch (error) {
      console.error('Error adding employee', error);
      setError('Error adding employee');
    } finally {
      setLoading(false);
    }
  };
  



  // Function to delete an employee
  const deleteEmployee = async (EmployeeID) => {
    try {
      const response = await fetch(`http://localhost:3306/api/employee/delete/${EmployeeID}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      await fetchEmployee(); // Fetch updated user list after deleting an employee
    } catch (error) {
      console.error('Error deleting employee', error);
      setError('Error deleting employee');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div>
          <div style={{ 
            
            backgroundColor: successMessage ? 'green' : error ? 'red' : 'transparent' ,
            // width:'100px',
            // height:'40px',
            // alignItems:'center',
            
            }}>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {successMessage && <p>{successMessage}</p>}
          </div>
         
          <NewRegistration addEmployee={addEmployee} />
          <ViewRegistrationData employeeData={employee} deleteEmployee={deleteEmployee} />
        </div>




      </Box>
    </Box>
  );
};

export default RegisterPage;
