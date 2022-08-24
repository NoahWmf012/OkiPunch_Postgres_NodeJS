const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport, bcrypt, knex) => {
    passport.use(
        "local-signup",
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await knex("users").where({ username }).first();
                if (user) {
                    return done(null, false, { message: "Username already taken" });
                }
                const hash = await bcrypt.hash(password, 10);
                let newUser = { username, password: hash };

                let userId = await knex("users").insert(newUser).returning("id");
                newUser.id = userId[0].id;
                done(null, newUser);
            } catch (err) {
                done(err);
            }
        })
    );

    passport.use(
        "local-login",
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await knex("users").where({ username }).first();
                if (!user) {
                    return done(null, false, { message: "No user with this username" });
                }
                const result = bcrypt.compare(password, user.password);
                if (result) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect password" });
                }
            } catch (err) {
                return done(err);
            }
        })
    );
};
