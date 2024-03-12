const router = require('express').Router();
const { User } = require('../../models');

// Post request for user login
router.post('/login', async (req, res) => {
    try {
        // Checks to see if the email matches.
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password.' });
            return;
        }

        // Saves the session so that the user remains logged in when they return to the website.
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Successfully logged in.' })
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();        
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;