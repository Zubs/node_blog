const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

// Respond to /blogs
router.get('/', blogController.index);

// Respond to /blogs/create
router.get('/create', blogController.create);

router.post('/', blogController.save);

router.get('/:id', blogController.show);

router.delete('/:id', blogController.delete);

module.exports = router;