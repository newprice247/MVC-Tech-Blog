const router = require('express').Router();
const { User, Blog } = require('../../models');


// GET /api/blogs
router.get('/', async (req, res) => {
    try {
        // Get all blogs
        const blogData = await Blog.findAll({
            include:[{
                model: User,
                attributes: ['username']
            }],
            exlude: [{
                model: User,
                attributes: ['password']
            }]
        });
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;