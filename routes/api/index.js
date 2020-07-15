const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js` and `/comment` to routes created in `comment-routes`
router.use('/comments', commentRoutes);;
router.use('/pizzas', pizzaRoutes);

module.exports = router;