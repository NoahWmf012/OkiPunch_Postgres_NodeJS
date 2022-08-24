class PageRouter {
    constructor(express, noteService) {
        this.express = express;
        this.noteService = noteService;
    }

    isLoggedIn(req, res, next) {
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
        router.get("/", this.isLoggedIn, this.home.bind(this));
        router.get("/signup", this.isNotLogged, this.signup.bind(this));
        router.get("/login", this.isNotLogged, this.login.bind(this));
        return router;
    }

    home(req, res) {
        this.noteService.list(req.user.username).then((notes) => {
            res.render("home", {
                user: req.user.username,
                notes,
            });
        });
    }

    signup(req, res) {
        res.render("signup");
    }

    login(req, res) {
        res.render("login");
    }
}

module.exports = PageRouter;
