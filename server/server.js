//Config express
const express = require("express");
const dotenv = require("dotenv");
const process = require("process");
const workoutRoutes = require("./routes/workouts.js");
const usersRoutes = require("./routes/users.js");
const transactionsRoutes = require("./routes/Transactions.js");
const userPortfolio = require("./routes/userPortfolio.js");
const mongoose = require("mongoose");
const cors = require("cors");
const nftRoutes = require("./routes/nftRoutes.js");
const transactionRoutes = require("./routes/transactionRoutes.js");
const ipfsRoutes = require("./routes/ipfsRoutes.js");

dotenv.config();

const app = express();

// configuration cors
const corsOptions = {
  origin: ["http://localhost:5173", "https://api.coingecko.com/"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// middleware pour parser le json
app.use(express.json());

// middleware pour logger les requetes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts/", workoutRoutes);
app.use("/api/portfolio/", userPortfolio);
app.use("/api/transactions/", transactionsRoutes);
app.use("/api/users/", usersRoutes);
app.use("/api/nft/", nftRoutes);
app.use("/api/transaction/", transactionRoutes);
app.use("/api/ipfs/", ipfsRoutes);

// connect to db et lancement du server
mongoose.connect(
 process.env.MONG_URI,
 
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});



app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});