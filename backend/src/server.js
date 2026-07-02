import dotenv from "dotenv"
import path from "node:path";
import { fileURLToPath } from "node:url";
import app from "./app.js";
import connectDB from "./config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 3000;

connectDB()
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server Runs On: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Failed to connect to DB: ${error.message}`);
        process.exit(1);
    });
