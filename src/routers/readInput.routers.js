import express from "express";
import readFileController from "../controllers/readFileinput.controller";
import {
  checkUpload,
  checkUploadFormat,
} from "../middlewares/uploadImage.middleware";

const router = express();

router.post(
  "/",
  checkUpload,
  checkUploadFormat("png"),
  readFileController.readFileinput
);

export default router;
