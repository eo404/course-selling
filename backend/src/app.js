import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";
import enrollmentRouter from "./routes/enrollment.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
  });
});

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRouter);

export default app;