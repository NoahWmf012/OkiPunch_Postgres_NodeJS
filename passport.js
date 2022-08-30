module.exports = (app, bcrypt, passport, knex) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await knex("users").where({ id }).first();

        if (!user) {
            return done(new Error(`Wrong user id: ${id}`));
        }
        return done(null, user);
    });

    require("./strategies/local-strategy")(passport, bcrypt, knex);
};
