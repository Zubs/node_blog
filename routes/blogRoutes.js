const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

// Respond to /blogs
router.get('/', blogController.index);
router.get('/create', blogController.create);
router.post('/', blogController.store);
router.get('/:id', blogController.show);
router.delete('/:id', blogController.destroy);

module.exports = router;