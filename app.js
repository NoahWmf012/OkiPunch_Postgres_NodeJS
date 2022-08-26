//import library
const express = require("express");
const app = express();
const path = require("path");
const passport = require('passport');
const setupPassport = require("./passport");
const bcrypt = require("bcrypt");
const session = require('express-session');
const AuthRouter = require("./Router/company_AuthRouter")
const flash = require("express-flash");

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

//express server
app.get("/", (req, res) => {
    res.type(".html");
    res.render("index");
});

app.get("/path", (req, res) => {
    res.type(".html");
    res.render("path");
});

app.get("/employee_login", (req, res) => {
    res.type(".html");
    res.render("employee_login");
});

app.get("/employee_punch", (req, res) => {
    res.type(".html");
    res.render("employee_punch");
});

app.get("/employee_calendar", (req, res) => {
    res.type(".html");
    res.render("employee_calendar");
});

app.get("/employee_information", (req, res) => {
    res.type(".html");
    res.render("employee_information");
});

app.get("/company_login", (req, res) => {
    res.type(".html");
    res.render("company_login");
});

app.get("/company_signup", (req, res) => {
    res.type(".html");
    res.render("company_signup");
});

app.get("/company_summary", (req, res) => {
    res.type(".html");
    res.render("company_summary");
});

app.get("/company_information", (req, res) => {
    res.type(".html");
    res.render("company_information");
});

app.get("/company_calendar", (req, res) => {
    res.type(".html");
    res.render("company_calendar");
});



//set up node router
app.use("/biz", new nodeRouterCompany(new nodeServiceCompany(knex), express).router());
app.use("/", new AuthRouter(express, passport).router());

app.use("/employee", new nodeRouterEmployee(new nodeServiceEmployee(knex), express).router());

app.listen(port, () => {
    console.log(
        `
    company site: http://localhost:${port}/biz
    employee site: http://localhost:${port}/employee
    root site: http://localhost:${port} `)
});