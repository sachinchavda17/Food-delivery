import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
dotenv.config()

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo Connected! "))
  .catch((err) => console.log("Error while connecting mongo : ", err));

app.get("/", (req, res) => {
  res.send("Server is live 🎉");
});
// Handle favicon request to prevent the 500 error
app.get('/favicon.ico', (req, res) => res.status(204));

app.use("/api/foods",foodRoute)
app.use("/api/user",userRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)


app.listen(PORT, () => {
  console.log("Server running successfully! 🎉");
});
