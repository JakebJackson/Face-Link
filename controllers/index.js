const router = require('express').Router();


const homeRoutes = require('./homeRoutes');
const ApiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api',ApiRoutes);

module.exports = router;