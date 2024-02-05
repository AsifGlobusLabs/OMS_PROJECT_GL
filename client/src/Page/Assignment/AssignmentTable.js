import { Typography } from '@mui/material'
import React from 'react'
import { Table } from 'react-bootstrap'

const AssignmentTable = () => {
  return (
    <div className='assignment-table'>
        <Typography variant="h5" style={{fontWeight:"500"}}>Assignment Data</Typography> 
        <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td colSpan={2}>Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </Table></div>
  )
}

export default AssignmentTable