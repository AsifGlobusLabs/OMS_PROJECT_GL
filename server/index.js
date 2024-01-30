const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const employeeDetails = require("./routes/employeeDetailsRoutes");
const workGroup = require("./routes/workGroupRoutes");
const designationDetails = require("./routes/designationRoutes");
const departmentDetails = require("./routes/departmentRoutes");
const userDetails = require("./routes/userDetailsRoutes");

const app = express();
const port = process.env.PORT || 3306;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/employee", employeeDetails);
app.use("/api/workGroup", workGroup);
app.use("/api/designation", designationDetails);
app.use("/api/department", departmentDetails);
app.use("/api/userDetails",userDetails);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
