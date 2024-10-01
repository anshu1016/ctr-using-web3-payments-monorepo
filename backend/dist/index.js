"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const WorkerRouter_1 = __importDefault(require("./routes/WorkerRouter"));
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Use userRouter for user-related routes
app.use("/v1/user", UserRouter_1.default);
// Use workerRouter for worker-related routes
app.use("/v1/worker", WorkerRouter_1.default); // Changed path to avoid conflict
// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
