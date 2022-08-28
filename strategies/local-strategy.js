const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport, bcrypt, knex) => {
    passport.use(
        "company-signup",
        new LocalStrategy(async (email, password, done) => {
            try {
                const user = await knex("users").where({ email }).first();
                if (user) {
                    return done(null, false, { message: "email already taken" });
                }
                console.log(user)
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
        "company-login",
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                const user = await knex("users").where({ email }).first();
                if (!user) {
                    return done(null, false, { message: "No user with this email" });
                }
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    if (user.role == "company") {
                        return done(null, user);
                    }
                    else done(null, false, { message: "Invalid role" })
                } else {
                    return done(null, false, { message: "Incorrect password" });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.use(
        "employee-login",
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                const user = await knex("users").where({ email }).first();
                if (!user) {
                    return done(null, false, { message: "No user with this email" });
                }
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    if (user.role == "employee") {
                        return done(null, user);
                    }
                    else done(null, false, { message: "Invalid role" })
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect password" });
                }
            } catch (err) {
                return done(err);
            }
        })
    );
    passport.use(
        "add-new-employee",
        new LocalStrategy(async (email, password, done) => {
            try {
                const user = await knex("users").where({ email }).first();
                if (user) {
                    return done(null, false, { message: "email already taken" });
                }
                const hash = await bcrypt.hash(password, 10);
                let newUser = { email, password: hash, role: 'employee' };

                let userId = await knex("users").insert(newUser).returning("id");
                newUser.id = userId[0].id;
                done(null, newUser);
            } catch (err) {
                done(err);
            }
        })
    );


};
