import express from "express";
import morgan from "morgan";
import itemRouter from "./routes/itemRoutes.js";
import pageRouter from "./routes/pageRoutes.js";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
if(process.env.NODE_ENV === "development"){
app.use(morgan("dev"));
}

//CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Log
app.use(requestLogger);

// serve html files
app.use(express.static("public"));
app.use("/", pageRouter);

//Product API
app.use("/api/v1/items", itemRouter);

app.get("/api", (req,res)=>{
    res.status(200)
    .json({status:"success", message:"Item API is running"});
})
//404 handler
app.use((req,res)=>{
    res.status(404).json({status:"fail", message:"Route not found."});
})

//Global error Handler
app.use(errorHandler);

 
export default app;