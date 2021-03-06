const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var db = require('./models');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors())

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, 'public')));

const router = require('./routes/router');
const userRouter = require('./controllers/user-controller');
const projectRouter = require('./controllers/project-controller');
const testRouter = require('./controllers/test-controller');
app.use('/', router);
app.use('/', userRouter);
app.use('/', projectRouter);
app.use('/', testRouter);

db.sequelize.sync().then(function() {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
