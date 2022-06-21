import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import path from "path";

import configRoutes from './routes/config.js';
import layerRoutes from './routes/layer.js';
import genRoutes from './routes/generate.js';

dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8081;

const app = express();
var corsOptions = {
    origin: "http://localhost:5556"
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use('/config', configRoutes);
app.use('/layer', layerRoutes);
app.use('/generate', genRoutes);
app.use('/public', express.static(path.join(process.cwd(), 'public')));

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
