const express = require("express");
const cors = require("cors");
const { attendanceRouter, eventRouter, memberRouter } = require("./routers");
const connectDb = require("./db/connectDb");

const PORT = process.env.port || 8080;
const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.use("/attendance", attendanceRouter);
app.use("/members", memberRouter);
app.use("/events", eventRouter);

app.listen(PORT, () => {
  console.log(`Started server at port ${PORT}`);
});
