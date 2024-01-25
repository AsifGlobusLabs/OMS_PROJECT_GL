const db = require("../db");

// Getting all designations

exports.getAllDesignations = (req, res) => {
    const query = 'SELECT * FROM tb_designation';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }else{
        res.json(results);
      }
    });
  };

// Inserting designation

exports.addDesignation = (req, res) => {
  const newDesignation = req.body;

  const query = 'INSERT INTO tb_designation SET ?';
  db.query(query, newDesignation, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }else{
    res.json({ message: 'Designation added successfully'});
    }
  });
};


// updating designation's data

exports.updateDesignation = (req, res) => {
  const designationId = req.params.DesignationID; 
  const updatedDesignation = req.body;
  const query = 'UPDATE tb_designation SET ? WHERE DesignationID = ?';

  db.query(query, [updatedDesignation, designationId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }else{
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Designation not found' });
        return;
      }else if (result.affectedRows > 0 && result.changedRows === 0) {
        res.status(201).json("Designation's data is up to date already");
        return;
      }else{
        res.json({ message: 'Designation updated successfully' });
        console.log(result);
        }
  }
  });
};


// Deleting designation's data 

exports.deleteDesignation = (req,res) => {
  const designationId = req.params.DesignationID;
  const query = 'DELETE FROM tb_designation WHERE DesignationID = ?';
  db.query(query,[designationId],(err,result) => {
    if(err){
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    }else{
      if( result.affectedRows === 0 ){
        res.status(404).json({ error: 'Designation not found' });
        return;
      }else{
        res.json({ message: "Designation's data deleted successfully" });
      }
    }
  });
}
