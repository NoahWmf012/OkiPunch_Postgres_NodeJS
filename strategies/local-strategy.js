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
                done();
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
                    else return done(null, false, { message: "Invalid role" })
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
                    else return done(null, false, { message: "Invalid role" })
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
        new LocalStrategy({
            usernameField: "email",
            passReqToCallback: true
        }, async (req, email, password, done) => {
            try {
                const user = await knex("users").where({ email }).first();
                if (user) {
                    return done(null, false, { message: "email already taken" });
                }
                const hash = await bcrypt.hash(password, 10);

                let newUser = { username: req.body.username, email, password: hash, role: 'employee' };
                let newID = await knex("users").insert(newUser).returning("id")
                console.log(newID);

                let newInfo = { employee_id: newID[0].id, first_name: req.body.fname, last_name: req.body.lname, alias: req.body.alias, phone_number: req.body.phoneNumber, address: req.body.address, gender: req.body.gender, date_of_birth: req.body.dateOfBirth, image_icon: req.body.image }
                console.log("new worker Info", newInfo)
                await knex("employee_information").insert(newInfo);

                let newSalary = { employee_id: newID[0].id, hourly_rate: req.body.salary, month_working_hour: 0, month_salary: 0 };
                await knex("salary").insert(newSalary);

                let newEmployee = { employee_id: newID[0].id, title: req.body.title, salary: 0, active_status: "ready-to-work" }
                await knex("employee").insert(newEmployee);

                // let newDepartment = { name: req.body.department }
                // await knex("department").insert(newDepartment);

                return done();
            } catch (err) {
                return done(err);
            }
        })
    );
};
