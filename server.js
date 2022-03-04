const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
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
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is on port ${port}`));
