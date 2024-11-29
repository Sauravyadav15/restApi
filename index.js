const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "linkTest",
  password: "Sky@jnv#1545",
});

app.get("/", (req, res) => {
  const q = `SELECT COUNT(*) as count FROM user`;
  connection.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.send("Error fetching user count.");
    }
    const count = result[0].count;
    res.render("home.ejs", { count });
  });
});

// Show all users
app.get("/user", (req, res) => {
  const q = `SELECT * FROM user`;
  connection.query(q, (err, users) => {
    if (err) {
      console.error(err);
      return res.send("Error fetching users.");
    }
    res.render("edit.ejs", { users });
  });
});

// Edit user form
app.get("/user/:id/edit", (req, res) => {
  const { id } = req.params;
  const q = `SELECT * FROM user WHERE id = ?`;
  connection.query(q, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.send("Error fetching user data.");
    }
    const user = result[0];
    res.render("newedit.ejs", { user });
  });
});

// Update user
app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const { username: newUsername } = req.body;
  const q = `UPDATE user SET username = ? WHERE id = ?`;
  connection.query(q, [newUsername, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.send("Error updating user.");
    }
    //res.send("User updated successfully!");
    res.redirect("/user");
  });
});

// DELETE ROUTE
// app.delete("/user/:id/delete",(req,res)=>{
//    res.send("delete request sent");
// });
app.delete("/user/:id/delete", (req, res) => {
  const { id } = req.params;
  const q = `DELETE FROM user WHERE id = ?`;

  connection.query(q, [id], (err, result) => {
      if (err) {
          console.error(err);
          return res.send("Error deleting user.");
      }
      res.redirect("/user"); // Redirect to /user after deletion
  });
});

app.listen(8080, () => {
  console.log("Server running at 8080");
});
