class comAuthRouter {
    constructor(express, passport) {
        this.express = express;
        this.passport = passport;
    }

    isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/company_login");
    }

    isNotLogged(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    }

    isAdminLogged(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role === "company") {
                return next();
            }
            res.send("Only company admin is allowed to enter this page");
        }
        res.redirect("/company_login");
    }

    router() {
        let router = this.express.Router();

        router.post(
            "/company_signup",
            this.isNotLogged,
            this.passport.authenticate("company-signup", {
                successRedirect: "/company_login",
                failureRedirect: "/company_signup",
                failureFlash: true,
            })
        );

        router.post(
            "/company_login",
            this.isNotLogged,
            this.passport.authenticate("company-login", {
                successRedirect: "/biz/showworkers",
                failureRedirect: "/company_login",
                failureFlash: true,
            })
        );

        router.post("/biz/worker/addnew",
            this.isAdminLogged,
            this.passport.authenticate("add-new-employee", {
                successRedirect: "/biz/showworkers",
                failureRedirect: "/",
                failureFlash: true,
            }));

        router.get("/logout", this.isLogged, (req, res) => {
            req.logout(function (err) {
                if (err) {
                    return err;
                }
                res.redirect("/company_login");
            });
        });

        return router;
    }
}

module.exports = comAuthRouter;
