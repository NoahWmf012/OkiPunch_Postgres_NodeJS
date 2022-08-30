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
    async showWorkers(id) {
        let summaryObject = {};
        await this.knex
            .select("alias", "employee_id")
            .from("employee_information")
            .then((rows) => {
                return summaryObject = rows;
            })
        return summaryObject;
        // return this.knex("employee_information");
    }

    optVerification(id, otp) {
        //check the redis if id and otp match, then punch-in the record into DB
        var msg = "";
        return (async () => {

            const client = createClient();

            client.on("error",
                (err) => console.log("RedisClient Error", err));

            await client.connect();

            const value = await client.get(id);
            if (otp !== value) {
                return "incorrect One-Time-Password";
            }
            /**
        return `Correct One-Time-Password with ID:${id}`
        //in_date
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;

        //in_time
        let d = new Date();
        let n = d.toLocaleTimeString();

        //status
        let status = "";
        if (n == null) {
            status = "ABSENT";
        } else if (((n).split(':')[0]) == 9 && ((n).split(':')[1]) == 0) {
            status = "ON_TIME"; //09:00:00 - 09:00:59
        } else if ((((n).split(':')[0]) > 9) && (((n).split(':')[0]) <= 15) || (((n).split(':')[0]) = 9) && (((n).split(':')[1]) > 0)) {
            status = "LATE"; //09:01:00 - 15:59:59
        } else if ((((n).split(':')[0]) < 9)) {
            status = "EARLY GOING"; // ... - 08:59:59
        } else if ((((n).split(':')[0]) >= 16)) {
            status = "HALF DAY"; // 16:00:00 - ...
        }

        await this.knex
            .insert({ employee_id: id, in_date: today, in_time: n, status: status })
            .into("attendance");*/

        })((res) => { msg = res });
    }

    //  /biz/worker/addnew (POST)
    async addNewWorker(worker) {
        console.log("worker:");
        console.log(worker.username);
        console.log(worker.password);
        console.log(worker.email);
        console.log(worker.department)
    }

    // /biz/worker/:id/calendar (GET)
    async showWorkerCanlendar(id) {
        //acquire type
        let summaryObject = {};
        let status = [];
        let query_time = await this.knex
            .select("status")
            .from("attendance")
            .where("employee_id", id)
            .orderBy("id", "asc")
            .then((rows) => {
                for (let i = 0; i < rows.length; i++) {
                    status.push(rows[i].status);
                }
                summaryObject.status = status;
            });



        //acquire in_time & out_time description
        let description = [];
        let query_in_time = await this.knex
            .select("in_time", "out_time")
            .from("attendance")
            .where("employee_id", id)
            .orderBy("id", "asc")
            .then((rows) => {
                for (let j = 0; j < rows.length; j++) {
                    description.push(`IN:${rows[j].in_time}  OUT:${rows[j].out_time}`);
                }
            });
        summaryObject.description = description;


        //acquire date
        let queryDate = await this.knex.select("in_date").from("attendance")
            .where("employee_id", id)
            .orderBy('id', 'asc')
            .then((rows) => {
                let dateArray = [];
                for (let j = 0; j < rows.length; j++) {
                    const date = rows[j].in_date;
                    date.setDate(date.getDate() + 1);
                    dateArray.push(date.toISOString().split('T')[0]);
                }
                summaryObject.date = dateArray;
            });
        return summaryObject; // include status, description, time
        // return this.knex("attendance").where('employee_id', user);
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
