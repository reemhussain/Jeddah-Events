//contact us form validation

//HTML routing
app.use(express.urlencoded({ extended: false }));
app.post("/process", (request, response) => {

let reply ="";
    const fname = request.body.fname;
    const lname = request.body.lname;
    const email = request.body.email;
    const phoneNum = request.body.phone;
    const message = request.body.msg;
    if (fname.length > 0 && lname.length > 0 && email.length > 0 && phoneNum.length > 0 && message.length > 0) {
         reply="<h1>Thank you for your message, we will look into it.</h1>"
        
    }else{
        reply="<h1>Please, fill the form properly. Everything is required.</h1>";
    }

response.send(reply);
})

//1 creare server application
const express = require("express");
const app = express();
const port = 2500;
//setting up database

const Mysql = require("mysql2");
const pool = Mysql.createPool({
    connectionLimit: 10,
    host:"localhost",user:"root",password: 	"root", port: 3306,database: "userdata"
});

//serving static routing

app.use("/", express.static("./web-project-last-update"));

//json routing to Insert the user data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/insert", (request, response) => {

    const data = { name: request.body.name, email: request.body.email };
    const query = "INSERT INTO user SET ?";

    pool.query(query, data, (error, result) => {
        if (error) throw error;
        response.send("Data inserted successfully!");
    });
});

// View data route
app.get("/view", (request, response) => {
    const query = "SELECT * FROM user";

    pool.query(query, (error, result) => {
        if (error) throw error;
        response.json(result);
    });
});

//activating server
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});

