const express = require('express');
const { log } = require('../../middlewares/logger.middleware');
const { getProduct, addProduct, getById, updateProduct, removeProduct } = require('./product.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getProduct);
router.get('/:id', log, getById);
router.post('/', addProduct);
router.put('/', updateProduct);
router.delete('/:id', removeProduct);

module.exports = router;
