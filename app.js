require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const pageRoutes = require('./routes/pageRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Route middlewares
app.use('/', pageRoutes);
app.use('/products', productRoutes);
app.use('/payment', paymentRoutes);

// Error handling
app.use((req, res, next) => {
    res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});