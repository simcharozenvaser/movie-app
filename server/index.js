require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const myListRoutes = require("./routes/myList.routes");


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/my-list", myListRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(3001, () => {
  console.log("Server running on 3001");
});