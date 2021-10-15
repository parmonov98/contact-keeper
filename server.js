const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

connectDB();

app.use(express.json({ extented: true }));



app.use("/api/users", require('./routes/users'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/contacts", require('./routes/contacts'));
app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/json", (req, res) => {
  res.json({ page: "home", content: "Content of the page" });
});

if (process.env.NODE_ENV == 'production') {
  // 
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5050
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));