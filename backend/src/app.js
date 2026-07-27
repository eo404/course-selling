import express from "express";
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
  });
});

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);

export default app;