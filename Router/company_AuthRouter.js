class AuthRouter {
    constructor(express, passport) {
        this.express = express;
        this.passport = passport;
    }

    isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    }

    isNotLogged(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    }

    router() {
        let router = this.express.Router();
        /* router.get(
            "/auth/facebook",
            this.isNotLogged,
            this.passport.authenticate("facebook", {
                scope: ["email", "public_profile"],
            })
        );

        router.get(
            "/auth/google",
            // this.isNotLogged,
            this.passport.authenticate("google", {
                scope: ["profile", "email"],
            })
        );

        router.get(
            "/auth/facebook/callback",
            this.passport.authenticate("facebook", {
                successRedirect: "/",
                failureRedirect: "/login",
            })
        );

        router.get(
            "/auth/google/callback",
            this.passport.authenticate("google", {
                successRedirect: "/",
                failureRedirect: "/login",
            })
        ); */

        router.post(
            "/signup",
            this.isNotLogged,
            this.passport.authenticate("local-signup", {
                successRedirect: "/login",
                failureRedirect: "/signup",
                failureFlash: true,
            })
        );

        router.post(
            "/login",
            this.isNotLogged,
            this.passport.authenticate("local-login", {
                successRedirect: "/",
                failureRedirect: "/login",
                failureFlash: true,
            })
        );

        router.get("/logout", this.isLogged, (req, res) => {
            req.logout(function (err) {
                if (err) {
                    return err;
                }
                res.redirect("/login");
            });
        });

        return router;
    }
}

module.exports = AuthRouter;
