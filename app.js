import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import countryRoutes from "./routes/countryRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", countryRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
