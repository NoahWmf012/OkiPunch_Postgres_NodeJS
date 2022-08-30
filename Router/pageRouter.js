class PageRouter {
    constructor(express) {
        this.express = express;
    }

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect("/login");
    }

    isNotLogged(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    }

    redirectHomePage(req, res) {
        if (req.isAuthenticated() && req.user.role === "company") {
            res.redirect("/biz/showworkers");
        } else if (req.isAuthenticated() && req.user.role === "employee") {
            res.redirect("/employee/punch");
        } else {
            res.type(".html");
            res.render("index");
        }
    }

    router() {
        let router = this.express.Router();
        router.get("/", this.redirectHomePage.bind(this));
        router.get("/company_signup", this.isNotLogged, this.companySignup.bind(this));
        router.get("/company_login", this.isNotLogged, this.companyLogin.bind(this));
        router.get("/employee_login", this.isNotLogged, this.employeeLogin.bind(this));
        return router;
    }

    companySignup(req, res) {
        res.render("company_signup");
    }

    companyLogin(req, res) {
        res.render("company_login");
    }

    employeeLogin(req, res) {
        res.render("employee_login");
    }
}

module.exports = PageRouter;
