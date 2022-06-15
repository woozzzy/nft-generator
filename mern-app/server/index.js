import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import configRoutes from './routes/config.js';
import layerRoutes from './routes/layer.js';

dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8081;

const app = express();
var corsOptions = {
    origin: "http://localhost:5556"
};

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.use('/config', configRoutes);
app.use('/layer', layerRoutes);

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));