import { isCountryPresent, insertNewCountry, getAllCountries, getFileByCountryId, deleteCountry } from "../models/countryModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderHomePage = async (req, res) => {
    try {
        const countriesData = await getAllCountries();
        res.render("home.ejs", { countriesData });
    } catch (err) {
        console.error("Error retrieving data:", err);
    }
};

export const addCountry = async (req, res) => {
    const { country, rice_production, wheat_production } = req.body;
    const file = req.file;

    if (await isCountryPresent(country)) {
        try {
            await insertNewCountry(country, rice_production, wheat_production);
            res.redirect("/");
        } catch (err) {
            console.error("Error adding country:", err);
        }
    } else {
        console.error("Country already exists!");
        res.redirect("/");
    }
};

export const downloadFile = async (req, res) => {
    const fileData = await getFileByCountryId(req.params.fileId);
    const filePath = path.join(__dirname, "../public", fileData.file_path);

    res.download(filePath, fileData.filename, (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Error downloading file");
        }
    });
};

export const deleteCountryAndFile = async (req, res) => {
    const countryId = req.body.country_id;
    const fileData = await getFileByCountryId(countryId);

    if (fileData) {
        const filePath = path.join(__dirname, "../public", fileData.file_path);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        } else {
            console.warn(`File not found: ${filePath}`);
        }
        
        await deleteCountry(countryId);
        res.redirect("/");
    } else {
        res.status(404).send("File record not found.");
    }
};
