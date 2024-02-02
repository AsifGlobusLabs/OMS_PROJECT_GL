import React from 'react';

const AddTeams = () => {
  return (
    <div style={{marginTop:"20px"}}>
    <h4>Team Members</h4>

    <table className="table table-striped">
      <thead style={{ fontSize: "15px" }}>
        <tr>
          <th>WorkGroupID</th>
          <th>EmployeeID</th>
          <th>Name</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody style={{ fontSize: "13px" }}>
       
      </tbody>
    </table>
  </div>
  );
};

export default AddTeams;
