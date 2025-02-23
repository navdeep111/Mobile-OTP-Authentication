import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';  // Note the `.js` extension for ES6 module compatibility
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(buildPath));

app.use(bodyParser.json());
app.use(cors({origin: ['']}));


connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html')); });


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

