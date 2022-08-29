const bcrypt = require("bcrypt");
const { createClient } = require("redis");
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

    optVerification(id, otp) {
        //check the redis if id and otp match, then punch-in the record into DB
        var msg = "";
        return (async () => {

            const client = createClient();

            client.on("error",
                (err) => console.log("RedisClient Error", err));

            await client.connect();

            const value = await client.get("id1");
            if (otp !== value) {
                return "incorrect One-Time-Password";
            }
            return `Correct One-Time-Password with ID:${id}`
        })((res) => { msg = res });
    }

    //  /biz/worker/addnew (POST)
    async addNewWorker(email, password) {
        //redirect err / exception
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
