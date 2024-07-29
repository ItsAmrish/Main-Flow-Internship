const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    res.json("Success");
                } else {
                    res.json("incorrect password");
                }
            } else {
                res.json("No record exist");
            }
        })
        .catch(err => {
            res.status(500).json("An error occurred");
        });
});

app.post("/signup", (req, res) => {
    const { email } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                res.status(400).json({ message: "Email already exists" });
            } else {
                EmployeeModel.create(req.body)
                    .then(newUser => res.json({ message: "Success", user: newUser }))
                    .catch(err => res.status(500).json({ message: "An error occurred during registration" }));
            }
        })
        .catch(err => {
            res.status(500).json({ message: "An error occurred" });
        });
});

app.listen(3001, () => {
    console.log("server is running");
});
