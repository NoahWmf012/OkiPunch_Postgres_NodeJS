const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport, bcrypt, knex) => {
    passport.use(
        "local-signup",
        new LocalStrategy(async (email, password, done) => {
            try {
                const user = await knex("users").where({ email }).first();
                if (user) {
                    return done(null, false, { message: "email already taken" });
                }
                const hash = await bcrypt.hash(password, 10);
                let newUser = { email, password: hash, role: 'company' };

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
        new LocalStrategy(async (email, password, done) => {
            try {
                const user = await knex("users").where({ email }).first();
                if (!user) {
                    return done(null, false, { message: "No user with this email" });
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
