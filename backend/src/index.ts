import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { handleUpload } from './controllers/upload';
import { handleAsk } from './controllers/ask';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Multer for PDF uploads (store in memory for immediate processing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  }
});

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MemoryGraph AI Backend is running' });
});

// PDF Ingestion Endpoint
app.post('/upload', upload.single('document'), handleUpload);

// Question/Retrieval Endpoint
app.post('/ask', handleAsk);

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`MemoryGraph Backend running on http://localhost:${port}`);
});
