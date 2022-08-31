//import library
const express = require("express");
const app = express();
const path = require("path");
const passport = require('passport');
const setupPassport = require("./passport");
const bcrypt = require("bcrypt");
const session = require('express-session');
const comAuthRouter = require("./Router/company_AuthRouter");
const emAuthRouter = require("./Router/employee_AuthRouter")
const PageRouter = require("./Router/pageRouter");
const flash = require("express-flash");
const createClient = require('redis');

const { engine } = require('express-handlebars');

const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);

const port = 8000;



//Node Service
const nodeServiceCompany = require("./Service/company_service.js");
const nodeServiceEmployee = require("./Service/employee_service.js");
//Node Router
const nodeRouterCompany = require("./Router/company_route.js");
const nodeRouterEmployee = require("./Router/employee_route.js");



//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



//express-handlebar 
app.engine("handlebars", engine({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");
app.set("views", "./views");

//set up passport
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
}));
setupPassport(app, bcrypt, passport, knex);
app.use(flash());

//animate page
app.get("/logo", (req, res) => {
    res.type('.html')
    res.render('logo');
})

//set up node router
app.use("/", new PageRouter(express).router());
app.use("/", new comAuthRouter(express, passport).router());
app.use("/biz", new nodeRouterCompany(new nodeServiceCompany(knex), express, passport).router());
app.use("/", new emAuthRouter(express, passport).router());
app.use("/employee", new nodeRouterEmployee(new nodeServiceEmployee(knex), express).router());

app.listen(port, () => {
    console.log(
        `
    company site: http://localhost:${port}/company_login
    employee site: http://localhost:${port}/employee_login
    logo site: http://localhost:${port}/logo
    root site: http://localhost:${port} `)
});