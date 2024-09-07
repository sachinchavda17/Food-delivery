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

app.use("/api/food",foodRoute)
app.use("/api/user",userRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)


app.listen(PORT, () => {
  console.log("Server running successfully! 🎉");
});
