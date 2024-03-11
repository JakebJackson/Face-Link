//External Resources
const express = require('express');
const session =  requiw('express-session)');
const sequelize = require('sequelize');
const SequelizeStore =  require('connect-session-sequelise')(session.Store);

//internal Resources
const routes = require('./controllers');

//Port Config
const app = express();
const PORT =  process.env.PORT || 3001;

const sess =  {
    secret =  process.env.SESS_SECRET,
    cookie : {
        maxAge: (1*1000*60*60),
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUnitiatlised: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  