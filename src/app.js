import express from "express";
import routes from "./routers";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cloadinary from "cloudinary";
import fileupload from "express-fileupload";

dotenv.config();

const app = express();
const PORT = 3000;

cloadinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//body parser middleware
app.use(fileupload({ useTempFiles: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors());
app.use(routes);

const server = app.listen(PORT, console.log(`Server Listening on ${PORT} `));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  // close server & exit process
  server.close(() => process.exit(1));
});

export default app;
