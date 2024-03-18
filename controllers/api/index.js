const router =  require('express').Router();
const userRoutes = require('./userRoutes');
const appRoutes = require('./uploadRoutes');
const faceRoutes = require('./faceRoutes');

router.use('/users',userRoutes);
router.use('/app',appRoutes);
router.use('/face',faceRoutes);

module.exports = router;