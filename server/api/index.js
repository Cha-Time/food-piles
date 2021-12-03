const router = require('express').Router();
module.exports = router;

router.use('/organizations', require('./organizations'));
router.use('/donors', require('./donors'));
router.use('/charities', require('./charities'));
router.use('/users', require('./users'));
router.use('/messages', require('./messages'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
