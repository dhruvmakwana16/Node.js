require("dotenv").config();

const express =
require("express");

const connectDB =
require("./config/db");

const urlRoutes =
require("./routes/urlRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use(express.static("public"));

app.use("/", urlRoutes);

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

 console.log(
 `Server Running on Port ${PORT}`
 );

});