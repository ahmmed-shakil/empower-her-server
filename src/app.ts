import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { studentRoutes } from "./app/config/modules/student/student.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

app.use("/api/v1/students", studentRoutes);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
