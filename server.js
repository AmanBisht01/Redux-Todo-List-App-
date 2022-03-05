const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const path = require("path");
const app = express();
env.config();
app.use(express.json());

const db = process.env.MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to db."))
  .catch((err) => console.log(err));

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
//
app.use("/api/auth", require("./routes/api/auth"));

// if (process.env.NODE_ENV == "production") {
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// }

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is on port ${port}`));
