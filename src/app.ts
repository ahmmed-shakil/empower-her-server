import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { studentRoutes } from "./app/config/modules/student/student.route";
import { adminRoutes } from "./app/config/modules/admin/admin.route";
import { blogRouters } from "./app/config/modules/blog/blog.route";
import { courseRoutes } from "./app/config/modules/courses/course.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/blog", blogRouters);
app.use("/api/v1/course", courseRoutes);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
