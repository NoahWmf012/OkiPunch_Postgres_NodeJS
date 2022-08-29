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

//set up node router
app.use("/", new PageRouter(express).router());
app.use("/", new comAuthRouter(express, passport).router());
app.use("/biz", new nodeRouterCompany(new nodeServiceCompany(knex), express).router());
app.use("/", new emAuthRouter(express, passport).router());
app.use("/employee", new nodeRouterEmployee(new nodeServiceEmployee(knex), express).router());

app.listen(port, () => {
    console.log(
        `
    company site: http://localhost:${port}/biz
    employee site: http://localhost:${port}/employee
    root site: http://localhost:${port} `)
});

const { createClient } = require("redis");

(async () => {

    const client = createClient();

    client.on("error",
        (err) => console.log("RedisClient Error", err));

    await client.connect();

    var otp = Math.floor(1000 + Math.random() * 8999)

    await client.set("id1", otp);

    const value = await client.get("id1");
    console.log(value)
})();