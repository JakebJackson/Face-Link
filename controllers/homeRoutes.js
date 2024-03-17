const router = require('express').Router();
const { User , Images, Faces} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      console.log(req.session.user_i);

      const userData = await User.findByPk(req.session.user_id,{
        include: [{ model: Images }, { model: Faces }],
        attributes: { exclude: ['password'] },
      });

      const user = userData.get({ plain: true });
      
      res.render('dashboard', {
        user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;