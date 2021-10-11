const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extented: true }));

const PORT = process.env.PORT || 5050

app.use("/api/users", require('./routes/users'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/contacts", require('./routes/contacts'));
app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/json", (req, res) => {
  res.json({ page: "home", content: "Content of the page" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));