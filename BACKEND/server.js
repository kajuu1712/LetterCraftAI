import express from "express";
import 'dotenv/config'
import cors from "cors";
import connectDB from "./Config/db.js";
import userRouter from "./Routes/users.js";
import letterRouter from "./Routes/letter.js";
import historyRouter from "./Routes/history.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/user", userRouter);
app.use("/api/ai", letterRouter);
app.use("/api/history", historyRouter);

app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT}`);
})