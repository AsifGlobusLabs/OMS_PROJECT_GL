const db = require("../db");

// Getting all tasks

exports.getAllTasks = (req, res) => {
  const query = "SELECT * FROM tb_task";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Inserting task

exports.addTask = (req, res) => {
  const newTask = req.body;

  // Set default values if not provided
  newTask.TaskStatus = newTask.TaskStatus || "Pending";

  const query = "INSERT INTO tb_task SET ?";
  db.query(query, newTask, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Task added successfully" });
    }
  });
};



// // getting latest or last task id

exports.getLastTaskId = (req, res) => {
  const query =
    "SELECT MAX(TaskID) AS maxID FROM tb_task ";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results[0].maxID === null) {
      const taskId = results[0].maxID="T000";
      res.status(200).json({lastTaskId: taskId})
      return;
    }
    const lastTaskId = results[0].maxID;
    res.status(200).json({ lastTaskId: lastTaskId });
  });
};

// updating task's data

exports.updateTask = (req, res) => {
  const taskId = req.params.TaskID;
  const updatedTask = req.body;
  const query = "UPDATE tb_task SET ? WHERE TaskID = ?";

  db.query(query, [updatedTask, taskId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Task not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Task's data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Task updated successfully" });
      }
    }
  });
};

// Deleting Task's data

exports.deleteTask = (req, res) => {
  const taskId = req.params.TaskID;
  const query = "DELETE FROM tb_task WHERE TaskID = ?";
  db.query(query, [taskId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Task not found" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Task deleted successfully" });
      }
    }
  });
};
