import express from "express";
import userRouter from "./routes/UserRouter";
import workerRouter from "./routes/WorkerRouter";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use userRouter for user-related routes
app.use("/v1/user", userRouter);

// Use workerRouter for worker-related routes
app.use("/v1/worker", workerRouter); // Changed path to avoid conflict

// Error handling middleware (optional)
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
