const express = require("express");
const morgan = require("morgan");
const database = require("./configs/database");
require("dotenv").config();

const app = express();

//Connect to the database
database.connect();

//Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", require("./routes/user.route"));
app.use("/api/v1/events", require("./routes/event.route"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
