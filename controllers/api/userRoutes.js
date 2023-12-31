const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', async (req, res) => {
    try {
        // Get all users, excluding their password
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET /api/users/":id"
router.get('/:id', async (req, res) => {
    try {
        // Get a single user by id, excluding their password
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        // If no user is found, return an error
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST /api/users
router.post('/', async (req, res) => {
    try {
        // Create a new user
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE /api/users/":id"
router.delete('/:id', async (req, res) => {
    try {
        // Delete a user by id
        const userData = await User.destroy({
            where: { id: req.params.id }
        });
        // If no user is found, return an error
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;