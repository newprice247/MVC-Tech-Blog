const router = require('express').Router();
const { Blog } = require('../../models');

module.exports = router;

// GET /api/blogs
router.get('/', async (req, res) => {
    try {
        // Get all blogs
        const blogData = await Blog.findAll();
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});