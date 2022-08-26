const bcrypt = require("bcrypt");
class nodeServiceCompany {
    constructor(knex) {
        this.init();
        this.knex = knex;
    }
    init() {
        new Promise((resolve, reject) => { });
    }

    // /biz/showworkers (GET)
    showWorkers(role) {
        return this.knex("employee");
    }

    //  /biz/worker/addnew (POST)
    async addNewWorker(email, password) {
        try {
            const user = await knex("users").where({ email }).first();
            if (user) {
                return done(null, false, { message: "email already taken" });
            }
            const hash = await bcrypt.hash(password, 10);
            let newUser = { email, password: hash, role: 'employee' };

            let userId = await knex("users").insert(newUser).returning("id");
            newUser.id = userId[0].id;

            return done(null, newUser);
        } catch (err) {
            done(err);
        }
    }

    // /biz/worker/:id/calendar (GET)
    showWorkerCanlendar(role, user) {
        return this.knex("attendance").where('employee_id', user);
    }

    // /biz/worker/:id/calendar (PUT)
    updateWorkerCanlendar(role, user) {

    }

    // /biz/worker/:id/info (GET)
    showWorkerDayRecord(role, user) {
        return this.knex("employee_information").where('employee_id', user);
    }

    // /biz/worker/:id/info (PUT)
    updateWorkerInfo(role, body) {

    }

    // /biz/worker/:id/info (DELETE)
    layoffWorker(role, user) {
        return this.knex("employee").update('active_status', 'layoff').where('id', user);
    }

    addAnnouncement(role, body) {

    }
}

module.exports = nodeServiceCompany;
