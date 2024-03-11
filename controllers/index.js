const router = require('express').Router();

const ApiRoutes = require('./api');
router.use('/api',ApiRoutes);

module.exports = router