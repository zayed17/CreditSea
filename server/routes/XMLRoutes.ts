import express from "express";
import multer from "multer";
import { uploadXML,getReportById } from "../controllers/XMLController";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadXML);
router.get("/reports/:id", getReportById);

export default router;
