const express = require("express");
const errorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const medicineRouter = require("./routes/medicineRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "https://oxymed-pharmacy.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// Routes
app.use("/users/", userRouter);
app.use("/medicine/", medicineRouter);
app.use("/purchase/", purchaseRouter);
app.use("/admin/", adminRouter);

app.use("*", (req, res) =>
  res
    .status(404)
    .json({ status: "fail", message: "👻 This route does not exist" }),
);

// Error handlers
app.use(errorHandler);

// Mongoose
mongoose
  .connect(
    "mongodb+srv://db-admin:Rk2XLs42YGRpb0XW@cluster0.osrizna.mongodb.net/car-service?retryWrites=true&w=majority",
  )
  .then(() => console.log("🥝 CONNECTED TO DATABASE"));

app.listen(8080, () => console.log("🥝 SERVER IS RUNNING"));
