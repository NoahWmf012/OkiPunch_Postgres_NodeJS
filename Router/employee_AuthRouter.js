class AuthRouter {
    constructor(express, passport) {
        this.express = express;
        this.passport = passport;
    }

    isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/employee_login");
    }

    isNotLogged(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    }

    router() {
        let router = this.express.Router();

        router.post(
            "/employee_login",
            this.isNotLogged,
            this.passport.authenticate("employee-login", {
                successRedirect: "/salary/:id", //not yet assign /:id
                failureRedirect: "/employee_login",
                failureFlash: true,
            })
        );

        router.get("/logout", this.isLogged, (req, res) => {
            req.logout(function (err) {
                if (err) {
                    return err;
                }
                res.redirect("/employee_login");
            });
        });

        return router;
    }
}

module.exports = AuthRouter;
