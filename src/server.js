import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

const productionOrigins = [
  'https://aelbeauty.co',
  'https://www.aelbeauty.co'
];

const developmentOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

const envOrigins = (process.env.CORS_ORIGINS || process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  ...productionOrigins,
  ...developmentOrigins,
  ...envOrigins
]);

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && !allowedOrigins.has(origin)) {
    res.status(403).json({ message: 'Origin not allowed by CORS' });
    return;
  }

  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AEL Beauty API' });
});

app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  const statusCode = error.name === 'ValidationError' ? 400 : 500;

  console.error(`[${new Date().toISOString()}] ${error.name || 'Error'}: ${error.message}`);

  res.status(statusCode).json({
    message: error.message || 'Server error'
  });
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`AEL Beauty API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`MongoDB startup connection failed: ${error.message}`);
    process.exit(1);
  });
