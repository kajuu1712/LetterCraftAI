import express from "express";
import 'dotenv/config'
import cors from "cors";
import connectDB from "./Config/db.js";
import userRouter from "./Routes/users.js";
import letterRouter from "./Routes/letter.js";
import historyRouter from "./Routes/history.js";

const PORT = process.env.PORT || 8080;

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://lettercraftai-frontend.onrender.com"
];


app.use(cors({
  origin: function(origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
connectDB();

app.use("/api/user", userRouter);
app.use("/api/ai", letterRouter);
app.use("/api/history", historyRouter);

app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT}`);
})