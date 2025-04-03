const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/createOrder', paymentController.createOrder);
router.post('/verify', paymentController.verifyPayment);
router.get('/success', paymentController.getSuccessPage);

module.exports = router; 