import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cookieparser from 'cookie-parser';

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie parser middleware
app.use(cookieparser());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);

app.get('/api/config/paypal', (req, res) => 
res.send({clientId: process.env.PAYPAL_CLIENT_ID}));

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))