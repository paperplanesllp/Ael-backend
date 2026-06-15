import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN || 'http://localhost:5173');
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
  res.status(statusCode).json({
    message: error.message || 'Server error'
  });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`AEL Beauty API running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  });
