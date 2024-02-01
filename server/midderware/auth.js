// const jwt = require("jsonwebtoken");
// const db = require("../db")

// exports.auth = async (req,res,next) =>{
//     try {
//         const token = req.cookies.token;
//         const verifyUser = jwt.verify(token, process.env.SECRET_KEY );
//         query = "SELECT * FROM tb_employee WHERE EmployeeID = ?"
//         db.query(query,verifyUser.EmployeeID, (err, results) => {
//             if (err) {
//               console.error("Error executing query:", err);
//               res.status(500).json({ error: "Internal Server Error" });
//               return;
//             }
//             res.status(200).json(results);
//             console.log(results);
//           })
//         // console.log(user);

//         // req.token = token;
//         // req.user = user;

//         next();
        
//     } catch (error) {
//         res.status(401).send(error);
//     }
// // }
// const jwt = require("jsonwebtoken");
// const db = require("../db");

// const auth = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;

//         try {
//             const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
//             console.log(verifyUser);
//             const query = "SELECT * FROM tb_employee WHERE EmployeeID = ?";
//             const results = db.query(query, [verifyUser.EmployeeID],(err, results) => {
//                 if (err) {
//                   console.error("Error executing query:", err);
//                   res.status(500).json({ error: "Internal Server Error" });
//                   return;
//                 }
//                 res.status(200).json(results);
//               });
//             console.log(results);
//         } catch (verificationError) {
//             res.status(401).json({ error: "Unauthorized" });
//             return;
//         }

//         next();
//     } catch (error) {
//         console.error("Error executing query:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports = auth;


const jwt = require("jsonwebtoken");
const db = require("../db");

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        try {
            // Verify the JWT token
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

            // Query to check if the user exists in the database
            const query = "SELECT * FROM tb_employee WHERE EmployeeID = ?";

            // Assuming db.query returns a Promise
            db.query(query, [verifyUser.EmployeeID],(err,results) => {
                if(err){
                    console.error("Error executing query:", err);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                }
            // If the user is not found, return Unauthorized
                if (results.length === 0) {
                res.status(401).json({ error: "Unauthorized" });
                return;
                }
                console.log(results);
            // You might want to store the user information in the request object
                req.authenticatedUser = results[0];
                console.log(req.authenticatedUser);
            });

        } catch (verificationError) {
            // Token verification failed, return Unauthorized
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        next();

    } catch (error) {
        // Internal Server Error
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = authenticateUser;
