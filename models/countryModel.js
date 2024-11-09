import db from "../config/db.js";

export const isCountryPresent = async (country) => {
    const query = "SELECT * FROM test_tb WHERE country ILIKE $1";
    const values = [country];
    const result = await db.query(query, values);
    return result.rows.length === 0;
};

export const insertNewCountry = async (country, rice_prod, wheat_prod, filename) => {
    const result = await db.query(
        "INSERT INTO test_tb (country, rice_prod, wheat_prod) VALUES ($1, $2, $3) RETURNING id",
        [country, rice_prod, wheat_prod]
    );
    const resultId = result.rows[0].id;
    const filePath = `/uploads/files/${filename}`;
    await db.query(
        "INSERT INTO files (filename, file_path, fileid) VALUES ($1, $2, $3)",
        [filename, filePath, resultId]
    );
};

export const getAllCountries = async () => {
    const result = await db.query("SELECT * FROM test_tb");
    return result.rows;
};

export const getFileByCountryId = async (countryId) => {
    const result = await db.query("SELECT * FROM files WHERE fileid = $1", [countryId]);
    return result.rows[0];
};

export const deleteCountry = async (countryId) => {
    await db.query("DELETE FROM test_tb WHERE id = $1", [countryId]);
};
