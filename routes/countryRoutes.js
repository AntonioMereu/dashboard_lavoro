import express from "express";
import multer from "multer";
import { renderHomePage, addCountry, downloadFile, deleteCountryAndFile } from "../controllers/countryController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/uploads/files"),
    filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get("/", renderHomePage);
router.post("/add", upload.single("file"), addCountry);
router.get("/download/:fileId", downloadFile);
router.post("/delete", deleteCountryAndFile);

export default router;
