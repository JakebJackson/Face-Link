//External Resources
const express = require('express');

//internal Resources
const routes = require('./controllers');


//intances and Port Config
const app = express();
const PORT =  process.env.PORT || 3001;

//Middle wear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  